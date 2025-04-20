
import { z } from 'zod';

// Common validation rules that can be reused across schemas
export const validationRules = {
  voltage: {
    min: 0,
    max: 5,
  },
  current: {
    min: -100,
    max: 100,
  },
  temperature: {
    min: -20,
    max: 60,
  },
  duration: {
    min: 0,
    max: 86400, // 24 hours in seconds
  }
};

// Helper function to create a schema with custom error messages
export function createSchemaWithErrors<T extends z.ZodType>(
  schema: T,
  customErrors: Record<string, string>
): T {
  return schema.superRefine((data, ctx) => {
    Object.entries(customErrors).forEach(([path, message]) => {
      if (!(path in data)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message,
          path: [path],
        });
      }
    });
  });
}
