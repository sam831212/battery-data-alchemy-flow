
/**
 * Utility functions for loading and processing configuration files
 */
import { dynamicLoader } from '../core/dynamic_loader';

/**
 * Load pipeline configuration from a YAML string
 * @param configYaml - YAML configuration string
 * @returns Parsed configuration object
 */
export async function loadPipelineConfig(configYaml: string): Promise<any> {
  try {
    return await dynamicLoader.loadConfig(configYaml);
  } catch (error) {
    console.error('Failed to load pipeline configuration:', error);
    throw new Error('Configuration loading failed');
  }
}

/**
 * Get all available machine types from the registry
 * @returns Array of machine type names and descriptions
 */
export function getAvailableMachineTypes(): { name: string; moduleClass: any }[] {
  return dynamicLoader.getRegisteredModules('ingestor');
}

/**
 * Get all available experiment types from the registry
 * @returns Array of experiment type names and descriptions
 */
export function getAvailableExperimentTypes(): { name: string; moduleClass: any }[] {
  return dynamicLoader.getRegisteredModules('experiment');
}

/**
 * Get all available persistence options from the registry
 * @returns Array of persistor names and descriptions
 */
export function getAvailablePersistors(): { name: string; moduleClass: any }[] {
  return dynamicLoader.getRegisteredModules('persistor');
}

/**
 * Build a complete processing pipeline from configuration
 * @param config - Pipeline configuration object
 * @returns Array of initialized pipeline stage instances
 */
export async function buildPipeline(config: any): Promise<any[]> {
  try {
    return await dynamicLoader.buildPipelineFromConfig(config);
  } catch (error) {
    console.error('Failed to build pipeline from configuration:', error);
    throw new Error('Pipeline building failed');
  }
}
