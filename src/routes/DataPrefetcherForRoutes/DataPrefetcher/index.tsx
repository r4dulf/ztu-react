import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const DataPrefetcher = <T extends Record<string, unknown>>({
  children,
  apiCall,

  suspenseFallback,
}: {
  children: ({ data }: { data: T }) => ReactNode;
  apiCall: (requestedRoute: string) => Promise<T>;

  suspenseFallback?: ReactNode;
}) => {
  const [data, setData] = useState<T | null>(null);
  const location = useLocation();

  useEffect(() => {
    const loadData = async () => {
      const routeData = await apiCall(location.pathname);

      setData(routeData);
    };
    loadData();
  }, [apiCall, location.pathname]);

  if (!data) {
    return suspenseFallback;
  }

  return children({ data });
};
