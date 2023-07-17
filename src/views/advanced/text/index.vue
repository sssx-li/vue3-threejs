<template>
  <div class="text-container flex flex-wrap">
    <Css2DRenderer />
    <Css3DRenderer />
    <Font />
  </div>
</template>

<script setup lang="ts">
import Css2DRenderer from './components/1-css2DRenderer.vue';
import Css3DRenderer from './components/2-css3DRenderer.vue';
import Font from './components/3-Font.vue';
defineOptions({
  name: 'base-text',
});
</script>

<style lang="scss" scoped></style>
