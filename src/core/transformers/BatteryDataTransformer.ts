
import { DataTransformer, TransformationConfig } from './DataTransformer';

export class BatteryDataTransformer extends DataTransformer {
  constructor() {
    const config: TransformationConfig = {
      sourceFields: ['Voltage(V)', 'Current(A)', 'Capacity(Ah)', 'Time(s)', 'Temperature(C)'],
      targetFields: ['voltage', 'current', 'capacity', 'timestamp', 'temperature'],
      mappings: {
        voltage: (data: any) => parseFloat(data['Voltage(V)']),
        current: (data: any) => parseFloat(data['Current(A)']),
        capacity: (data: any) => parseFloat(data['Capacity(Ah)']),
        timestamp: (data: any) => new Date(data['Time(s)'] * 1000).toISOString(),
        temperature: (data: any) => data['Temperature(C)'] ? parseFloat(data['Temperature(C)']) : null
      }
    };
    
    super(config);
  }
}
