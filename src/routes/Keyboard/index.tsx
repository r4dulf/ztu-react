import { useEffect, useState } from 'react';
import { useFocusTrap } from '../FocusTrap/hooks/useFocusTrap';
import { keyCodes } from './constants';

const emulateKeyPress = (code: string) => {
  const evt = new KeyboardEvent('keydown', { code });

  window.dispatchEvent(evt);
};

export const KeyboardPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputRef, setInputRef] = useState<HTMLTextAreaElement | null>(null);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [isShift, setIsShift] = useState(false);

  useFocusTrap(inputRef);

  useEffect(() => {
    const handleKeyPress = (evt: KeyboardEvent) => {
      if (evt.code === 'CapsLock') {
        setIsCapsLock((prevValue) => !prevValue);
        return;
      }

      if (['ShiftLeft', 'ShiftRight'].includes(evt.code)) {
        setIsShift((prevValue) => !prevValue);
        return;
      }

      if (['ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight', 'Tab'].includes(evt.code)) {
        evt.preventDefault();

        return;
      }

      setInputValue((prevValue) => {
        if (evt.code === 'Backspace') {
          return prevValue.slice(0, -1);
        }

        if (evt.code === 'Space') {
          return `${prevValue} `;
        }

        if (evt.code === 'Enter') {
          return `${prevValue}\n`;
        }

        const key = keyCodes.flat().find((key) => key.code === evt.code);

        if (key) {
          const shouldUpperCase = (!isCapsLock && isShift) || (isCapsLock && !isShift);
          return prevValue + (shouldUpperCase ? key.key.toUpperCase() : key.key);
        }

        return prevValue;
      });
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isCapsLock, isShift]);

  return (
    <div className='screen keyboard'>
      <textarea ref={setInputRef} className='keyboard-input' value={inputValue} placeholder='Type something...' />

      <div className='keyboard-border'>
        {keyCodes.map((row, rowIndex) => (
          <div key={rowIndex} className='keyboard-row'>
            {row.map((button, keyIndex) => {
              const isCapsLockKey = button.code === 'CapsLock';
              const isShiftKey = button.code === 'ShiftLeft' || button.code === 'ShiftRight';

              return (
                <div
                  key={keyIndex}
                  className={`keyboard-key ${button.code} ${(isCapsLockKey && isCapsLock) || (isShiftKey && isShift) ? 'active' : ''}`}
                  onClick={() => emulateKeyPress(button.code)}
                >
                  {button.key.toUpperCase()}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
