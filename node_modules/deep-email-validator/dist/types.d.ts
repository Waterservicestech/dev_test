declare global {
    interface ObjectConstructor {
        typedKeys<T>(o: T): Array<keyof T>;
    }
}
export declare type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;
