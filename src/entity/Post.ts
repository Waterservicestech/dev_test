//TODO Crie a entidade de Post

class Post {
    id: number;
    titulo: string;
    descricao: string;
    user: User;


    constructor(id: number, titulo: string, descricao: string, user: User) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.user = user;
    }
}

export default Post;