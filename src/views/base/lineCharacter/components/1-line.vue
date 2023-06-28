<template>
  <el-card>
    <template #header> 1.线条 </template>
    <div id="base-line"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-line',
  inheritAttrs: false,
});

const width = 300;
const height = 300;
const { threeState, drawLine } = useThree('base-line', {
  config: {
    width,
    height,
    cameraType: 'OrthographicCamera',
    renderOptions: {
      alpha: true, // 是否透明
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
  initFn: initRender,
});
// 实线
function initLine() {
  const lineX = drawLine({
    points: [-30, 0, 0, 30, 0, 0],
  });
  lineX.position.set(-100, 150, 0);
  threeState.scene?.add(lineX);
  const arrow = drawLine({
    points: [-10, 0, 0, 0, 10, 0, 10, 0, 0],
  });
  arrow.position.set(-100, 120, 0);
  threeState.scene?.add(arrow);
  const react = drawLine({
    points: [-30, 0, 0, 30, 0, 0, 30, 30, 0, -30, 30, 0, -30, 0, 0],
  });
  react.position.set(-100, 70, 0);
  threeState.scene?.add(react);
}
// 虚线
function initDashedLine() {
  const lineX = drawLine({
    points: [-30, 0, 0, 30, 0, 0],
    lineOptions: {
      dashed: true,
    },
  });
  lineX.position.set(100, 150, 0);
  threeState.scene?.add(lineX);
  const arrow = drawLine({
    points: [-10, 0, 0, 0, 10, 0, 10, 0, 0],
    lineOptions: {
      dashed: true,
    },
  });
  arrow.position.set(100, 120, 0);
  threeState.scene?.add(arrow);
  const react = drawLine({
    points: [-30, 0, 0, 30, 0, 0, 30, 30, 0, -30, 30, 0, -30, 0, 0],
    lineOptions: {
      dashed: true,
    },
  });
  react.position.set(100, 70, 0);
  threeState.scene?.add(react);
}

function initRender() {
  threeState.camera?.position.set(0, 0, 100);
  threeState.camera?.lookAt(threeState.scene!.position);
  initLine();
  initDashedLine();
  const react = drawLine({
    points: new Float32Array([
      -30, -30, 0, 30, -30, 0, 30, 10, 30, -30, 10, 0, -30, -30, 0,
    ]),
    lineOptions: {
      linewidth: 2,
      color: 0xff0000,
    },
  });
  threeState.scene?.add(react);
  // 渲染
  threeState.renderer?.render(threeState.scene!, threeState.camera!);
}
</script>

<style lang="scss" scoped></style>
