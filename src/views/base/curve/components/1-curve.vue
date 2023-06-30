<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.弧形曲线-ArcCurve </template>
    <div id="base-curve"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createCurve, useThree } from '@/hooks';

defineOptions({
  name: 'base-curve',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState } = useThree('base-curve', {
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

function initCCurve() {
  // 实线
  const { curveInstance } = createCurve('ArcCurve', {
    lineType: 'LineBasicMaterial',
    options: {
      aX: 0,
      aY: 0,
      aRadius: 40,
    },
    lineconfig: {
      pointsCount: 50,
    },
  });
  threeState.scene?.add(curveInstance!);

  // 虚线
  const { curveInstance: dashCurve } = createCurve<
    'ArcCurve',
    'LineDashedMaterial'
  >('ArcCurve', {
    lineType: 'LineDashedMaterial',
    options: {
      aX: 0,
      aY: 0,
      aRadius: 80,
    },
    lineconfig: {
      dashed: true,
      pointsCount: 50,
      options: {
        dashSize: 3,
        gapSize: 10,
      },
    },
  });
  threeState.scene?.add(dashCurve!);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

function initRender() {
  initCCurve();
  render();
}
</script>

<style lang="scss" scoped></style>
