import { Job } from './job.interface';
import mongoose, { Schema, Types } from "mongoose";

const JobSchema = new Schema({
    company: {
        type: String,
        maxLength: 50,
        required: [true, 'Please provide company !'],
    },
    position: {
        type: String,
        maxLength: 50,
        required: [true, 'Please provide position !'],
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'remote'],
        default: 'full-time',
    },
    jobLocation: {
        type: String,
        default: 'TP.HCM',
        required: [true, 'Please provide job location !'],
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
}, { timestamps: true });

export default mongoose.model<Job>('Job', JobSchema);