import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

export const SidebarContext = createContext<{ isOpen: boolean; setIsOpen: Dispatch<SetStateAction<boolean>> }>({
  isOpen: false,
  setIsOpen: () => {},
});

export const SidebarContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>;
};
