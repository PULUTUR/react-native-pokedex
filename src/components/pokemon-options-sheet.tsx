import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Fonts, Spacing } from '@/constants/theme';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type Props = {
  visible: boolean;
  onClose: () => void;
  onOpen: () => void;
  onShare: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

function SheetItem({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}>
      <MaterialCommunityIcons name={icon} size={22} color={Colors.text} />
      <Text style={styles.itemLabel}>{label}</Text>
    </Pressable>
  );
}

// Bottom sheet from the Figma "Options" screen, opened with a card's ⋮ button.
// Built on React Native's Modal, so it needs no extra library.
export function PokemonOptionsSheet({ visible, onClose, onOpen, onShare, isFavorite, onToggleFavorite }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.container}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityLabel="Close options"
        />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + Spacing.lg }]}>
          {onToggleFavorite && (
            <SheetItem
              icon={isFavorite ? 'heart-minus-outline' : 'heart-plus-outline'}
              label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              onPress={() => { onToggleFavorite(); onClose(); }}
            />
          )}
          <SheetItem icon="arrow-expand" label="Open Pokémon" onPress={onOpen} />
          <SheetItem icon="share-variant-outline" label="Share" onPress={onShare} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.overlay,
  },
  sheet: {
    backgroundColor: Colors.surface,
    paddingTop: Spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  itemPressed: {
    backgroundColor: Colors.cardImage,
  },
  itemLabel: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.text,
  },
});
