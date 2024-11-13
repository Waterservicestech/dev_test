import { Request, Response } from "express";
import { UserService } from "../service/user.service";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas aos usuários
 */
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Cria um novo usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       500:
   *         description: Erro ao criar usuário
   */
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      return res
        .status(500)
        .json({ message: "Error creating user", error: error });
    }
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Retorna uma lista de usuários
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Lista de usuários
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   *       500:
   *         description: Erro ao buscar usuários
   */
  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching users", error: error });
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Retorna um usuário pelo ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Usuário encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Usuário não encontrado
   *       500:
   *         description: Erro ao buscar usuário
   */
  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.getUserById(Number(req.params.id));
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return res
        .status(500)
        .json({ message: "Error fetching user", error: error });
    }
  }

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Exclui um usuário pelo ID
   *     description: Exclui um usuário pelo ID
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Usuário excluído com sucesso
   *       500:
   *         description: Erro ao excluir usuário
   */
  async deleteUserById(req: Request, res: Response): Promise<Response> {
    try {
      await this.userService.deleteUserById(Number(req.params.id));
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res
        .status(500)
        .json({ message: "Error deleting user", error: error });
    }
  }
}
