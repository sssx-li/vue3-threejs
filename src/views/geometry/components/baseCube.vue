<template>
  <el-card class="box-card">
    <template #header> 1.基础几个体 </template>
    <div :id="id"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-cube',
  inheritAttrs: false,
});
const props = withDefaults(defineProps<{ id?: string }>(), {
  id: 'my-chart',
});
const width = 500;
const height = 500;
const { THREE, threeState } = useThree({
  id: props.id,
  options: {
    width,
    height,
    cameraType: 'OrthographicCamera',
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
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  // 材质
  const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff, //三角面颜色(只有添加光源才生效)
    wireframe: false, // 网格模型是否以线条的模式渲染(以面模式渲染时如果不设置光源整个立方体所有面均为黑色) 默认为false
  });
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  threeState.scene?.add(mesh);
  return mesh;
}

// 添加光照
function addLight() {
  // 点光源
  const light = new THREE.PointLight(0xffffff);
  light.position.set(150, 150, 100);
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
