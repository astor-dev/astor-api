import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import dayjs from 'dayjs';

@Catch()
@Injectable()
export class AllExceptionFilters implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilters.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpMethod = ctx.getRequest().method;

    const url = httpAdapter.getRequestUrl(ctx.getRequest());

    const httpStatus = this.getHttpStatus(exception);
    const stack =
      exception instanceof Error ? exception.stack : (exception as string);
    const message = exception instanceof Error ? exception.message : exception;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: dayjs().toISOString(),
      path: url,
      error: {
        message: message,
        stack: stack
          ? stack
              .toString()
              .split('\n')
              .map((line) => line.trim())
          : [],
      },
    };

    this.logger.error(`${httpStatus} | ${httpMethod} ${url} | ${message}`);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private getHttpStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    // if (exception instanceof QueryFailedError) {
    //   // 예: SQL 문법 오류, 제약 조건 위반
    //   return HttpStatus.BAD_REQUEST;
    // }
    // if (exception instanceof EntityNotFoundError) {
    //   // 예: 엔터티를 찾지 못했을 때
    //   return HttpStatus.BAD_REQUEST;
    // }
    // 기본값
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getSlackChannel(): string {
    // NOTE: 환경에 따라 슬랙 채널 분리
    return '#alerts-server-500';
  }
}
