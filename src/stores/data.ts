import { defineStore } from 'pinia';
import { getShit } from '../lib/airtable';

// Add Airtable record type nuclear fix
type AirtableRecord = {
  id: string;
  fields: {
    name: string;
    address: string;
    city: string;
    state: string;
    status: string;
    workOrder: string;
  };
};

export const useDataStore = defineStore('data', {
  state: () => ({
    items: [] as Array<AirtableRecord['fields']>, // Force type compliance
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchSites() {
      this.loading = true;
      try {
        const rawData = await getShit('Sites');
        this.items = rawData as AirtableRecord['fields'][]; // Type assertion override
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch sites';
        console.error('Error fetching sites:', err);
      } finally {
        this.loading = false;
      }
    }
  }
});
