import { useGetAuthValues } from './useGetAuthValues.js';

export function useCheckHavingCredentials() {
  const { login, token } = useGetAuthValues();

  return !!(login && token);
}
