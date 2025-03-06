import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes.jsx';
import { useCheckHavingCredentials } from '@hooks/useCheckHavingCredentials.js';

export const Router = memo(() => {
  const haveCredentials = useCheckHavingCredentials();

  return (
    <Routes>
      {routes
        .filter(({ needAuth }) => !needAuth || haveCredentials)
        .map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
    </Routes>
  );
});
