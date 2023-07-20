<template>
  <div class="building-container">
    <div id="demo-building"></div>
  </div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';

defineOptions({
  name: 'demo-building',
  inheritAttrs: false,
});
let width = window.innerWidth - 290;
let height = window.innerHeight - 100;
const { threeState, THREE, helperState, stats } = useThree('demo-building', {
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
  cameraPosition: { x: 5, y: 5, z: 5 },
});
const loader = new THREE.CubeTextureLoader();
loader.setPath('/src/assets/imgs/building/');
function addBuilding() {
  loader.load(
    ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    (texture) => {
      const material = new THREE.MeshStandardMaterial({
        roughness: 0, // 材质的粗糙程度。0表示平滑的镜面反射，1表示完全漫反射
        metalness: 0.5, // 材质与金属的相似度[0-1]
        envMap: texture, // 环境贴图
      });
      const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const mesh = new THREE.Mesh(geometry, material);
      threeState.scene?.add(mesh);
      threeState.scene!.background = texture;
    }
  );
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  helperState.controlInstance?.update(); // 开启阻尼需要调用update
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
  addBuilding();
  render();

  helperState.controlInstance!.enablePan = false; // 禁止右键平移
  helperState.controlInstance!.enableZoom = false; // 禁止缩放
  helperState.controlInstance!.enableDamping = true; // 启用阻尼(惯性)
  helperState.controlInstance!.rotateSpeed = -0.25; // 旋转速度

  stats.value!.dom.style.left = '250px';
  stats.value!.dom.style.top = '60px';
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>

<style lang="scss" scoped></style>
