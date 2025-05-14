import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

export default {
  title: 'Common/ConfirmDialog',
  component: ConfirmDialog,
};

export const Default = () => {
  const [open, setOpen] = useState(true);
  return (
    <ConfirmDialog
      open={open}
      title="Supprimer l'élément ?"
      message="Cette action est irréversible."
      onConfirm={() => { setOpen(false); alert('Confirmé !'); }}
      onCancel={() => setOpen(false)}
    />
  );
};

export const ErrorSeverity = () => {
  const [open, setOpen] = useState(true);
  return (
    <ConfirmDialog
      open={open}
      title="Action dangereuse"
      message="Êtes-vous sûr de vouloir continuer ?"
      severity="error"
      onConfirm={() => { setOpen(false); alert('Danger confirmé !'); }}
      onCancel={() => setOpen(false)}
    />
  );
}; 