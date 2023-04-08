import { z } from 'zod';

export const UserSchema = z.object({
    body: z.object({
        firstname: z.string().nonempty('Name is required'),
        lastname: z.string().nonempty('Lastname is required'),
        username: z.string().nonempty('Email is required').email(),
        password: z.string().nonempty('Password is required').min(6),
    }),
    /* params: z.object({
        ref: z.string().min(3).optional(),
    }), */
});

export type UserBodyType = z.infer<typeof UserSchema>['body'];
// export type UserParamsType = z.infer<typeof UserSchema>['params'];
