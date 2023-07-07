<template>
  <div class="camera-container relative" ref="cameraRef">
    <el-radio-group v-model="camera" class="ml-4">
      <el-radio label="OrthographicCamera" size="large">
        正交相机(OrthographicCamera)
      </el-radio>
      <el-radio label="PerspectiveCamera" size="large">
        透视相机(PerspectiveCamera)
      </el-radio>
    </el-radio-group>
    <div id="base-camera"></div>
  </div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { TCamera } from '@/hooks/useThree/type';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

defineOptions({
  name: 'camera',
});
const cameraRef = ref();
const camera = ref<TCamera>('OrthographicCamera');
const width = 800;
const height = 700;
const { threeState, THREE, helperState } = useThree('base-camera', {
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
  cameraPosition: { x: 500, y: 500, z: 500 },
});

const cameraP = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
cameraP.position.set(500, 500, 500);
cameraP.lookAt(threeState.scene!.position);

function initGeometry() {
  const geometry = new THREE.BoxGeometry(20, 20, 20);
  for (let i = 0; i < 30; i++) {
    // 创建材质对象
    const material = new THREE.MeshLambertMaterial({
      color: Math.random() * 0xffffff,
    });
    // 创建网格模型并添加到场景中
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 300 - 50;
    mesh.position.z = Math.random() * 300 - 50;
    threeState.scene?.add(mesh);
  }
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

function addGUI() {
  // 参数一:对象;参数二:要调整的对象属性;参数三:最小值;参数四:最大值;参数五:调整精度
  const gui = new GUI({
    container: cameraRef.value,
  });
  const guiO = gui.addFolder('正交相机参数');
  guiO
    .add(threeState.camera!, 'left', -width, 0)
    .step(0.5)
    .name('左边距')
    .onChange(() => {
      threeState.camera?.updateProjectionMatrix();
    });
  guiO
    .add(threeState.camera!, 'right', 0, width)
    .name('右边距')
    .onChange(() => {
      threeState.camera?.updateProjectionMatrix();
    });
  guiO
    .add(threeState.camera!, 'top', 0, height)
    .name('上边距')
    .onChange(() => {
      threeState.camera?.updateProjectionMatrix();
    });
  guiO
    .add(threeState.camera!, 'bottom', -height, 100)
    .name('下边距')
    .onChange(() => {
      threeState.camera?.updateProjectionMatrix();
    });
  guiO
    .add(threeState.camera!, 'near', 0, 100)
    .name('近端面')
    .onChange(() => {
      threeState.camera?.updateProjectionMatrix();
    });
  guiO
    .add(threeState.camera!, 'far', 0, 10000)
    .name('远端面')
    .onChange(() => {
      threeState.camera?.updateProjectionMatrix();
    });

  const guiP = gui.addFolder('透视相机参数');
  guiP
    .add(cameraP, 'fov', 0, 90, 1)
    .name('视角场')
    .onChange(() => {
      cameraP.updateProjectionMatrix();
    });
  guiP
    .add(cameraP, 'near', 1, 100)
    .name('近端面')
    .onChange(() => {
      cameraP.updateProjectionMatrix();
    });
  guiP
    .add(cameraP, 'far', 1, 10000)
    .name('远端面')
    .onChange(() => {
      cameraP.updateProjectionMatrix();
    });
}

let helper, helperP;

function addHelper() {
  helper = new THREE.CameraHelper(threeState.camera!);
  threeState.scene?.add(helper);
  helperP = new THREE.CameraHelper(cameraP);
  threeState.scene?.add(helperP);
  helperP.visible = false;
}
function render() {
  threeState.renderer.render(
    threeState.scene!,
    camera.value === 'PerspectiveCamera' ? cameraP : threeState.camera!
  );
  requestAnimationFrame(render);
}
watch(camera, (val) => {
  // 更新相机对象
  helperState.controlInstance!.object =
    val === 'OrthographicCamera' ? threeState.camera! : cameraP;
  helperState.controlInstance?.update();
  const isO = val === 'OrthographicCamera';
  helperP!.visible = !isO;
  helper!.visible = isO;
});

onMounted(() => {
  initGeometry();
  addLight();
  addGUI();
  addHelper();
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
