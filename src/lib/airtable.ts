import Airtable from 'airtable';

export const getShit = async (table: string): Promise<any[]> => {
  const base = new Airtable({apiKey: import.meta.env.VITE_AIRTABLE_KEY})
    .base(import.meta.env.VITE_AIRTABLE_BASE_ID);
  
  return base(table)
    .select()
    .all()
    .then(records => records.map(r => r.fields as any));
};
