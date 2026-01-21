import React from 'react';
import { motion } from 'framer-motion';
import { IconMusic } from '@tabler/icons-react';
import type { FavoriteSong } from '../../../types/user.types';

interface FavoriteSongCardProps {
    song: FavoriteSong;
}

const FavoriteSongCard: React.FC<FavoriteSongCardProps> = ({ song }) => {
    // Fixed random-looking values to satisfy React's purity rules
    const bars = React.useMemo(() =>
        Array.from({ length: 50 }).map((_, i) => ({
            heights: [
                ((i * 7) % 4) + 2,
                ((i * 13) % 16) + 4,
                ((i * 19) % 8) + 2,
                ((i * 23) % 16) + 4,
                ((i * 29) % 4) + 2
            ],
            duration: 0.8 + ((i * 3) % 10) / 10
        })), []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-3 flex items-center gap-4 transition-all hover:bg-white/10 hover:border-primary-500/30 shadow-lg"
        >
            {/* Background Gradient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-secondary-cyan-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Album Cover */}
            <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl shadow-xl">
                <img
                    src={song.albumCover}
                    alt={`${song.title} - ${song.artist}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-1 right-1 p-1 rounded-full bg-primary-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                    <IconMusic size={12} />
                </div>
            </div>

            {/* Song Info */}
            <div className="relative flex-1 min-w-0 pr-2">
                <span className="inline-block text-[9px] font-bold uppercase tracking-[0.2em] text-primary-400 mb-1">
                    Track
                </span>
                <h3 className="text-lg font-bold text-white truncate mb-0.5">
                    {song.title}
                </h3>
                <p className="text-white/80 text-xs font-medium truncate">
                    {song.artist}
                </p>

                <div className="mt-3 flex gap-0.5 h-4 items-end opacity-20 group-hover:opacity-60 transition-opacity">
                    {bars.map((bar, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                height: bar.heights,
                            }}
                            transition={{
                                duration: bar.duration,
                                repeat: Infinity,
                                delay: i * 0.05,
                                ease: "easeInOut"
                            }}
                            className="w-0.5 bg-primary-400/80 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default FavoriteSongCard;
