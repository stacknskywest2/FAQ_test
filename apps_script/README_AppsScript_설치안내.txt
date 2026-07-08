COP_FAQ UX 피드백 + 사용량 실적관리 Apps Script 수신창구 설치 안내

1. Google Sheets 파일 생성
- Google Drive에서 새 Google Sheets를 만듭니다.
- 파일명 예시: COP_FAQ_UX_사용량_실적관리
- 빈 스프레드시트로 시작합니다.

2. Apps Script 열기
- Google Sheets 상단 메뉴에서 [확장 프로그램] > [Apps Script]를 누릅니다.
- 기본 Code.gs 내용은 모두 삭제합니다.
- 패키지의 apps_script/COP_FAQ_UX_Usage_Receiver.gs 내용을 그대로 붙여넣습니다.
- 저장 버튼을 누릅니다.

3. 최초 시트 구성 실행
- Apps Script 편집기 상단 함수 선택 드롭다운에서 setupCopFaqUxSheets_를 선택합니다.
- [실행] 버튼을 누릅니다.
- 권한 승인 창이 뜨면 본인 Google 계정으로 승인합니다.
- 실행 후 Google Sheets에 아래 시트가 생성되는지 확인합니다.
  · 응답원본
  · 실패검색어
  · FAQ개선
  · 서비스개선
  · 통계대시보드
  · 코드표
  · 사용량원본
  · 일별통계
  · 월별통계
  · 검색통계
  · FAQ열람통계
  · 업무분야통계
  · 실적대시보드

4. 웹 앱 배포
- Apps Script 우측 상단 [배포] > [새 배포]를 누릅니다.
- 유형 선택에서 [웹 앱]을 선택합니다.
- 설명: COP_FAQ UX Usage Receiver v2.0
- 실행 권한: 나
- 액세스 권한: 모든 사용자
- [배포]를 누릅니다.
- 생성된 웹 앱 URL을 복사합니다.

5. index.html에 URL 입력
- index.html에서 아래 줄을 찾습니다.

const FEEDBACK_WEBAPP_URL = "";

- 복사한 URL을 아래처럼 넣습니다.

const FEEDBACK_WEBAPP_URL = "https://script.google.com/macros/s/배포ID/exec";

6. GitHub Pages 업로드
- URL 입력이 끝난 index.html과 나머지 패키지 파일을 GitHub Pages 배포 폴더에 업로드합니다.
- 업로드 후 모바일에서 접속하여 검색, 답변 열람, 의견 보내기를 각각 1회 테스트합니다.

7. 정상 수집 확인
- Google Sheets의 사용량원본 시트에 PAGE_VIEW, SEARCH_SUCCESS 또는 SEARCH_FAIL, FAQ_OPEN 등이 쌓이는지 확인합니다.
- 의견 보내기를 테스트한 경우 응답원본 시트에도 접수되는지 확인합니다.

8. 주의사항
- 이름, 연락처, 사번, IP, 위치정보, 기기 고유정보는 수집하지 않습니다.
- session_id는 브라우저 세션 동안만 유지되는 임시 난수입니다.
- 정확한 순방문자 수가 아니라 세션 기준 이용 추정값으로만 활용합니다.
