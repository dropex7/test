import { useSelector } from 'react-redux';

export const useGetRepo = () => {
  return useSelector((state) => state.repo);
};
