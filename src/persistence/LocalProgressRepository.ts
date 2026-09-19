import {
  createInitialProgress,
  isPlayerProgress,
  type PlayerProgress,
} from '../domain/progress';
import type { ProgressRepository } from './ProgressRepository';

const STORAGE_KEY = 'cassie-magical-garden.progress';

export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export class LocalProgressRepository implements ProgressRepository {
  public constructor(private readonly storage: KeyValueStorage) {}

  public read(): PlayerProgress {
    try {
      const raw = this.storage.getItem(STORAGE_KEY);
      if (raw === null) {
        return createInitialProgress();
      }

      const parsed: unknown = JSON.parse(raw);
      return isPlayerProgress(parsed) ? parsed : createInitialProgress();
    } catch {
      return createInitialProgress();
    }
  }

  public write(progress: PlayerProgress): void {
    try {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Gameplay remains available even if storage becomes unavailable.
    }
  }

  public reset(): PlayerProgress {
    const progress = createInitialProgress();

    try {
      this.storage.removeItem(STORAGE_KEY);
    } catch {
      // Reset still returns a known in-memory state when storage fails.
    }

    return progress;
  }
}
