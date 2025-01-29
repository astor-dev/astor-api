import { ProjectFrontmatter } from 'src/applications/projects/domain/projects';

export interface CreateProjectUseCaseRequest {
  frontmatter: ProjectFrontmatter;
  body: string;
}
