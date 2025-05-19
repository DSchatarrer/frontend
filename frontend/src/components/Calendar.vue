<!-- frontend\src\components\Calendar.vue -->

<template>
    <FullCalendar
      :plugins="calendarPlugins"
      :initialView="'dayGridMonth'"
      :events="calendarEvents"
      height="auto"
    />
  </template>
  
  <script setup lang="ts">
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import timeGridPlugin from '@fullcalendar/timegrid'
  
  const calendarPlugins = [dayGridPlugin, timeGridPlugin]
  
  const calendarEvents = [
    { title: 'Daily Proyecto GUR', start: '2025-05-01T09:30:00' },
    { title: 'GBS Buzones', start: '2025-05-07T10:00:00' },
    { title: 'Reunión Teams', start: '2025-05-08T12:00:00' },
    { title: 'Daily Proyecto GUR', start: '2025-05-09T09:30:00' },
  ]
  </script>
  
  <style scoped>
  .fc {
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  