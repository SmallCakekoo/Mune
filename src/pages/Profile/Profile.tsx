import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import ProfileHeader from '../../components/profile/ProfileHeader/ProfileHeader';
import FavoriteSongCard from '../../components/profile/FavoriteSongCard/FavoriteSongCard';
import FavoriteSongSelectionModal from '../../components/profile/FavoriteSongSelectionModal/FavoriteSongSelectionModal';
import RoomGrid from '../../components/profile/RoomGrid/RoomGrid';
import { useAuth } from '../../hooks/useAuth';
import { useSidebar } from '../../hooks/useSidebar';
import { cn } from '../../utils/cn';
import type { Room } from '../../types/room.types';
import * as roomService from '../../services/room.service';
import { Loader } from '../../components/common/Loader/Loader';
import EditRoomModal from '../../components/home/EditRoomModal/EditRoomModal';
import RoomDetailsModal from '../../components/home/RoomDetailsModal/RoomDetailsModal';
import toast from 'react-hot-toast';
import { IconPlus, IconEdit, IconTrash, IconFolderPlus, IconMusic } from '@tabler/icons-react';
import { Button } from '../../components/common/Button/Button';
import CreateRoomModal from '../../components/home/CreateRoomModal/CreateRoomModal';
import AddRoomToCategoryModal from '../../components/profile/AddRoomToCategoryModal/AddRoomToCategoryModal';
import ConfirmationDialog from '../../components/common/ConfirmationDialog/ConfirmationDialog';
import type { RoomPrivacy } from '../../types/room.types';
import type { Category } from '../../types/user.types';

