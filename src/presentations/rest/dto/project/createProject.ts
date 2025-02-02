import { Project } from 'src/applications/projects/domain/projects';
import { ControllerResponse } from 'src/shared/core/presentations/Controller.response';

export class CreateProjectResponse extends ControllerResponse {
  project: Project;
}
