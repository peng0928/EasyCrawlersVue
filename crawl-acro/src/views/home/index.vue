<template>
  <div class="p-5">
    <System/>
  </div>

</template>

<script lang="ts" setup>
import System from './components/System.vue'

</script>

<script lang="ts">
export default {
  name: 'home', // If you want the include property of keep-alive to take effect, you must name the component
};
</script>

