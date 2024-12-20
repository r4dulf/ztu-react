import { Link } from 'react-router-dom';

export const HomeScreen = () => {
  return (
    <div className='home-screen screen'>
      <h3>Home Screen</h3>

      <p>This is the home screen. Click on the links below to navigate to different routes.</p>

      <div className='link-wrapper'>
        {['todos', 'posts'].map((route) => (
          <Link key={route} to={route}>
            {route}
          </Link>
        ))}
      </div>
    </div>
  );
};
