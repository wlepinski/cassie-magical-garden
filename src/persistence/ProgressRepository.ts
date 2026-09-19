import type { PlayerProgress } from '../domain/progress';

export interface ProgressRepository {
  read(): PlayerProgress;
  write(progress: PlayerProgress): void;
  reset(): PlayerProgress;
}
