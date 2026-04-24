/* FAQ PWA install helper
   Include before </body>: <script src="./install-helper.js"></script>
   It keeps existing FAQ features intact and only adds install guidance/button. */
(function () {
  let deferredPrompt = null;
  const BTN_ID = 'faq-pwa-install-button';
  const GUIDE_ID = 'faq-pwa-install-guide';

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }

  function isIOS() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  }

  function ensureButton() {
    if (document.getElementById(BTN_ID) || isStandalone()) return;
    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.type = 'button';
    btn.textContent = '웹 앱 설치';
    btn.setAttribute('aria-label', 'FAQ 웹 앱 설치');
    btn.style.cssText = [
      'position:fixed','right:16px','bottom:84px','z-index:99998',
      'border:0','border-radius:999px','padding:11px 14px',
      'background:#0b5f9e','color:#fff','font-weight:800','font-size:14px',
      'box-shadow:0 8px 24px rgba(0,0,0,.22)','cursor:pointer'
    ].join(';');
    btn.addEventListener('click', onInstallClick);
    document.body.appendChild(btn);
  }

  function showGuide(message) {
    let guide = document.getElementById(GUIDE_ID);
    if (!guide) {
      guide = document.createElement('div');
      guide.id = GUIDE_ID;
      guide.style.cssText = [
        'position:fixed','left:16px','right:16px','bottom:18px','z-index:99999',
        'padding:14px','border-radius:16px','background:#fff','color:#102033',
        'box-shadow:0 10px 30px rgba(0,0,0,.22)',
        'font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
        'font-size:14px','line-height:1.55','word-break:keep-all'
      ].join(';');
      document.body.appendChild(guide);
    }
    guide.innerHTML = '';
    const text = document.createElement('div');
    text.textContent = message;
    text.style.cssText = 'font-weight:700;margin-right:8px;';
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = '닫기';
    close.style.cssText = 'margin-top:10px;border:0;border-radius:999px;padding:8px 12px;background:#0b5f9e;color:#fff;font-weight:800;';
    close.addEventListener('click', () => guide.remove());
    guide.appendChild(text);
    guide.appendChild(close);
  }

  async function onInstallClick() {
    if (isStandalone()) {
      showGuide('이미 웹 앱으로 설치되어 있습니다.');
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice.catch(() => null);
      deferredPrompt = null;
      if (choice && choice.outcome === 'accepted') {
        const btn = document.getElementById(BTN_ID);
        if (btn) btn.remove();
      }
      return;
    }

    if (isIOS()) {
      showGuide('iPhone/iPad에서는 Safari 하단 공유 버튼을 누른 뒤 “홈 화면에 추가”를 선택하세요.');
    } else {
      showGuide('브라우저 메뉴(⋮)에서 “앱 설치” 또는 “홈 화면에 추가”를 선택하세요. 설치 버튼이 보이지 않으면 HTTPS 주소와 manifest/service-worker 파일 업로드 여부를 확인하세요.');
    }
  }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    ensureButton();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    const btn = document.getElementById(BTN_ID);
    if (btn) btn.remove();
  });

  window.addEventListener('load', () => {
    if (!isStandalone()) ensureButton();
  });
})();
