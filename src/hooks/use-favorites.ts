import * as Haptics from 'expo-haptics';
import { useMutation, useQuery } from '@tanstack/react-query';

import { addFavorite, getFavorites, isFavorite, removeFavorite } from '@/services/favorites-db';
import { queryClient } from '@/services/query-client';
import type { PokemonListItem } from '@/utils/pokemon';

const QUERY_KEY = ['favorites'];

export function useFavorites() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getFavorites,
    staleTime: Infinity,
  });
}

export function useIsFavorite(id: number) {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getFavorites,
    staleTime: Infinity,
    select: (data) => data.some((p) => p.id === id),
  });
}

export function useToggleFavorite() {
  const mutation = useMutation({
    mutationFn: async (pokemon: PokemonListItem) => {
      const fav = isFavorite(pokemon.id);
      if (fav) {
        removeFavorite(pokemon.id);
      } else {
        addFavorite(pokemon.id, pokemon.name);
      }
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  return mutation.mutate;
}
