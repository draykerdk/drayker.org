// Generates the drayker.com build from this repository's index.html.
//
//   node tools/make-com.js ../drayker.com-site/index.html --sync
//
// One component, two sites. The institutional presentation is not maintained as a second
// copy that slowly drifts — it is produced from this file by changing the SITE build
// constant, the Design Component's default site prop, the cross-site link and the head.
//
// Everything else — layout, tokens, component logic, and the `com*` copy of every project —
// is shared. When the content of a .com page changes, it changes in this repository and is
// regenerated; never edit the generated file by hand.

const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'index.html');
const target = process.argv[2];
const syncPackage = process.argv.slice(3).includes('--sync');
if (!target) {
  console.error('usage: node tools/make-com.js <path to drayker.com index.html> [--sync]');
  process.exit(1);
}

// True while the site is only reachable at draykerdk.github.io — staging must never be indexed
// as the real thing. Turned off on 2026-08-06, when drayker.com was pointed at GitHub Pages and
// the CNAME file was added to that repository.
const STAGING = false;

const HEAD = `<title>Drayker | Intelligence, organization and computing</title>
<meta name="description" content="Drayker is an open system of intelligence, organization and computing designed for large-scale human cooperation.">
<meta name="theme-color" content="#08080A">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="canonical" href="https://drayker.com/">
<link rel="shortcut icon" href="./favicon.ico?v=20260811">
<link rel="icon" href="./favicon.ico?v=20260811" type="image/x-icon" sizes="32x32">
<link rel="icon" href="./assets/logo/drayker-favicon.svg?v=20260811" type="image/svg+xml" sizes="any">
<link rel="icon" href="./assets/logo/kit/favicon-32.png?v=20260811" type="image/png" sizes="32x32">
<link rel="icon" href="./assets/logo/kit/favicon-16.png?v=20260811" type="image/png" sizes="16x16">
<link rel="apple-touch-icon" href="./assets/logo/kit/apple-touch-icon.png?v=20260811" sizes="180x180">
<link rel="alternate" type="text/plain" href="/llms.txt" title="AI-readable site summary">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Drayker">
<meta property="og:title" content="Drayker | Intelligence, organization and computing">
<meta property="og:description" content="Drayker is an open system of intelligence, organization and computing designed for large-scale human cooperation.">
<meta property="og:url" content="https://drayker.com/">
<meta property="og:image" content="https://drayker.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The Drayker mark: an orange sphere crossed by two rings.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Drayker | Intelligence, organization and computing">
<meta name="twitter:description" content="Drayker is an open system of intelligence, organization and computing designed for large-scale human cooperation.">
<meta name="twitter:image" content="https://drayker.com/og.png">`;

let out = fs.readFileSync(source, 'utf8');
const fail = (what) => { console.error('make-com: could not rewrite ' + what + ' — the source has changed shape.'); process.exit(1); };

const before = out;
out = out.replace(/const SITE = 'org';/, "const SITE = 'com';");
if (out === before) fail('the SITE build constant');

// The runtime materializes defaults declared in data-props as real component props.
// If this remains `org`, it overrides SITE on the clean root URL; hash routes appear to
// work only because #com/<page> subsequently switches state in place.
const beforeDefault = out;
out = out.replace(/(&quot;site&quot;:[\s\S]*?&quot;default&quot;:&quot;)org(&quot;)/, '$1com$2');
if (out === beforeDefault) fail('the Design Component site default');

const beforeCross = out;
out = out.replace(/const CROSS_SITE_URL = '[^']*';/, "const CROSS_SITE_URL = 'https://drayker.org';");
if (out === beforeCross) fail('the cross-site URL');

const headBlock = /<title>[\s\S]*?<meta name="twitter:image" content="[^"]*">/;
if (!headBlock.test(out)) fail('the document head');
out = out.replace(headBlock, HEAD + (STAGING ? '\n<meta name="robots" content="noindex, nofollow">' : ''));

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, out, 'utf8');

// Production generation is a package operation, not only an index rewrite. The .com
// checkout must be independently testable, which means it needs the exact runtime,
// mark engine, design assets and validation tools used by the canonical .org source.
// Temporary one-file renders keep the old behaviour unless --sync is explicit.
if (syncPackage) {
  const root = path.join(__dirname, '..');
  const targetRoot = path.dirname(target);
  const files = [
    'support.js', 'drayker-mark.js', 'favicon.ico', 'og.png',
    'tools/prerender.js', 'tools/prerender-check.js', 'tools/render-check.js'
  ];
  files.forEach((entry) => {
    const destination = path.join(targetRoot, entry);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(path.join(root, entry), destination);
  });
  fs.cpSync(path.join(root, 'assets'), path.join(targetRoot, 'assets'), { recursive: true });
  console.log('synced runtime, mark, assets and validation tools into ' + targetRoot);
}

console.log('wrote ' + target + (STAGING ? '  (staging: noindex is on)' : '  (indexable)'));
