interface PostProps {
  id?: number;
  title: string;
  description: string;
  userId: number;
}

export default class Post {

  id?: number;
  title: string;
  description: string;
  userId: number;

  constructor(props: PostProps){
    this.title = props.title;
    this.id = props.id;
    this.description = props.description;
    this.userId = props.userId;
  }
}