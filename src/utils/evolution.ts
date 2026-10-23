// Pure helper for /evolution-chain data: no fetch and no UI, so it can be
// tested on its own.

import type { ApiChainLink } from '@/services/pokeapi';
import { toPokemonListItem, type PokemonListItem } from '@/utils/pokemon';

// The nested tree -> a flat list in API order. Depth-first, so each line
// stays together: Wurmple, Silcoon, Beautifly, Cascoon, Dustox. Branches
// (Eevee's eight evolutions) simply follow each other.
export function flattenEvolutionChain(link: ApiChainLink): PokemonListItem[] {
  return [toPokemonListItem(link.species), ...link.evolves_to.flatMap(flattenEvolutionChain)];
}
