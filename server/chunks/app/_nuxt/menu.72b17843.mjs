import { _ as __nuxt_component_0 } from './UnoIcon.2c774f6e.mjs';
import { defineComponent, ref, computed, provide, onMounted, onUnmounted, watchEffect, nextTick, mergeProps, unref, withCtx, createTextVNode, createVNode, Transition, useSSRContext, inject } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { o, c, u, l, P, t, p as p$1, R } from './open-closed.5d362c74.mjs';
import { y, h, F, o as o$1, v as v$1, M, D as D$1, m as m$1, O } from './use-outside-click.f06562e3.mjs';
import { b, x, a } from './use-resolve-button-type.7efdb6ef.mjs';
import './_plugin-vue_export-helper.a1a6add7.mjs';

function p({ container: e, accept: t2, walk: d, enabled: o2 }) {
  watchEffect(() => {
    let r = e.value;
    if (!r || o2 !== void 0 && !o2.value)
      return;
    let l2 = m$1();
    if (!l2)
      return;
    let c2 = Object.assign((f) => t2(f), { acceptNode: t2 }), n = l2.createTreeWalker(r, NodeFilter.SHOW_ELEMENT, c2, false);
    for (; n.nextNode(); )
      d(n.currentNode);
  });
}
var G = ((l2) => (l2[l2.Open = 0] = "Open", l2[l2.Closed = 1] = "Closed", l2))(G || {}), X = ((l2) => (l2[l2.Pointer = 0] = "Pointer", l2[l2.Other = 1] = "Other", l2))(X || {});
function Y(o2) {
  requestAnimationFrame(() => requestAnimationFrame(o2));
}
let A = Symbol("MenuContext");
function D(o2) {
  let S = inject(A, null);
  if (S === null) {
    let l2 = new Error(`<${o2} /> is missing a parent <Menu /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(l2, D), l2;
  }
  return S;
}
let ve = defineComponent({ name: "Menu", props: { as: { type: [Object, String], default: "template" } }, setup(o$12, { slots: S, attrs: l$1 }) {
  let v2 = ref(1), e = ref(null), p2 = ref(null), u$1 = ref([]), m2 = ref(""), c$1 = ref(null), I = ref(1);
  function i(r = (a2) => a2) {
    let a2 = c$1.value !== null ? u$1.value[c$1.value] : null, n = O(r(u$1.value.slice()), (b2) => o(b2.dataRef.domRef)), s = a2 ? n.indexOf(a2) : null;
    return s === -1 && (s = null), { items: n, activeItemIndex: s };
  }
  let t2 = { menuState: v2, buttonRef: e, itemsRef: p2, items: u$1, searchQuery: m2, activeItemIndex: c$1, activationTrigger: I, closeMenu: () => {
    v2.value = 1, c$1.value = null;
  }, openMenu: () => v2.value = 0, goToItem(r, a$1, n) {
    let s = i(), b2 = x(r === a.Specific ? { focus: a.Specific, id: a$1 } : { focus: r }, { resolveItems: () => s.items, resolveActiveIndex: () => s.activeItemIndex, resolveId: (h2) => h2.id, resolveDisabled: (h2) => h2.dataRef.disabled });
    m2.value = "", c$1.value = b2, I.value = n != null ? n : 1, u$1.value = s.items;
  }, search(r) {
    let n = m2.value !== "" ? 0 : 1;
    m2.value += r.toLowerCase();
    let b2 = (c$1.value !== null ? u$1.value.slice(c$1.value + n).concat(u$1.value.slice(0, c$1.value + n)) : u$1.value).find((w) => w.dataRef.textValue.startsWith(m2.value) && !w.dataRef.disabled), h2 = b2 ? u$1.value.indexOf(b2) : -1;
    h2 === -1 || h2 === c$1.value || (c$1.value = h2, I.value = 1);
  }, clearSearch() {
    m2.value = "";
  }, registerItem(r, a2) {
    let n = i((s) => [...s, { id: r, dataRef: a2 }]);
    u$1.value = n.items, c$1.value = n.activeItemIndex, I.value = 1;
  }, unregisterItem(r) {
    let a2 = i((n) => {
      let s = n.findIndex((b2) => b2.id === r);
      return s !== -1 && n.splice(s, 1), n;
    });
    u$1.value = a2.items, c$1.value = a2.activeItemIndex, I.value = 1;
  } };
  return y([e, p2], (r, a2) => {
    var n;
    t2.closeMenu(), h(a2, F.Loose) || (r.preventDefault(), (n = o(e)) == null || n.focus());
  }, computed(() => v2.value === 0)), provide(A, t2), c(computed(() => u(v2.value, { [0]: l.Open, [1]: l.Closed }))), () => {
    let r = { open: v2.value === 0, close: t2.closeMenu };
    return P({ ourProps: {}, theirProps: o$12, slot: r, slots: S, attrs: l$1, name: "Menu" });
  };
} }), Ie = defineComponent({ name: "MenuButton", props: { disabled: { type: Boolean, default: false }, as: { type: [Object, String], default: "button" } }, setup(o$2, { attrs: S, slots: l2, expose: v2 }) {
  let e = D("MenuButton"), p2 = `headlessui-menu-button-${t()}`;
  v2({ el: e.buttonRef, $el: e.buttonRef });
  function u2(i) {
    switch (i.key) {
      case o$1.Space:
      case o$1.Enter:
      case o$1.ArrowDown:
        i.preventDefault(), i.stopPropagation(), e.openMenu(), nextTick(() => {
          var t2;
          (t2 = o(e.itemsRef)) == null || t2.focus({ preventScroll: true }), e.goToItem(a.First);
        });
        break;
      case o$1.ArrowUp:
        i.preventDefault(), i.stopPropagation(), e.openMenu(), nextTick(() => {
          var t2;
          (t2 = o(e.itemsRef)) == null || t2.focus({ preventScroll: true }), e.goToItem(a.Last);
        });
        break;
    }
  }
  function m2(i) {
    switch (i.key) {
      case o$1.Space:
        i.preventDefault();
        break;
    }
  }
  function c2(i) {
    o$2.disabled || (e.menuState.value === 0 ? (e.closeMenu(), nextTick(() => {
      var t2;
      return (t2 = o(e.buttonRef)) == null ? void 0 : t2.focus({ preventScroll: true });
    })) : (i.preventDefault(), e.openMenu(), Y(() => {
      var t2;
      return (t2 = o(e.itemsRef)) == null ? void 0 : t2.focus({ preventScroll: true });
    })));
  }
  let I = b(computed(() => ({ as: o$2.as, type: S.type })), e.buttonRef);
  return () => {
    var a2;
    let i = { open: e.menuState.value === 0 }, t2 = { ref: e.buttonRef, id: p2, type: I.value, "aria-haspopup": true, "aria-controls": (a2 = o(e.itemsRef)) == null ? void 0 : a2.id, "aria-expanded": o$2.disabled ? void 0 : e.menuState.value === 0, onKeydown: u2, onKeyup: m2, onClick: c2 };
    return P({ ourProps: t2, theirProps: o$2, slot: i, attrs: S, slots: l2, name: "MenuButton" });
  };
} }), ge = defineComponent({ name: "MenuItems", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true } }, setup(o$2, { attrs: S, slots: l$1, expose: v$1$1 }) {
  let e = D("MenuItems"), p$2 = `headlessui-menu-items-${t()}`, u2 = ref(null);
  v$1$1({ el: e.itemsRef, $el: e.itemsRef }), p({ container: computed(() => o(e.itemsRef)), enabled: computed(() => e.menuState.value === 0), accept(t2) {
    return t2.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : t2.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(t2) {
    t2.setAttribute("role", "none");
  } });
  function m2(t2) {
    var r;
    switch (u2.value && clearTimeout(u2.value), t2.key) {
      case o$1.Space:
        if (e.searchQuery.value !== "")
          return t2.preventDefault(), t2.stopPropagation(), e.search(t2.key);
      case o$1.Enter:
        if (t2.preventDefault(), t2.stopPropagation(), e.activeItemIndex.value !== null) {
          let n = e.items.value[e.activeItemIndex.value];
          (r = o(n.dataRef.domRef)) == null || r.click();
        }
        e.closeMenu(), D$1(o(e.buttonRef));
        break;
      case o$1.ArrowDown:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(a.Next);
      case o$1.ArrowUp:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(a.Previous);
      case o$1.Home:
      case o$1.PageUp:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(a.First);
      case o$1.End:
      case o$1.PageDown:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(a.Last);
      case o$1.Escape:
        t2.preventDefault(), t2.stopPropagation(), e.closeMenu(), nextTick(() => {
          var a2;
          return (a2 = o(e.buttonRef)) == null ? void 0 : a2.focus({ preventScroll: true });
        });
        break;
      case o$1.Tab:
        t2.preventDefault(), t2.stopPropagation(), e.closeMenu(), nextTick(() => v$1(o(e.buttonRef), t2.shiftKey ? M.Previous : M.Next));
        break;
      default:
        t2.key.length === 1 && (e.search(t2.key), u2.value = setTimeout(() => e.clearSearch(), 350));
        break;
    }
  }
  function c2(t2) {
    switch (t2.key) {
      case o$1.Space:
        t2.preventDefault();
        break;
    }
  }
  let I = p$1(), i = computed(() => I !== null ? I.value === l.Open : e.menuState.value === 0);
  return () => {
    var n, s;
    let t2 = { open: e.menuState.value === 0 }, r = { "aria-activedescendant": e.activeItemIndex.value === null || (n = e.items.value[e.activeItemIndex.value]) == null ? void 0 : n.id, "aria-labelledby": (s = o(e.buttonRef)) == null ? void 0 : s.id, id: p$2, onKeydown: m2, onKeyup: c2, role: "menu", tabIndex: 0, ref: e.itemsRef };
    return P({ ourProps: r, theirProps: o$2, slot: t2, attrs: S, slots: l$1, features: R.RenderStrategy | R.Static, visible: i.value, name: "MenuItems" });
  };
} }), Se = defineComponent({ name: "MenuItem", props: { as: { type: [Object, String], default: "template" }, disabled: { type: Boolean, default: false } }, setup(o$12, { slots: S, attrs: l2, expose: v2 }) {
  let e = D("MenuItem"), p2 = `headlessui-menu-item-${t()}`, u2 = ref(null);
  v2({ el: u2, $el: u2 });
  let m2 = computed(() => e.activeItemIndex.value !== null ? e.items.value[e.activeItemIndex.value].id === p2 : false), c2 = computed(() => ({ disabled: o$12.disabled, textValue: "", domRef: u2 }));
  onMounted(() => {
    var n, s;
    let a2 = (s = (n = o(u2)) == null ? void 0 : n.textContent) == null ? void 0 : s.toLowerCase().trim();
    a2 !== void 0 && (c2.value.textValue = a2);
  }), onMounted(() => e.registerItem(p2, c2)), onUnmounted(() => e.unregisterItem(p2)), watchEffect(() => {
    e.menuState.value === 0 && (!m2.value || e.activationTrigger.value !== 0 && nextTick(() => {
      var a2, n;
      return (n = (a2 = o(u2)) == null ? void 0 : a2.scrollIntoView) == null ? void 0 : n.call(a2, { block: "nearest" });
    }));
  });
  function I(a2) {
    if (o$12.disabled)
      return a2.preventDefault();
    e.closeMenu(), D$1(o(e.buttonRef));
  }
  function i() {
    if (o$12.disabled)
      return e.goToItem(a.Nothing);
    e.goToItem(a.Specific, p2);
  }
  function t$1() {
    o$12.disabled || m2.value || e.goToItem(a.Specific, p2, 0);
  }
  function r() {
    o$12.disabled || !m2.value || e.goToItem(a.Nothing);
  }
  return () => {
    let { disabled: a2 } = o$12, n = { active: m2.value, disabled: a2, close: e.closeMenu };
    return P({ ourProps: { id: p2, ref: u2, role: "menuitem", tabIndex: a2 === true ? void 0 : -1, "aria-disabled": a2 === true ? true : void 0, onClick: I, onFocus: i, onPointermove: t$1, onMousemove: t$1, onPointerleave: r, onMouseleave: r }, theirProps: o$12, slot: n, attrs: l2, slots: S, name: "MenuItem" });
  };
} });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "menu",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen w-screen items-center justify-center" }, _attrs))}><div class="fixed top-16 w-56 text-right">`);
      _push(ssrRenderComponent(unref(ve), {
        as: "div",
        class: "relative inline-block text-left"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Ie), { class: "inline-flex w-full justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Options `);
                  _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-menu text-white-200 hover:text-white-100 -mr-1k ml-2 text-lg" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" Options "),
                    createVNode(_component_UnoIcon, { class: "i-ic-round-menu text-white-200 hover:text-white-100 -mr-1k ml-2 text-lg" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(ge), { class: "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="px-1 py-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Se), null, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<button class="${ssrRenderClass([[
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        ], "group flex w-full items-center rounded-md px-2 py-2 text-sm"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }, null, _parent4, _scopeId3));
                        _push4(` Edit </button>`);
                      } else {
                        return [
                          createVNode("button", {
                            class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            ]]
                          }, [
                            createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                            createTextVNode(" Edit ")
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Se), null, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<button class="${ssrRenderClass([[
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        ], "group flex w-full items-center rounded-md px-2 py-2 text-sm"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }, null, _parent4, _scopeId3));
                        _push4(` Duplicate </button>`);
                      } else {
                        return [
                          createVNode("button", {
                            class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            ]]
                          }, [
                            createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                            createTextVNode(" Duplicate ")
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="px-1 py-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Se), null, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<button class="${ssrRenderClass([[
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        ], "group flex w-full items-center rounded-md px-2 py-2 text-sm"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }, null, _parent4, _scopeId3));
                        _push4(` Archive </button>`);
                      } else {
                        return [
                          createVNode("button", {
                            class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            ]]
                          }, [
                            createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                            createTextVNode(" Archive ")
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Se), null, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<button class="${ssrRenderClass([[
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        ], "group flex w-full items-center rounded-md px-2 py-2 text-sm"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }, null, _parent4, _scopeId3));
                        _push4(` Move </button>`);
                      } else {
                        return [
                          createVNode("button", {
                            class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            ]]
                          }, [
                            createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                            createTextVNode(" Move ")
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="px-1 py-1"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Se), null, {
                    default: withCtx(({ active }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<button class="${ssrRenderClass([[
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        ], "group flex w-full items-center rounded-md px-2 py-2 text-sm"])}"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }, null, _parent4, _scopeId3));
                        _push4(` Delete </button>`);
                      } else {
                        return [
                          createVNode("button", {
                            class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            ]]
                          }, [
                            createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                            createTextVNode(" Delete ")
                          ], 2)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "px-1 py-1" }, [
                      createVNode(unref(Se), null, {
                        default: withCtx(({ active }) => [
                          createVNode("button", {
                            class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            ]]
                          }, [
                            createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                            createTextVNode(" Edit ")
                          ], 2)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Se), null, {
                        default: withCtx(({ active }) => [
                          createVNode("button", {
                            class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            ]]
                          }, [
                            createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                            createTextVNode(" Duplicate ")
                          ], 2)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "px-1 py-1" }, [
                      createVNode(unref(Se), null, {
                        default: withCtx(({ active }) => [
                          createVNode("button", {
                            class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            ]]
                          }, [
                            createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                            createTextVNode(" Archive ")
                          ], 2)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(Se), null, {
                        default: withCtx(({ active }) => [
                          createVNode("button", {
                            class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            ]]
                          }, [
                            createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                            createTextVNode(" Move ")
                          ], 2)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "px-1 py-1" }, [
                      createVNode(unref(Se), null, {
                        default: withCtx(({ active }) => [
                          createVNode("button", {
                            class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                              active ? "bg-violet-500 text-white" : "text-gray-900"
                            ]]
                          }, [
                            createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                            createTextVNode(" Delete ")
                          ], 2)
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
              createVNode("div", null, [
                createVNode(unref(Ie), { class: "inline-flex w-full justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" }, {
                  default: withCtx(() => [
                    createTextVNode(" Options "),
                    createVNode(_component_UnoIcon, { class: "i-ic-round-menu text-white-200 hover:text-white-100 -mr-1k ml-2 text-lg" })
                  ]),
                  _: 1
                })
              ]),
              createVNode(Transition, {
                "enter-active-class": "transition duration-100 ease-out",
                "enter-from-class": "transform scale-95 opacity-0",
                "enter-to-class": "transform scale-100 opacity-100",
                "leave-active-class": "transition duration-75 ease-in",
                "leave-from-class": "transform scale-100 opacity-100",
                "leave-to-class": "transform scale-95 opacity-0"
              }, {
                default: withCtx(() => [
                  createVNode(unref(ge), { class: "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "px-1 py-1" }, [
                        createVNode(unref(Se), null, {
                          default: withCtx(({ active }) => [
                            createVNode("button", {
                              class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                                active ? "bg-violet-500 text-white" : "text-gray-900"
                              ]]
                            }, [
                              createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                              createTextVNode(" Edit ")
                            ], 2)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Se), null, {
                          default: withCtx(({ active }) => [
                            createVNode("button", {
                              class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                                active ? "bg-violet-500 text-white" : "text-gray-900"
                              ]]
                            }, [
                              createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                              createTextVNode(" Duplicate ")
                            ], 2)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "px-1 py-1" }, [
                        createVNode(unref(Se), null, {
                          default: withCtx(({ active }) => [
                            createVNode("button", {
                              class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                                active ? "bg-violet-500 text-white" : "text-gray-900"
                              ]]
                            }, [
                              createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                              createTextVNode(" Archive ")
                            ], 2)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(Se), null, {
                          default: withCtx(({ active }) => [
                            createVNode("button", {
                              class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                                active ? "bg-violet-500 text-white" : "text-gray-900"
                              ]]
                            }, [
                              createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                              createTextVNode(" Move ")
                            ], 2)
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "px-1 py-1" }, [
                        createVNode(unref(Se), null, {
                          default: withCtx(({ active }) => [
                            createVNode("button", {
                              class: ["group flex w-full items-center rounded-md px-2 py-2 text-sm", [
                                active ? "bg-violet-500 text-white" : "text-gray-900"
                              ]]
                            }, [
                              createVNode(_component_UnoIcon, { class: "i-ic:baseline-12mp mr-2 text-lg text-violet-400" }),
                              createTextVNode(" Delete ")
                            ], 2)
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/menu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=menu.72b17843.mjs.map
