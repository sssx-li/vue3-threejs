<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 5.线段-LineLoop </template>
    <div id="base-lineLoop"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-lineLoop',
  inheritAttrs: false,
});

const width = 400;
const height = 400;

const { threeState, THREE } = useThree('base-lineLoop', {
  config: {
    width,
    height,
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 150,
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
  cameraPosition: { x: 100, y: 100, z: 200 },
});

function addLineLoop() {
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.LineBasicMaterial({
    color: 0xff0000,
  });
  const line = new THREE.LineLoop(geometry, material);
  threeState.scene?.add(line);
}
function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

onMounted(() => {
  addLineLoop();
  render();
});
</script>

<style lang="scss" scoped></style>
