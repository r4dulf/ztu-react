import { useForm } from 'react-hook-form';
import { UserSchema } from '../validation/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '../../indexedDB/types';
import { usePostUser, usePutUser } from '../../queries/user';
import { ModalWindow } from '../../../../components/ModalWindow';

export const UserModal = ({ onClose, user }: { onClose: () => void; user?: User }) => {
  const { mutate: createUser } = usePostUser();
  const { mutate: updateUser } = usePutUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(UserSchema), defaultValues: user });

  const onSubmit = async (data: Omit<User, 'id'>) => {
    if (user) {
      await updateUser({ ...user, ...data });
    } else {
      await createUser({ id: Date.now(), ...data });
    }

    reset();
    onClose();
  };

  return (
    <ModalWindow onClose={onClose} headerText='Create User' className='user-modal'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...register('name')} />
        </div>

        <div>
          <label>Email</label>
          <input {...register('email')} />
        </div>

        <div>
          <button type='submit'>{user ? 'Update' : 'Create'} User</button>
        </div>

        <div className='message-box'>
          {errors.name && <span>{errors.name.message}</span>}
          {errors.email && <span>{errors.email.message}</span>}
        </div>
      </form>
    </ModalWindow>
  );
};
