
# Leaflet.TrackPlayer
**语言:** [English](README.md) / [简体中文](README.zh-CN.md)
- - -
一个Leaflet轨迹播放器插件，能够根据实际行驶方向自动旋转标记图标，并动态调整已行驶和未行驶路线的颜色，清晰指示当前进度。它还支持如行驶速度、进度等其他自定义设置。详细文档见下文。
- - -
[![演示动画](https://github.com/weijun-lab/Leaflet.TrackPlayer/blob/master/examples/lib/assets/demo.gif?raw=true)](https://github.com/weijun-lab/Leaflet.TrackPlayer/blob/master/examples/lib/assets/demo.gif?raw=true)
## 🎨实时演示
<https://weijun-lab.github.io/Leaflet.TrackPlayer/>
## 安装方法
- 使用npm安装：`npm install leaflet-trackplayer`
- 或者直接下载仓库
## 使用方式
### ESM(ECMAScript Modules)
```javascript
import "leaflet-trackplayer";
```
### UMD(Universal Module Definition)
```html
<script src="Leaflet.TrackPlayer/dist/leaflet-trackplayer.umd.cjs"></script>
```
---
```javascript
let track = new L.TrackPlayer(latlngs, options).addTo(map);
```
## 代码示例
```javascript
let latlngs = [
       [
           34.291120985630914,
           108.91770583134237
       ],
       [
           34.29428596006031,
           108.9177058265846
       ],
];
let track = new L.TrackPlayer(latlngs, {
        markerIcon: L.icon({
          iconUrl: "Your image url",
        }),
        markerRotation: false,
}).addTo(map);
track.start();
track.on("progress",(progress, { lng, lat },index)=>{{
    console.log(`progress:${progress} - position:${lng},${lat} - trackIndex:${index}`)
})
```
## 文档说明
### Latlngs
用于轨迹的经纬度数据数组，与`L.polyline`的第一个参数相同。
### Options
| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| **speed** | Number | 600 | 行驶速度（公里/小时） |
| **weight** | Number | 8 | 轨迹线宽度 |
| **markerIcon** | L.icon | - | 回放过程中移动标记的图标，相当于`L.marker`的'icon'属性 |
| **polylineDecoratorOptions** | Object | {...} | 轨迹线箭头样式，参见[Leaflet.PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator) |
| **passedLineColor** | String | #0000ff | 已行驶轨迹部分的颜色 |
| **notPassedLineColor** | String | #ff0000 | 未行驶轨迹部分的颜色 |
| **panTo** | Boolean | true | 地图视图是否跟随移动标记 |
| **markerRotation** | Boolean | true | 标记是否根据移动方向自动旋转 |
| **markerRotationOrigin** | String | center | 标记旋转的原点，遵循CSS `transform-origin`规则 |
| **markerRotationOffset** | Number | 0 | 标记旋转的角度偏移量 |
### Methods
| 方法 | 返回值 | 描述 |
| --- | --- | --- |
| start() | - | 开始播放 |
| pause() | - | 暂停播放 |
| setSpeed(`<Number> speed`, `<Number> debounceTimeout?`) | - | 设置回放速度（公里/小时） |
| setProgress(`<Number> progress`) | - | 设置回放进度值至0-1之间 |
| addTo(`<Map> map`) | this | 将轨迹播放器添加到地图上 |
| remove() | - | 从地图上移除轨迹播放器 |
| on(`<String> type`, `<Function> fn`) | - | 向指定事件类型添加监听函数 |
| off(`<String> type`, `<Function> fn?`) | - | 移除传入的监听函数。如果不指定函数，则移除该事件类型的所有监听器 |
### 事件
| 事件 | 描述 |
| --- | --- |
| **start** | 当播放开始时触发 |
| **pause** | 当播放暂停时触发 |
| **finished** | 当播放完成时触发 |
| **progress** | 在播放过程中触发；回调函数接收 `progress(0-1)`、`当前位置` 和 `轨迹数组索引` |
### 属性
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| **marker** | L.marker | 轨迹上的移动标记 |
| **passedLine** | L.polyline | 已行驶轨迹线段 |
| **notPassedLine** | L.polyline | 未行驶轨迹线段 |
| **polylineDecorator** | L.polylineDecorator | 带箭头装饰的轨迹线段 |
| **options** | Object | 配置选项 |
## 致谢与参考资源
我对以下开源插件深表感谢，它们为本插件的功能提供了关键支持。
* [turf](https://github.com/Turfjs/turf) —— 一款JavaScript编写的模块化地理空间引擎
* [Leaflet.PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator) —— 定义并沿现有线段或坐标路径绘制图案
* [Leaflet.RotatedMarker](https://github.com/bbecquet/Leaflet.RotatedMarker) —— 提供Leaflet中标记的旋转功能

