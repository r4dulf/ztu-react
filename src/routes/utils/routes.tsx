import { RouteObject } from 'react-router-dom';
import { FocusTrap } from '../FocusTrap';
import { KeyboardPage } from '../Keyboard';

export const ROUTES: (RouteObject & { label: string })[] = [
  { label: 'Home', element: 'Home', path: '/' },
  { label: 'Lab 1: Keyboard', element: <KeyboardPage />, path: '/keyboard' },
  { label: 'Lab 2: Focus Trap', element: <FocusTrap />, path: '/focus-trap' },
];
