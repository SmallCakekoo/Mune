import React from 'react';
import { motion } from 'framer-motion';
import { useUserResolver } from '../../../hooks/useUserResolver';

interface WritingMemberIndicatorProps {
    userId: string;
}

export const WritingMemberIndicator: React.FC<WritingMemberIndicatorProps> = ({ userId }) => {
    const { user } = useUserResolver(userId);

    if (!user) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col items-center gap-2"
        >
            <div className="w-10 h-10 rounded-full border-2 border-primary-500 overflow-hidden shadow-lg shadow-primary-500/20">
                <img
                    src={user.avatar || '/src/assets/images/cats/Default.png'}
                    alt={user.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
                <p className="text-xs font-bold text-white/90">
                    {user.name} is writing
                </p>
                <div className="flex gap-1">
                    <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        className="w-1 h-1 rounded-full bg-primary-400"
                    />
                    <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-1 h-1 rounded-full bg-primary-400"
                    />
                    <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-1 h-1 rounded-full bg-primary-400"
                    />
                </div>
            </div>
        </motion.div>
    );
};
