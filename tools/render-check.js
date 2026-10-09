// Static contract and headless state checks for the Drayker Design Component.
//
//   node tools/render-check.js [index.html]
//
// No browser or package install is required. The component script is evaluated
// twice, exactly as it is deployed for .org and generated for .com.

const fs = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, '..', 'index.html');
const src = fs.readFileSync(file, 'utf8');
const snapshotFile = path.join(__dirname, '..', 'data', 'org.json');
const snapshotWorkflowFile = path.join(__dirname, '..', '.github', 'workflows', 'org-snapshot.yml');
const block = src.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/);
if (!block) throw new Error('No <script type="text/x-dc"> block found in ' + file);

const SITE_CONST = /const SITE = '(org|com)';/;
const CROSS_CONST = /const CROSS_SITE_URL = '[^']*';/;
if (!SITE_CONST.test(block[1]) || !CROSS_CONST.test(block[1])) {
  throw new Error('Deployment constants not found in the component script.');
}
const deployedSite = (block[1].match(SITE_CONST) || [])[1];
const propDefault = (src.match(/&quot;site&quot;:[\s\S]*?&quot;default&quot;:&quot;(org|com)&quot;/) || [])[1];

const memory = new Map();
global.React = {
  createRef: () => ({ current: null }),
  createElement: (type, props, ...children) => ({ type, props, children })
};
global.DCLogic = class DCLogic {
  setState(update) {
    const patch = typeof update === 'function' ? update(this.state) : update;
    this.state = Object.assign({}, this.state, patch || {});
  }
};
global.performance = { now: () => 0 };
const headAttrs = {};
global.document = {
  title: '',
  documentElement: { setAttribute() {} },
  head: {
    querySelector(selector) {
      if (!headAttrs[selector]) headAttrs[selector] = {};
      return {
        getAttribute: (attribute) => headAttrs[selector][attribute] || null,
        setAttribute: (attribute, value) => { headAttrs[selector][attribute] = value; }
      };
    }
  }
};
global.localStorage = {
  getItem: (key) => memory.has(key) ? memory.get(key) : null,
  setItem: (key, value) => memory.set(key, String(value)),
  clear: () => memory.clear()
};
global.requestAnimationFrame = () => 1;
global.cancelAnimationFrame = () => {};

let assigned = [];
const resetWindow = (hash = '', hostname = 'localhost') => {
  assigned = [];
  global.window = {
    location: {
      hash,
      hostname,
      pathname: '/',
      search: '',
      assign: (url) => assigned.push(url)
    },
    history: {},
    addEventListener() {},
    removeEventListener() {},
    scrollTo() {},
    matchMedia: () => ({ matches: false, addEventListener() {} })
  };
};
resetWindow();

const load = (site) => {
  const cross = site === 'org' ? 'https://drayker.com' : 'https://drayker.org';
  const code = block[1]
    .replace(SITE_CONST, "const SITE = '" + site + "';")
    .replace(CROSS_CONST, "const CROSS_SITE_URL = '" + cross + "';");
  return eval(code + '\n;({ Component, PROJECTS, CONCEPTS, JOIN_STEPS, TRACKS, LAYER_GROUPS, CASE_LAYERS, ROUTE_META, ECON_CHAIN, ECON_LIMITS, ECON_TODAY, ECON_QUESTIONS, GUIDE, LABELS, ORG_UNITS, PARTNER_WAYS, PARTNER_LIMITS })');
};

