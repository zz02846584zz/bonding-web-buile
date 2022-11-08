import { ssrRenderAttrs } from 'vue/server-renderer';
import { cloneVNode, h as h$1, Fragment, inject, provide, ref, computed, useSSRContext, nextTick } from 'vue';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@unocss/nuxt/runtime/UnoIcon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
function u(r, n2, ...a) {
  if (r in n2) {
    let e2 = n2[r];
    return typeof e2 == "function" ? e2(...a) : e2;
  }
  let t2 = new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e2) => `"${e2}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t2, u), t2;
}
var R = ((o2) => (o2[o2.None = 0] = "None", o2[o2.RenderStrategy = 1] = "RenderStrategy", o2[o2.Static = 2] = "Static", o2))(R || {}), O$1 = ((e2) => (e2[e2.Unmount = 0] = "Unmount", e2[e2.Hidden = 1] = "Hidden", e2))(O$1 || {});
function P$1({ visible: r = true, features: t2 = 0, ourProps: e2, theirProps: o2, ...i }) {
  var a;
  let n2 = k(o2, e2), s = Object.assign(i, { props: n2 });
  if (r || t2 & 2 && n2.static)
    return p$1(s);
  if (t2 & 1) {
    let l2 = (a = n2.unmount) == null || a ? 0 : 1;
    return u(l2, { [0]() {
      return null;
    }, [1]() {
      return p$1({ ...i, props: { ...n2, hidden: true, style: { display: "none" } } });
    } });
  }
  return p$1(s);
}
function p$1({ props: r, attrs: t2, slots: e2, slot: o2, name: i }) {
  var y2;
  let { as: n2, ...s } = w$1(r, ["unmount", "static"]), a = (y2 = e2.default) == null ? void 0 : y2.call(e2, o2), l2 = {};
  if (o2) {
    let d = false, u2 = [];
    for (let [f2, c2] of Object.entries(o2))
      typeof c2 == "boolean" && (d = true), c2 === true && u2.push(f2);
    d && (l2["data-headlessui-state"] = u2.join(" "));
  }
  if (n2 === "template") {
    if (a = g(a != null ? a : []), Object.keys(s).length > 0 || Object.keys(t2).length > 0) {
      let [d, ...u2] = a != null ? a : [];
      if (!x(d) || u2.length > 0)
        throw new Error(['Passing props on "template"!', "", `The current component <${i} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(s).concat(Object.keys(t2)).sort((f2, c2) => f2.localeCompare(c2)).map((f2) => `  - ${f2}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((f2) => `  - ${f2}`).join(`
`)].join(`
`));
      return cloneVNode(d, Object.assign({}, s, l2));
    }
    return Array.isArray(a) && a.length === 1 ? a[0] : a;
  }
  return h$1(n2, Object.assign({}, s, l2), { default: () => a });
}
function g(r) {
  return r.flatMap((t2) => t2.type === Fragment ? g(t2.children) : [t2]);
}
function k(...r) {
  if (r.length === 0)
    return {};
  if (r.length === 1)
    return r[0];
  let t2 = {}, e2 = {};
  for (let i of r)
    for (let n2 in i)
      n2.startsWith("on") && typeof i[n2] == "function" ? (e2[n2] != null || (e2[n2] = []), e2[n2].push(i[n2])) : t2[n2] = i[n2];
  if (t2.disabled || t2["aria-disabled"])
    return Object.assign(t2, Object.fromEntries(Object.keys(e2).map((i) => [i, void 0])));
  for (let i in e2)
    Object.assign(t2, { [i](n2, ...s) {
      let a = e2[i];
      for (let l2 of a) {
        if (n2 instanceof Event && n2.defaultPrevented)
          return;
        l2(n2, ...s);
      }
    } });
  return t2;
}
function V(r) {
  let t2 = Object.assign({}, r);
  for (let e2 in t2)
    t2[e2] === void 0 && delete t2[e2];
  return t2;
}
function w$1(r, t2 = []) {
  let e2 = Object.assign({}, r);
  for (let o2 of t2)
    o2 in e2 && delete e2[o2];
  return e2;
}
function x(r) {
  return r == null ? false : typeof r.type == "string" || typeof r.type == "object" || typeof r.type == "function";
}
let e$1 = 0;
function n$1() {
  return ++e$1;
}
function t() {
  return n$1();
}
var o$1 = ((r) => (r.Space = " ", r.Enter = "Enter", r.Escape = "Escape", r.Backspace = "Backspace", r.Delete = "Delete", r.ArrowLeft = "ArrowLeft", r.ArrowUp = "ArrowUp", r.ArrowRight = "ArrowRight", r.ArrowDown = "ArrowDown", r.Home = "Home", r.End = "End", r.PageUp = "PageUp", r.PageDown = "PageDown", r.Tab = "Tab", r))(o$1 || {});
function o(n2) {
  var l2;
  return n2 == null || n2.value == null ? null : (l2 = n2.value.$el) != null ? l2 : n2.value;
}
let n = Symbol("Context");
var l = ((e2) => (e2[e2.Open = 0] = "Open", e2[e2.Closed = 1] = "Closed", e2))(l || {});
function f() {
  return p() !== null;
}
function p() {
  return inject(n, null);
}
function c(o2) {
  provide(n, o2);
}
function m$1(r) {
  return null;
}
let m = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e2) => `${e2}:not([tabindex='-1'])`).join(",");
var M = ((n2) => (n2[n2.First = 1] = "First", n2[n2.Previous = 2] = "Previous", n2[n2.Next = 4] = "Next", n2[n2.Last = 8] = "Last", n2[n2.WrapAround = 16] = "WrapAround", n2[n2.NoScroll = 32] = "NoScroll", n2))(M || {}), N = ((o2) => (o2[o2.Error = 0] = "Error", o2[o2.Overflow = 1] = "Overflow", o2[o2.Success = 2] = "Success", o2[o2.Underflow = 3] = "Underflow", o2))(N || {}), b = ((r) => (r[r.Previous = -1] = "Previous", r[r.Next = 1] = "Next", r))(b || {});
function E(e2 = document.body) {
  return e2 == null ? [] : Array.from(e2.querySelectorAll(m));
}
var F = ((r) => (r[r.Strict = 0] = "Strict", r[r.Loose = 1] = "Loose", r))(F || {});
function h(e2, t2 = 0) {
  var r;
  return e2 === ((r = m$1()) == null ? void 0 : r.body) ? false : u(t2, { [0]() {
    return e2.matches(m);
  }, [1]() {
    let l2 = e2;
    for (; l2 !== null; ) {
      if (l2.matches(m))
        return true;
      l2 = l2.parentElement;
    }
    return false;
  } });
}
function D(e2) {
  let t2 = m$1();
  nextTick(() => {
    t2 && !h(t2.activeElement, 0) && w(e2);
  });
}
function w(e2) {
  e2 == null || e2.focus({ preventScroll: true });
}
let H = ["textarea", "input"].join(",");
function S(e2) {
  var t2, r;
  return (r = (t2 = e2 == null ? void 0 : e2.matches) == null ? void 0 : t2.call(e2, H)) != null ? r : false;
}
function O(e2, t2 = (r) => r) {
  return e2.slice().sort((r, l2) => {
    let o2 = t2(r), s = t2(l2);
    if (o2 === null || s === null)
      return 0;
    let n2 = o2.compareDocumentPosition(s);
    return n2 & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n2 & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function v$1(e2, t2) {
  return P(E(), t2, true, e2);
}
function P(e2, t2, r = true, l2 = null) {
  var c2;
  let o2 = (c2 = Array.isArray(e2) ? e2.length > 0 ? e2[0].ownerDocument : document : e2 == null ? void 0 : e2.ownerDocument) != null ? c2 : document, s = Array.isArray(e2) ? r ? O(e2) : e2 : E(e2);
  l2 = l2 != null ? l2 : o2.activeElement;
  let n2 = (() => {
    if (t2 & 5)
      return 1;
    if (t2 & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), x2 = (() => {
    if (t2 & 1)
      return 0;
    if (t2 & 2)
      return Math.max(0, s.indexOf(l2)) - 1;
    if (t2 & 4)
      return Math.max(0, s.indexOf(l2)) + 1;
    if (t2 & 8)
      return s.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p2 = t2 & 32 ? { preventScroll: true } : {}, a = 0, i = s.length, u2;
  do {
    if (a >= i || a + i <= 0)
      return 0;
    let f2 = x2 + a;
    if (t2 & 16)
      f2 = (f2 + i) % i;
    else {
      if (f2 < 0)
        return 3;
      if (f2 >= i)
        return 1;
    }
    u2 = s[f2], u2 == null || u2.focus(p2), a += n2;
  } while (u2 !== o2.activeElement);
  return t2 & 6 && S(u2) && u2.select(), u2.hasAttribute("tabindex") || u2.setAttribute("tabindex", "0"), 2;
}
function y(f2, m2, i = computed(() => true)) {
  ref(null);
}

export { D, F, M, N, O, P$1 as P, R, V, __nuxt_component_0 as _, o$1 as a, O$1 as b, c, P as d, w as e, f, h, l, m$1 as m, o, p, t, u, v$1 as v, w$1 as w, y };
//# sourceMappingURL=use-outside-click.01e1b2e0.mjs.map
