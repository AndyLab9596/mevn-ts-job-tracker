import jwtDecode from 'jwt-decode';

const extractExpirationDate = (token: string) => {
  const { exp } = jwtDecode<{ exp: number }>(token);
  return exp;
};

const createDebounce = () => {
  let timeout: any = null;
  return function (fnc: Function, delayMs: number) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fnc();
    }, delayMs || 500);
  };
};

export { extractExpirationDate, createDebounce };
