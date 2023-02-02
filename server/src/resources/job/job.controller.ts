import { StatusCodes } from 'http-status-codes';
import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import { Job, SortQuery } from "./job.interface";
import JobService from "./job.service";
import HttpException from '../../utils/exceptions/http.exception';
import validation from './job.validation';
import validationMiddleware from '../../middleware/validation.middleware';
import { Types } from 'mongoose';

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
                .delete(
                    this.deleteJob
                ),
            this.router.route(`${this.path}/stats`)
                .get(
                    this.getStats
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
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { status, jobType, sort, search, page, limit } = req.query;
        const createdBy = req.user.userId;
        try {
            const allJobs = await this.JobService.getAllJob(
                status as Job['status'],
                jobType as Job['jobType'],
                sort as SortQuery,
                search as string,
                page as string,
                limit as string,
                createdBy as Types.ObjectId
            );
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

    private deleteJob = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const jobId = req.params.id;
            const requestUserId = req.user.userId;
            const message = await this.JobService.deleteJob(jobId, requestUserId);
            res.status(StatusCodes.OK).json({ msg: message });
        } catch (error) {
            next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error).message))
        }
    }

    private getStats = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const requestUserId = req.user.userId;
            const stats = await this.JobService.showStats(requestUserId);
            res.status(StatusCodes.OK).json(stats);
        } catch (error) {
            next(new HttpException(StatusCodes.BAD_REQUEST, (error as Error).message))
        }
    }

}

export default JobController;