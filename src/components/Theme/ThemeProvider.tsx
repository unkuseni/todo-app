import { createContext, ReactNode } from 'react';
import { Theme } from './theme';

type ThemeProviderProps = {
    theme: Theme;
    children: ReactNode;
};

export const ThemeContext = createContext<Theme>(Theme.Light);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
    const styles = `
    .theme-light {
      --primary-color: #0077CC;
      --text-color: #333;
      --background-color: #F5F5F5;
    }

    .theme-dark {
      --primary-color: #66B2FF;
      --text-color: #EEE;
      --background-color: #222;
    }
  `;

    return (
        <ThemeContext.Provider value={theme}>
            <style>{styles}</style>
            {children}
        </ThemeContext.Provider>
    );
};
