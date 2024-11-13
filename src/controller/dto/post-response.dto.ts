/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID do post.
 *           example: 1
 *         title:
 *           type: string
 *           description: O título do post.
 *           example: Meu primeiro post
 *         content:
 *           type: string
 *           description: O conteúdo do post.
 *           example: Este é o conteúdo do post.
 *         userId:
 *           type: integer
 *           description: O ID do usuário que criou o post.
 *           example: 1
 */

export class PostResponseDTO {
  id: number;
  title: string;
  description: string;
  userId: number;

  constructor(id: number, title: string, description: string, userId: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.userId = userId;
  }
}
