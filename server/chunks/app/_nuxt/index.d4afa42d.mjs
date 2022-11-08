import { _ as __nuxt_component_0, a as __nuxt_component_4$1, b as __nuxt_component_5, c as _sfc_main$3 } from './Title.a62f87bb.mjs';
import { g as useHttpPost, d as __nuxt_component_0$1, _ as _export_sfc, b as __nuxt_component_1 } from '../server.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';
import { defineComponent, withAsyncContext, ref, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext, mergeProps, toDisplayString, resolveComponent, Fragment, renderList } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_6 } from './Row.325748e9.mjs';
import { _ as _sfc_main$4 } from './Filter.e7c77c8a.mjs';
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
import 'store';
import 'ohash';
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
import './RowLoading.70ea7e50.mjs';

const _sfc_main$2 = {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      ArticleType: {
        normal: "\u4E00\u822C\u65B0\u805E",
        video: "\u5F71\u97F3\u65B0\u805E"
      },
      pagination: {
        clickable: true
      },
      modules: [Pagination]
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Swiper = resolveComponent("Swiper");
  const _component_SwiperSlide = resolveComponent("SwiperSlide");
  const _component_nuxt_link = __nuxt_component_0$1;
  if ($props.list.length) {
    _push(ssrRenderComponent(_component_Swiper, mergeProps({
      "space-between": 20,
      pagination: $setup.pagination,
      modules: $setup.modules,
      class: "news-swiper pb-[1.7em]"
    }, _attrs), {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<!--[-->`);
          ssrRenderList($props.list, (slide) => {
            _push2(ssrRenderComponent(_component_SwiperSlide, {
              key: slide.id,
              class: "rounded-md overflow-hidden"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(`<div class="absolute top-0 left-0 w-full h-full"${_scopeId2}><img${ssrRenderAttr("src", slide.thumbnail)} class="object-cover w-full h-full"${_scopeId2}></div><div class="flex flex-wrap content-end absolute bottom-0 left-0 w-full px-4 h-1/3 pb-7 md:pb-5 lg:pb-7 lg:px-6 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/95"${_scopeId2}><div class="flex items-center w-full pb-1 md:pb-3 text-xs space-x-1 md:space-x-3 text-white"${_scopeId2}><div class="w-fit h-6 leading-6 px-2 rounded bg-green-500"${_scopeId2}>${ssrInterpolate($setup.ArticleType[slide.type])}</div><!--[-->`);
                  ssrRenderList((_a = slide.categories) == null ? void 0 : _a.split(","), (item, index) => {
                    _push3(`<div class="w-fit h-6 leading-6 px-2 rounded bg-blue-500"${_scopeId2}>${ssrInterpolate(item)}</div>`);
                  });
                  _push3(`<!--]--></div><h3 class="text-sm md:text-xl font-bold tracking-widest text-white text-shadow-lg"${_scopeId2}>${ssrInterpolate(slide.title)}</h3></div>`);
                  _push3(ssrRenderComponent(_component_nuxt_link, {
                    to: `/news/article/${slide.slug}`,
                    class: "absolute top-0 left-0 w-full h-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "absolute top-0 left-0 w-full h-full" }, [
                      createVNode("img", {
                        src: slide.thumbnail,
                        class: "object-cover w-full h-full"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "flex flex-wrap content-end absolute bottom-0 left-0 w-full px-4 h-1/3 pb-7 md:pb-5 lg:pb-7 lg:px-6 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/95" }, [
                      createVNode("div", { class: "flex items-center w-full pb-1 md:pb-3 text-xs space-x-1 md:space-x-3 text-white" }, [
                        createVNode("div", { class: "w-fit h-6 leading-6 px-2 rounded bg-green-500" }, toDisplayString($setup.ArticleType[slide.type]), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList((_b = slide.categories) == null ? void 0 : _b.split(","), (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "w-fit h-6 leading-6 px-2 rounded bg-blue-500"
                          }, toDisplayString(item), 1);
                        }), 128))
                      ]),
                      createVNode("h3", { class: "text-sm md:text-xl font-bold tracking-widest text-white text-shadow-lg" }, toDisplayString(slide.title), 1)
                    ]),
                    createVNode(_component_nuxt_link, {
                      to: `/news/article/${slide.slug}`,
                      class: "absolute top-0 left-0 w-full h-full"
                    }, null, 8, ["to"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          });
          _push2(`<!--]-->`);
        } else {
          return [
            (openBlock(true), createBlock(Fragment, null, renderList($props.list, (slide) => {
              return openBlock(), createBlock(_component_SwiperSlide, {
                key: slide.id,
                class: "rounded-md overflow-hidden"
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode("div", { class: "absolute top-0 left-0 w-full h-full" }, [
                      createVNode("img", {
                        src: slide.thumbnail,
                        class: "object-cover w-full h-full"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", { class: "flex flex-wrap content-end absolute bottom-0 left-0 w-full px-4 h-1/3 pb-7 md:pb-5 lg:pb-7 lg:px-6 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/95" }, [
                      createVNode("div", { class: "flex items-center w-full pb-1 md:pb-3 text-xs space-x-1 md:space-x-3 text-white" }, [
                        createVNode("div", { class: "w-fit h-6 leading-6 px-2 rounded bg-green-500" }, toDisplayString($setup.ArticleType[slide.type]), 1),
                        (openBlock(true), createBlock(Fragment, null, renderList((_a = slide.categories) == null ? void 0 : _a.split(","), (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "w-fit h-6 leading-6 px-2 rounded bg-blue-500"
                          }, toDisplayString(item), 1);
                        }), 128))
                      ]),
                      createVNode("h3", { class: "text-sm md:text-xl font-bold tracking-widest text-white text-shadow-lg" }, toDisplayString(slide.title), 1)
                    ]),
                    createVNode(_component_nuxt_link, {
                      to: `/news/article/${slide.slug}`,
                      class: "absolute top-0 left-0 w-full h-full"
                    }, null, 8, ["to"])
                  ];
                }),
                _: 2
              }, 1024);
            }), 128))
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Loop/Slider.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "Hot",
  __ssrInlineRender: true,
  props: {
    list: {
      type: Array,
      default: () => []
    },
    infinite: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_UnoIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid py-1 grid-rows-3 lg:gap-4 lg:grid-cols-2 2xl:block" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.list, (article, index) => {
        _push(ssrRenderComponent(_component_nuxt_link, {
          key: article.id,
          to: `/news/article/${article.slug}`,
          class: [
            "flex border-gray-200 dark:border-gray-700 2xl:mb-4 lt-lg:px-1 last:mb-0 last:border-0 last:pb-0",
            __props.list.length - 2 <= index ? "2xl:pb-4 2xl:border-b-1 lt-lg:mb-3 lt-lg:pb-3 lt-lg:border-b-1 last-pb-0 last-mb-0 last-border-b-0" : "border-b-1 pb-4 lg:pb-3 2xl:pb-4 lt-lg:mb-4"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d;
            if (_push2) {
              _push2(`<div class="flex flex-wrap w-full"${_scopeId}><div class="relative w-20 h-18 mr-4"${_scopeId}><img${ssrRenderAttr("src", article.thumbnail)} class="absolute object-cover w-full h-full rounded-sm"${_scopeId}></div><div class="flex flex-col content-between flex-1"${_scopeId}><h3 class="text-base font-bold ellipsis"${_scopeId}>${ssrInterpolate(article.title)}</h3><div class="flex flex-wrap justify-between w-full pt-1 mt-auto text-xs text-gray-600 dark:text-gray-400"${_scopeId}><div class="flex justify-between w-full mb-1" itemprop="author"${_scopeId}><p${_scopeId}>${ssrInterpolate(article.author)}</p><p${_scopeId}>${ssrInterpolate(article.categories)}</p></div><div class="flex flex-wrap w-full"${_scopeId}><div class="mr-2 tracking-wider" itemprop="create-date"${_scopeId}>${ssrInterpolate((_b = (_a = article.publishTime) == null ? void 0 : _a.split(" ")) == null ? void 0 : _b.shift())}</div><div class="ml-auto flex items-center space-x-4"${_scopeId}><div class="flex items-center justify-end ml-auto space-x-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-baseline-thumb-up text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(article.likes)}</span></div><div class="flex items-center ml-auto space-x-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-eye-sharp text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(article.views)}</span></div></div></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-wrap w-full" }, [
                  createVNode("div", { class: "relative w-20 h-18 mr-4" }, [
                    createVNode("img", {
                      src: article.thumbnail,
                      class: "absolute object-cover w-full h-full rounded-sm"
                    }, null, 8, ["src"])
                  ]),
                  createVNode("div", { class: "flex flex-col content-between flex-1" }, [
                    createVNode("h3", { class: "text-base font-bold ellipsis" }, toDisplayString(article.title), 1),
                    createVNode("div", { class: "flex flex-wrap justify-between w-full pt-1 mt-auto text-xs text-gray-600 dark:text-gray-400" }, [
                      createVNode("div", {
                        class: "flex justify-between w-full mb-1",
                        itemprop: "author"
                      }, [
                        createVNode("p", null, toDisplayString(article.author), 1),
                        createVNode("p", null, toDisplayString(article.categories), 1)
                      ]),
                      createVNode("div", { class: "flex flex-wrap w-full" }, [
                        createVNode("div", {
                          class: "mr-2 tracking-wider",
                          itemprop: "create-date"
                        }, toDisplayString((_d = (_c = article.publishTime) == null ? void 0 : _c.split(" ")) == null ? void 0 : _d.shift()), 1),
                        createVNode("div", { class: "ml-auto flex items-center space-x-4" }, [
                          createVNode("div", { class: "flex items-center justify-end ml-auto space-x-1" }, [
                            createVNode(_component_UnoIcon, { class: "i-ic-baseline-thumb-up text-green-400" }),
                            createVNode("span", null, toDisplayString(article.likes), 1)
                          ]),
                          createVNode("div", { class: "flex items-center ml-auto space-x-1" }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-eye-sharp text-green-400" }),
                            createVNode("span", null, toDisplayString(article.views), 1)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Loop/Hot.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
      }, 300);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutWrapper = __nuxt_component_0;
      const _component_LayoutBody = __nuxt_component_4$1;
      const _component_LayoutSection = __nuxt_component_5;
      const _component_UITitle = _sfc_main$3;
      const _component_ArticleLoopSlider = __nuxt_component_4;
      const _component_ArticleLoopHot = _sfc_main$1;
      const _component_ArticleLoopRow = __nuxt_component_6;
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_ArticleFilter = _sfc_main$4;
      _push(ssrRenderComponent(_component_LayoutWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutBody, { class: "pt-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutSection, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(`<div class="flex flex-wrap"${_scopeId3}><div class="w-full mb-2 md:mb-5 2xl:mb-0 2xl:mr-4 2xl:w-2/3"${_scopeId3}>`);
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
                            createVNode("div", { class: "w-full mb-2 md:mb-5 2xl:mb-0 2xl:mr-4 2xl:w-2/3" }, [
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
                            createVNode("div", { class: "w-full mb-2 md:mb-5 2xl:mb-0 2xl:mr-4 2xl:w-2/3" }, [
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
              createVNode(_component_LayoutBody, { class: "pt-0" }, {
                default: withCtx(() => [
                  createVNode(_component_LayoutSection, null, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode("div", { class: "flex flex-wrap" }, [
                          createVNode("div", { class: "w-full mb-2 md:mb-5 2xl:mb-0 2xl:mr-4 2xl:w-2/3" }, [
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
//# sourceMappingURL=index.d4afa42d.mjs.map
