import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { ThemeContext } from './Theme';
import moonIcon from './assets/icon-moon.svg';
import sunIcon from './assets/icon-sun.svg';
import styles from './App.module.scss';
import { Todo } from './components/todo/todo';

type AppProps = {
    className?: string;
};

const App: React.FC<AppProps> = ({ className }) => {
    // Set the initial theme based on the user's preferred color scheme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [theme, setTheme] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    // Update the theme when the user's preferred color scheme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            setTheme(mediaQuery.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return (
        <ThemeContext.Provider value={theme}>
            <div
                className={classNames(
                    className,
                    {
                        [styles['dark-theme']]: theme === 'dark',
                        [styles['light-theme']]: theme === 'light',
                    },
                    styles.container
                )}
            >
                <div>
                    <div className={styles.header}>
                        <h2>TODO</h2>
                        <button onClick={toggleTheme} className={styles.theme_button}>
                            {theme === 'light' ? (
                                <img src={moonIcon} alt="moon icon" />
                            ) : (
                                <img src={sunIcon} alt="sun icon" />
                            )}
                        </button>
                    </div>
                    <Todo theme={theme}/>
                    <article className={styles.drag_text}>
                        <p>Drag and drop to reorder list</p>
                    </article>
                </div>
            </div>
        </ThemeContext.Provider>
    );
};

export default App;
