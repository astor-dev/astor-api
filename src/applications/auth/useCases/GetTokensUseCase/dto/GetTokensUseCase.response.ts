import { Dayjs } from 'dayjs';

export interface GetTokensUseCaseResponse {
  accessToken: string;
  accessTokenExpiresAt: Dayjs;
}
