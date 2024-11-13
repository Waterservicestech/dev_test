interface UserProps {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
}

export default class User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor(props: UserProps){
      this.firstName = props.firstName;
      this.id = props.id;
      this.lastName = props.lastName;
      this.email = props.email;
    }
}