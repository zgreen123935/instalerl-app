<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useDataStore } from './stores/data'
import SiteCard from './components/SiteCard.vue'
import DebugPanel from '@/components/DebugPanel.vue'

const store = useDataStore()
onMounted(() => store.fetch())

// Show debug panel in development or if debug query param is present
const showDebug = computed(() => 
  import.meta.env.DEV || 
  new URLSearchParams(window.location.search).has('debug')
)
</script>

<template>
  <div class="app">
    <nav class="nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <main class="main">
      <div v-if="store.loading">Loading sites...</div>
      <div v-else-if="store.error" class="error">{{ store.error }}</div>
      <div v-else>
        <h1>Sites</h1>
        <div class="sites-grid">
          <SiteCard 
            v-for="site in store.items" 
            :key="site.id" 
            :site="site" 
          />
        </div>
        <!-- Debug info -->
        <details class="debug">
          <summary>Debug Info</summary>
          <pre>{{ store.items }}</pre>
        </details>
      </div>
    </main>
    <DebugPanel v-if="showDebug" class="debug-panel" />
  </div>
</template>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.nav {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.nav a {
  margin-right: 20px;
  color: #333;
  text-decoration: none;
}

.nav a.router-link-active {
  color: #ff0000;
}

.main {
  padding: 20px;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.error {
  color: red;
  padding: 20px;
  background: #fff5f5;
  border-radius: 4px;
}

.debug {
  margin-top: 20px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

h1 {
  margin-bottom: 20px;
}

.debug-panel {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
}
</style>
