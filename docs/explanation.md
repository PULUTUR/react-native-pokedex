# Explanation - Pokédex

**Route:** Pokédex. **Tools:** Claude Code (VS Code extension).

## 1. Your technical choices

**Favorites in SQLite.** The favorites are the only thing the user makes
themselves, so they are the only thing in SQLite. All API data is cached by
TanStack Query and can always be fetched again. The table is created in
`src/services/favorites-db.ts:7-13`, with the Pokémon id as primary key
(`src/services/favorites-db.ts:9`), so the same Pokémon can never be a favorite
twice. I store the name as well, so the Favorites tab can show its grid without
a request per Pokémon, and the sorting is done in SQL
(`src/services/favorites-db.ts:18`). I chose SQLite over AsyncStorage because
of that primary key and the sorting: with AsyncStorage I would have to load a
JSON blob, check for duplicates and sort it myself. This choice did not change
while building.

**Native feature: Share.** The ⋮ menu on a card has a "Share" item
(`src/components/pokemon-options-sheet.tsx:59`). It opens the phone's share
sheet with React Native's `Share` (`src/app/(tabs)/index.tsx:55`, and the same
on the Favorites tab in `src/app/(tabs)/favorites.tsx:40`). The text comes from
`getShareMessage` (`src/utils/pokemon.ts:151`), e.g. "Check out Pikachu (#025)
in my Pokédex!". The alternative was only haptics; I chose Share because the
Figma "Options" screen has it. The choice itself did not change, but I added
haptics as a small extra: favoriting gives a short tap
(`src/hooks/use-favorites.ts:36`).

## 2. Pick one feature and explain how it works, from API call to screen.

**Compare.** On a detail screen the compare icon opens the picker with the
current Pokémon's id (`src/components/detail-header.tsx:43`). The picker
(`src/app/compare/pick.tsx`) uses the same list and search hooks as the home
screen, but runs the results through `excludePokemon`
(`src/utils/compare.ts:77`), so you can't pick the same Pokémon twice. Picking
one does `router.replace` (`src/app/compare/pick.tsx:52`), so back on the
compare screen goes to the detail screen and not to the picker.

The compare screen (`src/app/compare/[first]/[second].tsx`) calls
`usePokemonDetail` twice (lines 21-22). That hook
(`src/hooks/use-pokemon-detail.ts`) fetches `/pokemon/{id}` through
`fetchPokemon` in `src/services/pokeapi.ts:78` and turns it into a
`PokemonDetail` with `toPokemonDetail` (`src/utils/pokemon.ts:125`). Its query
key is `['pokemon', id]` (`src/hooks/use-pokemon-detail.ts:11`), the same as on
the detail screen, so the first Pokémon comes from TanStack's cache and doesn't
load again.

Who wins is decided in a pure function, without UI: `compareStats`
(`src/utils/compare.ts:30`) makes one row per stat plus a Total row, each with
a winner (`first`, `second` or `tie`), and `getCompareSummary`
(`src/utils/compare.ts:59`) makes the line "Bulbasaur wins 4 of 6 stats" or
"It's a tie". `CompareStatRow` (`src/components/compare-stat-row.tsx`) draws
each row: the higher value gets its side's colour, a tie stays grey.

Loading and errors are per side: each `CompareSide`
(`src/components/compare-side.tsx:31`) shows its own spinner or its own error
with "Try again", which only refetches that side
(`src/app/compare/[first]/[second].tsx:71` and `:77`). The stats only appear
when both are loaded (line 33).

## 3. Name a suggestion from the agent that you rejected or changed.

During issue #4 (evolution chain), Expo Go on my phone suddenly said "Project
is incompatible with this version of Expo Go". The Play Store had updated Expo
Go to SDK 58, and my project was on SDK 57. The agent recommended to stay on
SDK 57 and install the old SDK 57 Expo Go on my phone with a USB cable and
`adb`. I asked to switch the project to SDK 58 instead: staying on 57 means
everyone who opens the app with the Play Store Expo Go, including my teacher,
gets the same error. We did that as its own issue (#10, PR #11), so the evolution
branch stayed clean, and after that we merged `main` into the #4 branch and I
tested the evolution tab on SDK 58. I noticed it by testing on my phone.

Chat: `chat-history/issue-4.json` (the messages at 14:32-14:36 UTC). Commits: the
upgrade in PR #11, and the merge into the #4 branch in commit `a7f8a5b`.
