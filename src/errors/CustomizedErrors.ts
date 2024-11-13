export class NotFoundUserByIdError extends Error{

    public readonly statusCode: number;

    constructor(msg: string, statusCode: number){
        super(msg)
        this.statusCode = statusCode;
    }
}

export class EmptyFieldError extends Error{
    public readonly statusCode: number;
    
    constructor(msg: string, statusCode: number){
        super(msg)
        this.statusCode = statusCode;
    }
}

export class EmailFormatInvalid extends Error{
    public readonly statusCode: number;
    
    constructor(msg: string, statusCode: number){
        super(msg)
        this.statusCode = statusCode;
    }
}