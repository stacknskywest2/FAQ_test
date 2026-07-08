# v16.3.1_패키지

## 1. 기준 및 목적

- 기준 버전: v16.3.0
- 생성 버전: v16.3.1
- 목적: Google Apps Script Web App URL을 반영하여 UX 피드백과 사용량·실적관리 자동 수집을 실제 활성화

## 2. 주요 변경사항

1. Apps Script Web App URL 연결
   - index.html의 `FEEDBACK_WEBAPP_URL`에 배포 URL 반영
   - URL: `https://script.google.com/macros/s/AKfycbyrPSIecpUrYCHBnz_ZTPI01ENoqBFqH4q8Z4s-t0nf9jCysiHnxAR-yLZ9Gf6YzaHRBg/exec`

2. 자동 사용량 이벤트 수집 활성화
   - PAGE_VIEW: 서비스 접속
   - HOME_OPEN: 홈 이동
   - MENU_OPEN: 메뉴/질문트리 이동
   - FAQ_OPEN: FAQ 답변 열람
   - SEARCH_SUCCESS: 검색 결과 있음
   - SEARCH_FAIL: 검색 결과 없음
   - EBOOK_OPEN: 업무편람 e-book 열람
   - EBOOK_SEARCH_SUCCESS: e-book 검색 성공
   - EBOOK_SEARCH_FAIL: e-book 검색 실패
   - FEEDBACK_CLICK: 의견 보내기 클릭

3. 의견 보내기 기능 유지
   - 의견 보내기는 자동 로그 저장 조건이 아니라, 사용자가 자발적으로 개선 의견을 남기는 기능입니다.
   - 기본 사용량 이벤트는 의견 보내기를 누르지 않아도 자동 전송됩니다.

4. 주간·월간 보고서 기반 유지
   - Google Apps Script의 `installTriggersNow` 실행으로 설치한 트리거가 주간·월간 보고서를 발송합니다.
   - 수신 메일: `stacknsky_west2@keco.or.kr`

## 3. 수집하지 않는 항목

다음 항목은 수집하지 않습니다.

- 이름
- 연락처
- 사번
- IP
- 위치정보
- 기기 고유정보
- Google 계정 정보
- 브라우저 fingerprint

브라우저 세션 단위 임시 session_id만 사용하며, 장기 사용자 추적용으로 사용하지 않습니다.

## 4. 배포 후 확인

GitHub Pages에 업로드한 뒤 아래 순서로 확인합니다.

1. 서비스 접속
2. 검색 1회 실행
3. 검색 결과 없는 검색어 1회 실행
4. FAQ 답변 1개 열람
5. e-book 버튼 1회 열람
6. 의견 보내기 버튼 1회 클릭

Google Sheets 확인 위치:

- 사용량원본: PAGE_VIEW, SEARCH_SUCCESS, SEARCH_FAIL, FAQ_OPEN, EBOOK_OPEN 등 자동 기록 확인
- 응답원본: 의견 보내기에서 작성한 개선 의견 확인
- 메일발송이력: 테스트 메일 및 트리거 설치 이력 확인

## 5. 검증 항목

- JavaScript 구문 검사
- JSON 파싱
- manifest 파싱
- service-worker 캐시명 갱신
- Apps Script URL 반영 확인
- ZIP 무결성 검사
