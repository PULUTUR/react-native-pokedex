// Pure search logic: no fetch and no UI, so it can be tested on its own.

import type { PokemonListItem } from '@/utils/pokemon';

// Pokémon whose name contains the query, in any case and at any position:
// "ch" -> Charmander, Charmeleon, Charizard, ..., Pikachu.
export function filterPokemonByName(
  pokemon: PokemonListItem[],
  query: string,
): PokemonListItem[] {
  const search = query.trim().toLowerCase();
  if (!search) {
    return [];
  }
  return pokemon.filter((item) => item.name.toLowerCase().includes(search));
}
