import React, { useState } from 'react';
import { Todo } from './components/todo/todo';
import classNames from 'classnames';
import styles from './App.module.scss';
import moonIcon from './assets/icon-moon.svg';
import sunIcon from './assets/icon-sun.svg';
import { ThemeContext } from './Theme';

interface AppProps {
    className?: string;
}





const App: React.FC<AppProps> = ({ className }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={theme}>
            <div
                className={classNames({
                    [styles['dark-theme']]: theme === 'dark',
                    [styles['light-theme']]: theme === 'light',
                })}
            >
                <div>
                    <h2>TODO</h2>
                    <button onClick={toggleTheme}>
                        {theme === 'light' ? (
                            <img src={moonIcon} alt="moon icon" />
                        ) : (
                            <img src={sunIcon} alt="sun icon" />
                        )}
                    </button>
                </div>
                <Todo />
            </div>
        </ThemeContext.Provider>
    );
};

export default App;

