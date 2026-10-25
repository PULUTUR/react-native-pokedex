import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Keyboard, Share, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { PokemonGrid, SCREEN_PADDING } from '@/components/pokemon-grid';
import { PokemonOptionsSheet } from '@/components/pokemon-options-sheet';
import { ScreenTitle } from '@/components/screen-title';
import { SearchBar } from '@/components/search-bar';
import { Colors, Spacing } from '@/constants/theme';
import { useIsFavorite, useToggleFavorite } from '@/hooks/use-favorites';
import { usePokemonList } from '@/hooks/use-pokemon-list';
import { usePokemonSearch } from '@/hooks/use-pokemon-search';
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

  const [query, setQuery] = useState('');
  const search = usePokemonSearch(query);

  // `selected` stays set after closing, so the sheet keeps its content while it fades out.
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

  // Clearing the field ends the search, just like the back arrow.
  function handleChangeQuery(text: string) {
    setQuery(text);
    if (!text) Keyboard.dismiss();
  }

  function stopSearching() {
    setQuery('');
    Keyboard.dismiss();
  }

  // A failed next page only shows a retry in the footer, so the user taps it
  // instead of it being retried on every scroll.
  function loadMore() {
    if (hasNextPage && !isFetchingNextPage && !isFetchNextPageError) {
      fetchNextPage();
    }
  }

  function renderSearchResults() {
    if (search.isPending) {
      return <LoadingState />;
    }
    if (search.isError) {
      return <ErrorState message="Could not search the Pokémon." onRetry={() => search.refetch()} />;
    }
    if (search.results.length === 0) {
      return <EmptyState message="No Pokémon found" />;
    }
    return (
      <PokemonGrid
        data={search.results}
        onPokemonPress={openPokemon}
        onOptionsPress={showOptions}
      />
    );
  }

  function renderList() {
    if (isPending || !data) {
      return (
        <View style={[styles.container, styles.padded]}>
          <ScreenTitle>All Pokémon</ScreenTitle>
          {isPending ? (
            <LoadingState />
          ) : (
            <ErrorState message="Could not load the Pokémon." onRetry={() => refetch()} />
          )}
        </View>
      );
    }

    return (
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
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.searchBar}>
        <SearchBar
          value={query}
          onChangeText={handleChangeQuery}
          isSearching={search.isSearching}
          onBack={stopSearching}
        />
      </View>
      {search.isSearching && <View style={styles.container}>{renderSearchResults()}</View>}
      {/* Hidden instead of unmounted while searching, so the list keeps its scroll position. */}
      <View style={[styles.container, search.isSearching && styles.hidden]}>{renderList()}</View>
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
  },
  hidden: {
    display: 'none',
  },
  searchBar: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: Spacing.lg,
  },
  padded: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: Spacing.xl,
  },
  footer: {
    padding: Spacing.xl,
  },
});
