// ==========================================================================
// Printhubbs - Product Catalog & Business Configuration Data
// Based on stitch_website_ui_replica/DESIGN.md & vistaprint_india_features_functions.md
// ==========================================================================

const PRINTSHUBB_DATA = {
  categories: [
    { id: 'visiting-cards', name: 'Visiting Cards', icon: 'credit-card', count: '20+ Styles' },
    { id: 'shadi-cards', name: 'Shadi & Wedding Cards', icon: 'heart', count: 'Exclusive Luxury Collection' }
  ],

  products: [
    // --- 0. ROYAL SHADI CARDS & WEDDING INVITATIONS ---
    {
      id: 'royal-shadi-card',
      name: 'Royal Velvet Shadi Card',
      fullName: 'Royal Velvet Shubh Vivah Shadi Card',
      category: 'shadi-cards',
      categoryLabel: 'Shadi & Wedding Cards',
      subtitle: 'Deep crimson velvet cardstock with 3D embossed gold foil mandala, silk tassel & boxed envelope',
      basePrice: 450,
      pricePill: 'BUY 50 @ Rs.450',
      priceRange: '50 from ₹450.00',
      pricePerUnit: '(₹9.00 each)',
      rating: 4.9,
      reviewCount: 842,
      image: 'assets/images/products/royal-shadi-card.jpg',
      mockType: 'card',
      dimensions: '19 cm × 14 cm',
      customizable: true,
      popular: true,
      trending: true,
      quantities: [
        { qty: 50, price: 450, perUnit: '9.00', popular: true },
        { qty: 100, price: 850, perUnit: '8.50', discount: '5% OFF' },
        { qty: 250, price: 1950, perUnit: '7.80', discount: '12% OFF' },
        { qty: 500, price: 3600, perUnit: '7.20', discount: '20% OFF' },
        { qty: 1000, price: 6500, perUnit: '6.50', discount: '28% OFF' }
      ],
      paperStocks: [
        { id: 'royal-velvet-600', name: 'Royal Crimson Velvet Mounted Cardstock', gsm: '600 GSM', priceMult: 1.0, desc: 'Ultra-plush velvet finish with gold foil border and matching envelope' },
        { id: 'shimmer-gold-400', name: 'Imperial Metallic Gold Shimmer Stock', gsm: '400 GSM', priceMult: 1.15, desc: 'High-sheen metallic paper reflecting warm ambient light' },
        { id: 'deckled-cotton-350', name: 'Artisanal Handmade Cotton Deckled Paper', gsm: '350 GSM', priceMult: 1.25, desc: 'Eco-conscious textured vintage cotton paper with feathered edges' }
      ],
      corners: [
        { id: 'ornate-cut', name: 'Ornate Royal Scalloped Corners', priceAdd: 0 },
        { id: 'classic-square', name: 'Traditional 90° Square Cut', priceAdd: 0 }
      ],
      finishes: [
        { id: 'embossed-gold-foil', name: '3D Embossed Metallic Gold Foil Stamping', priceAdd: 0, desc: 'Gleaming 3D raised gold leaf foil detailing on auspicious shlokas & mandalas' },
        { id: 'rose-gold-foil', name: 'Raised Rose Gold Metallic Foil', priceAdd: 60, desc: 'Contemporary romantic rose gold metallic finish' },
        { id: 'antique-copper-foil', name: 'Antique Bronze & Copper Foil', priceAdd: 60, desc: 'Regal vintage metallic accent' }
      ],
      sides: [
        { id: 'single-sided', name: 'Single Royal Insert Card', priceMult: 1.0 },
        { id: 'double-sided', name: 'Multi-Function Program (Mehendi, Sangeet & Vivah)', priceMult: 1.4 }
      ]
    },
    {
      id: 'gold-laser-shadi-card',
      name: 'Luxury Laser-Cut Shadi Card',
      fullName: 'Luxury Gold Laser-Cut Shubh Vivah Shadi Card',
      category: 'shadi-cards',
      categoryLabel: 'Shadi & Wedding Cards',
      subtitle: 'Champagne gold shimmer cardstock with intricate peacock jali gatefold & satin ribbon bow',
      basePrice: 520,
      pricePill: 'BUY 50 @ Rs.520',
      priceRange: '50 from ₹520.00',
      pricePerUnit: '(₹10.40 each)',
      rating: 4.9,
      reviewCount: 624,
      image: 'assets/images/products/gold-laser-shadi-card.jpg',
      mockType: 'card',
      dimensions: '21 cm × 15 cm',
      customizable: true,
      popular: true,
      trending: true,
      quantities: [
        { qty: 50, price: 520, perUnit: '10.40', popular: true },
        { qty: 100, price: 980, perUnit: '9.80', discount: '6% OFF' },
        { qty: 250, price: 2250, perUnit: '9.00', discount: '14% OFF' },
        { qty: 500, price: 4200, perUnit: '8.40', discount: '20% OFF' },
        { qty: 1000, price: 7800, perUnit: '7.80', discount: '25% OFF' }
      ],
      paperStocks: [
        { id: 'champagne-shimmer-450', name: 'Champagne Gold Metallic Shimmer', gsm: '450 GSM', priceMult: 1.0, desc: 'Intricate precision laser-cut peacock and lotus jali gatefold' },
        { id: 'ivory-pearl-380', name: 'Royal Ivory Pearlized Cardstock', gsm: '380 GSM', priceMult: 1.1, desc: 'Lustrous pearlescent coating with soft gold undertones' }
      ],
      corners: [
        { id: 'standard', name: 'Die-cut Gatefold Lace Edge', priceAdd: 0 }
      ],
      finishes: [
        { id: 'gold-foil-ribbon', name: 'Gold Foil Lettering with Maroon Satin Ribbon & Seal', priceAdd: 0 },
        { id: 'silver-foil-ribbon', name: 'Silver Foil Lettering with Emerald Satin Ribbon', priceAdd: 40 }
      ],
      sides: [
        { id: 'gatefold-insert', name: 'Folded Gatefold with Central Insert', priceMult: 1.0 },
        { id: 'three-insert-suite', name: 'Full 3-Insert Event Suite (Haldi, Sangeet, Reception)', priceMult: 1.5 }
      ]
    },
    {
      id: 'floral-pastel-shadi-card',
      name: 'Floral Pastel Wax-Seal Shadi Card',
      fullName: 'Bespoke Floral Pastel Shadi Card with Monogram Wax Seal',
      category: 'shadi-cards',
      categoryLabel: 'Shadi & Wedding Cards',
      subtitle: 'Blush pink deckle-edge handmade cotton paper, gold floral foil stamping & customized wax seal',
      basePrice: 380,
      pricePill: 'BUY 50 @ Rs.380',
      priceRange: '50 from ₹380.00',
      pricePerUnit: '(₹7.60 each)',
      rating: 4.8,
      reviewCount: 512,
      image: 'assets/images/products/floral-pastel-shadi-card.jpg',
      mockType: 'card',
      dimensions: '18 cm × 13 cm',
      customizable: true,
      popular: true,
      trending: true,
      quantities: [
        { qty: 50, price: 380, perUnit: '7.60', popular: true },
        { qty: 100, price: 720, perUnit: '7.20', discount: '5% OFF' },
        { qty: 250, price: 1650, perUnit: '6.60', discount: '13% OFF' },
        { qty: 500, price: 3100, perUnit: '6.20', discount: '18% OFF' },
        { qty: 1000, price: 5800, perUnit: '5.80', discount: '24% OFF' }
      ],
      paperStocks: [
        { id: 'handmade-blush-350', name: 'Handmade Blush Pink Cotton Deckle Edge Paper', gsm: '350 GSM', priceMult: 1.0, desc: 'Feathered deckled edges with natural cotton texture' },
        { id: 'sage-green-deckle', name: 'Sage Green Artisanal Cotton Paper', gsm: '350 GSM', priceMult: 1.05, desc: 'Subtle botanical pastel tone with organic texture' }
      ],
      corners: [
        { id: 'deckled', name: 'Authentic Deckled Raw Edge', priceAdd: 0 }
      ],
      finishes: [
        { id: 'gold-wax-seal', name: 'Real Gold Monogram Wax Seal & Gold Leaf Foiling', priceAdd: 0 },
        { id: 'bronze-wax-seal', name: 'Antique Bronze Wax Seal & Gold Leaf Foiling', priceAdd: 30 }
      ],
      sides: [
        { id: 'single-sided', name: 'Single Invitation Card + Envelope', priceMult: 1.0 },
        { id: 'double-sided', name: 'Invitation + Itinerary Card + Envelope', priceMult: 1.35 }
      ]
    },
    // --- 1. VISITING CARDS ---
    {
      id: 'standard-visiting-cards',
      name: 'Standard',
      fullName: 'Standard Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      shape: 'standard',
      subtitle: 'Crisp 350 GSM premium paper with professional matte or gloss finish',
      basePrice: 200,
      pricePill: 'BUY 100 @ Rs.200',
      priceRange: '100 from ₹200.00',
      pricePerUnit: '(₹2.00 each)',
      rating: 4.4,
      reviewCount: 1770,
      image: 'assets/images/products/standard-visiting-cards.jpg',
      mockType: 'card',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 100, price: 200, perUnit: '2.00', popular: true },
        { qty: 250, price: 450, perUnit: '1.80', discount: '10% OFF' },
        { qty: 500, price: 800, perUnit: '1.60', discount: '20% OFF' },
        { qty: 1000, price: 1400, perUnit: '1.40', discount: '30% OFF' },
        { qty: 2500, price: 3250, perUnit: '1.30', discount: '35% OFF' }
      ],
      paperStocks: [
        { id: 'standard-matte', name: 'Standard Matte', gsm: '350 GSM', priceMult: 1.0, desc: 'Smooth, non-reflective coating ideal for readability' },
        { id: 'premium-glossy', name: 'Premium Glossy', gsm: '350 GSM', priceMult: 1.0, desc: 'High-shine reflective finish that boosts color saturation' },
        { id: 'velvet-touch', name: 'Velvet Touch Soft-Feel', gsm: '450 GSM', priceMult: 1.45, desc: 'Ultra-luxurious tactile feel with protective lamination' },
        { id: 'recycled-kraft', name: 'Organic Kraft Stock', gsm: '300 GSM', priceMult: 1.25, desc: 'Earthy unbleached texture for eco-conscious brands' },
        { id: 'non-tearable', name: 'Non-Tearable Synthetic', gsm: '280 GSM', priceMult: 1.6, desc: 'Waterproof, tearproof polyester matrix' }
      ],
      corners: [
        { id: 'standard-square', name: 'Standard 90° Square', priceAdd: 0 },
        { id: 'rounded-corner', name: 'Smooth Die-cut Rounded (6mm)', priceAdd: 50 }
      ],
      finishes: [
        { id: 'none', name: 'Standard Smooth Finish', priceAdd: 0 },
        { id: 'spot-uv', name: 'Raised Spot UV Gloss Accents', priceAdd: 180, desc: 'Eye-catching raised clear coating on your logo or text' },
        { id: 'gold-foil', name: 'Raised Metallic Gold Foil', priceAdd: 240, desc: 'Gleaming 3D metallic gold stamping that commands attention' },
        { id: 'silver-foil', name: 'Raised Metallic Silver Foil', priceAdd: 240, desc: 'Sleek futuristic chrome foil accenting key elements' }
      ],
      sides: [
        { id: 'single-sided', name: 'Single-Sided Print (Front)', priceMult: 1.0 },
        { id: 'double-sided', name: 'Double-Sided Print (Front & Back)', priceMult: 1.35 }
      ]
    },
    {
      id: 'classic-visiting-cards',
      name: 'Classic',
      fullName: 'Classic Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      shape: 'classic',
      subtitle: 'Refined timeless corporate cards with rich color reproduction',
      basePrice: 230,
      pricePill: 'BUY 100 @ Rs.230',
      priceRange: '100 from ₹230.00',
      pricePerUnit: '(₹2.30 each)',
      rating: 4.5,
      reviewCount: 243,
      image: 'assets/images/products/classic-visiting-cards.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 100, price: 230, perUnit: '2.30', popular: true },
        { qty: 250, price: 520, perUnit: '2.08' },
        { qty: 500, price: 920, perUnit: '1.84' }
      ],
      paperStocks: [
        { id: 'classic-silk', name: 'Classic Silk Matte', gsm: '350 GSM', priceMult: 1.0, desc: 'Smooth silk finish' },
        { id: 'classic-gloss', name: 'Classic Glossy', gsm: '350 GSM', priceMult: 1.0, desc: 'Reflective vibrant finish' }
      ],
      corners: [{ id: 'standard', name: 'Square Cut', priceAdd: 0 }],
      finishes: [{ id: 'none', name: 'Standard Smooth Finish', priceAdd: 0 }],
      sides: [{ id: 'single-sided', name: 'Single-Sided Print', priceMult: 1.0 }]
    },
    {
      id: 'rounded-corner-visiting-cards',
      name: 'Rounded Corner',
      fullName: 'Rounded Corner Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      shape: 'rounded',
      subtitle: 'Modern quarter-inch curved corners that won’t fray or bend in pockets',
      basePrice: 250,
      pricePill: 'BUY 100 @ Rs.250',
      priceRange: '100 from ₹250.00',
      pricePerUnit: '(₹2.50 each)',
      rating: 4.4,
      reviewCount: 542,
      image: 'assets/images/products/rounded-corner-cards.jpg',
      mockType: 'card-rounded',
      dimensions: '8.9 cm × 5.1 cm (Quarter-inch Radius)',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 100, price: 250, perUnit: '2.50', popular: true },
        { qty: 250, price: 550, perUnit: '2.20' },
        { qty: 500, price: 990, perUnit: '1.98' },
        { qty: 1000, price: 1750, perUnit: '1.75' }
      ],
      paperStocks: [
        { id: 'premium-matte', name: 'Premium Matte Silk', gsm: '350 GSM', priceMult: 1.0, desc: 'Ultra-smooth surface' },
        { id: 'velvet-touch', name: 'Velvet Touch Soft-Feel', gsm: '450 GSM', priceMult: 1.4, desc: 'Peach-fuzz matte texture' }
      ],
      corners: [
        { id: 'rounded-corner', name: 'Precision Die-Cut Rounded Corner', priceAdd: 0 }
      ],
      finishes: [
        { id: 'none', name: 'Standard Smooth Finish', priceAdd: 0 },
        { id: 'spot-uv', name: 'Spot UV Highlights', priceAdd: 180 }
      ],
      sides: [
        { id: 'single-sided', name: 'Single-Sided Print', priceMult: 1.0 },
        { id: 'double-sided', name: 'Double-Sided Print', priceMult: 1.35 }
      ]
    },
    {
      id: 'square-visiting-cards',
      name: 'Square',
      fullName: 'Square Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      shape: 'square',
      subtitle: 'Standout 6.5 cm x 6.5 cm contemporary square format with clean architectural symmetry',
      basePrice: 250,
      pricePill: 'BUY 100 @ Rs.250',
      priceRange: '100 from ₹250.00',
      pricePerUnit: '(₹2.50 each)',
      rating: 4.5,
      reviewCount: 72,
      image: 'assets/images/products/square-visiting-cards.jpg',
      dimensions: '6.5 cm × 6.5 cm Square',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 100, price: 250, perUnit: '2.50', popular: true },
        { qty: 250, price: 550, perUnit: '2.20' },
        { qty: 500, price: 990, perUnit: '1.98' }
      ],
      paperStocks: [
        { id: 'square-matte', name: 'Square Matte Heavyweight', gsm: '350 GSM', priceMult: 1.0, desc: 'Clean square cut' }
      ],
      corners: [{ id: 'square', name: 'Square 90°', priceAdd: 0 }],
      finishes: [{ id: 'none', name: 'Standard Smooth', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single Sided', priceMult: 1.0 }]
    },
    {
      id: 'leaf-visiting-cards',
      name: 'Leaf',
      fullName: 'Leaf Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      shape: 'leaf',
      subtitle: 'Botanical asymmetrical leaf silhouette with 2 diagonally rounded corners',
      basePrice: 270,
      pricePill: 'BUY 100 @ Rs.270',
      priceRange: '100 from ₹270.00',
      pricePerUnit: '(₹2.70 each)',
      rating: 4.6,
      reviewCount: 56,
      image: 'assets/images/products/leaf-visiting-cards.svg',
      dimensions: '8.9 cm × 5.1 cm (Leaf Die-cut)',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 100, price: 270, perUnit: '2.70', popular: true },
        { qty: 250, price: 600, perUnit: '2.40' }
      ],
      paperStocks: [
        { id: 'leaf-kraft', name: 'Natural Leaf Kraft', gsm: '350 GSM', priceMult: 1.0, desc: 'Organic feel' }
      ],
      corners: [{ id: 'leaf', name: 'Opposite Diagonal Rounded Corners', priceAdd: 0 }],
      finishes: [{ id: 'none', name: 'Matte Finish', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single Sided', priceMult: 1.0 }]
    },
    {
      id: 'oval-visiting-cards',
      name: 'Oval',
      fullName: 'Oval Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      shape: 'oval',
      subtitle: 'Smooth continuous elliptical curve that catches attention at first touch',
      basePrice: 270,
      pricePill: 'BUY 100 @ Rs.270',
      priceRange: '100 from ₹270.00',
      pricePerUnit: '(₹2.70 each)',
      rating: 4.7,
      reviewCount: 17,
      image: 'assets/images/products/oval-visiting-cards.svg',
      dimensions: '8.9 cm × 5.1 cm (Oval Silhouette)',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 100, price: 270, perUnit: '2.70' },
        { qty: 250, price: 600, perUnit: '2.40' }
      ],
      paperStocks: [
        { id: 'oval-matte', name: 'Smooth Matte Oval', gsm: '350 GSM', priceMult: 1.0, desc: 'Smooth die-cut contour' }
      ],
      corners: [{ id: 'oval', name: 'Smooth Oval Arc', priceAdd: 0 }],
      finishes: [{ id: 'none', name: 'Standard Smooth', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single Sided', priceMult: 1.0 }]
    },
    {
      id: 'circle-visiting-cards',
      name: 'Circle',
      fullName: 'Circle Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      shape: 'circle',
      subtitle: '6.5 cm circular die-cut cards perfect for badges, coasters, and creative logos',
      basePrice: 270,
      pricePill: 'BUY 100 @ Rs.270',
      priceRange: '100 from ₹270.00',
      pricePerUnit: '(₹2.70 each)',
      rating: 4.8,
      reviewCount: 34,
      image: 'assets/images/products/circle-visiting-cards.svg',
      dimensions: '6.5 cm Diameter Circle',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 100, price: 270, perUnit: '2.70' },
        { qty: 250, price: 600, perUnit: '2.40' }
      ],
      paperStocks: [
        { id: 'circle-matte', name: 'Circle Heavyweight Matte', gsm: '350 GSM', priceMult: 1.0, desc: 'Precision round die-cut' }
      ],
      corners: [{ id: 'circle', name: 'Continuous Round', priceAdd: 0 }],
      finishes: [{ id: 'none', name: 'Matte Finish', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single Sided', priceMult: 1.0 }]
    },
    {
      id: 'custom-shape-visiting-cards',
      name: 'Custom Shape',
      fullName: 'Custom Shape Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      shape: 'custom',
      isNew: true,
      subtitle: 'Custom laser die-cut shapes tailored to your exact brand logo silhouette',
      basePrice: 350,
      pricePill: 'BUY 100 @ Rs.350',
      priceRange: '100 from ₹350.00',
      pricePerUnit: '(₹3.50 each)',
      rating: 4.9,
      reviewCount: 12,
      image: 'assets/images/products/custom-shape-cards.svg',
      dimensions: 'Custom Shape (Max 9 cm × 5.5 cm)',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 100, price: 350, perUnit: '3.50' },
        { qty: 250, price: 800, perUnit: '3.20' }
      ],
      paperStocks: [
        { id: 'custom-matte', name: 'Rigid 400 GSM Laser Die Stock', gsm: '400 GSM', priceMult: 1.0, desc: 'Reinforced paper' }
      ],
      corners: [{ id: 'custom', name: 'Laser Contour Cut', priceAdd: 0 }],
      finishes: [{ id: 'none', name: 'Matte Lamination', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single Sided', priceMult: 1.0 }]
    },
    // --- 1B. VISITING CARDS: PAPER STOCK & FINISHES (Matching media_1790507968749.png) ---
    {
      id: 'glossy-visiting-cards',
      name: 'Glossy',
      fullName: 'Glossy Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'glossy',
      subtitle: 'High-gloss UV protective coating that makes rich colors and photography pop with reflection',
      basePrice: 200,
      pricePill: 'BUY 100 @ Rs.200',
      priceRange: '100 from ₹200.00',
      pricePerUnit: '(₹2.00 each)',
      rating: 4.7,
      reviewCount: 151,
      image: 'assets/images/products/glossy-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 100, price: 200, perUnit: '2.00', popular: true },
        { qty: 250, price: 450, perUnit: '1.80' },
        { qty: 500, price: 800, perUnit: '1.60' },
        { qty: 1000, price: 1400, perUnit: '1.40' }
      ],
      paperStocks: [
        { id: 'standard-glossy', name: 'Premium Glossy 350 GSM', gsm: '350 GSM', priceMult: 1.0, desc: 'High-shine reflective surface' }
      ],
      corners: [{ id: 'standard', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'gloss', name: 'Full UV Gloss Coating', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single-Sided', priceMult: 1.0 }, { id: 'double', name: 'Double-Sided', priceMult: 1.35 }]
    },
    {
      id: 'matte-visiting-cards',
      name: 'Matte',
      fullName: 'Matte Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'matte',
      subtitle: 'Silky smooth non-reflective finish providing exceptional contrast and easy readability',
      basePrice: 200,
      pricePill: 'BUY 100 @ Rs.200',
      priceRange: '100 from ₹200.00',
      pricePerUnit: '(₹2.00 each)',
      rating: 4.4,
      reviewCount: 196,
      image: 'assets/images/products/matte-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 100, price: 200, perUnit: '2.00', popular: true },
        { qty: 250, price: 450, perUnit: '1.80' },
        { qty: 500, price: 800, perUnit: '1.60' },
        { qty: 1000, price: 1400, perUnit: '1.40' }
      ],
      paperStocks: [
        { id: 'standard-matte', name: 'Standard Matte 350 GSM', gsm: '350 GSM', priceMult: 1.0, desc: 'Smooth, non-reflective coating' }
      ],
      corners: [{ id: 'standard', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'matte', name: 'Smooth Matte Lamination', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single-Sided', priceMult: 1.0 }, { id: 'double', name: 'Double-Sided', priceMult: 1.35 }]
    },
    {
      id: 'non-tearable-visiting-cards',
      name: 'Non-Tearable',
      fullName: 'Non-Tearable Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'non-tearable',
      subtitle: 'Waterproof, tearproof and smudgeproof synthetic polyester matrix built for ultimate durability',
      basePrice: 385,
      pricePill: 'BUY 100 @ Rs.385',
      priceRange: '100 from ₹385.00',
      pricePerUnit: '(₹3.85 each)',
      rating: 4.2,
      reviewCount: 53,
      image: 'assets/images/products/non-tearable-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 100, price: 385, perUnit: '3.85', popular: true },
        { qty: 250, price: 875, perUnit: '3.50' },
        { qty: 500, price: 1600, perUnit: '3.20' }
      ],
      paperStocks: [
        { id: 'synthetic-poly', name: '280 GSM Waterproof Synthetic Matrix', gsm: '280 GSM', priceMult: 1.0, desc: 'Untearable polymer base' }
      ],
      corners: [{ id: 'standard', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'synthetic', name: 'Water-Resistant Seal', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single-Sided', priceMult: 1.0 }, { id: 'double', name: 'Double-Sided', priceMult: 1.35 }]
    },
    {
      id: 'spot-uv-visiting-cards',
      name: 'Spot UV',
      fullName: 'Spot UV Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'spot-uv',
      newBadge: 'New options',
      subtitle: 'Raised dimensional glossy clear coat over selected logo & typography on velvet matte background',
      basePrice: 620,
      pricePill: 'BUY 100 @ Rs.620',
      priceRange: '100 from ₹620.00',
      pricePerUnit: '(₹6.20 each)',
      rating: 3.9,
      reviewCount: 124,
      image: 'assets/images/products/spot-uv-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 100, price: 620, perUnit: '6.20', popular: true },
        { qty: 250, price: 1400, perUnit: '5.60' },
        { qty: 500, price: 2600, perUnit: '5.20' }
      ],
      paperStocks: [
        { id: 'velvet-matte', name: 'Velvet Touch Matte 400 GSM', gsm: '400 GSM', priceMult: 1.0, desc: 'High-contrast matte backdrop' }
      ],
      corners: [{ id: 'standard', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'spot-uv', name: 'Raised 3D Spot UV Highlights', priceAdd: 0 }],
      sides: [{ id: 'front-uv', name: 'Front Spot UV', priceMult: 1.0 }]
    },
    {
      id: 'raised-foil-visiting-cards',
      name: 'Raised Foil Visiting Cards',
      fullName: 'Raised Foil Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'raised-foil',
      subtitle: 'Tangible raised metallic gold or silver foil stamping with brilliant light reflection',
      basePrice: 900,
      pricePill: 'BUY 100 @ Rs.900',
      priceRange: '100 from ₹900.00',
      pricePerUnit: '(₹9.00 each)',
      rating: null,
      reviewCount: null,
      image: 'assets/images/products/raised-foil-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 100, price: 900, perUnit: '9.00', popular: true },
        { qty: 250, price: 2100, perUnit: '8.40' },
        { qty: 500, price: 3900, perUnit: '7.80' }
      ],
      paperStocks: [
        { id: 'luxury-soft', name: 'Ultra-Soft Black 450 GSM Matrix', gsm: '450 GSM', priceMult: 1.0, desc: 'Heavyweight velvet board' }
      ],
      corners: [{ id: 'standard', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'gold-foil', name: 'Raised 3D Gold Foil', priceAdd: 0 }],
      sides: [{ id: 'front-foil', name: 'Front Foil Stamping', priceMult: 1.0 }]
    },
    {
      id: 'premium-plus-glossy',
      name: 'Premium Plus Glossy',
      fullName: 'Premium Plus Glossy Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'premium-plus-glossy',
      subtitle: 'Extra-thick 400 GSM heavyweight paper stock with mirror-sheen glossy coating',
      basePrice: 305,
      pricePill: 'BUY 100 @ Rs.305',
      priceRange: '100 from ₹305.00',
      pricePerUnit: '(₹3.05 each)',
      rating: 4.0,
      reviewCount: 140,
      image: 'assets/images/products/premium-plus-glossy-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 100, price: 305, perUnit: '3.05', popular: true },
        { qty: 250, price: 700, perUnit: '2.80' },
        { qty: 500, price: 1300, perUnit: '2.60' }
      ],
      paperStocks: [
        { id: '400-gloss', name: '400 GSM Ultra-Rigid Art Board', gsm: '400 GSM', priceMult: 1.0, desc: 'Substantial heavyweight feel' }
      ],
      corners: [{ id: 'standard', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'mirror-gloss', name: 'Mirror-Finish High Gloss', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single-Sided', priceMult: 1.0 }, { id: 'double', name: 'Double-Sided', priceMult: 1.35 }]
    },
    {
      id: 'magnetic-visiting-cards',
      name: 'Magnetic Visiting Cards',
      fullName: 'Magnetic Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'magnetic',
      subtitle: 'Flexible rubberized magnetic backing that sticks firmly to refrigerators, metal desks & cabinets',
      basePrice: 355,
      pricePill: 'BUY 25 @ Rs.355',
      priceRange: '25 from ₹355.00',
      pricePerUnit: '(₹14.20 each)',
      rating: 4.0,
      reviewCount: 8,
      image: 'assets/images/products/magnetic-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 25, price: 355, perUnit: '14.20', popular: true },
        { qty: 50, price: 650, perUnit: '13.00' },
        { qty: 100, price: 1150, perUnit: '11.50' }
      ],
      paperStocks: [
        { id: 'flexible-magnet', name: '0.4mm Flexible Magnetic Sheet', gsm: 'Magnetic', priceMult: 1.0, desc: 'Full-back magnet' }
      ],
      corners: [{ id: 'square', name: 'Clean Edge Cut', priceAdd: 0 }],
      finishes: [{ id: 'gloss-laminate', name: 'Gloss Protective Laminate', priceAdd: 0 }],
      sides: [{ id: 'front-only', name: 'Single-Sided (Magnet Back)', priceMult: 1.0 }]
    },
    {
      id: 'transparent-visiting-cards',
      name: 'Transparent',
      fullName: 'Transparent Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'transparent',
      subtitle: 'Cutting-edge frosted clear acrylic waterproof cards that create an instant unforgettable impression',
      basePrice: 1050,
      pricePill: 'BUY 100 @ Rs.1050',
      priceRange: '100 from ₹1,050.00',
      pricePerUnit: '(₹10.50 each)',
      rating: 3.2,
      reviewCount: 26,
      image: 'assets/images/products/transparent-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 100, price: 1050, perUnit: '10.50', popular: true },
        { qty: 250, price: 2400, perUnit: '9.60' },
        { qty: 500, price: 4400, perUnit: '8.80' }
      ],
      paperStocks: [
        { id: 'frosted-pvc', name: '0.38mm Semi-Frosted Clear PVC', gsm: 'Polymer', priceMult: 1.0, desc: 'Scratch-resistant plastic' }
      ],
      corners: [{ id: 'rounded', name: 'Smooth Rounded Corners', priceAdd: 0 }],
      finishes: [{ id: 'uv-ink', name: 'High-Density UV Ink Cure', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single-Sided Print', priceMult: 1.0 }]
    },
    {
      id: 'bulk-visiting-cards',
      name: 'Bulk Visiting Cards',
      fullName: 'Bulk Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'bulk',
      subtitle: 'Maximum enterprise value pack: 1,500 visiting cards printed on standard 300 GSM cardstock',
      basePrice: 1500,
      pricePill: 'BUY 1500 @ Rs.1500',
      priceRange: '1500 from ₹1,500.00',
      pricePerUnit: '(₹1.00 each)',
      rating: null,
      reviewCount: null,
      image: 'assets/images/products/bulk-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 1500, price: 1500, perUnit: '1.00', popular: true },
        { qty: 3000, price: 2700, perUnit: '0.90' },
        { qty: 5000, price: 4250, perUnit: '0.85' }
      ],
      paperStocks: [
        { id: 'bulk-300', name: 'Economy 300 GSM Matte Stock', gsm: '300 GSM', priceMult: 1.0, desc: 'High-volume corporate standard' }
      ],
      corners: [{ id: 'standard', name: 'Standard Square Cut', priceAdd: 0 }],
      finishes: [{ id: 'standard', name: 'Machine Varnish Coating', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single-Sided Print', priceMult: 1.0 }, { id: 'double', name: 'Double-Sided Print', priceMult: 1.3 }]
    },
    {
      id: 'velvet-touch-visiting-cards',
      name: 'Velvet Touch',
      fullName: 'Velvet Touch Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'velvet-touch',
      subtitle: 'Peach-fuzz soft feel matte coating delivering an irresistible tactile sensation in hand',
      basePrice: 300,
      pricePill: 'BUY 100 @ Rs.300',
      priceRange: '100 from ₹300.00',
      pricePerUnit: '(₹3.00 each)',
      rating: 4.0,
      reviewCount: 165,
      image: 'assets/images/products/velvet-touch-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: true,
      trending: true,
      quantities: [
        { qty: 100, price: 300, perUnit: '3.00', popular: true },
        { qty: 250, price: 700, perUnit: '2.80' },
        { qty: 500, price: 1300, perUnit: '2.60' }
      ],
      paperStocks: [
        { id: 'velvet-450', name: '450 GSM Heavy Velvet Touch Stock', gsm: '450 GSM', priceMult: 1.0, desc: 'Ultra-luxurious tactile feel' }
      ],
      corners: [{ id: 'standard', name: 'Standard Square Cut', priceAdd: 0 }],
      finishes: [{ id: 'velvet-lam', name: 'Soft-Touch Matte Lamination', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single-Sided', priceMult: 1.0 }, { id: 'double', name: 'Double-Sided', priceMult: 1.35 }]
    },
    {
      id: 'pearl-visiting-cards',
      name: 'Pearl Visiting Cards',
      fullName: 'Pearl Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'pearl',
      subtitle: 'Subtle metallic pearlescent shimmer embedded inside paper fibers reflecting warm luminous light',
      basePrice: 530,
      pricePill: 'BUY 100 @ Rs.530',
      priceRange: '100 from ₹530.00',
      pricePerUnit: '(₹5.30 each)',
      rating: null,
      reviewCount: null,
      image: 'assets/images/products/pearl-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 100, price: 530, perUnit: '5.30', popular: true },
        { qty: 250, price: 1250, perUnit: '5.00' },
        { qty: 500, price: 2350, perUnit: '4.70' }
      ],
      paperStocks: [
        { id: 'pearl-shimmer', name: '350 GSM Natural Pearl Shimmer', gsm: '350 GSM', priceMult: 1.0, desc: 'Natural luminous mineral coating' }
      ],
      corners: [{ id: 'standard', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'pearl-cure', name: 'Color-Fast Protective Coating', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single-Sided', priceMult: 1.0 }, { id: 'double', name: 'Double-Sided', priceMult: 1.35 }]
    },
    {
      id: 'kraft-visiting-cards',
      name: 'Kraft Visiting Cards',
      fullName: 'Kraft Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      stockType: 'kraft',
      subtitle: 'Earthy unbleached recycled wood pulp stock with authentic rustic fibers for eco-conscious brands',
      basePrice: 530,
      pricePill: 'BUY 100 @ Rs.530',
      priceRange: '100 from ₹530.00',
      pricePerUnit: '(₹5.30 each)',
      rating: null,
      reviewCount: null,
      image: 'assets/images/products/kraft-stock.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 100, price: 530, perUnit: '5.30', popular: true },
        { qty: 250, price: 1250, perUnit: '5.00' },
        { qty: 500, price: 2350, perUnit: '4.70' }
      ],
      paperStocks: [
        { id: 'kraft-300', name: 'Natural Brown Kraft 300 GSM', gsm: '300 GSM', priceMult: 1.0, desc: '100% Post-consumer recycled fibers' }
      ],
      corners: [{ id: 'standard', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'kraft-ink', name: 'Opaque Ink Stamping', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single-Sided', priceMult: 1.0 }, { id: 'double', name: 'Double-Sided', priceMult: 1.35 }]
    },
    {
      id: 'id-cards-badges',
      name: 'ID Cards & Badges',
      fullName: 'Custom ID Cards & Badges',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards & Badges',
      subtitle: 'Durable PVC & tearproof laminated cards with lanyard slot and high-res color photo printing',
      basePrice: 150,
      pricePill: 'BUY 10 @ Rs.150',
      priceRange: '10 from ₹150.00',
      pricePerUnit: '(₹15.00 each)',
      rating: 4.8,
      reviewCount: 312,
      image: 'assets/images/products/id-cards-badges.jpg',
      dimensions: '8.6 cm × 5.4 cm (CR80)',
      customizable: true,
      popular: true,
      trending: true,
      quantities: [
        { qty: 10, price: 150, perUnit: '15.00', popular: true },
        { qty: 25, price: 325, perUnit: '13.00' },
        { qty: 50, price: 550, perUnit: '11.00' },
        { qty: 100, price: 900, perUnit: '9.00' },
        { qty: 250, price: 2000, perUnit: '8.00' }
      ],
      paperStocks: [
        { id: 'pvc-cr80', name: 'Premium Solid PVC (CR80 30 Mil)', gsm: '760 Micron', priceMult: 1.0, desc: 'ISO 7810 compliant durable waterproof plastic card' },
        { id: 'synthetic-non-tear', name: 'Tearproof Laminated Synthetic', gsm: '400 GSM', priceMult: 0.85, desc: 'Flexible lightweight weatherproof card' }
      ],
      corners: [
        { id: 'rounded-corner', name: 'Rounded Corners (CR80 Standard)', priceAdd: 0 },
        { id: 'standard-square', name: 'Standard Square Corners', priceAdd: 0 }
      ],
      finishes: [
        { id: 'glossy-laminate', name: 'High-Gloss Protective Overlay', priceAdd: 0 },
        { id: 'matte-anti-scratch', name: 'Matte Anti-Scratch Lamination', priceAdd: 20 }
      ],
      sides: [
        { id: 'single-sided', name: 'Single-Sided Print', priceMult: 1.0 },
        { id: 'double-sided', name: 'Double-Sided Print (Front Photo + Back Rules)', priceMult: 1.4 }
      ],
      defaultTemplateId: 'tpl-corporate-modern'
    },

    // --- 1C. VISITING CARD DESIGNS (CARDS AS PRODUCTS) ---
    {
      id: 'care-clinic',
      name: 'Care Clinic & Healthcare',
      fullName: 'Care Clinic Visiting Card',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      subtitle: 'Multi-Speciality Medical Center with Emerald Cross Accent',
      basePrice: 200,
      pricePill: 'BUY 100 @ Rs.200',
      priceRange: '100 from ₹200.00',
      pricePerUnit: '(₹2.00 each)',
      rating: 4.8,
      reviewCount: 312,
      image: 'assets/images/templates/care-clinic.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: true,
      trending: false,
      defaultMatter: 'CARE ADVANCED DIAGNOSTICS\nMulti-Speciality Medical Center\nDR. SNEHA KULKARNI | MD, Consultant Physician\nPhone: +91 98220 99887 | appointments@careclinic.in\nJM Road, Shivajinagar, Pune - 411005',
      layout: 'healthcare-cross',
      bgColor: '#f0fdf4',
      accentColor: '#059669',
      textColor: '#064e3b',
      secondaryTextColor: '#047857',
      fontHeading: 'Inter',
      fontBody: 'Inter',
      backBgColor: '#064e3b',
      backPattern: 'minimal-logo',
      qrPosition: { align: 'bottom-right', size: 135 },
      logoStyle: 'cross',
      quantities: [
        { qty: 100, price: 200, perUnit: '2.00', popular: true },
        { qty: 250, price: 450, perUnit: '1.80' },
        { qty: 500, price: 800, perUnit: '1.60' },
        { qty: 1000, price: 1400, perUnit: '1.40' }
      ],
      paperStocks: [
        { id: 'standard-matte', name: 'Standard Matte', gsm: '350 GSM', priceMult: 1.0, desc: 'Smooth, non-reflective coating ideal for readability' },
        { id: 'premium-glossy', name: 'Premium Glossy', gsm: '350 GSM', priceMult: 1.0, desc: 'High-shine reflective finish' }
      ],
      corners: [
        { id: 'standard-square', name: 'Standard 90° Square', priceAdd: 0 },
        { id: 'rounded-corner', name: 'Rounded Corners', priceAdd: 50 }
      ],
      finishes: [
        { id: 'none', name: 'Standard Smooth Finish', priceAdd: 0 },
        { id: 'spot-uv', name: 'Spot UV Accents', priceAdd: 180 }
      ],
      sides: [
        { id: 'single-sided', name: 'Single-Sided Print', priceMult: 1.0 },
        { id: 'double-sided', name: 'Double-Sided Print', priceMult: 1.35 }
      ]
    },
    {
      id: 'luxury-dark-monogram',
      name: 'Luxury Dark Monogram',
      fullName: 'Luxury Dark Monogram Visiting Card',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      subtitle: 'Handcrafted Heritage Luxury with Warm Gold Accents',
      basePrice: 250,
      pricePill: 'BUY 100 @ Rs.250',
      priceRange: '100 from ₹250.00',
      pricePerUnit: '(₹2.50 each)',
      rating: 4.9,
      reviewCount: 420,
      image: 'assets/images/templates/luxury-dark-monogram.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: true,
      trending: true,
      defaultMatter: 'ROYAL FINDS JEWELLERY\nHandcrafted Heritage Luxury\nKABIR MEHTA | Managing Partner\nPhone: +91 99300 44556 | kabir@royalfinds.com\nPark Street, Kolkata - 700016',
      layout: 'luxury-gold',
      bgColor: '#131b2e',
      accentColor: '#f59e0b',
      textColor: '#ffffff',
      secondaryTextColor: '#94a3b8',
      fontHeading: 'Inter',
      fontBody: 'JetBrains Mono',
      backBgColor: '#0b0f19',
      backPattern: 'minimal-logo',
      qrPosition: { align: 'bottom-right', size: 140 },
      logoStyle: 'crest',
      quantities: [
        { qty: 100, price: 250, perUnit: '2.50', popular: true },
        { qty: 250, price: 550, perUnit: '2.20' },
        { qty: 500, price: 990, perUnit: '1.98' }
      ],
      paperStocks: [
        { id: 'velvet-touch', name: 'Velvet Touch Soft-Feel', gsm: '450 GSM', priceMult: 1.0, desc: 'Ultra-luxurious tactile feel' }
      ],
      corners: [{ id: 'standard-square', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'gold-foil', name: 'Raised Gold Foil', priceAdd: 240 }],
      sides: [{ id: 'single-sided', name: 'Single-Sided Print', priceMult: 1.0 }]
    },
    {
      id: 'nexus-tech-startup',
      name: 'Nexus Tech Startup',
      fullName: 'Nexus Tech Startup Visiting Card',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      subtitle: 'Autonomous AI Infrastructure with Cyan Modern Accents',
      basePrice: 220,
      pricePill: 'BUY 100 @ Rs.220',
      priceRange: '100 from ₹220.00',
      pricePerUnit: '(₹2.20 each)',
      rating: 4.9,
      reviewCount: 185,
      image: 'assets/images/templates/nexus-tech-startup.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: true,
      trending: true,
      defaultMatter: 'NEXUS CLOUD SYSTEMS\nAutonomous AI Infrastructure\nDEV PATEL | Chief Technology Officer\nPhone: +91 98450 78901 | dev@nexuscloud.io\nKoramangala 4th Block, Bengaluru - 560034',
      layout: 'tech-modern',
      bgColor: '#0a0f1d',
      accentColor: '#0284c7',
      textColor: '#ffffff',
      secondaryTextColor: '#94a3b8',
      fontHeading: 'Inter',
      fontBody: 'JetBrains Mono',
      backBgColor: '#050914',
      backPattern: 'minimal-logo',
      qrPosition: { align: 'bottom-right', size: 140 },
      logoStyle: 'code',
      quantities: [
        { qty: 100, price: 220, perUnit: '2.20', popular: true },
        { qty: 250, price: 490, perUnit: '1.96' },
        { qty: 500, price: 880, perUnit: '1.76' }
      ],
      paperStocks: [
        { id: 'standard-matte', name: 'Standard Matte', gsm: '350 GSM', priceMult: 1.0, desc: 'Smooth, non-reflective coating' }
      ],
      corners: [{ id: 'standard-square', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'none', name: 'Standard Smooth Finish', priceAdd: 0 }],
      sides: [{ id: 'single-sided', name: 'Single-Sided Print', priceMult: 1.0 }]
    },
    {
      id: 'modern-executive',
      name: 'Modern Executive',
      fullName: 'Modern Executive Visiting Card',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      subtitle: 'Precision Web-to-Print Atelier with Sleek Monochrome Look',
      basePrice: 240,
      pricePill: 'BUY 100 @ Rs.240',
      priceRange: '100 from ₹240.00',
      pricePerUnit: '(₹2.40 each)',
      rating: 4.8,
      reviewCount: 94,
      image: 'assets/images/templates/modern-executive.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: false,
      defaultMatter: 'PRINTHUBBS ENTERPRISES\nPrecision Web-to-Print Atelier\nARJUN SHARMA | Creative Director & Founder\nPhone: +91 98200 12345 | arjun@printhubbs.in\nBandra-Kurla Complex, Mumbai - 400051',
      layout: 'executive-left',
      bgColor: '#000000',
      accentColor: '#ffffff',
      textColor: '#ffffff',
      secondaryTextColor: '#a3a3a3',
      fontHeading: 'Space Grotesk',
      fontBody: 'Hanken Grotesk',
      backBgColor: '#1e293b',
      backPattern: 'minimal-logo',
      qrPosition: { align: 'bottom-right', size: 140 },
      logoStyle: 'monogram',
      quantities: [
        { qty: 100, price: 240, perUnit: '2.40', popular: true },
        { qty: 250, price: 530, perUnit: '2.12' }
      ],
      paperStocks: [{ id: 'standard-matte', name: 'Standard Matte', gsm: '350 GSM', priceMult: 1.0, desc: 'Smooth matte finish' }],
      corners: [{ id: 'standard-square', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'none', name: 'Standard Smooth Finish', priceAdd: 0 }],
      sides: [{ id: 'single-sided', name: 'Single-Sided Print', priceMult: 1.0 }]
    },
    {
      id: 'neeta-rai-classic',
      name: 'Neeta Rai Classic',
      fullName: 'Neeta Rai Classic Visiting Card',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      subtitle: 'Clean Minimalist Monochrome Design with Balanced Typography',
      basePrice: 200,
      pricePill: 'BUY 100 @ Rs.200',
      priceRange: '100 from ₹200.00',
      pricePerUnit: '(₹2.00 each)',
      rating: 4.7,
      reviewCount: 160,
      image: 'assets/images/templates/neeta-rai-classic.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: false,
      defaultMatter: 'PRINTHUBBS STUDIO\nContemporary Design & Print\nNEETA RAI | Lead Product Designer\nPhone: +91 98201 54321 | neeta.rai@printhubbs.in\nBKC, Mumbai - 400051',
      layout: 'minimal-clean',
      bgColor: '#ffffff',
      accentColor: '#000000',
      textColor: '#000000',
      secondaryTextColor: '#595959',
      fontHeading: 'Inter',
      fontBody: 'Inter',
      backBgColor: '#0f172a',
      backPattern: 'minimal-logo',
      qrPosition: { align: 'bottom-right', size: 135 },
      logoStyle: 'minimal',
      quantities: [
        { qty: 100, price: 200, perUnit: '2.00', popular: true },
        { qty: 250, price: 450, perUnit: '1.80' }
      ],
      paperStocks: [{ id: 'standard-matte', name: 'Standard Matte', gsm: '350 GSM', priceMult: 1.0, desc: 'Smooth matte finish' }],
      corners: [{ id: 'standard-square', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'none', name: 'Standard Smooth Finish', priceAdd: 0 }],
      sides: [{ id: 'single-sided', name: 'Single-Sided Print', priceMult: 1.0 }]
    },
    {
      id: 'studio-rai-creative',
      name: 'Studio Rai Creative',
      fullName: 'Studio Rai Creative Visiting Card',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      subtitle: 'Creative Indigo Architectural Design Card with Indigo Accents',
      basePrice: 260,
      pricePill: 'BUY 100 @ Rs.260',
      priceRange: '100 from ₹260.00',
      pricePerUnit: '(₹2.60 each)',
      rating: 4.8,
      reviewCount: 88,
      image: 'assets/images/templates/studio-rai-creative.svg',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: false,
      defaultMatter: 'STUDIO RAI DESIGN\nSustainable Architectural Visions\nNEETA RAI | Principal Architect & Urbanist\nPhone: +91 98450 67890 | neeta@studiorai.in\nIndiranagar 100ft Road, Bengaluru - 560038',
      layout: 'creative-bold',
      bgColor: '#1e1b4b',
      accentColor: '#818cf8',
      textColor: '#f8fafc',
      secondaryTextColor: '#c7d2fe',
      fontHeading: 'Space Grotesk',
      fontBody: 'Hanken Grotesk',
      backBgColor: '#0f0e26',
      backPattern: 'minimal-logo',
      qrPosition: { align: 'bottom-right', size: 140 },
      logoStyle: 'creative',
      quantities: [
        { qty: 100, price: 260, perUnit: '2.60', popular: true },
        { qty: 250, price: 580, perUnit: '2.32' }
      ],
      paperStocks: [{ id: 'standard-matte', name: 'Standard Matte', gsm: '350 GSM', priceMult: 1.0, desc: 'Smooth matte finish' }],
      corners: [{ id: 'standard-square', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'none', name: 'Standard Smooth Finish', priceAdd: 0 }],
      sides: [{ id: 'single-sided', name: 'Single-Sided Print', priceMult: 1.0 }]
    }
  ],

  // Direct entity resolver: finds product or card by ID
  getProduct(id) {
    if (!id) return null;
    return this.products.find(p => p.id === id) || null;
  },

  getCard(id) {
    return this.getProduct(id);
  },

  // Legacy helper redirecting to real product
  getTemplate(id) {
    return this.getProduct(id);
  },

  deliveryPincodes: {
    sameDayPincodes: ['400', '560', '700'],
    sameDayCities: ['Mumbai', 'Bengaluru', 'Kolkata'],
    standardDays: '3 to 5 business days',
    sameDayFee: 149,
    standardFee: 79,
    freeDeliveryThreshold: 999
  },

  coupons: {
    'HUB5': { minOrder: 10000, discountPercent: 5, description: 'Flat 5% OFF on Orders ₹10,000+' },
    'FIRST15': { minOrder: 0, discountPercent: 15, description: '15% OFF First Order' },
    'PRINT10': { minOrder: 2000, discountPercent: 10, description: '10% OFF on Orders ₹2,000+' }
  }
};

window.PRINTSHUBB_DATA = PRINTSHUBB_DATA;

