import { ReactNode } from 'react';

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
    <div className='sidebar-toggle' onClick={() => setIsOpen(!isOpen)} />
    <div className='sidebar-content'>{children}</div>
    <div className='sidebar-overlay' onClick={() => setIsOpen(false)} />
  </div>
);
