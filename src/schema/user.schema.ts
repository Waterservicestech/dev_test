import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        firstName: string({ required_error: 'First Name is required' })
            .max(100, 'First Name is too long'),
        lastName: string({ required_error: 'Last Name is required' })
            .max(100, 'Last Name is too long'),
        email: string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email format' })
            .max(100, 'Email is too long'),
    })
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
