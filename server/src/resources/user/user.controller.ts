import { NextFunction, Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import authenticatedMiddleware from '../../middleware/authenticated.middleware';
import validationMiddleware from '../../middleware/validation.middleware';
import HttpException from '../../utils/exceptions/http.exception';
import Controller from '../../utils/interfaces/controller.interface';
import UserService from './user.service';
import validation from './user.validation';
class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validation.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validation.login),
            this.login
        );
        this.router.post(
            `${this.path}/update`,
            validationMiddleware(validation.updateUser),
            authenticatedMiddleware,
            this.update
        );
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { name, lastName, location, email, password } = req.body;
            const userCreated = await this.UserService.register(
                name,
                lastName,
                location,
                email,
                password
            );
            res.status(StatusCodes.CREATED).json(userCreated);
        } catch (error) {
            next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error).message))
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const userLoggedIn = await this.UserService.login(email, password);
            res.status(StatusCodes.CREATED).json(userLoggedIn);
        } catch (error) {
            next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error).message))
        }
    }

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { body: { name, lastName, location, email }, user: { userId } } = req;
            const userUpdated = await this.UserService.updateUser(
                userId,
                name,
                lastName,
                location,
                email
            );
            res.status(StatusCodes.OK).json(userUpdated);

        } catch (error) {
            next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error).message))
        }
    }
}

export default UserController;