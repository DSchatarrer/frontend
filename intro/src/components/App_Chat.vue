<!-- src\components\App_Chat.vue -->

<template>
  <div class="app-container">
    <!-- Sidebar -->
    <App_Sidebar />
    <div class="content-container">
      <!-- Header -->
      <App_Header />
      <!-- Body -->
      <App_Body />
    </div>
  </div>
</template>

<script setup>
import App_Sidebar from '@/components/App_Sidebar.vue';
import App_Header from '@/components/App_Header.vue';
import App_Body from '@/components/App_Body.vue';
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.content-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.App_Header {
  flex-shrink: 0;
}

.App_Body {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
