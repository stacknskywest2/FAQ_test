수도권관제센터 FAQ PWA 배포 패키지

포함 파일: index.html, manifest.webmanifest, service-worker.js, icons 폴더

배포 조건: 반드시 HTTPS 주소에서 배포해야 합니다. GitHub Pages는 HTTPS가 기본 제공됩니다. file://로 열면 앱 설치와 service-worker가 정상 작동하지 않습니다.

GitHub Pages 업로드: 이 패키지 안의 파일과 icons 폴더를 같은 위치에 그대로 업로드하세요. index.html, manifest.webmanifest, service-worker.js는 같은 폴더에 있어야 합니다.

FAQ 수정 후 재배포: index.html이 바뀌면 service-worker.js의 CACHE_NAME 값을 변경해야 사용자 휴대폰 캐시가 갱신됩니다.

모바일 테스트: Android Chrome은 앱 설치 또는 홈 화면에 추가, iPhone Safari는 공유 > 홈 화면에 추가를 사용합니다.


[추가] 접속 애니메이션 및 FAQ 사용방법 화면 추가, SW 캐시 버전 갱신.
