const CACHE_NAME = 'ttumi-faq-v15-6-3-20260611';
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./faq-data.json",
  "./version.json",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/keco-logo.png",
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
  "./manuals/tms_ebook/search_index.json",
  "./manuals/es019/es01901_1e/page-001.jpg",
  "./manuals/es019/es01901_1e/search_index.json",
  "./manuals/es019/es01901_1e/es01901_1e.pdf",
  "./manuals/es019/es01901_2c/page-001.jpg",
  "./manuals/es019/es01901_2c/search_index.json",
  "./manuals/es019/es01901_2c/es01901_2c.pdf",
  "./manuals/es019/es01902_1a/page-001.jpg",
  "./manuals/es019/es01902_1a/search_index.json",
  "./manuals/es019/es01902_1a/es01902_1a.pdf",
  "./manuals/es019/es01903_1a/page-001.jpg",
  "./manuals/es019/es01903_1a/search_index.json",
  "./manuals/es019/es01903_1a/es01903_1a.pdf",
  "./manuals/es019/es01904_1a/page-001.jpg",
  "./manuals/es019/es01904_1a/search_index.json",
  "./manuals/es019/es01904_1a/es01904_1a.pdf",
  "./manuals/es019/es01905_1a/page-001.jpg",
  "./manuals/es019/es01905_1a/search_index.json",
  "./manuals/es019/es01905_1a/es01905_1a.pdf",
  "./manuals/es019/es01906_1a/page-001.jpg",
  "./manuals/es019/es01906_1a/search_index.json",
  "./manuals/es019/es01906_1a/es01906_1a.pdf",
  "./manuals/es019/es01907_1a/page-001.jpg",
  "./manuals/es019/es01907_1a/search_index.json",
  "./manuals/es019/es01907_1a/es01907_1a.pdf",
  "./manuals/es019/es01908_1a/page-001.jpg",
  "./manuals/es019/es01908_1a/search_index.json",
  "./manuals/es019/es01908_1a/es01908_1a.pdf",
  "./manuals/es019/es01909_1a/page-001.jpg",
  "./manuals/es019/es01909_1a/search_index.json",
  "./manuals/es019/es01909_1a/es01909_1a.pdf",
  "./manuals/es019/es01910_1d/page-001.jpg",
  "./manuals/es019/es01910_1d/search_index.json",
  "./manuals/es019/es01910_1d/es01910_1d.pdf",
  "./manuals/es019/es01911_1b/page-001.jpg",
  "./manuals/es019/es01911_1b/search_index.json",
  "./manuals/es019/es01911_1b/es01911_1b.pdf",
  "./manuals/es019/es01914_1d/page-001.jpg",
  "./manuals/es019/es01914_1d/search_index.json",
  "./manuals/es019/es01914_1d/es01914_1d.pdf",
  "./manuals/es019/es01915_1c/page-001.jpg",
  "./manuals/es019/es01915_1c/search_index.json",
  "./manuals/es019/es01915_1c/es01915_1c.pdf",
  "./laws/법령_대기관리권역의 대기환경개선에 관한 특별법 시행령_별표모음.pdf",
  "./laws/법령_대기관리권역의 대기환경개선에 관한 특별법 시행규칙_별표모음.pdf",
  "./laws/법령_대기환경보전법 시행령_별표모음.pdf",
  "./laws/법령_대기환경보전법 시행규칙_별표모음.pdf",
  "./laws/법령_환경오염시설의 통합관리에 관한 법률 시행령_별표모음.pdf",
  "./laws/법령_환경오염시설의 통합관리에 관한 법률 시행규칙_별표모음.pdf",
  "./laws/README_law_annexes_v15.6.txt",
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
        if (key !== CACHE_NAME && (key.indexOf("keco-faq-") === 0 || key.indexOf("gulttuk-faq-") === 0 || key.indexOf("ttumi-faq-") === 0)) return caches.delete(key);
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
  if (url.pathname.endsWith("search_index.json")) {
    event.respondWith(networkFirst(event));
    return;
  }
  event.respondWith(cacheFirst(event));
});
