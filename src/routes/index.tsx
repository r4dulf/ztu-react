import { useContext } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { SidebarContext } from '../context/SidebarContext';
import { ROUTES } from './utils/routes';
import { IndexPage } from './IndexPage';

export const RootRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, setIsOpen } = useContext(SidebarContext);

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className='sidebar-link disabled'>React Labs (19)</div>

        {ROUTES.map((route) => {
          const isActive = location.pathname === route.path;
          const isDisabled = !route.path;

          return (
            <div
              key={route.path}
              className={`sidebar-link ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => {
                if (isActive || !route.path) return;

                navigate(route.path);
                setIsOpen(false);
              }}
            >
              {route.label}
            </div>
          );
        })}
      </Sidebar>

      <Routes>
        {ROUTES.map((route) => (
          <Route key={route.path} path={`${route.path}${route.hasSubroutes ? '/*' : '/'}`} element={route.element} />
        ))}

        <Route path='*' element={<IndexPage />} />
      </Routes>
    </>
  );
};
