<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.直线 </template>
    <div id="base-line"></div>
  </el-card>
</template>

<script setup lang="ts">
import { cereateLine, useThree } from '@/hooks';

defineOptions({
  name: 'base-line',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState } = useThree('base-line', {
  config: {
    width,
    height,
    enableControl: false, // 是否启用轨道(视觉)控制器，默认为true
    renderOptions: {
      alpha: true, // 是否透明
      antialias: true, // 是否抗锯齿
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
// 实线
// 3个点为一组坐标(x,y,z)
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
function initDashedLine() {
  const { lineInstance } = cereateLine<'LineDashedMaterial'>({
    dashed: true,
    points: [
      [-30, 0, 0],
      [30, 0, 0],
    ],
  });
  lineInstance.position.set(60, 100, 0);
  threeState.scene?.add(lineInstance);
  const { lineInstance: arrowLine } = cereateLine<'LineDashedMaterial'>({
    dashed: true,
    points: [
      [-10, 0, 0],
      [0, 10, 0],
      [10, 0, 0],
    ],
  });
  arrowLine.position.set(60, 70, 0);
  threeState.scene?.add(arrowLine);
  const { lineInstance: reactLine } = cereateLine<'LineDashedMaterial'>({
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

function initRender() {
  threeState.camera?.position.set(0, 0, 200);
  threeState.camera?.lookAt(threeState.scene!.position);
  initLine();
  initDashedLine();
  const { lineInstance } = cereateLine({
    useLine2: true,
    line2Options: {
      points: new Float32Array([
        -30, -30, 0, 30, -30, 0, 30, 10, 0, -30, 10, 0, -30, -30, 0,
      ]),
      options: {
        linewidth: 2,
        color: 0xff0000,
        gapSize: 10,
      },
    },
  });
  lineInstance.position.set(0, -40, 0);
  threeState.scene?.add(lineInstance);
  // 渲染
  threeState.renderer.render(threeState.scene!, threeState.camera!);
}
</script>

<style lang="scss" scoped></style>
