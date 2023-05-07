import { createContext, useEffect, useState } from 'react';

export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

export const ThemeContext = createContext<Theme>(Theme.Light);

export const lightTheme = {
    backgroundColor: '#fff',
    textColor: '#000',
};

export const darkTheme = {
    backgroundColor: '#111',
    textColor: '#fff',
};

type ThemeProviderProps = {
    theme: Theme;
    children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
    const [currentTheme, setCurrentTheme] = useState(theme);

    useEffect(() => {
        setCurrentTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={currentTheme === Theme.Light ? lightTheme : darkTheme}>
            {children}
        </ThemeContext.Provider>
    );
};
