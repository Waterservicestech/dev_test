import { number, object, string, TypeOf } from 'zod';

export const createPostSchema = object({
    body: object({
        title: string({ required_error: 'Title is required' })
            .min(5, 'Title is too short')
            .max(100, 'Title is too long'),
        description: string({ required_error: 'Description is required' })
            .min(5, 'Description is too short')
            .max(100, 'Description is too long'),
        userId: number({ required_error: 'User ID is required' })
    })
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;
