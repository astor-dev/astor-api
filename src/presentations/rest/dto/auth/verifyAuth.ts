import { ControllerResponse } from 'src/shared/core/presentations/Controller.response';

export class VerifyAuthResponse extends ControllerResponse {
  authenticated: boolean;
}
