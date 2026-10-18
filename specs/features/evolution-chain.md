# Evolution chain

## Goal

See which Pokémon this one evolves from and into, and tap through to them.

## Constraints

- The Evolution tab on the detail screen, `src/app/pokemon/[id].tsx`. Design: `docs/figma/Detail (Evolution).jpg`.
- Two requests: `/pokemon-species/{id}` for the chain URL, then
  `/evolution-chain/{id}`. Only fetched when the Evolution tab is opened.
- The API returns a nested tree. Turning it into a flat list is a pure
  function in its own file, so it can be tested without UI.
- Branches (Eevee has eight evolutions) are shown as one list in API order.
- Row: sprite on the left, number badge, name. Dotted line between rows.

## Acceptance Criteria

- [ ] The tab shows every Pokémon in the chain in order: Pichu, Pikachu, Raichu.
- [ ] The Pokémon I am looking at is visibly marked in the list.
- [ ] Tapping another Pokémon opens its detail screen; back returns to the previous one.
- [ ] A Pokémon without evolutions shows "This Pokémon does not evolve".
- [ ] The tab has its own loading indicator and an error with "Try again"; the rest of the detail screen stays usable.

## Out of Scope

- Evolution conditions (level, item, trade, friendship).
- Mega evolutions and regional forms.
