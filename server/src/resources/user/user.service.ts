import token from "../../utils/token";
import { RegisterUser } from "./user.interface";
import userModel from "./user.model";

class UserService {
    private user = userModel

    public async register(
        name: string,
        lastName: string,
        location: string,
        email: string,
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
                    location: user.location,
                    email: user.email,
                },
                token: jwt,
            };
            return userCreated;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    public async login(
        email: string,
        password: string,
    ): Promise<RegisterUser | Error> {
        try {
            if (!email || !password) throw new Error("Please provide all values !");
            const userLoggedIn = await this.user.findOne({email}).select('+password');
            if (!userLoggedIn) throw new Error('Invalid Credential');
            const isPasswordCorrect = userLoggedIn.comparePassword(password);
            if (!isPasswordCorrect) throw new Error('Invalid Credential');
            const jwt = token.createJWT(userLoggedIn);
            const userCreated: RegisterUser = {
                user: {
                    name: userLoggedIn.name,
                    lastName: userLoggedIn.lastName,
                    location: userLoggedIn.location,
                    email: userLoggedIn.email,
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