import Airtable from 'airtable';
import type { WorkOrder } from '@/types';
import { config } from '@/config';

// Define proper Airtable response types
type AirtableRecord<T> = {
  id: string;
  createdTime: string;
  fields: T;
};

// Type guard for WorkOrder validation
function isWorkOrder(fields: unknown): fields is WorkOrder {
  if (!fields || typeof fields !== 'object') return false;
  const f = fields as Record<string, unknown>;
  
  return (
    typeof f.name === 'string' &&
    typeof f.address === 'string' &&
    typeof f.city === 'string' &&
    typeof f.state === 'string' &&
    typeof f.status === 'string' &&
    typeof f.workOrder === 'string'
  );
}

export const getShit = async (table: string): Promise<WorkOrder[]> => {
  try {
    const base = new Airtable({ apiKey: config.airtable.apiKey })
      .base(config.airtable.baseId);

    const records = await base(table).select().all();
    
    return records.map(record => {
      if (!isWorkOrder(record.fields)) {
        throw new Error(`Invalid record schema for ID: ${record.id}`);
      }
      return record.fields;
    });
  } catch (err: any) {
    if (err?.statusCode === 403) {
      console.error('Airtable authentication failed. Please check your API key and permissions.');
      console.error('Current API Key:', config.airtable.apiKey);
      console.error('Current Base ID:', config.airtable.baseId);
    }
    throw err;
  }
};
