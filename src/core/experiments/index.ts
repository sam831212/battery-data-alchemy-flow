
import { dynamicLoader } from '../dynamic_loader';
import { CyclingExperiment } from './CyclingExperiment';

// Register the cycling experiment
dynamicLoader.registerExperiment('cycling', CyclingExperiment);

