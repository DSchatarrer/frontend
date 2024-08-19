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
      <li class="nav__items" v-for="conversation in sessionStore.conversations" :key="conversation.sessionKey">
        <a href="#" @click.prevent="switchSession(conversation.sessionKey)">
          <img src="@/assets/icons/attachment.svg" alt="Attachment Icon" />
          <span>Session {{ conversation.sessionKey }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/useSessionStore';

const sessionStore = useSessionStore();

const createNewSession = () => {
  sessionStore.createSessionKey();
  console.log('Nueva sesión creada con sessionKey:', sessionStore.currentSessionKey);
};

const switchSession = (sessionKey: string) => {
  sessionStore.switchSession(sessionKey);
  console.log('Cambió a la sesión con sessionKey:', sessionKey);
};
</script>


<style scoped>
.nav__cont {
  position: relative; /* Cambiado de 'fixed' a 'relative' para que no se superponga */
  display: flex;
  flex-direction: column;
  width: 50px; /* Ancho inicial reducido */
  height: 100vh;
  z-index: 100;
  background-color: #1a1a1a;
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
}

.nav__items a {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: white;
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
</style>
