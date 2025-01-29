import {
  Controller,
  Get,
  Injectable,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from 'src/applications/auth/auth.service';
import { KakaoUserRequest } from 'src/applications/auth/strategies/kakao.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async login(
    @Req() req: KakaoUserRequest,
    @Res() res: Response,
  ): Promise<void> {
    const { accessToken, accessTokenExpiresAt } = await this.authService.login(
      req.user.kakaoId,
    );
    const isProduction = this.configService.get('nodeEnv') === 'production';
    console.log(
      'accessTokenExpiresAt',
      accessTokenExpiresAt.format('YYYY-MM-DD HH:mm:ss'),
    );
    const clientUrl = this.configService.get('clientUrl');
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      expires: accessTokenExpiresAt.toDate(),
      secure: isProduction,
    });
    res.redirect(clientUrl);
  }
}
