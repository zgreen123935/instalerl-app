import type { WorkOrder } from '@/types';
import { config } from '@/config';

const API_KEY = 'patdO1RLKkgBMsvtJ.b293998bbfed44737014eb9922ce07f4aa212f22bfee73c30fe43f07e76f7f25';
const BASE_ID = 'appEL9Y26LvV46RbB';
const TABLE_ID = 'tblNVH7hI7Uki8YNu';

export async function fetchRecords(): Promise<WorkOrder[]> {
  const url = `https://api.airtable.com/v0/${config.airtable.baseId}/${config.airtable.tableId}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.airtable.apiKey}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Airtable API Error:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        error
      });
      throw new Error(`API request failed: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    if (!data.records) {
      console.error('Unexpected API response:', data);
      throw new Error('Invalid API response format');
    }

    return data.records.map((record: any) => {
      console.log('Record:', record);
      return record.fields as WorkOrder;
    });
  } catch (err) {
    console.error('Failed to fetch records:', err);
    throw err;
  }
}
