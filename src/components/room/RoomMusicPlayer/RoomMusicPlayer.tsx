import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IconPlayerPlay,
    IconPlayerPause,
    IconPlayerSkipForward,
    IconPlayerSkipBack,
    IconPlaylist,
    IconVolume,
    IconSearch,
    IconPlus,
    IconX,
    IconHistory,
    IconTrash,
    IconList
} from '@tabler/icons-react';
import { cn } from '../../../utils/cn';

interface Track {
    id: string;
    title: string;
    artist: string;
    cover?: string;
    albumCover?: string;
    duration: number;
    durationLabel: string;
}

const RoomMusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [volume, setVolume] = useState(80);
    const [progress, setProgress] = useState(35);

    const [activeTab, setActiveTab] = useState<'search' | 'queue' | 'history'>('search');

    const [queue, setQueue] = useState<Track[]>([]);
    const [history, setHistory] = useState<Track[]>([]);

    const [currentTrack, setCurrentTrack] = useState<Track>({
        id: '0',
        title: 'Recuérdame Quién',
        artist: 'Cyclo',
        albumCover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
        duration: 210,
        durationLabel: '3:30'
    });

    React.useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        playNext();
                        return 0;
                    }
                    return p + 0.1;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying, queue]);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const width = bounds.width;
        const percentage = Math.max(0, Math.min(100, (x / width) * 100));
        setProgress(percentage);
    };

    const mockSongs: Track[] = [
        { id: '1', title: 'BUEN DÍA PORTACIÓN', artist: 'Milo J', duration: 210, durationLabel: '3:30', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
        { id: '2', title: 'RETIRADA', artist: 'Milo J', duration: 172, durationLabel: '2:52', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
        { id: '3', title: 'Cuando El Agua Hirvie', artist: 'Milo J', duration: 177, durationLabel: '2:57', cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop' },
    ];

    const filteredSongs = mockSongs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addToQueue = (track: Track) => {
        if (!queue.find(t => t.id === track.id)) {
            setQueue([...queue, track]);
        }
    };

    const removeFromQueue = (trackId: string) => {
        setQueue(queue.filter(t => t.id !== trackId));
    };

    const playTrack = (track: Track, fromQueue = false) => {
        // Agregar canción actual al historial si existe
        if (currentTrack.id !== '0' && !history.find(t => t.id === currentTrack.id)) {
            setHistory([currentTrack, ...history].slice(0, 20));
        }

        setCurrentTrack(track);
        setIsPlaying(true);
        setProgress(0);

        if (!fromQueue) {
            setShowPlaylist(false);
        }
    };

    const playNext = () => {
        if (queue.length > 0) {
            const nextTrack = queue[0];
            playTrack(nextTrack, true);
            setQueue(queue.slice(1));
        } else {
            setIsPlaying(false);
        }
    };

    const playPrevious = () => {
        if (history.length > 0) {
            const prevTrack = history[0];
            setCurrentTrack(prevTrack);
            setHistory(history.slice(1));
            setIsPlaying(true);
            setProgress(0);
        }
    };

    const clearHistory = () => {
        setHistory([]);
    };

    const clearQueue = () => {
        setQueue([]);
    };

    return (
        <div className="flex flex-col gap-3 pointer-events-auto items-end">
            {/* Main Player Card */}
            <motion.div
                layout
                className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] shadow-2xl overflow-hidden relative group/player transition-all w-80 p-6"
            >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-400/10 blur-[60px] pointer-events-none" />

                <div className="relative flex flex-col gap-5">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-xl border border-white/10">
                            <img src={currentTrack.albumCover} alt="" className="w-full h-full object-cover" />
                            {isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                                    <div className="flex gap-1 items-end h-4 pb-1">
                                        <motion.div
                                            animate={{ height: [4, 12, 4] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            className="w-1 bg-white rounded-full"
                                        />
                                        <motion.div
                                            animate={{ height: [4, 16, 4] }}
                                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                                            className="w-1 bg-white rounded-full"
                                        />
                                        <motion.div
                                            animate={{ height: [4, 10, 4] }}
                                            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                                            className="w-1 bg-white rounded-full"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <h4 className="text-base font-black text-white truncate tracking-tight">{currentTrack.title}</h4>
                            <p className="text-xs text-neutral-5 font-bold truncate opacity-90">{currentTrack.artist}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Progress Bar */}
                        <div
                            className="relative h-1.5 w-full bg-white/10 rounded-full group/progress cursor-pointer overflow-hidden"
                            onClick={handleSeek}
                        >
                            <div
                                className="absolute top-0 left-0 bottom-0 bg-primary-400 shadow-[0_0_10px_rgba(58,139,255,0.5)] rounded-full transition-all duration-100 ease-linear"
                                style={{ width: `${progress}%` }}
                            />
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                        </div>

                        {/* Queue indicator */}
                        {queue.length > 0 && (
                            <div className="flex items-center gap-2 text-xs text-neutral-5">
                                <IconList size={14} />
                                <span>{queue.length} song{queue.length !== 1 ? 's' : ''} in queue</span>
                            </div>
                        )}

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setShowPlaylist(!showPlaylist)}
                                className={cn(
                                    "p-2 rounded-full transition-all hover:bg-white/10",
                                    showPlaylist ? "text-primary-400 bg-white/5" : "text-white/70 hover:text-white"
                                )}
                            >
                                <IconPlaylist size={20} />
                            </button>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={playPrevious}
                                    disabled={history.length === 0}
                                    className="text-white/70 hover:text-white transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <IconPlayerSkipBack size={20} fill="currentColor" />
                                </button>
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white text-background-500 hover:scale-110 transition-all active:scale-95 shadow-lg shadow-white/10"
                                >
                                    {isPlaying ? <IconPlayerPause size={24} stroke={2} /> : <IconPlayerPlay size={24} stroke={2} className="ml-0.5" />}
                                </button>
                                <button
                                    onClick={playNext}
                                    disabled={queue.length === 0}
                                    className="text-white/70 hover:text-white transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <IconPlayerSkipForward size={20} fill="currentColor" />
                                </button>
                            </div>

                            <div className="group/volume relative flex items-center gap-2">
                                <IconVolume size={18} className="text-white/70 group-hover/volume:text-white transition-colors" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-4 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[24px] opacity-0 scale-90 group-hover/volume:opacity-100 group-hover/volume:scale-100 transition-all origin-bottom shadow-2xl">
                                    <div className="relative h-24 w-4 flex items-center justify-center">
                                        <input
                                            type="range"
                                            min="0" max="100"
                                            value={volume}
                                            onChange={(e) => setVolume(parseInt(e.target.value))}
                                            className="absolute w-24 h-1 appearance-none bg-white/20 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                                            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Playlist/Search Overlay */}
            <AnimatePresence>
                {showPlaylist && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[32px] p-4 shadow-2xl flex flex-col gap-4 max-h-[500px] w-80"
                    >
                        {/* Tabs */}
                        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl">
                            <button
                                onClick={() => setActiveTab('search')}
                                className={cn(
                                    "flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all",
                                    activeTab === 'search'
                                        ? 'bg-primary-500 text-white'
                                        : 'text-neutral-5/70 hover:text-white'
                                )}
                            >
                                Search
                            </button>
                            <button
                                onClick={() => setActiveTab('queue')}
                                className={cn(
                                    "flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all relative",
                                    activeTab === 'queue'
                                        ? 'bg-primary-500 text-white'
                                        : 'text-neutral-5/70 hover:text-white'
                                )}
                            >
                                Queue
                                {queue.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                                        {queue.length}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={cn(
                                    "flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all",
                                    activeTab === 'history'
                                        ? 'bg-primary-500 text-white'
                                        : 'text-neutral-5/70 hover:text-white'
                                )}
                            >
                                History
                            </button>
                        </div>

                        {/* Search Tab */}
                        {activeTab === 'search' && (
                            <>
                                <div className="relative">
                                    <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400/60" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search songs..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium text-white placeholder:text-neutral-5/40 focus:outline-none focus:bg-white/10 focus:border-primary-400/30 transition-all"
                                    />
                                    {searchQuery && (
                                        <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-5/40 hover:text-white">
                                            <IconX size={16} />
                                        </button>
                                    )}
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                    {filteredSongs.map((song) => (
                                        <div
                                            key={song.id}
                                            className="group/song flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-white/5 cursor-pointer"
                                                onClick={() => playTrack(song)}
                                            >
                                                <img src={song.cover} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-black text-white truncate">{song.title}</p>
                                                <p className="text-[10px] text-neutral-5 font-bold">{song.artist} • {song.durationLabel}</p>
                                            </div>
                                            <button
                                                onClick={() => addToQueue(song)}
                                                className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 opacity-0 group-hover/song:opacity-100 transition-all hover:bg-primary-500 hover:text-white"
                                            >
                                                <IconPlus size={16} stroke={3} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Queue Tab */}
                        {activeTab === 'queue' && (
                            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                {queue.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                                        <IconPlaylist size={48} className="text-neutral-5/30 mb-3" />
                                        <p className="text-neutral-5/70 text-sm">No songs in queue</p>
                                        <p className="text-neutral-5/40 text-xs mt-1">Add songs from Search</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-neutral-5/70">{queue.length} in queue</span>
                                            <button
                                                onClick={clearQueue}
                                                className="text-xs text-red-400 hover:text-red-300 transition-all"
                                            >
                                                Clear all
                                            </button>
                                        </div>
                                        {queue.map((song, index) => (
                                            <div
                                                key={song.id}
                                                className="group/song flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
                                            >
                                                <span className="text-xs text-neutral-5/50 w-4">{index + 1}</span>
                                                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-white/5">
                                                    <img src={song.cover} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-black text-white truncate">{song.title}</p>
                                                    <p className="text-[10px] text-neutral-5 font-bold">{song.artist}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromQueue(song.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 opacity-0 group-hover/song:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                                >
                                                    <IconTrash size={14} stroke={3} />
                                                </button>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}

                        {/* History Tab */}
                        {activeTab === 'history' && (
                            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                {history.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-8">
                                        <IconHistory size={48} className="text-neutral-5/30 mb-3" />
                                        <p className="text-neutral-5/70 text-sm">No history yet</p>
                                        <p className="text-neutral-5/40 text-xs mt-1">Played songs will appear here</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-neutral-5/70">{history.length} played</span>
                                            <button
                                                onClick={clearHistory}
                                                className="text-xs text-red-400 hover:text-red-300 transition-all"
                                            >
                                                Clear history
                                            </button>
                                        </div>
                                        {history.map((song) => (
                                            <div
                                                key={song.id}
                                                className="group/song flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all cursor-pointer"
                                                onClick={() => playTrack(song)}
                                            >
                                                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-white/5">
                                                    <img src={song.cover} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-black text-white truncate">{song.title}</p>
                                                    <p className="text-[10px] text-neutral-5 font-bold">{song.artist}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToQueue(song);
                                                    }}
                                                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 opacity-0 group-hover/song:opacity-100 transition-all hover:bg-primary-500 hover:text-white"
                                                >
                                                    <IconPlus size={16} stroke={3} />
                                                </button>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RoomMusicPlayer;
