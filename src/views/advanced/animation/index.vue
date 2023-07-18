<template>
  <div class="animation-container flex flex-wrap">
    <ATranslation />
    <ARotate />
    <AColor />
    <ACombin />
    <Animejs />
    <AnimejsEaseOutCubic />
  </div>
</template>

<script setup lang="ts">
import ATranslation from './components/1-translation.vue';
import ARotate from './components/2-rotate.vue';
import AColor from './components/3-color.vue';
import ACombin from './components/4-combine.vue';
import Animejs from './components/5-animejs.vue';
import AnimejsEaseOutCubic from './components/6-animejsEaseOutCubic.vue';
defineOptions({
  name: 'animation',
});
</script>

<style lang="scss" scoped></style>
