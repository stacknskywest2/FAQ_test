GulttukHelper v16.0.1 - FAQ-D-010 정정 및 패키지 재정의본

기준:
- 현행 사용본: v16.0.0 모바일 앱형 홈 UI 재개발본
- 이번 변경: FAQ-D-010 한 문항의 답변문구와 이미지답변 수정

적용 내용:
- FAQ-D-010 답변 문구: “행정자료-운영현황-정도검사” 메뉴 기준으로 정정
- FAQ-D-010 답변이미지: 업로드된 FAQ-D-010_accuracy_test_p293.jpg 반영
- manuals/tms_ebook/page-293.jpg도 동일 이미지로 동기화
- 업무편람 e-book 책 표지 카드가 “처음 이용한다면” 영역 아래에 표시되도록 재확인
- version.json, manifest.webmanifest, service-worker.js, index.html 버전값을 v16.0.1로 정렬

GitHub Pages 업로드 대상:
- 이 폴더(HTML_package) 안의 파일과 하위폴더 전체
- /index.html
- /faq-data.json
- /version.json
- /service-worker.js
- /manifest.webmanifest
- /icons/*
- /images/*
- /manuals/*
- /laws/*

주의:
- DB_master와 JSON_archive 폴더는 관리·보관용이므로 GitHub Pages 공개 루트에 올리지 마세요.
- 배포 전 service-worker 캐시 갱신 확인을 위해 브라우저 새로고침 또는 앱 업데이트 버튼 테스트를 권장합니다.
