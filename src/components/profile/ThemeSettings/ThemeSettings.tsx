import React from 'react';
import { motion } from 'framer-motion';
import { IconPalette, IconCheck } from '@tabler/icons-react';
import { useTheme } from '../../../context/ThemeContext';
import { cn } from '../../../utils/cn';

const themes = [
    { id: 'purple', name: 'Mune Purple', color: 'bg-primary-500' },
    { id: 'blue', name: 'Ocean Blue', color: 'bg-blue-500' },
    { id: 'cyan', name: 'Cyber Cyan', color: 'bg-secondary-cyan-500' },
    { id: 'green', name: 'Emerald', color: 'bg-green-500' },
    { id: 'red', name: 'Ruby', color: 'bg-error-500' },
];

const ThemeSettings: React.FC = () => {
    const { theme: currentTheme, setTheme } = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-400/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl"
        >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <IconPalette size={24} className="text-primary-500" />
                Appearance & Theme
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => setTheme(theme.id as any)}
                        className={cn(
                            "relative flex flex-col items-center gap-3 p-4 rounded-xl border transition-all group",
                            currentTheme === theme.id
                                ? "bg-primary-500/10 border-primary-500/50"
                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                        )}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-full shadow-lg group-hover:scale-110 transition-transform",
                            theme.color
                        )} />
                        <span className={cn(
                            "text-sm font-medium transition-colors",
                            currentTheme === theme.id ? "text-white" : "text-neutral-5 group-hover:text-white"
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

            <div className="mt-8 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <p className="text-sm text-orange-200 italic">
                    Tip: Your theme preference is automatically saved to your browser's local storage.
                </p>
            </div>
        </motion.div>
    );
};

export default ThemeSettings;
