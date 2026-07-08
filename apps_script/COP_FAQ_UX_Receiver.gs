/**
 * COP_FAQ UX Feedback + Usage Receiver v2.0
 * - GitHub Pages FAQ HTML -> Apps Script Web App -> Google Sheets
 * - 개인정보, IP, 위치정보, 기기고유정보를 수집하지 않는 최소항목 수신창구
 * - 피드백: 응답원본
 * - 사용량: 사용량원본
 * - 배포: 배포 > 새 배포 > 웹 앱 > 액세스 권한: 모든 사용자
 */

const RAW_SHEET_NAME = '응답원본';
const SEARCH_FAIL_SHEET_NAME = '실패검색어';
const FAQ_IMPROVE_SHEET_NAME = 'FAQ개선';
const SERVICE_IMPROVE_SHEET_NAME = '서비스개선';
const DASHBOARD_SHEET_NAME = '통계대시보드';
const CODE_SHEET_NAME = '코드표';

const USAGE_RAW_SHEET_NAME = '사용량원본';
const DAILY_STAT_SHEET_NAME = '일별통계';
const MONTHLY_STAT_SHEET_NAME = '월별통계';
const SEARCH_STAT_SHEET_NAME = '검색통계';
const FAQ_VIEW_STAT_SHEET_NAME = 'FAQ열람통계';
const CATEGORY_STAT_SHEET_NAME = '업무분야통계';
const PERFORMANCE_DASHBOARD_SHEET_NAME = '실적대시보드';

const RAW_HEADERS = [
  'received_at', 'feedback_type', 'screen', 'search_keyword', 'faq_id', 'faq_title',
  'category', 'version', 'build_id', 'page_url', 'detail', 'client_time', 'status', 'memo'
];

const USAGE_HEADERS = [
  'received_at', 'event_type', 'screen', 'search_keyword', 'faq_id', 'faq_title',
  'category', 'result_count', 'ebook_id', 'ebook_title', 'version', 'build_id',
  'session_id', 'page_url', 'client_time', 'memo'
];

