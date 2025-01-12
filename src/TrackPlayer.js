import L from "leaflet";
import * as turf from "@turf/turf";
import "leaflet-polylinedecorator";
import "leaflet-rotatedmarker";
L.TrackPlayer = class {
  constructor(track, options = {}) {
    //格式化传入的轨迹数组，目的是传入的轨迹数组可以是任意格式（[{lng:xx,lat:xx}]/[[xx,xx]]）
    let leafletLatlngs = L.polyline(track)._latlngs;
    this.track = turf.lineString(
      leafletLatlngs.map(({ lng, lat }) => [lng, lat])
    );
    this.distanceSlice = [0];
    this.track.geometry.coordinates.forEach((item, index, arr) => {
      if(index!==0){
        let line = turf.lineString(arr.slice(0,index+1));
        this.distanceSlice.push(turf.length(line));
      }
    });
    this.distance = turf.length(this.track);
    this.addedToMap = false;
    this.options = {
      // 新增原始数据, 使用真实的 gps 航向数据来旋转车头 by waynerQiu 2025 年 1 月 13 日 00:47:15
      sourcePoints:options.sourcePoints??[],
      speed: options.speed ?? 600,
      weight: options.weight ?? 8,
      markerIcon: options.markerIcon,
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

    // 用于判断是否起始 gps 航向初始化车头方向
    this.autoCourse = this.options.sourcePoints.length==track.length


    this.initProgress = options.progress;
    this.isPaused = true;
    this.walkedDistance = 0;
    this.walkedDistanceTemp = 0;
    this.trackIndex = 0;
    //被监听的事件
    this.listenedEvents = {
      start: [],
      pause: [],
      finished: [],
      progressCallback: [],
    };
  }
  addTo(map) {
    if(this.addedToMap) return;
    this.map = map;
    this.addedToMap = true;
    if (this.options.markerIcon) {
      let start = this.track.geometry.coordinates[0];
      this.marker = L.marker([start[1],start[0]], {
        icon: this.options.markerIcon,
      }).addTo(this.map);
      if (this.options.markerRotation) {
        let coordinates = this.track.geometry.coordinates;
        this.marker.setRotationAngle(
          turf.bearing(coordinates[0], coordinates[1]) / 2 +
            this.options.markerRotationOffset / 2
        );
        this.marker.setRotationOrigin(
          this.options.markerRotationOrigin
        );
      }
    }

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
    
    if (this.initProgress) {
      this.setProgress(this.initProgress);
    }
    return this;
  }
  remove() {
    if (this.addedToMap) {
      this.addedToMap = false;
      this.polylineDecorator.remove();
      this.polylineDecorator = null;
      this.notPassedLine.remove();
      this.notPassedLine = null;
      this.passedLine.remove();
      this.passedLine = null;
      if (this.marker) {
        this.marker.remove();
        this.marker = null;
      }
      this.finished = false;
      this.startTimestamp = 0;
      this.pauseTimestamp = 0;
      this.walkedDistanceTemp = 0;
      this.walkedDistance = 0;
      this.trackIndex = 0;
      this.isPaused = true;
      this.options.progress = this.initProgress;
    }
  }
  start() {
    
    if ((!this.isPaused && !this.finished) || !this.addedToMap) return;
    if (this.options.progress === 0 || this.options.progress === 1) {
      this.startTimestamp = 0;
      this.pauseTimestamp = 0;
      this.walkedDistanceTemp = 0;
      this.walkedDistance = 0;
    }
    this.isPaused = false;
    this.finished = false;
    if (this.pauseTimestamp && this.startTimestamp) {
      this.startTimestamp =
        this.startTimestamp + (Date.now() - this.pauseTimestamp);
    }
    this.startAction();
    this.listenedEvents.start.forEach((item) => item());
    if (this.initProgress) {
      this.setProgress(this.initProgress);
    }
  }
  pause() {
    if (this.isPaused || this.finished) return;
    this.pauseTimestamp = Date.now();
    this.isPaused = true;
    this.listenedEvents.pause.forEach((item) => item());
  }
  startAction() {
    //计算轨迹总长度
    let distance = this.distance;
    //开始播放轨迹
    let player = (timestamp) => {
      if (timestamp&&this.addedToMap) {
        let totalDuration = (distance / this.options.speed) * 3600 * 1000; // 总体播放时间（毫秒）
        this.startTimestamp ||= timestamp; //为播放开始时的时间戳赋值
        let takeTime = timestamp - this.startTimestamp; //从播放开始到此刻时间过去了多久
        this.walkedDistance =
          distance * (takeTime / totalDuration) + this.walkedDistanceTemp; //根据当前时间在整体时间的占比计算到下一个点位要前进多远距离
        this.playAction();
      }
     
      if (!this.isPaused && !this.finished) {
        requestAnimationFrame(player);
      }
    };
    player();
  }
  playAction(settingProgress = false) {
    if (this.isPaused && !settingProgress) return;
    let distance = this.distance;

    this.trackIndex = this.distanceSlice.findIndex((item,index,arr) => {
      return this.walkedDistance>=item&&this.walkedDistance<(arr[index+1]??Infinity);
    });

    let [lng, lat] = turf.along(this.track, this.walkedDistance).geometry
      .coordinates;
    this.markerPoint = [lat, lng];
    if (this.options.panTo) {
      this.map.panTo(this.markerPoint, {
        animate: false,
      });
    }
    this.marker && this.marker.setLatLng(this.markerPoint);
    //计算未经过的轨迹
    if (this.walkedDistance >= distance) {
      this.notPassedLine.setLatLngs([]);
    } else {
      let sliced = turf.lineSliceAlong(this.track, this.walkedDistance);
      this.notPassedLine.setLatLngs(
        sliced.geometry.coordinates.map(([lng, lat]) => [lat, lng])
      );
    }
    //计算已经过的路径
    if (this.walkedDistance > 0) {
      let sliced = turf.lineSliceAlong(this.track, 0, this.walkedDistance);
      this.passedLine.setLatLngs(
        sliced.geometry.coordinates.map(([lng, lat]) => [lat, lng])
      );
    } else {
      this.passedLine.setLatLngs([]);
    }

    //修改箭头线使他和轨迹契合
    this.polylineDecorator.setPaths([
      ...this.passedLine.getLatLngs(),
      ...this.notPassedLine.getLatLngs(),
    ]);
    //计算marker旋转角度
    if (this.walkedDistance < distance) {
      if (this.options.markerRotation && this.marker) {
        //计算当前点位到下一个点位的角度
        let bearing = 0;
        bearing = turf.bearing(
          turf.point([lng, lat]),
          turf.point(
            this.track.geometry.coordinates[this.trackIndex+1]
          )
        );

        this.marker.setRotationAngle(
          bearing / 2 + this.options.markerRotationOffset / 2
        );
      }
    }else if (this.marker && this.autoCourse) {
      // console.log(this.options.sourcePoints[this.trackIndex].dir);
      this.marker.setRotationAngle(this.options.sourcePoints[this.trackIndex+1].course);
    }
    //更新播放进度
    this.options.progress = Math.min(1, this.walkedDistance / distance);
    this.listenedEvents.progressCallback.forEach((item) =>
      item(
        this.options.progress,
        L.latLng(...this.markerPoint),
        this.trackIndex
      )
    );
    //判断是否播放完成
    if (this.walkedDistance >= distance) {
      this.walkedDistance = distance;
      this.finished = true;
      this.listenedEvents.finished.forEach((item) => item());
      if (this.options.markerRotation && this.marker) {
        //播放完成时将marker旋转角设置为倒数第二个位置和倒数第一个位置形成的角度
        //为了解决离开页面，再切回来时marker直接移动完成导致旋转角度计算不准确的问题
        let coordinates = this.track.geometry.coordinates;
        let bearing = turf.bearing(
          turf.point(coordinates.at(-2)),
          turf.point(coordinates.at(-1))
        );
        this.marker.setRotationAngle(
          bearing / 2 + this.options.markerRotationOffset / 2
        );
      }
    }
  }
  setSpeedAction(speed) {
    this.options.speed = speed;
    this.walkedDistanceTemp = this.walkedDistance; //记录当前点位已经前进了多少距离了
    this.startTimestamp = 0;
  }
  async setSpeed(speed, wait = 20) {
    if (wait) {
      clearTimeout(this.setSpeedTimeout);
      await new Promise((resolve) => {
        this.setSpeedTimeout = setTimeout(resolve, wait);
      });
    }
    this.setSpeedAction(speed);
  }
  setProgress(progress) {
    if (!this.addedToMap) return;
    if (
      (this.options.progress == 1 && progress == 1) ||
      (this.options.progress == 0 && progress == 0)
    )
      return;
    this.options.progress = progress;
    this.walkedDistanceTemp = this.distance * progress;
    this.startTimestamp = 0;
    // 对于暂停跟完成状态，调整进度。
    if (this.isPaused || this.finished) {
      this.walkedDistance = this.walkedDistanceTemp;
      if (!this.isPaused) {
        this.finished = false;
        this.isPaused = false;
        this.startAction();
      } else {
        this.playAction(true);
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
      case "progress":
        this.listenedEvents.progressCallback =
          this.listenedEvents.progressCallback.filter(
            (item) => item !== callback
          );
        break;
    }
  }
};
