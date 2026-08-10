#!/usr/bin/env node
'use strict';
/**
 * tools/prerender.js — one real HTML document per route, without a headless browser.
 *
 * The site is a client-rendered Design Component behind hash routes, so a crawler sees
 * exactly one page. This emits a directory per route whose <head> carries that route's
 * own title, description and canonical, whose <noscript> carries readable text and links
 * to every other route, and which boots the component straight into the right hash.
 *
 * Source of truth is the built index.html: ROUTE_META is read out of it, never duplicated
 * here. Component keys and the project list are read the same way.
 *
 *   node tools/prerender.js --site=org            # writes ./manifesto/index.html, ...
 *   node tools/prerender.js --site=com --out=dist
 *
 * No dependencies. Node >= 16.
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2).reduce((a, s) => {
  const m = s.match(/^--([^=]+)=?(.*)$/); if (m) a[m[1]] = m[2] || true; return a;
}, {});
const SITE = args.site === 'com' ? 'com' : 'org';
const OUT = args.out || '.';
const SRC = args.src || 'index.html';
const BASE = SITE === 'com' ? 'https://drayker.com/' : 'https://drayker.org/';

const GENERATED_RE = /\n?<!-- DRAYKER_PRERENDER_START -->[\s\S]*?<!-- DRAYKER_PRERENDER_END -->\n?/g;
const html = fs.readFileSync(SRC, 'utf8').replace(GENERATED_RE, '\n');

/** Pull `const NAME = { ... };` out of the built file by brace matching. */
function block(name) {
  const at = html.indexOf('const ' + name + ' = ');
  if (at < 0) throw new Error(name + ' not found in ' + SRC);
  const open = html.indexOf(html[html.indexOf('=', at) + 2] === '[' ? '[' : '{', at);
  const closer = html[open] === '[' ? ']' : '}';
  let depth = 0, i = open;
  for (; i < html.length; i++) {
    if (html[i] === html[open]) depth++;
    else if (html[i] === closer) { depth--; if (!depth) break; }
  }
  return html.slice(open, i + 1);
}

