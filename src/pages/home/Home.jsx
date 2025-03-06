import { AuthForm } from '@components/auth-form/AuthForm.jsx';
import styles from './Home.module.css';

export function Home() {
  return (
    <div>
      <h1>Настройка пользователя</h1>
      <p className={styles.warning}>
        Cтраница с репозиториями будет доступна только после сохранения
        настроек.
      </p>
      <AuthForm />
    </div>
  );
}
