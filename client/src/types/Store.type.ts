import type { ILoginInfo, IRegisterInfo, IUserInfo } from './Form.type';
import type { ICreateJob, TSearchJobType, TSearchStatus } from './Job.type';

interface IGlobalStoreState {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: 'success' | 'danger';
  showSideBar: boolean;
}

interface IAuthActionProps {
  authInfo: ILoginInfo | Omit<IRegisterInfo, 'confirmedPassword'>;
  authType: 'login' | 'register';
}

interface IAuthStoreState {
  user: IUserInfo | null;
  token: string;
  isAutoLogout: boolean;
}

interface IUserInfoSaveLocal {
  user: IUserInfo | null;
  token: string;
  expirationDate: number;
}

interface IJobStoreState {
  isEditing: boolean;
  editJobId: string;
}

export type {
  IGlobalStoreState,
  IAuthActionProps,
  IAuthStoreState,
  IUserInfoSaveLocal,
  IJobStoreState,
};
