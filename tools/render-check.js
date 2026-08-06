// Headless render check for the Design Component.
//
//   node tools/render-check.js ../index.html    (or just: node tools/render-check.js)
//
// Stubs React, DCLogic and window, evaluates the `text/x-dc` script block from the page
// and calls renderVals() for every {site, page} pair. Fails if any bound value comes back
// empty or containing `undefined` — which is what a missing `.com` variant, a renamed
// project key or a broken relation looks like before it reaches a browser.

const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, '..', 'index.html');
const src = fs.readFileSync(file, 'utf8');
const block = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
if (!block) {
  console.error('No <script type="text/x-dc"> block found in ' + file);
  process.exit(1);
}

global.React = { createRef: () => ({ current: null }), createElement: (t, p, c) => ({ t, p, c }) };
global.DCLogic = class DCLogic { setState() {} };
global.window = { location: { hash: '', pathname: '/', search: '' }, history: {}, addEventListener() {}, scrollTo() {} };
global.performance = { now: () => 0 };
global.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve({ items: [] }) });

// SITE is a build constant, so each presentation is checked by evaluating the script with
// that constant flipped — the same substitution `make-com.js` performs to generate the
// institutional build.
const SITE_CONST = /const SITE = '(org|com)';/;
if (!SITE_CONST.test(block[1])) {
  console.error('SITE build constant not found — has the header of the script changed?');
  process.exit(1);
}
const load = (site) => eval(block[1].replace(SITE_CONST, "const SITE = '" + site + "';") + '\n;Component');

const PAGES = [
  'home', 'manifesto', 'dfm', 'dk', 'eco', 'org', 'fn', 'docs', 'join',
  'bsdk', 'dk-network', 'lcrypt', 'uid', 'daf', 'metadfmp', 'emergence',
  'dknowledger', 'dk-personal', 'distributed-support', 'open-science', 'value-unit'
];

const BOUND = [
  'domain', 'switchLabel', 'heroTitle', 'heroBody', 'ecoTitle', 'ecoLead', 'orgTitle',
  'orgLead', 'orgDaoTitle', 'orgDaoBody', 'dfmTitleTop', 'dfmLead', 'docsTitle', 'docsLead',
  'docsFoot', 'dkHeroBody', 'fnEmptyKicker', 'fnEmptyBody', 'crossSiteUrl', 'switchLabel', 'switchAriaLabel'
];

const problems = [];
let checked = 0;

for (const site of ['org', 'com']) {
  const Component = load(site);
  for (const page of PAGES) {
    const c = new Component();
    c.props = { site };
    c.state = Object.assign({}, c.state, { site, page });
    let v;
    try {
      v = c.renderVals();
    } catch (e) {
      problems.push(site + '/' + page + ': threw ' + e.message);
      continue;
    }
    checked++;
    for (const key of BOUND) {
      const val = v[key];
      if (val === undefined || val === null || val === '') problems.push(site + '/' + page + ': empty ' + key);
      else if (typeof val === 'string' && /undefined|\[object Object\]/.test(val)) problems.push(site + '/' + page + ': placeholder in ' + key);
    }
    if (v.isProject) {
      for (const key of ['kicker', 'title', 'lead', 'thesis', 'role', 'body']) {
        if (!v.project[key]) problems.push(site + '/' + page + ': project.' + key + ' empty');
      }
      if (!v.project.focus || !v.project.focus.length) problems.push(site + '/' + page + ': project.focus empty');
      if (!v.projectRelations.length) problems.push(site + '/' + page + ': no relations');
      for (const r of v.projectRelations) {
        if (!r.label) problems.push(site + '/' + page + ': relation without a label');
      }
    }
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error('\n' + problems.length + ' problem(s) across ' + checked + ' screens.');
  process.exit(1);
}
console.log(checked + ' screens rendered clean (' + PAGES.length + ' pages x 2 presentations).');
