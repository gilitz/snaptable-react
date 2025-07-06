var br = Object.defineProperty;
var Rr = (i, a, l) => a in i ? br(i, a, { enumerable: !0, configurable: !0, writable: !0, value: l }) : i[a] = l;
var I = (i, a, l) => Rr(i, typeof a != "symbol" ? a + "" : a, l);
import Me, { useRef as Er, useState as le, useEffect as _r } from "react";
import F from "styled-components";
import { observer as Le } from "mobx-react";
import { makeAutoObservable as wr } from "mobx";
var ce = { exports: {} }, z = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fe;
function Sr() {
  if (Fe) return z;
  Fe = 1;
  var i = Me, a = Symbol.for("react.element"), l = Symbol.for("react.fragment"), p = Object.prototype.hasOwnProperty, j = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, w = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(f, o, m) {
    var g, C = {}, v = null, R = null;
    m !== void 0 && (v = "" + m), o.key !== void 0 && (v = "" + o.key), o.ref !== void 0 && (R = o.ref);
    for (g in o) p.call(o, g) && !w.hasOwnProperty(g) && (C[g] = o[g]);
    if (f && f.defaultProps) for (g in o = f.defaultProps, o) C[g] === void 0 && (C[g] = o[g]);
    return { $$typeof: a, type: f, key: v, ref: R, props: C, _owner: j.current };
  }
  return z.Fragment = l, z.jsx = S, z.jsxs = S, z;
}
var H = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ie;
function Cr() {
  return Ie || (Ie = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Me, a = Symbol.for("react.element"), l = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), f = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), C = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), R = Symbol.for("react.offscreen"), x = Symbol.iterator, W = "@@iterator";
    function E(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = x && e[x] || e[W];
      return typeof r == "function" ? r : null;
    }
    var y = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function h(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        L("error", e, t);
      }
    }
    function L(e, r, t) {
      {
        var n = y.ReactDebugCurrentFrame, c = n.getStackAddendum();
        c !== "" && (r += "%s", t = t.concat([c]));
        var d = t.map(function(u) {
          return String(u);
        });
        d.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, d);
      }
    }
    var N = !1, Q = !1, Ye = !1, Ve = !1, Ue = !1, fe;
    fe = Symbol.for("react.module.reference");
    function Be(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === p || e === w || Ue || e === j || e === m || e === g || Ve || e === R || N || Q || Ye || typeof e == "object" && e !== null && (e.$$typeof === v || e.$$typeof === C || e.$$typeof === S || e.$$typeof === f || e.$$typeof === o || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === fe || e.getModuleId !== void 0));
    }
    function Je(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var c = r.displayName || r.name || "";
      return c !== "" ? t + "(" + c + ")" : t;
    }
    function de(e) {
      return e.displayName || "Context";
    }
    function A(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case p:
          return "Fragment";
        case l:
          return "Portal";
        case w:
          return "Profiler";
        case j:
          return "StrictMode";
        case m:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            var r = e;
            return de(r) + ".Consumer";
          case S:
            var t = e;
            return de(t._context) + ".Provider";
          case o:
            return Je(e, e.render, "ForwardRef");
          case C:
            var n = e.displayName || null;
            return n !== null ? n : A(e.type) || "Memo";
          case v: {
            var c = e, d = c._payload, u = c._init;
            try {
              return A(u(d));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var $ = Object.assign, U = 0, ve, he, pe, me, ge, ye, be;
    function Re() {
    }
    Re.__reactDisabledLog = !0;
    function ze() {
      {
        if (U === 0) {
          ve = console.log, he = console.info, pe = console.warn, me = console.error, ge = console.group, ye = console.groupCollapsed, be = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Re,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        U++;
      }
    }
    function He() {
      {
        if (U--, U === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: $({}, e, {
              value: ve
            }),
            info: $({}, e, {
              value: he
            }),
            warn: $({}, e, {
              value: pe
            }),
            error: $({}, e, {
              value: me
            }),
            group: $({}, e, {
              value: ge
            }),
            groupCollapsed: $({}, e, {
              value: ye
            }),
            groupEnd: $({}, e, {
              value: be
            })
          });
        }
        U < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ee = y.ReactCurrentDispatcher, re;
    function q(e, r, t) {
      {
        if (re === void 0)
          try {
            throw Error();
          } catch (c) {
            var n = c.stack.trim().match(/\n( *(at )?)/);
            re = n && n[1] || "";
          }
        return `
` + re + e;
      }
    }
    var te = !1, K;
    {
      var qe = typeof WeakMap == "function" ? WeakMap : Map;
      K = new qe();
    }
    function Ee(e, r) {
      if (!e || te)
        return "";
      {
        var t = K.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      te = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var d;
      d = ee.current, ee.current = null, ze();
      try {
        if (r) {
          var u = function() {
            throw Error();
          };
          if (Object.defineProperty(u.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(u, []);
            } catch (D) {
              n = D;
            }
            Reflect.construct(e, [], u);
          } else {
            try {
              u.call();
            } catch (D) {
              n = D;
            }
            e.call(u.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (D) {
            n = D;
          }
          e();
        }
      } catch (D) {
        if (D && n && typeof D.stack == "string") {
          for (var s = D.stack.split(`
`), T = n.stack.split(`
`), b = s.length - 1, _ = T.length - 1; b >= 1 && _ >= 0 && s[b] !== T[_]; )
            _--;
          for (; b >= 1 && _ >= 0; b--, _--)
            if (s[b] !== T[_]) {
              if (b !== 1 || _ !== 1)
                do
                  if (b--, _--, _ < 0 || s[b] !== T[_]) {
                    var P = `
` + s[b].replace(" at new ", " at ");
                    return e.displayName && P.includes("<anonymous>") && (P = P.replace("<anonymous>", e.displayName)), typeof e == "function" && K.set(e, P), P;
                  }
                while (b >= 1 && _ >= 0);
              break;
            }
        }
      } finally {
        te = !1, ee.current = d, He(), Error.prepareStackTrace = c;
      }
      var V = e ? e.displayName || e.name : "", M = V ? q(V) : "";
      return typeof e == "function" && K.set(e, M), M;
    }
    function Ke(e, r, t) {
      return Ee(e, !1);
    }
    function Xe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function X(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ee(e, Xe(e));
      if (typeof e == "string")
        return q(e);
      switch (e) {
        case m:
          return q("Suspense");
        case g:
          return q("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case o:
            return Ke(e.render);
          case C:
            return X(e.type, r, t);
          case v: {
            var n = e, c = n._payload, d = n._init;
            try {
              return X(d(c), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var B = Object.prototype.hasOwnProperty, _e = {}, we = y.ReactDebugCurrentFrame;
    function G(e) {
      if (e) {
        var r = e._owner, t = X(e.type, e._source, r ? r.type : null);
        we.setExtraStackFrame(t);
      } else
        we.setExtraStackFrame(null);
    }
    function Ge(e, r, t, n, c) {
      {
        var d = Function.call.bind(B);
        for (var u in e)
          if (d(e, u)) {
            var s = void 0;
            try {
              if (typeof e[u] != "function") {
                var T = Error((n || "React class") + ": " + t + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw T.name = "Invariant Violation", T;
              }
              s = e[u](r, u, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (b) {
              s = b;
            }
            s && !(s instanceof Error) && (G(c), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, u, typeof s), G(null)), s instanceof Error && !(s.message in _e) && (_e[s.message] = !0, G(c), h("Failed %s type: %s", t, s.message), G(null));
          }
      }
    }
    var Ze = Array.isArray;
    function ne(e) {
      return Ze(e);
    }
    function Qe(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function er(e) {
      try {
        return Se(e), !1;
      } catch {
        return !0;
      }
    }
    function Se(e) {
      return "" + e;
    }
    function Ce(e) {
      if (er(e))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(e)), Se(e);
    }
    var J = y.ReactCurrentOwner, rr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Oe, je, oe;
    oe = {};
    function tr(e) {
      if (B.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function nr(e) {
      if (B.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function or(e, r) {
      if (typeof e.ref == "string" && J.current && r && J.current.stateNode !== r) {
        var t = A(J.current.type);
        oe[t] || (h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', A(J.current.type), e.ref), oe[t] = !0);
      }
    }
    function ar(e, r) {
      {
        var t = function() {
          Oe || (Oe = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function ir(e, r) {
      {
        var t = function() {
          je || (je = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var sr = function(e, r, t, n, c, d, u) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: a,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: u,
        // Record the component responsible for creating this element.
        _owner: d
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function ur(e, r, t, n, c) {
      {
        var d, u = {}, s = null, T = null;
        t !== void 0 && (Ce(t), s = "" + t), nr(r) && (Ce(r.key), s = "" + r.key), tr(r) && (T = r.ref, or(r, c));
        for (d in r)
          B.call(r, d) && !rr.hasOwnProperty(d) && (u[d] = r[d]);
        if (e && e.defaultProps) {
          var b = e.defaultProps;
          for (d in b)
            u[d] === void 0 && (u[d] = b[d]);
        }
        if (s || T) {
          var _ = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && ar(u, _), T && ir(u, _);
        }
        return sr(e, s, T, c, n, J.current, u);
      }
    }
    var ae = y.ReactCurrentOwner, Te = y.ReactDebugCurrentFrame;
    function Y(e) {
      if (e) {
        var r = e._owner, t = X(e.type, e._source, r ? r.type : null);
        Te.setExtraStackFrame(t);
      } else
        Te.setExtraStackFrame(null);
    }
    var ie;
    ie = !1;
    function se(e) {
      return typeof e == "object" && e !== null && e.$$typeof === a;
    }
    function ke() {
      {
        if (ae.current) {
          var e = A(ae.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function lr(e) {
      return "";
    }
    var xe = {};
    function cr(e) {
      {
        var r = ke();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function De(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = cr(r);
        if (xe[t])
          return;
        xe[t] = !0;
        var n = "";
        e && e._owner && e._owner !== ae.current && (n = " It was passed a child from " + A(e._owner.type) + "."), Y(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), Y(null);
      }
    }
    function Pe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ne(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            se(n) && De(n, r);
          }
        else if (se(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var c = E(e);
          if (typeof c == "function" && c !== e.entries)
            for (var d = c.call(e), u; !(u = d.next()).done; )
              se(u.value) && De(u.value, r);
        }
      }
    }
    function fr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === o || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === C))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = A(r);
          Ge(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !ie) {
          ie = !0;
          var c = A(r);
          h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function dr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            Y(e), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), Y(null);
            break;
          }
        }
        e.ref !== null && (Y(e), h("Invalid attribute `ref` supplied to `React.Fragment`."), Y(null));
      }
    }
    var We = {};
    function Ae(e, r, t, n, c, d) {
      {
        var u = Be(e);
        if (!u) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var T = lr();
          T ? s += T : s += ke();
          var b;
          e === null ? b = "null" : ne(e) ? b = "array" : e !== void 0 && e.$$typeof === a ? (b = "<" + (A(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : b = typeof e, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", b, s);
        }
        var _ = ur(e, r, t, c, d);
        if (_ == null)
          return _;
        if (u) {
          var P = r.children;
          if (P !== void 0)
            if (n)
              if (ne(P)) {
                for (var V = 0; V < P.length; V++)
                  Pe(P[V], e);
                Object.freeze && Object.freeze(P);
              } else
                h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Pe(P, e);
        }
        if (B.call(r, "key")) {
          var M = A(e), D = Object.keys(r).filter(function(yr) {
            return yr !== "key";
          }), ue = D.length > 0 ? "{key: someKey, " + D.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!We[M + ue]) {
            var gr = D.length > 0 ? "{" + D.join(": ..., ") + ": ...}" : "{}";
            h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ue, M, gr, M), We[M + ue] = !0;
          }
        }
        return e === p ? dr(_) : fr(_), _;
      }
    }
    function vr(e, r, t) {
      return Ae(e, r, t, !0);
    }
    function hr(e, r, t) {
      return Ae(e, r, t, !1);
    }
    var pr = hr, mr = vr;
    H.Fragment = p, H.jsx = pr, H.jsxs = mr;
  }()), H;
}
process.env.NODE_ENV === "production" ? ce.exports = Sr() : ce.exports = Cr();
var O = ce.exports;
const Or = F.table`
	width: max-content;
	border-collapse: collapse;
	table-layout: fixed;
`, jr = F.div`
	width: 100%;
	max-height: 100vh;
	overflow: scroll;
`, Tr = F.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`, Ne = F.div`
	width: 4px;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
	background-color: transparent;
	overflow: hidden;
	visibility: hidden;
	touch-action: none;
	user-select: none;
	cursor: col-resize;
`, kr = F.tr`
	&[data-clickable] {
		cursor: pointer;
	}
`, xr = F(
  Le(({ children: i, dataTable: a, index: l, colSpan: p, resizeable: j = !0, ...w }) => {
    var o;
    const S = Er(null), f = (m) => (g) => {
      var E, y;
      g.preventDefault();
      const C = g.clientX;
      let v = (y = (E = S.current) == null ? void 0 : E.getBoundingClientRect()) == null ? void 0 : y.width, R = [...a.columnsWidth];
      const x = (h) => {
        const L = Math.trunc(Math.max(v + h.clientX - C, 80));
        R = R.map((N, Q) => Q === m ? { ...N, width: L } : N), a.setColumnsWidth(R), localStorage.setItem(a.key, JSON.stringify(R));
      }, W = () => {
        document.removeEventListener("mousemove", x), document.removeEventListener("mouseup", W);
      };
      document.addEventListener("mousemove", x), document.addEventListener("mouseup", W);
    };
    return /* @__PURE__ */ O.jsx("th", { ...w, ref: S, colSpan: p, style: { width: a.columnsWidth[l].width, minWidth: a.columns[l].width ?? ((o = S.current) == null ? void 0 : o.width) }, children: /* @__PURE__ */ O.jsxs(Tr, { children: [
      i,
      j && /* @__PURE__ */ O.jsx(Ne, { className: "resize-handler", onMouseDown: f(l) })
    ] }) });
  })
)`
	display: table-cell;
	position: relative;

	&:hover {
		${Ne} {
			visibility: visible;
			background-color: #404145;
		}
	}

	&[data-draggable] {
		cursor: pointer;
	}
`, Dr = F(
  Le((i) => /* @__PURE__ */ O.jsx("th", { ...i, style: { width: "unset" } }))
)`
	display: table-cell;

	&[data-draggable] {
		cursor: pointer;
	}
`, Pr = F.tbody``, Wr = F.thead`
	&[data-sticky] {
		position: sticky;
		top: 0;
	}
`, Ar = F.tfoot``, k = ({ tableContainerClass: i, tableClass: a, children: l, ...p }) => /* @__PURE__ */ O.jsx(jr, { ...p, className: `${p.className} ${i}`, children: /* @__PURE__ */ O.jsx(Or, { className: a, children: l }) });
k.Body = Pr;
k.Thead = Wr;
k.Row = kr;
k.Header = xr;
k.Footer = Ar;
k.ThNested = Dr;
const Fr = () => {
  const [i, a] = le(null), [l, p] = le(null);
  return {
    draggedIndex: i,
    hoveredIndex: l,
    onDragStart: (f, o) => (m) => {
      a(f), m.dataTransfer.effectAllowed = "move", o == null || o(f);
    },
    onDragOver: (f, o) => (m) => {
      m.preventDefault(), m.dataTransfer.dropEffect = "move", p(f), o == null || o(f);
    },
    onDrop: (f, o) => (m) => {
      m.preventDefault(), i !== null && (o == null || o(f), a(null), p(null));
    }
  };
}, Z = (i, a) => i ? a ?? "" : null, Yr = ({
  dataTable: i,
  data: a,
  tableContainerClass: l,
  tableClass: p,
  bodyClass: j,
  headerRowClass: w,
  rowClass: S,
  headerCellClass: f,
  nestedHeaderCellClass: o,
  cellClass: m,
  ...g
}) => {
  const { draggedIndex: C, hoveredIndex: v, onDragStart: R, onDragOver: x, onDrop: W } = Fr();
  return /* @__PURE__ */ O.jsxs(k, { ...g, tableContainerClass: l, tableClass: p, children: [
    /* @__PURE__ */ O.jsxs(k.Thead, { "data-sticky": Z(i.isStickyHeader), children: [
      /* @__PURE__ */ O.jsx(k.Row, { className: w, children: i.columns.map(
        (E, y) => {
          var h;
          return /* @__PURE__ */ O.jsx(
            k.Header,
            {
              colSpan: ((h = E.nestedColumns) == null ? void 0 : h.length) ?? 1,
              index: y,
              dataTable: i,
              className: f,
              resizeable: E.resizeable,
              "data-draggable": Z(i.hasDraggableColumns),
              "data-drag-hovered": Z(v === y && v !== C),
              draggable: i.hasDraggableColumns,
              onDragStart: R(y),
              onDragOver: x(y),
              onDrop: W(y, () => i.moveColumn(C, y)),
              children: E.label
            },
            E.key
          );
        }
      ) }),
      i.columns.some((E) => !!E.nestedColumns) && /* @__PURE__ */ O.jsx(k.Row, { className: w, children: i.columns.map(
        (E) => {
          var y;
          return (y = E.nestedColumns) != null && y.length ? E.nestedColumns.map((h) => /* @__PURE__ */ O.jsx(
            k.ThNested,
            {
              className: o ?? f,
              children: h.label
            },
            h.key
          )) : /* @__PURE__ */ O.jsx(
            k.ThNested,
            {
              className: o ?? f
            },
            `${E.key}-nested`
          );
        }
      ) })
    ] }),
    /* @__PURE__ */ O.jsx(k.Body, { className: j, children: a.map((E) => /* @__PURE__ */ O.jsx(
      k.Row,
      {
        className: S,
        onClick: () => {
          var y;
          return (y = i.onRowClick) == null ? void 0 : y.call(i, { item: E });
        },
        "data-clickable": Z(!!i.onRowClick),
        children: i.columns.map(({ key: y, Cell: h, ...L }) => L.nestedColumns ? L.nestedColumns.map(
          (N) => /* @__PURE__ */ O.jsx(
            N.Cell,
            {
              className: m,
              data: E
            },
            N.key
          )
        ) : /* @__PURE__ */ O.jsx(h, { className: m, data: E }, y))
      },
      E.key
    )) })
  ] });
};
class $e {
  // nestedColumnsWidth?: ColumnWidthType[] | null;	 
  constructor({ key: a, columns: l, saveLayoutView: p, hasDraggableColumns: j, isStickyHeader: w, onRowClick: S, defaultColumnWidth: f = "auto" }) {
    I(this, "key");
    I(this, "columns");
    I(this, "saveLayoutView");
    I(this, "hasDraggableColumns");
    I(this, "isStickyHeader");
    I(this, "onRowClick");
    I(this, "columnsWidth");
    wr(this);
    const o = JSON.parse(localStorage.getItem(a));
    if (this.key = a, this.saveLayoutView = p ?? !1, this.hasDraggableColumns = j ?? !0, this.isStickyHeader = w ?? !1, this.onRowClick = S, this.columnsWidth = l.map((m) => {
      const g = o == null ? void 0 : o.find(({ key: C }) => C === m.key);
      return { key: m.key, width: m.width ?? (g == null ? void 0 : g.width) ?? f };
    }), p)
      if (o) {
        const m = l.filter((v) => !o.map(({ key: R }) => R).includes(v.key)), g = o.reduce((v, R) => {
          const x = l.find(({ key: W }) => W === R.key);
          return x && (v = [...v, x]), v;
        }, []), C = o.reduce((v, R) => {
          const x = l.find(({ key: W }) => W === R.key);
          return x && (v = [...v, { key: x.key, width: x.width ?? R.width }]), v;
        }, []);
        this.columns = g.concat(m), this.columnsWidth = C.concat(m.map(({ key: v, width: R }) => ({ key: v, width: R ?? f })));
      } else
        localStorage.setItem(a, JSON.stringify(this.columnsWidth));
    else
      this.columns = l;
  }
  moveColumn(a, l) {
    if (!this.hasDraggableColumns)
      return;
    const p = [...this.columns], j = p.splice(a, 1)[0];
    p.splice(l, 0, j), this.columns = p;
    const w = [...this.columnsWidth], S = w.splice(a, 1)[0];
    w.splice(l, 0, S), this.columnsWidth = w;
    const f = JSON.parse(localStorage.getItem(this.key)), o = f.splice(a, 1)[0];
    f.splice(l, 0, o), localStorage.setItem(this.key, JSON.stringify(f));
  }
  setColumnsWidth(a) {
    this.columnsWidth = a;
  }
}
const Vr = ({ key: i, columns: a, ...l }) => {
  const p = new $e({ key: i, columns: a, ...l }), [j, w] = le(p);
  return _r(() => {
    const S = new $e({ key: i, columns: a, ...l });
    w(S);
  }, [i, a]), j;
};
export {
  Yr as SnapTable,
  Vr as useDataTable
};
