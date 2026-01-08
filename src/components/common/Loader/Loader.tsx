import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', color = 'primary' }) => {
    const sizes = {
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-3',
        lg: 'w-16 h-16 border-4',
    };

    const colors: Record<string, string> = {
        primary: 'border-primary-500',
        white: 'border-white',
    };

    return (
        <div className="flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className={`${sizes[size]} border-t-transparent rounded-full ${colors[color] || colors.primary}`}
            />
        </div>
    );
};
