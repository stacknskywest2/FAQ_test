const CACHE_NAME = "keco-faq-v15-2-ebook-update-versioned-images-20260506";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./faq-data.json",
  "./version.json",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./images/FAQ-D-001_system_address.jpg",
  "./images/FAQ-D-002_login_flow.jpg",
  "./images/FAQ-D-003_mobile_login.jpg",
  "./images/FAQ-D-004_account_type.jpg",
  "./images/FAQ-D-005_center_contact.jpg",
  "./images/FAQ-D-006_primary_manager_change.jpg",
  "./images/FAQ-D-007_secondary_manager.jpg",
  "./images/FAQ-D-008_signup_approval.jpg",
  "./images/FAQ-D-009_notification_service.jpg",
  "./images/FAQ-D-010_permit_card_upload.jpg",
  "./images/FAQ-D-011_forecast_level.jpg",
  "./images/FAQ-D-012_received_data.jpg",
  "./images/FAQ-D-013_charge_lookup.jpg",
  "./images/FAQ-D-014_remote_search_history.jpg",
  "./manuals/cover_tms_remote_monitoring_manual_2025.jpg",
  "./manuals/cover_total_management_manual_2026.jpg",
  "./manuals/tms_ebook/page-001.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME && key.indexOf("keco-faq-") === 0) return caches.delete(key);
      })))
      .then(() => self.clients.claim())
  );
});

function networkFirst(event, fallbackUrl) {
  const req = event.request;
  return fetch(req, { cache: "no-store" }).then((response) => {
    if (response && response.status === 200) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(fallbackUrl || req, copy));
    }
    return response;
  }).catch(() => caches.match(fallbackUrl || req));
}

function cacheFirst(event) {
  const req = event.request;
  return caches.match(req).then((cached) => {
    if (cached) return cached;
    return fetch(req).then((response) => {
      if (!response || response.status !== 200) return response;
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
      return response;
    });
  });
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(networkFirst(event, "./index.html"));
    return;
  }

  if (url.pathname.endsWith("/version.json") || url.pathname.endsWith("version.json")) {
    event.respondWith(networkFirst(event, "./version.json"));
    return;
  }

  event.respondWith(cacheFirst(event));
});
