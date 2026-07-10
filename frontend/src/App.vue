<!-- src/App.vue -->
<template>
  <div id="app">
    <!-- This tag dynamically loads Login, Register, or Dashboard based on the URL -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
