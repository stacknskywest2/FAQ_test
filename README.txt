# v16.3.2_패키지

## 1. 기준 및 목적

- 기준 버전: v16.3.1
- 생성 버전: v16.3.2
- 목적: Google Apps Script 및 Google Sheets 운영계정이 변경되어도 서비스가 유연하게 대응할 수 있도록 endpoint 설정을 분리

## 2. 주요 변경사항

1. `feedback-config.json` 신규 추가
   - Apps Script Web App URL을 `index.html`에서 분리했습니다.
   - 담당자 또는 운영계정 변경 시 새 Web App URL을 `feedback-config.json`의 `primary_endpoint`에만 반영하면 됩니다.

2. `index.html` 보정
   - 서비스 시작 시 `feedback-config.json`을 먼저 읽고 수신창구 URL을 적용합니다.
   - config 로드 실패 시 v16.3.1에서 사용한 기존 Apps Script URL을 fallback으로 사용합니다.

3. `service-worker.js` 보정
   - `feedback-config.json`은 network-first로 조회합니다.
   - URL 변경 시 캐시에 갇히지 않도록 `index.html`에서 cache-busting query를 붙여 읽습니다.

4. 운영문서 추가
   - `docs/계정변경_대응_운영절차_v16.3.2.md`
   - `docs/장기기억_운영기준_v16.3.2.md`

## 3. 계정 변경 시 최소 작업

1. 새 운영계정으로 Apps Script 접속
2. 기존 Code.gs 및 Run.gs를 복사 또는 프로젝트 권한 확보
3. 새 운영계정으로 `setupNow`, `testMailNow`, `installTriggersNow` 실행
4. 새 운영계정으로 웹 앱 재배포
5. 새 Web App URL을 `feedback-config.json`의 `primary_endpoint`에 반영
6. GitHub Pages에 `feedback-config.json`만 업로드
7. FAQ 접속, 검색, FAQ 열람 후 `사용량원본` 기록 확인

## 4. 수집 원칙

수집하는 항목:
- 서비스 접속, 검색 성공/실패, FAQ 열람, e-book 열람, 피드백 클릭 등 비식별 이벤트
- FAQ ID, FAQ 제목, 업무분야, 검색어, 버전, 화면 위치

수집하지 않는 항목:
- 이름, 연락처, 사번, IP, 위치정보, 기기 고유정보, Google 계정 정보, 브라우저 fingerprint

## 5. 배포 후 확인

- `feedback-config.json`이 GitHub Pages 배포 경로에 포함되어 있는지 확인
- 서비스 접속 후 Google Sheets `사용량원본`에 `PAGE_VIEW` 또는 사용 이벤트가 쌓이는지 확인
- 검색 실패 1회, FAQ 열람 1회, e-book 열람 1회 테스트
- `메일발송이력` 시트의 트리거 설치 및 테스트 메일 기록 확인
