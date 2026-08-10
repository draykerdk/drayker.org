#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2).reduce((out, value) => {
  const match = value.match(/^--([^=]+)=?(.*)$/);
  if (match) out[match[1]] = match[2] || true;
  return out;
}, {});
const site = args.site === 'com' ? 'com' : 'org';
const root = path.resolve(args.root || '.');
const base = 'https://drayker.' + site + '/';
const sitemapPath = path.join(root, 'sitemap.xml');
const failures = [];
let checks = 0;

function check(ok, message) {
  checks++;
  if (!ok) failures.push(message);
}
function read(file) { return fs.readFileSync(file, 'utf8'); }
function value(html, regex) { const match = html.match(regex); return match ? match[1] : ''; }

check(fs.existsSync(sitemapPath), 'sitemap.xml is missing');
const sitemap = read(sitemapPath);
const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1]);
check(urls.length >= 28, 'too few prerendered routes: ' + urls.length);
check(urls.every((url) => url.startsWith(base) && !url.includes('#')), 'sitemap must contain clean canonical URLs only');
check(new Set(urls).size === urls.length, 'sitemap contains duplicate URLs');

for (const url of urls) {
  const relative = decodeURIComponent(url.slice(base.length));
  const file = path.join(root, relative, 'index.html');
  check(fs.existsSync(file), 'missing document for ' + url);
  if (!fs.existsSync(file)) continue;
  const html = read(file);
  const title = value(html, /<title>([\s\S]*?)<\/title>/);
  const description = value(html, /<meta name="description" content="([^"]*)">/);
  const canonical = value(html, /<link rel="canonical" href="([^"]*)">/);
  check(title.length > 18, url + ' has a weak title');
  check(description.length > 70, url + ' has a weak description');
  check(canonical === url, url + ' has the wrong canonical: ' + canonical);
  check(value(html, /<meta property="og:url" content="([^"]*)">/) === url, url + ' has the wrong og:url');
  check(html.includes('<noscript>') && html.includes('DRAYKER_PRERENDER_START'), url + ' has no readable no-script fallback');

  for (const icon of ['favicon.ico', 'assets/logo/drayker-favicon.svg', 'assets/logo/kit/favicon-32.png', 'assets/logo/kit/favicon-16.png', 'assets/logo/kit/apple-touch-icon.png']) {
    const basename = path.basename(icon).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const href = value(html, new RegExp('<link[^>]+href="([^"]*' + basename + ')"'));
    check(Boolean(href), url + ' does not reference ' + icon);
    if (href && !/^https?:/.test(href)) check(fs.existsSync(path.resolve(path.dirname(file), href)), url + ' resolves missing icon ' + href);
  }
}

const titles = urls.map((url) => {
  const relative = decodeURIComponent(url.slice(base.length));
  const file = path.join(root, relative, 'index.html');
  return fs.existsSync(file) ? value(read(file), /<title>([\s\S]*?)<\/title>/) : '';
});
check(new Set(titles).size === titles.length, 'route titles are not unique');

if (failures.length) {
  failures.forEach((failure) => console.error('FAIL: ' + failure));
  console.error(failures.length + ' of ' + checks + ' checks failed');
  process.exit(1);
}
console.log(checks + ' prerender checks passed for drayker.' + site + ' (' + urls.length + ' routes)');
