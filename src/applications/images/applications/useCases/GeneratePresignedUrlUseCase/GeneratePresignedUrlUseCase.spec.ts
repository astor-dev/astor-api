import { IImageStorage } from "~shared/core/infrastructure/ImageStorage";
import { ImageExtension } from "~shared/enums/ImageExtension.enum";
import { StorageKeyPrefix } from "~shared/enums/StorageKeyPrefix.enum";

import { fakerKO as faker } from "@faker-js/faker";
import { InternalServerErrorException } from "@nestjs/common";
import { GeneratePresignedUrlUseCaseResponse } from "~common/images/applications/GeneratePresignedUrlUseCase/dto/GeneratePresignedUrlUseCase.response";
import { GeneratePresignedUrlUseCase } from "~common/images/applications/GeneratePresignedUrlUseCase/GeneratePresignedUrlUseCase";
import { mock, MockProxy } from "jest-mock-extended";

describe("GeneratePresignedUrlUseCase", (): void => {
  let uut: GeneratePresignedUrlUseCase;
  let imageStorage: MockProxy<IImageStorage>;

  beforeEach(() => {
    imageStorage = mock<IImageStorage>();
    uut = new GeneratePresignedUrlUseCase(imageStorage);
  });

  function givenPresignedUrlGenerated(key: string, extention: string, presignedUrl: string, cdnUrl: string): void {
    imageStorage.generatePresignedUrl.mockResolvedValueOnce(presignedUrl);
    imageStorage.generateCdnUrl.mockReturnValueOnce(cdnUrl);
  }

  function givenPresignedUrlErrorOccurred() {
    imageStorage.generatePresignedUrl.mockRejectedValueOnce(new InternalServerErrorException("Error occurred"));
  }

  function givenCdnUrlErrorOccurred() {
    imageStorage.generateCdnUrl.mockImplementationOnce(() => {
      throw new InternalServerErrorException("Error occurred while generating CDN URL");
    });
  }

  it("defined ?", () => {
    expect(uut).toBeDefined();
  });

  describe("성공이 잘 되는지", (): void => {
    it("잘 생성되는지", async (): Promise<void> => {
      const keyPrefix = StorageKeyPrefix.CONCERTS;
      const extention = ImageExtension.JPG;
      const key = `${keyPrefix}/images/${faker.string.uuid()}`;
      const presignedUrl = faker.image.url();
      const cdnUrl = faker.image.url();
      givenPresignedUrlGenerated(key, extention, presignedUrl, cdnUrl);

      const generatePresignedUrlUseCaseResponse: GeneratePresignedUrlUseCaseResponse = await uut.execute({
        keyPrefix,
        extention,
      });

      expect(generatePresignedUrlUseCaseResponse.presignedUrl).toBeDefined();
      expect(generatePresignedUrlUseCaseResponse.cdnUrl).toBeDefined();
    });
  });

  describe("500 에러가 뜬 경우", (): void => {
    it("Presigned URL 생성 실패 시 500 에러가 뜨는지", async (): Promise<void> => {
      givenPresignedUrlErrorOccurred();
      const keyPrefix = StorageKeyPrefix.CONCERTS;
      const extention = ImageExtension.JPG;
      await expect(uut.execute({ keyPrefix, extention })).rejects.toThrow(InternalServerErrorException);
    });

    it("CDN URL 생성 실패 시 500 에러가 뜨는지", async (): Promise<void> => {
      const keyPrefix = StorageKeyPrefix.CONCERTS;
      const extention = ImageExtension.JPG;
      const presignedUrl = faker.image.url();
      imageStorage.generatePresignedUrl.mockResolvedValueOnce(presignedUrl);
      givenCdnUrlErrorOccurred();

      await expect(uut.execute({ keyPrefix, extention })).rejects.toThrow(InternalServerErrorException);
    });
  });
});
