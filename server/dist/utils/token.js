"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};
exports.createJWT = createJWT;
const verifyJWT = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return { userId: payload.userId };
};
exports.verifyJWT = verifyJWT;
exports.default = { createJWT: exports.createJWT, verifyJWT: exports.verifyJWT };
