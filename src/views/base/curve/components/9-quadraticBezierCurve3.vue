<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 9.三维二次贝塞尔曲线-QuadraticBezierCurve3 </template>
    <div id="base-quadraticBezierCurve3"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createCurve, useThree } from '@/hooks';

defineOptions({
  name: 'base-quadraticBezierCurve3',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState } = useThree('base-quadraticBezierCurve3', {
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
  const { curveInstance } = createCurve('QuadraticBezierCurve3', {
    options: {
      v0: [100, 0, 0],
      v1: [0, 150, 0],
      v2: [0, 0, 100],
    },
    lineconfig: {
      pointsCount: 50,
    },
  });
  threeState.scene?.add(curveInstance!);
  const { curveInstance: dashCurveInstance } = createCurve(
    'QuadraticBezierCurve3',
    {
      options: {
        v0: [0, 0, 0],
        v1: [10, 150, 10],
        v2: [80, 0, 80],
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

onMounted(() => {
  addCurve();
  render();
});
</script>

<style lang="scss" scoped></style>
