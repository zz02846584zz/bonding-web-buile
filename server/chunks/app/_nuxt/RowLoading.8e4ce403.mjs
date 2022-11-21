import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';

const _sfc_main = {
  __name: "RowLoading",
  __ssrInlineRender: true,
  props: {
    row: {
      type: Number,
      default: 4
    },
    column: {
      type: Number,
      default: 2
    },
    gap: {
      type: Number,
      default: 2
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid md:grid-cols-2 gap-5 2xl:grid-cols-4 xl:grid-cols-3" }, _attrs))} data-v-295a0e8a><!--[-->`);
      ssrRenderList(4, (n) => {
        _push(`<div class="${ssrRenderClass([[{ "xl:hidden 2xl:block": n > 3 }, { "hidden lg:block": n > 2 }], "relative"])}" data-v-295a0e8a><div class="h-0 mb-2 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading thumbnail" data-v-295a0e8a></div><div class="w-full h-12 mb-3 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading" data-v-295a0e8a></div><div class="flex justify-between" data-v-295a0e8a><div class="w-16 h-5 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading" data-v-295a0e8a></div><div class="w-16 h-5 bg-gray-300 rounded dark:bg-gray-700 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-gray-800 dark:via-gray-600 dark:to-gray-800 loading" data-v-295a0e8a></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Loop/RowLoading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-295a0e8a"]]);

export { __nuxt_component_2 as _ };
//# sourceMappingURL=RowLoading.8e4ce403.mjs.map
