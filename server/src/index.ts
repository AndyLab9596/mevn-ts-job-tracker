import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from "./app";
import UserController from './resources/user/user.controller';
import JobController from './resources/job/job.controller';

validateEnv();

const app = new App(
    [new UserController(), new JobController()],
    Number(process.env.PORT));
app.listen();