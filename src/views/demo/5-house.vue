<template>
  <div id="demo-house"></div>
</template>

<script setup lang="ts">
import { useThree } from '@/hooks';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import anime from 'animejs';
defineOptions({
  name: 'demo-house',
  inheritAttrs: false,
});

let width = window.innerWidth - 290;
let height = window.innerHeight - 100;
const { threeState, THREE, stats } = useThree('demo-house', {
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

const houseGroup = new THREE.Group();
houseGroup.name = '房屋-组';
const wallGroup = new THREE.Group();
wallGroup.name = '墙-组';
const roofGroup = new THREE.Group();
roofGroup.name = '房顶-组';
const doorGroup = new THREE.Group();
doorGroup.name = '门-组';

const loader = new THREE.TextureLoader();
loader.setPath('/src/assets/imgs/house/');

// 地面
function addPlane() {
  const texture = loader.load('asphalt.jpg');
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
  plane.rotation.x = Math.PI / 2;
  threeState.scene?.add(plane);
}

// 挤出形状配置
const extrudeOption = {
  depth: 0.05, // 形状的深度
  bevelSize: 0.01,
  bevelThickness: 0.05, // 原始形状上斜角的厚度
};

// 左右墙
function addSideWall() {
  // 左右墙
  const sideShape = new THREE.Shape();
  sideShape.moveTo(-1.5, 0);
  sideShape.lineTo(1.5, 0);
  sideShape.lineTo(1.5, 1.5);
  sideShape.lineTo(0, 2);
  sideShape.lineTo(-1.5, 1.5);

  const leftGeometry = new THREE.ExtrudeGeometry(sideShape, extrudeOption);
  const sideMaterial = new THREE.MeshBasicMaterial({ color: 0xe5d890 });
  const leftWall = new THREE.Mesh(leftGeometry, sideMaterial);
  leftWall.name = '左墙';
  leftWall.position.z = -1.5;
  wallGroup.add(leftWall);

  const rightGeometry = leftGeometry.clone();
  const rightWall = new THREE.Mesh(rightGeometry, sideMaterial);
  rightWall.name = '右墙';
  rightWall.position.z = 1.5;
  wallGroup.add(rightWall);
}

// 前后墙
function addAroundWall() {
  // 前墙
  const frontShape = new THREE.Shape();
  frontShape.moveTo(-1.5, 0);
  frontShape.lineTo(1.5, 0);
  frontShape.lineTo(1.5, 1.5);
  frontShape.lineTo(-1.5, 1.5);

  // 前墙-门
  const doorPath = new THREE.Path();
  doorPath.moveTo(-0.25, 0);
  doorPath.lineTo(-0.25, 0.8);
  doorPath.lineTo(0.25, 0.8);
  doorPath.lineTo(0.25, 0);
  doorPath.lineTo(-0.25, 0);
  frontShape.holes.push(doorPath);

  // 前墙-右窗
  const windowRightPath = new THREE.Path();
  windowRightPath.moveTo(0.6, 0.7);
  windowRightPath.lineTo(0.6, 1.2);
  windowRightPath.lineTo(1.2, 1.2);
  windowRightPath.lineTo(1.2, 0.7);
  windowRightPath.lineTo(0.6, 0.7);
  frontShape.holes.push(windowRightPath);

  // 前墙-左窗
  const windowLightPath = new THREE.Path();
  windowLightPath.moveTo(-0.6, 0.7);
  windowLightPath.lineTo(-0.6, 1.2);
  windowLightPath.lineTo(-1.2, 1.2);
  windowLightPath.lineTo(-1.2, 0.7);
  windowLightPath.lineTo(-0.6, 0.7);
  frontShape.holes.push(windowLightPath);

  const frontGermetry = new THREE.ExtrudeGeometry(frontShape, extrudeOption);
  const frontMaterial = new THREE.MeshBasicMaterial({ color: 'grey' });
  const frontWall = new THREE.Mesh(frontGermetry, frontMaterial);
  frontWall.name = '前墙';
  frontWall.rotation.y = Math.PI / 2;
  frontWall.position.set(1.41, 0, 0.05);
  wallGroup.add(frontWall);

  // 后墙
  const backShape = new THREE.Shape();
  backShape.moveTo(-1.5, 0);
  backShape.lineTo(1.5, 0);
  backShape.lineTo(1.5, 1.5);
  backShape.lineTo(-1.5, 1.5);
  const backGermetry = new THREE.ExtrudeGeometry(backShape, extrudeOption);
  const backMaterial = new THREE.MeshBasicMaterial({ color: 0xe5d890 });
  const backWall = new THREE.Mesh(backGermetry, backMaterial);
  backWall.name = '后墙';
  backWall.position.set(-1.46, 0, 0.05);
  backWall.rotation.y = Math.PI / 2;

  wallGroup.add(backWall);
}

// 房顶
function addRoof() {
  const geometry = new THREE.BoxGeometry(2, 3.5, 0.1);
  const texture = loader.load('eave.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  const textureMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const material = new THREE.MeshBasicMaterial({ color: 'grey' });
  const materials = [
    material,
    material,
    material,
    material,
    material,
    textureMaterial,
  ];
  const roof = new THREE.Mesh(geometry, materials);
  roof.rotation.x = Math.PI / 2;
  roof.rotation.y = (-Math.PI / 5) * 0.5;
  roof.position.y = 1.7;
  roof.position.x = 0.9;
  roof.name = '前房顶';
  roofGroup.add(roof);

  const backGemetry = geometry.clone();
  const backRoof = new THREE.Mesh(backGemetry, materials);
  backRoof.rotation.x = Math.PI / 2;
  backRoof.rotation.y = (Math.PI / 5) * 0.5;
  backRoof.position.y = 1.7;
  backRoof.position.x = -0.9;
  backRoof.name = '后房顶';
  roofGroup.add(backRoof);
}

// 地板
function addfloor() {
  const texture = loader.load('floor.jpg');
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.repeat.set(50, 50);
  const geometry = new THREE.PlaneGeometry(3, 3);
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const floor = new THREE.Mesh(geometry, material);
  floor.name = '地板';
  floor.rotation.x = Math.PI / 2;
  floor.position.y = 0.01;
  houseGroup.add(floor);
}

// 门框
let door, pAnimation, rAnimation;
function addDoor() {
  const doorShape = new THREE.Shape();
  doorShape.moveTo(-0.25, 0);
  doorShape.lineTo(-0.25, 0.8);
  doorShape.lineTo(0.25, 0.8);
  doorShape.lineTo(0.25, 0);
  doorShape.lineTo(-0.25, 0);

  const doorFrameShape = new THREE.Path();
  doorFrameShape.moveTo(-0.2, 0.05);
  doorFrameShape.lineTo(-0.2, 0.75);
  doorFrameShape.lineTo(0.2, 0.75);
  doorFrameShape.lineTo(0.2, 0.05);
  doorFrameShape.lineTo(-0.2, 0.05);

  doorShape.holes.push(doorFrameShape);

  const doorFrameGeometry = new THREE.ExtrudeGeometry(doorShape, extrudeOption);
  const doorFrameMaterial = new THREE.MeshBasicMaterial({ color: 'silver' });
  const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
  doorGroup.add(doorFrame);

  const doorGeometry = new THREE.BoxGeometry(0.45, 0.72, 0.04);
  const doorMaterial = new THREE.MeshLambertMaterial({
    map: loader.load('door.jpg'),
  });
  door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.name = '门板';
  door.position.set(0, 0.4, 0.05);
  pAnimation = anime({
    targets: door.position,
    easing: 'linear',
    duration: 500,
    autoplay: false,
    x: -0.165,
    y: 0.4,
    z: -0.126,
  });
  rAnimation = anime({
    targets: door.rotation,
    easing: 'linear',
    duration: 500,
    autoplay: false,
    x: 0,
    y: 1.2,
    z: 0,
  });

  doorGroup.add(door);
  doorGroup.position.x = 1.41;
  doorGroup.position.z = 0.05;
  doorGroup.rotation.y = Math.PI / 2;
}

// 房子
function addHouse() {
  addSideWall();
  addAroundWall();
  addRoof();
  addDoor();
  addfloor();
  houseGroup.add(wallGroup);
  houseGroup.add(roofGroup);
  houseGroup.add(doorGroup);
  threeState.scene?.add(houseGroup);
}

// 光照
function addLight() {
  // 半球光
  const hemi = new THREE.HemisphereLight(0xffffff, 0x000000);
  threeState.scene?.add(hemi);
}

// 开门/关门
function addRaycaster() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  threeState.renderer.domElement.addEventListener('click', (e) => {
    // 归一化坐标
    const px = e.offsetX;
    const py = e.offsetY;
    mouse.x = (px / width) * 2 - 1;
    mouse.y = -(py / height) * 2 + 1;
    // 使用当前相机和映射点修改当前射线属性
    raycaster.setFromCamera(mouse, threeState.camera!);
    // 计算物体和射线的交点
    let intersects = raycaster.intersectObjects(threeState.scene!.children);
    if (intersects.length > 0) {
      // 取第一个元素, 并将其改变颜色
      const doorObj = intersects.find((item) => item.object.name === '门板');
      if (doorObj) {
        if (doorObj.object.position.x < 0 || pAnimation!.completed) {
          pAnimation!.reverse();
          rAnimation!.reverse();
        }
        pAnimation!.restart();
        rAnimation!.restart();
      }
    }
  });
}

function addGUI() {
  const gui = new GUI();
  const guiA = gui.addFolder('门的位置').close();
  const params = {
    x: door!.position.x,
    y: door!.position.y,
    z: door!.position.z,
    rx: door!.rotation.x,
    ry: door!.rotation.y,
    rz: door!.rotation.z,
  };
  guiA
    .add(params, 'x', -5, 5, 0.001)
    .name('x')
    .onChange((val: number) => {
      door!.position.x = val;
    });
  guiA
    .add(params, 'y', -5, 5, 0.001)
    .name('y')
    .onChange((val: number) => {
      door!.position.y = val;
    });
  guiA
    .add(params, 'z', -5, 5, 0.001)
    .name('z')
    .onChange((val: number) => {
      door!.position.z = val;
    });
  guiA
    .add(params, 'rx', -5, 5, 0.001)
    .name('rx')
    .onChange((val: number) => {
      door!.rotation.x = val;
    });
  guiA
    .add(params, 'ry', -5, 5, 0.001)
    .name('ry')
    .onChange((val: number) => {
      door!.rotation.y = val;
    });
  guiA
    .add(params, 'rz', -5, 5, 0.001)
    .name('rz')
    .onChange((val: number) => {
      door!.rotation.z = val;
    });
}

function render() {
  threeState.renderer.render(threeState.scene!, threeState.camera!);
  stats.value?.update();
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
  addPlane();
  addHouse();
  addRaycaster();
  addLight();
  render();
  // addGUI();
  stats.value!.dom.style.left = '250px';
  stats.value!.dom.style.top = '60px';
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>

<style lang="scss" scoped></style>
