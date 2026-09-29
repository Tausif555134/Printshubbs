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

    // Hash-based routing for deep linking category hubs & product detail views
    window.addEventListener('hashchange', () => this.handleHashRoute());
    if (window.location.hash) {
      this.handleHashRoute();
    }
  }

  handleHashRoute() {
    const raw = window.location.hash.replace(/^#\/?/, '');
    if (!raw) return;
    const parts = raw.split('/');
    const route = parts[0];
    const param = parts[1];

    if (route === 'visiting-cards') {
      this.navigate('catalog', 'visiting-cards', false);
    } else if (route === 'clothing-apparel' || route === 'clothing') {
      this.navigate('catalog', 'clothing-apparel', false);
    } else if (route === 'catalog') {
      this.navigate('catalog', param || 'all', false);
    } else if (route === 'pdp' && param) {
      this.navigate('pdp', param, false);
    } else if (route === 'studio') {
      this.navigate('studio', param || 'standard-visiting-cards', false);
    } else if (route === 'projects') {
      this.navigate('projects', null, false);
    }
  }

  initUIEnhancements() {
    document.documentElement.classList.add('js-enabled');

    // Scroll-reveal animations for homepage sections
    const revealEls = document.querySelectorAll('main section');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(el => { el.classList.add('reveal-up'); io.observe(el); });
    } else {
      revealEls.forEach(el => el.classList.add('is-visible'));
    }

    // Back-to-top visibility
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      const onScroll = () => backToTop.classList.toggle('is-hidden', window.scrollY < 400);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Escape closes cart drawer & modals
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const drawer = document.getElementById('cart-drawer');
      if (drawer && !drawer.classList.contains('translate-x-full')) {
        this.closeCartDrawer();
        return;
      }
      const checkout = document.getElementById('checkout-modal');
      if (checkout && !checkout.classList.contains('hidden') && window.cartEngine && window.cartEngine.closeCheckoutModal) {
        window.cartEngine.closeCheckoutModal();
        return;
      }
      ['help-modal', 'signin-modal', 'bulk-order-modal'].forEach(id => {
        const m = document.getElementById(id);
        if (m && !m.classList.contains('hidden')) this.closeModal(id);
      });
    });
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
  navigate(viewName, param = null, updateHash = true) {
    this.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (updateHash) {
      if (viewName === 'home') {
        if (window.location.hash) history.pushState(null, '', window.location.pathname);
      } else if (viewName === 'catalog') {
        window.location.hash = param ? `catalog/${param}` : 'catalog';
      } else if (viewName === 'pdp') {
        const prodId = typeof param === 'string' ? param : (param ? param.id : '');
        window.location.hash = `pdp/${prodId}`;
      } else if (viewName === 'studio') {
        const prodId = typeof param === 'string' ? param : (param ? param.id : 'standard-visiting-cards');
        window.location.hash = `studio/${prodId}`;
      } else if (viewName === 'projects') {
        window.location.hash = 'projects';
      }
    }

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

  createProductCardHtml(product, useGridCard = false) {
    const isFav = this.wishlist.includes(product.id);
    const hasColors = product.colors && product.colors.length > 0;

    // Grid-style card for catalog views (compact, 4-column)
    if (useGridCard) {
      return `
        <article class="pcard" onclick="window.appRouter.navigate('pdp', '${product.id}')">
          <div class="pcard-img-wrap">
            <span class="pcard-badge">${product.pricePill || 'BUY NOW'}</span>
            <button onclick="event.stopPropagation(); window.appRouter.toggleWishlist('${product.id}')" class="pcard-wishlist ${isFav ? 'pcard-wishlist--active' : ''}" title="Save to Favourites" aria-pressed="${isFav}" aria-label="Save ${product.name} to favourites">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
            ${product.isNew ? `<span class="pcard-new-badge">New</span>` : ''}
            ${product.newBadge ? `<span class="pcard-new-badge">${product.newBadge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" class="pcard-img" loading="lazy" decoding="async" />
          </div>
          <div class="pcard-body">
            ${product.rating ? `
              <div class="pcard-rating">
                <span class="pcard-rating-stars">★★★★★</span>
                <span class="pcard-rating-score">${product.rating}</span>
                <span class="pcard-rating-count">(${product.reviewCount})</span>
              </div>
            ` : ''}
            <h3 class="pcard-title">${product.name}</h3>
            <p class="pcard-subtitle">${product.subtitle}</p>
            ${hasColors ? `
              <div class="pcard-colors">
                ${product.colors.slice(0, 5).map(c => `<span class="pcard-color-dot" style="background-color: ${c};"></span>`).join('')}
                ${product.extraColors ? `<span class="pcard-color-extra">+${product.extraColors}</span>` : ''}
              </div>
            ` : ''}
            <div class="pcard-footer">
              <div>
                <span class="pcard-price">${product.priceRange || '₹' + product.basePrice.toLocaleString('en-IN')}</span>
                ${product.pricePerUnit ? `<span class="pcard-price-per-unit">${product.pricePerUnit}</span>` : ''}
              </div>
              <span class="pcard-cta">Customize <span class="pcard-cta-arrow">→</span></span>
            </div>
          </div>
        </article>
      `;
    }

    // Original carousel-style card (for homepage horizontal scrolling)
    return `
      <article class="category-scroll-item product-card w-44 sm:w-52 bg-white border border-[#d9d9d9] rounded-lg p-3 hover:border-black flex flex-col justify-between group cursor-pointer relative" onclick="window.appRouter.navigate('pdp', '${product.id}')">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="badge-pill-accent"><span class="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>${product.pricePill || 'BUY NOW'}</span>
            <button onclick="event.stopPropagation(); window.appRouter.toggleWishlist('${product.id}')" class="w-7 h-7 rounded-full bg-white border border-[#d9d9d9] shadow-sm flex items-center justify-center text-[#595959] hover:text-black transition" title="Save to Favourites" aria-pressed="${isFav}" aria-label="Save ${product.name} to favourites">
              <svg class="w-3.5 h-3.5 ${isFav ? 'text-black fill-current' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
          </div>
          <div class="w-full h-36 bg-[#f3f3f3] rounded flex items-center justify-center mb-3 overflow-hidden p-2 relative">
            ${product.isNew ? `<span class="absolute top-2 left-2 bg-[#00a8cc] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">New</span>` : ''}
            ${product.newBadge ? `<span class="absolute top-2 left-2 bg-[#00a8cc] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">${product.newBadge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" class="h-full w-full object-contain group-hover:scale-105 transition duration-300 img-hq" loading="lazy" decoding="async" />
          </div>
          ${hasColors ? `
            <div class="flex items-center gap-1 mb-2">
              ${product.colors.map(c => `<span class="w-3 h-3 rounded-full border border-gray-300 inline-block shadow-inner" style="background-color: ${c};"></span>`).join('')}
              ${product.extraColors ? `<span class="text-[10px] text-[#595959] font-medium ml-1">+${product.extraColors}</span>` : ''}
            </div>
          ` : ''}
          <h3 class="text-xs sm:text-sm font-bold text-black group-hover:underline underline-offset-2 transition line-clamp-1">${product.name}</h3>
          <p class="text-[11px] text-[#595959] mt-0.5 line-clamp-2">${product.subtitle}</p>
        </div>
        <div class="mt-3 pt-2 border-t border-[#e6e6e6]">
          ${product.rating ? `
            <div class="flex items-center gap-1 text-[11px] text-black font-bold mb-1">
              <span class="text-[#eab308]">★★★★☆</span>
              <span>${product.rating}</span>
              <span class="text-[#595959] font-normal">(${product.reviewCount})</span>
            </div>
          ` : ''}
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-black">${product.priceRange || '₹' + product.basePrice.toLocaleString('en-IN')}</span>
            <span class="text-xs font-bold text-black group-hover:underline">Customize →</span>
          </div>
          ${product.pricePerUnit ? `<div class="text-[10px] text-[#595959] font-mono-spec mt-0.5">${product.pricePerUnit}</div>` : ''}
        </div>
      </article>
    `;
  }

  createShapeOrStockCardHtml(p) {
    const isFav = this.wishlist.includes(p.id);
    return `
      <article class="pcard" onclick="window.appRouter.navigate('pdp', '${p.id}')">
        <div class="pcard-img-wrap">
          ${p.pricePill ? `<span class="pcard-badge">${p.pricePill}</span>` : ''}
          <button onclick="event.stopPropagation(); window.appRouter.toggleWishlist('${p.id}')" class="pcard-wishlist ${isFav ? 'pcard-wishlist--active' : ''}" aria-label="Save ${p.name} to favourites">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </button>
          ${p.isNew ? `<span class="pcard-new-badge">New</span>` : ''}
          ${p.newBadge ? `<span class="pcard-new-badge">${p.newBadge}</span>` : ''}
          <img src="${p.image}" alt="${p.name}" class="pcard-img" loading="lazy" decoding="async" />
        </div>
        <div class="pcard-body">
          ${p.rating ? `
            <div class="pcard-rating">
              <span class="pcard-rating-stars">★★★★★</span>
              <span class="pcard-rating-score">${p.rating.toFixed(1)}</span>
              <span class="pcard-rating-count">(${p.reviewCount})</span>
            </div>
          ` : ''}
          <h3 class="pcard-title">${p.name}</h3>
          <p class="pcard-subtitle">${p.subtitle || ''}</p>
          <div class="pcard-footer">
            <div>
              <span class="pcard-price">${p.priceRange || '100 from ₹' + p.basePrice + '.00'}</span>
              <span class="pcard-price-per-unit">${p.pricePerUnit || '(₹' + (p.basePrice/100).toFixed(2) + ' each)'}</span>
            </div>
            <span class="pcard-cta">Customize <span class="pcard-cta-arrow">→</span></span>
          </div>
        </div>
      </article>
    `;
  }

  createApparelCardHtml(p) {
    const isFav = this.wishlist.includes(p.id);
    return `
      <article class="pcard" onclick="window.appRouter.navigate('pdp', '${p.id}')">
        <div class="pcard-img-wrap">
          ${p.pricePill ? `<span class="pcard-badge">${p.pricePill}</span>` : ''}
          <button onclick="event.stopPropagation(); window.appRouter.toggleWishlist('${p.id}')" class="pcard-wishlist ${isFav ? 'pcard-wishlist--active' : ''}" aria-label="Save ${p.name} to favourites">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </button>
          ${p.isNew ? `<span class="pcard-new-badge">New</span>` : ''}
          <img src="${p.image}" alt="${p.name}" class="pcard-img" style="object-fit: contain; padding: 8px;" loading="lazy" decoding="async" />
        </div>
        <div class="pcard-body">
          ${p.colors ? `
            <div class="pcard-colors">
              ${p.colors.slice(0, 5).map(c => `<span class="pcard-color-dot" style="background-color: ${c};"></span>`).join('')}
              ${p.extraColors ? `<span class="pcard-color-extra">+${p.extraColors}</span>` : ''}
            </div>
          ` : ''}
          <h3 class="pcard-title">${p.name}</h3>
          ${p.subtitle ? `<p class="pcard-subtitle">${p.subtitle}</p>` : ''}
          ${p.rating ? `
            <div class="pcard-rating">
              <span class="pcard-rating-stars">★★★★★</span>
              <span class="pcard-rating-score">${p.rating}</span>
              <span class="pcard-rating-count">(${p.reviewCount})</span>
            </div>
          ` : ''}
          <div class="pcard-footer">
            <div>
              <span class="pcard-price">${p.priceRange || 'From ₹' + p.basePrice + '.00 each'}</span>
            </div>
            <span class="pcard-cta">Customize <span class="pcard-cta-arrow">→</span></span>
          </div>
        </div>
      </article>
    `;
  }

  // --- CATALOG & BROWSE VIEW ---
  renderCatalogView() {
    const breadcrumbCurrent = document.getElementById('catalog-breadcrumb-current');
    const heroBannerContainer = document.getElementById('catalog-hero-banner');
    const contentArea = document.getElementById('catalog-content-area');
    if (!contentArea) return;

    // --- CASE 1: VISITING CARDS HUB (Exact Match to Screenshots 4, 5, 6) ---
    if (this.selectedCategory === 'visiting-cards') {
      if (breadcrumbCurrent) breadcrumbCurrent.textContent = 'Visiting Cards';
      
      // Hero Banner matching media_1790507746783.png
      if (heroBannerContainer) {
        heroBannerContainer.innerHTML = `
          <div class="bg-[#1f2937] text-white rounded-2xl overflow-hidden p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
            <div class="max-w-xl space-y-4">
              <h1 class="text-2xl sm:text-4xl font-bold font-display text-white">Visiting Cards</h1>
              <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
                Design and print professional visiting cards with high-definition printing capturing rich colors on premium quality paper.
              </p>
              <div class="flex flex-wrap gap-3 pt-2">
                <button onclick="window.appRouter.navigate('studio', 'standard-visiting-cards')" class="px-5 py-2.5 bg-white text-black font-bold text-xs sm:text-sm rounded-lg hover:bg-gray-100 transition shadow-sm">
                  Browse templates
                </button>
                <button onclick="window.appRouter.navigate('studio', 'standard-visiting-cards')" class="px-5 py-2.5 bg-white text-black font-bold text-xs sm:text-sm rounded-lg hover:bg-gray-100 transition shadow-sm">
                  Upload design
                </button>
                <button onclick="window.appRouter.navigate('projects')" class="px-5 py-2.5 bg-transparent border border-white text-white font-bold text-xs sm:text-sm rounded-lg hover:bg-white/10 transition">
                  Reorder
                </button>
              </div>
            </div>
            <div class="w-full md:w-1/2 flex justify-center">
              <img src="assets/images/visiting-cards-hero.jpg" alt="Visiting Cards Mockup" class="max-h-72 object-contain drop-shadow-2xl rounded-xl" />
            </div>
          </div>
        `;
      }

      const shapes = window.PRINTSHUBB_DATA.products.filter(p => p.category === 'visiting-cards' && p.shape);
      const stocks = window.PRINTSHUBB_DATA.products.filter(p => p.category === 'visiting-cards' && p.stockType);

      contentArea.innerHTML = `
        <!-- Section 1: Shop by shapes (Exact Match to media_1790507764674.png) -->
        <section class="mb-14">
          <h2 class="text-2xl font-bold text-black font-display mb-1">Shop by shapes</h2>
          <p class="text-sm text-[#595959] mb-6">Select from various shapes &amp; sizes.</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            ${shapes.map(p => this.createShapeOrStockCardHtml(p)).join('')}
          </div>
        </section>

        <!-- Section 2: Shop by paper stock & finishes (Exact Match to media_1790507968749.png) -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-black font-display mb-6">Shop by paper stock &amp; finishes</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            ${stocks.map(p => this.createShapeOrStockCardHtml(p)).join('')}
          </div>
        </section>
      `;
      return;
    }

    // --- CASE 2: CLOTHING, CAPS & BAGS HUB (Exact Match to Screenshots 1, 2, 3) ---
    if (this.selectedCategory === 'clothing-apparel') {
      if (breadcrumbCurrent) breadcrumbCurrent.textContent = 'Custom Clothing, Caps & Bags';
      if (heroBannerContainer) heroBannerContainer.innerHTML = '';

      const poloItems = window.PRINTSHUBB_DATA.products.filter(p => p.category === 'clothing-apparel' && p.subcategory === 'polo-tshirts');
      const otherClothing = window.PRINTSHUBB_DATA.products.filter(p => p.category === 'clothing-apparel' && p.subcategory !== 'polo-tshirts');

      contentArea.innerHTML = `
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Left Subcategories Sidebar (Matching media_1790506394985.png & media_1790507587534.png) -->
          <aside class="w-full md:w-56 flex-shrink-0 space-y-6 text-xs text-[#595959]">
            <div>
              <h3 class="font-bold text-black text-sm mb-3">Clothing</h3>
              <ul class="space-y-2">
                <li><a href="javascript:void(0)" class="font-bold text-black border-l-2 border-black pl-2 block">Polo T-Shirts</a></li>
                <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'custom-round-neck-tshirts')" class="hover:text-black block pl-2">T- Shirts</a></li>
                <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'custom-dress-shirts')" class="hover:text-black block pl-2">Office Shirts</a></li>
                <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'executive-hoodies')" class="hover:text-black block pl-2">Winterwear</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block pl-2">Bottomwear</a></li>
              </ul>
            </div>

            <div>
              <h3 class="font-bold text-black text-sm mb-3">Caps</h3>
              <ul class="space-y-2">
                <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'embroidered-caps')" class="hover:text-black block">Embroidered Caps</a></li>
                <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'freedom-rain-cap')" class="hover:text-black block">Printed Caps</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Cotton Caps</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Embroidered Denim Caps</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block font-semibold text-black">See all Caps</a></li>
              </ul>
            </div>

            <div>
              <h3 class="font-bold text-black text-sm mb-3">Bags</h3>
              <ul class="space-y-2">
                <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'harissons-laptop-bag')" class="hover:text-black block">Personalised Premium Laptop Bag</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Custom Embroidered Laptop Bag</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Harissons® Embroidered Laptop Bag</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Adidas Duffle Bags</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block font-semibold text-black">See all Bags</a></li>
              </ul>
            </div>

            <div>
              <h3 class="font-bold text-black text-sm mb-3">Explore More</h3>
              <ul class="space-y-2">
                <li><a href="javascript:void(0)" class="hover:text-black block">Raincoats</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Umbrellas</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Aprons</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Lab Coats</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Reflective Safety Vest</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Cambridge® Embroidered Blazers</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Custom Sports Shorts</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Scrub Suits</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Premium Sweatshirt with Hood</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Terry Zipper Jacket</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Customised Windcheaters</a></li>
                <li><a href="javascript:void(0)" class="hover:text-black block">Oversized Hoodies</a></li>
              </ul>
            </div>
          </aside>

          <!-- Right Content Area (Matching media_1790506394985.png, media_1790507587534.png, media_1790507610369.png) -->
          <div class="flex-grow">
            <!-- Hero Banner -->
            <div class="bg-[#f3f4f6] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
              <div class="max-w-lg space-y-3">
                <h1 class="text-2xl sm:text-3xl font-bold font-display text-black">Custom Clothing, Caps &amp; Bags</h1>
                <p class="text-xs sm:text-sm text-[#595959] leading-relaxed">
                  Wear your logo with pride - apparel &amp; merchandise crafted with precision embroidery and high-definition printing.
                </p>
                <div class="flex flex-wrap gap-2 pt-2">
                  <button onclick="window.appRouter.navigate('pdp', 'printed-polos-multi')" class="px-4 py-2 bg-white border border-[#d9d9d9] hover:border-black text-black font-bold text-xs rounded-lg shadow-sm transition">Polo T-Shirts</button>
                  <button onclick="window.appRouter.navigate('pdp', 'custom-round-neck-tshirts')" class="px-4 py-2 bg-white border border-[#d9d9d9] hover:border-black text-black font-bold text-xs rounded-lg shadow-sm transition">T- Shirts</button>
                  <button onclick="window.appRouter.navigate('pdp', 'custom-dress-shirts')" class="px-4 py-2 bg-white border border-[#d9d9d9] hover:border-black text-black font-bold text-xs rounded-lg shadow-sm transition">Custom Dress Shirts</button>
                </div>
              </div>
              <div class="w-full lg:w-1/2 flex justify-center">
                <img src="assets/images/apparel-hero.jpg" alt="Custom Apparel Assortment" class="max-h-60 object-contain rounded-xl" />
              </div>
            </div>

            <!-- Polo T-Shirts Section (Matching Screenshots 2 & 3) -->
            <div class="mb-10">
              <h2 class="text-2xl font-bold text-black font-display mb-6">Polo T-Shirts</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                ${poloItems.map(p => this.createApparelCardHtml(p)).join('')}
                <!-- Explore All Polo T-Shirts Card (Matching media_1790507610369.png) -->
                <div class="bg-white rounded-xl border border-transparent hover:border-[#d9d9d9] hover:shadow-md transition p-3 cursor-pointer group flex flex-col justify-between" onclick="window.appRouter.navigate('pdp', 'classic-polo-tshirts')">
                  <div class="relative bg-[#f8f9fa] rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center p-2 mb-3 border border-[#f0f0f0]">
                    <img src="assets/images/products/polo-tshirts.jpg" alt="Explore All Polo T-Shirts" class="w-full h-full object-contain group-hover:scale-105 transition duration-300" />
                  </div>
                  <div>
                    <h3 class="font-bold text-sm text-black group-hover:underline underline-offset-2 mb-2">Explore all Polo T-Shirts</h3>
                    <p class="text-xs text-[#595959]">View full range of corporate &amp; sports polos</p>
                  </div>
                  <div class="mt-4 pt-2 border-t border-[#e6e6e6] text-xs font-bold text-black group-hover:underline">
                    Shop Collection →
                  </div>
                </div>
              </div>
            </div>

            <!-- Other Apparel Items -->
            ${otherClothing.length > 0 ? `
              <div class="mb-10 pt-6 border-t border-[#e6e6e6]">
                <h2 class="text-xl font-bold text-black font-display mb-6">T-Shirts, Hoodies &amp; Caps</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  ${otherClothing.map(p => this.createProductCardHtml(p)).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
      return;
    }

    // --- CASE 3: ALL PRODUCTS OR OTHER CATEGORIES (Redesigned with sidebar + hero + sections) ---
    const catObj = window.PRINTSHUBB_DATA.categories.find(c => c.id === this.selectedCategory);
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = catObj ? catObj.name : 'View All';
    if (heroBannerContainer) heroBannerContainer.innerHTML = '';

    let filtered = window.PRINTSHUBB_DATA.products;
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    // Group products by category for sectioned display
    const visitingCards = window.PRINTSHUBB_DATA.products.filter(p => p.category === 'visiting-cards');
    const clothing = window.PRINTSHUBB_DATA.products.filter(p => p.category === 'clothing-apparel');
    const marketing = window.PRINTSHUBB_DATA.products.filter(p => p.category === 'marketing-materials');
    const packaging = window.PRINTSHUBB_DATA.products.filter(p => p.category === 'packaging');
    const stampsInk = window.PRINTSHUBB_DATA.products.filter(p => p.category === 'stamps-ink');
    const photoGifts = window.PRINTSHUBB_DATA.products.filter(p => p.category === 'photo-gifts');

    const isAllView = this.selectedCategory === 'all';

    contentArea.innerHTML = `
      <div class="catalog-layout" style="padding: 0;">
        <!-- LEFT SIDEBAR -->
        <aside class="catalog-sidebar" id="catalog-sidebar">
          ${this.buildCatalogSidebar()}
        </aside>

        <!-- RIGHT MAIN CONTENT -->
        <div class="catalog-main-content">
          <!-- Mobile sidebar toggle -->
          <button class="mobile-sidebar-toggle" onclick="document.getElementById('catalog-sidebar').classList.toggle('mobile-open'); this.textContent = document.getElementById('catalog-sidebar').classList.contains('mobile-open') ? 'Hide Categories' : 'Browse Categories'; this.style.setProperty('--after', document.getElementById('catalog-sidebar').classList.contains('mobile-open') ? '▴' : '▾');">Browse Categories</button>

          ${isAllView ? `
          <!-- HERO BANNER -->
          <div class="catalog-hero">
            <div class="catalog-hero-content">
              <h1 class="catalog-hero-title">Print Your Ideas</h1>
              <p class="catalog-hero-desc">High-quality custom printing for businesses, events and everyday needs. From visiting cards to apparel — everything custom printed.</p>
              <button class="catalog-hero-cta" onclick="document.getElementById('catalog-section-business').scrollIntoView({behavior:'smooth'})">Explore Products <span style="font-size:16px;">→</span></button>
            </div>
            <img src="assets/images/catalog-hero-banner.jpg" alt="Custom printing products showcase" class="catalog-hero-image img-hq-cover" />
          </div>

          <!-- CATEGORY SHOWCASE -->
          <div class="catalog-section">
            <h2 class="section-title">Explore Our Categories</h2>
            <p class="section-subtitle">Browse our wide range of custom printing categories</p>
            <div class="category-showcase-grid">
              <div class="category-showcase-card" onclick="window.appRouter.navigate('catalog', 'visiting-cards')">
                <div class="category-showcase-card-img-wrap">
                  <img src="assets/images/products/standard-visiting-cards.jpg" alt="Visiting Cards" class="category-showcase-card-img" loading="lazy" />
                </div>
                <div class="category-showcase-card-body">
                  <div class="category-showcase-card-title">Visiting Cards</div>
                  <div class="category-showcase-card-desc">22+ styles & finishes</div>
                </div>
              </div>
              <div class="category-showcase-card" onclick="window.appRouter.navigate('catalog', 'marketing-materials')">
                <div class="category-showcase-card-img-wrap">
                  <img src="assets/images/products/marketing-materials.jpg" alt="Signs & Marketing" class="category-showcase-card-img" loading="lazy" />
                </div>
                <div class="category-showcase-card-body">
                  <div class="category-showcase-card-title">Signs, Banners & Posters</div>
                  <div class="category-showcase-card-desc">Standees, flyers & more</div>
                </div>
              </div>
              <div class="category-showcase-card" onclick="window.appRouter.navigate('catalog', 'clothing-apparel')">
                <div class="category-showcase-card-img-wrap">
                  <img src="assets/images/products/polo-tshirts.jpg" alt="Clothing & Bags" class="category-showcase-card-img" loading="lazy" />
                </div>
                <div class="category-showcase-card-body">
                  <div class="category-showcase-card-title">Custom Clothing, Caps & Bags</div>
                  <div class="category-showcase-card-desc">Polos, t-shirts, caps & more</div>
                </div>
              </div>
              <div class="category-showcase-card" onclick="window.appRouter.navigate('catalog', 'packaging')">
                <div class="category-showcase-card-img-wrap">
                  <img src="assets/images/products/custom-labels.jpg" alt="Labels & Packaging" class="category-showcase-card-img" loading="lazy" />
                </div>
                <div class="category-showcase-card-body">
                  <div class="category-showcase-card-title">Labels, Stickers & Packaging</div>
                  <div class="category-showcase-card-desc">Custom branding materials</div>
                </div>
              </div>
              <div class="category-showcase-card" onclick="window.appRouter.navigate('catalog', 'stamps-ink')">
                <div class="category-showcase-card-img-wrap">
                  <img src="assets/images/products/self-inking-stamps.jpg" alt="Stamps & Ink" class="category-showcase-card-img" loading="lazy" />
                </div>
                <div class="category-showcase-card-body">
                  <div class="category-showcase-card-title">Custom Stamps & Ink</div>
                  <div class="category-showcase-card-desc">Self-inking & rubber stamps</div>
                </div>
              </div>
              <div class="category-showcase-card" onclick="window.appRouter.navigate('catalog', 'photo-gifts')">
                <div class="category-showcase-card-img-wrap">
                  <img src="assets/images/products/photo-mugs.jpg" alt="Mugs & Gifts" class="category-showcase-card-img" loading="lazy" />
                </div>
                <div class="category-showcase-card-body">
                  <div class="category-showcase-card-title">Mugs & Drinkware</div>
                  <div class="category-showcase-card-desc">Photo mugs, bottles & more</div>
                </div>
              </div>
              <div class="category-showcase-card" onclick="window.appRouter.navigate('pdp', 'letterheads')">
                <div class="category-showcase-card-img-wrap">
                  <img src="assets/images/products/letterheads.jpg" alt="Stationery" class="category-showcase-card-img" loading="lazy" />
                </div>
                <div class="category-showcase-card-body">
                  <div class="category-showcase-card-title">Stationery</div>
                  <div class="category-showcase-card-desc">Letterheads, diaries & pens</div>
                </div>
              </div>
              <div class="category-showcase-card" onclick="window.appRouter.navigate('pdp', 'corporate-gift-boxes')">
                <div class="category-showcase-card-img-wrap">
                  <img src="assets/images/products/corporate-gift-boxes.jpg" alt="Gifts" class="category-showcase-card-img" loading="lazy" />
                </div>
                <div class="category-showcase-card-body">
                  <div class="category-showcase-card-title">Gifts</div>
                  <div class="category-showcase-card-desc">Corporate gift hampers</div>
                </div>
              </div>
            </div>
          </div>
          ` : ''}

          ${isAllView ? `
          <!-- BUSINESS ESSENTIALS SECTION -->
          <div class="catalog-section" id="catalog-section-business">
            <div class="catalog-section-header">
              <h2 class="section-title">Business Essentials</h2>
              <p class="section-subtitle">Essential printing products for your business</p>
            </div>
            <div class="product-grid-4col">
              ${visitingCards.slice(0, 4).map(p => this.createProductCardHtml(p, true)).join('')}
            </div>
          </div>

          <!-- CLOTHING & BAGS SECTION -->
          <div class="catalog-section">
            <div class="catalog-section-header">
              <h2 class="section-title">Clothing & Bags</h2>
              <p class="section-subtitle">Custom apparel and promotional products</p>
            </div>
            <div class="product-grid-4col">
              ${clothing.slice(0, 4).map(p => this.createProductCardHtml(p, true)).join('')}
            </div>
          </div>

          <!-- SIGNS & MARKETING SECTION -->
          ${marketing.length > 0 ? `
          <div class="catalog-section">
            <div class="catalog-section-header">
              <h2 class="section-title">Signs, Posters & Marketing Materials</h2>
              <p class="section-subtitle">Professional marketing and signage products</p>
            </div>
            <div class="product-grid-4col">
              ${marketing.slice(0, 4).map(p => this.createProductCardHtml(p, true)).join('')}
            </div>
          </div>
          ` : ''}

          <!-- LABELS & PACKAGING SECTION -->
          ${packaging.length > 0 ? `
          <div class="catalog-section">
            <div class="catalog-section-header">
              <h2 class="section-title">Labels, Stickers & Packaging</h2>
              <p class="section-subtitle">Professional branding materials</p>
            </div>
            <div class="product-grid-4col">
              ${packaging.slice(0, 4).map(p => this.createProductCardHtml(p, true)).join('')}
            </div>
          </div>
          ` : ''}

          <!-- STAMPS & INK SECTION -->
          ${stampsInk.length > 0 ? `
          <div class="catalog-section">
            <div class="catalog-section-header">
              <h2 class="section-title">Custom Stamps & Ink</h2>
              <p class="section-subtitle">Rubber and self-inking stamps for every need</p>
            </div>
            <div class="product-grid-4col">
              ${stampsInk.slice(0, 4).map(p => this.createProductCardHtml(p, true)).join('')}
            </div>
          </div>
          ` : ''}

          <!-- HOME & GIFTS SECTION -->
          ${photoGifts.length > 0 ? `
          <div class="catalog-section">
            <div class="catalog-section-header">
              <h2 class="section-title">Home & Gifts</h2>
              <p class="section-subtitle">Personalised photo gifts and drinkware</p>
            </div>
            <div class="product-grid-4col">
              ${photoGifts.slice(0, 4).map(p => this.createProductCardHtml(p, true)).join('')}
            </div>
          </div>
          ` : ''}
          ` : `
          <!-- FILTERED CATEGORY VIEW -->
          <div class="catalog-section">
            <div class="catalog-section-header">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h2 class="section-title">${catObj ? catObj.name : 'Products'}</h2>
                  <p class="section-subtitle">Showing ${filtered.length} products</p>
                </div>
                <div class="flex items-center gap-2 text-xs">
                  <label for="catalog-sort-select" class="text-[#595959] font-medium">Sort by:</label>
                  <select id="catalog-sort-select" onchange="window.appRouter.sortCatalog(this.value)" class="input-atelier text-xs px-2.5 py-1" style="height:36px;">
                    <option value="popular">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>
            </div>
            <div id="catalog-products-grid" class="product-grid-4col">
              ${filtered.map(p => this.createProductCardHtml(p, true)).join('')}
            </div>
          </div>
          `}
        </div>
      </div>
    `;
  }

  buildCatalogSidebar() {
    return `
      <div class="catalog-sidebar-section">
        <div class="catalog-sidebar-heading">Trending Categories</div>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'visiting-cards')">Visiting Cards</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'clothing-apparel')">Clothing, Caps & Bags</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'marketing-materials')">Signs, Posters & Marketing Materials</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'packaging')">Labels, Stickers & Packaging</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'stamps-ink')">Stamps and Ink</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'photo-gifts')">Home & Gifts</a>
      </div>

      <div class="catalog-sidebar-section">
        <div class="catalog-sidebar-heading">Visiting Cards</div>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'standard-visiting-cards')">Standard Visiting Cards</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'classic-visiting-cards')">Classic Visiting Cards</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'rounded-corner-visiting-cards')">Rounded Corner Visiting Cards</a>
        <a class="catalog-sidebar-link catalog-sidebar-link--view-all" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'visiting-cards')">View all in Visiting Cards</a>
      </div>

      <div class="catalog-sidebar-section">
        <div class="catalog-sidebar-heading">Clothing & Bags</div>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'classic-polo-tshirts')">Custom Polo T-Shirts</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'custom-round-neck-tshirts')">Custom T-Shirts</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'custom-dress-shirts')">Custom Dress Shirts</a>
        <a class="catalog-sidebar-link catalog-sidebar-link--view-all" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'clothing-apparel')">View all in Clothing & Bags</a>
      </div>

      <div class="catalog-sidebar-section">
        <div class="catalog-sidebar-heading">Stationery</div>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'stamps-ink')">Stamps and Ink</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'letterheads')">Custom Letterheads</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'custom-notepads')">Customised Diaries</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'custom-pens')">Personalised Pens</a>
        <a class="catalog-sidebar-link catalog-sidebar-link--view-all" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'all')">View all in Stationery</a>
      </div>

      <div class="catalog-sidebar-section">
        <div class="catalog-sidebar-heading">Signs, Posters & Marketing</div>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'custom-flyers')">Flyers & Leaflets</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'rollup-standees')">Standees</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'canvas-prints')">Posters</a>
        <a class="catalog-sidebar-link catalog-sidebar-link--view-all" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'marketing-materials')">View all</a>
      </div>

      <div class="catalog-sidebar-section">
        <div class="catalog-sidebar-heading">Labels, Stickers & Packaging</div>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'custom-labels')">Custom Labels</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'stickers')">Custom Stickers</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'custom-mailer-boxes')">Custom Packaging</a>
        <a class="catalog-sidebar-link catalog-sidebar-link--view-all" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'packaging')">View all</a>
      </div>

      <div class="catalog-sidebar-section">
        <div class="catalog-sidebar-heading">Home & Gifts</div>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'photo-albums')">Photo Albums</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'personalised-photo-mugs')">Mugs</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'water-bottles')">Custom Drinkware</a>
        <a class="catalog-sidebar-link" href="javascript:void(0)" onclick="window.appRouter.navigate('pdp', 'corporate-gift-boxes')">Gift Hampers</a>
        <a class="catalog-sidebar-link catalog-sidebar-link--view-all" href="javascript:void(0)" onclick="window.appRouter.navigate('catalog', 'photo-gifts')">View all</a>
      </div>
    `;
  }

  sortCatalog(sortVal) {
    let filtered = window.PRINTSHUBB_DATA.products;
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }
    if (sortVal === 'price-low') {
      filtered.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortVal === 'price-high') {
      filtered.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortVal === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    const container = document.getElementById('catalog-products-grid');
    if (container) container.innerHTML = filtered.map(p => this.createProductCardHtml(p, true)).join('');
  }

  filterCatalog(categoryId) {
    this.selectedCategory = categoryId;
    this.renderCatalogView();
  }

  // --- SEARCH DROPDOWN ---
  renderSearchDropdown(matches, container) {
    if (matches.length === 0) {
      container.innerHTML = `
        <div class="p-3 text-xs text-[#595959] text-center">No products matching your search.</div>
      `;
      container.classList.remove('hidden');
      return;
    }

    container.innerHTML = `
      <div class="py-2 divide-y divide-[#e6e6e6] max-h-80 overflow-y-auto">
        ${matches.map(p => `
          <div onclick="window.appRouter.navigate('pdp', '${p.id}'); document.getElementById('search-dropdown').classList.add('hidden');" class="p-2.5 hover:bg-[#f3f3f3] flex items-center gap-3 cursor-pointer transition">
            <img src="${p.image}" class="w-10 h-10 object-contain rounded border border-[#d9d9d9] bg-white" />
            <div class="min-w-0 flex-grow">
              <div class="font-bold text-xs text-black truncate">${p.name}</div>
              <div class="text-[10px] text-[#595959]">${p.categoryLabel} • ${p.dimensions}</div>
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
    // Set default configuration options including colors, sizes, and shapes
    this.pdpOptions = {
      quantity: product.quantities ? product.quantities[0].qty : 100,
      paperStockId: product.paperStocks ? product.paperStocks[0].id : null,
      cornerId: product.corners ? product.corners[0].id : null,
      finishId: product.finishes ? product.finishes[0].id : null,
      sideId: product.sides ? product.sides[0].id : null,
      color: product.colors ? product.colors[0] : null,
      size: product.sizes ? product.sizes[0] : null,
      shapeId: product.shape || (product.category === 'visiting-cards' ? 'standard' : null)
    };

    const pdpTitle = document.getElementById('pdp-title');
    const pdpSubtitle = document.getElementById('pdp-subtitle');
    const pdpRating = document.getElementById('pdp-rating');
    const pdpImage = document.getElementById('pdp-preview-image');
    const pdpDims = document.getElementById('pdp-dimensions');

    if (pdpTitle) pdpTitle.textContent = product.fullName || product.name;
    if (pdpSubtitle) pdpSubtitle.textContent = product.subtitle;
    if (pdpRating) {
      if (product.rating) {
        pdpRating.innerHTML = `★ ${product.rating} <span class="text-[#595959] font-normal">(${product.reviewCount} customer reviews)</span> • <span class="text-black font-bold">100% Satisfaction Guaranteed</span>`;
      } else {
        pdpRating.innerHTML = `<span class="text-black font-bold">100% Satisfaction Guaranteed</span> • <span class="text-[#595959]">Enterprise Grade Quality</span>`;
      }
    }
    if (pdpImage) pdpImage.src = product.image;
    if (pdpDims) pdpDims.textContent = product.dimensions;

    this.renderPDPOptions();
    this.calculatePDPPrice();
  }

  renderPDPOptions() {
    const product = this.selectedProduct;
    if (!product) return;

    // A. Color Variants Selector (for apparel/merch)
    const colorSection = document.getElementById('pdp-color-section');
    const colorContainer = document.getElementById('pdp-colors-container');
    const colorNameLabel = document.getElementById('pdp-selected-color-name');
    if (colorSection && colorContainer) {
      if (product.colors && product.colors.length > 0) {
        colorSection.classList.remove('hidden');
        const colorNames = {
          '#000000': 'Midnight Black',
          '#ffffff': 'Pure White',
          '#1e3a8a': 'Deep Navy Blue',
          '#2563eb': 'Royal Blue',
          '#3b82f6': 'Sky Blue',
          '#dc2626': 'Classic Red',
          '#16a34a': 'Emerald Green',
          '#374151': 'Charcoal Heather',
          '#4b5563': 'Slate Gray',
          '#7f1d1d': 'Burgundy Wine',
          '#0d9488': 'Teal Ocean'
        };
        if (!this.pdpOptions.color) this.pdpOptions.color = product.colors[0];
        if (colorNameLabel) colorNameLabel.textContent = colorNames[this.pdpOptions.color] || this.pdpOptions.color;
        colorContainer.innerHTML = product.colors.map(c => `
          <button type="button" onclick="window.appRouter.setPDPOption('color', '${c}')" title="${colorNames[c] || c}" class="w-8 h-8 rounded-full border transition transform hover:scale-110 flex items-center justify-center ${this.pdpOptions.color === c ? 'ring-2 ring-black ring-offset-2 scale-105' : 'border-gray-300'}" style="background-color: ${c};">
            ${this.pdpOptions.color === c ? `<span class="w-2 h-2 rounded-full ${c === '#ffffff' ? 'bg-black' : 'bg-white'}"></span>` : ''}
          </button>
        `).join('');
      } else {
        colorSection.classList.add('hidden');
      }
    }

    // B. Size Selector (for apparel)
    const sizeSection = document.getElementById('pdp-size-section');
    const sizeContainer = document.getElementById('pdp-sizes-container');
    if (sizeSection && sizeContainer) {
      if (product.sizes && product.sizes.length > 0) {
        sizeSection.classList.remove('hidden');
        if (!this.pdpOptions.size) this.pdpOptions.size = product.sizes[0];
        sizeContainer.innerHTML = product.sizes.map(s => `
          <button type="button" onclick="window.appRouter.setPDPOption('size', '${s}')" class="px-4 py-2 border rounded-lg text-xs font-bold transition ${this.pdpOptions.size === s ? 'bg-black text-white border-black ring-2 ring-black shadow-sm' : 'bg-white text-black border-[#d9d9d9] hover:border-black'}">
            ${s}
          </button>
        `).join('');
      } else {
        sizeSection.classList.add('hidden');
      }
    }

    // C. Shape Selector (for visiting cards)
    const shapeSection = document.getElementById('pdp-shape-section');
    const shapeContainer = document.getElementById('pdp-shapes-container');
    if (shapeSection && shapeContainer) {
      if (product.category === 'visiting-cards') {
        shapeSection.classList.remove('hidden');
        const shapes = [
          { id: 'standard', name: 'Standard', dims: '8.9 × 5.1 cm' },
          { id: 'classic', name: 'Classic', dims: '8.9 × 5.1 cm' },
          { id: 'rounded', name: 'Rounded', dims: 'Quarter-inch' },
          { id: 'square', name: 'Square', dims: '6.5 × 6.5 cm' },
          { id: 'leaf', name: 'Leaf', dims: 'Leaf Arc' },
          { id: 'oval', name: 'Oval', dims: 'Smooth Arc' },
          { id: 'circle', name: 'Circle', dims: '6.5 cm Dia' },
          { id: 'custom', name: 'Custom Shape', dims: 'Laser Cut' }
        ];
        if (!this.pdpOptions.shapeId) this.pdpOptions.shapeId = product.shape || 'standard';
        shapeContainer.innerHTML = shapes.map(sh => `
          <button type="button" onclick="window.appRouter.setPDPOption('shapeId', '${sh.id}')" class="p-2.5 border rounded-lg text-left transition ${this.pdpOptions.shapeId === sh.id ? 'border-black bg-[#f3f3f3] ring-2 ring-black' : 'border-[#d9d9d9] bg-white hover:border-black'}">
            <div class="text-xs font-bold text-black">${sh.name}</div>
            <div class="text-[10px] text-[#595959]">${sh.dims}</div>
          </button>
        `).join('');
      } else {
        shapeSection.classList.add('hidden');
      }
    }

    // 1. Quantity Selector Grid
    const qtyContainer = document.getElementById('pdp-quantity-grid');
    if (qtyContainer && product.quantities) {
      qtyContainer.innerHTML = product.quantities.map(q => `
        <button type="button" onclick="window.appRouter.setPDPOption('quantity', ${q.qty})" aria-pressed="${this.pdpOptions.quantity === q.qty}" class="p-3 border rounded-lg text-left transition ${this.pdpOptions.quantity === q.qty ? 'border-black bg-[#f3f3f3] ring-2 ring-black' : 'border-[#d9d9d9] hover:border-black bg-white'}">
          <div class="flex justify-between items-center mb-1">
            <span class="font-bold text-xs text-black">${q.qty} units</span>
            ${q.discount ? `<span class="badge-pill-accent text-[9px]">${q.discount}</span>` : ''}
          </div>
          <div class="font-mono-spec text-xs font-bold text-black">₹${q.price.toLocaleString('en-IN')}</div>
          <div class="text-[10px] text-[#595959]">₹${q.perUnit}/unit</div>
        </button>
      `).join('');
    }

    // 2. Paper Stock Selector
    const stockContainer = document.getElementById('pdp-paper-stock-container');
    if (stockContainer && product.paperStocks) {
      stockContainer.innerHTML = product.paperStocks.map(stock => `
        <label class="p-3 border rounded-lg flex items-start gap-3 cursor-pointer transition ${this.pdpOptions.paperStockId === stock.id ? 'border-black bg-[#f3f3f3] ring-2 ring-black' : 'border-[#d9d9d9] bg-white hover:border-black'}">
          <input type="radio" name="pdp-stock" value="${stock.id}" ${this.pdpOptions.paperStockId === stock.id ? 'checked' : ''} onchange="window.appRouter.setPDPOption('paperStockId', '${stock.id}')" class="mt-1 accent-black" />
          <div class="flex-grow">
            <div class="flex justify-between items-center">
              <span class="font-bold text-xs text-black">${stock.name}</span>
              <span class="badge-pill-neutral">${stock.gsm}</span>
            </div>
            <p class="text-[11px] text-[#595959] mt-0.5">${stock.desc}</p>
          </div>
        </label>
      `).join('');
    }

    // 3. Corners Selector
    const cornerContainer = document.getElementById('pdp-corners-container');
    if (cornerContainer) {
      if (product.corners && product.corners.length > 0) {
        cornerContainer.parentElement.classList.remove('hidden');
        cornerContainer.innerHTML = product.corners.map(c => `
          <label class="p-3 border rounded-lg flex items-center justify-between cursor-pointer transition ${this.pdpOptions.cornerId === c.id ? 'border-black bg-[#f3f3f3] ring-2 ring-black' : 'border-[#d9d9d9] bg-white hover:border-black'}">
            <div class="flex items-center gap-2">
              <input type="radio" name="pdp-corner" value="${c.id}" ${this.pdpOptions.cornerId === c.id ? 'checked' : ''} onchange="window.appRouter.setPDPOption('cornerId', '${c.id}')" class="accent-black" />
              <span class="font-bold text-xs text-black">${c.name}</span>
            </div>
            ${c.priceAdd > 0 ? `<span class="text-[11px] font-mono-spec text-black font-bold">+₹${c.priceAdd}</span>` : '<span class="text-[11px] text-[#595959] font-bold">Included</span>'}
          </label>
        `).join('');
      } else {
        cornerContainer.parentElement.classList.add('hidden');
      }
    }

    // 4. Finishes Selector
    const finishContainer = document.getElementById('pdp-finishes-container');
    if (finishContainer) {
      if (product.finishes && product.finishes.length > 0) {
        finishContainer.parentElement.classList.remove('hidden');
        finishContainer.innerHTML = product.finishes.map(f => `
          <label class="p-3 border rounded-lg flex items-center justify-between cursor-pointer transition ${this.pdpOptions.finishId === f.id ? 'border-black bg-[#f3f3f3] ring-2 ring-black' : 'border-[#d9d9d9] bg-white hover:border-black'}">
            <div class="flex items-center gap-2">
              <input type="radio" name="pdp-finish" value="${f.id}" ${this.pdpOptions.finishId === f.id ? 'checked' : ''} onchange="window.appRouter.setPDPOption('finishId', '${f.id}')" class="accent-black" />
              <span class="font-bold text-xs text-black">${f.name}</span>
            </div>
            ${f.priceAdd > 0 ? `<span class="text-[11px] font-mono-spec text-black font-bold">+₹${f.priceAdd}</span>` : '<span class="text-[11px] text-[#595959] font-bold">Standard</span>'}
          </label>
        `).join('');
      } else {
        finishContainer.parentElement.classList.add('hidden');
      }
    }

    // 5. Sides Selector
    const sideContainer = document.getElementById('pdp-sides-container');
    if (sideContainer) {
      if (product.sides && product.sides.length > 0) {
        sideContainer.parentElement.classList.remove('hidden');
        sideContainer.innerHTML = product.sides.map(s => `
          <label class="p-3 border rounded-lg flex items-center justify-between cursor-pointer transition ${this.pdpOptions.sideId === s.id ? 'border-black bg-[#f3f3f3] ring-2 ring-black' : 'border-[#d9d9d9] bg-white hover:border-black'}">
            <div class="flex items-center gap-2">
              <input type="radio" name="pdp-sides" value="${s.id}" ${this.pdpOptions.sideId === s.id ? 'checked' : ''} onchange="window.appRouter.setPDPOption('sideId', '${s.id}')" class="accent-black" />
              <span class="font-bold text-xs text-black">${s.name}</span>
            </div>
            ${s.priceMult > 1.0 ? `<span class="text-[11px] font-mono-spec text-black font-bold">+35%</span>` : '<span class="text-[11px] text-[#595959] font-bold">Standard</span>'}
          </label>
        `).join('');
      } else {
        sideContainer.parentElement.classList.add('hidden');
      }
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
    const qtyTier = (product.quantities && product.quantities.find(q => q.qty === this.pdpOptions.quantity)) || (product.quantities ? product.quantities[0] : { qty: 1, price: product.basePrice });
    let totalPrice = qtyTier.price;

    // Apply stock multiplier
    const stock = product.paperStocks && product.paperStocks.find(s => s.id === this.pdpOptions.paperStockId);
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

    const qty = this.pdpOptions.quantity || 1;
    const perUnitPrice = (totalPrice / qty).toFixed(2);

    const priceEl = document.getElementById('pdp-calculated-price');
    const perUnitEl = document.getElementById('pdp-per-unit-price');
    if (priceEl) priceEl.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
    if (perUnitEl) perUnitEl.textContent = `(₹${perUnitPrice} per unit)`;

    this.currentCalculatedPDPPrice = {
      totalPrice,
      perUnitPrice,
      quantity: qty,
      stockName: stock ? stock.name : (product.category === 'clothing-apparel' ? 'Pique Cotton' : 'Standard Matte'),
      cornerName: product.corners ? product.corners.find(c => c.id === this.pdpOptions.cornerId)?.name : 'Standard',
      finishName: product.finishes ? product.finishes.find(f => f.id === this.pdpOptions.finishId)?.name : 'Standard',
      sideName: product.sides ? product.sides.find(s => s.id === this.pdpOptions.sideId)?.name : 'Single-Sided',
      color: this.pdpOptions.color,
      size: this.pdpOptions.size,
      shape: this.pdpOptions.shapeId
    };
  }

  // Quick add to cart from PDP (without customizer)
  addPDPToCart() {
    const product = this.selectedProduct;
    const calc = this.currentCalculatedPDPPrice;
    if (!product || !calc) return;

    window.cartEngine.addItem({
      productId: product.id,
      title: product.fullName || product.name,
      category: product.categoryLabel,
      thumbnail: product.image,
      quantity: calc.quantity,
      paperStock: calc.stockName,
      corners: calc.cornerName,
      finish: calc.finishName,
      sides: calc.sideName,
      color: calc.color,
      size: calc.size,
      shape: calc.shape,
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
        <button onclick="window.appRouter.applyStudioTemplate('${t.id}')" class="p-2.5 border border-[#d9d9d9] rounded-lg text-left hover:border-black transition flex items-center gap-3 bg-white w-full">
          <div class="w-12 h-8 rounded border border-[#8c8c8c] flex items-center justify-center font-bold text-[10px]" style="background-color: ${t.bgColor}; color: ${t.textColor};">
            Aa
          </div>
          <div class="min-w-0">
            <div class="font-bold text-xs text-black truncate">${t.name}</div>
            <div class="text-[10px] text-[#595959] font-mono-spec">${t.theme} • ${t.fontHeading}</div>
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
          thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=85',
          designState: {
            templateId: 'tpl-corporate-modern',
            bgColor: '#000000',
            accentColor: '#ffffff',
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
          thumbnail: 'assets/images/products/standard-visiting-cards.jpg',
          designState: {
            templateId: 'tpl-creative-studio',
            bgColor: '#1e1b4b',
            accentColor: '#818cf8',
            textColor: '#f8fafc',
            secondaryTextColor: '#c7d2fe',
            fontHeading: 'Space Grotesk',
            fontBody: 'Hanken Grotesk',
            backBgColor: '#000000',
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
          thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=85',
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
          thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=85',
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
        projContainer.innerHTML = `<p class="text-xs text-[#595959] col-span-full py-6 text-center">No saved projects yet. Custom designs created in the studio will appear here.</p>`;
      } else {
        projContainer.innerHTML = this.myProjects.map(proj => `
          <div class="p-3 bg-white border border-[#d9d9d9] rounded-lg hover:border-black transition flex flex-col justify-between shadow-sm hover:shadow-md">
            <div>
              <div class="w-full h-36 bg-[#f3f3f3] rounded mb-2 overflow-hidden flex items-center justify-center p-2 border border-[#e6e6e6]">
                <img src="${proj.thumbnail}" alt="${proj.title}" class="w-full h-full object-contain" />
              </div>
              <h4 class="font-bold text-xs text-black truncate">${proj.title}</h4>
              <p class="text-[10px] text-[#595959] font-mono-spec mt-0.5">Saved: ${proj.date}</p>
            </div>
            <div class="flex items-center gap-2 mt-3 pt-2 border-t border-[#e6e6e6]">
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
                thumbnail: 'assets/images/products/standard-visiting-cards.jpg',
                quantity: 200,
                totalPrice: 420
              },
              {
                productId: 'classic-polo-tshirts',
                title: 'Premium Corporate Embroidered Polo',
                thumbnail: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200&auto=format&fit=crop&q=85',
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
                thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&auto=format&fit=crop&q=85',
                quantity: 2,
                totalPrice: 458
              },
              {
                productId: 'self-inking-stamps',
                title: 'Self-Inking Return Address Stamp',
                thumbnail: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&auto=format&fit=crop&q=85',
                quantity: 1,
                totalPrice: 341
              }
            ]
          }
        ];
        localStorage.setItem('printhubbs_order_history', JSON.stringify(orders));
      }

      ordersContainer.innerHTML = orders.map(ord => `
        <div class="p-4 bg-white border border-[#d9d9d9] rounded-lg space-y-3 shadow-sm hover:border-black transition">
          <div class="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#e6e6e6]">
            <div>
              <span class="font-bold text-xs text-black font-mono-spec">ORDER ${ord.orderId}</span>
              <span class="text-[11px] text-[#595959] ml-2">Placed on ${ord.date}</span>
            </div>                <span class="badge-pill-accent ${ord.status === 'Delivered' ? '!bg-[#f3f3f3] !text-black shadow-[rgb(0_0_0)_0px_0px_0px_1px_inset]' : ''}">${ord.status}</span>
          </div>

          <!-- Items -->
          <div class="space-y-2">
            ${ord.items.map(it => `
              <div class="flex items-center justify-between text-xs font-mono-spec">
                <div class="flex items-center gap-2">
                  <img src="${it.thumbnail}" class="w-8 h-8 object-contain rounded border border-[#d9d9d9] bg-[#f3f3f3]" />
                  <span class="font-bold text-black">${it.title} (x${it.quantity})</span>
                </div>
                <span class="text-black font-bold">₹${it.totalPrice.toLocaleString('en-IN')}</span>
              </div>
            `).join('')}
          </div>

          <!-- Status Tracking Stepper -->
          <div class="pt-2 border-t border-[#e6e6e6] flex items-center justify-between text-[11px] text-[#595959]">
            <span>Tracking: <strong class="font-mono-spec text-black">${ord.trackingNumber}</strong></span>
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
        favContainer.innerHTML = `<p class="text-xs text-[#595959] col-span-full py-6 text-center">No favourites saved yet. Click the heart icon on any product to save it here.</p>`;
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
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer) {
      drawer.classList.remove('translate-x-full');
      window.cartEngine.renderCartDrawer();
    }
    if (overlay) {
      overlay.classList.remove('hidden');
      requestAnimationFrame(() => overlay.classList.remove('opacity-0'));
    }
    document.body.style.overflow = 'hidden';
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-drawer-overlay');
    if (drawer) drawer.classList.add('translate-x-full');
    if (overlay) {
      overlay.classList.add('opacity-0');
      setTimeout(() => overlay.classList.add('hidden'), 300);
    }
    document.body.style.overflow = '';
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
  // Standalone QR Code Generator with High-DPI Sharpness
  generateStandaloneQR() {
    const input = document.getElementById('standalone-qr-input');
    const canvas = document.getElementById('standalone-qr-canvas');
    if (!input || !canvas) return;
    const val = input.value.trim() || 'https://printhubbs.in';
    const ctx = canvas.getContext('2d');
    
    // High-DPI crisp buffer (scales with retina displays)
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    canvas.width = 250 * dpr;
    canvas.height = 250 * dpr;
    canvas.style.width = '250px';
    canvas.style.height = '250px';

    ctx.imageSmoothingEnabled = false; // Barcodes require crisp, unblurred edges

    const size = 25;
    const cellSize = (250 * dpr) / size;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';

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
          if (isBorder || isInner) ctx.fillRect(Math.round(c * cellSize), Math.round(r * cellSize), Math.ceil(cellSize), Math.ceil(cellSize));
        } else if (r === 6 || c === 6) {
          if ((r + c) % 2 === 0) ctx.fillRect(Math.round(c * cellSize), Math.round(r * cellSize), Math.ceil(cellSize), Math.ceil(cellSize));
        } else {
          if ((Math.abs(hash ^ (r * 31 + c * 17))) % 3 !== 0) ctx.fillRect(Math.round(c * cellSize), Math.round(r * cellSize), Math.ceil(cellSize), Math.ceil(cellSize));
        }
      }
    }
  }

  // Interactive Logo Maker with High-DPI Retina Rendering
  generateLogo() {
    const name = document.getElementById('logo-brand-name')?.value || 'Atelier';
    const style = document.getElementById('logo-style-select')?.value || 'geometric';
    const canvas = document.getElementById('logo-maker-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // High-DPI buffer scaling (enables retina 2x/3x crispness)
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    canvas.width = 320 * dpr;
    canvas.height = 200 * dpr;
    canvas.style.width = '320px';
    canvas.style.height = '200px';

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 320, 200);

    const initial = name.charAt(0).toUpperCase();

    if (style === 'geometric') {
      // Clean modern geometric cut
      ctx.strokeStyle = '#000000';
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
      ctx.strokeStyle = '#000000';
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

    ctx.fillStyle = '#000000';
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillText('EST. 2026', 160, 168);
    ctx.restore();
  }

  // Bulk Order corporate submission
  handleBulkOrderSubmit(e) {
    e.preventDefault();
    this.closeModal('bulk-order-modal');
    window.showToast('Corporate bulk inquiry received! Our enterprise representative will contact you within 2 hours with discounted wholesale pricing.', 'success');
  }
}

// Toast notification helper (animated, icon-backed)
window.showToast = function(message, type = 'info') {
  const container = document.getElementById('toast-notification');
  if (!container) return;
  const themes = {
    success: { bar: 'bg-black text-white border-white/40', icon: 'M5 13l4 4L19 7' },
    warning: { bar: 'bg-black text-white border-white/40', icon: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z' },
    info: { bar: 'bg-black text-white border-white/40', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
  };
  const theme = themes[type] || themes.info;
  container.className = `fixed bottom-6 right-6 z-[60] max-w-sm px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold flex items-center gap-3 toast-in ${theme.bar}`;
  container.innerHTML = `
    <span class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="${theme.icon}"></path></svg>
    </span>
    <span class="leading-snug">${message}</span>
    <button onclick="document.getElementById('toast-notification').classList.add('toast-out')" class="ml-1 text-white/60 hover:text-white text-base leading-none">✕</button>
  `;
  container.classList.remove('hidden', 'toast-out');
  // Force reflow so the entrance animation replays on consecutive toasts
  void container.offsetWidth;
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    container.classList.add('toast-out');
    setTimeout(() => container.classList.add('hidden'), 250);
  }, 4000);
};

// Global App Router Instance
document.addEventListener('DOMContentLoaded', () => {
  window.appRouter = new PrinthubbsApp();
  if (window.appRouter.initUIEnhancements) window.appRouter.initUIEnhancements();
});
