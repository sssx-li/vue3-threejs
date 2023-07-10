<template>
  <div class="loader-container flex flex-wrap">
    <Glb />
    <Obj />
    <Fbx />
    <LoadingManager />
  </div>
</template>

<script setup lang="ts">
import Glb from './components/1-glb.vue';
import Obj from './components/2-obj.vue';
import Fbx from './components/3-fbx.vue';
import LoadingManager from './components/4-loadingManager.vue';
defineOptions({
  name: 'loader',
});
</script>

<style lang="scss" scoped></style>
