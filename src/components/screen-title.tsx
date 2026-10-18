import { StyleSheet, Text } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

// Large page title, e.g. "All Pokémon" and "My favorites".
export function ScreenTitle({ children }: { children: string }) {
  return (
    <Text style={styles.title} accessibilityRole="header">
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
});
