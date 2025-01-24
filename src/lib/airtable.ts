import Airtable from 'airtable';

// Define proper Airtable response types
type AirtableRecord<T> = {
  id: string;
  createdTime: string;
  fields: T;
};

export const getShit = async <T>(table: string): Promise<AirtableRecord<T>[]> => {
  const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_KEY })
    .base(import.meta.env.VITE_AIRTABLE_BASE_ID);

  const records = await base(table).select().all();
  return records.map(r => r as AirtableRecord<T>); // Proper type assertion
};
