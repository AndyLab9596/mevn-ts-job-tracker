import axiosClient from '@/api/apiClient';
import type {
  IAuthInfo,
  ILoginInfo,
  IRegisterInfo,
  IUserInfo,
} from '@/types/Form.type';

const authApi = {
  register(
    payload: Omit<IRegisterInfo, 'confirmedPassword'>,
  ): Promise<IAuthInfo> {
    const url = '/users/register';
    return axiosClient.post(url, payload);
  },

  login(payload: ILoginInfo): Promise<IAuthInfo> {
    const url = '/users/login';
    return axiosClient.post(url, payload);
  },

  updateUser(payload: IUserInfo): Promise<IAuthInfo> {
    const url = `/users/update`;
    return axiosClient.patch(url, payload);
  },
};

export default authApi;
