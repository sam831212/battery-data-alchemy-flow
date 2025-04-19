
import { dynamicLoader } from '@/core/dynamic_loader';
import { BaseIngestor } from '@/core/ingestors/BaseIngestor';
import { LoadableModule } from '@/core/interfaces/module';

export class FileProcessor {
  static async processFile(file: File, machineType: string): Promise<any> {
    try {
      // Get the appropriate ingestor based on machine type
      const module = await dynamicLoader.instantiateModule(
        'ingestor',
        machineType,
        {}
      );

      if (!module) {
        throw new Error(`No ingestor found for machine type: ${machineType}`);
      }

      // Cast to BaseIngestor after checking it's the right type
      const ingestor = module as unknown as BaseIngestor;

      // Load and process the data
      const rawData = await ingestor.loadData(file);
      const processedData = await ingestor.preprocess(rawData);

      return processedData;
    } catch (error) {
      console.error('Error processing file:', error);
      throw error;
    }
  }
}
