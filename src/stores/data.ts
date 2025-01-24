import { defineStore } from 'pinia'
import Airtable from 'airtable'

interface Site {
  id: string
  name: string
  address: string
  city: string
  state: string
  status: string
  workOrder: string
}

export const useDataStore = defineStore('data', {
  state: () => ({
    items: [] as Site[],
    loading: false,
    error: null as string | null
  }),
  
  actions: {
    async fetch() {
      this.loading = true
      this.error = null
      
      try {
        const apiKeyPreview = import.meta.env.VITE_AIRTABLE_KEY.slice(0, 5) + '...'
        console.log('Config:', {
          apiKeyPreview,
          baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
          tableId: 'tblNVH7hI7Uki8YNu'
        })

        const airtable = new Airtable({
          apiKey: import.meta.env.VITE_AIRTABLE_KEY
        })

        const base = airtable.base(import.meta.env.VITE_AIRTABLE_BASE_ID)
        const records = await base('tblNVH7hI7Uki8YNu').select().firstPage()
        
        console.log('Records received:', records.length)
        
        this.items = records
          .filter(record => record.fields['Client Site Name']) // Filter out empty records
          .map(record => ({
            id: record.id,
            name: record.fields['Client Site Name'] || 'Untitled',
            address: record.fields['Address'] || 'No address',
            city: record.fields['City'] || '',
            state: record.fields['State/Province'] || '',
            status: record.fields['Work Order Details']?.state || 'unknown',
            workOrder: record.fields['Work Order Details']?.value || 'No work order'
          }))

      } catch (err: any) {
        console.error('Error details:', {
          message: err.message,
          error: err
        })
        this.error = `Error: ${err.message}`
      } finally {
        this.loading = false
      }
    }
  }
})
