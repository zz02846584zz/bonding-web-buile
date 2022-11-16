import { _ as _export_sfc, u as useState, b as __nuxt_component_1 } from '../server.mjs';
import { useSSRContext, defineComponent, watch, unref, withCtx, createVNode } from 'vue';
import { ssrRenderTeleport, ssrRenderComponent } from 'vue/server-renderer';
import { f as fe, o as oe } from './transition.acbe188a.mjs';
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
      const _component_UnoIcon = __nuxt_component_1;
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
                    _push4(`<div class="fixed top-0 left-0 w-full h-full z-20" data-v-c56756f1${_scopeId2}><div class="absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50" data-v-c56756f1${_scopeId2}></div>`);
                    _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-eos-icons-loading absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl" }, null, _parent3, _scopeId2));
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "fixed top-0 left-0 w-full h-full z-20" }, [
                        createVNode("div", { class: "absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50" }),
                        createVNode(_component_UnoIcon, { class: "i-eos-icons-loading absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl" })
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
                      createVNode(_component_UnoIcon, { class: "i-eos-icons-loading absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl" })
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
const Loading = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c56756f1"]]);

export { Loading as default };
//# sourceMappingURL=Loading.60d9cc44.mjs.map
