import type { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IoClose } from 'react-icons/io5';
import styles from './ConfirmDialog.module.css';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  children?: ReactNode;
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Igen',
  cancelText = 'Mégse',
  onConfirm,
  onCancel,
  children
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <div className={styles.header}>
            <Dialog.Title className={styles.title}>
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className={styles.closeButton} aria-label="Bezárás">
                <IoClose />
              </button>
            </Dialog.Close>
          </div>
          
          {description && (
            <Dialog.Description className={styles.description}>
              {description}
            </Dialog.Description>
          )}
          
          {children && (
            <div className={styles.content}>
              {children}
            </div>
          )}
          
          <div className={styles.actions}>
            <button 
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              {cancelText}
            </button>
            <button 
              className={styles.confirmButton}
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmDialog;
