<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.直线 </template>
    <div id="base-line"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useLine, useThree } from '@/hooks';

defineOptions({
  name: 'base-line',
  inheritAttrs: false,
});

const width = 300;
const height = 300;
const { threeState } = useThree('base-line', {
  config: {
    width,
    height,
    cameraType: 'OrthographicCamera',
    enableControl: false, // 是否启用轨道(视觉)控制器，默认为true
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
const { pointToLine } = useLine({ width, height });
// 实线
// 3个点为一组坐标(x,y,z)
function initLine() {
  const line = pointToLine({
    points: [-30, 0, 0, 30, 0, 0],
  });
  line.position.set(-60, 100, 0);
  threeState.scene?.add(line);
  const arrow = pointToLine({
    points: [-10, 0, 0, 0, 10, 0, 10, 0, 0],
  });
  arrow.position.set(-60, 70, 0);
  threeState.scene?.add(arrow);
  const react = pointToLine({
    points: [-30, 0, 0, 30, 0, 0, 30, 30, 0, -30, 30, 0, -30, 0, 0],
  });
  react.position.set(-60, 20, 0);
  threeState.scene?.add(react);
}
// 虚线
function initDashedLine() {
  const line = pointToLine({
    points: [-30, 0, 0, 30, 0, 0],
    lineOptions: {
      dashed: true,
    },
  });
  line.position.set(60, 100, 0);
  threeState.scene?.add(line);
  const arrow = pointToLine({
    points: [-10, 0, 0, 0, 10, 0, 10, 0, 0],
    lineOptions: {
      dashed: true,
    },
  });
  arrow.position.set(60, 70, 0);
  threeState.scene?.add(arrow);
  const react = pointToLine({
    points: [-30, 0, 0, 30, 0, 0, 30, 30, 0, -30, 30, 0, -30, 0, 0],
    lineOptions: {
      dashed: true,
    },
  });
  react.position.set(60, 20, 0);
  threeState.scene?.add(react);
}

function initRender() {
  threeState.camera?.position.set(0, 0, 200);
  threeState.camera?.lookAt(threeState.scene!.position);
  initLine();
  initDashedLine();
  const react = pointToLine({
    points: new Float32Array([
      -30, -30, 0, 30, -30, 0, 30, 10, 0, -30, 10, 0, -30, -30, 0,
    ]),
    lineOptions: {
      linewidth: 2,
      color: 0xff0000,
    },
  });
  react.position.set(0, -40, 0);
  threeState.scene?.add(react);
  // 渲染
  threeState.renderer.render(threeState.scene!, threeState.camera!);
}
</script>

<style lang="scss" scoped></style>
