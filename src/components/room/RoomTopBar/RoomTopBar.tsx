import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconChevronLeft, IconSettings } from '@tabler/icons-react';

interface RoomTopBarProps {
    roomName: string;
    onNameChange: (name: string) => void;
    onOpenSettings: () => void;
}

const RoomTopBar: React.FC<RoomTopBarProps> = ({ roomName, onNameChange, onOpenSettings }) => {
    const navigate = useNavigate();

    return (
        <header className="h-16 bg-transparent backdrop-blur-md flex items-center justify-between px-6 z-[100] relative">
            <div className="w-10" /> {/* Spacer */}

            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate('/home')}
                    className="p-1 rounded-lg hover:bg-white/5 text-neutral-50 transition-all"
                >
                    <IconChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-2 group">
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => onNameChange(e.target.value)}
                        className="bg-transparent border-none text-base font-bold text-white focus:outline-none focus:ring-0 w-auto min-w-[100px] text-center"
                        style={{ width: `${Math.max(roomName.length + 2, 10)}ch` }}
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onOpenSettings}
                    className="p-2 rounded-xl text-neutral-50 hover:text-white transition-all"
                >
                    <IconSettings size={22} />
                </button>
            </div>
        </header>
    );
};

export default RoomTopBar;
