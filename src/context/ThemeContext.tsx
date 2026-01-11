import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'purple' | 'blue' | 'cyan' | 'green' | 'red';
type Appearance = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    appearance: Appearance;
    setAppearance: (appearance: Appearance) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('mune-theme');
        return (saved as Theme) || 'purple';
    });

    const [appearance, setAppearance] = useState<Appearance>(() => {
        const saved = localStorage.getItem('mune-appearance');
        return (saved as Appearance) || 'system';
    });

    useEffect(() => {
        localStorage.setItem('mune-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('mune-appearance', appearance);

        const applyAppearance = (mode: Appearance) => {
            let resolvedMode = mode;
            if (mode === 'system') {
                resolvedMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
            document.documentElement.setAttribute('data-appearance', resolvedMode);
            document.documentElement.style.colorScheme = resolvedMode;
        };

        applyAppearance(appearance);

        if (appearance === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => applyAppearance('system');
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [appearance]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, appearance, setAppearance }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
