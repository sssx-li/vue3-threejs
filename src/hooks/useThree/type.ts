import * as THREE from 'three';
import type { LineMaterialParameters } from 'three/examples/jsm/lines/LineMaterial';

export interface IWH {
  width: number;
  height: number;
}

export interface IHelper {
  axesHelperSize?: number; // 坐标辅助线的size
}
export interface IConfig<T = any> extends Partial<IWH> {
  cameraType?: TCamera; // 相机类型
  camera?: T;
  scene?: THREE.Scene; // 场景
  renderOptions?: THREE.WebGLRendererParameters; // 渲染器
  enableControl?: boolean; // 是否启用轨道控制器, 默认为true
  enableAxesHelper?: boolean; // 是否启用坐标辅助线, 默认为false
  helperConfig?: IHelper;
}

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

export interface IThreeState<T = any>
  extends Omit<IConfig<T>, 'renderOptions'> {
  renderer: THREE.WebGLRenderer;
}

export interface IThree {
  config: Omit<IConfig, 'camera' | 'scene'>;
  cameraOptions: ICameraOption;
  renderFn?: () => void;
}

export interface ILine {
  points: number[] | Float32Array; // 线条点数据集合
  lineOptions?: LineMaterialParameters; // 线条配置
}
