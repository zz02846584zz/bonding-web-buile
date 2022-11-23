import { _ as _export_sfc, u as useState } from '../server.mjs';
import { useSSRContext, defineComponent, ref, watch, computed, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode } from 'vue';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { f as fe, o as oe } from './transition.9f72aa2f.mjs';
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
  __name: "Alert",
  __ssrInlineRender: true,
  setup(__props) {
    const $alert = useState("alert", () => {
      return {
        type: "",
        title: "",
        text: "",
        center: false,
        action: () => {
        }
      };
    });
    const show = ref(false);
    const $bodyLock = useState("body.lock");
    watch(
      () => show.value,
      (val) => {
        $bodyLock.value = val;
      }
    );
    watch(
      () => $alert.value,
      (val) => {
        if (val.title || val.text)
          show.value = true;
      }
    );
    const reset = () => {
      $alert.value = {
        type: "",
        title: "",
        text: "",
        center: false,
        action: () => {
        }
      };
    };
    const close = async () => {
      show.value = false;
      if ($alert.value.action)
        $alert.value.action();
      setTimeout(() => {
        reset();
      }, 150);
    };
    const imgTypes = {
      error: "/delete.png",
      info: "/alert.png",
      idea: "/idea.png",
      success: "/check.png"
    };
    const imgType = computed(() => {
      return imgTypes[$alert.value.type] || "/alert.png";
    });
    return (_ctx, _push, _parent, _attrs) => {
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
                leave: "duration-150 linear",
                "leave-from": "opacity-100",
                "leave-to": "opacity-0"
              }, {
                default: withCtx((_2, _push4, _parent3, _scopeId2) => {
                  if (_push4) {
                    _push4(`<div class="fixed top-0 left-0 w-full h-full z-30" data-v-5af0335b${_scopeId2}><div class="absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50" data-v-5af0335b${_scopeId2}></div><div class="${ssrRenderClass([[{ "text-center": unref($alert).center }], "p-12 min-w-xs md:min-w-sm absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-7/12 rounded-lg max-w-11/12 backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100/95 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-100/[0.15] shadow"])}" data-v-5af0335b${_scopeId2}><img class="mx-auto mb-6 w-26"${ssrRenderAttr("src", unref(imgType))} data-v-5af0335b${_scopeId2}>`);
                    if (unref($alert).title) {
                      _push4(`<div class="${ssrRenderClass([{ "pb-4": unref($alert).text }, "text-lg pl-[0.1em] tracking-widest font-bold text-center"])}" data-v-5af0335b${_scopeId2}>${ssrInterpolate(unref($alert).title)}</div>`);
                    } else {
                      _push4(`<!---->`);
                    }
                    if (unref($alert).text) {
                      _push4(`<div data-v-5af0335b${_scopeId2}>${ssrInterpolate(unref($alert).text)}</div>`);
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "fixed top-0 left-0 w-full h-full z-30" }, [
                        createVNode("div", {
                          class: "absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50",
                          onClick: close
                        }),
                        createVNode("div", {
                          class: ["p-12 min-w-xs md:min-w-sm absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-7/12 rounded-lg max-w-11/12 backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100/95 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-100/[0.15] shadow", [{ "text-center": unref($alert).center }]]
                        }, [
                          createVNode("img", {
                            class: "mx-auto mb-6 w-26",
                            src: unref(imgType)
                          }, null, 8, ["src"]),
                          unref($alert).title ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: ["text-lg pl-[0.1em] tracking-widest font-bold text-center", { "pb-4": unref($alert).text }]
                          }, toDisplayString(unref($alert).title), 3)) : createCommentVNode("", true),
                          unref($alert).text ? (openBlock(), createBlock("div", { key: 1 }, toDisplayString(unref($alert).text), 1)) : createCommentVNode("", true)
                        ], 2)
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
                    createVNode("div", { class: "fixed top-0 left-0 w-full h-full z-30" }, [
                      createVNode("div", {
                        class: "absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50",
                        onClick: close
                      }),
                      createVNode("div", {
                        class: ["p-12 min-w-xs md:min-w-sm absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-7/12 rounded-lg max-w-11/12 backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100/95 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-100/[0.15] shadow", [{ "text-center": unref($alert).center }]]
                      }, [
                        createVNode("img", {
                          class: "mx-auto mb-6 w-26",
                          src: unref(imgType)
                        }, null, 8, ["src"]),
                        unref($alert).title ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: ["text-lg pl-[0.1em] tracking-widest font-bold text-center", { "pb-4": unref($alert).text }]
                        }, toDisplayString(unref($alert).title), 3)) : createCommentVNode("", true),
                        unref($alert).text ? (openBlock(), createBlock("div", { key: 1 }, toDisplayString(unref($alert).text), 1)) : createCommentVNode("", true)
                      ], 2)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Alert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Alert = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5af0335b"]]);

export { Alert as default };
//# sourceMappingURL=Alert.0273167e.mjs.map
