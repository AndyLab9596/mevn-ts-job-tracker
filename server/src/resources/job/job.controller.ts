import { StatusCodes } from 'http-status-codes';
import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import { Job } from "./job.interface";
import JobService from "./job.service";
import HttpException from '../../utils/exceptions/http.exception';
import validation from './job.validation';
import validationMiddleware from '../../middleware/validation.middleware';

class JobController implements Controller {
    public path = '/job';
    public router = Router();
    private JobService = new JobService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.route(`${this.path}`)
            .post(
                validationMiddleware(validation.createJob),
                this.createJob
            )
            .get(
                this.getAllJob
            ),
        this.router.route(`${this.path}/:id`)
            .patch(
                validationMiddleware(validation.createJob),
                this.updateJob
            )
    }

    private createJob = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const jobObject: Omit<Job, 'createdBy'> = req.body;
            const userId = req.user.userId;
            const jobCreated = await this.JobService.createJob(
                userId,
                jobObject
            );
            res.status(StatusCodes.CREATED).json(jobCreated);
        } catch (error) {
            next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error).message))
        }
    }

    private getAllJob = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const allJobs = await this.JobService.getAllJob();
            res.status(StatusCodes.OK).json(allJobs);
        } catch (error) {
            next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error).message))
        }
    }

    private updateJob = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const jobId = req.params.id;
            const jobObject = req.body;
            const requestUserId = req.user.userId;
            const updatedJob = await this.JobService.updateJob(jobId, jobObject, requestUserId);
            res.status(StatusCodes.OK).json(updatedJob);
        } catch (error) {
            next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error).message))
        }
    }

}

export default JobController;