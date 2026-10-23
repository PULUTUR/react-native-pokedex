// Requests to PokeAPI (https://pokeapi.co/docs/v2). Screens use these through
// a hook in src/hooks/, never directly.

const BASE_URL = 'https://pokeapi.co/api/v2';

export const PAGE_SIZE = 20;

// More than the number of Pokémon in PokeAPI, so one page holds all of them.
const ALL_POKEMON_LIMIT = 2000;

export type NamedResource = {
  name: string;
  url: string;
};

export type PokemonPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedResource[];
};

// Only the fields of /pokemon/{id} the app uses.
export type ApiPokemon = {
  id: number;
  name: string;
  base_experience: number | null;
  height: number; // decimetres
  weight: number; // hectograms
  types: { slot: number; type: NamedResource }[];
  abilities: { ability: NamedResource; is_hidden: boolean; slot: number }[];
  stats: { base_stat: number; stat: NamedResource }[];
  species: NamedResource;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: { front_default: string | null };
    };
  };
};

// Only the fields of /pokemon-species/{id} the app uses.
export type ApiPokemonSpecies = {
  id: number;
  evolution_chain: { url: string } | null;
};

// One step in the tree of /evolution-chain/{id}. Evolution conditions
// (evolution_details) are out of scope, so they are not typed.
export type ApiChainLink = {
  species: NamedResource;
  evolves_to: ApiChainLink[];
};

export type ApiEvolutionChain = {
  id: number;
  chain: ApiChainLink;
};

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`PokeAPI responded with ${response.status}`);
  }
  return response.json();
}

export function fetchPokemonPage(offset: number) {
  return getJson<PokemonPage>(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
}

// PokeAPI has no search endpoint, so search loads every name once and filters
// on the phone.
export function fetchAllPokemonNames() {
  return getJson<PokemonPage>(`/pokemon?limit=${ALL_POKEMON_LIMIT}`);
}

export function fetchPokemon(id: number) {
  return getJson<ApiPokemon>(`/pokemon/${id}`);
}

export function fetchPokemonSpecies(id: number) {
  return getJson<ApiPokemonSpecies>(`/pokemon-species/${id}`);
}

export function fetchEvolutionChain(id: number) {
  return getJson<ApiEvolutionChain>(`/evolution-chain/${id}`);
}
