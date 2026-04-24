/* FAQ Service Worker - update notification + installable PWA package */
const CACHE_PREFIX = 'keco-faq-cache';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './update-notifier.js',
  './install-helper.js',
  './version.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png'
];

async function getVersion() {
  try {
    const res = await fetch('./version.json?sw=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error('version fetch failed');
    const data = await res.json();
    return data.version || data.commit || String(Date.now());
  } catch (e) {
    return 'fallback-' + Date.now();
  }
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const version = await getVersion();
    const cacheName = `${CACHE_PREFIX}-${version}`;
    const cache = await caches.open(cacheName);
    await Promise.all(CORE_ASSETS.map(async url => {
      try {
        const res = await fetch(url, { cache: 'reload' });
        if (res.ok) await cache.put(url, res.clone());
      } catch (e) {
        // One missing optional asset must not break PWA installation.
      }
    }));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const version = await getVersion();
    const currentCache = `${CACHE_PREFIX}-${version}`;
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX) && key !== currentCache && key !== `${CACHE_PREFIX}-runtime` && key !== `${CACHE_PREFIX}-pages`)
      .map(key => caches.delete(key))
    );
    await self.clients.claim();
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clients) client.postMessage({ type: 'FAQ_UPDATED', version });
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  if (url.pathname.endsWith('/version.json')) {
    event.respondWith(fetch(req, { cache: 'no-store' }));
    return;
  }

  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: 'no-store' });
        const cache = await caches.open(`${CACHE_PREFIX}-pages`);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        return (await caches.match(req)) || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    const fresh = await fetch(req);
    const cache = await caches.open(`${CACHE_PREFIX}-runtime`);
    cache.put(req, fresh.clone());
    return fresh;
  })());
});
