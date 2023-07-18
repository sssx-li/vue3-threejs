<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 6.线段-LineSegents </template>
    <div id="base-lineSegments"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-lineSegments',
  inheritAttrs: false,
});

const width = 400;
const height = 400;

const { threeState, THREE } = useThree('base-lineSegments', {
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
function addLine() {
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  // const edgeGeometry = new THREE.EdgesGeometry(geometry);
  const material = new THREE.LineBasicMaterial({
    color: 0xff0000,
  });
  const line = new THREE.LineSegments(geometry, material);
  threeState.scene?.add(line);
}

function LineSegments() {
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const edgeGeometry = new THREE.EdgesGeometry(geometry);
  const material = new THREE.LineBasicMaterial({
    color: 0xff0000,
  });
  const line = new THREE.LineLoop(edgeGeometry, material);
  line.position.z = 100;
  threeState.scene?.add(line);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

onMounted(() => {
  addLine();
  LineSegments();
  render();
});
</script>

<style lang="scss" scoped></style>
