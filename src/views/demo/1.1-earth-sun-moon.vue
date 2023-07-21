<template>
  <div class="e-s-m-container relative" ref="esmRef">
    <div id="demo-earth-sun-moon"></div>
  </div>
</template>

<script setup lang="ts">
import anime from 'animejs';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import { useThree } from '@/hooks';

defineOptions({
  name: 'demo-earth-sun-moon',
  inheritAttrs: false,
});

const esmRef = ref<HTMLElement>();
let width = window.innerWidth - 290;
let height = window.innerHeight - 100;
const { threeState, THREE, stats } = useThree('demo-earth-sun-moon', {
  config: {
    width,
    height,
    cameraType: 'PerspectiveCamera',
    enableStats: true,
    renderOptions: {
      antialias: true,
    },
  },
  cameraOptions: {
    fov: 75,
    aspect: width / height,
    near: 0.1,
    far: 1000,
  },
  cameraPosition: { x: 0, y: 0, z: 18 },
});

const loader = new THREE.TextureLoader();
loader.setPath('/src/assets/imgs/demo/');

threeState.scene!.background = loader.load('sky.jpg');

const groupESM = new THREE.Group(); // 地日月系
groupESM.name = '地日月系';
const groupEM = new THREE.Group(); // 地月系
groupEM.name = '地月系';

const meshArr: any = [];
function addBody() {
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  // 太阳
  const sunMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('sun.jpg'),
  });
  const sun = new THREE.Mesh(geometry, sunMaterial);
  sun.name = 'sun';
  sun.scale.setScalar(3);
  meshArr.push(sun);
  // 地球
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: loader.load('earth.jpg'),
  });
  const earth = new THREE.Mesh(geometry, earthMaterial);
  earth.name = 'earth';
  earth.castShadow = true; // 开启阴影投射
  earth.receiveShadow = true; // 开启接收阴影
  meshArr.push(earth);
  // 月亮
  const moonMaterial = new THREE.MeshPhongMaterial({
    map: loader.load('moon.jpg'),
  });
  const moon = new THREE.Mesh(geometry, moonMaterial);
  moon.name = 'moon';
  moon.scale.setScalar(0.25);
  moon.castShadow = true; // 开启阴影投射
  moon.receiveShadow = true; // 开启接收阴影
  meshArr.push(moon);

  groupESM.add(sun);
  groupEM.add(earth);
  groupEM.add(moon);
  groupESM.add(groupEM);

  threeState.scene?.add(groupESM);

  const count = 1000; // 坐标点总数
  // 地日轨道(椭圆)
  const curve = new THREE.EllipseCurve(0, 0, 10, 7); // 椭圆
  const SEPoints = curve.getPoints(count); // 点位坐标

  groupEM.position.set(SEPoints[0].x, SEPoints[0].y, 0); // 将地月系初始位置设置为地日轨道的第一个点

  // 地月轨道(圆)
  const emCurve = new THREE.ArcCurve(SEPoints[0].x, SEPoints[0].y, 1.5);
  const EMPoints = emCurve.getPoints(count);
  moon.position.set(
    EMPoints[500].x - SEPoints[0].x,
    EMPoints[500].y - SEPoints[0].y,
    0
  ); // 将月球初始位置设置为地月轨道的第一个点

  // 地球绕地日轨道运动
  const SEParam = {
    index: 0,
  };
  anime({
    targets: SEParam,
    index: count,
    easing: 'linear',
    round: 1,
    duration: 10000,
    loop: true,
    update: () => {
      const SEPoint = SEPoints[SEParam.index];
      groupEM.position.copy(new THREE.Vector3(SEPoint.x, SEPoint.y, 0));
    },
  });

  // 月球绕地月轨道运动
  const EMParam = {
    index: 0,
  };
  anime({
    targets: EMParam,
    index: count,
    easing: 'linear',
    round: 1,
    duration: 2500,
    loop: true,
    update: () => {
      const EMPoint = EMPoints[EMParam.index];
      moon.position.copy(
        new THREE.Vector3(
          EMPoint.x - SEPoints[0].x,
          EMPoint.y - SEPoints[0].y,
          0
        )
      );
    },
  });
}

function addLight() {
  // 点光源
  const point = new THREE.PointLight(0xffffff);
  point.position.set(0, 0, 0);
  point.castShadow = true; // 开启灯光投影
  threeState.scene?.add(point);
  // 环境光
  const ambit = new THREE.AmbientLight(0x444444);
  threeState.scene?.add(ambit);
}

function addGui() {
  const gui = new GUI({
    container: esmRef.value,
  });
  gui.addFolder('相机位置');
  gui
    .add(threeState.camera!.position, 'x', -10, 10, 0.01)
    .name('x坐标')
    .onChange(() => {
      threeState.camera?.updateProjectionMatrix();
    });
  gui
    .add(threeState.camera!.position, 'y', -30, 0, 0.01)
    .name('y坐标')
    .onChange(() => {
      threeState.camera?.updateProjectionMatrix();
    });
  gui
    .add(threeState.camera!.position, 'z', -10, 20, 0.01)
    .name('z坐标')
    .onChange(() => {
      threeState.camera?.updateProjectionMatrix();
    });
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  stats.value?.update();
  meshArr.forEach((mesh: any) => {
    mesh.rotation.y +=
      mesh.name === 'sun' ? 0.001 : mesh.name === 'earth' ? 0.005 : 0.01;
  });
  requestAnimationFrame(render);
}

const resize = () => {
  width = window.innerWidth - 290;
  height = window.innerHeight - 100;
  threeState.camera!.aspect = width / height;
  threeState.camera!.updateProjectionMatrix();
  threeState.renderer.setSize(width, height);
};

onMounted(() => {
  addBody();
  addLight();
  addGui();
  threeState.renderer.shadowMap.enabled = true; // 允许在场景中使用阴影贴图
  render();
  stats.value!.dom.style.left = '250px';
  stats.value!.dom.style.top = '60px';
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>

<style lang="scss" scoped>
:deep(.lil-gui) {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
