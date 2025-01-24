<template>
  <div class="site-card">
    <h2 class="site-title">{{ site.name }}</h2>
    <div class="site-location">
      {{ site.address }}<br>
      {{ site.city }}, {{ site.state }}
    </div>
    <div class="site-meta">
      <span 
        class="site-status" 
        :class="site.status === 'generated' ? 'status-generated' : 'status-error'"
      >
        {{ site.status }}
      </span>
    </div>
    <p class="site-work-order">{{ site.workOrder }}</p>
  </div>
</template>

<script setup lang="ts">
interface Site {
  id: string
  name: string
  address: string
  city: string
  state: string
  status: string
  workOrder: string
}

defineProps<{
  site: Site
}>()
</script>

<style scoped>
.site-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #eee;
}

.site-title {
  font-size: 20px;
  margin: 0 0 10px 0;
  color: #333;
}

.site-location {
  font-size: 16px;
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.4;
}

.site-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.site-status {
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: capitalize;
}

.status-generated {
  color: #00a67e;
  background: rgba(0, 166, 126, 0.1);
}

.status-error {
  color: #ff0000;
  background: rgba(255, 0, 0, 0.1);
}

.site-work-order {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
}
</style>
