import { NextFunction, Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
        )
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

}

export default UserController;