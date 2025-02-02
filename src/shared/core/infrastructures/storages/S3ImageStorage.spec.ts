import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { fakerKO as faker } from '@faker-js/faker';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mock, MockProxy } from 'jest-mock-extended';
import { S3ImageStorage } from 'src/shared/core/infrastructures/storages/S3ImageStorage';

jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn(),
}));

describe('S3ImageStorage', (): void => {
  let uut: S3ImageStorage;
  let configService: MockProxy<ConfigService>;
  let cdnDomain: string;

  beforeEach(() => {
    configService = mock<ConfigService>();

    configService.get.mockImplementation((key: string) => {
      switch (key) {
        case 'AWS_REGION':
          return 'ap-northeast-2';
        case 'AWS_ACCESS_KEY_ID':
          return 'test-access-key';
        case 'AWS_SECRET_ACCESS_KEY':
          return 'test-secret-key';
        case 'S3_BUCKET_NAME':
          return 'test-bucket';
        case 'CLOUDFRONT_DOMAIN':
          return 'd111111abcdef8.cloudfront.net';
        default:
          return null;
      }
    });
    cdnDomain = configService.get<string>('CLOUDFRONT_DOMAIN');
    uut = new S3ImageStorage(configService);
  });

  function givenGetSignedUrlErrorOccurred() {
    (getSignedUrl as jest.Mock).mockRejectedValueOnce(
      new InternalServerErrorException('Error occurred'),
    );
  }

  it('defined ?', () => {
    expect(uut).toBeDefined();
  });

  describe('성공', (): void => {
    describe('generatePresignedUrl', (): void => {
      it('성공', (): void => {
        const key = `domain/images/${faker.string.uuid()}`;
        const extention = 'jpg';
        const mockPresignedUrl = faker.internet.url();
        (getSignedUrl as jest.Mock).mockResolvedValueOnce(mockPresignedUrl);
        expect(uut.generatePresignedUrl(key, extention)).resolves.toBe(
          mockPresignedUrl,
        );
      });
    });
    describe('generateCdnUrl', (): void => {
      it('성공', (): void => {
        const key = `domain/images/${faker.string.uuid()}`;
        const extention = 'jpg';
        const cdnUrl = `https://${cdnDomain}/${key}.${extention}`;
        expect(uut.generateCdnUrl(key, extention)).toBe(cdnUrl);
      });
    });
  });

  describe('실패', (): void => {
    describe('generatePresignedUrl', (): void => {
      it('getSignedUrl이 실패하면 500 에러가 뜨는 지', async (): Promise<void> => {
        const key = `domain/images/${faker.string.uuid()}`;
        const extention = 'jpg';
        givenGetSignedUrlErrorOccurred();
        await expect(uut.generatePresignedUrl(key, extention)).rejects.toThrow(
          InternalServerErrorException,
        );
      });

      it('key가 없으면 500 에러가 뜨는 지', async (): Promise<void> => {
        const key = '';
        const extention = 'jpg';
        await expect(uut.generatePresignedUrl(key, extention)).rejects.toThrow(
          InternalServerErrorException,
        );
      });

      it('extention이 없으면 500 에러가 뜨는 지', async (): Promise<void> => {
        const key = `domain/images/${faker.string.uuid()}`;
        const extention = '';
        await expect(uut.generatePresignedUrl(key, extention)).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    describe('generateCdnUrl', (): void => {
      it('key가 없으면 500 에러가 뜨는 지', (): void => {
        const key = '';
        const extention = 'jpg';
        expect(() => uut.generateCdnUrl(key, extention)).toThrow(
          InternalServerErrorException,
        );
      });

      it('extention이 없으면 500 에러가 뜨는 지', (): void => {
        const key = `domain/images/${faker.string.uuid()}`;
        const extention = '';
        expect(() => uut.generateCdnUrl(key, extention)).toThrow(
          InternalServerErrorException,
        );
      });
    });
  });
});
