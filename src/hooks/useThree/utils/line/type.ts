import type {
  LineBasicMaterialParameters,
  LineDashedMaterialParameters,
} from 'three';
import type { LineMaterialParameters } from 'three/examples/jsm/lines/LineMaterial';

import { IWH } from '@/hooks/useThree/type';
import { ObjToUnion } from '@/typing';

export interface ILine<T extends TLine = 'LineBasicMaterial'> {
  dashed?: boolean;
  points?: [number, number, number][];
  options?: ILineType[T];
  useLine2?: boolean; // 是否使用 useLine2
  line2Options?: ILine2;
}

export interface ILine2 extends Partial<IWH> {
  points: number[] | Float32Array; // 线条点数据集合
  options?: LineMaterialParameters; // 线条配置
}

export interface ILineType {
  LineBasicMaterial: LineBasicMaterialParameters;
  LineDashedMaterial: LineDashedMaterialParameters;
}

export type TLine = ObjToUnion<ILineType>;
