import { Route, Routes } from 'react-router-dom';
import { useInitDB } from './hooks/useInitDB';
import { AdminPage } from './Admin';

export const ReactQueryPage = () => {
  useInitDB();

  return (
    <Routes>
      <Route index element={<AdminPage />} />
      <Route path='user/:id' element={<AdminPage />} />
    </Routes>
  );
};
