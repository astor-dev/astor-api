import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/applications/auth/auth.module';
import { AuthController } from 'src/presentations/rest/auth.controller';
import configuration from 'src/shared/config/configuration';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
