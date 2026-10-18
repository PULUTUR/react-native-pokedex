# Compare

## Goal

Put two Pokémon side by side and see per stat who is stronger.

## Constraints

- Figma has no screen for this: follow the style of the detail screen (font,
  colours, stat bars, cards).
- Starts from the compare icon in the detail header. That opens a picker,
  `src/app/compare/pick.tsx`, with the same search as the list, to choose the
  second Pokémon. Then `src/app/compare/[first]/[second].tsx`.
- Data: `/pokemon/{id}` for both, the same query as the detail screen (cached,
  so the first one does not load again).
- Deciding the winner per stat is a pure function in its own file, so it can be tested without UI.

## Acceptance Criteria

- [ ] On a detail screen the compare icon opens the picker; picking a Pokémon opens the compare screen.
- [ ] The compare screen shows both Pokémon at the top: artwork, name, number, types.
- [ ] Per stat (the six from Stats, plus Total) I see both values and both bars; the higher value is highlighted in its side's colour. A tie highlights neither.
- [ ] A summary line: "{Name} wins 4 of 6 stats" (or "It's a tie").
- [ ] Comparing a Pokémon with itself is not possible: it is not shown in the picker.
- [ ] Each side has its own loading indicator and an error with "Try again".

## Out of Scope

- More than two Pokémon.
- Type effectiveness or battle simulation.
- Saving comparisons.
