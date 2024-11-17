import { useState } from 'react';
import { useFocusTrap } from './hooks/useFocusTrap';

export const FocusTrap = () => {
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
  const [value, setValue] = useState('');

  useFocusTrap(inputRef);

  return (
    <div className='screen focus-trap'>
      <input ref={setInputRef} value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    </div>
  );
};
