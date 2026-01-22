import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useSidebar } from '../../hooks/useSidebar';
import Canvas from '../../components/room/Canvas/Canvas';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import RoomTopBar from '../../components/room/RoomTopBar/RoomTopBar';
import RoomMusicPlayer from '../../components/room/RoomMusicPlayer/RoomMusicPlayer';
import ActiveUsers from '../../components/room/ActiveUsers/ActiveUsers';
import RoomSettingsOverlay from '../../components/room/RoomSettingsOverlay/RoomSettingsOverlay';
import { Loader } from '../../components/common/Loader/Loader';
import type { Note, RoomPresence, TodoItem } from '../../types/room.types';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';
import * as roomService from '../../services/room.service';
import * as noteService from '../../services/room-notes.service';

const RoomPage: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const { user: currentUser } = useAuth();
    const { isCollapsed } = useSidebar();
    const navigate = useNavigate();

    const [notes, setNotes] = useState<Note[]>([]);
    const [roomName, setRoomName] = useState('');
    const [activeMembers, setActiveMembers] = useState<RoomPresence[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [scale, setScale] = useState(1);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [roomDescription, setRoomDescription] = useState('');
    const [roomPrivacy, setRoomPrivacy] = useState('public');

    // Fetch Room Metadata
    useEffect(() => {
        const fetchRoomMetadata = async () => {
            if (!roomId) return;

            try {
                setIsLoading(true);
                setError(null);

                const room = await roomService.getRoomById(roomId);
                if (!room) {
                    setError('Room not found');
                    return;
                }
                setRoomName(room.name);
                setRoomDescription(room.description || '');
                setRoomPrivacy(room.privacy || 'public');

                const presenceMembers: RoomPresence[] = room.members.map(m => ({
                    userId: m.id,
                    user: {
                        id: m.id,
                        name: m.name,
                        username: m.id,
                        avatar: m.avatar,
                        email: m.email || ''
                    },
                    lastActive: new Date()
                }));
                setActiveMembers(presenceMembers);
            } catch (err) {
                console.error('Error fetching room data:', err);
                setError('Failed to load room data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoomMetadata();
    }, [roomId]);

    // Real-time Notes Subscription
    useEffect(() => {
        if (!roomId) return;
        const unsubscribe = noteService.subscribeToRoomNotes(roomId, (fetchedNotes) => {
            setNotes(fetchedNotes);
        });
        return () => unsubscribe();
    }, [roomId]);

    const handleAddNote = useCallback(async (type: 'text' | 'todo' | 'image', x: number, y: number, content?: string | TodoItem[] | File, width?: number, height?: number) => {
        if (!roomId || !currentUser) return;

        const id = `temp-${Date.now()}`;
        const newNote: Note = {
            id,
            type,
            title: type === 'text' ? 'New Note' : type === 'todo' ? 'New List' : 'New Image',
            content: (type === 'image' && content instanceof File) ? URL.createObjectURL(content) : (content as string | TodoItem[]) || (type === 'text' ? '' : type === 'todo' ? [] : ''),
            x,
            y,
            width: width || (type === 'image' ? 300 : 280),
            height: height || (type === 'image' ? undefined : 180),
            color: type === 'image' ? '#ffffff' : '#FEF9C3',
            authorId: currentUser.id,
            createdAt: new Date().toISOString()
        };

        // Optimistic update
        setNotes(prev => [...prev, newNote]);

        try {
            if (type === 'image' && content instanceof File) {
                await noteService.createImageNote(roomId, content, {
                    title: newNote.title,
                    x: newNote.x,
                    y: newNote.y,
                    width: newNote.width,
                    height: newNote.height,
                    color: newNote.color,
                    authorId: newNote.authorId
                });
            } else {
                await noteService.createNote(roomId, {
                    type,
                    title: newNote.title,
                    content: newNote.content as string | TodoItem[],
                    x,
                    y,
                    width: newNote.width,
                    height: newNote.height,
                    color: newNote.color,
                    authorId: currentUser.id
                });
            }
        } catch (err) {
            console.error('Error adding note:', err);
            toast.error('Failed to add note');
            // Revert optimistic update on error
            setNotes(prev => prev.filter(n => n.id !== id));
        }
    }, [roomId, currentUser]);

    const handleUpdateNote = useCallback(async (id: string, updates: Partial<Note>) => {
        if (!roomId) return;
        // Optimistic update
        setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
        try {
            await noteService.updateNote(roomId, id, updates);
        } catch (err) {
            console.error('Error updating note:', err);
            toast.error('Failed to update note');
        }
    }, [roomId]);

    const handleDuplicateNote = useCallback(async (id: string) => {
        const noteToDuplicate = notes.find(n => n.id === id);
        if (noteToDuplicate && roomId && currentUser) {
            try {
                const { id: _, createdAt: __, lastModified: ___, ...rest } = noteToDuplicate;
                await noteService.createNote(roomId, {
                    ...rest,
                    x: rest.x + 20,
                    y: rest.y + 20,
                    authorId: currentUser.id
                });
                toast.success('Note duplicated');
            } catch (err) {
                console.error('Error duplicating note:', err);
                toast.error('Failed to duplicate note');
            }
        }
    }, [notes, roomId, currentUser]);

    const handleDeleteNote = useCallback(async (id: string) => {
        if (!roomId) return;
        try {
            await noteService.deleteNote(roomId, id);
        } catch (err) {
            console.error('Error deleting note:', err);
            toast.error('Failed to delete note');
        }
    }, [roomId]);

    const handleUpdateRoom = useCallback(async (updates: any) => {
        if (!roomId) return;
        try {
            await roomService.updateRoom(roomId, updates);
            if (updates.name !== undefined) setRoomName(updates.name);
            if (updates.description !== undefined) setRoomDescription(updates.description);
            if (updates.privacy !== undefined) setRoomPrivacy(updates.privacy);
            toast.success('Room settings saved');
        } catch (err) {
            console.error('Error updating room:', err);
            toast.error('Failed to save settings');
        }
    }, [roomId]);

    const handleDeleteRoom = useCallback(async () => {
        if (!roomId) return;
        try {
            await roomService.deleteRoom(roomId);
            toast.success('Room deleted');
            navigate('/home');
        } catch (err) {
            console.error('Error deleting room:', err);
            toast.error('Failed to delete room');
        }
    }, [roomId, navigate]);

    const handleClearCanvas = useCallback(async () => {
        if (!roomId) return;
        try {
            await Promise.all(notes.map(n => noteService.deleteNote(roomId, n.id)));
            toast.success('Canvas cleared');
        } catch (err) {
            console.error('Error clearing canvas:', err);
            toast.error('Failed to clear canvas');
        }
    }, [roomId, notes]);

    if (isLoading) {
        return (
            <div className="h-screen w-screen bg-background-500 flex items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen w-screen bg-background-500 flex flex-col items-center justify-center gap-4 text-white p-6">
                <h1 className="text-4xl font-bold text-error-400">Oops!</h1>
                <p className="text-xl text-neutral-5 text-center max-w-md">{error}</p>
                <button
                    onClick={() => navigate('/home')}
                    className="px-6 py-3 bg-primary-500 rounded-xl font-bold hover:bg-primary-400 transition-colors"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-500 text-white selection:bg-primary-500/30 overflow-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-background-500 to-background-500 z-0" />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-0 mix-blend-overlay" />
            <div
                className="fixed inset-0 z-0 opacity-10"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <Sidebar />

            <main className={cn(
                "h-screen flex flex-col relative z-10 transition-all duration-300",
                isCollapsed ? "ml-0 md:ml-[80px]" : "ml-0 md:ml-[280px]"
            )}>
                <RoomTopBar
                    roomName={roomName}
                    onNameChange={setRoomName}
                    onOpenSettings={() => setIsSettingsOpen(true)}
                />

                <div className="flex-1 relative flex overflow-hidden">

                    <Canvas
                        notes={notes}
                        scale={scale}
                        onAddNote={handleAddNote}
                        onUpdateNote={handleUpdateNote}
                        onDeleteNote={handleDeleteNote}
                        onDuplicateNote={handleDuplicateNote}
                        onClearCanvas={handleClearCanvas}
                        onScaleChange={setScale}
                    />

                    <div className="absolute right-6 top-6 z-50 flex flex-col gap-4 pointer-events-none">
                        <div className="pointer-events-auto">
                            <RoomMusicPlayer />
                        </div>
                        <div className="pointer-events-auto">
                            <ActiveUsers
                                members={activeMembers}
                                isOwner={true}
                                currentUserId={currentUser?.id}
                            />
                        </div>
                    </div>

                    {/* Bottom Center Presence */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                        <AnimatePresence>
                            {activeMembers.filter(m => m.isWriting).map(member => (
                                <motion.div
                                    key={member.userId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className="w-10 h-10 rounded-full border-2 border-primary-500 overflow-hidden shadow-lg shadow-primary-500/20">
                                        <img
                                            src={member.user.avatar || '/src/assets/images/cats/Cat (1).png'}
                                            alt={member.user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
                                        <p className="text-xs font-bold text-white/90">
                                            {member.user.name} is writing
                                        </p>
                                        <div className="flex gap-1">
                                            <motion.div
                                                animate={{ y: [0, -3, 0] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                                                className="w-1 h-1 rounded-full bg-primary-400"
                                            />
                                            <motion.div
                                                animate={{ y: [0, -3, 0] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                                className="w-1 h-1 rounded-full bg-primary-400"
                                            />
                                            <motion.div
                                                animate={{ y: [0, -3, 0] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                                className="w-1 h-1 rounded-full bg-primary-400"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <RoomSettingsOverlay
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                room={{
                    name: roomName,
                    description: roomDescription,
                    privacy: roomPrivacy
                }}
                onUpdateRoom={handleUpdateRoom}
                onDeleteRoom={handleDeleteRoom}
            />
        </div>
    );
};

export default RoomPage;
