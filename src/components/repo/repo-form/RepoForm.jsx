import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchRepos } from '@store/slices/reposSlice.js';
import { createRepo, updateRepo } from '@utils/reposApi.js';
import { useGetAuthValues } from '@hooks/useGetAuthValues.js';

import authStyles from '../../auth-form/AuthForm.module.css';

export const RepoForm = memo(({ repo }) => {
  const dispatch = useDispatch();
  const { login } = useGetAuthValues();
  const isEdit = !!repo;

  const defaultValues = useMemo(
    () =>
      isEdit
        ? {
            name: repo.name ?? '',
            description: repo.description ?? '',
            visibility: repo.private ? 'private' : 'public',
          }
        : {
            name: '',
            description: '',
            visibility: 'public',
          },
    [isEdit, repo]
  );

  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);

      try {
        const repoData = {
          description: formValues.description,
          private: formValues.visibility === 'private',
        };

        if (isEdit) {
          await updateRepo(login, repo.name, repoData);
          toast(`Репозиторий "${formValues.name}" успешно обновлен!`);
        } else {
          await createRepo({ ...repoData, name: formValues.name });
          toast(`Репозиторий "${formValues.name}" успешно создан!`);
          setFormValues({ name: '', description: '', visibility: 'public' });
        }

        dispatch(fetchRepos());
      } catch (error) {
        toast.error(
          error.response?.data?.message || 'Ошибка при сохранении репозитория'
        );
      } finally {
        setLoading(false);
      }
    },
    [formValues, dispatch, isEdit, repo, login]
  );

  return (
    <form onSubmit={onSubmit} className={authStyles.form}>
      <div className={authStyles.fieldContainer}>
        <label htmlFor="name">Название</label>
        <input
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          required
          disabled={isEdit}
        />
      </div>

      <div className={authStyles.fieldContainer}>
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
        />
      </div>

      <div className={authStyles.fieldContainer}>
        <label>Видимость</label>
        <div>
          <label>
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={formValues.visibility === 'public'}
              onChange={handleChange}
            />
            Публичный
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={formValues.visibility === 'private'}
              onChange={handleChange}
            />
            Приватный
          </label>
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading
          ? isEdit
            ? 'Обновление...'
            : 'Создание...'
          : isEdit
            ? 'Обновить'
            : 'Создать'}
      </button>
    </form>
  );
});
