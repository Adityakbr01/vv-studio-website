import { QueryClient } from '@tanstack/react-query';

/**
 * Singleton QueryClient — reuse everywhere via `@/lib/queryClient`.
 * Provided once at the root in `src/main.tsx`.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export default queryClient;
