// Generates the drayker.com build from this repository's index.html.
//
//   node tools/make-com.js ../drayker.com-site/index.html
//
// One component, two sites. The institutional presentation is not maintained as a second
// copy that slowly drifts — it is produced from this file by changing exactly four things:
// the SITE build constant, the cross-site link, and the document head.
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

// True while the site is only reachable at draykerdk.github.io — staging must never be indexed
// as the real thing. Turned off on 2026-08-06, when drayker.com was pointed at GitHub Pages and
// the CNAME file was added to that repository.
const STAGING = false;

const HEAD = `<title>Drayker.com — intelligence, organization and computing</title>
<meta name="description" content="Drayker is an open, volunteer-led research initiative designing distributed intelligence, coordination and computing infrastructure.">
<meta name="theme-color" content="#08080A">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="https://drayker.com/">
<link rel="shortcut icon" href="./favicon.ico">
<link rel="icon" href="./assets/logo/drayker-favicon.svg" type="image/svg+xml">
<link rel="icon" href="./assets/logo/kit/favicon-32.png" type="image/png" sizes="32x32">
<link rel="icon" href="./assets/logo/kit/favicon-16.png" type="image/png" sizes="16x16">
<link rel="apple-touch-icon" href="./assets/logo/kit/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:title" content="Drayker.com — intelligence, organization and computing">
<meta property="og:description" content="An open research initiative designing distributed intelligence, coordination and computing infrastructure.">
<meta property="og:url" content="https://drayker.com/">
<meta property="og:image" content="https://drayker.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The Drayker mark: an orange sphere crossed by two rings.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://drayker.com/og.png">`;

let out = fs.readFileSync(source, 'utf8');
const fail = (what) => { console.error('make-com: could not rewrite ' + what + ' — the source has changed shape.'); process.exit(1); };

const before = out;
out = out.replace(/const SITE = 'org';/, "const SITE = 'com';");
if (out === before) fail('the SITE build constant');

const beforeCross = out;
out = out.replace(/const CROSS_SITE_URL = '[^']*';/, "const CROSS_SITE_URL = 'https://drayker.org';");
if (out === beforeCross) fail('the cross-site URL');

const headBlock = /<title>[\s\S]*?<meta name="twitter:image" content="[^"]*">/;
if (!headBlock.test(out)) fail('the document head');
out = out.replace(headBlock, HEAD + (STAGING ? '\n<meta name="robots" content="noindex, nofollow">' : ''));

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, out, 'utf8');
console.log('wrote ' + target + (STAGING ? '  (staging: noindex is on)' : '  (indexable)'));
