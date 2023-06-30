import { ObjToUnion } from '@/typing';
import type { CurveType, Vector2, Vector3 } from 'three';

import { ILineType, TLine } from '../line/type';

export interface ICurveType {
  ArcCurve: {
    aX?: number;
    aY?: number;
    aRadius?: number;
    aStartAngle?: number;
    aEndAngle?: number;
    aClockwise?: boolean;
  }; // 弧线
  CatmullRomCurve3: {
    points?: Vector3[];
    closed?: boolean;
    curveType?: CurveType;
    tension?: number;
  }; // 使用Catmull-Rom算法， 从一系列的点创建一条平滑的三维样条曲线。
  CubicBezierCurve: {
    v0?: Vector2;
    v1?: Vector2;
    v2?: Vector2;
    v3?: Vector2;
  }; // 创建一条平滑的二维 三次贝塞尔曲线， 由起点、终点和两个控制点所定义。
  CubicBezierCurve3: {
    v0?: Vector3;
    v1?: Vector3;
    v2?: Vector3;
    v3?: Vector3;
  }; // 创建一条平滑的三维 三次贝塞尔曲线， 由起点、终点和两个控制点所定义。
  EllipseCurve: {
    aX?: number;
    aY?: number;
    xRadius?: number;
    yRadius?: number;
    aStartAngle?: number;
    aEndAngle?: number;
    aClockwise?: boolean;
    aRotation?: number;
  }; // 创建一个形状为椭圆的曲线。 将xRadius与yRadius设为相等的值它将会成为一个圆。
  LineCurve: {
    v1?: Vector2;
    v2?: Vector2;
  }; // 一个表示二维线段的曲线。
  LineCurve3: {
    v1?: Vector3;
    v2?: Vector3;
  }; // 一个表示三维线段的曲线。
  QuadraticBezierCurve: {
    v0?: Vector2;
    v1?: Vector2;
    v2?: Vector2;
  }; // 创建一条平滑的二维 二次贝塞尔曲线， 由起点、终点和一个控制点所定义。
  QuadraticBezierCurve3: {
    v0?: Vector3;
    v1?: Vector3;
    v2?: Vector3;
  }; // 创建一条平滑的三维 二次贝塞尔曲线， 由起点、终点和一个控制点所定义。
  SplineCurve: {
    points?: Vector2[];
  }; // 从一系列的点中，创建一个平滑的二维样条曲线。内部使用Interpolations.CatmullRom来创建曲线。
}

export type TCurve = ObjToUnion<ICurveType>;

export interface ICurve<
  T extends TCurve = 'ArcCurve',
  D extends TLine = 'LineBasicMaterial'
> {
  lineconfig?: {
    dashed?: boolean; // 是否使用虚线渲染
    pointsCount?: number; // 要将曲线划分为的分段数
    options?: ILineType[D];
  };
  options: ICurveType[T];
}
