import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';
import {
  formatBaseExperience,
  formatHeight,
  formatName,
  formatNumber,
  formatWeight,
  type PokemonDetail,
} from '@/utils/pokemon';

// Label/value rows from the Figma "Detail (About)" screen.
export function AboutTab({ pokemon }: { pokemon: PokemonDetail }) {
  const rows: [string, string][] = [
    ['Name', pokemon.name],
    ['ID', formatNumber(pokemon.id)],
    ['Base', formatBaseExperience(pokemon.baseExperience)],
    ['Weight', formatWeight(pokemon.weightKg)],
    ['Height', formatHeight(pokemon.heightM)],
    ['Types', pokemon.types.map(formatName).join(', ')],
    ['Abilities', pokemon.abilities.join(', ')],
  ];

  return (
    <View style={styles.list}>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    width: 104,
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.text,
  },
  value: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
