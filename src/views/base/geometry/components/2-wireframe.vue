<template>
  <el-card>
    <template #header> 2.几何体-线条渲染-wireframe </template>
    <div id="geometry-wireframe"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'geometry-wireframe',
  inheritAttrs: false,
});
const width = 300;
const height = 300;
const { THREE, threeState } = useThree({
  id: 'geometry-wireframe',
  options: {
    width,
    height,
    cameraType: 'OrthographicCamera',
    renderOptions: {
      antialias: true,
    },
  },
  ext: {
    left: -width / 2,
    right: width / 2,
    top: height / 2,
    bottom: -height / 2,
    near: 1,
    far: 1000,
  },
  initFn: initRender,
});

// 添加mesh
function addMesh() {
  // 几何体
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  // 材质
  const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
    wireframe: true, // // 网格模型是否以线条的模式渲染,默认为false
  });
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  threeState.scene?.add(mesh);
  return mesh;
}

// 添加光照
function addLight() {
  // 点光源
  const light = new THREE.PointLight(0xffffff);
  light.position.set(150, 130, 100);
  threeState.scene?.add(light);
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambient);
}

function initRender() {
  // // 相机设置
  threeState.camera?.position.set(100, 100, 100);
  threeState.camera?.lookAt(threeState.scene!.position);
  addMesh();
  addLight();
  // 渲染
  threeState.renderer?.render(threeState.scene!, threeState.camera!);
}
</script>

<style lang="scss" scoped></style>
