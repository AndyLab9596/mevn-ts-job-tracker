import { Document, Types } from "mongoose";

export interface Job extends Document {
    company: string;
    position: string;
    status: 'interview' | 'declined' | 'pending';
    jobType: 'full-time' | 'part-time' | 'remote' | 'internship';
    jobLocation: string;
    createdBy: Types.ObjectId
}

export interface AllJobs {
    jobs: Job[];
    totalJobs: number;
}