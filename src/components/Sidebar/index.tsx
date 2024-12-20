import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { lightColor } from '../../scssVars';

export const Sidebar = ({
  children,
  isOpen,
  setIsOpen,
}: {
  children?: ReactNode;
  isOpen: boolean;

  setIsOpen: (value: boolean) => void;
}) => (
  <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
    <div className='sidebar-toggle' onClick={() => setIsOpen(!isOpen)}>
      <FontAwesomeIcon icon={faBars} color={lightColor} />
    </div>

    <div className='sidebar-content'>{children}</div>
    <div className='sidebar-overlay' onClick={() => setIsOpen(false)} />
  </div>
);
