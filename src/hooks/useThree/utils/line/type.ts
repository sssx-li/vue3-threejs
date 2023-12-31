import type {
  LineBasicMaterialParameters,
  LineDashedMaterialParameters,
} from 'three';
import type { LineMaterialParameters } from 'three/examples/jsm/lines/LineMaterial';

import { ICoordinate, IVector, IWH } from '@/hooks/useThree/type';

export interface ILineMaterialOptions {
  LineBasicMaterial: LineBasicMaterialParameters; // 基础材质参数
  LineDashedMaterial: LineDashedMaterialParameters; // 虚线材质参数
}
export type TLineMaterial = keyof ILineMaterialOptions;

export interface ILine2 extends Partial<IWH> {
  points: number[] | Float32Array; // 线条点数据集合
  options?: LineMaterialParameters; // 线条配置
}

export interface ILine<T extends TLineMaterial = 'LineBasicMaterial'> {
  type?: TLineMaterial | T; // 线条材质类型
  points?: IVector['Vector3'][]; // 三维坐标点
  position?: Partial<ICoordinate>; // 线条位移位置
  options?: ILineMaterialOptions[T]; // 材质配置参数
  useLine2?: boolean; // 是否使用 useLine2
  line2Options?: ILine2; // line2材质配置
}
