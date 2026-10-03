// verify_flow.js
// Verification of the Simplified Card/Product Architecture:
// 1. DELETE template system completely (no PRINTSHUBB_DATA.templates).
// 2. Cards displayed on the website are the actual products in PRINTSHUBB_DATA.products.
// 3. User clicks card -> exact card is selected.
// 4. User selects quantity.
// 5. User enters printing matter/text.
// 6. User submits: order contains { selectedCard, quantity, matter }.
// 7. Exact Flow Verification:
//    - Card A -> select -> quantity -> matter -> submit -> Card A remains selected.
//    - Card B -> select -> quantity -> matter -> submit -> Card B remains selected.
//    - Card C -> select -> quantity -> matter -> submit -> Card C remains selected.
// 8. Edit Test:
//    - Card B -> submit -> Edit -> Card B must still be shown with exact quantity & matter.
// 9. Single source of truth: selectedCard / selectedCardId.
// 10. Frontend only: zero backend/API/database dependencies.

const fs = require('fs');
const assert = require('assert');

const dataCode = fs.readFileSync('js/data.js', 'utf8');
const studioCode = fs.readFileSync('js/canvas-studio.js', 'utf8');
const cartCode = fs.readFileSync('js/cart-checkout.js', 'utf8');
const appCode = fs.readFileSync('js/app.js', 'utf8');

const storage = {};
const listeners = {};
const mockWindow = {
  location: { hash: '#home', pathname: '/' },
  sessionStorage: {
    getItem: (k) => storage[k] || null,
    setItem: (k, v) => { storage[k] = String(v); },
    removeItem: (k) => { delete storage[k]; }
  },
  localStorage: {
    getItem: (k) => storage['local_' + k] || null,
    setItem: (k, v) => { storage['local_' + k] = String(v); }
  },
  history: {
    pushState: (s, t, url) => { mockWindow.location.hash = ''; },
    replaceState: (s, t, url) => {
      const hIdx = url.indexOf('#');
      if (hIdx !== -1) mockWindow.location.hash = url.slice(hIdx);
    }
  },
  scrollTo: () => {},
  addEventListener: (evt, fn) => {
    listeners[evt] = listeners[evt] || [];
    listeners[evt].push(fn);
  },
  dispatchEvent: (evt) => {
    if (listeners[evt]) listeners[evt].forEach(fn => fn());
  },
  showToast: (msg, type) => {},
  requestAnimationFrame: (fn) => setTimeout(fn, 0)
};

global.requestAnimationFrame = mockWindow.requestAnimationFrame;

const elements = {};
const mockDoc = {
  body: { style: {} },
  documentElement: { classList: { add: () => {} } },
  addEventListener: (evt, fn) => {
    listeners[evt] = listeners[evt] || [];
    listeners[evt].push(fn);
  },
  getElementById: (id) => {
    if (!elements[id]) {
      elements[id] = {
        id,
        classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
        parentElement: { classList: { add: () => {}, remove: () => {}, contains: () => false } },
        addEventListener: () => {},
        innerHTML: '',
        textContent: '',
        value: '',
        src: '',
        toDataURL: () => 'data:image/png;base64,mockpng',
        getContext: () => ({
          clearRect: () => {},
          fillRect: () => {},
          strokeRect: () => {},
          fillText: () => {},
          save: () => {},
          restore: () => {},
          setLineDash: () => {},
          beginPath: () => {},
          closePath: () => {},
          moveTo: () => {},
          lineTo: () => {},
          arc: () => {},
          fill: () => {},
          stroke: () => {},
          drawImage: () => {},
          imageSmoothingEnabled: true,
          imageSmoothingQuality: 'high'
        })
      };
    }
    return elements[id];
  },
  querySelectorAll: () => []
};

global.window = mockWindow;
global.document = mockDoc;
global.sessionStorage = mockWindow.sessionStorage;
global.localStorage = mockWindow.localStorage;
global.history = mockWindow.history;
global.location = mockWindow.location;
global.Image = class { constructor() {} };

eval(dataCode);
eval(studioCode);
eval(cartCode);
eval(appCode);
if (listeners['DOMContentLoaded']) listeners['DOMContentLoaded'].forEach(fn => fn());

