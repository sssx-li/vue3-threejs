import * as THREE from 'three';

// camera
export type TCamera = 'OrthographicCamera' | 'PerspectiveCamera';
export interface ICameraOption {
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

export interface IConfig<T = any> {
  width?: number;
  height?: number;
  cameraType?: TCamera; // 相机类型
  camera?: T;
  scene?: THREE.Scene; // 场景
  renderOptions?: THREE.WebGLRendererParameters; // 渲染器
}

export interface IThreeState<T = any>
  extends Omit<IConfig<T>, 'renderOptions'> {
  renderer: THREE.WebGLRenderer;
}

export interface IThree {
  config: Omit<IConfig, 'camera' | 'scene'>;
  cameraOptions: ICameraOption;
  initFn?: () => void;
}
