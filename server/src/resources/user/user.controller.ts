import Controller from '@/utils/interfaces/controller.interface';
import { Router } from 'express';
class UserController implements Controller {
    public path = '/users';
    public router = Router();
}

export default UserController;