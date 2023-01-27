import User from "@/resources/user/user.interface";
import jwt from 'jsonwebtoken';

export const createJWT = (user: User): string => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: process.env.JWT_LIFETIME })
};

export const verifyJWT = (token: string) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload;
    return { userId: payload.userId }
}

export default { createJWT, verifyJWT }