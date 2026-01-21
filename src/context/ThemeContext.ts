import { createContext } from 'react';

export type Theme = 'purple' | 'blue' | 'cyan' | 'green' | 'red';
export type Appearance = 'light' | 'dark' | 'system';

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    appearance: Appearance;
    setAppearance: (appearance: Appearance) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
