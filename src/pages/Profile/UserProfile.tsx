import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { IconMusic } from '@tabler/icons-react';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import ProfileHeader from '../../components/profile/ProfileHeader/ProfileHeader';
import FavoriteSongCard from '../../components/profile/FavoriteSongCard/FavoriteSongCard';
import RoomGrid from '../../components/profile/RoomGrid/RoomGrid';
import { useAuth } from '../../context/AuthContext';
import type { User } from '../../types/user.types';
import type { Room } from '../../types/room.types';
import { Loader } from '../../components/common/Loader/Loader';
import RoomDetailsModal from '../../components/home/RoomDetailsModal/RoomDetailsModal';
import toast from 'react-hot-toast';

import { MOCK_USERS, MOCK_USER_ROOMS } from '../../data/mockUsers';

const UserProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    useEffect(() => {
        // Mocking an API call to fetch user by ID
        const timer = setTimeout(() => {
            if (id === currentUser?.id) {
                navigate('/profile');
            } else if (id && MOCK_USERS[id]) {
                setUser(MOCK_USERS[id]);
                setRooms(MOCK_USER_ROOMS[id] || []);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [id, currentUser, navigate]);

    const handleViewDetails = (room: Room) => {
        setSelectedRoom(room);
        setIsDetailsModalOpen(true);
    };

    const handleEnterRoom = (room: Room) => {
        toast.success(`Entering ${room.name}...`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background-500 flex items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-background-500 text-white flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-3xl font-bold mb-4">User Not Found</h2>
                <p className="text-white mb-8">The user you're looking for doesn't exist or has been moved.</p>
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
        <div className="min-h-screen bg-background-500 text-white">
            {/* Background Elements */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-background-500 to-background-500 z-0" />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-0 mix-blend-overlay" />

            <Sidebar userAvatar={currentUser?.avatar} />

            <main className="ml-0 md:ml-[80px] lg:ml-[280px] min-h-screen relative z-10 transition-all duration-300">
                <div className="container mx-auto px-6 py-8 pt-24 md:pt-12">
                    {/* Profile Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <ProfileHeader
                            user={user}
                            isOwnProfile={false}
                        />
                    </motion.div>

                    {/* Content Section */}
                    <div className="space-y-12">
                        {/* Favorite Songs Section */}
                        {user.favoriteSongs && user.favoriteSongs.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <IconMusic className="text-primary-400" size={24} />
                                    Favorite Tracks
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {user.favoriteSongs.map((song, index) => (
                                        <FavoriteSongCard key={index} song={song} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Public Rooms */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-8">Public Rooms Created</h2>
                            <RoomGrid
                                rooms={rooms}
                                currentUserId={currentUser?.id}
                                viewMode={viewMode}
                                onViewModeChange={setViewMode}
                                onViewDetails={handleViewDetails}
                                onEnter={handleEnterRoom}
                                emptyMessage={`${user.name} hasn't created any public rooms yet.`}
                            />
                        </section>
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
        </div>
    );
};

export default UserProfile;
