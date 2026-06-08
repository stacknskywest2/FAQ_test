const CACHE_NAME = 'ttumi-faq-v15-6-20260608';
const CORE = [
  './', './index.html', './faq-data.json', './manifest.webmanifest', './version.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
  './manuals/cover_tms_remote_monitoring_manual_2025.jpg',
  './manuals/cover_total_management_manual_2026.jpg',
  './manuals/tms_ebook/manifest.json', './manuals/tms_ebook/search_index.json'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isFreshFile = /(?:index\.html|faq-data\.json|version\.json|manifest\.webmanifest)$/.test(url.pathname) || req.mode === 'navigate';
  if (isFreshFile) {
    event.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then(cached => cached || caches.match('./index.html'))));
    return;
  }

  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(res => {
    if (res.ok) caches.open(CACHE_NAME).then(cache => cache.put(req, res.clone()));
    return res;
  })));
});
