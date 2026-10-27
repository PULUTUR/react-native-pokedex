import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import type { CompareRow } from '@/utils/compare';
import { getStatRatio } from '@/utils/pokemon';

type Props = {
  row: CompareRow;
  firstName: string;
  secondName: string;
};

// One stat on the compare screen, in the style of the Stats tab. Both bars
// grow outwards from the middle; the higher value is drawn in its side's
// colour, the lower one (and both on a tie) in grey.
export function CompareStatRow({ row, firstName, secondName }: Props) {
  const firstColor = row.winner === 'first' ? Colors.compareFirst : Colors.textMuted;
  const secondColor = row.winner === 'second' ? Colors.compareSecond : Colors.textMuted;

  return (
    <View
      style={[styles.row, row.isTotal && styles.totalRow]}
      accessible
      accessibilityLabel={`${row.label}: ${firstName} ${row.first}, ${secondName} ${row.second}`}>
      <View style={styles.header}>
        <Text
          style={[styles.value, row.winner === 'first' && styles.winner, { color: firstColor }]}>
          {row.first}
        </Text>
        <Text style={[styles.label, row.isTotal && styles.totalLabel]}>{row.label}</Text>
        <Text
          style={[
            styles.value,
            styles.valueRight,
            row.winner === 'second' && styles.winner,
            { color: secondColor },
          ]}>
          {row.second}
        </Text>
      </View>
      <View style={styles.bars}>
        <View style={[styles.track, styles.trackLeft]}>
          <View
            style={[
              styles.bar,
              {
                width: `${getStatRatio(row.first, row.max) * 100}%`,
                backgroundColor: firstColor,
              },
            ]}
          />
        </View>
        <View style={styles.track}>
          <View
            style={[
              styles.bar,
              {
                width: `${getStatRatio(row.second, row.max) * 100}%`,
                backgroundColor: secondColor,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: Spacing.sm,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 2,
    textAlign: 'center',
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.text,
  },
  totalLabel: {
    fontFamily: Fonts.bold,
  },
  value: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
  },
  valueRight: {
    textAlign: 'right',
  },
  winner: {
    fontFamily: Fonts.bold,
  },
  bars: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  track: {
    flex: 1,
    flexDirection: 'row',
    height: 4,
    borderRadius: Radius.pill,
    backgroundColor: Colors.border,
    overflow: 'hidden',
  },
  // The left bar starts at the middle and grows to the left.
  trackLeft: {
    justifyContent: 'flex-end',
  },
  bar: {
    height: '100%',
    borderRadius: Radius.pill,
  },
});
