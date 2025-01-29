import { Injectable } from '@nestjs/common';
import { Project } from 'src/applications/projects/domain/projects';
import { UseCase } from 'src/shared/core/applications/UseCase';
import { createAstroContent } from 'src/shared/utils/createAstroContent';

@Injectable()
export class CreateProjectMarkdownUseCase implements UseCase<Project, string> {
  constructor() {}

  async execute(project: Project): Promise<string> {
    const content = createAstroContent(project);
    return content;
  }
}
