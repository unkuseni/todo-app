import { createContext } from 'react';

type ThemeContextType = 'light' | 'dark';

export const ThemeContext = createContext<ThemeContextType>('light');
