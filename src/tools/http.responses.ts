import { Response } from 'express';
import { HttpStatusCode } from '../types/http.status';

const Ok = (res: Response, data?: any): Response => {
    return res.status(HttpStatusCode.OK).json({
        status: HttpStatusCode.OK,
        statusMsg: 'Success',
        data,
    });
};

const NotFound = (res: Response, data?: any): Response => {
    return res.status(HttpStatusCode.NOT_FOUND).json({
        status: HttpStatusCode.NOT_FOUND,
        statusMsg: 'NotFound',
        error: data,
    });
};

const Unauthorized = (res: Response, data?: any): Response => {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
        status: HttpStatusCode.UNAUTHORIZED,
        statusMsg: 'Unauthorized',
        error: data,
    });
};

const Forbidden = (res: Response, data?: any): Response => {
    return res.status(HttpStatusCode.FORBIDDEN).json({
        status: HttpStatusCode.FORBIDDEN,
        statusMsg: 'Forbidden',
        error: data,
    });
};

const Err = (res: Response, data?: any): Response => {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        statusMsg: 'Internal server error',
        error: data,
    });
};

export { Ok, NotFound, Unauthorized, Forbidden, Err };
