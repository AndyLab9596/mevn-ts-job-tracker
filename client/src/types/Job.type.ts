import type {
  searchJobTypeOptions,
  searchStatusOptions,
  sortOptions,
} from '@/utils/constants';

type TSearchJobTypeOptions = typeof searchJobTypeOptions;
type TSearchJobType = TSearchJobTypeOptions[number];

type TSearchStatusOptions = typeof searchStatusOptions;
type TSearchStatus = TSearchStatusOptions[number];

type TSortOptions = typeof sortOptions;
type TSort = TSortOptions[number];

interface ICreateJob {
  position: string;
  company: string;
  jobType: TSearchJobType;
  status: TSearchStatus;
  jobLocation: string;
}

interface IJobInfo extends ICreateJob {
  createdAt: Date;
  _id: string;
}

interface IAllJobInfo {
  jobs: IJobInfo[];
  totalJobs: number;
  numOfPages: number;
}

interface IGetJobQueryObject {
  page: number;
  searchStatus: TSearchStatus;
  searchType: TSearchJobType;
  search: string;
  sort: TSort;
}

interface IUpdateJobParams {
  job: IJobInfo;
  jobId: string;
}

export type {
  ICreateJob,
  TSearchJobType,
  TSearchStatus,
  TSort,
  IJobInfo,
  IAllJobInfo,
  IGetJobQueryObject,
  IUpdateJobParams,
};
