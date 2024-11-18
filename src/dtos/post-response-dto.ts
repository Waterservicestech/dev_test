import { Post } from '../entity/Post';

export class PostResponseDTO {
  id: number;
  title: string;
  description: string;
  userId: number;

  constructor(post: Post) {
    this.id = post.id,
      this.title = post.title,
      this.description = post.description,
      this.userId = post.user.id
  }
}