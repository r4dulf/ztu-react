import { IndexedDBHelper } from './DBHelper';
import { Todo, User } from './types';

const DB_NAME = 'react-query';
const USER_TABLE_NAME = 'users';
const TODO_TABLE_NAME = 'todos';

export const UserStore = new IndexedDBHelper<User>(DB_NAME, USER_TABLE_NAME);
export const TodoStore = new IndexedDBHelper<Todo>(DB_NAME, TODO_TABLE_NAME);
