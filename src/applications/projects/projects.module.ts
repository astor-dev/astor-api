import { Module } from '@nestjs/common';
import { ProjectsService } from 'src/applications/projects/projects.service';
import { CreateProjectMarkdownUseCase } from 'src/applications/projects/useCases/CreateProjectMarkdownUseCase.ts/CreateProjectMarkdownUseCase';
import { CreateProjectUseCase } from 'src/applications/projects/useCases/CreateProjectUseCase/CreateProjectUseCase';

@Module({
  imports: [],
  providers: [
    ProjectsService,
    CreateProjectUseCase,
    CreateProjectMarkdownUseCase,
  ],
  controllers: [],
  exports: [ProjectsService],
})
export class ProjectsModule {}
