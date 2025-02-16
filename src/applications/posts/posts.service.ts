import { Injectable } from '@nestjs/common';
import { Post } from 'src/applications/posts/domain/posts';
import { CreatePostMarkdownUseCase } from 'src/applications/posts/useCases/CreatePostMarkdownUseCase.ts/CreatePostMarkdownUseCase';
import { CreatePostUseCase } from 'src/applications/posts/useCases/CreatePostUseCase/CreatePostUseCase';
import { CreatePostUseCaseRequest } from 'src/applications/posts/useCases/CreatePostUseCase/dto/CreatePostUseCase.request';

@Injectable()
export class PostsService {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly createPostMarkdownUseCase: CreatePostMarkdownUseCase,
  ) {}

  async createPost(request: CreatePostUseCaseRequest): Promise<{
    post: Post;
    markdown: string;
  }> {
    const post = await this.createPostUseCase.execute(request);
    const markdown = await this.createPostMarkdownUseCase.execute(post);
    return { post, markdown };
  }
}
