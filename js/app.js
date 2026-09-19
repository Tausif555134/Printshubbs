// ==========================================================================
// Printhubbs - Main Application Controller, Router & Business Tools
// Based on stitch_website_ui_replica/DESIGN.md & vistaprint_india_features_functions.md
// ==========================================================================

class PrinthubbsApp {
  constructor() {
    this.currentView = 'home';
    this.selectedProduct = null;
    this.selectedCategory = 'all';
    this.wishlist = this.loadWishlist();
    this.myProjects = this.loadProjects();

    // Active PDP selected options
    this.pdpOptions = {
      quantity: 100,
      paperStockId: null,
      cornerId: null,
      finishId: null,
      sideId: null
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateWishlistBadges();
    this.renderPopularProducts();
    this.renderTrendingProducts();
    this.renderExploreMoreProducts();
  }

  bindEvents() {
    // Search input autocomplete
    const searchInput = document.getElementById('global-search-input');
    const searchDropdown = document.getElementById('search-dropdown');
    if (searchInput && searchDropdown) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length === 0) {
          searchDropdown.classList.add('hidden');
          return;
        }
        const matches = window.PRINTSHUBB_DATA.products.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query) ||
          p.subtitle.toLowerCase().includes(query)
        );
        this.renderSearchDropdown(matches, searchDropdown);
      });

      // Close dropdown on outside click
      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
          searchDropdown.classList.add('hidden');
        }
      });
    }
  }

  // --- ROUTING & VIEW CONTROLLER ---
  navigate(viewName, param = null) {
    this.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide all view sections
    document.querySelectorAll('.app-view-container').forEach(el => el.classList.add('hidden'));

    // Show target view
    const targetEl = document.getElementById(`view-${viewName}`);
    if (targetEl) {
      targetEl.classList.remove('hidden');
    }

    if (viewName === 'home') {
      // Home refreshed
    } else if (viewName === 'catalog') {
      this.selectedCategory = param || 'all';
      this.renderCatalogView();
    } else if (viewName === 'pdp') {
      const product = typeof param === 'string' ? window.PRINTSHUBB_DATA.products.find(p => p.id === param) : param;
      if (product) {
        this.openPDP(product);
      }
    } else if (viewName === 'studio') {
      const product = typeof param === 'string' ? window.PRINTSHUBB_DATA.products.find(p => p.id === param) : (param || this.selectedProduct || window.PRINTSHUBB_DATA.products[0]);
      this.openDesignStudio(product);
    } else if (viewName === 'projects') {
      this.renderProjectsAndOrders();
    }
  }

  // --- POPULAR & TRENDING CAROUSEL RENDERING ---
  renderPopularProducts() {
    const container = document.getElementById('popular-products-row');
    if (!container) return;
    const popular = window.PRINTSHUBB_DATA.products.filter(p => p.popular);
    container.innerHTML = popular.map(p => this.createProductCardHtml(p)).join('');
  }

  renderTrendingProducts() {
    const container = document.getElementById('trending-products-row');
    if (!container) return;
    const trending = window.PRINTSHUBB_DATA.products.filter(p => p.trending);
    container.innerHTML = trending.map(p => this.createProductCardHtml(p)).join('');
  }

  renderExploreMoreProducts() {
    const container = document.getElementById('explore-more-row');
    if (!container) return;
    const items = window.PRINTSHUBB_DATA.products.slice(0, 6);
    container.innerHTML = items.map(p => this.createProductCardHtml(p)).join('');
  }

  createProductCardHtml(product) {
    const isFav = this.wishlist.includes(product.id);
    return `
      <article class="category-scroll-item w-44 sm:w-52 bg-white border border-slate-200 rounded-lg p-3 hover:border-orange-300 hover:shadow-md transition flex flex-col justify-between group cursor-pointer" onclick="window.appRouter.navigate('pdp', '${product.id}')">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="badge-pill-accent"><span class="w-1.5 h-1.5 rounded-full bg-[#ea580c] inline-block"></span>${product.pricePill}</span>
            <button onclick="event.stopPropagation(); window.appRouter.toggleWishlist('${product.id}')" class="text-slate-400 hover:text-[#ea580c] transition p-1" title="Save to Favourites">
              <svg class="w-4 h-4 ${isFav ? 'text-[#ea580c] fill-current' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
          </div>
          <div class="w-full h-36 bg-slate-50 rounded flex items-center justify-center mb-3 overflow-hidden p-2">
            <img src="${product.image}" alt="${product.name}" class="h-full w-full object-contain group-hover:scale-105 transition duration-300" />
          </div>
          <h3 class="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#ea580c] transition line-clamp-1">${product.name}</h3>
          <p class="text-[11px] text-slate-500 mt-1 line-clamp-2">${product.subtitle}</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[11px] text-amber-500 font-bold flex items-center gap-1">
            ★ ${product.rating} <span class="text-slate-400 font-normal">(${product.reviewCount})</span>
          </span>
          <span class="text-xs font-bold text-[#ea580c] group-hover:underline">Customize →</span>
        </div>
      </article>
    `;
  }

  // --- CATALOG & BROWSE VIEW ---
  renderCatalogView() {
    const container = document.getElementById('catalog-products-grid');
    const categoryTabsContainer = document.getElementById('catalog-category-tabs');
    if (!container) return;

    // Render Category tabs
    if (categoryTabsContainer) {
      const allTabs = [{ id: 'all', name: 'All Products' }, ...window.PRINTSHUBB_DATA.categories];
      categoryTabsContainer.innerHTML = allTabs.map(cat => `
        <button onclick="window.appRouter.filterCatalog('${cat.id}')" class="px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition ${this.selectedCategory === cat.id ? 'bg-[#0f172a] text-white shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
          ${cat.name}
        </button>
      `).join('');
    }

    // Filter products
    let filtered = window.PRINTSHUBB_DATA.products;
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    const sortSelect = document.getElementById('catalog-sort-select');
    const sortVal = sortSelect ? sortSelect.value : 'popular';
    if (sortVal === 'price-low') {
      filtered.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortVal === 'price-high') {
      filtered.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortVal === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    document.getElementById('catalog-count').textContent = `Showing ${filtered.length} products`;

    container.innerHTML = filtered.map(p => this.createProductCardHtml(p)).join('');
  }

  filterCatalog(categoryId) {
    this.selectedCategory = categoryId;
    this.renderCatalogView();
  }

  // --- SEARCH DROPDOWN ---
  renderSearchDropdown(matches, container) {
    if (matches.length === 0) {
      container.innerHTML = `
        <div class="p-3 text-xs text-slate-500 text-center">No products matching your search.</div>
      `;
      container.classList.remove('hidden');
      return;
    }

    container.innerHTML = `
      <div class="py-2 divide-y divide-slate-100 max-h-80 overflow-y-auto">
        ${matches.map(p => `
          <div onclick="window.appRouter.navigate('pdp', '${p.id}'); document.getElementById('search-dropdown').classList.add('hidden');" class="p-2.5 hover:bg-slate-50 flex items-center gap-3 cursor-pointer transition">
            <img src="${p.image}" class="w-10 h-10 object-contain rounded border border-slate-200 bg-white" />
            <div class="min-w-0 flex-grow">
              <div class="font-bold text-xs text-[#0f172a] truncate">${p.name}</div>
              <div class="text-[10px] text-slate-500">${p.categoryLabel} • ${p.dimensions}</div>
            </div>
            <span class="badge-pill-accent flex-shrink-0">${p.pricePill}</span>
          </div>
        `).join('')}
      </div>
    `;
    container.classList.remove('hidden');
  }

  // --- PRODUCT DETAIL PAGE (PDP) CONTROLLER ---
  openPDP(product) {
    this.selectedProduct = product;
    // Set default configuration options
    this.pdpOptions = {
      quantity: product.quantities[0].qty,
      paperStockId: product.paperStocks[0].id,
      cornerId: product.corners ? product.corners[0].id : null,
      finishId: product.finishes ? product.finishes[0].id : null,
      sideId: product.sides ? product.sides[0].id : null
    };

    const pdpTitle = document.getElementById('pdp-title');
    const pdpSubtitle = document.getElementById('pdp-subtitle');
    const pdpRating = document.getElementById('pdp-rating');
    const pdpImage = document.getElementById('pdp-preview-image');
    const pdpDims = document.getElementById('pdp-dimensions');

    if (pdpTitle) pdpTitle.textContent = product.name;
    if (pdpSubtitle) pdpSubtitle.textContent = product.subtitle;
    if (pdpRating) pdpRating.innerHTML = `★ ${product.rating} <span class="text-slate-500 font-normal">(${product.reviewCount} customer reviews)</span> • <span class="text-emerald-600 font-semibold">100% Satisfaction Guaranteed</span>`;
    if (pdpImage) pdpImage.src = product.image;
    if (pdpDims) pdpDims.textContent = product.dimensions;

    this.renderPDPOptions();
    this.calculatePDPPrice();
  }

  renderPDPOptions() {
    const product = this.selectedProduct;
    if (!product) return;

    // 1. Quantity Selector Grid
    const qtyContainer = document.getElementById('pdp-quantity-grid');
    if (qtyContainer) {
      qtyContainer.innerHTML = product.quantities.map(q => `
        <button type="button" onclick="window.appRouter.setPDPOption('quantity', ${q.qty})" class="p-3 border rounded-md text-left transition ${this.pdpOptions.quantity === q.qty ? 'border-[#ea580c] bg-orange-50/40 ring-1 ring-[#ea580c]' : 'border-slate-200 hover:border-slate-300 bg-white'}">
          <div class="flex justify-between items-center mb-1">
            <span class="font-bold text-xs text-[#0f172a]">${q.qty} units</span>
            ${q.discount ? `<span class="badge-pill-accent text-[9px]">${q.discount}</span>` : ''}
          </div>
          <div class="font-mono-spec text-xs font-bold text-[#ea580c]">₹${q.price.toLocaleString('en-IN')}</div>
          <div class="text-[10px] text-slate-500">₹${q.perUnit}/unit</div>
        </button>
      `).join('');
    }

    // 2. Paper Stock Selector
    const stockContainer = document.getElementById('pdp-paper-stock-container');
    if (stockContainer) {
      stockContainer.innerHTML = product.paperStocks.map(stock => `
        <label class="p-3 border rounded-md flex items-start gap-3 cursor-pointer transition ${this.pdpOptions.paperStockId === stock.id ? 'border-[#ea580c] bg-orange-50/20' : 'border-slate-200 bg-white'}">
          <input type="radio" name="pdp-stock" value="${stock.id}" ${this.pdpOptions.paperStockId === stock.id ? 'checked' : ''} onchange="window.appRouter.setPDPOption('paperStockId', '${stock.id}')" class="mt-1 text-[#ea580c] focus:ring-[#ea580c]" />
          <div class="flex-grow">
            <div class="flex justify-between items-center">
              <span class="font-bold text-xs text-[#0f172a]">${stock.name}</span>
              <span class="badge-pill-neutral">${stock.gsm}</span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">${stock.desc}</p>
          </div>
        </label>
      `).join('');
    }

    // 3. Corners Selector
    const cornerContainer = document.getElementById('pdp-corners-container');
    if (cornerContainer && product.corners) {
      cornerContainer.innerHTML = product.corners.map(c => `
        <label class="p-3 border rounded-md flex items-center justify-between cursor-pointer transition ${this.pdpOptions.cornerId === c.id ? 'border-[#ea580c] bg-orange-50/20' : 'border-slate-200 bg-white'}">
          <div class="flex items-center gap-2">
            <input type="radio" name="pdp-corner" value="${c.id}" ${this.pdpOptions.cornerId === c.id ? 'checked' : ''} onchange="window.appRouter.setPDPOption('cornerId', '${c.id}')" class="text-[#ea580c] focus:ring-[#ea580c]" />
            <span class="font-semibold text-xs text-[#0f172a]">${c.name}</span>
          </div>
          ${c.priceAdd > 0 ? `<span class="text-[11px] font-mono-spec text-slate-600 font-bold">+₹${c.priceAdd}</span>` : '<span class="text-[11px] text-emerald-600 font-bold">Included</span>'}
        </label>
      `).join('');
    }

    // 4. Finishes Selector
    const finishContainer = document.getElementById('pdp-finishes-container');
    if (finishContainer && product.finishes) {
      finishContainer.innerHTML = product.finishes.map(f => `
        <label class="p-3 border rounded-md flex items-center justify-between cursor-pointer transition ${this.pdpOptions.finishId === f.id ? 'border-[#ea580c] bg-orange-50/20' : 'border-slate-200 bg-white'}">
          <div class="flex items-center gap-2">
            <input type="radio" name="pdp-finish" value="${f.id}" ${this.pdpOptions.finishId === f.id ? 'checked' : ''} onchange="window.appRouter.setPDPOption('finishId', '${f.id}')" class="text-[#ea580c] focus:ring-[#ea580c]" />
            <span class="font-semibold text-xs text-[#0f172a]">${f.name}</span>
          </div>
          ${f.priceAdd > 0 ? `<span class="text-[11px] font-mono-spec text-slate-600 font-bold">+₹${f.priceAdd}</span>` : '<span class="text-[11px] text-emerald-600 font-bold">Standard</span>'}
        </label>
      `).join('');
    }

    // 5. Sides Selector
    const sideContainer = document.getElementById('pdp-sides-container');
    if (sideContainer && product.sides) {
      sideContainer.innerHTML = product.sides.map(s => `
        <label class="p-3 border rounded-md flex items-center justify-between cursor-pointer transition ${this.pdpOptions.sideId === s.id ? 'border-[#ea580c] bg-orange-50/20' : 'border-slate-200 bg-white'}">
          <div class="flex items-center gap-2">
            <input type="radio" name="pdp-sides" value="${s.id}" ${this.pdpOptions.sideId === s.id ? 'checked' : ''} onchange="window.appRouter.setPDPOption('sideId', '${s.id}')" class="text-[#ea580c] focus:ring-[#ea580c]" />
            <span class="font-semibold text-xs text-[#0f172a]">${s.name}</span>
          </div>
          ${s.priceMult > 1.0 ? `<span class="text-[11px] font-mono-spec text-[#ea580c] font-bold">+35%</span>` : '<span class="text-[11px] text-emerald-600 font-bold">Standard</span>'}
        </label>
      `).join('');
    }
  }

  setPDPOption(key, val) {
    this.pdpOptions[key] = val;
    this.renderPDPOptions();
    this.calculatePDPPrice();
  }

  calculatePDPPrice() {
    const product = this.selectedProduct;
    if (!product) return;

    // Find base price for selected quantity
    const qtyTier = product.quantities.find(q => q.qty === this.pdpOptions.quantity) || product.quantities[0];
    let totalPrice = qtyTier.price;

    // Apply stock multiplier
    const stock = product.paperStocks.find(s => s.id === this.pdpOptions.paperStockId);
    if (stock) {
      totalPrice = Math.round(totalPrice * stock.priceMult);
    }

    // Apply corner fee
    if (product.corners) {
      const corner = product.corners.find(c => c.id === this.pdpOptions.cornerId);
      if (corner) totalPrice += corner.priceAdd;
    }

    // Apply finish fee
    if (product.finishes) {
      const finish = product.finishes.find(f => f.id === this.pdpOptions.finishId);
      if (finish) totalPrice += finish.priceAdd;
    }

    // Apply side multiplier
    if (product.sides) {
      const side = product.sides.find(s => s.id === this.pdpOptions.sideId);
      if (side) totalPrice = Math.round(totalPrice * side.priceMult);
    }

    const perUnitPrice = (totalPrice / this.pdpOptions.quantity).toFixed(2);

    const priceEl = document.getElementById('pdp-calculated-price');
    const perUnitEl = document.getElementById('pdp-per-unit-price');
    if (priceEl) priceEl.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
    if (perUnitEl) perUnitEl.textContent = `(₹${perUnitPrice} per unit)`;

    this.currentCalculatedPDPPrice = {
      totalPrice,
      perUnitPrice,
      quantity: this.pdpOptions.quantity,
      stockName: stock ? stock.name : 'Standard',
      cornerName: product.corners ? product.corners.find(c => c.id === this.pdpOptions.cornerId)?.name : 'Standard',
      finishName: product.finishes ? product.finishes.find(f => f.id === this.pdpOptions.finishId)?.name : 'Standard',
      sideName: product.sides ? product.sides.find(s => s.id === this.pdpOptions.sideId)?.name : 'Single-Sided'
    };
  }

  // Quick add to cart from PDP (without customizer)
  addPDPToCart() {
    const product = this.selectedProduct;
    const calc = this.currentCalculatedPDPPrice;
    if (!product || !calc) return;

    window.cartEngine.addItem({
      productId: product.id,
      title: product.name,
      category: product.categoryLabel,
      thumbnail: product.image,
      quantity: calc.quantity,
      paperStock: calc.stockName,
      corners: calc.cornerName,
      finish: calc.finishName,
      sides: calc.sideName,
      unitPrice: calc.perUnitPrice,
      totalPrice: calc.totalPrice,
      isCustomized: false
    });

    window.showToast(`${product.name} added to cart!`, 'success');
    this.openCartDrawer();
  }

  // --- ONLINE DESIGN STUDIO LAUNCHER ---
  openDesignStudio(product) {
    this.selectedProduct = product;
    const studioTitle = document.getElementById('studio-product-title');
    if (studioTitle) {
      studioTitle.textContent = product.name;
    }

    // Render templates list in studio
    const templatesContainer = document.getElementById('studio-templates-list');
    if (templatesContainer) {
      templatesContainer.innerHTML = window.PRINTSHUBB_DATA.studioTemplates.map(t => `
        <button onclick="window.appRouter.applyStudioTemplate('${t.id}')" class="p-2.5 border border-slate-200 rounded-lg text-left hover:border-[#ea580c] transition flex items-center gap-3 bg-white w-full">
          <div class="w-12 h-8 rounded border border-slate-300 flex items-center justify-center font-bold text-[10px]" style="background-color: ${t.bgColor}; color: ${t.textColor};">
            Aa
          </div>
          <div class="min-w-0">
            <div class="font-bold text-xs text-[#0f172a] truncate">${t.name}</div>
            <div class="text-[10px] text-slate-500 font-mono-spec">${t.theme} • ${t.fontHeading}</div>
          </div>
        </button>
      `).join('');
    }

    // Initialize Canvas Engine
    const canvasEl = document.getElementById('studio-canvas');
    if (canvasEl) {
      window.studioEngine.init(canvasEl);
      window.studioEngine.setProduct(product);
      window.studioEngine.syncFormControls();
    }
  }

  applyStudioTemplate(tplId) {
    const tpl = window.PRINTSHUBB_DATA.studioTemplates.find(t => t.id === tplId);
    if (tpl) {
      window.studioEngine.applyTemplate(tpl);
      window.showToast(`Applied ${tpl.name} template`, 'info');
    }
  }

  // Add customized item from studio to cart
  addStudioToCart() {
    const product = this.selectedProduct || window.PRINTSHUBB_DATA.products[0];
    const snapshot = window.studioEngine.getSnapshotDataUrl();
    const calc = this.currentCalculatedPDPPrice || {
      quantity: 100,
      totalPrice: product.basePrice,
      perUnitPrice: (product.basePrice / 100).toFixed(2),
      stockName: 'Standard Matte 350 GSM',
      cornerName: 'Standard Square',
      finishName: 'Standard Smooth Finish',
      sideName: 'Single-Sided'
    };

    window.cartEngine.addItem({
      productId: product.id,
      title: `${product.name} (Customized Artwork)`,
      category: product.categoryLabel,
      thumbnail: snapshot,
      quantity: calc.quantity,
      paperStock: calc.stockName,
      corners: calc.cornerName,
      finish: calc.finishName,
      sides: calc.sideName,
      unitPrice: calc.perUnitPrice,
      totalPrice: calc.totalPrice,
      isCustomized: true,
      designData: { ...window.studioEngine.state }
    });

    window.showToast(`Custom design added to cart!`, 'success');
    this.openCartDrawer();
  }

  // Save design to "My Projects"
  saveCurrentProject() {
    const product = this.selectedProduct || window.PRINTSHUBB_DATA.products[0];
    const snapshot = window.studioEngine.getSnapshotDataUrl();
    const newProject = {
      id: 'proj_' + Date.now(),
      title: `${window.studioEngine.state.fields.company} - ${product.name}`,
      productId: product.id,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      thumbnail: snapshot,
      designState: JSON.parse(JSON.stringify(window.studioEngine.state))
    };

    this.myProjects.unshift(newProject);
    localStorage.setItem('printhubbs_my_projects', JSON.stringify(this.myProjects));
    window.showToast(`Project "${newProject.title}" saved to My Projects!`, 'success');
  }

  loadProjects() {
    try {
      const stored = localStorage.getItem('printhubbs_my_projects');
      if (stored && JSON.parse(stored).length > 0) {
        return JSON.parse(stored);
      }
      return [
        {
          id: 'sample_proj_1',
          title: 'Arjun Sharma - Minimalist Executive Card',
          productId: 'standard-visiting-cards',
          date: '15 Sep 2026',
          thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
          designState: {
            templateId: 'tpl-corporate-modern',
            bgColor: '#0f172a',
            accentColor: '#ea580c',
            textColor: '#ffffff',
            secondaryTextColor: '#cbd5e1',
            fontHeading: 'Space Grotesk',
            fontBody: 'Hanken Grotesk',
            backBgColor: '#1e293b',
            backPattern: 'minimal-logo',
            fields: {
              company: 'PRINTHUBBS ENTERPRISES',
              tagline: 'Precision Web-to-Print Atelier',
              name: 'ARJUN SHARMA',
              title: 'Creative Director & Founder',
              phone: '+91 98200 12345',
              email: 'arjun@printhubbs.in',
              website: 'www.printhubbs.in',
              address: 'Bandra-Kurla Complex, Mumbai - 400051',
              qrUrl: 'https://printhubbs.in/profile/arjun'
            }
          }
        },
        {
          id: 'sample_proj_2',
          title: 'Neeta Rai - Architect & Urbanist Classic',
          productId: 'standard-visiting-cards',
          date: '12 Sep 2026',
          thumbnail: 'https://lh3.googleusercontent.com/aida/AEtjO1WpmlCD0R4fQb8rglx5aizUOZBc7-LUZ0xaCn-QUtQ85dU9RkmRTiTmSVCqdWB1TA-lAo9hbNqIJOxnQx8HeP7d1NWcD031DQ8rQ4GHcqdQ94xvHRNHZCp-kiAgl1TOkwVuDO8M5PSm3nV9nkb_roKTYVVPuf3GQAu66ZRW7bc0znYoOtIba-APYcGY3EiwZcE8OTJpR37Y2hT5zw3dL9mZYS6krumUU1qkHE58V2pcc2VSuYZsbWoojgxy',
          designState: {
            templateId: 'tpl-creative-studio',
            bgColor: '#1e1b4b',
            accentColor: '#818cf8',
            textColor: '#f8fafc',
            secondaryTextColor: '#c7d2fe',
            fontHeading: 'Space Grotesk',
            fontBody: 'Hanken Grotesk',
            backBgColor: '#0f172a',
            backPattern: 'minimal-logo',
            fields: {
              company: 'STUDIO RAI DESIGN',
              tagline: 'Sustainable Architectural Visions',
              name: 'NEETA RAI',
              title: 'Principal Architect & Urbanist',
              phone: '+91 98450 67890',
              email: 'neeta@studiorai.in',
              website: 'www.studiorai.in',
              address: 'Indiranagar 100ft Road, Bengaluru - 560038',
              qrUrl: 'https://studiorai.in/portfolio'
            }
          }
        },
        {
          id: 'sample_proj_3',
          title: 'Royal Finds - Luxury Embossed Gold Monogram',
          productId: 'embossed-business-cards',
          date: '08 Sep 2026',
          thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
          designState: {
            templateId: 'tpl-luxury-monogram',
            bgColor: '#18181b',
            accentColor: '#d97706',
            textColor: '#fef3c7',
            secondaryTextColor: '#fde68a',
            fontHeading: 'Space Grotesk',
            fontBody: 'Hanken Grotesk',
            backBgColor: '#09090b',
            backPattern: 'minimal-logo',
            fields: {
              company: 'ROYAL FINDS JEWELLERY',
              tagline: 'Artisanal Heritage Jewels & Gems',
              name: 'VIKRAM SINGHANIA',
              title: 'Master Jeweller & Gemologist',
              phone: '+91 99100 88234',
              email: 'concierge@royalfinds.in',
              website: 'www.royalfinds.in',
              address: 'MG Road, South Extension, New Delhi - 110049',
              qrUrl: 'https://royalfinds.in/exclusive'
            }
          }
        },
        {
          id: 'sample_proj_4',
          title: 'Nexus Tech Labs - Modern QR vCard',
          productId: 'qr-smart-cards',
          date: '01 Sep 2026',
          thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
          designState: {
            templateId: 'tpl-tech-startup',
            bgColor: '#022c22',
            accentColor: '#10b981',
            textColor: '#ffffff',
            secondaryTextColor: '#a7f3d0',
            fontHeading: 'Space Grotesk',
            fontBody: 'JetBrains Mono',
            backBgColor: '#064e3b',
            backPattern: 'minimal-logo',
            fields: {
              company: 'NEXUS TECH LABS',
              tagline: 'Autonomous AI & Cloud Architecture',
              name: 'KAVYA REDDY',
              title: 'Chief Technology Officer',
              phone: '+91 97312 44556',
              email: 'kavya@nexustech.io',
              website: 'www.nexustech.io',
              address: 'HITEC City, Phase 2, Hyderabad - 500081',
              qrUrl: 'https://nexustech.io/kavya'
            }
          }
        }
      ];
    } catch (e) {
      return [];
    }
  }

  // --- MY PROJECTS & ORDER HISTORY VIEW ---
  renderProjectsAndOrders() {
    // 1. Render Saved Projects
    const projContainer = document.getElementById('my-projects-grid');
    if (projContainer) {
      if (this.myProjects.length === 0) {
        projContainer.innerHTML = `<p class="text-xs text-slate-500 col-span-full py-6 text-center">No saved projects yet. Custom designs created in the studio will appear here.</p>`;
      } else {
        projContainer.innerHTML = this.myProjects.map(proj => `
          <div class="p-3 bg-white border border-slate-200 rounded-lg hover:border-orange-300 transition flex flex-col justify-between shadow-sm hover:shadow-md">
            <div>
              <div class="w-full h-36 bg-slate-50 rounded mb-2 overflow-hidden flex items-center justify-center p-2 border border-slate-100">
                <img src="${proj.thumbnail}" alt="${proj.title}" class="w-full h-full object-contain" />
              </div>
              <h4 class="font-bold text-xs text-[#0f172a] truncate">${proj.title}</h4>
              <p class="text-[10px] text-slate-500 font-mono-spec mt-0.5">Saved: ${proj.date}</p>
            </div>
            <div class="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
              <button onclick="window.appRouter.loadProjectIntoStudio('${proj.id}')" class="btn-outline flex-1 py-1.5 text-[11px] text-center">Edit</button>
              <button onclick="window.appRouter.reorderProject('${proj.id}')" class="btn-primary flex-1 py-1.5 text-[11px] text-center font-bold">Reorder</button>
            </div>
          </div>
        `).join('');
      }
    }

    // 2. Render Order History
    const ordersContainer = document.getElementById('order-history-list');
    if (ordersContainer) {
      let orders = [];
      try {
        const stored = localStorage.getItem('printhubbs_order_history');
        orders = stored ? JSON.parse(stored) : [];
      } catch (e) {
        orders = [];
      }

      if (!orders || orders.length === 0) {
        orders = [
          {
            orderId: 'PH-2026-89421',
            date: '15 Sep 2026',
            status: 'In Transit (Out for Delivery)',
            trackingNumber: 'BLUEDART-88219401',
            total: 1298,
            items: [
              {
                productId: 'standard-visiting-cards',
                title: 'Standard Visiting Cards (Matte 350 GSM)',
                thumbnail: 'https://lh3.googleusercontent.com/aida/AEtjO1WpmlCD0R4fQb8rglx5aizUOZBc7-LUZ0xaCn-QUtQ85dU9RkmRTiTmSVCqdWB1TA-lAo9hbNqIJOxnQx8HeP7d1NWcD031DQ8rQ4GHcqdQ94xvHRNHZCp-kiAgl1TOkwVuDO8M5PSm3nV9nkb_roKTYVVPuf3GQAu66ZRW7bc0znYoOtIba-APYcGY3EiwZcE8OTJpR37Y2hT5zw3dL9mZYS6krumUU1qkHE58V2pcc2VSuYZsbWoojgxy',
                quantity: 200,
                totalPrice: 420
              },
              {
                productId: 'classic-polo-tshirts',
                title: 'Premium Corporate Embroidered Polo',
                thumbnail: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80',
                quantity: 2,
                totalPrice: 878
              }
            ]
          },
          {
            orderId: 'PH-2026-62180',
            date: '02 Sep 2026',
            status: 'Delivered',
            trackingNumber: 'DELHIVERY-54910283',
            total: 799,
            items: [
              {
                productId: 'personalised-photo-mugs',
                title: 'Custom Ceramic Coffee Mugs',
                thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
                quantity: 2,
                totalPrice: 458
              },
              {
                productId: 'self-inking-stamps',
                title: 'Self-Inking Return Address Stamp',
                thumbnail: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
                quantity: 1,
                totalPrice: 341
              }
            ]
          }
        ];
        localStorage.setItem('printhubbs_order_history', JSON.stringify(orders));
      }

      ordersContainer.innerHTML = orders.map(ord => `
        <div class="p-4 bg-white border border-slate-200 rounded-lg space-y-3 shadow-sm hover:border-slate-300 transition">
          <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <div>
              <span class="font-bold text-xs text-[#0f172a] font-mono-spec">ORDER ${ord.orderId}</span>
              <span class="text-[11px] text-slate-500 ml-2">Placed on ${ord.date}</span>
            </div>
            <span class="badge-pill-accent ${ord.status === 'Delivered' ? '!bg-emerald-50 !text-emerald-700 !border-emerald-200' : ''}">${ord.status}</span>
          </div>

          <!-- Items -->
          <div class="space-y-2">
            ${ord.items.map(it => `
              <div class="flex items-center justify-between text-xs font-mono-spec">
                <div class="flex items-center gap-2">
                  <img src="${it.thumbnail}" class="w-8 h-8 object-contain rounded border border-slate-200 bg-slate-50" />
                  <span class="font-semibold text-slate-800">${it.title} (x${it.quantity})</span>
                </div>
                <span class="text-[#ea580c] font-bold">₹${it.totalPrice.toLocaleString('en-IN')}</span>
              </div>
            `).join('')}
          </div>

          <!-- Status Tracking Stepper -->
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span class="text-slate-500">Tracking: <strong class="font-mono-spec text-slate-800">${ord.trackingNumber}</strong></span>
            <button onclick="window.appRouter.reorderFromHistory('${ord.orderId}')" class="btn-secondary px-3 py-1 text-[11px]">1-Click Reorder</button>
          </div>
        </div>
      `).join('');
    }

    // 3. Render Wishlist / Favourites
    const favContainer = document.getElementById('my-favourites-grid');
    if (favContainer) {
      const favProducts = window.PRINTSHUBB_DATA.products.filter(p => this.wishlist.includes(p.id));
      if (favProducts.length === 0) {
        favContainer.innerHTML = `<p class="text-xs text-slate-500 col-span-full py-6 text-center">No favourites saved yet. Click the heart icon on any product to save it here.</p>`;
      } else {
        favContainer.innerHTML = favProducts.map(p => this.createProductCardHtml(p)).join('');
      }
    }
  }

  loadProjectIntoStudio(projId) {
    const proj = this.myProjects.find(p => p.id === projId);
    if (!proj) return;
    const product = window.PRINTSHUBB_DATA.products.find(p => p.id === proj.productId) || window.PRINTSHUBB_DATA.products[0];
    this.navigate('studio', product);
    if (proj.designState) {
      window.studioEngine.state = JSON.parse(JSON.stringify(proj.designState));
      window.studioEngine.syncFormControls();
      window.studioEngine.render();
      window.showToast(`Loaded "${proj.title}" into studio`, 'success');
    }
  }

  reorderProject(projId) {
    const proj = this.myProjects.find(p => p.id === projId);
    if (!proj) return;
    const product = window.PRINTSHUBB_DATA.products.find(p => p.id === proj.productId) || window.PRINTSHUBB_DATA.products[0];
    window.cartEngine.addItem({
      productId: product.id,
      title: proj.title,
      category: product.categoryLabel,
      thumbnail: proj.thumbnail,
      quantity: 100,
      paperStock: 'Standard Matte 350 GSM',
      corners: 'Standard Square',
      finish: 'Standard Smooth Finish',
      sides: 'Single-Sided',
      unitPrice: (product.basePrice / 100).toFixed(2),
      totalPrice: product.basePrice,
      isCustomized: true
    });
    window.showToast(`Reordered "${proj.title}"! Added to cart.`, 'success');
    this.openCartDrawer();
  }

  reorderFromHistory(orderId) {
    const orders = JSON.parse(localStorage.getItem('printhubbs_order_history') || '[]');
    const ord = orders.find(o => o.orderId === orderId);
    if (!ord) return;
    ord.items.forEach(it => window.cartEngine.addItem({ ...it }));
    window.showToast(`Added items from Order ${orderId} back to cart!`, 'success');
    this.openCartDrawer();
  }

  // --- WISHLIST MANAGEMENT ---
  loadWishlist() {
    try {
      const stored = localStorage.getItem('printhubbs_wishlist');
      if (stored && JSON.parse(stored).length > 0) {
        return JSON.parse(stored);
      }
      return ['standard-visiting-cards', 'classic-polo-tshirts', 'personalised-photo-mugs'];
    } catch (e) {
      return ['standard-visiting-cards', 'classic-polo-tshirts', 'personalised-photo-mugs'];
    }
  }

  toggleWishlist(productId) {
    if (this.wishlist.includes(productId)) {
      this.wishlist = this.wishlist.filter(id => id !== productId);
      window.showToast('Removed from favourites', 'info');
    } else {
      this.wishlist.push(productId);
      window.showToast('Added to favourites', 'success');
    }
    localStorage.setItem('printhubbs_wishlist', JSON.stringify(this.wishlist));
    this.updateWishlistBadges();
    // Refresh current view if relevant
    if (this.currentView === 'home') {
      this.renderPopularProducts();
      this.renderTrendingProducts();
    } else if (this.currentView === 'catalog') {
      this.renderCatalogView();
    } else if (this.currentView === 'projects') {
      this.renderProjectsAndOrders();
    }
  }

  updateWishlistBadges() {
    const badges = document.querySelectorAll('.wishlist-counter-badge');
    const count = this.wishlist.length;
    badges.forEach(b => {
      b.textContent = count;
      if (count > 0) b.classList.remove('hidden');
    });
  }

  // --- CART DRAWER CONTROLLER ---
  openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.remove('translate-x-full');
      window.cartEngine.renderCartDrawer();
    }
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
      drawer.classList.add('translate-x-full');
    }
  }

  // --- UTILITY MODALS ---
  openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('hidden');
  }

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('hidden');
  }

  // Standalone QR Code Generator
  generateStandaloneQR() {
    const input = document.getElementById('standalone-qr-input');
    const canvas = document.getElementById('standalone-qr-canvas');
    if (!input || !canvas) return;
    const val = input.value.trim() || 'https://printhubbs.in';
    const ctx = canvas.getContext('2d');
    canvas.width = 250;
    canvas.height = 250;

    // Draw QR using matrix
    const size = 25;
    const cellSize = 250 / size;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 250, 250);
    ctx.fillStyle = '#0f172a';

    let hash = 0;
    for (let i = 0; i < val.length; i++) {
      hash = (hash << 5) - hash + val.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const inTL = r < 7 && c < 7;
        const inTR = r < 7 && c >= size - 7;
        const inBL = r >= size - 7 && c < 7;
        if (inTL || inTR || inBL) {
          const lr = inBL ? r - (size - 7) : r;
          const lc = inTR ? c - (size - 7) : c;
          const isBorder = lr === 0 || lr === 6 || lc === 0 || lc === 6;
          const isInner = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
          if (isBorder || isInner) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        } else if (r === 6 || c === 6) {
          if ((r + c) % 2 === 0) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        } else {
          if ((Math.abs(hash ^ (r * 31 + c * 17))) % 3 !== 0) ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  // Interactive Logo Maker
  generateLogo() {
    const name = document.getElementById('logo-brand-name')?.value || 'Atelier';
    const style = document.getElementById('logo-style-select')?.value || 'geometric';
    const canvas = document.getElementById('logo-maker-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 320;
    canvas.height = 200;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 320, 200);

    const initial = name.charAt(0).toUpperCase();

    if (style === 'geometric') {
      // Clean modern geometric cut
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 4;
      ctx.strokeRect(120, 30, 80, 80);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 48px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(initial, 160, 70);
    } else if (style === 'minimal') {
      // Concentric circles
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(160, 70, 42, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 44px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(initial, 160, 70);
    } else {
      // Luxury diamond
      ctx.save();
      ctx.translate(160, 70);
      ctx.rotate(Math.PI / 4);
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 3;
      ctx.strokeRect(-35, -35, 70, 70);
      ctx.restore();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 44px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(initial, 160, 70);
    }

    // Logo brand name below
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 20px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(name.toUpperCase(), 160, 145);

    ctx.fillStyle = '#ea580c';
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillText('EST. 2026', 160, 168);
  }

  // Bulk Order corporate submission
  handleBulkOrderSubmit(e) {
    e.preventDefault();
    this.closeModal('bulk-order-modal');
    window.showToast('Corporate bulk inquiry received! Our enterprise representative will contact you within 2 hours with discounted wholesale pricing.', 'success');
  }
}

// Toast notification helper
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toast-notification');
  if (!container) return;
  const colors = {
    success: 'bg-emerald-800 text-white border-emerald-600',
    warning: 'bg-amber-800 text-white border-amber-600',
    info: 'bg-[#0f172a] text-white border-[#ea580c]'
  };
  container.className = `fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-xl border text-xs font-semibold flex items-center gap-2.5 transition-all duration-300 ${colors[type] || colors.info}`;
  container.innerHTML = `
    <span>${message}</span>
    <button onclick="document.getElementById('toast-notification').classList.add('hidden')" class="ml-2 text-white/70 hover:text-white">✕</button>
  `;
  container.classList.remove('hidden');
  setTimeout(() => {
    container.classList.add('hidden');
  }, 4000);
};

// Global App Router Instance
document.addEventListener('DOMContentLoaded', () => {
  window.appRouter = new PrinthubbsApp();
});
