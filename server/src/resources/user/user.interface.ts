import { Document } from "mongoose";

export default interface User extends Document {
    name: string;
    lastName: string;
    email: string;
    password: string;
    location: string;

    comparePassword: (candidatePassword: string) => Promise<Error | boolean>;
}