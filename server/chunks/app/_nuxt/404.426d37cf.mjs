import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, reactive, computed, unref, renderSlot, createTextVNode, toDisplayString, resolveDynamicComponent } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttrs, ssrRenderVNode } from 'vue/server-renderer';
import { e as useHead, _ as _export_sfc, d as __nuxt_component_0$1 } from '../server.mjs';
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

const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-1 relative py-8" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Wrapper.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "primary"
    },
    size: {
      type: String,
      default: "md"
    },
    to: {
      type: [String, Object],
      default: void 0
    },
    href: {
      type: String,
      default: void 0
    }
  },
  setup(__props) {
    const props = __props;
    const defaultStyle = `
  cursor-pointer
  border transition-color duration-300
  focus:outline-none focus:ring-1 focus:ring-offset-1 focus:dark:ring-offset-gray-50 focus:dark:ring-gray-400 focus:ring-gray-600/[0.6] focus:ring-offset-gray-800/[0.6]
  flex items-center justify-center font-semibold
`;
    const styles = reactive({
      none: "",
      primary: "text-white bg-primary-500 hover:bg-primary-400 border-primary-500",
      secondary: "text-slate-800 bg-gray-200 border-gray-200 hover:bg-gray-300 dark:text-white dark:border-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700",
      opposite: "text-white bg-gray-800 hover:bg-white hover:text-gray-800 hover:border-gray-900 dark:text-gray-800 dark:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:border-white"
    });
    const sizes = reactive({
      lg: "h-13 px-8 text-lg rounded-lg",
      md: "h-10 px-6 text-base rounded",
      sm: "h-9 px-4 text-sm rounded",
      xs: "h-6 px-3 text-xs rounded"
    });
    const selectedStyle = computed(() => styles[props.type] || styles.primary);
    const selectedSize = computed(() => sizes[props.size] || sizes.lg);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (__props.to) {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          tag: "a",
          to: __props.to,
          class: `${defaultStyle} ${unref(selectedStyle)} ${unref(selectedSize)}`
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                _push2(`${ssrInterpolate(__props.text)}`);
              }, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  createTextVNode(toDisplayString(__props.text), 1)
                ])
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<a${ssrRenderAttrs(mergeProps({
          class: `${defaultStyle} ${unref(selectedStyle)} ${unref(selectedSize)}`,
          href: __props.href
        }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`${ssrInterpolate(__props.text)}`);
        }, _push, _parent);
        _push(`</a>`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Button.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Error",
  __ssrInlineRender: true,
  props: {
    code: {
      type: Number,
      default: 400
    },
    wrap: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const PageWrapper = __nuxt_component_0;
    const errorsMap = {
      "400": "Bad Request",
      "401": "Unauthorized",
      "403": "Forbidden",
      "404": "Not Found"
    };
    const error = computed(() => {
      const { code } = props;
      return {
        code,
        message: errorsMap[code.toString()] || "Unknown Error"
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Button = _sfc_main$2;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(props.wrap ? unref(PageWrapper) : "div"), mergeProps({
        class: props.wrap ? "flex flex-col items-center justify-center" : ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-center mb-6 leading-3"${_scopeId}><span class="font-bold text-8xl block"${_scopeId}>${ssrInterpolate(unref(error).code)}</span><span class="block italic"${_scopeId}>${ssrInterpolate(unref(error).message)}</span></h1>`);
            _push2(ssrRenderComponent(_component_Button, {
              text: "Home",
              to: "/",
              size: "sm"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("h1", { class: "text-center mb-6 leading-3" }, [
                createVNode("span", { class: "font-bold text-8xl block" }, toDisplayString(unref(error).code), 1),
                createVNode("span", { class: "block italic" }, toDisplayString(unref(error).message), 1)
              ]),
              createVNode(_component_Button, {
                text: "Home",
                to: "/",
                size: "sm"
              })
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function capitalize(str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "404",
  __ssrInlineRender: true,
  setup(__props) {
    const t = (e) => e;
    useHead(() => ({
      title: capitalize(t("pages.404.title"))
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PageWrapper = __nuxt_component_0;
      const _component_Error = _sfc_main$1;
      _push(ssrRenderComponent(_component_PageWrapper, mergeProps({ class: "flex flex-col items-center justify-center" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Error, { code: 404 }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Error, { code: 404 })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/404.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=404.426d37cf.mjs.map
