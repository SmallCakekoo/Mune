import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import RoomCard from '../../components/home/RoomCard/RoomCard';
import CreateRoomModal from '../../components/home/CreateRoomModal/CreateRoomModal';
import EditRoomModal from '../../components/home/EditRoomModal/EditRoomModal';
import RoomDetailsModal from '../../components/home/RoomDetailsModal/RoomDetailsModal';
import ConfirmationDialog from '../../components/common/ConfirmationDialog/ConfirmationDialog';
import TodoList from '../../components/home/TodoList/TodoList';
import { Button } from '../../components/common/Button/Button';
import type { Room, RoomPrivacy } from '../../types/room.types';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import toast from 'react-hot-toast';

// Mock data - In production this would come from an API or context
const mockRooms: Room[] = [
  {
    id: '1',
    name: '¡Work in mune!',
    description: 'My creative space',
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
    description: 'Design and code',
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
    description: 'Creative projects',
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
    description: 'Music room',
    privacy: 'public',
    owner: {
      id: 'user1',
      name: 'Snow Cat',
      avatar: '/src/assets/images/cats/Cat (9).png',
    },
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-17'),
    lastActivity: new Date(Date.now() - 32400000), // 9h ago
    songCount: 124,
    memberCount: 12,
    members: [
      { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' },
      { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
      { id: 'user3', name: 'French Cat', avatar: '/src/assets/images/cats/Cat (3).png' },
      { id: 'user4', name: 'Cartoon Cat', avatar: '/src/assets/images/cats/Cat (4).png' },
      { id: 'user5', name: 'Tiny Music Cat', avatar: '/src/assets/images/cats/Cat (5).png' },
      { id: 'user6', name: 'Shy Cat', avatar: '/src/assets/images/cats/Cat (6).png' },
      { id: 'user7', name: 'Samurai Cat', avatar: '/src/assets/images/cats/Cat (7).png' },
      { id: 'user8', name: 'Maxwell Cat', avatar: '/src/assets/images/cats/Cat (8).png' },
    ],
  },
  {
    id: '5',
    name: 'AE is my pasion',
    description: 'After Effects workspace',
    privacy: 'private',
    password: 'ae123',
    owner: {
      id: 'user1',
      name: 'Snow Cat',
      avatar: '/src/assets/images/cats/Cat (9).png',
    },
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-16'),
    lastActivity: new Date(Date.now() - 43200000), // 12h ago
    songCount: 9,
    memberCount: 2,
    members: [
      { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' },
      { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
    ],
  },
  {
    id: '6',
    name: 'Celeste.',
    description: 'Beautiful workspace',
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
      { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' },
      { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
      { id: 'user4', name: 'Cartoon Cat', avatar: '/src/assets/images/cats/Cat (4).png' },
      { id: 'user5', name: 'Tiny Music Cat', avatar: '/src/assets/images/cats/Cat (5).png' },
    ],
  },
];

const Home: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTodoListOpen, setIsTodoListOpen] = useState(false);

  const currentUserId = 'user1'; // In production this would come from the authentication context

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
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: data.name,
      description: data.description,
      privacy: data.privacy,
      password: data.password,
      owner: {
        id: currentUserId,
        name: 'Snow Cat',
        avatar: '/src/assets/images/cats/Cat (9).png',
      },
      members: [
        {
          id: currentUserId,
          name: 'Snow Cat',
          avatar: '/src/assets/images/cats/Cat (9).png',
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActivity: new Date(),
      songCount: 0,
      memberCount: 1,
    };

    setRooms([newRoom, ...rooms]);
    toast.success('Room created successfully!');
    setIsCreateModalOpen(false);
  };

  // Handle edit room
  const handleEditRoom = async (data: {
    name: string;
    description?: string;
    privacy: RoomPrivacy;
    password?: string;
  }) => {
    if (!selectedRoom) return;

    const updatedRooms = rooms.map((room) =>
      room.id === selectedRoom.id
        ? {
          ...room,
          ...data,
          updatedAt: new Date(),
        }
        : room
    );

    setRooms(updatedRooms);
    toast.success('Room updated successfully!');
    setIsEditModalOpen(false);
    setSelectedRoom(null);
  };

  // Handle remove room
  const handleRemoveRoom = () => {
    if (!selectedRoom) return;

    setRooms(rooms.filter((room) => room.id !== selectedRoom.id));
    toast.success('Room removed from recent');
    setIsConfirmDialogOpen(false);
    setSelectedRoom(null);
    setConfirmAction(null);
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

  // Handle remove
  const handleRemove = (room: Room) => {
    setSelectedRoom(room);
    setConfirmAction(() => () => handleRemoveRoom());
    setIsConfirmDialogOpen(true);
  };

  // Handle enter room
  const handleEnterRoom = (room: Room) => {
    // In production this would navigate to /room/:id
    toast.success(`Entering ${room.name}...`);
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

      {/* Sidebar */}
      <Sidebar
        onCreateRoom={() => setIsCreateModalOpen(true)}
        userAvatar="/src/assets/images/cats/Cat (9).png"
      />

      {/* Main Content */}
      <main className="ml-0 md:ml-[80px] lg:ml-[280px] min-h-screen relative z-10 transition-all duration-300">
        <div className="container mx-auto px-6 py-8 md:py-8 pt-20 md:pt-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, Snow Cat
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
                Create New Room
              </Button>
            </div>
          </div>

          {/* Rooms Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Recent Rooms</h2>

            {filteredRooms.length === 0 ? (
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
                      currentUserId={currentUserId}
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
        title="Remove Room from Recent"
        message="Are you sure you want to remove this room from your recent rooms? This will not delete the room."
        confirmText="Remove"
        cancelText="Cancel"
        variant="warning"
      />

      {/* Todo List Floating Button */}
      <TodoList isOpen={isTodoListOpen} onToggle={() => setIsTodoListOpen(!isTodoListOpen)} />
    </div>
  );
};

export default Home;
