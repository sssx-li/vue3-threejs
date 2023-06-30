import { LineBasicMaterial, LineDashedMaterial } from 'three';
import { ILineMaterialOptions, TLineMaterial } from './type';

// 判断线条材质
export function isLineMateralType<T extends TLineMaterial>(
  type: TLineMaterial,
  value: T
) {
  return type === value;
}

// 创建线条材质
export function createLineMateral<
  T extends TLineMaterial = 'LineBasicMaterial'
>(type: T, isdashed = false, options: ILineMaterialOptions[T]) {
  let material;
  if (isLineMateralType<T>('LineDashedMaterial', type) && !isdashed) {
    material = new LineBasicMaterial({
      color: 0x0000ff,
      ...options,
    });
  } else {
    material = new LineDashedMaterial({
      color: 0x0000ff,
      ...options,
    });
  }
  return material;
}
