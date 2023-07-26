<template>
  <div id="demo-naruto"></div>
</template>

<script setup lang="ts">
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { createLight, useThree } from '@/hooks';
defineOptions({
  name: 'demo-naruto',
  inheritAttrs: false,
});

let width = window.innerWidth - 290;
let height = window.innerHeight - 100;
const { threeState, THREE, stats } = useThree('demo-naruto', {
  config: {
    width,
    height,
    cameraType: 'PerspectiveCamera',
    enableStats: true,
    enableAxesHelper: true,
    helperConfig: {
      axesHelperSize: 5,
    },
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
  cameraPosition: { x: 5, y: 2.5, z: 7 },
});
threeState.scene!.background = new THREE.Color(0x87ceeb);
threeState.scene!.fog = new THREE.Fog(0x87ceeb, 1, 80); // 雾
let direct; // 平行光

let modelMesh;
// 动画
const animationArrs: any[] = []; // 所有的动画数组
let mixer; // 混合器
const animationControl: {
  action: (index: number, type?: 'play' | 'stop') => void;
} = {
  action() {},
}; // 动画控制

// ['前进', '后退', '左移', '右移']
const keyCodes = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'KeyJ', 'Space'] as const;
type KeyCodes = (typeof keyCodes)[number];

let actionNum = 24; // 模型动作序号 24 为站立时的动作
let curKeyCodeArr: KeyCodes[] = []; // 当前按下的按键
const duration = 1000; // 键盘按下时动作失效时间
let flowTimer: any;
// 攻击动作
const attackList = [12, 8, 9, 10];
let attackIndex = 0;
let attackTimer: any;

// 地面
function addPlane() {
  const texture = new THREE.TextureLoader().load(
    '/src/assets/imgs/house/asphalt.jpg'
  );
  // 水平、垂直方向上重复纹理
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  // 使用最接近的纹素采样贴图
  texture.magFilter = THREE.NearestFilter;
  // 纹理的水平、竖直方向上的重复次数
  texture.repeat.set(30, 30);

  const geometry = new THREE.PlaneGeometry(30, 30);
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true; // 接收投影
  plane.rotation.x = Math.PI / 2;
  threeState.scene?.add(plane);
}

// 模型
function addModel() {
  const loader = new FBXLoader();
  loader.load('/src/assets/models/naruto.fbx', (mesh) => {
    mesh.scale.setScalar(0.01);
    mesh.position.y = 1.1;
    mesh.traverse((child) => {
      if ((child as any).isMesh) {
        child.castShadow = true; // 模型的每个部位都开启投影
      }
    });
    direct!.lightInstance.target = mesh; // 灯光聚焦模型
    modelMesh = mesh;
    threeState.scene?.add(mesh);

    mixer = new THREE.AnimationMixer(mesh); // 解析mesh及其子对象包含的动画数据
    for (let i = 0; i < mesh.animations.length; i++) {
      animationArrs[i] = mixer.clipAction(mesh.animations[i]); // 获得每个动画剪辑对象
    }
    animationControl.action = (index, type = 'play') => {
      for (let i = 0; i < animationArrs.length; i++) {
        if (index === i) {
          type === 'play' ? animationArrs[i].play() : animationArrs[i].stop(); // 执行动作
        } else {
          animationArrs[i].stop(); // 停止动作
        }
      }
    };
    animationControl.action(actionNum); // 24 为人物模型站立时的动作
  });
  // 键盘按下
  window.addEventListener('keydown', keydown);
  // 键盘抬起
  window.addEventListener('keyup', keyup);
}

// 光照
function addLight() {
  // 半球光
  const hemi = createLight('HemisphereLight', {
    options: {
      skyColor: 0xffffff,
      groundColor: 0x000000,
    },
  });
  threeState.scene?.add(hemi.lightInstance!);

  // 平行光
  direct = createLight('DirectionalLight', {
    options: {
      color: '#f60',
    },
    position: { x: 0, y: 5, z: 5 },
  });
  direct.lightInstance!.castShadow = true; // 开启灯光投影
  threeState.scene?.add(direct.lightInstance!);
  // threeState.scene?.add(direct.lightHelper!); // 灯光辅助线
}

