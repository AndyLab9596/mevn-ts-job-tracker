import jobApi from '@/api/jobApi';
import type IError from '@/types/Error.type';
import type { ICreateJob, IJobInfo } from '@/types/Job.type';
import type { IJobStoreState } from '@/types/Store.type';
import { defineStore } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore';

export const useJobStore = defineStore('jobGlobal', {
  state: () => {
    return {
      // Create & Edit
      isEditing: false,
      editJobId: '',
      editJobValues: null,
      // All Jobs & Pagination
      jobs: [],
      numOfPages: 1,
      page: 1,
      totalJobs: 0,
      // Query Object Filters
      search: '',
      searchStatus: 'all',
      searchType: 'all',
      sort: 'a-z',
      // Stats
      statPending: 0,
      statInterview: 0,
      statDeclined: 0,
      monthlyApplications: [],
    } as IJobStoreState;
  },
  actions: {
    async setupJob(payload: IJobInfo | ICreateJob) {
      const globalStore = useGlobalStore();
      try {
        if (this.isEditing) {
          await jobApi.updateJob({
            job: payload as IJobInfo,
            jobId: this.editJobId,
          });
        } else {
          await jobApi.createJob(payload);
        }
        const displayAlertText = this.isEditing
          ? `Edit job with id ${this.editJobId} succesfully`
          : 'Create job successfully';
        globalStore.displayAlert(displayAlertText, 'success');
      } catch (error) {
        globalStore.displayAlert((error as IError).message, 'danger');
      } finally {
        this.$reset();
        setTimeout(() => {
          globalStore.hideAlert();
        }, 2000);
      }
    },
    async getAllJob() {
      const globalStore = useGlobalStore();
      globalStore.isLoading = true;
      try {
        const { jobs, numOfPages, totalJobs } = await jobApi.getAllJob({
          page: this.page,
          search: this.search,
          searchStatus: this.searchStatus,
          searchType: this.searchType,
          sort: this.sort,
        });
        this.jobs = jobs;
        this.numOfPages = numOfPages;
        this.totalJobs = totalJobs;
      } catch (error) {
        globalStore.displayAlert((error as IError).message, 'danger');
      } finally {
        globalStore.isLoading = false;
        setTimeout(() => {
          globalStore.hideAlert();
        }, 1000);
      }
    },
    editJob(id: string) {
      const globalStore = useGlobalStore();
      this.isEditing = true;
      this.editJobId = id;

      const editedJob = this.jobs.find((job: IJobInfo) => job._id === id);
      this.editJobValues = editedJob as IJobInfo;
      if (!editedJob) {
        globalStore.displayAlert('No job was found', 'danger');
      }
    },
    async deleteJob(id: string) {
      try {
        this.jobs = this.jobs.filter((job) => job._id !== id);
        await jobApi.deleteJob(id);
      } catch (error) {
        console.log(error);
      }
    },
    resetJobEdit() {
      this.isEditing = false;
      this.editJobId = '';
      this.editJobValues = null;
    },
    nextPage() {
      if (this.page === this.numOfPages) return;
      this.page += 1;
    },

    previousPage() {
      if (this.page === 1) return;
      this.page -= 1;
    },

    handleChangePage(page: number) {
      this.page = page;
    },
    changeJobSearch<T extends keyof IJobStoreState>(
      key: T,
      value: IJobStoreState[T],
    ) {
      this.$state[key] = value;
    },
    async getStatsInfo() {
      const globalStore = useGlobalStore();
      globalStore.isLoading = true;
      try {
        const response = await jobApi.getJobStats();
        this.statPending = response.defaultStats.pending;
        this.statDeclined = response.defaultStats.declined;
        this.statInterview = response.defaultStats.interview;
        this.monthlyApplications = response.monthlyApplications;
      } catch (error) {
        console.log(error);
      } finally {
        globalStore.isLoading = false;
      }
    },
    clearSearchFilter() {
      this.search = '';
      this.searchStatus = 'all';
      this.searchType = 'all';
      this.sort = 'a-z';
    },
  },
  getters: {
    jobList(): IJobStoreState['jobs'] {
      return this.jobs;
    },
  },
});
