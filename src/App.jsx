import { Header } from '@components/header/Header.jsx';
import { Router } from './router/Router.jsx';

import styles from './App.module.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
