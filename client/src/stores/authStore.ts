import authApi from '@/api/authApi';
import type IError from '@/types/Error.type';
import type { IAuthInfo, IRegisterInfo } from '@/types/Form.type';
import type {
  IAuthActionProps,
  IAuthStoreState,
  IUserInfoSaveLocal,
} from '@/types/Store.type';
import { extractExpirationDate } from '@/utils/helper-functions';
import { defineStore } from 'pinia';
import { useGlobalStore } from './globalStore';

let timer: undefined | number;
const LOGOUT_BEFORE_EXP = 300000; // 5 MINUTES;

export const useAuthStore = defineStore('storeAuth', {
  state: () => {
    return {
      user: null,
      token: '',
      isAutoLogout: false,
    } as IAuthStoreState;
  },
  actions: {
    setUserInfoToLocalStorage(payload: IUserInfoSaveLocal) {
      const { user, token, expirationDate } = payload;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate.toString());
    },
    removeUserInfoFromLocalStorage() {
      // localStorage.clear();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');
    },
    setUser(payload: IAuthInfo) {
      const { user, token } = payload;
      const expiresIn = extractExpirationDate(token);

      timer = setTimeout(() => {
        this.autoLogout();
      }, expiresIn);

      this.user = user;
      this.token = token;

      const expirationDate = expiresIn + new Date().getTime();
      const localStoragePayload: IUserInfoSaveLocal = {
        user,
        token,
        expirationDate,
      };

      this.setUserInfoToLocalStorage(localStoragePayload);
    },
    async authAction(payload: IAuthActionProps) {
      const globalStore = useGlobalStore();
      try {
        let res: IAuthInfo;
        if (payload.authType === 'login') {
          res = await authApi.login(payload.authInfo);
        } else {
          const registerInfo = {
            ...payload.authInfo,
          } as IRegisterInfo;

          res = await authApi.register({
            name: registerInfo.name,
            lastName: registerInfo.lastName,
            email: registerInfo.email,
            location: registerInfo.location,
            password: registerInfo.password,
          });
        }
        const displayAlertText =
          payload.authType === 'login'
            ? 'Login successfully ! Redirecting...'
            : 'User created ! Redirecting...';
        globalStore.displayAlert(displayAlertText, 'success');
        this.setUser(res);
        setTimeout(() => {
          globalStore.hideAlert();
          this.router.replace({ name: 'home' });
        }, 1000);
      } catch (error) {
        console.log(error);
        globalStore.displayAlert((error as IError).message, 'danger');
      } finally {
        setTimeout(() => {
          globalStore.hideAlert();
        }, 1000);
      }
    },
    logout() {
      this.$reset();
      this.removeUserInfoFromLocalStorage();
      clearTimeout(timer);
    },
    autoLogout() {
      this.logout();
      this.isAutoLogout = true;
    },
    autoLogin() {
      const expirationDate = localStorage.getItem('expirationDate') as string;
      if (typeof expirationDate !== 'string') return;
      const token = localStorage.getItem('token') as string;
      const expiresIn = +expirationDate - new Date().getTime();
      const user = JSON.parse(localStorage.getItem('user') as string);
      if (expiresIn < LOGOUT_BEFORE_EXP) {
        return;
      }
      timer = setTimeout(() => {
        this.autoLogout();
      }, expiresIn);
      if (!!user && !!token) {
        this.setUser({ user, token });
      }
    },
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.token;
    },
  },
});
