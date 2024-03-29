
# Leafelt.TrackPlayer
A Leaflet trajectory playback plugin that automatically rotates the marker icon based on the actual direction of travel and dynamically adjusts the colors of the traveled and untraveled distances to clearly indicate the current progress. It also supports custom settings such as driving speed, among other features. Detailed documentation can be found below.
![](https://github.com/weijun-lab/Leaflet.TrackPlayer/blob/master/examples/lib/assets/id3wq-8ynjk.gif?raw=true)
## 🎨Live Demo
<https://weijun-lab.github.io/Leaflet.TrackPlayer/>
## Installation
* `npm install leaflet-trackplayer`
* Or download the repository
## Usage
### ESM(ECMAScript Modules)
```js
import  "leaflet-trackplayer";
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
        marker: L.marker(latlngs[0]),
        markerRotation: false,
}).addTo(map);
track.start();
track.on("moving",(latLng)=>{{
    console.log(latLng)
})
```
## Documentation

### Latlngs
An array of latitude and longitude data for the trajectory, which is the same as the first parameter for `L.polyline`.
### Options

| Options | Type | Default | Description |
| --- | --- | --- | --- |
| **speed** | Number | 600 | Travel speed (km/h)
| **weight** | Number | 8 | Width of the trajectory line |
| **marker** | L.marker | - | The moving marker during playback |
| **polylineDecoratorOptions** | Object | {...} | Arrowhead styles for the trajectory line, see[Leaflet.PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator) |
| **passedLineColor** | String | #0000ff | Color of the traveled portion of the trajectory line |
| **notPassedLineColor** | String | #ff0000 | Color of the untraveled portion of the trajectory line |
| **panTo** | Boolean | true | Whether the map view follows the moving marke |
| **markerRotation** | Boolean | true | Whether the marker auto-rotates according to the direction of movement |
| **markerRotationOrigin** | String | center | The rotation origin of the marker, follows the CSS `transform-origin` rule |
| **markerRotationOffset** | Number | 0 | The angle offset for marker rotation |
### Event
| Event | Description |
| --- | --- |
| **start** | Triggered when playback starts
| **pause** | Triggered when playback is paused
| **finished** | Triggered when playback completes
| **moving** | Triggered during playback; receives the current location in the callback function


## Methods
| Methods | Return | Description |
| --- | --- | --- |
| start() | - | Start playback |
| pause() | - | Pause playback |
| setSpeed(`<Number> speed`) | - | Set the playback speed (km/h) |
| addTo(`<Map> map`) | this | Adds the track player to the map |
| remove() | - | Removes the track player from the map |
| on(`<String> type,<Function> fn`) | - | Adds a listener function to the specified event type |
| off(`<String> type,<Function> fn？`) | - | Removes the passed-in listener function. If no function is specified, removes all listeners for the event type. |
## Properties
| Properties | Type | Description |
| --- | --- | --- |
|**passedLine**| L.polyline | The traveled part of the trajectory line | 
|**notPassedLine**| L.polyline | The untraveled part of the trajectory line |
|**polylineDecorator**| L.polylineDecorator | The arrowhead-decorated polyline |
|**options**| Object | Configuration options |

# 🎉Acknowledgements & References
We extend our gratitude to the following open-source plugins, which have provided essential support for the functionality.
* [turf](https://github.com/Turfjs/turf) A modular geospatial engine written in JavaScript
* [Leaflet.PolylineDecorator](https://github.com/bbecquet/Leaflet.PolylineDecorator) Defines and draws patterns along existing polylines or coordinate paths
* [Leaflet.RotatedMarker](https://github.com/bbecquet/Leaflet.RotatedMarker) Provides rotation functionality for markers in Leaflet

