interface ILoginInfo {
  name: string;
  password: string;
}

interface IRegisterInfo extends ILoginInfo {
  confirmedPassword: string;
  email: string;
}

export type { ILoginInfo, IRegisterInfo };