console.log('=================================================================');
console.log('VERIFYING SIMPLIFIED PRODUCT/CARD ARCHITECTURE (NO TEMPLATES)');
console.log('=================================================================\n');

// 1. VERIFY TEMPLATE SYSTEM IS COMPLETELY REMOVED
console.log('TEST 1: Template concept is completely deleted');
assert.strictEqual(window.PRINTSHUBB_DATA.templates, undefined, 'PRINTSHUBB_DATA.templates must be undefined/deleted');
assert.strictEqual(window.PRINTSHUBB_DATA.studioTemplates, undefined, 'PRINTSHUBB_DATA.studioTemplates must be undefined/deleted');
console.log('  PASSED: PRINTSHUBB_DATA.templates is completely deleted.');

// 2. VERIFY CARDS ARE REAL PRODUCTS IN PRINTSHUBB_DATA.products
console.log('\nTEST 2: Card designs are first-class products in catalog');
const cardA = window.PRINTSHUBB_DATA.getProduct('care-clinic');
assert(cardA, 'Card A (care-clinic) must exist in products catalog');
assert.strictEqual(cardA.id, 'care-clinic');
assert.strictEqual(cardA.category, 'visiting-cards');
assert(cardA.image && cardA.image.includes('care-clinic.svg'), 'Card A must have SVG product image');

const cardB = window.PRINTSHUBB_DATA.getProduct('luxury-dark-monogram');
assert(cardB, 'Card B (luxury-dark-monogram) must exist in products catalog');
assert.strictEqual(cardB.id, 'luxury-dark-monogram');
assert(cardB.image && cardB.image.includes('luxury-dark-monogram.svg'), 'Card B must have SVG product image');

const cardC = window.PRINTSHUBB_DATA.getProduct('nexus-tech-startup');
assert(cardC, 'Card C (nexus-tech-startup) must exist in products catalog');
assert.strictEqual(cardC.id, 'nexus-tech-startup');
assert(cardC.image && cardC.image.includes('nexus-tech-startup.svg'), 'Card C must have SVG product image');
console.log('  PASSED: Cards A, B, and C are concrete products in PRINTSHUBB_DATA.products.');

// 3. EXACT FLOW 1: Card A → select → quantity → matter → submit → Card A remains selected
console.log('\nTEST 3: Flow with Card A');
window.appRouter.selectCard('care-clinic');
assert.strictEqual(window.appRouter.selectedCardId, 'care-clinic', 'selectedCardId must be care-clinic');
assert.strictEqual(window.appRouter.selectedCard.id, 'care-clinic', 'selectedCard must be Card A');
assert.strictEqual(mockDoc.getElementById('pdp-preview-image').src, cardA.image, 'PDP preview must display Card A image directly');

// Select quantity
window.appRouter.setPDPOption('quantity', 250);
assert.strictEqual(window.appRouter.pdpOptions.quantity, 250, 'Quantity must be updated to 250');

// Enter matter
const matterA = 'Dr. Sneha Kulkarni | Care Advanced Diagnostics | 9822099887';
window.appRouter.setPDPMatter(matterA);
assert.strictEqual(window.appRouter.pdpOptions.matter, matterA, 'Matter must be updated');

// Submit order
const orderA = window.appRouter.submitCardOrder();
assert(orderA, 'Order must be created');
assert.strictEqual(orderA.selectedCard.id, 'care-clinic', 'Order must contain Card A');
assert.strictEqual(orderA.quantity, 250, 'Order quantity must be 250');
assert.strictEqual(orderA.matter, matterA, 'Order matter must be preserved');
assert.strictEqual(window.appRouter.selectedCardId, 'care-clinic', 'Card A must remain selected after submit');
console.log('  PASSED: Card A → select → quantity 250 → matter → submit → Card A remains selected.');

// 4. EXACT FLOW 2: Card B → select → quantity → matter → submit → Card B remains selected
console.log('\nTEST 4: Flow with Card B (User prompt specific example)');
window.appRouter.selectCard('luxury-dark-monogram');
assert.strictEqual(window.appRouter.selectedCardId, 'luxury-dark-monogram', 'selectedCardId must be luxury-dark-monogram');
assert.strictEqual(window.appRouter.selectedCard.id, 'luxury-dark-monogram', 'selectedCard must be Card B');
assert.strictEqual(mockDoc.getElementById('pdp-preview-image').src, cardB.image, 'PDP preview must display Card B image directly');

