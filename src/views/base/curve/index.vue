<template>
  <div class="curve-container flex flex-wrap">
    <Arc />
    <CatmullRomCurve3 />
  </div>
</template>

<script setup lang="ts">
import Arc from './components/1-arc.vue';
import CatmullRomCurve3 from './components/2-catmullRomCurve3.vue';
defineOptions({
  name: 'curve',
});
</script>

<style lang="scss" scoped></style>
