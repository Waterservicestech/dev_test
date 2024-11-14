import { number, object, string, TypeOf } from 'zod';

export const createPostSchema = object({
    body: object({
        title: string({ required_error: 'Title is required' })
            .max(100, 'Title is too long'),
        description: string({ required_error: 'Description is required' })
            .max(100, 'Description is too long'),
        userId: number().optional()
    })
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;
