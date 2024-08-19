<template>
    <div v-if="isWelcomeVisible" class="wrapper">
      <div class="welcome">
        <img src="@/assets/logo2.png" alt="Logo" class="logo2inicio">
        <p>Repsol PAKIA</p>
        <div class="separatorinicio"></div>
        <div class="descripcion">Bienvenidos a la herramienta de IA generativa de Repsol para la gestión de control de costes de refino</div>
        <div class="container">
          <div class="p1">Algunas ideas para empezar</div>
          <div class="card">
            <div class="cardtitulo">
              <img src="@/assets/responsable.png" alt="Responsable" class="cardicon">  
              <span class="card-text">Responsables</span>
            </div>
            <div class="cardpregunta">¿Quién es el responsable del CECO xxxx?</div>
          </div>
          <div class="card">
            <div class="cardtitulo">
              <img src="@/assets/metrica.png" alt="Métrica" class="cardicon">  
              <span class="card-text">Métricas</span>
            </div>
            <div class="cardpregunta">Muéstrame el histórico de presupuestos para el ceco xxxx.</div>
          </div>
          <div>
            <div class="card">
              <div class="cardtitulo">
                <img src="@/assets/oferta.png" alt="Contratos" class="cardicon">  
                <span class="card-text">Contratos</span>
              </div>
              <div class="cardpregunta">¿En qué contrato se ha producido una desviación?</div>
            </div>
            <img src="@/assets/libreria.png" alt="Librería" class="libreria">  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Estado local para mostrar/ocultar el mensaje de bienvenida
  const isWelcomeVisible = ref(true);
  
  export function hideWelcomeMessage() {
    isWelcomeVisible.value = false;
  }
  </script>
  
  <style scoped>
  /* Aquí puedes agregar estilos específicos para el componente Welcome */
  </style>
  