<template>
  <el-card>
    <template #header> 2.文字-CSS2DRenderer </template>
    <div id="base-text"></div>
  </el-card>
</template>

<script setup lang="ts">
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer';
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-text',
  inheritAttrs: false,
});

const width = 300;
const height = 300;
const { threeState, THREE } = useThree('base-text', {
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

function initText() {
  // 创建平面
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff, //三角面颜色(只有添加光源才生效)
    wireframe: false, // 网格模型是否以线条的模式渲染(以面模式渲染时如果不设置光源整个立方体所有面均为黑色) 默认为false
  }); //材质对象
  const cube = new THREE.Mesh(geometry, material);
  threeState.scene?.add(cube);

  const textDiv = document.createElement('div');
  textDiv.className = 'text-div';
  textDiv.innerHTML = 'Hello CSS2D';
  const text = new CSS2DObject(textDiv);
  cube.add(text);
  // text.position.set(0, 1, 0);
  // 实例化CSS2D渲染器
  const textRenderer = new CSS2DRenderer();
  textRenderer.setSize(width, height);
  textRenderer.domElement.style.position = 'fixed';
  textRenderer.domElement.style.top = '0';
  textRenderer.domElement.style.left = '0';
  textRenderer.domElement.style.zIndex = '10';

  document.getElementById('base-text')?.appendChild(textRenderer.domElement);
}

function initRender() {
  threeState.camera?.position.set(0, 0, 100);
  threeState.camera?.lookAt(threeState.scene!.position);
  initText();
  // 渲染
  threeState.renderer?.render(threeState.scene!, threeState.camera!);
}
</script>

<style lang="scss" scoped></style>
