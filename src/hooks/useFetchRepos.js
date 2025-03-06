import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchRepos } from '@store/slices/reposSlice.js';

export function useFetchRepos() {
  const dispatch = useDispatch();
  const { data: repos, loading, error } = useSelector((state) => state.repos);

  useEffect(() => {
    dispatch(fetchRepos());
  }, [dispatch]);

  return { repos, loading, error };
}
