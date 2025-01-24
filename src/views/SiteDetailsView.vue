<template>
  <div class="site-details" v-if="site">
    <h1>Site Details</h1>
    
    <div class="details-card">
      <div class="detail-row">
        <span class="label">Site ID:</span>
        <span class="value">{{ site.id }}</span>
      </div>
      <div class="detail-row">
        <span class="label">Name:</span>
        <span class="value">{{ site.fields.name }}</span>
      </div>
      <div class="detail-row">
        <span class="label">Address:</span>
        <span class="value">{{ site.fields.address }}</span>
      </div>
      <div class="detail-row">
        <span class="label">Status:</span>
        <span class="value status" :class="'status-' + site.fields.status.toLowerCase()">
          {{ site.fields.status }}
        </span>
      </div>
      <div class="detail-row" v-if="site.fields.workOrder">
        <span class="label">Work Order:</span>
        <span class="value">{{ site.fields.workOrder }}</span>
      </div>
    </div>

    <div class="actions">
      <button @click="router.back()" class="back-button">Back</button>
    </div>
  </div>
  <div v-else-if="loading" class="loading">
    Loading site details...
  </div>
  <div v-else-if="error" class="error">
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface SiteFields {
  name: string
  address: string
  status: string
  workOrder?: string
}

interface Site {
  id: string
  fields: SiteFields
  createdTime: string
}

const route = useRoute()
const router = useRouter()
const siteId = route.params.id as string

const site = ref<Site | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchSiteDetails() {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch(`/api/records/${siteId}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch site details: ${response.statusText}`)
    }
    const data = await response.json()
    site.value = data
  } catch (err) {
    error.value = err.message
    console.error('Error fetching site details:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSiteDetails()
})
</script>

<style scoped>
.site-details {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.details-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin: 2rem 0;
}

.detail-row {
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.detail-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
  width: 120px;
  color: #666;
}

.value {
  flex: 1;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: 500;
}

.status-active {
  background: rgba(0, 200, 83, 0.1);
  color: rgb(0, 200, 83);
}

.status-pending {
  background: rgba(255, 152, 0, 0.1);
  color: rgb(255, 152, 0);
}

.status-inactive {
  background: rgba(244, 67, 54, 0.1);
  color: rgb(244, 67, 54);
}

.actions {
  margin-top: 2rem;
  text-align: center;
}

.back-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.back-button:hover {
  background: #3aa876;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #f44336;
}
</style>
