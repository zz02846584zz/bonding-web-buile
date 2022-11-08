import { cloneVNode, h, Fragment, inject, provide } from 'vue';

function u(r, n2, ...a) {
  if (r in n2) {
    let e2 = n2[r];
    return typeof e2 == "function" ? e2(...a) : e2;
  }
  let t2 = new Error(`Tried to handle "${r}" but there is no handler defined. Only defined handlers are: ${Object.keys(n2).map((e2) => `"${e2}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(t2, u), t2;
}
var R = ((o2) => (o2[o2.None = 0] = "None", o2[o2.RenderStrategy = 1] = "RenderStrategy", o2[o2.Static = 2] = "Static", o2))(R || {}), O = ((e2) => (e2[e2.Unmount = 0] = "Unmount", e2[e2.Hidden = 1] = "Hidden", e2))(O || {});
function P({ visible: r = true, features: t2 = 0, ourProps: e2, theirProps: o2, ...i }) {
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
  var y;
  let { as: n2, ...s } = w(r, ["unmount", "static"]), a = (y = e2.default) == null ? void 0 : y.call(e2, o2), l2 = {};
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
  return h(n2, Object.assign({}, s, l2), { default: () => a });
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
function w(r, t2 = []) {
  let e2 = Object.assign({}, r);
  for (let o2 of t2)
    o2 in e2 && delete e2[o2];
  return e2;
}
function x(r) {
  return r == null ? false : typeof r.type == "string" || typeof r.type == "object" || typeof r.type == "function";
}
let e = 0;
function n$1() {
  return ++e;
}
function t() {
  return n$1();
}
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

export { O, P, R, V, c, f, l, o, p, t, u, w };
//# sourceMappingURL=open-closed.5d362c74.mjs.map
