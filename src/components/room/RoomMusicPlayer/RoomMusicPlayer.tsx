import { IconPlayerPlay, IconPlayerPause, IconPlayerSkipForward, IconPlayerSkipBack, IconPlaylist, IconVolume } from '@tabler/icons-react';
import { useState } from 'react';

const RoomMusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const progress = 35; // Mock progress %

    const track = {
        title: 'Recuérdame Quién',
        artist: 'Cyclo',
        albumCover: '/src/assets/images/album/mice on venus - c418.jpg.jpg', // Keeping existing mock cover for now
    };

    return (
        <div className="bg-[#000000]/60 backdrop-blur-2xl border border-white/5 rounded-[32px] p-6 w-72 shadow-2xl overflow-hidden relative group/player">
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/10 blur-[60px] pointer-events-none" />

            <div className="relative flex flex-col gap-5">
                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-lg group">
                        <img src={track.albumCover} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="min-w-0">
                        <h4 className="text-base font-black text-white truncate tracking-tight">{track.title}</h4>
                        <p className="text-xs text-neutral-400 font-bold truncate opacity-80">{track.artist}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden relative">
                            <div
                                className="absolute top-0 left-0 bottom-0 bg-primary-400 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="text-neutral-400 hover:text-white transition-all">
                            <IconPlaylist size={18} />
                        </button>
                        <div className="flex items-center gap-5">
                            <button className="text-neutral-400 hover:text-white transition-all">
                                <IconPlayerSkipBack size={20} fill="currentColor" />
                            </button>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="text-white hover:scale-110 transition-all active:scale-95"
                            >
                                {isPlaying ? <IconPlayerPause size={24} fill="currentColor" /> : <IconPlayerPlay size={24} fill="currentColor" />}
                            </button>
                            <button className="text-neutral-400 hover:text-white transition-all">
                                <IconPlayerSkipForward size={20} fill="currentColor" />
                            </button>
                        </div>
                        <button className="text-neutral-400 hover:text-white transition-all">
                            <IconVolume size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomMusicPlayer;
