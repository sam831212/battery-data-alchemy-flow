import { z } from 'zod';

/**
 * Utility functions for data preprocessing
 */

export interface PreprocessingOptions {
  removeOutliers?: boolean;
  smoothingWindow?: number;
  requiredFields: string[];  // Changed to be required
}

export const preprocessingOptionsSchema = z.object({
  removeOutliers: z.boolean().optional().default(false),
  smoothingWindow: z.number().positive().optional().default(5),
  requiredFields: z.array(z.string()).min(1)  // Ensure at least one field is present
});

export class DataPreprocessor {
  private options: PreprocessingOptions;

  constructor(options: PreprocessingOptions) {
    // Validate the options using zod schema
    this.options = preprocessingOptionsSchema.parse(options);
  }

  /**
   * Filters and processes raw data
   */
  preprocess(rawData: unknown[]): unknown[] {
    if (!Array.isArray(rawData)) {
      throw new Error('Input data must be an array');
    }

    let processedData = this.extractRequiredFields(rawData);
    
    if (this.options.removeOutliers) {
      processedData = this.removeOutliers(processedData);
    }

    return processedData;
  }

  /**
   * Extracts only the required fields from the raw data
   */
  private extractRequiredFields(data: unknown[]): unknown[] {
    return data.map(item => {
      if (typeof item !== 'object' || !item) {
        throw new Error('Invalid data item format');
      }

      const extractedItem: Record<string, unknown> = {};
      
      for (const field of this.options.requiredFields) {
        if (!(field in item)) {
          throw new Error(`Required field "${field}" missing in data item`);
        }
        extractedItem[field] = (item as Record<string, unknown>)[field];
      }

      return extractedItem;
    });
  }

  /**
   * Removes statistical outliers using IQR method
   */
  private removeOutliers(data: unknown[]): unknown[] {
    if (data.length === 0) return data;

    const numericFields = Object.keys(data[0] as object).filter(key => 
      typeof (data[0] as Record<string, unknown>)[key] === 'number'
    );

    return data.filter(item => {
      for (const field of numericFields) {
        const value = (item as Record<string, unknown>)[field] as number;
        const values = data.map(d => (d as Record<string, unknown>)[field] as number);
        
        const q1 = this.calculateQuantile(values, 0.25);
        const q3 = this.calculateQuantile(values, 0.75);
        const iqr = q3 - q1;
        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;

        if (value < lowerBound || value > upperBound) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Calculates quantile value for a sorted array
   */
  private calculateQuantile(sortedArr: number[], q: number): number {
    const pos = (sortedArr.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    
    if (sortedArr[base + 1] !== undefined) {
      return sortedArr[base] + rest * (sortedArr[base + 1] - sortedArr[base]);
    } else {
      return sortedArr[base];
    }
  }
}
