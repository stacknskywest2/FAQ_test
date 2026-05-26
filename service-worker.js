const CACHE_NAME = "gulttuk-faq-v15-4-1-update-check-20260526";
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./faq-data.json",
  "./version.json",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./images/FAQ-D-001_system_overview_access_p280.jpg",
  "./images/FAQ-D-002_signup_login_flow_p281.jpg",
  "./images/FAQ-D-003_terms_business_lookup_p282.jpg",
  "./images/FAQ-D-003_terms_business_lookup_p283.jpg",
  "./images/FAQ-D-004_contact_approval_stonepass_p284.jpg",
  "./images/FAQ-D-004_contact_approval_stonepass_p285.jpg",
  "./images/FAQ-D-005_business_basic_info_p286.jpg",
  "./images/FAQ-D-005_business_basic_info_p287.jpg",
  "./images/FAQ-D-005_business_basic_info_p288.jpg",
  "./images/FAQ-D-006_outlet_detail_p289.jpg",
  "./images/FAQ-D-007_emission_facility_p290.jpg",
  "./images/FAQ-D-008_emission_facility_detail_p291.jpg",
  "./images/FAQ-D-009_prevention_facility_p292.jpg",
  "./images/FAQ-D-010_accuracy_test_p293.jpg",
  "./images/FAQ-D-011_standard_gas_p294.jpg",
  "./images/FAQ-D-012_received_and_exceedance_p295.jpg",
  "./images/FAQ-D-014_period_emission_p296.jpg",
  "./images/FAQ-D-015_operation_status_p297.jpg",
  "./manuals/cover_tms_remote_monitoring_manual_2025.jpg",
  "./manuals/cover_total_management_manual_2026.jpg",
  "./manuals/tms_ebook/page-001.jpg",
  "./manuals/tms_ebook/search_index.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)));
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME && (key.indexOf("keco-faq-") === 0 || key.indexOf("gulttuk-faq-") === 0)) return caches.delete(key);
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
  if (url.pathname.endsWith("/manuals/tms_ebook/search_index.json") || url.pathname.endsWith("search_index.json")) {
    event.respondWith(networkFirst(event, "./manuals/tms_ebook/search_index.json"));
    return;
  }
  event.respondWith(cacheFirst(event));
});
