import {
  QueryClient,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { TodoStore } from '../indexedDB/init';
import { Todo } from '../indexedDB/types';
import { ENTITY_KEY, LIST_KEY, POST_KEY, PUT_KEY, DELETE_KEY, TODO_KEY } from './keys';

export const getTodo = async (id: number) => {
  return await TodoStore.get(id);
};

export const useTodoQuery = ({
  id,
  options,
}: {
  id: number;
  options?: Omit<UseQueryOptions<Todo | undefined, unknown, Todo>, 'queryKey' | 'queryFn'>;
}) =>
  useQuery({
    queryKey: [ENTITY_KEY, TODO_KEY, id],
    queryFn: () => getTodo(id),
    ...options,
  });

export const getAllTodos = async () => await TodoStore.getAll();

export const useTodosQuery = (options?: Omit<UseQueryOptions<Todo[], unknown, Todo[]>, 'queryKey' | 'queryFn'>) =>
  useQuery({
    queryKey: [ENTITY_KEY, TODO_KEY],
    queryFn: getAllTodos,
    ...options,
  });

export const getTodosByUserId = async (userId: number) => await TodoStore.getByField('userId', userId);

export const useTodosByUserIdQuery = (
  userId: number,
  options?: Omit<UseQueryOptions<Todo[], unknown, Todo[]>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: [LIST_KEY, TODO_KEY, userId],
    queryFn: () => getTodosByUserId(userId),
    ...options,
  });

export const postTodo = async (data: Omit<Todo, 'id'>) => await TodoStore.add(data);

export const putTodo = async (data: Todo) => await TodoStore.update(data);

export const deleteTodo = async (id: number) => await TodoStore.delete(id);

export type UsePostTodoMutationOptions = UseMutationOptions<Todo, unknown, Todo, { previousData: Todo[] }>;

export const configurePostTodoMutation = (
  queryClient: QueryClient,
  options?: UsePostTodoMutationOptions
): UsePostTodoMutationOptions => {
  return {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [LIST_KEY, TODO_KEY] });

      const previousData = queryClient.getQueryData<Todo[]>([LIST_KEY, TODO_KEY]) ?? [];

      queryClient.setQueryData([LIST_KEY, TODO_KEY], (old?: Todo[]) => [...(old || []), data]);

      options?.onMutate?.(data);

      return { previousData };
    },

    onError: async (error, data, context) => {
      if (context) {
        queryClient.setQueryData([LIST_KEY, TODO_KEY], context.previousData);
      }

      options?.onError?.(error, data, context);
    },

    onSettled: (data, err, vars, ctx) => {
      queryClient.invalidateQueries({ queryKey: [LIST_KEY, TODO_KEY] });

      options?.onSettled?.(data, err, vars, ctx);
    },
    ...options,
  };
};

export type UsePutTodoMutationOptions = UseMutationOptions<Todo, unknown, Todo, { previousData: Todo[] }>;

export const configurePutTodoMutation = (
  queryClient: QueryClient,
  options?: UsePutTodoMutationOptions
): UsePutTodoMutationOptions => {
  return {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [LIST_KEY, TODO_KEY] });

      const previousData = queryClient.getQueryData<Todo[]>([LIST_KEY, TODO_KEY]) ?? [];

      queryClient.setQueryData([LIST_KEY, TODO_KEY], (old?: Todo[]) =>
        old?.map((todo) => (todo.id === data.id ? data : todo))
      );

      options?.onMutate?.(data);

      return { previousData };
    },

    onError: async (error, data, context) => {
      if (context) {
        queryClient.setQueryData([LIST_KEY, TODO_KEY], context.previousData);
      }

      options?.onError?.(error, data, context);
    },

    onSettled: (data, err, vars, ctx) => {
      queryClient.invalidateQueries({ queryKey: [LIST_KEY, TODO_KEY] });

      options?.onSettled?.(data, err, vars, ctx);
    },
    ...options,
  };
};

export type UseDeleteTodoMutationOptions = UseMutationOptions<void, unknown, number, { previousData: Todo[] }>;

export const configureDeleteTodoMutation = (
  queryClient: QueryClient,
  options?: UseDeleteTodoMutationOptions
): UseDeleteTodoMutationOptions => {
  return {
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [LIST_KEY, TODO_KEY] });

      const previousData = queryClient.getQueryData<Todo[]>([LIST_KEY, TODO_KEY]) ?? [];

      queryClient.setQueryData([LIST_KEY, TODO_KEY], (old?: Todo[]) => old?.filter((todo) => todo.id !== id));

      options?.onMutate?.(id);

      return { previousData };
    },

    onError: async (error, id, context) => {
      if (context) {
        queryClient.setQueryData([LIST_KEY, TODO_KEY], context.previousData);
      }

      options?.onError?.(error, id, context);
    },

    onSettled: (data, err, vars, ctx) => {
      queryClient.invalidateQueries({ queryKey: [LIST_KEY, TODO_KEY] });

      options?.onSettled?.(data, err, vars, ctx);
    },
    ...options,
  };
};

export const usePostTodo = (options?: UsePostTodoMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTodo,
    mutationKey: [POST_KEY, TODO_KEY],
    ...configurePostTodoMutation(queryClient, options),
    ...options,
  });
};

export const usePutTodo = (options?: UsePutTodoMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putTodo,
    mutationKey: [PUT_KEY, TODO_KEY],
    ...configurePutTodoMutation(queryClient, options),
    ...options,
  });
};

export const useDeleteTodo = (options?: UseDeleteTodoMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    mutationKey: [DELETE_KEY, TODO_KEY],
    ...configureDeleteTodoMutation(queryClient, options),
    ...options,
  });
};
