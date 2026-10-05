// ==========================================================================
// Printhubbs - Atelier Admin Console & Operations Engine
// Complete E-Commerce Management: Orders, Catalog, Proofing & Store Settings
// ==========================================================================

class AdminPanelEngine {
  constructor() {
    this.activeTab = 'overview';
    this.orderFilterStatus = 'all';
    this.orderSearchQuery = '';
    this.productSearchQuery = '';
    this.ordersKey = 'printhubbs_order_history';
    this.productsKey = 'printhubbs_custom_products';
    this.pincodesKey = 'printhubbs_delivery_pincodes';

    this.ensureSeedOrders();
    this.ensureCustomProducts();
  }

  // --- SEED REALISTIC ORDERS IF STORAGE IS EMPTY ---
  ensureSeedOrders() {
    try {
      const stored = localStorage.getItem(this.ordersKey);
      if (!stored || JSON.parse(stored).length === 0) {
        const seedOrders = [
          {
            orderId: 'PH-2026-894120',
            date: '4 Oct 2026',
            customerName: 'Rajesh Sharma',
            customerEmail: 'rajesh.sharma@apexdynamics.in',
            customerPhone: '+91 98201 12345',
            city: 'Mumbai',
            pincode: '400001',
            address: 'Suite 402, Trade Tower, Bandra Kurla Complex',
            deliverySpeed: 'same-day',
            status: 'In Production',
            trackingNumber: 'IN-BLU-9840124',
            courier: 'BlueDart Same-Day Express',
            paymentMethod: 'UPI (Google Pay)',
            calcs: { subtotal: 1450, discountAmount: 0, discountedSubtotal: 1450, deliveryFee: 0, gstTax: 261, grandTotal: 1711 },
            items: [
              {
                id: 'item_seed_1',
                productId: 'standard-visiting-cards',
                cardId: 'standard-visiting-cards',
                title: 'Standard Visiting Cards',
                thumbnail: 'assets/images/products/standard-visiting-cards.jpg',
                quantity: 250,
                paperStock: 'Velvet Touch Soft-Feel 450 GSM',
                corners: 'Standard 90° Square',
                finish: 'Raised Metallic Gold Foil',
                sides: 'Double-Sided Print',
                unitPrice: '5.80',
                totalPrice: 1450,
                matter: 'Rajesh Sharma | Managing Director\nApex Dynamics Private Limited\n+91 98201 12345 | rajesh@apexdynamics.in\nwww.apexdynamics.in | BKC, Mumbai 400051',
                isCustomized: true,
                proofApproved: true
              }
            ]
          },
          {
            orderId: 'PH-2026-781902',
            date: '5 Oct 2026',
            customerName: 'Pooja Hegde',
            customerEmail: 'pooja@studiosol.design',
            customerPhone: '+91 99120 44882',
            city: 'Bengaluru',
            pincode: '560001',
            address: '12th Cross, Indiranagar, 100ft Road',
            deliverySpeed: 'standard',
            status: 'Pre-Press Proofing',
            trackingNumber: 'IN-DEL-6523910',
            courier: 'Delhivery Surface Pro',
            paymentMethod: 'Credit Card (Visa Business)',
            calcs: { subtotal: 12500, discountAmount: 1250, discountedSubtotal: 11250, deliveryFee: 0, gstTax: 2025, grandTotal: 13275 },
            items: [
              {
                id: 'item_seed_2',
                productId: 'classic-polo-tshirts',
                cardId: 'classic-polo-tshirts',
                title: 'Custom Polo T-shirts',
                thumbnail: 'assets/images/products/polo-tshirts.jpg',
                quantity: 25,
                color: '#1a1a1a',
                size: 'Mixed (10 M, 10 L, 5 XL)',
                finish: 'Chest Left 3D Embroidery',
                unitPrice: '500.00',
                totalPrice: 12500,
                matter: 'Studio Sol Creative Atelier · Crew Merch',
                isCustomized: true,
                proofApproved: false
              }
            ]
          },
          {
            orderId: 'PH-2026-652391',
            date: '3 Oct 2026',
            customerName: 'Dr. Vikram Malhotra',
            customerEmail: 'dr.malhotra@careclinic.org',
            customerPhone: '+91 98450 88210',
            city: 'Bengaluru',
            pincode: '560034',
            address: 'Care Clinic Diagnostic Wing, Koramangala',
            deliverySpeed: 'standard',
            status: 'Shipped',
            trackingNumber: 'IN-DTD-8821940',
            courier: 'DTDC Air Cargo',
            paymentMethod: 'NetBanking (HDFC Bank)',
            calcs: { subtotal: 800, discountAmount: 0, discountedSubtotal: 800, deliveryFee: 50, gstTax: 144, grandTotal: 994 },
            items: [
              {
                id: 'item_seed_3',
                productId: 'care-clinic',
                cardId: 'care-clinic',
                title: 'Care Clinic Visiting Card',
                thumbnail: 'assets/images/templates/care-clinic.svg',
                quantity: 500,
                paperStock: 'Standard Matte 350 GSM',
                corners: 'Smooth Die-cut Rounded (6mm)',
                finish: 'Standard Smooth Finish',
                sides: 'Single-Sided Print',
                unitPrice: '1.60',
                totalPrice: 800,
                matter: 'Dr. Vikram Malhotra, M.D. (Cardiology)\nCare Clinic Diagnostic Center\nAppointments: +91 98450 88210\nsupport@careclinic.org | Koramangala, Bengaluru',
                isCustomized: true,
                proofApproved: true
              }
            ]
          },
          {
            orderId: 'PH-2026-512944',
            date: '1 Oct 2026',
            customerName: 'Ananya Verma',
            customerEmail: 'ananya@ecopackorganics.com',
            customerPhone: '+91 97410 33901',
            city: 'Kolkata',
            pincode: '700001',
            address: 'Park Street Business Center, 3rd Floor',
            deliverySpeed: 'standard',
            status: 'Delivered',
            trackingNumber: 'IN-BLU-4401829',
            courier: 'BlueDart Surface Express',
            paymentMethod: 'UPI (Paytm)',
            calcs: { subtotal: 2100, discountAmount: 210, discountedSubtotal: 1890, deliveryFee: 0, gstTax: 340, grandTotal: 2230 },
            items: [
              {
                id: 'item_seed_4',
                productId: 'custom-labels',
                cardId: 'custom-labels',
                title: 'Custom Labels & Packaging Roll',
                thumbnail: 'assets/images/products/custom-labels.jpg',
                quantity: 1000,
                paperStock: 'Waterproof Gloss Vinyl Matrix',
                corners: 'Die-cut Circle 50mm',
                finish: 'High Gloss UV Protection',
                sides: 'Single-Sided',
                unitPrice: '2.10',
                totalPrice: 2100,
                matter: 'EcoPack 100% Pure Cold-Pressed Virgin Oils · Net 500ml',
                isCustomized: true,
                proofApproved: true
              }
            ]
          },
          {
            orderId: 'PH-2026-440182',
            date: '5 Oct 2026',
            customerName: 'Karan Mehra',
            customerEmail: 'karan.m@dharmahotels.com',
            customerPhone: '+91 98110 55201',
            city: 'New Delhi',
            pincode: '110001',
            address: 'Connaught Place Outer Circle, Block F',
            deliverySpeed: 'same-day',
            status: 'Pre-Press Proofing',
            trackingNumber: 'IN-DEL-3391024',
            courier: 'Delhivery Same-Day Courier',
            paymentMethod: 'Corporate Card',
            calcs: { subtotal: 1800, discountAmount: 0, discountedSubtotal: 1800, deliveryFee: 0, gstTax: 324, grandTotal: 2124 },
            items: [
              {
                id: 'item_seed_5',
                productId: 'self-inking-stamps',
                cardId: 'self-inking-stamps',
                title: 'Self Inking Stamps (Oval Seal)',
                thumbnail: 'assets/images/products/self-inking-stamps.jpg',
                quantity: 4,
                finish: 'Heavy-Duty Brass Core with Date Dial',
                color: 'Deep Violet Ink',
                unitPrice: '450.00',
                totalPrice: 1800,
                matter: 'Dharma Hospitality Private Limited · Delhi North · Inward Goods Inspection',
                isCustomized: true,
                proofApproved: false
              }
            ]
          }
        ];
        localStorage.setItem(this.ordersKey, JSON.stringify(seedOrders));
      }
    } catch (e) {
      console.error('Error seeding admin orders:', e);
    }
  }

