import { useQuery } from '@tanstack/react-query';

import { fetchPokemon } from '@/services/pokeapi';
import { toPokemonDetail } from '@/utils/pokemon';

// One Pokémon from /pokemon/{id}. The tabs on the detail screen all read from
// this one request, so switching tabs never fetches again.
export function usePokemonDetail(id: number) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemon(id),
    enabled: Number.isInteger(id) && id > 0,
    select: toPokemonDetail,
  });
}
