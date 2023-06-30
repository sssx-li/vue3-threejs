<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 3.三维坐标轴辅助线(x,y,z) </template>
    <div id="base-axeshelper"></div>
  </el-card>
</template>

<script setup lang="ts">
import { cereateLine, useThree } from '@/hooks';

defineOptions({
  name: 'base-axeshelper',
  inheritAttrs: false,
});

const width = 400;
const height = 400;

const { threeState } = useThree('base-axeshelper', {
  config: {
    width,
    height,
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 150,
    },
    renderOptions: {
      antialias: true,
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
function initLine() {
  const { lineInstance } = cereateLine({
    useLine2: true,
    line2Options: {
      width,
      height,
      points: [-30, 0, 0, 30, 0, 0],
    },
  });
  lineInstance.position.set(-60, 100, 0);
  threeState.scene?.add(lineInstance);
  const { lineInstance: arrowLine } = cereateLine({
    useLine2: true,
    line2Options: {
      width,
      height,
      points: [-10, 0, 0, 0, 10, 0, 10, 0, 0],
    },
  });
  arrowLine.position.set(-60, 70, 0);
  threeState.scene?.add(arrowLine);
  const { lineInstance: reactLine } = cereateLine({
    useLine2: true,
    line2Options: {
      width,
      height,
      points: [-30, 0, 0, 30, 0, 0, 30, 30, 0, -30, 30, 0, -30, 0, 0],
    },
  });
  reactLine.position.set(-60, 20, 0);
  threeState.scene?.add(reactLine);
}
// 虚线
// 虚线
function initDashedLine() {
  const { lineInstance } = cereateLine({
    type: 'LineDashedMaterial',
    dashed: true,
    points: [
      [-30, 0, 0],
      [30, 0, 0],
    ],
  });
  lineInstance.position.set(60, 100, 0);
  threeState.scene?.add(lineInstance);
  const { lineInstance: arrowLine } = cereateLine({
    type: 'LineDashedMaterial',
    dashed: true,
    points: [
      [-10, 0, 0],
      [0, 10, 0],
      [10, 0, 0],
    ],
  });
  arrowLine.position.set(60, 70, 0);
  threeState.scene?.add(arrowLine);
  const { lineInstance: reactLine } = cereateLine({
    type: 'LineDashedMaterial',
    dashed: true,
    points: [
      [-30, 0, 0],
      [30, 0, 0],
      [30, 30, 0],
      [-30, 30, 0],
      [-30, 0, 0],
    ],
  });
  reactLine.position.set(60, 20, 0);
  threeState.scene?.add(reactLine);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

function initRender() {
  // 设置相机位置
  threeState.camera?.position.set(-100, 100, 200);
  threeState.camera?.lookAt(threeState.scene!.position);
  initLine();
  initDashedLine();
  const { lineInstance } = cereateLine({
    dashed: true,
    useLine2: true,
    line2Options: {
      points: new Float32Array([
        -30, -30, 0, 30, -30, 0, 30, 10, 0, -30, 10, 0, -30, -30, 0,
      ]),
      options: {
        linewidth: 4,
        color: 0xff0000,
        dashSize: 5,
        gapSize: 4,
      },
    },
  });
  lineInstance.position.set(0, -40, 0);
  threeState.scene?.add(lineInstance);
  render();
}
</script>

<style lang="scss" scoped></style>
