import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import { User } from "./user.interface";

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide name !'],
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    lastName: {
        type: String,
        required: [true, 'Please provide last name !'],
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        select: false,
        minLength: 3,
        maxLength: 30,
    },
    location: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 30,
        default: 'TP.HCM'
    }
}, { timestamps: true });

UserSchema.pre<User>('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword: typeof this.password): Promise<Error | boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
}

export default model<User>('User', UserSchema);