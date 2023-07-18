<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 4.点-Point </template>
    <div id="base-point"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-point',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-point', {
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

const texture = new THREE.TextureLoader().load('/src/assets/imgs/snow.png');
function addPoint() {
  const geometry = new THREE.BoxGeometry(100, 100, 100, 60, 60, 60);
  const material = new THREE.PointsMaterial({
    map: texture,
  });
  const point = new THREE.Points(geometry, material);
  threeState.scene?.add(point);
}

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
  addPoint();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>
