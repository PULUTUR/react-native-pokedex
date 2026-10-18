import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { formatNumber } from '@/utils/pokemon';

// Purple Pokédex number, e.g. "001".
export function NumberBadge({ id }: { id: number }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{formatNumber(id)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm - 2,
    paddingVertical: 2,
  },
  text: {
    fontFamily: Fonts.medium,
    fontSize: 11,
    color: Colors.onPrimary,
  },
});
