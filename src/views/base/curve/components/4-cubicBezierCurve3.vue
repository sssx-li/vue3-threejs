<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 4.三维三次贝塞尔曲线-CubicBezierCurve3 </template>
    <div id="base-cubicBezierCurve3"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createCurve, useThree } from '@/hooks';

defineOptions({
  name: 'base-cubicBezierCurve3',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState } = useThree('base-cubicBezierCurve3', {
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
  const { curveInstance } = createCurve('CubicBezierCurve3', {
    options: {
      v0: [50, 0, 0],
      v1: [25, -75, 25],
      v2: [-25, 75, 50],
      v3: [-50, 0, 75],
    },
    lineconfig: {
      type: 'LineDashedMaterial',
      pointsCount: 50,
      options: {
        color: '#f60',
        gapSize: 10,
      },
    },
    position: {
      x: 50,
      y: 50,
      z: 50,
    },
  });
  threeState.scene?.add(curveInstance!);
  const { curveInstance: dashCurveInstance } = createCurve(
    'CubicBezierCurve3',
    {
      options: {
        v0: [50, 0, 0],
        v1: [25, 75, 25],
        v2: [-25, -75, 50],
        v3: [-50, 0, 75],
      },
      lineconfig: {
        pointsCount: 50,
      },
      position: {
        x: 50,
        y: 50,
        z: 50,
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
