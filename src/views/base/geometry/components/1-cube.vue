<template>
  <el-card>
    <template #header> 1.几何体-面渲染-BoxGeometry </template>
    <div id="geometry-cube"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'geometry-cube',
  inheritAttrs: false,
});

const width = 300;
const height = 300;
const { THREE, threeState } = useThree('geometry-cube', {
  config: {
    width,
    height,
    cameraType: 'OrthographicCamera',
    renderOptions: {
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
  initFn: initRender,
});

// 添加mesh
function addMesh() {
  // 几何体
  // BoxGeometry是四边形的原始几何类
  // BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
  // BoxGeometry(X轴上面的宽度, Y轴上面的高度, Z轴上面的深度, 宽度的分段数, 高度的分段数, 深度的分段数)
  // 参数默认值均为1
  const geometry = new THREE.BoxGeometry(50, 50, 50);
  // 材质
  // MeshLambertMaterial(一种非光泽表面的材质，没有镜面高光。)
  const material = new THREE.MeshLambertMaterial();
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
