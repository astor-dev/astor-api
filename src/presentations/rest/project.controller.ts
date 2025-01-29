import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GithubService } from 'src/applications/github/github.service';
import { Project } from 'src/applications/projects/domain/projects';
import { ProjectsService } from 'src/applications/projects/projects.service';
import { CreateProjectUseCaseRequest } from 'src/applications/projects/useCases/CreateProjectUseCase/dto/CreateProjectUseCase.request';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly githubService: GithubService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createProject(
    @Body() request: CreateProjectUseCaseRequest,
  ): Promise<Project> {
    const { project, markdown } =
      await this.projectsService.createProject(request);
    await this.githubService.createOrUpdateFile({
      path: `src/content/projects/${project.frontmatter.projectName}.md`,
      content: markdown,
      message: `chore(content): add ${project.frontmatter.projectName} markdown via API`,
    });
    return project;
  }
}
