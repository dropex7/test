import { useState, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthState } from '@store/slices/authSlice.js';
import { useGetAuthValues } from '@hooks/useGetAuthValues.js';
import styles from './AuthForm.module.css';

export const AuthForm = memo(() => {
  const dispatch = useDispatch();
  const defaultValues = useGetAuthValues();
  const [showToken, setShowToken] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  const toggleShowToken = useCallback(() => {
    setShowToken((prev) => !prev);
  }, [setShowToken]);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    },
    [setFormValues]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!formValues.login || !formValues.token) {
        alert('Пожалуйста, заполните все поля');
        return;
      }

      dispatch(setAuthState(formValues));

      alert(`Данные пользователя сохранены!`);
    },
    [dispatch, formValues]
  );

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.fieldContainer}>
        <label htmlFor="login">Логин пользователя</label>
        <input
          id="login"
          name="login"
          value={formValues.login}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.fieldContainer}>
        <label htmlFor="token">Токен пользователя</label>
        <input
          type={showToken ? 'text' : 'password'}
          id="token"
          name="token"
          value={formValues.token}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={toggleShowToken}>
          {showToken ? 'Скрыть' : 'Показать'}
        </button>
      </div>
      <button type="submit">Сохранить настройки пользователя</button>
    </form>
  );
});
