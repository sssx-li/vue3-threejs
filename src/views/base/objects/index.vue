<template>
  <div class="objects-container flex flex-wrap">
    <Sprite />
    <Group />
    <InstancedMesh />
  </div>
</template>

<script setup lang="ts">
import Sprite from './components/1-sprite.vue';
import Group from './components/2-group.vue';
import InstancedMesh from './components/3-instancedMesh.vue';
defineOptions({
  name: 'objects',
});
</script>

<style lang="scss" scoped></style>
