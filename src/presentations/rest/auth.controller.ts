import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from 'src/applications/auth/auth.service';
import { KakaoUserRequest } from 'src/applications/auth/strategies/kakao.strategy';
import { VerifyAuthResponse } from 'src/presentations/rest/dto/auth/verifyAuth';

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
    const clientUrl = this.configService.get('clientUrl');
    const clientDomain = clientUrl.split('//')[1].split('/')[0].split(':')[0];
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      expires: accessTokenExpiresAt.toDate(),
      domain: clientDomain,
      secure: isProduction,
    });
    res.cookie('isLoggedIn', true, {
      httpOnly: false,
      expires: accessTokenExpiresAt.toDate(),
      domain: clientDomain,
      secure: isProduction,
    });
    res.redirect(clientUrl);
  }

  @Get('verify')
  @UseGuards(AuthGuard('jwt'))
  async verifyAuth(): Promise<VerifyAuthResponse> {
    return {
      ok: true,
      statusCode: HttpStatus.OK,
      authenticated: true,
    };
  }
}
