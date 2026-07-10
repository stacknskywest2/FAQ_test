# 굴뚝도우미(COP_FAQ)

수도권관제센터 업무를 지원하기 위한 모바일 중심 FAQ 서비스입니다.  
굴뚝 원격감시체계, 사업장 대기오염물질 총량관리제도, 대기오염공정시험기준, 사업장대기오염물질관리시스템 관련 질문을 검색하거나 업무분야별 메뉴로 찾아볼 수 있습니다.

- 현재 배포 버전: `v16.3.2`
- 공개 FAQ: `199문항`
- 배포 방식: 정적 파일 기반 GitHub Pages
- 실행 방식: 별도 빌드 없이 `index.html` 실행
- 운영 데이터: Google Apps Script + Google Sheets

---

## 1. 주요 기능

- FAQ 키워드 검색 및 검색결과 바로가기
- 업무분야별 질문트리 탐색
- FAQ 답변, 근거 요약, 관련 법령·별표 확인
- 사업장대기오염물질관리시스템 화면 이미지 안내
- 굴뚝 원격감시체계·총량관리 업무편람 e-book 열람
- 대기오염공정시험기준 원문 e-book 검색
- 모바일 홈 화면 저장(PWA)
- 라이트·다크모드 지원
- 뚜미 캐릭터 기반 시작 화면
- 비식별 사용량 자동 집계
- 홈·검색 실패·답변 화면의 UX 피드백 수집
- 주간·월간 이용실적 보고서 자동 생성·메일 발송

---

## 2. 서비스 구조

```text
사용자 브라우저
   │
   ├─ FAQ 검색·답변·e-book 열람
   │
   ├─ 사용량 이벤트 자동 전송
   │
   └─ 개선 의견 자발적 제출
          │
          ▼
feedback-config.json
          │
          ▼
Google Apps Script Web App
          │
          ▼
Google Sheets
   ├─ 사용량원본
   ├─ 응답원본
   ├─ 검색·FAQ·업무분야 통계
   └─ 주간·월간 보고서
```

Apps Script Web App 주소는 `index.html`에 직접 고정하지 않고 `feedback-config.json`에서 관리합니다. 운영계정 또는 담당자가 변경되면 새 Web App URL을 발급한 뒤 `primary_endpoint`만 교체합니다.

---

## 3. UX 피드백 수집 방법

### 3.1 수집 위치

| 화면 | 버튼·상황 | 활용 목적 |
|---|---|---|
| 홈 | 의견 보내기 | 서비스·UI 개선 |
| 검색 실패 | 원하는 답변이 없나요? | 신규 FAQ 후보 발굴 |
| 답변 하단 | 답변 개선 의견 보내기 | 기존 FAQ 품질 개선 |

### 3.2 자동 사용량 기록

사용자가 별도로 의견 버튼을 누르지 않아도 다음 이용 이벤트는 자동으로 `사용량원본` 시트에 기록됩니다.

```text
PAGE_VIEW              서비스 접속
HOME_OPEN              홈 화면 이동
MENU_OPEN              메뉴·질문트리 이동
FAQ_OPEN               FAQ 답변 열람
SEARCH_SUCCESS         검색 성공
SEARCH_FAIL            검색 실패
EBOOK_OPEN             e-book 열람
EBOOK_SEARCH_SUCCESS   e-book 검색 성공
EBOOK_SEARCH_FAIL      e-book 검색 실패
FEEDBACK_CLICK         의견 보내기 버튼 클릭
```

### 3.3 자발적 의견 접수

개선 의견의 본문은 사용자가 의견 보내기 버튼을 눌러 입력한 경우에만 `응답원본` 시트에 저장됩니다. 화면에 따라 검색어, FAQ ID, FAQ 제목, 업무분야, 서비스 버전, 화면 위치가 함께 전달됩니다.

수신창구가 일시적으로 동작하지 않으면 `feedback-config.json`에 지정된 Google Form으로 연결되는 fallback 구조를 사용합니다.

### 3.4 수집 항목

```text
수집:
- 이벤트 유형
- 화면 위치
- 검색어
- 검색 결과 수
- FAQ ID·제목
- 업무분야
- e-book ID·제목
- 서비스 버전·빌드 ID
- 세션 기준 임시 난수
- 사용자가 자발적으로 입력한 의견
```

