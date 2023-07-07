<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 3.圆锥缓冲几何体-ConeGeometry </template>
    <div id="base-coneGeometry"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-coneGeometry',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-coneGeometry', {
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
   * 圆锥缓冲几何体
   ConeGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
      radius — 圆锥底部的半径，默认值为1。
      height — 圆锥的高度，默认值为1。
      radialSegments — 圆锥侧面周围的分段数，默认为32。
      heightSegments — 圆锥侧面沿着其高度的分段数，默认值为1。
      openEnded — 一个Boolean值，指明该圆锥的底面是开放的还是封顶的。默认值为false，即其底面默认是封顶的。
      thetaStart — 第一个分段的起始角度，默认为0。（three o'clock position）
      thetaLength — 圆锥底面圆扇区的中心角，通常被称为“θ”（西塔）。默认值是2*Pi，这使其成为一个完整的圆锥。
   */
  const geometry = new THREE.ConeGeometry(30, 100);
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
