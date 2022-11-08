import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './ColorChange.d8ee2b5a.mjs';
import { _ as __nuxt_component_0$1 } from './use-outside-click.01e1b2e0.mjs';
import { _ as __nuxt_component_0, u as useI18n } from '../server.mjs';
import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, computed, unref } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';
import './use-resolve-button-type.7f42ff8d.mjs';
import './hidden.90d807c6.mjs';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import 'vue-router';
import '@intlify/core-base';
import 'cookie-es';
import 'is-https';
import 'defu';
import 'ohash';
import 'store';
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
  __name: "list",
  __ssrInlineRender: true,
  props: {
    link: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_UnoIcon = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        class: "global-text py-4 hover:shadow-xl",
        to: __props.link.url
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between space-x-3 rounded-lg bg-gray-300 p-4 dark:bg-gray-700"${_scopeId}><div class="item-center flex"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UnoIcon, {
              class: [__props.link.icon, "mr-3 text-lg dark:text-gray-400"]
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.link.title)}</div>`);
            _push2(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-arrow-forward-ios global-text h-6 w-6 text-lg" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between space-x-3 rounded-lg bg-gray-300 p-4 dark:bg-gray-700" }, [
                createVNode("div", { class: "item-center flex" }, [
                  createVNode(_component_UnoIcon, {
                    class: [__props.link.icon, "mr-3 text-lg dark:text-gray-400"]
                  }, null, 8, ["class"]),
                  createTextVNode(" " + toDisplayString(__props.link.title), 1)
                ]),
                createVNode(_component_UnoIcon, { class: "i-ic-round-arrow-forward-ios global-text h-6 w-6 text-lg" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/list.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useLang = () => {
  const { t } = useI18n();
  return {
    t
  };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "starter",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useLang();
    const lists = computed(() => [
      { id: 1, title: "Pinia Store", url: "pinia", icon: "i-carbon-store" },
      { id: 1, title: t("modal"), url: "modal", icon: "i-carbon-collapse-all" },
      { id: 1, title: "Menu", url: "menu", icon: "i-carbon-menu" },
      { id: 1, title: "Naive UI", url: "naive", icon: "i-carbon-milestone" },
      { id: 1, title: "New soon...", url: "", icon: "i-carbon-milestone" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TemLanguageChange = _sfc_main$1$1;
      const _component_TemColorChange = _sfc_main$3;
      const _component_UnoIcon = __nuxt_component_0$1;
      const _component_List = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto mt-4 max-w-sm" }, _attrs))}><div class="mb-10 flex items-center justify-between"><a target="_blank" href="https://productdevbook.com">productdevbook.com</a><div class="flex space-x-2">`);
      _push(ssrRenderComponent(_component_TemLanguageChange, null, null, _parent));
      _push(ssrRenderComponent(_component_TemColorChange, null, null, _parent));
      _push(`</div></div><div class="flex flex-col"><h1>${ssrInterpolate(unref(t)("follow"))}</h1><div class="flex w-full items-center justify-between py-2"><img class="h-20 w-20 rounded-full" height="160" width="160" src="https://avatars.githubusercontent.com/u/38668796?v=4" alt="productdevbook"><div class="place-items-centerr grid grid-cols-3 justify-items-center gap-4 [&amp;&gt;*]:flex [&amp;&gt;*]:items-center [&amp;&gt;*]:justify-center [&amp;&gt;*]:rounded-md [&amp;&gt;*]:bg-gray-100 [&amp;&gt;*]:p-3 dark:[&amp;&gt;*]:bg-gray-600"><a target="blank" class="font-bold text-gray-900 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-400" href="https://github.com/productdevbook">`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ph-github-logo-duotone" }, null, _parent));
      _push(`</a><a class="hover:bg-gray-300 dark:hover:bg-gray-400" href="https://twitter.com/productdevbook" target="_blank">`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ph-twitter-logo-duotone" }, null, _parent));
      _push(`</a><a target="blank" class="font-bold text-gray-900 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-400" href="https://discord.gg/UN8mqgC79S">`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ph-discord-logo-duotone" }, null, _parent));
      _push(`</a></div></div></div><ul role="list" class="mt-10 space-y-4"><!--[-->`);
      ssrRenderList(unref(lists), (item) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_List, {
          link: {
            id: item.id,
            title: item.title,
            url: item.url,
            icon: item.icon
          }
        }, null, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/starter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Starter = _sfc_main$1;
  _push(ssrRenderComponent(_component_Starter, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index.8bd2e511.mjs.map
