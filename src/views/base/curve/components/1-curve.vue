<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.曲线-ArcCurve </template>
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
  renderFn: initRender,
});
const { curveInstance } = createCurve<'ArcCurve', 'LineDashedMaterial'>(
  'ArcCurve',
  {
    options: {
      aX: 0,
      aY: 0,
      aRadius: 50,
      aStartAngle: 0,
      aEndAngle: 2 * Math.PI,
      aClockwise: false,
    },
    lineconfig: {
      dashed: true,
      pointsCount: 50,
      options: {
        dashSize: 3,
        gapSize: 10,
      },
    },
  }
);

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

function initRender() {
  threeState.camera?.position.set(100, 100, 200);
  threeState.camera?.lookAt(threeState.scene!.position);
  threeState.scene?.add(curveInstance!);
  render();
}
</script>

<style lang="scss" scoped></style>
