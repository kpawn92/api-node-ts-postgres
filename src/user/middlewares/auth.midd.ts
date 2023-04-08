import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { UserManager } from '../controller/user.controller';
import { Err, Forbidden, NotFound } from '../../tools/http.responses';

export const BodyLoggin = z.object({
    body: z.object({
        username: z.string().nonempty('Email is required').email(),
        password: z.string().nonempty('Password is required').min(6),
    }),
});

export type SigInBodyType = z.infer<typeof BodyLoggin>['body'];

export const isAutorized = async (
    req: Request<unknown, unknown, SigInBodyType>,
    res: Response,
    next: NextFunction
) => {
    try {
        const username = req.body.username;
        const user = await UserManager.findOneBy({ username });
        if (user === null) return NotFound(res, 'User not autorized');

        req.userID = user.id;
        req.rol = user.role;

        req.profile = {
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
            },
            email: user.username,
            role: user.role,
        };
        return next();
    } catch (e) {
        if (e instanceof Error) return Forbidden(res, e.message);
        return Err(res, e);
    }
};
