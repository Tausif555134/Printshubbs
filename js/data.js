// ==========================================================================
// Printhubbs - Product Catalog & Business Configuration Data
// Based on stitch_website_ui_replica/DESIGN.md & vistaprint_india_features_functions.md
// ==========================================================================

const PRINTSHUBB_DATA = {
  categories: [
    { id: 'visiting-cards', name: 'Visiting Cards', icon: 'credit-card', count: '22+ Styles' },
    { id: 'marketing-materials', name: 'Signs, Posters & Marketing Materials', icon: 'file-text', count: '18+ Items' },
    { id: 'stationery-office', name: 'Stationery, Letterheads & Notebooks', icon: 'book', count: '14+ Products' },
    { id: 'stamps-ink', name: 'Stamps and Ink', icon: 'check-square', count: '8+ Models' },
    { id: 'packaging', name: 'Labels, Stickers & Packaging', icon: 'package', count: '12+ Types' },
    { id: 'clothing-apparel', name: 'Clothing, Caps & Bags', icon: 'shirt', count: '16+ Styles' },
    { id: 'photo-gifts', name: 'Mugs, Albums & Gifts', icon: 'gift', count: '15+ Gifts' },
    { id: 'drinkware', name: 'Drinkware', icon: 'coffee', count: '10+ Items' }
  ],

  products: [
    // --- 1. VISITING CARDS ---
    {
      id: 'standard-visiting-cards',
      name: 'Standard Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      subtitle: 'Crisp 350 GSM premium paper with professional matte or gloss finish',
      basePrice: 200,
      pricePill: 'BUY 100 @ Rs.200',
      rating: 4.8,
      reviewCount: 1420,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1WpmlCD0R4fQb8rglx5aizUOZBc7-LUZ0xaCn-QUtQ85dU9RkmRTiTmSVCqdWB1TA-lAo9hbNqIJOxnQx8HeP7d1NWcD031DQ8rQ4GHcqdQ94xvHRNHZCp-kiAgl1TOkwVuDO8M5PSm3nV9nkb_roKTYVVPuf3GQAu66ZRW7bc0znYoOtIba-APYcGY3EiwZcE8OTJpR37Y2hT5zw3dL9mZYS6krumUU1qkHE58V2pcc2VSuYZsbWoojgxy',
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
      id: 'rounded-corner-visiting-cards',
      name: 'Rounded Corner Visiting Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      subtitle: 'Modern quarter-inch curved corners that won’t fray or bend in pockets',
      basePrice: 250,
      pricePill: 'BUY 100 @ Rs.250',
      rating: 4.9,
      reviewCount: 980,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1WpmlCD0R4fQb8rglx5aizUOZBc7-LUZ0xaCn-QUtQ85dU9RkmRTiTmSVCqdWB1TA-lAo9hbNqIJOxnQx8HeP7d1NWcD031DQ8rQ4GHcqdQ94xvHRNHZCp-kiAgl1TOkwVuDO8M5PSm3nV9nkb_roKTYVVPuf3GQAu66ZRW7bc0znYoOtIba-APYcGY3EiwZcE8OTJpR37Y2hT5zw3dL9mZYS6krumUU1qkHE58V2pcc2VSuYZsbWoojgxy',
      mockType: 'card-rounded',
      dimensions: '8.9 cm × 5.1 cm',
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
      id: 'spot-uv-visiting-cards',
      name: 'Raised Spot UV Business Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      subtitle: 'Dimensional clear gloss coating over selected typography and logos for high tactile drama',
      basePrice: 380,
      pricePill: 'BUY 100 @ Rs.380',
      rating: 4.95,
      reviewCount: 450,
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop&q=80',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 100, price: 380, perUnit: '3.80' },
        { qty: 250, price: 850, perUnit: '3.40' },
        { qty: 500, price: 1550, perUnit: '3.10' }
      ],
      paperStocks: [
        { id: 'velvet-matte', name: 'Velvet Touch Matte Background', gsm: '400 GSM', priceMult: 1.0, desc: 'Maximum contrast with gloss UV' }
      ],
      corners: [{ id: 'standard', name: 'Standard Square', priceAdd: 0 }],
      finishes: [{ id: 'spot-uv', name: 'Selective 3D Spot UV', priceAdd: 0 }],
      sides: [{ id: 'front-uv', name: 'Front Spot UV', priceMult: 1.0 }]
    },
    {
      id: 'kraft-visiting-cards',
      name: 'Organic Recycled Kraft Cards',
      category: 'visiting-cards',
      categoryLabel: 'Visiting Cards',
      subtitle: 'Natural unbleached recycled wood pulp stock with distinctive earthy fibers',
      basePrice: 280,
      pricePill: 'BUY 100 @ Rs.280',
      rating: 4.8,
      reviewCount: 320,
      image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80',
      dimensions: '8.9 cm × 5.1 cm',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 100, price: 280, perUnit: '2.80' },
        { qty: 250, price: 620, perUnit: '2.48' },
        { qty: 500, price: 1100, perUnit: '2.20' }
      ],
      paperStocks: [{ id: 'kraft', name: 'Natural Brown Kraft', gsm: '300 GSM', priceMult: 1.0, desc: 'Eco friendly' }],
      corners: [{ id: 'standard', name: 'Square Cut', priceAdd: 0 }],
      finishes: [{ id: 'matte-black', name: 'Solid Black Screen Ink', priceAdd: 0 }],
      sides: [{ id: 'single', name: 'Single-Sided', priceMult: 1.0 }]
    },

    // --- 2. APPAREL & MERCH ---
    {
      id: 'classic-polo-tshirts',
      name: 'Classic Polo T-Shirts',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subtitle: '220 GSM 100% combed cotton pique with sharp embroidered crest',
      basePrice: 490,
      pricePill: 'BUY 1 @ Rs.490',
      rating: 4.7,
      reviewCount: 840,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1XTpV4i5PT6-Go7scz-XXAxuXK3MFZbUwNJ2MM5Hlhzt9mQGdS0_dzqsRwtqB-ZpSNdlNT74bPnCEIlCBV4bCoScbM-wohB-5OB-8JH9GQ_2m061g6Fn9rtv9Jk1G0vqHyJktjDlqd_u39Qgr5nxm0SUDwb4PqezP1cDyup8uL0hw3Dca9q8gjBj1CdYgJAJU1ovTx2SaUF0iOnEwV6FVoaM23efUuNW0oHSqS66zm0xBf5QmW4MkUSzhw',
      dimensions: 'Sizes S, M, L, XL, XXL, 3XL',
      customizable: true,
      popular: true,
      trending: false,
      quantities: [
        { qty: 1, price: 490, perUnit: '490' },
        { qty: 5, price: 2300, perUnit: '460' },
        { qty: 10, price: 4200, perUnit: '420', discount: '14% OFF' },
        { qty: 25, price: 9500, perUnit: '380', discount: '22% OFF' },
        { qty: 50, price: 17500, perUnit: '350', discount: '28% OFF' }
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
      id: 'custom-round-neck-tshirts',
      name: 'Custom T-shirts',
      category: 'clothing-apparel',
      categoryLabel: 'Clothing, Caps & Bags',
      subtitle: '180 GSM bio-washed pre-shrunk cotton for events, startups, and everyday wear',
      basePrice: 320,
      pricePill: 'BUY 1 @ Rs. 320',
      rating: 4.8,
      reviewCount: 1120,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1XIDypY9A2uPUgxGhgAxNyV-QDbln_5XAQIdORlpEc4qr9rK0mwokTm9M9TMHgBDa2zbS7UVIRTgEw3OwGZnGs9YyfPIl83WEmdERm74E29JT1qQrVmCeXzi5U1iKyeceBDcMerz_QX_jRV6XihmNoBGlID_wd3BuqhNf4JzIQaPqvHeiDpJCQs9OdRYNgNT3gdyL08MZnrSAXoVAZm1xT728TKRBB2xFfNvNi-GDTiF08xVSEEIQjgm-I',
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
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1Wyz2M963oVY_aKbB1j4d1LeTI_9ssjWIAqREQn7djfr-XIXERvdcqmPfgGGpWFLiFpFx4ZAYbTPC9Eu9Pe_i067JkUEDXG5UBgM_xWTL8mGG2ZTqmnuNHeQI9llZLbjazUfm7PHiru427N1FcCz1SJco6C0NhVN-1Mum09m75YGFBGdYRBknqhabbP2b64tmTcU8xt3n1a1NnwotwP3w7M6HDMv1Nde5ke2C9oym71K_hbzBcL0DKCMyI',
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
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
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
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1V3JZDj3QVZosY7zj6pmetKuwlzwrZbscqIlX_mOB2MGzj2TV7HvDUr-5txzDrIj-Y-doZET2zGNskfGm4BQFYXvfHjHmJXSosWJzWAB_E9Ckt8-ForhuWLerSSbCM8llttngKzL3Da1EzyFif7GBShGEnpbfoDNqHcmrt3RlRVyQYoHU_XumHkc1b1DA37upasw0tQSaDRX5zXJQgXPz5uAx0OriVU8qpasWjYxwaAn0pjh6LDAls7go_h',
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
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1WJkGrvs2hz3EjVkD2-FA0X-Zk5FV-_69-fCssORccyU9pmDopYcJfY2qiqGGahNd8H1MiksBvmJ3Q9DgfH6FghL9mv3C2ooZdJNfEITIG83i4eWFidLIZU7yQOpbDlUI50eW-_ZwFEUBKWpmnDWGEgiHSAkqV39vUoliaDqdiLThhSnaJijDfK1bngoMOJhKXG6Qw4bn8yHSlJDXNDTnuoD0J2TtHKXnpyyzVQShFdq7WPxJqBO7vyy9Jy',
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
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1XcreNKywu4dprT97Ould7MrFdCfRpaKiUMQvg6J6GONNuU1jzauIvkT9hxAQR3t8d_3b_99JbMsdvIH-ZCVHVnU9Vm8jjF7pqk1PDwy7zqOXYWESON6Pjb9upFAKSX9FtnV7lxxMvJO5alcBptqLI4j94HMJcFwEbAQDmGxB7J80I2CNmqySevueZGlfivcPqnkRpI_UOoKK8dZMovRhflwwJ1MVZ2HrMJyfeMyxywa5t-gHCb6qQ0OrfH',
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
      image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
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
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1XIzWIf6dTpbbjhlycI1WAx6xIvMpjxVkgiAlHMc6AF7RfA-zYYVB8vXqlxS8i5hDXm0fiYNfi7mB3fWmXoVro4XE7nWeJq9HsPu--Qae7O3CnmikeQ5Otwyix-TY2PUfoaKv-1QCJ0tlcDo7wfyUHmZTeN7VVJRyL2BBgPLl-jDKA2aKq2rzqQbrgB7LqxxhKY60kb3NtMWm7HaCoQYmMyw5QdrH8gZoXC0AiOyZpx6U9lurJYKIdYDhvd',
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
    {
      id: 'stainless-steel-tumbler',
      name: 'Personalized Tumblers',
      category: 'drinkware',
      categoryLabel: 'Drinkware',
      subtitle: 'Double-wall vacuum insulated 304 food-grade stainless steel with laser-etched name/logo',
      basePrice: 650,
      pricePill: 'BUY 1 @ Rs. 650',
      rating: 4.85,
      reviewCount: 420,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1UkfbyxbwgG0Eijcd-jH3pUEgtzNn4NFM1LIf47ijIImpFNdxm119otCBxq335oHu3Y5XXmelvr3V9pZ7Lc4mkBsQHChW5Ot3MyWh-XUmnGqYi4hJcpvJfbFsBqk7hecHXiLAkNrJbMWDY2iiv25hmuiz8LAMOvzEbVbritz_iOxregPvSWnzW0NbCy0Tnnu_QN3huzpZfsS6wNRU-0QvxFPc2flFTA31cY1NZFDkJSx8TeQqlqiJsxIvG5',
      dimensions: '500 ml (17 oz) - Keeps 12h Hot / 24h Cold',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 1, price: 650, perUnit: '650' },
        { qty: 10, price: 5900, perUnit: '590' },
        { qty: 50, price: 26000, perUnit: '520', discount: '20% OFF' }
      ],
      paperStocks: [
        { id: 'matte-black-steel', name: 'Matte Powder Coated Black', gsm: 'SS 304', priceMult: 1.0, desc: 'Sweat-proof grip' }
      ],
      corners: [{ id: 'standard', name: 'Sip-through Lid', priceAdd: 0 }],
      finishes: [{ id: 'laser-engraving', name: 'Precision Rotary Laser Engraving', priceAdd: 0 }],
      sides: [{ id: 'single-side', name: 'One Side Monogram/Logo', priceMult: 1.0 }]
    },
    {
      id: 'water-bottles',
      name: 'Custom Water Bottles',
      category: 'drinkware',
      categoryLabel: 'Drinkware',
      subtitle: '750ml lightweight aluminum sipper bottle with leakproof carabiner cap',
      basePrice: 390,
      pricePill: 'BUY 1 @ Rs. 390',
      rating: 4.75,
      reviewCount: 310,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1U05Enf-IyR-QsvIdDd9bzeu3FQZIhiX3p9raPl7it7oXXoCU_NWURrfDnlO1Gvu9KqYp9pUBQ2JYVIblqBcREnhUc_HIphbJsivQR4V2KrcVhjt3Sibbe6jXBbcIeVN0lQqNsPOYYckaT3-F11J8tPrfBTcxk03wXjb2MfEan_wFSYSthcl0IMRWaVTE1A1vYeElf9A_Xf04IyZZ6KqcbbPEoVLRTB9iJ7OvCqMAAtskNHHGWUU8gmR89i',
      dimensions: '750 ml Capacity',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 1, price: 390, perUnit: '390' },
        { qty: 10, price: 3500, perUnit: '350' }
      ],
      paperStocks: [{ id: 'aluminum', name: 'Gloss White Coated Aluminum', gsm: 'Metal', priceMult: 1.0, desc: 'Food grade' }],
      corners: [{ id: 'carabiner', name: 'Screw Top with Carabiner Clip', priceAdd: 0 }],
      finishes: [{ id: 'sublimation', name: 'Full Wrap Sublimation Print', priceAdd: 0 }],
      sides: [{ id: 'full-wrap', name: 'Full Wrap Panorama', priceMult: 1.0 }]
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
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1VZotvVGP_FKzlydZikmlgr6L38gSW4UFLL2dRevX8JMFEe3yjAwt1DZ7Du5ODFBk9UJ_Gv84qq4uuBb1x77Wc7ZgTufcmGYt_d5NvI2w4aVKJX40oIPzu5-IjG86GtyIGVhMY62pg5M3ax29cSWalDS1_G2G9xnGvu5Gh2qS-UffgeaxfdHcpDLXkhNHsx41NcF8sGxdtZRSluQ7UPPyqa7pXeoSzWX_oHrzoYOG4422p05lX4asnuituS',
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
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1W-PuFPU1cJfQc6gx3OKUgm95LzbmYX8FeUyTVxSwJZ_0AINH2fJZfYV4sK2PeX67XChjg0DeaNEFb1SFmZoLBKVNfkKbTxs1cMAzV4wjFmEs9kzDGs6dDhmCl33ADscY3vCg1qQnzcqNndTw51IvbWFByB-42tg0n0yBz_EdVkhJOQIJ2bykD28ni6KKDE0SF5EcUoPNE62i3nRZWHlXbtQ7Zx0COeYFREgHPCabJ8D6H4DyWga7YP_ufc',
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

    // --- 5. MARKETING & STATIONERY ---
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
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1XB1hAB9uPG2FHvfqpRArd78WUtj5e1fOAshXcritmWXnOxM-8-py2woeA7u_Ma_mJjjeYSf96sVw24amGWfMtByTuPebx7eZu3VqmjBPz3I6qsHI4_jH1-iFcq1jVpA-JFz-8XlX6hRzUf-4bUpkV0Mz4wpqzR-KRSf31l77_SwKNa_YThH7XPzQPuk5nKk7EN073ATcfg-gL6QT30gREuhumNOz2kPVijHK-TsL3n68dBNf41s3zYZ0c',
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
      id: 'diary-pen-holder',
      name: 'Diary With Pen Holder',
      category: 'stationery-office',
      categoryLabel: 'Stationery, Letterheads & Notebooks',
      subtitle: 'Executive PU leather hardbound diary with magnetic clasp and pen loop',
      basePrice: 465,
      pricePill: 'BUY 1 @ Rs. 465',
      rating: 4.8,
      reviewCount: 380,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1VV4MnTOAUlYhbWOpcqJhCRZlN3F-m3h-ut37PNa3B5dduwSSbAMS9t4hJjuso1sGHGab4gmEzlR0jlfHU8tJLtIBLnuNG8nIXgYQSRBWjjp2WMxiIavoV0wBhqSx96WpLYeUk3L6wAm57eEy_Vze0fKHCG0kHF5Tj_QDfj66dz-oUJfj-50DqQCClDLuiA5HJkbrTB8wmd51c8pnAt-BCRGu3xocWmZqpp3XBmiATRHvEDjs3-3p14O9zz',
      dimensions: 'A5 (192 Ruled Pages, 80 GSM Natural Shade Paper)',
      customizable: true,
      popular: false,
      trending: true,
      quantities: [
        { qty: 1, price: 465, perUnit: '465' },
        { qty: 10, price: 4200, perUnit: '420' }
      ],
      paperStocks: [{ id: 'pu-leather', name: 'Thermo-PU Leather Hardcover', gsm: '80 GSM Inner', priceMult: 1.0, desc: 'Ribbon marker' }],
      corners: [{ id: 'round', name: 'Rounded Corners', priceAdd: 0 }],
      finishes: [{ id: 'debossing', name: 'Blind Deboss or UV Logo', priceAdd: 0 }],
      sides: [{ id: 'front-cover', name: 'Front Cover Imprint', priceMult: 1.0 }]
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
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=80',
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
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80',
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
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1U-w7MIKTLdmoE0xXJjNSokcK_2Z5NY61yz0UYrhx4NuQ6D9R-AKI8bUi3cAyRdDRu02Qzya61wcpUuKH66COnGzPZGZ8p4gqScWpUs2JS1i4BtwfdJQDLNZl5M-3Nueeu32CUgrmgyE2Vaqn_o48C1h4QTGbU1CLBJG8bFxhU5gxS_itr0sB6q_Y0ivSxLjcz2wQkea71yhzgyOLqyg50uMW1I6l1Va2dyGqghR8lb4f7T4u5Cjof7H_Es',
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
      category: 'stationery-office',
      categoryLabel: 'Stationery, Letterheads & Notebooks',
      subtitle: '20mm silky satin woven lanyard with lobster claw hook and safety breakaway',
      basePrice: 740,
      pricePill: 'BUY 10 @ Rs.740',
      rating: 4.8,
      reviewCount: 350,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1VlC0GFiHuPRgi-0V53jpuQ5tLmkTMT8cVd7Wxm-Dr1mKzeogpW0sswo6AjQEic7jJWpWiH8Yxtrm_mbG0eFnYsYvEw1ADxMkpqCKiJiC_D8ZqrCur8gqyPVbg77QMI-0y6N4G85wlmiISMpi1nNnNCoOFxQgtwh7Z2lImzE-EdoKgYafJqhcBzgTLlkISemz6SlcPDXQ_EQMTXmNCQyB0IWyTCZlACQq6DkTJwcSdXfUWJX1DDp2iaMVr8',
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
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1VXH-qRofcUTUDijxJqDNSZ_n3ShLczZkX6So3zQRGFAKcZfattkoMtfXMB3Zb8OvusFbCYII697lJm0aLhYsW_h_dXpOZQFcmg-2jqBkoL_WtTyGUc7bNstyuwcFCyR6MGQIPNLRceMUmRS-1OZjtGrA-lnbNw9RWi1X9ZCLaXrkdLFT1z3lh0j8YQiIajbvjChfdQOw4x0wN7Nx79zwC5XnloVxrcJaSoqNeCn2lhbz4ooNV2',
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
      id: 'custom-mailer-boxes',
      name: 'Custom Corrugated Mailer Boxes',
      category: 'packaging',
      categoryLabel: 'Labels, Stickers & Packaging',
      subtitle: 'Heavy-duty crush-proof E-Flute corrugated cardboard boxes printed with your custom branding',
      basePrice: 850,
      pricePill: 'BUY 10 @ Rs. 850',
      rating: 4.9,
      reviewCount: 310,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
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
      category: 'stationery-office',
      categoryLabel: 'Stationery, Letterheads & Notebooks',
      subtitle: 'Smooth click-action metallic ball pen with blue German ink and precision laser/color imprint',
      basePrice: 1600,
      pricePill: 'BUY 50 @ Rs.1600',
      rating: 4.7,
      reviewCount: 680,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1UE3tC8XlRMSvzWC6H9maOWAiYzq9tcUlG5rWV_vynHhp8gcfPyV1K-_KqcSm24XyVfJ5f_JrT68KesF3p79qO_1b3hwFe19zvO-XXSVking10_71EYd416YmxQZ9fK8i1ANwTD23QeLfeS52Qwnbkdn8ynxLlVLjmfJ5eRNo8_M4ofRxaA9zCn5NfyqHw3Ufiqg0kmw7OMXaiDMjuQ5u3YIVaYbBHj8lzAJfsCqbCGrlyQ6J2o9LBqrys',
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
      category: 'stationery-office',
      categoryLabel: 'Stationery, Letterheads & Notebooks',
      subtitle: 'Dual tone chrome silver and emerald green metallic executive pen',
      basePrice: 950,
      pricePill: 'BUY 25 @ Rs.950',
      rating: 4.8,
      reviewCount: 310,
      image: 'https://lh3.googleusercontent.com/aida/AEtjO1UzMOs9sMEFiCX0L78BbnmyTbj23f9h6AArq5Jh4ppeStjomiVV6ewPH7BlRNeMq7RvRQ7rB-_jlfqe87lvtZUgr5C-6yAnFfJ5kO1OyWByg8fbChXJLJ_fpSm8ekru9z-23n5xeAqH3MV96sZImyUUuTqeb4cvwWnJBAOhRVUJoiulsvsq35W4FTizVIizBxFYSsd5-qzYOYlPJq8fQZ7671w9IYZq1SHd-cGlCmn2DbGbe6c52zr0JqTc',
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
      bgColor: '#0f172a',
      accentColor: '#ea580c',
      textColor: '#ffffff',
      secondaryTextColor: '#cbd5e1',
      fontHeading: 'Space Grotesk',
      fontBody: 'Hanken Grotesk',
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
      bgColor: '#ffffff',
      accentColor: '#ea580c',
      textColor: '#0f172a',
      secondaryTextColor: '#64748b',
      fontHeading: 'Space Grotesk',
      fontBody: 'Hanken Grotesk',
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
      bgColor: '#131b2e',
      accentColor: '#f59e0b',
      textColor: '#ffffff',
      secondaryTextColor: '#94a3b8',
      fontHeading: 'Space Grotesk',
      fontBody: 'JetBrains Mono',
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
      bgColor: '#0a0f1d',
      accentColor: '#0284c7',
      textColor: '#ffffff',
      secondaryTextColor: '#94a3b8',
      fontHeading: 'Space Grotesk',
      fontBody: 'Hanken Grotesk',
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
      bgColor: '#f0fdf4',
      accentColor: '#059669',
      textColor: '#064e3b',
      secondaryTextColor: '#047857',
      fontHeading: 'Space Grotesk',
      fontBody: 'Hanken Grotesk',
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
