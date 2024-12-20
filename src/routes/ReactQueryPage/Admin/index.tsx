import { useState } from 'react';
import { UserList } from './UserList';
import { UserModal } from './UserModal';
import { useUsersQuery } from '../queries/user';
import { LoadingScreen } from '../../../components/LoadingScreen';

export const AdminPage = () => {
  const { data: users, isLoading } = useUsersQuery();

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  return (
    <div className='admin-page'>
      <div className='header'>Admin Page</div>

      {isLoading || !users ? (
        <LoadingScreen />
      ) : (
        <>
          <div className='body'>
            <h3>Users</h3>

            <UserList users={users} />
          </div>

          <div className='footer'>
            <button onClick={() => setIsAddUserModalOpen(true)}>Add User</button>
          </div>
        </>
      )}
      {isAddUserModalOpen && <UserModal onClose={() => setIsAddUserModalOpen(false)} />}
    </div>
  );
};
