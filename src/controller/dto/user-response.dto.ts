/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: O ID do usuário.
 *           example: 1
 *         firstName:
 *           type: string
 *           description: O primeiro nome do usuário.
 *           example: João
 *         lastName:
 *           type: string
 *           description: O sobrenome do usuário.
 *           example: Dave
 *         email:
 *           type: string
 *           description: O e-mail do usuário.
 *           example: joaod@gmail.com
 */

export class UserResponseDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  
    constructor(id: number, firstName: string, lastName: string, email: string) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
    }
  }