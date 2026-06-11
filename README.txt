뚜미 FAQ v15.6.3 HTML 패키지

/goal: 사용자가 원하는 질문에 도달할 수 있는가

- v15.6.3은 v15.6.2.2를 기준으로 한 최종 배포 전 통합점검 반영 패치입니다.
- 홈 화면 최상위 4개 카테고리 2행 2열 질문트리 게이트웨이 UI는 유지했습니다.
- 공개용 FAQ_DATA와 faq-data.json에서 내부 관리성 메타데이터를 제거했습니다.
- 공개용 데이터에는 질문·답변·검색키워드·관련법령 텍스트·이미지·e-book 연결 등 서비스 표시에 필요한 최소 필드만 유지했습니다.
- service-worker 프리캐시 대상 법령 별표 PDF 6종을 laws 폴더에 포함하여 캐시 대상 파일 누락 문제를 해소했습니다.
- version.json, manifest.webmanifest, index.html 표시 버전, service-worker 캐시명을 v15.6.3 기준으로 일치시켰습니다.
- service-worker 캐시 버전은 ttumi-faq-v15-6-3-20260611입니다.
- 별도 검증보고서: v15.6.3_verification_report.txt
