import type { Todo as TodoType } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

export const Todo = (data: TodoType) => (
  <div className='todo'>
    <h3>{data.title}</h3>

    <div className='completed'>
      {data.completed ? <FontAwesomeIcon icon={faCheck} color='green' /> : <FontAwesomeIcon icon={faX} color='red' />}
    </div>
  </div>
);

export const Todos = ({ todos }: { todos: TodoType[] }) => (
  <div className='todos'>
    {todos.map((todo) => (
      <Todo key={todo.id} {...todo} />
    ))}
  </div>
);
