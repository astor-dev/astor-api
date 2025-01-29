import { ApiProperty } from '@nestjs/swagger';
import { ProjectFrontmatter } from 'src/applications/projects/domain/projects';

// 편의상 swagger 통합을 위해 클래스로 정의합니다.
export class CreateProjectUseCaseRequest {
  @ApiProperty()
  frontmatter: ProjectFrontmatter;

  @ApiProperty()
  body: string;
}
