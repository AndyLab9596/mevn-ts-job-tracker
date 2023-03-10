import type {
  ICreateJob,
  IAllJobInfo,
  IGetJobQueryObject,
  IUpdateJobParams,
  IStats,
} from '@/types/Job.type';
import axiosClient from '@/api/apiClient';

const jobApi = {
  createJob(payload: ICreateJob): Promise<ICreateJob> {
    const url = '/job';
    return axiosClient.post(url, payload);
  },
  getAllJob({
    page,
    search,
    searchStatus,
    searchType,
    sort,
  }: IGetJobQueryObject): Promise<IAllJobInfo> {
    let url = `/job?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }
    return axiosClient.get(url);
  },
  updateJob({ job, jobId }: IUpdateJobParams) {
    const url = `/job/${jobId}`;
    return axiosClient.patch(url, job);
  },
  deleteJob(jobId: string) {
    const url = `/job/${jobId}`;
    return axiosClient.delete(url);
  },
  getJobStats(): Promise<IStats> {
    const url = '/job/stats';
    return axiosClient.get(url);
  },
};

export default jobApi;
