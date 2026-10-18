// Requests to PokeAPI (https://pokeapi.co/docs/v2). Screens use these through
// a hook in src/hooks/, never directly.

const BASE_URL = 'https://pokeapi.co/api/v2';

export const PAGE_SIZE = 20;

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
