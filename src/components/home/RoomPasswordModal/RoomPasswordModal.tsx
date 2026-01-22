import React, { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import { Button } from '../../common/Button/Button';
import { IconLock } from '@tabler/icons-react';
import type { Room } from '../../../types/room.types';
import toast from 'react-hot-toast';
import { hashPassword } from '../../../utils/encryption';
import CryptoJS from 'crypto-js';

interface RoomPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    room: Room | null;
    onSuccess: (room: Room) => void;
}

const RoomPasswordModal: React.FC<RoomPasswordModalProps> = ({
    isOpen,
    onClose,
    room,
    onSuccess,
}) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    if (!room) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password) {
            setError('Password is required');
            return;
        }

        const hashedPassword = await hashPassword(password);
        // Legacy UTF-16LE hash (used in some existing rooms)
        const hashedPasswordUtf16 = CryptoJS.SHA256(CryptoJS.enc.Utf16LE.parse(password)).toString();

        if (
            hashedPassword === room.password ||
            hashedPasswordUtf16 === room.password ||
            password === room.password
        ) {
            onSuccess(room);
            onClose();
            setPassword('');
            setError('');
        } else {
            setError('Incorrect password');
            toast.error('Incorrect password');
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
                setPassword('');
                setError('');
            }}
            title="Private Room"
            size="sm"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mb-4">
                        <IconLock size={32} className="text-primary-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Password Required</h3>
                    <p className="text-neutral-5 text-center text-sm">
                        This room is private. Please enter the password to join.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-3">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-6 focus:outline-none focus:border-primary-500/50 transition-all"
                        placeholder="Enter room password"
                        autoFocus
                    />
                    {error && <p className="text-error-400 text-xs">{error}</p>}
                </div>

                <div className="flex gap-3 pt-2">
                    <Button
                        type="button"
                        variant="ghost"
                        className="flex-1"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                        Join Room
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default RoomPasswordModal;
