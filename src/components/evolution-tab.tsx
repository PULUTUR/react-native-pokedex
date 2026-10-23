import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { ErrorState } from '@/components/error-state';
import {
  EVOLUTION_ROW_BORDER,
  EVOLUTION_SPRITE_AREA,
  EvolutionRow,
} from '@/components/evolution-row';
import { LoadingState } from '@/components/loading-state';
import { Colors, Spacing } from '@/constants/theme';
import { useEvolutionChain } from '@/hooks/use-evolution-chain';
import type { PokemonListItem } from '@/utils/pokemon';

const DOT_SIZE = 3;
const DOT_COUNT = 4;

type Props = {
  speciesId: number;
  onSelect: (pokemon: PokemonListItem) => void;
};

// The detail screen only mounts this tab when it is opened, so the evolution
// requests start then. Loading and errors stay inside the tab, so the rest of
// the screen keeps working.
export function EvolutionTab({ speciesId, onSelect }: Props) {
  const { data: chain, isPending, isError, refetch } = useEvolutionChain(speciesId);

  if (isPending) {
    return (
      <View style={styles.status}>
        <LoadingState />
      </View>
    );
  }

  if (isError || !chain) {
    return <ErrorState message="Could not load the evolution chain." onRetry={() => refetch()} />;
  }

  if (chain.length <= 1) {
    return <EmptyState message="This Pokémon does not evolve" />;
  }

  return (
    <View>
      {chain.map((pokemon, index) => (
        <Fragment key={pokemon.id}>
          {index > 0 && <DottedLine />}
          <EvolutionRow
            pokemon={pokemon}
            isCurrent={pokemon.id === speciesId}
            onPress={() => onSelect(pokemon)}
          />
        </Fragment>
      ))}
    </View>
  );
}

// Android does not draw a one-sided dotted border reliably, so the line is a
// column of small dots, centred under the sprites.
function DottedLine() {
  return (
    <View style={styles.dottedLine}>
      {Array.from({ length: DOT_COUNT }, (_, index) => (
        <View key={index} style={styles.dot} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    paddingVertical: Spacing.xxl,
  },
  dottedLine: {
    width: EVOLUTION_SPRITE_AREA + 2 * EVOLUTION_ROW_BORDER,
    alignItems: 'center',
    gap: DOT_SIZE,
    paddingVertical: Spacing.md,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: Colors.textMuted,
  },
});
