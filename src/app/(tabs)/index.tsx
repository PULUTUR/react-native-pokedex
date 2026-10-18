import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Share, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { PokemonGrid, SCREEN_PADDING } from '@/components/pokemon-grid';
import { PokemonOptionsSheet } from '@/components/pokemon-options-sheet';
import { ScreenTitle } from '@/components/screen-title';
import { Colors, Spacing } from '@/constants/theme';
import { usePokemonList } from '@/hooks/use-pokemon-list';
import { getShareMessage, type PokemonListItem } from '@/utils/pokemon';

function openPokemon(pokemon: PokemonListItem) {
  router.push({ pathname: '/pokemon/[id]', params: { id: String(pokemon.id) } });
}

export default function PokemonListScreen() {
  const {
    data,
    isPending,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = usePokemonList();

  // `selected` stays set after closing, so the sheet keeps its content while it fades out.
  const [selected, setSelected] = useState<PokemonListItem | null>(null);
  const [optionsVisible, setOptionsVisible] = useState(false);

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

  // A failed next page only shows a retry in the footer, so the user taps it
  // instead of it being retried on every scroll.
  function loadMore() {
    if (hasNextPage && !isFetchingNextPage && !isFetchNextPageError) {
      fetchNextPage();
    }
  }

  if (isPending || !data) {
    return (
      <SafeAreaView style={[styles.container, styles.padded]} edges={['top']}>
        <ScreenTitle>All Pokémon</ScreenTitle>
        {isPending ? (
          <LoadingState />
        ) : (
          <ErrorState message="Could not load the Pokémon." onRetry={() => refetch()} />
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PokemonGrid
        data={data}
        onPokemonPress={openPokemon}
        onOptionsPress={showOptions}
        header={<ScreenTitle>All Pokémon</ScreenTitle>}
        onEndReached={loadMore}
        footer={
          isFetchNextPageError ? (
            <ErrorState message="Could not load more Pokémon." onRetry={() => fetchNextPage()} />
          ) : isFetchingNextPage ? (
            <View style={styles.footer}>
              <ActivityIndicator color={Colors.primary} />
            </View>
          ) : null
        }
      />
      <PokemonOptionsSheet
        visible={optionsVisible}
        onClose={() => setOptionsVisible(false)}
        onOpen={handleOpen}
        onShare={handleShare}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: Spacing.xl,
  },
  footer: {
    padding: Spacing.xl,
  },
});
