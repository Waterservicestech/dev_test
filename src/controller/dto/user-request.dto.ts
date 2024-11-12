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