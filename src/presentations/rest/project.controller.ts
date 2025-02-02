import { Body, Controller, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GithubService } from 'src/applications/github/github.service';
import { ProjectsService } from 'src/applications/projects/projects.service';
import { CreateProjectUseCaseRequest } from 'src/applications/projects/useCases/CreateProjectUseCase/dto/CreateProjectUseCase.request';
import { CreateProjectResponse } from 'src/presentations/rest/dto/project/createProject';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly githubService: GithubService,
  ) {}

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async createProject(
    @Body() request: CreateProjectUseCaseRequest,
  ): Promise<CreateProjectResponse> {
    const { project, markdown } =
      await this.projectsService.createProject(request);
    await this.githubService.createOrUpdateFile({
      path: `src/content/projects/${project.frontmatter.projectName}.md`,
      content: markdown,
      message: `chore(content): add ${project.frontmatter.projectName} markdown via API`,
    });
    return {
      ok: true,
      statusCode: HttpStatus.OK,
      project,
    };
  }
}
