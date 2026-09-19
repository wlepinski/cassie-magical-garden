import { describe, expect, it } from 'vitest';
import { createInitialProgress, type PlayerProgress } from '../src/domain/progress';
import { ProgressionSystem } from '../src/game/systems/ProgressionSystem';
import type { ProgressRepository } from '../src/persistence/ProgressRepository';

class MemoryProgressRepository implements ProgressRepository {
  private progress: PlayerProgress = createInitialProgress();

  public read(): PlayerProgress {
    return structuredClone(this.progress);
  }

  public write(progress: PlayerProgress): void {
    this.progress = structuredClone(progress);
  }

  public reset(): PlayerProgress {
    this.progress = createInitialProgress();
    return this.read();
  }
}

describe('ProgressionSystem', () => {
  it('unlocks the first flower patch after one completion', () => {
    const system = new ProgressionSystem(new MemoryProgressRepository());

    const result = system.activityCompleted({
      activityId: 'counting',
      independent: true,
      retries: 0,
    });

    expect(result.progress.totalCompletions).toBe(1);
    expect(result.progress.activities.counting.completions).toBe(1);
    expect(result.newlyUnlockedRewardIds).toEqual(['flower-patch']);
  });

  it('does not report an already unlocked reward twice', () => {
    const system = new ProgressionSystem(new MemoryProgressRepository());

    system.activityCompleted({
      activityId: 'counting',
      independent: true,
      retries: 0,
    });
    const result = system.activityCompleted({
      activityId: 'counting',
      independent: true,
      retries: 0,
    });

    expect(result.newlyUnlockedRewardIds).toEqual([]);
    expect(result.progress.unlockedRewardIds).toEqual(['flower-patch']);
  });

  it('unlocks deterministic rewards at three and five completions', () => {
    const system = new ProgressionSystem(new MemoryProgressRepository());
    const unlocks: string[] = [];

    for (let completion = 0; completion < 5; completion += 1) {
      unlocks.push(
        ...system.activityCompleted({
          activityId: 'counting',
          independent: true,
          retries: 0,
        }).newlyUnlockedRewardIds,
      );
    }

    expect(unlocks).toEqual([
      'flower-patch',
      'butterfly-friend',
      'rainbow-arch',
    ]);
  });
});
