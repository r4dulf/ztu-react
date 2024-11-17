import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { KeyboardPage } from './Keyboard';

export const ROUTES: RouteObject[] = [
  { element: 'Home', path: '/' },
  { element: <KeyboardPage />, path: '/keyboard' },
];

const router = createBrowserRouter(ROUTES);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
