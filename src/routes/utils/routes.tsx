import { RouteObject } from 'react-router-dom';
import { FocusTrap } from '../FocusTrap';
import { KeyboardPage } from '../Keyboard';
import { ReactHookFormPage } from '../ReactHookForm';

export const ROUTES: (RouteObject & { label: string })[] = [
  { label: 'Home', element: 'Home', path: '/' },
  { label: 'Lab 1: Keyboard', element: <KeyboardPage />, path: '/keyboard' },
  { label: 'Lab 2: Focus Trap', element: <FocusTrap />, path: '/focus-trap' },
  { label: 'Lab 3: React Hook Form', element: <ReactHookFormPage />, path: '/react-hook-form' },
];
