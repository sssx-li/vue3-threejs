<template>
  <div class="animation-container flex flex-wrap">
    <ATranslation />
    <ARotate />
    <AColor />
    <ACombin />
  </div>
</template>

<script setup lang="ts">
import ATranslation from './components/1-translation.vue';
import ARotate from './components/2-rotate.vue';
import AColor from './components/3-color.vue';
import ACombin from './components/4-combine.vue';
defineOptions({
  name: 'animation',
});
</script>

<style lang="scss" scoped></style>
