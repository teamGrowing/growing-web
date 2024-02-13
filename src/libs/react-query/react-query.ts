import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      useErrorBoundary: true,
      staleTime: 1000 * 20, //  default to 20 seconds
      refetchOnWindowFocus: false,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

export default queryClient;
