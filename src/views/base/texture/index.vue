<template>
  <div class="texture-container flex flex-wrap">
    <div id="base-texture"></div>
  </div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'base-texture',
  inheritAttrs: false,
});

const width = 800;
const height = 700;
const { threeState, THREE } = useThree('base-texture', {
  config: {
    width,
    height,
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 350,
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

function addGeometry() {
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  const texture = new THREE.TextureLoader().load('/src/assets/imgs/muban.jpg');
  const material = new THREE.MeshLambertMaterial({
    map: texture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  threeState.scene?.add(mesh);

  const geometry1 = new THREE.SphereGeometry(50);
  const material1 = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    map: texture,
  });
  const mesh1 = new THREE.Mesh(geometry1, material1);
  mesh1.position.set(0, 150, 0);
  threeState.scene?.add(mesh1);

  // 顶点UV坐标

  const geometry2 = new THREE.PlaneGeometry(100, 100);
  const uv = new Float32Array([
    0,
    0, //图片左下角
    1,
    0, //图片右下角
    1,
    1, //图片右上角
    0,
    1, //图片左上角
  ]);
  geometry2.attributes.uv = new THREE.BufferAttribute(uv, 2); //2个为一组, 表示一个顶点的纹理坐标
  const material2 = new THREE.MeshLambertMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const mesh2 = new THREE.Mesh(geometry2, material2);
  mesh2.position.set(150, 150, 0);
  threeState.scene?.add(mesh2);

  // 纹理阵列
  const geometry3 = new THREE.BoxGeometry(100, 100, 100);
  const texture3 = new THREE.TextureLoader().load('/src/assets/imgs/muban.jpg');
  // wrapS: 这个值定义了纹理贴图在水平方向上将如何包裹，在UV映射中对应于U。
  /**
   * Texture纹理的阵列
   *
    wrapS - 这个值定义了纹理贴图在水平方向上将如何包裹，在UV映射中对应于U。
    wrapT - 这个值定义了纹理贴图在垂直方向上将如何包裹，在UV映射中对应于V。
   */
  /**
   * 包裹模式
   *
    THREE.RepeatWrapping - 纹理将简单地重复到无穷大
    THREE.ClampToEdgeWrapping - 默认值，纹理中的最后一个像素将延伸到网格的边缘。
    THREE.MirroredRepeatWrapping - 纹理将重复到无穷大，在每次重复时将进行镜像
   */
  texture3.wrapS = THREE.RepeatWrapping;
  texture3.wrapT = THREE.RepeatWrapping;
  // uv两个方向纹理的重复次数
  texture3.repeat.set(3, 3);
  const material3 = new THREE.MeshLambertMaterial({
    map: texture3,
  });
  const mesh3 = new THREE.Mesh(geometry3, material3);
  mesh3.position.set(150, 0, 0);
  threeState.scene?.add(mesh3);
}

// 光环
const haloTexture = new THREE.TextureLoader().load('/src/assets/imgs/halo.png');
haloTexture.center.set(0.5, 0.5);
function addHalo() {
  const geometry = new THREE.PlaneGeometry(50, 50).rotateX(-Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({
    map: haloTexture,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 150);
  threeState.scene?.add(mesh);
}

const waterWaveTexture = new THREE.TextureLoader().load(
  '/src/assets/imgs/water-wave.png'
);
// waterWaveTexture.wrapT = THREE.MirroredRepeatWrapping;
waterWaveTexture.wrapS = THREE.MirroredRepeatWrapping;
function addWaterWave() {
  const geometry = new THREE.PlaneGeometry(150, 150).rotateX(-Math.PI / 2);
  const material = new THREE.MeshBasicMaterial({
    map: waterWaveTexture,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(100, 0, 200);
  threeState.scene?.add(mesh);
}

function addLight() {
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(100, 300, 200);
  threeState.scene?.add(point);
  // 环境光
  const ambient = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambient);
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  // 光圈旋转
  haloTexture.rotation += 0.05;
  //水流动
  waterWaveTexture.offset.x += 0.0001;
  requestAnimationFrame(render);
}

onMounted(() => {
  addGeometry();
  addHalo();
  addWaterWave();
  addLight();
  render();
});
</script>

<style lang="scss" scoped></style>
