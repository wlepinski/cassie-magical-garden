import type { ActivityId, PlayerProgress } from '../../domain/progress';
import { GARDEN_REWARDS } from '../../domain/rewards';
import type { ProgressRepository } from '../../persistence/ProgressRepository';

export interface ActivityCompletion {
  activityId: ActivityId;
  independent: boolean;
  retries: number;
}

export interface ProgressionResult {
  progress: PlayerProgress;
  newlyUnlockedRewardIds: string[];
}

export class ProgressionSystem {
  public constructor(private readonly repository: ProgressRepository) {}

  public getProgress(): PlayerProgress {
    return this.repository.read();
  }

  public activityCompleted(event: ActivityCompletion): ProgressionResult {
    const current = this.repository.read();
    const previousRewards = new Set(current.unlockedRewardIds);
    const activity = current.activities[event.activityId];

    const totalCompletions = current.totalCompletions + 1;
    const unlockedRewardIds = GARDEN_REWARDS.filter(
      (reward) => reward.unlockAtTotalCompletions <= totalCompletions,
    ).map((reward) => reward.id);

    const next: PlayerProgress = {
      ...current,
      totalCompletions,
      unlockedRewardIds,
      activities: {
        ...current.activities,
        [event.activityId]: {
          ...activity,
          completions: activity.completions + 1,
          recentIndependentSuccesses: event.independent
            ? activity.recentIndependentSuccesses + 1
            : 0,
          recentRetries: event.retries,
        },
      },
    };

    this.repository.write(next);

    return {
      progress: next,
      newlyUnlockedRewardIds: unlockedRewardIds.filter(
        (rewardId) => !previousRewards.has(rewardId),
      ),
    };
  }
}
