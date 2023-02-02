"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createJob = joi_1.default.object({
    position: joi_1.default.string().required(),
    company: joi_1.default.string().required(),
    status: joi_1.default.string(),
    jobType: joi_1.default.string(),
    jobLocation: joi_1.default.string(),
});
exports.default = { createJob };