function enableKeys(...rest: KeyCodes[]) {
  if (curKeyCodeArr.length === 0) return false;
  return rest.every((item) => curKeyCodeArr.includes(item));
}
// 动作
// 模型移动-前进 | 后退 | 左移 | 右移 | 前(左|右) | 后(左|右)
function moveAction() {
  // 前进
  if (enableKeys('KeyW')) {
    modelMesh!.position.z -= 0.02;
    threeState.camera!.position.z -= 0.02;
    direct!.lightInstance.position.z -= 0.02;
    modelMesh!.rotation.y = Math.PI;
  }
  // 后退
  if (enableKeys('KeyS')) {
    modelMesh!.position.z += 0.02;
    threeState.camera!.position.z += 0.02;
    direct!.lightInstance.position.z += 0.02;
    modelMesh!.rotation.y = 0;
  }
  // 左移
  if (enableKeys('KeyA')) {
    modelMesh!.position.x -= 0.02;
    threeState.camera!.position.x -= 0.02;
    direct!.lightInstance.position.x -= 0.02;
    modelMesh!.rotation.y = -Math.PI / 2;
  }
  // 右移
  if (enableKeys('KeyD')) {
    modelMesh!.position.x += 0.02;
    threeState.camera!.position.x += 0.02;
    direct!.lightInstance.position.x += 0.02;
    modelMesh!.rotation.y = Math.PI / 2;
  }
  // 前右
  if (enableKeys('KeyW', 'KeyD')) {
    modelMesh!.rotation.y = Math.PI / 1.5;
  }
  // 前左
  if (enableKeys('KeyW', 'KeyA')) {
    modelMesh!.rotation.y = -Math.PI / 1.5;
  }
  // 后右
  if (enableKeys('KeyS', 'KeyD')) {
    modelMesh!.rotation.y = Math.PI / 4;
  }
  // 后左
  if (enableKeys('KeyS', 'KeyA')) {
    modelMesh!.rotation.y = -Math.PI / 4;
  }
  // 执行跑步动作-3
  animationControl.action(3);
}

// 连续动作
function flowAction(type: 'keydown' | 'keyup' = 'keydown') {
  if (flowTimer) clearTimeout(flowTimer);
  // 延时初始化动作
  if (type === 'keyup') {
    flowTimer = setTimeout(() => {
      animationControl.action(actionNum, 'stop'); // 停止当前动画
      // 还原-执行初始动画
      actionNum = 24;
      animationControl.action(actionNum);
    }, duration);
    return;
  }
  actionNum++;
  if (actionNum >= 28) {
    actionNum = 1;
  }
  animationControl.action(actionNum);
}

// 模型攻击动作
function attackAction(type: 'keydown' | 'keyup' = 'keydown') {
  if (attackTimer) clearTimeout(attackTimer);
  // 延时初始化动作
  if (type === 'keyup') {
    attackTimer = setTimeout(() => {
      animationControl.action(attackList[attackIndex - 1], 'stop'); // 停止当前动画
      // 还原-执行初始动画
      actionNum = 24;
      animationControl.action(actionNum);
    }, duration);
    return;
  }
  attackIndex++;
  if (attackIndex > attackList.length) {
    attackIndex = 1;
  }
  animationControl.action(attackList[attackIndex - 1]);
}

// 鼠标按下
function keydown(e: KeyboardEvent) {
  const key = e.code as KeyCodes;
  if (keyCodes.includes(key) && !curKeyCodeArr.includes(key)) {
    if (key === 'Space') {
      flowAction();
    } else if (key === 'KeyJ') {
      attackAction();
    }
    curKeyCodeArr.push(key);
  }
}

// 鼠标抬起
function keyup(e: KeyboardEvent) {
  const key = e.code as KeyCodes;
  if (keyCodes.includes(e.code as KeyCodes)) {
    curKeyCodeArr = curKeyCodeArr.filter((item) => item !== key);
    if (key === 'Space') {
      flowAction('keyup');
    } else if (key === 'KeyJ') {
      attackAction('keyup');
    } else {
      actionNum = 24;
      animationControl.action(actionNum);
    }
  }
}

const clock = new THREE.Clock();
function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  stats.value?.update();
  if (mixer!) {
    mixer.update(clock.getDelta()); // 更新混合器相关
  }
  if (
    modelMesh! &&
    curKeyCodeArr.length > 0 &&
    !curKeyCodeArr.includes('KeyJ') &&
    !curKeyCodeArr.includes('Space')
  ) {
    moveAction();
  }
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
  addLight();
  addPlane();
  addModel();
  threeState.renderer.shadowMap.enabled = true; // 允许在场景中使用阴影贴图
  render();
  stats.value!.dom.style.left = '250px';
  stats.value!.dom.style.top = '60px';
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
  window.removeEventListener('keydown', keydown);
  window.removeEventListener('keyup', keyup);
});
</script>

<style lang="scss" scoped></style>
