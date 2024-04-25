var N = (e, s, t) => new Promise((n, r) => {
  var o = (l) => {
    try {
      c(t.next(l));
    } catch (p) {
      r(p);
    }
  }, f = (l) => {
    try {
      c(t.throw(l));
    } catch (p) {
      r(p);
    }
  }, c = (l) => l.done ? n(l.value) : Promise.resolve(l.value).then(o, f);
  c((t = t.apply(e, s)).next());
});
import _ from "leaflet";
var b = 63710088e-1, Z = {
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
  if (!H(e[0]) || !H(e[1]))
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
function Q(e, s) {
  s === void 0 && (s = "kilometers");
  var t = Z[s];
  if (!t)
    throw new Error(s + " units is invalid");
  return e * t;
}
function X(e, s) {
  s === void 0 && (s = "kilometers");
  var t = Z[s];
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
function H(e) {
  return !isNaN(e) && e !== null && !Array.isArray(e);
}
function Y(e) {
  return !!e && e.constructor === Object;
}
function J(e, s, t) {
  if (e !== null)
    for (var n, r, o, f, c, l, p, v = 0, g = 0, k, a = e.type, i = a === "FeatureCollection", h = a === "Feature", u = i ? e.features.length : 1, d = 0; d < u; d++) {
      p = i ? e.features[d].geometry : h ? e.geometry : e, k = p ? p.type === "GeometryCollection" : !1, c = k ? p.geometries.length : 1;
      for (var y = 0; y < c; y++) {
        var m = 0, w = 0;
        if (f = k ? p.geometries[y] : p, f !== null) {
          l = f.coordinates;
          var P = f.type;
          switch (v = t && (P === "Polygon" || P === "MultiPolygon") ? 1 : 0, P) {
            case null:
              break;
            case "Point":
              if (s(
                l,
                g,
                d,
                m,
                w
              ) === !1)
                return !1;
              g++, m++;
              break;
            case "LineString":
            case "MultiPoint":
              for (n = 0; n < l.length; n++) {
                if (s(
                  l[n],
                  g,
                  d,
                  m,
                  w
                ) === !1)
                  return !1;
                g++, P === "MultiPoint" && m++;
              }
              P === "LineString" && m++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (n = 0; n < l.length; n++) {
                for (r = 0; r < l[n].length - v; r++) {
                  if (s(
                    l[n][r],
                    g,
                    d,
                    m,
                    w
                  ) === !1)
                    return !1;
                  g++;
                }
                P === "MultiLineString" && m++, P === "Polygon" && w++;
              }
              P === "Polygon" && m++;
              break;
            case "MultiPolygon":
              for (n = 0; n < l.length; n++) {
                for (w = 0, r = 0; r < l[n].length; r++) {
                  for (o = 0; o < l[n][r].length - v; o++) {
                    if (s(
                      l[n][r][o],
                      g,
                      d,
                      m,
                      w
                    ) === !1)
                      return !1;
                    g++;
                  }
                  w++;
                }
                m++;
              }
              break;
            case "GeometryCollection":
              for (n = 0; n < f.geometries.length; n++)
                if (J(f.geometries[n], s, t) === !1)
                  return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
}
function W(e, s) {
  var t, n, r, o, f, c, l, p, v, g, k = 0, a = e.type === "FeatureCollection", i = e.type === "Feature", h = a ? e.features.length : 1;
  for (t = 0; t < h; t++) {
    for (c = a ? e.features[t].geometry : i ? e.geometry : e, p = a ? e.features[t].properties : i ? e.properties : {}, v = a ? e.features[t].bbox : i ? e.bbox : void 0, g = a ? e.features[t].id : i ? e.id : void 0, l = c ? c.type === "GeometryCollection" : !1, f = l ? c.geometries.length : 1, r = 0; r < f; r++) {
      if (o = l ? c.geometries[r] : c, o === null) {
        if (s(
          null,
          k,
          p,
          v,
          g
        ) === !1)
          return !1;
        continue;
      }
      switch (o.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (s(
            o,
            k,
            p,
            v,
            g
          ) === !1)
            return !1;
          break;
        }
        case "GeometryCollection": {
          for (n = 0; n < o.geometries.length; n++)
            if (s(
              o.geometries[n],
              k,
              p,
              v,
              g
            ) === !1)
              return !1;
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    k++;
  }
}
function j(e, s) {
  W(e, function(t, n, r, o, f) {
    var c = t === null ? null : t.type;
    switch (c) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        return s(
          C(t, r, { bbox: o, id: f }),
          n,
          0
        ) === !1 ? !1 : void 0;
    }
    var l;
    switch (c) {
      case "MultiPoint":
        l = "Point";
        break;
      case "MultiLineString":
        l = "LineString";
        break;
      case "MultiPolygon":
        l = "Polygon";
        break;
    }
    for (var p = 0; p < t.coordinates.length; p++) {
      var v = t.coordinates[p], g = {
        type: l,
        coordinates: v
      };
      if (s(C(g, r), n, p) === !1)
        return !1;
    }
  });
}
function $(e, s) {
  j(e, function(t, n, r) {
    var o = 0;
    if (t.geometry) {
      var f = t.geometry.type;
      if (!(f === "Point" || f === "MultiPoint")) {
        var c, l = 0, p = 0, v = 0;
        if (J(
          t,
          function(g, k, a, i, h) {
            if (c === void 0 || n > l || i > p || h > v) {
              c = g, l = n, p = i, v = h, o = 0;
              return;
            }
            var u = S(
              [c, g],
              t.properties
            );
            if (s(
              u,
              n,
              r,
              h,
              o
            ) === !1)
              return !1;
            o++, c = g;
          }
        ) === !1)
          return !1;
      }
    }
  });
}
function tt(e, s, t) {
  var n = t, r = !1;
  return $(
    e,
    function(o, f, c, l, p) {
      r === !1 && t === void 0 ? n = o : n = s(
        n,
        o,
        f,
        c,
        l,
        p
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
function et(e) {
  return e.type === "Feature" ? e.geometry : e;
}
var it = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function U(e, s, t) {
  t === void 0 && (t = {});
  var n = E(e), r = E(s), o = M(r[1] - n[1]), f = M(r[0] - n[0]), c = M(n[1]), l = M(r[1]), p = Math.pow(Math.sin(o / 2), 2) + Math.pow(Math.sin(f / 2), 2) * Math.cos(c) * Math.cos(l);
  return Q(2 * Math.atan2(Math.sqrt(p), Math.sqrt(1 - p)), t.units);
}
function B(e, s, t, n) {
  n === void 0 && (n = {});
  var r = E(e), o = M(r[0]), f = M(r[1]), c = M(t), l = X(s, n.units), p = Math.asin(Math.sin(f) * Math.cos(l) + Math.cos(f) * Math.sin(l) * Math.cos(c)), v = o + Math.atan2(Math.sin(c) * Math.sin(l) * Math.cos(f), Math.cos(l) - Math.sin(f) * Math.sin(p)), g = F(v), k = F(p);
  return O([g, k], n.properties);
}
function T(e, s, t) {
  if (t === void 0 && (t = {}), t.final === !0)
    return st(e, s);
  var n = E(e), r = E(s), o = M(n[0]), f = M(r[0]), c = M(n[1]), l = M(r[1]), p = Math.sin(f - o) * Math.cos(l), v = Math.cos(c) * Math.sin(l) - Math.sin(c) * Math.cos(l) * Math.cos(f - o);
  return F(Math.atan2(p, v));
}
function st(e, s) {
  var t = T(s, e);
  return t = (t + 180) % 360, t;
}
function rt(e, s, t) {
  t === void 0 && (t = {});
  for (var n = et(e), r = n.coordinates, o = 0, f = 0; f < r.length && !(s >= o && f === r.length - 1); f++)
    if (o >= s) {
      var c = s - o;
      if (c) {
        var l = T(r[f], r[f - 1]) - 180, p = B(r[f], c, l, t);
        return p;
      } else
        return O(r[f]);
    } else
      o += U(r[f], r[f + 1], t);
  return O(r[r.length - 1]);
}
function q(e, s) {
  return s === void 0 && (s = {}), tt(e, function(t, n) {
    var r = n.geometry.coordinates;
    return t + U(r[0], r[1], s);
  }, 0);
}
function V(e, s, t, n) {
  if (n = n || {}, !Y(n))
    throw new Error("options is invalid");
  var r, o = [];
  if (e.type === "Feature")
    r = e.geometry.coordinates;
  else if (e.type === "LineString")
    r = e.coordinates;
  else
    throw new Error("input must be a LineString Feature or Geometry");
  for (var f = r.length, c = 0, l, p, v, g = 0; g < r.length && !(s >= c && g === r.length - 1); g++) {
    if (c > s && o.length === 0) {
      if (l = s - c, !l)
        return o.push(r[g]), S(o);
      p = T(r[g], r[g - 1]) - 180, v = B(r[g], l, p, n), o.push(v.geometry.coordinates);
    }
    if (c >= t)
      return l = t - c, l ? (p = T(r[g], r[g - 1]) - 180, v = B(r[g], l, p, n), o.push(v.geometry.coordinates), S(o)) : (o.push(r[g]), S(o));
    if (c >= s && o.push(r[g]), g === r.length - 1)
      return S(o);
    c += U(r[g], r[g + 1], n);
  }
  if (c < s && r.length === f)
    throw new Error("Start position is beyond line");
  var k = r[r.length - 1];
  return S([k, k]);
}
(function(e, s) {
  (function(t, n) {
    n(_);
  })(it, function(t) {
    t = t && t.hasOwnProperty("default") ? t.default : t;
    function n(a, i) {
      var h = i.x - a.x, u = i.y - a.y;
      return Math.sqrt(h * h + u * u);
    }
    var r = function(i, h) {
      return (Math.atan2(h.y - i.y, h.x - i.x) * 180 / Math.PI + 90 + 360) % 360;
    }, o = function(i, h) {
      var u = i.value, d = i.isInPixels;
      return d ? u / h : u;
    };
    function f(a) {
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
    var c = function(i, h) {
      return i.x === h.x && i.y === h.y;
    };
    function l(a) {
      return a.reduce(function(i, h, u, d) {
        if (u > 0 && !c(h, d[u - 1])) {
          var y = d[u - 1], m = i.length > 0 ? i[i.length - 1].distB : 0, w = n(y, h);
          i.push({
            a: y,
            b: h,
            distA: m,
            distB: m + w,
            heading: r(y, h)
          });
        }
        return i;
      }, []);
    }
    function p(a, i) {
      var h = l(a), u = h.length;
      if (u === 0)
        return [];
      var d = h[u - 1].distB, y = o(i.offset, d), m = o(i.endOffset, d), w = o(i.repeat, d), P = d * w, R = y > 0 ? d * y : 0, D = m > 0 ? d * m : 0, x = [], G = R;
      do
        x.push(G), G += P;
      while (P > 0 && G < d - D);
      var z = 0, A = h[0];
      return x.map(function(I) {
        for (; I > A.distB && z < u - 1; )
          z++, A = h[z];
        var K = (I - A.distA) / (A.distB - A.distA);
        return {
          pt: v(A.a, A.b, K),
          heading: A.heading
        };
      });
    }
    function v(a, i, h) {
      return i.x !== a.x ? {
        x: a.x + h * (i.x - a.x),
        y: a.y + h * (i.y - a.y)
      } : {
        x: a.x,
        y: a.y + (i.y - a.y) * h
      };
    }
    (function() {
      var a = L.Marker.prototype._initIcon, i = L.Marker.prototype._setPos, h = L.DomUtil.TRANSFORM === "msTransform";
      L.Marker.addInitHook(function() {
        var u = this.options.icon && this.options.icon.options, d = u && this.options.icon.options.iconAnchor;
        d && (d = d[0] + "px " + d[1] + "px"), this.options.rotationOrigin = this.options.rotationOrigin || d || "center bottom", this.options.rotationAngle = this.options.rotationAngle || 0, this.on("drag", function(y) {
          y.target._applyRotation();
        });
      }), L.Marker.include({
        _initIcon: function() {
          a.call(this);
        },
        _setPos: function(u) {
          i.call(this, u), this._applyRotation();
        },
        _applyRotation: function() {
          this.options.rotationAngle && (this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin, h ? this._icon.style[L.DomUtil.TRANSFORM] = "rotate(" + this.options.rotationAngle + "deg)" : this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)");
        },
        setRotationAngle: function(u) {
          return this.options.rotationAngle = u, this.update(), this;
        },
        setRotationOrigin: function(u) {
          return this.options.rotationOrigin = u, this.update(), this;
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
      buildSymbol: function(i, h, u, d, y) {
        var m = this.options, w = Math.PI / 180;
        if (m.pixelSize <= 1)
          return t.polyline([i.latLng, i.latLng], m.pathOptions);
        var P = u.project(i.latLng), R = -(i.heading - 90) * w, D = t.point(P.x + m.pixelSize * Math.cos(R + Math.PI) / 2, P.y + m.pixelSize * Math.sin(R) / 2), x = P.add(P.subtract(D));
        return t.polyline([u.unproject(D), u.unproject(x)], m.pathOptions);
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
      buildSymbol: function(i, h, u, d, y) {
        return this.options.polygon ? t.polygon(this._buildArrowPath(i, u), this.options.pathOptions) : t.polyline(this._buildArrowPath(i, u), this.options.pathOptions);
      },
      _buildArrowPath: function(i, h) {
        var u = Math.PI / 180, d = h.project(i.latLng), y = -(i.heading - 90) * u, m = this.options.headAngle / 2 * u, w = y + m, P = y - m, R = t.point(d.x - this.options.pixelSize * Math.cos(w), d.y + this.options.pixelSize * Math.sin(w)), D = t.point(d.x - this.options.pixelSize * Math.cos(P), d.y + this.options.pixelSize * Math.sin(P));
        return [h.unproject(R), i.latLng, h.unproject(D)];
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
      buildSymbol: function(i, h, u, d, y) {
        return this.options.rotate && (this.options.markerOptions.rotationAngle = i.heading + (this.options.angleCorrection || 0)), t.marker(i.latLng, this.options.markerOptions);
      }
    }), t.Symbol.marker = function(a) {
      return new t.Symbol.Marker(a);
    };
    var g = function(i) {
      return i instanceof t.LatLng || Array.isArray(i) && i.length === 2 && typeof i[0] == "number";
    }, k = function(i) {
      return Array.isArray(i) && g(i[0]);
    };
    t.PolylineDecorator = t.FeatureGroup.extend({
      options: {
        patterns: []
      },
      initialize: function(i, h) {
        t.FeatureGroup.prototype.initialize.call(this), t.Util.setOptions(this, h), this._map = null, this._paths = this._initPaths(i), this._bounds = this._initBounds(), this._patterns = this._initPatterns(this.options.patterns);
      },
      /**
      * Deals with all the different cases. input can be one of these types:
      * array of LatLng, array of 2-number arrays, Polyline, Polygon,
      * array of one of the previous.
      */
      _initPaths: function(i, h) {
        var u = this;
        if (k(i)) {
          var d = h ? i.concat([i[0]]) : i;
          return [d];
        }
        return i instanceof t.Polyline ? this._initPaths(i.getLatLngs(), i instanceof t.Polygon) : Array.isArray(i) ? i.reduce(function(y, m) {
          return y.concat(u._initPaths(m, h));
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
      _parsePatternDef: function(i, h) {
        return {
          symbolFactory: i.symbol,
          // Parse offset and repeat values, managing the two cases:
          // absolute (in pixels) or relative (in percentage of the polyline length)
          offset: f(i.offset),
          endOffset: f(i.endOffset),
          repeat: f(i.repeat)
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
        var i = this._paths.reduce(function(h, u) {
          return h.concat(u);
        }, []);
        return t.latLngBounds(i);
      },
      getBounds: function() {
        return this._bounds;
      },
      /**
      * Returns an array of ILayers object
      */
      _buildSymbols: function(i, h, u) {
        var d = this;
        return u.map(function(y, m) {
          return h.buildSymbol(y, i, d._map, m, u.length);
        });
      },
      /**
      * Compute pairs of LatLng and heading angle,
      * that define positions and directions of the symbols on the path
      */
      _getDirectionPoints: function(i, h) {
        var u = this;
        if (i.length < 2)
          return [];
        var d = i.map(function(y) {
          return u._map.project(y);
        });
        return p(d, h).map(function(y) {
          return {
            latLng: u._map.unproject(t.point(y.pt)),
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
        var h = this, u = this._map.getBounds().pad(0.1);
        return this._paths.map(function(d) {
          var y = h._getDirectionPoints(d, i).filter(function(m) {
            return u.contains(m.latLng);
          });
          return t.featureGroup(h._buildSymbols(d, i.symbolFactory, y));
        });
      },
      /**
      * Draw all patterns
      */
      _draw: function() {
        var i = this;
        this._patterns.map(function(h) {
          return i._getPatternLayers(h);
        }).forEach(function(h) {
          i.addLayer(t.featureGroup(h));
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
    r && (r = r[0] + "px " + r[1] + "px"), this.options.rotationOrigin = this.options.rotationOrigin || r || "center bottom", this.options.rotationAngle = this.options.rotationAngle || 0, this.on("drag", function(o) {
      o.target._applyRotation();
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
    var n, r, o, f, c, l, p, v, g, k;
    let t = _.polyline(e)._latlngs;
    this.track = S(
      t.map(({ lng: a, lat: i }) => [a, i])
    ), this.distanceSlice = [0], this.track.geometry.coordinates.forEach((a, i, h) => {
      if (i !== 0) {
        let u = S(h.slice(0, i + 1));
        this.distanceSlice.push(q(u));
      }
    }), this.distance = q(this.track), this.addedToMap = !1, this.options = {
      speed: (n = s.speed) != null ? n : 600,
      weight: (r = s.weight) != null ? r : 8,
      markerIcon: s.markerIcon,
      polylineDecoratorOptions: (o = s.polylineDecoratorOptions) != null ? o : {
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
      passedLineColor: (f = s.passedLineColor) != null ? f : "#0000ff",
      notPassedLineColor: (c = s.notPassedLineColor) != null ? c : "#ff0000",
      panTo: (l = s.panTo) != null ? l : !0,
      markerRotationOrigin: (p = s.markerRotationOrigin) != null ? p : "center",
      markerRotationOffset: (v = s.markerRotationOffset) != null ? v : 0,
      markerRotation: (g = s.markerRotation) != null ? g : !0,
      progress: (k = s.progress) != null ? k : 0
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
    this.trackIndex = this.distanceSlice.findIndex((r, o, f) => this.walkedDistance >= r && this.walkedDistance < (f[o + 1] || 1 / 0));
    let [t, n] = rt(this.track, this.walkedDistance).geometry.coordinates;
    if (this.markerPoint = [n, t], this.options.panTo && this.map.panTo(this.markerPoint, {
      animate: !1
    }), this.marker && this.marker.setLatLng(this.markerPoint), this.walkedDistance >= s)
      this.notPassedLine.setLatLngs([]);
    else {
      let r = V(this.track, this.walkedDistance);
      this.notPassedLine.setLatLngs(
        r.geometry.coordinates.map(([o, f]) => [f, o])
      );
    }
    if (this.walkedDistance > 0) {
      let r = V(this.track, 0, this.walkedDistance);
      this.passedLine.setLatLngs(
        r.geometry.coordinates.map(([o, f]) => [f, o])
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
          this.track.geometry.coordinates[this.trackIndex + 1]
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
      let r = this.track.geometry.coordinates, o = T(
        O(r.at(-2)),
        O(r.at(-1))
      );
      this.marker.setRotationAngle(
        o / 2 + this.options.markerRotationOffset / 2
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
