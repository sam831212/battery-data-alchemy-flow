
import { BaseExperiment, ExperimentMetadata, ExperimentConfig, AnalysisResult } from './BaseExperiment';
import { ExperimentModule } from '../module-decorator';
import { DataPreprocessor } from '../utils/preprocessor';
import { z } from 'zod';

const cyclingDataSchema = z.array(z.object({
  timestamp: z.string().or(z.number()),
  current: z.number(),
  voltage: z.number(),
  capacity: z.number(),
  temperature: z.number().optional(),
}));

type CyclingData = z.infer<typeof cyclingDataSchema>;

@ExperimentModule({
  name: 'cycling_analysis',
  description: 'Analysis module for cycling experiments',
  version: '1.0.0',
})
export class CyclingAnalysis extends BaseExperiment {
  private preprocessor: DataPreprocessor;

  constructor() {
    const config: ExperimentConfig = {
      requiredFields: ['timestamp', 'current', 'voltage', 'capacity'],
      experimentParameters: {
        nominalCapacity: 2500, // mAh
        cutoffVoltage: { low: 2.5, high: 4.2 }, // V
      }
    };

    const metadata: ExperimentMetadata = {
      experimentType: 'cycling_analysis',
      description: 'Battery cycling data analysis',
      version: '1.0.0',
    };

    super(config, metadata);

    this.preprocessor = new DataPreprocessor({
      removeOutliers: true,
      smoothingWindow: 5,
      requiredFields: config.requiredFields, // Explicitly provide required fields
    });
  }

  async validateData(data: unknown): Promise<boolean> {
    try {
      cyclingDataSchema.parse(data);
      return true;
    } catch (error) {
      console.error('Data validation failed:', error);
      return false;
    }
  }

  async analyze(data: unknown): Promise<AnalysisResult> {
    if (!await this.validateData(data)) {
      return {
        success: false,
        data: {},
        metrics: {},
        errors: ['Invalid data format'],
        warnings: [],
      };
    }

    try {
      // Preprocess the data first
      const preprocessedData = this.preprocessor.preprocess(data as unknown[]);
      const cyclingData = preprocessedData as CyclingData;
      
      const metrics: Record<string, number> = {};
      const processedData: Record<string, unknown> = {};
      const warnings: string[] = [];

      // Calculate C-rates for each data point
      const cRates = cyclingData.map(point => 
        this.calculateCRate(
          this.config.experimentParameters.nominalCapacity as number,
          point.current
        )
      );

      // Calculate SOC for each data point
      const socValues = cyclingData.map(point =>
        this.calculateSOC(
          point.capacity,
          this.config.experimentParameters.nominalCapacity as number
        )
      );

      // Normalize timestamps
      const timestamps = cyclingData.map(point => 
        this.normalizeTimestamp(point.timestamp)
      );

      // Calculate average C-rate
      metrics.averageCRate = cRates.reduce((sum, rate) => sum + rate, 0) / cRates.length;

      // Calculate maximum and minimum voltage
      metrics.maxVoltage = Math.max(...cyclingData.map(point => point.voltage));
      metrics.minVoltage = Math.min(...cyclingData.map(point => point.voltage));

      // Check for voltage limits
      const cutoffLimits = this.config.experimentParameters.cutoffVoltage as { low: number, high: number };
      if (metrics.minVoltage < cutoffLimits.low) {
        warnings.push(`Voltage dropped below lower cutoff: ${metrics.minVoltage}V`);
      }
      if (metrics.maxVoltage > cutoffLimits.high) {
        warnings.push(`Voltage exceeded upper cutoff: ${metrics.maxVoltage}V`);
      }

      // Store processed data
      processedData.cRates = cRates;
      processedData.socValues = socValues;
      processedData.normalizedTimestamps = timestamps;
      
      return {
        success: true,
        data: processedData,
        metrics,
        errors: [],
        warnings,
      };
    } catch (error) {
      console.error('Analysis error:', error);
      return {
        success: false,
        data: {},
        metrics: {},
        errors: ['Analysis failed: ' + (error as Error).message],
        warnings: [],
      };
    }
  }
}
