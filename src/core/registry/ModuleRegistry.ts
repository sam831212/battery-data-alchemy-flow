
import { ModuleConstructor, RegisteredModule, LoadableModule } from '../interfaces/module';

/**
 * Module registry to keep track of all registered module types
 */
export class ModuleRegistry<T extends LoadableModule> {
  private modules: Map<string, ModuleConstructor<T>> = new Map();

  register(name: string, moduleClass: ModuleConstructor<T>): void {
    if (this.modules.has(name)) {
      console.warn(`Module '${name}' already registered. Overwriting.`);
    }
    this.modules.set(name, moduleClass);
  }

  getModule(name: string): ModuleConstructor<T> | undefined {
    return this.modules.get(name);
  }

  getAllModules(): RegisteredModule<T>[] {
    return Array.from(this.modules.entries()).map(([name, moduleClass]) => ({
      name,
      moduleClass,
    }));
  }
}
