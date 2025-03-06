import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

const selectLogin = (state) => state.auth.login;

const selectToken = (state) => state.auth.token;

const selectAuthValues = createSelector(
  [selectLogin, selectToken],
  (login, token) => ({ login, token })
);

export const useGetAuthValues = () => {
  return useSelector(selectAuthValues);
};
