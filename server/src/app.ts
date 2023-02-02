import express, { Application, Response, Request } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from 'mongoose';
import Controller from './utils/interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import authenticatedMiddleware from './middleware/authenticated.middleware';

class App {
    public express: Application;
    public port: number;

    constructor(controller: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controller);
        this.initialiseErrorHandling();
    }

    private initialiseDatabaseConnection(): void {
        mongoose.set('strictQuery', false);
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        this.express.get('/', (_req: Request, res: Response) => {
            return res.send('Express Typescript on Vercel')
        })
    }

    private initialiseControllers(controller: Controller[]): void {
        controller.forEach((controller: Controller) => {
            if (controller.path !== '/users') {
                this.express.use('/api', authenticatedMiddleware, controller.router);
            } else {
                this.express.use('/api', controller.router);
            }
        })
    }

    private initialiseErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App is listening on port ${this.port}`)
        })
    }
}

export default App;