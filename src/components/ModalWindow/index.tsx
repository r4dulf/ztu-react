import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export const ModalWindow = ({
  headerText,
  children,
  className,

  onClose,
}: {
  headerText: ReactNode;
  children: ReactNode;
  className?: string;

  onClose: () => void;
}) => {
  const root = document.getElementById('root');

  if (!root) {
    return null;
  }

  return createPortal(
    <div className='modal-window-overlay'>
      <div className={`modal-window ${className ?? ''}`}>
        <div className='modal-header'>
          <div className='text'>{headerText}</div>

          <div className='close-button'>
            <FontAwesomeIcon icon={faX} onClick={onClose} />
          </div>
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </div>,
    root
  );
};
