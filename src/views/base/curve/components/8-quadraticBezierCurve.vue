<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 8.二维二次贝塞尔曲线-QuadraticBezierCurve </template>
    <div id="base-quadraticBezierCurve"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createCurve, useThree } from '@/hooks';

defineOptions({
  name: 'base-quadraticBezierCurve',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState } = useThree('base-quadraticBezierCurve', {
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
  const { curveInstance } = createCurve('QuadraticBezierCurve', {
    options: {
      v0: [-50, 0],
      v1: [25, 75],
      v2: [50, 0],
    },
    lineconfig: {
      pointsCount: 50,
    },
  });
  threeState.scene?.add(curveInstance!);
  const { curveInstance: dashCurveInstance } = createCurve(
    'QuadraticBezierCurve',
    {
      options: {
        v0: [-50, 0],
        v1: [-25, -75],
        v2: [50, 0],
      },
      lineconfig: {
        type: 'LineDashedMaterial',
        pointsCount: 50,
        options: {
          color: '#f60',
        },
      },
    }
  );
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
