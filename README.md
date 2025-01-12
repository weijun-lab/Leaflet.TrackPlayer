
# Leafelt.TrackPlayer
- - -
**language:** [English](README.md) / [简体中文](README.zh-CN.md)
- - -
A Leaflet track playback plugin, enabling you to swiftly create stunning track replay functionality.  
一个leaflet轨迹回放插件，帮助你快速构建出精美的轨迹回放功能。
- - -
![](https://github.com/weijun-lab/Leaflet.TrackPlayer/blob/master/examples/lib/assets/demo.gif?raw=true)
## 🎨Live Demo
<https://weijun-lab.github.io/Leaflet.TrackPlayer/>
## Installation
* `npm install leaflet-trackplayer`
* Or download the repository
## Usage
### ESM(ECMAScript Modules)
```js
import  "leaflet-trackplayer";
```
### UMD(Universal Module Definition)
```html
<script src="Leaflet.TrackPlayer/dist/leaflet-trackplayer.umd.cjs"></script>
```
---
```js
let track = new L.TrackPlayer(latlngs, options).addTo(map)
```
## Code Example
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
## Documentation
### Latlngs
An array of latitude and longitude data for the trajectory, which is the same as the first parameter for `L.polyline`.
### Options
| Options | Type | Default | Description |
| --- | --- | --- | --- |
| **sourcePoints** | array[object] | [] | 包含真实航向属性的 JSON 数组，用于同步设置车辆的实际车头方向，其中每个 JSON 元素中航向的属性名为 course（范围 0~360 度），表示车头的朝向角度, markerRotationOrigin=false 时生效 。
| **speed** | Number | 600 | Travel speed (km/h)
| **weight** | Number | 8 | Width of the trajectory line |
| **markerIcon** | L.icon | - | The icon of the moving marker during playback has a value equivalent to the 'icon' property of the `L.marker`. |
| **polylineDecoratorOptions** | Object | {...} | Arrowhead styles for the trajectory line, see[Leaflet.PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator) |
| **passedLineColor** | String | #0000ff | Color of the traveled portion of the trajectory line |
| **notPassedLineColor** | String | #ff0000 | Color of the untraveled portion of the trajectory line |
| **panTo** | Boolean | true | Whether the map view follows the moving marke |
| **markerRotation** | Boolean | true | Whether the marker auto-rotates according to the direction of movement |
| **markerRotationOrigin** | String | center | The rotation origin of the marker, follows the CSS `transform-origin` rule |
| **markerRotationOffset** | Number | 0 | The angle offset for marker rotation |
### Methods
| Methods | Return | Description |
| --- | --- | --- |
| start() | - | Start playback |
| pause() | - | Pause playback |
| setSpeed(`<Number> speed,<Number> debounceTimeout?`) | - | Set the playback speed (km/h) |
| setProgress(`<Number> progress`) | - | Set the playback progress value to 0-1|
| addTo(`<Map> map`) | this | Adds the track player to the map |
| remove() | - | Removes the track player from the map |
| on(`<String> type,<Function> fn`) | - | Adds a listener function to the specified event type |
| off(`<String> type,<Function> fn？`) | - | Removes the passed-in listener function. If no function is specified, removes all listeners for the event type. |
### Event
| Event | Description |
| --- | --- |
| **start** | Triggered when playback starts
| **pause** | Triggered when playback is paused
| **finished** | Triggered when playback completes
| **progress** | Triggered during playback; receives the `progress(0-1)` and `current location` and `track array index` in the callback function
## Properties
| Properties | Type | Description |
| --- | --- | --- |
|**marker**| L.marker | Moving marker on the trajectory |
|**passedLine**| L.polyline | The traveled part of the trajectory line |
|**notPassedLine**| L.polyline | The untraveled part of the trajectory line |
|**polylineDecorator**| L.polylineDecorator | The arrowhead-decorated polyline |
|**options**| Object | Configuration options |
# 🎉Acknowledgements & References
I gratitude to the following open-source plugins, which have provided essential support for the functionality.
* [turf](https://github.com/Turfjs/turf) A modular geospatial engine written in JavaScript
* [Leaflet.PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator) Defines and draws patterns along existing polylines or coordinate paths
* [Leaflet.RotatedMarker](https://github.com/bbecquet/Leaflet.RotatedMarker) Provides rotation functionality for markers in Leaflet

