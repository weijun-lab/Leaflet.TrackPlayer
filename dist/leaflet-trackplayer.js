import I from "leaflet";
var T = 63710088e-1, ce = {
  centimeters: T * 100,
  centimetres: T * 100,
  degrees: T / 111325,
  feet: T * 3.28084,
  inches: T * 39.37,
  kilometers: T / 1e3,
  kilometres: T / 1e3,
  meters: T,
  metres: T,
  miles: T / 1609.344,
  millimeters: T * 1e3,
  millimetres: T * 1e3,
  nauticalmiles: T / 1852,
  radians: 1,
  yards: T * 1.0936
}, He = {
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
  radians: 1 / T,
  yards: 1.0936133
}, fe = {
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
function D(t, r, e) {
  e === void 0 && (e = {});
  var i = { type: "Feature" };
  return (e.id === 0 || e.id) && (i.id = e.id), e.bbox && (i.bbox = e.bbox), i.properties = r || {}, i.geometry = t, i;
}
function Je(t, r, e) {
  switch (t) {
    case "Point":
      return C(r).geometry;
    case "LineString":
      return B(r).geometry;
    case "Polygon":
      return de(r).geometry;
    case "MultiPoint":
      return ke(r).geometry;
    case "MultiLineString":
      return Se(r).geometry;
    case "MultiPolygon":
      return _e(r).geometry;
    default:
      throw new Error(t + " is invalid");
  }
}
function C(t, r, e) {
  if (e === void 0 && (e = {}), !t)
    throw new Error("coordinates is required");
  if (!Array.isArray(t))
    throw new Error("coordinates must be an Array");
  if (t.length < 2)
    throw new Error("coordinates must be at least 2 numbers long");
  if (!ae(t[0]) || !ae(t[1]))
    throw new Error("coordinates must contain numbers");
  var i = {
    type: "Point",
    coordinates: t
  };
  return D(i, r, e);
}
function Ie(t, r, e) {
  return e === void 0 && (e = {}), K(t.map(function(i) {
    return C(i, r);
  }), e);
}
function de(t, r, e) {
  e === void 0 && (e = {});
  for (var i = 0, n = t; i < n.length; i++) {
    var a = n[i];
    if (a.length < 4)
      throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
    for (var u = 0; u < a[a.length - 1].length; u++)
      if (a[a.length - 1][u] !== a[0][u])
        throw new Error("First and last Position are not equivalent.");
  }
  var f = {
    type: "Polygon",
    coordinates: t
  };
  return D(f, r, e);
}
function Ve(t, r, e) {
  return e === void 0 && (e = {}), K(t.map(function(i) {
    return de(i, r);
  }), e);
}
function B(t, r, e) {
  if (e === void 0 && (e = {}), t.length < 2)
    throw new Error("coordinates must be an array of two or more positions");
  var i = {
    type: "LineString",
    coordinates: t
  };
  return D(i, r, e);
}
function Ze(t, r, e) {
  return e === void 0 && (e = {}), K(t.map(function(i) {
    return B(i, r);
  }), e);
}
function K(t, r) {
  r === void 0 && (r = {});
  var e = { type: "FeatureCollection" };
  return r.id && (e.id = r.id), r.bbox && (e.bbox = r.bbox), e.features = t, e;
}
function Se(t, r, e) {
  e === void 0 && (e = {});
  var i = {
    type: "MultiLineString",
    coordinates: t
  };
  return D(i, r, e);
}
function ke(t, r, e) {
  e === void 0 && (e = {});
  var i = {
    type: "MultiPoint",
    coordinates: t
  };
  return D(i, r, e);
}
function _e(t, r, e) {
  e === void 0 && (e = {});
  var i = {
    type: "MultiPolygon",
    coordinates: t
  };
  return D(i, r, e);
}
function Ke(t, r, e) {
  e === void 0 && (e = {});
  var i = {
    type: "GeometryCollection",
    geometries: t
  };
  return D(i, r, e);
}
function Qe(t, r) {
  if (r === void 0 && (r = 0), r && !(r >= 0))
    throw new Error("precision must be a positive number");
  var e = Math.pow(10, r || 0);
  return Math.round(t * e) / e;
}
function me(t, r) {
  r === void 0 && (r = "kilometers");
  var e = ce[r];
  if (!e)
    throw new Error(r + " units is invalid");
  return t * e;
}
function se(t, r) {
  r === void 0 && (r = "kilometers");
  var e = ce[r];
  if (!e)
    throw new Error(r + " units is invalid");
  return t / e;
}
function Ue(t, r) {
  return j(se(t, r));
}
function We(t) {
  var r = t % 360;
  return r < 0 && (r += 360), r;
}
function j(t) {
  var r = t % (2 * Math.PI);
  return r * 180 / Math.PI;
}
function G(t) {
  var r = t % 360;
  return r * Math.PI / 180;
}
function $e(t, r, e) {
  if (r === void 0 && (r = "kilometers"), e === void 0 && (e = "kilometers"), !(t >= 0))
    throw new Error("length must be a positive number");
  return me(se(t, r), e);
}
function je(t, r, e) {
  if (r === void 0 && (r = "meters"), e === void 0 && (e = "kilometers"), !(t >= 0))
    throw new Error("area must be a positive number");
  var i = fe[r];
  if (!i)
    throw new Error("invalid original units");
  var n = fe[e];
  if (!n)
    throw new Error("invalid final units");
  return t / i * n;
}
function ae(t) {
  return !isNaN(t) && t !== null && !Array.isArray(t);
}
function le(t) {
  return !!t && t.constructor === Object;
}
function et(t) {
  if (!t)
    throw new Error("bbox is required");
  if (!Array.isArray(t))
    throw new Error("bbox must be an Array");
  if (t.length !== 4 && t.length !== 6)
    throw new Error("bbox must be an Array of 4 or 6 numbers");
  t.forEach(function(r) {
    if (!ae(r))
      throw new Error("bbox must only contain numbers");
  });
}
function tt(t) {
  if (!t)
    throw new Error("id is required");
  if (["string", "number"].indexOf(typeof t) === -1)
    throw new Error("id must be a number or a string");
}
const rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  areaFactors: fe,
  bearingToAzimuth: We,
  convertArea: je,
  convertLength: $e,
  degreesToRadians: G,
  earthRadius: T,
  factors: ce,
  feature: D,
  featureCollection: K,
  geometry: Je,
  geometryCollection: Ke,
  isNumber: ae,
  isObject: le,
  lengthToDegrees: Ue,
  lengthToRadians: se,
  lineString: B,
  lineStrings: Ze,
  multiLineString: Se,
  multiPoint: ke,
  multiPolygon: _e,
  point: C,
  points: Ie,
  polygon: de,
  polygons: Ve,
  radiansToDegrees: j,
  radiansToLength: me,
  round: Qe,
  unitsFactors: He,
  validateBBox: et,
  validateId: tt
}, Symbol.toStringTag, { value: "Module" }));
function re(t, r, e) {
  if (t !== null)
    for (var i, n, a, u, f, o, m, _ = 0, P = 0, O, g = t.type, h = g === "FeatureCollection", b = g === "Feature", w = h ? t.features.length : 1, S = 0; S < w; S++) {
      m = h ? t.features[S].geometry : b ? t.geometry : t, O = m ? m.type === "GeometryCollection" : !1, f = O ? m.geometries.length : 1;
      for (var s = 0; s < f; s++) {
        var l = 0, d = 0;
        if (u = O ? m.geometries[s] : m, u !== null) {
          o = u.coordinates;
          var y = u.type;
          switch (_ = e && (y === "Polygon" || y === "MultiPolygon") ? 1 : 0, y) {
            case null:
              break;
            case "Point":
              if (r(
                o,
                P,
                S,
                l,
                d
              ) === !1)
                return !1;
              P++, l++;
              break;
            case "LineString":
            case "MultiPoint":
              for (i = 0; i < o.length; i++) {
                if (r(
                  o[i],
                  P,
                  S,
                  l,
                  d
                ) === !1)
                  return !1;
                P++, y === "MultiPoint" && l++;
              }
              y === "LineString" && l++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (i = 0; i < o.length; i++) {
                for (n = 0; n < o[i].length - _; n++) {
                  if (r(
                    o[i][n],
                    P,
                    S,
                    l,
                    d
                  ) === !1)
                    return !1;
                  P++;
                }
                y === "MultiLineString" && l++, y === "Polygon" && d++;
              }
              y === "Polygon" && l++;
              break;
            case "MultiPolygon":
              for (i = 0; i < o.length; i++) {
                for (d = 0, n = 0; n < o[i].length; n++) {
                  for (a = 0; a < o[i][n].length - _; a++) {
                    if (r(
                      o[i][n][a],
                      P,
                      S,
                      l,
                      d
                    ) === !1)
                      return !1;
                    P++;
                  }
                  d++;
                }
                l++;
              }
              break;
            case "GeometryCollection":
              for (i = 0; i < u.geometries.length; i++)
                if (re(u.geometries[i], r, e) === !1)
                  return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
}
function it(t, r, e, i) {
  var n = e;
  return re(
    t,
    function(a, u, f, o, m) {
      u === 0 && e === void 0 ? n = a : n = r(
        n,
        a,
        u,
        f,
        o,
        m
      );
    },
    i
  ), n;
}
function Re(t, r) {
  var e;
  switch (t.type) {
    case "FeatureCollection":
      for (e = 0; e < t.features.length && r(t.features[e].properties, e) !== !1; e++)
        ;
      break;
    case "Feature":
      r(t.properties, 0);
      break;
  }
}
function nt(t, r, e) {
  var i = e;
  return Re(t, function(n, a) {
    a === 0 && e === void 0 ? i = n : i = r(i, n, a);
  }), i;
}
function oe(t, r) {
  if (t.type === "Feature")
    r(t, 0);
  else if (t.type === "FeatureCollection")
    for (var e = 0; e < t.features.length && r(t.features[e], e) !== !1; e++)
      ;
}
function at(t, r, e) {
  var i = e;
  return oe(t, function(n, a) {
    a === 0 && e === void 0 ? i = n : i = r(i, n, a);
  }), i;
}
function ot(t) {
  var r = [];
  return re(t, function(e) {
    r.push(e);
  }), r;
}
function ve(t, r) {
  var e, i, n, a, u, f, o, m, _, P, O = 0, g = t.type === "FeatureCollection", h = t.type === "Feature", b = g ? t.features.length : 1;
  for (e = 0; e < b; e++) {
    for (f = g ? t.features[e].geometry : h ? t.geometry : t, m = g ? t.features[e].properties : h ? t.properties : {}, _ = g ? t.features[e].bbox : h ? t.bbox : void 0, P = g ? t.features[e].id : h ? t.id : void 0, o = f ? f.type === "GeometryCollection" : !1, u = o ? f.geometries.length : 1, n = 0; n < u; n++) {
      if (a = o ? f.geometries[n] : f, a === null) {
        if (r(
          null,
          O,
          m,
          _,
          P
        ) === !1)
          return !1;
        continue;
      }
      switch (a.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (r(
            a,
            O,
            m,
            _,
            P
          ) === !1)
            return !1;
          break;
        }
        case "GeometryCollection": {
          for (i = 0; i < a.geometries.length; i++)
            if (r(
              a.geometries[i],
              O,
              m,
              _,
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
function st(t, r, e) {
  var i = e;
  return ve(
    t,
    function(n, a, u, f, o) {
      a === 0 && e === void 0 ? i = n : i = r(
        i,
        n,
        a,
        u,
        f,
        o
      );
    }
  ), i;
}
function W(t, r) {
  ve(t, function(e, i, n, a, u) {
    var f = e === null ? null : e.type;
    switch (f) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        return r(
          D(e, n, { bbox: a, id: u }),
          i,
          0
        ) === !1 ? !1 : void 0;
    }
    var o;
    switch (f) {
      case "MultiPoint":
        o = "Point";
        break;
      case "MultiLineString":
        o = "LineString";
        break;
      case "MultiPolygon":
        o = "Polygon";
        break;
    }
    for (var m = 0; m < e.coordinates.length; m++) {
      var _ = e.coordinates[m], P = {
        type: o,
        coordinates: _
      };
      if (r(D(P, n), i, m) === !1)
        return !1;
    }
  });
}
function lt(t, r, e) {
  var i = e;
  return W(
    t,
    function(n, a, u) {
      a === 0 && u === 0 && e === void 0 ? i = n : i = r(
        i,
        n,
        a,
        u
      );
    }
  ), i;
}
function Ae(t, r) {
  W(t, function(e, i, n) {
    var a = 0;
    if (e.geometry) {
      var u = e.geometry.type;
      if (!(u === "Point" || u === "MultiPoint")) {
        var f, o = 0, m = 0, _ = 0;
        if (re(
          e,
          function(P, O, g, h, b) {
            if (f === void 0 || i > o || h > m || b > _) {
              f = P, o = i, m = h, _ = b, a = 0;
              return;
            }
            var w = B(
              [f, P],
              e.properties
            );
            if (r(
              w,
              i,
              n,
              b,
              a
            ) === !1)
              return !1;
            a++, f = P;
          }
        ) === !1)
          return !1;
      }
    }
  });
}
function Oe(t, r, e) {
  var i = e, n = !1;
  return Ae(
    t,
    function(a, u, f, o, m) {
      n === !1 && e === void 0 ? i = a : i = r(
        i,
        a,
        u,
        f,
        o,
        m
      ), n = !0;
    }
  ), i;
}
function Le(t, r) {
  if (!t)
    throw new Error("geojson is required");
  W(t, function(e, i, n) {
    if (e.geometry !== null) {
      var a = e.geometry.type, u = e.geometry.coordinates;
      switch (a) {
        case "LineString":
          if (r(e, i, n, 0, 0) === !1)
            return !1;
          break;
        case "Polygon":
          for (var f = 0; f < u.length; f++)
            if (r(
              B(u[f], e.properties),
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
function ut(t, r, e) {
  var i = e;
  return Le(
    t,
    function(n, a, u, f) {
      a === 0 && e === void 0 ? i = n : i = r(
        i,
        n,
        a,
        u,
        f
      );
    }
  ), i;
}
function ft(t, r) {
  if (r = r || {}, !le(r))
    throw new Error("options is invalid");
  var e = r.featureIndex || 0, i = r.multiFeatureIndex || 0, n = r.geometryIndex || 0, a = r.segmentIndex || 0, u = r.properties, f;
  switch (t.type) {
    case "FeatureCollection":
      e < 0 && (e = t.features.length + e), u = u || t.features[e].properties, f = t.features[e].geometry;
      break;
    case "Feature":
      u = u || t.properties, f = t.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      f = t;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (f === null)
    return null;
  var o = f.coordinates;
  switch (f.type) {
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
      return a < 0 && (a = o.length + a - 1), B(
        [o[a], o[a + 1]],
        u,
        r
      );
    case "Polygon":
      return n < 0 && (n = o.length + n), a < 0 && (a = o[n].length + a - 1), B(
        [
          o[n][a],
          o[n][a + 1]
        ],
        u,
        r
      );
    case "MultiLineString":
      return i < 0 && (i = o.length + i), a < 0 && (a = o[i].length + a - 1), B(
        [
          o[i][a],
          o[i][a + 1]
        ],
        u,
        r
      );
    case "MultiPolygon":
      return i < 0 && (i = o.length + i), n < 0 && (n = o[i].length + n), a < 0 && (a = o[i][n].length - a - 1), B(
        [
          o[i][n][a],
          o[i][n][a + 1]
        ],
        u,
        r
      );
  }
  throw new Error("geojson is invalid");
}
function ht(t, r) {
  if (r = r || {}, !le(r))
    throw new Error("options is invalid");
  var e = r.featureIndex || 0, i = r.multiFeatureIndex || 0, n = r.geometryIndex || 0, a = r.coordIndex || 0, u = r.properties, f;
  switch (t.type) {
    case "FeatureCollection":
      e < 0 && (e = t.features.length + e), u = u || t.features[e].properties, f = t.features[e].geometry;
      break;
    case "Feature":
      u = u || t.properties, f = t.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      f = t;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (f === null)
    return null;
  var o = f.coordinates;
  switch (f.type) {
    case "Point":
      return C(o, u, r);
    case "MultiPoint":
      return i < 0 && (i = o.length + i), C(o[i], u, r);
    case "LineString":
      return a < 0 && (a = o.length + a), C(o[a], u, r);
    case "Polygon":
      return n < 0 && (n = o.length + n), a < 0 && (a = o[n].length + a), C(o[n][a], u, r);
    case "MultiLineString":
      return i < 0 && (i = o.length + i), a < 0 && (a = o[i].length + a), C(o[i][a], u, r);
    case "MultiPolygon":
      return i < 0 && (i = o.length + i), n < 0 && (n = o[i].length + n), a < 0 && (a = o[i][n].length - a), C(
        o[i][n][a],
        u,
        r
      );
  }
  throw new Error("geojson is invalid");
}
const ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  coordAll: ot,
  coordEach: re,
  coordReduce: it,
  featureEach: oe,
  featureReduce: at,
  findPoint: ht,
  findSegment: ft,
  flattenEach: W,
  flattenReduce: lt,
  geomEach: ve,
  geomReduce: st,
  lineEach: Le,
  lineReduce: ut,
  propEach: Re,
  propReduce: nt,
  segmentEach: Ae,
  segmentReduce: Oe
}, Symbol.toStringTag, { value: "Module" }));
function ee(t) {
  if (!t)
    throw new Error("coord is required");
  if (!Array.isArray(t)) {
    if (t.type === "Feature" && t.geometry !== null && t.geometry.type === "Point")
      return t.geometry.coordinates;
    if (t.type === "Point")
      return t.coordinates;
  }
  if (Array.isArray(t) && t.length >= 2 && !Array.isArray(t[0]) && !Array.isArray(t[1]))
    return t;
  throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
function Q(t) {
  if (Array.isArray(t))
    return t;
  if (t.type === "Feature") {
    if (t.geometry !== null)
      return t.geometry.coordinates;
  } else if (t.coordinates)
    return t.coordinates;
  throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
function dt(t) {
  return t.type === "Feature" ? t.geometry : t;
}
function mt(t, r) {
  return t.type === "FeatureCollection" ? "FeatureCollection" : t.type === "GeometryCollection" ? "GeometryCollection" : t.type === "Feature" && t.geometry !== null ? t.geometry.type : t.type;
}
var xe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function vt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Ce(t) {
  if (t.__esModule)
    return t;
  var r = t.default;
  if (typeof r == "function") {
    var e = function i() {
      return this instanceof i ? Reflect.construct(r, arguments, this.constructor) : r.apply(this, arguments);
    };
    e.prototype = r.prototype;
  } else
    e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(t).forEach(function(i) {
    var n = Object.getOwnPropertyDescriptor(t, i);
    Object.defineProperty(e, i, n.get ? n : {
      enumerable: !0,
      get: function() {
        return t[i];
      }
    });
  }), e;
}
var Be = { exports: {} };
(function(t, r) {
  (function(e, i) {
    t.exports = i();
  })(xe, function() {
    function e(s, l, d, y, E) {
      (function M(k, A, x, c, p) {
        for (; c > x; ) {
          if (c - x > 600) {
            var v = c - x + 1, R = A - x + 1, q = Math.log(v), Y = 0.5 * Math.exp(2 * q / 3), z = 0.5 * Math.sqrt(q * Y * (v - Y) / v) * (R - v / 2 < 0 ? -1 : 1), J = Math.max(x, Math.floor(A - R * Y / v + z)), Ne = Math.min(c, Math.floor(A + (v - R) * Y / v + z));
            M(k, A, J, Ne, p);
          }
          var ne = k[A], $ = x, N = c;
          for (i(k, x, A), p(k[c], ne) > 0 && i(k, x, c); $ < N; ) {
            for (i(k, $, N), $++, N--; p(k[$], ne) < 0; )
              $++;
            for (; p(k[N], ne) > 0; )
              N--;
          }
          p(k[x], ne) === 0 ? i(k, x, N) : i(k, ++N, c), N <= A && (x = N + 1), A <= N && (c = N - 1);
        }
      })(s, l, d || 0, y || s.length - 1, E || n);
    }
    function i(s, l, d) {
      var y = s[l];
      s[l] = s[d], s[d] = y;
    }
    function n(s, l) {
      return s < l ? -1 : s > l ? 1 : 0;
    }
    var a = function(s) {
      s === void 0 && (s = 9), this._maxEntries = Math.max(4, s), this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries)), this.clear();
    };
    function u(s, l, d) {
      if (!d)
        return l.indexOf(s);
      for (var y = 0; y < l.length; y++)
        if (d(s, l[y]))
          return y;
      return -1;
    }
    function f(s, l) {
      o(s, 0, s.children.length, l, s);
    }
    function o(s, l, d, y, E) {
      E || (E = w(null)), E.minX = 1 / 0, E.minY = 1 / 0, E.maxX = -1 / 0, E.maxY = -1 / 0;
      for (var M = l; M < d; M++) {
        var k = s.children[M];
        m(E, s.leaf ? y(k) : k);
      }
      return E;
    }
    function m(s, l) {
      return s.minX = Math.min(s.minX, l.minX), s.minY = Math.min(s.minY, l.minY), s.maxX = Math.max(s.maxX, l.maxX), s.maxY = Math.max(s.maxY, l.maxY), s;
    }
    function _(s, l) {
      return s.minX - l.minX;
    }
    function P(s, l) {
      return s.minY - l.minY;
    }
    function O(s) {
      return (s.maxX - s.minX) * (s.maxY - s.minY);
    }
    function g(s) {
      return s.maxX - s.minX + (s.maxY - s.minY);
    }
    function h(s, l) {
      return s.minX <= l.minX && s.minY <= l.minY && l.maxX <= s.maxX && l.maxY <= s.maxY;
    }
    function b(s, l) {
      return l.minX <= s.maxX && l.minY <= s.maxY && l.maxX >= s.minX && l.maxY >= s.minY;
    }
    function w(s) {
      return { children: s, height: 1, leaf: !0, minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0 };
    }
    function S(s, l, d, y, E) {
      for (var M = [l, d]; M.length; )
        if (!((d = M.pop()) - (l = M.pop()) <= y)) {
          var k = l + Math.ceil((d - l) / y / 2) * y;
          e(s, k, l, d, E), M.push(l, k, k, d);
        }
    }
    return a.prototype.all = function() {
      return this._all(this.data, []);
    }, a.prototype.search = function(s) {
      var l = this.data, d = [];
      if (!b(s, l))
        return d;
      for (var y = this.toBBox, E = []; l; ) {
        for (var M = 0; M < l.children.length; M++) {
          var k = l.children[M], A = l.leaf ? y(k) : k;
          b(s, A) && (l.leaf ? d.push(k) : h(s, A) ? this._all(k, d) : E.push(k));
        }
        l = E.pop();
      }
      return d;
    }, a.prototype.collides = function(s) {
      var l = this.data;
      if (!b(s, l))
        return !1;
      for (var d = []; l; ) {
        for (var y = 0; y < l.children.length; y++) {
          var E = l.children[y], M = l.leaf ? this.toBBox(E) : E;
          if (b(s, M)) {
            if (l.leaf || h(s, M))
              return !0;
            d.push(E);
          }
        }
        l = d.pop();
      }
      return !1;
    }, a.prototype.load = function(s) {
      if (!s || !s.length)
        return this;
      if (s.length < this._minEntries) {
        for (var l = 0; l < s.length; l++)
          this.insert(s[l]);
        return this;
      }
      var d = this._build(s.slice(), 0, s.length - 1, 0);
      if (this.data.children.length)
        if (this.data.height === d.height)
          this._splitRoot(this.data, d);
        else {
          if (this.data.height < d.height) {
            var y = this.data;
            this.data = d, d = y;
          }
          this._insert(d, this.data.height - d.height - 1, !0);
        }
      else
        this.data = d;
      return this;
    }, a.prototype.insert = function(s) {
      return s && this._insert(s, this.data.height - 1), this;
    }, a.prototype.clear = function() {
      return this.data = w([]), this;
    }, a.prototype.remove = function(s, l) {
      if (!s)
        return this;
      for (var d, y, E, M = this.data, k = this.toBBox(s), A = [], x = []; M || A.length; ) {
        if (M || (M = A.pop(), y = A[A.length - 1], d = x.pop(), E = !0), M.leaf) {
          var c = u(s, M.children, l);
          if (c !== -1)
            return M.children.splice(c, 1), A.push(M), this._condense(A), this;
        }
        E || M.leaf || !h(M, k) ? y ? (d++, M = y.children[d], E = !1) : M = null : (A.push(M), x.push(d), d = 0, y = M, M = M.children[0]);
      }
      return this;
    }, a.prototype.toBBox = function(s) {
      return s;
    }, a.prototype.compareMinX = function(s, l) {
      return s.minX - l.minX;
    }, a.prototype.compareMinY = function(s, l) {
      return s.minY - l.minY;
    }, a.prototype.toJSON = function() {
      return this.data;
    }, a.prototype.fromJSON = function(s) {
      return this.data = s, this;
    }, a.prototype._all = function(s, l) {
      for (var d = []; s; )
        s.leaf ? l.push.apply(l, s.children) : d.push.apply(d, s.children), s = d.pop();
      return l;
    }, a.prototype._build = function(s, l, d, y) {
      var E, M = d - l + 1, k = this._maxEntries;
      if (M <= k)
        return f(E = w(s.slice(l, d + 1)), this.toBBox), E;
      y || (y = Math.ceil(Math.log(M) / Math.log(k)), k = Math.ceil(M / Math.pow(k, y - 1))), (E = w([])).leaf = !1, E.height = y;
      var A = Math.ceil(M / k), x = A * Math.ceil(Math.sqrt(k));
      S(s, l, d, x, this.compareMinX);
      for (var c = l; c <= d; c += x) {
        var p = Math.min(c + x - 1, d);
        S(s, c, p, A, this.compareMinY);
        for (var v = c; v <= p; v += A) {
          var R = Math.min(v + A - 1, p);
          E.children.push(this._build(s, v, R, y - 1));
        }
      }
      return f(E, this.toBBox), E;
    }, a.prototype._chooseSubtree = function(s, l, d, y) {
      for (; y.push(l), !l.leaf && y.length - 1 !== d; ) {
        for (var E = 1 / 0, M = 1 / 0, k = void 0, A = 0; A < l.children.length; A++) {
          var x = l.children[A], c = O(x), p = (v = s, R = x, (Math.max(R.maxX, v.maxX) - Math.min(R.minX, v.minX)) * (Math.max(R.maxY, v.maxY) - Math.min(R.minY, v.minY)) - c);
          p < M ? (M = p, E = c < E ? c : E, k = x) : p === M && c < E && (E = c, k = x);
        }
        l = k || l.children[0];
      }
      var v, R;
      return l;
    }, a.prototype._insert = function(s, l, d) {
      var y = d ? s : this.toBBox(s), E = [], M = this._chooseSubtree(y, this.data, l, E);
      for (M.children.push(s), m(M, y); l >= 0 && E[l].children.length > this._maxEntries; )
        this._split(E, l), l--;
      this._adjustParentBBoxes(y, E, l);
    }, a.prototype._split = function(s, l) {
      var d = s[l], y = d.children.length, E = this._minEntries;
      this._chooseSplitAxis(d, E, y);
      var M = this._chooseSplitIndex(d, E, y), k = w(d.children.splice(M, d.children.length - M));
      k.height = d.height, k.leaf = d.leaf, f(d, this.toBBox), f(k, this.toBBox), l ? s[l - 1].children.push(k) : this._splitRoot(d, k);
    }, a.prototype._splitRoot = function(s, l) {
      this.data = w([s, l]), this.data.height = s.height + 1, this.data.leaf = !1, f(this.data, this.toBBox);
    }, a.prototype._chooseSplitIndex = function(s, l, d) {
      for (var y, E, M, k, A, x, c, p = 1 / 0, v = 1 / 0, R = l; R <= d - l; R++) {
        var q = o(s, 0, R, this.toBBox), Y = o(s, R, d, this.toBBox), z = (E = q, M = Y, k = void 0, A = void 0, x = void 0, c = void 0, k = Math.max(E.minX, M.minX), A = Math.max(E.minY, M.minY), x = Math.min(E.maxX, M.maxX), c = Math.min(E.maxY, M.maxY), Math.max(0, x - k) * Math.max(0, c - A)), J = O(q) + O(Y);
        z < p ? (p = z, y = R, v = J < v ? J : v) : z === p && J < v && (v = J, y = R);
      }
      return y || d - l;
    }, a.prototype._chooseSplitAxis = function(s, l, d) {
      var y = s.leaf ? this.compareMinX : _, E = s.leaf ? this.compareMinY : P;
      this._allDistMargin(s, l, d, y) < this._allDistMargin(s, l, d, E) && s.children.sort(y);
    }, a.prototype._allDistMargin = function(s, l, d, y) {
      s.children.sort(y);
      for (var E = this.toBBox, M = o(s, 0, l, E), k = o(s, d - l, d, E), A = g(M) + g(k), x = l; x < d - l; x++) {
        var c = s.children[x];
        m(M, s.leaf ? E(c) : c), A += g(M);
      }
      for (var p = d - l - 1; p >= l; p--) {
        var v = s.children[p];
        m(k, s.leaf ? E(v) : v), A += g(k);
      }
      return A;
    }, a.prototype._adjustParentBBoxes = function(s, l, d) {
      for (var y = d; y >= 0; y--)
        m(l[y], s);
    }, a.prototype._condense = function(s) {
      for (var l = s.length - 1, d = void 0; l >= 0; l--)
        s[l].children.length === 0 ? l > 0 ? (d = s[l - 1].children).splice(d.indexOf(s[l]), 1) : this.clear() : f(s[l], this.toBBox);
    }, a;
  });
})(Be);
var pt = Be.exports;
function V(t, r, e) {
  e === void 0 && (e = {});
  var i = ee(t), n = ee(r), a = G(n[1] - i[1]), u = G(n[0] - i[0]), f = G(i[1]), o = G(n[1]), m = Math.pow(Math.sin(a / 2), 2) + Math.pow(Math.sin(u / 2), 2) * Math.cos(f) * Math.cos(o);
  return me(2 * Math.atan2(Math.sqrt(m), Math.sqrt(1 - m)), e.units);
}
function te(t, r, e, i) {
  i === void 0 && (i = {});
  var n = ee(t), a = G(n[0]), u = G(n[1]), f = G(e), o = se(r, i.units), m = Math.asin(Math.sin(u) * Math.cos(o) + Math.cos(u) * Math.sin(o) * Math.cos(f)), _ = a + Math.atan2(Math.sin(f) * Math.sin(o) * Math.cos(u), Math.cos(o) - Math.sin(u) * Math.sin(m)), P = j(_), O = j(m);
  return C([P, O], i.properties);
}
function Z(t, r, e) {
  if (e === void 0 && (e = {}), e.final === !0)
    return gt(t, r);
  var i = ee(t), n = ee(r), a = G(i[0]), u = G(n[0]), f = G(i[1]), o = G(n[1]), m = Math.sin(u - a) * Math.cos(o), _ = Math.cos(f) * Math.sin(o) - Math.sin(f) * Math.cos(o) * Math.cos(u - a);
  return j(Math.atan2(m, _));
}
function gt(t, r) {
  var e = Z(r, t);
  return e = (e + 180) % 360, e;
}
function be(t) {
  if (!t)
    throw new Error("geojson is required");
  var r = [];
  return W(t, function(e) {
    yt(e, r);
  }), K(r);
}
function yt(t, r) {
  var e = [], i = t.geometry;
  if (i !== null) {
    switch (i.type) {
      case "Polygon":
        e = Q(i);
        break;
      case "LineString":
        e = [Q(i)];
    }
    e.forEach(function(n) {
      var a = bt(n, t.properties);
      a.forEach(function(u) {
        u.id = r.length, r.push(u);
      });
    });
  }
}
function bt(t, r) {
  var e = [];
  return t.reduce(function(i, n) {
    var a = B([i, n], r);
    return a.bbox = wt(i, n), e.push(a), n;
  }), e;
}
function wt(t, r) {
  var e = t[0], i = t[1], n = r[0], a = r[1], u = e < n ? e : n, f = i < a ? i : a, o = e > n ? e : n, m = i > a ? i : a;
  return [u, f, o, m];
}
var pe = { exports: {} }, Fe = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.earthRadius = 63710088e-1, t.factors = {
    centimeters: t.earthRadius * 100,
    centimetres: t.earthRadius * 100,
    degrees: t.earthRadius / 111325,
    feet: t.earthRadius * 3.28084,
    inches: t.earthRadius * 39.37,
    kilometers: t.earthRadius / 1e3,
    kilometres: t.earthRadius / 1e3,
    meters: t.earthRadius,
    metres: t.earthRadius,
    miles: t.earthRadius / 1609.344,
    millimeters: t.earthRadius * 1e3,
    millimetres: t.earthRadius * 1e3,
    nauticalmiles: t.earthRadius / 1852,
    radians: 1,
    yards: t.earthRadius * 1.0936
  }, t.unitsFactors = {
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
    radians: 1 / t.earthRadius,
    yards: 1.0936133
  }, t.areaFactors = {
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
  function r(c, p, v) {
    v === void 0 && (v = {});
    var R = { type: "Feature" };
    return (v.id === 0 || v.id) && (R.id = v.id), v.bbox && (R.bbox = v.bbox), R.properties = p || {}, R.geometry = c, R;
  }
  t.feature = r;
  function e(c, p, v) {
    switch (c) {
      case "Point":
        return i(p).geometry;
      case "LineString":
        return f(p).geometry;
      case "Polygon":
        return a(p).geometry;
      case "MultiPoint":
        return P(p).geometry;
      case "MultiLineString":
        return _(p).geometry;
      case "MultiPolygon":
        return O(p).geometry;
      default:
        throw new Error(c + " is invalid");
    }
  }
  t.geometry = e;
  function i(c, p, v) {
    if (v === void 0 && (v = {}), !c)
      throw new Error("coordinates is required");
    if (!Array.isArray(c))
      throw new Error("coordinates must be an Array");
    if (c.length < 2)
      throw new Error("coordinates must be at least 2 numbers long");
    if (!M(c[0]) || !M(c[1]))
      throw new Error("coordinates must contain numbers");
    var R = {
      type: "Point",
      coordinates: c
    };
    return r(R, p, v);
  }
  t.point = i;
  function n(c, p, v) {
    return v === void 0 && (v = {}), m(c.map(function(R) {
      return i(R, p);
    }), v);
  }
  t.points = n;
  function a(c, p, v) {
    v === void 0 && (v = {});
    for (var R = 0, q = c; R < q.length; R++) {
      var Y = q[R];
      if (Y.length < 4)
        throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
      for (var z = 0; z < Y[Y.length - 1].length; z++)
        if (Y[Y.length - 1][z] !== Y[0][z])
          throw new Error("First and last Position are not equivalent.");
    }
    var J = {
      type: "Polygon",
      coordinates: c
    };
    return r(J, p, v);
  }
  t.polygon = a;
  function u(c, p, v) {
    return v === void 0 && (v = {}), m(c.map(function(R) {
      return a(R, p);
    }), v);
  }
  t.polygons = u;
  function f(c, p, v) {
    if (v === void 0 && (v = {}), c.length < 2)
      throw new Error("coordinates must be an array of two or more positions");
    var R = {
      type: "LineString",
      coordinates: c
    };
    return r(R, p, v);
  }
  t.lineString = f;
  function o(c, p, v) {
    return v === void 0 && (v = {}), m(c.map(function(R) {
      return f(R, p);
    }), v);
  }
  t.lineStrings = o;
  function m(c, p) {
    p === void 0 && (p = {});
    var v = { type: "FeatureCollection" };
    return p.id && (v.id = p.id), p.bbox && (v.bbox = p.bbox), v.features = c, v;
  }
  t.featureCollection = m;
  function _(c, p, v) {
    v === void 0 && (v = {});
    var R = {
      type: "MultiLineString",
      coordinates: c
    };
    return r(R, p, v);
  }
  t.multiLineString = _;
  function P(c, p, v) {
    v === void 0 && (v = {});
    var R = {
      type: "MultiPoint",
      coordinates: c
    };
    return r(R, p, v);
  }
  t.multiPoint = P;
  function O(c, p, v) {
    v === void 0 && (v = {});
    var R = {
      type: "MultiPolygon",
      coordinates: c
    };
    return r(R, p, v);
  }
  t.multiPolygon = O;
  function g(c, p, v) {
    v === void 0 && (v = {});
    var R = {
      type: "GeometryCollection",
      geometries: c
    };
    return r(R, p, v);
  }
  t.geometryCollection = g;
  function h(c, p) {
    if (p === void 0 && (p = 0), p && !(p >= 0))
      throw new Error("precision must be a positive number");
    var v = Math.pow(10, p || 0);
    return Math.round(c * v) / v;
  }
  t.round = h;
  function b(c, p) {
    p === void 0 && (p = "kilometers");
    var v = t.factors[p];
    if (!v)
      throw new Error(p + " units is invalid");
    return c * v;
  }
  t.radiansToLength = b;
  function w(c, p) {
    p === void 0 && (p = "kilometers");
    var v = t.factors[p];
    if (!v)
      throw new Error(p + " units is invalid");
    return c / v;
  }
  t.lengthToRadians = w;
  function S(c, p) {
    return l(w(c, p));
  }
  t.lengthToDegrees = S;
  function s(c) {
    var p = c % 360;
    return p < 0 && (p += 360), p;
  }
  t.bearingToAzimuth = s;
  function l(c) {
    var p = c % (2 * Math.PI);
    return p * 180 / Math.PI;
  }
  t.radiansToDegrees = l;
  function d(c) {
    var p = c % 360;
    return p * Math.PI / 180;
  }
  t.degreesToRadians = d;
  function y(c, p, v) {
    if (p === void 0 && (p = "kilometers"), v === void 0 && (v = "kilometers"), !(c >= 0))
      throw new Error("length must be a positive number");
    return b(w(c, p), v);
  }
  t.convertLength = y;
  function E(c, p, v) {
    if (p === void 0 && (p = "meters"), v === void 0 && (v = "kilometers"), !(c >= 0))
      throw new Error("area must be a positive number");
    var R = t.areaFactors[p];
    if (!R)
      throw new Error("invalid original units");
    var q = t.areaFactors[v];
    if (!q)
      throw new Error("invalid final units");
    return c / R * q;
  }
  t.convertArea = E;
  function M(c) {
    return !isNaN(c) && c !== null && !Array.isArray(c);
  }
  t.isNumber = M;
  function k(c) {
    return !!c && c.constructor === Object;
  }
  t.isObject = k;
  function A(c) {
    if (!c)
      throw new Error("bbox is required");
    if (!Array.isArray(c))
      throw new Error("bbox must be an Array");
    if (c.length !== 4 && c.length !== 6)
      throw new Error("bbox must be an Array of 4 or 6 numbers");
    c.forEach(function(p) {
      if (!M(p))
        throw new Error("bbox must only contain numbers");
    });
  }
  t.validateBBox = A;
  function x(c) {
    if (!c)
      throw new Error("id is required");
    if (["string", "number"].indexOf(typeof c) === -1)
      throw new Error("id must be a number or a string");
  }
  t.validateId = x;
})(Fe);
var F = {};
const Pt = /* @__PURE__ */ Ce(rt);
Object.defineProperty(F, "__esModule", { value: !0 });
var X = Pt;
function ie(t, r, e) {
  if (t !== null)
    for (var i, n, a, u, f, o, m, _ = 0, P = 0, O, g = t.type, h = g === "FeatureCollection", b = g === "Feature", w = h ? t.features.length : 1, S = 0; S < w; S++) {
      m = h ? t.features[S].geometry : b ? t.geometry : t, O = m ? m.type === "GeometryCollection" : !1, f = O ? m.geometries.length : 1;
      for (var s = 0; s < f; s++) {
        var l = 0, d = 0;
        if (u = O ? m.geometries[s] : m, u !== null) {
          o = u.coordinates;
          var y = u.type;
          switch (_ = e && (y === "Polygon" || y === "MultiPolygon") ? 1 : 0, y) {
            case null:
              break;
            case "Point":
              if (r(
                o,
                P,
                S,
                l,
                d
              ) === !1)
                return !1;
              P++, l++;
              break;
            case "LineString":
            case "MultiPoint":
              for (i = 0; i < o.length; i++) {
                if (r(
                  o[i],
                  P,
                  S,
                  l,
                  d
                ) === !1)
                  return !1;
                P++, y === "MultiPoint" && l++;
              }
              y === "LineString" && l++;
              break;
            case "Polygon":
            case "MultiLineString":
              for (i = 0; i < o.length; i++) {
                for (n = 0; n < o[i].length - _; n++) {
                  if (r(
                    o[i][n],
                    P,
                    S,
                    l,
                    d
                  ) === !1)
                    return !1;
                  P++;
                }
                y === "MultiLineString" && l++, y === "Polygon" && d++;
              }
              y === "Polygon" && l++;
              break;
            case "MultiPolygon":
              for (i = 0; i < o.length; i++) {
                for (d = 0, n = 0; n < o[i].length; n++) {
                  for (a = 0; a < o[i][n].length - _; a++) {
                    if (r(
                      o[i][n][a],
                      P,
                      S,
                      l,
                      d
                    ) === !1)
                      return !1;
                    P++;
                  }
                  d++;
                }
                l++;
              }
              break;
            case "GeometryCollection":
              for (i = 0; i < u.geometries.length; i++)
                if (ie(u.geometries[i], r, e) === !1)
                  return !1;
              break;
            default:
              throw new Error("Unknown Geometry Type");
          }
        }
      }
    }
}
function Mt(t, r, e, i) {
  var n = e;
  return ie(
    t,
    function(a, u, f, o, m) {
      u === 0 && e === void 0 ? n = a : n = r(
        n,
        a,
        u,
        f,
        o,
        m
      );
    },
    i
  ), n;
}
function Te(t, r) {
  var e;
  switch (t.type) {
    case "FeatureCollection":
      for (e = 0; e < t.features.length && r(t.features[e].properties, e) !== !1; e++)
        ;
      break;
    case "Feature":
      r(t.properties, 0);
      break;
  }
}
function Et(t, r, e) {
  var i = e;
  return Te(t, function(n, a) {
    a === 0 && e === void 0 ? i = n : i = r(i, n, a);
  }), i;
}
function Xe(t, r) {
  if (t.type === "Feature")
    r(t, 0);
  else if (t.type === "FeatureCollection")
    for (var e = 0; e < t.features.length && r(t.features[e], e) !== !1; e++)
      ;
}
function St(t, r, e) {
  var i = e;
  return Xe(t, function(n, a) {
    a === 0 && e === void 0 ? i = n : i = r(i, n, a);
  }), i;
}
function kt(t) {
  var r = [];
  return ie(t, function(e) {
    r.push(e);
  }), r;
}
function ge(t, r) {
  var e, i, n, a, u, f, o, m, _, P, O = 0, g = t.type === "FeatureCollection", h = t.type === "Feature", b = g ? t.features.length : 1;
  for (e = 0; e < b; e++) {
    for (f = g ? t.features[e].geometry : h ? t.geometry : t, m = g ? t.features[e].properties : h ? t.properties : {}, _ = g ? t.features[e].bbox : h ? t.bbox : void 0, P = g ? t.features[e].id : h ? t.id : void 0, o = f ? f.type === "GeometryCollection" : !1, u = o ? f.geometries.length : 1, n = 0; n < u; n++) {
      if (a = o ? f.geometries[n] : f, a === null) {
        if (r(
          null,
          O,
          m,
          _,
          P
        ) === !1)
          return !1;
        continue;
      }
      switch (a.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (r(
            a,
            O,
            m,
            _,
            P
          ) === !1)
            return !1;
          break;
        }
        case "GeometryCollection": {
          for (i = 0; i < a.geometries.length; i++)
            if (r(
              a.geometries[i],
              O,
              m,
              _,
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
function _t(t, r, e) {
  var i = e;
  return ge(
    t,
    function(n, a, u, f, o) {
      a === 0 && e === void 0 ? i = n : i = r(
        i,
        n,
        a,
        u,
        f,
        o
      );
    }
  ), i;
}
function ue(t, r) {
  ge(t, function(e, i, n, a, u) {
    var f = e === null ? null : e.type;
    switch (f) {
      case null:
      case "Point":
      case "LineString":
      case "Polygon":
        return r(
          X.feature(e, n, { bbox: a, id: u }),
          i,
          0
        ) === !1 ? !1 : void 0;
    }
    var o;
    switch (f) {
      case "MultiPoint":
        o = "Point";
        break;
      case "MultiLineString":
        o = "LineString";
        break;
      case "MultiPolygon":
        o = "Polygon";
        break;
    }
    for (var m = 0; m < e.coordinates.length; m++) {
      var _ = e.coordinates[m], P = {
        type: o,
        coordinates: _
      };
      if (r(X.feature(P, n), i, m) === !1)
        return !1;
    }
  });
}
function Rt(t, r, e) {
  var i = e;
  return ue(
    t,
    function(n, a, u) {
      a === 0 && u === 0 && e === void 0 ? i = n : i = r(
        i,
        n,
        a,
        u
      );
    }
  ), i;
}
function Ye(t, r) {
  ue(t, function(e, i, n) {
    var a = 0;
    if (e.geometry) {
      var u = e.geometry.type;
      if (!(u === "Point" || u === "MultiPoint")) {
        var f, o = 0, m = 0, _ = 0;
        if (ie(
          e,
          function(P, O, g, h, b) {
            if (f === void 0 || i > o || h > m || b > _) {
              f = P, o = i, m = h, _ = b, a = 0;
              return;
            }
            var w = X.lineString(
              [f, P],
              e.properties
            );
            if (r(
              w,
              i,
              n,
              b,
              a
            ) === !1)
              return !1;
            a++, f = P;
          }
        ) === !1)
          return !1;
      }
    }
  });
}
function At(t, r, e) {
  var i = e, n = !1;
  return Ye(
    t,
    function(a, u, f, o, m) {
      n === !1 && e === void 0 ? i = a : i = r(
        i,
        a,
        u,
        f,
        o,
        m
      ), n = !0;
    }
  ), i;
}
function Ge(t, r) {
  if (!t)
    throw new Error("geojson is required");
  ue(t, function(e, i, n) {
    if (e.geometry !== null) {
      var a = e.geometry.type, u = e.geometry.coordinates;
      switch (a) {
        case "LineString":
          if (r(e, i, n, 0, 0) === !1)
            return !1;
          break;
        case "Polygon":
          for (var f = 0; f < u.length; f++)
            if (r(
              X.lineString(u[f], e.properties),
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
function Ot(t, r, e) {
  var i = e;
  return Ge(
    t,
    function(n, a, u, f) {
      a === 0 && e === void 0 ? i = n : i = r(
        i,
        n,
        a,
        u,
        f
      );
    }
  ), i;
}
function Lt(t, r) {
  if (r = r || {}, !X.isObject(r))
    throw new Error("options is invalid");
  var e = r.featureIndex || 0, i = r.multiFeatureIndex || 0, n = r.geometryIndex || 0, a = r.segmentIndex || 0, u = r.properties, f;
  switch (t.type) {
    case "FeatureCollection":
      e < 0 && (e = t.features.length + e), u = u || t.features[e].properties, f = t.features[e].geometry;
      break;
    case "Feature":
      u = u || t.properties, f = t.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      f = t;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (f === null)
    return null;
  var o = f.coordinates;
  switch (f.type) {
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
      return a < 0 && (a = o.length + a - 1), X.lineString(
        [o[a], o[a + 1]],
        u,
        r
      );
    case "Polygon":
      return n < 0 && (n = o.length + n), a < 0 && (a = o[n].length + a - 1), X.lineString(
        [
          o[n][a],
          o[n][a + 1]
        ],
        u,
        r
      );
    case "MultiLineString":
      return i < 0 && (i = o.length + i), a < 0 && (a = o[i].length + a - 1), X.lineString(
        [
          o[i][a],
          o[i][a + 1]
        ],
        u,
        r
      );
    case "MultiPolygon":
      return i < 0 && (i = o.length + i), n < 0 && (n = o[i].length + n), a < 0 && (a = o[i][n].length - a - 1), X.lineString(
        [
          o[i][n][a],
          o[i][n][a + 1]
        ],
        u,
        r
      );
  }
  throw new Error("geojson is invalid");
}
function xt(t, r) {
  if (r = r || {}, !X.isObject(r))
    throw new Error("options is invalid");
  var e = r.featureIndex || 0, i = r.multiFeatureIndex || 0, n = r.geometryIndex || 0, a = r.coordIndex || 0, u = r.properties, f;
  switch (t.type) {
    case "FeatureCollection":
      e < 0 && (e = t.features.length + e), u = u || t.features[e].properties, f = t.features[e].geometry;
      break;
    case "Feature":
      u = u || t.properties, f = t.geometry;
      break;
    case "Point":
    case "MultiPoint":
      return null;
    case "LineString":
    case "Polygon":
    case "MultiLineString":
    case "MultiPolygon":
      f = t;
      break;
    default:
      throw new Error("geojson is invalid");
  }
  if (f === null)
    return null;
  var o = f.coordinates;
  switch (f.type) {
    case "Point":
      return X.point(o, u, r);
    case "MultiPoint":
      return i < 0 && (i = o.length + i), X.point(o[i], u, r);
    case "LineString":
      return a < 0 && (a = o.length + a), X.point(o[a], u, r);
    case "Polygon":
      return n < 0 && (n = o.length + n), a < 0 && (a = o[n].length + a), X.point(o[n][a], u, r);
    case "MultiLineString":
      return i < 0 && (i = o.length + i), a < 0 && (a = o[i].length + a), X.point(o[i][a], u, r);
    case "MultiPolygon":
      return i < 0 && (i = o.length + i), n < 0 && (n = o[i].length + n), a < 0 && (a = o[i][n].length - a), X.point(
        o[i][n][a],
        u,
        r
      );
  }
  throw new Error("geojson is invalid");
}
F.coordAll = kt;
F.coordEach = ie;
F.coordReduce = Mt;
F.featureEach = Xe;
F.featureReduce = St;
F.findPoint = xt;
F.findSegment = Lt;
F.flattenEach = ue;
F.flattenReduce = Rt;
F.geomEach = ge;
F.geomReduce = _t;
F.lineEach = Ge;
F.lineReduce = Ot;
F.propEach = Te;
F.propReduce = Et;
F.segmentEach = Ye;
F.segmentReduce = At;
var ye = {};
const Ct = /* @__PURE__ */ Ce(ct);
Object.defineProperty(ye, "__esModule", { value: !0 });
var Bt = Ct;
function he(t) {
  var r = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  return Bt.coordEach(t, function(e) {
    r[0] > e[0] && (r[0] = e[0]), r[1] > e[1] && (r[1] = e[1]), r[2] < e[0] && (r[2] = e[0]), r[3] < e[1] && (r[3] = e[1]);
  }), r;
}
he.default = he;
ye.default = he;
var H = pt, De = Fe, qe = F, U = ye.default, Ft = qe.featureEach;
qe.coordEach;
De.polygon;
var we = De.featureCollection;
function ze(t) {
  var r = new H(t);
  return r.insert = function(e) {
    if (e.type !== "Feature")
      throw new Error("invalid feature");
    return e.bbox = e.bbox ? e.bbox : U(e), H.prototype.insert.call(this, e);
  }, r.load = function(e) {
    var i = [];
    return Array.isArray(e) ? e.forEach(function(n) {
      if (n.type !== "Feature")
        throw new Error("invalid features");
      n.bbox = n.bbox ? n.bbox : U(n), i.push(n);
    }) : Ft(e, function(n) {
      if (n.type !== "Feature")
        throw new Error("invalid features");
      n.bbox = n.bbox ? n.bbox : U(n), i.push(n);
    }), H.prototype.load.call(this, i);
  }, r.remove = function(e, i) {
    if (e.type !== "Feature")
      throw new Error("invalid feature");
    return e.bbox = e.bbox ? e.bbox : U(e), H.prototype.remove.call(this, e, i);
  }, r.clear = function() {
    return H.prototype.clear.call(this);
  }, r.search = function(e) {
    var i = H.prototype.search.call(this, this.toBBox(e));
    return we(i);
  }, r.collides = function(e) {
    return H.prototype.collides.call(this, this.toBBox(e));
  }, r.all = function() {
    var e = H.prototype.all.call(this);
    return we(e);
  }, r.toJSON = function() {
    return H.prototype.toJSON.call(this);
  }, r.fromJSON = function(e) {
    return H.prototype.fromJSON.call(this, e);
  }, r.toBBox = function(e) {
    var i;
    if (e.bbox)
      i = e.bbox;
    else if (Array.isArray(e) && e.length === 4)
      i = e;
    else if (Array.isArray(e) && e.length === 6)
      i = [e[0], e[1], e[3], e[4]];
    else if (e.type === "Feature")
      i = U(e);
    else if (e.type === "FeatureCollection")
      i = U(e);
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
pe.exports = ze;
pe.exports.default = ze;
var Tt = pe.exports;
const Xt = /* @__PURE__ */ vt(Tt);
function Yt(t, r) {
  var e = {}, i = [];
  if (t.type === "LineString" && (t = D(t)), r.type === "LineString" && (r = D(r)), t.type === "Feature" && r.type === "Feature" && t.geometry !== null && r.geometry !== null && t.geometry.type === "LineString" && r.geometry.type === "LineString" && t.geometry.coordinates.length === 2 && r.geometry.coordinates.length === 2) {
    var n = Pe(t, r);
    return n && i.push(n), K(i);
  }
  var a = Xt();
  return a.load(be(r)), oe(be(t), function(u) {
    oe(a.search(u), function(f) {
      var o = Pe(u, f);
      if (o) {
        var m = Q(o).join(",");
        e[m] || (e[m] = !0, i.push(o));
      }
    });
  }), K(i);
}
function Pe(t, r) {
  var e = Q(t), i = Q(r);
  if (e.length !== 2)
    throw new Error("<intersects> line1 must only contain 2 coordinates");
  if (i.length !== 2)
    throw new Error("<intersects> line2 must only contain 2 coordinates");
  var n = e[0][0], a = e[0][1], u = e[1][0], f = e[1][1], o = i[0][0], m = i[0][1], _ = i[1][0], P = i[1][1], O = (P - m) * (u - n) - (_ - o) * (f - a), g = (_ - o) * (a - m) - (P - m) * (n - o), h = (u - n) * (a - m) - (f - a) * (n - o);
  if (O === 0)
    return null;
  var b = g / O, w = h / O;
  if (b >= 0 && b <= 1 && w >= 0 && w <= 1) {
    var S = n + b * (u - n), s = a + b * (f - a);
    return C([S, s]);
  }
  return null;
}
function Me(t, r, e) {
  e === void 0 && (e = {});
  var i = C([1 / 0, 1 / 0], {
    dist: 1 / 0
  }), n = 0;
  return W(t, function(a) {
    for (var u = Q(a), f = 0; f < u.length - 1; f++) {
      var o = C(u[f]);
      o.properties.dist = V(r, o, e);
      var m = C(u[f + 1]);
      m.properties.dist = V(r, m, e);
      var _ = V(o, m, e), P = Math.max(o.properties.dist, m.properties.dist), O = Z(o, m), g = te(r, P, O + 90, e), h = te(r, P, O - 90, e), b = Yt(B([
        g.geometry.coordinates,
        h.geometry.coordinates
      ]), B([o.geometry.coordinates, m.geometry.coordinates])), w = null;
      b.features.length > 0 && (w = b.features[0], w.properties.dist = V(r, w, e), w.properties.location = n + V(o, w, e)), o.properties.dist < i.properties.dist && (i = o, i.properties.index = f, i.properties.location = n), m.properties.dist < i.properties.dist && (i = m, i.properties.index = f + 1, i.properties.location = n + _), w && w.properties.dist < i.properties.dist && (i = w, i.properties.index = f), n += _;
    }
  }), i;
}
function Gt(t, r, e) {
  e === void 0 && (e = {});
  for (var i = dt(t), n = i.coordinates, a = 0, u = 0; u < n.length && !(r >= a && u === n.length - 1); u++)
    if (a >= r) {
      var f = r - a;
      if (f) {
        var o = Z(n[u], n[u - 1]) - 180, m = te(n[u], f, o, e);
        return m;
      } else
        return C(n[u]);
    } else
      a += V(n[u], n[u + 1], e);
  return C(n[n.length - 1]);
}
function Dt(t, r) {
  return r === void 0 && (r = {}), Oe(t, function(e, i) {
    var n = i.geometry.coordinates;
    return e + V(n[0], n[1], r);
  }, 0);
}
function qt(t, r, e) {
  var i = Q(e);
  if (mt(e) !== "LineString")
    throw new Error("line must be a LineString");
  var n = Me(e, t), a = Me(e, r), u;
  n.properties.index <= a.properties.index ? u = [n, a] : u = [a, n];
  for (var f = [u[0].geometry.coordinates], o = u[0].properties.index + 1; o < u[1].properties.index + 1; o++)
    f.push(i[o]);
  return f.push(u[1].geometry.coordinates), B(f, e.properties);
}
function Ee(t, r, e, i) {
  if (i = i || {}, !le(i))
    throw new Error("options is invalid");
  var n, a = [];
  if (t.type === "Feature")
    n = t.geometry.coordinates;
  else if (t.type === "LineString")
    n = t.coordinates;
  else
    throw new Error("input must be a LineString Feature or Geometry");
  for (var u = n.length, f = 0, o, m, _, P = 0; P < n.length && !(r >= f && P === n.length - 1); P++) {
    if (f > r && a.length === 0) {
      if (o = r - f, !o)
        return a.push(n[P]), B(a);
      m = Z(n[P], n[P - 1]) - 180, _ = te(n[P], o, m, i), a.push(_.geometry.coordinates);
    }
    if (f >= e)
      return o = e - f, o ? (m = Z(n[P], n[P - 1]) - 180, _ = te(n[P], o, m, i), a.push(_.geometry.coordinates), B(a)) : (a.push(n[P]), B(a));
    if (f >= r && a.push(n[P]), P === n.length - 1)
      return B(a);
    f += V(n[P], n[P + 1], i);
  }
  if (f < r && n.length === u)
    throw new Error("Start position is beyond line");
  var O = n[n.length - 1];
  return B([O, O]);
}
(function(t, r) {
  (function(e, i) {
    i(I);
  })(xe, function(e) {
    e = e && e.hasOwnProperty("default") ? e.default : e;
    function i(g, h) {
      var b = h.x - g.x, w = h.y - g.y;
      return Math.sqrt(b * b + w * w);
    }
    var n = function(h, b) {
      return (Math.atan2(b.y - h.y, b.x - h.x) * 180 / Math.PI + 90 + 360) % 360;
    }, a = function(h, b) {
      var w = h.value, S = h.isInPixels;
      return S ? w / b : w;
    };
    function u(g) {
      if (typeof g == "string" && g.indexOf("%") !== -1)
        return {
          value: parseFloat(g) / 100,
          isInPixels: !1
        };
      var h = g ? parseFloat(g) : 0;
      return {
        value: h,
        isInPixels: h > 0
      };
    }
    var f = function(h, b) {
      return h.x === b.x && h.y === b.y;
    };
    function o(g) {
      return g.reduce(function(h, b, w, S) {
        if (w > 0 && !f(b, S[w - 1])) {
          var s = S[w - 1], l = h.length > 0 ? h[h.length - 1].distB : 0, d = i(s, b);
          h.push({
            a: s,
            b,
            distA: l,
            distB: l + d,
            heading: n(s, b)
          });
        }
        return h;
      }, []);
    }
    function m(g, h) {
      var b = o(g), w = b.length;
      if (w === 0)
        return [];
      var S = b[w - 1].distB, s = a(h.offset, S), l = a(h.endOffset, S), d = a(h.repeat, S), y = S * d, E = s > 0 ? S * s : 0, M = l > 0 ? S * l : 0, k = [], A = E;
      do
        k.push(A), A += y;
      while (y > 0 && A < S - M);
      var x = 0, c = b[0];
      return k.map(function(p) {
        for (; p > c.distB && x < w - 1; )
          x++, c = b[x];
        var v = (p - c.distA) / (c.distB - c.distA);
        return {
          pt: _(c.a, c.b, v),
          heading: c.heading
        };
      });
    }
    function _(g, h, b) {
      return h.x !== g.x ? {
        x: g.x + b * (h.x - g.x),
        y: g.y + b * (h.y - g.y)
      } : {
        x: g.x,
        y: g.y + (h.y - g.y) * b
      };
    }
    (function() {
      var g = L.Marker.prototype._initIcon, h = L.Marker.prototype._setPos, b = L.DomUtil.TRANSFORM === "msTransform";
      L.Marker.addInitHook(function() {
        var w = this.options.icon && this.options.icon.options, S = w && this.options.icon.options.iconAnchor;
        S && (S = S[0] + "px " + S[1] + "px"), this.options.rotationOrigin = this.options.rotationOrigin || S || "center bottom", this.options.rotationAngle = this.options.rotationAngle || 0, this.on("drag", function(s) {
          s.target._applyRotation();
        });
      }), L.Marker.include({
        _initIcon: function() {
          g.call(this);
        },
        _setPos: function(w) {
          h.call(this, w), this._applyRotation();
        },
        _applyRotation: function() {
          this.options.rotationAngle && (this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin, b ? this._icon.style[L.DomUtil.TRANSFORM] = "rotate(" + this.options.rotationAngle + "deg)" : this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)");
        },
        setRotationAngle: function(w) {
          return this.options.rotationAngle = w, this.update(), this;
        },
        setRotationOrigin: function(w) {
          return this.options.rotationOrigin = w, this.update(), this;
        }
      });
    })(), e.Symbol = e.Symbol || {}, e.Symbol.Dash = e.Class.extend({
      options: {
        pixelSize: 10,
        pathOptions: {}
      },
      initialize: function(h) {
        e.Util.setOptions(this, h), this.options.pathOptions.clickable = !1;
      },
      buildSymbol: function(h, b, w, S, s) {
        var l = this.options, d = Math.PI / 180;
        if (l.pixelSize <= 1)
          return e.polyline([h.latLng, h.latLng], l.pathOptions);
        var y = w.project(h.latLng), E = -(h.heading - 90) * d, M = e.point(y.x + l.pixelSize * Math.cos(E + Math.PI) / 2, y.y + l.pixelSize * Math.sin(E) / 2), k = y.add(y.subtract(M));
        return e.polyline([w.unproject(M), w.unproject(k)], l.pathOptions);
      }
    }), e.Symbol.dash = function(g) {
      return new e.Symbol.Dash(g);
    }, e.Symbol.ArrowHead = e.Class.extend({
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
        e.Util.setOptions(this, h), this.options.pathOptions.clickable = !1;
      },
      buildSymbol: function(h, b, w, S, s) {
        return this.options.polygon ? e.polygon(this._buildArrowPath(h, w), this.options.pathOptions) : e.polyline(this._buildArrowPath(h, w), this.options.pathOptions);
      },
      _buildArrowPath: function(h, b) {
        var w = Math.PI / 180, S = b.project(h.latLng), s = -(h.heading - 90) * w, l = this.options.headAngle / 2 * w, d = s + l, y = s - l, E = e.point(S.x - this.options.pixelSize * Math.cos(d), S.y + this.options.pixelSize * Math.sin(d)), M = e.point(S.x - this.options.pixelSize * Math.cos(y), S.y + this.options.pixelSize * Math.sin(y));
        return [b.unproject(E), h.latLng, b.unproject(M)];
      }
    }), e.Symbol.arrowHead = function(g) {
      return new e.Symbol.ArrowHead(g);
    }, e.Symbol.Marker = e.Class.extend({
      options: {
        markerOptions: {},
        rotate: !1
      },
      initialize: function(h) {
        e.Util.setOptions(this, h), this.options.markerOptions.clickable = !1, this.options.markerOptions.draggable = !1;
      },
      buildSymbol: function(h, b, w, S, s) {
        return this.options.rotate && (this.options.markerOptions.rotationAngle = h.heading + (this.options.angleCorrection || 0)), e.marker(h.latLng, this.options.markerOptions);
      }
    }), e.Symbol.marker = function(g) {
      return new e.Symbol.Marker(g);
    };
    var P = function(h) {
      return h instanceof e.LatLng || Array.isArray(h) && h.length === 2 && typeof h[0] == "number";
    }, O = function(h) {
      return Array.isArray(h) && P(h[0]);
    };
    e.PolylineDecorator = e.FeatureGroup.extend({
      options: {
        patterns: []
      },
      initialize: function(h, b) {
        e.FeatureGroup.prototype.initialize.call(this), e.Util.setOptions(this, b), this._map = null, this._paths = this._initPaths(h), this._bounds = this._initBounds(), this._patterns = this._initPatterns(this.options.patterns);
      },
      /**
      * Deals with all the different cases. input can be one of these types:
      * array of LatLng, array of 2-number arrays, Polyline, Polygon,
      * array of one of the previous.
      */
      _initPaths: function(h, b) {
        var w = this;
        if (O(h)) {
          var S = b ? h.concat([h[0]]) : h;
          return [S];
        }
        return h instanceof e.Polyline ? this._initPaths(h.getLatLngs(), h instanceof e.Polygon) : Array.isArray(h) ? h.reduce(function(s, l) {
          return s.concat(w._initPaths(l, b));
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
      _parsePatternDef: function(h, b) {
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
        this._map.off("moveend", this.redraw, this), this._map = null, e.FeatureGroup.prototype.onRemove.call(this, h);
      },
      /**
      * As real pattern bounds depends on map zoom and bounds,
      * we just compute the total bounds of all paths decorated by this instance.
      */
      _initBounds: function() {
        var h = this._paths.reduce(function(b, w) {
          return b.concat(w);
        }, []);
        return e.latLngBounds(h);
      },
      getBounds: function() {
        return this._bounds;
      },
      /**
      * Returns an array of ILayers object
      */
      _buildSymbols: function(h, b, w) {
        var S = this;
        return w.map(function(s, l) {
          return b.buildSymbol(s, h, S._map, l, w.length);
        });
      },
      /**
      * Compute pairs of LatLng and heading angle,
      * that define positions and directions of the symbols on the path
      */
      _getDirectionPoints: function(h, b) {
        var w = this;
        if (h.length < 2)
          return [];
        var S = h.map(function(s) {
          return w._map.project(s);
        });
        return m(S, b).map(function(s) {
          return {
            latLng: w._map.unproject(e.point(s.pt)),
            heading: s.heading
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
        var b = this, w = this._map.getBounds().pad(0.1);
        return this._paths.map(function(S) {
          var s = b._getDirectionPoints(S, h).filter(function(l) {
            return w.contains(l.latLng);
          });
          return e.featureGroup(b._buildSymbols(S, h.symbolFactory, s));
        });
      },
      /**
      * Draw all patterns
      */
      _draw: function() {
        var h = this;
        this._patterns.map(function(b) {
          return h._getPatternLayers(b);
        }).forEach(function(b) {
          h.addLayer(e.featureGroup(b));
        });
      }
    }), e.polylineDecorator = function(g, h) {
      return new e.PolylineDecorator(g, h);
    };
  });
})();
(function() {
  var t = L.Marker.prototype._initIcon, r = L.Marker.prototype._setPos, e = L.DomUtil.TRANSFORM === "msTransform";
  L.Marker.addInitHook(function() {
    var i = this.options.icon && this.options.icon.options, n = i && this.options.icon.options.iconAnchor;
    n && (n = n[0] + "px " + n[1] + "px"), this.options.rotationOrigin = this.options.rotationOrigin || n || "center bottom", this.options.rotationAngle = this.options.rotationAngle || 0, this.on("drag", function(a) {
      a.target._applyRotation();
    });
  }), L.Marker.include({
    _initIcon: function() {
      t.call(this);
    },
    _setPos: function(i) {
      r.call(this, i), this._applyRotation();
    },
    _applyRotation: function() {
      this.options.rotationAngle && (this._icon.style[L.DomUtil.TRANSFORM + "Origin"] = this.options.rotationOrigin, e ? this._icon.style[L.DomUtil.TRANSFORM] = "rotate(" + this.options.rotationAngle + "deg)" : this._icon.style[L.DomUtil.TRANSFORM] += " rotateZ(" + this.options.rotationAngle + "deg)");
    },
    setRotationAngle: function(i) {
      return this.options.rotationAngle = i, this.update(), this;
    },
    setRotationOrigin: function(i) {
      return this.options.rotationOrigin = i, this.update(), this;
    }
  });
})();
I.TrackPlayer = class {
  constructor(t, r = {}) {
    this.options = {
      speed: r.speed ?? 600,
      weight: r.weight ?? 8,
      marker: r.marker,
      polylineDecoratorOptions: r.polylineDecoratorOptions ?? { patterns: [{ offset: 30, repeat: 60, symbol: I.Symbol.arrowHead({ pixelSize: 5, headAngle: 75, polygon: !1, pathOptions: { stroke: !0, weight: 3, color: "#fff" } }) }] },
      passedLineColor: r.passedLineColor ?? "#0000ff",
      notPassedLineColor: r.notPassedLineColor ?? "#ff0000",
      panTo: r.panTo ?? !0,
      markerRotationOrigin: r.markerRotationOrigin ?? "center",
      markerRotationOffset: r.markerRotationOffset ?? 0,
      markerRotation: r.markerRotation ?? !0
    }, this.markerInitLnglat = r.marker ? r.marker.getLatLng() : "", this.isPaused = !0, this.pauseDuration = 0, this.advances = 0, this.advancesTemp = 0;
    let e = I.polyline(t)._latlngs;
    this.track = B(e.map(({ lng: i, lat: n }) => [i, n])), this.listenedEvents = {
      start: [],
      pause: [],
      finished: [],
      movingCallback: []
    };
  }
  addTo(t) {
    if (this.map = t, this.options.marker && (this.options.marker.addTo(this.map), this.options.markerRotation)) {
      let r = this.track.geometry.coordinates;
      this.options.marker.setRotationAngle(
        Z(r[0], r[1]) / 2 + this.options.markerRotationOffset / 2
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
    let t = this.track.geometry.coordinates.map(([r, e]) => [e, r]);
    this.notPassedLine = I.polyline(t, {
      weight: this.options.weight,
      color: this.options.notPassedLineColor
    }).addTo(this.map), this.passedLine = I.polyline([], {
      weight: this.options.weight,
      color: this.options.passedLineColor
    }).addTo(this.map), this.polylineDecorator = I.polylineDecorator(
      t,
      this.options.polylineDecoratorOptions
    ).addTo(this.map);
  }
  start() {
    !this.isPaused || !this.polylineDecorator || (this.finished && (this.finished = !1, this.startTimestamp = 0, this.pauseTimestamp = 0, this.advancesTemp = 0, this.advances = 0), this.isPaused = !1, this.pauseTimestamp && this.startTimestamp && (this.startTimestamp = this.startTimestamp + (Date.now() - this.pauseTimestamp)), this.startAction(), this.listenedEvents.start.forEach((t) => t()));
  }
  pause() {
    this.isPaused || (cancelAnimationFrame(this.reqId), this.pauseTimestamp = Date.now(), this.isPaused = !0, this.listenedEvents.pause.forEach((t) => t()));
  }
  startAction() {
    let t = Dt(this.track), r = (e) => {
      if (e && !this.isPaused) {
        let i = t / this.options.speed * 3600 * 1e3;
        this.startTimestamp || (this.startTimestamp = e);
        let n = e - this.startTimestamp;
        this.advances = t * (n / i) + this.advancesTemp;
        let [a, u] = Gt(this.track, this.advances).geometry.coordinates;
        if (this.markerPoint = [u, a], this.options.panTo && this.map.panTo(this.markerPoint, {
          animate: !1
        }), this.options.marker && this.options.marker.setLatLng(this.markerPoint), this.advances >= t)
          this.notPassedLine.setLatLngs([]);
        else {
          let f = Ee(this.track, this.advances);
          this.notPassedLine.setLatLngs(
            f.geometry.coordinates.map(([o, m]) => [m, o])
          );
        }
        if (this.advances > 0) {
          let f = Ee(this.track, 0, this.advances);
          this.passedLine.setLatLngs(
            f.geometry.coordinates.map(([o, m]) => [m, o])
          );
        }
        if (this.advances < t) {
          let f = qt(
            C([a, u]),
            C(this.track.geometry.coordinates.at(-1)),
            this.track
          );
          if (this.options.markerRotation && this.options.marker) {
            let o = f.geometry.coordinates, m = Z(
              C(o[0]),
              C(o[1])
            );
            this.options.marker.setRotationAngle(
              m / 2 + this.options.markerRotationOffset / 2
            );
          }
        }
        if (this.listenedEvents.movingCallback.forEach(
          (f) => f(I.latLng(...this.markerPoint))
        ), this.advances > t) {
          if (this.isPaused = !0, this.finished = !0, this.listenedEvents.finished.forEach((f) => f()), this.options.markerRotation && this.options.marker) {
            let f = this.track.geometry.coordinates, o = Z(
              C(f.at(-2)),
              C(f.at(-1))
            );
            this.options.marker.setRotationAngle(
              o / 2 + this.options.markerRotationOffset / 2
            );
          }
          return;
        }
      }
      this.reqId = requestAnimationFrame(r);
    };
    r();
  }
  setSpeed(t, r = 20) {
    clearTimeout(this.timeoutId), this.timeoutId = setTimeout(() => {
      this.setSpeedAction(t);
    }, r);
  }
  setSpeedAction(t) {
    this.options.speed = t, this.advancesTemp = this.advances, this.startTimestamp = 0;
  }
  on(t, r) {
    switch (t) {
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
    }
  }
  off(t, r) {
    if (!r) {
      this.listenedEvents[t] = [];
      return;
    }
    switch (t) {
      case "start":
        this.listenedEvents.start = this.listenedEvents.start.filter((e) => e !== r);
        break;
      case "pause":
        this.listenedEvents.pause = this.listenedEvents.pause.filter((e) => e !== r);
        break;
      case "finished":
        this.listenedEvents.finished = this.listenedEvents.finished.filter(
          (e) => e !== r
        );
        break;
      case "moving":
        this.listenedEvents.movingCallback = this.listenedEvents.movingCallback.filter(
          (e) => e !== r
        );
        break;
    }
  }
};
