import { _ as __nuxt_component_0, c as _sfc_main$1, a as __nuxt_component_4, b as __nuxt_component_5 } from './Title.1d5908b3.mjs';
import { _ as __nuxt_component_1 } from './Header.3034e057.mjs';
import { _ as _sfc_main$2 } from './Filter.4f5e2cf5.mjs';
import { _ as __nuxt_component_6 } from './Row.653cd163.mjs';
import { k as useRoute, g as useHttpPost, d as __nuxt_component_0$1, b as __nuxt_component_1$1 } from '../server.mjs';
import { defineComponent, ref, withAsyncContext, withCtx, createVNode, unref, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import './RowLoading.1826d6cd.mjs';
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
  __name: "[categorySlug]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const route = useRoute();
    const { categorySlug } = route.params;
    const category = ref(null);
    const { data: categoryData } = ([__temp, __restore] = withAsyncContext(() => useHttpPost(
      `category-slug-${categorySlug}`,
      "/category/info",
      { async: true, body: { slug: categorySlug } }
    )), __temp = await __temp, __restore(), __temp);
    category.value = categoryData.value.data;
    const videoNews = ref([]);
    const { data: videoNewsData } = ([__temp, __restore] = withAsyncContext(() => useHttpPost(
      `category-video-news-${categorySlug}`,
      "/news/list",
      { async: true, body: { category: categorySlug, type: "video", size: 8 } }
    )), __temp = await __temp, __restore(), __temp);
    videoNews.value = (_a = videoNewsData.value) == null ? void 0 : _a.data;
    const newsPage = ref();
    const { data: newsPageData } = ([__temp, __restore] = withAsyncContext(() => useHttpPost(
      `category-normal-news-${categorySlug}`,
      "/news/page",
      { async: true, body: { category: categorySlug, type: "normal", size: 8 } }
    )), __temp = await __temp, __restore(), __temp);
    newsPage.value = newsPageData.value.data;
    const loading = ref(false);
    const loadNews = async () => {
      var _a2;
      loading.value = true;
      const page = newsPage.value.pagination.page;
      const size = newsPage.value.pagination.size;
      const { data } = await $fetch("/api/news/page", {
        method: "POST",
        body: { category: categorySlug, type: "normal", size, page: page + 1 }
      });
      const list = (_a2 = data == null ? void 0 : data.list) != null ? _a2 : [];
      setTimeout(() => {
        var _a3;
        if (list && list.length) {
          newsPage.value.list.push(...list);
          newsPage.value.pagination = (_a3 = data.pagination) != null ? _a3 : newsPage.value.pagination;
        }
        loading.value = false;
      }, 300);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutWrapper = __nuxt_component_0;
      const _component_LayoutHeader = __nuxt_component_1;
      const _component_UITitle = _sfc_main$1;
      const _component_ArticleFilter = _sfc_main$2;
      const _component_LayoutBody = __nuxt_component_4;
      const _component_LayoutSection = __nuxt_component_5;
      const _component_ArticleLoopRow = __nuxt_component_6;
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_UnoIcon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_LayoutWrapper, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutHeader, { class: "z-10 sticky border-b bg-white border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UITitle, {
                    tag: "h1",
                    title: (_a2 = category.value) == null ? void 0 : _a2.name,
                    class: "capitalize"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ArticleFilter, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ArticleFilter)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UITitle, {
                      tag: "h1",
                      title: (_b = category.value) == null ? void 0 : _b.name,
                      class: "capitalize"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ArticleFilter)
                      ]),
                      _: 1
                    }, 8, ["title"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_LayoutBody, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (videoNews.value && videoNews.value.length) {
                    _push3(ssrRenderComponent(_component_LayoutSection, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UITitle, {
                            tag: "h2",
                            title: "\u5F71\u97F3\u65B0\u805E",
                            class: "mb-2 capitalize"
                          }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_ArticleLoopRow, {
                            tag: "h3",
                            list: videoNews.value,
                            gap: 3
                          }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_nuxt_link, {
                            to: `/news/video/${unref(categorySlug)}`,
                            class: "dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<span class="pr-1 align-middle"${_scopeId4}>\u770B\u66F4\u591A </span>`);
                                _push5(ssrRenderComponent(_component_UnoIcon, { class: "i-uil-angle-double-right text-lg align-middle" }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode("span", { class: "pr-1 align-middle" }, "\u770B\u66F4\u591A "),
                                  createVNode(_component_UnoIcon, { class: "i-uil-angle-double-right text-lg align-middle" })
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
                              class: "mb-2 capitalize"
                            }),
                            createVNode(_component_ArticleLoopRow, {
                              tag: "h3",
                              list: videoNews.value,
                              gap: 3
                            }, null, 8, ["list"]),
                            createVNode(_component_nuxt_link, {
                              to: `/news/video/${unref(categorySlug)}`,
                              class: "dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "pr-1 align-middle" }, "\u770B\u66F4\u591A "),
                                createVNode(_component_UnoIcon, { class: "i-uil-angle-double-right text-lg align-middle" })
                              ]),
                              _: 1
                            }, 8, ["to"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (newsPage.value) {
                    _push3(ssrRenderComponent(_component_LayoutSection, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        var _a2, _b;
                        if (_push4) {
                          if (newsPage.value.length) {
                            _push4(ssrRenderComponent(_component_UITitle, {
                              title: "\u66F4\u591A\u65B0\u805E",
                              class: "mb-2"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(ssrRenderComponent(_component_ArticleLoopRow, {
                            tag: "h3",
                            list: (_a2 = newsPage.value.list) != null ? _a2 : [],
                            infinite: true,
                            loading: loading.value,
                            onLoad: loadNews
                          }, null, _parent4, _scopeId3));
                          if (newsPage.value.pagination.total > newsPage.value.pagination.size * newsPage.value.pagination.page) {
                            _push4(`<div class="${ssrRenderClass([{ hidden: loading.value }, "block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"])}"${_scopeId3}><p${_scopeId3}>\u8F09\u5165\u66F4\u591A</p></div>`);
                          } else {
                            _push4(`<div class="text-center pt-8 text-xs font-bold tracking-widest opacity-50"${_scopeId3}> \u7121\u66F4\u591A\u8CC7\u6599... </div>`);
                          }
                        } else {
                          return [
                            newsPage.value.length ? (openBlock(), createBlock(_component_UITitle, {
                              key: 0,
                              title: "\u66F4\u591A\u65B0\u805E",
                              class: "mb-2"
                            })) : createCommentVNode("", true),
                            createVNode(_component_ArticleLoopRow, {
                              tag: "h3",
                              list: (_b = newsPage.value.list) != null ? _b : [],
                              infinite: true,
                              loading: loading.value,
                              onLoad: loadNews
                            }, null, 8, ["list", "loading"]),
                            newsPage.value.pagination.total > newsPage.value.pagination.size * newsPage.value.pagination.page ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: ["block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer", { hidden: loading.value }],
                              onClick: ($event) => loadNews()
                            }, [
                              createVNode("p", null, "\u8F09\u5165\u66F4\u591A")
                            ], 10, ["onClick"])) : (openBlock(), createBlock("div", {
                              key: 2,
                              class: "text-center pt-8 text-xs font-bold tracking-widest opacity-50"
                            }, " \u7121\u66F4\u591A\u8CC7\u6599... "))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    videoNews.value && videoNews.value.length ? (openBlock(), createBlock(_component_LayoutSection, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(_component_UITitle, {
                          tag: "h2",
                          title: "\u5F71\u97F3\u65B0\u805E",
                          class: "mb-2 capitalize"
                        }),
                        createVNode(_component_ArticleLoopRow, {
                          tag: "h3",
                          list: videoNews.value,
                          gap: 3
                        }, null, 8, ["list"]),
                        createVNode(_component_nuxt_link, {
                          to: `/news/video/${unref(categorySlug)}`,
                          class: "dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "pr-1 align-middle" }, "\u770B\u66F4\u591A "),
                            createVNode(_component_UnoIcon, { class: "i-uil-angle-double-right text-lg align-middle" })
                          ]),
                          _: 1
                        }, 8, ["to"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    newsPage.value ? (openBlock(), createBlock(_component_LayoutSection, { key: 1 }, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          newsPage.value.length ? (openBlock(), createBlock(_component_UITitle, {
                            key: 0,
                            title: "\u66F4\u591A\u65B0\u805E",
                            class: "mb-2"
                          })) : createCommentVNode("", true),
                          createVNode(_component_ArticleLoopRow, {
                            tag: "h3",
                            list: (_a2 = newsPage.value.list) != null ? _a2 : [],
                            infinite: true,
                            loading: loading.value,
                            onLoad: loadNews
                          }, null, 8, ["list", "loading"]),
                          newsPage.value.pagination.total > newsPage.value.pagination.size * newsPage.value.pagination.page ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: ["block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer", { hidden: loading.value }],
                            onClick: ($event) => loadNews()
                          }, [
                            createVNode("p", null, "\u8F09\u5165\u66F4\u591A")
                          ], 10, ["onClick"])) : (openBlock(), createBlock("div", {
                            key: 2,
                            class: "text-center pt-8 text-xs font-bold tracking-widest opacity-50"
                          }, " \u7121\u66F4\u591A\u8CC7\u6599... "))
                        ];
                      }),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutHeader, { class: "z-10 sticky border-b bg-white border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700" }, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(_component_UITitle, {
                      tag: "h1",
                      title: (_a2 = category.value) == null ? void 0 : _a2.name,
                      class: "capitalize"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ArticleFilter)
                      ]),
                      _: 1
                    }, 8, ["title"])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_LayoutBody, null, {
                default: withCtx(() => [
                  videoNews.value && videoNews.value.length ? (openBlock(), createBlock(_component_LayoutSection, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(_component_UITitle, {
                        tag: "h2",
                        title: "\u5F71\u97F3\u65B0\u805E",
                        class: "mb-2 capitalize"
                      }),
                      createVNode(_component_ArticleLoopRow, {
                        tag: "h3",
                        list: videoNews.value,
                        gap: 3
                      }, null, 8, ["list"]),
                      createVNode(_component_nuxt_link, {
                        to: `/news/video/${unref(categorySlug)}`,
                        class: "dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "pr-1 align-middle" }, "\u770B\u66F4\u591A "),
                          createVNode(_component_UnoIcon, { class: "i-uil-angle-double-right text-lg align-middle" })
                        ]),
                        _: 1
                      }, 8, ["to"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  newsPage.value ? (openBlock(), createBlock(_component_LayoutSection, { key: 1 }, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        newsPage.value.length ? (openBlock(), createBlock(_component_UITitle, {
                          key: 0,
                          title: "\u66F4\u591A\u65B0\u805E",
                          class: "mb-2"
                        })) : createCommentVNode("", true),
                        createVNode(_component_ArticleLoopRow, {
                          tag: "h3",
                          list: (_a2 = newsPage.value.list) != null ? _a2 : [],
                          infinite: true,
                          loading: loading.value,
                          onLoad: loadNews
                        }, null, 8, ["list", "loading"]),
                        newsPage.value.pagination.total > newsPage.value.pagination.size * newsPage.value.pagination.page ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: ["block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer", { hidden: loading.value }],
                          onClick: ($event) => loadNews()
                        }, [
                          createVNode("p", null, "\u8F09\u5165\u66F4\u591A")
                        ], 10, ["onClick"])) : (openBlock(), createBlock("div", {
                          key: 2,
                          class: "text-center pt-8 text-xs font-bold tracking-widest opacity-50"
                        }, " \u7121\u66F4\u591A\u8CC7\u6599... "))
                      ];
                    }),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/category/[categorySlug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_categorySlug_.8d353e50.mjs.map
