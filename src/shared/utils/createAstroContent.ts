import { AstroContent } from 'src/shared/types/AstroContent';

export function createAstroContent<T extends AstroContent>(
  astroContent: T,
): string {
  // frontmatter 생성
  const frontmatterEntries = Object.entries(astroContent.frontmatter)
    .map(([key, value]) => {
      // 배열인 경우 YAML 형식으로 변환
      if (Array.isArray(value)) {
        return `${key}:\n${value.map((item) => `  - ${item}`).join('\n')}`;
      }
      // 문자열인 경우 따옴표로 감싸기
      return `${key}: "${value}"`;
    })
    .join('\n');

  return `---
${frontmatterEntries}
---

${astroContent.body}`;
}
