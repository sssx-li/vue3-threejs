<template>
  <el-card>
    <template #header> 4.球形几何体-SphereGeometry </template>
    <div id="geometry-sphereGeometry"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

defineOptions({
  name: 'geometry-sphereGeometry',
  inheritAttrs: false,
});
const width = 300;
const height = 300;
const { THREE, threeState } = useThree({
  id: 'geometry-sphereGeometry',
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
  // 球形缓冲几何体
  /*
   SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
      radius — 球体半径，默认为1。
      widthSegments — 水平分段数（沿着经线分段），最小值为3，默认值为32。
      heightSegments — 垂直分段数（沿着纬线分段），最小值为2，默认值为16。
      phiStart — 指定水平（经线）起始角度，默认值为0。。
      phiLength — 指定水平（经线）扫描角度的大小，默认值为 Math.PI * 2。
      thetaStart — 指定垂直（纬线）起始角度，默认值为0。
      thetaLength — 指定垂直（纬线）扫描角度大小，默认值为 Math.PI
   */
  const geometry = new THREE.SphereGeometry(50);
  // 材质
  const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
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
