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
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const authenticated_middleware_1 = __importDefault(require("../../middleware/authenticated.middleware"));
const validation_middleware_1 = __importDefault(require("../../middleware/validation.middleware"));
const http_exception_1 = __importDefault(require("../../utils/exceptions/http.exception"));
const user_service_1 = __importDefault(require("./user.service"));
const user_validation_1 = __importDefault(require("./user.validation"));
class UserController {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.UserService = new user_service_1.default;
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, lastName, location, email, password } = req.body;
                const userCreated = yield this.UserService.register(name, lastName, location, email, password);
                res.status(http_status_codes_1.StatusCodes.CREATED).json(userCreated);
            }
            catch (error) {
                next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userLoggedIn = yield this.UserService.login(email, password);
                res.status(http_status_codes_1.StatusCodes.CREATED).json(userLoggedIn);
            }
            catch (error) {
                next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message));
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { body: { name, lastName, location, email }, user: { userId } } = req;
                const userUpdated = yield this.UserService.updateUser(userId, name, lastName, location, email);
                res.status(http_status_codes_1.StatusCodes.OK).json(userUpdated);
            }
            catch (error) {
                next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.default.register), this.register);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(user_validation_1.default.login), this.login);
        this.router.patch(`${this.path}/update`, (0, validation_middleware_1.default)(user_validation_1.default.updateUser), authenticated_middleware_1.default, this.update);
    }
}
exports.default = UserController;
