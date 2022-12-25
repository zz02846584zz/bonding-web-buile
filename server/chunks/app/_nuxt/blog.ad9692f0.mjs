import { g as useHttpPost, C as useAppConfig, A as _sfc_main$8, b as __nuxt_component_1 } from '../server.mjs';
import { useSSRContext, defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    mode: {
      type: String,
      default: "normal"
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIAnchor = _sfc_main$8;
      const _component_UnoIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: {
          "fixed top-0 pt-13 hidden lg:flex lg:pl-8 lg:w-56 h-screen border-r border-gray-900/10 dark:border-gray-50/[0.2]": __props.mode === "normal",
          "relative flex-1 flex flex-col w-full": __props.mode === "mobile"
        }
      }, _attrs))}><div class="flex-1 py-4 pl-0 pr-4 overflow-y-auto rounded lg:pl-0 bg-gary-200"><ul><!--[-->`);
      ssrRenderList(__props.categories, (category) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_UIAnchor, {
          to: `/news/category/${category.slug}`,
          class: "flex items-center group hover:no-underline mb-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([{
                "text-white dark:text-white group-hover:bg-sky-500 bg-sky-500": _ctx.$route.params.categorySlug === category.slug,
                "text-slate-500 dark:text-gray-100 group-hover:bg-gray-200 bg-gray-100 dark:group-hover:bg-slate-600 dark:bg-slate-700": _ctx.$route.params.categorySlug !== category.slug
              }, "flex items-center px-2 py-2 mr-4 duration-200 rounded-md shadow-sm ring-1 ring-slate-900/5 group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UnoIcon, { class: "i-uil-apps text-xs" }, null, _parent2, _scopeId));
              _push2(`</div><span class="${ssrRenderClass([{
                "font-extrabold text-sky-500 dark:text-sky-400": _ctx.$route.params.slug === category.slug
              }, "text-sm font-semibold capitalize duration-200"])}"${_scopeId}>${ssrInterpolate(category == null ? void 0 : category.name)}</span>`);
            } else {
              return [
                createVNode("div", {
                  class: ["flex items-center px-2 py-2 mr-4 duration-200 rounded-md shadow-sm ring-1 ring-slate-900/5 group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10", {
                    "text-white dark:text-white group-hover:bg-sky-500 bg-sky-500": _ctx.$route.params.categorySlug === category.slug,
                    "text-slate-500 dark:text-gray-100 group-hover:bg-gray-200 bg-gray-100 dark:group-hover:bg-slate-600 dark:bg-slate-700": _ctx.$route.params.categorySlug !== category.slug
                  }]
                }, [
                  createVNode(_component_UnoIcon, { class: "i-uil-apps text-xs" })
                ], 2),
                createVNode("span", {
                  class: ["text-sm font-semibold capitalize duration-200", {
                    "font-extrabold text-sky-500 dark:text-sky-400": _ctx.$route.params.slug === category.slug
                  }]
                }, toDisplayString(category == null ? void 0 : category.name), 3)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const app = useAppConfig();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t lg:border-gray-900/10 dark:border-gray-50/[0.2]" }, _attrs))}><section class="max-w-[96em] mx-auto px-4 lg:px-8 flex-1 flex w-full space-x-20"><div class="text-xs w-full py-4 text-center md:text-left"><div class="text-gray-600 dark:text-gray-400"> Copyright \xA9 2022. All rights reserved. <span class="md:float-right"> design by <a${ssrRenderAttr("href", unref(app).link)}>${ssrInterpolate(unref(app).name)}</a></span></div></div></section></footer>`);
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
  async setup(__props) {
    let __temp, __restore;
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useHttpPost(
      "industry-categories",
      "/news/categories"
    )), __temp = await __temp, __restore(), __temp);
    const categoriesWithoutEmpty = computed(() => {
      var _a;
      return (_a = categories.value) == null ? void 0 : _a.filter((item) => +item.articleCount && item.parentId);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ArticleSidebar = _sfc_main$2;
      const _component_LayoutFooter = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full" }, _attrs))}><div class="cma flex flex-wrap"><div class="py-4 sidebar-container lg:w-56">`);
      _push(ssrRenderComponent(_component_ArticleSidebar, {
        categories: unref(categoriesWithoutEmpty) || []
      }, null, _parent));
      _push(`</div><div class="flex flex-col page-container">`);
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
//# sourceMappingURL=blog.ad9692f0.mjs.map
