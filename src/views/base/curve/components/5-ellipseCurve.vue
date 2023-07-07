<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 5.椭圆曲线-EllipseCurve </template>
    <div id="base-ellipseCurve"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createCurve, useThree } from '@/hooks';

defineOptions({
  name: 'base-ellipseCurve',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState } = useThree('base-ellipseCurve', {
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
});

function addCurve() {
  const { curveInstance } = createCurve('EllipseCurve', {
    options: {
      aX: 0,
      aY: 0,
      xRadius: 60,
      yRadius: 25,
    },
    lineconfig: {
      pointsCount: 50,
    },
  });
  threeState.scene?.add(curveInstance!);
  const { curveInstance: dashCurveInstance } = createCurve('EllipseCurve', {
    options: {
      aX: 0,
      aY: 0,
      xRadius: 25,
      yRadius: 60,
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

onMounted(() => {
  addCurve();
  render();
});
</script>

<style lang="scss" scoped></style>
