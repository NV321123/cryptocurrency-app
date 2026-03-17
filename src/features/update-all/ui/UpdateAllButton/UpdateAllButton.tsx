import React from 'react';
import { Button } from '@/shared/ui/Button/Button';

interface UpdateAllButtonProps {
  onUpdateAll: () => void;
  isOnline: boolean;
}

export const UpdateAllButton = React.memo<UpdateAllButtonProps>(({ onUpdateAll, isOnline }) => {

  console.log('UpdateAllButton');

  return (
    <Button 
      variant="updateAll" 
      onClick={onUpdateAll}
      className="update-all-btn"
      disabled={!isOnline}
    >
      Update All
    </Button>
  );
});