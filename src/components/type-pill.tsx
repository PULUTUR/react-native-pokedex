import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing, TypeColors, type PokemonType } from '@/constants/theme';
import { formatName } from '@/utils/pokemon';

// Grey pill with a dot in the type colour, e.g. "● Grass".
export function TypePill({ type }: { type: PokemonType }) {
  return (
    <View style={styles.pill}>
      <View style={[styles.dot, { backgroundColor: TypeColors[type] }]} />
      <Text style={styles.text}>{formatName(type)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.pill,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: Radius.pill,
  },
  text: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: Colors.text,
  },
});
