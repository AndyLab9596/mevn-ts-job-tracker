import { Document } from "mongoose";

export interface User extends Document {
    name: string;
    lastName: string;
    email: string;
    password: string;
    location: string;

    comparePassword: (candidatePassword: string) => Promise<Error | boolean>;
}

export interface RegisterUser {
    user: Pick<User, 'name' | 'lastName' | 'email' | 'location'>;
    token: string;
}