import HttpException from '../utils/exceptions/http.exception';
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { Types } from "mongoose";

declare module "express-serve-static-core" {
    interface Request {
        user: { userId: Types.ObjectId }
    }
}
declare module 'express' {
    interface Request {
        user: { userId: Types.ObjectId }
    }
}

function authenticatedMiddleware(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer')) {
        return next(new HttpException(StatusCodes.UNAUTHORIZED, 'Unauthorized'));
    };

    const token = bearer.split(' ')[1].trim();

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        next(new HttpException(StatusCodes.UNAUTHORIZED, 'Unauthorized'));
    }
}

export default authenticatedMiddleware;