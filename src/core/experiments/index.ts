
import { dynamicLoader } from '../dynamic_loader';
import { CyclingExperiment } from './CyclingExperiment';

// Register the cycling experiment class (constructor)
dynamicLoader.registerExperiment('cycling', CyclingExperiment);
