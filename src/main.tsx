import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SidebarContextProvider } from './context/SidebarContext';
import './index.scss';
import { RootRoutes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([{ path: '/*', element: <RootRoutes /> }]);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidebarContextProvider>
        <RouterProvider router={router} />
      </SidebarContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