// ROUTE_META is plain data; evaluating the literal keeps one source of truth.
const ROUTE_META = eval('(' + block('ROUTE_META') + ')'); // eslint-disable-line no-eval
const KEYS = (block('TRAIL').match(/'([a-z]+)'/g) || []).map((s) => s.replace(/'/g, ''));

/**
 * Per-part metadata, read from the same records the page renders: every component route
 * gets its own title and description instead of twenty copies of a generic one.
 * Scans PROJECTS and CONCEPTS for `key` / `name` / `tagline` / `vision` triples.
 */
const PARTS = (() => {
  const src = block('PROJECTS') + block('CONCEPTS');
  const out = {};
  const re = /\{\s*key:\s*'([a-z]+)'[\s\S]*?name:\s*'((?:[^'\\]|\\.)*)'[\s\S]*?tagline:\s*'((?:[^'\\]|\\.)*)'[\s\S]*?vision:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(src))) {
    const un = (s) => s.replace(/\\'/g, "'").replace(/\\u2019/g, '\u2019').replace(/\\\\/g, '\\');
    out[m[1]] = { name: un(m[2]), tagline: un(m[3]), vision: un(m[4]) };
  }
  return out;
})();

/** The head a route claims: a part route speaks for itself, others use ROUTE_META. */
function metaFor(r) {
  const part = r.path.indexOf('project/') === 0 ? PARTS[r.path.split('/')[1]] : null;
  if (part) return { t: part.name + ' — ' + part.tagline.replace(/\.$/, ''), d: part.vision.slice(0, 300) };
  if (r.path.indexOf('contrib/') === 0) {
    const tab = r.path.split('/')[1];
    const labels = { overview: 'Overview', tracks: 'Contribution tracks', projects: 'Projects', guide: 'Contribution guide' };
    return {
      t: (labels[tab] || tab) + ' — Contribute to Drayker',
      d: ROUTE_META.contrib.d + ' This page opens the ' + (labels[tab] || tab).toLowerCase() + ' view directly.'
    };
  }
  return ROUTE_META[r.key];
}

const ORG_ONLY = ['contrib', 'fn', 'join'];
const COM_ONLY = ['partnerships'];
const SHARED = ['manifesto', 'dfm', 'dk', 'eco', 'org', 'knowledge', 'docs'];
const TABS = ['overview', 'tracks', 'projects', 'guide'];

function routes() {
  const list = [{ path: '', key: 'home' }];
  SHARED.forEach((k) => list.push({ path: k, key: k }));
  (SITE === 'org' ? ORG_ONLY : COM_ONLY).forEach((k) => list.push({ path: k, key: k }));
  if (SITE === 'org') TABS.forEach((t) => list.push({ path: 'contrib/' + t, key: 'contrib' }));
  KEYS.forEach((k) => list.push({ path: 'project/' + k, key: 'project' }));
  return list;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cleanUrl = (r) => BASE + (r.path ? r.path.replace(/^\/+|\/+$/g, '') + '/' : '');

function noscript(all, current) {
  const links = all.map((r) => {
    const href = cleanUrl(r);
    return '<li><a href="' + esc(href) + '">' + esc(metaFor(r).t) + '</a></li>';
  }).join('');
  const m = metaFor(current);
  return '<!-- DRAYKER_PRERENDER_START --><noscript><div style="max-width:64ch;margin:0 auto;padding:40px 20px;'
    + 'font-family:Archivo,Helvetica,Arial,sans-serif;color:#EDECF0;background:#08080A">'
    + '<h1>' + esc(m.t) + '</h1><p>' + esc(m.d) + '</p>'
    + '<p>This site renders with JavaScript. Every route is listed below, and every claim on it '
    + 'is sourced from the public repositories at <a href="https://github.com/draykerdk">github.com/draykerdk</a>.</p>'
    + '<ul>' + links + '</ul></div></noscript><!-- DRAYKER_PRERENDER_END -->';
}

function documentFor(all, r) {
  const m = metaFor(r);
  const url = cleanUrl(r);
  const title = (r.key === 'home' && SITE === 'org')
    ? 'Drayker Organization — volunteers portal'
    : m.t + (SITE === 'org' ? ' · drayker.org' : ' · drayker.com');
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, '<title>' + esc(title) + '</title>')
    .replace(/(<meta name="description" content=")[\s\S]*?(">)/, '$1' + esc(m.d) + '$2')
    .replace(/(<link rel="canonical" href=")[\s\S]*?(">)/, '$1' + esc(url) + '$2')
    .replace(/(<meta property="og:title" content=")[\s\S]*?(">)/, '$1' + esc(title) + '$2')
    .replace(/(<meta property="og:description" content=")[\s\S]*?(">)/, '$1' + esc(m.d) + '$2')
    .replace(/(<meta property="og:url" content=")[\s\S]*?(">)/, '$1' + esc(url) + '$2');
  // Relative asset paths have to climb back out of the route directory.
  const depth = r.path ? r.path.split('/').length : 0;
  if (depth) out = out.replace(/(src|href)="\.\//g, (mm, a) => a + '="' + '../'.repeat(depth));
  // Boot straight into the route instead of the home page.
  if (r.path) {
    out = out.replace('</head>', '<!-- DRAYKER_PRERENDER_START --><script>if(!location.hash)location.replace('
      + JSON.stringify('#' + SITE + '/' + r.path) + ');</script><!-- DRAYKER_PRERENDER_END -->\n</head>');
  }
  return out.replace('<body>', '<body>\n' + noscript(all, r));
}

function sitemap(all) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = all.map((r) => '  <url><loc>' + esc(cleanUrl(r))
    + '</loc><lastmod>' + today + '</lastmod></url>').join('\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls + '\n</urlset>\n';
}

const all = routes();
let n = 0;
all.forEach((r) => {
  const dir = path.join(OUT, r.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), documentFor(all, r));
  n++;
});
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap(all));
console.log('prerendered ' + n + ' routes for drayker.' + SITE + ' into ' + path.resolve(OUT));
console.log('sitemap.xml written with ' + all.length + ' urls');
