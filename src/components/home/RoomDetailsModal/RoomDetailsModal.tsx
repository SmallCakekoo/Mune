import React from 'react';
import Modal from '../../common/Modal/Modal';
import { Button } from '../../common/Button/Button';
import type { Room } from '../../../types/room.types';
import { IconLock, IconWorld, IconUsers, IconMusic, IconCalendar, IconUser, IconChevronRight } from '@tabler/icons-react';
import { formatDistanceToNow, format } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { cn } from '../../../utils/cn';
import { useNavigate } from 'react-router-dom';

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
  onEnter?: (room: Room) => void;
}

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({
  isOpen,
  onClose,
  room,
  onEnter,
}) => {
  const navigate = useNavigate();
  if (!room) return null;

  const formatDate = (date?: Date | string) => {
    if (!date) return 'Unknown';
    try {
      const d = typeof date === 'string' ? new Date(date) : date;
      return format(d, 'MMMM dd, yyyy', { locale: enUS });
    } catch {
      return 'Unknown';
    }
  };

  const formatLastActivity = () => {
    if (!room.lastActivity) return 'Never';
    try {
      const date =
        typeof room.lastActivity === 'string'
          ? new Date(room.lastActivity)
          : room.lastActivity;
      return formatDistanceToNow(date, { addSuffix: true, locale: enUS });
    } catch {
      return 'Never';
    }
  };

  const getOwnerAvatar = () => {
    if (room.owner.avatar) return room.owner.avatar;
    const catNumber = ((room.owner.id?.charCodeAt(0) || 0) % 40) + 1;
    return `/src/assets/images/cats/Cat (${catNumber}).png`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Room Details"
      size="lg"
    >
      <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            {room.privacy === 'private' ? (
              <IconLock size={24} className="text-primary-400" />
            ) : (
              <IconWorld size={24} className="text-primary-400" />
            )}
            <h3 className="text-2xl font-bold text-white">{room.name}</h3>
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-semibold',
                room.privacy === 'private'
                  ? 'bg-error-500/20 text-error-300 border border-error-500/30'
                  : 'bg-success-500/20 text-success-300 border border-success-500/30'
              )}
            >
              {room.privacy === 'private' ? 'Private' : 'Public'}
            </span>
          </div>
          {room.description && (
            <p className="text-neutral-5 leading-relaxed">{room.description}</p>
          )}
        </div>

        {/* Owner */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <img
            src={getOwnerAvatar()}
            alt={room.owner.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary-500/30"
            onError={(e) => {
              const catNumber = ((room.owner.id?.charCodeAt(0) || 0) % 40) + 1;
              e.currentTarget.src = `/src/assets/images/cats/Cat (${catNumber}).png`;
            }}
          />
          <div>
            <div className="flex items-center gap-2 text-sm text-neutral-5 mb-1">
              <IconUser size={16} />
              <span>Owner</span>
            </div>
            <p className="text-white font-semibold">{room.owner.name}</p>
            {room.owner.email && (
              <p className="text-xs text-neutral-5">{room.owner.email}</p>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-neutral-5 mb-2">
              <IconMusic size={18} />
              <span className="text-sm">Songs</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {room.songCount || 0}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-neutral-5 mb-2">
              <IconUsers size={18} />
              <span className="text-sm">Members</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {room.memberCount || room.members?.length || 0}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <IconCalendar size={18} className="text-neutral-5" />
            <div>
              <p className="text-sm text-neutral-5">Created</p>
              <p className="text-white font-medium">
                {formatDate(room.createdAt)}
              </p>
            </div>
          </div>
          {room.lastActivity && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
              <IconCalendar size={18} className="text-neutral-5" />
              <div>
                <p className="text-sm text-neutral-5">Last Activity</p>
                <p className="text-white font-medium">
                  {formatLastActivity()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Members List */}
        {room.members && room.members.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-neutral-5 mb-3">
              Members ({room.members.length})
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {room.members.map((member) => {
                return (
                  <button
                    key={member.id}
                    onClick={() => {
                      onClose();
                      navigate(`/user/${member.id}`);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                        <img
                          src={member.avatar || '/src/assets/images/cats/Cat (1).png'}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold text-sm">{member.name}</p>
                        <p className="text-neutral-5 text-xs">Member</p>
                      </div>
                    </div>
                    <IconChevronRight size={18} className="text-neutral-5 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        {onEnter && (
          <div className="pt-4 border-t border-white/10">
            <Button
              onClick={() => {
                onEnter(room);
                onClose();
              }}
              className="w-full"
            >
              Enter the Room
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RoomDetailsModal;
