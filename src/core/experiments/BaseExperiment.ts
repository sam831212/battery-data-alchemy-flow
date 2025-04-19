
import { z } from 'zod';

export interface ExperimentMetadata {
  experimentType: string;
  description: string;
  version: string;
}

export interface ExperimentConfig {
  requiredFields: string[];
  experimentParameters: Record<string, unknown>;
}

export interface AnalysisResult {
  success: boolean;
  data: Record<string, unknown>;
  metrics: Record<string, number>;
  errors: string[];
  warnings: string[];
}

export abstract class BaseExperiment {
  protected config: ExperimentConfig;
  protected metadata: ExperimentMetadata;

  constructor(config: ExperimentConfig, metadata: ExperimentMetadata) {
    this.config = config;
    this.metadata = metadata;
  }

  abstract analyze(data: unknown): Promise<AnalysisResult>;
  abstract validateData(data: unknown): Promise<boolean>;
  
  protected calculateCRate(capacity: number, current: number): number {
    return Math.abs(current / capacity);
  }

  protected calculateSOC(
    currentCapacity: number, 
    nominalCapacity: number
  ): number {
    return (currentCapacity / nominalCapacity) * 100;
  }

  protected normalizeTimestamp(timestamp: string | number): Date {
    return new Date(timestamp);
  }

  getName(): string {
    return this.metadata.experimentType;
  }
}

