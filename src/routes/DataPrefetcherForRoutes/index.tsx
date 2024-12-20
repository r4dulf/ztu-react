import { useCallback } from 'react';
import { LoadingScreen } from '../../components/LoadingScreen';
import { DataPrefetcher } from './DataPrefetcher';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Post, Todo } from './types';
import { HomeScreen } from './HomeScreen';
import { Todos } from './Todos';
import { Posts } from './Posts';

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com';

export const DataPrefetcherForRoutes = () => {
  const navigate = useNavigate();

  const apiCall = useCallback(async (route: string): Promise<{ todos?: Todo[]; posts?: Post[] }> => {
    const subRoute = route.split('/').at(-1);

    switch (subRoute) {
      case 'todos': {
        const response = await fetch(`${API_ENDPOINT}/todos`);
        const data = (await response.json()) as Todo[];

        return { todos: data };
      }

      case 'posts': {
        const response = await fetch(`${API_ENDPOINT}/posts`);
        const data = (await response.json()) as Post[];

        return { posts: data };
      }

      default: {
        navigate('./', { replace: true });

        return {};
      }
    }
  }, []);

  return (
    <div className='prefetch-for-routes screen'>
      <DataPrefetcher apiCall={apiCall} suspenseFallback={<LoadingScreen />}>
        {({ data }) => (
          <Routes>
            <Route index element={<HomeScreen />} />
            {data.todos && <Route path='todos' element={<Todos todos={data.todos} />} />}
            {data.posts && <Route path='posts' element={<Posts posts={data.posts} />} />}
          </Routes>
        )}
      </DataPrefetcher>
    </div>
  );
};
