
import { z } from 'zod';

// Define validation schemas for each entity
export const testDataSchema = z.object({
  voltage: z.number()
    .min(0, "Voltage must be positive")
    .max(5, "Voltage exceeds maximum limit"),
  current: z.number(),
  capacity: z.number().optional(),
  timestamp: z.string().datetime(),
  temperature: z.number().optional(),
}).strict();

export const testStepSchema = z.object({
  step_type: z.enum(['charge', 'discharge', 'rest']),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  duration: z.number().positive(),
  capacity: z.number().optional(),
  energy: z.number().optional(),
  c_rate: z.number().optional(),
}).strict();

export class DataValidator {
  private schema: z.ZodType;
  private errorMessages: string[] = [];

  constructor(schema: z.ZodType) {
    this.schema = schema;
  }

  validate(data: unknown): boolean {
    try {
      if (Array.isArray(data)) {
        // Validate array of records
        data.forEach((record, index) => {
          try {
            this.schema.parse(record);
          } catch (error) {
            if (error instanceof z.ZodError) {
              this.errorMessages.push(`Record at index ${index}: ${error.message}`);
            }
          }
        });
      } else {
        // Validate single record
        this.schema.parse(data);
      }

      return this.errorMessages.length === 0;
    } catch (error) {
      if (error instanceof z.ZodError) {
        this.errorMessages.push(error.message);
      }
      return false;
    }
  }

  getErrors(): string[] {
    return this.errorMessages;
  }

  clearErrors(): void {
    this.errorMessages = [];
  }
}
