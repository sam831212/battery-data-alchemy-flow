
import { ModuleRegistry } from './registry/ModuleRegistry';
import { LoadableModule, ModuleConstructor } from './interfaces/module';
import { parseYamlConfig } from './utils/configLoader';

/**
 * Dynamic loader class that handles loading modules from config
 */
export class DynamicLoader {
  private ingestorRegistry = new ModuleRegistry<LoadableModule>();
  private experimentRegistry = new ModuleRegistry<LoadableModule>();
  private persistorRegistry = new ModuleRegistry<LoadableModule>();

  registerIngestor(name: string, ingestorClass: ModuleConstructor<LoadableModule>): void {
    this.ingestorRegistry.register(name, ingestorClass);
  }

  registerExperiment(name: string, experimentClass: ModuleConstructor<LoadableModule>): void {
    this.experimentRegistry.register(name, experimentClass);
  }

  registerPersistor(name: string, persistorClass: ModuleConstructor<LoadableModule>): void {
    this.persistorRegistry.register(name, persistorClass);
  }

  async loadConfig(configContent: string): Promise<any> {
    return parseYamlConfig(configContent);
  }

  async instantiateModule(
    type: 'ingestor' | 'experiment' | 'persistor',
    name: string,
    config: any
  ): Promise<LoadableModule | null> {
    const registry = this.getRegistryByType(type);
    const moduleClass = registry.getModule(name);

    if (!moduleClass) {
      console.error(`Module '${name}' of type '${type}' not found in registry`);
      return null;
    }

    try {
      const instance = new moduleClass(config);
      await instance.initialize();
      return instance;
    } catch (error) {
      console.error(`Error instantiating module '${name}':`, error);
      throw new Error(`Failed to instantiate module '${name}'`);
    }
  }

  getRegisteredModules(type: 'ingestor' | 'experiment' | 'persistor') {
    return this.getRegistryByType(type).getAllModules();
  }

  async buildPipelineFromConfig(config: any): Promise<LoadableModule[]> {
    if (!config?.pipeline?.stages?.length) {
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

  private getRegistryByType(type: 'ingestor' | 'experiment' | 'persistor'): ModuleRegistry<LoadableModule> {
    switch (type) {
      case 'ingestor':
        return this.ingestorRegistry;
      case 'experiment':
        return this.experimentRegistry;
      case 'persistor':
        return this.persistorRegistry;
      default:
        throw new Error(`Unknown module type: ${type}`);
    }
  }
}

// Create and export a singleton instance
export const dynamicLoader = new DynamicLoader();
