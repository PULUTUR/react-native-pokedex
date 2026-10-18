# Search by name

## Goal

Find any Pokémon by typing part of its name, also one I have not scrolled to
yet, so I do not scroll through 1300 cards.

## Constraints

- Lives on the list screen, `src/app/(tabs)/index.tsx`. No new screen. Design: `docs/figma/Home.jpg`, `docs/figma/Search.jpg`.
- PokeAPI has no search endpoint. All names are loaded once with
  `/pokemon?limit=2000` (TanStack Query, cached for the whole session) and
  filtered on the phone. No request per keystroke.
- The name list is only fetched when the user starts searching, so the start of the app stays fast.
- Results use the same card and grid as the list.
- The filter function lives in its own file, so it can be tested without UI.

## Acceptance Criteria

- [ ] A search field at the top with placeholder "Search for Pokémon..".
- [ ] Typing filters while I type, case-insensitive, on any part of the name: "ch" shows Charmander, Charmeleon, Charizard and also Pikachu.
- [ ] While searching, the title "All Pokémon" is hidden and the search icon becomes a back arrow.
- [ ] The back arrow (or clearing the field) closes the keyboard and shows the normal list again.
- [ ] No match shows "No Pokémon found".
- [ ] While the name list loads I see a loading indicator; if it fails I see an error with "Try again".

## Out of Scope

- Search by number or type.
- Search history or suggestions.
- Search on the Favorites tab.
