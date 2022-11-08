import { u as useState } from '../server.mjs';
import { useSSRContext, defineComponent, ref, watch, resolveComponent, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode } from 'vue';
import { ssrRenderTeleport, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { f as fe, o as oe } from './transition.d91efeb3.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper.a1a6add7.mjs';
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
import './open-closed.5d362c74.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Message",
  __ssrInlineRender: true,
  setup(__props) {
    const $message = useState("message", () => "");
    const show = ref(false);
    const reset = () => {
      $message.value = "";
    };
    const close = () => {
      show.value = false;
      setTimeout(() => {
        reset();
      }, 150);
    };
    watch(
      () => $message.value,
      (val) => {
        show.value = !!val;
        setTimeout(() => {
          close();
        }, 4e3);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconIonIosCloseCircleOutline = resolveComponent("IconIonIosCloseCircleOutline");
      ssrRenderTeleport(_push, (_push2) => {
        _push2(ssrRenderComponent(unref(fe), {
          show: show.value,
          appear: ""
        }, {
          default: withCtx((_, _push3, _parent2, _scopeId) => {
            if (_push3) {
              _push3(ssrRenderComponent(unref(oe), {
                as: "template",
                enter: "duration-150 linear",
                "enter-from": "opacity-0",
                "enter-to": "opacity-100",
                leave: "duration-300 linear",
                "leave-from": "",
                "leave-to": "-translate-y-16"
              }, {
                default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    _push4(`<div class="py-2 px-5 fb fixed overflow-x-hidden overflow-y-auto transform -translate-x-1/2 rounded-lg lg:max-w-7/12 max-w-11/12 left-1/2 top-4 z-30 bg-light-100/95 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-100/[0.15] shadow" data-v-c21d412a${_scopeId2}>`);
                    if (unref($message)) {
                      _push4(`<div class="pl-[0.075em] tracking-wide" data-v-c21d412a${_scopeId2}>${ssrInterpolate(unref($message))}</div>`);
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(ssrRenderComponent(_component_IconIonIosCloseCircleOutline, {
                      class: "ml-3 p-1 text-xl cursor-pointer",
                      onClick: close
                    }, null, _parent3, _scopeId2));
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "py-2 px-5 fb fixed overflow-x-hidden overflow-y-auto transform -translate-x-1/2 rounded-lg lg:max-w-7/12 max-w-11/12 left-1/2 top-4 z-30 bg-light-100/95 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-100/[0.15] shadow" }, [
                        unref($message) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "pl-[0.075em] tracking-wide"
                        }, toDisplayString(unref($message)), 1)) : createCommentVNode("", true),
                        createVNode(_component_IconIonIosCloseCircleOutline, {
                          class: "ml-3 p-1 text-xl cursor-pointer",
                          onClick: close
                        })
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
                  leave: "duration-300 linear",
                  "leave-from": "",
                  "leave-to": "-translate-y-16"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "py-2 px-5 fb fixed overflow-x-hidden overflow-y-auto transform -translate-x-1/2 rounded-lg lg:max-w-7/12 max-w-11/12 left-1/2 top-4 z-30 bg-light-100/95 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-100/[0.15] shadow" }, [
                      unref($message) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "pl-[0.075em] tracking-wide"
                      }, toDisplayString(unref($message)), 1)) : createCommentVNode("", true),
                      createVNode(_component_IconIonIosCloseCircleOutline, {
                        class: "ml-3 p-1 text-xl cursor-pointer",
                        onClick: close
                      })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Message.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Message = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c21d412a"]]);

export { Message as default };
//# sourceMappingURL=Message.99446ebe.mjs.map
