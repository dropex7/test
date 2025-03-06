import { Home } from '@pages/home/Home.jsx';
import { RepoList } from '@pages/repo-list/RepoList.jsx';
import { Repo } from '@pages/Repo.jsx';

export const routes = [
  { path: '/', element: <Home />, needAuth: false },
  { path: '/repos', element: <RepoList />, needAuth: true },
  { path: '/create', element: <Repo />, needAuth: true },
  { path: '/repo/:repoName', element: <Repo />, needAuth: true },
];
