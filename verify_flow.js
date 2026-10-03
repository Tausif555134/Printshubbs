// verify_flow.js
// Verification of all requirements specified in user prompt:
// 1. Templates as real frontend data entities with unique id, name, category, and previewImage
// 2. Exact test flow:
//    - Select Template A → Continue/Submit → Product Specifications → correct Template A image/data appears
//    - Select Template B → Continue/Submit → Product Specifications → correct Template B image/data appears
//    - Select Template C → Edit → Template C is still selected
// 3. Single source of truth: selectedTemplateId
// 4. Aliases and backward compatibility
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
eval(appCode);
if (listeners['DOMContentLoaded']) listeners['DOMContentLoaded'].forEach(fn => fn());

console.log('--- VERIFYING TEMPLATE ARCHITECTURE & USER REQUIREMENTS ---\n');

// 1. Verify Templates as Real Frontend Data Entities
console.log('TEST 1: Templates are first-class frontend data entities');
assert(Array.isArray(window.PRINTSHUBB_DATA.templates), 'PRINTSHUBB_DATA.templates must be an array');
assert(window.PRINTSHUBB_DATA.templates.length >= 6, 'Must have at least 6 templates');

const templateA = window.PRINTSHUBB_DATA.getTemplate('care-clinic');
assert(templateA, 'Template A (care-clinic) must exist');
assert.strictEqual(templateA.id, 'care-clinic', 'Template A id must be care-clinic');
assert.strictEqual(templateA.name, 'Care Clinic & Healthcare');
assert.strictEqual(templateA.category, 'Healthcare');
assert(templateA.previewImage && templateA.previewImage.includes('care-clinic.svg'), 'Template A must have previewImage');

const templateB = window.PRINTSHUBB_DATA.getTemplate('luxury-dark-monogram');
assert(templateB, 'Template B (luxury-dark-monogram) must exist');
assert.strictEqual(templateB.id, 'luxury-dark-monogram');
assert.strictEqual(templateB.name, 'Luxury Dark Monogram');
assert(templateB.previewImage && templateB.previewImage.includes('luxury-dark-monogram.svg'));

const templateC = window.PRINTSHUBB_DATA.getTemplate('nexus-tech-startup');
assert(templateC, 'Template C (nexus-tech-startup) must exist');
assert.strictEqual(templateC.id, 'nexus-tech-startup');
assert.strictEqual(templateC.name, 'Nexus Tech Startup');
assert(templateC.previewImage && templateC.previewImage.includes('nexus-tech-startup.svg'));

console.log('  PASSED: Templates verified as rich data entities with id, name, category, and previewImage.');

// 2. Flow Step 1: Select Template A → Continue/Submit → Product Specifications → correct Template A image/data appears
console.log('\nTEST 2: Select Template A → Continue/Submit → Product Specifications → correct Template A image/data appears');
window.appRouter.selectTemplate('care-clinic');
assert.strictEqual(window.appRouter.selectedTemplateId, 'care-clinic', 'selectedTemplateId must be care-clinic');
assert.strictEqual(mockWindow.sessionStorage.getItem('printhubbs_selected_template'), 'care-clinic', 'sessionStorage must store care-clinic');

// Open Product Specifications (PDP)
window.appRouter.navigate('pdp', 'standard-visiting-cards');
const pdpImageA = mockDoc.getElementById('pdp-preview-image');
const pdpNameA = mockDoc.getElementById('pdp-selected-template-name');
assert.strictEqual(pdpImageA.src, templateA.previewImage, 'PDP preview image must show Template A preview image');
assert(pdpNameA.textContent.includes('Care Clinic'), 'PDP template name must show Care Clinic');
console.log('  PASSED: Product Specifications rendered Care Clinic template previewImage and data.');

// 3. Flow Step 2: Select Template B → Continue/Submit → Product Specifications → correct Template B image/data appears
console.log('\nTEST 3: Select Template B → Continue/Submit → Product Specifications → correct Template B image/data appears');
window.appRouter.selectTemplate('luxury-dark-monogram');
assert.strictEqual(window.appRouter.selectedTemplateId, 'luxury-dark-monogram', 'selectedTemplateId must be luxury-dark-monogram');

