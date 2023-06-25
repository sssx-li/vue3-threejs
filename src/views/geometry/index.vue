<template>
  <div class="geometry-container flex flex-wrap">
    <baseCube />
  </div>
</template>

<script setup lang="ts">
import baseCube from './components/baseCube.vue';
defineOptions({
  name: 'geometry',
});
</script>

<style lang="scss" scoped></style>
