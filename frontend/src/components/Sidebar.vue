<!-- frontend\src\components\Sidebar.vue -->

<template>
    <aside
      class="sidebar"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      :class="{ expanded: hover }"
    >
      <div class="menu-icon">
        <Menu />
      </div>
  
      <div class="sidebar-content">
        <ul>
          <li>
            <a href="#">
              <span class="icon"><Home /></span>
              <span class="label" :class="{ show: hover }">Inicio</span>
            </a>
          </li>
          <li>
          <a href="#">
            <span class="icon"><Users /></span>
            <span class="label" :class="{ show: hover }">Pacientes</span>
          </a>
        </li>
        </ul>
  
        <div class="settings">
          <a href="#">
            <span class="icon"><Settings /></span>
            <span class="label" :class="{ show: hover }">Configuración</span>
          </a>
        </div>
      </div>
    </aside>
  </template>
  
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { Menu, Home, Box, Users, Settings } from 'lucide-vue-next'
  
  const hover = ref(false)
  </script>
  
  <style scoped>
.sidebar {
  position: relative;
  width: 60px;
  transition: width 0.3s ease;
  background-color: #2e7d32; 
  padding: 1rem 0.5rem;
  border-right: 2px solid #66bb6a;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  /* efecto flotante */
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.sidebar.expanded {
  width: 250px;
  border-radius: 0; /* 👈 sin bordes redondeados */
}

.menu-icon {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1;
  color: #a5d6a7;
}

.sidebar-content {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 1rem;
}

a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

a:hover {
  background-color: #2e7d32; /* verde más vivo al hacer hover */
}

.icon {
  width: 24px;
  min-width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a5d6a7;
}

.label {
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  width: 0;
  transition: opacity 0.2s ease, width 0.3s ease;
  margin-left: 1rem;
  color: #c8e6c9;
  font-weight: 600;
}

.label.show {
  opacity: 1;
  width: auto;
}

.settings a {
  color: #a5d6a7;
}

  </style>
  
  