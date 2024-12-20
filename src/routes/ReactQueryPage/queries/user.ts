import {
  QueryClient,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { UserStore } from '../indexedDB/init';
import { User } from '../indexedDB/types';
import { DELETE_KEY, ENTITY_KEY, LIST_KEY, POST_KEY, PUT_KEY, USER_KEY } from './keys';

export const getUser = async (id: number) => {
  const response = await UserStore.get(id);

  if (!response) {
    throw new Error('User not found');
  }

  return response;
};

export const useUserQuery = ({
  id,
  options,
}: {
  id: number;
  options?: Omit<UseQueryOptions<User, unknown, User>, 'queryKey' | 'queryFn'>;
}) =>
  useQuery({
    queryKey: [ENTITY_KEY, USER_KEY, id],
    queryFn: () => getUser(id),
    ...options,
  });

export const getAllUsers = async () => await UserStore.getAll();

export const useUsersQuery = (options?: Omit<UseQueryOptions<User[], unknown, User[]>, 'queryKey' | 'queryFn'>) =>
  useQuery({
    queryKey: [LIST_KEY, USER_KEY],
    queryFn: getAllUsers,
    ...options,
  });

export const postUser = async (data: Omit<User, 'id'>) => await UserStore.add(data);

export type UsePostUserMutationOptions = UseMutationOptions<User, unknown, User, { previousData: User[] }>;

export const configurePostUserMutation = (
  queryClient: QueryClient,
  options?: UsePostUserMutationOptions
): UsePostUserMutationOptions => {
  return {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [LIST_KEY, USER_KEY] });

      const previousData = queryClient.getQueryData<User[]>([LIST_KEY, USER_KEY]) ?? [];

      queryClient.setQueryData([LIST_KEY, USER_KEY], (old?: User[]) => [...(old || []), data]);

      options?.onMutate?.(data);

      return { previousData };
    },

    onError: (err, data, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([LIST_KEY, USER_KEY], context.previousData);
      }

      options?.onError?.(err, data, context);

      console.error(err);
    },

    onSettled: (data, err, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [LIST_KEY, USER_KEY] });

      options?.onSettled?.(data, err, variables, context);
    },
  };
};

export const usePostUser = (options?: UsePostUserMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUser,
    mutationKey: [POST_KEY, USER_KEY],
    ...configurePostUserMutation(queryClient, options),
    ...options,
  });
};

export const putUser = async (data: User) => await UserStore.update(data);

export type UsePutUserMutationOptions = UseMutationOptions<User, unknown, User, { previousData: User[] }>;

export const configurePutUserMutation = (
  queryClient: QueryClient,
  options?: UsePutUserMutationOptions
): UsePutUserMutationOptions => {
  return {
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [LIST_KEY, USER_KEY] });

      const previousData = queryClient.getQueryData<User[]>([LIST_KEY, USER_KEY]) ?? [];

      queryClient.setQueryData([LIST_KEY, USER_KEY], (old?: User[]) =>
        (old || []).map((item) => (item.id === data.id ? data : item))
      );

      options?.onMutate?.(data);

      return { previousData };
    },

    onError: (err, data, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([LIST_KEY, USER_KEY], context.previousData);
      }

      options?.onError?.(err, data, context);

      console.error(err);
    },

    onSettled: (data, err, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [LIST_KEY, USER_KEY] });

      options?.onSettled?.(data, err, variables, context);
    },
  };
};

export const usePutUser = (options?: UsePutUserMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUser,
    mutationKey: [PUT_KEY, USER_KEY],
    ...configurePutUserMutation(queryClient, options),
    ...options,
  });
};

export const deleteUser = async (id: number) => await UserStore.delete(id);

export type UseDeleteUserMutationOptions = UseMutationOptions<void, unknown, number, { previousData: User[] }>;

export const configureDeleteUserMutation = (
  queryClient: QueryClient,
  options?: UseDeleteUserMutationOptions
): UseDeleteUserMutationOptions => {
  return {
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [LIST_KEY, USER_KEY] });

      const previousData = queryClient.getQueryData<User[]>([LIST_KEY, USER_KEY]) ?? [];

      queryClient.setQueryData([LIST_KEY, USER_KEY], (old?: User[]) => (old || []).filter((item) => item.id !== id));

      options?.onMutate?.(id);

      return { previousData };
    },

    onError: (err, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([LIST_KEY, USER_KEY], context.previousData);
      }

      options?.onError?.(err, id, context);

      console.error(err);
    },

    onSettled: (data, err, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [LIST_KEY, USER_KEY] });

      options?.onSettled?.(data, err, variables, context);
    },
  };
};

export const useDeleteUser = (options?: UseDeleteUserMutationOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    mutationKey: [DELETE_KEY, USER_KEY],
    ...configureDeleteUserMutation(queryClient, options),
    ...options,
  });
};
