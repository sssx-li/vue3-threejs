<template>
  <div class="geometry-container flex flex-wrap">
    <Cube />
    <Wireframe />
    <Controls />
    <Spheregeometry />
  </div>
</template>

<script setup lang="ts">
import Cube from './components/1-cube.vue';
import Wireframe from './components/2-wireframe.vue';
import Controls from './components/3-controls.vue';
import Spheregeometry from './components/4-spheregeometry.vue';
defineOptions({
  name: 'geometry',
});
</script>

<style lang="scss" scoped></style>
