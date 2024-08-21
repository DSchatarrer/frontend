<!-- src\components\App_Sidebar.vue -->

<template>
  <nav class="nav__cont">
    <ul class="nav">
      <li class="nav__items">
        <a href="#">
          <img src="@/assets/icons/dots.svg" alt="Dots Icon" />
          <span></span>
        </a>
      </li>
      <li class="nav__items">
        <a href="#">
          <img src="@/assets/icons/home.svg" alt="Home Icon" />
          <span>Home</span>
        </a>
      </li>
      <li class="nav__items">
        <a href="#">
          <img src="@/assets/icons/search.svg" alt="Search Icon" />
          <span>Search</span>
        </a>
      </li>
      <li class="nav__items">
        <a href="#" @click.prevent="createNewSession">
          <img src="@/assets/icons/plus.svg" alt="Plus Icon" />
          <span>New</span>
        </a>
      </li>
      <li class="nav__items">
        <a href="#">
          <img src="@/assets/icons/attachment.svg" alt="Attachment Icon" />
          <span>Attachments</span>
        </a>
      </li>
      <li class="nav__items">
        <a href="#" @click.prevent="toggleSessionDropdown">
          <img src="@/assets/icons/session.svg" alt="Sessions Icon" />
          <span>Sesiones</span>
        </a>
        <ul v-if="showSessionsDropdown" class="session-dropdown">
          <li class="session-item" v-for="sessionKey in sessionKeys" :key="sessionKey" :title="sessionKey">
            <a href="#" @click.prevent="switchSession(sessionKey)">
              {{ sessionKey.substring(0, 12) }}...
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSessionStore } from '@/stores/useSessionStore';

const sessionStore = useSessionStore();
const sessionKeys = ref<string[]>([]);
const showSessionsDropdown = ref(false);

const createNewSession = () => {
  sessionStore.createSession();
  sessionKeys.value = sessionStore.getSessionKeys();
};

const switchSession = (sessionKey: string) => {
  sessionStore.switchSession(sessionKey);
};

const toggleSessionDropdown = () => {
  showSessionsDropdown.value = !showSessionsDropdown.value;
};

onMounted(() => {
  sessionStore.loadSessionKey();
  sessionKeys.value = sessionStore.getSessionKeys();
});
</script>

<style scoped>
.nav__cont {
  position: relative; /* Cambiado de 'fixed' a 'relative' para que no se superponga */
  display: flex;
  flex-direction: column;
  width: 50px; /* Ancho inicial reducido */
  height: 100vh;
  z-index: 100;
  background-color: white;
  overflow: hidden;
  transition: width 0.3s ease;
  box-shadow: 4px 7px 10px rgba(0, 0, 0, 0.4);
  padding-right: 6px;
}

.nav__cont:hover {
  width: 225px; /* Expande al hacer hover */
}

.nav {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav__items {
  padding-bottom: 2rem;
  position: relative;
}

.nav__items a {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #016a7f;
  font-weight: 400;
  font-size: 1.15em;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav__items a span {
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
}

.nav__items a:hover span {
  color: #54a4ff;
  transform: scale(1.05);
  transition: color 0.3s ease, transform 0.3s ease;
}

.nav__cont:hover .nav__items a span {
  opacity: 1;
}

.nav__items img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.nav__items a:hover img {
  transform: scale(1.2);
}

.session-dropdown {
  list-style-type: none;
  padding: 5px; /* Añadido padding */
  margin: 0;
  background-color: #2a2a2a;
  border-radius: 5px;
  position: absolute;
  left: 60px; /* Ajusta la posición del dropdown */
  top: 40px; /* Coloca el dropdown justo debajo de "Sesiones" */
  z-index: 200;
  width: 65%; /* Ancho del dropdown */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Añadir sombra */
}

.session-item {
  padding: 8px 12px; /* Ajustado para hacer las opciones más pequeñas */
}

.session-item a {
  color: white;
  text-decoration: none;
  font-size: 0.9em; /* Tamaño de fuente reducido */
}

.session-item a:hover {
  color: #54a4ff;
}
</style>
