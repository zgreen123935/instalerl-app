<!-- Debug panel to show app state and API status -->
<template>
  <div class="debug-panel">
    <h3>🔧 Debug Panel</h3>
    
    <div class="debug-section">
      <h4>Environment</h4>
      <div class="debug-item">
        <span>Mode:</span>
        <span>{{ mode }}</span>
      </div>
      <div class="debug-item">
        <span>Base URL:</span>
        <span>{{ baseUrl }}</span>
      </div>
    </div>

    <div class="debug-section">
      <h4>API Status</h4>
      <div class="debug-item">
        <span>Last Fetch:</span>
        <span>{{ lastFetchTime || 'Never' }}</span>
      </div>
      <div class="debug-item">
        <span>Records:</span>
        <span>{{ recordCount }}</span>
      </div>
      <div class="debug-item">
        <span>Status:</span>
        <span :class="'status-' + apiStatus.toLowerCase()">{{ apiStatus }}</span>
      </div>
    </div>

    <div class="debug-actions">
      <button @click="testConnection" :disabled="isLoading">
        {{ isLoading ? 'Testing...' : 'Test Connection' }}
      </button>
    </div>

    <div v-if="error" class="debug-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchRecords } from '@/lib/api-client'

const mode = import.meta.env.MODE
const baseUrl = import.meta.env.BASE_URL
const isLoading = ref(false)
const error = ref('')
const lastFetchTime = ref<string | null>(null)
const recordCount = ref<number>(0)
const apiStatus = ref('Unknown')

// Test the API connection
async function testConnection() {
  isLoading.value = true
  error.value = ''
  apiStatus.value = 'Testing'
  
  try {
    const records = await fetchRecords()
    recordCount.value = records.length
    lastFetchTime.value = new Date().toLocaleTimeString()
    apiStatus.value = 'Connected'
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    apiStatus.value = 'Error'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.debug-panel {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  font-family: monospace;
  max-width: 500px;
}

.debug-section {
  margin-bottom: 1rem;
}

.debug-section h4 {
  color: #495057;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 0.25rem;
}

.debug-item {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
}

.debug-item span:first-child {
  color: #6c757d;
}

.debug-actions {
  margin-top: 1rem;
}

.debug-actions button {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.debug-actions button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.debug-error {
  margin-top: 1rem;
  padding: 0.5rem;
  background: #f8d7da;
  border: 1px solid #f5c2c7;
  border-radius: 4px;
  color: #842029;
}

.status-connected {
  color: #198754;
}

.status-error {
  color: #dc3545;
}

.status-testing {
  color: #ffc107;
}

.status-unknown {
  color: #6c757d;
}
</style>
