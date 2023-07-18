<template>
  <div class="objects-container flex flex-wrap">
    <Sprite />
    <Group />
    <InstancedMesh />
    <Point />
  </div>
</template>

<script setup lang="ts">
import Sprite from './components/1-sprite.vue';
import Group from './components/2-group.vue';
import InstancedMesh from './components/3-instancedMesh.vue';
import Point from './components/4-point.vue';
defineOptions({
  name: 'objects',
});
</script>

<style lang="scss" scoped></style>
