import { F as _sfc_main$i } from '../server.mjs';
import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "tips",
  __ssrInlineRender: true,
  setup(__props) {
    const list = ref([]);
    const pagination = ref({});
    const loading = ref(true);
    const loaded = computed(
      () => pagination.value.total <= pagination.value.size * pagination.value.page
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TipRow = _sfc_main$i;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pb-4" }, _attrs))}><div class="flex items-center justify-between sticky mb-4"><h1 class="text-xl font-bold">\u5C0F\u77E5\u8B58\u5217\u8868</h1></div><div class="list">`);
      _push(ssrRenderComponent(_component_TipRow, { list: list.value }, null, _parent));
      if (!loading.value) {
        _push(`<!--[--><div style="${ssrRenderStyle(!unref(loaded) ? null : { display: "none" })}" class="dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"><p>\u8F09\u5165\u66F4\u591A</p></div><div style="${ssrRenderStyle(unref(loaded) ? null : { display: "none" })}" class="text-center pt-8 text-xs font-bold tracking-widest opacity-50"> \u7121\u66F4\u591A\u8CC7\u6599... </div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my/tips.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tips.14b2e129.mjs.map
