<template>
  <el-card class="mr-14px mb-14px">
    <template #header> 17.圆环缓冲几何体-TorusGeometry </template>
    <div id="base-torusGeometry"></div>
  </el-card>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-torusGeometry',
  inheritAttrs: false,
});

const width = 400;
const height = 400;
const { threeState, THREE } = useThree('base-torusGeometry', {
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
   * 圆环缓冲几何体
   TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
      radius - 环面的半径，从环面的中心到管道横截面的中心。默认值是1。
      tube — 管道的半径，默认值为0.4。
      radialSegments — 管道横截面的分段数，默认值为12。
      tubularSegments — 管道的分段数，默认值为48。
      arc — 圆环的圆心角（单位是弧度），默认值为Math.PI * 2。
   */
  const geometry = new THREE.TorusGeometry(30, 10, 10);
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
