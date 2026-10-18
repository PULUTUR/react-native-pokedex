// Pure helpers for PokeAPI data: no fetch and no UI, so they can be tested on
// their own.

import type { NamedResource } from '@/services/pokeapi';

const SPRITE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export type PokemonListItem = {
  id: number;
  name: string;
  spriteUrl: string;
};

// "https://pokeapi.co/api/v2/pokemon/25/" -> 25
export function getIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (!match) {
    throw new Error(`No id in URL: ${url}`);
  }
  return Number(match[1]);
}

// The `next` URL of a page -> its offset, or undefined on the last page.
export function getOffsetFromUrl(url: string | null): number | undefined {
  const match = url?.match(/[?&]offset=(\d+)/);
  return match ? Number(match[1]) : undefined;
}

export function getSpriteUrl(id: number): string {
  return `${SPRITE_BASE_URL}/${id}.png`;
}

// 1 -> "001", 1025 -> "1025"
export function formatNumber(id: number): string {
  return String(id).padStart(3, '0');
}

// "bulbasaur" -> "Bulbasaur"
export function formatName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function toPokemonListItem(resource: NamedResource): PokemonListItem {
  const id = getIdFromUrl(resource.url);
  return {
    id,
    name: formatName(resource.name),
    spriteUrl: getSpriteUrl(id),
  };
}

export function getShareMessage(pokemon: PokemonListItem): string {
  return `Check out ${pokemon.name} (#${formatNumber(pokemon.id)}) in my Pokédex!`;
}
