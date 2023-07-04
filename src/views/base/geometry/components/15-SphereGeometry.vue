<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 15.球缓冲几何体-SphereGeometry </template>
    <div id="base-sphereGeometry"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-sphereGeometry',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-sphereGeometry', {
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
   * 球缓冲几何体
   SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
      radius — 球体半径，默认为1。
      widthSegments — 水平分段数（沿着经线分段），最小值为3，默认值为32。
      heightSegments — 垂直分段数（沿着纬线分段），最小值为2，默认值为16。
      phiStart — 指定水平（经线）起始角度，默认值为0。。
      phiLength — 指定水平（经线）扫描角度的大小，默认值为 Math.PI * 2。
      thetaStart — 指定垂直（纬线）起始角度，默认值为0。
      thetaLength — 指定垂直（纬线）扫描角度大小，默认值为 Math.PI。
      该几何体是通过扫描并计算围绕着Y轴（水平扫描）和X轴（垂直扫描）的顶点来创建的。 因此，不完整的球体（类似球形切片）可以通过为phiStart，phiLength，thetaStart和thetaLength设置不同的值来创建， 以定义我们开始（或结束）计算这些顶点的起点（或终点）。
   */
  const geometry = new THREE.SphereGeometry(30, 32, 16);
  const material = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  });
  mesh = new THREE.Mesh(geometry, material);
  threeState.scene?.add(mesh);
  mesh.position.set(80, 0, 0);

  const material1 = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    wireframe: true,
  });
  mesh1 = new THREE.Mesh(geometry, material1);
  threeState.scene?.add(mesh1);
  mesh1.position.set(0, 0, 80);
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