```text
수집하지 않음:
- 이름
- 연락처
- 사번
- IP 주소
- 정확한 위치정보
- 기기 고유정보
- Google 계정 정보
- 브라우저 fingerprint
```

`session_id`는 브라우저 세션 동안만 사용하는 임시 난수입니다. 사용자 식별이나 장기 추적 목적으로 사용하지 않으며, 순방문자 수가 아닌 세션 기준 이용 추정값으로만 활용합니다.

---

## 4. Google Sheets 구성

Apps Script 초기설정 함수 실행 시 다음 시트가 생성됩니다.

```text
응답원본
실패검색어
FAQ개선
서비스개선
통계대시보드
코드표
사용량원본
일별통계
월별통계
검색통계
FAQ열람통계
업무분야통계
실적대시보드
주간보고
월간보고
메일발송이력
```

원본 시트(`응답원본`, `사용량원본`)는 직접 수정하지 않는 것을 원칙으로 합니다. 집계·처리상태·운영메모는 파생 시트에서 관리합니다.

---

## 5. 주간·월간 실적관리

Apps Script 설치형 트리거를 통해 다음 보고서를 자동 발송할 수 있습니다.

- 주간 보고서: 직전 주 이용실적
- 월간 보고서: 직전 월 이용실적
- 주요 지표: 전체 이벤트, FAQ 열람, 검색 성공·실패, 검색 실패율, e-book 열람, 피드백 접수
- 순위 자료: 검색어, 실패검색어, FAQ 열람, 업무분야, 개선요청 FAQ

보고서 수신주소와 발송 일정은 Apps Script 운영설정에서 관리합니다. 설치형 트리거는 생성한 Google 계정에 귀속되므로 운영계정 변경 시 새 계정에서 트리거를 다시 설치해야 합니다.

---

## 6. 파일 구성

```text
HTML_package/
├─ index.html                  # 서비스 본체
├─ faq-data.json               # 공개 FAQ 데이터
├─ feedback-config.json        # Apps Script endpoint·fallback 설정
├─ version.json                # 버전·변경사항
├─ manifest.webmanifest        # PWA 설정
├─ service-worker.js           # 오프라인 캐시·업데이트
├─ README.md                   # 저장소 안내
├─ README.txt                  # 해당 버전 변경요약
├─ icons/                      # 앱·캐릭터·기관 이미지
├─ images/                     # FAQ 답변 이미지
├─ manuals/                    # 업무편람·시험기준 e-book
├─ laws/                       # 법령 별표 PDF
├─ apps_script/                # Apps Script 코드·설치안내
└─ docs/                       # 운영계정 변경·장기운영 기준
```

---

## 7. 배포 방법

### 7.1 기본 배포

1. `HTML_package` 안의 파일을 GitHub 저장소 배포 경로에 업로드합니다.
2. `main` 브랜치에 반영합니다.
3. 저장소의 GitHub Pages 또는 GitHub Actions 배포가 완료될 때까지 기다립니다.
4. 배포 URL에서 최신 버전 표시와 핵심 기능을 확인합니다.

별도 빌드 명령이나 패키지 설치는 필요하지 않습니다.

### 7.2 Apps Script endpoint 설정

`feedback-config.json`의 주요 항목은 다음과 같습니다.

```json
{
  "active": true,
  "primary_endpoint": "https://script.google.com/macros/s/배포ID/exec",
  "secondary_endpoint": "",
  "fallback_form_url": "Google Form 주소",
  "service_version": "v16.3.2"
}
```

운영계정 변경 또는 Apps Script 재배포 시 `primary_endpoint`만 변경하고 `feedback-config.json`을 다시 배포합니다.

---

## 8. Apps Script 최초 설치

패키지의 `apps_script` 폴더를 참고합니다.

1. Google Sheets를 생성합니다.
2. Apps Script 프로젝트를 생성합니다.
3. `Code.gs`에 수신·집계·메일보고 코드를 입력합니다.
4. 모바일 환경에서 실행용 함수가 목록에 보이지 않으면 `Run.gs`를 추가합니다.
5. 아래 함수를 순서대로 실행합니다.

