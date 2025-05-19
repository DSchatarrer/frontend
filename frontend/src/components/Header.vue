<!-- frontend\src\components\Header.vue -->

<template>
    <header class="header">
      <h1 class="title">Menú saludable</h1>
    </header>
  </template>
  
  <script setup lang="ts">
  // Puedes añadir lógica más adelante si es necesario
  </script>
  
  <style scoped>
  .header {
    flex-shrink: 0;
    background-color: #2e7d32; /* Verde intenso */
    color: white;
    padding: 1rem 2rem;
    border-bottom: 4px solid #a5d6a7; /* separador */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  </style>
  