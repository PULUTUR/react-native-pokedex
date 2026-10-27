import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { NumberBadge } from '@/components/number-badge';
import { TypePill } from '@/components/type-pill';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import type { PokemonDetail } from '@/utils/pokemon';

const ARTWORK_SIZE = 120;

type Props = {
  pokemon: PokemonDetail | undefined;
  isPending: boolean;
  onRetry: () => void;
  // Colour of this side, also used for its stat bars.
  color: string;
};

// One of the two Pokémon at the top of the compare screen: artwork, name,
// number and types. Each side loads on its own, so it has its own loading and
// error state.
export function CompareSide({ pokemon, isPending, onRetry, color }: Props) {
  const [artworkFailed, setArtworkFailed] = useState(false);

  function renderContent() {
    if (!pokemon) {
      return isPending ? (
        <LoadingState />
      ) : (
        <ErrorState message="Could not load this Pokémon." onRetry={onRetry} />
      );
    }

    return (
      <>
        <View style={styles.artwork}>
          {pokemon.artworkUrl && !artworkFailed ? (
            <Image
              source={{ uri: pokemon.artworkUrl }}
              style={styles.artworkImage}
              contentFit="contain"
              accessibilityLabel={`Artwork of ${pokemon.name}`}
              onError={() => setArtworkFailed(true)}
            />
          ) : (
            <MaterialCommunityIcons name="pokeball" size={72} color={Colors.textMuted} />
          )}
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {pokemon.name}
        </Text>
        <NumberBadge id={pokemon.id} />
        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <TypePill key={type} type={type} />
          ))}
        </View>
      </>
    );
  }

  return (
    <View style={styles.card}>
      <View style={[styles.colorBar, { backgroundColor: color }]} />
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    boxShadow: `0 2px 8px ${Colors.shadow}`,
  },
  // Shows which colour belongs to this side in the stats below.
  colorBar: {
    height: Spacing.xs,
  },
  content: {
    flex: 1,
    minHeight: 260,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
  },
  artwork: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artworkImage: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
  },
  name: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.text,
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
});
