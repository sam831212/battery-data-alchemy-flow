
import { dynamicLoader } from '../dynamic_loader';
import { CyclingAnalysis } from './CyclingAnalysis';

// Register experiment modules
dynamicLoader.registerExperiment('cycling_analysis', CyclingAnalysis);

console.log('Experiment modules registered');
