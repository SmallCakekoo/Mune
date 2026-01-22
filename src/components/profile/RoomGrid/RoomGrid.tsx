import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react';
import RoomCard from '../../home/RoomCard/RoomCard';
import RoomListItem from './RoomListItem';
import type { Room } from '../../../types/room.types';
import { cn } from '../../../utils/cn';

interface RoomGridProps {
    title?: string;
    rooms: Room[];
    currentUserId?: string;
    emptyMessage?: string;
    onViewDetails?: (room: Room) => void;
    onEdit?: (room: Room) => void;
    onEnter?: (room: Room) => void;
    viewMode: 'grid' | 'list';
    onViewModeChange: (mode: 'grid' | 'list') => void;
    extraOptions?: {
        label: string;
        icon: React.ReactNode;
        onClick: (room: Room) => void;
        variant?: 'default' | 'danger';
    }[];
}

const RoomGrid: React.FC<RoomGridProps> = ({
    title,
    rooms,
    currentUserId,
    emptyMessage = "No rooms found here...",
    onViewDetails,
    onEdit,
    onEnter,
    viewMode,
    onViewModeChange,
    extraOptions
}) => {
    return (
        <div className="mb-12">
            {title && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <h2 className="text-2xl font-bold text-white relative">
                        {title}
                    </h2>

                    <div className="flex items-center gap-4">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-5 text-sm">
                            {rooms.length} Rooms
                        </span>

                        <div className="flex p-1 rounded-xl bg-white/5 border border-white/10">
                            <button
                                onClick={() => onViewModeChange('grid')}
                                className={cn(
                                    "p-1.5 rounded-lg transition-all",
                                    viewMode === 'grid' ? "bg-primary-500 text-white shadow-lg" : "text-neutral-5 hover:text-white"
                                )}
                                title="Grid View"
                            >
                                <IconLayoutGrid size={20} />
                            </button>
                            <button
                                onClick={() => onViewModeChange('list')}
                                className={cn(
                                    "p-1.5 rounded-lg transition-all",
                                    viewMode === 'list' ? "bg-primary-500 text-white shadow-lg" : "text-neutral-5 hover:text-white"
                                )}
                                title="List View"
                            >
                                <IconLayoutList size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {rooms.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-12 px-6 rounded-2xl bg-white/5 border border-white/10 border-dashed text-center"
                    >
                        <p className="text-neutral-5 text-lg italic">{emptyMessage}</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key={viewMode}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            viewMode === 'grid'
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                : "flex flex-col gap-3"
                        )}
                    >
                        {rooms.map((room, index) => (
                            <motion.div
                                key={room.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {viewMode === 'grid' ? (
                                    <RoomCard
                                        room={room}
                                        currentUserId={currentUserId}
                                        onViewDetails={onViewDetails}
                                        onEdit={onEdit}
                                        onEnter={onEnter}
                                        extraOptions={extraOptions}
                                    />
                                ) : (
                                    <RoomListItem
                                        room={room}
                                        currentUserId={currentUserId}
                                        onViewDetails={onViewDetails}
                                        onEdit={onEdit}
                                        onEnter={onEnter}
                                        extraOptions={extraOptions}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RoomGrid;
