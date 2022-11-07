import { u as useState } from '../server.mjs';
import { useSSRContext, defineComponent, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const app = useState("app");
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t lg:border-gray-900/10 dark:border-gray-50/[0.2]" }, _attrs))}><section class="max-w-[96em] mx-auto px-4 lg:px-8 flex-1 flex w-full space-x-20"><div class="w-full py-4 text-center md:text-left"><div class="mb-1">${ssrInterpolate((_a = unref(app)) == null ? void 0 : _a.name)}</div><div class="text-xs text-gray-600 dark:text-gray-400"> Copyright \xA9 2022. All rights reserved. <span class="md:float-right"> design by <a${ssrRenderAttr("href", unref(app).author.link)}>${ssrInterpolate(unref(app).author.name)}</a></span></div></div></section></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "blog",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutFooter = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="cma flex flex-wrap"><div class="py-4 sidebar-container lg:w-56"></div><div class="flex flex-col page-container">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "footer", {}, () => {
        _push(ssrRenderComponent(_component_LayoutFooter, null, null, _parent));
      }, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/blog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=blog.d8e461db.mjs.map
