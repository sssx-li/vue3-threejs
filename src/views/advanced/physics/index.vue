<template>
  <div class="physics-container flex flex-wrap">
    <AmmoPhysics />
    <RapierPhysics />
    <Cannon />
  </div>
</template>

<script setup lang="ts">
import AmmoPhysics from './components/1-ammoPhysics.vue';
import RapierPhysics from './components/2-rapierPhysics.vue';
import Cannon from './components/3-cannon.vue';

defineOptions({
  name: 'physics',
});
</script>

<style lang="scss" scoped></style>
