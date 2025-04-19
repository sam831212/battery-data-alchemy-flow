
/**
 * Core interfaces for module system
 */

export interface ModuleConstructor<T> {
  new (...args: any[]): T;
}

export interface RegisteredModule<T> {
  name: string;
  moduleClass: ModuleConstructor<T>;
}

export interface LoadableModule {
  initialize(): Promise<void>;
  getName(): string;
}
