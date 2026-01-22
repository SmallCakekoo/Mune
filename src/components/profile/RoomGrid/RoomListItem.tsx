import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    IconEye,
    IconEdit,
    IconPlayerPlay,
    IconLock,
    IconWorld,
    IconMusic,
    IconUsers
} from '@tabler/icons-react';
import type { Room } from '../../../types/room.types';
import { cn } from '../../../utils/cn';
import { formatDistanceToNow } from 'date-fns';

interface RoomListItemProps {
    room: Room;
    currentUserId?: string;
    onViewDetails?: (room: Room) => void;
    onEdit?: (room: Room) => void;
    onEnter?: (room: Room) => void;
    extraOptions?: {
        label: string;
        icon: React.ReactNode;
        onClick: (room: Room) => void;
        variant?: 'default' | 'danger';
    }[];
}

const RoomListItem: React.FC<RoomListItemProps> = ({
    room,
    currentUserId,
    onViewDetails,
    onEdit,
    onEnter,
    extraOptions
}) => {
    const navigate = useNavigate();
    const isOwner = room.owner.id === currentUserId;

    const handleEnter = () => {
        if (onEnter) onEnter(room);
        else navigate(`/rooms/${room.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 4 }}
            className={cn(
                'group flex items-center gap-6 p-4 rounded-2xl border border-white/5',
                'bg-background-400/30 backdrop-blur-md hover:bg-white/5 transition-all cursor-pointer'
            )}
            onClick={handleEnter}
        >
            {/* Icon/Avatar Placeholder */}
            <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                {room.privacy === 'private' ? <IconLock size={24} /> : <IconWorld size={24} />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white truncate group-hover:text-primary-400 transition-colors">
                    {room.name}
                </h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-neutral-5">
                    <span className="flex items-center gap-1">
                        <IconMusic size={14} /> {room.songCount || 0}
                    </span>
                    <span className="flex items-center gap-1">
                        <IconUsers size={14} /> {room.memberCount || 0}
                    </span>
                    <span className="hidden sm:inline">
                        Last activity: {room.lastActivity ? formatDistanceToNow(new Date(room.lastActivity)) + ' ago' : 'Never'}
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => { e.stopPropagation(); onViewDetails?.(room); }}
                    className="p-2 rounded-lg bg-white/5 text-neutral-5 hover:text-white transition-colors"
                    title="View Details"
                >
                    <IconEye size={18} />
                </button>
                {isOwner && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit?.(room); }}
                        className="p-2 rounded-lg bg-white/5 text-neutral-5 hover:text-white transition-colors"
                        title="Edit Room"
                    >
                        <IconEdit size={18} />
                    </button>
                )}
                <button
                    onClick={(e) => { e.stopPropagation(); handleEnter(); }}
                    className="p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-400 transition-colors"
                >
                    <IconPlayerPlay size={18} />
                </button>
                {extraOptions?.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); option.onClick(room); }}
                        className={cn(
                            "p-2 rounded-lg bg-white/5 transition-colors",
                            option.variant === 'danger' ? "text-error-400 hover:text-error-300 hover:bg-error-500/10" : "text-neutral-5 hover:text-white hover:bg-white/10"
                        )}
                        title={option.label}
                    >
                        {option.icon}
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export default RoomListItem;
