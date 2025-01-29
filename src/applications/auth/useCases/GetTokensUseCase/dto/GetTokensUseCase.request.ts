import { JwtPayload } from 'src/applications/auth/strategies/jwt.strategy';

export interface GetTokensUseCaseRequest {
  payload: JwtPayload;
}
