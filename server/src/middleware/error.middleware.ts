import HttpException from "@/utils/exceptions/http.exception";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';

function errorMiddleware(error: HttpException, req: Request, res: Response, _next: NextFunction) {
    const status: number = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Something went wrong!!!';
    res.status(status).send({ status, message });
}

export default errorMiddleware;