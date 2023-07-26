import type { CurveType } from 'three';

import { ILineMaterialOptions, TLineMaterial } from '../line/type';
import { ICoordinate, IVector } from '../../type';

export interface ICurveType {
  ArcCurve: {
    aX?: number; // 圆的中心的X坐标，默认值为0。
    aY?: number; // 圆的中心的Y坐标，默认值为0。
    aRadius?: number; // 圆的半径
    aStartAngle?: number; // 以弧度来表示，从正X轴算起曲线开始的角度，默认值为0。
    aEndAngle?: number; // 以弧度来表示，从正X轴算起曲线终止的角度，默认值为2 x Math.PI。
    aClockwise?: boolean; // 椭圆是否按照顺时针方向来绘制，默认值为false。
  }; // 弧线
  CatmullRomCurve3: {
    points: IVector['Vector3'][]; // 三维点数组
    closed?: boolean; // 该曲线是否闭合，默认值为false
    curveType?: CurveType; // 曲线的类型，默认值为centripetal。
    tension?: number; // 曲线的张力，默认为0.5。
  }; // 使用Catmull-Rom算法， 从一系列的点创建一条平滑的三维样条曲线。
  CubicBezierCurve: {
    v0: IVector['Vector2']; // 起点
    v1: IVector['Vector2']; // 第一个控制点
    v2: IVector['Vector2']; // 第二个控制点
    v3: IVector['Vector2']; // 终点
  }; // 创建一条平滑的二维 三次贝塞尔曲线， 由起点、终点和两个控制点所定义。
  CubicBezierCurve3: {
    v0: IVector['Vector3']; // 起点
    v1: IVector['Vector3']; // 第一个控制点
    v2: IVector['Vector3']; // 第二个控制点
    v3: IVector['Vector3']; // 终点
  }; // 创建一条平滑的三维 三次贝塞尔曲线， 由起点、终点和两个控制点所定义。
  EllipseCurve: {
    aX?: number; // 椭圆的中心的X坐标，默认值为0。
    aY?: number; // 椭圆的中心的Y坐标，默认值为0。
    xRadius?: number; // X轴向上椭圆的半径，默认值为1。
    yRadius?: number; // y轴向上椭圆的半径，默认值为1。
    aStartAngle?: number; // 以弧度来表示，从正X轴算起曲线开始的角度，默认值为0。
    aEndAngle?: number; // 以弧度来表示，从正X轴算起曲线终止的角度，默认值为2 x Math.PI。
    aClockwise?: boolean; // 椭圆是否按照顺时针方向来绘制，默认值为false。
    aRotation?: number; // 以弧度表示，椭圆从X轴正方向逆时针的旋转角度（可选），默认值为0。
  }; // 创建一个形状为椭圆的曲线。 将xRadius与yRadius设为相等的值它将会成为一个圆。
  LineCurve: {
    v1: IVector['Vector2']; // 起点
    v2: IVector['Vector2']; // 终点
  }; // 一个表示二维线段的曲线。
  LineCurve3: {
    v1: IVector['Vector3']; // 起点
    v2: IVector['Vector3']; // 终点
  }; // 一个表示三维线段的曲线。
  QuadraticBezierCurve: {
    v0: IVector['Vector2']; // 起点
    v1: IVector['Vector2']; // 中间的控制点
    v2: IVector['Vector2']; // 终点
  }; // 创建一条平滑的二维 二次贝塞尔曲线， 由起点、终点和一个控制点所定义。
  QuadraticBezierCurve3: {
    v0: IVector['Vector3'];
    v1: IVector['Vector3'];
    v2: IVector['Vector3'];
  }; // 创建一条平滑的三维 二次贝塞尔曲线， 由起点、终点和一个控制点所定义。
  SplineCurve: {
    points: IVector['Vector2'][];
  }; // 从一系列的点中，创建一个平滑的二维样条曲线。内部使用Interpolations.CatmullRom来创建曲线。
}

export type TCurve = keyof ICurveType;

export interface ICurve<
  T extends TCurve = 'ArcCurve',
  D extends TLineMaterial = 'LineBasicMaterial'
> {
  lineconfig?: {
    type?: TLineMaterial | D; // 线条渲染类型
    pointsCount?: number; // 要将曲线划分为的分段数
    options?: ILineMaterialOptions[D];
  }; // 线条材质配置
  options: ICurveType[T]; // 曲线配置
  position?: Partial<ICoordinate>; // 弧线位移位置
}
