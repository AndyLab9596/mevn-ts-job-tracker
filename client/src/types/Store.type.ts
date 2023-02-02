import type { ILoginInfo, IRegisterInfo, IUserInfo } from './Form.type';
import type { IGetJobQueryObject, IJobInfo, IMonthlyApp } from './Job.type';

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

interface IJobStoreState extends IGetJobQueryObject {
  isEditing: boolean;
  editJobId: string;
  editJobValues: IJobInfo | null;
  jobs: IJobInfo[];
  totalJobs: number;
  numOfPages: number;
  statPending: number;
  statInterview: number;
  statDeclined: number;
  monthlyApplications: IMonthlyApp[];
}

export type {
  IGlobalStoreState,
  IAuthActionProps,
  IAuthStoreState,
  IUserInfoSaveLocal,
  IJobStoreState,
};
