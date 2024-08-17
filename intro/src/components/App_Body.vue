<template>
  <div class="body">
    <Chatbot />
    <Visualizer />
  </div>
</template>

<style scoped>
.body {
  display: flex; /* Utiliza flexbox para alinear los dos componentes lado a lado */
  flex-grow: 1; /* Ocupa todo el espacio restante */
  width: calc(100% - 2px); /* Ajusta el ancho considerando el sidebar colapsado */
  height: calc(100% - 100px); /* Ajusta la altura considerando el header */
  box-sizing: border-box;
  overflow: auto; /* Asegura que se pueda hacer scroll si el contenido es demasiado grande */
  margin: 0px; /* Empuja el contenido hacia la derecha para que no quede debajo del sidebar */
  padding: 1px;
}
</style>

<script setup>
import Chatbot from '@/components/Chatbot.vue'
import Visualizer from '@/components/Visualizer.vue'
</script>
