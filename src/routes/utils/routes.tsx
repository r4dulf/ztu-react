import { RouteObject } from 'react-router-dom';
import { KeyboardPage } from '../Keyboard';

export const ROUTES: (RouteObject & { label: string })[] = [
  { label: 'Home', element: 'Home', path: '/' },
  { label: 'Lab 1: Keyboard', element: <KeyboardPage />, path: '/keyboard' },
];
