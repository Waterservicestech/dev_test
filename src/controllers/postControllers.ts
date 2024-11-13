import { Request, Response } from 'express';
import PostService from '../services/postService';
import { httpLogger } from '../middlewares/logger';

export const createPost = async (req: Request, res: Response) => {
  const { title, description, userId } = req.body;

  if (!title || !description || !userId) {
    const errorMessage = 'Missing required fields';
    httpLogger.error(errorMessage, { body: req.body });
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const post = await PostService.createPost(title, description, userId);
    httpLogger.info('Post created successfully', { post });
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = `Error creating post: ${error.message}`;
      httpLogger.error(errorMessage, { userId });
      res.status(500).json({ message: errorMessage });
    } else {
      const errorMessage = 'An unknown error occurred while creating post';
      httpLogger.error(errorMessage, { userId });
      res.status(500).json({ message: errorMessage });
    }
  }
};

export const getPosts = async (req: Request, res: Response) => {
  const { title } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const { posts, total } = await PostService.getPosts(title as string, page, limit);
    httpLogger.info('Posts retrieved successfully', { title, page, limit, total });
    res.status(200).json({ posts, total, page, limit });
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = `Error fetching posts: ${error.message}`;
      httpLogger.error(errorMessage, { title, page, limit });
      res.status(500).json({ message: errorMessage });
    } else {
      const errorMessage = 'An unknown error occurred while fetching posts';
      httpLogger.error(errorMessage, { title, page, limit });
      res.status(500).json({ message: errorMessage });
    }
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title && !description) {
    const errorMessage = 'Missing required fields';
    httpLogger.error(errorMessage, { body: req.body });
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const post = await PostService.updatePost(parseInt(id), title, description);
    httpLogger.info('Post updated successfully', { post });
    res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = `Error updating post: ${error.message}`;
      httpLogger.error(errorMessage, { id });
      res.status(500).json({ message: errorMessage });
    } else {
      const errorMessage = 'An unknown error occurred while updating post';
      httpLogger.error(errorMessage, { id });
      res.status(500).json({ message: errorMessage });
    }
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await PostService.deletePost(parseInt(id));
    httpLogger.info('Post deleted successfully', { id });
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = `Error deleting post: ${error.message}`;
      httpLogger.error(errorMessage, { id });
      res.status(500).json({ message: errorMessage });
    } else {
      const errorMessage = 'An unknown error occurred while deleting post';
      httpLogger.error(errorMessage, { id });
      res.status(500).json({ message: errorMessage });
    }
  }
};