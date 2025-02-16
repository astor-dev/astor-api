import { Module } from '@nestjs/common';
import { PostsService } from 'src/applications/posts/posts.service';
import { CreatePostMarkdownUseCase } from 'src/applications/posts/useCases/CreatePostMarkdownUseCase.ts/CreatePostMarkdownUseCase';
import { CreatePostUseCase } from 'src/applications/posts/useCases/CreatePostUseCase/CreatePostUseCase';

@Module({
  imports: [],
  providers: [PostsService, CreatePostUseCase, CreatePostMarkdownUseCase],
  controllers: [],
  exports: [PostsService],
})
export class PostsModule {}
