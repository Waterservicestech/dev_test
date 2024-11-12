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