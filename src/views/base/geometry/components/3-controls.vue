<template>
  <el-card>
    <template #header> 3.轨道控制器-旋转/平移/缩放-OrbitControls </template>
    <div id="geometry-controls"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

defineOptions({
  name: 'geometry-controls',
  inheritAttrs: false,
});
const width = 300;
const height = 300;
const { THREE, threeState } = useThree('geometry-controls', {
  config: {
    width,
    height,
    cameraType: 'OrthographicCamera',
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
  initFn: initRender,
});

// 添加mesh
function addMesh() {
  // 几何体
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  // 材质
  const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff, //三角面颜色(只有添加光源才生效)
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

// 渲染函数
function render(mesh: any) {
  threeState.renderer?.render(threeState.scene!, threeState.camera!);
  // 旋转
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  requestAnimationFrame(() => render(mesh));
}

function initRender() {
  // // 相机设置
  threeState.camera?.position.set(100, 100, 100);
  threeState.camera?.lookAt(threeState.scene!.position);
  const mesh = addMesh();
  addLight();
  new OrbitControls(threeState.camera!, threeState.renderer!.domElement);
  // 渲染
  render(mesh);
}
</script>

<style lang="scss" scoped></style>
