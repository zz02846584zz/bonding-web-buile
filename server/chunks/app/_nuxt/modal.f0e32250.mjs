import { m as m$1, P as P$1$1, o as o$1, t as t$1, p as p$1, u as u$4, l as l$2, y, R as R$1, f as f$1, b as O$1, c as c$1, w as w$1, _ as __nuxt_component_0, d as P$2, M, e as w$2, N } from './use-outside-click.01e1b2e0.mjs';
import { defineComponent, ref, computed, h as h$1, Fragment, onMounted, watch, onUnmounted, provide, inject, watchEffect, Teleport, reactive, unref, nextTick, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { f, a } from './hidden.90d807c6.mjs';
import './_plugin-vue_export-helper.a1a6add7.mjs';

var d$2 = ((r2) => (r2[r2.Forwards = 0] = "Forwards", r2[r2.Backwards = 1] = "Backwards", r2))(d$2 || {});
function n() {
  let o2 = ref(0);
  return o2;
}
function E(n2, e2, o2, r2) {
}
function t(e2) {
  typeof queueMicrotask == "function" ? queueMicrotask(e2) : Promise.resolve().then(e2).catch((o2) => setTimeout(() => {
    throw o2;
  }));
}
var h = ((e2) => (e2[e2.None = 1] = "None", e2[e2.InitialFocus = 2] = "InitialFocus", e2[e2.TabLock = 4] = "TabLock", e2[e2.FocusLock = 8] = "FocusLock", e2[e2.RestoreFocus = 16] = "RestoreFocus", e2[e2.All = 30] = "All", e2))(h || {});
let ee = Object.assign(defineComponent({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: Object, default: ref(/* @__PURE__ */ new Set()) } }, inheritAttrs: false, setup(u2, { attrs: a$1, slots: t2, expose: r2 }) {
  let n$1 = ref(null);
  r2({ el: n$1, $el: n$1 });
  let o2 = computed(() => m$1());
  A({ ownerDocument: o2 }, computed(() => Boolean(u2.features & 16)));
  let e2 = C({ ownerDocument: o2, container: n$1, initialFocus: computed(() => u2.initialFocus) }, computed(() => Boolean(u2.features & 2)));
  _$1({ ownerDocument: o2, container: n$1, containers: u2.containers, previousActiveElement: e2 }, computed(() => Boolean(u2.features & 8)));
  let s2 = n();
  function i2() {
    let l2 = o$1(n$1);
    !l2 || u$4(s2.value, { [d$2.Forwards]: () => P$2(l2, M.First), [d$2.Backwards]: () => P$2(l2, M.Last) });
  }
  return () => {
    let l2 = {}, c2 = { ref: n$1 }, { features: f$12, initialFocus: p2, containers: U, ...y2 } = u2;
    return h$1(Fragment, [Boolean(f$12 & 4) && h$1(f, { as: "button", type: "button", onFocus: i2, features: a.Focusable }), P$1$1({ ourProps: c2, theirProps: { ...a$1, ...y2 }, slot: l2, attrs: a$1, slots: t2, name: "FocusTrap" }), Boolean(f$12 & 4) && h$1(f, { as: "button", type: "button", onFocus: i2, features: a.Focusable })]);
  };
} }), { features: h });
function A({ ownerDocument: u2 }, a2) {
  let t2 = ref(null);
  function r2() {
    var o2;
    t2.value || (t2.value = (o2 = u2.value) == null ? void 0 : o2.activeElement);
  }
  function n2() {
    !t2.value || (w$2(t2.value), t2.value = null);
  }
  onMounted(() => {
    watch(a2, (o2, e2) => {
      o2 !== e2 && (o2 ? r2() : n2());
    }, { immediate: true });
  }), onUnmounted(n2);
}
function C({ ownerDocument: u2, container: a2, initialFocus: t$12 }, r2) {
  let n2 = ref(null), o2 = ref(false);
  return onMounted(() => o2.value = true), onUnmounted(() => o2.value = false), onMounted(() => {
    watch([a2, t$12, r2], (e2, s2) => {
      if (e2.every((l2, c2) => (s2 == null ? void 0 : s2[c2]) === l2) || !r2.value)
        return;
      let i2 = o$1(a2);
      !i2 || t(() => {
        var f2, p2;
        if (!o2.value)
          return;
        let l2 = o$1(t$12), c2 = (f2 = u2.value) == null ? void 0 : f2.activeElement;
        if (l2) {
          if (l2 === c2) {
            n2.value = c2;
            return;
          }
        } else if (i2.contains(c2)) {
          n2.value = c2;
          return;
        }
        l2 ? w$2(l2) : P$2(i2, M.First | M.NoScroll) === N.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), n2.value = (p2 = u2.value) == null ? void 0 : p2.activeElement;
      });
    }, { immediate: true, flush: "post" });
  }), n2;
}
function _$1({ ownerDocument: u2, container: a2, containers: t2, previousActiveElement: r2 }, n2) {
  var o2;
  E((o2 = u2.value) == null ? void 0 : o2.defaultView);
}
let l$1 = "body > *", i = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map();
function u$3(t2) {
  t2.setAttribute("aria-hidden", "true"), t2.inert = true;
}
function s$1(t2) {
  let n2 = r.get(t2);
  !n2 || (n2["aria-hidden"] === null ? t2.removeAttribute("aria-hidden") : t2.setAttribute("aria-hidden", n2["aria-hidden"]), t2.inert = n2.inert);
}
function g$2(t2, n2 = ref(true)) {
  watchEffect((d2) => {
    if (!n2.value || !t2.value)
      return;
    let a2 = t2.value, o2 = m$1();
    if (!!o2) {
      i.add(a2);
      for (let e2 of r.keys())
        e2.contains(a2) && (s$1(e2), r.delete(e2));
      o2.querySelectorAll(l$1).forEach((e2) => {
        if (e2 instanceof HTMLElement) {
          for (let f2 of i)
            if (e2.contains(f2))
              return;
          i.size === 1 && (r.set(e2, { "aria-hidden": e2.getAttribute("aria-hidden"), inert: e2.inert }), u$3(e2));
        }
      }), d2(() => {
        if (i.delete(a2), i.size > 0)
          o2.querySelectorAll(l$1).forEach((e2) => {
            if (e2 instanceof HTMLElement && !r.has(e2)) {
              for (let f2 of i)
                if (e2.contains(f2))
                  return;
              r.set(e2, { "aria-hidden": e2.getAttribute("aria-hidden"), inert: e2.inert }), u$3(e2);
            }
          });
        else
          for (let e2 of r.keys())
            s$1(e2), r.delete(e2);
      });
    }
  });
}
let e = Symbol("ForcePortalRootContext");
function u$2() {
  return inject(e, false);
}
let P$1 = defineComponent({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: false } }, setup(o2, { slots: t2, attrs: r2 }) {
  return provide(e, o2.force), () => {
    let { force: f2, ...n2 } = o2;
    return P$1$1({ theirProps: n2, ourProps: {}, slot: {}, slots: t2, attrs: r2, name: "ForcePortalRoot" });
  };
} });
function c(t2) {
  let r2 = m$1();
  if (!r2) {
    if (t2 === null)
      return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${t2}`);
  }
  let o2 = r2.getElementById("headlessui-portal-root");
  if (o2)
    return o2;
  let e2 = r2.createElement("div");
  return e2.setAttribute("id", "headlessui-portal-root"), r2.body.appendChild(e2);
}
let R = defineComponent({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(t2, { slots: r2, attrs: o2 }) {
  let e2 = ref(null), p2 = computed(() => m$1()), n2 = u$2(), u2 = inject(g$1, null), l2 = ref(n2 === true || u2 == null ? c(e2.value) : u2.resolveTarget());
  return watchEffect(() => {
    n2 || u2 != null && (l2.value = u2.resolveTarget());
  }), onUnmounted(() => {
    var i2, m2;
    let a2 = (i2 = p2.value) == null ? void 0 : i2.getElementById("headlessui-portal-root");
    !a2 || l2.value === a2 && l2.value.children.length <= 0 && ((m2 = l2.value.parentElement) == null || m2.removeChild(l2.value));
  }), () => {
    if (l2.value === null)
      return null;
    let a2 = { ref: e2, "data-headlessui-portal": "" };
    return h$1(Teleport, { to: l2.value }, P$1$1({ ourProps: a2, theirProps: t2, slot: {}, attrs: o2, slots: r2, name: "Portal" }));
  };
} }), g$1 = Symbol("PortalGroupContext"), L$1 = defineComponent({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(t2, { attrs: r2, slots: o2 }) {
  let e2 = reactive({ resolveTarget() {
    return t2.target;
  } });
  return provide(g$1, e2), () => {
    let { target: p2, ...n2 } = t2;
    return P$1$1({ theirProps: n2, ourProps: {}, slot: {}, attrs: r2, slots: o2, name: "PortalGroup" });
  };
} });
let u$1 = Symbol("StackContext");
var p = ((e2) => (e2[e2.Add = 0] = "Add", e2[e2.Remove = 1] = "Remove", e2))(p || {});
function v() {
  return inject(u$1, () => {
  });
}
function S$1({ type: o2, enabled: r2, element: e2, onUpdate: i2 }) {
  let a2 = v();
  function t2(...n2) {
    i2 == null || i2(...n2), a2(...n2);
  }
  onMounted(() => {
    watch(r2, (n2, d2) => {
      n2 ? t2(0, o2, e2) : d2 === true && t2(1, o2, e2);
    }, { immediate: true, flush: "sync" });
  }), onUnmounted(() => {
    r2.value && t2(1, o2, e2);
  }), provide(u$1, t2);
}
let u = Symbol("DescriptionContext");
function b() {
  let t2 = inject(u, null);
  if (t2 === null)
    throw new Error("Missing parent");
  return t2;
}
function P({ slot: t2 = ref({}), name: o2 = "Description", props: s2 = {} } = {}) {
  let e2 = ref([]);
  function n2(r2) {
    return e2.value.push(r2), () => {
      let i2 = e2.value.indexOf(r2);
      i2 !== -1 && e2.value.splice(i2, 1);
    };
  }
  return provide(u, { register: n2, slot: t2, name: o2, props: s2 }), computed(() => e2.value.length > 0 ? e2.value.join(" ") : void 0);
}
defineComponent({ name: "Description", props: { as: { type: [Object, String], default: "p" } }, setup(t2, { attrs: o2, slots: s2 }) {
  let e2 = b(), n2 = `headlessui-description-${t$1()}`;
  return onMounted(() => onUnmounted(e2.register(n2))), () => {
    let { name: r2 = "Description", slot: i2 = ref({}), props: l2 = {} } = e2, c2 = t2, d2 = { ...Object.entries(l2).reduce((f2, [a2, g2]) => Object.assign(f2, { [a2]: unref(g2) }), {}), id: n2 };
    return P$1$1({ ourProps: d2, theirProps: c2, slot: i2.value, attrs: o2, slots: s2, name: r2 });
  };
} });
function s() {
  let a2 = [], i2 = [], t2 = { enqueue(e2) {
    i2.push(e2);
  }, addEventListener(e2, n2, o2, r2) {
    return e2.addEventListener(n2, o2, r2), t2.add(() => e2.removeEventListener(n2, o2, r2));
  }, requestAnimationFrame(...e2) {
    let n2 = requestAnimationFrame(...e2);
    t2.add(() => cancelAnimationFrame(n2));
  }, nextFrame(...e2) {
    t2.requestAnimationFrame(() => {
      t2.requestAnimationFrame(...e2);
    });
  }, setTimeout(...e2) {
    let n2 = setTimeout(...e2);
    t2.add(() => clearTimeout(n2));
  }, add(e2) {
    a2.push(e2);
  }, dispose() {
    for (let e2 of a2.splice(0))
      e2();
  }, async workQueue() {
    for (let e2 of i2.splice(0))
      await e2();
  } };
  return t2;
}
function o() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
var De = ((t2) => (t2[t2.Open = 0] = "Open", t2[t2.Closed = 1] = "Closed", t2))(De || {});
let j = Symbol("DialogContext");
function T(a2) {
  let u2 = inject(j, null);
  if (u2 === null) {
    let t2 = new Error(`<${a2} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(t2, T), t2;
  }
  return u2;
}
let k = "DC8F892D-2EBD-447C-A4C8-A03058436FF4", Ne = defineComponent({ name: "Dialog", inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, open: { type: [Boolean, String], default: k }, initialFocus: { type: Object, default: null } }, emits: { close: (a2) => true }, setup(a$1, { emit: u2, attrs: t2, slots: s$12, expose: i2 }) {
  var A2;
  let g2 = ref(false);
  onMounted(() => {
    g2.value = true;
  });
  let r2 = ref(0), d2 = p$1(), S2 = computed(() => a$1.open === k && d2 !== null ? u$4(d2.value, { [l$2.Open]: true, [l$2.Closed]: false }) : a$1.open), x2 = ref(/* @__PURE__ */ new Set()), m2 = ref(null), B2 = ref(null), I = computed(() => m$1());
  if (i2({ el: m2, $el: m2 }), !(a$1.open !== k || d2 !== null))
    throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof S2.value != "boolean")
    throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${S2.value === k ? void 0 : a$1.open}`);
  let f$12 = computed(() => g2.value && S2.value ? 0 : 1), H = computed(() => f$12.value === 0), C2 = computed(() => r2.value > 1), G = inject(j, null) !== null, z = computed(() => C2.value ? "parent" : "leaf");
  g$2(m2, computed(() => C2.value ? H.value : false)), S$1({ type: "Dialog", enabled: computed(() => f$12.value === 0), element: m2, onUpdate: (o2, l2, n2) => {
    if (l2 === "Dialog")
      return u$4(o2, { [p.Add]() {
        x2.value.add(n2), r2.value += 1;
      }, [p.Remove]() {
        x2.value.delete(n2), r2.value -= 1;
      } });
  } });
  let J = P({ name: "DialogDescription", slot: computed(() => ({ open: S2.value })) }), Q = `headlessui-dialog-${t$1()}`, E$1 = ref(null), O2 = { titleId: E$1, panelRef: ref(null), dialogState: f$12, setTitleId(o2) {
    E$1.value !== o2 && (E$1.value = o2);
  }, close() {
    u2("close", false);
  } };
  return provide(j, O2), y(() => {
    var l2, n2, p2;
    return [...Array.from((n2 = (l2 = I.value) == null ? void 0 : l2.querySelectorAll("body > *, [data-headlessui-portal]")) != null ? n2 : []).filter((e2) => !(!(e2 instanceof HTMLElement) || e2.contains(o$1(B2)) || O2.panelRef.value && e2.contains(O2.panelRef.value))), (p2 = O2.panelRef.value) != null ? p2 : m2.value];
  }, (o2, l2) => {
    O2.close(), nextTick(() => l2 == null ? void 0 : l2.focus());
  }, computed(() => f$12.value === 0 && !C2.value)), E((A2 = I.value) == null ? void 0 : A2.defaultView), watchEffect((o$12) => {
    var W;
    if (f$12.value !== 0 || G)
      return;
    let l2 = I.value;
    if (!l2)
      return;
    let n2 = s();
    function p2(v2, b2, X) {
      let Z = v2.style.getPropertyValue(b2);
      return Object.assign(v2.style, { [b2]: X }), n2.add(() => {
        Object.assign(v2.style, { [b2]: Z });
      });
    }
    let e2 = l2 == null ? void 0 : l2.documentElement, L2 = ((W = l2.defaultView) != null ? W : window).innerWidth - e2.clientWidth;
    if (p2(e2, "overflow", "hidden"), L2 > 0) {
      let v2 = e2.clientWidth - e2.offsetWidth, b2 = L2 - v2;
      p2(e2, "paddingRight", `${b2}px`);
    }
    if (o()) {
      let v2 = window.pageYOffset;
      p2(e2, "position", "fixed"), p2(e2, "marginTop", `-${v2}px`), p2(e2, "width", "100%"), n2.add(() => window.scrollTo(0, v2));
    }
    o$12(n2.dispose);
  }), watchEffect((o2) => {
    if (f$12.value !== 0)
      return;
    let l2 = o$1(m2);
    if (!l2)
      return;
    let n2 = new IntersectionObserver((p2) => {
      for (let e2 of p2)
        e2.boundingClientRect.x === 0 && e2.boundingClientRect.y === 0 && e2.boundingClientRect.width === 0 && e2.boundingClientRect.height === 0 && O2.close();
    });
    n2.observe(l2), o2(() => n2.disconnect());
  }), () => {
    let o2 = { ...t2, ref: m2, id: Q, role: "dialog", "aria-modal": f$12.value === 0 ? true : void 0, "aria-labelledby": E$1.value, "aria-describedby": J.value }, { open: l2, initialFocus: n2, ...p2 } = a$1, e2 = { open: f$12.value === 0 };
    return h$1(P$1, { force: true }, () => [h$1(R, () => h$1(L$1, { target: m2.value }, () => h$1(P$1, { force: false }, () => h$1(ee, { initialFocus: n2, containers: x2, features: H.value ? u$4(z.value, { parent: ee.features.RestoreFocus, leaf: ee.features.All & ~ee.features.FocusLock }) : ee.features.None }, () => P$1$1({ ourProps: o2, theirProps: p2, slot: e2, attrs: t2, slots: s$12, visible: f$12.value === 0, features: R$1.RenderStrategy | R$1.Static, name: "Dialog" }))))), h$1(f, { features: a.Hidden, ref: B2 })]);
  };
} }), Ve = defineComponent({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" } }, setup(a2, { attrs: u2, slots: t2 }) {
  let s2 = T("DialogOverlay"), i2 = `headlessui-dialog-overlay-${t$1()}`;
  function g2(r2) {
    r2.target === r2.currentTarget && (r2.preventDefault(), r2.stopPropagation(), s2.close());
  }
  return () => P$1$1({ ourProps: { id: i2, "aria-hidden": true, onClick: g2 }, theirProps: a2, slot: { open: s2.dialogState.value === 0 }, attrs: u2, slots: t2, name: "DialogOverlay" });
} });
defineComponent({ name: "DialogBackdrop", props: { as: { type: [Object, String], default: "div" } }, inheritAttrs: false, setup(a2, { attrs: u2, slots: t2, expose: s2 }) {
  let i2 = T("DialogBackdrop"), g2 = `headlessui-dialog-backdrop-${t$1()}`, r2 = ref(null);
  return s2({ el: r2, $el: r2 }), onMounted(() => {
    if (i2.panelRef.value === null)
      throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let d2 = a2, S2 = { id: g2, ref: r2, "aria-hidden": true };
    return h$1(P$1, { force: true }, () => h$1(R, () => P$1$1({ ourProps: S2, theirProps: { ...u2, ...d2 }, slot: { open: i2.dialogState.value === 0 }, attrs: u2, slots: t2, name: "DialogBackdrop" })));
  };
} });
defineComponent({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" } }, setup(a2, { attrs: u2, slots: t2, expose: s2 }) {
  let i2 = T("DialogPanel"), g2 = `headlessui-dialog-panel-${t$1()}`;
  s2({ el: i2.panelRef, $el: i2.panelRef });
  function r2(d2) {
    d2.stopPropagation();
  }
  return () => {
    let d2 = { id: g2, ref: i2.panelRef, onClick: r2 };
    return P$1$1({ ourProps: d2, theirProps: a2, slot: { open: i2.dialogState.value === 0 }, attrs: u2, slots: t2, name: "DialogPanel" });
  };
} });
let Ue = defineComponent({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" } }, setup(a2, { attrs: u2, slots: t2 }) {
  let s2 = T("DialogTitle"), i2 = `headlessui-dialog-title-${t$1()}`;
  return onMounted(() => {
    s2.setTitleId(i2), onUnmounted(() => s2.setTitleId(null));
  }), () => P$1$1({ ourProps: { id: i2 }, theirProps: a2, slot: { open: s2.dialogState.value === 0 }, attrs: u2, slots: t2, name: "DialogTitle" });
} });
function l(r2) {
  let e2 = { called: false };
  return (...t2) => {
    if (!e2.called)
      return e2.called = true, r2(...t2);
  };
}
function m(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.add(...t2);
}
function d$1(e2, ...t2) {
  e2 && t2.length > 0 && e2.classList.remove(...t2);
}
var g = ((i2) => (i2.Finished = "finished", i2.Cancelled = "cancelled", i2))(g || {});
function F$1(e2, t2) {
  let i2 = s();
  if (!e2)
    return i2.dispose;
  let { transitionDuration: n2, transitionDelay: a2 } = getComputedStyle(e2), [l2, s$12] = [n2, a2].map((o2) => {
    let [u2 = 0] = o2.split(",").filter(Boolean).map((r2) => r2.includes("ms") ? parseFloat(r2) : parseFloat(r2) * 1e3).sort((r2, c2) => c2 - r2);
    return u2;
  });
  return l2 !== 0 ? i2.setTimeout(() => t2("finished"), l2 + s$12) : t2("finished"), i2.add(() => t2("cancelled")), i2.dispose;
}
function L(e2, t2, i2, n2, a2, l$12) {
  let s$12 = s(), o2 = l$12 !== void 0 ? l(l$12) : () => {
  };
  return d$1(e2, ...a2), m(e2, ...t2, ...i2), s$12.nextFrame(() => {
    d$1(e2, ...i2), m(e2, ...n2), s$12.add(F$1(e2, (u2) => (d$1(e2, ...n2, ...t2), m(e2, ...a2), o2(u2))));
  }), s$12.add(() => d$1(e2, ...t2, ...i2, ...n2, ...a2)), s$12.add(() => o2("cancelled")), s$12.dispose;
}
function d(e2 = "") {
  return e2.split(" ").filter((t2) => t2.trim().length > 1);
}
let B = Symbol("TransitionContext");
var ae = ((a2) => (a2.Visible = "visible", a2.Hidden = "hidden", a2))(ae || {});
function le() {
  return inject(B, null) !== null;
}
function ie() {
  let e2 = inject(B, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
function se() {
  let e2 = inject(F, null);
  if (e2 === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e2;
}
let F = Symbol("NestingContext");
function w(e2) {
  return "children" in e2 ? w(e2.children) : e2.value.filter(({ state: t2 }) => t2 === "visible").length > 0;
}
function K(e2) {
  let t2 = ref([]), a2 = ref(false);
  onMounted(() => a2.value = true), onUnmounted(() => a2.value = false);
  function s2(r2, n2 = O$1.Hidden) {
    let l2 = t2.value.findIndex(({ id: i2 }) => i2 === r2);
    l2 !== -1 && (u$4(n2, { [O$1.Unmount]() {
      t2.value.splice(l2, 1);
    }, [O$1.Hidden]() {
      t2.value[l2].state = "hidden";
    } }), !w(t2) && a2.value && (e2 == null || e2()));
  }
  function v2(r2) {
    let n2 = t2.value.find(({ id: l2 }) => l2 === r2);
    return n2 ? n2.state !== "visible" && (n2.state = "visible") : t2.value.push({ id: r2, state: "visible" }), () => s2(r2, O$1.Unmount);
  }
  return { children: t2, register: v2, unregister: s2 };
}
let _ = R$1.RenderStrategy, oe = defineComponent({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t2, attrs: a2, slots: s2, expose: v2 }) {
  if (!le() && f$1())
    return () => h$1(fe, { ...e2, onBeforeEnter: () => t2("beforeEnter"), onAfterEnter: () => t2("afterEnter"), onBeforeLeave: () => t2("beforeLeave"), onAfterLeave: () => t2("afterLeave") }, s2);
  let r2 = ref(null), n2 = ref("visible"), l2 = computed(() => e2.unmount ? O$1.Unmount : O$1.Hidden);
  v2({ el: r2, $el: r2 });
  let { show: i2, appear: x2 } = ie(), { register: g$12, unregister: p2 } = se(), R2 = { value: true }, m2 = t$1(), S2 = { value: false }, N2 = K(() => {
    S2.value || (n2.value = "hidden", p2(m2), t2("afterLeave"));
  });
  onMounted(() => {
    let o2 = g$12(m2);
    onUnmounted(o2);
  }), watchEffect(() => {
    if (l2.value === O$1.Hidden && !!m2) {
      if (i2 && n2.value !== "visible") {
        n2.value = "visible";
        return;
      }
      u$4(n2.value, { ["hidden"]: () => p2(m2), ["visible"]: () => g$12(m2) });
    }
  });
  let k2 = d(e2.enter), $ = d(e2.enterFrom), q = d(e2.enterTo), O$1$1 = d(e2.entered), z = d(e2.leave), G = d(e2.leaveFrom), J = d(e2.leaveTo);
  onMounted(() => {
    watchEffect(() => {
      if (n2.value === "visible") {
        let o2 = o$1(r2);
        if (o2 instanceof Comment && o2.data === "")
          throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function Q(o2) {
    let c2 = R2.value && !x2.value, u2 = o$1(r2);
    !u2 || !(u2 instanceof HTMLElement) || c2 || (S2.value = true, i2.value && t2("beforeEnter"), i2.value || t2("beforeLeave"), o2(i2.value ? L(u2, k2, $, q, O$1$1, (C2) => {
      S2.value = false, C2 === g.Finished && t2("afterEnter");
    }) : L(u2, z, G, J, O$1$1, (C2) => {
      S2.value = false, C2 === g.Finished && (w(N2) || (n2.value = "hidden", p2(m2), t2("afterLeave")));
    })));
  }
  return onMounted(() => {
    watch([i2], (o2, c2, u2) => {
      Q(u2), R2.value = false;
    }, { immediate: true });
  }), provide(F, N2), c$1(computed(() => u$4(n2.value, { ["visible"]: l$2.Open, ["hidden"]: l$2.Closed }))), () => {
    let { appear: o2, show: c2, enter: u2, enterFrom: C2, enterTo: de, entered: ve, leave: pe, leaveFrom: me, leaveTo: Te, ...W } = e2;
    return P$1$1({ theirProps: W, ourProps: { ref: r2 }, slot: {}, slots: s2, attrs: a2, features: _, visible: n2.value === "visible", name: "TransitionChild" });
  };
} }), ue = oe, fe = defineComponent({ inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e2, { emit: t2, attrs: a2, slots: s2 }) {
  let v2 = p$1(), r2 = computed(() => e2.show === null && v2 !== null ? u$4(v2.value, { [l$2.Open]: true, [l$2.Closed]: false }) : e2.show);
  watchEffect(() => {
    if (![true, false].includes(r2.value))
      throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let n2 = ref(r2.value ? "visible" : "hidden"), l2 = K(() => {
    n2.value = "hidden";
  }), i2 = ref(true), x2 = { show: r2, appear: computed(() => e2.appear || !i2.value) };
  return onMounted(() => {
    watchEffect(() => {
      i2.value = false, r2.value ? n2.value = "visible" : w(l2) || (n2.value = "hidden");
    });
  }), provide(F, l2), provide(B, x2), () => {
    let g2 = w$1(e2, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), p2 = { unmount: e2.unmount };
    return P$1$1({ ourProps: { ...p2, as: "template" }, theirProps: {}, slot: {}, slots: { ...s2, default: () => [h$1(ue, { onBeforeEnter: () => t2("beforeEnter"), onAfterEnter: () => t2("afterEnter"), onBeforeLeave: () => t2("beforeLeave"), onAfterLeave: () => t2("afterLeave"), ...a2, ...p2, ...g2 }, s2.default)] }, attrs: {}, features: _, visible: n2.value === "visible", name: "Transition" });
  };
} });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "modal",
  __ssrInlineRender: true,
  setup(__props) {
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center" }, _attrs))}><button class="rounded-lg bg-white p-4"> Open Modal </button>`);
      _push(ssrRenderComponent(unref(fe), {
        as: "template",
        show: open.value
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Ne), {
              as: "div",
              class: "fixed inset-0 z-10 overflow-y-auto",
              onClose: ($event) => open.value = false
            }, {
              default: withCtx((_22, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(oe), {
                    as: "template",
                    enter: "ease-out duration-300",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "ease-in duration-200",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(Ve), { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(Ve), { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"${_scopeId2}>\u200B</span>`);
                  _push3(ssrRenderComponent(unref(oe), {
                    as: "template",
                    enter: "ease-out duration-300",
                    "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                    "enter-to": "opacity-100 translate-y-0 sm:scale-100",
                    leave: "ease-in duration-200",
                    "leave-from": "opacity-100 translate-y-0 sm:scale-100",
                    "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"${_scopeId3}><div${_scopeId3}><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-check h-6 w-6 text-lg text-green-600" }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="mt-3 text-center sm:mt-5"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Ue), {
                          as: "h3",
                          class: "text-lg font-medium leading-6 text-gray-900"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Payment successful `);
                            } else {
                              return [
                                createTextVNode(" Payment successful ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="mt-2"${_scopeId3}><p class="text-sm text-gray-500"${_scopeId3}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore. </p></div></div></div><div class="mt-5 sm:mt-6"${_scopeId3}><button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"${_scopeId3}> Go back to dashboard </button></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle" }, [
                            createVNode("div", null, [
                              createVNode("div", { class: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100" }, [
                                createVNode(_component_UnoIcon, { class: "i-ic-round-check h-6 w-6 text-lg text-green-600" })
                              ]),
                              createVNode("div", { class: "mt-3 text-center sm:mt-5" }, [
                                createVNode(unref(Ue), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Payment successful ")
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("p", { class: "text-sm text-gray-500" }, " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore. ")
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "mt-5 sm:mt-6" }, [
                              createVNode("button", {
                                type: "button",
                                class: "inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm",
                                onClick: ($event) => open.value = false
                              }, " Go back to dashboard ", 8, ["onClick"])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0" }, [
                      createVNode(unref(oe), {
                        as: "template",
                        enter: "ease-out duration-300",
                        "enter-from": "opacity-0",
                        "enter-to": "opacity-100",
                        leave: "ease-in duration-200",
                        "leave-from": "opacity-100",
                        "leave-to": "opacity-0"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Ve), { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })
                        ]),
                        _: 1
                      }),
                      createVNode("span", {
                        class: "hidden sm:inline-block sm:h-screen sm:align-middle",
                        "aria-hidden": "true"
                      }, "\u200B"),
                      createVNode(unref(oe), {
                        as: "template",
                        enter: "ease-out duration-300",
                        "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                        "enter-to": "opacity-100 translate-y-0 sm:scale-100",
                        leave: "ease-in duration-200",
                        "leave-from": "opacity-100 translate-y-0 sm:scale-100",
                        "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle" }, [
                            createVNode("div", null, [
                              createVNode("div", { class: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100" }, [
                                createVNode(_component_UnoIcon, { class: "i-ic-round-check h-6 w-6 text-lg text-green-600" })
                              ]),
                              createVNode("div", { class: "mt-3 text-center sm:mt-5" }, [
                                createVNode(unref(Ue), {
                                  as: "h3",
                                  class: "text-lg font-medium leading-6 text-gray-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Payment successful ")
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("p", { class: "text-sm text-gray-500" }, " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore. ")
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "mt-5 sm:mt-6" }, [
                              createVNode("button", {
                                type: "button",
                                class: "inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm",
                                onClick: ($event) => open.value = false
                              }, " Go back to dashboard ", 8, ["onClick"])
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Ne), {
                as: "div",
                class: "fixed inset-0 z-10 overflow-y-auto",
                onClose: ($event) => open.value = false
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0" }, [
                    createVNode(unref(oe), {
                      as: "template",
                      enter: "ease-out duration-300",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "ease-in duration-200",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Ve), { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" })
                      ]),
                      _: 1
                    }),
                    createVNode("span", {
                      class: "hidden sm:inline-block sm:h-screen sm:align-middle",
                      "aria-hidden": "true"
                    }, "\u200B"),
                    createVNode(unref(oe), {
                      as: "template",
                      enter: "ease-out duration-300",
                      "enter-from": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
                      "enter-to": "opacity-100 translate-y-0 sm:scale-100",
                      leave: "ease-in duration-200",
                      "leave-from": "opacity-100 translate-y-0 sm:scale-100",
                      "leave-to": "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100" }, [
                              createVNode(_component_UnoIcon, { class: "i-ic-round-check h-6 w-6 text-lg text-green-600" })
                            ]),
                            createVNode("div", { class: "mt-3 text-center sm:mt-5" }, [
                              createVNode(unref(Ue), {
                                as: "h3",
                                class: "text-lg font-medium leading-6 text-gray-900"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Payment successful ")
                                ]),
                                _: 1
                              }),
                              createVNode("div", { class: "mt-2" }, [
                                createVNode("p", { class: "text-sm text-gray-500" }, " Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore. ")
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "mt-5 sm:mt-6" }, [
                            createVNode("button", {
                              type: "button",
                              class: "inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm",
                              onClick: ($event) => open.value = false
                            }, " Go back to dashboard ", 8, ["onClick"])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=modal.f0e32250.mjs.map
