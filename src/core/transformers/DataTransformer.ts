
import { z } from 'zod';

export interface TransformationConfig {
  sourceFields: string[];
  targetFields: string[];
  mappings: Record<string, (value: any) => any>;
}

// Update the schema to make all fields required to match the interface
export const transformationConfigSchema = z.object({
  sourceFields: z.array(z.string()).min(1),
  targetFields: z.array(z.string()).min(1),
  mappings: z.record(z.function().args(z.any()).returns(z.any()))
}).strict(); // Add strict() to ensure all fields are required

export class DataTransformer {
  private config: TransformationConfig;

  constructor(config: TransformationConfig) {
    const validatedConfig = transformationConfigSchema.parse(config);
    this.config = validatedConfig;
  }

  transform(data: unknown[]): Record<string, unknown>[] {
    if (!Array.isArray(data)) {
      throw new Error('Input data must be an array');
    }

    return data.map(item => {
      const transformedItem: Record<string, unknown> = {};

      for (const targetField of this.config.targetFields) {
        if (targetField in this.config.mappings) {
          const mappingFunction = this.config.mappings[targetField];
          transformedItem[targetField] = mappingFunction(item);
        } else {
          // Direct mapping if no transformation function is provided
          const sourceField = this.config.sourceFields.find(
            field => field.toLowerCase() === targetField.toLowerCase()
          );
          if (sourceField && typeof item === 'object' && item !== null && sourceField in item) {
            // Add type guard to ensure item is an object before accessing properties
            transformedItem[targetField] = (item as Record<string, unknown>)[sourceField];
          }
        }
      }

      return transformedItem;
    });
  }

  validateTransformation(transformedData: Record<string, unknown>[]): boolean {
    return transformedData.every(item => 
      this.config.targetFields.every(field => field in item)
    );
  }
}

// Example usage:
/*
const transformer = new DataTransformer({
  sourceFields: ['Voltage(V)', 'Current(A)', 'Time(s)'],
  targetFields: ['voltage', 'current', 'timestamp'],
  mappings: {
    voltage: (data: any) => parseFloat(data['Voltage(V)']),
    current: (data: any) => parseFloat(data['Current(A)']),
    timestamp: (data: any) => new Date(data['Time(s)'] * 1000).toISOString()
  }
});
*/
