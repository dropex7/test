import { Header } from '@components/header/Header.jsx';
import { Router } from './router/Router.jsx';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Router />
    </div>
  );
}

export default App;
