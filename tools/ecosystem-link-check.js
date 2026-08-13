#!/usr/bin/env node
'use strict';

// Public integration smoke test for every Drayker documentation surface.
// It deliberately checks only the organization-owned domains: external links
// can fail independently and must not make the ecosystem health signal noisy.

const domains = [
  'advices.drayker.org', 'bsdk.drayker.org', 'daf.drayker.org',
  'dfmp.drayker.org', 'dfmpproject.drayker.org', 'support.drayker.org',
  'dk.drayker.org', 'academy.drayker.org', 'dknetwork.drayker.org',
  'personal.drayker.org', 'dknowledge.drayker.org', 'propagation.drayker.org',
  'drayker.com', 'drayker.org', 'ei.drayker.org', 'forum.drayker.org',
  'lc.drayker.org', 'metadfmp.drayker.org', 'science.drayker.org',
  'osdk.drayker.org', 'pap.drayker.org', 'stations.drayker.org',
  'uid.drayker.org', 'value.drayker.org'
];

const timeoutMs = Number(process.env.DRAYKER_LINK_TIMEOUT_MS || 15000);
const failures = [];

async function request(url, redirect) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      redirect,
      signal: controller.signal,
      headers: { 'user-agent': 'drayker-ecosystem-link-check/1' }
    });
  } finally {
    clearTimeout(timer);
  }
}

async function checkDomain(host) {
  const httpsUrl = 'https://' + host + '/';
  try {
    const secure = await request(httpsUrl, 'follow');
    if (secure.status !== 200) failures.push(host + ': HTTPS returned ' + secure.status);
    if (new URL(secure.url).hostname !== host) failures.push(host + ': HTTPS ended at ' + secure.url);
    await secure.arrayBuffer();
  } catch (error) {
    failures.push(host + ': HTTPS failed: ' + error.message);
  }

  try {
    const plain = await request('http://' + host + '/', 'manual');
    const location = plain.headers.get('location') || '';
    if (![301, 302, 307, 308].includes(plain.status)) {
      failures.push(host + ': HTTP did not redirect (' + plain.status + ')');
    } else if (location !== httpsUrl) {
      failures.push(host + ': HTTP redirects to ' + (location || '(empty)'));
    }
  } catch (error) {
    failures.push(host + ': HTTP redirect check failed: ' + error.message);
  }
}

(async () => {
  // Small batches avoid turning a health check into a burst against GitHub Pages.
  for (let i = 0; i < domains.length; i += 6) {
    await Promise.all(domains.slice(i, i + 6).map(checkDomain));
  }
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log(domains.length + ' Drayker domains passed HTTPS, origin and HTTP redirect checks.');
})().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
