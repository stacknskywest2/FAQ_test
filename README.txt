GulttukHelper v16.0.0 intro/update-alert fix

적용 목적
- 서비스 표시 버전은 v16.0.0으로 유지
- 인트로 전용 투명 뚜미 이미지와 잘리지 않는 로고 이미지 적용
- '업데이트가 배포되었습니다' 자동 알림 반복 노출 방지

GitHub Pages에 덮어쓸 파일
/index.html
/version.json
/service-worker.js
/icons/ttumi-intro.png
/icons/keco-logo-intro.png

주의
- faq-data.json, 기존 ttumi-basic.png, 기존 keco-logo.png는 변경하지 않습니다.
- 업데이트 상태 확인은 상단 '업데이트' 버튼을 눌렀을 때만 표시됩니다.
