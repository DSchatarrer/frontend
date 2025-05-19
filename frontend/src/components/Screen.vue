<!-- frontend\src\components\Screen.vue -->

<template>
    <div class="screen">
      <Sidebar />
      <Content>
        <slot />
      </Content>
    </div>
  </template>
  
  <script setup lang="ts">
  import Sidebar from './Sidebar.vue'
  import Content from './Content.vue'
  </script>
  
  <style scoped>
  .screen {
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
  }
  </style>
  