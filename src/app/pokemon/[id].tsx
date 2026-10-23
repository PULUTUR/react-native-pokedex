import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AboutTab } from '@/components/about-tab';
import { DetailHeader, HEADER_BAR_HEIGHT } from '@/components/detail-header';
import { type DetailTab, DetailTabs } from '@/components/detail-tabs';
import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { StatsTab } from '@/components/stats-tab';
import { TypePill } from '@/components/type-pill';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { usePokemonDetail } from '@/hooks/use-pokemon-detail';
import { formatNumber } from '@/utils/pokemon';

const ARTWORK_SIZE = 220;
// How far the artwork hangs below the blue top area into the white part.
const ARTWORK_OVERLAP = 64;

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: pokemon, isPending, refetch } = usePokemonDetail(Number(id));
  const [activeTab, setActiveTab] = useState<DetailTab>('about');
  const [artworkFailed, setArtworkFailed] = useState(false);

  const insets = useSafeAreaInsets();
  const headerHeight = insets.top + HEADER_BAR_HEIGHT;

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // The header (with the back arrow) is also shown while loading and on an
  // error, so the user can always go back.
  if (!pokemon) {
    return (
      <View style={[styles.screen, styles.background, { paddingTop: headerHeight }]}>
        <DetailHeader />
        {isPending ? (
          <LoadingState />
        ) : (
          <View style={styles.centered}>
            <ErrorState message="Could not load this Pokémon." onRetry={() => refetch()} />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <DetailHeader title={pokemon.name} scrollY={scrollY} showActions />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={[styles.content, { paddingTop: headerHeight }]}>
        <View style={styles.hero}>
          <View style={styles.heroBackground} />
          <View style={styles.titleRow}>
            <Text style={styles.name} numberOfLines={1} accessibilityRole="header">
              {pokemon.name}
            </Text>
            <Text style={styles.number}>{formatNumber(pokemon.id)}</Text>
          </View>
          <View style={styles.types}>
            {pokemon.types.map((type) => (
              <TypePill key={type} type={type} />
            ))}
          </View>
          <View style={styles.artwork}>
            {pokemon.artworkUrl && !artworkFailed ? (
              <Image
                source={{ uri: pokemon.artworkUrl }}
                style={styles.artworkImage}
                contentFit="contain"
                accessibilityLabel={`Artwork of ${pokemon.name}`}
                onError={() => setArtworkFailed(true)}
              />
            ) : (
              <MaterialCommunityIcons name="pokeball" size={120} color={Colors.textMuted} />
            )}
          </View>
        </View>

        <View style={styles.body}>
          <DetailTabs active={activeTab} onChange={setActiveTab} />
          <View style={styles.tabContent}>
            {activeTab === 'about' && <AboutTab pokemon={pokemon} />}
            {activeTab === 'stats' && <StatsTab stats={pokemon.stats} />}
            {/* The evolution chain comes with its own issue (#4). */}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  background: {
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    paddingBottom: Spacing.xxl,
  },
  hero: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  // Blue area behind the name and the top half of the artwork.
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: ARTWORK_OVERLAP,
    backgroundColor: Colors.background,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  name: {
    flex: 1,
    fontFamily: Fonts.bold,
    fontSize: 32,
    color: Colors.text,
  },
  number: {
    fontFamily: Fonts.regular,
    fontSize: 28,
    color: Colors.textMuted,
  },
  types: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  artwork: {
    height: ARTWORK_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.lg,
  },
  artworkImage: {
    width: ARTWORK_SIZE,
    height: ARTWORK_SIZE,
  },
  body: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  tabContent: {
    paddingTop: Spacing.xl,
  },
});
