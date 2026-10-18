import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

type Props = {
  message: string;
  onRetry: () => void;
};

// Error message with a "Try again" button. Used full screen and as a list footer.
export function ErrorState({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Pressable
        onPress={onRetry}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
        <Text style={styles.buttonText}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.xl,
  },
  message: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.onPrimary,
  },
});
