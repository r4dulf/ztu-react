import { useState } from 'react';
import { UserList } from './UserList';
import { UserModal } from './UserModal';

export const AdminPage = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  return (
    <div className='admin-page'>
      <div className='header'>Admin Page</div>

      <div className='body'>
        <h3>Users</h3>

        <UserList />
      </div>

      <div className='footer'>
        <button onClick={() => setIsAddUserModalOpen(true)}>Add User</button>
      </div>

      {isAddUserModalOpen && <UserModal onClose={() => setIsAddUserModalOpen(false)} />}
    </div>
  );
};
