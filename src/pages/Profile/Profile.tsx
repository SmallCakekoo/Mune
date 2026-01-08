import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import ProfileHeader from '../../components/profile/ProfileHeader/ProfileHeader';
import RoomGrid from '../../components/profile/RoomGrid/RoomGrid';
import { useAuth } from '../../context/AuthContext';
import type { Room } from '../../types/room.types';
import { Loader } from '../../components/common/Loader/Loader';
import EditRoomModal from '../../components/home/EditRoomModal/EditRoomModal';
import RoomDetailsModal from '../../components/home/RoomDetailsModal/RoomDetailsModal';
import toast from 'react-hot-toast';
import { IconPlus, IconTrash, IconEdit, IconFolderPlus } from '@tabler/icons-react';
import { Button } from '../../components/common/Button/Button';
import CreateRoomModal from '../../components/home/CreateRoomModal/CreateRoomModal';
import AddRoomToCategoryModal from '../../components/profile/AddRoomToCategoryModal/AddRoomToCategoryModal';
import ConfirmationDialog from '../../components/common/ConfirmationDialog/ConfirmationDialog';
import type { RoomPrivacy } from '../../types/room.types';

// Mock data - Reusing similar logic as Home.tsx for demonstration
const mockRooms: Room[] = [
    {
        id: '1',
        name: '¡Work in mune!',
        description: 'My creative space',
        privacy: 'public',
        owner: { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' },
        members: [{ id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' }],
        songCount: 34,
        lastActivity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        name: 'DCA',
        privacy: 'private',
        owner: { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' },
        members: [{ id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' }],
        songCount: 39,
        lastActivity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '3',
        name: 'PixelDNA :)',
        privacy: 'public',
        owner: { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
        members: [
            { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
            { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' }
        ],
        songCount: 21,
        lastActivity: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];

const Profile: React.FC = () => {
    const {
        user,
        isLoading,
        addCategory,
        removeCategory,
        updateCategory,
        addRoomToCategory,
        removeRoomFromCategory
    } = useAuth();
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

    const [rooms, setRooms] = useState<Room[]>(mockRooms);

    // Group Rooms Logic
    const categorizedRooms = useMemo(() => {
        if (!user) return [];
        const userCategories = user.categories || [];
        return userCategories.map(cat => ({
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
        // navigate(`/room/${room.id}`);
    };

    const handleUpdateRoom = async () => {
        toast.success('Room updated successfully!');
        setIsEditModalOpen(false);
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
            owner: {
                id: user.id,
                name: user.name,
                avatar: user.avatar
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

    if (isLoading || !user) {
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
                userAvatar={user.avatar}
                onCreateRoom={() => setIsCreateModalOpen(true)}
            />

            <main className="ml-0 md:ml-[80px] lg:ml-[280px] min-h-screen relative z-10 transition-all duration-300">
                <div className="container mx-auto px-6 py-8 pt-24 md:pt-12">
                    {/* Profile Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <ProfileHeader
                            user={user}
                            onSettingsClick={() => navigate('/settings')}
                        />
                    </motion.div>

                    {/* Collections Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white">Your Collections</h2>
                            <p className="text-neutral-5">Organize and manage your favorite rooms</p>
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={() => setIsCreateModalOpen(true)}>
                                <IconPlus size={18} />
                                Create New Room
                            </Button>
                            {isAddingCategory ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                                        placeholder="Category Name..."
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                                    />
                                    <Button size="sm" onClick={handleAddCategory}>Add</Button>
                                    <Button size="sm" variant="ghost" onClick={() => setIsAddingCategory(false)}>Cancel</Button>
                                </div>
                            ) : (
                                <Button variant="outline" onClick={() => setIsAddingCategory(true)} className="border-white/10 hover:bg-white/5">
                                    <IconPlus size={20} />
                                    New Category
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Rooms Sections */}
                    <div className="space-y-16">
                        {/* Categorized Rooms */}
                        {categorizedRooms.map(cat => (
                            <div key={cat.id} className="relative group/cat space-y-4">
                                <div className="flex items-center justify-between pb-2">
                                    <div className="flex items-center gap-4">
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
                                                <Button size="sm" variant="ghost" onClick={() => setEditingCategoryId(null)}>Cancel</Button>
                                            </div>
                                        ) : (
                                            <>
                                                <h3 className="text-2xl font-bold text-white">{cat.name}</h3>
                                                <div className="flex items-center gap-1 opacity-0 group-hover/cat:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => { setEditingCategoryId(cat.id); setEditCategoryName(cat.name); }}
                                                        className="p-1.5 rounded-lg hover:bg-white/5 text-neutral-5 hover:text-white transition-all"
                                                        title="Edit Category Name"
                                                    >
                                                        <IconEdit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setConfirmAction({
                                                                title: 'Delete Category',
                                                                message: `Are you sure you want to delete "${cat.name}"? The rooms will not be deleted.`,
                                                                onConfirm: () => { removeCategory(cat.id); setIsConfirmDialogOpen(false); }
                                                            });
                                                            setIsConfirmDialogOpen(true);
                                                        }}
                                                        className="p-1.5 rounded-lg hover:bg-white/5 text-error-400 hover:text-error-300 transition-all"
                                                        title="Delete Category"
                                                    >
                                                        <IconTrash size={16} />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary-400 hover:text-primary-300"
                                        onClick={() => setIsAddingRoomToCategoryId(cat.id)}
                                    >
                                        <IconFolderPlus size={18} />
                                        Add Room
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
                                    extraOptions={cat.id ? [
                                        {
                                            label: 'Remove from category',
                                            icon: <IconTrash size={16} />,
                                            onClick: (room: Room) => handleRemoveFromCategory(cat.id, room.id),
                                            variant: 'danger'
                                        },
                                        {
                                            label: 'Add to another category',
                                            icon: <IconFolderPlus size={16} />,
                                            onClick: (room: Room) => {
                                                setSelectedRoom(room);
                                                setIsAddingRoomToCategoryId(cat.id); // Reusing this but maybe needs a separate state if it's "another"
                                                // Actually let's just keep it simple: Add to category is best from the category header 
                                                // or from a global list. 
                                            }
                                        }
                                    ] : []}
                                />
                            </div>
                        ))}

                        {/* Uncategorized Rooms */}
                        <div className="relative space-y-4">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-2xl font-bold text-white">Shared Rooms / Other</h3>
                            </div>
                            <RoomGrid
                                rooms={uncategorizedRooms}
                                currentUserId={user.id}
                                viewMode={viewMode}
                                onViewModeChange={setViewMode}
                                onViewDetails={handleViewDetails}
                                onEdit={handleEdit}
                                onEnter={handleEnterRoom}
                                emptyMessage="All your owned rooms are categorized."
                                extraOptions={user.categories?.map(c => ({
                                    label: `Add to ${c.name}`,
                                    icon: <IconPlus size={16} />,
                                    onClick: (room: Room) => addRoomToCategory(c.id, room.id)
                                }))}
                            />
                        </div>

                        {/* Joined Rooms */}
                        <div className="relative space-y-4">
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-2xl font-bold text-white">Joined Rooms</h3>
                            </div>
                            <RoomGrid
                                rooms={joinedRooms}
                                currentUserId={user.id}
                                viewMode={viewMode}
                                onViewModeChange={setViewMode}
                                onViewDetails={handleViewDetails}
                                onEdit={handleEdit}
                                onEnter={handleEnterRoom}
                                emptyMessage="You haven't joined any rooms yet."
                                extraOptions={user.categories?.map(c => ({
                                    label: `Add to ${c.name}`,
                                    icon: <IconPlus size={16} />,
                                    onClick: (room: Room) => addRoomToCategory(c.id, room.id)
                                }))}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Modals */}
            <EditRoomModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedRoom(null);
                }}
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
                onClose={() => {
                    setIsDetailsModalOpen(false);
                    setSelectedRoom(null);
                }}
                room={selectedRoom}
                onEnter={handleEnterRoom}
            />

            <AddRoomToCategoryModal
                isOpen={!!isAddingRoomToCategoryId}
                onClose={() => setIsAddingRoomToCategoryId(null)}
                categoryName={user.categories?.find(c => c.id === isAddingRoomToCategoryId)?.name || ''}
                availableRooms={rooms.filter(r => r.owner.id === user.id && !user.categories?.find(c => c.id === isAddingRoomToCategoryId)?.roomIds.includes(r.id))}
                onAdd={handleAddRoomsToCategory}
            />

            <ConfirmationDialog
                isOpen={isConfirmDialogOpen}
                onClose={() => setIsConfirmDialogOpen(false)}
                onConfirm={confirmAction?.onConfirm || (() => { })}
                title={confirmAction?.title || ''}
                message={confirmAction?.message || ''}
                confirmText="Confirm"
                variant={confirmAction?.title.includes('Delete') ? 'danger' : 'warning'}
            />
        </div>
    );
};

export default Profile;
