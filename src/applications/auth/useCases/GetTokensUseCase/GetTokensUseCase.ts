import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { GetTokensUseCaseRequest } from 'src/applications/auth/useCases/GetTokensUseCase/dto/GetTokensUseCase.request';
import { GetTokensUseCaseResponse } from 'src/applications/auth/useCases/GetTokensUseCase/dto/GetTokensUseCase.response';
import { UseCase } from 'src/shared/core/applications/UseCase';

@Injectable()
export class GetTokensUseCase
  implements UseCase<GetTokensUseCaseRequest, GetTokensUseCaseResponse>
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    request: GetTokensUseCaseRequest,
  ): Promise<GetTokensUseCaseResponse> {
    const { payload } = request;
    const jwtSecret = this.configService.get<string>('jwt.secret');
    const accessTokenExpiresIn = this.configService.get<number>(
      'jwt.accessTokenExpiresIn',
    );
    console.log(accessTokenExpiresIn);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: `${accessTokenExpiresIn}s`,
    });
    const now = dayjs();
    const accessTokenExpiresAt = now.add(accessTokenExpiresIn, 'seconds');

    return {
      accessToken,
      accessTokenExpiresAt,
    };
  }
}
