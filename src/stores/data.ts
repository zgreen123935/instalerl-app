import { defineStore } from 'pinia';
import { getShit } from '@/lib/airtable';

// Define your exact Airtable field structure
type WorkOrder = {
  name: string;
  address: string;
  city: string;
  state: string;
  status: string;
  workOrder: string;
};

export const useDataStore = defineStore('data', {
  state: () => ({
    items: [] as WorkOrder[]
  }),
  actions: {
    async fetch() {
      const records = await getShit<WorkOrder>('MainTable');
      this.items = records.map(r => r.fields); // Extract fields from records
    }
  }
});
