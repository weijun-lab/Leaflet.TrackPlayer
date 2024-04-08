import z from "leaflet";
var C = 63710088e-1, ht = {
  centimeters: C * 100,
  centimetres: C * 100,
  degrees: C / 111325,
  feet: C * 3.28084,
  inches: C * 39.37,
  kilometers: C / 1e3,
  kilometres: C / 1e3,
  meters: C,
  metres: C,
  miles: C / 1609.344,
  millimeters: C * 1e3,
  millimetres: C * 1e3,
  nauticalmiles: C / 1852,
  radians: 1,
  yards: C * 1.0936
}, Ft = {
  centimeters: 100,
  centimetres: 100,
  degrees: 1 / 111325,
  feet: 3.28084,
  inches: 39.37,
  kilometers: 1 / 1e3,
  kilometres: 1 / 1e3,
  meters: 1,
  metres: 1,
  miles: 1 / 1609.344,
  millimeters: 1e3,
  millimetres: 1e3,
  nauticalmiles: 1 / 1852,
  radians: 1 / C,
  yards: 1.0936133
}, st = {
  acres: 247105e-9,
  centimeters: 1e4,
  centimetres: 1e4,
  feet: 10.763910417,
  hectares: 1e-4,
  inches: 1550.003100006,
  kilometers: 1e-6,
  kilometres: 1e-6,
  meters: 1,
  metres: 1,
  miles: 386e-9,
  millimeters: 1e6,
  millimetres: 1e6,
  yards: 1.195990046
};
function X(e, r, t) {
  t === void 0 && (t = {});
  var i = { type: "Feature" };
  return (t.id === 0 || t.id) && (i.id = t.id), t.bbox && (i.bbox = t.bbox), i.properties = r || {}, i.geometry = e, i;
}
function Xt(e, r, t) {
  switch (e) {
    case "Point":
      return A(r).geometry;
    case "LineString":
      return B(r).geometry;
    case "Polygon":
      return ut(r).geometry;
    case "MultiPoint":
      return xt(r).geometry;
    case "MultiLineString":
      return Pt(r).geometry;
    case "MultiPolygon":
      return kt(r).geometry;
    default:
      throw new Error(e + " is invalid");
  }
}
function A(e, r, t) {
  if (t === void 0 && (t = {}), !e)
    throw new Error("coordinates is required");
  if (!Array.isArray(e))
    throw new Error("coordinates must be an Array");
  if (e.length < 2)
    throw new Error("coordinates must be at least 2 numbers long");
  if (!it(e[0]) || !it(e[1]))
    throw new Error("coordinates must contain numbers");
  var i = {
    type: "Point",
    coordinates: e
  };
  return X(i, r, t);
}
function Yt(e, r, t) {
  return t === void 0 && (t = {}), N(e.map(function(i) {
    return A(i, r);
  }), t);
}
function ut(e, r, t) {
  t === void 0 && (t = {});
  for (var i = 0, n = e; i < n.length; i++) {
    var o = n[i];
    if (o.length < 4)
      throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
    for (var u = 0; u < o[o.length - 1].length; u++)
      if (o[o.length - 1][u] !== o[0][u])
        throw new Error("First and last Position are not equivalent.");
  }
  var f = {
    type: "Polygon",
    coordinates: e
  };
  return X(f, r, t);
}
function Dt(e, r, t) {
  return t === void 0 && (t = {}), N(e.map(function(i) {
    return ut(i, r);
  }), t);
}
function B(e, r, t) {
  if (t === void 0 && (t = {}), e.length < 2)
    throw new Error("coordinates must be an array of two or more positions");
  var i = {
    type: "LineString",
    coordinates: e
  };
  return X(i, r, t);
}
function Gt(e, r, t) {
  return t === void 0 && (t = {}), N(e.map(function(i) {
    return B(i, r);
  }), t);
}
function N(e, r) {
  r === void 0 && (r = {});
  var t = { type: "FeatureCollection" };
  return r.id && (t.id = r.id), r.bbox && (t.bbox = r.bbox), t.features = e, t;
}
function Pt(e, r, t) {
  t === void 0 && (t = {});
  var i = {
    type: "MultiLineString",
    coordinates: e
  };
  return X(i, r, t);
}
function xt(e, r, t) {
  t === void 0 && (t = {});
  var i = {
    type: "MultiPoint",
    coordinates: e
  };
  return X(i, r, t);
}
function kt(e, r, t) {
  t === void 0 && (t = {});
  var i = {
    type: "MultiPolygon",
    coordinates: e
  };
  return X(i, r, t);
}
function zt(e, r, t) {
  t === void 0 && (t = {});
  var i = {
    type: "GeometryCollection",
    geometries: e
  };
  return X(i, r, t);
}
function It(e, r) {
  if (r === void 0 && (r = 0), r && !(r >= 0))
    throw new Error("precision must be a positive number");
  var t = Math.pow(10, r || 0);
  return Math.round(e * t) / t;
}
function ft(e, r) {
  r === void 0 && (r = "kilometers");
  var t = ht[r];
  if (!t)
    throw new Error(r + " units is invalid");
  return e * t;
}
function ot(e, r) {
  r === void 0 && (r = "kilometers");
  var t = ht[r];
  if (!t)
    throw new Error(r + " units is invalid");
  return e / t;
}
function qt(e, r) {
  return j(ot(e, r));
}
function Nt(e) {
  var r = e % 360;
  return r < 0 && (r += 360), r;
}
function j(e) {
  var r = e % (2 * Math.PI);
  return r * 180 / Math.PI;
}
function F(e) {
  var r = e % 360;
  return r * Math.PI / 180;
}
function Ht(e, r, t) {
  if (r === void 0 && (r = "kilometers"), t === void 0 && (t = "kilometers"), !(e >= 0))
    throw new Error("length must be a positive number");
  return ft(ot(e, r), t);
}
function Jt(e, r, t) {
  if (r === void 0 && (r = "meters"), t === void 0 && (t = "kilometers"), !(e >= 0))
    throw new Error("area must be a positive number");
  var i = st[r];
  if (!i)
    throw new Error("invalid original units");
  var n = st[t];
  if (!n)
    throw new Error("invalid final units");
  return e / i * n;
}
function it(e) {
  return !isNaN(e) && e !== null && !Array.isArray(e);
}
function at(e) {
  return !!e && e.constructor === Object;
}
function Ut(e) {
  if (!e)
    throw new Error("bbox is required");
  if (!Array.isArray(e))
    throw new Error("bbox must be an Array");
  if (e.length !== 4 && e.length !== 6)
    throw new Error("bbox must be an Array of 4 or 6 numbers");
  e.forEach(function(r) {
    if (!it(r))
      throw new Error("bbox must only contain numbers");
  });
}
function Vt(e) {
  if (!e)
    throw new Error("id is required");
  if (["string", "number"].indexOf(typeof e) === -1)
    throw new Error("id must be a number or a string");
}
const Zt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  areaFactors: st,
  bearingToAzimuth: Nt,
  convertArea: Jt,
  convertLength: Ht,
  degreesToRadians: F,
  earthRadius: C,
  factors: ht,
  feature: X,
  featureCollection: N,
  geometry: Xt,
  geometryCollection: zt,
  isNumber: it,
  isObject: at,
  lengthToDegrees: qt,
  lengthToRadians: ot,
  lineString: B,
  lineStrings: Gt,
  multiLineString: Pt,
  multiPoint: xt,
  multiPolygon: kt,
  point: A,
  points: Yt,
  polygon: ut,
  polygons: Dt,
  radiansToDegrees: j,
  radiansToLength: ft,
  round: It,
  unitsFactors: Ft,
  validateBBox: Ut,
  validateId: Vt
}, Symbol.toStringTag, { value: "Module" }));
function Z(e, r, t) {
  if (e !== null)
    for (var i, n, o, u, f, l, v, S = 0, P = 0, O, p = e.type, h = p === "FeatureCollection", m = p === "Feature", g = h ? e.features.length : 1, M = 0; M < g; M++) {
      v = h ? e.features[M].geometry : m ? e.geometry : e, O = v ? v.type === "GeometryCollection" : !1, f = O ? v.geometries.length : 1;
      for (var a = 0; a < f; a++) {
        var s = 0, c = 0;
        if (u = O ? v.geometries[a] : v, u !== null) {
          l = u.coordinates;
          var d = u.type;
          switch (S = t && (d === "Polygon" || d === "MultiPolygon") ? 1 : 0, d) {
            case null:
              break;
            case "Point":
              if (r(
                l,
                P,
                M,
                s,
                c
              ) === !1)
                return !1;
              P++, s++;
              break;
            case "LineString":
            case "MultiPoint":
              for (i = 0; i < l.length; i++) {
                if (r(
                  l[i],
                  P,
                  M,
                  s,
                  c
                ) === !1)
                  return !1;
                P++, d === "MultiPoint" && s++;
              }
              d === "LineString" && s++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (i = 0; i < l.length; i++) {
                for (n = 0; n < l[i].length - S; n++) {
                  if (r(
                    l[i][n],
                    P,
                    M,
                    s,
                    c
                  ) === !1)
                    return !1;
                  P++;
                }
                d === "MultiLineString" && s++, d === "Polygon" && c++;
              }
              d === "Polygon" && s++;
              break;
            case "MultiPolygon":
              for (i = 0; i < l.length; i++) {
                for (c = 0, n = 0; n < l[i].length; n++) {
                  for (o = 0; o < l[i][n].length - S; o++) {
                    if (r(
                      l[i][n][o],
                      P,
                      M,
                      s,
                      c
                    ) === !1)
                      return !1;
                    P++;
                  }
                  c++;
                }
                s++;
              }
              break;
            case "GeometryCollection":
              for (i = 0; i < u.geometries.length; i++)
                if (Z(u.geometries[i], r, t) === !1)
                  return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
}
function Kt(e, r, t, i) {
  var n = t;
  return Z(
    e,
    function(o, u, f, l, v) {
      u === 0 && t === void 0 ? n = o : n = r(
        n,
        o,
        u,
        f,
        l,
        v
      );
    },
    i
  ), n;
}
function _t(e, r) {
  var t;
  switch (e.type) {
    case "FeatureCollection":
      for (t = 0; t < e.features.length && r(e.features[t].properties, t) !== !1; t++)
        ;
      break;
    case "Feature":
      r(e.properties, 0);
      break;
  }
}
function Qt(e, r, t) {
  var i = t;
  return _t(e, function(n, o) {
    o === 0 && t === void 0 ? i = n : i = r(i, n, o);
  }), i;
}
function nt(e, r) {
  if (e.type === "Feature")
    r(e, 0);
  else if (e.type === "FeatureCollection")
    for (var t = 0; t < e.features.length && r(e.features[t], t) !== !1; t++)
      ;
}
function Wt(e, r, t) {
  var i = t;
  return nt(e, function(n, o) {
    o === 0 && t === void 0 ? i = n : i = r(i, n, o);
  }), i;
}
function jt(e) {
  var r = [];
  return Z(e, function(t) {
    r.push(t);
  }), r;
}
function ct(e, r) {
  var t, i, n, o, u, f, l, v, S, P, O = 0, p = e.type === "FeatureCollection", h = e.type === "Feature", m = p ? e.features.length : 1;
  for (t = 0; t < m; t++) {
    for (f = p ? e.features[t].geometry : h ? e.geometry : e, v = p ? e.features[t].properties : h ? e.properties : {}, S = p ? e.features[t].bbox : h ? e.bbox : void 0, P = p ? e.features[t].id : h ? e.id : void 0, l = f ? f.type === "GeometryCollection" : !1, u = l ? f.geometries.length : 1, n = 0; n < u; n++) {
      if (o = l ? f.geometries[n] : f, o === null) {
        if (r(
          null,
          O,
          v,
          S,
          P
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
          if (r(
            o,
            O,
            v,
            S,
            P
          ) === !1)
            return !1;
          break;
        }
        case "GeometryCollection": {
          for (i = 0; i < o.geometries.length; i++)
            if (r(
              o.geometries[i],
              O,
              v,
              S,
              P
            ) === !1)
              return !1;
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    O++;
  }
}
function $t(e, r, t) {
  var i = t;
  return ct(
    e,
    function(n, o, u, f, l) {
      o === 0 && t === void 0 ? i = n : i = r(
        i,
        n,
        o,
        u,
        f,
        l
      );
    }
  ), i;
}
function K(e, r) {
  ct(e, function(t, i, n, o, u) {
    var f = t === null ? null : t.type;
    switch (f) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        return r(
          X(t, n, { bbox: o, id: u }),
          i,
          0
        ) === !1 ? !1 : void 0;
    }
    var l;
    switch (f) {
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
    for (var v = 0; v < t.coordinates.length; v++) {
      var S = t.coordinates[v], P = {
        type: l,
        coordinates: S
      };
      if (r(X(P, n), i, v) === !1)
        return !1;
    }
  });
}
function te(e, r, t) {
  var i = t;
  return K(
    e,
    function(n, o, u) {
      o === 0 && u === 0 && t === void 0 ? i = n : i = r(
        i,
        n,
        o,
        u
      );
    }
  ), i;
}
function St(e, r) {
  K(e, function(t, i, n) {
    var o = 0;
    if (t.geometry) {
      var u = t.geometry.type;
      if (!(u === "Point" || u === "MultiPoint")) {
        var f, l = 0, v = 0, S = 0;
        if (Z(
          t,
          function(P, O, p, h, m) {
            if (f === void 0 || i > l || h > v || m > S) {
              f = P, l = i, v = h, S = m, o = 0;
              return;
            }
            var g = B(
              [f, P],
              t.properties
            );
            if (r(
              g,
              i,
              n,
              m,
              o
            ) === !1)
              return !1;
            o++, f = P;
          }
        ) === !1)
          return !1;
      }
    }
  });
}
function Et(e, r, t) {
  var i = t, n = !1;
  return St(
    e,
    function(o, u, f, l, v) {
      n === !1 && t === void 0 ? i = o : i = r(
        i,
        o,
        u,
        f,
        l,
        v
      ), n = !0;
    }
  ), i;
}
function At(e, r) {
  if (!e)
    throw new Error("geojson is required");
  K(e, function(t, i, n) {
    if (t.geometry !== null) {
      var o = t.geometry.type, u = t.geometry.coordinates;
      switch (o) {
        case "LineString":
          if (r(t, i, n, 0, 0) === !1)
            return !1;
          break;
        case "Polygon":
          for (var f = 0; f < u.length; f++)
            if (r(
              B(u[f], t.properties),
              i,
              n,
              f
            ) === !1)
              return !1;
          break;
      }
    }
  });
}
function ee(e, r, t) {
  var i = t;
  return At(
    e,
    function(n, o, u, f) {
      o === 0 && t === void 0 ? i = n : i = r(
        i,
        n,
        o,
        u,
        f
      );
    }
  ), i;
}
function re(e, r) {
  if (r = r || {}, !at(r))
    throw new Error("options is invalid");
  var t = r.featureIndex || 0, i = r.multiFeatureIndex || 0, n = r.geometryIndex || 0, o = r.segmentIndex || 0, u = r.properties, f;
  switch (e.type) {
    case "FeatureCollection":
      t < 0 && (t = e.features.length + t), u = u || e.features[t].properties, f = e.features[t].geometry;
      break;
    case "Feature":
      u = u || e.properties, f = e.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      f = e;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (f === null)
    return null;
  var l = f.coordinates;
  switch (f.type) {
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
      return o < 0 && (o = l.length + o - 1), B(
        [l[o], l[o + 1]],
        u,
        r
      );
    case "Polygon":
      return n < 0 && (n = l.length + n), o < 0 && (o = l[n].length + o - 1), B(
        [
          l[n][o],
          l[n][o + 1]
        ],
        u,
        r
      );
    case "MultiLineString":
      return i < 0 && (i = l.length + i), o < 0 && (o = l[i].length + o - 1), B(
        [
          l[i][o],
          l[i][o + 1]
        ],
        u,
        r
      );
    case "MultiPolygon":
      return i < 0 && (i = l.length + i), n < 0 && (n = l[i].length + n), o < 0 && (o = l[i][n].length - o - 1), B(
        [
          l[i][n][o],
          l[i][n][o + 1]
        ],
        u,
        r
      );
  }
  throw new Error("geojson is invalid");
}
function ie(e, r) {
  if (r = r || {}, !at(r))
    throw new Error("options is invalid");
  var t = r.featureIndex || 0, i = r.multiFeatureIndex || 0, n = r.geometryIndex || 0, o = r.coordIndex || 0, u = r.properties, f;
  switch (e.type) {
    case "FeatureCollection":
      t < 0 && (t = e.features.length + t), u = u || e.features[t].properties, f = e.features[t].geometry;
      break;
    case "Feature":
      u = u || e.properties, f = e.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      f = e;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (f === null)
    return null;
  var l = f.coordinates;
  switch (f.type) {
    case "Point":
      return A(l, u, r);
    case "MultiPoint":
      return i < 0 && (i = l.length + i), A(l[i], u, r);
    case "LineString":
      return o < 0 && (o = l.length + o), A(l[o], u, r);
    case "Polygon":
      return n < 0 && (n = l.length + n), o < 0 && (o = l[n].length + o), A(l[n][o], u, r);
    case "MultiLineString":
      return i < 0 && (i = l.length + i), o < 0 && (o = l[i].length + o), A(l[i][o], u, r);
    case "MultiPolygon":
      return i < 0 && (i = l.length + i), n < 0 && (n = l[i].length + n), o < 0 && (o = l[i][n].length - o), A(
        l[i][n][o],
        u,
        r
      );
  }
  throw new Error("geojson is invalid");
}
const ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coordAll: jt,
  coordEach: Z,
  coordReduce: Kt,
  featureEach: nt,
  featureReduce: Wt,
  findPoint: ie,
  findSegment: re,
  flattenEach: K,
  flattenReduce: te,
  geomEach: ct,
  geomReduce: $t,
  lineEach: At,
  lineReduce: ee,
  propEach: _t,
  propReduce: Qt,
  segmentEach: St,
  segmentReduce: Et
}, Symbol.toStringTag, { value: "Module" }));
function lt(e) {
  var r = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  return Z(e, function(t) {
    r[0] > t[0] && (r[0] = t[0]), r[1] > t[1] && (r[1] = t[1]), r[2] < t[0] && (r[2] = t[0]), r[3] < t[1] && (r[3] = t[1]);
  }), r;
}
lt.default = lt;
const oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lt
}, Symbol.toStringTag, { value: "Module" }));
function $(e) {
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
function H(e) {
  if (Array.isArray(e))
    return e;
  if (e.type === "Feature") {
    if (e.geometry !== null)
      return e.geometry.coordinates;
  } else if (e.coordinates)
    return e.coordinates;
  throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
function ae(e) {
  return e.type === "Feature" ? e.geometry : e;
}
function se(e, r) {
  return e.type === "FeatureCollection" ? "FeatureCollection" : e.type === "GeometryCollection" ? "GeometryCollection" : e.type === "Feature" && e.geometry !== null ? e.geometry.type : e.type;
}
var Ot = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function le(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function pt(e) {
  if (e.__esModule)
    return e;
  var r = e.default;
  if (typeof r == "function") {
    var t = function i() {
      return this instanceof i ? Reflect.construct(r, arguments, this.constructor) : r.apply(this, arguments);
    };
    t.prototype = r.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(e).forEach(function(i) {
    var n = Object.getOwnPropertyDescriptor(e, i);
    Object.defineProperty(t, i, n.get ? n : {
      enumerable: !0,
      get: function() {
        return e[i];
      }
    });
  }), t;
}
function I(e, r, t) {
  t === void 0 && (t = {});
  var i = $(e), n = $(r), o = F(n[1] - i[1]), u = F(n[0] - i[0]), f = F(i[1]), l = F(n[1]), v = Math.pow(Math.sin(o / 2), 2) + Math.pow(Math.sin(u / 2), 2) * Math.cos(f) * Math.cos(l);
  return ft(2 * Math.atan2(Math.sqrt(v), Math.sqrt(1 - v)), t.units);
}
function tt(e, r, t, i) {
  i === void 0 && (i = {});
  var n = $(e), o = F(n[0]), u = F(n[1]), f = F(t), l = ot(r, i.units), v = Math.asin(Math.sin(u) * Math.cos(l) + Math.cos(u) * Math.sin(l) * Math.cos(f)), S = o + Math.atan2(Math.sin(f) * Math.sin(l) * Math.cos(u), Math.cos(l) - Math.sin(u) * Math.sin(v)), P = j(S), O = j(v);
  return A([P, O], i.properties);
}
function G(e, r, t) {
  if (t === void 0 && (t = {}), t.final === !0)
    return he(e, r);
  var i = $(e), n = $(r), o = F(i[0]), u = F(n[0]), f = F(i[1]), l = F(n[1]), v = Math.sin(u - o) * Math.cos(l), S = Math.cos(f) * Math.sin(l) - Math.sin(f) * Math.cos(l) * Math.cos(u - o);
  return j(Math.atan2(v, S));
}
function he(e, r) {
  var t = G(r, e);
  return t = (t + 180) % 360, t;
}
function mt(e) {
  if (!e)
    throw new Error("geojson is required");
  var r = [];
  return K(e, function(t) {
    ue(t, r);
  }), N(r);
}
function ue(e, r) {
  var t = [], i = e.geometry;
  if (i !== null) {
    switch (i.type) {
      case "Polygon":
        t = H(i);
        break;
      case "LineString":
        t = [H(i)];
    }
    t.forEach(function(n) {
      var o = fe(n, e.properties);
      o.forEach(function(u) {
        u.id = r.length, r.push(u);
      });
    });
  }
}
function fe(e, r) {
  var t = [];
  return e.reduce(function(i, n) {
    var o = B([i, n], r);
    return o.bbox = ce(i, n), t.push(o), n;
  }), t;
}
function ce(e, r) {
  var t = e[0], i = e[1], n = r[0], o = r[1], u = t < n ? t : n, f = i < o ? i : o, l = t > n ? t : n, v = i > o ? i : o;
  return [u, f, l, v];
}
var dt = { exports: {} }, Lt = { exports: {} };
(function(e, r) {
  (function(t, i) {
    e.exports = i();
  })(Ot, function() {
    function t(a, s, c, d, y) {
      (function b(w, x, _, k, R) {
        for (; k > _; ) {
          if (k - _ > 600) {
            var E = k - _ + 1, T = x - _ + 1, Q = Math.log(E), q = 0.5 * Math.exp(2 * Q / 3), J = 0.5 * Math.sqrt(Q * q * (E - q) / E) * (T - E / 2 < 0 ? -1 : 1), U = Math.max(_, Math.floor(x - T * q / E + J)), Ct = Math.min(k, Math.floor(x + (E - T) * q / E + J));
            b(w, x, U, Ct, R);
          }
          var et = w[x], W = _, Y = k;
          for (i(w, _, x), R(w[k], et) > 0 && i(w, _, k); W < Y; ) {
            for (i(w, W, Y), W++, Y--; R(w[W], et) < 0; )
              W++;
            for (; R(w[Y], et) > 0; )
              Y--;
          }
          R(w[_], et) === 0 ? i(w, _, Y) : i(w, ++Y, k), Y <= x && (_ = Y + 1), x <= Y && (k = Y - 1);
        }
      })(a, s, c || 0, d || a.length - 1, y || n);
    }
    function i(a, s, c) {
      var d = a[s];
      a[s] = a[c], a[c] = d;
    }
    function n(a, s) {
      return a < s ? -1 : a > s ? 1 : 0;
    }
    var o = function(a) {
      a === void 0 && (a = 9), this._maxEntries = Math.max(4, a), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
    };
    function u(a, s, c) {
      if (!c)
        return s.indexOf(a);
      for (var d = 0; d < s.length; d++)
        if (c(a, s[d]))
          return d;
      return -1;
    }
    function f(a, s) {
      l(a, 0, a.children.length, s, a);
    }
    function l(a, s, c, d, y) {
      y || (y = g(null)), y.minX = 1 / 0, y.minY = 1 / 0, y.maxX = -1 / 0, y.maxY = -1 / 0;
      for (var b = s; b < c; b++) {
        var w = a.children[b];
        v(y, a.leaf ? d(w) : w);
      }
      return y;
    }
    function v(a, s) {
      return a.minX = Math.min(a.minX, s.minX), a.minY = Math.min(a.minY, s.minY), a.maxX = Math.max(a.maxX, s.maxX), a.maxY = Math.max(a.maxY, s.maxY), a;
    }
    function S(a, s) {
      return a.minX - s.minX;
    }
    function P(a, s) {
      return a.minY - s.minY;
    }
    function O(a) {
      return (a.maxX - a.minX) * (a.maxY - a.minY);
    }
    function p(a) {
      return a.maxX - a.minX + (a.maxY - a.minY);
    }
    function h(a, s) {
      return a.minX <= s.minX && a.minY <= s.minY && s.maxX <= a.maxX && s.maxY <= a.maxY;
    }
    function m(a, s) {
      return s.minX <= a.maxX && s.minY <= a.maxY && s.maxX >= a.minX && s.maxY >= a.minY;
    }
    function g(a) {
      return { children: a, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
    }
    function M(a, s, c, d, y) {
      for (var b = [s, c]; b.length; )
        if (!((c = b.pop()) - (s = b.pop()) <= d)) {
          var w = s + Math.ceil((c - s) / d / 2) * d;
          t(a, w, s, c, y), b.push(s, w, w, c);
        }
    }
    return o.prototype.all = function() {
      return this._all(this.data, []);
    }, o.prototype.search = function(a) {
      var s = this.data, c = [];
      if (!m(a, s))
        return c;
      for (var d = this.toBBox, y = []; s; ) {
        for (var b = 0; b < s.children.length; b++) {
          var w = s.children[b], x = s.leaf ? d(w) : w;
          m(a, x) && (s.leaf ? c.push(w) : h(a, x) ? this._all(w, c) : y.push(w));
        }
        s = y.pop();
      }
      return c;
    }, o.prototype.collides = function(a) {
      var s = this.data;
      if (!m(a, s))
        return !1;
      for (var c = []; s; ) {
        for (var d = 0; d < s.children.length; d++) {
          var y = s.children[d], b = s.leaf ? this.toBBox(y) : y;
          if (m(a, b)) {
            if (s.leaf || h(a, b))
              return !0;
            c.push(y);
          }
        }
        s = c.pop();
      }
      return !1;
    }, o.prototype.load = function(a) {
      if (!a || !a.length)
        return this;
      if (a.length < this._minEntries) {
        for (var s = 0; s < a.length; s++)
          this.insert(a[s]);
        return this;
      }
      var c = this._build(a.slice(), 0, a.length - 1, 0);
      if (this.data.children.length)
        if (this.data.height === c.height)
          this._splitRoot(this.data, c);
        else {
          if (this.data.height < c.height) {
            var d = this.data;
            this.data = c, c = d;
          }
          this._insert(c, this.data.height - c.height - 1, !0);
        }
      else
        this.data = c;
      return this;
    }, o.prototype.insert = function(a) {
      return a && this._insert(a, this.data.height - 1), this;
    }, o.prototype.clear = function() {
      return this.data = g([]), this;
    }, o.prototype.remove = function(a, s) {
      if (!a)
        return this;
      for (var c, d, y, b = this.data, w = this.toBBox(a), x = [], _ = []; b || x.length; ) {
        if (b || (b = x.pop(), d = x[x.length - 1], c = _.pop(), y = !0), b.leaf) {
          var k = u(a, b.children, s);
          if (k !== -1)
            return b.children.splice(k, 1), x.push(b), this._condense(x), this;
        }
        y || b.leaf || !h(b, w) ? d ? (c++, b = d.children[c], y = !1) : b = null : (x.push(b), _.push(c), c = 0, d = b, b = b.children[0]);
      }
      return this;
    }, o.prototype.toBBox = function(a) {
      return a;
    }, o.prototype.compareMinX = function(a, s) {
      return a.minX - s.minX;
    }, o.prototype.compareMinY = function(a, s) {
      return a.minY - s.minY;
    }, o.prototype.toJSON = function() {
      return this.data;
    }, o.prototype.fromJSON = function(a) {
      return this.data = a, this;
    }, o.prototype._all = function(a, s) {
      for (var c = []; a; )
        a.leaf ? s.push.apply(s, a.children) : c.push.apply(c, a.children), a = c.pop();
      return s;
    }, o.prototype._build = function(a, s, c, d) {
      var y, b = c - s + 1, w = this._maxEntries;
      if (b <= w)
        return f(y = g(a.slice(s, c + 1)), this.toBBox), y;
      d || (d = Math.ceil(Math.log(b) / Math.log(w)), w = Math.ceil(b / Math.pow(w, d - 1))), (y = g([])).leaf = !1, y.height = d;
      var x = Math.ceil(b / w), _ = x * Math.ceil(Math.sqrt(w));
      M(a, s, c, _, this.compareMinX);
      for (var k = s; k <= c; k += _) {
        var R = Math.min(k + _ - 1, c);
        M(a, k, R, x, this.compareMinY);
        for (var E = k; E <= R; E += x) {
          var T = Math.min(E + x - 1, R);
          y.children.push(this._build(a, E, T, d - 1));
        }
      }
      return f(y, this.toBBox), y;
    }, o.prototype._chooseSubtree = function(a, s, c, d) {
      for (; d.push(s), !s.leaf && d.length - 1 !== c; ) {
        for (var y = 1 / 0, b = 1 / 0, w = void 0, x = 0; x < s.children.length; x++) {
          var _ = s.children[x], k = O(_), R = (E = a, T = _, (Math.max(T.maxX, E.maxX) - Math.min(T.minX, E.minX)) * (Math.max(T.maxY, E.maxY) - Math.min(T.minY, E.minY)) - k);
          R < b ? (b = R, y = k < y ? k : y, w = _) : R === b && k < y && (y = k, w = _);
        }
        s = w || s.children[0];
      }
      var E, T;
      return s;
    }, o.prototype._insert = function(a, s, c) {
      var d = c ? a : this.toBBox(a), y = [], b = this._chooseSubtree(d, this.data, s, y);
      for (b.children.push(a), v(b, d); s >= 0 && y[s].children.length > this._maxEntries; )
        this._split(y, s), s--;
      this._adjustParentBBoxes(d, y, s);
    }, o.prototype._split = function(a, s) {
      var c = a[s], d = c.children.length, y = this._minEntries;
      this._chooseSplitAxis(c, y, d);
      var b = this._chooseSplitIndex(c, y, d), w = g(c.children.splice(b, c.children.length - b));
      w.height = c.height, w.leaf = c.leaf, f(c, this.toBBox), f(w, this.toBBox), s ? a[s - 1].children.push(w) : this._splitRoot(c, w);
    }, o.prototype._splitRoot = function(a, s) {
      this.data = g([a, s]), this.data.height = a.height + 1, this.data.leaf = !1, f(this.data, this.toBBox);
    }, o.prototype._chooseSplitIndex = function(a, s, c) {
      for (var d, y, b, w, x, _, k, R = 1 / 0, E = 1 / 0, T = s; T <= c - s; T++) {
        var Q = l(a, 0, T, this.toBBox), q = l(a, T, c, this.toBBox), J = (y = Q, b = q, w = void 0, x = void 0, _ = void 0, k = void 0, w = Math.max(y.minX, b.minX), x = Math.max(y.minY, b.minY), _ = Math.min(y.maxX, b.maxX), k = Math.min(y.maxY, b.maxY), Math.max(0, _ - w) * Math.max(0, k - x)), U = O(Q) + O(q);
        J < R ? (R = J, d = T, E = U < E ? U : E) : J === R && U < E && (E = U, d = T);
      }
      return d || c - s;
    }, o.prototype._chooseSplitAxis = function(a, s, c) {
      var d = a.leaf ? this.compareMinX : S, y = a.leaf ? this.compareMinY : P;
      this._allDistMargin(a, s, c, d) < this._allDistMargin(a, s, c, y) && a.children.sort(d);
    }, o.prototype._allDistMargin = function(a, s, c, d) {
      a.children.sort(d);
      for (var y = this.toBBox, b = l(a, 0, s, y), w = l(a, c - s, c, y), x = p(b) + p(w), _ = s; _ < c - s; _++) {
        var k = a.children[_];
        v(b, a.leaf ? y(k) : k), x += p(b);
      }
      for (var R = c - s - 1; R >= s; R--) {
        var E = a.children[R];
        v(w, a.leaf ? y(E) : E), x += p(w);
      }
      return x;
    }, o.prototype._adjustParentBBoxes = function(a, s, c) {
      for (var d = c; d >= 0; d--)
        v(s[d], a);
    }, o.prototype._condense = function(a) {
      for (var s = a.length - 1, c = void 0; s >= 0; s--)
        a[s].children.length === 0 ? s > 0 ? (c = a[s - 1].children).splice(c.indexOf(a[s]), 1) : this.clear() : f(a[s], this.toBBox);
    }, o;
  });
})(Lt);
var pe = Lt.exports;
const de = /* @__PURE__ */ pt(Zt), me = /* @__PURE__ */ pt(ne), ve = /* @__PURE__ */ pt(oe);
var D = pe, Rt = de, Bt = me, V = ve.default, ge = Bt.featureEach;
Bt.coordEach;
Rt.polygon;
var vt = Rt.featureCollection;
function Tt(e) {
  var r = new D(e);
  return r.insert = function(t) {
    if (t.type !== "Feature")
      throw new Error("invalid feature");
    return t.bbox = t.bbox ? t.bbox : V(t), D.prototype.insert.call(this, t);
  }, r.load = function(t) {
    var i = [];
    return Array.isArray(t) ? t.forEach(function(n) {
      if (n.type !== "Feature")
        throw new Error("invalid features");
      n.bbox = n.bbox ? n.bbox : V(n), i.push(n);
    }) : ge(t, function(n) {
      if (n.type !== "Feature")
        throw new Error("invalid features");
      n.bbox = n.bbox ? n.bbox : V(n), i.push(n);
    }), D.prototype.load.call(this, i);
  }, r.remove = function(t, i) {
    if (t.type !== "Feature")
      throw new Error("invalid feature");
    return t.bbox = t.bbox ? t.bbox : V(t), D.prototype.remove.call(this, t, i);
  }, r.clear = function() {
    return D.prototype.clear.call(this);
  }, r.search = function(t) {
    var i = D.prototype.search.call(this, this.toBBox(t));
    return vt(i);
  }, r.collides = function(t) {
    return D.prototype.collides.call(this, this.toBBox(t));
  }, r.all = function() {
    var t = D.prototype.all.call(this);
    return vt(t);
  }, r.toJSON = function() {
    return D.prototype.toJSON.call(this);
  }, r.fromJSON = function(t) {
    return D.prototype.fromJSON.call(this, t);
  }, r.toBBox = function(t) {
    var i;
    if (t.bbox)
      i = t.bbox;
    else if (Array.isArray(t) && t.length === 4)
      i = t;
    else if (Array.isArray(t) && t.length === 6)
      i = [t[0], t[1], t[3], t[4]];
    else if (t.type === "Feature")
      i = V(t);
    else if (t.type === "FeatureCollection")
      i = V(t);
    else
      throw new Error("invalid geojson");
    return {
      minX: i[0],
      minY: i[1],
      maxX: i[2],
      maxY: i[3]
    };
  }, r;
}
dt.exports = Tt;
dt.exports.default = Tt;
var ye = dt.exports;
const be = /* @__PURE__ */ le(ye);
function we(e, r) {
  var t = {}, i = [];
  if (e.type === "LineString" && (e = X(e)), r.type === "LineString" && (r = X(r)), e.type === "Feature" && r.type === "Feature" && e.geometry !== null && r.geometry !== null && e.geometry.type === "LineString" && r.geometry.type === "LineString" && e.geometry.coordinates.length === 2 && r.geometry.coordinates.length === 2) {
    var n = gt(e, r);
    return n && i.push(n), N(i);
  }
  var o = be();
  return o.load(mt(r)), nt(mt(e), function(u) {
    nt(o.search(u), function(f) {
      var l = gt(u, f);
      if (l) {
        var v = H(l).join(",");
        t[v] || (t[v] = !0, i.push(l));
      }
    });
  }), N(i);
}
function gt(e, r) {
  var t = H(e), i = H(r);
  if (t.length !== 2)
    throw new Error("<intersects> line1 must only contain 2 coordinates");
  if (i.length !== 2)
    throw new Error("<intersects> line2 must only contain 2 coordinates");
  var n = t[0][0], o = t[0][1], u = t[1][0], f = t[1][1], l = i[0][0], v = i[0][1], S = i[1][0], P = i[1][1], O = (P - v) * (u - n) - (S - l) * (f - o), p = (S - l) * (o - v) - (P - v) * (n - l), h = (u - n) * (o - v) - (f - o) * (n - l);
  if (O === 0)
    return null;
  var m = p / O, g = h / O;
  if (m >= 0 && m <= 1 && g >= 0 && g <= 1) {
    var M = n + m * (u - n), a = o + m * (f - o);
    return A([M, a]);
  }
  return null;
}
function yt(e, r, t) {
  t === void 0 && (t = {});
  var i = A([1 / 0, 1 / 0], {
    dist: 1 / 0
  }), n = 0;
  return K(e, function(o) {
    for (var u = H(o), f = 0; f < u.length - 1; f++) {
      var l = A(u[f]);
      l.properties.dist = I(r, l, t);
      var v = A(u[f + 1]);
      v.properties.dist = I(r, v, t);
      var S = I(l, v, t), P = Math.max(l.properties.dist, v.properties.dist), O = G(l, v), p = tt(r, P, O + 90, t), h = tt(r, P, O - 90, t), m = we(B([
        p.geometry.coordinates,
        h.geometry.coordinates
      ]), B([l.geometry.coordinates, v.geometry.coordinates])), g = null;
      m.features.length > 0 && (g = m.features[0], g.properties.dist = I(r, g, t), g.properties.location = n + I(l, g, t)), l.properties.dist < i.properties.dist && (i = l, i.properties.index = f, i.properties.location = n), v.properties.dist < i.properties.dist && (i = v, i.properties.index = f + 1, i.properties.location = n + S), g && g.properties.dist < i.properties.dist && (i = g, i.properties.index = f), n += S;
    }
  }), i;
}
function bt(e, r, t) {
  t === void 0 && (t = {});
  for (var i = ae(e), n = i.coordinates, o = 0, u = 0; u < n.length && !(r >= o && u === n.length - 1); u++)
    if (o >= r) {
      var f = r - o;
      if (f) {
        var l = G(n[u], n[u - 1]) - 180, v = tt(n[u], f, l, t);
        return v;
      } else
        return A(n[u]);
    } else
      o += I(n[u], n[u + 1], t);
  return A(n[n.length - 1]);
}
function wt(e, r) {
  return r === void 0 && (r = {}), Et(e, function(t, i) {
    var n = i.geometry.coordinates;
    return t + I(n[0], n[1], r);
  }, 0);
}
function Mt(e, r, t) {
  var i = H(t);
  if (se(t) !== "LineString")
    throw new Error("line must be a LineString");
  var n = yt(t, e), o = yt(t, r), u;
  n.properties.index <= o.properties.index ? u = [n, o] : u = [o, n];
  for (var f = [u[0].geometry.coordinates], l = u[0].properties.index + 1; l < u[1].properties.index + 1; l++)
    f.push(i[l]);
  return f.push(u[1].geometry.coordinates), B(f, t.properties);
}
function rt(e, r, t, i) {
  if (i = i || {}, !at(i))
    throw new Error("options is invalid");
  var n, o = [];
  if (e.type === "Feature")
    n = e.geometry.coordinates;
  else if (e.type === "LineString")
    n = e.coordinates;
  else
    throw new Error("input must be a LineString Feature or Geometry");
  for (var u = n.length, f = 0, l, v, S, P = 0; P < n.length && !(r >= f && P === n.length - 1); P++) {
    if (f > r && o.length === 0) {
      if (l = r - f, !l)
        return o.push(n[P]), B(o);
      v = G(n[P], n[P - 1]) - 180, S = tt(n[P], l, v, i), o.push(S.geometry.coordinates);
    }
    if (f >= t)
      return l = t - f, l ? (v = G(n[P], n[P - 1]) - 180, S = tt(n[P], l, v, i), o.push(S.geometry.coordinates), B(o)) : (o.push(n[P]), B(o));
    if (f >= r && o.push(n[P]), P === n.length - 1)
      return B(o);
    f += I(n[P], n[P + 1], i);
  }
  if (f < r && n.length === u)
    throw new Error("Start position is beyond line");
  var O = n[n.length - 1];
  return B([O, O]);
}
(function(e, r) {
  (function(t, i) {
    i(z);
  })(Ot, function(t) {
    t = t && t.hasOwnProperty("default") ? t.default : t;
    function i(p, h) {
      var m = h.x - p.x, g = h.y - p.y;
      return Math.sqrt(m * m + g * g);
    }
    var n = function(h, m) {
      return (Math.atan2(m.y - h.y, m.x - h.x) * 180 / Math.PI + 90 + 360) % 360;
    }, o = function(h, m) {
      var g = h.value, M = h.isInPixels;
      return M ? g / m : g;
    };
    function u(p) {
      if (typeof p == "string" && p.indexOf("%") !== -1)
        return {
          value: parseFloat(p) / 100,
          isInPixels: !1
        };
      var h = p ? parseFloat(p) : 0;
      return {
        value: h,
        isInPixels: h > 0
      };
    }
    var f = function(h, m) {
      return h.x === m.x && h.y === m.y;
    };
    function l(p) {
      return p.reduce(function(h, m, g, M) {
        if (g > 0 && !f(m, M[g - 1])) {
          var a = M[g - 1], s = h.length > 0 ? h[h.length - 1].distB : 0, c = i(a, m);
          h.push({
            a,
            b: m,
            distA: s,
            distB: s + c,
            heading: n(a, m)
          });
        }
        return h;
      }, []);
    }
    function v(p, h) {
      var m = l(p), g = m.length;
      if (g === 0)
        return [];
      var M = m[g - 1].distB, a = o(h.offset, M), s = o(h.endOffset, M), c = o(h.repeat, M), d = M * c, y = a > 0 ? M * a : 0, b = s > 0 ? M * s : 0, w = [], x = y;
      do
        w.push(x), x += d;
      while (d > 0 && x < M - b);
      var _ = 0, k = m[0];
      return w.map(function(R) {
        for (; R > k.distB && _ < g - 1; )
          _++, k = m[_];
        var E = (R - k.distA) / (k.distB - k.distA);
        return {
          pt: S(k.a, k.b, E),
          heading: k.heading
        };
      });
    }
    function S(p, h, m) {
      return h.x !== p.x ? {
        x: p.x + m * (h.x - p.x),
        y: p.y + m * (h.y - p.y)
      } : {
        x: p.x,
        y: p.y + (h.y - p.y) * m
      };
    }
    (function() {
      var p = L.Marker.prototype._initIcon, h = L.Marker.prototype._setPos, m = L.DomUtil.TRANSFORM === "msTransform";
      L.Marker.addInitHook(function() {
        var g = this.options.icon && this.options.icon.options, M = g && this.options.icon.options.iconAnchor;
        M && (M = M[0] + "px " + M[1] + "px"), this.options.rotationOrigin = this.options.rotationOrigin || M || "center bottom", this.options.rotationAngle = this.options.rotationAngle || 0, this.on("drag", function(a) {
          a.target._applyRotation();
        });
      }), L.Marker.include({
        _initIcon: function() {
          p.call(this);
        },
        _setPos: function(g) {
          h.call(this, g), this._applyRotation();
        },
        _applyRotation: function() {
          this.options.rotationAngle && (this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin, m ? this._icon.style[L.DomUtil.TRANSFORM] = "rotate(" + this.options.rotationAngle + "deg)" : this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)");
        },
        setRotationAngle: function(g) {
          return this.options.rotationAngle = g, this.update(), this;
        },
        setRotationOrigin: function(g) {
          return this.options.rotationOrigin = g, this.update(), this;
        }
      });
    })(), t.Symbol = t.Symbol || {}, t.Symbol.Dash = t.Class.extend({
      options: {
        pixelSize: 10,
        pathOptions: {}
      },
      initialize: function(h) {
        t.Util.setOptions(this, h), this.options.pathOptions.clickable = !1;
      },
      buildSymbol: function(h, m, g, M, a) {
        var s = this.options, c = Math.PI / 180;
        if (s.pixelSize <= 1)
          return t.polyline([h.latLng, h.latLng], s.pathOptions);
        var d = g.project(h.latLng), y = -(h.heading - 90) * c, b = t.point(d.x + s.pixelSize * Math.cos(y + Math.PI) / 2, d.y + s.pixelSize * Math.sin(y) / 2), w = d.add(d.subtract(b));
        return t.polyline([g.unproject(b), g.unproject(w)], s.pathOptions);
      }
    }), t.Symbol.dash = function(p) {
      return new t.Symbol.Dash(p);
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
      initialize: function(h) {
        t.Util.setOptions(this, h), this.options.pathOptions.clickable = !1;
      },
      buildSymbol: function(h, m, g, M, a) {
        return this.options.polygon ? t.polygon(this._buildArrowPath(h, g), this.options.pathOptions) : t.polyline(this._buildArrowPath(h, g), this.options.pathOptions);
      },
      _buildArrowPath: function(h, m) {
        var g = Math.PI / 180, M = m.project(h.latLng), a = -(h.heading - 90) * g, s = this.options.headAngle / 2 * g, c = a + s, d = a - s, y = t.point(M.x - this.options.pixelSize * Math.cos(c), M.y + this.options.pixelSize * Math.sin(c)), b = t.point(M.x - this.options.pixelSize * Math.cos(d), M.y + this.options.pixelSize * Math.sin(d));
        return [m.unproject(y), h.latLng, m.unproject(b)];
      }
    }), t.Symbol.arrowHead = function(p) {
      return new t.Symbol.ArrowHead(p);
    }, t.Symbol.Marker = t.Class.extend({
      options: {
        markerOptions: {},
        rotate: !1
      },
      initialize: function(h) {
        t.Util.setOptions(this, h), this.options.markerOptions.clickable = !1, this.options.markerOptions.draggable = !1;
      },
      buildSymbol: function(h, m, g, M, a) {
        return this.options.rotate && (this.options.markerOptions.rotationAngle = h.heading + (this.options.angleCorrection || 0)), t.marker(h.latLng, this.options.markerOptions);
      }
    }), t.Symbol.marker = function(p) {
      return new t.Symbol.Marker(p);
    };
    var P = function(h) {
      return h instanceof t.LatLng || Array.isArray(h) && h.length === 2 && typeof h[0] == "number";
    }, O = function(h) {
      return Array.isArray(h) && P(h[0]);
    };
    t.PolylineDecorator = t.FeatureGroup.extend({
      options: {
        patterns: []
      },
      initialize: function(h, m) {
        t.FeatureGroup.prototype.initialize.call(this), t.Util.setOptions(this, m), this._map = null, this._paths = this._initPaths(h), this._bounds = this._initBounds(), this._patterns = this._initPatterns(this.options.patterns);
      },
      /**
      * Deals with all the different cases. input can be one of these types:
      * array of LatLng, array of 2-number arrays, Polyline, Polygon,
      * array of one of the previous.
      */
      _initPaths: function(h, m) {
        var g = this;
        if (O(h)) {
          var M = m ? h.concat([h[0]]) : h;
          return [M];
        }
        return h instanceof t.Polyline ? this._initPaths(h.getLatLngs(), h instanceof t.Polygon) : Array.isArray(h) ? h.reduce(function(a, s) {
          return a.concat(g._initPaths(s, m));
        }, []) : [];
      },
      // parse pattern definitions and precompute some values
      _initPatterns: function(h) {
        return h.map(this._parsePatternDef);
      },
      /**
      * Changes the patterns used by this decorator
      * and redraws the new one.
      */
      setPatterns: function(h) {
        this.options.patterns = h, this._patterns = this._initPatterns(this.options.patterns), this.redraw();
      },
      /**
      * Changes the patterns used by this decorator
      * and redraws the new one.
      */
      setPaths: function(h) {
        this._paths = this._initPaths(h), this._bounds = this._initBounds(), this.redraw();
      },
      /**
      * Parse the pattern definition
      */
      _parsePatternDef: function(h, m) {
        return {
          symbolFactory: h.symbol,
          // Parse offset and repeat values, managing the two cases:
          // absolute (in pixels) or relative (in percentage of the polyline length)
          offset: u(h.offset),
          endOffset: u(h.endOffset),
          repeat: u(h.repeat)
        };
      },
      onAdd: function(h) {
        this._map = h, this._draw(), this._map.on("moveend", this.redraw, this);
      },
      onRemove: function(h) {
        this._map.off("moveend", this.redraw, this), this._map = null, t.FeatureGroup.prototype.onRemove.call(this, h);
      },
      /**
      * As real pattern bounds depends on map zoom and bounds,
      * we just compute the total bounds of all paths decorated by this instance.
      */
      _initBounds: function() {
        var h = this._paths.reduce(function(m, g) {
          return m.concat(g);
        }, []);
        return t.latLngBounds(h);
      },
      getBounds: function() {
        return this._bounds;
      },
      /**
      * Returns an array of ILayers object
      */
      _buildSymbols: function(h, m, g) {
        var M = this;
        return g.map(function(a, s) {
          return m.buildSymbol(a, h, M._map, s, g.length);
        });
      },
      /**
      * Compute pairs of LatLng and heading angle,
      * that define positions and directions of the symbols on the path
      */
      _getDirectionPoints: function(h, m) {
        var g = this;
        if (h.length < 2)
          return [];
        var M = h.map(function(a) {
          return g._map.project(a);
        });
        return v(M, m).map(function(a) {
          return {
            latLng: g._map.unproject(t.point(a.pt)),
            heading: a.heading
          };
        });
      },
      redraw: function() {
        this._map && (this.clearLayers(), this._draw());
      },
      /**
      * Returns all symbols for a given pattern as an array of FeatureGroup
      */
      _getPatternLayers: function(h) {
        var m = this, g = this._map.getBounds().pad(0.1);
        return this._paths.map(function(M) {
          var a = m._getDirectionPoints(M, h).filter(function(s) {
            return g.contains(s.latLng);
          });
          return t.featureGroup(m._buildSymbols(M, h.symbolFactory, a));
        });
      },
      /**
      * Draw all patterns
      */
      _draw: function() {
        var h = this;
        this._patterns.map(function(m) {
          return h._getPatternLayers(m);
        }).forEach(function(m) {
          h.addLayer(t.featureGroup(m));
        });
      }
    }), t.polylineDecorator = function(p, h) {
      return new t.PolylineDecorator(p, h);
    };
  });
})();
(function() {
  var e = L.Marker.prototype._initIcon, r = L.Marker.prototype._setPos, t = L.DomUtil.TRANSFORM === "msTransform";
  L.Marker.addInitHook(function() {
    var i = this.options.icon && this.options.icon.options, n = i && this.options.icon.options.iconAnchor;
    n && (n = n[0] + "px " + n[1] + "px"), this.options.rotationOrigin = this.options.rotationOrigin || n || "center bottom", this.options.rotationAngle = this.options.rotationAngle || 0, this.on("drag", function(o) {
      o.target._applyRotation();
    });
  }), L.Marker.include({
    _initIcon: function() {
      e.call(this);
    },
    _setPos: function(i) {
      r.call(this, i), this._applyRotation();
    },
    _applyRotation: function() {
      this.options.rotationAngle && (this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin, t ? this._icon.style[L.DomUtil.TRANSFORM] = "rotate(" + this.options.rotationAngle + "deg)" : this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)");
    },
    setRotationAngle: function(i) {
      return this.options.rotationAngle = i, this.update(), this;
    },
    setRotationOrigin: function(i) {
      return this.options.rotationOrigin = i, this.update(), this;
    }
  });
})();
z.TrackPlayer = class {
  constructor(e, r = {}) {
    this.options = {
      speed: r.speed ?? 600,
      weight: r.weight ?? 8,
      marker: r.marker,
      polylineDecoratorOptions: r.polylineDecoratorOptions ?? {
        patterns: [
          {
            offset: 30,
            repeat: 60,
            symbol: z.Symbol.arrowHead({
              pixelSize: 5,
              headAngle: 75,
              polygon: !1,
              pathOptions: { stroke: !0, weight: 3, color: "#fff" }
            })
          }
        ]
      },
      passedLineColor: r.passedLineColor ?? "#0000ff",
      notPassedLineColor: r.notPassedLineColor ?? "#ff0000",
      panTo: r.panTo ?? !0,
      markerRotationOrigin: r.markerRotationOrigin ?? "center",
      markerRotationOffset: r.markerRotationOffset ?? 0,
      markerRotation: r.markerRotation ?? !0,
      progress: r.progress ?? 0
    }, this.markerInitLnglat = r.marker ? r.marker.getLatLng() : "", this.isPaused = !0, this.pauseDuration = 0, this.advances = 0, this.advancesTemp = 0;
    let t = z.polyline(e)._latlngs;
    this.track = B(t.map(({ lng: i, lat: n }) => [i, n])), this.listenedEvents = {
      start: [],
      pause: [],
      finished: [],
      movingCallback: [],
      progressCallback: []
    };
  }
  addTo(e) {
    if (this.map = e, this.options.marker && (this.options.marker.addTo(this.map), this.options.markerRotation)) {
      let r = this.track.geometry.coordinates;
      this.options.marker.setRotationAngle(
        G(r[0], r[1]) / 2 + this.options.markerRotationOffset / 2
      ), this.options.marker.setRotationOrigin(
        this.options.markerRotationOrigin
      );
    }
    return this.createLine(), this;
  }
  remove() {
    this.polylineDecorator && (this.polylineDecorator.remove(), this.polylineDecorator = null, this.notPassedLine.remove(), this.notPassedLine = null, this.passedLine.remove(), this.passedLine = null, this.options.marker && (this.options.marker.remove(), this.options.marker.setLatLng(this.markerInitLnglat)), this.finished = !1, this.startTimestamp = 0, this.pauseTimestamp = 0, this.advancesTemp = 0, this.advances = 0, this.pause());
  }
  createLine() {
    let e = this.track.geometry.coordinates.map(([r, t]) => [t, r]);
    this.notPassedLine = z.polyline(e, {
      weight: this.options.weight,
      color: this.options.notPassedLineColor
    }).addTo(this.map), this.passedLine = z.polyline([], {
      weight: this.options.weight,
      color: this.options.passedLineColor
    }).addTo(this.map), this.polylineDecorator = z.polylineDecorator(
      e,
      this.options.polylineDecoratorOptions
    ).addTo(this.map);
  }
  start() {
    !this.isPaused || !this.polylineDecorator || ((this.finished && this.options.progress === 0 || this.options.progress === 100) && (this.finished = !1, this.startTimestamp = 0, this.pauseTimestamp = 0, this.advancesTemp = 0, this.advances = 0), this.isPaused = !1, this.pauseTimestamp && this.startTimestamp && (this.startTimestamp = this.startTimestamp + (Date.now() - this.pauseTimestamp)), this.startAction(), this.listenedEvents.start.forEach((e) => e()));
  }
  pause() {
    this.isPaused || (cancelAnimationFrame(this.reqId), this.pauseTimestamp = Date.now(), this.isPaused = !0, this.listenedEvents.pause.forEach((e) => e()));
  }
  startAction() {
    let e = wt(this.track), r = (t) => {
      if (t && !this.isPaused) {
        let i = e / this.options.speed * 3600 * 1e3;
        this.startTimestamp || (this.startTimestamp = t);
        let n = t - this.startTimestamp;
        this.advances = e * (n / i) + this.advancesTemp;
        let [o, u] = bt(this.track, this.advances).geometry.coordinates;
        if (this.markerPoint = [u, o], this.options.panTo && this.map.panTo(this.markerPoint, {
          animate: !1
        }), this.options.marker && this.options.marker.setLatLng(this.markerPoint), this.advances >= e)
          this.notPassedLine.setLatLngs([]);
        else {
          let f = rt(this.track, this.advances);
          this.notPassedLine.setLatLngs(
            f.geometry.coordinates.map(([l, v]) => [v, l])
          );
        }
        if (this.advances > 0) {
          let f = rt(this.track, 0, this.advances);
          this.passedLine.setLatLngs(
            f.geometry.coordinates.map(([l, v]) => [v, l])
          );
        }
        if (this.advances < e) {
          let f = Mt(
            A([o, u]),
            A(this.track.geometry.coordinates.at(-1)),
            this.track
          );
          if (this.options.markerRotation && this.options.marker) {
            let l = f.geometry.coordinates, v = G(
              A(l[0]),
              A(l[1])
            );
            this.options.marker.setRotationAngle(
              v / 2 + this.options.markerRotationOffset / 2
            );
          }
        }
        if (this.listenedEvents.movingCallback.forEach(
          (f) => f(z.latLng(...this.markerPoint))
        ), this.advances <= e && (this.options.progress = Math.ceil(this.advances / e * 100), this.listenedEvents.progressCallback.forEach(
          (f) => f(z.latLng(...this.markerPoint), this.options.progress)
        )), this.advances > e) {
          if (this.isPaused = !0, this.finished = !0, this.listenedEvents.finished.forEach((f) => f()), this.options.markerRotation && this.options.marker) {
            let f = this.track.geometry.coordinates, l = G(
              A(f.at(-2)),
              A(f.at(-1))
            );
            this.options.marker.setRotationAngle(
              l / 2 + this.options.markerRotationOffset / 2
            );
          }
          return;
        }
      }
      this.reqId = requestAnimationFrame(r);
    };
    r();
  }
  setSpeed(e, r = 20) {
    clearTimeout(this.timeoutId), this.timeoutId = setTimeout(() => {
      this.setSpeedAction(e);
    }, r);
  }
  setSpeedAction(e) {
    this.options.speed = e, this.advancesTemp = this.advances, this.startTimestamp = 0;
  }
  setProgress(e, r = 20) {
    clearTimeout(this.timeoutProgressId), this.timeoutProgressId = setTimeout(() => {
      this.setProgressAction(e);
    }, r);
  }
  setProgressAction(e) {
    let r = wt(this.track);
    if (this.options.progress = e, this.advancesTemp = r * (e / 100), this.startTimestamp = 0, this.isPaused || this.finished) {
      this.advances = r * (e / 100);
      let [t, i] = bt(this.track, this.advances).geometry.coordinates;
      if (this.markerPoint = [i, t], this.options.panTo && this.map.panTo(this.markerPoint, {
        animate: !1
      }), this.options.marker && this.options.marker.setLatLng(this.markerPoint), this.advances >= r)
        this.notPassedLine.setLatLngs([]);
      else {
        let n = rt(this.track, this.advances);
        this.notPassedLine.setLatLngs(
          n.geometry.coordinates.map(([o, u]) => [u, o])
        );
      }
      if (this.advances === 0) {
        this.passedLine.setLatLngs([]);
        return;
      }
      if (this.advances > 0) {
        let n = rt(this.track, 0, this.advances);
        this.passedLine.setLatLngs(
          n.geometry.coordinates.map(([o, u]) => [u, o])
        );
      }
      if (this.advances < r) {
        let n = Mt(
          A([t, i]),
          A(this.track.geometry.coordinates.at(-1)),
          this.track
        );
        if (this.options.markerRotation && this.options.marker) {
          let o = n.geometry.coordinates, u = G(
            A(o[0]),
            A(o[1])
          );
          this.options.marker.setRotationAngle(
            u / 2 + this.options.markerRotationOffset / 2
          );
        }
      }
      if (this.advances >= r) {
        if (this.isPaused = !0, this.finished = !0, this.listenedEvents.finished.forEach((n) => n()), this.options.markerRotation && this.options.marker) {
          let n = this.track.geometry.coordinates, o = G(
            A(n.at(-2)),
            A(n.at(-1))
          );
          this.options.marker.setRotationAngle(
            o / 2 + this.options.markerRotationOffset / 2
          );
        }
        return;
      }
    }
  }
  on(e, r) {
    switch (e) {
      case "start":
        this.listenedEvents.start.push(r);
        break;
      case "pause":
        this.listenedEvents.pause.push(r);
        break;
      case "finished":
        this.listenedEvents.finished.push(r);
        break;
      case "moving":
        this.listenedEvents.movingCallback.push(r);
        break;
      case "progress":
        this.listenedEvents.progressCallback.push(r);
        break;
    }
  }
  off(e, r) {
    if (!r) {
      this.listenedEvents[e] = [];
      return;
    }
    switch (e) {
      case "start":
        this.listenedEvents.start = this.listenedEvents.start.filter(
          (t) => t !== r
        );
        break;
      case "pause":
        this.listenedEvents.pause = this.listenedEvents.pause.filter(
          (t) => t !== r
        );
        break;
      case "finished":
        this.listenedEvents.finished = this.listenedEvents.finished.filter(
          (t) => t !== r
        );
        break;
      case "moving":
        this.listenedEvents.movingCallback = this.listenedEvents.movingCallback.filter(
          (t) => t !== r
        );
        break;
      case "progress":
        this.listenedEvents.progressCallback = this.listenedEvents.progressCallback.filter(
          (t) => t !== r
        );
        break;
    }
  }
};
