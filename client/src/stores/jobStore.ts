import jobApi from '@/api/jobApi';
import type IError from '@/types/Error.type';
import type { ICreateJob } from '@/types/Job.type';
import type { IJobStoreState } from '@/types/Store.type';
import { defineStore } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore';

export const useJobStore = defineStore('jobGlobal', {
  state: () => {
    return {
      isEditing: false,
      editJobId: '',
    } as IJobStoreState;
  },
  actions: {
    async setupJob(payload: ICreateJob) {
      const globalStore = useGlobalStore();
      try {
        if (this.isEditing) {
          // Editing
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
  },
  getters: {},
});
