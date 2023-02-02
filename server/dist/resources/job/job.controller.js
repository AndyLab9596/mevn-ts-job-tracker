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
const http_status_codes_1 = require("http-status-codes");
const express_1 = require("express");
const job_service_1 = __importDefault(require("./job.service"));
const http_exception_1 = __importDefault(require("../../utils/exceptions/http.exception"));
const job_validation_1 = __importDefault(require("./job.validation"));
const validation_middleware_1 = __importDefault(require("../../middleware/validation.middleware"));
class JobController {
    constructor() {
        this.path = '/job';
        this.router = (0, express_1.Router)();
        this.JobService = new job_service_1.default();
        this.createJob = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const jobObject = req.body;
                const userId = req.user.userId;
                const jobCreated = yield this.JobService.createJob(userId, jobObject);
                res.status(http_status_codes_1.StatusCodes.CREATED).json(jobCreated);
            }
            catch (error) {
                next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message));
            }
        });
        this.getAllJob = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { status, jobType, sort, search, page, limit } = req.query;
            const createdBy = req.user.userId;
            try {
                const allJobs = yield this.JobService.getAllJob(status, jobType, sort, search, page, limit, createdBy);
                res.status(http_status_codes_1.StatusCodes.OK).json(allJobs);
            }
            catch (error) {
                next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message));
            }
        });
        this.updateJob = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const jobId = req.params.id;
                const jobObject = req.body;
                const requestUserId = req.user.userId;
                const updatedJob = yield this.JobService.updateJob(jobId, jobObject, requestUserId);
                res.status(http_status_codes_1.StatusCodes.OK).json(updatedJob);
            }
            catch (error) {
                next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message));
            }
        });
        this.deleteJob = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const jobId = req.params.id;
                const requestUserId = req.user.userId;
                const message = yield this.JobService.deleteJob(jobId, requestUserId);
                res.status(http_status_codes_1.StatusCodes.OK).json({ msg: message });
            }
            catch (error) {
                next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message));
            }
        });
        this.getStats = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const requestUserId = req.user.userId;
                const stats = yield this.JobService.showStats(requestUserId);
                res.status(http_status_codes_1.StatusCodes.OK).json(stats);
            }
            catch (error) {
                next(new http_exception_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.route(`${this.path}`)
            .post((0, validation_middleware_1.default)(job_validation_1.default.createJob), this.createJob)
            .get(this.getAllJob),
            this.router.route(`${this.path}/:id`)
                .patch((0, validation_middleware_1.default)(job_validation_1.default.createJob), this.updateJob)
                .delete(this.deleteJob),
            this.router.route(`${this.path}/stats`)
                .get(this.getStats);
    }
}
exports.default = JobController;
