import { Request, Response } from 'express';
import { UserEntity } from '../entities/user.entity';
import { UserBodyType } from '../dto/user.dto';
import { encryptPassword } from '../helper/encryp.helper';
import { Privilegios } from '../types/user.types';
import { UserManager } from './user.controller';
import { Err, Forbidden, Ok } from '../../tools/http.responses';
import { generateToken } from '../auth/auth.jwt';
import { getEnvironment } from '../../config/env';
import { Configuration } from '../../types/env.keys';

export const singIn = async (req: Request, res: Response) => {
    try {
        const token = generateToken(
            {
                id: req.userID,
                role: req.rol,
            },
            getEnvironment(Configuration.KEY_SECRET) as string
        );
        return Ok(res, { token, profile: req.profile });
    } catch (e) {
        if (e instanceof Error) return Forbidden(res, e.message);
        return Err(res, e);
    }
};

export const singUp = async (
    req: Request<unknown, unknown, UserBodyType>,
    res: Response
) => {
    try {
        const user = new UserEntity();

        const { firstname, lastname, password, username } = req.body;

        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
        user.password = await encryptPassword(password);
        user.role = Privilegios.USER;

        const saveUser = await UserManager.save(user);

        const KEY_SECRET = <string>getEnvironment(Configuration.KEY_SECRET);

        const token = generateToken(
            {
                id: saveUser.id,
                role: saveUser.role,
            },
            KEY_SECRET
        );

        const profile = {
            id: saveUser.id,
            user: {
                firstname: saveUser.firstname,
                lastname: saveUser.lastname,
            },
            email: saveUser.username,
        };

        return Ok(res, { profile, token });
    } catch (e) {
        if (e instanceof Error) return Forbidden(res, e.message);
        return Err(res, e);
    }
};
