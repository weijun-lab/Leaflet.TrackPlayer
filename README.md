
# Leafelt.TrackPlayer
一个leaflet轨迹播放插件，它能够根据实际行驶方向自动旋转marker图标，并且会依据行驶位置实时调整已行驶路程和未行驶路程的颜色，便于用户清晰地了解当前进度。还支持自定义设置行驶速度等功能，具体功能见下方文档。
## 🎨运行示例
<https://iosphere.github.io/Leaflet.hotline/demo/>
## 安装
* `npm install leafelt-track-player
`
* 或者下载该仓库

## 使用
### ESM
```js
import  "leafelt-track-player";
let track = new L.TrackPlayer(latlngs, options).addTo(map)
```
### UMD
```html
<script src="leafelt-track-player/dist/leaflet-measure-simplify.umd.cjs"></script>
let track = new L.TrackPlayer(latlngs, options).addTo(map)
```
## 代码示例
```js
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
        marker: L.marker(latlngs[0]),
        markerRotation: false,
}).addTo(map);
track.start();
track.on("moving",(latLng)=>{{
    console.log(latLng)
})
```
## 文档

### Latlngs
轨迹经纬度数据，与`L.polyline`的第一个参数相同。
### Options

| Options | Type | Default | Description |
| --- | --- | --- | --- |
| **speed** | Number | 600 | 行驶速度（km/h）
| **weight** | Number | 8 | 轨迹线条宽度 |
| **marker** | L.marker | - | 播放时，移动的marker |
| **polylineDecoratorOptions** | Object | {patterns: [{offset: 30, repeat: 60, symbol: L.Symbol.arrowHead({pixelSize: 5, headAngle: 75,polygon: false,pathOptions: { stroke: true,weight: 3,color: "#fff" }})}]}| 轨迹线条上的箭头样式，参见[Leaflet.PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator) |
| **passedLineColor** | String | #0000ff | 行驶过的轨迹线条的颜色 |
| **notPassedLineColor** | String | #ff0000 | 未行驶过的轨迹线条的颜色 |
| **panTo** | Boolean | true | 地图视角是否跟着marker移动 |
| **markerRotation** | Boolean | true | marker是否自动根据行进方向旋转 |
| **markerRotationOrigin** | String | center | marker旋转时的原点，与css中的`transform-origin`书写规则相同 |
| **markerRotationOffset** | Number | 0 | marker旋转时的角度偏移量 |
### Event
| Event | Description |
| --- | --- |
| **start** | 播放开始时触发
| **pause** | 播放暂停时触发
| **finished** | 播放完成时触发
| **moving** | 播放过程中触发，可在回调函数中接收到当前位置


## Methods
| Methods | Return | Description |
| --- | --- | --- |
| start() | - | 开始播放 |
| pause() | - | 暂停播放 |
| setSpeed(`<Number> speed`) | - | 设置播放速度（km/h） |
| addTo(`<Map> map`) | this | 将轨迹播放器添加到地图 |
| remove() | - | 将轨迹播放器移除 |
| on(`<String> type,<Function> fn`) | - | 将监听函数添加到指定事件类型 |
| off(`<String> type,<Function> fn？`) | - | 删除传入的监听函数。如果未指定任何函数，将删除该事件类型的所有监听函数。 |
## Properties
| Properties | Type | Description |
| --- | --- | --- |
|**passedLine**| L.polyline | 行驶过的轨迹线 | 
|**notPassedLine**| L.polyline | 未行驶过的轨迹线 |
|**polylineDecorator**| L.polylineDecorator | 箭头线条 |
|**options**| Object | 配置项 |

# 🎉致谢与引用
感谢以下开源插件，它们为功能实现提供了支持。
* [turf](https://github.com/Turfjs/turf) 模块化地理空间引擎
* [Leaflet.PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator) 用于在现有折线或沿坐标路径定义和绘制图案
* [Leaflet.RotatedMarker](https://github.com/bbecquet/Leaflet.RotatedMarker) 为Leaflet中marker提供旋转功能

