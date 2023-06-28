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
const { threeState, drawLine, controlInstance } = useThree('base-line', {
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
  renderFn: initRender,
});
// 实线
// 3个点为一组坐标(x,y,z)
function initLine() {
  const line = drawLine({
    points: [-30, 0, 0, 30, 0, 0],
  });
  line.position.set(-60, 100, 0);
  threeState.scene?.add(line);
  const arrow = drawLine({
    points: [-10, 0, 0, 0, 10, 0, 10, 0, 0],
  });
  arrow.position.set(-60, 70, 0);
  threeState.scene?.add(arrow);
  const react = drawLine({
    points: [-30, 0, 0, 30, 0, 0, 30, 30, 0, -30, 30, 0, -30, 0, 0],
  });
  react.position.set(-60, 20, 0);
  threeState.scene?.add(react);
}
// 虚线
function initDashedLine() {
  const line = drawLine({
    points: [-30, 0, 0, 30, 0, 0],
    lineOptions: {
      dashed: true,
    },
  });
  line.position.set(60, 100, 0);
  threeState.scene?.add(line);
  const arrow = drawLine({
    points: [-10, 0, 0, 0, 10, 0, 10, 0, 0],
    lineOptions: {
      dashed: true,
    },
  });
  arrow.position.set(60, 70, 0);
  threeState.scene?.add(arrow);
  const react = drawLine({
    points: [-30, 0, 0, 30, 0, 0, 30, 30, 0, -30, 30, 0, -30, 0, 0],
    lineOptions: {
      dashed: true,
    },
  });
  react.position.set(60, 20, 0);
  threeState.scene?.add(react);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

function initRender() {
  threeState.camera?.position.set(0, 0, 200);
  threeState.camera?.lookAt(threeState.scene!.position);
  initLine();
  initDashedLine();
  const react = drawLine({
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
  // 1. 通过监听controlInstance的change事件来重新实现视觉控制
  // controlInstance.value?.addEventListener('change', (event) => {
  //   console.log(event);
  //   threeState.renderer?.render(threeState.scene!, threeState.camera!);
  // });

  // 2. 通过requestAnimationFrame来实现视觉控制
  render();
}
</script>

<style lang="scss" scoped></style>
