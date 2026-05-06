수도권관제센터 FAQ v15.2 배포 패키지

1. v15.2 주요 변경사항
- 굴뚝 원격감시체계 업무편람 표지 클릭 시 PDF 파일을 바로 열거나 다운로드하지 않고, 앱 내부 e-book 화면으로 이동하도록 변경했습니다.
- e-book 화면은 manuals/tms_ebook/page-001.jpg ~ page-334.jpg 페이지 이미지를 사용하며, 이전 쪽/다음 쪽/쪽 이동/확대·축소 기능을 제공합니다.
- PDF 저장은 표지 아래의 “PDF 다운로드” 버튼 또는 e-book 화면의 “PDF 다운로드” 버튼으로만 수행되도록 분리했습니다.
- 총량관리제도 업무편람은 최종본 반영 전까지 [업데이트 예정] 상태로 비활성화하고 PDF 원본은 배포 패키지에 포함하지 않습니다.
- 업데이트 안내 팝업에 배포 버전과 배포일을 표시하고, 사용자가 “최신버전으로 업데이트” 버튼을 누를 때만 캐시 정리 후 새로고침하도록 개선했습니다.
- version.json을 추가하여 최신 버전 확인 기준 파일로 사용합니다.
- service-worker.js는 QR코드 재접속 등 사이트 재진입 시 index.html에 대해 network-first 전략을 적용하여 사용자의 수동 캐시관리 없이 최신 페이지를 우선 확인합니다.
- 사업장대기오염물질관리시스템 답변 화면 이미지 관리방법을 아래 5번 항목에 추가했습니다.
- 메인메뉴에 “관제센터 신뢰성시험 수검” 카테고리를 추가하고, 하위 카테고리 “통합시험”, “확인검사”, “상대정확도시험”, “정도검사 vs 신뢰성시험”은 업데이트 예정으로 비활성화했습니다.

2. 포함 파일
- index.html
- faq-data.json
- version.json
- manifest.webmanifest
- service-worker.js
- icons/
- images/
- manuals/
  · tms_remote_monitoring_manual_2025.pdf
  · cover_tms_remote_monitoring_manual_2025.jpg
  · cover_total_management_manual_2026.jpg
  · tms_ebook/page-001.jpg ~ page-334.jpg
  · tms_ebook/manifest.json

3. 배포 방법
- GitHub Pages 등 HTTPS 환경의 동일 폴더에 HTML_package 내부 파일과 폴더를 그대로 업로드합니다.
- 기존 배포본을 교체할 때는 index.html, faq-data.json, version.json, manifest.webmanifest, service-worker.js, icons, images, manuals를 함께 교체해야 합니다.
- service-worker.js 캐시명: keco-faq-v15-2-ebook-update-versioned-images-20260506
- 업데이트 시 version.json의 version, release_date, build_id를 함께 수정합니다.
- 사용자가 기존 캐시를 지우지 않아도 v15.2 이후의 service-worker는 사이트 재진입 시 최신 index.html을 우선 확인합니다. 다만 v15.1 이하의 기존 캐시 사용자는 최초 1회 업데이트 팝업이 표시될 수 있으며, 버튼 클릭 후 v15.2 전략이 적용됩니다.

4. 업무편람 e-book 관리방법
- 굴뚝 TMS 업무편람 e-book 이미지는 manuals/tms_ebook/ 폴더에서 관리합니다.
- 파일명은 반드시 page-001.jpg, page-002.jpg처럼 3자리 번호를 유지합니다.
- PDF 원본이 변경되어 페이지 수가 달라지는 경우 다음 값을 함께 수정합니다.
  1) index.html 안의 MANUAL_DOCS 중 pageCount
  2) manuals/tms_ebook/manifest.json의 page_count와 pages 목록
  3) service-worker.js의 CACHE_NAME
  4) version.json의 version/release_date/build_id
- e-book 이미지는 최초 화면부담을 줄이기 위해 첫 페이지와 표지만 초기 캐시하고, 나머지는 사용자가 열람할 때 순차 캐시합니다.

5. 사업장대기오염물질관리시스템 답변 이미지 관리방법
- 답변 화면 이미지는 HTML_package/images/ 폴더에서 관리합니다.
- 관리자는 아래 고정 파일명으로 이미지를 교체하면 HTML 템플릿과 faq-data.json의 기존 경로가 그대로 유지되어 자동 반영됩니다.
- 이미지 교체 시 HTML 구조나 JSON 경로를 수정할 필요가 없습니다. 단, 파일명은 그대로 유지해야 합니다.

  FAQ-D-001_system_address.jpg              : 시스템 주소/접속 안내
  FAQ-D-002_login_flow.jpg                  : 로그인 흐름
  FAQ-D-003_mobile_login.jpg                : 모바일 접속
  FAQ-D-004_account_type.jpg                : 계정 구분
  FAQ-D-005_center_contact.jpg              : 관제센터 문의/연락 관련 화면
  FAQ-D-006_primary_manager_change.jpg      : 정 담당자 변경
  FAQ-D-007_secondary_manager.jpg           : 부 담당자 지정
  FAQ-D-008_signup_approval.jpg             : 회원가입 승인
  FAQ-D-009_notification_service.jpg        : 알림서비스 등록
  FAQ-D-010_permit_card_upload.jpg          : 허가증/TMS 관리카드 업로드
  FAQ-D-011_forecast_level.jpg              : 예보수준 설정
  FAQ-D-012_received_data.jpg               : 수신자료 조회
  FAQ-D-013_charge_lookup.jpg               : 기본·초과부과금 조회
  FAQ-D-014_remote_search_history.jpg       : 원격검색이력 조회

- 권장 교체 절차
  1) 새 캡처 이미지를 같은 파일명으로 images/ 폴더에 덮어씁니다.
  2) index.html의 APP_BUILD_ID를 새 배포버전으로 변경합니다.
  3) service-worker.js의 CACHE_NAME을 새 배포버전으로 변경합니다.
  4) version.json의 version, release_date, build_id를 새 배포정보로 변경합니다.
  5) HTML_package 전체를 재업로드합니다.
- 같은 파일명만 교체하고 버전을 올리지 않으면 사용자의 브라우저 또는 service-worker가 예전 이미지를 계속 보여줄 수 있습니다. 따라서 이미지 교체 후에는 반드시 버전 업데이트가 필요합니다.
- v15.2부터 답변 이미지는 화면 렌더링 시 ?v=APP_BUILD_ID가 자동으로 붙어, 버전만 올리면 동일 파일명 교체 이미지도 새로 내려받도록 구성했습니다.

6. 관리 주의사항
- display_yn=N 문항은 공개용 HTML/JSON에 포함하지 않는 구조를 유지해야 합니다.
- 법령 원문은 팝업에서 textContent 방식으로만 표시되도록 유지하세요.
- 업데이트 알림 방식이 정상 작동하려면 service-worker.js의 CACHE_NAME과 version.json의 build_id를 배포 버전마다 변경해야 합니다.
- 총량관리제도 업무편람 최종본이 확정되면 manuals 폴더에 PDF와 e-book 이미지를 추가하고 MANUAL_DOCS의 active/url/pageCount/pageImagePattern/downloadName 값을 갱신하면 됩니다.

7. 버전
- 데이터 버전: v15.2-ebook-update-versioned-images-new-menu-20260506
- 앱 버전: v15.2
- 배포일: 2026-05-06
