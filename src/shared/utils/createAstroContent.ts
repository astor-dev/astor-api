import { AstroContent } from 'src/shared/types/AstroContent';

export function createAstroContent<T extends AstroContent>(
  astroContent: T,
): string {
  // frontmatter 생성
  console.log(astroContent.frontmatter);
  const frontmatterEntries = Object.entries(astroContent.frontmatter)
    .map(([key, value]) => {
      // 배열인 경우 YAML 형식으로 변환
      if (Array.isArray(value)) {
        // 배열의 각 요소가 객체인지 확인
        if (
          value.length > 0 &&
          typeof value[0] === 'object' &&
          value[0] !== null
        ) {
          // 객체 배열인 경우 { key: value } 형태로 변환
          return `${key}:\n${value
            .map((item) => {
              const itemEntries = Object.entries(item)
                .map(([itemKey, itemValue]) => `${itemKey}: ${itemValue}`)
                .join(', ');
              return `  - { ${itemEntries} }`;
            })
            .join('\n')}`;
        } else {
          // 일반 배열인 경우
          return `${key}:\n${value.map((item) => `  - ${item}`).join('\n')}`;
        }
      }
      // boolean인 경우 true, false로 변환
      if (typeof value === 'boolean') {
        return `${key}: ${value ? 'true' : 'false'}`;
      }
      // null, undefined 처리
      if (value === null) {
        return `${key}: null`;
      }
      if (value === undefined) {
        return `${key}: undefined`;
      }
      // 문자열인 경우 따옴표로 감싸면서 특수문자 이스케이프
      return `${key}: "${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    })
    .join('\n');

  return `---
${frontmatterEntries}
---

${astroContent.body}`;
}
