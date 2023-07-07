<template>
  <div class="shadow-container relative" ref="shadowRef">
    阴影
    <div id="base-shadow"></div>
  </div>
</template>

<script setup lang="ts">
import { createLight, useThree } from '@/hooks';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

defineOptions({
  name: 'base-shadow',
});
const shadowRef = ref();
const width = 800;
const height = 700;
const { threeState, THREE } = useThree('base-shadow', {
  config: {
    width,
    height,
    cameraType: 'PerspectiveCamera',
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 150,
    },
  },
  cameraOptions: {
    fov: 75,
    aspect: width / height,
    near: 0.1,
    far: 2000,
  },
  cameraPosition: {
    x: 500,
    y: 200,
    z: 200,
  },
});

function addPlane() {
  const gemoetry = new THREE.PlaneGeometry(1000, 1000);
  const material = new THREE.MeshPhongMaterial({
    color: 0x808080,
    side: THREE.DoubleSide,
  });
  const plan = new THREE.Mesh(gemoetry, material);
  plan.position.set(0, -10, 0);
  plan.rotation.x = -Math.PI / 2;
  plan.receiveShadow = true; // 1. 接收阴影的物体要开启材质是否接收阴影: receiveShadow = true
  threeState.scene?.add(plan);
}
function addGeometry() {
  const gemoetry = new THREE.SphereGeometry(50, 32, 16);
  const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
  const mesh = new THREE.Mesh(gemoetry, material);
  mesh.position.set(0, 60, 0);
  mesh.castShadow = true; // 2. 需要投射阴影的物体要开启是否被渲染到阴影贴图中： castShadow = true
  threeState.scene?.add(mesh);
}

let spotLight;
function addLight() {
  const ambient = createLight('AmbientLight', {
    options: {
      color: 0xffffff,
      intensity: 0.3,
    },
  }).lightInstance;
  threeState.scene?.add(ambient!);

  spotLight = createLight('SpotLight', {
    options: {
      angle: Math.PI / 6,
      penumbra: 0.2,
      color: 0xffffff,
    },
    position: { x: -200, y: 350, z: 0 },
  });
  spotLight.lightInstance!.castShadow = true; // 3. 灯光开启阴影投射
  threeState.scene?.add(spotLight.lightInstance!);
  threeState.scene?.add(spotLight.lightHelper!);
}
function addGUI() {
  const gui = new GUI({
    container: shadowRef.value,
  });
  const guiS = gui.addFolder('聚光灯参数').close();
  const spot = {
    intensity: spotLight!.lightInstance.intensity, // 光强
    color: 0x444444, // 光颜色
    distance: 0,
    decay: 2,
    angle: 0,
    penumbra: 0,
  };
  guiS
    .add(spot, 'intensity', 0, 500, 0.01)
    .name('强度')
    .onChange((val: number) => {
      spotLight!.lightInstance.intensity = val;
    });
  guiS
    .addColor(spot, 'color')
    .listen()
    .name('颜色')
    .onChange((val: number) => {
      spotLight!.lightInstance.color = new THREE.Color(val);
      spotLight!.lightHelper.update();
    });
  guiS
    .add(spot, 'distance', 0, 1000, 0.01)
    .name('距离')
    .onChange((val: number) => {
      spotLight!.lightInstance.distance = val;
    });
  guiS
    .add(spot, 'decay', 0, 1000, 0.01)
    .name('衰退量')
    .onChange((val: number) => {
      spotLight!.lightInstance.decay = val;
    });
  guiS
    .add(spot, 'penumbra', 0, 1, 0.01)
    .name('聚光锥半影衰减百分比')
    .onChange((val: number) => {
      spotLight!.lightInstance.penumbra = val;
    });
  guiS
    .add(spot, 'angle', 0, Math.PI / 2)
    .name('散射角度')
    .onChange((val: number) => {
      spotLight!.lightInstance.angle = val;
      spotLight!.lightHelper.update();
    });
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  requestAnimationFrame(render);
}

onMounted(() => {
  // 4. 渲染器显示阴影设置为enabled = true 允许在场景中使用阴影贴图
  // 必须要在其它材质渲染前设置，否则不生效
  threeState.renderer.shadowMap.enabled = true;
  addPlane();
  addGeometry();
  addLight();
  addGUI();
  render();
});
</script>

<style lang="scss">
.lil-gui.allow-touch-styles.root {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
