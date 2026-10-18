import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NumberBadge } from '@/components/number-badge';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import type { PokemonListItem } from '@/utils/pokemon';

type Props = {
  pokemon: PokemonListItem;
  width: number;
  onPress: () => void;
  onOptionsPress: () => void;
};

// Grid card from the Figma "Home" screen: number, sprite, name and ⋮ button.
export function PokemonCard({ pokemon, width, onPress, onOptionsPress }: Props) {
  const [spriteFailed, setSpriteFailed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={pokemon.name}
      style={({ pressed }) => [styles.card, { width }, pressed && styles.pressed]}>
      <View style={styles.imageArea}>
        <View style={styles.badge}>
          <NumberBadge id={pokemon.id} />
        </View>
        {spriteFailed ? (
          <MaterialCommunityIcons name="pokeball" size={64} color={Colors.textMuted} />
        ) : (
          <Image
            source={{ uri: pokemon.spriteUrl }}
            style={styles.sprite}
            contentFit="contain"
            onError={() => setSpriteFailed(true)}
          />
        )}
      </View>
      <View style={styles.footer}>
        <Text style={styles.name} numberOfLines={1}>
          {pokemon.name}
        </Text>
        <Pressable
          onPress={onOptionsPress}
          hitSlop={Spacing.sm}
          accessibilityRole="button"
          accessibilityLabel={`Options for ${pokemon.name}`}>
          <MaterialCommunityIcons name="dots-vertical" size={22} color={Colors.text} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    boxShadow: `0 2px 8px ${Colors.shadow}`,
  },
  pressed: {
    opacity: 0.8,
  },
  imageArea: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardImage,
  },
  badge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    zIndex: 1,
  },
  sprite: {
    width: 120,
    height: 120,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  name: {
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.text,
  },
});
