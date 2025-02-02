import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IImageStorage } from 'src/shared/core/infrastructures/ImageStorage';

export const DEFAULT_PRESIGNED_URL_EXPIRATION = 3600;
export const FAILED_TO_GENERATE_PRESIGNED_URL =
  'failed to generate presigned URL';
export const KEY_AND_EXTENTION_ARE_REQUIRED = 'key and extention are required';

@Injectable()
export class S3ImageStorage implements IImageStorage {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly cdnDomain: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
    this.bucketName = this.configService.get<string>('S3_BUCKET_NAME');
    this.cdnDomain = this.configService.get<string>('CLOUDFRONT_DOMAIN');
  }

  async generatePresignedUrl(
    key: string,
    extention: string,
    expiresIn: number = DEFAULT_PRESIGNED_URL_EXPIRATION,
  ): Promise<string> {
    try {
      if (!key || !extention) {
        throw new InternalServerErrorException(KEY_AND_EXTENTION_ARE_REQUIRED);
      }

      const fullKey = `${key}.${extention}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fullKey,
      });
      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      if (error.message === KEY_AND_EXTENTION_ARE_REQUIRED) throw error;
      throw new InternalServerErrorException(FAILED_TO_GENERATE_PRESIGNED_URL);
    }
  }

  generateCdnUrl(key: string, extention: string): string {
    if (!key || !extention) {
      throw new InternalServerErrorException(KEY_AND_EXTENTION_ARE_REQUIRED);
    }
    return `https://${this.cdnDomain}/${key}.${extention}`;
  }
}
