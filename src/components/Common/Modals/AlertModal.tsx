'use client';

import type { FC } from 'react';

import type { AlertModal as AlertModalProps } from '@/interfaces/modal';
import { useMounted } from '@/hooks/useMounted';
import { Button } from '@/components/ui/button';
import Modal from '@/components/Common/Modals/Modal';

const AlertModal: FC<AlertModalProps> = ({ isOpen, onClose, onConfirm, loading, title, desc }) => {
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title || 'Are you sure?'}
      description={desc || 'This action cannot be undone.'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
