import { Types } from "mongoose";
import { Job } from "./job.interface";
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
}

export default JobService;