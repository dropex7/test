import { Link } from 'react-router-dom';
import { RepoItem } from '@components/repo/repo-item/RepoItem.jsx';
import { useFetchRepos } from '@hooks/useFetchRepos.js';

import styles from './RepoList.module.css';

export function RepoList() {
  const { repos, loading, error } = useFetchRepos();

  if (loading) {
    return <span>Загрузка...</span>;
  }

  if (error) {
    return <span>Ошибка: {error.message}</span>;
  }

  return (
    <div className={styles.container}>
      <h1>Список репозиториев</h1>
      <Link to="/create">Создать репозиторий</Link>

      <ul>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </ul>
    </div>
  );
}
