import React, { useState } from 'react';
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
import { MOCK_USERS } from '../../data/mockUsers';
import type { Note, RoomPresence, TodoItem } from '../../types/room.types';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

const INITIAL_NOTES: Note[] = [
    {
        id: '1',
        type: 'text',
        title: 'Welcome to the Room!',
        content: 'This is a collaborative space for brainstorming and listening to music together.',
        x: 2500,
        y: 2500,
        color: '#ffeb3b',
        authorId: 'user1',
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        type: 'todo',
        title: 'Project Tasks',
        content: [
            { id: '1-1', text: 'Define layout', completed: true },
            { id: '1-2', text: 'Implement Zoom/Pan', completed: true },
            { id: '1-3', text: 'Add music player', completed: false }
        ],
        x: 2800,
        y: 2550,
        color: '#b2ebf2',
        authorId: 'user1',
        createdAt: new Date().toISOString()
    }
];

const RoomPage: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _roomId } = useParams<{ id: string }>();
    const { user: currentUser } = useAuth();
    const { isCollapsed } = useSidebar();
    const navigate = useNavigate();

    const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
    const [roomName, setRoomName] = useState('My Collaborative Space');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeMembers, _setActiveMembers] = useState<RoomPresence[]>([
        { userId: 'user1', user: MOCK_USERS['user1'], lastActive: new Date() },
        { userId: 'user2', user: MOCK_USERS['user2'], lastActive: new Date(), isWriting: true }
    ]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_scale, setScale] = useState(1);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleAddNote = (type: 'text' | 'todo' | 'image', x: number, y: number, content?: string | TodoItem[], width?: number, height?: number) => {
        const newNote: Note = {
            id: Date.now().toString(),
            type,
            title: type === 'text' ? 'New Note' : type === 'todo' ? 'New List' : 'New Image',
            content: content || (type === 'text' ? '' : type === 'todo' ? [] : ''),
            x,
            y,
            width: width || (type === 'image' ? 300 : 280),
            height: height || (type === 'image' ? undefined : 180),
            color: type === 'image' ? '#ffffff' : '#FEF9C3',
            authorId: currentUser?.id || 'anonymous',
            createdAt: new Date().toISOString()
        };
        setNotes([...notes, newNote]);
    };

    const handleUpdateNote = (id: string, updates: Partial<Note>) => {
        setNotes(notes.map(n => n.id === id ? { ...n, ...updates } : n));
    };

    const handleDuplicateNote = (id: string) => {
        const noteToDuplicate = notes.find(n => n.id === id);
        if (noteToDuplicate) {
            const newNote: Note = {
                ...noteToDuplicate,
                id: Date.now().toString(),
                x: noteToDuplicate.x + 20,
                y: noteToDuplicate.y + 20,
                createdAt: new Date().toISOString()
            };
            setNotes([...notes, newNote]);
            toast.success('Note duplicated');
        }
    };

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const handleClearCanvas = () => {
        setNotes([]);
        toast.success('Canvas cleared');
    };

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

            <Sidebar
                userAvatar={currentUser?.avatar || "/src/assets/images/cats/Cat (9).png"}
            />

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
                roomName={roomName}
                onNameChange={setRoomName}
                onDeleteRoom={() => {
                    toast.error('Room deleted');
                    navigate('/home');
                }}
            />
        </div>
    );
};

export default RoomPage;