// Select quantity
window.appRouter.setPDPOption('quantity', 100);
assert.strictEqual(window.appRouter.pdpOptions.quantity, 100);

// Enter user prompt exact matter
const matterB = 'Tausif Khan | Web Developer | 9876543210';
window.appRouter.setPDPMatter(matterB);
assert.strictEqual(window.appRouter.pdpOptions.matter, matterB);

// Submit order
const orderB = window.appRouter.submitCardOrder();
assert(orderB, 'Order must be created');
assert.strictEqual(orderB.selectedCard.id, 'luxury-dark-monogram', 'Order must contain Card B');
assert.strictEqual(orderB.selectedCard.name, 'Luxury Dark Monogram');
assert.strictEqual(orderB.quantity, 100, 'Order quantity must be 100');
assert.strictEqual(orderB.matter, matterB, 'Order matter must be exact user matter');
assert.strictEqual(window.appRouter.selectedCardId, 'luxury-dark-monogram', 'Card B must remain selected after submit');
console.log('  PASSED: Card B → select → quantity 100 → matter → submit → Card B preserved with exact data.');

// 5. EXACT FLOW 3: Card C → select → quantity → matter → submit → Card C remains selected
console.log('\nTEST 5: Flow with Card C');
window.appRouter.selectCard('nexus-tech-startup');
assert.strictEqual(window.appRouter.selectedCardId, 'nexus-tech-startup', 'selectedCardId must be nexus-tech-startup');
assert.strictEqual(window.appRouter.selectedCard.id, 'nexus-tech-startup', 'selectedCard must be Card C');
assert.strictEqual(mockDoc.getElementById('pdp-preview-image').src, cardC.image, 'PDP preview must display Card C image directly');

// Select quantity
window.appRouter.setPDPOption('quantity', 500);
assert.strictEqual(window.appRouter.pdpOptions.quantity, 500);

// Enter matter
const matterC = 'Dev Patel | CTO | Nexus Cloud Systems | Bengaluru';
window.appRouter.setPDPMatter(matterC);
assert.strictEqual(window.appRouter.pdpOptions.matter, matterC);

// Submit order
const orderC = window.appRouter.submitCardOrder();
assert(orderC, 'Order must be created');
assert.strictEqual(orderC.selectedCard.id, 'nexus-tech-startup', 'Order must contain Card C');
assert.strictEqual(orderC.quantity, 500, 'Order quantity must be 500');
assert.strictEqual(orderC.matter, matterC, 'Order matter must be preserved');
assert.strictEqual(window.appRouter.selectedCardId, 'nexus-tech-startup', 'Card C must remain selected after submit');
console.log('  PASSED: Card C → select → quantity 500 → matter → submit → Card C remains selected.');

// 6. TEST EDIT FLOW: Card B → submit → Edit → Card B must still be shown
console.log('\nTEST 6: Edit flow (Card B → submit → Edit → Card B must still be shown)');
// User previously submitted orderB for Card B with quantity 100 and matter 'Tausif Khan | Web Developer | 9876543210'
// Trigger edit on that order:
window.appRouter.editCardOrder(orderB);

// Assertions for Edit:
assert.strictEqual(window.appRouter.selectedCardId, 'luxury-dark-monogram', 'selectedCardId must still be luxury-dark-monogram on Edit');
assert.strictEqual(window.appRouter.selectedCard.id, 'luxury-dark-monogram', 'selectedCard must still be Card B on Edit');
assert.strictEqual(mockDoc.getElementById('pdp-preview-image').src, cardB.image, 'PDP preview image on Edit must still be Card B SVG');
assert.strictEqual(window.appRouter.pdpOptions.quantity, 100, 'PDP quantity on Edit must still be 100');
assert.strictEqual(window.appRouter.pdpOptions.matter, matterB, 'PDP matter on Edit must still be exact matter');
assert.strictEqual(mockDoc.getElementById('pdp-matter-input').value, matterB, 'Matter input on Edit must display previous matter');

console.log('  PASSED: Edit flow verified! Card B remains displayed with exact quantity and matter.');

console.log('\n=================================================================');
console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY (100% PASS)');
console.log('=================================================================');
