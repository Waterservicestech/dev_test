import { Request, Response } from 'express';
import { PostService } from '../service/post.service';

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Operações relacionadas aos posts
 */
export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  /**
   * @swagger
   * /posts:
   *   post:
   *     summary: Cria um novo post
   *     description: Adiciona um novo post ao sistema.
   *     tags:
   *       - Posts
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               content:
   *                 type: string
   *     responses:
   *       201:
   *         description: Post criado com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Post'
   *       500:
   *         description: Erro ao criar o post.
   */
  async createPost(req: Request, res: Response): Promise<Response> {
    try {
      const post = await this.postService.createPost(req.body);
      return res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ message: 'Error creating post', error: error });
    }
  }

  /**
   * @swagger
   * /posts:
   *   get:
   *     summary: Retorna todos os posts
   *     description: Obtém uma lista de todos os posts.
   *     tags:
   *       - Posts
   *     responses:
   *       200:
   *         description: Lista de posts retornada com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Post'
   *       500:
   *         description: Erro ao buscar os posts.
   */
  async getPosts(req: Request, res: Response): Promise<Response> {
    try {
      const posts = await this.postService.getPosts();
      return res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ message: 'Error fetching posts', error: error });
    }
  }

  /**
   * @swagger
   * /posts/{id}:
   *   get:
   *     summary: Retorna um post por ID
   *     description: Busca um post específico pelo ID.
   *     tags:
   *       - Posts
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID do post.
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Post encontrado com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Post'
   *       404:
   *         description: Post não encontrado.
   *       500:
   *         description: Erro ao buscar o post.
   */
  async getPostById(req: Request, res: Response): Promise<Response> {
    try {
      const post = await this.postService.getPostById(Number(req.params.id));
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      return res.status(500).json({ message: 'Error fetching post', error: error });
    }
  }
}
