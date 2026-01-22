import React, { useState, useEffect } from 'react';
import { IconTrash, IconSettings, IconShield } from '@tabler/icons-react';
import { Button } from '../../common/Button/Button';
import Modal from '../../common/Modal/Modal';
import { cn } from '../../../utils/cn';

interface RoomSettingsOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    room: {
        name: string;
        description?: string;
        privacy?: string;
    };
    onUpdateRoom: (updates: any) => Promise<void>;
    onDeleteRoom: () => void;
}

const RoomSettingsOverlay: React.FC<RoomSettingsOverlayProps> = ({
    isOpen,
    onClose,
    room,
    onUpdateRoom,
    onDeleteRoom
}) => {
    const [name, setName] = useState(room.name);
    const [description, setDescription] = useState(room.description || '');
    const [isPublic, setIsPublic] = useState(room.privacy === 'public');

    // Update local state when room changes
    useEffect(() => {
        setName(room.name);
        setDescription(room.description || '');
        setIsPublic(room.privacy === 'public');
    }, [room]);

    const handleSave = async () => {
        await onUpdateRoom({
            name,
            description,
            privacy: isPublic ? 'public' : 'private'
        });
        onClose();
    };
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Room Settings"
            size="lg"
        >
            <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {/* General Section */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
                            <IconSettings size={20} />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-5">General Settings</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-5 ml-1">Room Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all font-medium"
                                placeholder="Enter room name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-5 ml-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What's this room about?"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all h-24 font-medium resize-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Privacy & Permissions */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400">
                            <IconShield size={20} />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-5">Privacy & Permissions</h3>
                    </div>

                    <div
                        className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
                        onClick={() => setIsPublic(!isPublic)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-400">
                                <IconShield size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Public Visibility</p>
                                <p className="text-xs text-neutral-5">{isPublic ? 'Anyone with the link can view and join' : 'Only invited members can join'}</p>
                            </div>
                        </div>
                        <div className={cn(
                            "w-12 h-6 rounded-full relative transition-all duration-300 shadow-lg",
                            isPublic ? "bg-primary-500 shadow-primary-500/20" : "bg-white/10"
                        )}>
                            <div className={cn(
                                "absolute top-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                                isPublic ? "right-1" : "right-7"
                            )} />
                        </div>
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="pt-6 border-t border-white/10 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-error-400">Danger Zone</h3>

                    <button
                        onClick={() => {
                            if (window.confirm('PERMANENTLY DELETE ROOM? This cannot be undone.')) {
                                onDeleteRoom();
                                onClose();
                            }
                        }}
                        className="w-full flex items-center justify-between p-4 rounded-2xl bg-error-500/5 border border-error-500/10 hover:bg-error-500/10 hover:border-error-500/30 transition-all group"
                    >
                        <div className="text-left">
                            <p className="text-sm font-bold text-error-400">Delete Room</p>
                            <p className="text-xs text-error-500/60 font-medium">Permanently delete this room and all its content</p>
                        </div>
                        <div className="p-2 rounded-xl bg-error-500/10 text-error-400 group-hover:scale-110 transition-transform">
                            <IconTrash size={20} />
                        </div>
                    </button>
                </section>

                {/* Actions */}
                <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} className="px-6">Cancel</Button>
                    <Button onClick={handleSave} className="px-8 shadow-lg shadow-primary-500/20">
                        Save Changes
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default RoomSettingsOverlay;
