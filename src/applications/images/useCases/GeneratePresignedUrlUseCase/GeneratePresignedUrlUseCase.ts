import { UseCase } from 'src/shared/core/applications/UseCase';

import { Inject, Injectable } from '@nestjs/common';

import {
  IImageStorage,
  IMAGE_STORAGE,
} from 'src/shared/core/infrastructures/ImageStorage';
import { generateUUID } from 'src/shared/utils/UUID.utils';
import { GeneratePresignedUrlUseCaseRequest } from 'src/applications/images/useCases/GeneratePresignedUrlUseCase/dto/GeneratePresignedUrlUseCase.request';
import { GeneratePresignedUrlUseCaseResponse } from 'src/applications/images/useCases/GeneratePresignedUrlUseCase/dto/GeneratePresignedUrlUseCase.response';

@Injectable()
export class GeneratePresignedUrlUseCase
  implements
    UseCase<
      GeneratePresignedUrlUseCaseRequest,
      GeneratePresignedUrlUseCaseResponse
    >
{
  constructor(
    @Inject(IMAGE_STORAGE)
    private readonly imageStorage: IImageStorage,
  ) {}
  async execute(
    request: GeneratePresignedUrlUseCaseRequest,
  ): Promise<GeneratePresignedUrlUseCaseResponse> {
    const extention = request.extention;
    const key = `${request.keyPrefix}/images/${generateUUID()}`;
    const presignedUrl = await this.imageStorage.generatePresignedUrl(
      key,
      extention,
    );
    const cdnUrl = this.imageStorage.generateCdnUrl(key, extention);
    return {
      presignedUrl,
      cdnUrl,
    };
  }
}
