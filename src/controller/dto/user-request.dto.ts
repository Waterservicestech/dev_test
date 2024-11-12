/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
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

export class UserRequestDTO {
    firstName: string;
    lastName: string;
    email: string;
  
    constructor(firstName: string, lastName: string, email: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
    }
  }