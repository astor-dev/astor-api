import { AstroJsonContent } from 'src/shared/types/AstroContent';

export function createAstroJsonContent<T extends AstroJsonContent[]>(
  astroContents: T,
): string {
  return JSON.stringify(astroContents.map((astroContent) => astroContent.data));
}
