import { describe, expect, it } from 'vitest';
import { createInitialProgress } from '../src/domain/progress';
import {
  LocalProgressRepository,
  type KeyValueStorage,
} from '../src/persistence/LocalProgressRepository';

class MemoryStorage implements KeyValueStorage {
  private readonly data = new Map<string, string>();

  public getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  public setItem(key: string, value: string): void {
    this.data.set(key, value);
  }

  public removeItem(key: string): void {
    this.data.delete(key);
  }
}

describe('LocalProgressRepository', () => {
  it('returns initial progress when storage is empty', () => {
    const repository = new LocalProgressRepository(new MemoryStorage());

    expect(repository.read()).toEqual(createInitialProgress());
  });

  it('round-trips valid progress', () => {
    const repository = new LocalProgressRepository(new MemoryStorage());
    const progress = createInitialProgress();
    progress.totalCompletions = 2;

    repository.write(progress);

    expect(repository.read().totalCompletions).toBe(2);
  });

  it('falls back safely when stored JSON is corrupt', () => {
    const storage = new MemoryStorage();
    storage.setItem('cassie-magical-garden.progress', '{broken');
    const repository = new LocalProgressRepository(storage);

    expect(repository.read()).toEqual(createInitialProgress());
  });
});
