import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenTitle } from '@/components/screen-title';
import { Spacing } from '@/constants/theme';

// The grid comes with issue "Pokémon list" (specs/features/pokemon-list.md).
export default function PokemonListScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenTitle>All Pokémon</ScreenTitle>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
});
