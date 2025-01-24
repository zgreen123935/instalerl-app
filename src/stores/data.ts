import { defineStore } from 'pinia';
import { getShit } from '@/lib/airtable';
import type { WorkOrder } from '@/types';

interface DataState {
  items: WorkOrder[];
  loading: boolean;
  error: string | null;
}

export const useDataStore = defineStore('data', {
  state: (): DataState => ({
    items: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async fetch() {
      this.loading = true;
      this.error = null;
      
      try {
        this.items = await getShit('MainTable');
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Failed to fetch data:', err);
      } finally {
        this.loading = false;
      }
    }
  }
});
