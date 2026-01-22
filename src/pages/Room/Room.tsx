import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
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
import * as presenceService from '../../services/presence.service';
import { WritingMemberIndicator } from '../../components/room/ActiveUsers/WritingMemberIndicator';



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
    const [roomPassword, setRoomPassword] = useState('');
    const [roomAvatar, setRoomAvatar] = useState('');
    const [roomOwnerId, setRoomOwnerId] = useState('');

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
                setRoomPassword(room.password || '');
                setRoomAvatar(room.avatar || '');
                setRoomOwnerId(room.owner.id);

                // Track recent visit
                if (currentUser) {
                    roomService.trackRecentVisit(currentUser.id, roomId);
                }

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

    // Memoized user data for presence to avoid unnecessary updates
    const userPresenceData = useMemo(() => {
        if (!currentUser) return null;
        return {
            id: currentUser.id,
            name: currentUser.name,
            username: currentUser.username,
            avatar: currentUser.avatar,
            email: currentUser.email
        };
    }, [currentUser?.id, currentUser?.name, currentUser?.username, currentUser?.avatar, currentUser?.email]);

    // Real-time Presence Subscription
    useEffect(() => {
        if (!roomId || !userPresenceData) return;

        // Join room presence
        presenceService.joinRoom(roomId, userPresenceData as any);

        // Subscribe to presence changes
        const unsubscribe = presenceService.subscribeToPresence(roomId, (presenceMembers) => {
            setActiveMembers(presenceMembers);
        });

        // Cleanup on unmount
        const handleUnload = () => {
            presenceService.leaveRoom(roomId, userPresenceData.id);
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            unsubscribe();
            presenceService.leaveRoom(roomId, userPresenceData.id);
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [roomId, userPresenceData]);


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
            let realId: string;
            if (type === 'image' && content instanceof File) {
                realId = await noteService.createImageNote(roomId, content, {
                    title: newNote.title,
                    x: newNote.x,
                    y: newNote.y,
                    width: newNote.width,
                    height: newNote.height,
                    color: newNote.color,
                    authorId: newNote.authorId
                });
            } else {
                realId = await noteService.createNote(roomId, {
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
            // Update the temporary ID with the real one
            setNotes(prev => prev.map(n => n.id === id ? { ...n, id: realId } : n));
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
            if (id.toString().startsWith('temp-')) return;
            await noteService.updateNote(roomId, id, updates);
        } catch (err) {
            console.error('Error updating note:', err);
            toast.error('Failed to update note');
        }
    }, [roomId]);

    const handleDuplicateNote = useCallback(async (id: string) => {
        if (id.toString().startsWith('temp-')) return;
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
        if (id.toString().startsWith('temp-')) {
            setNotes(prev => prev.filter(n => n.id !== id));
            return;
        }
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
            // Hash password if it changed
            let finalUpdates = { ...updates };
            if (updates.password && updates.password !== roomPassword) {
                finalUpdates.password = await roomService.hashPassword(updates.password);
            }

            await roomService.updateRoom(roomId, finalUpdates);
            if (updates.name !== undefined) setRoomName(updates.name);
            if (updates.description !== undefined) setRoomDescription(updates.description);
            if (updates.privacy !== undefined) setRoomPrivacy(updates.privacy);
            if (finalUpdates.password !== undefined) setRoomPassword(finalUpdates.password);
            if (updates.avatar !== undefined) setRoomAvatar(updates.avatar);

            toast.success('Room settings saved');
        } catch (err) {
            console.error('Error updating room:', err);
            toast.error('Failed to save settings');
        }
    }, [roomId, roomPassword]);

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

    const handleTyping = useCallback((isWriting: boolean) => {
        if (!roomId || !currentUser) return;
        presenceService.updateTypingStatus(roomId, currentUser.id, isWriting);
    }, [roomId, currentUser]);


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
                        onTyping={handleTyping}
                    />


                    <div className="absolute right-6 top-6 z-50 flex flex-col gap-4 pointer-events-none">
                        <div className="pointer-events-auto">
                            <RoomMusicPlayer />
                        </div>
                        <div className="pointer-events-auto">
                            <ActiveUsers
                                members={activeMembers}
                                isOwner={currentUser?.id === roomOwnerId}
                                currentUserId={currentUser?.id}
                            />
                        </div>
                    </div>

                    {/* Bottom Center Presence */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                        <AnimatePresence>
                            {activeMembers.filter(m => m.isWriting).map(member => (
                                <WritingMemberIndicator
                                    key={member.userId}
                                    userId={member.userId}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <RoomSettingsOverlay
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                room={{
                    id: roomId,
                    name: roomName,
                    description: roomDescription,
                    privacy: roomPrivacy,
                    password: roomPassword,
                    avatar: roomAvatar
                }}
                isOwner={currentUser?.id === roomOwnerId}
                onUpdateRoom={handleUpdateRoom}
                onDeleteRoom={handleDeleteRoom}
            />
        </div>
    );
};

export default RoomPage;
