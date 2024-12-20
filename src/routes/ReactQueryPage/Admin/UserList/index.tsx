import { User } from '../../indexedDB/types';
import { UserRow } from './UserRow';

export const UserList = ({ users }: { users: User[] }) => (
  <div className='user-list'>
    {users.length > 0 && (
      <div className='users-list-header'>
        <div className='cell'>Name</div>
        <div className='cell'>Email</div>
      </div>
    )}

    {users.map((user) => (
      <UserRow key={user.id} user={user} />
    ))}
  </div>
);
