<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.线条 </template>
    <div id="base-line"></div>
  </el-card>
</template>

<script setup lang="ts">
import { cereateLine, useThree } from '@/hooks';

defineOptions({
  name: 'base-line',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState } = useThree('base-line', {
  config: {
    width,
    height,
    enableControl: false, // 是否启用轨道(视觉)控制器，默认为true
    renderOptions: {
      alpha: true, // 是否透明
      antialias: true, // 是否抗锯齿
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
  cameraPosition: { z: 200 },
});
// 实线
// 3个点为一组坐标(x,y,z)
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

onMounted(() => {
  addLine();
  addDashedLine();
  const { lineInstance } = cereateLine({
    useLine2: true,
    line2Options: {
      points: new Float32Array([
        -30, -30, 0, 30, -30, 0, 30, 10, 0, -30, 10, 0, -30, -30, 0,
      ]),
      options: {
        linewidth: 2,
        color: 0xff0000,
      },
    },
    position: { y: -40 },
  });
  threeState.scene?.add(lineInstance);
  // 渲染
  threeState.renderer.render(threeState.scene!, threeState.camera!);
});
</script>

<style lang="scss" scoped></style>
