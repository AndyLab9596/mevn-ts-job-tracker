import type { IGlobalStoreState } from '@/types/Store.type';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('storeGlobal', {
  state: () => {
    return {
      isLoading: false,
      showAlert: false,
      alertText: '',
      alertType: 'success',
      // UI
      showSideBar: true,
    } as IGlobalStoreState;
  },
  actions: {
    toggleSideBar() {
      this.showSideBar = !this.showSideBar;
    },
    hideAlert() {
      this.showAlert = false;
    },
    displayAlert(alertText: string, alertType: IGlobalStoreState['alertType']) {
      this.showAlert = true;
      this.alertText = alertText;
      this.alertType = alertType;
    },
  },
  getters: {
    isShowSideBar(state) {
      return state.showSideBar;
    },
  },
});
