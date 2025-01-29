import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/applications/auth/auth.service';
import { JwtStrategy } from 'src/applications/auth/strategies/jwt.strategy';
import { KakaoStrategy } from 'src/applications/auth/strategies/kakao.strategy';
import { GetTokensUseCase } from 'src/applications/auth/useCases/GetTokensUseCase/GetTokensUseCase';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn:
            configService.get<number>('jwt.accessTokenExpiresIn') + 's',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, KakaoStrategy, JwtStrategy, GetTokensUseCase],
  exports: [AuthService],
})
export class AuthModule {}
