export const CURRENT_PROGRESS_SCHEMA_VERSION = 1;

export type ActivityId = 'counting' | 'letters' | 'memory' | 'patterns';
export type DifficultyTier = 1 | 2 | 3;

export interface ActivityProgress {
  completions: number;
  recentIndependentSuccesses: number;
  recentRetries: number;
  difficultyTier: DifficultyTier;
}

export interface PlayerProgress {
  schemaVersion: number;
  totalCompletions: number;
  unlockedRewardIds: string[];
  activities: Record<ActivityId, ActivityProgress>;
}

const createInitialActivityProgress = (): ActivityProgress => ({
  completions: 0,
  recentIndependentSuccesses: 0,
  recentRetries: 0,
  difficultyTier: 1,
});

export const createInitialProgress = (): PlayerProgress => ({
  schemaVersion: CURRENT_PROGRESS_SCHEMA_VERSION,
  totalCompletions: 0,
  unlockedRewardIds: [],
  activities: {
    counting: createInitialActivityProgress(),
    letters: createInitialActivityProgress(),
    memory: createInitialActivityProgress(),
    patterns: createInitialActivityProgress(),
  },
});

export const isPlayerProgress = (value: unknown): value is PlayerProgress => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    value.schemaVersion === CURRENT_PROGRESS_SCHEMA_VERSION &&
    isNonNegativeInteger(value.totalCompletions) &&
    isStringArray(value.unlockedRewardIds) &&
    isRecord(value.activities) &&
    isActivityProgress(value.activities.counting) &&
    isActivityProgress(value.activities.letters) &&
    isActivityProgress(value.activities.memory) &&
    isActivityProgress(value.activities.patterns)
  );
};

const isActivityProgress = (value: unknown): value is ActivityProgress => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNonNegativeInteger(value.completions) &&
    isNonNegativeInteger(value.recentIndependentSuccesses) &&
    isNonNegativeInteger(value.recentRetries) &&
    (value.difficultyTier === 1 ||
      value.difficultyTier === 2 ||
      value.difficultyTier === 3)
  );
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isNonNegativeInteger = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');
