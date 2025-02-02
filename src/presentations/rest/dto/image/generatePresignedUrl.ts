import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ControllerResponse } from 'src/shared/core/presentations/Controller.response';
import { ImageExtension } from 'src/shared/enums/ImageExtension.enum';
import { StorageKeyPrefix } from 'src/shared/enums/StorageKeyPrefix.enum';

export class GeneratePresignedUrlRequestQueries {
  @ApiProperty({
    name: 'key',
    description: '스토리지 저장 시 key prefix',
    example: StorageKeyPrefix.PROJECTS,
    required: true,
    enum: StorageKeyPrefix,
  })
  key: StorageKeyPrefix;

  @ApiProperty({
    name: 'extension',
    description: '저장할 이미지 확장자',
    example: ImageExtension.JPG,
    required: true,
    enum: ImageExtension,
  })
  extension: ImageExtension;
}

export class GeneratePresignedUrlResponse extends ControllerResponse {
  @ApiProperty({
    example: HttpStatus.CREATED,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: '(for put) presignedUrl',
    required: true,
  })
  presignedUrl: string;

  @ApiProperty({
    type: String,
    description: '(for get & create concert) cdnUrl',
    required: true,
  })
  cdnUrl: string;
}
