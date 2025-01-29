import { Injectable } from '@nestjs/common';
import { Project } from 'src/applications/projects/domain/projects';
import { CreateProjectUseCaseRequest } from 'src/applications/projects/useCases/CreateProjectUseCase/dto/CreateProjectUseCase.request';
import { UseCase } from 'src/shared/core/applications/UseCase';

@Injectable()
export class CreateProjectUseCase
  implements UseCase<CreateProjectUseCaseRequest, Project>
{
  constructor() {}

  async execute(request: CreateProjectUseCaseRequest): Promise<Project> {
    const { frontmatter, body } = request;
    return new Project(frontmatter, body);
  }
}
