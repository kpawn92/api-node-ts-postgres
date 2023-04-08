import { Request, Response } from 'express';
import { Ok, Forbidden, NotFound, Err } from '../../tools/http.responses';
import { UserEntity } from '../entities/user.entity';
import { UserBodyType } from '../dto/user.dto';
import { Privilegios } from '../types/user.types';
import { encryptPassword } from '../helper/encryp.helper';
import { AppDataSource } from '../../config/data.source';

export const UserManager = AppDataSource.getRepository(UserEntity);

export const getUsers = async (_req: Request, res: Response) => {
    const data = await UserManager.find();
    return Ok(res, data);
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;

        const user = await UserManager.findOneBy({ id });

        return Ok(res, user);
    } catch (e) {
        if (e instanceof Error) return NotFound(res, e.message);
        return Err(res, e);
    }
};

export const createUser = async (
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
        user.role = Privilegios.MODERATOR;

        await UserManager.save(user);

        return Ok(res, 'User saved successfully');
    } catch (e) {
        return Forbidden(res, 'User already exists');
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserManager.findOneBy({ id });
        if (!user) return NotFound(res, 'User not found');

        await UserManager.update({ id }, req.body);
        return Ok(res, 'User updated successfully');
    } catch (e) {
        if (e instanceof Error) return Forbidden(res, e.message);
        return Err(res, e);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await UserManager.delete({ id });
        return Ok(res, result);
    } catch (e) {
        if (e instanceof Error) return Forbidden(res, e.message);
        return Err(res, e);
    }
};
