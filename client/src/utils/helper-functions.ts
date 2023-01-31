import jwtDecode from 'jwt-decode';

const extractExpirationDate = (token: string) => {
  const { exp } = jwtDecode<{ exp: number }>(token);
  return exp;
};

export { extractExpirationDate };
