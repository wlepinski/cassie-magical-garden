import { LocalProgressRepository } from '../persistence/LocalProgressRepository';
import { ProgressionSystem } from './systems/ProgressionSystem';

const repository = new LocalProgressRepository(window.localStorage);

export const progressionSystem = new ProgressionSystem(repository);
