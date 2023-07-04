<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 10.二维样条曲线-SplineCurve </template>
    <div id="base-splineCurve"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createCurve, useThree } from '@/hooks';

defineOptions({
  name: 'base-splineCurve',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState } = useThree('base-splineCurve', {
  config: {
    width,
    height,
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 150,
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
  renderFn: initRender,
});

function initCatmullRom() {
  const { curveInstance } = createCurve('SplineCurve', {
    options: {
      points: [
        [-100, 0],
        [-50, 50],
        [0, 0],
        [50, -50],
        [100, 0],
      ],
    },
    lineconfig: {
      pointsCount: 50,
    },
  });
  threeState.scene?.add(curveInstance!);
  const { curveInstance: dashCurveInstance } = createCurve('SplineCurve', {
    options: {
      points: [
        [-100, 0],
        [-50, -50],
        [0, 0],
        [50, 50],
        [100, 0],
      ],
    },
    lineconfig: {
      type: 'LineDashedMaterial',
      pointsCount: 50,
      options: {
        gapSize: 10,
        color: '#f60',
      },
    },
  });
  threeState.scene?.add(dashCurveInstance!);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

function initRender() {
  initCatmullRom();
  render();
}
</script>

<style lang="scss" scoped></style>
