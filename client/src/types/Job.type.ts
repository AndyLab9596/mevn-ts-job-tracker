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

export type { ICreateJob, TSearchJobType, TSearchStatus, TSort };
