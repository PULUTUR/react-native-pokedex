import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing } from '@/constants/theme';

export type DetailTab = 'about' | 'stats' | 'evolution';

const TABS: { key: DetailTab; label: string }[] = [
  { key: 'about', label: 'About' },
  { key: 'stats', label: 'Stats' },
  { key: 'evolution', label: 'Evolution' },
];

type Props = {
  active: DetailTab;
  onChange: (tab: DetailTab) => void;
};

// About / Stats / Evolution with a line under the active tab. The tabs are
// local state on the detail screen, not routes.
export function DetailTabs({ active, onChange }: Props) {
  return (
    <View style={styles.row} accessibilityRole="tablist">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            style={[styles.tab, isActive && styles.activeTab]}>
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    // Overlaps the grey line, so the active line sits on top of it.
    marginBottom: -2,
    borderBottomWidth: 2,
    borderBottomColor: Colors.transparent,
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  label: {
    fontFamily: Fonts.semiBold,
    fontSize: 15,
    color: Colors.textSecondary,
  },
  activeLabel: {
    color: Colors.text,
  },
});
