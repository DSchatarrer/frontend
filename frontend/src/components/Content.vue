<!-- frontend\src\components\Content.vue -->

<template>
  <div class="main">
    <Header />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
</script>

<style scoped>
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box; 
}

.content {
  flex: 1;
  overflow: auto;
  padding: 1rem 2rem;
  background-color: #f9fbe7; /* verde muy claro como fondo */
}
</style>
