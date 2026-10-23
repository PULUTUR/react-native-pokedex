import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberBadge } from '@/components/number-badge';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import type { PokemonListItem } from '@/utils/pokemon';

export const EVOLUTION_SPRITE_AREA = 72;
export const EVOLUTION_ROW_BORDER = 2;

type Props = {
  pokemon: PokemonListItem;
  isCurrent: boolean;
  onPress: () => void;
};

// Row from the Figma "Detail (Evolution)" screen: sprite on the left, number
// badge and name. The Pokémon on screen gets a border and cannot be tapped.
export function EvolutionRow({ pokemon, isCurrent, onPress }: Props) {
  const [spriteFailed, setSpriteFailed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      disabled={isCurrent}
      accessibilityRole="button"
      accessibilityLabel={pokemon.name}
      accessibilityState={{ selected: isCurrent }}
      style={({ pressed }) => [styles.row, isCurrent && styles.current, pressed && styles.pressed]}>
      <View style={styles.spriteArea}>
        {spriteFailed ? (
          <MaterialCommunityIcons name="pokeball" size={36} color={Colors.textMuted} />
        ) : (
          <Image
            source={{ uri: pokemon.spriteUrl }}
            style={styles.sprite}
            contentFit="contain"
            onError={() => setSpriteFailed(true)}
          />
        )}
      </View>
      <View style={styles.info}>
        <View style={styles.badge}>
          <NumberBadge id={pokemon.id} />
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {pokemon.name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: EVOLUTION_ROW_BORDER,
    borderColor: Colors.transparent,
    overflow: 'hidden',
    boxShadow: `0 2px 8px ${Colors.shadow}`,
  },
  current: {
    borderColor: Colors.primary,
  },
  pressed: {
    opacity: 0.8,
  },
  spriteArea: {
    width: EVOLUTION_SPRITE_AREA,
    height: EVOLUTION_SPRITE_AREA,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardImage,
  },
  sprite: {
    width: 64,
    height: 64,
  },
  info: {
    flex: 1,
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  badge: {
    alignSelf: 'flex-start',
  },
  name: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.text,
  },
});
