<template>
  <div class="geometry-container flex flex-wrap">
    <PlaneGeometry />
    <PolyhedronGeometry />
    <RingGeometry />
    <ShapeGeometry />
    <SphereGeometry />
    <TetrahedronGeometry />
    <TorusGeometry />
    <TorusKnotGeometry />
    <TubeGeometry />
    <WireframeGeometry />
  </div>
</template>

<script setup lang="ts">
import PlaneGeometry from './components/11-planeGeometry.vue';
import PolyhedronGeometry from './components/12-polyhedronGeometry.vue';
import RingGeometry from './components/13-ringGeometry.vue';
import ShapeGeometry from './components/14-shapeGeometry.vue';
import SphereGeometry from './components/15-SphereGeometry.vue';
import TetrahedronGeometry from './components/16-tetrahedronGeometry.vue';
import TorusGeometry from './components/17-torusGeometry.vue';
import TorusKnotGeometry from './components/18-torusKnotGeometry.vue';
import TubeGeometry from './components/19-tubeGeometry.vue';
import WireframeGeometry from './components/20-wireframeGeometry.vue';

defineOptions({
  name: 'demo',
});
</script>

<style lang="scss" scoped></style>
