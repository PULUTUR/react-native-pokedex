# Pokédex

A Pokédex app for Pokémon fans who want to look up any of the ~1300 Pokémon
quickly. Browse all Pokémon in a grid, search by name, open a Pokémon to see
its info, stats and evolution chain, keep favorites, and compare two Pokémon
to see who is stronger on which stat. Design follows the Figma file
(screenshots in `docs/figma/`), font Rubik.

## Core action

Look up a Pokémon and see what it is like.

## Features

1. [Pokémon list](./features/pokemon-list.md): all Pokémon in a grid, loaded 20 at a time while you scroll, with an options menu per card.
2. [Search by name](./features/search.md): type part of a name, find every Pokémon whose name contains it, also ones not loaded yet.
3. [Pokémon detail](./features/detail.md): name, number, artwork, types in their colour, About and Stats tabs.
4. [Evolution chain](./features/evolution-chain.md): the Evolution tab, tap through to the next Pokémon.
5. [Favorites](./features/favorites.md): favorite and unfavorite, own tab, still there after a restart.
6. [Compare](./features/compare.md): put two Pokémon side by side and see per stat who is stronger.

## Data

- **API**: [PokeAPI](https://pokeapi.co/docs/v2). Public, no login, no key.
- **Endpoints**:
  - `/pokemon?limit=20&offset=...`: one page of the list (name and URL, the id comes from the URL).
  - `/pokemon?limit=2000`: all names at once, for search.
  - `/pokemon/{id}`: detail (types, height, weight, base experience, abilities, stats, artwork).
  - `/pokemon-species/{id}`: link to the evolution chain.
  - `/evolution-chain/{id}`: the evolution chain.
  - Images: sprite `raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png` (list),
    official artwork `.../sprites/pokemon/other/official-artwork/{id}.png` (detail). Built from the id, no extra request.
- **Stored on the phone**: table `favorites` in SQLite: `id` (Pokémon id, primary key), `name`, `added_at`.

## Technical choices

- **Stored in SQLite**: the favorites, not the API data. API data is cached by
  TanStack Query and can always be fetched again; favorites are the only thing
  the user makes themselves, so they must survive a restart. I store the name
  too, so the Favorites screen shows its grid without a request per Pokémon.
  SQLite, not AsyncStorage: the primary key on `id` makes a duplicate favorite
  impossible, and I can sort with SQL instead of loading and sorting a JSON
  blob myself.
- **Native feature**: Share, from the ⋮ options menu on a card (as in the
  Figma "Options" screen). It opens the phone's share sheet with a text like
  "Check out Pikachu (#025) in my Pokédex!", so it works in every chat app.
  Alternative: haptics only. I chose Share because the design asks for it. As
  a small extra, favoriting gives a short haptic tap (`expo-haptics`).

## Technical core

- [ ] Runs in Expo Go
- [ ] Live data through TanStack Query
- [ ] At least 2 screens with Expo Router
- [ ] Something in SQLite that survives a restart
- [ ] Loading and error state on every load
- [ ] One native feature: Share, in the ⋮ options menu of a card
- [ ] TypeScript and ESLint without errors
- [ ] UI, data and logic in separate files

## Optional

- [ ] Pagination: page by page while you scroll, not all at once

## Out of scope

- Accounts or sync between phones.
- Moves, items, locations, games, abilities detail.
- Filtering or sorting the list by type, generation or stat.
- Battles.
- Other languages than English.
- A web or tablet version.
