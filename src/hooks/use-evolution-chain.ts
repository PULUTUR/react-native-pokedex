import { useQuery } from '@tanstack/react-query';

import { fetchEvolutionChain, fetchPokemonSpecies } from '@/services/pokeapi';
import { flattenEvolutionChain } from '@/utils/evolution';
import { getIdFromUrl, type PokemonListItem } from '@/utils/pokemon';

// The evolution chain of a species as a flat list. Two requests: the species
// gives the chain URL, then the chain itself. The chain has its own query key,
// so Pichu, Pikachu and Raichu share one cached chain.
export function useEvolutionChain(speciesId: number) {
  const species = useQuery({
    queryKey: ['pokemon-species', speciesId],
    queryFn: () => fetchPokemonSpecies(speciesId),
  });

  const chainUrl = species.data?.evolution_chain?.url;
  const chainId = chainUrl ? getIdFromUrl(chainUrl) : undefined;

  const chain = useQuery({
    queryKey: ['evolution-chain', chainId],
    queryFn: () => fetchEvolutionChain(chainId!),
    enabled: chainId !== undefined,
    select: (data) => flattenEvolutionChain(data.chain),
  });

  // A species without a chain in the API does not evolve: an empty list.
  const noChain = species.isSuccess && chainId === undefined;
  const data: PokemonListItem[] | undefined = noChain ? [] : chain.data;

  return {
    data,
    isPending: !data && !species.isError && !chain.isError,
    isError: species.isError || chain.isError,
    refetch: () => (species.isError ? species.refetch() : chain.refetch()),
  };
}
