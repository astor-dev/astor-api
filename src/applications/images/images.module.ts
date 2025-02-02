import { Module } from '@nestjs/common';
import { GeneratePresignedUrlUseCase } from 'src/applications/images/applications/useCases/GeneratePresignedUrlUseCase/GeneratePresignedUrlUseCase';
import { IMAGE_STORAGE } from 'src/shared/core/infrastructures/ImageStorage';
import { S3ImageStorage } from 'src/shared/core/infrastructures/storages/S3ImageStorage';

@Module({
  imports: [],
  controllers: [],
  providers: [
    GeneratePresignedUrlUseCase,
    {
      provide: IMAGE_STORAGE,
      useClass: S3ImageStorage,
    },
  ],
  exports: [GeneratePresignedUrlUseCase],
})
export class ImagesModule {}
