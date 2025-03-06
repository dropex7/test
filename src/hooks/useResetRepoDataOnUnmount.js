import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetRepoData } from '@store/slices/repoSlice.js';

export function useResetRepoDataOnUnmount() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetRepoData());
    };
  }, []);
}
