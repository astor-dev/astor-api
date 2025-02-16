import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/applications/auth/auth.module';
import { GithubModule } from 'src/applications/github/github.module';
import { ProjectsModule } from 'src/applications/projects/projects.module';
import { ImagesModule } from 'src/applications/images/images.module';
import { AuthController } from 'src/presentations/rest/auth.controller';
import { ImageController } from 'src/presentations/rest/image.controller';
import { ProjectController } from 'src/presentations/rest/project.controller';
import configuration from 'src/shared/config/configuration';
import { PostsModule } from 'src/applications/posts/posts.module';
import { PostController } from 'src/presentations/rest/post.controller';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    GithubModule,
    ProjectsModule,
    ImagesModule,
    PostsModule,
  ],
  controllers: [
    AuthController,
    ProjectController,
    ImageController,
    PostController,
  ],
  providers: [],
})
export class AppModule {}
