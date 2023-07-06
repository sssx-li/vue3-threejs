import type {
  WebGLRenderer,
  Scene,
  WebGLRendererParameters,
  PerspectiveCamera,
  OrthographicCamera,
  Vector2,
  Vector3,
} from 'three';

import { ObjToUnion } from '@/typing';

export interface IWH {
  width: number;
  height: number;
}

export type TVector = 'Vector2' | 'Vector3';
// 判断Vector类型
export type isVector<T extends TVector> = T extends 'Vector2'
  ? Vector2
  : Vector3;

export interface IVector {
  Vector2: [number, number];
  Vector3: [number, number, number];
}

export interface IHelper {
  axesHelperSize?: number; // 坐标辅助线的size
}

export interface IDirection {
  left: number; // 摄像机视锥体左侧面。
  right: number; // 摄像机视锥体右侧面。
  top: number; // 摄像机视锥体上侧面。
  bottom: number; // 摄像机视锥体下侧面。
}
export interface IDistance {
  near: number; // 摄像机视锥体近端面
  far: number; // 摄像机视锥体远端面
}

export interface ICoordinate {
  x: number;
  y: number;
  z: number;
}

export interface ICameraType {
  OrthographicCamera: {
    type: OrthographicCamera;
    options: Partial<IDirection> & Partial<IDistance>;
  };
  PerspectiveCamera: {
    type: PerspectiveCamera;
    options: Partial<IDistance> & {
      fov?: number; // 摄像机视锥体垂直视野角度
      aspect?: number; // 摄像机视锥体长宽比
    };
  };
}
export type TCamera = ObjToUnion<ICameraType>;
export interface IConfig<T extends TCamera = 'OrthographicCamera'>
  extends Partial<IWH> {
  cameraType?: TCamera | T; // 相机类型
  camera?: ICameraType[T]['type'];
  scene?: Scene; // 场景
  renderOptions?: WebGLRendererParameters; // 渲染器
  enableControl?: boolean; // 是否启用轨道控制器, 默认为true
  enableAxesHelper?: boolean; // 是否启用坐标辅助线, 默认为false
  helperConfig?: IHelper;
}

export interface IThreeState<T extends TCamera = 'OrthographicCamera'>
  extends Omit<IConfig<T>, 'renderOptions'> {
  renderer: WebGLRenderer;
}

export interface IThree<T extends TCamera = 'OrthographicCamera'> {
  config: Omit<IConfig<T>, 'camera' | 'scene'>;
  cameraOptions: ICameraType[T]['options']; // 相机配置参数
  cameraPosition?: Partial<ICoordinate>; // 相机位移位置
  renderFn?: () => void; // 渲染方法
}
