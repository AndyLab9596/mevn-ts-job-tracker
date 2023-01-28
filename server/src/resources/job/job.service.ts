import { Types } from "mongoose";
import checkPermission from "../../utils/checkPermission";
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

    public async updateJob(jobId: string, jobObject: Omit<Job, 'createdBy'>, requestUserId: Types.ObjectId): Promise<Job | Error> {
        try {
            if (!jobObject.position || !jobObject.company) {
                throw new Error('Please provide all needed value');
            }

            const job = await this.job.findOne({ _id: jobId });

            if (!job) {
                throw new Error(`No job with id ${jobId}`);
            }

            const isAuthorized = checkPermission(requestUserId, job.createdBy);
            if (!isAuthorized) {
                throw new Error('Not authorized');
            }

            const updatedJob = await this.job.findOneAndUpdate({ _id: jobId }, jobObject, {
                new: true,
                runValidators: true,
            })

            return updatedJob as Job;
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    public async deleteJob(jobId: string, requestUserId: Types.ObjectId): Promise<string | Error> {
        try {
            const job = await this.job.findOne({ _id: jobId });

            if (!job) {
                throw new Error(`No job with id ${jobId}`);
            }

            const isAuthorized = checkPermission(requestUserId, job.createdBy);
            if (!isAuthorized) {
                throw new Error('Not authorized');
            }
            await job.remove();
            return 'Success! Job is removed'
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}

export default JobService;