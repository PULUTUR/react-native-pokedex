import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DetailHeader, HEADER_BAR_HEIGHT } from '@/components/detail-header';
import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { PokemonGrid, SCREEN_PADDING } from '@/components/pokemon-grid';
import { ScreenTitle } from '@/components/screen-title';
import { SearchBar } from '@/components/search-bar';
import { Colors, Spacing } from '@/constants/theme';
import { usePokemonDetail } from '@/hooks/use-pokemon-detail';
import { usePokemonList } from '@/hooks/use-pokemon-list';
import { usePokemonSearch } from '@/hooks/use-pokemon-search';
import { excludePokemon } from '@/utils/compare';
import type { PokemonListItem } from '@/utils/pokemon';

// Picker for the second Pokémon, with the same list and search as the home
// screen. The first Pokémon (`first`) is left out of both.
export default function ComparePickScreen() {
  const { first } = useLocalSearchParams<{ first: string }>();
  const firstId = Number(first);
  // Already cached from the detail screen, so the title does not wait for a request.
  const { data: firstPokemon } = usePokemonDetail(firstId);

  const {
    data,
    isPending,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = usePokemonList();
  const list = useMemo(() => (data ? excludePokemon(data, firstId) : undefined), [data, firstId]);

  const [query, setQuery] = useState('');
  const search = usePokemonSearch(query);
  const searchResults = useMemo(
    () => excludePokemon(search.results, firstId),
    [search.results, firstId],
  );

  const insets = useSafeAreaInsets();
  const title = firstPokemon ? `Compare with ${firstPokemon.name}` : 'Compare with';

  // Replace, not push: back on the compare screen returns to the detail screen.
  function pick(pokemon: PokemonListItem) {
    Keyboard.dismiss();
    router.replace({
      pathname: '/compare/[first]/[second]',
      params: { first: String(firstId), second: String(pokemon.id) },
    });
  }

  function handleChangeQuery(text: string) {
    setQuery(text);
    if (!text) Keyboard.dismiss();
  }

  function stopSearching() {
    setQuery('');
    Keyboard.dismiss();
  }

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
    if (searchResults.length === 0) {
      return <EmptyState message="No Pokémon found" />;
    }
    return <PokemonGrid data={searchResults} onPokemonPress={pick} />;
  }

  function renderList() {
    if (isPending || !list) {
      return isPending ? (
        <LoadingState />
      ) : (
        <ErrorState message="Could not load the Pokémon." onRetry={() => refetch()} />
      );
    }

    return (
      <PokemonGrid
        data={list}
        onPokemonPress={pick}
        onEndReached={loadMore}
        footer={
          isFetchNextPageError ? (
            <ErrorState message="Could not load more Pokémon." onRetry={() => fetchNextPage()} />
          ) : isFetchingNextPage ? (
            <View style={styles.footer}>
              <ActivityIndicator color={Colors.primary} />
            </View>
          ) : undefined
        }
      />
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + HEADER_BAR_HEIGHT }]}>
      <DetailHeader />
      <View style={styles.top}>
        <ScreenTitle>{title}</ScreenTitle>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hidden: {
    display: 'none',
  },
  top: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: Spacing.sm,
  },
  footer: {
    padding: Spacing.xl,
  },
});
