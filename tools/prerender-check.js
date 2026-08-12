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
const expectedRoutes = site === 'org' ? 40 : 34;
check(urls.length === expectedRoutes, 'expected ' + expectedRoutes + ' canonical routes, got ' + urls.length);
check(urls.every((url) => url.startsWith(base) && !url.includes('#')), 'sitemap must contain clean canonical URLs only');
check(new Set(urls).size === urls.length, 'sitemap contains duplicate URLs');
check(!urls.some((url) => /\/(knowledge|project\/dknowledge)\/$/.test(url)), 'retired Dknowledge aliases must not appear in the sitemap');

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
    const href = value(html, new RegExp('<link[^>]+href="([^"]*' + basename + '[^"]*)"'));
    check(Boolean(href), url + ' does not reference ' + icon);
    check(href.includes('?v=20260811'), url + ' does not cache-bust ' + icon);
    const assetHref = href.split(/[?#]/)[0];
    if (assetHref && !/^https?:/.test(assetHref)) check(fs.existsSync(path.resolve(path.dirname(file), assetHref)), url + ' resolves missing icon ' + href);
  }
}

const titles = urls.map((url) => {
  const relative = decodeURIComponent(url.slice(base.length));
  const file = path.join(root, relative, 'index.html');
  return fs.existsSync(file) ? value(read(file), /<title>([\s\S]*?)<\/title>/) : '';
});
check(new Set(titles).size === titles.length, 'route titles are not unique');

for (const alias of ['knowledge', 'project/dknowledge']) {
  const file = path.join(root, alias, 'index.html');
  check(fs.existsSync(file), 'missing Dknowledge compatibility redirect: ' + alias);
  if (!fs.existsSync(file)) continue;
  const html = read(file);
  check(value(html, /<link rel="canonical" href="([^"]*)">/) === 'https://dknowledge.drayker.org/', alias + ' has the wrong canonical target');
  check(html.includes('location.replace("https://dknowledge.drayker.org/")'), alias + ' has no JavaScript redirect');
  check(html.includes('content="0; url=https://dknowledge.drayker.org/"'), alias + ' has no no-script redirect');
}

if (failures.length) {
  failures.forEach((failure) => console.error('FAIL: ' + failure));
  console.error(failures.length + ' of ' + checks + ' checks failed');
  process.exit(1);
}
console.log(checks + ' prerender checks passed for drayker.' + site + ' (' + urls.length + ' routes)');
