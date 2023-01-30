import { Types } from "mongoose";
import checkPermission from "../../utils/checkPermission";
import { AllJobs, Job, JobQueryObject, SortQuery, Stats } from "./job.interface";
import jobModel from "./job.model";
import mongoose from 'mongoose';
import moment from 'moment'

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

    public async getAllJob(
        status: Job['status'],
        jobType: Job['jobType'],
        sort: SortQuery,
        search: string,
        page: string,
        limit: string,
        createdBy: Types.ObjectId
    ): Promise<AllJobs | Error> {
        try {
            const queryObject: Partial<JobQueryObject> = {
                createdBy,
            }

            if (status && status !== 'all') {
                queryObject.status = status;
            }
            if (jobType && jobType !== 'all') {
                queryObject.jobType = jobType;
            }
            if (search) {
                queryObject.position = { $regex: search, $options: 'i' };
            }

            let result = this.job.find(queryObject);

            if (sort === 'latest') {
                result = result.sort('-createdAt');
            }
            if (sort === 'oldest') {
                result = result.sort('createdAt');
            }
            if (sort === 'a-z') {
                result = result.sort('position');
            }
            if (sort === 'z-a') {
                result = result.sort('-position');
            }

            // setup pagination
            const pageQuery = Number(page) || 1;
            const limitQuery = Number(limit) || 10;
            const skip = (pageQuery - 1) * limitQuery;

            result = result.skip(skip).limit(limitQuery);

            const jobs = await result;

            const totalJobs = await this.job.countDocuments(queryObject);
            const numOfPages = Math.ceil(totalJobs / limitQuery);
            return { jobs, totalJobs, numOfPages }
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

    public async showStats(
        requestUserId: Types.ObjectId
    ): Promise<Stats | Error> {
        let stats = await this.job.aggregate([
            { $match: { createdBy: new mongoose.Types.ObjectId(requestUserId) } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ])
        const processStats = stats.reduce<Record<string, string>>((acc, curr) => {
            const { _id: title, count } = curr;
            acc[title] = count;
            return acc;
        }, {});

        const defaultStats = {
            pending: processStats.pending || 0,
            interview: processStats.interview || 0,
            declined: processStats.declined || 0,
        }

        let monthlyApplications = await this.job.aggregate([
            { $match: { createdBy: new mongoose.Types.ObjectId(requestUserId) } },
            {
                $group: {
                    _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 6 },
        ])
        monthlyApplications = monthlyApplications
            .map((item) => {
                const {
                    _id: { year, month },
                    count,
                } = item
                const date = moment()
                    .month(month - 1)
                    .year(year)
                    .format('MMM Y')
                return { date, count }
            })
            .reverse()
        return {
            defaultStats,
            monthlyApplications
        }
    }
}

export default JobService;