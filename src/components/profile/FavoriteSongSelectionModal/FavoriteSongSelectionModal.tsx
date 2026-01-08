import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconSearch, IconCheck, IconPlus, IconMusic } from '@tabler/icons-react';
import { Button } from '../../common/Button/Button';
import type { FavoriteSong } from '../../../types/user.types';
import { cn } from '../../../utils/cn';

interface FavoriteSongSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentFavorites: FavoriteSong[];
    onSave: (songs: FavoriteSong[]) => void;
}

// Mock available songs based on files in src/assets/images/album
const AVAILABLE_SONGS: FavoriteSong[] = [
    { title: 'alice - pogo', artist: 'pogo', albumCover: '/src/assets/images/album/alice - pogo.jpg' },
    { title: 'ambient hide CS01 - dorian concept', artist: 'dorian concept', albumCover: '/src/assets/images/album/ambient hide CS01 - dorian concept.jpg' },
    { title: 'days go by', artist: 'antent y my head is empty', albumCover: '/src/assets/images/album/days go by - antent y my head is empty.jpg' },
    { title: 'hide CS01 - dorian concept', artist: 'dorian concept', albumCover: '/src/assets/images/album/hide CS01 - dorian concept.jpg' },
    { title: 'mice on venus', artist: 'c418', albumCover: '/src/assets/images/album/mice on venus - c418.jpg.jpg' },
    { title: 'moog city', artist: 'c418', albumCover: '/src/assets/images/album/moog city - c418.jpg' },
    { title: 'Midnight City', artist: 'M83', albumCover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop' },
    { title: 'Starboy', artist: 'The Weeknd', albumCover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop' },
    { title: 'Blinding Lights', artist: 'The Weeknd', albumCover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
    { title: 'Levitating', artist: 'Dua Lipa', albumCover: 'https://images.unsplash.com/photo-1459749411177-042180ce6742?w=300&h=300&fit=crop' },
    { title: 'Peaches', artist: 'Justin Bieber', albumCover: 'https://images.unsplash.com/photo-1514525253361-bee8d1870468?w=300&h=300&fit=crop' },
    { title: 'Stay', artist: 'The Kid LAROI', albumCover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop' },
    { title: 'Montero', artist: 'Lil Nas X', albumCover: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=300&h=300&fit=crop' },
    { title: 'Industry Baby', artist: 'Lil Nas X', albumCover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop' },
    { title: 'Kiss Me More', artist: 'Doja Cat', albumCover: 'https://images.unsplash.com/photo-1516280440614-37939bb912cd?w=300&h=300&fit=crop' },
    { title: 'Bad Habits', artist: 'Ed Sheeran', albumCover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop' },
    { title: 'Good 4 U', artist: 'Olivia Rodrigo', albumCover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
    { title: 'Save Your Tears', artist: 'The Weeknd', albumCover: 'https://images.unsplash.com/photo-1514525253361-bee8d1870468?w=300&h=300&fit=crop' },
];

const FavoriteSongSelectionModal: React.FC<FavoriteSongSelectionModalProps> = ({
    isOpen,
    onClose,
    currentFavorites,
    onSave
}) => {
    const [selectedSongs, setSelectedSongs] = useState<FavoriteSong[]>(currentFavorites);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSongs = AVAILABLE_SONGS.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleSong = (song: FavoriteSong) => {
        const isSelected = selectedSongs.some(s => s.title === song.title);
        if (isSelected) {
            setSelectedSongs(selectedSongs.filter(s => s.title !== song.title));
        } else if (selectedSongs.length < 3) {
            setSelectedSongs([...selectedSongs, song]);
        }
    };

    const handleSave = () => {
        onSave(selectedSongs);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background-500/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-background-400 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Select Favorite Tracks</h2>
                                <p className="text-white/60 text-sm">Choose up to 3 songs to showcase on your profile</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-white/5 text-white hover:text-white transition-colors"
                            >
                                <IconX size={24} />
                            </button>
                        </div>

                        {/* Current Selection */}
                        <div className="p-6 bg-white/5 border-b border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-primary-400">
                                    Current Selection ({selectedSongs.length}/3)
                                </span>
                            </div>
                            <div className="flex gap-4">
                                {[0, 1, 2].map((index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "relative w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all",
                                            selectedSongs[index]
                                                ? "border-primary-500/50 bg-primary-500/10"
                                                : "border-white/10 bg-white/5"
                                        )}
                                    >
                                        {selectedSongs[index] ? (
                                            <>
                                                <img
                                                    src={selectedSongs[index].albumCover}
                                                    className="w-full h-full object-cover"
                                                    alt=""
                                                />
                                                <button
                                                    onClick={() => toggleSong(selectedSongs[index])}
                                                    className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity"
                                                >
                                                    <IconX size={20} className="text-white" />
                                                </button>
                                            </>
                                        ) : (
                                            <IconMusic size={24} className="text-white/20" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Search and Shuffle */}
                        <div className="p-6 pb-2 flex gap-3">
                            <div className="relative flex-1">
                                <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-5" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search for a song or artist..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-5 focus:outline-none focus:border-primary-500/50 transition-all"
                                />
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const shuffled = [...AVAILABLE_SONGS].sort(() => 0.5 - Math.random());
                                    setSelectedSongs(shuffled.slice(0, 3));
                                }}
                                className="border-white/10 hover:bg-white/5 whitespace-nowrap"
                            >
                                Shuffle
                            </Button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-6 pt-2">
                            <div className="space-y-2">
                                {filteredSongs.map((song, idx) => {
                                    const isSelected = selectedSongs.some(s => s.title === song.title);
                                    // Randomized glow for each card
                                    const glows = [
                                        'group-hover:bg-primary-500/5',
                                        'group-hover:bg-secondary-cyan-500/5',
                                        'group-hover:bg-purple-500/5',
                                        'group-hover:bg-blue-500/5'
                                    ];
                                    const glowClass = glows[idx % glows.length];

                                    return (
                                        <button
                                            key={song.title}
                                            onClick={() => toggleSong(song)}
                                            disabled={!isSelected && selectedSongs.length >= 3}
                                            className={cn(
                                                "w-full flex items-center gap-4 p-3 rounded-2xl border transition-all text-left group relative overflow-hidden",
                                                isSelected
                                                    ? "bg-primary-500/10 border-primary-500/50"
                                                    : cn("bg-white/5 border-transparent hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed", glowClass)
                                            )}
                                        >
                                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10 relative z-10">
                                                <img src={song.albumCover} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div className="flex-1 min-w-0 relative z-10">
                                                <p className="text-white font-bold truncate">{song.title}</p>
                                                <p className="text-white/60 text-sm truncate">{song.artist}</p>
                                            </div>
                                            <div className={cn(
                                                "w-6 h-6 rounded-full border flex items-center justify-center transition-all",
                                                isSelected
                                                    ? "bg-primary-500 border-primary-500 text-white"
                                                    : "border-white/20 text-transparent"
                                            )}>
                                                {isSelected ? <IconCheck size={14} /> : <IconPlus size={14} className="group-hover:text-white/50" />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                            <Button variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                Save Favorites
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FavoriteSongSelectionModal;
