import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchRepo } from '@store/slices/repoSlice.js';
import { useGetRepo } from './useGetRepo.js';

export function useFetchRepo(repoName) {
  const dispatch = useDispatch();
  const { data: repo, loading, error } = useGetRepo();

  useEffect(() => {
    if (repoName) {
      dispatch(fetchRepo(repoName));
    }
  }, [dispatch]);

  return { repo, loading, error };
}
