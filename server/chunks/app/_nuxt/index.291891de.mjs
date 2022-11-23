import { _ as __nuxt_component_0, a as __nuxt_component_4, b as __nuxt_component_5 } from './index.589104b7.mjs';
import { _ as __nuxt_component_1 } from './Header.ef8d4112.mjs';
import { _ as _sfc_main$1 } from './Title.f755a0b5.mjs';
import { _ as _sfc_main$2 } from './Filter.cfc5b908.mjs';
import { _ as __nuxt_component_6 } from './Row.f546cdeb.mjs';
import { g as useHttpPost } from '../server.mjs';
import { defineComponent, withAsyncContext, ref, withCtx, createVNode, unref, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import './RowLoading.421390e6.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: videoNews } = ([__temp, __restore] = withAsyncContext(() => useHttpPost(
      "video-news-list",
      "/news/page",
      { body: { type: "video", size: 12 } }
    )), __temp = await __temp, __restore(), __temp);
    const loading = ref(false);
    const loadNews = async () => {
      var _a;
      loading.value = true;
      const page = videoNews.value.pagination.page;
      const size = videoNews.value.pagination.size;
      const { data } = await $fetch("/api/news/page", {
        method: "POST",
        body: { type: "video", size, page: page + 1 }
      });
      const list = (_a = data == null ? void 0 : data.list) != null ? _a : [];
      setTimeout(() => {
        var _a2;
        if (list.length) {
          videoNews.value.list.push(...list);
          videoNews.value.pagination = (_a2 = data.pagination) != null ? _a2 : videoNews.value.pagination;
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
      _push(ssrRenderComponent(_component_LayoutWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutHeader, { class: "z-10 sticky border-b bg-white border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UITitle, {
                    tag: "h1",
                    title: "\u5F71\u97F3\u65B0\u805E",
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
                      title: "\u5F71\u97F3\u65B0\u805E",
                      class: "capitalize"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ArticleFilter)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_LayoutBody, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutSection, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ArticleLoopRow, {
                          tag: "h3",
                          list: (_a = unref(videoNews).list) != null ? _a : [],
                          infinite: true,
                          loading: loading.value,
                          onLoad: loadNews
                        }, null, _parent4, _scopeId3));
                        if (unref(videoNews).pagination.total > unref(videoNews).pagination.size * unref(videoNews).pagination.page) {
                          _push4(`<div class="${ssrRenderClass([{ hidden: loading.value }, "block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"])}"${_scopeId3}><p${_scopeId3}>\u8F09\u5165\u66F4\u591A</p></div>`);
                        } else {
                          _push4(`<div class="text-center pt-8 text-xs font-bold tracking-widest opacity-50"${_scopeId3}> \u7121\u66F4\u591A\u8CC7\u6599... </div>`);
                        }
                      } else {
                        return [
                          createVNode(_component_ArticleLoopRow, {
                            tag: "h3",
                            list: (_b = unref(videoNews).list) != null ? _b : [],
                            infinite: true,
                            loading: loading.value,
                            onLoad: loadNews
                          }, null, 8, ["list", "loading"]),
                          unref(videoNews).pagination.total > unref(videoNews).pagination.size * unref(videoNews).pagination.page ? (openBlock(), createBlock("div", {
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
                          createVNode(_component_ArticleLoopRow, {
                            tag: "h3",
                            list: (_a = unref(videoNews).list) != null ? _a : [],
                            infinite: true,
                            loading: loading.value,
                            onLoad: loadNews
                          }, null, 8, ["list", "loading"]),
                          unref(videoNews).pagination.total > unref(videoNews).pagination.size * unref(videoNews).pagination.page ? (openBlock(), createBlock("div", {
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
              createVNode(_component_LayoutHeader, { class: "z-10 sticky border-b bg-white border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700" }, {
                default: withCtx(() => [
                  createVNode(_component_UITitle, {
                    tag: "h1",
                    title: "\u5F71\u97F3\u65B0\u805E",
                    class: "capitalize"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_ArticleFilter)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_LayoutBody, null, {
                default: withCtx(() => [
                  createVNode(_component_LayoutSection, null, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode(_component_ArticleLoopRow, {
                          tag: "h3",
                          list: (_a = unref(videoNews).list) != null ? _a : [],
                          infinite: true,
                          loading: loading.value,
                          onLoad: loadNews
                        }, null, 8, ["list", "loading"]),
                        unref(videoNews).pagination.total > unref(videoNews).pagination.size * unref(videoNews).pagination.page ? (openBlock(), createBlock("div", {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/video/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.291891de.mjs.map
