<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.AmmoPhysics </template>
    <div id="advance-ammoPhysiscs"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import AmmoPhysics from 'three/examples/jsm/physics/AmmoPhysics';

defineOptions({
  name: 'advance-ammoPhysiscs',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('advance-ammoPhysiscs', {
  config: {
    width,
    height,
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 200,
    },
    renderOptions: {
      antialias: true,
    },
  },
  cameraOptions: {
    left: -width / 2,
    right: width / 2,
    top: height / 2,
    bottom: -height / 2,
    near: 1,
    far: 1000,
  },
  cameraPosition: { x: 350, y: 350, z: 350 },
});

function addGeometry() {}
function addLight() {
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(100, 300, 0);
  threeState.scene?.add(point);
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambient);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

onMounted(() => {
  addGeometry();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>
