<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 3.三维坐标轴辅助线(x,y,z) </template>
    <div id="base-axeshelper"></div>
  </el-card>
</template>

<script setup lang="ts">
import { cereateLine, useThree } from '@/hooks';

defineOptions({
  name: 'base-axeshelper',
  inheritAttrs: false,
});

const width = 400;
const height = 400;

const { threeState } = useThree('base-axeshelper', {
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
// 实线
function addLine() {
  const { lineInstance } = cereateLine({
    useLine2: true,
    line2Options: {
      width,
      height,
      points: [-30, 0, 0, 30, 0, 0],
    },
    position: { x: -60, y: 100 },
  });
  threeState.scene?.add(lineInstance);
  const { lineInstance: arrowLine } = cereateLine({
    useLine2: true,
    line2Options: {
      width,
      height,
      points: [-10, 0, 0, 0, 10, 0, 10, 0, 0],
    },
    position: { x: -60, y: 70 },
  });
  threeState.scene?.add(arrowLine);
  const { lineInstance: reactLine } = cereateLine({
    useLine2: true,
    line2Options: {
      width,
      height,
      points: [-30, 0, 0, 30, 0, 0, 30, 30, 0, -30, 30, 0, -30, 0, 0],
    },
    position: { x: -60, y: 20 },
  });
  threeState.scene?.add(reactLine);
}
// 虚线
function addDashedLine() {
  const { lineInstance } = cereateLine({
    type: 'LineDashedMaterial',
    points: [
      [-30, 0, 0],
      [30, 0, 0],
    ],
    position: { x: 60, y: 100 },
  });
  threeState.scene?.add(lineInstance);
  const { lineInstance: arrowLine } = cereateLine({
    type: 'LineDashedMaterial',
    points: [
      [-10, 0, 0],
      [0, 10, 0],
      [10, 0, 0],
    ],
    position: { x: 60, y: 70 },
  });
  threeState.scene?.add(arrowLine);
  const { lineInstance: reactLine } = cereateLine({
    type: 'LineDashedMaterial',
    points: [
      [-30, 0, 0],
      [30, 0, 0],
      [30, 30, 0],
      [-30, 30, 0],
      [-30, 0, 0],
    ],
    position: { x: 60, y: 20 },
  });
  threeState.scene?.add(reactLine);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

onMounted(() => {
  addLine();
  addDashedLine();
  const { lineInstance } = cereateLine({
    type: 'LineDashedMaterial',
    useLine2: true,
    line2Options: {
      points: new Float32Array([
        -30, -30, 0, 30, -30, 0, 30, 10, 0, -30, 10, 0, -30, -30, 0,
      ]),
      options: {
        linewidth: 4,
        color: 0xff0000,
        dashSize: 5,
        gapSize: 4,
      },
    },
    position: { y: -40 },
  });
  threeState.scene?.add(lineInstance);
  render();
});
</script>

<style lang="scss" scoped></style>
