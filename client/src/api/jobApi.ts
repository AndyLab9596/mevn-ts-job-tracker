import type { ICreateJob } from '@/types/Job.type';
import axiosClient from '@/api/apiClient';

const jobApi = {
  createJob(payload: ICreateJob): Promise<ICreateJob> {
    const url = '/job';
    return axiosClient.post(url, payload);
  },
};

export default jobApi;
