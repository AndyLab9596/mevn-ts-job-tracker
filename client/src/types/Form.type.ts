interface ILoginInfo {
  email: string;
  password: string;
}

interface IRegisterInfo extends ILoginInfo {
  confirmedPassword: string;
  name: string;
  lastName: string;
  location: string;
}

type IUserInfo = Pick<
  IRegisterInfo,
  'name' | 'lastName' | 'location' | 'email'
>;

interface IAuthInfo {
  user: IUserInfo;
  token: string;
}

export type { ILoginInfo, IRegisterInfo, IUserInfo, IAuthInfo };
