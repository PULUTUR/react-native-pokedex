# Pokémon list

## Goal

See all ~1300 Pokémon in a grid as in the Figma "Home" screen, loaded page by
page while I scroll, so the app starts fast and scrolls smoothly.

## Constraints

- Screen: the "Pokémons" tab, `src/app/(tabs)/index.tsx`. Design: `docs/figma/Home.jpg`, `docs/figma/Options.jpg`.
- `useInfiniteQuery` on `/pokemon?limit=20&offset=...`. The next page loads when
  I get near the end of the list. Not the whole list at once.
- The id comes from the URL in the response. The sprite image is built from the
  id; no request per card.
- Two-column grid (`FlatList` with `numColumns={2}`). Card: number badge
  (3 digits, `001`), sprite, name, ⋮ button.
- The ⋮ button opens a bottom sheet with "Open Pokémon" and "Share" (the
  "Add to favorites" item comes with the [Favorites](./favorites.md) feature).
- Share uses React Native's `Share` API. No extra dependency for it.
- Colours, font and spacing from `src/constants/theme.ts`.

## Acceptance Criteria

- [ ] The tab shows the title "All Pokémon" and a grid of cards, starting with Bulbasaur `001`.
- [ ] Scrolling to the bottom loads the next 20, until the last Pokémon.
- [ ] A long name is cut off with "..." and does not break the card.
- [ ] Tapping a card, or "Open Pokémon" in the sheet, opens its detail screen.
- [ ] "Share" opens the phone's share sheet with "Check out {Name} (#{number}) in my Pokédex!".
- [ ] While the first page loads I see a loading indicator; if it fails I see an error with a "Try again" button. A failing next page shows a retry at the bottom, the loaded cards stay.
- [ ] A Pokémon without a sprite shows a placeholder image, not an empty box.

## Out of Scope

- Search (own feature).
- Filtering or sorting.
- Pull to refresh.
