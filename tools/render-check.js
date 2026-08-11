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
  return eval(code + '\n;({ Component, PROJECTS, CONCEPTS, JOIN_STEPS, TRACKS, LAYER_GROUPS, CASE_LAYERS, ROUTE_META, ECON_CHAIN, ECON_LIMITS, ECON_TODAY, ECON_QUESTIONS })');
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
check(src.includes('rel="shortcut icon" href="./favicon.ico?v=20260811"'), 'versioned legacy favicon fallback is missing');
check(src.includes('rel="icon" href="./favicon.ico?v=20260811" type="image/x-icon" sizes="32x32"'), 'standard ICO favicon is missing');
check(src.includes('drayker-favicon.svg?v=20260811') && src.includes('sizes="any"'), 'scalable favicon is not versioned or sized');
check(src.includes('favicon-32.png') && src.includes('favicon-16.png'), 'PNG favicon fallbacks are missing');
check(src.includes('apple-touch-icon.png?v=20260811') && src.includes('sizes="180x180"'), 'Apple touch icon is not versioned or sized');
check(!/FN-\d{3,}/.test(src), 'fictional open-function rows must not be published');

// The mark engine is served from this domain and the documentation sites load it
// from here, but the canonical, source-preserving copy lives in the design library at
// draykerdk/drayker-propagation, which pins this same hash in its own tools/check.js.
// Two domains serving one engine only stays true if something says so out loud.
const ENGINE_SHA256 = '0a421c6b10ade43a6e45e03ba1a5e7a690ea1e9cb29ebc5827321385e37c380c';
const engineHash = require('crypto').createHash('sha256')
  .update(fs.readFileSync(path.join(__dirname, '..', 'drayker-mark.js'))).digest('hex');
check(engineHash === ENGINE_SHA256, 'drayker-mark.js has drifted from the canonical engine in the design library');
check(!src.includes('community review branch'), 'the retired community-review flow is still described');
check(src.includes("template=volunteer-introduction.yml") && src.includes("template=partnership.yml"), 'the two general-forum forms are not wired');

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
check(!/\d+(\.\d+)?\s*(euro|eur\b|usd\b|dollar|%)/i.test(econText), 'the economy page must never publish an amount or a rate');
check(!/(worth about|valued at|per day|each day|daily amount|guaranteed income|basic income)/i.test(econText), 'the economy page must never imply a payout');
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
  check(Array.isArray(snapshot.issues) && !snapshot.issues.some((issue) => /\/pull\/\d+$/.test(issue.url || '')), 'the organization snapshot must never classify pull requests as issues');
}

for (const site of ['org', 'com']) {
  const bundle = site === 'org' ? org : com;
  for (const page of ['home', 'manifesto', 'dfm', 'dk', 'eco', 'org', 'economy', 'docs']) {
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
  check(values.pdIsConcept === !!project.concept, 'repository status is wrong for ' + project.key);
  noPlaceholders(values, 'org/project/' + project.key);
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
check(assigned[0] === 'https://drayker.org/#org/project/dk/arch', '.com technical deep link must target the exact .org section');

resetWindow('#com/home', 'drayker.org');
make(org).readHash();
check(assigned[0] === 'https://drayker.com/#com/home', 'foreign .com hash on .org must hand off to .com');

resetWindow('', 'drayker.com');
comHome.goJoin();
check(assigned[0] === 'https://drayker.org/#org/join', '.com volunteer CTA must hand off to .org');
resetWindow('', 'drayker.org');
orgHome.toggleSite();
check(assigned[0] === 'https://drayker.com/#com/home', 'site switch must use the other public domain');

resetWindow('#org/partnerships', 'drayker.org');
make(org).readHash();
check(assigned[0] === 'https://drayker.com/#com/partnerships', '.org partnerships route must hand off to .com');

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

// Cached and offline GitHub states both retain curated content.
(async () => {
  resetWindow();
  memory.clear();
  memory.set('drayker-gh-v1', JSON.stringify({
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
