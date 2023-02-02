"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const authenticated_middleware_1 = __importDefault(require("./middleware/authenticated.middleware"));
class App {
    constructor(controller, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controller);
        this.initialiseErrorHandling();
    }
    initialiseDatabaseConnection() {
        mongoose_1.default.set('strictQuery', false);
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        mongoose_1.default.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
    initialiseMiddleware() {
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
        this.express.get('/', (_req, res) => {
            return res.send('Express Typescript on Vercel');
        });
    }
    initialiseControllers(controller) {
        controller.forEach((controller) => {
            if (controller.path !== '/users') {
                this.express.use('/api', authenticated_middleware_1.default, controller.router);
            }
            else {
                this.express.use('/api', controller.router);
            }
        });
    }
    initialiseErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`App is listening on port ${this.port}`);
        });
    }
}
exports.default = App;
