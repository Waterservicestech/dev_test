import { BadRequestError } from '../utils/errors/bad-request-error';
import { isEmail, isEmpty } from '../utils/string-util';

export class UserDTO {

  constructor(
    public firstName: string,
    public lastName: string,
    public email: string
  ) {
    this.validate(firstName, lastName, email);

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  private validate(firstName: string, lastName: string, email: string): void {
    if (isEmpty(firstName)) throw new BadRequestError('First name is required')
    if (isEmpty(lastName)) throw new BadRequestError('Last name is required')
    if (isEmpty(email) || !isEmail(this.email)) throw new BadRequestError('Invalid email format')
  }
}