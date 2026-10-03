// ==========================================================================
// Printhubbs - Product Catalog & Business Configuration Data
// Based on stitch_website_ui_replica/DESIGN.md & vistaprint_india_features_functions.md
// ==========================================================================

const PRINTSHUBB_DATA = {
  categories: [
    { id: 'visiting-cards', name: 'Visiting Cards', icon: 'credit-card', count: '22+ Styles' },
    { id: 'marketing-materials', name: 'Signs, Posters & Marketing Materials', icon: 'file-text', count: '18+ Items' },
    { id: 'stamps-ink', name: 'Stamps and Ink', icon: 'check-square', count: '8+ Models' },
    { id: 'packaging', name: 'Labels, Stickers & Packaging', icon: 'package', count: '12+ Types' },
    { id: 'clothing-apparel', name: 'Clothing, Caps & Bags', icon: 'shirt', count: '16+ Styles' },
    { id: 'photo-gifts', name: 'Mugs, Albums & Gifts', icon: 'gift', count: '15+ Gifts' }
  ],

  products: [
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

    // --- 2. APPAREL & MERCH ---
    {
      id: 'printed-polos-multi',
      name: 'Printed Polos - Multi Location',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subcategory: 'polo-tshirts',
      subtitle: '220 GSM combed cotton with high-definition front, back & sleeve printing options',
      basePrice: 460,
      pricePill: 'BUY 1 @ Rs.460',
      priceRange: '₹460.00 - ₹590.00 each',
      rating: 4.2,
      reviewCount: 57,
      colors: ['#000000', '#ffffff', '#2563eb', '#16a34a', '#dc2626'],
      extraColors: 4,
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      image: 'assets/images/products/polo-tshirts.jpg',
      dimensions: 'Sizes S to 3XL',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 1, price: 460, perUnit: '460' },
        { qty: 5, price: 2150, perUnit: '430' },
        { qty: 10, price: 3900, perUnit: '390' }
      ],
      paperStocks: [
        { id: 'combed-cotton', name: '220 GSM Cotton Pique', gsm: '220 GSM', priceMult: 1.0, desc: 'Breathable knit' }
      ],
      corners: [{ id: 'standard', name: 'Reinforced Ribbed Collar', priceAdd: 0 }],
      finishes: [{ id: 'screen', name: 'Multi-Location Screen Print', priceAdd: 0 }],
      sides: [{ id: 'front-back', name: 'Front & Back Logo', priceMult: 1.0 }]
    },
    {
      id: 'classic-polo-tshirts',
      name: "Men's Polo T-Shirts",
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subcategory: 'polo-tshirts',
      subtitle: 'Classic corporate pique polo with ribbed collar and double-stitched hem',
      basePrice: 460,
      pricePill: 'BUY 1 @ Rs.460',
      priceRange: '₹460.00 - ₹590.00 each',
      rating: 4.4,
      reviewCount: 237,
      colors: ['#000000', '#1e3a8a', '#991b1b', '#3b82f6'],
      extraColors: 6,
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      image: 'assets/images/products/polo-tshirts.jpg',
      dimensions: 'Sizes S, M, L, XL, XXL, 3XL',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 1, price: 460, perUnit: '460' },
        { qty: 5, price: 2150, perUnit: '430' },
        { qty: 10, price: 3900, perUnit: '390', discount: '15% OFF' },
        { qty: 25, price: 8750, perUnit: '350', discount: '24% OFF' }
      ],
      paperStocks: [
        { id: 'pique-cotton', name: '100% Combed Cotton Pique', gsm: '220 GSM', priceMult: 1.0, desc: 'Corporate grade pique knit' }
      ],
      corners: [
        { id: 'navy-blue', name: 'Deep Navy Blue', priceAdd: 0 },
        { id: 'charcoal-black', name: 'Classic Black', priceAdd: 0 }
      ],
      finishes: [
        { id: 'embroidery-chest', name: 'Needle Embroidery Crest', priceAdd: 50 },
        { id: 'screen-print', name: 'Screen Printing', priceAdd: 0 }
      ],
      sides: [
        { id: 'front-only', name: 'Left Chest Crest Only', priceMult: 1.0 }
      ]
    },
    {
      id: 'premium-polo-tshirts',
      name: 'Premium Polo T-Shirts',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subcategory: 'polo-tshirts',
      subtitle: 'Mercerized 240 GSM organic cotton with mother-of-pearl buttons and tailored fit',
      basePrice: 640,
      pricePill: 'BUY 1 @ Rs.640',
      priceRange: '₹640.00 - ₹800.00 each',
      rating: 4.0,
      reviewCount: 90,
      colors: ['#000000', '#374151', '#1e3a8a', '#ffffff'],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      image: 'assets/images/products/dress-shirts.jpg',
      dimensions: 'Sizes S to XXL',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 1, price: 640, perUnit: '640' },
        { qty: 5, price: 3000, perUnit: '600' },
        { qty: 10, price: 5600, perUnit: '560' }
      ],
      paperStocks: [{ id: 'mercerized', name: '240 GSM Mercerized Cotton', gsm: '240 GSM', priceMult: 1.0, desc: 'Silky smooth feel' }],
      corners: [{ id: 'standard', name: 'Tailored Collar', priceAdd: 0 }],
      finishes: [{ id: 'embroidery', name: 'High-Density Embroidery', priceAdd: 0 }],
      sides: [{ id: 'front', name: 'Chest Crest', priceMult: 1.0 }]
    },
    {
      id: 'mens-scott-polo',
      name: "Men's Scott Polo T-Shirts",
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subcategory: 'polo-tshirts',
      subtitle: 'Create a professional impression with tipped contrast collar accents',
      basePrice: 870,
      pricePill: 'BUY 1 @ Rs.870',
      priceRange: '₹870.00 - ₹1,030.00 each',
      rating: 4.1,
      reviewCount: 74,
      colors: ['#000000', '#1e3a8a', '#2563eb', '#ffffff'],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      image: 'assets/images/products/polo-tshirts.jpg',
      dimensions: 'Sizes S to XXL',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 1, price: 870, perUnit: '870' },
        { qty: 5, price: 4100, perUnit: '820' }
      ],
      paperStocks: [{ id: 'scott-pique', name: 'Scott Heavyweight Cotton', gsm: '230 GSM', priceMult: 1.0, desc: 'Double yarn' }],
      corners: [{ id: 'tipped', name: 'Tipped Contrast Rib', priceAdd: 0 }],
      finishes: [{ id: 'embroidery', name: 'Signature Embroidery', priceAdd: 0 }],
      sides: [{ id: 'front', name: 'Left Chest', priceMult: 1.0 }]
    },
    {
      id: 'adidas-polo-tshirts',
      name: 'Adidas® Polo T-Shirts',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subcategory: 'polo-tshirts',
      subtitle: 'Authentic Adidas performance polo with AEROREADY moisture-wicking technology',
      basePrice: 1470,
      pricePill: 'BUY 1 @ Rs.1470',
      priceRange: '₹1,470.00 - ₹1,740.00 each',
      rating: 4.6,
      reviewCount: 18,
      colors: ['#000000', '#ffffff'],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      image: 'assets/images/products/polo-tshirts.jpg',
      dimensions: 'Sizes S to 2XL',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 1, price: 1470, perUnit: '1470' },
        { qty: 5, price: 7000, perUnit: '1400' }
      ],
      paperStocks: [{ id: 'aeroready', name: 'Adidas AEROREADY Recycled Poly', gsm: 'Technical', priceMult: 1.0, desc: 'Moisture wicking' }],
      corners: [{ id: 'adidas', name: 'Adidas 3-Stripes Sleeve', priceAdd: 0 }],
      finishes: [{ id: 'embroidery', name: 'Precision Custom Crest', priceAdd: 0 }],
      sides: [{ id: 'front', name: 'Right Chest Co-branding', priceMult: 1.0 }]
    },
    {
      id: 'parx-premium-polo',
      name: 'Parx® Premium Polo T-Shirts',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subcategory: 'polo-tshirts',
      subtitle: 'Official Parx Raymond collection polo with rich colors and luxury hand-feel',
      basePrice: 1055,
      pricePill: 'BUY 1 @ Rs.1055',
      priceRange: '₹1,055.00 - ₹1,230.00 each',
      rating: 4.0,
      reviewCount: 7,
      colors: ['#000000', '#dc2626', '#0d9488'],
      sizes: ['M', 'L', 'XL', '2XL'],
      image: 'assets/images/products/dress-shirts.jpg',
      dimensions: 'Sizes M to XXL',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 1, price: 1055, perUnit: '1055' },
        { qty: 5, price: 5000, perUnit: '1000' }
      ],
      paperStocks: [{ id: 'parx-cotton', name: 'Parx 100% Super-combed Cotton', gsm: '230 GSM', priceMult: 1.0, desc: 'Raymond quality' }],
      corners: [{ id: 'parx', name: 'Parx Branded Placket', priceAdd: 0 }],
      finishes: [{ id: 'embroidery', name: 'Custom Needle Embroidery', priceAdd: 0 }],
      sides: [{ id: 'front', name: 'Left Chest Crest', priceMult: 1.0 }]
    },
    {
      id: 'skechers-tipping-polo',
      name: 'Skechers® Tipping Polo T-Shirts',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subcategory: 'polo-tshirts',
      isNew: true,
      subtitle: 'Sport-luxe comfort polo with tipped contrast borders and flexible stretch knit',
      basePrice: 1300,
      pricePill: 'BUY 1 @ Rs.1300',
      priceRange: '₹1,300.00 - ₹1,590.00 each',
      rating: 4.3,
      reviewCount: 22,
      colors: ['#000000', '#1e3a8a', '#ffffff'],
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'assets/images/products/polo-tshirts.jpg',
      dimensions: 'Sizes S to XL',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 1, price: 1300, perUnit: '1300' },
        { qty: 5, price: 6250, perUnit: '1250' }
      ],
      paperStocks: [{ id: 'skechers-poly', name: 'Skechers Stretch Poly-Spandex', gsm: '200 GSM', priceMult: 1.0, desc: '4-way stretch' }],
      corners: [{ id: 'tipping', name: 'Contrast Tipping Collar', priceAdd: 0 }],
      finishes: [{ id: 'heat-transfer', name: 'High-Density Heat Transfer', priceAdd: 0 }],
      sides: [{ id: 'front', name: 'Chest Logo', priceMult: 1.0 }]
    },
    {
      id: 'skechers-performance-polo',
      name: 'Skechers® Performance Polo T-Shirts',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subcategory: 'polo-tshirts',
      isNew: true,
      subtitle: 'Ultralight quick-dry active performance polo with antimicrobial finish',
      basePrice: 1300,
      pricePill: 'BUY 1 @ Rs.1300',
      priceRange: '₹1,300.00 - ₹1,590.00 each',
      rating: 4.5,
      reviewCount: 15,
      colors: ['#000000', '#ffffff', '#1e3a8a'],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      image: 'assets/images/products/polo-tshirts.jpg',
      dimensions: 'Sizes S to 2XL',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 1, price: 1300, perUnit: '1300' },
        { qty: 5, price: 6250, perUnit: '1250' }
      ],
      paperStocks: [{ id: 'skechers-dry', name: 'Quick-Dry Micro-mesh', gsm: '180 GSM', priceMult: 1.0, desc: 'Athletic mesh' }],
      corners: [{ id: 'performance', name: 'Raglan Sleeve Seams', priceAdd: 0 }],
      finishes: [{ id: 'sublimation', name: 'Reflective Color Crest', priceAdd: 0 }],
      sides: [{ id: 'front', name: 'Chest Crest', priceMult: 1.0 }]
    },
    {
      id: 'custom-round-neck-tshirts',
      name: 'Custom T-shirts',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subtitle: '180 GSM bio-washed pre-shrunk cotton for events, startups, and everyday wear',
      basePrice: 320,
      pricePill: 'BUY 1 @ Rs. 320',
      rating: 4.8,
      reviewCount: 1120,
      image: 'assets/images/products/custom-tshirts.jpg',
      dimensions: 'Sizes XS to 3XL',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 1, price: 320, perUnit: '320' },
        { qty: 10, price: 2800, perUnit: '280' },
        { qty: 25, price: 6250, perUnit: '250', discount: '21% OFF' }
      ],
      paperStocks: [
        { id: '180-cotton', name: '180 GSM Bio-Washed Cotton', gsm: '180 GSM', priceMult: 1.0, desc: 'Soft and durable' }
      ],
      corners: [
        { id: 'color-black', name: 'Midnight Black', priceAdd: 0 },
        { id: 'color-white', name: 'Pure White', priceAdd: 0 }
      ],
      finishes: [
        { id: 'direct-to-garment', name: 'Direct-To-Garment Color Print', priceAdd: 0 }
      ],
      sides: [
        { id: 'front-print', name: 'Front Chest Print', priceMult: 1.0 }
      ]
    },
    {
      id: 'custom-dress-shirts',
      name: 'Custom Dress Shirts',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subtitle: 'Tailored executive formal shirts with crisp embroidered monogram',
      basePrice: 750,
      pricePill: 'BUY 1 @ Rs. 750',
      rating: 4.85,
      reviewCount: 220,
      image: 'assets/images/products/dress-shirts.jpg',
      dimensions: 'Sizes 38, 40, 42, 44',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 1, price: 750, perUnit: '750' },
        { qty: 5, price: 3500, perUnit: '700' },
        { qty: 10, price: 6500, perUnit: '650' }
      ],
      paperStocks: [
        { id: 'oxford-cotton', name: '100% Oxford Cotton', gsm: 'Fine Weave', priceMult: 1.0, desc: 'Breathable corporate weave' }
      ],
      corners: [
        { id: 'light-blue', name: 'Sky Blue', priceAdd: 0 },
        { id: 'pure-white', name: 'Crisp White', priceAdd: 0 }
      ],
      finishes: [
        { id: 'cuff-monogram', name: 'Pocket or Cuff Monogram', priceAdd: 0 }
      ],
      sides: [
        { id: 'front-crest', name: 'Left Pocket Crest', priceMult: 1.0 }
      ]
    },
    {
      id: 'executive-hoodies',
      name: 'Custom Winter Hoodies',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subtitle: '320 GSM brushed fleece cotton hoodie with front kangaroo pocket and brass eyelets',
      basePrice: 850,
      pricePill: 'BUY 1 @ Rs. 850',
      rating: 4.9,
      reviewCount: 390,
      image: 'assets/images/products/winter-hoodies.jpg',
      dimensions: 'Sizes S to 3XL',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 1, price: 850, perUnit: '850' },
        { qty: 10, price: 7800, perUnit: '780' },
        { qty: 50, price: 35000, perUnit: '700' }
      ],
      paperStocks: [{ id: 'fleece', name: '320 GSM Heavyweight Fleece Cotton', gsm: '320 GSM', priceMult: 1.0, desc: 'Ultra-warm' }],
      corners: [{ id: 'black', name: 'Charcoal Black', priceAdd: 0 }],
      finishes: [{ id: 'embroidery', name: 'Chest Embroidery', priceAdd: 50 }],
      sides: [{ id: 'front-chest', name: 'Center Chest Crest', priceMult: 1.0 }]
    },
    {
      id: 'embroidered-caps',
      name: 'Embroidered Caps',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subtitle: '6-panel heavy brushed cotton twill with brass buckle strap',
      basePrice: 310,
      pricePill: 'BUY 1 @ Rs. 310',
      rating: 4.6,
      reviewCount: 310,
      image: 'assets/images/products/embroidered-caps.jpg',
      dimensions: 'One Size Fits All (Adjustable)',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 1, price: 310, perUnit: '310' },
        { qty: 10, price: 2700, perUnit: '270' },
        { qty: 50, price: 11500, perUnit: '230' }
      ],
      paperStocks: [
        { id: 'cotton-twill', name: '100% Brushed Cotton Twill', gsm: '280 GSM', priceMult: 1.0, desc: 'Durable structured crown' }
      ],
      corners: [
        { id: 'black', name: 'Midnight Black', priceAdd: 0 }
      ],
      finishes: [
        { id: 'embroidery-3d', name: 'Raised 3D Puffed Embroidery', priceAdd: 40 }
      ],
      sides: [
        { id: 'front-only', name: 'Front Crown Logo', priceMult: 1.0 }
      ]
    },
    {
      id: 'freedom-rain-cap',
      name: 'Freedom Rain Caps',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subtitle: 'Water-resistant quick dry nylon sports cap with high-density print',
      basePrice: 280,
      pricePill: 'BUY 1 @ Rs.280',
      rating: 4.65,
      reviewCount: 180,
      image: 'assets/images/products/rain-caps.jpg',
      dimensions: 'Adjustable Velcro Back',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 1, price: 280, perUnit: '280' },
        { qty: 10, price: 2500, perUnit: '250' }
      ],
      paperStocks: [
        { id: 'nylon', name: 'Hydrophobic Micro-Nylon', gsm: 'Lightweight', priceMult: 1.0, desc: 'Rain protection' }
      ],
      corners: [{ id: 'standard', name: 'Standard Visor', priceAdd: 0 }],
      finishes: [{ id: 'screen-print', name: 'Reflective Screen Print', priceAdd: 0 }],
      sides: [{ id: 'front', name: 'Front Logo', priceMult: 1.0 }]
    },

    // --- 3. PHOTO & GIFTS ---
    {
      id: 'personalised-photo-mugs',
      name: 'Photo Mugs',
      category: 'photo-gifts',
      categoryLabel: 'Mugs, Albums & Gifts',
      subtitle: '325ml premium ceramic with edge-to-edge sublimation photo & logo printing',
      basePrice: 199,
      pricePill: 'BUY 1 @ Rs.199',
      rating: 4.9,
      reviewCount: 2310,
      image: 'assets/images/products/photo-mugs.jpg',
      dimensions: '325 ml (11 oz)',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 1, price: 199, perUnit: '199' },
        { qty: 5, price: 925, perUnit: '185' },
        { qty: 25, price: 3975, perUnit: '159', discount: '20% OFF' },
        { qty: 100, price: 13900, perUnit: '139', discount: '30% OFF' }
      ],
      paperStocks: [
        { id: 'classic-white', name: 'Pure White Ceramic', gsm: 'Ceramic', priceMult: 1.0, desc: 'Dishwasher safe' }
      ],
      corners: [{ id: 'white', name: 'Bright White Body', priceAdd: 0 }],
      finishes: [{ id: 'sublimation', name: 'Permanent Sublimation Print', priceAdd: 0 }],
      sides: [{ id: 'wrap-around', name: 'Full Wrap-Around Panorama Print', priceMult: 1.0 }]
    },
    {
      id: 'canvas-prints',
      name: 'Custom Canvas Prints',
      category: 'photo-gifts',
      categoryLabel: 'Mugs, Albums & Gifts',
      subtitle: '380 GSM textured poly-cotton canvas gallery wrapped over solid pinewood stretcher bars',
      basePrice: 650,
      pricePill: 'BUY 1 @ Rs. 650',
      rating: 4.9,
      reviewCount: 340,
      image: 'assets/images/products/canvas-prints.jpg',
      dimensions: '30 cm × 40 cm (12" × 16")',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 1, price: 650, perUnit: '650' },
        { qty: 3, price: 1800, perUnit: '600' }
      ],
      paperStocks: [{ id: 'canvas-380', name: '380 GSM Archival Poly-Cotton Canvas', gsm: '380 GSM', priceMult: 1.0, desc: 'Fade resistant' }],
      corners: [{ id: 'wrapped', name: 'Gallery Wrapped Edge', priceAdd: 0 }],
      finishes: [{ id: 'matte-varnish', name: 'UV Protective Satin Varnish', priceAdd: 0 }],
      sides: [{ id: 'front-wrap', name: 'Full Front & Edges', priceMult: 1.0 }]
    },
    {
      id: 'hardcover-photo-albums',
      name: 'Hardcover Photo Albums',
      category: 'photo-gifts',
      categoryLabel: 'Mugs, Albums & Gifts',
      subtitle: 'Luxe lay-flat photo book with pearl satin photographic paper and foil stamped cover',
      basePrice: 890,
      pricePill: 'BUY 1 @ Rs. 890',
      rating: 4.95,
      reviewCount: 410,
      image: 'assets/images/products/photo-albums.jpg',
      dimensions: '20 cm × 20 cm (30 Pages)',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 1, price: 890, perUnit: '890' },
        { qty: 2, price: 1650, perUnit: '825' }
      ],
      paperStocks: [{ id: 'layflat-pearl', name: '250 GSM Lustre Photographic Paper', gsm: '250 GSM', priceMult: 1.0, desc: 'Layflat binding' }],
      corners: [{ id: 'hardbound', name: 'Laminated Hardbound Cover', priceAdd: 0 }],
      finishes: [{ id: 'gold-stamping', name: 'Gold Foil Stamped Spine', priceAdd: 0 }],
      sides: [{ id: '30-pages', name: '30 Full-Color Pages', priceMult: 1.0 }]
    },
    {
      id: 'tote-bags',
      name: 'Tote Bags',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subtitle: 'Heavyweight 100% natural cotton canvas tote bag with reinforced handles',
      basePrice: 310,
      pricePill: 'BUY 1 @ Rs.310',
      rating: 4.8,
      reviewCount: 520,
      image: 'assets/images/products/tote-bags.jpg',
      dimensions: '38 cm × 42 cm',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 1, price: 310, perUnit: '310' },
        { qty: 10, price: 2700, perUnit: '270' },
        { qty: 50, price: 11500, perUnit: '230' }
      ],
      paperStocks: [
        { id: 'natural-canvas', name: '280 GSM Cotton Canvas', gsm: '280 GSM', priceMult: 1.0, desc: 'Eco-friendly natural beige' }
      ],
      corners: [{ id: 'standard', name: 'Double-Stitched Handles', priceAdd: 0 }],
      finishes: [{ id: 'screen-print', name: 'Vibrant Screen Printing', priceAdd: 0 }],
      sides: [{ id: 'front-only', name: 'Single Side Print', priceMult: 1.0 }]
    },


    // --- 4. STAMPS & INK ---
    {
      id: 'self-inking-stamps',
      name: 'Self Inking Stamps',
      category: 'stamps-ink',
      categoryLabel: 'Stamps and Ink',
      subtitle: 'Thousands of sharp impressions with built-in ink reservoir, no separate pad required',
      basePrice: 399,
      pricePill: 'BUY 1 @ Rs.399',
      rating: 4.75,
      reviewCount: 540,
      image: 'assets/images/products/self-inking-stamps.jpg',
      dimensions: 'Rectangular 4.7 cm × 1.8 cm',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 1, price: 399, perUnit: '399' },
        { qty: 3, price: 1050, perUnit: '350' }
      ],
      paperStocks: [
        { id: 'ink-blue', name: 'Royal Blue Document Ink', gsm: 'Standard', priceMult: 1.0, desc: 'Banking standard' }
      ],
      corners: [{ id: 'rect-47', name: 'Rectangular 47mm x 18mm', priceAdd: 0 }],
      finishes: [{ id: 'pre-inked', name: 'Flash Rubber Plate', priceAdd: 0 }],
      sides: [{ id: 'standard', name: 'Single Stamp Assembly', priceMult: 1.0 }]
    },
    {
      id: 'basic-rubber-stamps',
      name: 'Basic Rubber Stamps',
      category: 'stamps-ink',
      categoryLabel: 'Stamps and Ink',
      subtitle: 'Traditional wood/acrylic handle stamp with durable vulcanized rubber die',
      basePrice: 180,
      pricePill: 'BUY 1 @ Rs. 180',
      rating: 4.7,
      reviewCount: 290,
      image: 'assets/images/products/rubber-stamps.jpg',
      dimensions: '5.0 cm × 2.0 cm',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 1, price: 180, perUnit: '180' },
        { qty: 5, price: 800, perUnit: '160' }
      ],
      paperStocks: [{ id: 'wood-handle', name: 'Ergonomic Wooden Handle', gsm: 'Wood', priceMult: 1.0, desc: 'Traditional handle' }],
      corners: [{ id: 'standard', name: 'Standard Rectangular', priceAdd: 0 }],
      finishes: [{ id: 'laser-die', name: 'Laser Engraved Deep-Etch Die', priceAdd: 0 }],
      sides: [{ id: 'standard', name: 'Single Die Stamp', priceMult: 1.0 }]
    },

    // --- 5. MARKETING MATERIALS ---
    {
      id: 'golf-umbrellas',
      name: 'Golf Umbrellas',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subtitle: 'Large 30-inch windproof fiberglass canopy with automatic open button',
      basePrice: 1125,
      pricePill: 'BUY 1 @ Rs. 1125',
      rating: 4.9,
      reviewCount: 160,
      image: 'assets/images/products/golf-umbrellas.jpg',
      dimensions: '30-Inch Arc Canopy',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 1, price: 1125, perUnit: '1125' },
        { qty: 5, price: 5200, perUnit: '1040' }
      ],
      paperStocks: [{ id: 'pongee', name: '190T High-Density Pongee Fabric', gsm: 'Waterproof', priceMult: 1.0, desc: 'Windproof' }],
      corners: [{ id: 'fiberglass', name: 'Fiberglass Ribs & Shaft', priceAdd: 0 }],
      finishes: [{ id: 'screen-print', name: 'Panel Screen Printing', priceAdd: 0 }],
      sides: [{ id: 'single-panel', name: '1 Panel Logo', priceMult: 1.0 }]
    },

    {
      id: 'trifold-brochures',
      name: 'Corporate Tri-Fold Brochures',
      category: 'marketing-materials',
      categoryLabel: 'Signs, Posters & Marketing Materials',
      subtitle: '210 GSM gloss art paper with precision score lines for crisp corporate presentation',
      basePrice: 890,
      pricePill: 'BUY 100 @ Rs. 890',
      rating: 4.85,
      reviewCount: 290,
      image: 'assets/images/products/trifold-brochures.jpg',
      dimensions: 'A4 Tri-Fold (Folded to 10cm x 21cm)',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 100, price: 890, perUnit: '8.90' },
        { qty: 250, price: 1850, perUnit: '7.40' },
        { qty: 500, price: 3200, perUnit: '6.40' }
      ],
      paperStocks: [{ id: 'gloss-210', name: '210 GSM Gloss Art Paper', gsm: '210 GSM', priceMult: 1.0, desc: 'High saturation' }],
      corners: [{ id: 'tri-fold', name: 'C-Fold / Z-Fold', priceAdd: 0 }],
      finishes: [{ id: 'scored', name: 'Machine Pre-Scored Folds', priceAdd: 0 }],
      sides: [{ id: 'double', name: 'Double-Sided 6 Panels', priceMult: 1.0 }]
    },
    {
      id: 'rollup-standees',
      name: 'Roll-Up Pull Banners & Standees',
      category: 'marketing-materials',
      categoryLabel: 'Signs, Posters & Marketing Materials',
      subtitle: 'Retractable anodized aluminum base with teardrop foot and non-curl banner vinyl',
      basePrice: 1450,
      pricePill: 'BUY 1 @ Rs. 1450',
      rating: 4.9,
      reviewCount: 180,
      image: 'assets/images/products/rollup-standees.jpg',
      dimensions: '2.5 ft × 6.0 ft (76 cm × 182 cm)',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 1, price: 1450, perUnit: '1450' },
        { qty: 2, price: 2700, perUnit: '1350' }
      ],
      paperStocks: [{ id: 'star-flex', name: 'Star Non-Curl Matte Banner Flex', gsm: 'Heavy Vinyl', priceMult: 1.0, desc: 'Indoor/outdoor' }],
      corners: [{ id: 'aluminum-base', name: 'Heavy Aluminum Standee Case & Bag', priceAdd: 0 }],
      finishes: [{ id: 'eco-solvent', name: '1440 DPI Eco-Solvent HD Print', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Full Bleed Front Print', priceMult: 1.0 }]
    },

    // --- 6. EXPLORE MORE & PACKAGING ---
    {
      id: 'harissons-laptop-bag',
      name: 'Harissons Nemesis Bag',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subtitle: '30L water-resistant polyester ergonomic laptop backpack with padded shoulder straps',
      basePrice: 1370,
      pricePill: 'BUY 1 @ Rs.1370',
      rating: 4.85,
      reviewCount: 240,
      image: 'assets/images/products/harissons-laptop-bag.jpg',
      dimensions: 'Fits 15.6 Inch Laptops',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 1, price: 1370, perUnit: '1370' },
        { qty: 5, price: 6500, perUnit: '1300' }
      ],
      paperStocks: [{ id: 'dobby-poly', name: 'Heavy Duty Dobby Polyester', gsm: 'Cordura Grade', priceMult: 1.0, desc: 'Tear resistant' }],
      corners: [{ id: 'ykk-zippers', name: 'Reinforced Metal Sliders', priceAdd: 0 }],
      finishes: [{ id: 'silicone-print', name: 'High-Density Silicone Logo', priceAdd: 0 }],
      sides: [{ id: 'front', name: 'Front Pouch Crest', priceMult: 1.0 }]
    },
    {
      id: 'custom-lanyards',
      name: 'Custom Lanyards',
      category: 'marketing-materials',
      categoryLabel: 'Signs, Posters & Marketing Materials',
      subtitle: '20mm silky satin woven lanyard with lobster claw hook and safety breakaway',
      basePrice: 740,
      pricePill: 'BUY 10 @ Rs.740',
      rating: 4.8,
      reviewCount: 350,
      image: 'assets/images/products/custom-lanyards.jpg',
      dimensions: '20 mm Width × 90 cm Length',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 10, price: 740, perUnit: '74' },
        { qty: 25, price: 1625, perUnit: '65' },
        { qty: 50, price: 2750, perUnit: '55', discount: '25% OFF' }
      ],
      paperStocks: [{ id: 'satin-ribbon', name: 'Gloss Satin Polyester', gsm: 'Fabric', priceMult: 1.0, desc: 'Vibrant sublimation' }],
      corners: [{ id: 'dog-hook', name: 'Metal Swivel Dog Hook', priceAdd: 0 }],
      finishes: [{ id: 'sublimation', name: 'Continuous Thermal Sublimation', priceAdd: 0 }],
      sides: [{ id: 'both-sides', name: 'Two-Sided Sublimation Print', priceMult: 1.0 }]
    },
    {
      id: 'custom-paper-bags',
      name: 'Custom Paper Bags',
      category: 'packaging',
      categoryLabel: 'Labels, Stickers & Packaging',
      subtitle: 'Reinforced kraft / art paper shopping bags with twisted paper or ribbon handles',
      basePrice: 620,
      pricePill: 'BUY 25 @ Rs.620',
      rating: 4.75,
      reviewCount: 410,
      image: 'assets/images/products/custom-paper-bags.jpg',
      dimensions: '20 cm × 25 cm × 10 cm',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 25, price: 620, perUnit: '24.80' },
        { qty: 50, price: 1100, perUnit: '22.00' },
        { qty: 100, price: 1900, perUnit: '19.00', discount: '23% OFF' }
      ],
      paperStocks: [{ id: 'white-kraft', name: '140 GSM White Kraft', gsm: '140 GSM', priceMult: 1.0, desc: 'Eco friendly' }],
      corners: [{ id: 'twisted', name: 'Twisted Paper Handles', priceAdd: 0 }],
      finishes: [{ id: 'cmyk', name: 'Standard CMYK Print', priceAdd: 0 }],
      sides: [{ id: 'both-sides', name: 'Dual Sided Print', priceMult: 1.0 }]
    },
    {
      id: 'stickers',
      name: 'Custom Die-Cut Stickers',
      category: 'packaging',
      categoryLabel: 'Labels, Stickers & Packaging',
      subtitle: 'Waterproof, UV-resistant vinyl stickers in custom die-cut, circle, or square shapes',
      basePrice: 150,
      pricePill: 'BUY 10 @ Rs.150',
      rating: 4.9,
      reviewCount: 520,
      image: 'assets/images/products/stickers.jpg',
      dimensions: '5 cm × 5 cm (Custom Shapes Available)',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 10, price: 150, perUnit: '15' },
        { qty: 50, price: 600, perUnit: '12', discount: '20% OFF' },
        { qty: 100, price: 1000, perUnit: '10', discount: '33% OFF' },
        { qty: 250, price: 2000, perUnit: '8', discount: '47% OFF' }
      ],
      paperStocks: [
        { id: 'vinyl-gloss', name: 'White Gloss Vinyl', gsm: '120 Micron', priceMult: 1.0, desc: 'Weatherproof & dishwasher safe' },
        { id: 'vinyl-matte', name: 'Matte Finish Vinyl', gsm: '120 Micron', priceMult: 1.0, desc: 'Smooth anti-glare finish' },
        { id: 'clear-vinyl', name: 'Transparent Clear Vinyl', gsm: '100 Micron', priceMult: 1.2, desc: 'See-through background' },
        { id: 'holographic', name: 'Holographic Rainbow Sheen', gsm: '130 Micron', priceMult: 1.4, desc: 'Eye-catching rainbow reflection' }
      ],
      corners: [{ id: 'die-cut', name: 'Precision Custom Die-Cut', priceAdd: 0 }],
      finishes: [{ id: 'uv-coat', name: 'UV Protective Gloss Lamination', priceAdd: 0 }],
      sides: [{ id: 'single-side', name: 'Front Adhesive Print', priceMult: 1.0 }]
    },
    {
      id: 'custom-mailer-boxes',
      name: 'Custom Corrugated Mailer Boxes',
      category: 'packaging',
      categoryLabel: 'Labels, Stickers & Packaging',
      subtitle: 'Heavy-duty crush-proof E-Flute corrugated cardboard boxes printed with your custom branding',
      basePrice: 850,
      pricePill: 'BUY 10 @ Rs. 850',
      rating: 4.9,
      reviewCount: 310,
      image: 'assets/images/products/custom-mailer-boxes.jpg',
      dimensions: '26 cm × 20 cm × 8 cm',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 10, price: 850, perUnit: '85' },
        { qty: 25, price: 1875, perUnit: '75' },
        { qty: 50, price: 3250, perUnit: '65', discount: '23% OFF' }
      ],
      paperStocks: [{ id: 'e-flute', name: 'White Coated E-Flute Corrugated', gsm: '350 GSM', priceMult: 1.0, desc: 'Rigid shipping box' }],
      corners: [{ id: 'roll-end', name: 'Roll End Tuck Front (RETF)', priceAdd: 0 }],
      finishes: [{ id: 'matte-lam', name: 'Scuff-Proof Matte Lamination', priceAdd: 0 }],
      sides: [{ id: 'outer-only', name: 'Outer Full Color Print', priceMult: 1.0 }]
    },
    {
      id: 'custom-pens',
      name: 'Full White Ball Pens',
      category: 'marketing-materials',
      categoryLabel: 'Signs, Posters & Marketing Materials',
      subtitle: 'Smooth click-action metallic ball pen with blue German ink and precision laser/color imprint',
      basePrice: 1600,
      pricePill: 'BUY 50 @ Rs.1600',
      rating: 4.7,
      reviewCount: 680,
      image: 'assets/images/products/custom-pens.jpg',
      dimensions: '14 cm × 1.0 cm',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 50, price: 1600, perUnit: '32' },
        { qty: 100, price: 2800, perUnit: '28' }
      ],
      paperStocks: [{ id: 'metal-white', name: 'Aluminum Barrel', gsm: 'Metal', priceMult: 1.0, desc: 'Lacquered white' }],
      corners: [{ id: 'blue-ink', name: '0.7mm Ball Blue Ink', priceAdd: 0 }],
      finishes: [{ id: 'pad-print', name: 'Precision Pad Print', priceAdd: 0 }],
      sides: [{ id: 'barrel', name: 'Barrel Imprint', priceMult: 1.0 }]
    },
    {
      id: 'green-silver-pens',
      name: 'Green & Silver Pens',
      category: 'marketing-materials',
      categoryLabel: 'Signs, Posters & Marketing Materials',
      subtitle: 'Dual tone chrome silver and emerald green metallic executive pen',
      basePrice: 950,
      pricePill: 'BUY 25 @ Rs.950',
      rating: 4.8,
      reviewCount: 310,
      image: 'assets/images/products/green-silver-pens.jpg',
      dimensions: '13.5 cm × 1.1 cm',
      customizable: true,
      popular: false,
      trending: false,
      quantities: [
        { qty: 25, price: 950, perUnit: '38' },
        { qty: 50, price: 1750, perUnit: '35' }
      ],
      paperStocks: [{ id: 'chrome-brass', name: 'Brass with Chrome Accents', gsm: 'Metal', priceMult: 1.0, desc: 'Twist mechanism' }],
      corners: [{ id: 'standard', name: 'German Rollerball Refill', priceAdd: 0 }],
      finishes: [{ id: 'laser-engraving', name: 'Laser Engraved Brass Reveal', priceAdd: 0 }],
      sides: [{ id: 'barrel', name: 'Upper Barrel Engraving', priceMult: 1.0 }]
    }
  ],

  // --- STUDIO TEMPLATES FOR INSTANT PERSONALIZATION ---
  studioTemplates: [
    {
      id: 'tpl-corporate-modern',
      name: 'Modern Executive (Atelier)',
      category: 'visiting-cards',
      theme: 'Corporate',
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
    },
    {
      id: 'tpl-neeta-rai',
      name: 'Neeta Rai Classic (As on Home)',
      category: 'visiting-cards',
      theme: 'Clean Minimal',
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
      fields: {
        company: 'PRINTHUBBS STUDIO',
        tagline: 'Contemporary Design & Print',
        name: 'NEETA RAI',
        title: 'Lead Product Designer',
        phone: '+91 98201 54321',
        email: 'neeta.rai@printhubbs.in',
        website: 'www.printhubbs.in',
        address: 'BKC, Mumbai - 400051',
        qrUrl: 'https://printhubbs.in'
      }
    },
    {
      id: 'tpl-luxury-gold',
      name: 'Luxury Dark Monogram',
      category: 'visiting-cards',
      theme: 'Luxury',
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
      fields: {
        company: 'ROYAL FINDS JEWELLERY',
        tagline: 'Handcrafted Heritage Luxury',
        name: 'KABIR MEHTA',
        title: 'Managing Partner',
        phone: '+91 99300 44556',
        email: 'kabir@royalfinds.com',
        website: 'www.royalfinds.com',
        address: 'Park Street, Kolkata - 700016',
        qrUrl: 'https://royalfinds.com'
      }
    },
    {
      id: 'tpl-tech-nexus',
      name: 'Nexus Tech Startup vCard',
      category: 'visiting-cards',
      theme: 'Tech SaaS',
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
      fields: {
        company: 'NEXUS CLOUD SYSTEMS',
        tagline: 'Autonomous AI Infrastructure',
        name: 'DEV PATEL',
        title: 'Chief Technology Officer',
        phone: '+91 98450 78901',
        email: 'dev@nexuscloud.io',
        website: 'https://nexuscloud.io',
        address: 'Koramangala 4th Block, Bengaluru - 560034',
        qrUrl: 'https://nexuscloud.io/dev'
      }
    },
    {
      id: 'tpl-medical-clinic',
      name: 'Care Clinic & Health Practice',
      category: 'visiting-cards',
      theme: 'Healthcare',
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
      fields: {
        company: 'CARE ADVANCED DIAGNOSTICS',
        tagline: 'Multi-Speciality Medical Center',
        name: 'DR. SNEHA KULKARNI',
        title: 'MD, Consultant Physician',
        phone: '+91 98220 99887',
        email: 'appointments@careclinic.in',
        website: 'www.careclinic.in',
        address: 'JM Road, Shivajinagar, Pune - 411005',
        qrUrl: 'https://careclinic.in/dr-sneha'
      }
    },
    {
      id: 'tpl-creative-studio',
      name: 'Studio Rai Design (Creative)',
      category: 'visiting-cards',
      theme: 'Creative Design',
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
  ],

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
