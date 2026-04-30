const CACHE_NAME = "keco-faq-v14-0-law-popup-system-images-20260430";
const PRECACHE_URLS = ["./", "./index.html", "./faq-data.json", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./images/FAQ-D-001_system_address.jpg", "./images/FAQ-D-002_login_flow.jpg", "./images/FAQ-D-003_mobile_login.jpg", "./images/FAQ-D-004_account_type.jpg", "./images/FAQ-D-005_center_contact.jpg", "./images/FAQ-D-006_primary_manager_change.jpg", "./images/FAQ-D-007_secondary_manager.jpg", "./images/FAQ-D-008_signup_approval.jpg", "./images/FAQ-D-009_notification_service.jpg", "./images/FAQ-D-010_permit_card_upload.jpg", "./images/FAQ-D-011_forecast_level.jpg", "./images/FAQ-D-012_received_data.jpg", "./images/FAQ-D-013_charge_lookup.jpg", "./images/FAQ-D-014_remote_search_history.jpg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.map((key) => {
    if (key !== CACHE_NAME) return caches.delete(key);
  }))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  event.respondWith(caches.match(req).then((cached) => {
    if (cached) return cached;
    return fetch(req).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
      return response;
    }).catch(() => {
      if (req.mode === "navigate") return caches.match("./index.html");
    });
  }));
});
