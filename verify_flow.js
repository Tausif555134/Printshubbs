// verify_flow.js
// Verification of all 6 cases required by the user prompt
const fs = require('fs');
const assert = require('assert');

const dataCode = fs.readFileSync('js/data.js', 'utf8');
const studioCode = fs.readFileSync('js/canvas-studio.js', 'utf8');
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
  showToast: (msg, type) => {}
};

const elements = {};
const mockDoc = {
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
eval(appCode);
if (listeners['DOMContentLoaded']) listeners['DOMContentLoaded'].forEach(fn => fn());

const CARD_1 = 'tpl-corporate-modern';
const CARD_2 = 'tpl-neeta-rai';
const CARD_3 = 'tpl-luxury-gold';

console.log('Testing User Requirements:\n');

// CASE 1: Select Card 1 → Submit → Card 1 appears
console.log('TEST 1: Select Card 1 → Submit → Card 1 appears');
window.appRouter.navigate('pdp', 'standard-visiting-cards');
window.appRouter.selectCard(CARD_1);
assert.strictEqual(window.appRouter.selectedCardId, CARD_1, 'selectedCardId must be Card 1');
window.appRouter.launchStudioWithSelectedCard();
assert.strictEqual(window.appRouter.currentView, 'studio', 'Must navigate to studio');
assert.strictEqual(window.studioEngine.state.templateId, CARD_1, 'Studio canvas must display Card 1');
console.log('  PASSED: Card 1 successfully loaded into studio on submit.');

// CASE 2: Select Card 2 → Submit → Card 2 appears
console.log('\nTEST 2: Select Card 2 → Submit → Card 2 appears');
window.appRouter.navigate('pdp', 'standard-visiting-cards');
window.appRouter.selectCard(CARD_2);
assert.strictEqual(window.appRouter.selectedCardId, CARD_2, 'selectedCardId must be Card 2');
window.appRouter.launchStudioWithSelectedCard();
assert.strictEqual(window.studioEngine.state.templateId, CARD_2, 'Studio canvas must display Card 2');
console.log('  PASSED: Card 2 successfully loaded into studio on submit.');

// CASE 3: Select Card 3 → Submit → Card 3 appears
console.log('\nTEST 3: Select Card 3 → Submit → Card 3 appears');
window.appRouter.navigate('pdp', 'standard-visiting-cards');
window.appRouter.selectCard(CARD_3);
assert.strictEqual(window.appRouter.selectedCardId, CARD_3, 'selectedCardId must be Card 3');
window.appRouter.launchStudioWithSelectedCard();
assert.strictEqual(window.studioEngine.state.templateId, CARD_3, 'Studio canvas must display Card 3');
console.log('  PASSED: Card 3 successfully loaded into studio on submit.');

// CASE 4: Select Card 2 → Edit → Card 2 remains selected
console.log('\nTEST 4: Select Card 2 → Edit → Card 2 remains selected');
// Create a saved project with Card 2
const projectCard2 = {
  id: 'proj_card_2',
  productId: 'standard-visiting-cards',
  cardId: CARD_2,
  title: 'Neeta Rai Card Project',
  designState: {
    templateId: CARD_2,
    layout: 'minimal-clean',
    bgColor: '#ffffff',
    textColor: '#000000',
    fields: { company: 'NEETA DESIGN STUDIO', name: 'Neeta Rai' }
  }
};
window.appRouter.myProjects = [projectCard2];
window.appRouter.loadProjectIntoStudio('proj_card_2');
// Simulate async hashchange
window.dispatchEvent('hashchange');
assert.strictEqual(window.appRouter.selectedCardId, CARD_2, 'selectedCardId must remain Card 2 after edit');
assert.strictEqual(window.studioEngine.state.templateId, CARD_2, 'Studio templateId must be Card 2');
assert.strictEqual(window.studioEngine.state.fields.company, 'NEETA DESIGN STUDIO', 'Custom fields must be preserved');
console.log('  PASSED: Card 2 remained selected and custom fields were preserved after clicking Edit.');

// CASE 5: Change Card 2 → Card 1 → Edit → Card 1 appears
console.log('\nTEST 5: Change Card 2 → Card 1 → Edit → Card 1 appears');
const projectCard1 = {
  id: 'proj_card_1',
  productId: 'standard-visiting-cards',
  cardId: CARD_1,
  title: 'Corporate Executive Card Project',
  designState: {
    templateId: CARD_1,
    layout: 'executive-left',
    bgColor: '#000000',
    textColor: '#ffffff',
    fields: { company: 'GLOBAL VENTURES INC', name: 'Alexander Cross' }
  }
};
window.appRouter.myProjects.unshift(projectCard1);
window.appRouter.loadProjectIntoStudio('proj_card_1');
window.dispatchEvent('hashchange');
assert.strictEqual(window.appRouter.selectedCardId, CARD_1, 'selectedCardId must be Card 1');
assert.strictEqual(window.studioEngine.state.templateId, CARD_1, 'Studio templateId must be Card 1');
assert.strictEqual(window.studioEngine.state.fields.company, 'GLOBAL VENTURES INC', 'Card 1 project fields must appear');
console.log('  PASSED: Changed to Card 1, clicked Edit, and Card 1 appeared properly.');

// CASE 6: Refresh/re-render should not unexpectedly change the selected card
console.log('\nTEST 6: Refresh/re-render does not unexpectedly change selected card');
window.appRouter.selectCard(CARD_3);
assert.strictEqual(window.appRouter.selectedCardId, CARD_3);
// Simulate re-rendering PDP options
window.appRouter.renderPDPOptions();
assert.strictEqual(window.appRouter.selectedCardId, CARD_3, 'Re-render must keep Card 3');
// Simulate browser page refresh by constructing a new app instance
const refreshedApp = new window.PrinthubbsApp();
assert.strictEqual(refreshedApp.selectedCardId, CARD_3, 'Page refresh must keep Card 3 from sessionStorage');
console.log('  PASSED: Re-render and refresh reliably preserve the selected card.');

console.log('\nALL 6 VERIFICATION TEST CASES PASSED SUCCESSFULLY!');
