
/**
 * Dynamic module loader for Battery Data Alchemy
 * 
 * This module provides functionality to dynamically load and instantiate
 * modules based on YAML configuration. It supports loading different types
 * of modules like data ingestors, experiment types, and data persistors.
 */

import yaml from 'yaml';

// Define interfaces for module registration and instantiation
export interface ModuleConstructor<T> {
  new (...args: any[]): T;
}

export interface RegisteredModule<T> {
  name: string;
  moduleClass: ModuleConstructor<T>;
}

// Define base interface for all loadable modules
export interface LoadableModule {
  initialize(): Promise<void>;
  getName(): string;
}

/**
 * Module registry to keep track of all registered module types
 */
class ModuleRegistry<T extends LoadableModule> {
  private modules: Map<string, ModuleConstructor<T>> = new Map();

  /**
   * Register a new module implementation
   * @param name - Unique identifier for the module
   * @param moduleClass - Class constructor for the module
   */
  register(name: string, moduleClass: ModuleConstructor<T>): void {
    if (this.modules.has(name)) {
      console.warn(`Module '${name}' already registered. Overwriting.`);
    }
    this.modules.set(name, moduleClass);
  }

  /**
   * Get a module by name
   * @param name - The name of the module to retrieve
   * @returns The module constructor or undefined if not found
   */
  getModule(name: string): ModuleConstructor<T> | undefined {
    return this.modules.get(name);
  }

  /**
   * Get all registered modules
   * @returns An array of all registered modules
   */
  getAllModules(): RegisteredModule<T>[] {
    return Array.from(this.modules.entries()).map(([name, moduleClass]) => ({
      name,
      moduleClass,
    }));
  }
}

/**
 * Dynamic loader class that handles loading modules from config
 */
export class DynamicLoader {
  // Registries for different types of modules
  private ingestorRegistry = new ModuleRegistry<LoadableModule>();
  private experimentRegistry = new ModuleRegistry<LoadableModule>();
  private persistorRegistry = new ModuleRegistry<LoadableModule>();

  /**
   * Register a data ingestor module
   * @param name - Name of the ingestor
   * @param ingestorClass - Ingestor class constructor
   */
  registerIngestor(name: string, ingestorClass: ModuleConstructor<LoadableModule>): void {
    this.ingestorRegistry.register(name, ingestorClass);
  }

  /**
   * Register an experiment module
   * @param name - Name of the experiment
   * @param experimentClass - Experiment class constructor
   */
  registerExperiment(name: string, experimentClass: ModuleConstructor<LoadableModule>): void {
    this.experimentRegistry.register(name, experimentClass);
  }

  /**
   * Register a data persistor module
   * @param name - Name of the persistor
   * @param persistorClass - Persistor class constructor
   */
  registerPersistor(name: string, persistorClass: ModuleConstructor<LoadableModule>): void {
    this.persistorRegistry.register(name, persistorClass);
  }

  /**
   * Load a YAML configuration file
   * @param configPath - Path to the YAML configuration file
   * @returns Parsed YAML data
   */
  async loadConfig(configContent: string): Promise<any> {
    try {
      return yaml.parse(configContent);
    } catch (error) {
      console.error('Error parsing YAML configuration:', error);
      throw new Error('Failed to parse YAML configuration');
    }
  }

  /**
   * Instantiate a module by type and name
   * @param type - Type of module (ingestor, experiment, persistor)
   * @param name - Name of the module to instantiate
   * @param config - Configuration options for the module
   * @returns Instance of the requested module
   */
  async instantiateModule(
    type: 'ingestor' | 'experiment' | 'persistor',
    name: string,
    config: any
  ): Promise<LoadableModule | null> {
    let registry: ModuleRegistry<LoadableModule>;
    
    switch (type) {
      case 'ingestor':
        registry = this.ingestorRegistry;
        break;
      case 'experiment':
        registry = this.experimentRegistry;
        break;
      case 'persistor':
        registry = this.persistorRegistry;
        break;
      default:
        throw new Error(`Unknown module type: ${type}`);
    }

    const moduleClass = registry.getModule(name);
    if (!moduleClass) {
      console.error(`Module '${name}' of type '${type}' not found in registry`);
      return null;
    }

    try {
      // Instantiate the module with config
      const instance = new moduleClass(config);
      await instance.initialize();
      return instance;
    } catch (error) {
      console.error(`Error instantiating module '${name}':`, error);
      throw new Error(`Failed to instantiate module '${name}'`);
    }
  }

  /**
   * Get all registered modules of a specific type
   * @param type - Type of modules to retrieve
   * @returns Array of registered modules of the specified type
   */
  getRegisteredModules(
    type: 'ingestor' | 'experiment' | 'persistor'
  ): RegisteredModule<LoadableModule>[] {
    switch (type) {
      case 'ingestor':
        return this.ingestorRegistry.getAllModules();
      case 'experiment':
        return this.experimentRegistry.getAllModules();
      case 'persistor':
        return this.persistorRegistry.getAllModules();
      default:
        return [];
    }
  }

  /**
   * Build a pipeline from configuration
   * @param config - Pipeline configuration object
   * @returns Array of instantiated pipeline stages
   */
  async buildPipelineFromConfig(config: any): Promise<LoadableModule[]> {
    if (!config || !config.pipeline || !Array.isArray(config.pipeline.stages)) {
      throw new Error('Invalid pipeline configuration: missing pipeline stages');
    }

    const pipelineStages: LoadableModule[] = [];

    for (const stageConfig of config.pipeline.stages) {
      if (!stageConfig.type || !stageConfig.name) {
        console.warn('Invalid stage configuration:', stageConfig);
        continue;
      }

      const stage = await this.instantiateModule(
        stageConfig.type as 'ingestor' | 'experiment' | 'persistor',
        stageConfig.name,
        stageConfig.config || {}
      );

      if (stage) {
        pipelineStages.push(stage);
      }
    }

    return pipelineStages;
  }
}

// Create and export a singleton instance
export const dynamicLoader = new DynamicLoader();
