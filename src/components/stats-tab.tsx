import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { getStatRatio, MAX_STAT_VALUE, type PokemonStat } from '@/utils/pokemon';

// Stat rows from the Figma "Detail (Stats)" screen: name, value and a bar
// relative to the highest possible stat (255).
export function StatsTab({ stats }: { stats: PokemonStat[] }) {
  return (
    <View style={styles.list}>
      {stats.map((stat) => (
        <View
          key={stat.label}
          style={styles.stat}
          accessible
          accessibilityLabel={`${stat.label} ${stat.value} of ${MAX_STAT_VALUE}`}>
          <View style={styles.header}>
            <Text style={styles.label}>{stat.label}</Text>
            <Text style={styles.value}>{stat.value}</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.bar, { width: `${getStatRatio(stat.value) * 100}%` }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.lg,
  },
  stat: {
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.text,
  },
  value: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  track: {
    height: 4,
    borderRadius: Radius.pill,
    backgroundColor: Colors.border,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: Radius.pill,
    backgroundColor: Colors.primary,
  },
});
