"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("../../utils/token"));
const user_model_1 = __importDefault(require("./user.model"));
class UserService {
    constructor() {
        this.user = user_model_1.default;
    }
    register(name, lastName, location, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isUserExist = yield this.user.findOne({ email });
                if (isUserExist)
                    throw new Error('Email is already existed!');
                const user = yield this.user.create({
                    name,
                    lastName,
                    email,
                    location,
                    password
                });
                const jwt = token_1.default.createJWT(user);
                const userCreated = {
                    user: {
                        name: user.name,
                        lastName: user.lastName,
                        location: user.location,
                        email: user.email,
                    },
                    token: jwt,
                };
                return userCreated;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !password)
                    throw new Error("Please provide all values !");
                const userLoggedIn = yield this.user.findOne({ email }).select('+password');
                if (!userLoggedIn)
                    throw new Error('Invalid Credential');
                const isPasswordCorrect = userLoggedIn.comparePassword(password);
                if (!isPasswordCorrect)
                    throw new Error('Invalid Credential');
                const jwt = token_1.default.createJWT(userLoggedIn);
                const userCreated = {
                    user: {
                        name: userLoggedIn.name,
                        lastName: userLoggedIn.lastName,
                        location: userLoggedIn.location,
                        email: userLoggedIn.email,
                    },
                    token: jwt,
                };
                return userCreated;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    updateUser(userId, name, lastName, location, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name || !lastName || !email || !location)
                    throw new Error('Please provide all values !');
                const updatedUser = yield this.user.findOne({ _id: userId });
                if (!updatedUser)
                    throw new Error('User not found');
                updatedUser.name = name;
                updatedUser.lastName = lastName;
                updatedUser.email = email;
                updatedUser.location = location;
                yield updatedUser.save();
                const jwt = token_1.default.createJWT(updatedUser);
                const userCreated = {
                    user: {
                        name: updatedUser.name,
                        lastName: updatedUser.lastName,
                        location: updatedUser.location,
                        email: updatedUser.email,
                    },
                    token: jwt,
                };
                return userCreated;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = UserService;
