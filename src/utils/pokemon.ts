// Pure helpers for PokeAPI data: no fetch and no UI, so they can be tested on
// their own.

import { TypeColors, type PokemonType } from '@/constants/theme';
import type { ApiPokemon, NamedResource } from '@/services/pokeapi';

// Highest possible base stat; the stat bars are drawn relative to it.
export const MAX_STAT_VALUE = 255;

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Special Attack',
  'special-defense': 'Special Defense',
  speed: 'Speed',
};

export type PokemonStat = {
  label: string;
  value: number;
};

export type PokemonDetail = {
  id: number;
  // Same as id for normal Pokémon; differs for alternative forms (ids above 10000).
  speciesId: number;
  name: string;
  artworkUrl: string | null;
  types: PokemonType[];
  baseExperience: number | null;
  weightKg: number;
  heightM: number;
  abilities: string[];
  stats: PokemonStat[];
};

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

// "solar-power" -> "Solar Power"
export function formatResourceName(name: string): string {
  return name.split('-').map(formatName).join(' ');
}

// PokeAPI weight is in hectograms: 69 -> 6.9
export function hectogramsToKg(hectograms: number): number {
  return hectograms / 10;
}

// PokeAPI height is in decimetres: 7 -> 0.7
export function decimetresToM(decimetres: number): number {
  return decimetres / 10;
}

// 6.9 -> "6.9 kg"
export function formatWeight(kg: number): string {
  return `${kg.toFixed(1)} kg`;
}

// 0.7 -> "0.7 m"
export function formatHeight(m: number): string {
  return `${m.toFixed(1)} m`;
}

// 64 -> "64 XP"; some new Pokémon have no base experience yet.
export function formatBaseExperience(xp: number | null): string {
  return xp === null ? '–' : `${xp} XP`;
}

// Share of the stat bar that is filled, between 0 and 1. `max` is only
// different for Total on the compare screen (six stats added up).
export function getStatRatio(value: number, max: number = MAX_STAT_VALUE): number {
  return Math.min(Math.max(value / max, 0), 1);
}

function isPokemonType(name: string): name is PokemonType {
  return name in TypeColors;
}

export function toPokemonDetail(pokemon: ApiPokemon): PokemonDetail {
  return {
    id: pokemon.id,
    speciesId: getIdFromUrl(pokemon.species.url),
    name: formatName(pokemon.name),
    artworkUrl:
      pokemon.sprites.other?.['official-artwork']?.front_default ??
      pokemon.sprites.front_default,
    types: [...pokemon.types]
      .sort((a, b) => a.slot - b.slot)
      .map((entry) => entry.type.name)
      .filter(isPokemonType),
    baseExperience: pokemon.base_experience,
    weightKg: hectogramsToKg(pokemon.weight),
    heightM: decimetresToM(pokemon.height),
    // Hidden abilities are left out, like in the Figma ("Overgrow" for Bulbasaur).
    abilities: pokemon.abilities
      .filter((entry) => !entry.is_hidden)
      .map((entry) => formatResourceName(entry.ability.name)),
    stats: pokemon.stats.map((entry) => ({
      label: STAT_LABELS[entry.stat.name] ?? formatResourceName(entry.stat.name),
      value: entry.base_stat,
    })),
  };
}

export function getShareMessage(pokemon: PokemonListItem): string {
  return `Check out ${pokemon.name} (#${formatNumber(pokemon.id)}) in my Pokédex!`;
}
