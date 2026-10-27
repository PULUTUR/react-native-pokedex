import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Fonts, Spacing } from '@/constants/theme';
import { useIsFavorite, useToggleFavorite } from '@/hooks/use-favorites';
import type { PokemonListItem } from '@/utils/pokemon';

export const HEADER_BAR_HEIGHT = 56;

const ICON_SIZE = 26;

// Scroll distance over which the name fades into the bar: roughly while the
// big name slides under the header.
const TITLE_FADE_START = 24;
const TITLE_FADE_END = 64;

type Props = {
  // Name shown in the middle once scrolled down; empty while loading or on an error.
  title?: string;
  scrollY?: SharedValue<number>;
  // Heart and compare are only shown once a Pokémon is loaded.
  showActions?: boolean;
  pokemon?: PokemonListItem;
};

function goBack() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/');
  }
}

function openComparePicker(pokemon: PokemonListItem) {
  router.push({ pathname: '/compare/pick', params: { first: String(pokemon.id) } });
}

// Detail header from the Figma: back arrow, heart and compare. When scrolling
// down it shows the name in the middle (Figma "Evolution Detail").
export function DetailHeader({ title, scrollY, showActions = false, pokemon }: Props) {
  const insets = useSafeAreaInsets();
  const { data: isFav } = useIsFavorite(pokemon?.id ?? 0);
  const toggleFavorite = useToggleFavorite();

  const titleStyle = useAnimatedStyle(() => ({
    opacity: scrollY
      ? interpolate(scrollY.value, [TITLE_FADE_START, TITLE_FADE_END], [0, 1], Extrapolation.CLAMP)
      : 0,
  }));

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.bar}>
        <View style={styles.side}>
          <Pressable
            onPress={goBack}
            hitSlop={Spacing.sm}
            accessibilityRole="button"
            accessibilityLabel="Back">
            <MaterialCommunityIcons name="arrow-left" size={ICON_SIZE} color={Colors.text} />
          </Pressable>
        </View>

        <Animated.Text style={[styles.title, titleStyle]} numberOfLines={1}>
          {title}
        </Animated.Text>

        <View style={[styles.side, styles.actions]}>
          {showActions && (
            <>
              <Pressable
                onPress={() => pokemon && openComparePicker(pokemon)}
                hitSlop={Spacing.sm}
                accessibilityRole="button"
                accessibilityLabel="Compare">
                <MaterialCommunityIcons
                  name="compare-horizontal"
                  size={ICON_SIZE}
                  color={Colors.text}
                />
              </Pressable>
              <Pressable
                hitSlop={Spacing.sm}
                accessibilityRole="button"
                accessibilityLabel={isFav ? 'Remove from favorites' : 'Add to favorites'}
                onPress={() => pokemon && toggleFavorite(pokemon)}>
                <MaterialCommunityIcons
                  name={isFav ? 'heart' : 'heart-outline'}
                  size={ICON_SIZE}
                  color={isFav ? Colors.favorite : Colors.text}
                />
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: Colors.background,
  },
  bar: {
    height: HEADER_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.text,
  },
  // Both sides are as wide as the two icons on the right, so the title stays
  // exactly in the middle.
  side: {
    width: ICON_SIZE * 2 + Spacing.lg,
    flexDirection: 'row',
  },
  actions: {
    justifyContent: 'flex-end',
    gap: Spacing.lg,
  },
});
