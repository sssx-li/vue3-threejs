<template>
  <div class="line-container flex flex-wrap">
    <Line />
    <OrbitControls />
    <AxesHelper />
  </div>
</template>

<script setup lang="ts">
import Line from './components/1-line.vue';
import OrbitControls from './components/2-orbitControls.vue';
import AxesHelper from './components/3-axesHelper.vue';
defineOptions({
  name: 'base-line',
});
</script>

<style lang="scss" scoped></style>
