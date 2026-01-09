import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    IconSearch,
    IconFilter,
    IconWorld,
    IconLock,
    IconCheck,
    IconUser,
    IconUsers,
    IconX
} from '@tabler/icons-react';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import RoomCard from '../../components/home/RoomCard/RoomCard';
import RoomDetailsModal from '../../components/home/RoomDetailsModal/RoomDetailsModal';
import CreateRoomModal from '../../components/home/CreateRoomModal/CreateRoomModal';
import { Button } from '../../components/common/Button/Button';
import type { Room } from '../../types/room.types';
import { useSidebar } from '../../context/SidebarContext';
import { cn } from '../../utils/cn';
import toast from 'react-hot-toast';

// Mock data - In production this would come from an API or context
const mockRooms: Room[] = [
    {
        id: '1',
        name: '¡Work in mune!',
        description: 'My creative space where ideas and music flow together. Join us for a productive session!',
        privacy: 'public',
        owner: {
            id: 'user1',
            name: 'Snow Cat',
            avatar: '/src/assets/images/cats/Cat (9).png',
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
        lastActivity: new Date(Date.now() - 3600000), // 1h ago
        songCount: 34,
        memberCount: 5,
        members: [
            { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' },
            { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
            { id: 'user3', name: 'French Cat', avatar: '/src/assets/images/cats/Cat (3).png' },
            { id: 'user4', name: 'Cartoon Cat', avatar: '/src/assets/images/cats/Cat (4).png' },
            { id: 'user5', name: 'Tiny Music Cat', avatar: '/src/assets/images/cats/Cat (5).png' },
        ],
    },
    {
        id: '2',
        name: 'DCA',
        description: 'Design and code. A private space for focused developers.',
        privacy: 'private',
        password: '1234',
        owner: {
            id: 'user1',
            name: 'Snow Cat',
            avatar: '/src/assets/images/cats/Cat (9).png',
        },
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18'),
        lastActivity: new Date(Date.now() - 7200000), // 2h ago
        songCount: 39,
        memberCount: 3,
        members: [
            { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' },
            { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
            { id: 'user3', name: 'French Cat', avatar: '/src/assets/images/cats/Cat (3).png' },
        ],
    },
    {
        id: '3',
        name: 'PixelDNA :)',
        description: 'Creative projects and pixel art discussions.',
        privacy: 'public',
        owner: {
            id: 'user2',
            name: 'Soviet Cat',
            avatar: '/src/assets/images/cats/Cat (2).png',
        },
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-19'),
        lastActivity: new Date(Date.now() - 18000000), // 5h ago
        songCount: 21,
        memberCount: 7,
        members: [
            { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
            { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' },
            { id: 'user3', name: 'French Cat', avatar: '/src/assets/images/cats/Cat (3).png' },
            { id: 'user4', name: 'Cartoon Cat', avatar: '/src/assets/images/cats/Cat (4).png' },
            { id: 'user5', name: 'Tiny Music Cat', avatar: '/src/assets/images/cats/Cat (5).png' },
            { id: 'user6', name: 'Shy Cat', avatar: '/src/assets/images/cats/Cat (6).png' },
            { id: 'user7', name: 'Samurai Cat', avatar: '/src/assets/images/cats/Cat (7).png' },
        ],
    },
    {
        id: '4',
        name: '¡bRUUh!',
        description: 'The loudest music room in the city. Feel the bass!',
        privacy: 'public',
        owner: {
            id: 'user4',
            name: 'Cartoon Cat',
            avatar: '/src/assets/images/cats/Cat (4).png',
        },
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-17'),
        lastActivity: new Date(Date.now() - 32400000), // 9h ago
        songCount: 124,
        memberCount: 12,
        members: [
            { id: 'user4', name: 'Cartoon Cat', avatar: '/src/assets/images/cats/Cat (4).png' },
            { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
            { id: 'user3', name: 'French Cat', avatar: '/src/assets/images/cats/Cat (3).png' },
        ],
    },
    {
        id: '5',
        name: 'AE is my passion',
        description: 'After Effects workspace. Motion graphics lovers only.',
        privacy: 'private',
        password: 'ae123',
        owner: {
            id: 'user5',
            name: 'Tiny Music Cat',
            avatar: '/src/assets/images/cats/Cat (5).png',
        },
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-16'),
        lastActivity: new Date(Date.now() - 43200000), // 12h ago
        songCount: 9,
        memberCount: 2,
        members: [
            { id: 'user5', name: 'Tiny Music Cat', avatar: '/src/assets/images/cats/Cat (5).png' },
            { id: 'user6', name: 'Shy Cat', avatar: '/src/assets/images/cats/Cat (6).png' },
        ],
    },
    {
        id: '6',
        name: 'Celeste.',
        description: 'Beautiful workspace inspired by the mountains.',
        privacy: 'public',
        owner: {
            id: 'user3',
            name: 'French Cat',
            avatar: '/src/assets/images/cats/Cat (3).png',
        },
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-15'),
        lastActivity: new Date(Date.now() - 54000000), // 15h ago
        songCount: 123,
        memberCount: 8,
        members: [
            { id: 'user3', name: 'French Cat', avatar: '/src/assets/images/cats/Cat (3).png' },
            { id: 'user4', name: 'Cartoon Cat', avatar: '/src/assets/images/cats/Cat (4).png' },
            { id: 'user5', name: 'Tiny Music Cat', avatar: '/src/assets/images/cats/Cat (5).png' },
        ],
    },
];

const Search: React.FC = () => {
    const navigate = useNavigate();
    const { isCollapsed } = useSidebar();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [privacyFilter, setPrivacyFilter] = useState<'all' | 'public' | 'private'>('all');
    const [joinedFilter, setJoinedFilter] = useState<'all' | 'joined' | 'not_joined'>('all');
    const [ownedFilter, setOwnedFilter] = useState(false);

    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const currentUserId = 'user1';

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Filter logic
    const filteredRooms = useMemo(() => {
        return mockRooms.filter(room => {
            // Search matching
            const matchesSearch = room.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                room.description?.toLowerCase().includes(debouncedQuery.toLowerCase());

            if (!matchesSearch) return false;

            // Privacy filter
            if (privacyFilter !== 'all' && room.privacy !== privacyFilter) return false;

            // Joined filter
            const isJoined = room.members?.some(m => m.id === currentUserId) || false;
            if (joinedFilter === 'joined' && !isJoined) return false;
            if (joinedFilter === 'not_joined' && isJoined) return false;

            // Owned filter
            if (ownedFilter && room.owner.id !== currentUserId) return false;

            return true;
        });
    }, [debouncedQuery, privacyFilter, joinedFilter, ownedFilter, currentUserId]);

    const handleEnterRoom = (room: Room) => {
        toast.success(`Entering ${room.name}...`);
        navigate(`/room/${room.id}`);
    };

    const handleViewDetails = (room: Room) => {
        setSelectedRoom(room);
        setIsDetailsModalOpen(true);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setPrivacyFilter('all');
        setJoinedFilter('all');
        setOwnedFilter(false);
    };

    const handleCreateRoom = (data: any) => {
        toast.success(`Room "${data.name}" created! Redirecting to home...`);
        setIsCreateModalOpen(false);
        navigate('/home');
    };

    return (
        <div className="min-h-screen bg-background-500 text-white selection:bg-primary-500/30">
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
                onCreateRoom={() => setIsCreateModalOpen(true)}
                userAvatar="/src/assets/images/cats/Cat (9).png"
            />

            <main className={cn(
                "min-h-screen relative z-10 transition-all duration-300",
                isCollapsed ? "ml-0 md:ml-[80px]" : "ml-0 md:ml-[280px]"
            )}>
                <div className="container mx-auto px-6 py-8 pt-20 md:pt-8 min-h-screen flex flex-col">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-bold text-white mb-2">Explore Rooms</h1>
                        <p className="text-lg text-neutral-5">
                            Discover public and private spaces to share music and ideas.
                        </p>
                    </motion.div>

                    {/* Search and Filters Section */}
                    <div className="bg-background-400/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 shadow-2xl">
                        <div className="flex flex-col gap-6">
                            {/* Search Input */}
                            <div className="relative">
                                <IconSearch
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-5"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    placeholder="Search by room name or description..."
                                    value={searchQuery}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all text-lg"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-5 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                                    >
                                        <IconX size={18} />
                                    </button>
                                )}
                            </div>

                            {/* Filters */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold text-neutral-5 uppercase tracking-wider">Privacy</span>
                                    <div className="flex gap-2">
                                        {[
                                            { id: 'all', label: 'All', icon: <IconFilter size={16} /> },
                                            { id: 'public', label: 'Public', icon: <IconWorld size={16} /> },
                                            { id: 'private', label: 'Private', icon: <IconLock size={16} /> }
                                        ].map(f => (
                                            <button
                                                key={f.id}
                                                onClick={() => setPrivacyFilter(f.id as any)}
                                                className={cn(
                                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                                                    privacyFilter === f.id
                                                        ? "bg-primary-500 border-primary-400 text-white shadow-lg shadow-primary-500/20"
                                                        : "bg-white/5 border-white/10 text-neutral-5 hover:text-white hover:bg-white/10"
                                                )}
                                            >
                                                {f.icon}
                                                {f.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />

                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold text-neutral-5 uppercase tracking-wider">Status</span>
                                    <div className="flex gap-2">
                                        {[
                                            { id: 'all', label: 'Any', icon: <IconUsers size={16} /> },
                                            { id: 'joined', label: 'Joined', icon: <IconCheck size={16} /> },
                                            { id: 'not_joined', label: 'Not Joined', icon: <IconX size={16} /> }
                                        ].map(f => (
                                            <button
                                                key={f.id}
                                                onClick={() => setJoinedFilter(f.id as any)}
                                                className={cn(
                                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                                                    joinedFilter === f.id
                                                        ? "bg-secondary-cyan-500 border-secondary-cyan-400 text-white shadow-lg shadow-secondary-cyan-500/20"
                                                        : "bg-white/5 border-white/10 text-neutral-5 hover:text-white hover:bg-white/10"
                                                )}
                                            >
                                                {f.icon}
                                                {f.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />

                                <div className="flex flex-col gap-2">
                                    <span className="text-xs font-semibold text-neutral-5 uppercase tracking-wider">Ownership</span>
                                    <button
                                        onClick={() => setOwnedFilter(!ownedFilter)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                                            ownedFilter
                                                ? "bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-600/20"
                                                : "bg-white/5 border-white/10 text-neutral-5 hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        <IconUser size={16} />
                                        Owned by me
                                    </button>
                                </div>

                                {/* Clear Button */}
                                {(searchQuery || privacyFilter !== 'all' || joinedFilter !== 'all' || ownedFilter) && (
                                    <button
                                        onClick={clearFilters}
                                        className="mt-auto mb-1 text-sm text-neutral-5 hover:text-white transition-colors underline underline-offset-4"
                                    >
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">
                                {filteredRooms.length} {filteredRooms.length === 1 ? 'Room' : 'Rooms'} found
                            </h2>
                        </div>

                        <AnimatePresence mode="popLayout">
                            {filteredRooms.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl bg-white/5 border border-white/10 text-center"
                                >
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                        <IconSearch size={40} className="text-neutral-5" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">No rooms found</h3>
                                    <p className="text-neutral-5 text-lg max-w-md">
                                        We couldn't find any rooms matching your current search and filters. Try adjusting them!
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="mt-8"
                                        onClick={clearFilters}
                                    >
                                        Clear Filters
                                    </Button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    layout
                                >
                                    {filteredRooms.map((room: Room, index: number) => (
                                        <motion.div
                                            key={room.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <RoomCard
                                                room={room}
                                                currentUserId={currentUserId}
                                                onViewDetails={handleViewDetails}
                                                onEnter={handleEnterRoom}
                                            // Search page might not need Edit/Remove in the same way Home does
                                            // but they are available in the component. 
                                            // For now we only pass VIEW and ENTER as requested.
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <RoomDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => {
                    setIsDetailsModalOpen(false);
                    setSelectedRoom(null);
                }}
                room={selectedRoom}
                onEnter={handleEnterRoom}
            />

            <CreateRoomModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateRoom}
            />
        </div>
    );
};

export default Search;
