import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import RoomCard from '../../components/home/RoomCard/RoomCard';
import CreateRoomModal from '../../components/home/CreateRoomModal/CreateRoomModal';
import EditRoomModal from '../../components/home/EditRoomModal/EditRoomModal';
import RoomDetailsModal from '../../components/home/RoomDetailsModal/RoomDetailsModal';
import ConfirmationDialog from '../../components/common/ConfirmationDialog/ConfirmationDialog';
import TodoList from '../../components/home/TodoList/TodoList';
import { Button } from '../../components/common/Button/Button';
import { useSidebar } from '../../hooks/useSidebar';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';
import type { Room, RoomPrivacy } from '../../types/room.types';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import * as roomService from '../../services/room.service';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { isCollapsed } = useSidebar();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTodoListOpen, setIsTodoListOpen] = useState(false);

  // Fetch rooms
  useEffect(() => {
    if (!user) return;

    // Subscribe to user's rooms (real-time updates)
    const unsubscribe = roomService.subscribeToUserRooms(user.id, (fetchedRooms) => {
      setRooms(fetchedRooms);
      setIsLoadingRooms(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (isLoading) return null; // Or a loader

  // Filter rooms based on search query
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle create room
  const handleCreateRoom = async (data: {
    name: string;
    description?: string;
    privacy: RoomPrivacy;
    password?: string;
  }) => {
    if (!user) {
      console.error('Home: No user found when creating room');
      return;
    }

    console.log('Home: Creating room with data:', data);

    try {
      const roomId = await roomService.createRoom(user.id, {
        name: data.name,
        description: data.description,
        privacy: data.privacy,
        password: data.password
      });
      console.log('Home: Room created with ID:', roomId);

      toast.success('Room created successfully!');
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Home: Error creating room:', error);
      toast.error('Failed to create room');
    }
  };

  // Handle edit room
  const handleEditRoom = async (data: {
    name: string;
    description?: string;
    privacy: RoomPrivacy;
    password?: string;
  }) => {
    if (!selectedRoom) return;

    try {
      await roomService.updateRoom(selectedRoom.id, {
        name: data.name,
        description: data.description
      });

      if (selectedRoom.privacy !== data.privacy || data.password) {
        await roomService.updateRoomPrivacy(selectedRoom.id, data.privacy, data.password);
      }

      toast.success('Room updated successfully!');
      setIsEditModalOpen(false);
      setSelectedRoom(null);
    } catch (error) {
      console.error('Error updating room:', error);
      toast.error('Failed to update room');
    }
  };

  // Handle remove room logic
  const handleRemoveRoom = async () => {
    if (!selectedRoom) return;

    try {
      await roomService.deleteRoom(selectedRoom.id);
      toast.success('Room deleted');
      setIsConfirmDialogOpen(false);
      setSelectedRoom(null);
      setConfirmAction(null);
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error('Failed to delete room');
    }
  };

  // Handle view details
  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
    setIsDetailsModalOpen(true);
  };

  // Handle edit (owner only)
  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setIsEditModalOpen(true);
  };

  // Handle remove dialog trigger
  const handleRemove = (room: Room) => {
    setSelectedRoom(room);
    setConfirmAction(() => () => handleRemoveRoom());
    setIsConfirmDialogOpen(true);
  };

  // Handle enter room
  const handleEnterRoom = (room: Room) => {
    toast.success(`Entering ${room.name}...`);
    navigate(`/rooms/${room.id}`);
  };

  return (
    <div className="min-h-screen bg-background-500 text-white">
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

      {/* Sidebar - No userAvatar needed as it pulls from context */}
      <Sidebar onCreateRoom={() => setIsCreateModalOpen(true)} />

      {/* Main Content */}
      <main className={cn(
        "min-h-screen relative z-10 transition-all duration-300",
        isCollapsed ? "ml-0 md:ml-[80px]" : "ml-0 md:ml-[280px]"
      )}>
        <div className="container mx-auto px-6 py-8 md:py-8 pt-20 md:pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-lg text-neutral-5">
              Enter your space where ideas and music flow
            </p>
          </motion.div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <IconSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-5"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-96 pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <IconPlus size={18} />
                Create Room
              </Button>
            </div>
          </div>

          {/* Rooms Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Rooms</h2>

            {isLoadingRooms ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
              </div>
            ) : filteredRooms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 px-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <p className="text-neutral-5 text-lg mb-4">
                  {searchQuery
                    ? 'No rooms found matching your search'
                    : 'You don\'t have any rooms yet'}
                </p>
                {!searchQuery && (
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <IconPlus size={18} />
                    Create Your First Room
                  </Button>
                )}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <RoomCard
                      room={room}
                      currentUserId={user?.id || ''}
                      onViewDetails={handleViewDetails}
                      onEdit={handleEdit}
                      onRemove={handleRemove}
                      onEnter={handleEnterRoom}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRoom}
      />

      <EditRoomModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRoom(null);
        }}
        room={selectedRoom}
        onSubmit={handleEditRoom}
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

      <ConfirmationDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => {
          setIsConfirmDialogOpen(false);
          setSelectedRoom(null);
          setConfirmAction(null);
        }}
        onConfirm={confirmAction || (() => { })}
        title="Delete Room"
        message="Are you sure you want to delete this room? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Todo List Floating Button */}
      <TodoList isOpen={isTodoListOpen} onToggle={() => setIsTodoListOpen(!isTodoListOpen)} />
    </div>
  );
};

export default Home;
