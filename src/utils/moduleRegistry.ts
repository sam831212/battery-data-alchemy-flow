
/**
 * Module registry for Battery Data Alchemy
 * 
 * This module provides functionality to register and manage different types
 * of modules such as data ingestors, experiment types, and data persistors.
 */

// Define interfaces for module registration
export interface ModuleInfo {
  name: string;
  description: string;
  version: string;
  author?: string;
}

export interface RegisteredModule<T> {
  info: ModuleInfo;
  implementation: T;
}

/**
 * Module registry to keep track of all registered modules of a specific type
 */
export class ModuleRegistry<T> {
  private modules: Map<string, RegisteredModule<T>> = new Map();

  /**
   * Register a new module implementation
   * @param info - Module metadata
   * @param implementation - The module implementation
   */
  register(info: ModuleInfo, implementation: T): void {
    if (this.modules.has(info.name)) {
      console.warn(`Module '${info.name}' already registered. Overwriting.`);
    }
    
    this.modules.set(info.name, { info, implementation });
    console.log(`Module '${info.name}' registered successfully.`);
  }

  /**
   * Get a module by name
   * @param name - The name of the module to retrieve
   * @returns The module or undefined if not found
   */
  getModule(name: string): RegisteredModule<T> | undefined {
    return this.modules.get(name);
  }

  /**
   * Get all registered modules
   * @returns An array of all registered modules
   */
  getAllModules(): RegisteredModule<T>[] {
    return Array.from(this.modules.values());
  }
  
  /**
   * Check if a module is registered
   * @param name - The name of the module to check
   * @returns True if the module is registered, false otherwise
   */
  hasModule(name: string): boolean {
    return this.modules.has(name);
  }
  
  /**
   * Remove a registered module
   * @param name - The name of the module to remove
   * @returns True if the module was removed, false if it wasn't registered
   */
  unregister(name: string): boolean {
    return this.modules.delete(name);
  }
  
  /**
   * Get the number of registered modules
   * @returns The number of registered modules
   */
  get count(): number {
    return this.modules.size;
  }
}
