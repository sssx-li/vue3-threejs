<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 2.三维样条曲线-CatmullRomCurve3 </template>
    <div id="base-catmullRomCurve3"></div>
  </el-card>
</template>

<script setup lang="ts">
import { createCurve, useThree } from '@/hooks';

defineOptions({
  name: 'base-catmullRomCurve3',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState } = useThree('base-catmullRomCurve3', {
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
  const { curveInstance } = createCurve('CatmullRomCurve3', {
    options: {
      points: [
        [0, 0, 0],
        [100, 0, 0],
        [0, 100, 0],
        [0, 0, 100],
      ],
      closed: true,
    },
    lineconfig: {
      pointsCount: 50,
      options: {
        color: '#f60',
      },
    },
  });
  threeState.scene?.add(curveInstance!);
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
