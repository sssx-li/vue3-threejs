import { ObjToUnion } from '@/typing';
import type { ColorRepresentation } from 'three';

interface ILightBaseOptions {
  color?: ColorRepresentation; // 颜色的rgb数值。缺省值为 0xffffff。
  intensity?: number; // 光照的强度。缺省值为 1。
}

interface IHemisphere extends Omit<ILightBaseOptions, 'color'> {
  skyColor?: ColorRepresentation; // 天空中发出光线的颜色。 缺省值 0xffffff。
  groundColor?: ColorRepresentation; // 地面发出光线的颜色。 缺省值 0xffffff。
}

export interface ILightType {
  AmbientLight: ILightBaseOptions; // 环境光
  AmbientLightProbe: ILightBaseOptions; // 环境光探针
  DirectionalLight: ILightBaseOptions; // 平行光
  HemisphereLight: IHemisphere; // 半球光
  HemisphereLightProbe: IHemisphere; // 半球光探针
  PointLight: ILightBaseOptions & {
    distance?: number; // 这个距离表示从光源到光照强度为0的位置
    decay?: number; // 沿着光照距离的衰退量
  }; // 点光源
  RectAreaLight: ILightBaseOptions & {
    width?: number; // 光源宽度
    height?: number; // 光源高度
  }; // 平面光光源
  SpotLight: ILightBaseOptions & {
    distance?: number; // 从光源发出光的最大距离，其强度根据光源的距离线性衰减
    angle?: number; // 光线散射角度，最大为Math.PI/2。
    penumbra?: number; // 聚光锥的半影衰减百分比。在0和1之间的值。默认为0。
    decay?: number; // 沿着光照距离的衰减量。
  }; // 聚光灯
}

export type TLight = ObjToUnion<ILightType>;

export interface ILight<T extends TLight = 'AmbientLight'> {
  helperConfig?: {
    hidden?: boolean; // 是否隐藏光源辅助对象
    visible?: boolean; // 是否展示光源辅助对象(实例创建)
    size?: number; // 平面的尺寸. 默认为 1.
    color?: ColorRepresentation; // 如果没有设置颜色将使用光源的颜色.
  };
  options?: ILightType[T];
  position?: { x?: number; y?: number; z?: number };
}
