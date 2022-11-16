import { defineComponent, h, ref, computed, onMounted, onUnmounted, watchEffect, watch, provide, inject } from 'vue';
import { R, f as f$2, O as O$1, t, a as u, o, c, l as l$1, P, p, w as w$1 } from '../server.mjs';

function s() {
  let a = [], i = [], t2 = { enqueue(e) {
    i.push(e);
  }, addEventListener(e, n, o2, r) {
    return e.addEventListener(n, o2, r), t2.add(() => e.removeEventListener(n, o2, r));
  }, requestAnimationFrame(...e) {
    let n = requestAnimationFrame(...e);
    t2.add(() => cancelAnimationFrame(n));
  }, nextFrame(...e) {
    t2.requestAnimationFrame(() => {
      t2.requestAnimationFrame(...e);
    });
  }, setTimeout(...e) {
    let n = setTimeout(...e);
    t2.add(() => clearTimeout(n));
  }, add(e) {
    a.push(e);
  }, dispose() {
    for (let e of a.splice(0))
      e();
  }, async workQueue() {
    for (let e of i.splice(0))
      await e();
  } };
  return t2;
}
function l(r) {
  let e = { called: false };
  return (...t2) => {
    if (!e.called)
      return e.called = true, r(...t2);
  };
}
function m(e, ...t2) {
  e && t2.length > 0 && e.classList.add(...t2);
}
function d$1(e, ...t2) {
  e && t2.length > 0 && e.classList.remove(...t2);
}
var g = ((i) => (i.Finished = "finished", i.Cancelled = "cancelled", i))(g || {});
function F$1(e, t2) {
  let i = s();
  if (!e)
    return i.dispose;
  let { transitionDuration: n, transitionDelay: a } = getComputedStyle(e), [l2, s$1] = [n, a].map((o2) => {
    let [u2 = 0] = o2.split(",").filter(Boolean).map((r) => r.includes("ms") ? parseFloat(r) : parseFloat(r) * 1e3).sort((r, c2) => c2 - r);
    return u2;
  });
  return l2 !== 0 ? i.setTimeout(() => t2("finished"), l2 + s$1) : t2("finished"), i.add(() => t2("cancelled")), i.dispose;
}
function L(e, t2, i, n, a, l$12) {
  let s$1 = s(), o2 = l$12 !== void 0 ? l(l$12) : () => {
  };
  return d$1(e, ...a), m(e, ...t2, ...i), s$1.nextFrame(() => {
    d$1(e, ...i), m(e, ...n), s$1.add(F$1(e, (u2) => (d$1(e, ...n, ...t2), m(e, ...a), o2(u2))));
  }), s$1.add(() => d$1(e, ...t2, ...i, ...n, ...a)), s$1.add(() => o2("cancelled")), s$1.dispose;
}
function d(e = "") {
  return e.split(" ").filter((t2) => t2.trim().length > 1);
}
let B = Symbol("TransitionContext");
var ae = ((a) => (a.Visible = "visible", a.Hidden = "hidden", a))(ae || {});
function le() {
  return inject(B, null) !== null;
}
function ie() {
  let e = inject(B, null);
  if (e === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
function se() {
  let e = inject(F, null);
  if (e === null)
    throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
let F = Symbol("NestingContext");
function w(e) {
  return "children" in e ? w(e.children) : e.value.filter(({ state: t2 }) => t2 === "visible").length > 0;
}
function K(e) {
  let t2 = ref([]), a = ref(false);
  onMounted(() => a.value = true), onUnmounted(() => a.value = false);
  function s2(r, n = O$1.Hidden) {
    let l2 = t2.value.findIndex(({ id: i }) => i === r);
    l2 !== -1 && (u(n, { [O$1.Unmount]() {
      t2.value.splice(l2, 1);
    }, [O$1.Hidden]() {
      t2.value[l2].state = "hidden";
    } }), !w(t2) && a.value && (e == null || e()));
  }
  function v(r) {
    let n = t2.value.find(({ id: l2 }) => l2 === r);
    return n ? n.state !== "visible" && (n.state = "visible") : t2.value.push({ id: r, state: "visible" }), () => s2(r, O$1.Unmount);
  }
  return { children: t2, register: v, unregister: s2 };
}
let _ = R.RenderStrategy, oe = defineComponent({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e, { emit: t$1, attrs: a, slots: s2, expose: v }) {
  if (!le() && f$2())
    return () => h(fe, { ...e, onBeforeEnter: () => t$1("beforeEnter"), onAfterEnter: () => t$1("afterEnter"), onBeforeLeave: () => t$1("beforeLeave"), onAfterLeave: () => t$1("afterLeave") }, s2);
  let r = ref(null), n = ref("visible"), l2 = computed(() => e.unmount ? O$1.Unmount : O$1.Hidden);
  v({ el: r, $el: r });
  let { show: i, appear: x } = ie(), { register: g$1, unregister: p2 } = se(), R2 = { value: true }, m2 = t(), S = { value: false }, N = K(() => {
    S.value || (n.value = "hidden", p2(m2), t$1("afterLeave"));
  });
  onMounted(() => {
    let o2 = g$1(m2);
    onUnmounted(o2);
  }), watchEffect(() => {
    if (l2.value === O$1.Hidden && !!m2) {
      if (i && n.value !== "visible") {
        n.value = "visible";
        return;
      }
      u(n.value, { ["hidden"]: () => p2(m2), ["visible"]: () => g$1(m2) });
    }
  });
  let k = d(e.enter), $ = d(e.enterFrom), q = d(e.enterTo), O$1$1 = d(e.entered), z = d(e.leave), G = d(e.leaveFrom), J = d(e.leaveTo);
  onMounted(() => {
    watchEffect(() => {
      if (n.value === "visible") {
        let o$1 = o(r);
        if (o$1 instanceof Comment && o$1.data === "")
          throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function Q(o$1) {
    let c2 = R2.value && !x.value, u2 = o(r);
    !u2 || !(u2 instanceof HTMLElement) || c2 || (S.value = true, i.value && t$1("beforeEnter"), i.value || t$1("beforeLeave"), o$1(i.value ? L(u2, k, $, q, O$1$1, (C) => {
      S.value = false, C === g.Finished && t$1("afterEnter");
    }) : L(u2, z, G, J, O$1$1, (C) => {
      S.value = false, C === g.Finished && (w(N) || (n.value = "hidden", p2(m2), t$1("afterLeave")));
    })));
  }
  return onMounted(() => {
    watch([i], (o2, c2, u2) => {
      Q(u2), R2.value = false;
    }, { immediate: true });
  }), provide(F, N), c(computed(() => u(n.value, { ["visible"]: l$1.Open, ["hidden"]: l$1.Closed }))), () => {
    let { appear: o2, show: c2, enter: u2, enterFrom: C, enterTo: de, entered: ve, leave: pe, leaveFrom: me, leaveTo: Te, ...W } = e;
    return P({ theirProps: W, ourProps: { ref: r }, slot: {}, slots: s2, attrs: a, features: _, visible: n.value === "visible", name: "TransitionChild" });
  };
} }), ue = oe, fe = defineComponent({ inheritAttrs: false, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: true }, appear: { type: [Boolean], default: false }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => true, afterEnter: () => true, beforeLeave: () => true, afterLeave: () => true }, setup(e, { emit: t2, attrs: a, slots: s2 }) {
  let v = p(), r = computed(() => e.show === null && v !== null ? u(v.value, { [l$1.Open]: true, [l$1.Closed]: false }) : e.show);
  watchEffect(() => {
    if (![true, false].includes(r.value))
      throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let n = ref(r.value ? "visible" : "hidden"), l2 = K(() => {
    n.value = "hidden";
  }), i = ref(true), x = { show: r, appear: computed(() => e.appear || !i.value) };
  return onMounted(() => {
    watchEffect(() => {
      i.value = false, r.value ? n.value = "visible" : w(l2) || (n.value = "hidden");
    });
  }), provide(F, l2), provide(B, x), () => {
    let g2 = w$1(e, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), p2 = { unmount: e.unmount };
    return P({ ourProps: { ...p2, as: "template" }, theirProps: {}, slot: {}, slots: { ...s2, default: () => [h(ue, { onBeforeEnter: () => t2("beforeEnter"), onAfterEnter: () => t2("afterEnter"), onBeforeLeave: () => t2("beforeLeave"), onAfterLeave: () => t2("afterLeave"), ...a, ...p2, ...g2 }, s2.default)] }, attrs: {}, features: _, visible: n.value === "visible", name: "Transition" });
  };
} });

export { fe as f, oe as o };
//# sourceMappingURL=transition.acbe188a.mjs.map
