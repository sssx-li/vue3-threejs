<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 1.立方缓冲几何体-BoxGeometry </template>
    <div id="base-boxGeometry"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-boxGeometry',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-boxGeometry', {
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
});

let mesh, mesh1;
function addGeometry() {
  /**
   * 立方缓冲几何体
   BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
      width — X轴上面的宽度，默认值为1。
      height — Y轴上面的高度，默认值为1。
      depth — Z轴上面的深度，默认值为1。
      widthSegments — （可选）宽度的分段数，默认值是1。
      heightSegments — （可选）高度的分段数，默认值是1。
      depthSegments — （可选）深度的分段数，默认值是1。
   */
  const geometry = new THREE.BoxGeometry(50, 50, 50);
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

onMounted(() => {
  addGeometry();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>
