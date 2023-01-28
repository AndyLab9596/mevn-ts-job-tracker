import { Types } from "mongoose";
import { AllJobs, Job } from "./job.interface";
import jobModel from "./job.model";

class JobService {
    private job = jobModel

    public async createJob(
        userId: Types.ObjectId,
        jobObject: Omit<Job, 'createdBy'>
    ): Promise<Job | Error> {
        try {
            if (!jobObject.position || !jobObject.company) {
                throw new Error('Please provide all needed value');
            }
            const createdJob = {
                ...jobObject,
                createdBy: userId,
            };
            const job = await this.job.create(createdJob);
            return job;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    public async getAllJob(): Promise<AllJobs | Error> {
        try {
            const jobs = await this.job.find({});
            return {
                jobs,
                totalJobs: jobs.length
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}

export default JobService;