<template>
  <div class="curve-container flex flex-wrap">
    <Arc />
    <CatmullRomCurve3 />
    <CubicBezierCurve />
    <CubicBezierCurve3 />
    <EllipseCurve />
    <LineCurve />
    <LineCurve3 />
    <QuadraticBezierCurve />
    <QuadraticBezierCurve3 />
    <SplineCurve />
  </div>
</template>

<script setup lang="ts">
import Arc from './components/1-arc.vue';
import CatmullRomCurve3 from './components/2-catmullRomCurve3.vue';
import CubicBezierCurve from './components/3-cubicBezierCurve.vue';
import CubicBezierCurve3 from './components/4-cubicBezierCurve3.vue';
import EllipseCurve from './components/5-ellipseCurve.vue';
import LineCurve from './components/6-lineCurve.vue';
import LineCurve3 from './components/7-lineCurve3.vue';
import QuadraticBezierCurve from './components/8-quadraticBezierCurve.vue';
import QuadraticBezierCurve3 from './components/9-quadraticBezierCurve3.vue';
import SplineCurve from './components/10-splineCurve.vue';
defineOptions({
  name: 'curve',
});
</script>

<style lang="scss" scoped></style>
