import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { NumberBadge } from '@/components/number-badge';
import { Colors, Fonts, Spacing } from '@/constants/theme';

// Placeholder so the list can already open a Pokémon. The real detail screen
// comes with issue "Detail" (specs/features/detail.md).
export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true, title: '' }} />
      <NumberBadge id={Number(id)} />
      <Text style={styles.text}>The detail screen is coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    padding: Spacing.xl,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
