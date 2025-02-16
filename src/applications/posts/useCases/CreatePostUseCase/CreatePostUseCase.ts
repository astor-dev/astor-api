import { Injectable } from '@nestjs/common';
import { Post } from 'src/applications/posts/domain/posts';
import { CreatePostUseCaseRequest } from 'src/applications/posts/useCases/CreatePostUseCase/dto/CreatePostUseCase.request';
import { UseCase } from 'src/shared/core/applications/UseCase';

@Injectable()
export class CreatePostUseCase
  implements UseCase<CreatePostUseCaseRequest, Post>
{
  constructor() {}

  async execute(request: CreatePostUseCaseRequest): Promise<Post> {
    const { frontmatter, body } = request;
    return new Post(frontmatter, body);
  }
}