const problems = [];
let checks = 0;
const check = (condition, message) => {
  checks++;
  if (!condition) problems.push(message);
};
const noPlaceholders = (value, label, seen = new WeakSet()) => {
  if (typeof value === 'string') {
    check(!/^\s*undefined\s*$|\[object Object\]/.test(value), label + ' contains a placeholder');
    return;
  }
  if (!value || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  Object.keys(value).forEach((key) => noPlaceholders(value[key], label + '.' + key, seen));
};
const make = (bundle, state = {}) => {
  const component = new bundle.Component();
  component.props = {};
  component.state = Object.assign({}, component.state, state);
  return component;
};

const org = load('org');
const com = load('com');

// Package design: the animated 3D mark and the two site presentations remain
// in the static Design Component, not in a framework reconstruction.
check(src.includes('class="dk-core"'), 'animated mark core is missing');
check(src.includes('ringBackRef') && src.includes('ringOverRef') && src.includes('ringOutRef'), '3D ring layers are missing');
check(src.includes('@keyframes dk-surf') && src.includes('@keyframes dk-breathe'), 'mark animations are missing');
check(src.includes('Dk Global') && src.includes('Dk Personal') && src.includes('Dk Local'), 'Dk scopes are not explained separately');
check(src.includes("font-family:'Archivo'") && !src.includes('Space Grotesk'), 'v3 must use Archivo rather than Space Grotesk');
check(src.includes('drayker-icon.svg?v=20260813') && src.includes('dark/drayker-icon.svg?v=20260813'), 'adaptive SVG favicons are missing');
check(src.includes('icon-512.png?v=20260813') && src.includes('icon-512-dark.png?v=20260813'), 'high-resolution PNG favicons are missing');
check(src.includes('prefers-color-scheme: light') && src.includes('prefers-color-scheme: dark'), 'favicon theme variants are incomplete');
check(src.includes('apple-touch-icon.png?v=20260811') && src.includes('sizes="180x180"'), 'Apple touch icon is not versioned or sized');
check(!/FN-\d{3,}/.test(src), 'fictional open-function rows must not be published');

// The mark engine is served from this domain and the documentation sites load it
// from here, but the canonical, source-preserving copy lives in the design library at
// draykerdk/drayker-propagation, which pins this same hash in its own tools/check.js.
// Two domains serving one engine only stays true if something says so out loud.
const ENGINE_SHA256 = 'aa208322b5910b7355d0336091547caa41525d949f76e244f865f1b3df78b8f8';
const engineHash = require('crypto').createHash('sha256')
  .update(fs.readFileSync(path.join(__dirname, '..', 'drayker-mark.js'))).digest('hex');
check(engineHash === ENGINE_SHA256, 'drayker-mark.js has drifted from the canonical engine in the design library');
check(!src.includes('community review branch'), 'the retired community-review flow is still described');
check(src.includes("template=volunteer-introduction.yml") && src.includes("template=partnership.yml"), 'the two general-forum forms are not wired');
check(src.includes('href="{{ switchUrl }}"') && src.includes('href="{{ joinUrl }}"'), 'cross-site controls must expose semantic hrefs');
check(src.includes('href="{{ d.href }}"') && src.includes('href="{{ ptOpenOrgUrl }}"'), 'component hand-offs must expose semantic hrefs');

check(org.PROJECTS.length === 25, 'expected 25 curated repositories, got ' + org.PROJECTS.length);
check(org.CONCEPTS.length === 0, 'every part now has a repository; CONCEPTS must be empty, got ' + org.CONCEPTS.length);
check(org.PROJECTS.every((p) => p.repo && p.site), 'every repository record needs a repo and a documentation site');
check(new Set(org.PROJECTS.map((p) => p.key)).size === org.PROJECTS.length, 'repository keys must be unique');
check(org.CONCEPTS.every((p) => p.concept && !p.repo), 'every concept must explicitly have no repository');
check(org.PROJECTS.every((p) => p.vision && p.tagline && p.layer && p.arch.length && p.contribute.length), 'every repository needs a complete page model');
check(org.CASE_LAYERS.length === 4, 'the home argument must have exactly four layers');
check(org.CASE_LAYERS.map((layer) => layer.id).join(',') === 'method,system,org,transition', 'the four layers are out of order');
check(!org.ROUTE_META.knowledge, 'the retired internal Knowledge route must not publish metadata');
check(new Set(Object.values(org.ROUTE_META).map((meta) => meta.t)).size === Object.keys(org.ROUTE_META).length, 'route titles must be unique');
// The economy page markup, sliced out so its guardrails are checked against the page
// itself rather than against the whole document.
const econSrc = src.slice(
  src.indexOf('<sc-if value="{{ isEconomy }}"'),
  src.indexOf('<sc-if value="{{ isDocs }}"')
);
check(econSrc.length > 2000, 'the economy page markup is missing');

// Dknowledge lives on its own site: the retired page, its data tables and its state
// were removed rather than left in the component unreachable.
check(!src.includes('isKnowledge') && !src.includes('const KN_NODES'), 'the retired Knowledge page must not survive as dead markup or data');
// Economy & reputation: the page that has to stay non-promissory, checked as such.
check(org.ECON_CHAIN.length === 4 && org.ECON_LIMITS.length === 5 && org.ECON_QUESTIONS.length === 4, 'the economy page model is incomplete');
check(org.ECON_TODAY.some((row) => row.s === 'RUNNING') && org.ECON_TODAY.some((row) => row.s === 'DESIGNED'), 'the economy page must separate what runs from what is designed');
const econText = econSrc + JSON.stringify(org.ECON_CHAIN) + JSON.stringify(org.ECON_LIMITS)
  + JSON.stringify(org.ECON_TODAY) + JSON.stringify(org.ECON_QUESTIONS);
check(org.ECON_LIMITS.some((l) => /NOT INCOME/.test(l.k)) && org.ECON_LIMITS.some((l) => /NOT AN INVESTMENT/.test(l.k)), 'the economy page must state its limits explicitly');
check(src.includes("SITE === 'org' ? '/data/org.json' : 'https://drayker.org/data/org.json'"), 'snapshot URL must work from clean routes on both domains');
check(propDefault === deployedSite, 'Design Component site default (' + propDefault + ') overrides deployed SITE (' + deployedSite + ')');
make(org).setMeta('docs');
check(headAttrs['link[rel="canonical"]'].href === 'https://drayker.org/docs/', '.org runtime canonical must stay on the clean route');
check(headAttrs['meta[property="og:url"]'].content === 'https://drayker.org/docs/', '.org runtime og:url must stay on the clean route');
make(com).setMeta('project/dk');
check(headAttrs['link[rel="canonical"]'].href === 'https://drayker.com/project/dk/', '.com runtime canonical must stay on the clean route');
check(headAttrs['meta[property="og:url"]'].content === 'https://drayker.com/project/dk/', '.com runtime og:url must stay on the clean route');
if (fs.existsSync(snapshotFile)) {
  const snapshot = JSON.parse(fs.readFileSync(snapshotFile, 'utf8'));
  const expectedRepos = new Set(org.PROJECTS.map((project) => project.repo));
  check(snapshot.repos.length === expectedRepos.size, 'the organization snapshot must contain all ' + expectedRepos.size + ' public component repositories');
  check(snapshot.repos.every((repo) => expectedRepos.has(repo.name)), 'the organization snapshot contains an unknown or governance repository');
  check(Array.isArray(snapshot.issues) && Array.isArray(snapshot.people), 'the organization snapshot shape is incomplete');
  check(Array.isArray(snapshot.people) && snapshot.people.every((person) => Array.isArray(person.repos)),
    'every person in the organization snapshot must carry a repos array, which the board renders directly');
  check(Array.isArray(snapshot.issues) && !snapshot.issues.some((issue) => /\/pull\/\d+$/.test(issue.url || '')), 'the organization snapshot must never classify pull requests as issues');
}
if (fs.existsSync(snapshotWorkflowFile)) {
  const workflow = fs.readFileSync(snapshotWorkflowFile, 'utf8');
  check(workflow.includes('refusing empty issue snapshot'), 'the snapshot workflow must reject an unexpectedly empty board');
  check(workflow.includes('refusing empty contributor snapshot'), 'the snapshot workflow must reject unexpectedly empty contributors');
  check(workflow.includes('refusing incomplete snapshot'), 'the snapshot workflow must reject an incomplete repository list');
}

for (const site of ['org', 'com']) {
  const bundle = site === 'org' ? org : com;
  for (const page of ['home', 'manifesto', 'dfm', 'dk', 'eco', 'org', 'economy', 'direction', 'docs']) {
    const component = make(bundle, { page });
    let values;
    try { values = component.renderVals(); }
    catch (error) { problems.push(site + '/' + page + ' threw: ' + error.message); continue; }
    check(values.domain === 'drayker.' + site, site + '/' + page + ' has the wrong domain');
    check(values.heroTitle && values.heroBody, site + '/' + page + ' has incomplete hero content');
    noPlaceholders(values, site + '/' + page);
  }
}

const orgHome = make(org).renderVals();
const comHome = make(com).renderVals();
check(orgHome.isOrgSite && !orgHome.isComSite, '.org presentation flags are wrong');
check(comHome.isComSite && !comHome.isOrgSite, '.com presentation flags are wrong');
check(orgHome.nav.some((n) => n.label === 'Contribute'), '.org navigation must expose contribution');
check(!comHome.nav.some((n) => n.label === 'Contribute'), '.com navigation must not expose contribution');
check(!orgHome.nav.some((n) => n.label === 'Knowledge') && !comHome.nav.some((n) => n.label === 'Knowledge'), 'Dknowledge must not have a duplicate navigation route');
check(src.includes('href="https://dknowledge.drayker.org/"') && src.includes('Dknowledge ↗'), 'footer must link directly to the official Dknowledge site');

const dknowledgeTile = orgHome.sysLayers.flatMap((layer) => layer.parts).filter((part) => part.key === 'dknowledge')[0];
check(dknowledgeTile && dknowledgeTile.official, 'the didactic system map must mark Dknowledge as an official external surface');
resetWindow('', 'drayker.org');
dknowledgeTile.open();
check(assigned[0] === 'https://dknowledge.drayker.org/', 'the didactic Dknowledge tile must open the official site');

for (const [site, bundle] of [['org', org], ['com', com]]) {
  const mobile = make(bundle, { vw: 390 }).renderVals();
  check(mobile.navFlex === '0 0 100%' && mobile.navWidth === '100%', site + ' mobile navigation does not occupy its own row');
  check(mobile.navOrder === 3 && mobile.ctrlOrder === 2 && mobile.subTop === '95px', site + ' mobile header order is wrong');
}

for (const project of org.PROJECTS.concat(org.CONCEPTS).filter((project) => project.key !== 'dknowledge')) {
  const values = make(org, { page: 'contrib', tab: 'project', proj: project.key }).renderVals();
  check(values.cProject && values.pd && values.pd.key === project.key, 'missing project page: ' + project.key);
  check(values.pd.vision && values.pd.tagline && values.pd.layer, 'incomplete project page: ' + project.key);
  check(values.pdHasArch && values.pdHasContribute, 'project is not connected to architecture/contribution: ' + project.key);
  const page = make(org, { page: 'contrib', tab: 'project', proj: project.key });
  for (let index = 0; index < values.pdArch.length; index++) {
    const item = values.pdArch[index];
    check(typeof item.d === 'string' && item.d.trim().length > 40, 'architecture disclosure needs an explanation: ' + project.key + '/' + item.t);
    page.renderVals().pdArch[index].toggle();
    check(page.renderVals().pdArch[index].open, 'architecture disclosure must open: ' + project.key + '/' + index);
    page.renderVals().pdArch[index].toggle();
    check(!page.renderVals().pdArch[index].open, 'architecture disclosure must close: ' + project.key + '/' + index);
  }
  check(values.mapInputs.length + values.mapOutputs.length === values.mapNodes.length, 'responsive map must preserve every relationship: ' + project.key);
  check(values.mapInputs.every((n) => n.dir === 'IT NEEDS') && values.mapOutputs.every((n) => n.dir === 'NEEDS IT'), 'map must preserve relationship direction: ' + project.key);
  page.setState({ archOpen: 0 });
  page.routeTo('org', 'project/' + project.key + '/arch');
  check(page.state.archOpen === null && page.state.focus === 'arch', 'deep navigation must reset disclosures and retain the target section');

  check(values.pdIsConcept === !!project.concept, 'repository status is wrong for ' + project.key);
  noPlaceholders(values, 'org/project/' + project.key);
}
for (const key of ['valueunit', 'dknetwork', 'personal']) {
  const page = make(org, { page: 'contrib', tab: 'project', proj: key });
  check(page.renderVals().lessonHas, 'worked example must be available for ' + key);
  const results = new Set();
  page.renderVals().lessonSteps.forEach((step, index) => {
    step.select();
    const current = page.renderVals();
    check(current.lessonSteps.filter((x) => x.selected).length === 1 && current.lessonSteps[index].selected, 'example must select exactly the requested step');
    check(current.lessonAction && current.lessonResult && current.lessonBoundary, 'each example step must explain action, result and boundary');
    results.add(current.lessonResult);
  });
  check(results.size === page.renderVals().lessonSteps.length, 'each example step must teach a distinct consequence');
}
const missing = make(org, { page: 'contrib', tab: 'project', proj: 'does-not-exist' }).renderVals();
check(missing.cProjectMissing && missing.missingKey === 'does-not-exist', 'unknown project route needs an explicit fallback');

// The same twenty-five parts have institutional case pages on .com. The technical
// record stays on .org and is reached through explicit deep links.
for (const project of com.PROJECTS.concat(com.CONCEPTS).filter((project) => project.key !== 'dknowledge')) {
  const values = make(com, { page: 'part', proj: project.key }).renderVals();
  check(values.isPart && values.ptHas && values.ptName === project.name, 'missing .com component case: ' + project.key);
  check(values.ptClaim && values.ptToday && values.ptShift && values.ptFeel && values.ptStake, 'incomplete .com component case: ' + project.key);
  check(values.ptDeep.length === (project.concept ? 3 : 4), 'wrong technical deep-link count for ' + project.key);
  noPlaceholders(values, 'com/project/' + project.key);
}
const missingCom = make(com, { page: 'part', proj: 'does-not-exist' }).renderVals();
check(missingCom.ptMissing && !missingCom.ptHas, 'unknown .com component route needs an explicit fallback');

// Direct-route and cross-domain contracts.
resetWindow('#org/project/dk', 'drayker.org');
const orgRoute = make(org);
orgRoute.readHash();
check(orgRoute.state.page === 'contrib' && orgRoute.state.tab === 'project' && orgRoute.state.proj === 'dk', 'direct .org project route failed');
check(assigned.length === 0, 'local .org route must not leave the domain');

resetWindow('#com/project/dk', 'drayker.com');
const comRoute = make(com);
comRoute.readHash();
check(comRoute.state.page === 'part' && comRoute.state.proj === 'dk', 'direct .com component route failed');
check(assigned.length === 0, 'local .com component route must not leave the domain');

for (const [hash, host] of [['#org/knowledge', 'drayker.org'], ['#org/project/dknowledge', 'drayker.org'], ['#com/knowledge', 'drayker.com'], ['#com/project/dknowledge', 'drayker.com']]) {
  resetWindow(hash, host);
  const bundle = host === 'drayker.org' ? org : com;
  make(bundle).readHash();
  check(assigned[0] === 'https://dknowledge.drayker.org/', hash + ' must redirect to the official Dknowledge site');
}

resetWindow('', 'drayker.com');
const comDk = make(com, { page: 'part', proj: 'dk' }).renderVals();
comDk.ptDeep[0].open();
check(comDk.ptDeep[0].href === 'https://drayker.org/project/dk/#org/project/dk/arch', '.com technical deep href must target the clean .org project route');
check(assigned[0] === 'https://drayker.org/project/dk/#org/project/dk/arch', '.com technical deep link must target the exact .org section');

resetWindow('#com/home', 'drayker.org');
make(org).readHash();
check(assigned[0] === 'https://drayker.com/', 'foreign .com hash on .org must hand off to the clean .com route');

resetWindow('', 'drayker.com');
comHome.goJoin();
check(assigned[0] === 'https://drayker.org/join/', '.com volunteer CTA must hand off to the clean .org route');
resetWindow('', 'drayker.org');
orgHome.toggleSite();
check(assigned[0] === 'https://drayker.com/', 'site switch must use the other public domain');

resetWindow('#org/partnerships', 'drayker.org');
make(org).readHash();
check(assigned[0] === 'https://drayker.com/partnerships/', '.org partnerships route must hand off to the clean .com route');

resetWindow('', 'localhost');
const previewSwitch = make(org, { page: 'home' });
const previewValues = previewSwitch.renderVals();
check(previewValues.switchUrl === '#com/home', 'local preview switch must stay hash-only');
previewSwitch.crossTo('com', 'project/daf');
check(assigned.length === 0 && previewSwitch.state.site === 'com',
  'local preview must switch presentations without leaving the preview host');

const partnership = make(com, { page: 'partnerships', pType: 'institutional', pNote: 'A public research collaboration.' }).renderVals();
const partnershipUrl = decodeURIComponent(partnership.partnerUrl);
check(partnership.isPartnerships && partnership.partnerOutcomes.length > 0, '.com partnerships page is incomplete');
check(partnershipUrl.includes('general-forum/issues/new?template=partnership.yml'), 'partnership form points at the wrong issue template');
check(partnershipUrl.includes('&proposal=') && partnershipUrl.includes('&boundaries='), 'partnership form is missing its field values');

// Volunteer journey: single-choice steps require an answer; multiple-choice
// steps deliberately allow "none" and must never trap the visitor.
resetWindow();
const journey = make(org, { page: 'join' });
for (let index = 0; index < org.JOIN_STEPS.length; index++) {
  const step = org.JOIN_STEPS[index];
  let values = journey.renderVals();
  const before = journey.state.jStep;
  if (step.multi) {
    check(values.jNextOp === '1', 'multi-select step must allow an empty answer: ' + step.id);
  } else {
    values.jNext();
    check(journey.state.jStep === before, 'single-select step advanced without an answer: ' + step.id);
    values = journey.renderVals();
    values.jOpts[0].onClick();
  }
  journey.renderVals().jNext();
  check(journey.state.jStep === index + 1, 'journey could not advance past ' + step.id);
}
const result = journey.renderVals();
check(result.jIsResult, 'journey did not reach its result');
check(result.resProjects.length === 3, 'journey result must recommend three projects');
check(result.resSteps.length > 0 && result.resTrackTitle, 'journey result needs a track and first steps');
check(result.mapRows.length === 6, 'journey map must expose all system layers');
check(result.mapRows.some((row) => row.label === 'WHAT IT IS FOR'), 'the map must show the domains the system exists to serve');
check(result.mapRows.filter((row) => row.you === 'YOU ARE HERE').length === 1, 'journey map must have exactly one YOU ARE HERE marker');
check(result.mapRows.flatMap((row) => row.nodes).filter((node) => node.tag === 'YOUR TRACK').length > 0, 'journey map has no YOUR TRACK marker');
check(result.mapRows.flatMap((row) => row.nodes).length === org.PROJECTS.length, 'the journey map must contain every repository');
const volunteerUrl = decodeURIComponent(result.volUrl);
check(volunteerUrl.includes('general-forum/issues/new?template=volunteer-introduction.yml'), 'Volunteer result points at the wrong issue template');
check(volunteerUrl.includes('&interests=') && volunteerUrl.includes('&contribution=') && volunteerUrl.includes('&starting_point='), 'Volunteer result is missing its form fields');
noPlaceholders(result, 'org/join/result');

const resultNode = result.mapRows.flatMap((row) => row.nodes).filter((node) => node.tag === 'YOUR TRACK')[0];
resultNode.open();
check(journey.state.page === 'contrib' && journey.state.tab === 'project' && journey.state.returnToJoin, 'map node did not open its project with result provenance');
const projectFromResult = journey.renderVals();
check(projectFromResult.backProjectLabel === '← YOUR RESULT', 'project opened from the map has the wrong back destination');
projectFromResult.backToProjects();
check(journey.state.page === 'join' && journey.state.jStep === org.JOIN_STEPS.length, 'project back action did not restore the Volunteer result');

const combinations = [
  { why: 'build', skills: ['code'], parts: ['kernel'], style: 'deep', time: '4–8' },
  { why: 'understand', skills: ['research'], parts: ['protocol'], style: 'review', time: '15+' },
  { why: 'legible', skills: ['design'], parts: ['portal'], style: 'teach', time: '9–15' }
];
const resultTracks = combinations.map((jAns) => {
  const candidate = make(org, { page: 'join', jStep: org.JOIN_STEPS.length, jAns });
  const resolved = candidate.renderVals();
  check(resolved.resProjects.length === 3, 'every Volunteer combination must recommend three projects');
  check(resolved.mapRows.filter((row) => row.you === 'YOU ARE HERE').length === 1, 'every Volunteer combination needs exactly one entry layer');
  return resolved.resTrackLabel;
});
check(new Set(resultTracks).size === 3, 'three distinct Volunteer profiles should resolve to three distinct tracks');

// Public documentation is English and is not translated by hand (.github CONTRIBUTING.md):
// the track keeps its id and matching keys, but reads as planned localization, and no
// step or project item asks anyone to translate.
const localization = org.TRACKS.filter((t) => t.id === 'translation')[0];
check(localization && localization.label === 'LOCALIZATION (PLANNED)', 'the translation track must read as planned localization');
check(!/\btranslate\b|claim a language|native review/i.test(JSON.stringify(org.TRACKS.map((t) => t.steps))), 'no track step may ask for a hand translation');
check(org.PROJECTS.every((p) => !p.contribute.some((c) => /^Translate\b/.test(c))), 'no project may list a hand translation as a way to contribute');
check(!/Writing and translating|translation carry the same weight|Reviewing, translating/.test(src), 'translation must not be presented as current work');
// The general-forum volunteer form requires a name or public handle, and nothing
// matches people to functions: the result page says what is actually there.
check(!src.includes('no handle') && src.includes('asks only for a name or public handle'), 'the volunteer result misstates what the issue form asks for');
check(!src.includes('fastest way to get a first function cut') && !src.includes('We will point you at functions'), 'the volunteer flow promises a matching that is not set up');
// Labels as they are actually used, suggested in the thread and applied by a maintainer.
const labelFamilies = org.LABELS.filter((l) => l.l === 'skill: level: effort:')[0];
check(labelFamilies && labelFamilies.d.includes('skill:code · research · design · docs · governance')
  && labelFamilies.d.includes('effort:~Nh') && !labelFamilies.d.includes('effort:small'), 'the label map must list the label families actually in use');
check(!src.includes('labelling it correctly is already a contribution') && src.includes('a maintainer applies them'), 'labels are suggested in the thread and applied by a maintainer');
// The form lives only in the .org repository; the generated .com copy of this check skips it.
const functionFormFile = path.join(__dirname, '..', '.github', 'ISSUE_TEMPLATE', 'open-function.yml');
if (fs.existsSync(functionFormFile)) {
  const functionForm = fs.readFileSync(functionFormFile, 'utf8');
  check(!functionForm.includes('skill:translation') && functionForm.includes('A maintainer applies them'), 'the open-function form must ask authors to suggest labels, not to add them');
  // Function triage: the form proposes, a maintainer reviews and applies open-function.
  check(/^labels: \["proposed-function"\]$/m.test(functionForm), 'the open-function form must apply proposed-function, not open-function');
  check(functionForm.includes('A maintainer reviews the proposal') && functionForm.includes('only reviewed functions appear on the board'),
    'the open-function form must say that a maintainer reviews the proposal before it reaches the board');
}
// Function triage: proposals carry proposed-function and reach the board only after review.
const proposedLabel = org.LABELS.filter((l) => l.l === 'proposed-function')[0];
check(proposedLabel && proposedLabel.d.indexOf('Proposed function waiting for review; a maintainer applies open-function once it is reviewed.') === 0,
  'the label map must explain proposed-function');
check(org.GUIDE.filter((g) => g.n === '01')[0].body.includes('which a maintainer applies after reviewing the proposal'), 'guide step 01 must say that open-function is applied after review');
check(src.includes('What is here is exactly what is open on GitHub — no more, and never a placeholder. A proposed function appears here once a maintainer has reviewed it.'),
  'the board must say that functions appear after review');
// Stalled claims: one rule everywhere, and no claim lapses by itself.
const CLAIM_RULE = 'If a claim has been silent for two weeks, ask in the thread; if there is no answer within three days, anyone may take the function over by saying so in the thread.';
check(org.GUIDE.filter((g) => g.n === '02')[0].body.includes(CLAIM_RULE), 'guide step 02 must state the stalled-claim rule');
check(org.LABELS.filter((l) => l.l === 'claimed')[0].d.includes(CLAIM_RULE), 'the claimed label must state the stalled-claim rule');
check(org.JOIN_STEPS.filter((j) => j.id === 'time')[0].lb.includes(CLAIM_RULE), 'the time step of the volunteer journey must state the stalled-claim rule');
check(!/returns to the\s+board|open again|before taking over|go silent for two weeks/.test(src), 'no claim may be said to expire or go back to the board by itself');
// No legal status is claimed: Drayker is described as having no owner, no shareholders
// and no profit distribution.
check(!/non-?profit/i.test(src), 'a legal-status label must not describe Drayker');
check(src.includes('CC BY 4.0 · PUBLIC DOCUMENTATION · NO OWNER · NO SHAREHOLDERS · NO PROFIT DISTRIBUTION'), 'the footer must list no owner, no shareholders and no profit distribution');
const profitLimit = org.PARTNER_LIMITS.filter((l) => l.k === 'NO PROFIT DISTRIBUTION')[0];
check(profitLimit && profitLimit.d.includes('no owner, no shareholders and no profit distribution'), 'the partnership limits must describe no profit distribution, not a status');
// Design tense: no reward exists today, the DAF is designed to govern resources, and
// public documentation is English.
check((src.match(/financing the network earns the reward/g) || []).length > 0
  && src.split('financing the network earns the reward').slice(0, -1).every((before) => /designed economy[^.]{0,80}$/.test(before)),
  'financing the network earns the reward only in the designed economy');
check(org.ORG_UNITS.some((u) => u.desc && u.desc.includes('is designed to govern shared resources during the transition')), 'the DAF card must use the designed tense for resource governance');
const communityWay = org.PARTNER_WAYS.filter((w) => w.label === 'COMMUNITY')[0];
check(communityWay && !/Editorial, translation/.test(communityWay.desc) && communityWay.desc.includes('native translation and localization are planned'),
  'the community partnership must follow the English-only rule');
check(!/of the organization/.test(org.ROUTE_META.fn.d), 'the /fn/ description must not call Drayker an organization');
// The process that runs today: branch from master, proposal threads in the General
// Forum, and the founding steward's documented exception.
check(org.GUIDE.filter((g) => g.n === '03')[0].body.includes('branch from master'), 'guide step 03 must branch from master');
check(src.includes('GOVERNANCE.md §2.1'), 'the guide must name the founding steward exception');
check(!/open motion|DFMP-000 and one legitimated|full DFMP path/.test(JSON.stringify(org.TRACKS)), 'track steps must point at proposal threads, not at motions or an unwritten DFMP-000');
const unitsCard = org.ORG_UNITS.filter((u) => u.name === 'Autonomous units')[0];
check(unitsCard && unitsCard.href === 'https://daf.drayker.org/#/record' && unitsCard.link === 'Unit records →', 'no unit exists yet: the units card links to the unit record');

// Cached and offline GitHub states both retain curated content.
(async () => {
  resetWindow();
  memory.clear();
  memory.set('drayker-gh-v2', JSON.stringify({
    t: Date.now(),
    repos: [{ name: 'dk', full: 'draykerdk/dk', desc: 'Dk', lang: 'Python', stars: 1, forks: 0, issues: 2, url: 'https://github.com/draykerdk/dk', home: '', push: new Date().toISOString() }],
    issues: [], people: []
  }));
  global.fetch = () => Promise.reject(new Error('cache should prevent fetch'));
  const cached = make(org);
  await cached.loadGH(false);
  check(cached.state.ghState === 'ready' && cached.state.ghRepos.length === 1, 'fresh GitHub cache was not used');

  memory.clear();
  const snapshot = { generated_at: new Date().toISOString(), repos: [{ name: 'dk' }], issues: [], people: [] };
  const orgCalls = [];
  global.fetch = (url) => {
    orgCalls.push(url);
    if (url === '/data/org.json') return Promise.resolve({ ok: true, json: () => Promise.resolve(snapshot) });
    return Promise.reject(new Error('live API offline'));
  };
  const snapOrg = make(org);
  await snapOrg.loadGH(false);
  check(orgCalls[0] === '/data/org.json' && snapOrg.state.ghState === 'ready', '.org did not retain its root snapshot');
  check(snapOrg.renderVals().ghLabel.indexOf('SNAPSHOT FROM GITHUB · UPDATED ') === 0, 'a board read from the snapshot must say so, not claim live data');

  // A v1 cache entry has no opening dates, so it is not read.
  memory.clear();
  memory.set('drayker-gh-v1', JSON.stringify({ t: Date.now(), repos: [{ name: 'dk' }], issues: [], people: [] }));
  global.fetch = () => Promise.reject(new Error('offline'));
  const oldCache = make(org);
  await oldCache.loadGH(false);
  check(oldCache.state.ghState === 'error', 'a v1 GitHub cache entry must be ignored');

  // Live board: searches by label only, merged by URL; an issue is claimed by the
  // claimed label or an assignee; replies are counted; dates are opening dates.
  memory.clear();
  const day = 864e5;
  const ghIssue = (n, labels, extra) => Object.assign({
    number: n, title: 'Function ' + n, html_url: 'https://github.com/draykerdk/dk/issues/' + n,
    repository_url: 'https://api.github.com/repos/draykerdk/dk',
    labels: labels.map((name) => ({ name })), user: { login: 'someone', avatar_url: '' }, comments: 0,
    created_at: new Date(Date.now() - 5 * day).toISOString(), updated_at: new Date(Date.now() - 2 * 3600e3).toISOString(),
    assignees: []
  }, extra || {});
  const liveCalls = [];
  const reply = (body) => Promise.resolve({ ok: true, json: () => Promise.resolve(body) });
  global.fetch = (url) => {
    liveCalls.push(url);
    if (url === '/data/org.json') return Promise.resolve({ ok: false, json: () => Promise.resolve(null) });
    if (url.includes('/orgs/draykerdk/repos')) return reply([{ name: 'dk', full_name: 'draykerdk/dk', html_url: 'https://github.com/draykerdk/dk', pushed_at: new Date().toISOString() }]);
    if (url.includes('/search/issues')) {
      const q = decodeURIComponent(url.split('q=')[1].split('&')[0]);
      if (q.includes('label:open-function')) {
        return reply({ items: [ghIssue(1, ['open-function', 'skill:code']), ghIssue(2, ['open-function', 'claimed'], { comments: 3 }),
          ghIssue(3, ['open-function'], { assignees: [{ login: 'x' }] }),
          ghIssue(5, ['open-function', 'skill:research'], { html_url: 'https://github.com/draykerdk/open-science/issues/5',
            repository_url: 'https://api.github.com/repos/draykerdk/open-science' })] });
      }
      if (q.includes('good first issue')) return reply({ items: [ghIssue(1, ['open-function', 'good first issue']), ghIssue(4, ['help wanted'])] });
    }
    return reply([]);
  };
  const liveBoard = make(org, { page: 'contrib', tab: 'fn' });
  await liveBoard.loadGH(true);
  const searches = liveCalls.filter((u) => u.includes('/search/issues')).map((u) => decodeURIComponent(u));
  check(searches.length === 2, 'the board must make exactly two issue searches, got ' + searches.length);
  check(searches.every((u) => u.includes('org:draykerdk is:issue is:open label:') && u.includes('per_page=100')), 'every board search must be filtered by label');
  check(searches.some((u) => u.includes('label:open-function')) && searches.some((u) => u.includes('label:"good first issue","help wanted"')),
    'the board must search open functions and the two entry labels it badges');
  check(!searches.some((u) => u.includes('proposed-function')), 'proposed functions must never be read onto the board');
  check(liveBoard.state.ghIssues.length === 5, 'board searches must be merged and deduplicated by URL');
  let board = liveBoard.renderVals();
  check(board.ghLabel.indexOf('LIVE FROM GITHUB.COM/DRAYKERDK · UPDATED ') === 0, 'live data must be labelled as live');
  const card = (id) => board.liveFn.filter((r) => r.id === id)[0] || { meta: '' };
  check(/opened by someone · 5d ago$/.test(card('#1').meta), 'a card must say when its issue was opened, from created_at');
  check(card('#2').hasReplies && card('#2').replies === '3 replies — read the thread before taking it' && !card('#1').hasReplies,
    'a card must show its reply count when the thread has replies');
  check(/· claimed$/.test(card('#2').meta) && /· claimed$/.test(card('#3').meta) && !/claimed/.test(card('#1').meta),
    'the claimed label and an assignee must both mark a card as claimed');
  liveBoard.setState({ lvlF: 'free' });
  board = liveBoard.renderVals();
  check(board.liveFn.map((r) => r.id).sort().join() === '#1,#4,#5', 'UNCLAIMED must exclude issues with the claimed label or an assignee');
  // An explicit skill:* label decides the track before any keyword match on the repository
  // name: the "ci" in "open-science" must not put a research function in the Code track.
  liveBoard.setState({ lvlF: 'all', trackF: 'research' });
  check(liveBoard.renderVals().liveFn.map((r) => r.id).join() === '#5', 'an open-science issue labelled skill:research must be in the research track');
  liveBoard.setState({ trackF: 'code' });
  check(liveBoard.renderVals().liveFn.every((r) => r.id !== '#5'), 'an open-science issue labelled skill:research must not be in the code track');
  check(liveBoard.trackOf(['open-function', 'skill:docs'], 'dk') === 'outreach' && liveBoard.trackOf(['skill:governance'], 'open-science') === 'governance'
    && liveBoard.trackOf(['skill:design'], 'dk') === 'design' && liveBoard.trackOf(['skill:code'], 'dknowledge') === 'code',
    'every skill:* label must map to its track');
  check(liveBoard.trackOf(['open-function', 'documentation'], 'dk') === 'outreach', 'without a skill:* label the keyword match still places the issue');

  // When the open-function search fails, the snapshot stays on screen, labelled as one,
  // instead of an empty board; a snapshot without opening dates says "updated".
  memory.clear();
  const staleSnapshot = { generated_at: new Date().toISOString(), repos: [{ name: 'dk' }], people: [],
    issues: [{ num: 9, title: 'Snapshot function', url: 'https://github.com/draykerdk/dk/issues/9', repo: 'dk', labels: ['open-function'],
      user: 'someone', avatar: '', comments: 0, at: new Date(Date.now() - 2 * day).toISOString(), assigned: false }] };
  global.fetch = (url) => {
    if (url === '/data/org.json') return reply(staleSnapshot);
    if (url.includes('/orgs/draykerdk/repos')) return reply([{ name: 'dk', full_name: 'draykerdk/dk', html_url: 'https://github.com/draykerdk/dk' }]);
    if (url.includes('/search/issues')) return Promise.resolve({ ok: false, status: 403, json: () => Promise.resolve({}) });
    return reply([]);
  };
  const limited = make(org, { page: 'contrib', tab: 'fn' });
  await limited.loadGH(true);
  const limitedBoard = limited.renderVals();
  check(limited.state.ghSrc === 'snapshot' && limitedBoard.liveFn.length === 1, 'a rate-limited issue search must keep the snapshot board');
  check(limitedBoard.ghLabel.indexOf('SNAPSHOT FROM GITHUB') === 0, 'a rate-limited refresh must keep the snapshot label');
  check(/opened by someone · updated 2d ago$/.test(limitedBoard.liveFn[0].meta), 'a snapshot without opening dates must say updated, not opened');

  memory.clear();
  const comCalls = [];
  global.fetch = (url) => {
    comCalls.push(url);
    if (url === 'https://drayker.org/data/org.json') return Promise.resolve({ ok: true, json: () => Promise.resolve(snapshot) });
    return Promise.reject(new Error('live API offline'));
  };
  const snapCom = make(com);
  await snapCom.loadGH(false);
  check(comCalls[0] === 'https://drayker.org/data/org.json' && snapCom.state.ghState === 'ready', '.com did not reuse the canonical organization snapshot');

  memory.clear();
  global.fetch = () => Promise.reject(new Error('offline'));
  const offline = make(org);
  await offline.loadGH(false);
  check(offline.state.ghState === 'error', 'offline GitHub request did not enter fallback state');
  const fallback = offline.renderVals();
  check(fallback.projCards.length === org.PROJECTS.length, 'offline mode lost curated projects');
  check(fallback.ghDown && fallback.liveFn.length === 0, 'offline mode must not invent open functions');
  check(fallback.fnEmptyTitle === 'GitHub is not reachable from here.', 'offline board needs the honest unavailable state');

  if (problems.length) {
    console.error(problems.join('\n'));
    console.error('\n' + problems.length + ' problem(s) across ' + checks + ' checks.');
    process.exit(1);
  }
  console.log(checks + ' static checks passed: design, .org/.com, routes, '
    + (org.PROJECTS.length + org.CONCEPTS.length - 1) + ' project pages, Volunteer and GitHub fallback.');
})().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
