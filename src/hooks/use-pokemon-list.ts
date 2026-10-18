import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { fetchPokemonPage, type PokemonPage } from '@/services/pokeapi';
import { getOffsetFromUrl, toPokemonListItem } from '@/utils/pokemon';

// Outside the hook so TanStack Query only maps the pages again when they change.
function selectItems(data: InfiniteData<PokemonPage, number>) {
  return data.pages.flatMap((page) => page.results.map(toPokemonListItem));
}

// All Pokémon, 20 per page. The next page is loaded with fetchNextPage();
// hasNextPage is false after the last Pokémon (`next` is null).
export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ['pokemon-list'],
    queryFn: ({ pageParam }) => fetchPokemonPage(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => getOffsetFromUrl(lastPage.next),
    select: selectItems,
  });
}
