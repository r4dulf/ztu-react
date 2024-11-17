import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SidebarContextProvider } from './context/SidebarContext';
import './index.scss';
import { RootRoutes } from './routes';

const router = createBrowserRouter([{ path: '/*', element: <RootRoutes /> }]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SidebarContextProvider>
      <RouterProvider router={router} />
    </SidebarContextProvider>
  </StrictMode>
);
