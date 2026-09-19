export interface GardenReward {
  id: string;
  unlockAtTotalCompletions: number;
}

export const GARDEN_REWARDS: readonly GardenReward[] = [
  { id: 'flower-patch', unlockAtTotalCompletions: 1 },
  { id: 'butterfly-friend', unlockAtTotalCompletions: 3 },
  { id: 'rainbow-arch', unlockAtTotalCompletions: 5 },
];
