import { useForm } from 'react-hook-form';
import { ModalWindow } from '../../../../components/ModalWindow';
import { usePostTodo, usePutTodo } from '../../queries/todo';
import { TodoSchema } from '../validation/todo';
import { yupResolver } from '@hookform/resolvers/yup';
import { Todo } from '../../indexedDB/types';
import { useUsersQuery } from '../../queries/user';

export const TodoModal = ({ onClose, todoId }: { onClose: () => void; todoId?: number }) => {
  const { mutate: postTodo } = usePostTodo();
  const { mutate: putTodo } = usePutTodo();

  const { data: users } = useUsersQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(TodoSchema) });

  const onSubmit = async (data: Omit<Todo, 'id' | 'completed'> & Partial<Pick<Todo, 'completed'>>) => {
    const newData = { ...data, completed: !!data.completed };

    if (todoId) {
      await putTodo({ id: todoId, ...newData });
    } else {
      await postTodo({ id: Date.now(), ...newData });
    }
  };

  return (
    <ModalWindow headerText='Create Todo' onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input {...register('title')} />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <label>Completed</label>
          <input type='checkbox' {...register('completed')} />
        </div>

        <div>
          <label>User</label>
          <select {...register('userId')}>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button type='submit'>Create Todo</button>
        </div>
      </form>
    </ModalWindow>
  );
};
