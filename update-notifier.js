/* FAQ update notifier
   Include before </body>: <script src="./update-notifier.js"></script> */
(function () {
  const VERSION_URL = './version.json';
  const STORAGE_KEY = 'keco_faq_seen_version';
  const CHECK_INTERVAL_MS = 5 * 60 * 1000; // while page is open, check every 5 min

  function createToast(message, actionText, onAction) {
    let wrap = document.getElementById('faq-update-toast');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'faq-update-toast';
      wrap.style.cssText = [
        'position:fixed', 'left:16px', 'right:16px', 'bottom:18px', 'z-index:99999',
        'display:none', 'align-items:center', 'gap:12px', 'justify-content:space-between',
        'padding:14px 14px', 'border-radius:16px', 'box-shadow:0 10px 30px rgba(0,0,0,.22)',
        'background:#0b5f9e', 'color:#fff', 'font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        'font-size:14px', 'line-height:1.45'
      ].join(';');
      document.body.appendChild(wrap);
    }
    wrap.innerHTML = '';
    const text = document.createElement('div');
    text.textContent = message;
    text.style.cssText = 'font-weight:700;word-break:keep-all;';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = actionText || '새로고침';
    btn.style.cssText = [
      'border:0', 'border-radius:999px', 'padding:9px 12px', 'background:#fff', 'color:#0b5f9e',
      'font-weight:800', 'cursor:pointer', 'white-space:nowrap'
    ].join(';');
    btn.addEventListener('click', onAction || (() => location.reload()));
    wrap.appendChild(text);
    wrap.appendChild(btn);
    wrap.style.display = 'flex';
  }

  async function fetchVersion() {
    const res = await fetch(`${VERSION_URL}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('version check failed');
    return res.json();
  }

  async function checkVersion(showInitialNotice) {
    try {
      const data = await fetchVersion();
      const latest = data.version || data.commit || data.updated_at;
      if (!latest) return;
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        localStorage.setItem(STORAGE_KEY, latest);
        return;
      }
      if (seen !== latest) {
        createToast('FAQ가 새 버전으로 업데이트되었습니다.', '최신버전 보기', () => {
          localStorage.setItem(STORAGE_KEY, latest);
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.update()));
          }
          location.reload();
        });
      } else if (showInitialNotice) {
        // No-op by default. Kept for future status UI.
      }
    } catch (e) {
      console.warn('[FAQ] update check skipped:', e.message);
    }
  }

  async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    try {
      const reg = await navigator.serviceWorker.register('./service-worker.js', { updateViaCache: 'none' });
      reg.update();
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'FAQ_UPDATED') {
          checkVersion(false);
        }
      });
      setInterval(() => reg.update(), CHECK_INTERVAL_MS);
    } catch (e) {
      console.warn('[FAQ] service worker registration failed:', e.message);
    }
  }

  window.addEventListener('load', () => {
    registerServiceWorker();
    checkVersion(false);
    setInterval(() => checkVersion(false), CHECK_INTERVAL_MS);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) checkVersion(false);
    });
  });
})();
