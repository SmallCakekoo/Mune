import React from 'react';
import { motion } from 'framer-motion';
import { IconPalette, IconCheck, IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import { useTheme } from '../../../hooks/useTheme';
import type { Theme, Appearance } from '../../../context/ThemeContext';
import { cn } from '../../../utils/cn';

const themes = [
    { id: 'purple', name: 'Mune Purple', color: 'bg-[#8B5CF6]' },
    { id: 'blue', name: 'Ocean Blue', color: 'bg-[#3B82F6]' },
    { id: 'cyan', name: 'Cyber Cyan', color: 'bg-[#06B6D4]' },
    { id: 'green', name: 'Emerald', color: 'bg-[#10B981]' },
    { id: 'red', name: 'Ruby', color: 'bg-[#EF4444]' },
];

const appearances = [
    { id: 'light', name: 'Light', icon: IconSun },
    { id: 'dark', name: 'Dark', icon: IconMoon },
    { id: 'system', name: 'System', icon: IconDeviceDesktop },
];

const ThemeSettings: React.FC = () => {
    const { theme: currentTheme, setTheme, appearance: currentAppearance, setAppearance } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-400/50 backdrop-blur-xl rounded-2xl border border-neutral-5/10 p-8 shadow-2xl"
        >
            <section className="mb-10">
                <h3 className="text-xl font-bold text-neutral-5 mb-6 flex items-center gap-2">
                    <IconSun size={24} className="text-primary-500" />
                    Appearance
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {appearances.map((app) => (
                        <button
                            key={app.id}
                            onClick={() => setAppearance(app.id as Appearance)}
                            className={cn(
                                "relative flex items-center gap-4 p-4 rounded-xl border transition-all group",
                                currentAppearance === app.id
                                    ? "bg-primary-500/10 border-primary-500/50"
                                    : "bg-neutral-5/5 border-neutral-5/10 hover:border-neutral-5/20 hover:bg-neutral-5/10"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                                currentAppearance === app.id ? "bg-primary-500 text-white" : "bg-white/10 text-neutral-5 group-hover:text-white"
                            )}>
                                <app.icon size={20} />
                            </div>
                            <span className={cn(
                                "text-sm font-medium transition-colors",
                                currentAppearance === app.id ? "text-neutral-5" : "text-neutral-5 group-hover:text-neutral-5"
                            )}>
                                {app.name}
                            </span>
                            {currentAppearance === app.id && (
                                <IconCheck size={18} className="ml-auto text-primary-500" />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-xl font-bold text-neutral-5 mb-6 flex items-center gap-2">
                    <IconPalette size={24} className="text-primary-500" />
                    Accent Color
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => setTheme(theme.id as Theme)}
                            className={cn(
                                "relative flex flex-col items-center gap-3 p-4 rounded-xl border transition-all group",
                                currentTheme === theme.id
                                    ? "bg-primary-500/10 border-primary-500/50"
                                    : "bg-neutral-5/5 border-neutral-5/10 hover:border-neutral-5/20 hover:bg-neutral-5/10"
                            )}
                        >
                            <div className={cn(
                                "w-12 h-12 rounded-full shadow-lg group-hover:scale-110 transition-transform",
                                theme.color
                            )} />
                            <span className={cn(
                                "text-sm font-medium transition-colors",
                                currentTheme === theme.id ? "text-neutral-5" : "text-neutral-5 group-hover:text-neutral-5"
                            )}>
                                {theme.name}
                            </span>

                            {currentTheme === theme.id && (
                                <motion.div
                                    layoutId="active-theme"
                                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center shadow-lg"
                                >
                                    <IconCheck size={14} className="text-white" />
                                </motion.div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            <div className="mt-8 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm text-orange-700 dark:text-orange-500 italic">
                    Tip: Your theme preference is automatically saved to your browser's local storage.
                </p>
            </div>
        </motion.div>
    );
};

export default ThemeSettings;
