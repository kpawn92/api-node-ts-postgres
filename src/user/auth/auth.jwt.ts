import jwt from 'jsonwebtoken';
import { IPayloadUser } from '../types/payload.token';

export const generateToken = (payload: IPayloadUser, key: string): string =>
    jwt.sign(payload, key, {
        expiresIn: 86400,
    });
