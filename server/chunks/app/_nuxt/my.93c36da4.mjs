import { _ as _export_sfc, y as useRoute, s as useBaseStore, U as UilUser, G as UilFileAlt, H as UilHeart, I as UilLightbulbAlt, J as UilSignOutAlt, n as __nuxt_component_0$2, K as __nuxt_component_1$1 } from '../server.mjs';
import { useSSRContext, defineComponent, shallowRef, ref, watch, mergeProps, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import 'defu';
import 'vue-router';
import 'swiper/vue';
import 'swiper';
import 'store';
import '@vue/runtime-core';
import 'cookie-es';
import 'ohash';
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
    const icons = {
      user: shallowRef(UilUser),
      fileAlt: shallowRef(UilFileAlt),
      heart: shallowRef(UilHeart),
      lightbulbAlt: shallowRef(UilLightbulbAlt),
      signOutAlt: shallowRef(UilSignOutAlt)
    };
    const items = ref([
      { id: 1, icon: icons.user, label: "\u500B\u4EBA\u8CC7\u6599", path: "/my/account" },
      { id: 2, icon: icons.fileAlt, label: "\u700F\u89BD\u7D00\u9304", path: "/my/history" },
      { id: 3, icon: icons.heart, label: "\u6211\u7684\u6536\u85CF", path: "/my/collections" },
      { id: 4, icon: icons.lightbulbAlt, label: "\u5C0F\u77E5\u8B58", path: "/my/tips" },
      { id: 5, icon: icons.signOutAlt, label: "\u767B\u51FA", action: () => user.logout() }
    ]);
    const activeId = ref(1);
    watch(route, (val) => {
      const item = items.value.find((item2) => item2.path === val.fullPath);
      activeId.value = (item == null ? void 0 : item.id) || 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_NuxtPage = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cma flex flex-wrap lg:px-8 py-5 my" }, _attrs))} data-v-fa47f7a8><div class="w-48 mr-10" data-v-fa47f7a8><div class="items rounded border border-gray-200 dark:border-gray-300 dark:border-opacity-30" data-v-fa47f7a8><!--[-->`);
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
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "mr-3" }, null), _parent2, _scopeId);
                _push2(`<span data-v-fa47f7a8${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              } else {
                return [
                  (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "mr-3" })),
                  createVNode("span", null, toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<div class="flex items-center cursor-pointer text-sm font-bold py-3 px-3 hover:bg-gray-200 dark:bg-opacity-10 border-b dark:border-opacity-30 border-gray-200 last-border-0 duration-200" data-v-fa47f7a8>`);
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), { class: "mr-3" }, null), _parent);
          _push(`<span data-v-fa47f7a8>${ssrInterpolate(item.label)}</span></div>`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div><div class="flex-1" data-v-fa47f7a8>`);
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
const my = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa47f7a8"]]);

export { my as default };
//# sourceMappingURL=my.93c36da4.mjs.map
