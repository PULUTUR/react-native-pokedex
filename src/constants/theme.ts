// All colours, fonts and spacing of the app. Values come from the Figma
// screenshots in docs/figma/. Screens never use a hard-coded colour.

export const Colors = {
  background: '#EDF6FF',
  surface: '#FFFFFF',
  cardImage: '#F6F7FF',
  text: '#0E0940',
  textSecondary: '#7D7A99',
  textMuted: '#B4B8CC',
  primary: '#5631E8',
  onPrimary: '#FFFFFF',
  favorite: '#F25C6A',
  border: '#E5E7F0',
  pill: '#DFE6F3',
  overlay: 'rgba(14, 9, 64, 0.35)',
  shadow: 'rgba(14, 9, 64, 0.08)',
  transparent: 'transparent',
} as const;

export const TypeColors = {
  normal: '#A8A77A',
  fire: '#F25C6A',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#6BC155',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
} as const;

export type PokemonType = keyof typeof TypeColors;

// Keys are the names used with useFonts in src/app/_layout.tsx.
export const Fonts = {
  regular: 'Rubik-Regular',
  medium: 'Rubik-Medium',
  semiBold: 'Rubik-SemiBold',
  bold: 'Rubik-Bold',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const Radius = {
  sm: 4,
  md: 8,
  lg: 12,
  pill: 999,
} as const;
