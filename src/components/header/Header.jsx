import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { useCheckHavingCredentials } from '@hooks/useCheckHavingCredentials.js';
import { memo } from 'react';

export const Header = memo(() => {
  const haveCredentials = useCheckHavingCredentials();

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link to="/">Главная</Link>
        {haveCredentials && <Link to="/repos">Репозитории</Link>}
      </nav>
    </header>
  );
});
