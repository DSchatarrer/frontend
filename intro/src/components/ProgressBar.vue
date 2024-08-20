<!-- src/components/ProgressBar.vue -->
 
<template>
  <div class="progress-container">
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="{ width: props.progress + '%' }">
        <div class="progress-bar-text" v-if="props.progress > 0">{{ props.progress }}%</div>
      </div>
    </div>
    <div class="progress-description" v-if="props.progress > 0">{{ props.description }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ progress: number, description: string }>();
</script>

<style scoped>
.progress-container {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}

.progress-bar {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
  height: 20px;
  margin-bottom: 5px;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  background-color: #4caf50;
  width: 0;
  transition: width 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.progress-bar-text {
  color: black;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.progress-description {
  font-size: 14px;
  color: #555;
}
</style>
