수도권관제센터 FAQ v14 배포 패키지

1. 주요 변경사항
- 관련법령은 답변 화면에서 법령명과 조항까지만 표출합니다.
- 법령조회 버튼을 누르면 해당 조항의 원문을 팝업으로 확인할 수 있습니다.
- 팝업의 "답변 화면으로 돌아가기" 버튼으로 원래 답변 화면으로 복귀합니다.
- 사업장대기오염물질관리시스템 카테고리의 답변에는 운영메뉴얼 화면 캡처 이미지를 답변 아래에 표시합니다.
- 대기오염공정시험기준, 사업장대기오염물질관리시스템 답변에서는 추천사항과 관련법령 메뉴를 비표출합니다.

2. 포함 파일
- index.html
- faq-data.json
- manifest.webmanifest
- service-worker.js
- icons/
- images/

3. 배포 방법
- GitHub Pages 등 HTTPS 환경의 동일 폴더에 위 파일과 폴더를 그대로 업로드합니다.
- 기존 파일을 교체할 때는 index.html, faq-data.json, service-worker.js, manifest.webmanifest, icons, images를 함께 교체하세요.
- service-worker.js 캐시명: keco-faq-v14-0-law-popup-system-images-20260430

4. 관리 주의사항
- display_yn=N 문항은 공개용 HTML/JSON에 포함하지 않는 구조를 유지해야 합니다.
- 법령 원문은 팝업에서 textContent 방식으로만 표시되도록 유지하세요.
- 이미지는 원본_시스템_사업장대기오염물질관리시스템 운영메뉴얼_2025.pdf에서 추출한 화면 캡처입니다.

5. 버전
- 데이터 버전: v14.0-law-popup-system-images-20260430
- 생성일: 2026-04-30
