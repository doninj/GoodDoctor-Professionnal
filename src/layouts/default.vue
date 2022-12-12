<script setup>
import Navbar from '~/layouts/navbar.vue'
</script>

<template>
  <Navbar />
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <RouterView />
  </main>
</template>
