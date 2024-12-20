import { useState } from 'react';
import { User } from '../../../indexedDB/types';
import { useDeleteUser } from '../../../queries/user';
import { UserModal } from '../../UserModal';

export const UserRow = ({ user }: { user: User }) => {
  const { mutate: deleteUser } = useDeleteUser();
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  return (
    <div className='user-row'>
      <div className='name'>{user.name}</div>
      <div className='email'>{user.email}</div>

      <div className='edit-user'>
        <button onClick={() => setIsEditUserModalOpen(true)}>Edit</button>
      </div>

      <div className='delete-user'>
        <button onClick={() => deleteUser(user.id)}>Delete</button>
      </div>

      {isEditUserModalOpen && <UserModal onClose={() => setIsEditUserModalOpen(false)} user={user} />}
    </div>
  );
};