window.appRouter.navigate('pdp', 'standard-visiting-cards');
const pdpImageB = mockDoc.getElementById('pdp-preview-image');
const pdpNameB = mockDoc.getElementById('pdp-selected-template-name');
assert.strictEqual(pdpImageB.src, templateB.previewImage, 'PDP preview image must show Template B preview image');
assert(pdpNameB.textContent.includes('Luxury Dark Monogram'), 'PDP template name must show Luxury Dark Monogram');
console.log('  PASSED: Product Specifications rendered Luxury Dark Monogram template previewImage and data.');

// 4. Flow Step 3: Select Template C → Edit → Template C is still selected
console.log('\nTEST 4: Select Template C → Edit → Template C is still selected');
window.appRouter.selectTemplate('nexus-tech-startup');
assert.strictEqual(window.appRouter.selectedTemplateId, 'nexus-tech-startup');

// Launch Studio and save custom project with Template C
window.appRouter.launchStudioWithSelectedTemplate();
assert.strictEqual(window.appRouter.currentView, 'studio', 'Must be in studio');
assert.strictEqual(window.studioEngine.state.templateId, 'nexus-tech-startup', 'Studio must load Template C');
window.studioEngine.state.fields.company = 'NEXUS CLOUD SYSTEMS AI LAB';

// Save project
window.appRouter.saveCurrentProject();
const savedProject = window.appRouter.myProjects[0];
assert.strictEqual(savedProject.templateId, 'nexus-tech-startup', 'Saved project must retain templateId');

// Switch to Template A temporarily
window.appRouter.selectTemplate('care-clinic');
assert.strictEqual(window.appRouter.selectedTemplateId, 'care-clinic');

// Now click Edit on the saved project (Template C)
window.appRouter.loadProjectIntoStudio(savedProject.id);
assert.strictEqual(window.appRouter.selectedTemplateId, 'nexus-tech-startup', 'Template C must remain selected on edit');
assert.strictEqual(window.studioEngine.state.templateId, 'nexus-tech-startup', 'Studio must display Template C on edit');
assert.strictEqual(window.studioEngine.state.fields.company, 'NEXUS CLOUD SYSTEMS AI LAB', 'Custom edits must be preserved');

// Open Product Specifications again after editing Template C
window.appRouter.navigate('pdp', 'standard-visiting-cards');
const pdpImageC = mockDoc.getElementById('pdp-preview-image');
assert.strictEqual(pdpImageC.src, templateC.previewImage, 'Product Specifications must display Template C previewImage');
console.log('  PASSED: Template C remained selected across project save, edit, and Product Specifications navigation.');

// 5. Flow Step 5: Backwards compatibility with alias IDs
console.log('\nTEST 5: Backward compatibility with alias IDs (tpl-medical-clinic)');
window.appRouter.selectCard('tpl-medical-clinic');
assert.strictEqual(window.appRouter.selectedTemplateId, 'care-clinic', 'tpl-medical-clinic must resolve to care-clinic');
console.log('  PASSED: Alias IDs cleanly resolve to the canonical data entity.');

// 6. Flow Step 6: Refresh / re-render retains selected template
console.log('\nTEST 6: Refresh/re-render does not unexpectedly reset selected template');
window.appRouter.selectTemplate('luxury-dark-monogram');
window.appRouter.renderPDPOptions();
assert.strictEqual(window.appRouter.selectedTemplateId, 'luxury-dark-monogram', 'Re-render keeps template');
const refreshedApp = new window.PrinthubbsApp();
assert.strictEqual(refreshedApp.selectedTemplateId, 'luxury-dark-monogram', 'Refresh reloads template from sessionStorage');
console.log('  PASSED: Re-render and refresh reliably preserve the selected template.');

console.log('\nALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
