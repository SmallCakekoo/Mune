import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  IconDots,
  IconEye,
  IconEdit,
  IconTrash,
  IconLock,
  IconWorld,
  IconPlayerPlay,
} from '@tabler/icons-react';
import type { Room } from '../../../types/room.types';
import { cn } from '../../../utils/cn';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';

interface RoomCardProps {
  room: Room;
  currentUserId?: string;
  onViewDetails?: (room: Room) => void;
  onEdit?: (room: Room) => void;
  onRemove?: (room: Room) => void;
  onEnter?: (room: Room) => void;
  extraOptions?: {
    label: string,
    icon: React.ReactNode,
    onClick: (room: Room) => void,
    variant?: 'default' | 'danger'
  }[];
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  currentUserId,
  onViewDetails,
  onEdit,
  onRemove,
  onEnter,
  extraOptions
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isOwner = room.owner.id === currentUserId;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleEnter = () => {
    if (onEnter) {
      onEnter(room);
    } else {
      navigate(`/room/${room.id}`);
    }
  };

  const handleViewDetails = () => {
    setIsMenuOpen(false);
    if (onViewDetails) {
      onViewDetails(room);
    }
  };

  const handleEdit = () => {
    setIsMenuOpen(false);
    if (onEdit) {
      onEdit(room);
    }
  };

  const handleRemove = () => {
    setIsMenuOpen(false);
    if (onRemove) {
      onRemove(room);
    }
  };

  const formatLastActivity = () => {
    if (!room.lastActivity) return '';
    try {
      const date =
        typeof room.lastActivity === 'string'
          ? new Date(room.lastActivity)
          : room.lastActivity;
      const distance = formatDistanceToNow(date, { addSuffix: false, locale: enUS });
      return `${distance} ago`;
    } catch {
      return '';
    }
  };

  // Get random cat avatar for owner if not provided
  const getOwnerAvatar = () => {
    if (room.owner.avatar) return room.owner.avatar;
    const catNumber = ((room.owner.id?.charCodeAt(0) || 0) % 40) + 1;
    return `/src/assets/images/cats/Cat (${catNumber}).png`;
  };

  // Gradient colors for cards - Using theme variables
  const gradientIndex = room.id?.charCodeAt(0) % 4 || 0;
  const gradients = [
    'from-primary-500/20 to-primary-600/20',
    'from-secondary-cyan-500/20 to-primary-500/20',
    'from-primary-600/20 to-secondary-cyan-500/20',
    'from-primary-500/30 to-background-400',
  ];
  const gradient = gradients[gradientIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className={cn(
        'relative rounded-2xl p-6 border border-white/10',
        'bg-background-400/50 backdrop-blur-xl',
        'hover:border-primary-500/30 transition-all cursor-pointer',
        'group'
      )}
    >
      {/* Background Gradient */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl',
          gradient
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {room.privacy === 'private' ? (
                <IconLock size={16} className="text-neutral-5 flex-shrink-0" />
              ) : (
                <IconWorld size={16} className="text-neutral-5 flex-shrink-0" />
              )}
              <h3 className="text-lg font-bold text-white truncate">
                {room.name}
              </h3>
            </div>
            {room.description && (
              <p className="text-sm text-neutral-5 line-clamp-2 mb-3">
                {room.description}
              </p>
            )}
          </div>

          {/* Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="p-2 rounded-lg text-neutral-5 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Room options"
            >
              <IconDots size={20} />
            </button>

            {/* Context Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-background-400 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  <button
                    onClick={handleViewDetails}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-neutral-5 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <IconEye size={18} />
                    <span>View details</span>
                  </button>
                  {isOwner && (
                    <button
                      onClick={handleEdit}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-neutral-5 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <IconEdit size={18} />
                      <span>Edit</span>
                    </button>
                  )}
                  <button
                    onClick={handleRemove}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-error-400 hover:text-error-300 hover:bg-error-500/10 transition-colors"
                  >
                    <IconTrash size={18} />
                    <span>Remove from recent</span>
                  </button>
                  {extraOptions?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); option.onClick(room); }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                        option.variant === 'danger' ? "text-error-400 hover:text-error-300 hover:bg-error-500/10" : "text-neutral-5 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Owner Info - Always displayed */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <img
              src={getOwnerAvatar()}
              alt={room.owner.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-primary-500/30"
              onError={(e) => {
                const catNumber = ((room.owner.id?.charCodeAt(0) || 0) % 40) + 1;
                e.currentTarget.src = `/src/assets/images/cats/Cat (${catNumber}).png`;
              }}
            />
            <p className="text-xs text-neutral-5 truncate">
              Created by: {room.owner.name}
            </p>
          </div>
        </div>

        {/* Members Avatars */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            {room.members && room.members.length > 0 ? (
              <>
                <div className="flex -space-x-2">
                  {room.members.slice(0, 5).map((member, index) => {
                    const memberAvatar = member.avatar || `/src/assets/images/cats/Cat (${((member.id?.charCodeAt(0) || 0) % 40) + 1}).png`;
                    return (
                      <img
                        key={member.id || index}
                        src={memberAvatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-background-400"
                        title={member.name}
                        onError={(e) => {
                          const catNumber = ((member.id?.charCodeAt(0) || 0) % 40) + 1;
                          e.currentTarget.src = `/src/assets/images/cats/Cat (${catNumber}).png`;
                        }}
                      />
                    );
                  })}
                  {room.members.length > 5 && (
                    <div className="w-8 h-8 rounded-full border-2 border-background-400 bg-primary-500/20 flex items-center justify-center text-xs font-semibold text-white">
                      +{room.members.length - 5}
                    </div>
                  )}
                </div>
                <p className="text-xs text-neutral-5">
                  {room.members.length} {room.members.length === 1 ? 'member' : 'members'}
                </p>
              </>
            ) : (
              <p className="text-xs text-neutral-5">No members yet</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-neutral-5">
          {room.songCount !== undefined && (
            <span>{room.songCount} {room.songCount === 1 ? 'song' : 'songs'}</span>
          )}
          {room.lastActivity && (
            <span>Last activity: {formatLastActivity()}</span>
          )}
        </div>

        {/* Enter Button */}
        <motion.button
          onClick={handleEnter}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary-500 hover:bg-primary-400 text-white font-semibold transition-colors"
        >
          <IconPlayerPlay size={18} />
          <span>Enter</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RoomCard;
