
import yaml from 'yaml';

export async function parseYamlConfig(configContent: string): Promise<any> {
  try {
    return yaml.parse(configContent);
  } catch (error) {
    console.error('Error parsing YAML configuration:', error);
    throw new Error('Failed to parse YAML configuration');
  }
}
