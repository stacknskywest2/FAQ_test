수도권관제센터 FAQ v15.1 배포 패키지

1. v15.1 주요 변경사항
- 총량관리제도 업무편람(원본_사업장 대기오염물질 총랸관리제도 업무편람_2026)은 최종본이 아니므로 홈 화면에서 [업데이트 예정] 상태로 비활성화했습니다.
- 비활성화된 총량관리제도 업무편람은 표지 클릭 및 다운로드가 동작하지 않으며, PDF 원본은 HTML 배포 패키지에서 제외했습니다.
- 굴뚝 원격감시체계 업무편람은 표지 이미지를 클릭하면 PDF 원본이 바로 열리도록 변경했습니다.
- 다운로드 기능은 표지 클릭 동작과 분리하여, 표지 아래의 “PDF 다운로드” 버튼으로 제공합니다.
- v15의 사용방법 안내 별도 페이지, 모바일 pull-to-refresh 억제, 서비스워커 업데이트 알림/수동 업데이트 방식은 유지했습니다.

2. 포함 파일
- index.html
- faq-data.json
- manifest.webmanifest
- service-worker.js
- icons/
- images/
- manuals/
  · tms_remote_monitoring_manual_2025.pdf
  · cover_tms_remote_monitoring_manual_2025.jpg
  · cover_total_management_manual_2026.jpg

3. 배포 방법
- GitHub Pages 등 HTTPS 환경의 동일 폴더에 HTML_package 내부 파일과 폴더를 그대로 업로드합니다.
- 기존 배포본을 교체할 때는 index.html, faq-data.json, manifest.webmanifest, service-worker.js, icons, images, manuals를 함께 교체해야 합니다.
- service-worker.js 캐시명: keco-faq-v15-1-manual-total-disabled-direct-pdf-20260506
- 총량관리제도 업무편람 최종본이 확정되면 manuals 폴더에 PDF를 추가하고 MANUAL_DOCS의 active/url/downloadName 값을 갱신하면 됩니다.

4. 관리 주의사항
- display_yn=N 문항은 공개용 HTML/JSON에 포함하지 않는 구조를 유지해야 합니다.
- 법령 원문은 팝업에서 textContent 방식으로만 표시되도록 유지하세요.
- 업데이트 알림 방식이 정상 작동하려면 service-worker.js의 CACHE_NAME을 배포 버전마다 변경해야 합니다.
- PDF 파일이 큰 경우 모바일 최초 접속 부담을 줄이기 위해 서비스워커 초기 캐시에는 표지 이미지만 포함합니다.

5. 버전
- 데이터 버전: v15.1-manual-total-disabled-direct-pdf-download-20260506
- 생성일: 2026-05-06
