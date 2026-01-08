import React from 'react';
import Modal from '../Modal/Modal';
import { Button } from '../Button/Button';
import { IconAlertTriangle } from '@tabler/icons-react';
import { cn } from '../../../utils/cn';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Error in confirmation:', error);
    }
  };

  const variantColors = {
    danger: 'text-error-400',
    warning: 'text-warning-400',
    info: 'text-primary-400',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      className="!max-w-md"
    >
      <div className="space-y-6">
        {/* Icon and Title */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className={cn(
              'p-3 rounded-full border',
              variant === 'danger' && 'bg-error-500/20 border-error-500/30',
              variant === 'warning' && 'bg-warning-500/20 border-warning-500/30',
              variant === 'info' && 'bg-primary-500/20 border-primary-500/30'
            )}
          >
            <IconAlertTriangle
              size={32}
              className={variantColors[variant]}
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-neutral-5 leading-relaxed">{message}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            isLoading={isLoading}
            variant="primary"
            className={cn(
              'flex-1',
              variant === 'danger' && '!bg-error-500 hover:!bg-error-400'
            )}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
