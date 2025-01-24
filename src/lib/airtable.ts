import Airtable from 'airtable';
import type { WorkOrder } from '@/types';

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
  const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_KEY })
    .base(import.meta.env.VITE_AIRTABLE_BASE_ID);

  const records = await base(table).select().all();
  
  return records.map(record => {
    if (!isWorkOrder(record.fields)) {
      throw new Error(`Invalid record schema for ID: ${record.id}`);
    }
    return record.fields;
  });
};
