import { useEffect } from 'react';
import { TodoStore, UserStore } from '../indexedDB/init';

export const useInitDB = () => {
  useEffect(() => {
    const initDB = async () => {
      await UserStore.init();
      await TodoStore.init();
    };

    initDB();
  }, []);
};
