import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CompareSide } from '@/components/compare-side';
import { CompareStatRow } from '@/components/compare-stat-row';
import { DetailHeader, HEADER_BAR_HEIGHT } from '@/components/detail-header';
import { EmptyState } from '@/components/empty-state';
import { ScreenTitle } from '@/components/screen-title';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';
import { usePokemonDetail } from '@/hooks/use-pokemon-detail';
import { compareStats, getCompareSummary } from '@/utils/compare';

// Two Pokémon side by side with per stat who is stronger. Both use the same
// query as the detail screen, so the first one comes from the cache.
export default function CompareScreen() {
  const params = useLocalSearchParams<{ first: string; second: string }>();
  const firstId = Number(params.first);
  const secondId = Number(params.second);
  const first = usePokemonDetail(firstId);
  const second = usePokemonDetail(secondId);

  const insets = useSafeAreaInsets();

  const rows = useMemo(
    () => (first.data && second.data ? compareStats(first.data.stats, second.data.stats) : []),
    [first.data, second.data],
  );

  function renderStats() {
    // The stats wait for both sides; until then each side shows its own state.
    if (!first.data || !second.data) {
      return null;
    }
    return (
      <View style={styles.card}>
        <Text style={styles.summary} accessibilityRole="header">
          {getCompareSummary(rows, first.data.name, second.data.name)}
        </Text>
        {rows.map((row) => (
          <CompareStatRow
            key={row.label}
            row={row}
            firstName={first.data.name}
            secondName={second.data.name}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <DetailHeader />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + HEADER_BAR_HEIGHT + Spacing.sm },
        ]}>
        <ScreenTitle>Compare</ScreenTitle>
        {/* Only reachable with a hand-made link: the picker never offers the same Pokémon. */}
        {firstId === secondId ? (
          <EmptyState message="Pick two different Pokémon" />
        ) : (
          <>
            <View style={styles.sides}>
              <CompareSide
                pokemon={first.data}
                isPending={first.isPending}
                onRetry={() => first.refetch()}
                color={Colors.compareFirst}
              />
              <CompareSide
                pokemon={second.data}
                isPending={second.isPending}
                onRetry={() => second.refetch()}
                color={Colors.compareSecond}
              />
            </View>
            {renderStats()}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  sides: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  card: {
    gap: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    boxShadow: `0 2px 8px ${Colors.shadow}`,
  },
  summary: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
  },
});
