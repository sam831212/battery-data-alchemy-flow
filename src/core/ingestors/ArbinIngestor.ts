
import { BaseIngestor, IngestorConfig, IngestorMetadata } from './BaseIngestor';

@IngestorModule({
  name: 'arbin_cycler',
  description: 'Data ingestor for Arbin battery testing machines',
  version: '1.0.0'
})
export class ArbinIngestor extends BaseIngestor {
  constructor() {
    const config: IngestorConfig = {
      requiredColumns: ['Voltage(V)', 'Current(A)', 'Capacity(Ah)', 'Time(s)'],
      headerRows: 3,
      timestampFormat: '%Y-%m-%d %H:%M:%S'
    };
    
    const metadata: IngestorMetadata = {
      machineType: 'arbin_cycler',
      fileFormat: 'csv',
      dateFormat: 'YYYY-MM-DD HH:mm:ss'
    };
    
    super(config, metadata);
  }

  async loadData(file: File): Promise<any> {
    try {
      const text = await file.text();
      const lines = text.split('\n');
      
      // Skip header rows
      const dataLines = lines.slice(this.config.headerRows);
      
      // Parse CSV data
      const parsedData = dataLines.map(line => {
        const values = line.split(',');
        return {
          'Voltage(V)': parseFloat(values[0]),
          'Current(A)': parseFloat(values[1]),
          'Capacity(Ah)': parseFloat(values[2]),
          'Time(s)': parseFloat(values[3])
        };
      });
      
      return parsedData;
    } catch (error) {
      console.error('Error loading data:', error);
      throw new Error('Failed to load data file');
    }
  }

  async preprocess(data: any): Promise<any> {
    // Apply any necessary preprocessing steps
    const processedData = data.map((row: any) => ({
      ...row,
      'Power(W)': row['Voltage(V)'] * row['Current(A)']
    }));
    
    return processedData;
  }
}
