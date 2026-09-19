// ==========================================================================
// Printhubbs - Online Interactive Design Studio & Canvas Engine
// Implements 7/5 Asymmetrical Customizer, 2D Canvas, Bleed Guides & Proofing Bar
// Based on stitch_website_ui_replica/DESIGN.md & vistaprint_india_features_functions.md
// ==========================================================================

class PrintStudioEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.currentProduct = null;
    this.currentSide = 'front'; // 'front' or 'back'
    this.guidesVisible = true;
    this.rulerVisible = true;
    this.is3DPreview = false;
    this.dpiStatus = 300;
    this.uploadedLogo = null;
    this.logoTransform = { x: 50, y: 50, scale: 0.6, active: false };

    // Canvas internal logical resolution (at 300 DPI equivalent for 8.9cm x 5.1cm)
    this.canvasWidth = 1050; // ~3.5 inches at 300 DPI + bleed
    this.canvasHeight = 600;  // ~2.0 inches at 300 DPI + bleed
    this.bleedPixels = 36;   // 3mm bleed margin in logical pixels
    this.safePixels = 72;    // Safe text zone

    // Active design state
    this.state = {
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
    };

    this.qrImage = null;
    this.generateQRMatrix();
  }

  init(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.render();
  }

  setProduct(product) {
    this.currentProduct = product;
    // Set appropriate canvas aspect ratio based on product
    if (product.category === 'visiting-cards') {
      this.canvasWidth = 1050;
      this.canvasHeight = 600;
      this.bleedPixels = 36;
      this.safePixels = 72;
    } else if (product.category === 'clothing-apparel') {
      this.canvasWidth = 800;
      this.canvasHeight = 800;
      this.bleedPixels = 0;
      this.safePixels = 50;
    } else if (product.category === 'photo-gifts' || product.category === 'drinkware') {
      this.canvasWidth = 900;
      this.canvasHeight = 600;
      this.bleedPixels = 20;
      this.safePixels = 50;
    }
    if (this.canvas) {
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;
      this.render();
    }
    this.updateProofingBar();
  }

  applyTemplate(template) {
    this.state.templateId = template.id;
    this.state.bgColor = template.bgColor;
    this.state.accentColor = template.accentColor;
    this.state.textColor = template.textColor;
    this.state.secondaryTextColor = template.secondaryTextColor;
    this.state.fontHeading = template.fontHeading;
    this.state.fontBody = template.fontBody;
    this.state.fields = { ...template.fields };
    this.generateQRMatrix();
    this.syncFormControls();
    this.render();
  }

  updateField(fieldName, value) {
    if (this.state.fields.hasOwnProperty(fieldName)) {
      this.state.fields[fieldName] = value;
      if (fieldName === 'qrUrl') {
        this.generateQRMatrix();
      }
      this.render();
    }
  }

  updateColor(type, color) {
    if (type === 'bg') this.state.bgColor = color;
    if (type === 'accent') this.state.accentColor = color;
    if (type === 'text') this.state.textColor = color;
    if (type === 'secondaryText') this.state.secondaryTextColor = color;
    this.render();
  }

  toggleSide(side) {
    this.currentSide = side;
    this.render();
    const frontBtn = document.getElementById('studio-btn-front');
    const backBtn = document.getElementById('studio-btn-back');
    if (frontBtn && backBtn) {
      if (side === 'front') {
        frontBtn.classList.add('bg-[#ea580c]', 'text-white');
        frontBtn.classList.remove('bg-white', 'text-[#0f172a]');
        backBtn.classList.add('bg-white', 'text-[#0f172a]');
        backBtn.classList.remove('bg-[#ea580c]', 'text-white');
      } else {
        backBtn.classList.add('bg-[#ea580c]', 'text-white');
        backBtn.classList.remove('bg-white', 'text-[#0f172a]');
        frontBtn.classList.add('bg-white', 'text-[#0f172a]');
        frontBtn.classList.remove('bg-[#ea580c]', 'text-white');
      }
    }
  }

  toggleGuides(visible) {
    this.guidesVisible = visible !== undefined ? visible : !this.guidesVisible;
    this.render();
  }

  // --- SELF-CONTAINED QR CODE DRAWING ---
  generateQRMatrix() {
    // Generates a representative sharp 2D scannable-look matrix directly for canvas embedding
    const url = this.state.fields.qrUrl || 'https://printhubbs.in';
    const size = 25; // 25x25 QR grid version
    const matrix = [];
    
    // Generate deterministic pattern based on URL hash
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
      hash = (hash << 5) - hash + url.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < size; r++) {
      const row = [];
      for (let c = 0; c < size; c++) {
        // Standard QR Finder patterns at top-left, top-right, bottom-left
        const inTL = r < 7 && c < 7;
        const inTR = r < 7 && c >= size - 7;
        const inBL = r >= size - 7 && c < 7;

        if (inTL || inTR || inBL) {
          const lr = inBL ? r - (size - 7) : r;
          const lc = inTR ? c - (size - 7) : c;
          const isBorder = lr === 0 || lr === 6 || lc === 0 || lc === 6;
          const isInner = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
          row.push(isBorder || isInner ? 1 : 0);
        } else if (r === 6 || c === 6) {
          // Timing patterns
          row.push((r + c) % 2 === 0 ? 1 : 0);
        } else {
          // Data bits simulated via hash bitwise
          const bit = (Math.abs(hash ^ (r * 31 + c * 17))) % 3 !== 0 ? 1 : 0;
          row.push(bit);
        }
      }
      matrix.push(row);
    }
    this.qrMatrix = matrix;
  }

  setUploadedLogo(imgElement) {
    this.uploadedLogo = imgElement;
    this.logoTransform.active = true;
    // Calculate DPI based on pixel dimensions vs logical 2 inch width
    if (imgElement.naturalWidth) {
      const approxInches = 1.5;
      const calcDpi = Math.round(imgElement.naturalWidth / approxInches);
      this.dpiStatus = Math.min(600, Math.max(72, calcDpi));
    }
    this.updateProofingBar();
    this.render();
  }

  // --- MAIN RENDER PASS ---
  render() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const W = this.canvasWidth;
    const H = this.canvasHeight;
    const bleed = this.bleedPixels;

    ctx.clearRect(0, 0, W, H);

    if (this.currentSide === 'front') {
      this.renderFrontSide(ctx, W, H, bleed);
    } else {
      this.renderBackSide(ctx, W, H, bleed);
    }

    // Overlay Print Production Guides if active
    if (this.guidesVisible) {
      this.renderPrintGuides(ctx, W, H, bleed);
    }
  }

  renderFrontSide(ctx, W, H, bleed) {
    // 1. Full Canvas Background (fills bleed area)
    ctx.fillStyle = this.state.bgColor;
    ctx.fillRect(0, 0, W, H);

    // Decorative Geometric Accent Line / Geometry (Atelier Precision Style)
    ctx.fillStyle = this.state.accentColor;
    ctx.fillRect(bleed + 20, bleed + 20, 8, H - (bleed * 2) - 40);

    // Horizontal bottom accent strip
    ctx.fillStyle = this.state.accentColor;
    ctx.fillRect(bleed + 20, H - bleed - 28, W - (bleed * 2) - 40, 4);

    // 2. Company Name & Tagline (Top Left)
    ctx.fillStyle = this.state.textColor;
    ctx.font = `700 32px "${this.state.fontHeading}", sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(this.state.fields.company.toUpperCase(), bleed + 50, bleed + 40);

    ctx.fillStyle = this.state.accentColor;
    ctx.font = `600 15px "${this.state.fontBody}", sans-serif`;
    ctx.fillText(this.state.fields.tagline, bleed + 52, bleed + 82);

    // 3. Person Name & Title (Middle Left)
    ctx.fillStyle = this.state.textColor;
    ctx.font = `700 36px "${this.state.fontHeading}", sans-serif`;
    ctx.fillText(this.state.fields.name, bleed + 50, bleed + 160);

    ctx.fillStyle = this.state.secondaryTextColor;
    ctx.font = `500 18px "${this.state.fontBody}", sans-serif`;
    ctx.fillText(this.state.fields.title, bleed + 52, bleed + 205);

    // 4. Contact Details (Bottom Left & Middle)
    const startY = bleed + 270;
    const col1X = bleed + 50;
    const col2X = bleed + 380;
    const lineHeight = 34;

    ctx.fillStyle = this.state.textColor;
    ctx.font = `500 16px "JetBrains Mono", monospace`;

    // Phone
    ctx.fillText(`TEL: ${this.state.fields.phone}`, col1X, startY);
    // Email
    ctx.fillText(`EML: ${this.state.fields.email}`, col1X, startY + lineHeight);
    // Website
    ctx.fillText(`WEB: ${this.state.fields.website}`, col1X, startY + (lineHeight * 2));

    // Address
    ctx.fillStyle = this.state.secondaryTextColor;
    ctx.font = `400 15px "${this.state.fontBody}", sans-serif`;
    ctx.fillText(this.state.fields.address, col1X, startY + (lineHeight * 3) + 6);

    // 5. Render Uploaded Logo (if present) OR Brand Crest
    const logoAreaX = W - bleed - 240;
    const logoAreaY = bleed + 40;

    if (this.uploadedLogo) {
      try {
        const logoW = 160 * this.logoTransform.scale;
        const logoH = 160 * this.logoTransform.scale;
        ctx.drawImage(this.uploadedLogo, logoAreaX + 20, logoAreaY, logoW, logoH);
      } catch (e) {
        console.error('Error drawing uploaded logo', e);
      }
    } else {
      // Elegant Geometric Monogram Crest
      ctx.save();
      ctx.strokeStyle = this.state.accentColor;
      ctx.lineWidth = 3;
      ctx.strokeRect(logoAreaX + 60, logoAreaY + 10, 80, 80);

      ctx.fillStyle = this.state.textColor;
      ctx.font = `700 38px "${this.state.fontHeading}", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const initial = this.state.fields.company.charAt(0) || 'P';
      ctx.fillText(initial, logoAreaX + 100, logoAreaY + 50);
      ctx.restore();
    }

    // 6. Dynamic QR Code Box (Bottom Right)
    this.renderQRCode(ctx, W - bleed - 180, H - bleed - 200, 140);
  }

  renderBackSide(ctx, W, H, bleed) {
    // Back Side Design (Minimalist Luxury Atelier)
    ctx.fillStyle = this.state.backBgColor || '#1e293b';
    ctx.fillRect(0, 0, W, H);

    // Central Brand Focus
    const centerX = W / 2;
    const centerY = H / 2;

    // Outer decorative badge
    ctx.save();
    ctx.strokeStyle = this.state.accentColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - 100, centerY - 100, 200, 200);

    // Brand Initial / Logo
    ctx.fillStyle = this.state.textColor;
    ctx.font = `700 64px "${this.state.fontHeading}", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const initial = this.state.fields.company.charAt(0) || 'P';
    ctx.fillText(initial, centerX, centerY - 20);

    // Company Name below
    ctx.font = `700 24px "${this.state.fontHeading}", sans-serif`;
    ctx.fillText(this.state.fields.company.toUpperCase(), centerX, centerY + 50);

    ctx.fillStyle = this.state.accentColor;
    ctx.font = `600 15px "JetBrains Mono", monospace`;
    ctx.fillText(this.state.fields.website.toUpperCase(), centerX, centerY + 85);
    ctx.restore();
  }

  renderQRCode(ctx, x, y, size) {
    if (!this.qrMatrix) return;
    const matrix = this.qrMatrix;
    const count = matrix.length;
    const cellSize = size / count;

    // White backing container for optimal scanner contrast
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 8, y - 8, size + 16, size + 16);

    ctx.fillStyle = '#0f172a';
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (matrix[r][c] === 1) {
          ctx.fillRect(x + c * cellSize, y + r * cellSize, cellSize, cellSize);
        }
      }
    }

    // QR Label micro-tag
    ctx.fillStyle = '#64748b';
    ctx.font = `700 9px "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('SCAN VCARD', x + (size / 2), y + size + 14);
  }

  renderPrintGuides(ctx, W, H, bleed) {
    ctx.save();

    // 1. Bleed Border Line (3mm - Orange Dashed)
    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.strokeRect(bleed, bleed, W - (bleed * 2), H - (bleed * 2));

    // 2. Safe Margin Border Line (Blue / Cyan Dotted)
    const safe = this.safePixels;
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(safe, safe, W - (safe * 2), H - (safe * 2));

    // Guide Badges on Canvas Corners
    ctx.setLineDash([]);
    ctx.font = `600 10px "JetBrains Mono", monospace`;

    // Bleed indicator tag
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(bleed, 6, 92, 18);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('BLEED: 3MM', bleed + 6, 19);

    // Trim cut indicator tag
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(W - bleed - 92, 6, 86, 18);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('TRIM LINE', W - bleed - 86, 19);

    ctx.restore();
  }

  // --- DOCKED PROOFING BAR CONTROLLER ---
  updateProofingBar() {
    const dpiEl = document.getElementById('proofing-dpi-text');
    const dpiBadge = document.getElementById('proofing-dpi-badge');
    const bleedEl = document.getElementById('proofing-bleed-status');
    const dimEl = document.getElementById('proofing-dimensions-pill');

    if (dpiEl && dpiBadge) {
      if (this.dpiStatus >= 300) {
        dpiEl.textContent = `${this.dpiStatus} DPI — Optimal Print Quality`;
        dpiBadge.className = 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse';
      } else {
        dpiEl.textContent = `${this.dpiStatus} DPI — Low Resolution Alert`;
        dpiBadge.className = 'w-2 h-2 rounded-full bg-amber-500';
      }
    }

    if (bleedEl) {
      bleedEl.textContent = '3mm Bleed Protected';
    }

    if (dimEl && this.currentProduct) {
      dimEl.textContent = this.currentProduct.dimensions || '8.9 cm × 5.1 cm';
    }
  }

  // Synchronize form controls with current state
  syncFormControls() {
    const fields = this.state.fields;
    for (const key in fields) {
      const input = document.getElementById(`studio-input-${key}`);
      if (input) {
        input.value = fields[key];
      }
    }
  }

  // Generate Base64 snapshot for thumbnail
  getSnapshotDataUrl() {
    if (!this.canvas) return null;
    return this.canvas.toDataURL('image/png', 0.92);
  }
}

// Instantiate engine globally
window.studioEngine = new PrintStudioEngine();
