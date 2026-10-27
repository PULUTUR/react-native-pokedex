import type { ReactElement } from 'react';
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';

import { PokemonCard } from '@/components/pokemon-card';
import { Spacing } from '@/constants/theme';
import type { PokemonListItem } from '@/utils/pokemon';

export const SCREEN_PADDING = Spacing.xl;
const COLUMN_GAP = Spacing.lg;

type Props = {
  data: PokemonListItem[];
  onPokemonPress: (pokemon: PokemonListItem) => void;
  onOptionsPress?: (pokemon: PokemonListItem) => void;
  header?: ReactElement | null;
  footer?: ReactElement | null;
  onEndReached?: () => void;
};

// Two-column grid of Pokémon cards, used for the full list and search results.
export function PokemonGrid({
  data,
  onPokemonPress,
  onOptionsPress,
  header,
  footer,
  onEndReached,
}: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - SCREEN_PADDING * 2 - COLUMN_GAP) / 2;

  return (
    <FlatList
      data={data}
      keyExtractor={(pokemon) => String(pokemon.id)}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      // React Native 0.88 types accept undefined here, but not null.
      ListHeaderComponent={header ?? undefined}
      renderItem={({ item }) => (
        <PokemonCard
          pokemon={item}
          width={cardWidth}
          onPress={() => onPokemonPress(item)}
          onOptionsPress={onOptionsPress && (() => onOptionsPress(item))}
        />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={footer ?? undefined}
      // A tap on a card works while the search keyboard is open.
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  row: {
    gap: COLUMN_GAP,
    marginBottom: COLUMN_GAP,
  },
});
