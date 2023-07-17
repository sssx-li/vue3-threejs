<template>
  <el-card class="mr-14px mb-14px relative">
    <template #header> 3.文字-Font </template>
    <div id="advanced-font"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

defineOptions({
  name: 'advanced-font',
  inheritAttrs: false,
});

const width = 400;
const height = 400;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.set(5, 5, 5);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);

new OrbitControls(camera, renderer.domElement);

const fontLoader = new FontLoader();
function addFont() {
  fontLoader.load('/src/assets/font/text_demo.json', (font) => {
    console.log('font', font);
    /**
     * TextGeometry
     * 一个用于将文本生成为单一的几何体的类。
     * 
     TextGeometry(text : String, parameters : Object)
        text — 将要显示的文本。
        parameters — 包含有下列参数的对象：

        font — THREE.Font的实例。
        size — Float。字体大小，默认值为100。
        height — Float。挤出文本的厚度。默认值为50。
        curveSegments — Integer。（表示文本的）曲线上点的数量。默认值为12。
        bevelEnabled — Boolean。是否开启斜角，默认为false。
        bevelThickness — Float。文本上斜角的深度，默认值为20。
        bevelSize — Float。斜角与原始文本轮廓之间的延伸距离。默认值为8。
        bevelSegments — Integer。斜角的分段数。默认值为3。
     */
    const geometry = new TextGeometry('HELLOWORLD', {
      font: font,
      size: 1,
      height: 0.2,
      curveSegments: 30,
    });
    const matreial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    });
    const mesh = new THREE.Mesh(geometry, matreial);
    mesh.position.set(-3.5, 0, 0);
    scene.add(mesh);
  });
}

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

onMounted(() => {
  addFont();
  render();
  document.getElementById('advanced-font')?.appendChild(renderer.domElement);
});
</script>

<style lang="scss" scoped></style>
