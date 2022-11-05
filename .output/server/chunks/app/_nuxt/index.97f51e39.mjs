import { e as useHttpPost, g as __nuxt_component_0, h as __nuxt_component_4$2, i as __nuxt_component_5$2, j as _sfc_main$x, k as __nuxt_component_4$1, l as _sfc_main$v, m as __nuxt_component_6$1, n as __nuxt_component_0$2, p as _sfc_main$r } from '../server.mjs';
import { defineComponent, withAsyncContext, ref, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import 'defu';
import 'vue-router';
import 'swiper/vue';
import 'swiper';
import 'store';
import '@vue/runtime-core';
import 'cookie-es';
import 'ohash';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: topNews } = ([__temp, __restore] = withAsyncContext(() => useHttpPost("hot-articles", "/news/list", {
      body: { isTop: true }
    })), __temp = await __temp, __restore(), __temp);
    const { data: hotNews } = ([__temp, __restore] = withAsyncContext(() => useHttpPost("top-articles", "/news/list", {
      body: { isHot: true }
    })), __temp = await __temp, __restore(), __temp);
    const { data: videoNews } = ([__temp, __restore] = withAsyncContext(() => useHttpPost(
      "video-articles",
      "/news/list",
      { body: { type: "video", size: 8 } }
    )), __temp = await __temp, __restore(), __temp);
    const newsPage = ref();
    const { data: newsPageData } = ([__temp, __restore] = withAsyncContext(() => useHttpPost(
      "more-articles",
      "/news/page",
      { async: true, body: { type: "normal", size: 8 } }
    )), __temp = await __temp, __restore(), __temp);
    newsPage.value = newsPageData.value.data;
    const loading = ref(false);
    const loadNews = async () => {
      var _a, _b, _c;
      loading.value = true;
      const page = (_a = newsPage.value) == null ? void 0 : _a.pagination.page;
      const size = (_b = newsPage.value) == null ? void 0 : _b.pagination.size;
      const { data } = await $fetch("/api/news/page", {
        method: "POST",
        body: { type: "normal", size, page: page + 1 }
      });
      const list = (_c = data == null ? void 0 : data.list) != null ? _c : [];
      setTimeout(() => {
        var _a2, _b2, _c2;
        if (list.length) {
          (_a2 = newsPage.value) == null ? void 0 : _a2.list.push(...list);
          newsPage.value.pagination = (_c2 = data == null ? void 0 : data.pagination) != null ? _c2 : (_b2 = newsPage.value) == null ? void 0 : _b2.pagination;
        }
        loading.value = false;
      }, 800);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutWrapper = __nuxt_component_0;
      const _component_LayoutBody = __nuxt_component_4$2;
      const _component_LayoutSection = __nuxt_component_5$2;
      const _component_UITitle = _sfc_main$x;
      const _component_ArticleLoopSlider = __nuxt_component_4$1;
      const _component_ArticleLoopHot = _sfc_main$v;
      const _component_ArticleLoopRow = __nuxt_component_6$1;
      const _component_nuxt_link = __nuxt_component_0$2;
      const _component_ArticleFilter = _sfc_main$r;
      _push(ssrRenderComponent(_component_LayoutWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutBody, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutSection, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(`<div class="flex flex-wrap"${_scopeId3}><div class="w-full mb-5 2xl:mb-0 2xl:mr-4 2xl:w-2/3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UITitle, {
                          title: "\u4ECA\u65E5\u7126\u9EDE",
                          class: "mb-2 capitalize"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ArticleLoopSlider, {
                          list: unref(topNews),
                          pagination: true,
                          navigation: true,
                          loop: true
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div class="relative flex flex-col w-full 2xl:flex-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UITitle, {
                          title: "\u767C\u71D2\u65B0\u805E",
                          class: "mb-2 capitalize"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="relative flex-1 bg-gray-100 rounded-md hot-list dark:bg-gray-800"${_scopeId3}><div class="top-0 left-0 w-full h-full p-4 overflow-y-auto 2xl:absolute"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_ArticleLoopHot, {
                          list: (_a = unref(hotNews)) != null ? _a : [],
                          pagination: true,
                          "page-size": 1
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-wrap" }, [
                            createVNode("div", { class: "w-full mb-5 2xl:mb-0 2xl:mr-4 2xl:w-2/3" }, [
                              createVNode(_component_UITitle, {
                                title: "\u4ECA\u65E5\u7126\u9EDE",
                                class: "mb-2 capitalize"
                              }),
                              createVNode(_component_ArticleLoopSlider, {
                                list: unref(topNews),
                                pagination: true,
                                navigation: true,
                                loop: true
                              }, null, 8, ["list"])
                            ]),
                            createVNode("div", { class: "relative flex flex-col w-full 2xl:flex-1" }, [
                              createVNode(_component_UITitle, {
                                title: "\u767C\u71D2\u65B0\u805E",
                                class: "mb-2 capitalize"
                              }),
                              createVNode("div", { class: "relative flex-1 bg-gray-100 rounded-md hot-list dark:bg-gray-800" }, [
                                createVNode("div", { class: "top-0 left-0 w-full h-full p-4 overflow-y-auto 2xl:absolute" }, [
                                  createVNode(_component_ArticleLoopHot, {
                                    list: (_b = unref(hotNews)) != null ? _b : [],
                                    pagination: true,
                                    "page-size": 1
                                  }, null, 8, ["list"])
                                ])
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(videoNews)) {
                    _push3(ssrRenderComponent(_component_LayoutSection, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a, _b;
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UITitle, {
                            tag: "h2",
                            title: "\u5F71\u97F3\u65B0\u805E",
                            class: "mb-2 pt-0 capitalize"
                          }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_ArticleLoopRow, {
                            tag: "h3",
                            list: (_a = unref(videoNews)) != null ? _a : [],
                            gap: 3
                          }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_nuxt_link, {
                            to: "/news/type/video",
                            class: "dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<p${_scopeId4}>\u770B\u66F4\u591A &gt;&gt;</p>`);
                              } else {
                                return [
                                  createVNode("p", null, "\u770B\u66F4\u591A >>")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UITitle, {
                              tag: "h2",
                              title: "\u5F71\u97F3\u65B0\u805E",
                              class: "mb-2 pt-0 capitalize"
                            }),
                            createVNode(_component_ArticleLoopRow, {
                              tag: "h3",
                              list: (_b = unref(videoNews)) != null ? _b : [],
                              gap: 3
                            }, null, 8, ["list"]),
                            createVNode(_component_nuxt_link, {
                              to: "/news/type/video",
                              class: "dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", null, "\u770B\u66F4\u591A >>")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_LayoutSection, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UITitle, {
                          title: "\u66F4\u591A\u5167\u5BB9",
                          filter: [],
                          class: "mb-2 pt-0"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ArticleFilter, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_ArticleFilter)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ArticleLoopRow, {
                          tag: "h3",
                          list: (_b = (_a = newsPage.value) == null ? void 0 : _a.list) != null ? _b : [],
                          infinite: true,
                          loading: loading.value,
                          onLoad: loadNews
                        }, null, _parent4, _scopeId3));
                        if (((_d = (_c = newsPage.value) == null ? void 0 : _c.pagination) == null ? void 0 : _d.total) > ((_f = (_e = newsPage.value) == null ? void 0 : _e.pagination) == null ? void 0 : _f.size) * ((_h = (_g = newsPage.value) == null ? void 0 : _g.pagination) == null ? void 0 : _h.page)) {
                          _push4(`<div class="${ssrRenderClass([{ hidden: loading.value }, "block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"])}"${_scopeId3}><p${_scopeId3}>\u8F09\u5165\u66F4\u591A</p></div>`);
                        } else {
                          _push4(`<div class="text-center pt-8 text-xs font-bold tracking-widest opacity-50"${_scopeId3}> \u7121\u66F4\u591A\u8CC7\u6599... </div>`);
                        }
                      } else {
                        return [
                          createVNode(_component_UITitle, {
                            title: "\u66F4\u591A\u5167\u5BB9",
                            filter: [],
                            class: "mb-2 pt-0"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_ArticleFilter)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ArticleLoopRow, {
                            tag: "h3",
                            list: (_j = (_i = newsPage.value) == null ? void 0 : _i.list) != null ? _j : [],
                            infinite: true,
                            loading: loading.value,
                            onLoad: loadNews
                          }, null, 8, ["list", "loading"]),
                          ((_l = (_k = newsPage.value) == null ? void 0 : _k.pagination) == null ? void 0 : _l.total) > ((_n = (_m = newsPage.value) == null ? void 0 : _m.pagination) == null ? void 0 : _n.size) * ((_p = (_o = newsPage.value) == null ? void 0 : _o.pagination) == null ? void 0 : _p.page) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: ["block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer", { hidden: loading.value }],
                            onClick: ($event) => loadNews()
                          }, [
                            createVNode("p", null, "\u8F09\u5165\u66F4\u591A")
                          ], 10, ["onClick"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center pt-8 text-xs font-bold tracking-widest opacity-50"
                          }, " \u7121\u66F4\u591A\u8CC7\u6599... "))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutSection, null, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode("div", { class: "flex flex-wrap" }, [
                            createVNode("div", { class: "w-full mb-5 2xl:mb-0 2xl:mr-4 2xl:w-2/3" }, [
                              createVNode(_component_UITitle, {
                                title: "\u4ECA\u65E5\u7126\u9EDE",
                                class: "mb-2 capitalize"
                              }),
                              createVNode(_component_ArticleLoopSlider, {
                                list: unref(topNews),
                                pagination: true,
                                navigation: true,
                                loop: true
                              }, null, 8, ["list"])
                            ]),
                            createVNode("div", { class: "relative flex flex-col w-full 2xl:flex-1" }, [
                              createVNode(_component_UITitle, {
                                title: "\u767C\u71D2\u65B0\u805E",
                                class: "mb-2 capitalize"
                              }),
                              createVNode("div", { class: "relative flex-1 bg-gray-100 rounded-md hot-list dark:bg-gray-800" }, [
                                createVNode("div", { class: "top-0 left-0 w-full h-full p-4 overflow-y-auto 2xl:absolute" }, [
                                  createVNode(_component_ArticleLoopHot, {
                                    list: (_a = unref(hotNews)) != null ? _a : [],
                                    pagination: true,
                                    "page-size": 1
                                  }, null, 8, ["list"])
                                ])
                              ])
                            ])
                          ])
                        ];
                      }),
                      _: 1
                    }),
                    unref(videoNews) ? (openBlock(), createBlock(_component_LayoutSection, { key: 0 }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode(_component_UITitle, {
                            tag: "h2",
                            title: "\u5F71\u97F3\u65B0\u805E",
                            class: "mb-2 pt-0 capitalize"
                          }),
                          createVNode(_component_ArticleLoopRow, {
                            tag: "h3",
                            list: (_a = unref(videoNews)) != null ? _a : [],
                            gap: 3
                          }, null, 8, ["list"]),
                          createVNode(_component_nuxt_link, {
                            to: "/news/type/video",
                            class: "dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", null, "\u770B\u66F4\u591A >>")
                            ]),
                            _: 1
                          })
                        ];
                      }),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_LayoutSection, null, {
                      default: withCtx(() => {
                        var _a, _b, _c, _d, _e, _f, _g, _h;
                        return [
                          createVNode(_component_UITitle, {
                            title: "\u66F4\u591A\u5167\u5BB9",
                            filter: [],
                            class: "mb-2 pt-0"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_ArticleFilter)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_ArticleLoopRow, {
                            tag: "h3",
                            list: (_b = (_a = newsPage.value) == null ? void 0 : _a.list) != null ? _b : [],
                            infinite: true,
                            loading: loading.value,
                            onLoad: loadNews
                          }, null, 8, ["list", "loading"]),
                          ((_d = (_c = newsPage.value) == null ? void 0 : _c.pagination) == null ? void 0 : _d.total) > ((_f = (_e = newsPage.value) == null ? void 0 : _e.pagination) == null ? void 0 : _f.size) * ((_h = (_g = newsPage.value) == null ? void 0 : _g.pagination) == null ? void 0 : _h.page) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: ["block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer", { hidden: loading.value }],
                            onClick: ($event) => loadNews()
                          }, [
                            createVNode("p", null, "\u8F09\u5165\u66F4\u591A")
                          ], 10, ["onClick"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center pt-8 text-xs font-bold tracking-widest opacity-50"
                          }, " \u7121\u66F4\u591A\u8CC7\u6599... "))
                        ];
                      }),
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
                  createVNode(_component_LayoutSection, null, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode("div", { class: "flex flex-wrap" }, [
                          createVNode("div", { class: "w-full mb-5 2xl:mb-0 2xl:mr-4 2xl:w-2/3" }, [
                            createVNode(_component_UITitle, {
                              title: "\u4ECA\u65E5\u7126\u9EDE",
                              class: "mb-2 capitalize"
                            }),
                            createVNode(_component_ArticleLoopSlider, {
                              list: unref(topNews),
                              pagination: true,
                              navigation: true,
                              loop: true
                            }, null, 8, ["list"])
                          ]),
                          createVNode("div", { class: "relative flex flex-col w-full 2xl:flex-1" }, [
                            createVNode(_component_UITitle, {
                              title: "\u767C\u71D2\u65B0\u805E",
                              class: "mb-2 capitalize"
                            }),
                            createVNode("div", { class: "relative flex-1 bg-gray-100 rounded-md hot-list dark:bg-gray-800" }, [
                              createVNode("div", { class: "top-0 left-0 w-full h-full p-4 overflow-y-auto 2xl:absolute" }, [
                                createVNode(_component_ArticleLoopHot, {
                                  list: (_a = unref(hotNews)) != null ? _a : [],
                                  pagination: true,
                                  "page-size": 1
                                }, null, 8, ["list"])
                              ])
                            ])
                          ])
                        ])
                      ];
                    }),
                    _: 1
                  }),
                  unref(videoNews) ? (openBlock(), createBlock(_component_LayoutSection, { key: 0 }, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode(_component_UITitle, {
                          tag: "h2",
                          title: "\u5F71\u97F3\u65B0\u805E",
                          class: "mb-2 pt-0 capitalize"
                        }),
                        createVNode(_component_ArticleLoopRow, {
                          tag: "h3",
                          list: (_a = unref(videoNews)) != null ? _a : [],
                          gap: 3
                        }, null, 8, ["list"]),
                        createVNode(_component_nuxt_link, {
                          to: "/news/type/video",
                          class: "dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                        }, {
                          default: withCtx(() => [
                            createVNode("p", null, "\u770B\u66F4\u591A >>")
                          ]),
                          _: 1
                        })
                      ];
                    }),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_component_LayoutSection, null, {
                    default: withCtx(() => {
                      var _a, _b, _c, _d, _e, _f, _g, _h;
                      return [
                        createVNode(_component_UITitle, {
                          title: "\u66F4\u591A\u5167\u5BB9",
                          filter: [],
                          class: "mb-2 pt-0"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_ArticleFilter)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_ArticleLoopRow, {
                          tag: "h3",
                          list: (_b = (_a = newsPage.value) == null ? void 0 : _a.list) != null ? _b : [],
                          infinite: true,
                          loading: loading.value,
                          onLoad: loadNews
                        }, null, 8, ["list", "loading"]),
                        ((_d = (_c = newsPage.value) == null ? void 0 : _c.pagination) == null ? void 0 : _d.total) > ((_f = (_e = newsPage.value) == null ? void 0 : _e.pagination) == null ? void 0 : _f.size) * ((_h = (_g = newsPage.value) == null ? void 0 : _g.pagination) == null ? void 0 : _h.page) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: ["block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer", { hidden: loading.value }],
                          onClick: ($event) => loadNews()
                        }, [
                          createVNode("p", null, "\u8F09\u5165\u66F4\u591A")
                        ], 10, ["onClick"])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center pt-8 text-xs font-bold tracking-widest opacity-50"
                        }, " \u7121\u66F4\u591A\u8CC7\u6599... "))
                      ];
                    }),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.97f51e39.mjs.map
