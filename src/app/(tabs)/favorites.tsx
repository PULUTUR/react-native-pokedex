import { router } from 'expo-router';
import { useState } from 'react';
import { Share, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { PokemonGrid, SCREEN_PADDING } from '@/components/pokemon-grid';
import { PokemonOptionsSheet } from '@/components/pokemon-options-sheet';
import { ScreenTitle } from '@/components/screen-title';
import { Spacing } from '@/constants/theme';
import { useFavorites, useIsFavorite, useToggleFavorite } from '@/hooks/use-favorites';
import { getShareMessage, type PokemonListItem } from '@/utils/pokemon';

function openPokemon(pokemon: PokemonListItem) {
  router.push({ pathname: '/pokemon/[id]', params: { id: String(pokemon.id) } });
}

export default function FavoritesScreen() {
  const { data, isPending, isError, refetch } = useFavorites();

  const [selected, setSelected] = useState<PokemonListItem | null>(null);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const { data: selectedIsFav } = useIsFavorite(selected?.id ?? 0);
  const toggleFavorite = useToggleFavorite();

  function showOptions(pokemon: PokemonListItem) {
    setSelected(pokemon);
    setOptionsVisible(true);
  }

  function handleOpen() {
    setOptionsVisible(false);
    if (selected) openPokemon(selected);
  }

  function handleShare() {
    setOptionsVisible(false);
    if (selected) Share.share({ message: getShareMessage(selected) });
  }

  function renderContent() {
    if (isPending || isError) {
      return (
        <View style={[styles.flex, styles.padded]}>
          <ScreenTitle>My favorites</ScreenTitle>
          {isPending ? (
            <LoadingState />
          ) : (
            <ErrorState message="Could not load favorites." onRetry={() => refetch()} />
          )}
        </View>
      );
    }

    if (data.length === 0) {
      return (
        <View style={[styles.flex, styles.padded]}>
          <ScreenTitle>My favorites</ScreenTitle>
          <EmptyState message={'No favorites yet\nTap the heart on a Pokémon to save it here.'} />
        </View>
      );
    }

    return (
      <PokemonGrid
        data={data}
        onPokemonPress={openPokemon}
        onOptionsPress={showOptions}
        header={<ScreenTitle>My favorites</ScreenTitle>}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.flex}>{renderContent()}</View>
      <PokemonOptionsSheet
        visible={optionsVisible}
        onClose={() => setOptionsVisible(false)}
        onOpen={handleOpen}
        onShare={handleShare}
        isFavorite={selectedIsFav}
        onToggleFavorite={() => selected && toggleFavorite(selected)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.xl,
  },
  flex: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: SCREEN_PADDING,
  },
});
