import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { Err } from '../tools/http.responses';

export const SchemaValidator =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction): Response | void => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query,
            });
            return next();
        } catch (e) {
            if (e instanceof ZodError) {
                return res.status(400).json(
                    e.issues.map((issue) => ({
                        path: issue.path,
                        message: issue.message,
                    }))
                );
            }
            return Err(res, e);
        }
    };
