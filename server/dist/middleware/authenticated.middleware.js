"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = __importDefault(require("../utils/exceptions/http.exception"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticatedMiddleware(req, res, next) {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer')) {
        return next(new http_exception_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Unauthorized'));
    }
    ;
    const token = bearer.split(' ')[1].trim();
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    }
    catch (error) {
        next(new http_exception_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Unauthorized'));
    }
}
exports.default = authenticatedMiddleware;
