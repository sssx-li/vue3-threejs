import { LineBasicMaterial, LineDashedMaterial } from 'three';
import { ILineType, TLine } from './type';

// 创建线条材质
export function createLineMateral<T extends TLine = 'LineBasicMaterial'>(
  isdashed = false,
  options: ILineType[T]
) {
  let material;
  if (!isdashed) {
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
