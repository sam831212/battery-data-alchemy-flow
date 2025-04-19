import { BaseExperiment, ExperimentConfig, ExperimentMetadata, AnalysisResult } from './BaseExperiment';

interface CyclingData {
  timestamp: string;
  current: number;
  voltage: number;
  capacity: number;
  temperature: number;
}

export class CyclingExperiment extends BaseExperiment {
  constructor() {
    const config: ExperimentConfig = {
      requiredFields: ['timestamp', 'current', 'voltage', 'capacity', 'temperature'],
      experimentParameters: {
        nominalCapacity: 3.0, // Ah
        voltageRange: { min: 2.5, max: 4.2 }, // V
      },
    };

    const metadata: ExperimentMetadata = {
      experimentType: 'cycling',
      description: 'Battery cycling test analysis',
      version: '1.0.0',
    };

    super(config, metadata);
  }

  async analyze(data: unknown): Promise<AnalysisResult> {
    const cyclingData = data as CyclingData[];
    const result: AnalysisResult = {
      success: true,
      data: {},
      metrics: {},
      errors: [],
      warnings: [],
    };

    try {
      const nominalCapacity = this.config.experimentParameters.nominalCapacity as number;
      
      // Calculate key metrics
      result.metrics = {
        maxCRate: Math.max(...cyclingData.map(d => 
          this.calculateCRate(nominalCapacity, d.current)
        )),
        avgTemperature: cyclingData.reduce((sum, d) => 
          sum + d.temperature, 0) / cyclingData.length,
        finalSOC: this.calculateSOC(
          cyclingData[cyclingData.length - 1].capacity,
          nominalCapacity
        ),
      };

      // Process timestamps
      result.data = {
        timestamps: cyclingData.map(d => this.normalizeTimestamp(d.timestamp)),
        processedData: cyclingData.map(d => ({
          ...d,
          cRate: this.calculateCRate(nominalCapacity, d.current),
          soc: this.calculateSOC(d.capacity, nominalCapacity),
        })),
      };
    } catch (error) {
      result.success = false;
      result.errors.push(`Analysis failed: ${error.message}`);
    }

    return result;
  }

  async validateData(data: unknown): Promise<boolean> {
    const cyclingData = data as CyclingData[];
    
    if (!Array.isArray(cyclingData)) {
      return false;
    }

    return cyclingData.every(point => 
      this.config.requiredFields.every(field => 
        field in point
      )
    );
  }
}
