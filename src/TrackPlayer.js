import L from "leaflet";
import * as turf from "@turf/turf";
import "leaflet-polylinedecorator";
import "leaflet-rotatedmarker";
L.TrackPlayer = class {
  constructor(track, options = {}) {
    this.options = {
      speed: options.speed ?? 600,
      weight: options.weight ?? 8,
      marker: options.marker,
      polylineDecoratorOptions: options.polylineDecoratorOptions ?? {
        patterns: [
          {
            offset: 30,
            repeat: 60,
            symbol: L.Symbol.arrowHead({
              pixelSize: 5,
              headAngle: 75,
              polygon: false,
              pathOptions: { stroke: true, weight: 3, color: "#fff" },
            }),
          },
        ],
      },
      passedLineColor: options.passedLineColor ?? "#0000ff",
      notPassedLineColor: options.notPassedLineColor ?? "#ff0000",
      panTo: options.panTo ?? true,
      markerRotationOrigin: options.markerRotationOrigin ?? "center",
      markerRotationOffset: options.markerRotationOffset ?? 0,
      markerRotation: options.markerRotation ?? true,
      progress: options.progress ?? 0,
    };
    this.markerInitLnglat = options.marker ? options.marker.getLatLng() : "";

    this.isPaused = true;
    this.pauseDuration = 0;
    this.advances = 0;
    this.advancesTemp = 0;

    //格式化传入的轨迹数组，目的是传入的轨迹数组可以是任意格式（[{lng:xx,lat:xx}]/[[xx,xx]]）
    let _track = L.polyline(track)._latlngs;
    this.track = turf.lineString(_track.map(({ lng, lat }) => [lng, lat]));
    //被监听的事件
    this.listenedEvents = {
      start: [],
      pause: [],
      finished: [],
      movingCallback: [],
      progressCallback: [],
    };
  }
  addTo(map) {
    this.map = map;
    if (this.options.marker) {
      this.options.marker.addTo(this.map);

      if (this.options.markerRotation) {
        let coordinates = this.track.geometry.coordinates;
        this.options.marker.setRotationAngle(
          turf.bearing(coordinates[0], coordinates[1]) / 2 +
            this.options.markerRotationOffset / 2
        );
        this.options.marker.setRotationOrigin(
          this.options.markerRotationOrigin
        );
      }
    }

    this.createLine();
    return this;
  }
  remove() {
    if (this.polylineDecorator) {
      this.polylineDecorator.remove();
      this.polylineDecorator = null;
      this.notPassedLine.remove();
      this.notPassedLine = null;
      this.passedLine.remove();
      this.passedLine = null;
      if (this.options.marker) {
        this.options.marker.remove();
        this.options.marker.setLatLng(this.markerInitLnglat);
      }
      this.finished = false;
      this.startTimestamp = 0;
      this.pauseTimestamp = 0;
      this.advancesTemp = 0;
      this.advances = 0;
      this.pause();
    }
  }
  createLine() {
    let path = this.track.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    this.notPassedLine = L.polyline(path, {
      weight: this.options.weight,
      color: this.options.notPassedLineColor,
    }).addTo(this.map);
    this.passedLine = L.polyline([], {
      weight: this.options.weight,
      color: this.options.passedLineColor,
    }).addTo(this.map);
    this.polylineDecorator = L.polylineDecorator(
      path,
      this.options.polylineDecoratorOptions
    ).addTo(this.map);
  }
  start() {
    if (!this.isPaused || !this.polylineDecorator) return;
    if (
      (this.finished && this.options.progress === 0) ||
      this.options.progress === 100
    ) {
      this.finished = false;
      this.startTimestamp = 0;
      this.pauseTimestamp = 0;
      this.advancesTemp = 0;
      this.advances = 0;
    }
    this.isPaused = false;
    if (this.pauseTimestamp && this.startTimestamp) {
      this.startTimestamp =
        this.startTimestamp + (Date.now() - this.pauseTimestamp);
    }
    this.startAction();
    this.listenedEvents.start.forEach((item) => item());
  }
  pause() {
    if (this.isPaused) return;
    cancelAnimationFrame(this.reqId);
    this.pauseTimestamp = Date.now();
    this.isPaused = true;
    this.listenedEvents.pause.forEach((item) => item());
  }
  startAction() {
    //计算轨迹总长度
    let distance = turf.length(this.track);
    //开始播放轨迹
    let player = (timestamp) => {
      if (timestamp && !this.isPaused) {
        let duration = (distance / this.options.speed) * 3600 * 1000; // 跑多远/ms
        this.startTimestamp ||= timestamp;
        let progress = timestamp - this.startTimestamp; //时间过去了多久
        this.advances = distance * (progress / duration) + this.advancesTemp; //根据当前时间计算要下一个点位要前进多远距离
        let [lng, lat] = turf.along(this.track, this.advances).geometry
          .coordinates;
        this.markerPoint = [lat, lng];
        if (this.options.panTo) {
          this.map.panTo(this.markerPoint, {
            animate: false,
          });
        }
        this.options.marker && this.options.marker.setLatLng(this.markerPoint);
        //计算未经过的轨迹
        if (this.advances >= distance) {
          this.notPassedLine.setLatLngs([]);
        } else {
          let sliced = turf.lineSliceAlong(this.track, this.advances);
          this.notPassedLine.setLatLngs(
            sliced.geometry.coordinates.map(([lng, lat]) => [lat, lng])
          );
        }
        //计算已经过的路径
        if (this.advances > 0) {
          let sliced = turf.lineSliceAlong(this.track, 0, this.advances);
          this.passedLine.setLatLngs(
            sliced.geometry.coordinates.map(([lng, lat]) => [lat, lng])
          );
        }
        if (this.advances < distance) {
          //根据当前点截取线段
          let sliced = turf.lineSlice(
            turf.point([lng, lat]),
            turf.point(this.track.geometry.coordinates.at(-1)),
            this.track
          );
          if (this.options.markerRotation && this.options.marker) {
            //计算当前点位到下一个点位的角度
            let coordinates = sliced.geometry.coordinates;
            let bearing = turf.bearing(
              turf.point(coordinates[0]),
              turf.point(coordinates[1])
            );
            this.options.marker.setRotationAngle(
              bearing / 2 + this.options.markerRotationOffset / 2
            );
          }
        }
        this.listenedEvents.movingCallback.forEach((item) =>
          item(L.latLng(...this.markerPoint))
        );
        // 或者把进度直接传给"moving"事件，是不是好一些
        if (this.advances <= distance) {
          this.options.progress = Math.ceil((this.advances / distance) * 100);
          this.listenedEvents.progressCallback.forEach((item) =>
            item(L.latLng(...this.markerPoint), this.options.progress)
          );
        }
        if (this.advances > distance) {
          this.isPaused = true;
          this.finished = true;
          this.listenedEvents.finished.forEach((item) => item());
          if (this.options.markerRotation && this.options.marker) {
            //播放完成时将marker旋转角设置为倒数第二个位置和倒数第一个位置形成的角度
            //为了解决立刻页面，再切回来时marker直接移动完成导致旋转角度计算不准确的问题
            let coordinates = this.track.geometry.coordinates;
            let bearing = turf.bearing(
              turf.point(coordinates.at(-2)),
              turf.point(coordinates.at(-1))
            );
            this.options.marker.setRotationAngle(
              bearing / 2 + this.options.markerRotationOffset / 2
            );
          }
          return;
        }
      }

      this.reqId = requestAnimationFrame(player);
    };
    player();
  }
  setSpeed(speed, wait = 20) {
    //函数防抖
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.setSpeedAction(speed);
    }, wait);
  }
  setSpeedAction(speed) {
    this.options.speed = speed;
    this.advancesTemp = this.advances; //记录当前点位已经前进了多少距离了
    this.startTimestamp = 0;
  }
  setProgress(progress, wait = 20) {
    //函数防抖
    clearTimeout(this.timeoutProgressId);
    this.timeoutProgressId = setTimeout(() => {
      this.setProgressAction(progress);
    }, wait);
  }
  setProgressAction(progress) {
    let distance = turf.length(this.track);
    this.options.progress = progress;
    this.advancesTemp = distance * (progress / 100);
    this.startTimestamp = 0;
    // 对于暂停跟完成状态，调整进度。
    if (this.isPaused || this.finished) {
      this.advances = distance * (progress / 100);
      let [lng, lat] = turf.along(this.track, this.advances).geometry
        .coordinates;
      this.markerPoint = [lat, lng];
      if (this.options.panTo) {
        this.map.panTo(this.markerPoint, {
          animate: false,
        });
      }
      this.options.marker && this.options.marker.setLatLng(this.markerPoint);
      if (this.advances >= distance) {
        this.notPassedLine.setLatLngs([]);
      } else {
        let sliced = turf.lineSliceAlong(this.track, this.advances);
        this.notPassedLine.setLatLngs(
          sliced.geometry.coordinates.map(([lng, lat]) => [lat, lng])
        );
      }
      if (this.advances > 0) {
        let sliced = turf.lineSliceAlong(this.track, 0, this.advances);
        this.passedLine.setLatLngs(
          sliced.geometry.coordinates.map(([lng, lat]) => [lat, lng])
        );
      }
      if (this.advances < distance) {
        let sliced = turf.lineSlice(
          turf.point([lng, lat]),
          turf.point(this.track.geometry.coordinates.at(-1)),
          this.track
        );
        if (this.options.markerRotation && this.options.marker) {
          let coordinates = sliced.geometry.coordinates;
          let bearing = turf.bearing(
            turf.point(coordinates[0]),
            turf.point(coordinates[1])
          );
          this.options.marker.setRotationAngle(
            bearing / 2 + this.options.markerRotationOffset / 2
          );
        }
      }
      if (this.advances >= distance) {
        this.isPaused = true;
        this.finished = true;
        this.listenedEvents.finished.forEach((item) => item());
        if (this.options.markerRotation && this.options.marker) {
          let coordinates = this.track.geometry.coordinates;
          let bearing = turf.bearing(
            turf.point(coordinates.at(-2)),
            turf.point(coordinates.at(-1))
          );
          this.options.marker.setRotationAngle(
            bearing / 2 + this.options.markerRotationOffset / 2
          );
        }
        return;
      }
    }
  }
  on(evetName, callback) {
    switch (evetName) {
      case "start":
        this.listenedEvents.start.push(callback);
        break;
      case "pause":
        this.listenedEvents.pause.push(callback);
        break;
      case "finished":
        this.listenedEvents.finished.push(callback);
        break;
      case "moving":
        this.listenedEvents.movingCallback.push(callback);
        break;
      case "progress":
        this.listenedEvents.progressCallback.push(callback);
        break;
    }
  }
  off(evetName, callback) {
    if (!callback) {
      this.listenedEvents[evetName] = [];
      return;
    }
    switch (evetName) {
      case "start":
        this.listenedEvents.start = this.listenedEvents.start.filter(
          (item) => item !== callback
        );
        break;
      case "pause":
        this.listenedEvents.pause = this.listenedEvents.pause.filter(
          (item) => item !== callback
        );
        break;
      case "finished":
        this.listenedEvents.finished = this.listenedEvents.finished.filter(
          (item) => item !== callback
        );
        break;
      case "moving":
        this.listenedEvents.movingCallback =
          this.listenedEvents.movingCallback.filter(
            (item) => item !== callback
          );
        break;
      case "progress":
        this.listenedEvents.progressCallback =
          this.listenedEvents.progressCallback.filter(
            (item) => item !== callback
          );
        break;
    }
  }
};
