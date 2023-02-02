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
const checkPermission_1 = __importDefault(require("../../utils/checkPermission"));
const job_model_1 = __importDefault(require("./job.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
class JobService {
    constructor() {
        this.job = job_model_1.default;
    }
    createJob(userId, jobObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!jobObject.position || !jobObject.company) {
                    throw new Error('Please provide all needed value');
                }
                const createdJob = Object.assign(Object.assign({}, jobObject), { createdBy: userId });
                const job = yield this.job.create(createdJob);
                return job;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    getAllJob(status, jobType, sort, search, page, limit, createdBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryObject = {
                    createdBy,
                };
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
                const limitQuery = Number(limit) || 6;
                const skip = (pageQuery - 1) * limitQuery;
                result = result.skip(skip).limit(limitQuery);
                const jobs = yield result;
                const totalJobs = yield this.job.countDocuments(queryObject);
                const numOfPages = Math.ceil(totalJobs / limitQuery);
                return { jobs, totalJobs, numOfPages };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    updateJob(jobId, jobObject, requestUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!jobObject.position || !jobObject.company) {
                    throw new Error('Please provide all needed value');
                }
                const job = yield this.job.findOne({ _id: jobId });
                if (!job) {
                    throw new Error(`No job with id ${jobId}`);
                }
                const isAuthorized = (0, checkPermission_1.default)(requestUserId, job.createdBy);
                if (!isAuthorized) {
                    throw new Error('Not authorized');
                }
                const updatedJob = yield this.job.findOneAndUpdate({ _id: jobId }, jobObject, {
                    new: true,
                    runValidators: true,
                });
                return updatedJob;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    deleteJob(jobId, requestUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const job = yield this.job.findOne({ _id: jobId });
                if (!job) {
                    throw new Error(`No job with id ${jobId}`);
                }
                const isAuthorized = (0, checkPermission_1.default)(requestUserId, job.createdBy);
                if (!isAuthorized) {
                    throw new Error('Not authorized');
                }
                yield job.remove();
                return 'Success! Job is removed';
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    showStats(requestUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            let stats = yield this.job.aggregate([
                { $match: { createdBy: new mongoose_1.default.Types.ObjectId(requestUserId) } },
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ]);
            const processStats = stats.reduce((acc, curr) => {
                const { _id: title, count } = curr;
                acc[title] = count;
                return acc;
            }, {});
            const defaultStats = {
                pending: processStats.pending || 0,
                interview: processStats.interview || 0,
                declined: processStats.declined || 0,
            };
            let monthlyApplications = yield this.job.aggregate([
                { $match: { createdBy: new mongoose_1.default.Types.ObjectId(requestUserId) } },
                {
                    $group: {
                        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { '_id.year': -1, '_id.month': -1 } },
                { $limit: 6 },
            ]);
            monthlyApplications = monthlyApplications
                .map((item) => {
                const { _id: { year, month }, count, } = item;
                const date = (0, moment_1.default)()
                    .month(month - 1)
                    .year(year)
                    .format('MMM Y');
                return { date, count };
            })
                .reverse();
            return {
                defaultStats,
                monthlyApplications
            };
        });
    }
}
exports.default = JobService;
