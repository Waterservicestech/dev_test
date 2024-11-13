/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
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

export class PostRequestDTO {
  title: string;
  description: string;
  userId: number;

  constructor(title: string, description: string, userId: number) {
    this.title = title;
    this.description = description;
    this.userId = userId;
  }
}
