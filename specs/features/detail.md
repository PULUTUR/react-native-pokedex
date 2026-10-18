# Pokémon detail

## Goal

Open a Pokémon and see who it is: name, number, artwork, types in their colour,
and its info and stats, switching quickly between them.

## Constraints

- Screen: `src/app/pokemon/[id].tsx`, outside the tabs (no tab bar). Design:
  `docs/figma/Detail (About).jpg`, `docs/figma/Detail (Stats).jpg`, `docs/figma/Evolution Detail.jpg`.
- One request: `/pokemon/{id}`. Switching tabs does not fetch again.
- Tabs About, Stats, Evolution are local state on this screen, not routes.
  Evolution is its own feature: until then the tab shows nothing.
- Type colours as a map in `src/constants/theme.ts`, for all 18 types.
- Units: weight from hectograms to kg, height from decimetres to m.
- The header has the back arrow and a heart (heart works from the
  [Favorites](./favorites.md) feature) and a compare icon (works from the
  [Compare](./compare.md) feature).

## Acceptance Criteria

- [ ] Top: name, number (`001`), type pills with a dot in the type colour, official artwork.
- [ ] About shows Name, ID, Base (`64 XP`), Weight (`6.9 kg`), Height (`0.7 m`), Types and Abilities, as in the Figma.
- [ ] Stats shows HP, Attack, Defense, Special Attack, Special Defense and Speed, each with its value and a bar relative to 255.
- [ ] Tapping a tab switches at once, with the line under the active tab.
- [ ] When I scroll down, the header collapses and shows the name in the middle (Figma "Evolution Detail").
- [ ] While loading I see a loading indicator; if it fails I see an error with "Try again" and the back arrow still works.

## Out of Scope

- Moves, abilities detail, flavour text, gender, egg groups.
- Shiny or other artwork variants.
- Swiping between Pokémon.
