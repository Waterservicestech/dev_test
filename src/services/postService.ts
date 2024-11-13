import { postRepository } from '../repositories/postRepository';
import { userRepository } from '../repositories/userRepository';
import { Post } from '../entity/Post';
import { httpLogger } from '../middlewares/logger';
import { Like } from 'typeorm';

class PostService {
  public async createPost(title: string, description: string, userId: number): Promise<Post> {
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      httpLogger.error('User not found', { userId });
      throw new Error('User not found');
    }

    const post = new Post();
    post.title = title;
    post.description = description;
    post.user = user;

    try {
      await postRepository.save(post);
      httpLogger.info('Post created successfully', { post });
      return post;
    } catch (error) {
      httpLogger.error('Error saving post', { error });
      throw new Error('Error saving post');
    }
  }

  public async getPosts(title: string, page: number, limit: number): Promise<{ posts: Post[], total: number }> {
    try {
      const [posts, total] = await postRepository.findAndCount({
        where: title ? { title: Like(`%${title}%`) } : {},
        skip: (page - 1) * limit,
        take: limit,
      });
      return { posts, total };
    } catch (error) {
      httpLogger.error('Error fetching posts', { error });
      throw new Error('Error fetching posts');
    }
  }

  public async getPostById(id: number): Promise<Post | null> {
    try {
      return await postRepository.findOneBy({ id });
    } catch (error) {
      httpLogger.error('Error fetching post by ID', { id, error });
      throw new Error('Error fetching post by ID');
    }
  }

  public async getPostsByUserId(userId: number): Promise<Post[]> {
    try {
      return await postRepository.find({ where: { user: { id: userId } } });
    } catch (error) {
      httpLogger.error('Error fetching posts by user ID', { userId, error });
      throw new Error('Error fetching posts by user ID');
    }
  }

  public async getPostByDescription(description: string): Promise<Post | null> {
    try {
      return await postRepository.findOne({ where: { description } });
    } catch (error) {
      httpLogger.error('Error fetching post by description', { description, error });
      throw new Error('Error fetching post by description');
    }
  }

  public async updatePost(id: number, title: string, description: string): Promise<Post> {
    const post = await postRepository.findOneBy({ id });

    if (!post) {
      httpLogger.error('Post not found', { id });
      throw new Error('Post not found');
    }

    post.title = title;
    post.description = description;

    try {
      await postRepository.save(post);
      httpLogger.info('Post updated successfully', { post });
      return post;
    } catch (error) {
      httpLogger.error('Error updating post', { id, error });
      throw new Error('Error updating post');
    }
  }

  public async deletePost(id: number): Promise<void> {
    const post = await postRepository.findOneBy({ id });

    if (!post) {
      httpLogger.error('Post not found', { id });
      throw new Error('Post not found');
    }

    try {
      await postRepository.remove(post);
      httpLogger.info('Post deleted successfully', { id });
    } catch (error) {
      httpLogger.error('Error deleting post', { id, error });
      throw new Error('Error deleting post');
    }
  }
}

export default new PostService();