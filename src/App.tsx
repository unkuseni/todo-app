import React, { useState } from 'react';
import { Todo } from './components/todo/todo';
import styles from './App.module.scss';
import moonIcon from './assets/icon-moon.svg';
import sunIcon from './assets/icon-sun.svg';

const App: React.FC = () => {
    const [themeMode, setThemeMode] = useState('light');

    const handleToggleTheme = () =>
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

    return (
        <div className={`${styles.theme} ${styles.container}`}>
            <div className={`${styles.header} ${styles[themeMode]}`}>
                <h2 className={styles.title}>TODO</h2>
                <button className={styles.toggle} onClick={handleToggleTheme}>
                    <img src={themeMode === 'light' ? moonIcon : sunIcon} alt="Toggle theme" />
                </button>
            </div>
            <Todo />
        </div>
    );
};
export default App;