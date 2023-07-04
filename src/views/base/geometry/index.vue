<template>
  <div class="geometry-container flex flex-wrap">
    <BoxGeometry />
    <CircleGeometry />
    <ConeGeometry />
    <CylinderGeometry />
    <DodecahedronGeometry />
    <EdgesGeometry />
    <ExtrudeGeometry />
    <IcosahedronGeometry />
    <LatheGeometry />
    <OctahedronGeometry />
  </div>
</template>

<script setup lang="ts">
import BoxGeometry from './components/1-boxGeometry.vue';
import CircleGeometry from './components/2-circleGeometry.vue';
import ConeGeometry from './components/3-coneGeometry.vue';
import CylinderGeometry from './components/4-cylinderGeometry.vue';
import DodecahedronGeometry from './components/5-dodecahedronGeometry.vue';
import EdgesGeometry from './components/6-edgesGeometry.vue';
import ExtrudeGeometry from './components/7-extrudeGeometry.vue';
import IcosahedronGeometry from './components/8-icosahedronGeometry.vue';
import LatheGeometry from './components/9-latheGeometry.vue';
import OctahedronGeometry from './components/10-octahedronGeometry.vue';

defineOptions({
  name: 'geometry',
});
</script>

<style lang="scss" scoped></style>
