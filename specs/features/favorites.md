# Favorites

## Goal

Keep the Pokémon I like on their own tab, still there after I close the app.

## Constraints

- Tab "Favorites", `src/app/(tabs)/favorites.tsx`. Design: `docs/figma/Favorites.jpg`.
- `expo-sqlite`, table `favorites`: `id INTEGER PRIMARY KEY`, `name TEXT NOT NULL`, `added_at INTEGER NOT NULL`.
- All SQL in `src/services/`. Screens use a hook (TanStack Query around the
  SQLite calls), so the heart, the menu and the tab always agree.
- The Favorites grid shows name and sprite from SQLite; no API request per favorite.
- Haptics with `expo-haptics`: a light tap on favorite and unfavorite.

## Acceptance Criteria

- [ ] The heart on the detail screen is an outline when not a favorite and filled red when it is. Tapping it toggles.
- [ ] The ⋮ sheet on a card shows "Add to favorites" or "Remove from favorites" and toggles.
- [ ] The Favorites tab shows "My favorites" and a grid with the same cards as the list, sorted by number.
- [ ] Tapping a favorite opens its detail screen.
- [ ] With no favorites I see an empty state: "No favorites yet" and a hint to tap the heart.
- [ ] After closing and reopening the app the favorites are still there.
- [ ] If reading the database fails I see an error with "Try again".

## Out of Scope

- Sorting or reordering favorites.
- Sync between phones.
- Notes or tags on a favorite.