const Profile: React.FC = () => {
    const { user, addCategory, removeCategory, updateCategory, addRoomToCategory, removeRoomFromCategory, updateFavoriteSongs, isLoading } = useAuth();
    const { isCollapsed } = useSidebar();
    const navigate = useNavigate();

    // Modal States
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);

    // Category Specific States
    const [isAddingRoomToCategoryId, setIsAddingRoomToCategoryId] = useState<string | null>(null);
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
    const [editCategoryName, setEditCategoryName] = useState('');

    // View Toggle State
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // New Category State
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const [rooms, setRooms] = useState<Room[]>([]);
    const [isLoadingRooms, setIsLoadingRooms] = useState(true);

    // Fetch rooms
    useEffect(() => {
        if (!user) return;
        const unsubscribe = roomService.subscribeToUserRooms(user.id, (fetchedRooms) => {
            setRooms(fetchedRooms);
            setIsLoadingRooms(false);
        });
        return () => unsubscribe();
    }, [user]);
    const [isFavModalOpen, setIsFavModalOpen] = useState(false);

    // Group Rooms Logic
    const categorizedRooms = useMemo(() => {
        if (!user) return [];
        const userCategories = user.categories || [];
        return userCategories.map((cat: Category) => ({
            ...cat,
            rooms: rooms.filter(r => cat.roomIds.includes(r.id))
        }));
    }, [user, rooms]);

    const uncategorizedRooms = useMemo(() => {
        if (!user) return [];
        const allCategorizedIds = (user.categories || []).flatMap(c => c.roomIds);
        return rooms.filter(r => r.owner.id === user.id && !allCategorizedIds.includes(r.id));
    }, [user, rooms]);

    const joinedRooms = useMemo(() =>
        rooms.filter(room => room.owner.id !== user?.id && room.members?.some(m => m.id === user?.id)),
        [user, rooms]);

    // Modal Handlers
    const handleViewDetails = (room: Room) => {
        setSelectedRoom(room);
        setIsDetailsModalOpen(true);
    };

    const handleEdit = (room: Room) => {
        setSelectedRoom(room);
        setIsEditModalOpen(true);
    };

    const handleEnterRoom = (room: Room) => {
        toast.success(`Entering ${room.name}...`);
        navigate(`/room/${room.id}`);
    };

    const handleUpdateRoom = async (data: { name: string; description?: string; privacy: RoomPrivacy; password?: string }) => {
        if (!selectedRoom) return;

        setRooms(prev => prev.map(r =>
            r.id === selectedRoom.id
                ? { ...r, ...data, updatedAt: new Date() }
                : r
        ));

        toast.success('Room updated successfully!');
        setIsEditModalOpen(false);
        setSelectedRoom(null);
    };

    const handleAddCategory = async () => {
        if (newCategoryName.trim()) {
            await addCategory(newCategoryName);
            toast.success(`Category "${newCategoryName}" created!`);
            setNewCategoryName('');
            setIsAddingCategory(false);
        }
    };

    const handleUpdateCategory = async () => {
        if (editingCategoryId && editCategoryName.trim()) {
            await updateCategory(editingCategoryId, editCategoryName);
            toast.success('Category updated!');
            setEditingCategoryId(null);
            setEditCategoryName('');
        }
    };

    const handleCreateRoom = async (data: { name: string; description?: string; privacy: RoomPrivacy; password?: string }) => {
        if (!user) return;

        const newRoom: Room = {
            id: `room-${Date.now()}`,
            name: data.name,
            description: data.description || '',
            privacy: data.privacy,
            password: data.password,
            owner: {
                id: user.id,
                name: user.name,
                avatar: user.avatar || undefined
            },
            members: [],
            memberCount: 1,
            songCount: 0,
            lastActivity: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        setRooms(prev => [newRoom, ...prev]);
        toast.success(`Room "${data.name}" created!`);
        setIsCreateModalOpen(false);
    };

    const handleAddRoomsToCategory = async (roomIds: string[]) => {
        if (isAddingRoomToCategoryId) {
            for (const roomId of roomIds) {
                await addRoomToCategory(isAddingRoomToCategoryId, roomId);
            }
            toast.success(`${roomIds.length} rooms added to category!`);
        }
    };

    const handleRemoveFromCategory = async (categoryId: string, roomId: string) => {
        await removeRoomFromCategory(categoryId, roomId);
        toast.success('Room removed from category');
    };

    if (isLoading || !user || isLoadingRooms) {
        return (
            <div className="min-h-screen bg-background-500 flex items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-500 text-white">
            {/* Background Elements */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-background-500 to-background-500 z-0" />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-0 mix-blend-overlay" />

            <Sidebar
                onCreateRoom={() => setIsCreateModalOpen(true)}
            />

            <main className={cn(
                "min-h-screen relative z-10 transition-all duration-300",
                isCollapsed ? "ml-0 md:ml-[80px]" : "ml-0 md:ml-[280px]"
            )}>
                <div className="container mx-auto px-6 py-8 pt-24 md:pt-12">
                    {/* Profile Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <ProfileHeader
                            user={user}
                            onSettingsClick={() => navigate('/settings')}
                        />
                        <div className="mt-8"></div>
                    </motion.div>

                    {/* Favorite Songs Section */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <IconMusic className="text-primary-400" size={24} />
                                Favorite Tracks
                            </h2>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsFavModalOpen(true)}
                                className="border-white/10 hover:bg-white/5"
                            >
                                <IconEdit size={16} />
                                Edit Favorites
                            </Button>
                        </div>

                        {user.favoriteSongs && user.favoriteSongs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.favoriteSongs.map((song, index) => (
                                    <FavoriteSongCard key={index} song={song} />
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 border-dashed text-center">
                                <p className="text-white italic">No favorite tracks selected yet.</p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsFavModalOpen(true)}
                                    className="mt-2 text-primary-400"
                                >
                                    Select Songs
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Collections Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Your Collections</h2>
                            <p className="text-sm text-neutral-5">Organize and manage your favorite rooms</p>
                        </div>
                        <div className="flex gap-3">
                            <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
                                <IconPlus size={18} />
                                Create Room
                            </Button>
                            {isAddingCategory ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                                        placeholder="Name..."
                                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-primary-500"
                                    />
                                    <Button size="sm" onClick={handleAddCategory}>Add</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setIsAddingCategory(false)}>✕</Button>
                                </div>
                            ) : (
                                <Button size="sm" variant="outline" onClick={() => setIsAddingCategory(true)} className="border-white/10">
                                    <IconPlus size={18} />
                                    Category
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Rooms Sections */}
                    <div className="space-y-10">
                        {/* Categorized Rooms */}
                        {categorizedRooms.map(cat => (
                            <div key={cat.id} className="relative group/cat space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {editingCategoryId === cat.id ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    value={editCategoryName}
                                                    onChange={(e) => setEditCategoryName(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateCategory()}
                                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-lg font-bold"
                                                />
                                                <Button size="sm" onClick={handleUpdateCategory}>Save</Button>
                                            </div>
                                        ) : (
                                            <>
                                                <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                                                <div className="flex items-center gap-1 opacity-0 group-hover/cat:opacity-100 transition-opacity">
                                                    <button onClick={() => { setEditingCategoryId(cat.id); setEditCategoryName(cat.name); }} className="p-1 text-neutral-5 hover:text-white"><IconEdit size={14} /></button>
                                                    <button onClick={() => {
                                                        setConfirmAction({
                                                            title: 'Delete Category',
                                                            message: `Delete "${cat.name}"?`,
                                                            onConfirm: () => { removeCategory(cat.id); setIsConfirmDialogOpen(false); }
                                                        });
                                                        setIsConfirmDialogOpen(true);
                                                    }} className="p-1 text-error-400"><IconTrash size={14} /></button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-primary-400 h-8 text-xs" onClick={() => setIsAddingRoomToCategoryId(cat.id)}>
                                        <IconFolderPlus size={14} /> Add Room
                                    </Button>
                                </div>
                                <RoomGrid
                                    rooms={cat.rooms}
                                    currentUserId={user.id}
                                    viewMode={viewMode}
                                    onViewModeChange={setViewMode}
                                    onViewDetails={handleViewDetails}
                                    onEdit={handleEdit}
                                    onEnter={handleEnterRoom}
                                    extraOptions={[{ label: 'Remove', icon: <IconTrash size={16} />, onClick: (room: Room) => handleRemoveFromCategory(cat.id, room.id), variant: 'danger' }]}
                                />
                            </div>
                        ))}

                        {/* Uncategorized & Joined */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white">Others</h3>
                            <RoomGrid
                                rooms={[...uncategorizedRooms, ...joinedRooms]}
                                currentUserId={user.id}
                                viewMode={viewMode}
                                onViewModeChange={setViewMode}
                                onViewDetails={handleViewDetails}
                                onEdit={handleEdit}
                                onEnter={handleEnterRoom}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <FavoriteSongSelectionModal
                isOpen={isFavModalOpen}
                onClose={() => setIsFavModalOpen(false)}
                currentFavorites={user.favoriteSongs || []}
                onSave={updateFavoriteSongs}
            />

            <EditRoomModal
                isOpen={isEditModalOpen}
                onClose={() => { setIsEditModalOpen(false); setSelectedRoom(null); }}
                room={selectedRoom}
                onSubmit={handleUpdateRoom}
            />

            <CreateRoomModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateRoom}
            />

            <RoomDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => { setIsDetailsModalOpen(false); setSelectedRoom(null); }}
                room={selectedRoom}
                onEnter={handleEnterRoom}
            />

            <AddRoomToCategoryModal
                isOpen={!!isAddingRoomToCategoryId}
                onClose={() => setIsAddingRoomToCategoryId(null)}
                categoryName={user.categories?.find(c => c.id === isAddingRoomToCategoryId)?.name || ''}
                availableRooms={rooms.filter(r => r.owner.id === user.id && !user.categories?.find(c => c.id === isAddingRoomToCategoryId)?.roomIds?.includes(r.id))}
                onAdd={handleAddRoomsToCategory}
            />

            <ConfirmationDialog
                isOpen={isConfirmDialogOpen}
                onClose={() => setIsConfirmDialogOpen(false)}
                onConfirm={confirmAction?.onConfirm || (() => { })}
                title={confirmAction?.title || ''}
                message={confirmAction?.message || ''}
                confirmText="Confirm"
                variant={confirmAction?.title?.includes('Delete') ? 'danger' : 'warning'}
            />
        </div>
    );
};

export default Profile;
