import type { WorkOrder } from '@/types';

export async function fetchRecords(): Promise<WorkOrder[]> {
  try {
    const response = await fetch('/api/records');

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        error
      });
      throw new Error(`API request failed: ${error.details || response.statusText}`);
    }

    const data = await response.json();
    if (!data.records) {
      console.error('Unexpected API response:', data);
      throw new Error('Invalid API response format');
    }

    return data.records.map((record: any) => {
      return record.fields as WorkOrder;
    });
  } catch (err) {
    console.error('Failed to fetch records:', err);
    throw err;
  }
}
