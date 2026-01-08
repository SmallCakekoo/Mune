import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconSearch, IconCheck } from '@tabler/icons-react';
import { Button } from '../../common/Button/Button';
import type { Room } from '../../../types/room.types';
import { cn } from '../../../utils/cn';

interface AddRoomToCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (roomIds: string[]) => void;
    availableRooms: Room[];
    categoryName: string;
}

const AddRoomToCategoryModal: React.FC<AddRoomToCategoryModalProps> = ({
    isOpen,
    onClose,
    onAdd,
    availableRooms,
    categoryName,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const filteredRooms = availableRooms.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleRoom = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleAdd = () => {
        if (selectedIds.length > 0) {
            onAdd(selectedIds);
            setSelectedIds([]);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-background-500/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-background-400 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white">Add Rooms to {categoryName}</h2>
                            <p className="text-sm text-neutral-5">Select rooms to organize in this collection</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-white/5 text-neutral-5 hover:text-white transition-colors"
                        >
                            <IconX size={24} />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="relative mb-6">
                            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-5" size={20} />
                            <input
                                type="text"
                                placeholder="Search your rooms..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-neutral-5 focus:outline-none focus:border-primary-500/50 transition-all"
                            />
                        </div>

                        <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                            {filteredRooms.length === 0 ? (
                                <p className="text-center py-8 text-neutral-5 italic">No matching rooms found</p>
                            ) : (
                                filteredRooms.map(room => {
                                    const isSelected = selectedIds.includes(room.id);
                                    return (
                                        <div
                                            key={room.id}
                                            onClick={() => toggleRoom(room.id)}
                                            className={cn(
                                                "flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all border",
                                                isSelected
                                                    ? "bg-primary-500/10 border-primary-500/50"
                                                    : "bg-white/5 border-transparent hover:bg-white/10"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                                isSelected ? "bg-primary-500 border-primary-500 text-white" : "border-white/20"
                                            )}>
                                                {isSelected && <IconCheck size={14} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-white truncate">{room.name}</p>
                                                <p className="text-xs text-neutral-5">{room.songCount} songs</p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/10 flex gap-3">
                        <Button variant="ghost" className="flex-1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            className="flex-1"
                            disabled={selectedIds.length === 0}
                            onClick={handleAdd}
                        >
                            Add {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddRoomToCategoryModal;
