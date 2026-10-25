import * as SQLite from 'expo-sqlite';

import type { PokemonListItem } from '@/utils/pokemon';

const db = SQLite.openDatabaseSync('pokedex.db');

db.execSync(`
  CREATE TABLE IF NOT EXISTS favorites (
    id       INTEGER PRIMARY KEY,
    name     TEXT    NOT NULL,
    added_at INTEGER NOT NULL
  )
`);

type FavoriteRow = { id: number; name: string; added_at: number };

export function getFavorites(): PokemonListItem[] {
  const rows = db.getAllSync<FavoriteRow>('SELECT id, name FROM favorites ORDER BY id ASC');
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${row.id}.png`,
  }));
}

export function addFavorite(id: number, name: string): void {
  db.runSync('INSERT OR IGNORE INTO favorites (id, name, added_at) VALUES (?, ?, ?)', id, name, Date.now());
}

export function removeFavorite(id: number): void {
  db.runSync('DELETE FROM favorites WHERE id = ?', id);
}

export function isFavorite(id: number): boolean {
  const rows = db.getAllSync<{ id: number }>('SELECT id FROM favorites WHERE id = ? LIMIT 1', id);
  return rows.length > 0;
}
