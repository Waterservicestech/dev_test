import { BadRequestError } from '../utils/errors/bad-request-error';
import { isEmpty } from '../utils/string-util';

export class PostDTO {

  constructor(
    public title: string,
    public description: string,
    public userId: number
  ) {
    this.validate(title, description, userId);

    this.title = title;
    this.description = description;
  }

  private validate(title: string, description: string, userId: number): void {
    if (isEmpty(title)) throw new BadRequestError('Title is required')
    if (isEmpty(description)) throw new BadRequestError('Description is required')
    if (isNaN(userId)) throw new BadRequestError('User is required to create a post')
  }
}