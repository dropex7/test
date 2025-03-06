import { useParams } from 'react-router-dom';
import { RepoForm } from '@components/repo/repo-form/RepoForm.jsx';
import { useFetchRepo } from '@hooks/useFetchRepo.js';
import { useResetRepoDataOnUnmount } from '@hooks/useResetRepoDataOnUnmount.js';

export function Repo() {
  const { repoName } = useParams();
  const { repo, error, loading } = useFetchRepo(repoName);

  useResetRepoDataOnUnmount();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  return (
    <>
      <h1>{repo ? 'Редактирование репозитория' : 'Создание репозитория'}</h1>
      <RepoForm repo={repo} />
    </>
  );
}
