import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import { RegisterUser } from '@/resources/user/user.interface';

class UserService {
    private user = UserModel

    public async register(
        name: string,
        lastName: string,
        email: string,
        location: string,
        password: string,
    ): Promise<RegisterUser | Error> {
        try {
            const isUserExist = await this.user.findOne({ email })
            if (isUserExist) throw new Error('Email is already existed!')

            const user = await this.user.create({
                name,
                lastName,
                email,
                location,
                password
            })
            const jwt = token.createJWT(user);
            const userCreated: RegisterUser = {
                user: {
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    location: user.location,
                },
                token: jwt,
            };
            return userCreated;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}

export default UserService;