<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 7.三维线段曲线-LineCurve3 </template>
    <div id="base-lineCurve3"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createCurve, useThree } from '@/hooks';

defineOptions({
  name: 'base-lineCurve3',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState } = useThree('base-lineCurve3', {
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
  const { curveInstance } = createCurve('LineCurve3', {
    options: {
      v1: [0, 0, 0],
      v2: [100, 100, 80],
    },
    lineconfig: {
      pointsCount: 50,
    },
  });
  threeState.scene?.add(curveInstance!);
  const { curveInstance: dashCurveInstance } = createCurve('LineCurve3', {
    options: {
      v1: [0, 0, 0],
      v2: [0, 100, 80],
    },
    lineconfig: {
      type: 'LineDashedMaterial',
      pointsCount: 50,
      options: {
        color: '#f60',
        gapSize: 10,
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
