import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { GeneratePresignedUrlUseCase } from 'src/applications/images/applications/useCases/GeneratePresignedUrlUseCase/GeneratePresignedUrlUseCase';
import {
  GeneratePresignedUrlRequestQueries,
  GeneratePresignedUrlResponse,
} from 'src/presentations/rest/dto/image/generatePresignedUrl';

@Controller('image')
export class ImageController {
  constructor(
    private readonly generatePresignedUrlUseCase: GeneratePresignedUrlUseCase,
  ) {}

  @ApiOperation({
    summary: '이미지 업로드를 위한 프리사인드 URL 생성',
    description: 'S3에 이미지를 업로드할 수 있는 프리사인드 URL을 생성합니다.',
  })
  @ApiCreatedResponse({
    description: '201 Created',
    type: GeneratePresignedUrlResponse,
  })
  @UseGuards(AuthGuard('jwt'))
  @Get('presigned-url')
  async generatePresignedUrl(
    @Query() query: GeneratePresignedUrlRequestQueries,
  ): Promise<GeneratePresignedUrlResponse> {
    const generatePresignedUrlUseCaseResponse =
      await this.generatePresignedUrlUseCase.execute({
        keyPrefix: query.key,
        extention: query.extension,
      });

    return {
      ok: true,
      statusCode: HttpStatus.CREATED,
      presignedUrl: generatePresignedUrlUseCaseResponse.presignedUrl,
      cdnUrl: generatePresignedUrlUseCaseResponse.cdnUrl,
    };
  }
}
