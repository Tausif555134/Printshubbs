// ==========================================================================
// Printhubbs - Shopping Cart, Promo Engine & Multi-Step Checkout
// Based on vistaprint_india_features_functions.md
// ==========================================================================

class CartAndCheckoutEngine {
  constructor() {
    this.cartKey = 'printhubbs_cart_items';
    this.ordersKey = 'printhubbs_order_history';
    this.items = this.loadCart();
    this.appliedCoupon = null;
    this.selectedDeliverySpeed = 'standard'; // 'standard' or 'same-day'
    this.deliveryPincode = '400001'; // Default Mumbai
    this.isSameDayEligible = true;
    this.activeCheckoutStep = 1;

    this.updateCartBadge();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem(this.cartKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading cart', e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.cartKey, JSON.stringify(this.items));
      this.updateCartBadge();
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }

  addItem(item) {
    // Generate unique ID
    const cartItem = {
      id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      productId: item.productId,
      title: item.title,
      category: item.category || 'Printing',
      thumbnail: item.thumbnail,
      quantity: item.quantity,
      paperStock: item.paperStock || 'Standard Matte 350 GSM',
      corners: item.corners || 'Standard Square',
      finish: item.finish || 'Standard Finish',
      sides: item.sides || 'Single-Sided',
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      isCustomized: !!item.isCustomized,
      designData: item.designData || null,
      addedAt: new Date().toISOString()
    };

    this.items.push(cartItem);
    this.saveCart();
    this.renderCartDrawer();
    return cartItem;
  }

  removeItem(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
    this.saveCart();
    this.renderCartDrawer();
  }

  updateQuantity(itemId, newQty) {
    const item = this.items.find(i => i.id === itemId);
    if (!item) return;
    if (newQty <= 0) {
      this.removeItem(itemId);
      return;
    }
    // Calculate new total based on unit price ratio
    item.quantity = newQty;
    item.totalPrice = Math.round(parseFloat(item.unitPrice) * newQty);
    this.saveCart();
    this.renderCartDrawer();
  }

  clearCart() {
    this.items = [];
    this.appliedCoupon = null;
    this.saveCart();
    this.renderCartDrawer();
  }

  updateCartBadge() {
    const badges = document.querySelectorAll('.cart-counter-badge');
    const count = this.items.reduce((acc, curr) => acc + 1, 0);
    badges.forEach(b => {
      b.textContent = count;
      if (count > 0) {
        b.classList.remove('hidden');
      } else {
        b.textContent = '0';
      }
    });
  }

  // --- CALCULATION ENGINE ---
  getCalculations() {
    const subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);

    let discountAmount = 0;
    let couponMessage = '';
    if (this.appliedCoupon) {
      const couponRule = window.PRINTSHUBB_DATA.coupons[this.appliedCoupon];
      if (couponRule) {
        if (subtotal >= couponRule.minOrder) {
          discountAmount = Math.round((subtotal * couponRule.discountPercent) / 100);
          couponMessage = `${couponRule.discountPercent}% Discount applied via code ${this.appliedCoupon}`;
        } else {
          couponMessage = `Code ${this.appliedCoupon} requires minimum order of ₹${couponRule.minOrder.toLocaleString('en-IN')}`;
          this.appliedCoupon = null;
        }
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discountAmount);

    // Delivery Fee calculation
    let deliveryFee = 0;
    const freeDeliveryThreshold = window.PRINTSHUBB_DATA.deliveryPincodes.freeDeliveryThreshold;

    if (this.selectedDeliverySpeed === 'same-day' && this.isSameDayEligible) {
      deliveryFee = window.PRINTSHUBB_DATA.deliveryPincodes.sameDayFee;
    } else {
      deliveryFee = (discountedSubtotal >= freeDeliveryThreshold || subtotal === 0) ? 0 : window.PRINTSHUBB_DATA.deliveryPincodes.standardFee;
    }

    // GST (18% for Indian Printing & Stationery services)
    const gstTax = Math.round(discountedSubtotal * 0.18);
    const grandTotal = discountedSubtotal + gstTax + deliveryFee;

    return {
      subtotal,
      discountAmount,
      discountedSubtotal,
      deliveryFee,
      gstTax,
      grandTotal,
      couponCode: this.appliedCoupon,
      couponMessage,
      itemCount: this.items.length
    };
  }

  applyPromoCode(code) {
    const normalized = (code || '').trim().toUpperCase();
    const coupon = window.PRINTSHUBB_DATA.coupons[normalized];
    if (!coupon) {
      return { success: false, message: 'Invalid promo code. Try HUB5 or FIRST15' };
    }
    const subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
    if (subtotal < coupon.minOrder) {
      return { success: false, message: `Code ${normalized} requires min. order of ₹${coupon.minOrder.toLocaleString('en-IN')}` };
    }
    this.appliedCoupon = normalized;
    this.renderCartDrawer();
    return { success: true, message: `Promo code ${normalized} applied successfully!` };
  }

  // Check pincode for Same-Day delivery speed
  checkPincode(pincode) {
    const pinStr = (pincode || '').trim();
    this.deliveryPincode = pinStr;
    const sameDayPrefixes = window.PRINTSHUBB_DATA.deliveryPincodes.sameDayPincodes;
    const match = sameDayPrefixes.some(prefix => pinStr.startsWith(prefix));
    this.isSameDayEligible = match && pinStr.length === 6;
    return {
      pincode: pinStr,
      isSameDay: this.isSameDayEligible,
      city: pinStr.startsWith('400') ? 'Mumbai' : pinStr.startsWith('560') ? 'Bengaluru' : pinStr.startsWith('700') ? 'Kolkata' : 'All-India'
    };
  }

  // --- RENDER CART DRAWER ---
  renderCartDrawer() {
    const container = document.getElementById('cart-items-container');
    const summaryContainer = document.getElementById('cart-summary-container');
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="py-16 text-center text-slate-500">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
          <h4 class="font-display font-semibold text-slate-800 text-lg mb-1">Your cart is empty</h4>
          <p class="text-xs text-slate-500 max-w-xs mx-auto mb-5">Discover our custom visiting cards, apparel, and marketing merchandise.</p>
          <button onclick="window.appRouter.navigate('catalog')" class="btn-primary px-5 py-2 text-xs">Start Shopping</button>
        </div>
      `;
      if (summaryContainer) summaryContainer.classList.add('hidden');
      return;
    }

    if (summaryContainer) summaryContainer.classList.remove('hidden');

    const calcs = this.getCalculations();

    // Render items list
    let html = '';
    this.items.forEach(item => {
      html += `
        <div class="p-4 bg-white border border-slate-200 rounded-lg flex gap-3.5 relative group hover:border-slate-300 transition">
          <div class="w-20 h-20 bg-slate-50 border border-slate-200 rounded flex-shrink-0 flex items-center justify-center overflow-hidden p-1">
            <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-full object-contain rounded" />
          </div>
          <div class="flex-grow min-w-0">
            <div class="flex items-start justify-between gap-2 mb-1">
              <h4 class="font-bold text-xs text-[#0f172a] leading-snug truncate">${item.title}</h4>
              <button onclick="window.cartEngine.removeItem('${item.id}')" class="text-slate-400 hover:text-red-500 transition text-sm">
                ✕
              </button>
            </div>
            <div class="text-[11px] text-slate-500 space-y-0.5 mb-2 font-mono-spec">
              <div>Qty: <strong class="text-slate-800">${item.quantity}</strong> | ${item.paperStock}</div>
              <div>${item.corners} • ${item.finish}</div>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-mono-spec font-bold text-xs text-[#ea580c]">₹${item.totalPrice.toLocaleString('en-IN')}</span>
              <span class="text-[10px] text-slate-500 font-mono-spec">(₹${item.unitPrice}/unit)</span>
            </div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;

    // Render summary
    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <!-- Coupon input -->
        <div class="pt-3 border-t border-slate-200">
          <div class="flex gap-2 mb-2">
            <input type="text" id="cart-coupon-input" value="${calcs.couponCode || ''}" placeholder="Coupon code (e.g. HUB5)" class="flex-grow input-atelier text-xs px-3 uppercase font-mono-spec" />
            <button onclick="window.cartEngine.handleCouponApply()" class="btn-secondary px-3 text-xs font-semibold">Apply</button>
          </div>
          ${calcs.couponMessage ? `<p class="text-[11px] ${calcs.discountAmount > 0 ? 'text-emerald-600' : 'text-amber-600'} font-medium mb-3">${calcs.couponMessage}</p>` : ''}
        </div>

        <!-- Price breakdown -->
        <div class="space-y-1.5 text-xs text-slate-600 py-3 border-t border-slate-200 font-mono-spec">
          <div class="flex justify-between">
            <span>Items Subtotal:</span>
            <span class="font-semibold text-slate-900">₹${calcs.subtotal.toLocaleString('en-IN')}</span>
          </div>
          ${calcs.discountAmount > 0 ? `
            <div class="flex justify-between text-emerald-600 font-medium">
              <span>Coupon Discount:</span>
              <span>-₹${calcs.discountAmount.toLocaleString('en-IN')}</span>
            </div>
          ` : ''}
          <div class="flex justify-between">
            <span>GST (18% Invoiced):</span>
            <span class="font-semibold text-slate-900">₹${calcs.gstTax.toLocaleString('en-IN')}</span>
          </div>
          <div class="flex justify-between">
            <span>Delivery (${this.selectedDeliverySpeed === 'same-day' ? 'Same Day Express' : 'Standard'}):</span>
            <span class="font-semibold ${calcs.deliveryFee === 0 ? 'text-emerald-600' : 'text-slate-900'}">
              ${calcs.deliveryFee === 0 ? 'FREE' : '₹' + calcs.deliveryFee}
            </span>
          </div>
          <div class="flex justify-between text-sm font-bold text-[#0f172a] pt-2 border-t border-slate-200">
            <span>Grand Total:</span>
            <span class="text-[#ea580c] font-display text-base">₹${calcs.grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <button onclick="window.cartEngine.openCheckoutModal()" class="w-full btn-primary py-3 text-sm font-bold shadow-md flex items-center justify-center gap-2">
          <span>Proceed to Checkout</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </button>
      `;
    }
  }

  handleCouponApply() {
    const input = document.getElementById('cart-coupon-input');
    if (!input) return;
    const res = this.applyPromoCode(input.value);
    if (window.showToast) {
      window.showToast(res.message, res.success ? 'success' : 'warning');
    }
  }

  // --- CHECKOUT WIZARD ---
  openCheckoutModal() {
    if (this.items.length === 0) return;
    const modal = document.getElementById('checkout-modal');
    if (modal) {
      modal.classList.remove('hidden');
      this.activeCheckoutStep = 1;
      this.renderCheckoutStep(1);
    }
  }

  closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  renderCheckoutStep(step) {
    this.activeCheckoutStep = step;
    const stepContainer = document.getElementById('checkout-step-content');
    if (!stepContainer) return;

    // Update Stepper Indicator
    document.querySelectorAll('.checkout-step-indicator').forEach(el => {
      const s = parseInt(el.getAttribute('data-step'));
      if (s === step) {
        el.className = 'checkout-step-indicator px-3 py-1.5 rounded-full text-xs font-bold bg-[#ea580c] text-white flex items-center gap-1.5';
      } else if (s < step) {
        el.className = 'checkout-step-indicator px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1.5';
      } else {
        el.className = 'checkout-step-indicator px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500 flex items-center gap-1.5';
      }
    });

    const calcs = this.getCalculations();

    if (step === 1) {
      // Step 1: Shipping Address & GST
      stepContainer.innerHTML = `
        <form id="checkout-form-address" onsubmit="window.cartEngine.handleAddressSubmit(event)" class="space-y-4">
          <h3 class="font-display font-bold text-base text-[#0f172a] mb-2">1. Shipping & Tax Invoicing Address</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input type="text" id="co-name" required value="Arjun Sharma" class="w-full input-atelier px-3 text-xs" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (For Delivery SMS) *</label>
              <input type="tel" id="co-phone" required value="9820012345" class="w-full input-atelier px-3 text-xs" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Street Address / Suite / Building *</label>
            <input type="text" id="co-address" required value="Tower 4, Floor 8, BKC Commercial Complex" class="w-full input-atelier px-3 text-xs" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">City *</label>
              <input type="text" id="co-city" required value="Mumbai" class="w-full input-atelier px-3 text-xs" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">State *</label>
              <select id="co-state" class="w-full input-atelier px-3 text-xs">
                <option value="Maharashtra" selected>Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-700 mb-1">Pin Code *</label>
              <input type="text" id="co-pincode" onchange="window.cartEngine.handlePincodeChange(this.value)" required maxlength="6" value="${this.deliveryPincode}" class="w-full input-atelier px-3 text-xs font-mono-spec" />
            </div>
          </div>

          <!-- B2B GSTIN field for business tax invoice -->
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-md">
            <label class="block text-xs font-bold text-[#0f172a] mb-1">B2B GSTIN (Optional — For 18% Input Tax Credit)</label>
            <input type="text" id="co-gstin" placeholder="27AAAAA0000A1Z5" class="w-full input-atelier px-3 text-xs uppercase font-mono-spec" />
            <p class="text-[10px] text-slate-500 mt-1">Provide your business GSTIN to receive a formal tax invoice with your company name.</p>
          </div>

          <div class="flex justify-end pt-3">
            <button type="submit" class="btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-1.5">
              <span>Next: Delivery Speed</span>
              <span>→</span>
            </button>
          </div>
        </form>
      `;
    } else if (step === 2) {
      // Step 2: Delivery Speed
      const pinCheck = this.checkPincode(this.deliveryPincode);
      stepContainer.innerHTML = `
        <div class="space-y-4">
          <h3 class="font-display font-bold text-base text-[#0f172a] mb-1">2. Choose Delivery Method</h3>
          <p class="text-xs text-slate-600">Delivering to PIN: <strong class="font-mono-spec text-slate-800">${this.deliveryPincode}</strong> (${pinCheck.city})</p>

          <div class="space-y-3">
            <!-- Standard Delivery -->
            <label class="p-4 border ${this.selectedDeliverySpeed === 'standard' ? 'border-[#ea580c] bg-orange-50/20' : 'border-slate-200 bg-white'} rounded-lg flex items-start gap-3 cursor-pointer transition">
              <input type="radio" name="delivery-speed" value="standard" ${this.selectedDeliverySpeed === 'standard' ? 'checked' : ''} onchange="window.cartEngine.setDeliverySpeed('standard')" class="mt-1 text-[#ea580c] focus:ring-[#ea580c]" />
              <div class="flex-grow">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-bold text-xs text-[#0f172a]">Standard Insured Delivery</span>
                  <span class="font-mono-spec text-xs font-bold ${calcs.deliveryFee === 0 ? 'text-emerald-600' : 'text-slate-800'}">${calcs.subtotal >= 999 ? 'FREE' : '₹79'}</span>
                </div>
                <p class="text-xs text-slate-500">Estimated delivery within 3 to 5 business days across India.</p>
              </div>
            </label>

            <!-- Same Day Delivery (Conditional on Pincode) -->
            ${pinCheck.isSameDay ? `
              <label class="p-4 border ${this.selectedDeliverySpeed === 'same-day' ? 'border-[#ea580c] bg-orange-50/20' : 'border-slate-200 bg-white'} rounded-lg flex items-start gap-3 cursor-pointer transition">
                <input type="radio" name="delivery-speed" value="same-day" ${this.selectedDeliverySpeed === 'same-day' ? 'checked' : ''} onchange="window.cartEngine.setDeliverySpeed('same-day')" class="mt-1 text-[#ea580c] focus:ring-[#ea580c]" />
                <div class="flex-grow">
                  <div class="flex justify-between items-center mb-1">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-xs text-[#0f172a]">Same Day Express Priority</span>
                      <span class="badge-pill-accent">Eligible City</span>
                    </div>
                    <span class="font-mono-spec text-xs font-bold text-[#ea580c]">₹149</span>
                  </div>
                  <p class="text-xs text-slate-500">Delivered by 8:00 PM today via dedicated courier dispatch in ${pinCheck.city}. Note: Cash on Delivery is not supported for Same Day orders.</p>
                </div>
              </label>
            ` : `
              <div class="p-4 border border-dashed border-slate-300 rounded-lg bg-slate-50 text-slate-500 text-xs">
                <div class="font-semibold text-slate-700 mb-0.5">Same Day Delivery Not Available For ${this.deliveryPincode}</div>
                <div>Same Day Express is currently active for eligible PINs in Mumbai, Bengaluru, and Kolkata. Standard fast delivery applies.</div>
              </div>
            `}
          </div>

          <div class="flex justify-between pt-4 border-t border-slate-200">
            <button onclick="window.cartEngine.renderCheckoutStep(1)" class="btn-outline px-4 py-2 text-xs">← Back</button>
            <button onclick="window.cartEngine.renderCheckoutStep(3)" class="btn-primary px-6 py-2 text-xs font-bold">Next: Payment →</button>
          </div>
        </div>
      `;
    } else if (step === 3) {
      // Step 3: Payment Method
      const codEligible = calcs.grandTotal <= 5000 && this.selectedDeliverySpeed !== 'same-day';
      stepContainer.innerHTML = `
        <div class="space-y-4">
          <h3 class="font-display font-bold text-base text-[#0f172a] mb-1">3. Select Payment Method</h3>
          <p class="text-xs text-slate-600">Total Payable: <strong class="font-mono-spec text-[#ea580c] font-bold text-sm">₹${calcs.grandTotal.toLocaleString('en-IN')}</strong> (Incl. GST)</p>

          <div class="space-y-2.5">
            <!-- UPI -->
            <label class="p-3.5 border border-slate-200 rounded-lg flex items-center gap-3 cursor-pointer hover:border-slate-300 bg-white">
              <input type="radio" name="payment-method" value="upi" checked class="text-[#ea580c] focus:ring-[#ea580c]" />
              <div class="flex-grow">
                <div class="font-bold text-xs text-[#0f172a] flex items-center gap-2">
                  <span>Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                  <span class="badge-pill-accent">Zero Surcharge</span>
                </div>
                <div class="text-[11px] text-slate-500">Scan dynamic QR or enter your VPA @upi</div>
              </div>
            </label>

            <!-- Credit / Debit Cards -->
            <label class="p-3.5 border border-slate-200 rounded-lg flex items-center gap-3 cursor-pointer hover:border-slate-300 bg-white">
              <input type="radio" name="payment-method" value="card" class="text-[#ea580c] focus:ring-[#ea580c]" />
              <div class="flex-grow">
                <div class="font-bold text-xs text-[#0f172a]">Credit / Debit Card / NetBanking</div>
                <div class="text-[11px] text-slate-500">Visa, MasterCard, RuPay, Corporate Amex</div>
              </div>
            </label>

            <!-- Cash on Delivery -->
            <label class="p-3.5 border ${codEligible ? 'border-slate-200 bg-white cursor-pointer hover:border-slate-300' : 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'} rounded-lg flex items-center gap-3">
              <input type="radio" name="payment-method" value="cod" ${!codEligible ? 'disabled' : ''} class="text-[#ea580c] focus:ring-[#ea580c]" />
              <div class="flex-grow">
                <div class="font-bold text-xs text-[#0f172a] flex items-center gap-2">
                  <span>Cash on Delivery (COD)</span>
                  ${!codEligible ? '<span class="text-[10px] text-red-600 font-medium">(Not eligible for Same Day or Orders &gt; ₹5,000)</span>' : ''}
                </div>
                <div class="text-[11px] text-slate-500">Pay cash or UPI upon delivery verification</div>
              </div>
            </label>
          </div>

          <div class="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2 text-xs text-slate-600">
            <svg class="w-4 h-4 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <span>256-Bit SSL Encrypted Pre-Press Payment Gateway</span>
          </div>

          <div class="flex justify-between pt-4 border-t border-slate-200">
            <button onclick="window.cartEngine.renderCheckoutStep(2)" class="btn-outline px-4 py-2 text-xs">← Back</button>
            <button onclick="window.cartEngine.placeFinalOrder()" class="btn-primary px-8 py-2.5 text-xs font-bold shadow-md">Place Order Now (₹${calcs.grandTotal.toLocaleString('en-IN')})</button>
          </div>
        </div>
      `;
    }
  }

  handleAddressSubmit(e) {
    e.preventDefault();
    this.renderCheckoutStep(2);
  }

  handlePincodeChange(val) {
    this.checkPincode(val);
    if (this.activeCheckoutStep === 2) {
      this.renderCheckoutStep(2);
    }
  }

  setDeliverySpeed(speed) {
    this.selectedDeliverySpeed = speed;
    this.renderCartDrawer();
    if (this.activeCheckoutStep === 2) {
      this.renderCheckoutStep(2);
    }
  }

  // Final Order Placement
  placeFinalOrder() {
    const calcs = this.getCalculations();
    const orderId = 'PH-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const newOrder = {
      orderId,
      date: orderDate,
      items: [...this.items],
      calcs,
      deliverySpeed: this.selectedDeliverySpeed,
      pincode: this.deliveryPincode,
      status: 'Pre-Press Proofing', // Stepper: 'Pre-Press Proofing' -> 'In Production' -> 'Shipped' -> 'Delivered'
      trackingNumber: 'IN-EXP-' + Math.floor(10000000 + Math.random() * 90000000)
    };

    // Save order in history
    try {
      const existing = localStorage.getItem(this.ordersKey);
      const orders = existing ? JSON.parse(existing) : [];
      orders.unshift(newOrder);
      localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving order', e);
    }

    // Clear cart
    this.clearCart();

    // Render Order Confirmation Modal View
    const stepContainer = document.getElementById('checkout-step-content');
    if (stepContainer) {
      stepContainer.innerHTML = `
        <div class="text-center py-6 space-y-4">
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <div>
            <h2 class="font-display font-bold text-xl text-[#0f172a]">Order Successfully Placed!</h2>
            <p class="text-xs text-slate-600 mt-1">Thank you for choosing Printhubbs Atelier. Your custom artwork has entered automated pre-press color proofing.</p>
          </div>

          <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg text-left max-w-md mx-auto space-y-2 text-xs font-mono-spec">
            <div class="flex justify-between">
              <span class="text-slate-500">Order Reference:</span>
              <strong class="text-[#0f172a]">${orderId}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Estimated Dispatch:</span>
              <strong class="text-emerald-700">${this.selectedDeliverySpeed === 'same-day' ? 'Today by 8:00 PM' : '3 to 5 Business Days'}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Total Paid (GST 18%):</span>
              <strong class="text-[#ea580c]">₹${calcs.grandTotal.toLocaleString('en-IN')}</strong>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Tracking Number:</span>
              <span class="text-slate-700">${newOrder.trackingNumber}</span>
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-3 pt-2">
            <button onclick="window.print()" class="btn-outline px-4 py-2 text-xs flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              <span>Print Tax Invoice</span>
            </button>
            <button onclick="window.cartEngine.closeCheckoutModal(); window.appRouter.navigate('projects');" class="btn-secondary px-5 py-2 text-xs">
              View in My Orders
            </button>
            <button onclick="window.cartEngine.closeCheckoutModal(); window.appRouter.navigate('home');" class="btn-primary px-5 py-2 text-xs">
              Continue Shopping
            </button>
          </div>
        </div>
      `;
    }
  }
}

// Global instance
window.cartEngine = new CartAndCheckoutEngine();
