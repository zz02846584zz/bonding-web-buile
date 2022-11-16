import { _ as _export_sfc, k as useRoute, j as useBaseStore, d as __nuxt_component_0$1, b as __nuxt_component_1, n as __nuxt_component_2 } from '../server.mjs';
import { useSSRContext, defineComponent, ref, watch, mergeProps, withCtx, createVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import 'vue-router';
import 'cookie-es';
import 'is-https';
import '@intlify/core-base';
import 'ohash';
import 'store';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'axios';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "my",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { user } = useBaseStore();
    const items = ref([
      { id: 1, icon: "i-uil-user", label: "\u500B\u4EBA\u8CC7\u6599", path: "/my/account" },
      { id: 2, icon: "i-uil-file-alt", label: "\u700F\u89BD\u7D00\u9304", path: "/my/history" },
      { id: 3, icon: "i-ion-heart-outline", label: "\u6211\u7684\u6536\u85CF", path: "/my/collections" },
      { id: 4, icon: "i-uil-lightbulb-alt", label: "\u5C0F\u77E5\u8B58", path: "/my/tips" },
      { id: 5, icon: "i-uil-sign-out-alt", label: "\u767B\u51FA", action: () => user.logout() }
    ]);
    const activeId = ref(1);
    watch(route, (val) => {
      const item = items.value.find((item2) => item2.path === val.fullPath);
      activeId.value = (item == null ? void 0 : item.id) || 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UnoIcon = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cma mb-0 md:flex flex-wrap lg:px-8 lg:py-5 my" }, _attrs))} data-v-490dcf11><div class="lt-lg:hidden w-48 mr-10" data-v-490dcf11><div class="items rounded border border-gray-200 dark:border-gray-300 dark:border-opacity-30" data-v-490dcf11><!--[-->`);
      ssrRenderList(items.value, (item, index) => {
        _push(`<!--[-->`);
        if (item.path) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.id,
            to: item.path,
            class: "flex items-center cursor-pointer text-sm font-bold py-3 px-3 hover:bg-gray-200 dark:bg-opacity-10 border-b dark:border-opacity-30 border-gray-200 last-border-0 duration-200"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UnoIcon, {
                  class: ["mr-3", item.icon]
                }, null, _parent2, _scopeId));
                _push2(`<span data-v-490dcf11${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              } else {
                return [
                  createVNode(_component_UnoIcon, {
                    class: ["mr-3", item.icon]
                  }, null, 8, ["class"]),
                  createVNode("span", null, toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<div class="flex items-center cursor-pointer text-sm font-bold py-3 px-3 hover:bg-gray-200 dark:bg-opacity-10 border-b dark:border-opacity-30 border-gray-200 last-border-0 duration-200" data-v-490dcf11>`);
          _push(ssrRenderComponent(_component_UnoIcon, {
            class: ["mr-3", item.icon]
          }, null, _parent));
          _push(`<span data-v-490dcf11>${ssrInterpolate(item.label)}</span></div>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div><div class="flex-1 relative" data-v-490dcf11>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const my = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-490dcf11"]]);

export { my as default };
//# sourceMappingURL=my.2f85927c.mjs.map