  // --- ENSURE PERSISTED CUSTOM PRODUCTS ARE LOADED INTO CATALOG ---
  ensureCustomProducts() {
    try {
      const stored = localStorage.getItem(this.productsKey);
      if (stored) {
        const customProducts = JSON.parse(stored);
        customProducts.forEach(cp => {
          if (!window.PRINTSHUBB_DATA.products.some(p => p.id === cp.id)) {
            window.PRINTSHUBB_DATA.products.unshift(cp);
          }
        });
      }
    } catch (e) {
      console.error('Error loading custom products:', e);
    }
  }

  // --- DATA ACCESSORS ---
  getOrders() {
    try {
      const stored = localStorage.getItem(this.ordersKey);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveOrders(orders) {
    try {
      localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  }

  // --- ORDER MANAGEMENT ACTIONS ---
  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;
    order.status = newStatus;
    this.saveOrders(orders);
    this.render();
    if (typeof window.showToast === 'function') {
      window.showToast(`Order #${orderId} status updated to: ${newStatus}`, 'success');
    }
  }

  deleteOrder(orderId) {
    if (!confirm(`Are you sure you want to permanently delete Order #${orderId}?`)) return;
    let orders = this.getOrders();
    orders = orders.filter(o => o.orderId !== orderId);
    this.saveOrders(orders);
    this.render();
    if (typeof window.showToast === 'function') {
      window.showToast(`Order #${orderId} deleted successfully.`, 'info');
    }
  }

  approveProof(orderId, itemId) {
    const orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;
    const item = order.items.find(i => i.id === itemId) || order.items[0];
    if (item) {
      item.proofApproved = true;
      if (order.status === 'Pre-Press Proofing') {
        order.status = 'In Production';
      }
      this.saveOrders(orders);
      this.render();
      if (typeof window.showToast === 'function') {
        window.showToast(`Proof approved for ${orderId}! Sent to Production Queue.`, 'success');
      }
    }
  }

  // --- EXPORT ORDERS TO CSV ---
  exportOrdersCSV() {
    const orders = this.getOrders();
    if (orders.length === 0) {
      if (typeof window.showToast === 'function') window.showToast('No orders to export.', 'info');
      return;
    }

    const headers = ['Order ID', 'Date', 'Customer Name', 'Email', 'Phone', 'City', 'Pincode', 'Items', 'Total (INR)', 'Payment', 'Status', 'Courier', 'Tracking No'];
    const rows = orders.map(o => {
      const itemsDesc = (o.items || []).map(i => `${i.title} (x${i.quantity})`).join('; ');
      return [
        o.orderId,
        o.date,
        o.customerName || 'Store Customer',
        o.customerEmail || 'N/A',
        o.customerPhone || 'N/A',
        o.city || 'N/A',
        o.pincode || o.deliveryPincode || '400001',
        `"${itemsDesc.replace(/"/g, '""')}"`,
        (o.calcs ? o.calcs.grandTotal : 0),
        o.paymentMethod || 'Online',
        o.status || 'Received',
        o.courier || 'BlueDart',
        o.trackingNumber || 'N/A'
      ];
    });

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `printhubbs_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (typeof window.showToast === 'function') {
      window.showToast(`Exported ${orders.length} orders to CSV successfully!`, 'success');
    }
  }

  // --- PRODUCT MANAGEMENT ---
  openAddProductModal() {
    const modalEl = document.getElementById('admin-product-modal');
    if (!modalEl) return;
    document.getElementById('admin-modal-title').textContent = 'Add New Product to Atelier Catalog';
    document.getElementById('admin-prod-form').reset();
    document.getElementById('admin-prod-id').value = '';
    modalEl.classList.remove('hidden');
  }

  openEditProductModal(productId) {
    const product = window.PRINTSHUBB_DATA.products.find(p => p.id === productId);
    if (!product) return;
    const modalEl = document.getElementById('admin-product-modal');
    if (!modalEl) return;

    document.getElementById('admin-modal-title').textContent = `Edit Product: ${product.name}`;
    document.getElementById('admin-prod-id').value = product.id;
    document.getElementById('admin-prod-name').value = product.name;
    document.getElementById('admin-prod-fullname').value = product.fullName || product.name;
    document.getElementById('admin-prod-price').value = product.basePrice || 200;
    document.getElementById('admin-prod-pill').value = product.pricePill || `BUY 100 @ Rs.${product.basePrice}`;
    document.getElementById('admin-prod-dims').value = product.dimensions || '8.9 cm × 5.1 cm';
    document.getElementById('admin-prod-subtitle').value = product.subtitle || '';
    document.getElementById('admin-prod-image').value = product.image || '';
    document.getElementById('admin-prod-popular').checked = !!product.popular;

    modalEl.classList.remove('hidden');
  }

  saveProductForm(e) {
    e.preventDefault();
    const idVal = document.getElementById('admin-prod-id').value.trim();
    const nameVal = document.getElementById('admin-prod-name').value.trim();
    const fullNameVal = document.getElementById('admin-prod-fullname').value.trim() || nameVal;
    const priceVal = parseFloat(document.getElementById('admin-prod-price').value) || 200;
    const pillVal = document.getElementById('admin-prod-pill').value.trim() || `BUY 100 @ Rs.${priceVal}`;
    const dimsVal = document.getElementById('admin-prod-dims').value.trim() || 'Custom Dimensions';
    const subtitleVal = document.getElementById('admin-prod-subtitle').value.trim();
    const imageVal = document.getElementById('admin-prod-image').value.trim() || 'assets/images/products/standard-visiting-cards.jpg';
    const popularVal = document.getElementById('admin-prod-popular').checked;

    if (!nameVal) {
      alert('Product Name is required.');
      return;
    }

    if (idVal) {
      // Edit existing product
      const product = window.PRINTSHUBB_DATA.products.find(p => p.id === idVal);
      if (product) {
        product.name = nameVal;
        product.fullName = fullNameVal;
        product.basePrice = priceVal;
        product.pricePill = pillVal;
        product.dimensions = dimsVal;
        product.subtitle = subtitleVal;
        product.image = imageVal;
        product.popular = popularVal;
      }
      if (typeof window.showToast === 'function') window.showToast(`Updated product: ${nameVal}`, 'success');
    } else {
      // Create new product
      const newId = 'prod-' + Date.now();
      const newProduct = {
        id: newId,
        name: nameVal,
        fullName: fullNameVal,
        category: 'visiting-cards',
        categoryLabel: 'Custom Print & Cards',
        subtitle: subtitleVal,
        basePrice: priceVal,
        pricePill: pillVal,
        priceRange: `100 from ₹${priceVal}.00`,
        pricePerUnit: `(₹${(priceVal/100).toFixed(2)} each)`,
        rating: 4.8,
        reviewCount: 1,
        image: imageVal,
        dimensions: dimsVal,
        customizable: true,
        popular: popularVal,
        quantities: [
          { qty: 100, price: priceVal, perUnit: (priceVal/100).toFixed(2), popular: true },
          { qty: 250, price: Math.round(priceVal * 2.2), perUnit: (priceVal * 2.2 / 250).toFixed(2), discount: '10% OFF' },
          { qty: 500, price: Math.round(priceVal * 4.0), perUnit: (priceVal * 4.0 / 500).toFixed(2), discount: '20% OFF' }
        ]
      };
      window.PRINTSHUBB_DATA.products.unshift(newProduct);

      // Persist new product
      try {
        const stored = localStorage.getItem(this.productsKey);
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newProduct);
        localStorage.setItem(this.productsKey, JSON.stringify(list));
      } catch (err) {}

      if (typeof window.showToast === 'function') window.showToast(`Added new product: ${nameVal}`, 'success');
    }

    document.getElementById('admin-product-modal').classList.add('hidden');
    this.render();
  }

  deleteProduct(productId) {
    if (!confirm('Are you sure you want to remove this product from the live catalog?')) return;
    window.PRINTSHUBB_DATA.products = window.PRINTSHUBB_DATA.products.filter(p => p.id !== productId);
    try {
      const stored = localStorage.getItem(this.productsKey);
      if (stored) {
        let list = JSON.parse(stored);
        list = list.filter(p => p.id !== productId);
        localStorage.setItem(this.productsKey, JSON.stringify(list));
      }
    } catch (e) {}
    this.render();
    if (typeof window.showToast === 'function') window.showToast('Product removed from catalog.', 'info');
  }

  // --- ORDER DETAIL MODAL & PACKING SLIP ---
  openOrderDetailModal(orderId) {
    const orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;

    const modalEl = document.getElementById('admin-order-modal');
    const contentEl = document.getElementById('admin-order-modal-content');
    if (!modalEl || !contentEl) return;

    const itemsHtml = (order.items || []).map((item, idx) => `
      <div class="p-3.5 bg-[#f9f9f9] border border-[#d9d9d9] rounded-lg flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="${item.thumbnail || 'assets/images/products/standard-visiting-cards.jpg'}" class="w-14 h-14 object-contain rounded border border-[#d9d9d9] bg-white p-1" />
          <div>
            <h4 class="font-bold text-xs sm:text-sm text-black">${item.title}</h4>
            <div class="text-[11px] text-[#595959] space-y-0.5">
              ${item.paperStock ? `<div><strong>Stock:</strong> ${item.paperStock}</div>` : ''}
              ${item.finish ? `<div><strong>Finish:</strong> ${item.finish}</div>` : ''}
              ${item.corners ? `<div><strong>Corners:</strong> ${item.corners}</div>` : ''}
              ${item.sides ? `<div><strong>Sides:</strong> ${item.sides}</div>` : ''}
              ${item.color ? `<div><strong>Color/Size:</strong> ${item.color} ${item.size ? '· ' + item.size : ''}</div>` : ''}
            </div>
          </div>
        </div>
        <div class="text-right flex-shrink-0 self-end sm:self-center">
          <div class="text-xs font-bold text-black">Qty: ${item.quantity}</div>
          <div class="text-xs font-bold text-black">₹${(item.totalPrice || 0).toLocaleString('en-IN')}</div>
          ${item.proofApproved 
            ? `<span class="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">✓ Proof Verified</span>`
            : `<button onclick="window.adminEngine.approveProof('${order.orderId}', '${item.id}')" class="mt-1 px-2.5 py-1 bg-black text-white hover:bg-neutral-800 text-[10px] font-bold rounded transition">Approve Proof</button>`
          }
        </div>
      </div>
      ${item.matter ? `
        <div class="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs">
          <div class="font-bold text-amber-900 flex items-center justify-between mb-1">
            <span>Customer Card Matter / Text Submission:</span>
            <span class="text-[10px] font-mono-spec text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Pre-Press Review</span>
          </div>
          <pre class="font-mono-spec text-slate-800 text-[11px] whitespace-pre-wrap leading-relaxed">${item.matter}</pre>
        </div>
      ` : ''}
    `).join('');

    contentEl.innerHTML = `
      <div class="space-y-5">
        <!-- Order Header Bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#e6e6e6]">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-[#595959]">Order Dossier</span>
            <h2 class="text-xl font-bold font-display text-black flex items-center gap-2">
              <span>${order.orderId}</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold ${
                order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                order.status === 'Shipped' ? 'bg-sky-100 text-sky-800' :
                order.status === 'In Production' ? 'bg-purple-100 text-purple-800' :
                'bg-amber-100 text-amber-800'
              }">${order.status}</span>
            </h2>
            <p class="text-xs text-[#595959]">Placed on ${order.date} · Delivery Speed: <strong class="text-black uppercase">${order.deliverySpeed || 'Standard'}</strong></p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="window.adminEngine.printJobTicket('${order.orderId}')" class="px-3 py-1.5 border border-black bg-white hover:bg-black hover:text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              <span>Print Slip</span>
            </button>
            <div class="flex items-center gap-1.5">
              <label class="text-xs font-bold text-[#595959]">Status:</label>
              <select onchange="window.adminEngine.updateOrderStatus('${order.orderId}', this.value); window.adminEngine.openOrderDetailModal('${order.orderId}')" class="text-xs font-bold border border-black rounded-lg px-2.5 py-1.5 bg-white cursor-pointer outline-none shadow-sm">
                <option value="Pre-Press Proofing" ${order.status === 'Pre-Press Proofing' ? 'selected' : ''}>Pre-Press Proofing</option>
                <option value="In Production" ${order.status === 'In Production' ? 'selected' : ''}>In Production</option>
                <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Customer & Dispatch Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-4 bg-white border border-[#d9d9d9] rounded-lg space-y-1.5 shadow-sm">
            <div class="font-bold text-black uppercase tracking-wider text-[11px] mb-2 border-b border-[#f3f3f3] pb-1 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Customer Contact Info
            </div>
            <div><span class="text-[#595959]">Recipient:</span> <strong class="text-black">${order.customerName || 'Storefront Guest'}</strong></div>
            <div><span class="text-[#595959]">Email:</span> <a href="mailto:${order.customerEmail || ''}" class="text-black font-semibold hover:underline">${order.customerEmail || 'customer@printhubbs.in'}</a></div>
            <div><span class="text-[#595959]">Phone:</span> <strong class="text-black">${order.customerPhone || '+91 98200 00000'}</strong></div>
            <div><span class="text-[#595959]">Payment:</span> <span class="badge-pill-neutral">${order.paymentMethod || 'Prepaid UPI'}</span></div>
          </div>

          <div class="p-4 bg-white border border-[#d9d9d9] rounded-lg space-y-1.5 shadow-sm">
            <div class="font-bold text-black uppercase tracking-wider text-[11px] mb-2 border-b border-[#f3f3f3] pb-1 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
              Shipping & Courier Logistics
            </div>
            <div><span class="text-[#595959]">Delivery Pincode:</span> <strong class="text-black font-mono-spec">${order.pincode || order.deliveryPincode || '400001'}</strong> (${order.city || 'Mumbai'})</div>
            <div><span class="text-[#595959]">Street Address:</span> <span class="text-black">${order.address || 'Standard Registered Courier Address'}</span></div>
            <div><span class="text-[#595959]">Courier Partner:</span> <strong class="text-black">${order.courier || 'BlueDart Express'}</strong></div>
            <div><span class="text-[#595959]">Tracking AWB:</span> <code class="font-mono-spec bg-[#f3f3f3] px-1.5 py-0.5 rounded text-black font-bold">${order.trackingNumber || 'IN-EXP-' + Math.floor(1000000 + Math.random() * 9000000)}</code></div>
          </div>
        </div>

        <!-- Items & Print Specifications -->
        <div>
          <h3 class="text-xs font-bold text-black uppercase tracking-wider mb-2.5">Custom Print Items (${(order.items || []).length})</h3>
          <div class="space-y-3">
            ${itemsHtml}
          </div>
        </div>

        <!-- Financial Summary -->
        <div class="p-4 bg-[#f3f3f3] border border-[#d9d9d9] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>
            <span class="text-[#595959]">Total Bill Amount with 18% GST:</span>
            <div class="text-xl font-bold font-display text-black">₹${(order.calcs ? order.calcs.grandTotal : 0).toLocaleString('en-IN')}</div>
          </div>
          <div class="text-[11px] text-[#595959] text-right">
            <div>Subtotal: ₹${(order.calcs ? order.calcs.subtotal : 0).toLocaleString('en-IN')}</div>
            <div>GST (18%): ₹${(order.calcs ? order.calcs.gstTax : 0).toLocaleString('en-IN')}</div>
            <div>Shipping: ${order.calcs && order.calcs.deliveryFee > 0 ? '₹' + order.calcs.deliveryFee : 'FREE'}</div>
          </div>
        </div>
      </div>
    `;

    modalEl.classList.remove('hidden');
  }

  printJobTicket(orderId) {
    const orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return;

    const printWin = window.open('', '_blank', 'width=750,height=800');
    if (!printWin) {
      alert('Please allow popups to print job tickets.');
      return;
    }

    const itemsRows = (order.items || []).map(i => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;"><strong>${i.title}</strong><br><small style="color: #666;">${i.paperStock || ''} | ${i.finish || ''} | ${i.corners || ''}</small></td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${i.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${(i.totalPrice || 0).toLocaleString('en-IN')}</td>
      </tr>
      ${i.matter ? `
        <tr>
          <td colspan="3" style="padding: 8px; border: 1px solid #ddd; background: #fafafa;">
            <strong>Pre-Press Matter:</strong><br>
            <pre style="margin: 4px 0 0 0; font-family: monospace; font-size: 11px;">${i.matter}</pre>
          </td>
        </tr>
      ` : ''}
    `).join('');

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Job Slip #${order.orderId} - Printhubbs Atelier</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 13px; color: #111; margin: 30px; }
          .header { border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
          h1 { margin: 0; font-size: 22px; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th { background: #000; color: #fff; padding: 8px; text-align: left; font-size: 12px; }
          .box { border: 1px solid #ccc; padding: 12px; border-radius: 6px; margin-bottom: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>PRINTHUBBS ATELIER</h1>
            <div>Pre-Press Production Job Slip & Shipping Manifest</div>
          </div>
          <div style="text-align: right;">
            <strong>Order Reference: ${order.orderId}</strong><br>
            Date: ${order.date}
          </div>
        </div>

        <div style="display: flex; gap: 20px;">
          <div class="box" style="flex: 1;">
            <strong>Customer & Delivery Info:</strong><br>
            Name: ${order.customerName || 'Store Customer'}<br>
            Phone: ${order.customerPhone || 'N/A'}<br>
            Address: ${order.address || 'N/A'}<br>
            City/PIN: ${order.city || 'Mumbai'} - ${order.pincode || '400001'}
          </div>
          <div class="box" style="flex: 1;">
            <strong>Production Dispatch:</strong><br>
            Speed: <strong>${(order.deliverySpeed || 'Standard').toUpperCase()}</strong><br>
            Status: ${order.status}<br>
            Courier: ${order.courier || 'BlueDart'}<br>
            Tracking: ${order.trackingNumber || 'N/A'}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item & Print Specifications</th>
              <th style="text-align: center; width: 80px;">Qty</th>
              <th style="text-align: right; width: 110px;">Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
          <tfoot>
            <tr>
              <th colspan="2" style="background: #f3f3f3; color: #000; text-align: right;">Grand Total (incl. 18% GST):</th>
              <th style="background: #000; color: #fff; text-align: right;">₹${(order.calcs ? order.calcs.grandTotal : 0).toLocaleString('en-IN')}</th>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 40px; border-top: 1px dashed #999; padding-top: 15px; font-size: 11px; color: #555; text-align: center;">
          Printhubbs Custom Printing Atelier · 100% Print-Accuracy Verified · 300 DPI Pre-Press Certified
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  }

  // --- PINCODE & STORE SETTINGS ---
  addPincode() {
    const input = document.getElementById('admin-new-pincode');
    if (!input) return;
    const pin = input.value.trim();
    if (!pin || pin.length !== 6 || !/^\d+$/.test(pin)) {
      alert('Please enter a valid 6-digit Indian Postal PIN code.');
      return;
    }
    if (!window.PRINTSHUBB_DATA.deliveryPincodes.sameDayPincodes.includes(pin)) {
      window.PRINTSHUBB_DATA.deliveryPincodes.sameDayPincodes.push(pin);
      try {
        localStorage.setItem(this.pincodesKey, JSON.stringify(window.PRINTSHUBB_DATA.deliveryPincodes.sameDayPincodes));
      } catch (e) {}
      input.value = '';
      this.render();
      if (typeof window.showToast === 'function') window.showToast(`Pincode ${pin} enabled for Same-Day Delivery!`, 'success');
    } else {
      alert('Pincode is already registered.');
    }
  }

  removePincode(pin) {
    window.PRINTSHUBB_DATA.deliveryPincodes.sameDayPincodes = window.PRINTSHUBB_DATA.deliveryPincodes.sameDayPincodes.filter(p => p !== pin);
    try {
      localStorage.setItem(this.pincodesKey, JSON.stringify(window.PRINTSHUBB_DATA.deliveryPincodes.sameDayPincodes));
    } catch (e) {}
    this.render();
    if (typeof window.showToast === 'function') window.showToast(`Pincode ${pin} removed.`, 'info');
  }

  resetDemoData() {
    if (!confirm('Reset all demo orders to default state? This will restore 5 realistic seeded orders.')) return;
    localStorage.removeItem(this.ordersKey);
    this.ensureSeedOrders();
    this.render();
    if (typeof window.showToast === 'function') window.showToast('Demo store data reset to clean initial state.', 'success');
  }

  // --- TAB SWITCHER ---
  switchTab(tabName) {
    this.activeTab = tabName;
    this.render();
  }

  // --- RENDER MAIN ADMIN VIEW ---
  render() {
    const container = document.getElementById('view-admin');
    if (!container) return;

    const orders = this.getOrders();
    const products = window.PRINTSHUBB_DATA.products || [];

    // KPI Calculations
    const totalRevenue = orders.reduce((sum, o) => sum + (o.calcs ? o.calcs.grandTotal : 0), 0);
    const totalOrdersCount = orders.length;
    const pendingProofCount = orders.filter(o => o.status === 'Pre-Press Proofing').length;
    const inProductionCount = orders.filter(o => o.status === 'In Production').length;
    const shippedCount = orders.filter(o => o.status === 'Shipped').length;
    const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

    // Filter orders
    let filteredOrders = orders;
    if (this.orderFilterStatus !== 'all') {
      filteredOrders = filteredOrders.filter(o => o.status === this.orderFilterStatus);
    }
    if (this.orderSearchQuery.trim()) {
      const q = this.orderSearchQuery.toLowerCase();
      filteredOrders = filteredOrders.filter(o => 
        o.orderId.toLowerCase().includes(q) ||
        (o.customerName && o.customerName.toLowerCase().includes(q)) ||
        (o.city && o.city.toLowerCase().includes(q)) ||
        (o.items && o.items.some(i => i.title.toLowerCase().includes(q)))
      );
    }

    // Filter products
    let filteredProducts = products;
    if (this.productSearchQuery.trim()) {
      const q = this.productSearchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.fullName && p.fullName.toLowerCase().includes(q)) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q))
      );
    }

    container.innerHTML = `
      <!-- Admin Top Banner & Status Bar -->
      <div class="bg-black text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-neutral-800">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              Atelier Pre-Press Engine Active
            </span>
            <span class="text-xs text-neutral-400">· 300 DPI Automated Proofing</span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">Printhubbs Admin Console</h1>
          <p class="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            Live operations, print queue management, customer matter inspection, order fulfillment, and catalog atelier.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <button onclick="window.adminEngine.openAddProductModal()" class="px-4 py-2 bg-white text-black hover:bg-neutral-100 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm">
            <svg class="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            <span>+ Add Product</span>
          </button>
          <button onclick="window.adminEngine.exportOrdersCSV()" class="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm">
            <svg class="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            <span>Export CSV</span>
          </button>
          <button onclick="window.appRouter.navigate('home')" class="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm">
            <svg class="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            <span>Storefront</span>
          </button>
        </div>
      </div>

      <!-- Admin Tab Navigation -->
      <div class="border-b border-[#e6e6e6] flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
        <button onclick="window.adminEngine.switchTab('overview')" class="py-3 px-3 sm:px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
          this.activeTab === 'overview' ? 'border-black text-black font-extrabold' : 'border-transparent text-[#595959] hover:text-black'
        }">
          <span>📊</span>
          <span>Overview & KPIs</span>
        </button>
        <button onclick="window.adminEngine.switchTab('orders')" class="py-3 px-3 sm:px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
          this.activeTab === 'orders' ? 'border-black text-black font-extrabold' : 'border-transparent text-[#595959] hover:text-black'
        }">
          <span>📦</span>
          <span>Orders Management</span>
          <span class="px-1.5 py-0.5 rounded-full text-[10px] ${pendingProofCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-neutral-100 text-neutral-700'}">${totalOrdersCount}</span>
        </button>
        <button onclick="window.adminEngine.switchTab('products')" class="py-3 px-3 sm:px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
          this.activeTab === 'products' ? 'border-black text-black font-extrabold' : 'border-transparent text-[#595959] hover:text-black'
        }">
          <span>🏷️</span>
          <span>Catalog Products</span>
          <span class="px-1.5 py-0.5 rounded-full text-[10px] bg-neutral-100 text-neutral-700">${products.length}</span>
        </button>
        <button onclick="window.adminEngine.switchTab('proofs')" class="py-3 px-3 sm:px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
          this.activeTab === 'proofs' ? 'border-black text-black font-extrabold' : 'border-transparent text-[#595959] hover:text-black'
        }">
          <span>🔍</span>
          <span>Pre-Press Proofs Queue</span>
          ${pendingProofCount > 0 ? `<span class="px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold animate-pulse">${pendingProofCount} pending</span>` : ''}
        </button>
        <button onclick="window.adminEngine.switchTab('settings')" class="py-3 px-3 sm:px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
          this.activeTab === 'settings' ? 'border-black text-black font-extrabold' : 'border-transparent text-[#595959] hover:text-black'
        }">
          <span>⚙️</span>
          <span>Store & Pincodes</span>
        </button>
      </div>

      <!-- TAB 1: OVERVIEW -->
      ${this.activeTab === 'overview' ? `
        <div class="space-y-6">
          <!-- 4 Main KPI Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="p-5 bg-white border border-[#d9d9d9] rounded-xl shadow-sm space-y-2">
              <div class="flex items-center justify-between text-[#595959] text-xs font-bold uppercase tracking-wider">
                <span>Total Revenue (GST 18%)</span>
                <span class="text-emerald-600 font-bold">+16.4%</span>
              </div>
              <div class="text-2xl sm:text-3xl font-bold font-display text-black">₹${totalRevenue.toLocaleString('en-IN')}</div>
              <p class="text-[11px] text-[#595959]">Live GMV processed through storefront checkout</p>
            </div>

            <div class="p-5 bg-white border border-[#d9d9d9] rounded-xl shadow-sm space-y-2">
              <div class="flex items-center justify-between text-[#595959] text-xs font-bold uppercase tracking-wider">
                <span>Total Orders Placed</span>
                <span class="text-indigo-600 font-bold">${orders.length} total</span>
              </div>
              <div class="text-2xl sm:text-3xl font-bold font-display text-black">${totalOrdersCount}</div>
              <p class="text-[11px] text-[#595959]">${pendingProofCount} awaiting pre-press review</p>
            </div>

            <div class="p-5 bg-white border border-[#d9d9d9] rounded-xl shadow-sm space-y-2">
              <div class="flex items-center justify-between text-[#595959] text-xs font-bold uppercase tracking-wider">
                <span>Active Products</span>
                <span class="text-black font-bold">In Stock</span>
              </div>
              <div class="text-2xl sm:text-3xl font-bold font-display text-black">${products.length}</div>
              <p class="text-[11px] text-[#595959]">Direct cards, apparel, merch & packaging</p>
            </div>

            <div class="p-5 bg-white border border-[#d9d9d9] rounded-xl shadow-sm space-y-2">
              <div class="flex items-center justify-between text-[#595959] text-xs font-bold uppercase tracking-wider">
                <span>Print Velocity</span>
                <span class="text-emerald-600 font-bold">99.4% DPI</span>
              </div>
              <div class="text-2xl sm:text-3xl font-bold font-display text-black">${deliveredCount} Delivered</div>
              <p class="text-[11px] text-[#595959]">${inProductionCount + shippedCount} active jobs in production pipeline</p>
            </div>
          </div>

          <!-- Production Pipeline Progression Bar -->
          <div class="p-6 bg-white border border-[#d9d9d9] rounded-xl shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold font-display text-black uppercase tracking-wider">Live Production Pipeline</h3>
              <span class="text-xs text-[#595959]">Automated Offset & Digital Workflows</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div class="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <span class="text-[10px] font-bold uppercase text-amber-800">1. Pre-Press Proof</span>
                <div class="text-xl font-bold text-amber-900 mt-0.5">${pendingProofCount}</div>
              </div>
              <div class="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <span class="text-[10px] font-bold uppercase text-purple-800">2. Printing Press</span>
                <div class="text-xl font-bold text-purple-900 mt-0.5">${inProductionCount}</div>
              </div>
              <div class="p-3 bg-sky-50 border border-sky-200 rounded-lg">
                <span class="text-[10px] font-bold uppercase text-sky-800">3. Out with Courier</span>
                <div class="text-xl font-bold text-sky-900 mt-0.5">${shippedCount}</div>
              </div>
              <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span class="text-[10px] font-bold uppercase text-emerald-800">4. Delivered</span>
                <div class="text-xl font-bold text-emerald-900 mt-0.5">${deliveredCount}</div>
              </div>
            </div>
          </div>

          <!-- Recent Orders Section -->
          <div class="bg-white border border-[#d9d9d9] rounded-xl shadow-sm overflow-hidden">
            <div class="p-4 sm:p-5 border-b border-[#e6e6e6] flex items-center justify-between">
              <div>
                <h3 class="font-bold font-display text-sm sm:text-base text-black">Recent Orders</h3>
                <p class="text-xs text-[#595959]">Latest orders placed across visiting cards, apparel, and corporate merch</p>
              </div>
              <button onclick="window.adminEngine.switchTab('orders')" class="text-xs font-bold text-black underline underline-offset-2">View All Orders →</button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-[#f3f3f3] text-[#595959] uppercase font-bold text-[10px] border-b border-[#d9d9d9]">
                  <tr>
                    <th class="p-3.5">Order ID</th>
                    <th class="p-3.5">Date</th>
                    <th class="p-3.5">Customer</th>
                    <th class="p-3.5">Products</th>
                    <th class="p-3.5">Total</th>
                    <th class="p-3.5">Status</th>
                    <th class="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#e6e6e6]">
                  ${orders.slice(0, 5).map(o => `
                    <tr class="hover:bg-[#f9f9f9] transition">
                      <td class="p-3.5 font-bold font-mono-spec text-black">${o.orderId}</td>
                      <td class="p-3.5 text-[#595959]">${o.date}</td>
                      <td class="p-3.5">
                        <div class="font-bold text-black">${o.customerName || 'Customer'}</div>
                        <div class="text-[10px] text-[#595959]">${o.city || 'Mumbai'} (${o.pincode || '400001'})</div>
                      </td>
                      <td class="p-3.5">
                        <div class="font-medium text-black line-clamp-1">${(o.items || []).map(i => i.title).join(', ')}</div>
                        <div class="text-[10px] text-[#595959]">${(o.items || []).reduce((acc, i) => acc + i.quantity, 0)} units total</div>
                      </td>
                      <td class="p-3.5 font-bold text-black">₹${(o.calcs ? o.calcs.grandTotal : 0).toLocaleString('en-IN')}</td>
                      <td class="p-3.5">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                          o.status === 'Shipped' ? 'bg-sky-100 text-sky-800' :
                          o.status === 'In Production' ? 'bg-purple-100 text-purple-800' :
                          'bg-amber-100 text-amber-800'
                        }">${o.status}</span>
                      </td>
                      <td class="p-3.5 text-right">
                        <button onclick="window.adminEngine.openOrderDetailModal('${o.orderId}')" class="px-2.5 py-1 bg-[#f3f3f3] hover:bg-black hover:text-white rounded border border-[#d9d9d9] font-bold text-[11px] transition">Inspect</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- TAB 2: ORDERS MANAGEMENT -->
      ${this.activeTab === 'orders' ? `
        <div class="space-y-4">
          <!-- Search & Filter Bar -->
          <div class="p-4 bg-white border border-[#d9d9d9] rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <!-- Search Input -->
            <div class="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search by Order ID, customer, product..." 
                value="${this.orderSearchQuery}" 
                oninput="window.adminEngine.orderSearchQuery = this.value; window.adminEngine.render();"
                class="w-full pl-9 pr-4 py-2 border border-[#d9d9d9] rounded-lg text-xs outline-none focus:border-black transition"
              />
              <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#595959]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            <!-- Status Filter Tabs -->
            <div class="flex flex-wrap items-center gap-1.5 w-full md:w-auto text-xs">
              ${['all', 'Pre-Press Proofing', 'In Production', 'Shipped', 'Delivered', 'Cancelled'].map(st => `
                <button 
                  onclick="window.adminEngine.orderFilterStatus = '${st}'; window.adminEngine.render();"
                  class="px-3 py-1.5 rounded-lg font-bold transition ${
                    this.orderFilterStatus === st ? 'bg-black text-white' : 'bg-[#f3f3f3] text-[#595959] hover:text-black hover:bg-[#e6e6e6]'
                  }"
                >
                  ${st === 'all' ? 'All Orders' : st}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Orders Table -->
          <div class="bg-white border border-[#d9d9d9] rounded-xl shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-[#f3f3f3] text-[#595959] uppercase font-bold text-[10px] border-b border-[#d9d9d9]">
                  <tr>
                    <th class="p-3.5">Order ID</th>
                    <th class="p-3.5">Date</th>
                    <th class="p-3.5">Customer & Pincode</th>
                    <th class="p-3.5">Order Items & Matter</th>
                    <th class="p-3.5">Amount</th>
                    <th class="p-3.5">Status</th>
                    <th class="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#e6e6e6]">
                  ${filteredOrders.length === 0 ? `
                    <tr>
                      <td colspan="7" class="p-8 text-center text-[#595959]">
                        <div class="text-sm font-bold text-black mb-1">No orders matched your criteria</div>
                        <div class="text-xs">Try adjusting your search terms or status filters.</div>
                      </td>
                    </tr>
                  ` : filteredOrders.map(o => `
                    <tr class="hover:bg-[#f9f9f9] transition">
                      <td class="p-3.5 font-bold font-mono-spec text-black">
                        <div>${o.orderId}</div>
                        <div class="text-[10px] text-[#595959] font-normal uppercase">${o.deliverySpeed || 'Standard'}</div>
                      </td>
                      <td class="p-3.5 text-[#595959] whitespace-nowrap">${o.date}</td>
                      <td class="p-3.5">
                        <div class="font-bold text-black">${o.customerName || 'Storefront Guest'}</div>
                        <div class="text-[10px] text-[#595959]">${o.city || 'Mumbai'} (${o.pincode || '400001'})</div>
                        <div class="text-[10px] text-[#595959]">${o.customerPhone || ''}</div>
                      </td>
                      <td class="p-3.5 max-w-xs">
                        <div class="font-bold text-black">${(o.items || []).map(i => `${i.title} (x${i.quantity})`).join(', ')}</div>
                        ${(o.items && o.items[0] && o.items[0].matter) ? `
                          <div class="text-[10px] text-amber-800 bg-amber-50/80 p-1 rounded mt-1 line-clamp-1 font-mono-spec border border-amber-200/50">
                            Matter: ${o.items[0].matter}
                          </div>
                        ` : ''}
                      </td>
                      <td class="p-3.5 font-bold text-black whitespace-nowrap">₹${(o.calcs ? o.calcs.grandTotal : 0).toLocaleString('en-IN')}</td>
                      <td class="p-3.5">
                        <select onchange="window.adminEngine.updateOrderStatus('${o.orderId}', this.value)" class="text-[11px] font-bold border border-[#d9d9d9] rounded-lg px-2 py-1 bg-white cursor-pointer outline-none ${
                          o.status === 'Delivered' ? 'text-emerald-700 bg-emerald-50' :
                          o.status === 'Shipped' ? 'text-sky-700 bg-sky-50' :
                          o.status === 'In Production' ? 'text-purple-700 bg-purple-50' :
                          'text-amber-800 bg-amber-50'
                        }">
                          <option value="Pre-Press Proofing" ${o.status === 'Pre-Press Proofing' ? 'selected' : ''}>Pre-Press Proofing</option>
                          <option value="In Production" ${orderStatusIs(o.status, 'In Production') ? 'selected' : ''}>In Production</option>
                          <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                          <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                          <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                      </td>
                      <td class="p-3.5 text-right whitespace-nowrap space-x-1.5">
                        <button onclick="window.adminEngine.openOrderDetailModal('${o.orderId}')" class="px-2.5 py-1 bg-black text-white hover:bg-neutral-800 font-bold rounded text-[11px] transition">Inspect</button>
                        <button onclick="window.adminEngine.deleteOrder('${o.orderId}')" class="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded font-bold text-[11px] transition" title="Delete Order">✕</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- TAB 3: PRODUCTS & CATALOG -->
      ${this.activeTab === 'products' ? `
        <div class="space-y-4">
          <!-- Catalog Actions Bar -->
          <div class="p-4 bg-white border border-[#d9d9d9] rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="relative w-full sm:w-80">
              <input 
                type="text" 
                placeholder="Search catalog products..." 
                value="${this.productSearchQuery}" 
                oninput="window.adminEngine.productSearchQuery = this.value; window.adminEngine.render();"
                class="w-full pl-9 pr-4 py-2 border border-[#d9d9d9] rounded-lg text-xs outline-none focus:border-black transition"
              />
              <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#595959]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button onclick="window.adminEngine.openAddProductModal()" class="px-4 py-2 bg-black text-white hover:bg-neutral-800 text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-sm">
              <span>+ Add New Product</span>
            </button>
          </div>

          <!-- Product Grid/Table -->
          <div class="bg-white border border-[#d9d9d9] rounded-xl shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-[#f3f3f3] text-[#595959] uppercase font-bold text-[10px] border-b border-[#d9d9d9]">
                  <tr>
                    <th class="p-3.5">Product</th>
                    <th class="p-3.5">Category Label</th>
                    <th class="p-3.5">Base Price</th>
                    <th class="p-3.5">Price Pill</th>
                    <th class="p-3.5">Dimensions</th>
                    <th class="p-3.5">Popular Status</th>
                    <th class="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#e6e6e6]">
                  ${filteredProducts.map(p => `
                    <tr class="hover:bg-[#f9f9f9] transition">
                      <td class="p-3.5 flex items-center gap-3">
                        <img src="${p.image || 'assets/images/products/standard-visiting-cards.jpg'}" class="w-10 h-10 object-contain rounded border border-[#d9d9d9] bg-white p-1" />
                        <div>
                          <div class="font-bold text-black">${p.name}</div>
                          <div class="text-[10px] text-[#595959] line-clamp-1">${p.subtitle || ''}</div>
                        </div>
                      </td>
                      <td class="p-3.5 text-[#595959]">${p.categoryLabel || 'Custom Product'}</td>
                      <td class="p-3.5 font-bold text-black">₹${p.basePrice || 200}</td>
                      <td class="p-3.5"><span class="badge-pill-accent">${p.pricePill || 'BUY 100 @ Rs.' + p.basePrice}</span></td>
                      <td class="p-3.5 text-[#595959] font-mono-spec text-[11px]">${p.dimensions || '8.9 cm × 5.1 cm'}</td>
                      <td class="p-3.5">
                        <button onclick="var pr = window.PRINTSHUBB_DATA.products.find(x => x.id === '${p.id}'); if(pr) { pr.popular = !pr.popular; window.adminEngine.render(); }" class="px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.popular ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-500'
                        }">
                          ${p.popular ? '★ Popular' : '☆ Standard'}
                        </button>
                      </td>
                      <td class="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <button onclick="window.adminEngine.openEditProductModal('${p.id}')" class="px-2.5 py-1 bg-[#f3f3f3] hover:bg-black hover:text-white rounded border border-[#d9d9d9] font-bold text-[11px] transition">Edit</button>
                        <button onclick="window.adminEngine.deleteProduct('${p.id}')" class="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded font-bold text-[11px] transition" title="Delete Product">✕</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- TAB 4: PRE-PRESS PROOFS QUEUE -->
      ${this.activeTab === 'proofs' ? `
        <div class="space-y-4">
          <div class="p-4 bg-white border border-[#d9d9d9] rounded-xl shadow-sm">
            <h3 class="text-sm font-bold font-display text-black uppercase tracking-wider mb-1">Pre-Press Card Matter & Proofing Queue</h3>
            <p class="text-xs text-[#595959]">Review raw customer matter submissions, check typography alignment, and approve jobs for offset/digital print runs.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${orders.filter(o => o.items && o.items.some(i => i.matter)).map(o => {
              const cardItem = o.items.find(i => i.matter) || o.items[0];
              return `
                <div class="p-5 bg-white border border-[#d9d9d9] rounded-xl shadow-sm space-y-4">
                  <div class="flex items-center justify-between border-b border-[#f3f3f3] pb-3">
                    <div>
                      <span class="text-[10px] font-mono-spec font-bold text-[#595959]">${o.orderId}</span>
                      <h4 class="font-bold text-sm text-black">${cardItem.title}</h4>
                      <p class="text-[11px] text-[#595959]">Customer: ${o.customerName || 'Store Customer'} · PIN: ${o.pincode || '400001'}</p>
                    </div>
                    <div>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                        cardItem.proofApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }">
                        ${cardItem.proofApproved ? '✓ Proof Verified' : '⚠ Proof Pending'}
                      </span>
                    </div>
                  </div>

                  <!-- Matter Code Box -->
                  <div class="p-3.5 bg-neutral-900 text-neutral-100 rounded-lg text-xs font-mono-spec space-y-1">
                    <div class="text-[10px] text-neutral-400 uppercase tracking-wider">Submitted Card Text / Matter:</div>
                    <pre class="whitespace-pre-wrap leading-relaxed text-emerald-400 text-xs">${cardItem.matter}</pre>
                  </div>

                  <div class="flex items-center justify-between text-xs pt-1">
                    <div class="text-[11px] text-[#595959]">
                      Quantity: <strong>${cardItem.quantity} units</strong> · ${cardItem.paperStock || 'Standard Matte'}
                    </div>
                    <div class="flex items-center gap-2">
                      <button onclick="window.adminEngine.openOrderDetailModal('${o.orderId}')" class="px-3 py-1.5 bg-[#f3f3f3] hover:bg-[#e6e6e6] text-black font-bold rounded-lg text-xs transition">Details</button>
                      ${!cardItem.proofApproved ? `
                        <button onclick="window.adminEngine.approveProof('${o.orderId}', '${cardItem.id}')" class="px-3 py-1.5 bg-black hover:bg-neutral-800 text-white font-bold rounded-lg text-xs transition">Approve & Print</button>
                      ` : `
                        <button disabled class="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg text-xs cursor-default">Approved ✓</button>
                      `}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- TAB 5: STORE & PINCODE SETTINGS -->
      ${this.activeTab === 'settings' ? `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Same-Day Delivery Pincode Manager -->
          <div class="p-5 bg-white border border-[#d9d9d9] rounded-xl shadow-sm space-y-4">
            <div>
              <h3 class="font-bold font-display text-sm text-black uppercase tracking-wider">Same-Day Delivery Pincodes</h3>
              <p class="text-xs text-[#595959] mt-0.5">Manage regional PIN codes eligible for express same-day dispatch.</p>
            </div>

            <!-- Add Pincode Input -->
            <div class="flex gap-2">
              <input 
                id="admin-new-pincode" 
                type="text" 
                maxlength="6" 
                placeholder="Enter 6-digit Indian PIN (e.g. 400001)" 
                class="flex-grow px-3 py-2 border border-[#d9d9d9] rounded-lg text-xs outline-none focus:border-black font-mono-spec"
              />
              <button onclick="window.adminEngine.addPincode()" class="px-4 py-2 bg-black text-white hover:bg-neutral-800 font-bold rounded-lg text-xs transition">
                + Add PIN
              </button>
            </div>

            <!-- Registered Pincode Tags -->
            <div>
              <label class="text-[11px] font-bold text-[#595959] uppercase tracking-wider block mb-2">Active Express Pincodes (${(window.PRINTSHUBB_DATA.deliveryPincodes.sameDayPincodes || []).length})</label>
              <div class="flex flex-wrap gap-2 max-h-56 overflow-y-auto p-1">
                ${(window.PRINTSHUBB_DATA.deliveryPincodes.sameDayPincodes || []).map(pin => `
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f3f3f3] border border-[#d9d9d9] rounded-lg text-xs font-mono-spec text-black">
                    <strong>${pin}</strong>
                    <button onclick="window.adminEngine.removePincode('${pin}')" class="text-gray-400 hover:text-rose-600 font-bold ml-1">✕</button>
                  </span>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Store Logistics & Reset Settings -->
          <div class="p-5 bg-white border border-[#d9d9d9] rounded-xl shadow-sm space-y-5">
            <div>
              <h3 class="font-bold font-display text-sm text-black uppercase tracking-wider">Shipping & Tax Configuration</h3>
              <p class="text-xs text-[#595959] mt-0.5">Atelier pricing rules and checkout parameters.</p>
            </div>

            <div class="space-y-3 text-xs">
              <div>
                <label class="font-bold text-black block mb-1">Free Delivery Order Threshold (₹)</label>
                <input type="number" value="${window.PRINTSHUBB_DATA.deliveryPincodes.freeDeliveryThreshold}" onchange="window.PRINTSHUBB_DATA.deliveryPincodes.freeDeliveryThreshold = parseFloat(this.value);" class="w-full px-3 py-2 border border-[#d9d9d9] rounded-lg font-mono-spec" />
                <p class="text-[10px] text-[#595959] mt-0.5">Orders above this threshold receive 100% free delivery across India.</p>
              </div>

              <div>
                <label class="font-bold text-black block mb-1">Standard Delivery Fee (₹)</label>
                <input type="number" value="${window.PRINTSHUBB_DATA.deliveryPincodes.standardFee}" onchange="window.PRINTSHUBB_DATA.deliveryPincodes.standardFee = parseFloat(this.value);" class="w-full px-3 py-2 border border-[#d9d9d9] rounded-lg font-mono-spec" />
              </div>

              <div>
                <label class="font-bold text-black block mb-1">Goods & Services Tax (GST %)</label>
                <input type="number" disabled value="18" class="w-full px-3 py-2 bg-[#f3f3f3] border border-[#d9d9d9] rounded-lg font-mono-spec cursor-not-allowed text-[#595959]" />
                <p class="text-[10px] text-[#595959] mt-0.5">Statutory 18% GST applied to printing atelier services with GST invoice.</p>
              </div>
            </div>

            <div class="pt-4 border-t border-[#e6e6e6]">
              <h4 class="font-bold text-xs text-black mb-1">Demo Data Operations</h4>
              <p class="text-[11px] text-[#595959] mb-3">Reset demo orders to initial seeded state for presentations and testing.</p>
              <button onclick="window.adminEngine.resetDemoData()" class="px-4 py-2 border border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg font-bold text-xs transition">
                ↻ Reset Demo Store Orders
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- ORDER DETAILS MODAL (HIDDEN BY DEFAULT) -->
      <div id="admin-order-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="relative bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-[#d9d9d9] max-h-[90vh] overflow-y-auto">
          <button onclick="document.getElementById('admin-order-modal').classList.add('hidden')" class="absolute top-5 right-5 text-gray-400 hover:text-black font-bold text-lg">✕</button>
          <div id="admin-order-modal-content"></div>
        </div>
      </div>

      <!-- ADD / EDIT PRODUCT MODAL (HIDDEN BY DEFAULT) -->
      <div id="admin-product-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#d9d9d9]">
          <button onclick="document.getElementById('admin-product-modal').classList.add('hidden')" class="absolute top-5 right-5 text-gray-400 hover:text-black font-bold text-lg">✕</button>
          <h2 id="admin-modal-title" class="text-lg font-bold font-display text-black mb-4">Product Details</h2>
          <form id="admin-prod-form" onsubmit="window.adminEngine.saveProductForm(event)" class="space-y-3 text-xs">
            <input type="hidden" id="admin-prod-id" />
            <div>
              <label class="font-bold text-black block mb-1">Product Short Name *</label>
              <input id="admin-prod-name" required placeholder="e.g. Standard, Organic Kraft, Executive Hoodie" class="w-full px-3 py-2 border border-[#d9d9d9] rounded-lg outline-none focus:border-black" />
            </div>
            <div>
              <label class="font-bold text-black block mb-1">Full Commercial Title</label>
              <input id="admin-prod-fullname" placeholder="e.g. Premium Standard Visiting Cards" class="w-full px-3 py-2 border border-[#d9d9d9] rounded-lg outline-none focus:border-black" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="font-bold text-black block mb-1">Base Price (₹) *</label>
                <input id="admin-prod-price" type="number" required placeholder="200" class="w-full px-3 py-2 border border-[#d9d9d9] rounded-lg font-mono-spec outline-none focus:border-black" />
              </div>
              <div>
                <label class="font-bold text-black block mb-1">Price Pill Text</label>
                <input id="admin-prod-pill" placeholder="BUY 100 @ Rs.200" class="w-full px-3 py-2 border border-[#d9d9d9] rounded-lg font-mono-spec outline-none focus:border-black" />
              </div>
            </div>
            <div>
              <label class="font-bold text-black block mb-1">Dimensions</label>
              <input id="admin-prod-dims" placeholder="8.9 cm × 5.1 cm" class="w-full px-3 py-2 border border-[#d9d9d9] rounded-lg outline-none focus:border-black" />
            </div>
            <div>
              <label class="font-bold text-black block mb-1">Subtitle / Material Highlights</label>
              <textarea id="admin-prod-subtitle" rows="2" placeholder="Crisp 350 GSM premium paper with professional matte or gloss finish" class="w-full px-3 py-2 border border-[#d9d9d9] rounded-lg outline-none focus:border-black"></textarea>
            </div>
            <div>
              <label class="font-bold text-black block mb-1">Mockup Image Asset Path</label>
              <input id="admin-prod-image" placeholder="assets/images/products/standard-visiting-cards.jpg" class="w-full px-3 py-2 border border-[#d9d9d9] rounded-lg outline-none focus:border-black" />
            </div>
            <div class="flex items-center gap-2 pt-1">
              <input id="admin-prod-popular" type="checkbox" class="w-4 h-4 rounded text-black border-[#d9d9d9] focus:ring-0 cursor-pointer" />
              <label for="admin-prod-popular" class="font-bold text-black cursor-pointer">Feature as "Our Most Popular Products" on Homepage</label>
            </div>
            <div class="flex items-center justify-end gap-2 pt-3 border-t border-[#e6e6e6]">
              <button type="button" onclick="document.getElementById('admin-product-modal').classList.add('hidden')" class="px-4 py-2 border border-[#d9d9d9] hover:bg-[#f3f3f3] font-bold rounded-lg text-xs transition">Cancel</button>
              <button type="submit" class="px-5 py-2 bg-black hover:bg-neutral-800 text-white font-bold rounded-lg text-xs transition">Save Product</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

// Helper function
function orderStatusIs(current, target) {
  return current === target;
}

// Global Singleton Initialization
if (typeof window !== 'undefined') {
  window.AdminPanelEngine = AdminPanelEngine;
  window.adminEngine = new AdminPanelEngine();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdminPanelEngine;
}
