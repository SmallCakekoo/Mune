import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme, Appearance } from './ThemeContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('mune-theme');
        return (saved as Theme) || 'purple';
    });

    const [appearance, setAppearance] = useState<Appearance>(() => {
        const saved = localStorage.getItem('mune-appearance');
        return (saved as Appearance) || 'system';
    });

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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
            setIsDarkMode(resolvedMode === 'dark');

            // Also toggle 'dark' class for Tailwind if needed, although we are using data-appearance
            if (resolvedMode === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
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
        <ThemeContext.Provider value={{ theme, setTheme, appearance, setAppearance, isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
