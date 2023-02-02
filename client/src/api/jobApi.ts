import type {
  ICreateJob,
  IAllJobInfo,
  IGetJobQueryObject,
  IUpdateJobParams,
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
  }: IGetJobQueryObject): Promise<IAllJobInfo> {
    let url = `/job?page=${page}&status=${searchStatus}&jobType=${searchType}`;

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
};

export default jobApi;
