import { Types } from "mongoose";
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
            const userLoggedIn = await this.user.findOne({ email }).select('+password');
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

    public async updateUser(
        userId: Types.ObjectId,
        name: string,
        lastName: string,
        location: string,
        email: string,
    ): Promise<RegisterUser | Error> {
        try {
            if (!name || !lastName || !email || !location) throw new Error('Please provide all values !');
            const updatedUser = await this.user.findOne({ _id: userId });
            if (!updatedUser) throw new Error('User not found');
            updatedUser.name = name;
            updatedUser.lastName = lastName;
            updatedUser.email = email;
            updatedUser.location = location;

            await updatedUser.save();
            const jwt = token.createJWT(updatedUser);
            const userCreated: RegisterUser = {
                user: {
                    name: updatedUser.name,
                    lastName: updatedUser.lastName,
                    location: updatedUser.location,
                    email: updatedUser.email,
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