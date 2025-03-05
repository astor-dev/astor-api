import { Body, Controller, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GithubService } from 'src/applications/github/github.service';
import { PostsService } from 'src/applications/posts/posts.service';
import { CreatePostUseCaseRequest } from 'src/applications/posts/useCases/CreatePostUseCase/dto/CreatePostUseCase.request';
import { CreatePostResponse } from 'src/presentations/rest/dto/post/createPost';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postsService: PostsService,
    private readonly githubService: GithubService,
  ) {}

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async createProject(
    @Body() request: CreatePostUseCaseRequest,
  ): Promise<CreatePostResponse> {
    const { post, markdown } = await this.postsService.createPost(request);
    await this.githubService.createOrUpdateFile({
      path: `src/content/posts/${post.frontmatter.id}.mdx`,
      content: markdown,
      message: `chore(content): add ${post.frontmatter.title} markdown via API`,
    });
    return {
      ok: true,
      statusCode: HttpStatus.OK,
    };
  }
}
