<template>
  <div class="p-5">
    <Project/>
  </div>

</template>

<script lang="ts" setup>
import Project from './components/Project.vue'

</script>

<script lang="ts">
export default {
  name: 'home', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

