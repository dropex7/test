import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TrashIcon, PencilIcon } from '@primer/octicons-react';
import { fetchRepos } from '@store/slices/reposSlice.js';
import { deleteRepo } from '@utils/reposApi.js';
import { useGetAuthValues } from '@hooks/useGetAuthValues.js';

import styles from './RepoItem.module.css';

export const RepoItem = memo(({ repo }) => {
  const dispatch = useDispatch();
  const { login } = useGetAuthValues();

  const handleDelete = useCallback(async () => {
    const confirmDelete = window.confirm(
      `Вы уверены, что хотите удалить репозиторий "${repo.name}"?`
    );

    if (confirmDelete) {
      try {
        await deleteRepo(login, repo.name);
        alert(`Репозиторий "${repo.name}" успешно удален!`);

        dispatch(fetchRepos());
      } catch (error) {
        alert('Ошибка при удалении репозитория: ' + error.message);
      }
    }
  }, [login, repo.name, dispatch]);

  return (
    <li className={styles.item}>
      <span>{repo.name}</span>

      <div className={styles.itemActions}>
        <Link to={`/repo/${repo.name}`}>
          <PencilIcon size={12} />
        </Link>
        <button onClick={handleDelete}>
          <TrashIcon size={12} />
        </button>
      </div>
    </li>
  );
});
