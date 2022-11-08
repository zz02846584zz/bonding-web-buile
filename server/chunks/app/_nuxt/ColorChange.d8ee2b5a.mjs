import { u, y, h, F, o, c, l, V as V$1, P as P$1, w as w$1, t, p, R, O, a as o$1, _ as __nuxt_component_0 } from './use-outside-click.01e1b2e0.mjs';
import { u as useI18n, d as useState, a as useRoute, b as useRouter, c as useSwitchLocalePath$1, _ as __nuxt_component_0$1 } from '../server.mjs';
import { defineComponent, ref, computed, toRaw, provide, h as h$1, Fragment, onMounted, onUnmounted, watch, watchEffect, nextTick, unref, isRef, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, renderList, useSSRContext, inject } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { x, a, b } from './use-resolve-button-type.7f42ff8d.mjs';
import { f as f$1, a as a$1 } from './hidden.90d807c6.mjs';

function useSwitchLocalePath({
  i18n = useI18n()
} = {}) {
  const route = useRoute();
  const router = useRouter();
  return useSwitchLocalePath$1({
    router,
    route,
    i18n
  });
}
function e(n = {}, r = null, t2 = []) {
  for (let [i, o2] of Object.entries(n))
    f(t2, s(r, i), o2);
  return t2;
}
function s(n, r) {
  return n ? n + "[" + r + "]" : r;
}
function f(n, r, t2) {
  if (Array.isArray(t2))
    for (let [i, o2] of t2.entries())
      f(n, s(r, i.toString()), o2);
  else
    t2 instanceof Date ? n.push([r, t2.toISOString()]) : typeof t2 == "boolean" ? n.push([r, t2 ? "1" : "0"]) : typeof t2 == "string" ? n.push([r, t2]) : typeof t2 == "number" ? n.push([r, `${t2}`]) : t2 == null ? n.push([r, ""]) : e(t2, r, n);
}
function d(u2, e2, r) {
  let i = ref(r == null ? void 0 : r.value), f2 = computed(() => u2.value !== void 0);
  return [computed(() => f2.value ? u2.value : i.value), function(t2) {
    return f2.value || (i.value = t2), e2 == null ? void 0 : e2(t2);
  }];
}
function ue(o2, m) {
  return o2 === m;
}
var re = ((l2) => (l2[l2.Open = 0] = "Open", l2[l2.Closed = 1] = "Closed", l2))(re || {}), se = ((l2) => (l2[l2.Single = 0] = "Single", l2[l2.Multi = 1] = "Multi", l2))(se || {}), de = ((l2) => (l2[l2.Pointer = 0] = "Pointer", l2[l2.Other = 1] = "Other", l2))(de || {});
function fe(o2) {
  requestAnimationFrame(() => requestAnimationFrame(o2));
}
let H = Symbol("ListboxContext");
function V(o2) {
  let m = inject(H, null);
  if (m === null) {
    let l2 = new Error(`<${o2} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(l2, V), l2;
  }
  return m;
}
let Me = defineComponent({ name: "Listbox", emits: { "update:modelValue": (o2) => true }, props: { as: { type: [Object, String], default: "template" }, disabled: { type: [Boolean], default: false }, by: { type: [String, Function], default: () => ue }, horizontal: { type: [Boolean], default: false }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, name: { type: String, optional: true }, multiple: { type: [Boolean], default: false } }, inheritAttrs: false, setup(o$12, { slots: m, attrs: l$1, emit: L }) {
  let e$1 = ref(1), p2 = ref(null), s2 = ref(null), O$1 = ref(null), d$1 = ref([]), S = ref(""), t2 = ref(null), i = ref(1);
  function k(a2 = (n) => n) {
    let n = t2.value !== null ? d$1.value[t2.value] : null, u2 = O(a2(d$1.value.slice()), (y2) => o(y2.dataRef.domRef)), c2 = n ? u2.indexOf(n) : null;
    return c2 === -1 && (c2 = null), { options: u2, activeOptionIndex: c2 };
  }
  let h$2 = computed(() => o$12.multiple ? 1 : 0), [w$1$1, r] = d(computed(() => o$12.modelValue), (a2) => L("update:modelValue", a2), computed(() => o$12.defaultValue)), f2 = { listboxState: e$1, value: w$1$1, mode: h$2, compare(a2, n) {
    if (typeof o$12.by == "string") {
      let u2 = o$12.by;
      return (a2 == null ? void 0 : a2[u2]) === (n == null ? void 0 : n[u2]);
    }
    return o$12.by(a2, n);
  }, orientation: computed(() => o$12.horizontal ? "horizontal" : "vertical"), labelRef: p2, buttonRef: s2, optionsRef: O$1, disabled: computed(() => o$12.disabled), options: d$1, searchQuery: S, activeOptionIndex: t2, activationTrigger: i, closeListbox() {
    o$12.disabled || e$1.value !== 1 && (e$1.value = 1, t2.value = null);
  }, openListbox() {
    o$12.disabled || e$1.value !== 0 && (e$1.value = 0);
  }, goToOption(a$12, n, u2) {
    if (o$12.disabled || e$1.value === 1)
      return;
    let c2 = k(), y2 = x(a$12 === a.Specific ? { focus: a.Specific, id: n } : { focus: a$12 }, { resolveItems: () => c2.options, resolveActiveIndex: () => c2.activeOptionIndex, resolveId: (T) => T.id, resolveDisabled: (T) => T.dataRef.disabled });
    S.value = "", t2.value = y2, i.value = u2 != null ? u2 : 1, d$1.value = c2.options;
  }, search(a2) {
    if (o$12.disabled || e$1.value === 1)
      return;
    let u2 = S.value !== "" ? 0 : 1;
    S.value += a2.toLowerCase();
    let y2 = (t2.value !== null ? d$1.value.slice(t2.value + u2).concat(d$1.value.slice(0, t2.value + u2)) : d$1.value).find((A) => A.dataRef.textValue.startsWith(S.value) && !A.dataRef.disabled), T = y2 ? d$1.value.indexOf(y2) : -1;
    T === -1 || T === t2.value || (t2.value = T, i.value = 1);
  }, clearSearch() {
    o$12.disabled || e$1.value !== 1 && S.value !== "" && (S.value = "");
  }, registerOption(a2, n) {
    let u2 = k((c2) => [...c2, { id: a2, dataRef: n }]);
    d$1.value = u2.options, t2.value = u2.activeOptionIndex;
  }, unregisterOption(a2) {
    let n = k((u2) => {
      let c2 = u2.findIndex((y2) => y2.id === a2);
      return c2 !== -1 && u2.splice(c2, 1), u2;
    });
    d$1.value = n.options, t2.value = n.activeOptionIndex, i.value = 1;
  }, select(a2) {
    o$12.disabled || r(u(h$2.value, { [0]: () => a2, [1]: () => {
      let n = toRaw(f2.value.value).slice(), u2 = toRaw(a2), c2 = n.findIndex((y2) => f2.compare(u2, toRaw(y2)));
      return c2 === -1 ? n.push(u2) : n.splice(c2, 1), n;
    } }));
  } };
  return y([s2, O$1], (a2, n) => {
    var u2;
    f2.closeListbox(), h(n, F.Loose) || (a2.preventDefault(), (u2 = o(s2)) == null || u2.focus());
  }, computed(() => e$1.value === 0)), provide(H, f2), c(computed(() => u(e$1.value, { [0]: l.Open, [1]: l.Closed }))), () => {
    let { name: a2, modelValue: n, disabled: u2, ...c2 } = o$12, y2 = { open: e$1.value === 0, disabled: u2, value: w$1$1.value };
    return h$1(Fragment, [...a2 != null && w$1$1.value != null ? e({ [a2]: w$1$1.value }).map(([T, A]) => h$1(f$1, V$1({ features: a$1.Hidden, key: T, as: "input", type: "hidden", hidden: true, readOnly: true, name: T, value: A }))) : [], P$1({ ourProps: {}, theirProps: { ...l$1, ...w$1(c2, ["defaultValue", "onUpdate:modelValue", "horizontal", "multiple", "by"]) }, slot: y2, slots: m, attrs: l$1, name: "Listbox" })]);
  };
} }), Pe = defineComponent({ name: "ListboxLabel", props: { as: { type: [Object, String], default: "label" } }, setup(o$12, { attrs: m, slots: l2 }) {
  let L = V("ListboxLabel"), e2 = `headlessui-listbox-label-${t()}`;
  function p2() {
    var s2;
    (s2 = o(L.buttonRef)) == null || s2.focus({ preventScroll: true });
  }
  return () => {
    let s2 = { open: L.listboxState.value === 0, disabled: L.disabled.value }, O2 = { id: e2, ref: L.labelRef, onClick: p2 };
    return P$1({ ourProps: O2, theirProps: o$12, slot: s2, attrs: m, slots: l2, name: "ListboxLabel" });
  };
} }), Ie = defineComponent({ name: "ListboxButton", props: { as: { type: [Object, String], default: "button" } }, setup(o$2, { attrs: m, slots: l2, expose: L }) {
  let e2 = V("ListboxButton"), p2 = `headlessui-listbox-button-${t()}`;
  L({ el: e2.buttonRef, $el: e2.buttonRef });
  function s2(t2) {
    switch (t2.key) {
      case o$1.Space:
      case o$1.Enter:
      case o$1.ArrowDown:
        t2.preventDefault(), e2.openListbox(), nextTick(() => {
          var i;
          (i = o(e2.optionsRef)) == null || i.focus({ preventScroll: true }), e2.value.value || e2.goToOption(a.First);
        });
        break;
      case o$1.ArrowUp:
        t2.preventDefault(), e2.openListbox(), nextTick(() => {
          var i;
          (i = o(e2.optionsRef)) == null || i.focus({ preventScroll: true }), e2.value.value || e2.goToOption(a.Last);
        });
        break;
    }
  }
  function O2(t2) {
    switch (t2.key) {
      case o$1.Space:
        t2.preventDefault();
        break;
    }
  }
  function d2(t2) {
    e2.disabled.value || (e2.listboxState.value === 0 ? (e2.closeListbox(), nextTick(() => {
      var i;
      return (i = o(e2.buttonRef)) == null ? void 0 : i.focus({ preventScroll: true });
    })) : (t2.preventDefault(), e2.openListbox(), fe(() => {
      var i;
      return (i = o(e2.optionsRef)) == null ? void 0 : i.focus({ preventScroll: true });
    })));
  }
  let S = b(computed(() => ({ as: o$2.as, type: m.type })), e2.buttonRef);
  return () => {
    var k, h2;
    let t2 = { open: e2.listboxState.value === 0, disabled: e2.disabled.value, value: e2.value.value }, i = { ref: e2.buttonRef, id: p2, type: S.value, "aria-haspopup": true, "aria-controls": (k = o(e2.optionsRef)) == null ? void 0 : k.id, "aria-expanded": e2.disabled.value ? void 0 : e2.listboxState.value === 0, "aria-labelledby": e2.labelRef.value ? [(h2 = o(e2.labelRef)) == null ? void 0 : h2.id, p2].join(" ") : void 0, disabled: e2.disabled.value === true ? true : void 0, onKeydown: s2, onKeyup: O2, onClick: d2 };
    return P$1({ ourProps: i, theirProps: o$2, slot: t2, attrs: m, slots: l2, name: "ListboxButton" });
  };
} }), Ve = defineComponent({ name: "ListboxOptions", props: { as: { type: [Object, String], default: "ul" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(o$2, { attrs: m, slots: l$1, expose: L }) {
  let e2 = V("ListboxOptions"), p$1 = `headlessui-listbox-options-${t()}`, s2 = ref(null);
  L({ el: e2.optionsRef, $el: e2.optionsRef });
  function O2(t2) {
    switch (s2.value && clearTimeout(s2.value), t2.key) {
      case o$1.Space:
        if (e2.searchQuery.value !== "")
          return t2.preventDefault(), t2.stopPropagation(), e2.search(t2.key);
      case o$1.Enter:
        if (t2.preventDefault(), t2.stopPropagation(), e2.activeOptionIndex.value !== null) {
          let i = e2.options.value[e2.activeOptionIndex.value];
          e2.select(i.dataRef.value);
        }
        e2.mode.value === 0 && (e2.closeListbox(), nextTick(() => {
          var i;
          return (i = o(e2.buttonRef)) == null ? void 0 : i.focus({ preventScroll: true });
        }));
        break;
      case u(e2.orientation.value, { vertical: o$1.ArrowDown, horizontal: o$1.ArrowRight }):
        return t2.preventDefault(), t2.stopPropagation(), e2.goToOption(a.Next);
      case u(e2.orientation.value, { vertical: o$1.ArrowUp, horizontal: o$1.ArrowLeft }):
        return t2.preventDefault(), t2.stopPropagation(), e2.goToOption(a.Previous);
      case o$1.Home:
      case o$1.PageUp:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToOption(a.First);
      case o$1.End:
      case o$1.PageDown:
        return t2.preventDefault(), t2.stopPropagation(), e2.goToOption(a.Last);
      case o$1.Escape:
        t2.preventDefault(), t2.stopPropagation(), e2.closeListbox(), nextTick(() => {
          var i;
          return (i = o(e2.buttonRef)) == null ? void 0 : i.focus({ preventScroll: true });
        });
        break;
      case o$1.Tab:
        t2.preventDefault(), t2.stopPropagation();
        break;
      default:
        t2.key.length === 1 && (e2.search(t2.key), s2.value = setTimeout(() => e2.clearSearch(), 350));
        break;
    }
  }
  let d2 = p(), S = computed(() => d2 !== null ? d2.value === l.Open : e2.listboxState.value === 0);
  return () => {
    var h2, w2, r, f2;
    let t2 = { open: e2.listboxState.value === 0 }, i = { "aria-activedescendant": e2.activeOptionIndex.value === null || (h2 = e2.options.value[e2.activeOptionIndex.value]) == null ? void 0 : h2.id, "aria-multiselectable": e2.mode.value === 1 ? true : void 0, "aria-labelledby": (f2 = (w2 = o(e2.labelRef)) == null ? void 0 : w2.id) != null ? f2 : (r = o(e2.buttonRef)) == null ? void 0 : r.id, "aria-orientation": e2.orientation.value, id: p$1, onKeydown: O2, role: "listbox", tabIndex: 0, ref: e2.optionsRef };
    return P$1({ ourProps: i, theirProps: o$2, slot: t2, attrs: m, slots: l$1, features: R.RenderStrategy | R.Static, visible: S.value, name: "ListboxOptions" });
  };
} }), Ae = defineComponent({ name: "ListboxOption", props: { as: { type: [Object, String], default: "li" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: false } }, setup(o$12, { slots: m, attrs: l2, expose: L }) {
  let e2 = V("ListboxOption"), p2 = `headlessui-listbox-option-${t()}`, s2 = ref(null);
  L({ el: s2, $el: s2 });
  let O2 = computed(() => e2.activeOptionIndex.value !== null ? e2.options.value[e2.activeOptionIndex.value].id === p2 : false), d2 = computed(() => u(e2.mode.value, { [0]: () => e2.compare(toRaw(e2.value.value), toRaw(o$12.value)), [1]: () => toRaw(e2.value.value).some((r) => e2.compare(toRaw(r), toRaw(o$12.value))) })), S = computed(() => u(e2.mode.value, { [1]: () => {
    var f2;
    let r = toRaw(e2.value.value);
    return ((f2 = e2.options.value.find((a2) => r.some((n) => e2.compare(toRaw(n), toRaw(a2.dataRef.value))))) == null ? void 0 : f2.id) === p2;
  }, [0]: () => d2.value })), t$1 = computed(() => ({ disabled: o$12.disabled, value: o$12.value, textValue: "", domRef: s2 }));
  onMounted(() => {
    var f2, a2;
    let r = (a2 = (f2 = o(s2)) == null ? void 0 : f2.textContent) == null ? void 0 : a2.toLowerCase().trim();
    r !== void 0 && (t$1.value.textValue = r);
  }), onMounted(() => e2.registerOption(p2, t$1)), onUnmounted(() => e2.unregisterOption(p2)), onMounted(() => {
    watch([e2.listboxState, d2], () => {
      e2.listboxState.value === 0 && (!d2.value || u(e2.mode.value, { [1]: () => {
        S.value && e2.goToOption(a.Specific, p2);
      }, [0]: () => {
        e2.goToOption(a.Specific, p2);
      } }));
    }, { immediate: true });
  }), watchEffect(() => {
    e2.listboxState.value === 0 && (!O2.value || e2.activationTrigger.value !== 0 && nextTick(() => {
      var r, f2;
      return (f2 = (r = o(s2)) == null ? void 0 : r.scrollIntoView) == null ? void 0 : f2.call(r, { block: "nearest" });
    }));
  });
  function i(r) {
    if (o$12.disabled)
      return r.preventDefault();
    e2.select(o$12.value), e2.mode.value === 0 && (e2.closeListbox(), nextTick(() => {
      var f2;
      return (f2 = o(e2.buttonRef)) == null ? void 0 : f2.focus({ preventScroll: true });
    }));
  }
  function k() {
    if (o$12.disabled)
      return e2.goToOption(a.Nothing);
    e2.goToOption(a.Specific, p2);
  }
  function h2() {
    o$12.disabled || O2.value || e2.goToOption(a.Specific, p2, 0);
  }
  function w$1$1() {
    o$12.disabled || !O2.value || e2.goToOption(a.Nothing);
  }
  return () => {
    let { disabled: r } = o$12, f2 = { active: O2.value, selected: d2.value, disabled: r }, a2 = { id: p2, ref: s2, role: "option", tabIndex: r === true ? void 0 : -1, "aria-disabled": r === true ? true : void 0, "aria-selected": d2.value, disabled: void 0, onClick: i, onFocus: k, onPointermove: h2, onMousemove: h2, onPointerleave: w$1$1, onMouseleave: w$1$1 };
    return P$1({ ourProps: a2, theirProps: w$1(o$12, ["value", "disabled"]), slot: f2, attrs: l2, slots: m, name: "ListboxOption" });
  };
} });
const availableLocales = {
  en: {
    name: "English",
    iso: "en",
    flag: "i-twemoji-flag-us-outlying-islands"
  },
  tr: {
    name: "Turkce",
    iso: "tr",
    flag: "i-twemoji-flag-turkey"
  }
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LanguageChange",
  __ssrInlineRender: true,
  setup(__props) {
    const switchLocalePath = useSwitchLocalePath();
    const { locale } = useI18n();
    const local = computed(() => {
      return locale.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(Me), {
        modelValue: unref(local),
        "onUpdate:modelValue": ($event) => isRef(local) ? local.value = $event : null,
        as: "div",
        class: "relative flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Pe), { class: "sr-only" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Change Language `);
                } else {
                  return [
                    createTextVNode(" Change Language ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Ie), {
              type: "button",
              title: "Change Language"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ph-translate-bold text-lg dark:text-white" }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700" }, [
                      createVNode(_component_UnoIcon, { class: "i-ph-translate-bold text-lg dark:text-white" })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Ve), { class: "absolute top-full right-0 z-[999] mt-2 w-40 overflow-hidden rounded-lg bg-white text-sm font-semibold text-gray-700 shadow-lg shadow-gray-300 outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500 dark:ring-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(availableLocales), (lang) => {
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      key: lang.iso,
                      to: unref(switchLocalePath)(lang.iso),
                      class: ["flex w-full cursor-pointer items-center justify-between py-2 px-3", {
                        "text-white-500 bg-gray-200 dark:bg-gray-500/50": unref(local) === lang.iso,
                        "hover:bg-gray-200 dark:hover:bg-gray-700/30": unref(local) !== lang.iso
                      }]
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="truncate"${_scopeId3}>${ssrInterpolate(lang.name)}</span><span class="flex items-center justify-center text-sm"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_UnoIcon, {
                            class: [lang.flag, "text-base"]
                          }, null, _parent4, _scopeId3));
                          _push4(`</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "truncate" }, toDisplayString(lang.name), 1),
                            createVNode("span", { class: "flex items-center justify-center text-sm" }, [
                              createVNode(_component_UnoIcon, {
                                class: [lang.flag, "text-base"]
                              }, null, 8, ["class"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(availableLocales), (lang) => {
                      return openBlock(), createBlock(_component_NuxtLink, {
                        key: lang.iso,
                        to: unref(switchLocalePath)(lang.iso),
                        class: ["flex w-full cursor-pointer items-center justify-between py-2 px-3", {
                          "text-white-500 bg-gray-200 dark:bg-gray-500/50": unref(local) === lang.iso,
                          "hover:bg-gray-200 dark:hover:bg-gray-700/30": unref(local) !== lang.iso
                        }]
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "truncate" }, toDisplayString(lang.name), 1),
                          createVNode("span", { class: "flex items-center justify-center text-sm" }, [
                            createVNode(_component_UnoIcon, {
                              class: [lang.flag, "text-base"]
                            }, null, 8, ["class"])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["to", "class"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Pe), { class: "sr-only" }, {
                default: withCtx(() => [
                  createTextVNode(" Change Language ")
                ]),
                _: 1
              }),
              createVNode(unref(Ie), {
                type: "button",
                title: "Change Language"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700" }, [
                    createVNode(_component_UnoIcon, { class: "i-ph-translate-bold text-lg dark:text-white" })
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(Ve), { class: "absolute top-full right-0 z-[999] mt-2 w-40 overflow-hidden rounded-lg bg-white text-sm font-semibold text-gray-700 shadow-lg shadow-gray-300 outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500 dark:ring-0" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(availableLocales), (lang) => {
                    return openBlock(), createBlock(_component_NuxtLink, {
                      key: lang.iso,
                      to: unref(switchLocalePath)(lang.iso),
                      class: ["flex w-full cursor-pointer items-center justify-between py-2 px-3", {
                        "text-white-500 bg-gray-200 dark:bg-gray-500/50": unref(local) === lang.iso,
                        "hover:bg-gray-200 dark:hover:bg-gray-700/30": unref(local) !== lang.iso
                      }]
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "truncate" }, toDisplayString(lang.name), 1),
                        createVNode("span", { class: "flex items-center justify-center text-sm" }, [
                          createVNode(_component_UnoIcon, {
                            class: [lang.flag, "text-base"]
                          }, null, 8, ["class"])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["to", "class"]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tem/LanguageChange.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ColorChange",
  __ssrInlineRender: true,
  setup(__props) {
    const colorMode = useColorMode();
    const availableColor = ref([
      {
        id: 1,
        name: "system",
        icon: "i-ph-laptop-duotone"
      },
      {
        id: 2,
        name: "dark",
        icon: "i-ph-moon-stars-duotone"
      },
      {
        id: 3,
        name: "light",
        icon: "i-ph-sun-dim-duotone"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(Me), {
        modelValue: _ctx.$colorMode.preference,
        "onUpdate:modelValue": ($event) => _ctx.$colorMode.preference = $event,
        as: "div",
        class: "relative flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Pe), { class: "sr-only" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Theme `);
                } else {
                  return [
                    createTextVNode(" Theme ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Ie), {
              type: "button",
              title: "Change Color"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ph-palette-duotone text-lg dark:text-white" }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700" }, [
                      createVNode(_component_UnoIcon, { class: "i-ph-palette-duotone text-lg dark:text-white" })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Ve), { class: "absolute top-full right-0 z-[999] mt-2 w-40 overflow-hidden rounded-lg bg-white text-sm font-semibold text-gray-700 shadow-lg shadow-gray-300 outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500 dark:ring-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(availableColor.value, (color) => {
                    _push3(ssrRenderComponent(unref(Ae), {
                      key: color.id,
                      value: color.name,
                      class: ["flex w-full cursor-pointer items-center justify-between py-2 px-3", {
                        "text-white-500 bg-gray-200 dark:bg-gray-500/50": unref(colorMode).preference === color.name,
                        "hover:bg-gray-200 dark:hover:bg-gray-700/30": unref(colorMode).preference !== color.name
                      }]
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="truncate"${_scopeId3}>${ssrInterpolate(color.name)}</span><span class="flex items-center justify-center text-sm"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_UnoIcon, {
                            class: [color.icon, "text-base"]
                          }, null, _parent4, _scopeId3));
                          _push4(`</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "truncate" }, toDisplayString(color.name), 1),
                            createVNode("span", { class: "flex items-center justify-center text-sm" }, [
                              createVNode(_component_UnoIcon, {
                                class: [color.icon, "text-base"]
                              }, null, 8, ["class"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(availableColor.value, (color) => {
                      return openBlock(), createBlock(unref(Ae), {
                        key: color.id,
                        value: color.name,
                        class: ["flex w-full cursor-pointer items-center justify-between py-2 px-3", {
                          "text-white-500 bg-gray-200 dark:bg-gray-500/50": unref(colorMode).preference === color.name,
                          "hover:bg-gray-200 dark:hover:bg-gray-700/30": unref(colorMode).preference !== color.name
                        }]
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "truncate" }, toDisplayString(color.name), 1),
                          createVNode("span", { class: "flex items-center justify-center text-sm" }, [
                            createVNode(_component_UnoIcon, {
                              class: [color.icon, "text-base"]
                            }, null, 8, ["class"])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["value", "class"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Pe), { class: "sr-only" }, {
                default: withCtx(() => [
                  createTextVNode(" Theme ")
                ]),
                _: 1
              }),
              createVNode(unref(Ie), {
                type: "button",
                title: "Change Color"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700" }, [
                    createVNode(_component_UnoIcon, { class: "i-ph-palette-duotone text-lg dark:text-white" })
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(Ve), { class: "absolute top-full right-0 z-[999] mt-2 w-40 overflow-hidden rounded-lg bg-white text-sm font-semibold text-gray-700 shadow-lg shadow-gray-300 outline-none dark:bg-gray-800 dark:text-white dark:shadow-gray-500 dark:ring-0" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(availableColor.value, (color) => {
                    return openBlock(), createBlock(unref(Ae), {
                      key: color.id,
                      value: color.name,
                      class: ["flex w-full cursor-pointer items-center justify-between py-2 px-3", {
                        "text-white-500 bg-gray-200 dark:bg-gray-500/50": unref(colorMode).preference === color.name,
                        "hover:bg-gray-200 dark:hover:bg-gray-700/30": unref(colorMode).preference !== color.name
                      }]
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "truncate" }, toDisplayString(color.name), 1),
                        createVNode("span", { class: "flex items-center justify-center text-sm" }, [
                          createVNode(_component_UnoIcon, {
                            class: [color.icon, "text-base"]
                          }, null, 8, ["class"])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["value", "class"]);
                  }), 128))
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tem/ColorChange.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a, useColorMode as u };
//# sourceMappingURL=ColorChange.d8ee2b5a.mjs.map
