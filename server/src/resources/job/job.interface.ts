import { Document, Types } from "mongoose";

export interface Job extends Document {
    company: string;
    position: string;
    status: 'interview' | 'declined' | 'pending' | 'all';
    jobType: 'full-time' | 'part-time' | 'remote' | 'internship' | 'all';
    jobLocation: string;
    createdBy: Types.ObjectId
}

export type SortQuery = 'latest' | 'oldest'  | 'a-z' | 'z-a';

export interface JobQueryObject {
    createdBy: Types.ObjectId;
    status: Job['status'];
    jobType: Job['jobType'];
    position: {
        $regex: string;
        $options: string;
    }
}

export interface StatusCollections {
    pending: number | string;
    interview: number | string;
    declined: number | string;
}

export interface MonthlyApplication {
    date: string;
    count: number;
}

export interface Stats {
    defaultStats: StatusCollections;
    monthlyApplications: MonthlyApplication[];
}

export interface AllJobs {
    jobs: Job[];
    totalJobs: number;
    numOfPages: number;
}