import _ from "leaflet";
var b = 63710088e-1, V = {
  centimeters: b * 100,
  centimetres: b * 100,
  degrees: b / 111325,
  feet: b * 3.28084,
  inches: b * 39.37,
  kilometers: b / 1e3,
  kilometres: b / 1e3,
  meters: b,
  metres: b,
  miles: b / 1609.344,
  millimeters: b * 1e3,
  millimetres: b * 1e3,
  nauticalmiles: b / 1852,
  radians: 1,
  yards: b * 1.0936
};
function C(e, s, t) {
  t === void 0 && (t = {});
  var n = { type: "Feature" };
  return (t.id === 0 || t.id) && (n.id = t.id), t.bbox && (n.bbox = t.bbox), n.properties = s || {}, n.geometry = e, n;
}
function O(e, s, t) {
  if (t === void 0 && (t = {}), !e)
    throw new Error("coordinates is required");
  if (!Array.isArray(e))
    throw new Error("coordinates must be an Array");
  if (e.length < 2)
    throw new Error("coordinates must be at least 2 numbers long");
  if (!N(e[0]) || !N(e[1]))
    throw new Error("coordinates must contain numbers");
  var n = {
    type: "Point",
    coordinates: e
  };
  return C(n, s, t);
}
function S(e, s, t) {
  if (t === void 0 && (t = {}), e.length < 2)
    throw new Error("coordinates must be an array of two or more positions");
  var n = {
    type: "LineString",
    coordinates: e
  };
  return C(n, s, t);
}
function K(e, s) {
  s === void 0 && (s = "kilometers");
  var t = V[s];
  if (!t)
    throw new Error(s + " units is invalid");
  return e * t;
}
function Q(e, s) {
  s === void 0 && (s = "kilometers");
  var t = V[s];
  if (!t)
    throw new Error(s + " units is invalid");
  return e / t;
}
function F(e) {
  var s = e % (2 * Math.PI);
  return s * 180 / Math.PI;
}
function M(e) {
  var s = e % 360;
  return s * Math.PI / 180;
}
function N(e) {
  return !isNaN(e) && e !== null && !Array.isArray(e);
}
function X(e) {
  return !!e && e.constructor === Object;
}
function Z(e, s, t) {
  if (e !== null)
    for (var n, r, h, l, p, u, g, v = 0, d = 0, P, a = e.type, i = a === "FeatureCollection", o = a === "Feature", f = i ? e.features.length : 1, c = 0; c < f; c++) {
      g = i ? e.features[c].geometry : o ? e.geometry : e, P = g ? g.type === "GeometryCollection" : !1, p = P ? g.geometries.length : 1;
      for (var y = 0; y < p; y++) {
        var m = 0, w = 0;
        if (l = P ? g.geometries[y] : g, l !== null) {
          u = l.coordinates;
          var k = l.type;
          switch (v = t && (k === "Polygon" || k === "MultiPolygon") ? 1 : 0, k) {
            case null:
              break;
            case "Point":
              if (s(
                u,
                d,
                c,
                m,
                w
              ) === !1)
                return !1;
              d++, m++;
              break;
            case "LineString":
            case "MultiPoint":
              for (n = 0; n < u.length; n++) {
                if (s(
                  u[n],
                  d,
                  c,
                  m,
                  w
                ) === !1)
                  return !1;
                d++, k === "MultiPoint" && m++;
              }
              k === "LineString" && m++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (n = 0; n < u.length; n++) {
                for (r = 0; r < u[n].length - v; r++) {
                  if (s(
                    u[n][r],
                    d,
                    c,
                    m,
                    w
                  ) === !1)
                    return !1;
                  d++;
                }
                k === "MultiLineString" && m++, k === "Polygon" && w++;
              }
              k === "Polygon" && m++;
              break;
            case "MultiPolygon":
              for (n = 0; n < u.length; n++) {
                for (w = 0, r = 0; r < u[n].length; r++) {
                  for (h = 0; h < u[n][r].length - v; h++) {
                    if (s(
                      u[n][r][h],
                      d,
                      c,
                      m,
                      w
                    ) === !1)
                      return !1;
                    d++;
                  }
                  w++;
                }
                m++;
              }
              break;
            case "GeometryCollection":
              for (n = 0; n < l.geometries.length; n++)
                if (Z(l.geometries[n], s, t) === !1)
                  return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
}
function Y(e, s) {
  var t, n, r, h, l, p, u, g, v, d, P = 0, a = e.type === "FeatureCollection", i = e.type === "Feature", o = a ? e.features.length : 1;
  for (t = 0; t < o; t++) {
    for (p = a ? e.features[t].geometry : i ? e.geometry : e, g = a ? e.features[t].properties : i ? e.properties : {}, v = a ? e.features[t].bbox : i ? e.bbox : void 0, d = a ? e.features[t].id : i ? e.id : void 0, u = p ? p.type === "GeometryCollection" : !1, l = u ? p.geometries.length : 1, r = 0; r < l; r++) {
      if (h = u ? p.geometries[r] : p, h === null) {
        if (s(
          null,
          P,
          g,
          v,
          d
        ) === !1)
          return !1;
        continue;
      }
      switch (h.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (s(
            h,
            P,
            g,
            v,
            d
          ) === !1)
            return !1;
          break;
        }
        case "GeometryCollection": {
          for (n = 0; n < h.geometries.length; n++)
            if (s(
              h.geometries[n],
              P,
              g,
              v,
              d
            ) === !1)
              return !1;
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    P++;
  }
}
function W(e, s) {
  Y(e, function(t, n, r, h, l) {
    var p = t === null ? null : t.type;
    switch (p) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        return s(
          C(t, r, { bbox: h, id: l }),
          n,
          0
        ) === !1 ? !1 : void 0;
    }
    var u;
    switch (p) {
      case "MultiPoint":
        u = "Point";
        break;
      case "MultiLineString":
        u = "LineString";
        break;
      case "MultiPolygon":
        u = "Polygon";
        break;
    }
    for (var g = 0; g < t.coordinates.length; g++) {
      var v = t.coordinates[g], d = {
        type: u,
        coordinates: v
      };
      if (s(C(d, r), n, g) === !1)
        return !1;
    }
  });
}
function j(e, s) {
  W(e, function(t, n, r) {
    var h = 0;
    if (t.geometry) {
      var l = t.geometry.type;
      if (!(l === "Point" || l === "MultiPoint")) {
        var p, u = 0, g = 0, v = 0;
        if (Z(
          t,
          function(d, P, a, i, o) {
            if (p === void 0 || n > u || i > g || o > v) {
              p = d, u = n, g = i, v = o, h = 0;
              return;
            }
            var f = S(
              [p, d],
              t.properties
            );
            if (s(
              f,
              n,
              r,
              o,
              h
            ) === !1)
              return !1;
            h++, p = d;
          }
        ) === !1)
          return !1;
      }
    }
  });
}
function $(e, s, t) {
  var n = t, r = !1;
  return j(
    e,
    function(h, l, p, u, g) {
      r === !1 && t === void 0 ? n = h : n = s(
        n,
        h,
        l,
        p,
        u,
        g
      ), r = !0;
    }
  ), n;
}
function E(e) {
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
function tt(e) {
  return e.type === "Feature" ? e.geometry : e;
}
var et = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function U(e, s, t) {
  t === void 0 && (t = {});
  var n = E(e), r = E(s), h = M(r[1] - n[1]), l = M(r[0] - n[0]), p = M(n[1]), u = M(r[1]), g = Math.pow(Math.sin(h / 2), 2) + Math.pow(Math.sin(l / 2), 2) * Math.cos(p) * Math.cos(u);
  return K(2 * Math.atan2(Math.sqrt(g), Math.sqrt(1 - g)), t.units);
}
function B(e, s, t, n) {
  n === void 0 && (n = {});
  var r = E(e), h = M(r[0]), l = M(r[1]), p = M(t), u = Q(s, n.units), g = Math.asin(Math.sin(l) * Math.cos(u) + Math.cos(l) * Math.sin(u) * Math.cos(p)), v = h + Math.atan2(Math.sin(p) * Math.sin(u) * Math.cos(l), Math.cos(u) - Math.sin(l) * Math.sin(g)), d = F(v), P = F(g);
  return O([d, P], n.properties);
}
function T(e, s, t) {
  if (t === void 0 && (t = {}), t.final === !0)
    return it(e, s);
  var n = E(e), r = E(s), h = M(n[0]), l = M(r[0]), p = M(n[1]), u = M(r[1]), g = Math.sin(l - h) * Math.cos(u), v = Math.cos(p) * Math.sin(u) - Math.sin(p) * Math.cos(u) * Math.cos(l - h);
  return F(Math.atan2(g, v));
}
function it(e, s) {
  var t = T(s, e);
  return t = (t + 180) % 360, t;
}
function st(e, s, t) {
  t === void 0 && (t = {});
  for (var n = tt(e), r = n.coordinates, h = 0, l = 0; l < r.length && !(s >= h && l === r.length - 1); l++)
    if (h >= s) {
      var p = s - h;
      if (p) {
        var u = T(r[l], r[l - 1]) - 180, g = B(r[l], p, u, t);
        return g;
      } else
        return O(r[l]);
    } else
      h += U(r[l], r[l + 1], t);
  return O(r[r.length - 1]);
}
function H(e, s) {
  return s === void 0 && (s = {}), $(e, function(t, n) {
    var r = n.geometry.coordinates;
    return t + U(r[0], r[1], s);
  }, 0);
}
function q(e, s, t, n) {
  if (n = n || {}, !X(n))
    throw new Error("options is invalid");
  var r, h = [];
  if (e.type === "Feature")
    r = e.geometry.coordinates;
  else if (e.type === "LineString")
    r = e.coordinates;
  else
    throw new Error("input must be a LineString Feature or Geometry");
  for (var l = r.length, p = 0, u, g, v, d = 0; d < r.length && !(s >= p && d === r.length - 1); d++) {
    if (p > s && h.length === 0) {
      if (u = s - p, !u)
        return h.push(r[d]), S(h);
      g = T(r[d], r[d - 1]) - 180, v = B(r[d], u, g, n), h.push(v.geometry.coordinates);
    }
    if (p >= t)
      return u = t - p, u ? (g = T(r[d], r[d - 1]) - 180, v = B(r[d], u, g, n), h.push(v.geometry.coordinates), S(h)) : (h.push(r[d]), S(h));
    if (p >= s && h.push(r[d]), d === r.length - 1)
      return S(h);
    p += U(r[d], r[d + 1], n);
  }
  if (p < s && r.length === l)
    throw new Error("Start position is beyond line");
  var P = r[r.length - 1];
  return S([P, P]);
}
(function(e, s) {
  (function(t, n) {
    n(_);
  })(et, function(t) {
    t = t && t.hasOwnProperty("default") ? t.default : t;
    function n(a, i) {
      var o = i.x - a.x, f = i.y - a.y;
      return Math.sqrt(o * o + f * f);
    }
    var r = function(i, o) {
      return (Math.atan2(o.y - i.y, o.x - i.x) * 180 / Math.PI + 90 + 360) % 360;
    }, h = function(i, o) {
      var f = i.value, c = i.isInPixels;
      return c ? f / o : f;
    };
    function l(a) {
      if (typeof a == "string" && a.indexOf("%") !== -1)
        return {
          value: parseFloat(a) / 100,
          isInPixels: !1
        };
      var i = a ? parseFloat(a) : 0;
      return {
        value: i,
        isInPixels: i > 0
      };
    }
    var p = function(i, o) {
      return i.x === o.x && i.y === o.y;
    };
    function u(a) {
      return a.reduce(function(i, o, f, c) {
        if (f > 0 && !p(o, c[f - 1])) {
          var y = c[f - 1], m = i.length > 0 ? i[i.length - 1].distB : 0, w = n(y, o);
          i.push({
            a: y,
            b: o,
            distA: m,
            distB: m + w,
            heading: r(y, o)
          });
        }
        return i;
      }, []);
    }
    function g(a, i) {
      var o = u(a), f = o.length;
      if (f === 0)
        return [];
      var c = o[f - 1].distB, y = h(i.offset, c), m = h(i.endOffset, c), w = h(i.repeat, c), k = c * w, R = y > 0 ? c * y : 0, D = m > 0 ? c * m : 0, x = [], G = R;
      do
        x.push(G), G += k;
      while (k > 0 && G < c - D);
      var z = 0, A = o[0];
      return x.map(function(I) {
        for (; I > A.distB && z < f - 1; )
          z++, A = o[z];
        var J = (I - A.distA) / (A.distB - A.distA);
        return {
          pt: v(A.a, A.b, J),
          heading: A.heading
        };
      });
    }
    function v(a, i, o) {
      return i.x !== a.x ? {
        x: a.x + o * (i.x - a.x),
        y: a.y + o * (i.y - a.y)
      } : {
        x: a.x,
        y: a.y + (i.y - a.y) * o
      };
    }
    (function() {
      var a = L.Marker.prototype._initIcon, i = L.Marker.prototype._setPos, o = L.DomUtil.TRANSFORM === "msTransform";
      L.Marker.addInitHook(function() {
        var f = this.options.icon && this.options.icon.options, c = f && this.options.icon.options.iconAnchor;
        c && (c = c[0] + "px " + c[1] + "px"), this.options.rotationOrigin = this.options.rotationOrigin || c || "center bottom", this.options.rotationAngle = this.options.rotationAngle || 0, this.on("drag", function(y) {
          y.target._applyRotation();
        });
      }), L.Marker.include({
        _initIcon: function() {
          a.call(this);
        },
        _setPos: function(f) {
          i.call(this, f), this._applyRotation();
        },
        _applyRotation: function() {
          this.options.rotationAngle && (this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin, o ? this._icon.style[L.DomUtil.TRANSFORM] = "rotate(" + this.options.rotationAngle + "deg)" : this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)");
        },
        setRotationAngle: function(f) {
          return this.options.rotationAngle = f, this.update(), this;
        },
        setRotationOrigin: function(f) {
          return this.options.rotationOrigin = f, this.update(), this;
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
      buildSymbol: function(i, o, f, c, y) {
        var m = this.options, w = Math.PI / 180;
        if (m.pixelSize <= 1)
          return t.polyline([i.latLng, i.latLng], m.pathOptions);
        var k = f.project(i.latLng), R = -(i.heading - 90) * w, D = t.point(k.x + m.pixelSize * Math.cos(R + Math.PI) / 2, k.y + m.pixelSize * Math.sin(R) / 2), x = k.add(k.subtract(D));
        return t.polyline([f.unproject(D), f.unproject(x)], m.pathOptions);
      }
    }), t.Symbol.dash = function(a) {
      return new t.Symbol.Dash(a);
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
      buildSymbol: function(i, o, f, c, y) {
        return this.options.polygon ? t.polygon(this._buildArrowPath(i, f), this.options.pathOptions) : t.polyline(this._buildArrowPath(i, f), this.options.pathOptions);
      },
      _buildArrowPath: function(i, o) {
        var f = Math.PI / 180, c = o.project(i.latLng), y = -(i.heading - 90) * f, m = this.options.headAngle / 2 * f, w = y + m, k = y - m, R = t.point(c.x - this.options.pixelSize * Math.cos(w), c.y + this.options.pixelSize * Math.sin(w)), D = t.point(c.x - this.options.pixelSize * Math.cos(k), c.y + this.options.pixelSize * Math.sin(k));
        return [o.unproject(R), i.latLng, o.unproject(D)];
      }
    }), t.Symbol.arrowHead = function(a) {
      return new t.Symbol.ArrowHead(a);
    }, t.Symbol.Marker = t.Class.extend({
      options: {
        markerOptions: {},
        rotate: !1
      },
      initialize: function(i) {
        t.Util.setOptions(this, i), this.options.markerOptions.clickable = !1, this.options.markerOptions.draggable = !1;
      },
      buildSymbol: function(i, o, f, c, y) {
        return this.options.rotate && (this.options.markerOptions.rotationAngle = i.heading + (this.options.angleCorrection || 0)), t.marker(i.latLng, this.options.markerOptions);
      }
    }), t.Symbol.marker = function(a) {
      return new t.Symbol.Marker(a);
    };
    var d = function(i) {
      return i instanceof t.LatLng || Array.isArray(i) && i.length === 2 && typeof i[0] == "number";
    }, P = function(i) {
      return Array.isArray(i) && d(i[0]);
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
        var f = this;
        if (P(i)) {
          var c = o ? i.concat([i[0]]) : i;
          return [c];
        }
        return i instanceof t.Polyline ? this._initPaths(i.getLatLngs(), i instanceof t.Polygon) : Array.isArray(i) ? i.reduce(function(y, m) {
          return y.concat(f._initPaths(m, o));
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
          offset: l(i.offset),
          endOffset: l(i.endOffset),
          repeat: l(i.repeat)
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
        var i = this._paths.reduce(function(o, f) {
          return o.concat(f);
        }, []);
        return t.latLngBounds(i);
      },
      getBounds: function() {
        return this._bounds;
      },
      /**
      * Returns an array of ILayers object
      */
      _buildSymbols: function(i, o, f) {
        var c = this;
        return f.map(function(y, m) {
          return o.buildSymbol(y, i, c._map, m, f.length);
        });
      },
      /**
      * Compute pairs of LatLng and heading angle,
      * that define positions and directions of the symbols on the path
      */
      _getDirectionPoints: function(i, o) {
        var f = this;
        if (i.length < 2)
          return [];
        var c = i.map(function(y) {
          return f._map.project(y);
        });
        return g(c, o).map(function(y) {
          return {
            latLng: f._map.unproject(t.point(y.pt)),
            heading: y.heading
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
        var o = this, f = this._map.getBounds().pad(0.1);
        return this._paths.map(function(c) {
          var y = o._getDirectionPoints(c, i).filter(function(m) {
            return f.contains(m.latLng);
          });
          return t.featureGroup(o._buildSymbols(c, i.symbolFactory, y));
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
    }), t.polylineDecorator = function(a, i) {
      return new t.PolylineDecorator(a, i);
    };
  });
})();
(function() {
  var e = L.Marker.prototype._initIcon, s = L.Marker.prototype._setPos, t = L.DomUtil.TRANSFORM === "msTransform";
  L.Marker.addInitHook(function() {
    var n = this.options.icon && this.options.icon.options, r = n && this.options.icon.options.iconAnchor;
    r && (r = r[0] + "px " + r[1] + "px"), this.options.rotationOrigin = this.options.rotationOrigin || r || "center bottom", this.options.rotationAngle = this.options.rotationAngle || 0, this.on("drag", function(h) {
      h.target._applyRotation();
    });
  }), L.Marker.include({
    _initIcon: function() {
      e.call(this);
    },
    _setPos: function(n) {
      s.call(this, n), this._applyRotation();
    },
    _applyRotation: function() {
      this.options.rotationAngle && (this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin, t ? this._icon.style[L.DomUtil.TRANSFORM] = "rotate(" + this.options.rotationAngle + "deg)" : this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)");
    },
    setRotationAngle: function(n) {
      return this.options.rotationAngle = n, this.update(), this;
    },
    setRotationOrigin: function(n) {
      return this.options.rotationOrigin = n, this.update(), this;
    }
  });
})();
_.TrackPlayer = class {
  constructor(e, s = {}) {
    let t = _.polyline(e)._latlngs;
    this.track = S(
      t.map(({ lng: n, lat: r }) => [n, r])
    ), this.distanceSlice = [], this.track.geometry.coordinates.forEach((n, r, h) => {
      if (r == h.length - 1)
        this.distanceSlice.push(0);
      else {
        let l = S(h.slice(r));
        this.distanceSlice.push(H(l));
      }
    }), this.distance = H(this.track), this.addedToMap = !1, this.options = {
      speed: s.speed ?? 600,
      weight: s.weight ?? 8,
      markerIcon: s.markerIcon,
      polylineDecoratorOptions: s.polylineDecoratorOptions ?? {
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
      passedLineColor: s.passedLineColor ?? "#0000ff",
      notPassedLineColor: s.notPassedLineColor ?? "#ff0000",
      panTo: s.panTo ?? !0,
      markerRotationOrigin: s.markerRotationOrigin ?? "center",
      markerRotationOffset: s.markerRotationOffset ?? 0,
      markerRotation: s.markerRotation ?? !0,
      progress: s.progress ?? 0
    }, this.initProgress = s.progress, this.isPaused = !0, this.walkedDistance = 0, this.walkedDistanceTemp = 0, this.trackIndex = 0, this.listenedEvents = {
      start: [],
      pause: [],
      finished: [],
      progressCallback: []
    };
  }
  addTo(e) {
    if (this.addedToMap)
      return;
    if (this.map = e, this.addedToMap = !0, this.options.markerIcon) {
      let t = this.track.geometry.coordinates[0];
      if (this.marker = _.marker([t[1], t[0]], {
        icon: this.options.markerIcon
      }).addTo(this.map), this.options.markerRotation) {
        let n = this.track.geometry.coordinates;
        this.marker.setRotationAngle(
          T(n[0], n[1]) / 2 + this.options.markerRotationOffset / 2
        ), this.marker.setRotationOrigin(
          this.options.markerRotationOrigin
        );
      }
    }
    let s = this.track.geometry.coordinates.map(([t, n]) => [n, t]);
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
        let n = e / this.options.speed * 3600 * 1e3;
        this.startTimestamp || (this.startTimestamp = t);
        let r = t - this.startTimestamp;
        this.walkedDistance = e * (r / n) + this.walkedDistanceTemp, this.playAction();
      }
      !this.isPaused && !this.finished && requestAnimationFrame(s);
    };
    s();
  }
  playAction(e = !1) {
    if (this.isPaused && !e)
      return;
    let s = this.distance;
    this.trackIndex = this.distanceSlice.findIndex((r) => r <= s - this.walkedDistance), this.trackIndex == -1 && (this.trackIndex = this.distanceSlice.length - 1);
    let [t, n] = st(this.track, this.walkedDistance).geometry.coordinates;
    if (this.markerPoint = [n, t], this.options.panTo && this.map.panTo(this.markerPoint, {
      animate: !1
    }), this.marker && this.marker.setLatLng(this.markerPoint), this.walkedDistance >= s)
      this.notPassedLine.setLatLngs([]);
    else {
      let r = q(this.track, this.walkedDistance);
      this.notPassedLine.setLatLngs(
        r.geometry.coordinates.map(([h, l]) => [l, h])
      );
    }
    if (this.walkedDistance > 0) {
      let r = q(this.track, 0, this.walkedDistance);
      this.passedLine.setLatLngs(
        r.geometry.coordinates.map(([h, l]) => [l, h])
      );
    } else
      this.passedLine.setLatLngs([]);
    if (this.polylineDecorator.setPaths([
      ...this.passedLine.getLatLngs(),
      ...this.notPassedLine.getLatLngs()
    ]), this.walkedDistance < s && this.options.markerRotation && this.marker) {
      let r = 0;
      r = T(
        O([t, n]),
        O(
          this.track.geometry.coordinates[Math.max(this.trackIndex, 1)]
        )
      ), this.marker.setRotationAngle(
        r / 2 + this.options.markerRotationOffset / 2
      );
    }
    if (this.options.progress = Math.min(1, this.walkedDistance / s), this.listenedEvents.progressCallback.forEach(
      (r) => r(
        this.options.progress,
        _.latLng(...this.markerPoint),
        this.trackIndex
      )
    ), this.walkedDistance >= s && (this.walkedDistance = s, this.finished = !0, this.listenedEvents.finished.forEach((r) => r()), this.options.markerRotation && this.marker)) {
      let r = this.track.geometry.coordinates, h = T(
        O(r.at(-2)),
        O(r.at(-1))
      );
      this.marker.setRotationAngle(
        h / 2 + this.options.markerRotationOffset / 2
      );
    }
  }
  setSpeedAction(e) {
    this.options.speed = e, this.walkedDistanceTemp = this.walkedDistance, this.startTimestamp = 0;
  }
  async setSpeed(e, s = 20) {
    s && (clearTimeout(this.setSpeedTimeout), await new Promise((t) => {
      this.setSpeedTimeout = setTimeout(t, s);
    })), this.setSpeedAction(e);
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
