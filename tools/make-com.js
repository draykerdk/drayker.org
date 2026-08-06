// Generates the drayker.com build from this repository's index.html.
//
//   node tools/make-com.js ../drayker.com-site/index.html
//
// One component, two sites. The institutional presentation is not maintained as a second
// copy that slowly drifts — it is produced from this file by changing exactly four things:
// the SITE build constant, the cross-site link, the document head, and (until the domain is
// pointed at GitHub Pages) a robots noindex.
//
// Everything else — layout, tokens, component logic, and the `com*` copy of every project —
// is shared. When the content of a .com page changes, it changes in this repository and is
// regenerated; never edit the generated file by hand.

const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'index.html');
const target = process.argv[2];
if (!target) {
  console.error('usage: node tools/make-com.js <path to drayker.com index.html>');
  process.exit(1);
}

// Set to false and regenerate on the day drayker.com resolves to GitHub Pages, together with
// adding the CNAME file to that repository. Staging must never be indexed as the real site.
const STAGING = true;

const HEAD = `<title>Drayker — open infrastructure through distributed collaboration</title>
<meta name="description" content="Drayker is a volunteer, non-profit organization building Dk — a unified system of intelligence, organization and computing — and the protocol that lets the whole world build it together.">
<meta name="theme-color" content="#08080A">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="https://drayker.com/">
<meta property="og:type" content="website">
<meta property="og:title" content="Drayker — open infrastructure through distributed collaboration">
<meta property="og:description" content="A volunteer, non-profit organization building Dk and the protocol behind it.">
<meta property="og:url" content="https://drayker.com/">
<meta name="twitter:card" content="summary">`;

let out = fs.readFileSync(source, 'utf8');
const fail = (what) => { console.error('make-com: could not rewrite ' + what + ' — the source has changed shape.'); process.exit(1); };

const before = out;
out = out.replace(/const SITE = 'org';/, "const SITE = 'com';");
if (out === before) fail('the SITE build constant');

const beforeCross = out;
out = out.replace(/const CROSS_SITE_URL = '[^']*';/, "const CROSS_SITE_URL = 'https://drayker.org';");
if (out === beforeCross) fail('the cross-site URL');

const headBlock = /<title>[\s\S]*?<meta name="twitter:card" content="summary">/;
if (!headBlock.test(out)) fail('the document head');
out = out.replace(headBlock, HEAD + (STAGING ? '\n<meta name="robots" content="noindex, nofollow">' : ''));

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, out, 'utf8');
console.log('wrote ' + target + (STAGING ? '  (staging: noindex is on)' : '  (indexable)'));