```text
setupNow
testMailNow
installTriggersNow
```

6. 웹 앱으로 배포합니다.
7. 실행 권한은 운영계정, 접근 권한은 서비스 운영방침에 맞게 설정합니다.
8. 발급된 Web App URL을 `feedback-config.json`에 입력합니다.

---

## 9. 운영계정 변경

담당자 이동, 퇴직, 계정 회수 또는 팀 운영계정 전환 시 다음 절차를 적용합니다.

1. 새 운영계정에 Google Sheets·Apps Script 접근 권한을 부여합니다.
2. 새 계정으로 `setupNow`를 실행합니다.
3. 새 계정으로 `testMailNow`를 실행합니다.
4. 새 계정으로 `installTriggersNow`를 실행합니다.
5. 새 계정으로 웹 앱을 재배포합니다.
6. 새 URL을 `feedback-config.json`의 `primary_endpoint`에 반영합니다.
7. GitHub Pages에 설정 파일을 재배포합니다.
8. `사용량원본`, `응답원본`, `메일발송이력`을 확인합니다.

세부 절차는 `docs/계정변경_대응_운영절차_v16.3.2.md`를 따릅니다.

---

## 10. 배포 후 점검

```text
[ ] 버전이 v16.3.2로 표시된다.
[ ] 홈·질문트리·검색·답변 화면이 정상 작동한다.
[ ] 검색 성공 및 검색 실패가 기록된다.
[ ] FAQ 답변 열람이 사용량원본에 기록된다.
[ ] e-book 열람이 기록된다.
[ ] 홈 의견 보내기 버튼이 작동한다.
[ ] 검색 실패 화면에서 의견 접수가 가능하다.
[ ] 답변 하단에서 개선 의견 접수가 가능하다.
[ ] 일별통계·월별통계에 수식 오류가 없다.
[ ] 테스트 메일과 주간·월간 트리거가 정상이다.
[ ] 모바일 라이트·다크모드가 정상이다.
[ ] PWA 업데이트 후 최신 캐시가 적용된다.
```

---

## 11. 장애 확인 순서

### 사용량이 기록되지 않을 때

1. `feedback-config.json`의 `active`와 `primary_endpoint` 확인
2. Apps Script 웹 앱 배포 권한 확인
3. Apps Script 실행 기록 확인
4. `사용량원본`에 새 행이 생기는지 확인
5. 서비스워커 캐시 삭제 또는 앱 업데이트

### 의견이 접수되지 않을 때

1. `응답원본` 확인
2. Apps Script 실행 기록 확인
3. fallback Google Form 연결 확인
4. 입력 길이 및 특수문자 처리 확인

### 통계 시트에 오류가 있을 때

통계 수식 오류와 수신창구 장애를 분리해 판단합니다. `사용량원본` 또는 `응답원본`에 데이터가 누적되고 있다면 수집 기능은 정상이며, 해당 통계 시트의 수식만 보정하면 됩니다.

---

## 12. 보안·공개 원칙

- 공개 가능한 FAQ와 파일만 GitHub Pages에 포함합니다.
- 개인정보·비공개 자료·내부검토 정보는 공개 파일에 넣지 않습니다.
- 검색어와 의견 입력은 길이 제한 및 특수문자 무해화 처리를 적용합니다.
- 외부 스크립트·CDN·API 연결은 최소화합니다.
- Apps Script와 Google Sheets 권한은 최소 인원에게만 부여합니다.
- 운영계정에는 다중인증을 적용합니다.
- 배포 전 `FAQ 서비스 배포 전 10대 보안점검표 v1.1`을 확인합니다.

---

## 13. 버전관리

버전은 기능 변화 규모에 따라 부여하며, 동일 버전 산출물은 함께 관리합니다.

```text
index.html
version.json
manifest.webmanifest
service-worker.js
feedback-config.json
README.md
README.txt
검증보고서
```

현재 버전 `v16.3.2`는 Apps Script Web App URL을 별도 설정 파일로 분리하여 운영계정 변경에 대응하도록 한 운영 유연화 패치입니다.
