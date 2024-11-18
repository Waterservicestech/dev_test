export interface IRepository <T>{
    create(data: Partial<T>): Promise<T>;
}