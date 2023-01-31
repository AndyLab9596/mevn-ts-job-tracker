import { defineStore } from 'pinia';

interface IGlobalStoreState {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: 'success' | 'danger';
  showSideBar: boolean;
}

export const useGlobalStore = defineStore('storeGlobal', {
  state: () => {
    return {
      isLoading: false,
      showAlert: false,
      alertText: '',
      alertType: 'success',
      showSideBar: true,
    } as IGlobalStoreState;
  },
  actions: {
    toggleSideBar() {
      this.showSideBar = !this.showSideBar;
    },
  },
  getters: {
    isShowSideBar(state) {
      return state.showSideBar;
    },
  },
});
