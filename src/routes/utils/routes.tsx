import { RouteObject } from 'react-router-dom';
import { FocusTrap } from '../FocusTrap';
import { KeyboardPage } from '../Keyboard';
import { ReactHookFormPage } from '../ReactHookForm';
import { DataPrefetcherForRoutes } from '../DataPrefetcherForRoutes';

export const ROUTES: (RouteObject & { label: string; hasSubroutes?: boolean })[] = [
  {
    label: 'Lab 1: Keyboard',
    element: <KeyboardPage />,
    path: '/keyboard',
  },
  {
    label: 'Lab 2: Focus Trap',
    element: <FocusTrap />,
    path: '/focus-trap',
  },
  {
    label: 'Lab 3: React Hook Form',
    element: <ReactHookFormPage />,
    path: '/react-hook-form',
  },
  {
    label: 'Lab 4: Data Prefetch for Routes',
    element: <DataPrefetcherForRoutes />,
    path: '/data-prefetcher-for-routes',
    hasSubroutes: true,
  },
];
