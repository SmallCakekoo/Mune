import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from '../../common/Modal/Modal';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import type { Room } from '../../../types/room.types';
import { IconLock, IconWorld } from '@tabler/icons-react';

const editRoomSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres').max(50, 'El nombre no puede exceder 50 caracteres'),
  description: z.string().max(200, 'La descripción no puede exceder 200 caracteres').optional(),
  privacy: z.enum(['public', 'private']),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres').optional(),
}).refine((data) => {
  if (data.privacy === 'private' && !data.password) {
    return false;
  }
  return true;
}, {
  message: 'Las salas privadas requieren una contraseña',
  path: ['password'],
});

type EditRoomFormData = z.infer<typeof editRoomSchema>;

interface EditRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
  onSubmit: (data: EditRoomFormData) => void | Promise<void>;
}

const EditRoomModal: React.FC<EditRoomModalProps> = ({
  isOpen,
  onClose,
  room,
  onSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<EditRoomFormData>({
    resolver: zodResolver(editRoomSchema),
    defaultValues: {
      name: '',
      description: '',
      privacy: 'public',
      password: '',
    },
  });

  const privacy = watch('privacy');

  useEffect(() => {
    if (room) {
      reset({
        name: room.name,
        description: room.description || '',
        privacy: room.privacy,
        password: room.password ? '••••••••' : '',
      });
    }
  }, [room, reset]);

  const handleFormSubmit = async (data: EditRoomFormData) => {
    setIsSubmitting(true);
    try {
      // Don't send password if it's the placeholder
      if (data.password === '••••••••') {
        const { ...rest } = data;
        await onSubmit(rest as EditRoomFormData);
      } else {
        await onSubmit(data);
      }
      onClose();
    } catch (error) {
      console.error('Error editing room:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  if (!room) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Room"
      size="md"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Name */}
        <Input
          {...register('name')}
          label="Room Name"
          placeholder="e.g., Work in mune!"
          error={errors.name?.message}
          disabled={isSubmitting}
          autoFocus
        />

        {/* Description */}
        <div>
          <Input
            {...register('description')}
            label="Description (Optional)"
            placeholder="Describe your room..."
            error={errors.description?.message}
            disabled={isSubmitting}
          />
        </div>

        {/* Privacy */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-5">Privacy</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setValue('privacy', 'public')}
              className={`flex items-center gap-2 p-4 rounded-xl border-2 transition-all ${privacy === 'public'
                  ? 'border-primary-500 bg-primary-500/20 text-white'
                  : 'border-white/20 bg-white/5 text-neutral-5 hover:border-white/30 hover:bg-white/10'
                }`}
              disabled={isSubmitting}
            >
              <IconWorld size={20} />
              <span className="font-medium">Public</span>
            </button>
            <button
              type="button"
              onClick={() => setValue('privacy', 'private')}
              className={`flex items-center gap-2 p-4 rounded-xl border-2 transition-all ${privacy === 'private'
                  ? 'border-primary-500 bg-primary-500/20 text-white'
                  : 'border-white/20 bg-white/5 text-neutral-5 hover:border-white/30 hover:bg-white/10'
                }`}
              disabled={isSubmitting}
            >
              <IconLock size={20} />
              <span className="font-medium">Private</span>
            </button>
          </div>
          <input type="hidden" {...register('privacy')} />
        </div>

        {/* Password (only for private rooms) */}
        {privacy === 'private' && (
          <Input
            {...register('password')}
            type="password"
            label="Password"
            placeholder={room.password ? 'Enter new password or leave blank' : 'Enter the room password'}
            error={errors.password?.message}
            helperText={room.password ? 'Leave empty to keep the current password' : 'Required for private rooms'}
            disabled={isSubmitting}
          />
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="flex-1"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditRoomModal;
