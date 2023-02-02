"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const register = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required(),
    lastName: joi_1.default.string().min(3).max(30).required(),
    location: joi_1.default.string().min(3).max(30),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(3).max(30).required(),
});
const login = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(3).max(30).required(),
});
const updateUser = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required(),
    lastName: joi_1.default.string().min(3).max(30).required(),
    location: joi_1.default.string().min(3).max(30),
    email: joi_1.default.string().email().required(),
});
exports.default = { register, login, updateUser };
