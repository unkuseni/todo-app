import React, { useState } from 'react';
import { Todo } from './components/todo/todo';
import { Theme, lightTheme, darkTheme } from './components/Theme/theme';
import { ThemeProvider } from './components/Theme/ThemeProvider';
import App_module from './App.module.scss';
import Classnames from 'classnames';
import moonIcon from './assets/icon-moon.svg';
import sunIcon from './assets/icon-sun.svg';

function App() {
    const [theme, setTheme] = useState<Theme>(Theme.Light);

    const handleToggleTheme = () => {
        setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
    };

    return (
        <ThemeProvider theme={theme === Theme.Light ? lightTheme : darkTheme}>
            <div
                className={Classnames(
                    App_module.theme,
                    {
                        [App_module.light]: theme === Theme.Light,
                    },
                    App_module['img-back']
                )}
            >
                <div className={App_module.container}>
                    <div className={App_module.header}>
                        <h2 className={App_module.title}>TODO</h2>
                        <button className={App_module.toggle} onClick={handleToggleTheme}>
                            <img
                                src={theme === Theme.Light ? moonIcon : sunIcon}
                                alt="Toggle theme"
                            />
                        </button>
                    </div>
                    <Todo />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
