import { Injectable } from '@nestjs/common';
import { Project } from 'src/applications/projects/domain/projects';
import { CreateProjectMarkdownUseCase } from 'src/applications/projects/useCases/CreateProjectMarkdownUseCase.ts/CreateProjectMarkdownUseCase';
import { CreateProjectUseCase } from 'src/applications/projects/useCases/CreateProjectUseCase/CreateProjectUseCase';
import { CreateProjectUseCaseRequest } from 'src/applications/projects/useCases/CreateProjectUseCase/dto/CreateProjectUseCase.request';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly createProjectMarkdownUseCase: CreateProjectMarkdownUseCase,
  ) {}

  async createProject(request: CreateProjectUseCaseRequest): Promise<{
    project: Project;
    markdown: string;
  }> {
    const project = await this.createProjectUseCase.execute(request);
    const markdown = await this.createProjectMarkdownUseCase.execute(project);
    return { project, markdown };
  }
}
