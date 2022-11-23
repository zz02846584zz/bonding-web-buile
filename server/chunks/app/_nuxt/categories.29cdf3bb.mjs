import { _ as __nuxt_component_0, a as __nuxt_component_4, b as __nuxt_component_5 } from './index.589104b7.mjs';
import { g as useHttpPost, z as _sfc_main$8, b as __nuxt_component_1 } from '../server.mjs';
import { defineComponent, withAsyncContext, computed, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "categories",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useHttpPost(
      "industry-categories",
      "/news/categories"
    )), __temp = await __temp, __restore(), __temp);
    const categoriesWithoutEmpty = computed(() => {
      var _a;
      return (_a = categories.value) == null ? void 0 : _a.filter((item) => item.news);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutWrapper = __nuxt_component_0;
      const _component_LayoutBody = __nuxt_component_4;
      const _component_LayoutSection = __nuxt_component_5;
      const _component_UIAnchor = _sfc_main$8;
      const _component_UnoIcon = __nuxt_component_1;
      _push(ssrRenderComponent(_component_LayoutWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutBody, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutSection, { class: "cma" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<ul${_scopeId3}><!--[-->`);
                        ssrRenderList(unref(categoriesWithoutEmpty), (category) => {
                          _push4(`<li${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_UIAnchor, {
                            to: `/news/category/${category.slug}`,
                            class: "flex items-center group hover:no-underline mb-4"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="${ssrRenderClass([{
                                  "text-white dark:text-white group-hover:bg-sky-500 bg-sky-500": _ctx.$route.params.categorySlug === category.slug,
                                  "text-slate-500 dark:text-gray-100 group-hover:bg-gray-200 bg-gray-100 dark:group-hover:bg-slate-600 dark:bg-slate-700": _ctx.$route.params.categorySlug !== category.slug
                                }, "flex items-center px-2 py-2 mr-4 duration-200 rounded-md shadow-sm ring-1 ring-slate-900/5 group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10"])}"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_UnoIcon, { class: "i-uil-apps text-xs" }, null, _parent5, _scopeId4));
                                _push5(`</div><span class="${ssrRenderClass([{
                                  "font-extrabold text-sky-500 dark:text-sky-400": _ctx.$route.params.slug === category.slug
                                }, "text-sm font-semibold capitalize duration-200"])}"${_scopeId4}>${ssrInterpolate(category == null ? void 0 : category.name)}</span>`);
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
                          }, _parent4, _scopeId3));
                          _push4(`</li>`);
                        });
                        _push4(`<!--]--></ul>`);
                      } else {
                        return [
                          createVNode("ul", null, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(categoriesWithoutEmpty), (category) => {
                              return openBlock(), createBlock("li", {
                                key: category.slug
                              }, [
                                createVNode(_component_UIAnchor, {
                                  to: `/news/category/${category.slug}`,
                                  class: "flex items-center group hover:no-underline mb-4"
                                }, {
                                  default: withCtx(() => [
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
                                  ]),
                                  _: 2
                                }, 1032, ["to"])
                              ]);
                            }), 128))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutSection, { class: "cma" }, {
                      default: withCtx(() => [
                        createVNode("ul", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(categoriesWithoutEmpty), (category) => {
                            return openBlock(), createBlock("li", {
                              key: category.slug
                            }, [
                              createVNode(_component_UIAnchor, {
                                to: `/news/category/${category.slug}`,
                                class: "flex items-center group hover:no-underline mb-4"
                              }, {
                                default: withCtx(() => [
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
                                ]),
                                _: 2
                              }, 1032, ["to"])
                            ]);
                          }), 128))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutBody, null, {
                default: withCtx(() => [
                  createVNode(_component_LayoutSection, { class: "cma" }, {
                    default: withCtx(() => [
                      createVNode("ul", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(categoriesWithoutEmpty), (category) => {
                          return openBlock(), createBlock("li", {
                            key: category.slug
                          }, [
                            createVNode(_component_UIAnchor, {
                              to: `/news/category/${category.slug}`,
                              class: "flex items-center group hover:no-underline mb-4"
                            }, {
                              default: withCtx(() => [
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
                              ]),
                              _: 2
                            }, 1032, ["to"])
                          ]);
                        }), 128))
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=categories.29cdf3bb.mjs.map
