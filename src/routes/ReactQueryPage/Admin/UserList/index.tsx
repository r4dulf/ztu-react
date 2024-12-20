import { LoadingScreen } from '../../../../components/LoadingScreen';
import { useUsersQuery } from '../../queries/user';
import { UserRow } from './UserRow';

export const UserList = () => {
  const { data: users, isLoading } = useUsersQuery();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <div className='user-list'>{users?.map((user) => <UserRow key={user.id} user={user} />)}</div>;
};
