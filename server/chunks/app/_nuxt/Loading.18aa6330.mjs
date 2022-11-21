import { useSSRContext, defineComponent, watch, unref, withCtx, createVNode, mergeProps } from 'vue';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc, u as useState } from '../server.mjs';
import { f as fe, o as oe } from './transition.73172e45.mjs';
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

const _sfc_main$1 = {
  name: "EosIconsLoading"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    width: "1em",
    height: "1em",
    viewBox: "0 0 24 24"
  }, _attrs))}><path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"></path><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"></animateTransform></path></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Icon/Loading.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Loading",
  __ssrInlineRender: true,
  setup(__props) {
    const $loading = useState("loading", () => false);
    const $bodyLock = useState("body.lock");
    watch(
      () => $loading.value,
      (val) => {
        $bodyLock.value = val;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconLoading = __nuxt_component_0;
      ssrRenderTeleport(_push, (_push2) => {
        _push2(ssrRenderComponent(unref(fe), {
          show: unref($loading),
          appear: ""
        }, {
          default: withCtx((_, _push3, _parent2, _scopeId) => {
            if (_push3) {
              _push3(ssrRenderComponent(unref(oe), {
                as: "template",
                enter: "duration-150 linear",
                "enter-from": "opacity-0",
                "enter-to": "opacity-100",
                leave: "duration-150 linear",
                "leave-from": "opacity-100",
                "leave-to": "opacity-0"
              }, {
                default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    _push4(`<div class="fixed top-0 left-0 w-full h-full z-20" data-v-0e4c0608${_scopeId2}><div class="absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50" data-v-0e4c0608${_scopeId2}></div>`);
                    _push4(ssrRenderComponent(_component_IconLoading, { class: "absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl" }, null, _parent3, _scopeId2));
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "fixed top-0 left-0 w-full h-full z-20" }, [
                        createVNode("div", { class: "absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50" }),
                        createVNode(_component_IconLoading, { class: "absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl" })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(oe), {
                  as: "template",
                  enter: "duration-150 linear",
                  "enter-from": "opacity-0",
                  "enter-to": "opacity-100",
                  leave: "duration-150 linear",
                  "leave-from": "opacity-100",
                  "leave-to": "opacity-0"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "fixed top-0 left-0 w-full h-full z-20" }, [
                      createVNode("div", { class: "absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50" }),
                      createVNode(_component_IconLoading, { class: "absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl" })
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Loading.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Loading = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0e4c0608"]]);

export { Loading as default };
//# sourceMappingURL=Loading.18aa6330.mjs.map
