import { useEffect, useState } from 'react';
import { keyCodes } from './constants';

const emulateKeyPress = (code: string) => {
  const evt = new KeyboardEvent('keydown', { code });

  window.dispatchEvent(evt);
};

export const KeyboardPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [isShift, setIsShift] = useState(false);

  useEffect(() => {
    const handleKeyPress = (evt: KeyboardEvent) => {
      console.log(evt.code);
      if (evt.code === 'CapsLock') {
        setIsCapsLock((prevValue) => !prevValue);
        return;
      }

      if (['ShiftLeft', 'ShiftRight'].includes(evt.code)) {
        setIsShift((prevValue) => !prevValue);
        return;
      }

      if (['ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'].includes(evt.code)) {
        return;
      }

      setInputValue((prevValue) => {
        if (evt.code === 'Backspace') {
          return prevValue.slice(0, -1);
        }

        if (evt.code === 'Space') {
          return prevValue + ' ';
        }

        if (evt.code === 'Enter') {
          return prevValue + '\n';
        }

        const key = keyCodes.flat().find((key) => key.code === evt.code);

        if (key) {
          return prevValue + (isCapsLock || isShift ? key.key.toUpperCase() : key.key);
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
      <textarea
        className='keyboard-input'
        value={inputValue}
        onChange={(evt) => setInputValue(evt.target.value)}
        placeholder='Type something...'
      />

      <div className='keyboard-border'>
        {keyCodes.map((row, rowIndex) => (
          <div key={rowIndex} className='keyboard-row'>
            {row.map((button, keyIndex) => {
              const isCapsLockKey = button.code === 'CapsLock';
              const isShiftKey = button.code === 'ShiftLeft';

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
