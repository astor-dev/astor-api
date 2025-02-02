export const IMAGE_STORAGE = Symbol('IMAGE_STORAGE');

export interface IImageStorage {
  generatePresignedUrl(
    key: string,
    extenstion: string,
    expiresIn?: number,
  ): Promise<string>;

  generateCdnUrl(key: string, ext: string): string;
}
