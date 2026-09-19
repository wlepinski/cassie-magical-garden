import { describe, expect, it } from 'vitest';
import { createInitialProgress, isPlayerProgress } from '../src/domain/progress';

describe('player progress', () => {
  it('creates a valid empty progress state', () => {
    const progress = createInitialProgress();

    expect(isPlayerProgress(progress)).toBe(true);
    expect(progress.totalCompletions).toBe(0);
    expect(progress.unlockedRewardIds).toEqual([]);
    expect(progress.activities.counting.difficultyTier).toBe(1);
  });

  it('rejects progress from an unknown schema version', () => {
    const progress = {
      ...createInitialProgress(),
      schemaVersion: 999,
    };

    expect(isPlayerProgress(progress)).toBe(false);
  });
});
