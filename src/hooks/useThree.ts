import * as THREE from 'three';

type TCamera = 'OrthographicCamera' | 'PerspectiveCamera';

interface IOption<T = any> {
  width?: number;
  height?: number;
  cameraType?: TCamera; // 相机类型
  camera?: T;
  scene?: THREE.Scene; // 场景
  renderer?: THREE.WebGLRenderer; // 渲染器
}

interface IExt {
  left?: number; // 摄像机视锥体左侧面。
  right?: number; // 摄像机视锥体右侧面。
  top?: number; // 摄像机视锥体上侧面。
  bottom?: number; // 摄像机视锥体下侧面。
  near?: number; // 摄像机视锥体近端面
  far?: number; // 摄像机视锥体远端面
  // PerspectiveCamera
  fov?: number; // 摄像机视锥体垂直视野角度
  aspect?: number; // 摄像机视锥体长宽比
}

interface IThree {
  id: string;
  options: Omit<IOption, 'camera'>;
  ext: IExt;
  initFn?: () => void;
}

export function useThree(params: IThree) {
  const {
    id,
    options: {
      width = window.innerWidth,
      height = window.innerHeight,
      cameraType = 'PerspectiveCamera',
      scene = new THREE.Scene(),
      renderer = new THREE.WebGLRenderer({
        antialias: true, // 是否抗锯齿
      }),
    },
    ext: {
      left = 0,
      top = 0,
      right = 0,
      bottom = 0,
      near = 1,
      far = 1000,
      fov = 0,
      aspect = 0,
    },
  } = params;
  let camera;
  switch (cameraType) {
    case 'OrthographicCamera':
      camera = new THREE.OrthographicCamera(
        left,
        right,
        top,
        bottom,
        near,
        far
      );
      break;
    case 'PerspectiveCamera':
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      break;
    default:
      break;
  }
  const threeState: IOption<typeof camera> = {
    width,
    height,
    scene,
    camera,
    renderer,
  };
  // 设置渲染器宽高
  threeState.renderer?.setSize(width!, height!);
  // 设置渲染器背景颜色及其透明度
  // threeState.renderer?.setClearColor(0xb9d3ff, 1);

  nextTick(() => {
    document.getElementById(id)?.appendChild(threeState.renderer!.domElement);
    params.initFn && params.initFn();
  });
  return {
    THREE,
    threeState,
  };
}
