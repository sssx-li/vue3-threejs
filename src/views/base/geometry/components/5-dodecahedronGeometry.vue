<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 5.十二面缓冲几何体-DodecahedronGeometry </template>
    <div id="base-dodecahedronGeometry"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-dodecahedronGeometry',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-dodecahedronGeometry', {
  config: {
    width,
    height,
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 200,
    },
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
  cameraPosition: { x: 350, y: 350, z: 350 },
  renderFn: initRender,
});

let mesh, mesh1;
function initGeometry() {
  /**
   * 十二面缓冲几何体
   DodecahedronGeometry(radius : Float, detail : Integer)
      radius — 十二面体的半径，默认值为1。
      detail — 默认值为0。将这个值设为一个大于0的数将会为它增加一些顶点，使其不再是一个十二面体。
   */
  const geometry = new THREE.DodecahedronGeometry(50);
  // MeshLambertMaterial：一种非光泽表面的材质，没有镜面高光。
  const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff, //三角面颜色(只有添加光源才生效)
  });
  mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  mesh.position.set(80, 0, 0);
  threeState.scene?.add(mesh);

  const material1 = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    wireframe: true, // 网格模型是否以线条的模式渲染(以面模式渲染时如果不设置光源整个立方体所有面均为黑色) 默认为false
  });
  mesh1 = new THREE.Mesh(geometry, material1); //网格模型对象Mesh
  mesh1.position.set(0, 0, 80);
  threeState.scene?.add(mesh1);
}
function addLight() {
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(100, 300, 0);
  threeState.scene?.add(point);
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambient);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);

  // 旋转
  mesh!.rotation.x += 0.01;
  mesh!.rotation.y += 0.01;

  mesh1!.rotation.x -= 0.01;
  mesh1!.rotation.y -= 0.01;

  requestAnimationFrame(render);
}

function initRender() {
  initGeometry();
  addLight();
  render();
}
</script>

<style lang="scss" scoped></style>
