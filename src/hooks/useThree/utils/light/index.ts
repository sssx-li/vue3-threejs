import {
  AmbientLight,
  AmbientLightProbe,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  HemisphereLightHelper,
  HemisphereLightProbe,
  PointLight,
  PointLightHelper,
  RectAreaLight,
  SpotLight,
  SpotLightHelper,
} from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { ILight, TLight } from './type';
export * from './type';

export function createLight<T extends TLight = 'AmbientLight'>(
  type: TLight | T,
  params: ILight<T> = {
    helperConfig: {},
    options: {},
    position: {},
  }
) {
  const baseOption = { color: 0xffffff, intensity: 1 };
  params.helperConfig = {
    hidden: false,
    visible: true,
    size: 1,
    ...params.helperConfig,
  };
  let lightInstance, lightHelper;
  switch (type) {
    case 'AmbientLight': // 环境光
      /**
       * 环境光
       * 
       * 环境光会均匀的照亮场景中的所有物体。
       * 环境光不能用来投射阴影，因为它没有方向。
       * 
       AmbientLight( color : Integer, intensity : Float )
          color - (参数可选）颜色的rgb数值。缺省值为 0xffffff。
          intensity - (参数可选)光照的强度。缺省值为 1。
      */
      const { options: ambient = {} } = params as ILight<'AmbientLight'>;
      lightInstance = new AmbientLight(
        ambient.color || baseOption.color,
        ambient.intensity ?? baseOption.intensity
      );
      break;
    case 'AmbientLightProbe': // 环境光探针
      const { options: ambientProbe = {} } =
        params as ILight<'AmbientLightProbe'>;
      lightInstance = new AmbientLightProbe(
        ambientProbe.color || baseOption.color,
        ambientProbe.intensity ?? baseOption.intensity
      );
      break;
    case 'DirectionalLight': // 平行光
      /**
       * 平行光
       * 
       * 平行光是沿着特定方向发射的光。这种光的表现像是无限远,从它发出的光线都是平行的。常常用平行光来模拟太阳光 的效果; 太阳足够远，因此我们可以认为太阳的位置是无限远，所以我们认为从太阳发出的光线也都是平行的。
       * 
       DirectionalLight( color : Integer, intensity : Float )
          color - (可选参数) 16进制表示光的颜色。 缺省值为 0xffffff (白色)。
          intensity - (可选参数) 光照的强度。缺省值为1。
      */
      const { options: directional = {} } =
        params as ILight<'DirectionalLight'>;
      lightInstance = new DirectionalLight(
        directional.color || baseOption.color,
        directional.intensity ?? baseOption.intensity
      );
      lightInstance.position.set(
        params.position?.x || 0,
        params.position?.y || 0,
        params.position?.z || 0
      );
      if (params.helperConfig?.visible) {
        lightHelper = new DirectionalLightHelper(
          lightInstance,
          params.helperConfig.size,
          params.helperConfig.color
        );
        lightHelper.visible = !params.helperConfig.hidden;
      }
      break;
    case 'HemisphereLight': // 半球光
      /**
       * 半球光
       * 
       * 光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色。
       * 
       HemisphereLight( skyColor : Integer, groundColor : Integer, intensity : Float )
          skyColor - (可选参数) 天空中发出光线的颜色。 缺省值 0xffffff。
          groundColor - (可选参数) 地面发出光线的颜色。 缺省值 0xffffff。
          intensity - (可选参数) 光照强度。 缺省值 1。
      */
      const { options: hemisphere = {} } = params as ILight<'HemisphereLight'>;
      lightInstance = new HemisphereLight(
        hemisphere.skyColor || 0xffffff,
        hemisphere.groundColor || 0x444444,
        hemisphere.intensity ?? 1
      );
      lightInstance.position.set(
        params.position?.x || 0,
        params.position?.y || 0,
        params.position?.z || 0
      );
      if (params.helperConfig?.visible) {
        lightHelper = new HemisphereLightHelper(
          lightInstance,
          params.helperConfig.size!,
          params.helperConfig.color
        );
        lightHelper.visible = !params.helperConfig.hidden;
      }
      break;
    case 'HemisphereLightProbe': // 半球光探针
      const { options: hemisphereProbe = {} } =
        params as ILight<'HemisphereLightProbe'>;
      lightInstance = new HemisphereLightProbe(
        hemisphereProbe.skyColor || 0xffffff,
        hemisphereProbe.groundColor || 0x444444,
        hemisphereProbe.intensity ?? 1
      );
      lightInstance.position.set(
        params.position?.x || 0,
        params.position?.y || 0,
        params.position?.z || 0
      );
      break;
    case 'PointLight': // 点光源
      /**
       * 点光源
       * 
       * 从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。
       * 该光源可以投射阴影
       * 
       PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
          color - (可选参数)) 十六进制光照颜色。 缺省值 0xffffff (白色)。
          intensity - (可选参数) 光照强度。 缺省值 1。
          distance - 这个距离表示从光源到光照强度为0的位置。 当设置为0时，光永远不会消失(距离无穷大)。缺省值 0.
          decay - 沿着光照距离的衰退量。缺省值 2。
       */
      const { options: point = {} } = params as ILight<'PointLight'>;
      lightInstance = new PointLight(
        point.color || baseOption.color,
        point.intensity ?? baseOption.intensity,
        point.distance || 0,
        point.decay ?? 2
      );
      lightInstance.position.set(
        params.position?.x || 0,
        params.position?.y || 0,
        params.position?.z || 0
      );
      if (params.helperConfig?.visible) {
        lightHelper = new PointLightHelper(
          lightInstance,
          params.helperConfig.size!,
          params.helperConfig.color
        );
        lightHelper.visible = !params.helperConfig.hidden;
      }
      break;
    case 'RectAreaLight': // 平面光光源
      /***
       * 平面光光源
       * 
       * 平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源。
       * 不支持阴影
       * 只支持 MeshStandardMaterial 和 MeshPhysicalMaterial 两种材质。
       * 你必须在你的场景中加入 RectAreaLightUniformsLib ，并调用init()。
       * 
       RectAreaLight( color : Integer, intensity : Float, width : Float, height : Float )
          color - (可选参数) 十六进制数字表示的光照颜色。缺省值为 0xffffff (白色)
          intensity - (可选参数) 光源强度／亮度 。缺省值为 1。
          width - (可选参数) 光源宽度。缺省值为 10。
          height - (可选参数) 光源高度。缺省值为 10。
       */
      const { options: rectArea = {} } = params as ILight<'RectAreaLight'>;
      lightInstance = new RectAreaLight(
        rectArea.color || baseOption.color,
        rectArea.intensity ?? baseOption.intensity,
        rectArea.width ?? 10,
        rectArea.height ?? 10
      );
      lightInstance.position.set(
        params.position?.x || 0,
        params.position?.y || 0,
        params.position?.z || 0
      );
      if (params.helperConfig?.visible) {
        lightHelper = new RectAreaLightHelper(
          lightInstance,
          params.helperConfig.color
        );
        lightHelper.visible = !params.helperConfig.hidden;
      }
      break;
    case 'SpotLight': // 聚光灯
      /**
       * 聚光灯
       * 
       * 光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大。
       * 该光源可以投射阴影
       * 
       SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
          color - (可选参数) 十六进制光照颜色。 缺省值 0xffffff (白色)。
          intensity - (可选参数) 光照强度。 缺省值 1。
          distance - 从光源发出光的最大距离，其强度根据光源的距离线性衰减。
          angle - 光线散射角度，最大为Math.PI/2。
          penumbra - 聚光锥的半影衰减百分比。在0和1之间的值。默认为0。
          decay - 沿着光照距离的衰减量。
      */
      const { options: spot = {} } = params as ILight<'SpotLight'>;
      lightInstance = new SpotLight(
        spot.color || baseOption.color,
        spot.intensity ?? baseOption.intensity,
        spot.distance || 0,
        spot.angle ?? 0.2,
        spot.penumbra || 0,
        spot.decay ?? 2
      );
      lightInstance.position.set(
        params.position?.x || 0,
        params.position?.y || 0,
        params.position?.z || 0
      );
      if (params.helperConfig?.visible) {
        lightHelper = new SpotLightHelper(
          lightInstance,
          params.helperConfig.color
        );
        lightHelper.visible = !params.helperConfig.hidden;
      }
      break;
  }
  return {
    lightInstance,
    lightHelper,
  };
}
