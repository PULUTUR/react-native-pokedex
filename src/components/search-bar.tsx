import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  // While searching the search icon becomes a back arrow that calls onBack.
  isSearching: boolean;
  onBack: () => void;
};

// Search field from the Figma "Home" and "Search" screens.
export function SearchBar({ value, onChangeText, isSearching, onBack }: Props) {
  return (
    <View style={styles.container}>
      {isSearching ? (
        <Pressable
          onPress={onBack}
          hitSlop={Spacing.sm}
          accessibilityRole="button"
          accessibilityLabel="Stop searching">
          <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.text} />
        </Pressable>
      ) : (
        <MaterialCommunityIcons name="magnify" size={24} color={Colors.text} />
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search for Pokémon.."
        placeholderTextColor={Colors.textMuted}
        selectionColor={Colors.primary}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel="Search for Pokémon"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    boxShadow: `0 2px 8px ${Colors.shadow}`,
  },
  input: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: Spacing.md,
  },
});
