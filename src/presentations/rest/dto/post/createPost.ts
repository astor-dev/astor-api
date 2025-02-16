import { Post } from 'src/applications/posts/domain/posts';
import { ControllerResponse } from 'src/shared/core/presentations/Controller.response';

export class CreatePostResponse extends ControllerResponse {
  post: Post;
}
