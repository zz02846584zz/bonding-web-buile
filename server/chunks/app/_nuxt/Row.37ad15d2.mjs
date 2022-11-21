import { u as useState, j as useHttpFetchPost, b as __nuxt_component_1 } from '../server.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, withDirectives, vShow, useSSRContext } from 'vue';
import { ssrRenderList, ssrInterpolate, ssrRenderTeleport, ssrRenderComponent } from 'vue/server-renderer';
import { f as fe, o as oe } from './transition.c36c369c.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Row",
  __ssrInlineRender: true,
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const $bodyLock = useState("body.lock");
    const dialogInfo = ref({});
    const dialogShow = ref(false);
    const dialogLoading = ref(false);
    const closeDialog = () => {
      dialogShow.value = false;
      $bodyLock.value = false;
      setTimeout(() => {
        dialogInfo.value = {};
      }, 150);
    };
    const collection = async (id) => {
      const { data, error } = await useHttpFetchPost("/tip/collection", {
        body: { id }
      });
      if (!error)
        dialogInfo.value.isCollection = data.status;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1;
      _push(`<!--[--><!--[-->`);
      ssrRenderList(__props.list, (item) => {
        _push(`<div class="flex items-center flex-wrap py-3 px-5 border bg-transparent border-gray-400/[0.4] dark:border-gray-600/[0.3] dark:border-gray-50/[0.2] mb-2 last-mb-0 rounded-sm dark:shadow cursor-pointer duration-200"><div class="title font-bold mr-auto">${ssrInterpolate(item.title)}</div><div class="text-sm">${ssrInterpolate(item.publishDate)}</div></div>`);
      });
      _push(`<!--]-->`);
      ssrRenderTeleport(_push, (_push2) => {
        _push2(ssrRenderComponent(unref(fe), {
          show: dialogShow.value,
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
                    _push4(`<div class="fixed top-0 left-0 w-full h-full z-20"${_scopeId2}><div class="absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50"${_scopeId2}>`);
                    if (dialogLoading.value) {
                      _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-eos-icons-loading absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl" }, null, _parent3, _scopeId2));
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(`</div>`);
                    if (!dialogLoading.value) {
                      _push4(`<div class="px-10 pb-8 max-w-[44em] w-11/12 absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-100/[0.15] shadow"${_scopeId2}>`);
                      if (dialogInfo.value.title) {
                        _push4(`<div class="bg-light-100 dark:bg-gray-800 sticky top-0 pt-7 pb-3 flex flex-wrap justify-between relative text-lg pl-[0.1em] tracking-widest font-bold"${_scopeId2}>${ssrInterpolate(dialogInfo.value.title)} <div class="flex items-center space-x-3"${_scopeId2}><div class="cursor-pointer flex items-center"${_scopeId2}>`);
                        _push4(ssrRenderComponent(_component_UnoIcon, {
                          style: !dialogInfo.value.isCollection ? null : { display: "none" },
                          class: "i-ion-heart-outline w-6"
                        }, null, _parent3, _scopeId2));
                        _push4(ssrRenderComponent(_component_UnoIcon, {
                          style: dialogInfo.value.isCollection ? null : { display: "none" },
                          class: "i-ion-heart text-red-600 w-6"
                        }, null, _parent3, _scopeId2));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(_component_UnoIcon, {
                          class: "i-ion-ios-close-circle-outline text-2xl w-6 cursor-pointer",
                          onClick: closeDialog
                        }, null, _parent3, _scopeId2));
                        _push4(`</div></div>`);
                      } else {
                        _push4(`<!---->`);
                      }
                      _push4(`<div class="text-sm opacity-60"${_scopeId2}>${ssrInterpolate(dialogInfo.value.publishDate)}</div>`);
                      if (dialogInfo.value.content) {
                        _push4(`<div class="py-4"${_scopeId2}>${dialogInfo.value.content}</div>`);
                      } else {
                        _push4(`<!---->`);
                      }
                      _push4(`</div>`);
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "fixed top-0 left-0 w-full h-full z-20" }, [
                        createVNode("div", {
                          class: "absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50",
                          onClick: closeDialog
                        }, [
                          dialogLoading.value ? (openBlock(), createBlock(_component_UnoIcon, {
                            key: 0,
                            class: "i-eos-icons-loading absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                          })) : createCommentVNode("", true)
                        ]),
                        !dialogLoading.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "px-10 pb-8 max-w-[44em] w-11/12 absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-100/[0.15] shadow"
                        }, [
                          dialogInfo.value.title ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "bg-light-100 dark:bg-gray-800 sticky top-0 pt-7 pb-3 flex flex-wrap justify-between relative text-lg pl-[0.1em] tracking-widest font-bold"
                          }, [
                            createTextVNode(toDisplayString(dialogInfo.value.title) + " ", 1),
                            createVNode("div", { class: "flex items-center space-x-3" }, [
                              createVNode("div", {
                                class: "cursor-pointer flex items-center",
                                onClick: ($event) => collection(dialogInfo.value.id)
                              }, [
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ion-heart-outline w-6" }, null, 512), [
                                  [vShow, !dialogInfo.value.isCollection]
                                ]),
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ion-heart text-red-600 w-6" }, null, 512), [
                                  [vShow, dialogInfo.value.isCollection]
                                ])
                              ], 8, ["onClick"]),
                              createVNode(_component_UnoIcon, {
                                class: "i-ion-ios-close-circle-outline text-2xl w-6 cursor-pointer",
                                onClick: closeDialog
                              })
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "text-sm opacity-60" }, toDisplayString(dialogInfo.value.publishDate), 1),
                          dialogInfo.value.content ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "py-4",
                            innerHTML: dialogInfo.value.content
                          }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
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
                      createVNode("div", {
                        class: "absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50",
                        onClick: closeDialog
                      }, [
                        dialogLoading.value ? (openBlock(), createBlock(_component_UnoIcon, {
                          key: 0,
                          class: "i-eos-icons-loading absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                        })) : createCommentVNode("", true)
                      ]),
                      !dialogLoading.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "px-10 pb-8 max-w-[44em] w-11/12 absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-100/[0.15] shadow"
                      }, [
                        dialogInfo.value.title ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-light-100 dark:bg-gray-800 sticky top-0 pt-7 pb-3 flex flex-wrap justify-between relative text-lg pl-[0.1em] tracking-widest font-bold"
                        }, [
                          createTextVNode(toDisplayString(dialogInfo.value.title) + " ", 1),
                          createVNode("div", { class: "flex items-center space-x-3" }, [
                            createVNode("div", {
                              class: "cursor-pointer flex items-center",
                              onClick: ($event) => collection(dialogInfo.value.id)
                            }, [
                              withDirectives(createVNode(_component_UnoIcon, { class: "i-ion-heart-outline w-6" }, null, 512), [
                                [vShow, !dialogInfo.value.isCollection]
                              ]),
                              withDirectives(createVNode(_component_UnoIcon, { class: "i-ion-heart text-red-600 w-6" }, null, 512), [
                                [vShow, dialogInfo.value.isCollection]
                              ])
                            ], 8, ["onClick"]),
                            createVNode(_component_UnoIcon, {
                              class: "i-ion-ios-close-circle-outline text-2xl w-6 cursor-pointer",
                              onClick: closeDialog
                            })
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "text-sm opacity-60" }, toDisplayString(dialogInfo.value.publishDate), 1),
                        dialogInfo.value.content ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "py-4",
                          innerHTML: dialogInfo.value.content
                        }, null, 8, ["innerHTML"])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Tip/Row.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Row.37ad15d2.mjs.map
