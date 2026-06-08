뚜미 FAQ HTML 패키지 v15.6

1. 실행 파일
- index.html: FAQ 단일 HTML 앱
- faq-data.json: 공개 FAQ 데이터
- manifest.webmanifest: PWA 앱 이름 “뚜미 FAQ”
- service-worker.js: v15.6 캐시 관리
- version.json: 배포 버전 확인 정보

2. v15.6 주요 변경
- CAT_E 업데이트 예정 카테고리와 하위 메뉴 4개 삭제
- 질문·답변 기준 관련법령 DB 재검토 및 오연결 조문 수정
- 사용방법에 Android/iPhone “앱으로 저장” 절차 추가
- 앱 이름을 “뚜미 FAQ”로 변경
- 첫 화면 문구를 “굴뚝 도우미 뚜미의 FAQ”로 변경하고 ‘뚝’, ‘미’를 강조
- index.html을 단순한 상태/렌더 함수 중심 구조로 재작성

3. 배포 전 확인
- index.html, faq-data.json, manifest.webmanifest, service-worker.js, version.json을 함께 배포
- 배포 후 브라우저에서 버전 확인 버튼을 눌러 v15.6 표시 확인
- 기존 사용자는 새 service-worker가 적용되도록 새로고침 또는 앱 재실행 필요
