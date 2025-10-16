var N = (e, s, t) => new Promise((a, n) => {
  var l = (u) => {
    try {
      c(t.next(u));
    } catch (m) {
      n(m);
    }
  }, d = (u) => {
    try {
      c(t.throw(u));
    } catch (m) {
      n(m);
    }
  }, c = (u) => u.done ? a(u.value) : Promise.resolve(u.value).then(l, d);
  c((t = t.apply(e, s)).next());
});
import _ from "leaflet";
var v = 63710088e-1, G = {
  centimeters: v * 100,
  centimetres: v * 100,
  degrees: v / 111325,
  feet: v * 3.28084,
  inches: v * 39.37,
  kilometers: v / 1e3,
  kilometres: v / 1e3,
  meters: v,
  metres: v,
  miles: v / 1609.344,
  millimeters: v * 1e3,
  millimetres: v * 1e3,
  nauticalmiles: v / 1852,
  radians: 1,
  yards: v * 1.0936
};
function q(e, s, t) {
  t === void 0 && (t = {});
  var a = { type: "Feature" };
  return (t.id === 0 || t.id) && (a.id = t.id), t.bbox && (a.bbox = t.bbox), a.properties = s || {}, a.geometry = e, a;
}
function O(e, s, t) {
  if (t === void 0 && (t = {}), !e)
    throw new Error("coordinates is required");
  if (!Array.isArray(e))
    throw new Error("coordinates must be an Array");
  if (e.length < 2)
    throw new Error("coordinates must be at least 2 numbers long");
  if (!j(e[0]) || !j(e[1]))
    throw new Error("coordinates must contain numbers");
  var a = {
    type: "Point",
    coordinates: e
  };
  return q(a, s, t);
}
function R(e, s, t) {
  if (t === void 0 && (t = {}), e.length < 2)
    throw new Error("coordinates must be an array of two or more positions");
  var a = {
    type: "LineString",
    coordinates: e
  };
  return q(a, s, t);
}
function Z(e, s) {
  s === void 0 && (s = "kilometers");
  var t = G[s];
  if (!t)
    throw new Error(s + " units is invalid");
  return e * t;
}
function J(e, s) {
  s === void 0 && (s = "kilometers");
  var t = G[s];
  if (!t)
    throw new Error(s + " units is invalid");
  return e / t;
}
function F(e) {
  var s = e % (2 * Math.PI);
  return s * 180 / Math.PI;
}
function w(e) {
  var s = e % 360;
  return s * Math.PI / 180;
}
function j(e) {
  return !isNaN(e) && e !== null && !Array.isArray(e);
}
function K(e) {
  return !!e && e.constructor === Object;
}
function D(e) {
  if (!e)
    throw new Error("coord is required");
  if (!Array.isArray(e)) {
    if (e.type === "Feature" && e.geometry !== null && e.geometry.type === "Point")
      return e.geometry.coordinates;
    if (e.type === "Point")
      return e.coordinates;
  }
  if (Array.isArray(e) && e.length >= 2 && !Array.isArray(e[0]) && !Array.isArray(e[1]))
    return e;
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function Q(e) {
  return e.type === "Feature" ? e.geometry : e;
}
var W = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function B(e, s, t) {
  t === void 0 && (t = {});
  var a = D(e), n = D(s), l = w(n[1] - a[1]), d = w(n[0] - a[0]), c = w(a[1]), u = w(n[1]), m = Math.pow(Math.sin(l / 2), 2) + Math.pow(Math.sin(d / 2), 2) * Math.cos(c) * Math.cos(u);
  return Z(2 * Math.atan2(Math.sqrt(m), Math.sqrt(1 - m)), t.units);
}
function z(e, s, t, a) {
  a === void 0 && (a = {});
  var n = D(e), l = w(n[0]), d = w(n[1]), c = w(t), u = J(s, a.units), m = Math.asin(Math.sin(d) * Math.cos(u) + Math.cos(d) * Math.sin(u) * Math.cos(c)), k = l + Math.atan2(Math.sin(c) * Math.sin(u) * Math.cos(d), Math.cos(u) - Math.sin(d) * Math.sin(m)), g = F(k), b = F(m);
  return O([g, b], a.properties);
}
function S(e, s, t) {
  if (t === void 0 && (t = {}), t.final === !0)
    return X(e, s);
  var a = D(e), n = D(s), l = w(a[0]), d = w(n[0]), c = w(a[1]), u = w(n[1]), m = Math.sin(d - l) * Math.cos(u), k = Math.cos(c) * Math.sin(u) - Math.sin(c) * Math.cos(u) * Math.cos(d - l);
  return F(Math.atan2(m, k));
}
function X(e, s) {
  var t = S(s, e);
  return t = (t + 180) % 360, t;
}
function Y(e, s, t) {
  t === void 0 && (t = {});
  for (var a = Q(e), n = a.coordinates, l = 0, d = 0; d < n.length && !(s >= l && d === n.length - 1); d++)
    if (l >= s) {
      var c = s - l;
      if (c) {
        var u = S(n[d], n[d - 1]) - 180, m = z(n[d], c, u, t);
        return m;
      } else
        return O(n[d]);
    } else
      l += B(n[d], n[d + 1], t);
  return O(n[n.length - 1]);
}
function H(e, s, t, a) {
  if (a = a || {}, !K(a)) throw new Error("options is invalid");
  var n, l = [];
  if (e.type === "Feature") n = e.geometry.coordinates;
  else if (e.type === "LineString") n = e.coordinates;
  else throw new Error("input must be a LineString Feature or Geometry");
  for (var d = n.length, c = 0, u, m, k, g = 0; g < n.length && !(s >= c && g === n.length - 1); g++) {
    if (c > s && l.length === 0) {
      if (u = s - c, !u)
        return l.push(n[g]), R(l);
      m = S(n[g], n[g - 1]) - 180, k = z(n[g], u, m, a), l.push(k.geometry.coordinates);
    }
    if (c >= t)
      return u = t - c, u ? (m = S(n[g], n[g - 1]) - 180, k = z(n[g], u, m, a), l.push(k.geometry.coordinates), R(l)) : (l.push(n[g]), R(l));
    if (c >= s && l.push(n[g]), g === n.length - 1)
      return R(l);
    c += B(n[g], n[g + 1], a);
  }
  if (c < s && n.length === d)
    throw new Error("Start position is beyond line");
  var b = n[n.length - 1];
  return R([b, b]);
}
(function(e, s) {
  (function(t, a) {
    a(_);
  })(W, function(t) {
    t = t && t.hasOwnProperty("default") ? t.default : t;
    function a(r, i) {
      var o = i.x - r.x, h = i.y - r.y;
      return Math.sqrt(o * o + h * h);
    }
    var n = function(i, o) {
      return (Math.atan2(o.y - i.y, o.x - i.x) * 180 / Math.PI + 90 + 360) % 360;
    }, l = function(i, o) {
      var h = i.value, p = i.isInPixels;
      return p ? h / o : h;
    };
    function d(r) {
      if (typeof r == "string" && r.indexOf("%") !== -1)
        return {
          value: parseFloat(r) / 100,
          isInPixels: !1
        };
      var i = r ? parseFloat(r) : 0;
      return {
        value: i,
        isInPixels: i > 0
      };
    }
    var c = function(i, o) {
      return i.x === o.x && i.y === o.y;
    };
    function u(r) {
      return r.reduce(function(i, o, h, p) {
        if (h > 0 && !c(o, p[h - 1])) {
          var f = p[h - 1], y = i.length > 0 ? i[i.length - 1].distB : 0, A = a(f, o);
          i.push({
            a: f,
            b: o,
            distA: y,
            distB: y + A,
            heading: n(f, o)
          });
        }
        return i;
      }, []);
    }
    function m(r, i) {
      var o = u(r), h = o.length;
      if (h === 0)
        return [];
      var p = o[h - 1].distB, f = l(i.offset, p), y = l(i.endOffset, p), A = l(i.repeat, p), P = p * A, T = f > 0 ? p * f : 0, x = y > 0 ? p * y : 0, E = [], I = T;
      do
        E.push(I), I += P;
      while (P > 0 && I < p - x);
      var C = 0, M = o[0];
      return E.map(function(U) {
        for (; U > M.distB && C < h - 1; )
          C++, M = o[C];
        var V = (U - M.distA) / (M.distB - M.distA);
        return {
          pt: k(M.a, M.b, V),
          heading: M.heading
        };
      });
    }
    function k(r, i, o) {
      return i.x !== r.x ? {
        x: r.x + o * (i.x - r.x),
        y: r.y + o * (i.y - r.y)
      } : {
        x: r.x,
        y: r.y + (i.y - r.y) * o
      };
    }
    (function() {
      var r = L.Marker.prototype._initIcon, i = L.Marker.prototype._setPos, o = L.DomUtil.TRANSFORM === "msTransform";
      L.Marker.addInitHook(function() {
        var h = this.options.icon && this.options.icon.options, p = h && this.options.icon.options.iconAnchor;
        p && (p = p[0] + "px " + p[1] + "px"), this.options.rotationOrigin = this.options.rotationOrigin || p || "center bottom", this.options.rotationAngle = this.options.rotationAngle || 0, this.on("drag", function(f) {
          f.target._applyRotation();
        });
      }), L.Marker.include({
        _initIcon: function() {
          r.call(this);
        },
        _setPos: function(h) {
          i.call(this, h), this._applyRotation();
        },
        _applyRotation: function() {
          this.options.rotationAngle && (this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin, o ? this._icon.style[L.DomUtil.TRANSFORM] = "rotate(" + this.options.rotationAngle + "deg)" : this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)");
        },
        setRotationAngle: function(h) {
          return this.options.rotationAngle = h, this.update(), this;
        },
        setRotationOrigin: function(h) {
          return this.options.rotationOrigin = h, this.update(), this;
        }
      });
    })(), t.Symbol = t.Symbol || {}, t.Symbol.Dash = t.Class.extend({
      options: {
        pixelSize: 10,
        pathOptions: {}
      },
      initialize: function(i) {
        t.Util.setOptions(this, i), this.options.pathOptions.clickable = !1;
      },
      buildSymbol: function(i, o, h, p, f) {
        var y = this.options, A = Math.PI / 180;
        if (y.pixelSize <= 1)
          return t.polyline([i.latLng, i.latLng], y.pathOptions);
        var P = h.project(i.latLng), T = -(i.heading - 90) * A, x = t.point(P.x + y.pixelSize * Math.cos(T + Math.PI) / 2, P.y + y.pixelSize * Math.sin(T) / 2), E = P.add(P.subtract(x));
        return t.polyline([h.unproject(x), h.unproject(E)], y.pathOptions);
      }
    }), t.Symbol.dash = function(r) {
      return new t.Symbol.Dash(r);
    }, t.Symbol.ArrowHead = t.Class.extend({
      options: {
        polygon: !0,
        pixelSize: 10,
        headAngle: 60,
        pathOptions: {
          stroke: !1,
          weight: 2
        }
      },
      initialize: function(i) {
        t.Util.setOptions(this, i), this.options.pathOptions.clickable = !1;
      },
      buildSymbol: function(i, o, h, p, f) {
        return this.options.polygon ? t.polygon(this._buildArrowPath(i, h), this.options.pathOptions) : t.polyline(this._buildArrowPath(i, h), this.options.pathOptions);
      },
      _buildArrowPath: function(i, o) {
        var h = Math.PI / 180, p = o.project(i.latLng), f = -(i.heading - 90) * h, y = this.options.headAngle / 2 * h, A = f + y, P = f - y, T = t.point(p.x - this.options.pixelSize * Math.cos(A), p.y + this.options.pixelSize * Math.sin(A)), x = t.point(p.x - this.options.pixelSize * Math.cos(P), p.y + this.options.pixelSize * Math.sin(P));
        return [o.unproject(T), i.latLng, o.unproject(x)];
      }
    }), t.Symbol.arrowHead = function(r) {
      return new t.Symbol.ArrowHead(r);
    }, t.Symbol.Marker = t.Class.extend({
      options: {
        markerOptions: {},
        rotate: !1
      },
      initialize: function(i) {
        t.Util.setOptions(this, i), this.options.markerOptions.clickable = !1, this.options.markerOptions.draggable = !1;
      },
      buildSymbol: function(i, o, h, p, f) {
        return this.options.rotate && (this.options.markerOptions.rotationAngle = i.heading + (this.options.angleCorrection || 0)), t.marker(i.latLng, this.options.markerOptions);
      }
    }), t.Symbol.marker = function(r) {
      return new t.Symbol.Marker(r);
    };
    var g = function(i) {
      return i instanceof t.LatLng || Array.isArray(i) && i.length === 2 && typeof i[0] == "number";
    }, b = function(i) {
      return Array.isArray(i) && g(i[0]);
    };
    t.PolylineDecorator = t.FeatureGroup.extend({
      options: {
        patterns: []
      },
      initialize: function(i, o) {
        t.FeatureGroup.prototype.initialize.call(this), t.Util.setOptions(this, o), this._map = null, this._paths = this._initPaths(i), this._bounds = this._initBounds(), this._patterns = this._initPatterns(this.options.patterns);
      },
      /**
      * Deals with all the different cases. input can be one of these types:
      * array of LatLng, array of 2-number arrays, Polyline, Polygon,
      * array of one of the previous.
      */
      _initPaths: function(i, o) {
        var h = this;
        if (b(i)) {
          var p = o ? i.concat([i[0]]) : i;
          return [p];
        }
        return i instanceof t.Polyline ? this._initPaths(i.getLatLngs(), i instanceof t.Polygon) : Array.isArray(i) ? i.reduce(function(f, y) {
          return f.concat(h._initPaths(y, o));
        }, []) : [];
      },
      // parse pattern definitions and precompute some values
      _initPatterns: function(i) {
        return i.map(this._parsePatternDef);
      },
      /**
      * Changes the patterns used by this decorator
      * and redraws the new one.
      */
      setPatterns: function(i) {
        this.options.patterns = i, this._patterns = this._initPatterns(this.options.patterns), this.redraw();
      },
      /**
      * Changes the patterns used by this decorator
      * and redraws the new one.
      */
      setPaths: function(i) {
        this._paths = this._initPaths(i), this._bounds = this._initBounds(), this.redraw();
      },
      /**
      * Parse the pattern definition
      */
      _parsePatternDef: function(i, o) {
        return {
          symbolFactory: i.symbol,
          // Parse offset and repeat values, managing the two cases:
          // absolute (in pixels) or relative (in percentage of the polyline length)
          offset: d(i.offset),
          endOffset: d(i.endOffset),
          repeat: d(i.repeat)
        };
      },
      onAdd: function(i) {
        this._map = i, this._draw(), this._map.on("moveend", this.redraw, this);
      },
      onRemove: function(i) {
        this._map.off("moveend", this.redraw, this), this._map = null, t.FeatureGroup.prototype.onRemove.call(this, i);
      },
      /**
      * As real pattern bounds depends on map zoom and bounds,
      * we just compute the total bounds of all paths decorated by this instance.
      */
      _initBounds: function() {
        var i = this._paths.reduce(function(o, h) {
          return o.concat(h);
        }, []);
        return t.latLngBounds(i);
      },
      getBounds: function() {
        return this._bounds;
      },
      /**
      * Returns an array of ILayers object
      */
      _buildSymbols: function(i, o, h) {
        var p = this;
        return h.map(function(f, y) {
          return o.buildSymbol(f, i, p._map, y, h.length);
        });
      },
      /**
      * Compute pairs of LatLng and heading angle,
      * that define positions and directions of the symbols on the path
      */
      _getDirectionPoints: function(i, o) {
        var h = this;
        if (i.length < 2)
          return [];
        var p = i.map(function(f) {
          return h._map.project(f);
        });
        return m(p, o).map(function(f) {
          return {
            latLng: h._map.unproject(t.point(f.pt)),
            heading: f.heading
          };
        });
      },
      redraw: function() {
        this._map && (this.clearLayers(), this._draw());
      },
      /**
      * Returns all symbols for a given pattern as an array of FeatureGroup
      */
      _getPatternLayers: function(i) {
        var o = this, h = this._map.getBounds().pad(0.1);
        return this._paths.map(function(p) {
          var f = o._getDirectionPoints(p, i).filter(function(y) {
            return h.contains(y.latLng);
          });
          return t.featureGroup(o._buildSymbols(p, i.symbolFactory, f));
        });
      },
      /**
      * Draw all patterns
      */
      _draw: function() {
        var i = this;
        this._patterns.map(function(o) {
          return i._getPatternLayers(o);
        }).forEach(function(o) {
          i.addLayer(t.featureGroup(o));
        });
      }
    }), t.polylineDecorator = function(r, i) {
      return new t.PolylineDecorator(r, i);
    };
  });
})();
(function() {
  var e = L.Marker.prototype._initIcon, s = L.Marker.prototype._setPos, t = L.DomUtil.TRANSFORM === "msTransform";
  L.Marker.addInitHook(function() {
    var a = this.options.icon && this.options.icon.options, n = a && this.options.icon.options.iconAnchor;
    n && (n = n[0] + "px " + n[1] + "px"), this.options.rotationOrigin = this.options.rotationOrigin || n || "center bottom", this.options.rotationAngle = this.options.rotationAngle || 0, this.on("drag", function(l) {
      l.target._applyRotation();
    });
  }), L.Marker.include({
    _initIcon: function() {
      e.call(this);
    },
    _setPos: function(a) {
      s.call(this, a), this._applyRotation();
    },
    _applyRotation: function() {
      this.options.rotationAngle && (this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin, t ? this._icon.style[L.DomUtil.TRANSFORM] = "rotate(" + this.options.rotationAngle + "deg)" : this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)");
    },
    setRotationAngle: function(a) {
      return this.options.rotationAngle = a, this.update(), this;
    },
    setRotationOrigin: function(a) {
      return this.options.rotationOrigin = a, this.update(), this;
    }
  });
})();
_.TrackPlayer = class {
  constructor(e, s = {}) {
    var n, l, d, c, u, m, k, g, b, r;
    let t = _.polyline(e)._latlngs;
    this.track = R(
      t.map(({ lng: i, lat: o }) => [i, o])
    ), this.distanceSlice = [0];
    const a = this.track.geometry.coordinates;
    this.distanceSlice = [0];
    for (let i = 1; i < a.length; i++)
      this.distanceSlice[i] = this.distanceSlice[i - 1] + B(a[i - 1], a[i]);
    this.distance = this.distanceSlice[this.distanceSlice.length - 1], this.addedToMap = !1, this.options = {
      speed: (n = s.speed) != null ? n : 600,
      weight: (l = s.weight) != null ? l : 8,
      markerIcon: s.markerIcon,
      polylineDecoratorOptions: (d = s.polylineDecoratorOptions) != null ? d : {
        patterns: [
          {
            offset: 30,
            repeat: 60,
            symbol: _.Symbol.arrowHead({
              pixelSize: 5,
              headAngle: 75,
              polygon: !1,
              pathOptions: { stroke: !0, weight: 3, color: "#fff" }
            })
          }
        ]
      },
      passedLineColor: (c = s.passedLineColor) != null ? c : "#0000ff",
      notPassedLineColor: (u = s.notPassedLineColor) != null ? u : "#ff0000",
      panTo: (m = s.panTo) != null ? m : !0,
      markerRotationOrigin: (k = s.markerRotationOrigin) != null ? k : "center",
      markerRotationOffset: (g = s.markerRotationOffset) != null ? g : 0,
      markerRotation: (b = s.markerRotation) != null ? b : !0,
      progress: (r = s.progress) != null ? r : 0
    }, this.initProgress = s.progress, this.isPaused = !0, this.walkedDistance = 0, this.walkedDistanceTemp = 0, this.trackIndex = 0, this.listenedEvents = {
      start: [],
      pause: [],
      finished: [],
      progressCallback: []
    };
  }
  addTo(e) {
    if (this.addedToMap) return;
    if (this.map = e, this.addedToMap = !0, this.options.markerIcon) {
      let t = this.track.geometry.coordinates[0];
      if (this.marker = _.marker([t[1], t[0]], {
        icon: this.options.markerIcon
      }).addTo(this.map), this.options.markerRotation) {
        let a = this.track.geometry.coordinates;
        this.marker.setRotationAngle(
          S(a[0], a[1]) / 2 + this.options.markerRotationOffset / 2
        ), this.marker.setRotationOrigin(
          this.options.markerRotationOrigin
        );
      }
    }
    let s = this.track.geometry.coordinates.map(([t, a]) => [a, t]);
    return this.notPassedLine = _.polyline(s, {
      weight: this.options.weight,
      color: this.options.notPassedLineColor
    }).addTo(this.map), this.passedLine = _.polyline([], {
      weight: this.options.weight,
      color: this.options.passedLineColor
    }).addTo(this.map), this.polylineDecorator = _.polylineDecorator(
      s,
      this.options.polylineDecoratorOptions
    ).addTo(this.map), this.initProgress && this.setProgress(this.initProgress), this;
  }
  remove() {
    this.addedToMap && (this.addedToMap = !1, this.polylineDecorator.remove(), this.polylineDecorator = null, this.notPassedLine.remove(), this.notPassedLine = null, this.passedLine.remove(), this.passedLine = null, this.marker && (this.marker.remove(), this.marker = null), this.finished = !1, this.startTimestamp = 0, this.pauseTimestamp = 0, this.walkedDistanceTemp = 0, this.walkedDistance = 0, this.trackIndex = 0, this.isPaused = !0, this.options.progress = this.initProgress);
  }
  start() {
    !this.isPaused && !this.finished || !this.addedToMap || ((this.options.progress === 0 || this.options.progress === 1) && (this.startTimestamp = 0, this.pauseTimestamp = 0, this.walkedDistanceTemp = 0, this.walkedDistance = 0), this.isPaused = !1, this.finished = !1, this.pauseTimestamp && this.startTimestamp && (this.startTimestamp = this.startTimestamp + (Date.now() - this.pauseTimestamp)), this.startAction(), this.listenedEvents.start.forEach((e) => e()), this.initProgress && this.setProgress(this.initProgress));
  }
  pause() {
    this.isPaused || this.finished || (this.pauseTimestamp = Date.now(), this.isPaused = !0, this.listenedEvents.pause.forEach((e) => e()));
  }
  startAction() {
    let e = this.distance, s = (t) => {
      if (t && this.addedToMap) {
        let a = e / this.options.speed * 3600 * 1e3;
        this.startTimestamp || (this.startTimestamp = t);
        let n = t - this.startTimestamp;
        this.walkedDistance = e * (n / a) + this.walkedDistanceTemp, this.playAction();
      }
      !this.isPaused && !this.finished && requestAnimationFrame(s);
    };
    s();
  }
  playAction(e = !1) {
    if (this.isPaused && !e) return;
    let s = this.distance;
    this.trackIndex = this.distanceSlice.findIndex((n, l, d) => {
      var c;
      return this.walkedDistance >= n && this.walkedDistance < ((c = d[l + 1]) != null ? c : 1 / 0);
    });
    let [t, a] = Y(this.track, this.walkedDistance).geometry.coordinates;
    if (this.markerPoint = [a, t], this.options.panTo && this.map.panTo(this.markerPoint, {
      animate: !1
    }), this.marker && this.marker.setLatLng(this.markerPoint), this.walkedDistance >= s)
      this.notPassedLine.setLatLngs([]);
    else {
      let n = H(this.track, this.walkedDistance);
      this.notPassedLine.setLatLngs(
        n.geometry.coordinates.map(([l, d]) => [d, l])
      );
    }
    if (this.walkedDistance > 0) {
      let n = H(this.track, 0, this.walkedDistance);
      this.passedLine.setLatLngs(
        n.geometry.coordinates.map(([l, d]) => [d, l])
      );
    } else
      this.passedLine.setLatLngs([]);
    if (this.polylineDecorator.setPaths([
      ...this.passedLine.getLatLngs(),
      ...this.notPassedLine.getLatLngs()
    ]), this.walkedDistance < s && this.options.markerRotation && this.marker) {
      let n = 0;
      n = S(
        O([t, a]),
        O(
          this.track.geometry.coordinates[this.trackIndex + 1]
        )
      ), this.marker.setRotationAngle(
        n / 2 + this.options.markerRotationOffset / 2
      );
    }
    if (this.options.progress = Math.min(1, this.walkedDistance / s), this.listenedEvents.progressCallback.forEach(
      (n) => n(
        this.options.progress,
        _.latLng(...this.markerPoint),
        this.trackIndex
      )
    ), this.walkedDistance >= s && (this.walkedDistance = s, this.finished = !0, this.listenedEvents.finished.forEach((n) => n()), this.options.markerRotation && this.marker)) {
      let n = this.track.geometry.coordinates, l = S(
        O(n.at(-2)),
        O(n.at(-1))
      );
      this.marker.setRotationAngle(
        l / 2 + this.options.markerRotationOffset / 2
      );
    }
  }
  setSpeedAction(e) {
    this.options.speed = e, this.walkedDistanceTemp = this.walkedDistance, this.startTimestamp = 0;
  }
  setSpeed(e, s = 20) {
    return N(this, null, function* () {
      s && (clearTimeout(this.setSpeedTimeout), yield new Promise((t) => {
        this.setSpeedTimeout = setTimeout(t, s);
      })), this.setSpeedAction(e);
    });
  }
  setProgress(e) {
    this.addedToMap && (this.options.progress == 1 && e == 1 || this.options.progress == 0 && e == 0 || (this.options.progress = e, this.walkedDistanceTemp = this.distance * e, this.startTimestamp = 0, (this.isPaused || this.finished) && (this.walkedDistance = this.walkedDistanceTemp, this.isPaused ? this.playAction(!0) : (this.finished = !1, this.isPaused = !1, this.startAction()))));
  }
  on(e, s) {
    switch (e) {
      case "start":
        this.listenedEvents.start.push(s);
        break;
      case "pause":
        this.listenedEvents.pause.push(s);
        break;
      case "finished":
        this.listenedEvents.finished.push(s);
        break;
      case "progress":
        this.listenedEvents.progressCallback.push(s);
        break;
    }
  }
  off(e, s) {
    if (!s) {
      this.listenedEvents[e] = [];
      return;
    }
    switch (e) {
      case "start":
        this.listenedEvents.start = this.listenedEvents.start.filter(
          (t) => t !== s
        );
        break;
      case "pause":
        this.listenedEvents.pause = this.listenedEvents.pause.filter(
          (t) => t !== s
        );
        break;
      case "finished":
        this.listenedEvents.finished = this.listenedEvents.finished.filter(
          (t) => t !== s
        );
        break;
      case "progress":
        this.listenedEvents.progressCallback = this.listenedEvents.progressCallback.filter(
          (t) => t !== s
        );
        break;
    }
  }
};
