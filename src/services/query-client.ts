import { QueryClient } from '@tanstack/react-query';

// PokeAPI data hardly ever changes, so a result stays fresh for 5 minutes and
// is retried twice before a screen shows its error state.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});
