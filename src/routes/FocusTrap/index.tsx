import { useCallback, useState } from 'react';
import { useFocusTrap } from './hooks/useFocusTrap';
import { createPortal } from 'react-dom';

export const FocusTrap = () => {
  const [isOpen, setIsOpen] = useState(false);
  const trapRef = useFocusTrap(isOpen);
  const root = document.getElementById('root')!;

  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <div className='screen focus-trap'>
      <button className='open-modal-button' onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      {isOpen &&
        createPortal(
          <div ref={trapRef} role='dialog' aria-modal='true' className='focus-trap-modal'>
            <div className='content-container'>
              <div className='modal-header'>This is a modal window with focus trap</div>

              <div className='modal-body'>
                <p>Pressing the Tab key will loop through the elements inside the modal. </p>
              </div>

              <div className='modal-footer'>
                <button onClick={closeModal}>Accept All</button>
                <button onClick={closeModal}>Accept</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>,
          root
        )}
    </div>
  );
};
