class HttpException {
    public readonly statusCode;
    public readonly name: string = 'HttpException';
    public readonly message: string;
  
    constructor(message: string, statusCode = 400) {
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  export { HttpException };