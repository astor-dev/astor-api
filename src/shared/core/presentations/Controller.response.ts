import { ApiProperty } from '@nestjs/swagger';

export class ControllerError {
  @ApiProperty({
    name: 'message',
    description: '에러에 대한 대략적 설명',
    required: true,
  })
  message: string;

  @ApiProperty({
    name: 'stack',
    description: 'error stack',
    required: false,
  })
  stack?: string[];
}

export class ControllerResponse {
  @ApiProperty({
    name: 'statusCode',
    description: 'HTTP status code',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    name: 'ok',
    description: 'Response success',
    required: true,
  })
  ok: boolean;
}

export class ControllerInternalErrorResponse {
  @ApiProperty({
    name: 'statusCode',
    description: 'HTTP status code',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    name: 'ok',
    description: 'Response success',
    required: true,
  })
  ok: boolean;

  @ApiProperty({
    name: 'error',
    description: '에러 정보',
    required: true,
  })
  error: ControllerError;
}
