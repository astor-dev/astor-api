import { ApiProperty } from '@nestjs/swagger';
import { PostFrontmatter } from 'src/applications/posts/domain/posts';

// 편의상 swagger 통합을 위해 클래스로 정의합니다.
export class CreatePostUseCaseRequest {
  @ApiProperty()
  frontmatter: PostFrontmatter;

  @ApiProperty()
  body: string;
}
