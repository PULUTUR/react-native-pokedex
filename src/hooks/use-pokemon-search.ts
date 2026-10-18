import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { fetchAllPokemonNames, type PokemonPage } from '@/services/pokeapi';
import { toPokemonListItem } from '@/utils/pokemon';
import { filterPokemonByName } from '@/utils/search';

// Outside the hook so TanStack Query only maps the names again when they change.
function selectItems(data: PokemonPage) {
  return data.results.map(toPokemonListItem);
}

// Pokémon whose name contains `query`. All names are loaded with one request
// the first time the query is not empty, and then kept for the whole session,
// so typing never sends a request.
export function usePokemonSearch(query: string) {
  const isSearching = query.trim().length > 0;

  const names = useQuery({
    queryKey: ['pokemon-names'],
    queryFn: fetchAllPokemonNames,
    enabled: isSearching,
    staleTime: Infinity,
    gcTime: Infinity,
    select: selectItems,
  });

  const results = useMemo(
    () => (names.data ? filterPokemonByName(names.data, query) : []),
    [names.data, query],
  );

  return {
    isSearching,
    results,
    isPending: names.isPending,
    isError: names.isError,
    refetch: names.refetch,
  };
}
