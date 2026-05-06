수도권관제센터 FAQ v15.3 배포 패키지

1. v15.3 주요 변경사항
- 업무편람 e-book 화면의 상단 네비게이션은 현재 메뉴명만 표시하도록 단순화했습니다.
- 모바일 환경에서 업무편람 페이지와 쪽넘김 버튼이 하나의 창 안에 보이도록 e-book 화면을 재구성했습니다.
- e-book 하단에 이전 쪽/다음 쪽/쪽 번호 이동 컨트롤을 고정 배치하여 페이지 하단을 읽은 뒤에도 화면을 위로 올리지 않고 페이지를 넘길 수 있습니다.
- 모바일 e-book 화면에서 좌우 드래그로 이전/다음 페이지를 이동할 수 있습니다.
- 모바일 기본 확대 동작을 사용하도록 하고 별도 확대 버튼은 삭제했습니다.
- e-book 키워드 검색 기능을 추가했습니다. 검색어가 포함된 페이지를 찾고, 첫 결과 페이지로 자동 이동하며 결과 목록에서 원하는 페이지를 선택할 수 있습니다.
- 검색 색인 파일 manuals/tms_ebook/search_index.json을 추가했습니다.
- “관제센터 신뢰성시험 수검” 메인 카테고리는 클릭하여 하위 카테고리까지 접근할 수 있도록 유지했습니다.
- “통합시험”, “확인검사”, “상대정확도시험”, “정도검사 vs 신뢰성시험” 하위 카테고리는 업데이트 예정 문구와 명암 처리로 비활성화 상태를 표시합니다.
- 총량관리제도 업무편람은 최종본 반영 전까지 [업데이트 예정] 상태를 유지하고 PDF 원본은 배포 패키지에 포함하지 않습니다.
- service-worker.js 캐시명과 version.json을 v15.3으로 갱신했습니다.

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
  · tms_ebook/search_index.json

3. 배포 방법
- GitHub Pages 등 HTTPS 환경의 동일 폴더에 HTML_package 내부 파일과 폴더를 그대로 업로드합니다.
- 기존 배포본을 교체할 때는 index.html, faq-data.json, version.json, manifest.webmanifest, service-worker.js, icons, images, manuals를 함께 교체해야 합니다.
- service-worker.js 캐시명: keco-faq-v15-3-ebook-mobile-search-disabled-menu-20260506
- 업데이트 시 version.json의 version, release_date, build_id를 함께 수정합니다.
- v15.3 서비스워커는 QR코드 재접속 등 사이트 재진입 시 index.html과 version.json, e-book 검색 색인을 네트워크 우선으로 확인합니다.

4. 업무편람 e-book 관리방법
- 굴뚝 TMS 업무편람 e-book 이미지는 manuals/tms_ebook/ 폴더에서 관리합니다.
- 파일명은 반드시 page-001.jpg, page-002.jpg처럼 3자리 번호를 유지합니다.
- 키워드 검색은 manuals/tms_ebook/search_index.json을 기준으로 작동합니다.
- PDF 원본이 변경되어 페이지 수나 본문이 달라지는 경우 다음 값을 함께 수정합니다.
  1) index.html 안의 MANUAL_DOCS 중 pageCount, pageImagePattern, searchIndexUrl
  2) manuals/tms_ebook/manifest.json의 page_count와 pages 목록
  3) manuals/tms_ebook/search_index.json의 page_count와 pages 텍스트
  4) service-worker.js의 CACHE_NAME
  5) version.json의 version/release_date/build_id
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
- 답변 이미지는 화면 렌더링 시 ?v=APP_BUILD_ID가 자동으로 붙어, 버전만 올리면 동일 파일명 교체 이미지도 새로 내려받도록 구성했습니다.

6. 관리 주의사항
- display_yn=N 문항은 공개용 HTML/JSON에 포함하지 않는 구조를 유지해야 합니다.
- 법령 원문은 팝업에서 textContent 방식으로만 표시되도록 유지하세요.
- 업데이트 알림 방식이 정상 작동하려면 service-worker.js의 CACHE_NAME과 version.json의 build_id를 배포 버전마다 변경해야 합니다.
- 총량관리제도 업무편람 최종본이 확정되면 manuals 폴더에 PDF와 e-book 이미지, 검색 색인을 추가하고 MANUAL_DOCS의 active/url/pageCount/pageImagePattern/searchIndexUrl/downloadName 값을 갱신하면 됩니다.

7. 버전
- 데이터 버전: v15.3-ebook-mobile-search-disabled-menu-20260506
- 앱 버전: v15.3
- 배포일: 2026-05-06
