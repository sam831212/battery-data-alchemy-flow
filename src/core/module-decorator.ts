
/**
 * Module decorator for Battery Data Alchemy
 * 
 * This module provides decorators to register module implementations
 * with the dynamic loader system.
 */

import { dynamicLoader } from './dynamic_loader';
import { ModuleInfo } from '../utils/moduleRegistry';
import { LoadableModule } from './interfaces/module';

/**
 * Decorator for registering ingestor modules
 * @param info - Module metadata
 * @returns Decorator function
 */
export function IngestorModule(info: ModuleInfo) {
  return function<T extends LoadableModule>(target: new (...args: any[]) => T) {
    dynamicLoader.registerIngestor(info.name, target);
    console.log(`Ingestor module '${info.name}' registered`);
    return target;
  };
}

/**
 * Decorator for registering experiment modules
 * @param info - Module metadata
 * @returns Decorator function
 */
export function ExperimentModule(info: ModuleInfo) {
  return function<T extends LoadableModule>(target: new (...args: any[]) => T) {
    dynamicLoader.registerExperiment(info.name, target);
    console.log(`Experiment module '${info.name}' registered`);
    return target;
  };
}

/**
 * Decorator for registering persistor modules
 * @param info - Module metadata
 * @returns Decorator function
 */
export function PersistorModule(info: ModuleInfo) {
  return function<T extends LoadableModule>(target: new (...args: any[]) => T) {
    dynamicLoader.registerPersistor(info.name, target);
    console.log(`Persistor module '${info.name}' registered`);
    return target;
  };
}
