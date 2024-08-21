<template>
  <header class="header">
    <div class="zona_izquierda">
      <div class="separator"></div>
      <img src="@/assets/logo.png" alt="Logo" class="logo">
      <div class="separator2"></div>
      <div class="zona_izquierda"></div>
      <nav>
        <ul class="appname" ref="pakia" @click.prevent="preventRedirection">
          <li>
            <a id="pakiaButton" href="#home" ref="pakiaLink">LICITAIA</a>
          </li>
          <img src="@/assets/icons/safe.svg" alt="Logo" class="logosec">
        </ul>
      </nav>
    </div>
    <div class="zona_derecha">
      <nav>
        <ul>
          <img src="@/assets/icons/notifications.svg" alt="Notification Icon" class="iconosright">
          <img src="@/assets/icons/settings.svg" alt="Settings Icon" class="iconosright">
          <img src="@/assets/icons/user.svg" alt="User Icon" class="fotouser">
          <li><a href="#user_name" class="user_name">Username</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import tippy from 'tippy.js';
import type { Instance, Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import '@/styles/tippy.css';

// Refs
const pakiaLink = ref<HTMLElement | null>(null);
let tooltipInstance: Instance<Props> | null = null;

const tooltipContent = `
  <div>
    <p class="info"><strong>Information</strong></p>
    <p>This is a generative AI tool for managing cost control in various business processes, helping you make queries about costs, cost classes, deviations, and more. If you want more information, <a class="link" href="#">click here</a>.</p>
  </div>
  <div>
    <p class="privacy-policy"><strong>Data and Privacy</strong></p>
    <p>We operate in a <strong>secure and private</strong> environment. For more information about our privacy policies and to configure how your data is managed, <a class="link" href="#">click here</a>.</p>
  </div>
`;

const showTooltip = () => {
  if (pakiaLink.value) {
    tooltipInstance = tippy(pakiaLink.value, {
      content: tooltipContent,
      allowHTML: true,
      theme: 'custom',
      placement: 'bottom',
      arrow: false,
      maxWidth: 450,
    });
  }
};

const preventRedirection = (event: Event) => {
  event.preventDefault();
};

onMounted(() => {
  showTooltip();
});

onUnmounted(() => {
  if (tooltipInstance) {
    tooltipInstance.destroy();
  }
});
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  color: black;
  border-bottom: 2px solid #D5D5D5;
  height: 50px;
  box-sizing: border-box;
  padding-left: 0px;
  box-shadow: 4px 7px 10px rgba(0, 0, 0, 0.4);
}

.zona_izquierda {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  transform: translateX(var(--sidebar-width));
}

.separator {
  height: 50px;
  width: 2px;
  background-color: #D5D5D5;
  margin-right: 15px;
}

.separator2{
  height: 30px;
  width: 2px;
  background-color: #D5D5D5;
  margin-right: 25px;
  margin-left: 25px;
}


.appname {
  display: flex;
  align-items: center;
  font-size: 25px;
  /* font-weight: bold; */
  color: black;
}

.iconosright {
  height: 24px;
  margin-top: 5px;
  margin-right: 10px;
  cursor: pointer;
}

.fotouser {
  height: 30px;
  border-radius: 50%;
  border: 2px solid #016a7f;
  cursor: pointer;
}

.user_name {
  color: #016a7f;
  text-decoration: none;
  margin-left: -10px;
}

.zona_derecha {
  margin-left: auto;
  margin-right: 20px;
  display: flex;
  align-items: center;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

nav ul li {
  margin-right: 10px;
  white-space: nowrap;
  margin-top: 10px;
  padding-bottom: 10px;
}

nav ul li a {
  color: black;
  text-decoration: none;
  font-weight: normal;
  font-family: 'Times New Roman', Times, serif;
}

/* CSS para controlar la expansión del sidebar */
.nav__cont:hover ~ .header .zona_izquierda {
  --sidebar-width: 225px; /* Ajusta según la expansión */
}

.nav__cont ~ .header .zona_izquierda {
  --sidebar-width: 50px; /* Ancho del sidebar colapsado */
}

.logosec{
  height: 35px;
  width: 30px;
}

.logo{
  padding-left: 30px;
  padding-right: 10px;
  height: 35px;
  width: 100px;
}
</style>
