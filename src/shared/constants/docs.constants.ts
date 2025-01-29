export const PAGINATION_DESCRIPTION = `
커서기반으로 작동하며 최초 탐색 시 페이지 번호는 undefined로 전달해야 합니다.<br>
\`[limit, page, orderBy, additionalOrderOptions]\`를 제외한 쿼리스트링은 **필터링 조건**으로 동작합니다.<br>
orderBy와 additionalOrderOptions는 **항상 함께 전달해야 합니다.**<br>
초기 orderBy는 **PK 기반 내림차순 정렬**이며 orderBy에서 동일한 값이 존재할 경우 PK의 내림차순으로 2차정렬 합니다.<br>
PK가 auto_increment 칼럼인 경우 **최신순** 정렬로 동작합니다.<br>
orderBy 쿼리는 쿼리퍼포먼스가 좋지 않기 때문에 **초기 페이지 렌더링 시 기본값으로는 사용하지 않기**를 권장드립니다.`;
