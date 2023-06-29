<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 3.曲线 </template>
    <div id="base-axeshelper"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-axeshelper',
  inheritAttrs: false,
});

const width = 300;
const height = 300;
const { threeState } = useThree('base-axeshelper', {
  config: {
    width,
    height,
    cameraType: 'OrthographicCamera',
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

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

function initRender() {
  threeState.camera?.position.set(100, 100, 200);
  threeState.camera?.lookAt(threeState.scene!.position);
  // 渲染
  // 1. 通过监听controlInstance的change事件来重新实现视觉控制
  // 必须默认先渲染一次
  // threeState.renderer.render(threeState.scene!, threeState.camera!);
  // controlInstance.value?.addEventListener('change', (event) => {
  //   console.log(event);
  //   threeState.renderer?.render(threeState.scene!, threeState.camera!);
  // });

  // 2. 通过requestAnimationFrame来实现视觉控制
  render();
}
</script>

<style lang="scss" scoped></style>
