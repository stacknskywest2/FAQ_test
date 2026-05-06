수도권관제센터 FAQ v15 배포 패키지

1. 주요 변경사항
- 접속할 때마다 표시되던 사용방법 안내창을 제거했습니다.
- FAQ 홈 화면에 사용방법 안내 버튼을 추가하고, 버튼 클릭 시 별도 안내 페이지를 표시합니다.
- FAQ 홈 화면 하단에 업무편람 원본 PDF 열람버튼 2개를 1행 2열로 추가했습니다.
- 업무편람 버튼 이미지는 각 PDF의 1페이지(책 표지)를 렌더링한 JPG입니다.
- PDF 열람 화면에는 앱 내부 보기, 새 창으로 열기, 파일 다운로드 기능을 제공합니다.
- 모바일 최상단 드래그 새로고침을 억제했습니다.
- 새 버전이 준비되면 업데이트 알림을 표시하고, 사용자가 업데이트하기를 눌렀을 때만 새로고침합니다.

2. 포함 파일
- index.html
- faq-data.json
- manifest.webmanifest
- service-worker.js
- icons/
- images/
- manuals/

3. 업무편람 파일
- manuals/tms_remote_monitoring_manual_2025.pdf
  · 화면 표시명: 굴뚝 원격감시체계 업무편람 2025
  · 다운로드 파일명: 원본_굴뚝 원격감시체계 업무편람_2025.pdf
- manuals/total_management_manual_2026.pdf
  · 화면 표시명: 사업장 대기오염물질 총량관리제도 업무편람 2026
  · 다운로드 파일명: 원본_사업장 대기오염물질 총랸관리제도 업무편람_2026.pdf

4. 배포 방법
- GitHub Pages 등 HTTPS 환경의 동일 폴더에 위 파일과 폴더를 그대로 업로드합니다.
- 기존 파일을 교체할 때는 index.html, faq-data.json, service-worker.js, manifest.webmanifest, icons, images, manuals를 함께 교체하세요.
- service-worker.js 캐시명: keco-faq-v15-0-usage-manuals-update-control-20260506
- PDF 원본 파일은 용량이 커서 최초 설치 시 강제 precache하지 않고, 사용자가 열람할 때 동적 캐시됩니다.

5. 관리 주의사항
- display_yn=N 문항은 공개용 HTML/JSON에 포함하지 않는 구조를 유지해야 합니다.
- 법령 원문은 팝업에서 textContent 방식으로만 표시되도록 유지하세요.
- 업무편람 PDF 경로를 바꿀 경우 index.html의 MANUAL_DOCS와 service-worker.js 경로를 함께 수정해야 합니다.
- 업데이트 알림 방식이 유지되려면 service-worker.js에서 install 단계의 자동 skipWaiting을 다시 추가하지 마세요.

6. 버전
- 데이터 버전: v15.0-usage-manuals-update-control-20260506
- 생성일: 2026-05-06
