import { Injectable } from '@nestjs/common';
import { Post } from 'src/applications/posts/domain/posts';
import { UseCase } from 'src/shared/core/applications/UseCase';
import { createAstroContent } from 'src/shared/utils/createAstroContent';

@Injectable()
export class CreatePostMarkdownUseCase implements UseCase<Post, string> {
  constructor() {}

  async execute(post: Post): Promise<string> {
    const content = createAstroContent(post);
    return content;
  }
}
