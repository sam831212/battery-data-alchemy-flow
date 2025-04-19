
import { dynamicLoader } from '../dynamic_loader';
import { CyclingExperiment } from './CyclingExperiment';

// Create an instance of the cycling experiment
const cyclingExperiment = new CyclingExperiment();

// Register the cycling experiment instance
dynamicLoader.registerExperiment('cycling', cyclingExperiment);