function doGet(e) {
  setupCopFaqUxSheets_();
  return jsonOutput_({ ok: true, service: 'COP_FAQ_UX_USAGE_RECEIVER', message: 'ready' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    setupCopFaqUxSheets_();
    const payload = parsePayload_(e);
    const type = String(payload.log_type || '').toUpperCase();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (type === 'USAGE') {
      ss.getSheetByName(USAGE_RAW_SHEET_NAME).appendRow(buildUsageRow_(payload));
      return jsonOutput_({ ok: true, saved: true, log_type: 'USAGE' });
    }
    ss.getSheetByName(RAW_SHEET_NAME).appendRow(buildFeedbackRow_(payload));
    return jsonOutput_({ ok: true, saved: true, log_type: 'FEEDBACK' });
  } catch (err) {
    return jsonOutput_({ ok: false, error: String(err && err.message ? err.message : err) });
  } finally {
    lock.releaseLock();
  }
}

function setupCopFaqUxSheets_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const raw = ensureSheet_(ss, RAW_SHEET_NAME, RAW_HEADERS);
  raw.setFrozenRows(1);
  raw.getRange(1, 1, 1, RAW_HEADERS.length).setFontWeight('bold');

  const usage = ensureSheet_(ss, USAGE_RAW_SHEET_NAME, USAGE_HEADERS);
  usage.setFrozenRows(1);
  usage.getRange(1, 1, 1, USAGE_HEADERS.length).setFontWeight('bold');

  const searchFail = ensureSheet_(ss, SEARCH_FAIL_SHEET_NAME, ['검색어', '횟수', '최근접수', '처리상태', '비고']);
  setFormulaIfEmpty_(searchFail, 'A2', '=QUERY(응답원본!A:N,"select D, count(D), max(A) where B = \'검색 결과가 없었어요\' and D is not null group by D order by count(D) desc label D \'검색어\', count(D) \'횟수\', max(A) \'최근접수\'",1)');

  const faqImprove = ensureSheet_(ss, FAQ_IMPROVE_SHEET_NAME, ['FAQ ID', 'FAQ 제목', '개선요청', '횟수', '최근접수', '담당', '완료']);
  setFormulaIfEmpty_(faqImprove, 'A2', '=QUERY(응답원본!A:N,"select E, F, max(K), count(E), max(A) where B = \'답변이 부족했어요\' and E is not null group by E, F order by count(E) desc label E \'FAQ ID\', F \'FAQ 제목\', max(K) \'개선요청\', count(E) \'횟수\', max(A) \'최근접수\'",1)');

  const serviceImprove = ensureSheet_(ss, SERVICE_IMPROVE_SHEET_NAME, ['접수일시', '의견유형', '화면', '의견내용', '버전', '처리상태', '비고']);
  setFormulaIfEmpty_(serviceImprove, 'A2', '=QUERY(응답원본!A:N,"select A, B, C, K, H where B <> \'검색 결과가 없었어요\' and B <> \'답변이 부족했어요\' order by A desc label A \'접수일시\', B \'의견유형\', C \'화면\', K \'의견내용\', H \'버전\'",1)');

  const dashboard = ensureSheet_(ss, DASHBOARD_SHEET_NAME, ['지표', '값']);
  if (dashboard.getRange('A2').isBlank()) {
    dashboard.getRange('A2:B7').setValues([
      ['총 의견수', '=COUNTA(응답원본!A2:A)'],
      ['검색 실패', '=COUNTIF(응답원본!B:B,"검색 결과가 없었어요")'],
      ['답변 개선', '=COUNTIF(응답원본!B:B,"답변이 부족했어요")'],
      ['서비스 개선', '=COUNTIF(응답원본!B:B,"서비스 개선 의견")'],
      ['오류 신고', '=COUNTIF(응답원본!B:B,"오류(오탈자 등)")'],
      ['최근 접수', '=MAX(응답원본!A2:A)']
    ]);
    dashboard.getRange('A10').setValue('TOP10 실패검색어');
    dashboard.getRange('A11').setFormula('=QUERY(응답원본!A:N,"select D, count(D) where B = \'검색 결과가 없었어요\' and D is not null group by D order by count(D) desc limit 10 label D \'검색어\', count(D) \'횟수\'",1)');
    dashboard.getRange('D10').setValue('TOP10 개선요청 FAQ');
    dashboard.getRange('D11').setFormula('=QUERY(응답원본!A:N,"select E, F, count(E) where B = \'답변이 부족했어요\' and E is not null group by E, F order by count(E) desc limit 10 label E \'FAQ ID\', F \'FAQ 제목\', count(E) \'횟수\'",1)');
  }

  const daily = ensureSheet_(ss, DAILY_STAT_SHEET_NAME, ['일자', '이벤트유형', '횟수']);
  setFormulaIfEmpty_(daily, 'A2', '=QUERY({TO_DATE(INT(사용량원본!A2:A)),사용량원본!B2:B},"select Col1, Col2, count(Col2) where Col1 is not null group by Col1, Col2 order by Col1 desc, count(Col2) desc label Col1 \'일자\', Col2 \'이벤트유형\', count(Col2) \'횟수\'",1)');

  const monthly = ensureSheet_(ss, MONTHLY_STAT_SHEET_NAME, ['월', '이벤트유형', '횟수']);
  setFormulaIfEmpty_(monthly, 'A2', '=QUERY({TEXT(사용량원본!A2:A,"yyyy-mm"),사용량원본!B2:B},"select Col1, Col2, count(Col2) where Col1 is not null group by Col1, Col2 order by Col1 desc, count(Col2) desc label Col1 \'월\', Col2 \'이벤트유형\', count(Col2) \'횟수\'",1)');

  const searchStat = ensureSheet_(ss, SEARCH_STAT_SHEET_NAME, ['검색어', '이벤트유형', '횟수', '최근검색']);
  setFormulaIfEmpty_(searchStat, 'A2', '=QUERY(사용량원본!A:P,"select D, B, count(D), max(A) where (B = \'SEARCH_SUCCESS\' or B = \'SEARCH_FAIL\') and D is not null group by D, B order by count(D) desc label D \'검색어\', B \'이벤트유형\', count(D) \'횟수\', max(A) \'최근검색\'",1)');

  const faqView = ensureSheet_(ss, FAQ_VIEW_STAT_SHEET_NAME, ['FAQ ID', 'FAQ 제목', '업무분야', '열람수', '최근열람']);
  setFormulaIfEmpty_(faqView, 'A2', '=QUERY(사용량원본!A:P,"select E, F, G, count(E), max(A) where B = \'FAQ_OPEN\' and E is not null group by E, F, G order by count(E) desc label E \'FAQ ID\', F \'FAQ 제목\', G \'업무분야\', count(E) \'열람수\', max(A) \'최근열람\'",1)');

  const category = ensureSheet_(ss, CATEGORY_STAT_SHEET_NAME, ['업무분야', '이벤트유형', '횟수', '최근이용']);
  setFormulaIfEmpty_(category, 'A2', '=QUERY(사용량원본!A:P,"select G, B, count(G), max(A) where G is not null group by G, B order by count(G) desc label G \'업무분야\', B \'이벤트유형\', count(G) \'횟수\', max(A) \'최근이용\'",1)');

  const perf = ensureSheet_(ss, PERFORMANCE_DASHBOARD_SHEET_NAME, ['지표', '값']);
  if (perf.getRange('A2').isBlank()) {
    perf.getRange('A2:B10').setValues([
      ['전체 이벤트', '=COUNTA(사용량원본!A2:A)'],
      ['FAQ 열람', '=COUNTIF(사용량원본!B:B,"FAQ_OPEN")'],
      ['검색 성공', '=COUNTIF(사용량원본!B:B,"SEARCH_SUCCESS")'],
      ['검색 실패', '=COUNTIF(사용량원본!B:B,"SEARCH_FAIL")'],
      ['검색 실패율', '=IF((B4+B5)=0,0,B5/(B4+B5))'],
      ['e-book 열람', '=COUNTIF(사용량원본!B:B,"EBOOK_OPEN")'],
      ['피드백 클릭', '=COUNTIF(사용량원본!B:B,"FEEDBACK_CLICK")'],
      ['세션 수(임시)', '=COUNTA(UNIQUE(FILTER(사용량원본!M2:M,사용량원본!M2:M<>"")))'],
      ['최근 이벤트', '=MAX(사용량원본!A2:A)']
    ]);
    perf.getRange('A13').setValue('TOP10 검색어');
    perf.getRange('A14').setFormula('=QUERY(사용량원본!A:P,"select D, count(D) where (B = \'SEARCH_SUCCESS\' or B = \'SEARCH_FAIL\') and D is not null group by D order by count(D) desc limit 10 label D \'검색어\', count(D) \'횟수\'",1)');
    perf.getRange('D13').setValue('TOP10 FAQ 열람');
    perf.getRange('D14').setFormula('=QUERY(사용량원본!A:P,"select E, F, count(E) where B = \'FAQ_OPEN\' and E is not null group by E, F order by count(E) desc limit 10 label E \'FAQ ID\', F \'FAQ 제목\', count(E) \'열람수\'",1)');
  }

  const code = ensureSheet_(ss, CODE_SHEET_NAME, ['구분', '코드', '설명']);
  if (code.getLastRow() < 2) {
    code.getRange(2, 1, 21, 3).setValues([
      ['화면', 'HOME', '홈 화면'],
      ['화면', 'MENU', '질문트리/메뉴 화면'],
      ['화면', 'ANSWER', '답변 화면'],
      ['화면', 'SEARCH_FAIL', '검색 결과 없음'],
      ['화면', 'EBOOK', '업무편람 e-book'],
      ['의견유형', '검색 결과가 없었어요', '없는 FAQ 또는 검색 실패'],
      ['의견유형', '답변이 부족했어요', '기존 FAQ 품질 개선'],
      ['의견유형', '서비스 개선 의견', 'UI/UX 및 운영 개선'],
      ['이벤트', 'PAGE_VIEW', '서비스 최초 로딩'],
      ['이벤트', 'HOME_OPEN', '홈 이동'],
      ['이벤트', 'MENU_OPEN', '메뉴/질문트리 이동'],
      ['이벤트', 'FAQ_OPEN', 'FAQ 답변 열람'],
      ['이벤트', 'SEARCH_SUCCESS', '검색 결과 있음'],
      ['이벤트', 'SEARCH_FAIL', '검색 결과 없음'],
      ['이벤트', 'EBOOK_OPEN', '업무편람 e-book 열람'],
      ['이벤트', 'EBOOK_SEARCH_SUCCESS', 'e-book 검색 성공'],
      ['이벤트', 'EBOOK_SEARCH_FAIL', 'e-book 검색 실패'],
      ['이벤트', 'FEEDBACK_CLICK', '의견 보내기 클릭'],
      ['처리상태', '접수', '초기 상태'],
      ['처리상태', '검토중', '담당자 확인 중'],
      ['처리상태', '완료', '반영 또는 종결']
    ]);
  }
}

function ensureSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const mismatch = headers.some((h, i) => current[i] !== h);
  if (mismatch) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  return sheet;
}

function setFormulaIfEmpty_(sheet, a1, formula) {
  const range = sheet.getRange(a1);
  if (range.isBlank()) range.setFormula(formula);
}

function parsePayload_(e) {
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : '';
  if (raw) {
    try { return JSON.parse(raw); } catch (err) {}
  }
  const params = e && e.parameter ? e.parameter : {};
  return Object.assign({}, params);
}

function buildFeedbackRow_(p) {
  const now = new Date();
  return [
    now,
    clean_(p.feedback_type, 60),
    clean_(p.screen, 40),
    clean_(p.search_keyword, 80),
    clean_(p.faq_id, 40),
    clean_(p.faq_title, 180),
    clean_(p.category, 80),
    clean_(p.version, 40),
    clean_(p.build_id, 80),
    clean_(p.page_url, 300),
    clean_(p.detail, 1000),
    clean_(p.client_time, 40),
    '접수',
    ''
  ];
}

function buildUsageRow_(p) {
  const now = new Date();
  return [
    now,
    clean_(p.event_type, 60),
    clean_(p.screen, 40),
    clean_(p.search_keyword, 80),
    clean_(p.faq_id, 40),
    clean_(p.faq_title, 180),
    clean_(p.category, 80),
    cleanNumber_(p.result_count),
    clean_(p.ebook_id, 80),
    clean_(p.ebook_title, 180),
    clean_(p.version, 40),
    clean_(p.build_id, 80),
    clean_(p.session_id, 40),
    clean_(p.page_url, 300),
    clean_(p.client_time, 40),
    clean_(p.detail, 300)
  ];
}

function clean_(value, maxLen) {
  return String(value == null ? '' : value)
    .replace(/[<>]/g, '')
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, maxLen || 300);
}

function cleanNumber_(value) {
  const n = Number(value);
  if (!isFinite(n)) return '';
  return n;
}

function jsonOutput_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
