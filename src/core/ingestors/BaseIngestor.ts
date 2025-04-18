
import { z } from 'zod';

export interface IngestorMetadata {
  machineType: string;
  fileFormat: string;
  dateFormat: string;
}

export interface IngestorConfig {
  requiredColumns: string[];
  headerRows: number;
  timestampFormat: string;
}

export interface DataValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export abstract class BaseIngestor {
  protected config: IngestorConfig;
  protected metadata: IngestorMetadata;

  constructor(config: IngestorConfig, metadata: IngestorMetadata) {
    this.config = config;
    this.metadata = metadata;
  }

  abstract loadData(file: File): Promise<any>;
  abstract preprocess(data: any): Promise<any>;
  
  protected async validateData(data: any): Promise<DataValidationResult> {
    const result: DataValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    // Check for required columns
    const missingColumns = this.config.requiredColumns.filter(
      col => !Object.keys(data[0] || {}).includes(col)
    );

    if (missingColumns.length > 0) {
      result.isValid = false;
      result.errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
    }

    return result;
  }
}
