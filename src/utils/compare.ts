// Pure compare logic: no fetch and no UI, so it can be tested on its own.

import { MAX_STAT_VALUE, type PokemonListItem, type PokemonStat } from '@/utils/pokemon';

export type CompareWinner = 'first' | 'second' | 'tie';

export type CompareRow = {
  label: string;
  first: number;
  second: number;
  // Highest possible value for this row, so the bars of Total fit as well.
  max: number;
  winner: CompareWinner;
  isTotal: boolean;
};

export const TOTAL_LABEL = 'Total';

function getWinner(first: number, second: number): CompareWinner {
  if (first > second) return 'first';
  if (second > first) return 'second';
  return 'tie';
}

function sumStats(stats: PokemonStat[]): number {
  return stats.reduce((total, stat) => total + stat.value, 0);
}

// One row per stat (matched by label), plus a Total row at the end.
export function compareStats(first: PokemonStat[], second: PokemonStat[]): CompareRow[] {
  const rows: CompareRow[] = first.map((stat) => {
    const other = second.find((entry) => entry.label === stat.label)?.value ?? 0;
    return {
      label: stat.label,
      first: stat.value,
      second: other,
      max: MAX_STAT_VALUE,
      winner: getWinner(stat.value, other),
      isTotal: false,
    };
  });

  const firstTotal = sumStats(first);
  const secondTotal = sumStats(second);
  rows.push({
    label: TOTAL_LABEL,
    first: firstTotal,
    second: secondTotal,
    max: MAX_STAT_VALUE * rows.length,
    winner: getWinner(firstTotal, secondTotal),
    isTotal: true,
  });

  return rows;
}

// "Bulbasaur wins 4 of 6 stats", or "It's a tie" when both win as many stats.
// Only the separate stats count, not Total.
export function getCompareSummary(
  rows: CompareRow[],
  firstName: string,
  secondName: string,
): string {
  const stats = rows.filter((row) => !row.isTotal);
  const firstWins = stats.filter((row) => row.winner === 'first').length;
  const secondWins = stats.filter((row) => row.winner === 'second').length;

  if (firstWins === secondWins) {
    return "It's a tie";
  }
  const [name, wins] = firstWins > secondWins ? [firstName, firstWins] : [secondName, secondWins];
  return `${name} wins ${wins} of ${stats.length} stats`;
}

// The picker never shows the Pokémon that is being compared, so it cannot be
// compared with itself.
export function excludePokemon(pokemon: PokemonListItem[], id: number): PokemonListItem[] {
  return pokemon.filter((item) => item.id !== id);
}
