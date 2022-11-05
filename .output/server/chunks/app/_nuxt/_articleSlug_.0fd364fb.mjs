import { s as useBaseStore, x as storeToRefs, y as useRoute, e as useHttpPost, u as useState, r as useHttpFetchPost, g as __nuxt_component_0, L as __nuxt_component_1, j as _sfc_main$x, M as __unplugin_components_0$5, N as __unplugin_components_1$3, O as __unplugin_components_2$2, P as __unplugin_components_3$2, h as __nuxt_component_4$2, i as __nuxt_component_5$2, Q as _sfc_main$g, R as __nuxt_component_6, S as __nuxt_component_7, T as _sfc_main$d, V as _sfc_main$c, W as _sfc_main$8 } from '../server.mjs';
import { defineComponent, withAsyncContext, watch, ref, computed, withCtx, unref, createVNode, withDirectives, vShow, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext, createElementBlock, createElementVNode } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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

function useOffsetWatcher() {
  const offset = ref(0);
  return { offset };
}
const _hoisted_1 = {
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
const _hoisted_2 = /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0Z"
}, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_3);
}
const __unplugin_components_4 = { name: "mdi-eye-outline", render };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[articleSlug]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { user } = useBaseStore();
    const { isLogin, token } = storeToRefs(user);
    const route = useRoute();
    const { articleSlug } = route.params;
    const { data: article, refresh: articleRefresh } = ([__temp, __restore] = withAsyncContext(() => useHttpPost(
      `article-info-${articleSlug}`,
      "/news/article",
      { body: { slug: articleSlug } }
    )), __temp = await __temp, __restore(), __temp);
    watch(token, async () => {
      await articleRefresh();
    });
    if (((_a = article.value) == null ? void 0 : _a.isPreview) && token) {
      [__temp, __restore] = withAsyncContext(() => articleRefresh()), await __temp, __restore();
    }
    const { data: moreNews } = ([__temp, __restore] = withAsyncContext(() => {
      var _a2;
      return useHttpPost(
        `article-more-${articleSlug}`,
        "/news/list",
        { body: { articleId: (_a2 = article.value) == null ? void 0 : _a2.id } }
      );
    }), __temp = await __temp, __restore(), __temp);
    const $message = useState("message");
    const $auth = useState("showAuth");
    const likeArticle = async () => {
      if (isLogin.value) {
        const {
          data: { status = false },
          error,
          message
        } = await useHttpFetchPost("/news/like", {
          body: { id: article.value.id }
        });
        if (error)
          return $message.value = message.value;
        article.value.isLike = status;
        article.value.likes = +article.value.likes + (status ? 1 : -1);
      } else {
        $auth.value = true;
      }
    };
    const collectionArticle = async () => {
      if (isLogin.value) {
        const {
          data: { status = false },
          error,
          message
        } = await useHttpFetchPost("/news/collection", {
          body: { id: article.value.id }
        });
        if (error.value)
          return $message.value = message.value;
        article.value.isCollection = status;
        article.value.collections = +article.value.collections + (status ? 1 : -1);
      } else {
        $auth.value = true;
      }
    };
    const { data: comments } = ([__temp, __restore] = withAsyncContext(() => {
      var _a2;
      return useHttpPost(
        `article-comment-${articleSlug}`,
        "/comment/page",
        { body: { articleId: (_a2 = article.value) == null ? void 0 : _a2.id, page: 1, size: 12 } }
      );
    }), __temp = await __temp, __restore(), __temp);
    const createComment = async (content) => {
      var _a2;
      const { error, message, data } = await useHttpFetchPost("/comment/create", {
        body: { content, articleId: (_a2 = article.value) == null ? void 0 : _a2.id }
      });
      if (error) {
        return $message.value = message;
      }
      comments.value.list.unshift(data);
    };
    const comment = ref(null);
    const commentIsEnd = computed(() => {
      var _a2;
      const { page = 1, size = 1, total = 1 } = (_a2 = comments.value) == null ? void 0 : _a2.pagination;
      return page * size >= total;
    });
    const commentLoading = ref(false);
    const moreComments = async () => {
      var _a2, _b;
      if (commentIsEnd.value || !comments.value.length)
        return;
      const page = ((_a2 = comments.value) == null ? void 0 : _a2.pagination.page) + 1;
      commentLoading.value = true;
      const { data } = await useHttpFetchPost("/comment/page", {
        body: { articleId: (_b = article.value) == null ? void 0 : _b.id, page }
      });
      commentLoading.value = false;
      comments.value.list.push(...data.list);
      comments.value.pagination = data.pagination;
    };
    const { offset } = useOffsetWatcher();
    watch(offset, (val) => {
      var _a2, _b;
      if (commentLoading.value)
        return;
      const windowHeight = window.innerHeight;
      const offsetTop = ((_a2 = comment.value) == null ? void 0 : _a2.offsetTop) || 0;
      const offsetHeight = ((_b = comment.value) == null ? void 0 : _b.offsetHeight) || 0;
      if (offsetTop + offsetHeight - val - windowHeight < -50) {
        moreComments();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutWrapper = __nuxt_component_0;
      const _component_LayoutHeader = __nuxt_component_1;
      const _component_UITitle = _sfc_main$x;
      const _component_IconMdi58heartOutline = __unplugin_components_0$5;
      const _component_IconMdi58heart = __unplugin_components_1$3;
      const _component_IconIc58outlineThumbUp = __unplugin_components_2$2;
      const _component_IconIc58roundThumbUp = __unplugin_components_3$2;
      const _component_IconMdi58eyeOutline = __unplugin_components_4;
      const _component_LayoutBody = __nuxt_component_4$2;
      const _component_LayoutSection = __nuxt_component_5$2;
      const _component_ArticleMeta = _sfc_main$g;
      const _component_ArticleContentSingle = __nuxt_component_6;
      const _component_ArticleContentVideo = __nuxt_component_7;
      const _component_ArticleAuthor = _sfc_main$d;
      const _component_ArticleLoopColumn = _sfc_main$c;
      const _component_ArticleComment = _sfc_main$8;
      _push(ssrRenderComponent(_component_LayoutWrapper, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_LayoutHeader, { class: "sticky z-10 bg-white border-b border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UITitle, {
                    title: (_a2 = unref(article)) == null ? void 0 : _a2.title,
                    size: "sm",
                    color: "gray-500",
                    "dark-color": "gray-400",
                    previous: true,
                    class: "capitalize"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a3, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
                      if (_push4) {
                        _push4(`<div class="fb space-x-4 text-gray-500 dark:text-gray-400 lg:space-x-4"${_scopeId3}><div class="ml-auto fic space-x-5"${_scopeId3}><div class="cursor-pointer fic"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_IconMdi58heartOutline, {
                          style: !((_a3 = unref(article)) == null ? void 0 : _a3.isCollection) ? null : { display: "none" },
                          class: "w-6"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_IconMdi58heart, {
                          style: ((_b2 = unref(article)) == null ? void 0 : _b2.isCollection) ? null : { display: "none" },
                          class: "text-red-600 w-6"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="ml-1"${_scopeId3}>${ssrInterpolate(+((_c = unref(article)) == null ? void 0 : _c.collections))}</span></div><div class="cursor-pointer fic"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_IconIc58outlineThumbUp, {
                          style: !((_d = unref(article)) == null ? void 0 : _d.isLike) ? null : { display: "none" },
                          class: "w-6"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_IconIc58roundThumbUp, {
                          style: ((_e = unref(article)) == null ? void 0 : _e.isLike) ? null : { display: "none" },
                          class: "text-blue-600 w-6"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="ml-1"${_scopeId3}>${ssrInterpolate(+((_f = unref(article)) == null ? void 0 : _f.likes))}</span></div><div class="fic space-x-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_IconMdi58eyeOutline, { class: "w-6" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>${ssrInterpolate(+((_g = unref(article)) == null ? void 0 : _g.views))}</span></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fb space-x-4 text-gray-500 dark:text-gray-400 lg:space-x-4" }, [
                            createVNode("div", { class: "ml-auto fic space-x-5" }, [
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: collectionArticle
                              }, [
                                withDirectives(createVNode(_component_IconMdi58heartOutline, { class: "w-6" }, null, 512), [
                                  [vShow, !((_h = unref(article)) == null ? void 0 : _h.isCollection)]
                                ]),
                                withDirectives(createVNode(_component_IconMdi58heart, { class: "text-red-600 w-6" }, null, 512), [
                                  [vShow, (_i = unref(article)) == null ? void 0 : _i.isCollection]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_j = unref(article)) == null ? void 0 : _j.collections)), 1)
                              ]),
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: likeArticle
                              }, [
                                withDirectives(createVNode(_component_IconIc58outlineThumbUp, { class: "w-6" }, null, 512), [
                                  [vShow, !((_k = unref(article)) == null ? void 0 : _k.isLike)]
                                ]),
                                withDirectives(createVNode(_component_IconIc58roundThumbUp, { class: "text-blue-600 w-6" }, null, 512), [
                                  [vShow, (_l = unref(article)) == null ? void 0 : _l.isLike]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_m = unref(article)) == null ? void 0 : _m.likes)), 1)
                              ]),
                              createVNode("div", { class: "fic space-x-1" }, [
                                createVNode(_component_IconMdi58eyeOutline, { class: "w-6" }),
                                createVNode("span", null, toDisplayString(+((_n = unref(article)) == null ? void 0 : _n.views)), 1)
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UITitle, {
                      title: (_b = unref(article)) == null ? void 0 : _b.title,
                      size: "sm",
                      color: "gray-500",
                      "dark-color": "gray-400",
                      previous: true,
                      class: "capitalize"
                    }, {
                      default: withCtx(() => {
                        var _a3, _b2, _c, _d, _e, _f, _g;
                        return [
                          createVNode("div", { class: "fb space-x-4 text-gray-500 dark:text-gray-400 lg:space-x-4" }, [
                            createVNode("div", { class: "ml-auto fic space-x-5" }, [
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: collectionArticle
                              }, [
                                withDirectives(createVNode(_component_IconMdi58heartOutline, { class: "w-6" }, null, 512), [
                                  [vShow, !((_a3 = unref(article)) == null ? void 0 : _a3.isCollection)]
                                ]),
                                withDirectives(createVNode(_component_IconMdi58heart, { class: "text-red-600 w-6" }, null, 512), [
                                  [vShow, (_b2 = unref(article)) == null ? void 0 : _b2.isCollection]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_c = unref(article)) == null ? void 0 : _c.collections)), 1)
                              ]),
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: likeArticle
                              }, [
                                withDirectives(createVNode(_component_IconIc58outlineThumbUp, { class: "w-6" }, null, 512), [
                                  [vShow, !((_d = unref(article)) == null ? void 0 : _d.isLike)]
                                ]),
                                withDirectives(createVNode(_component_IconIc58roundThumbUp, { class: "text-blue-600 w-6" }, null, 512), [
                                  [vShow, (_e = unref(article)) == null ? void 0 : _e.isLike]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_f = unref(article)) == null ? void 0 : _f.likes)), 1)
                              ]),
                              createVNode("div", { class: "fic space-x-1" }, [
                                createVNode(_component_IconMdi58eyeOutline, { class: "w-6" }),
                                createVNode("span", null, toDisplayString(+((_g = unref(article)) == null ? void 0 : _g.views)), 1)
                              ])
                            ])
                          ])
                        ];
                      }),
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
                  _push3(ssrRenderComponent(_component_LayoutSection, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
                      if (_push4) {
                        _push4(`<h1 class="mb-3 text-2xl font-bold"${_scopeId3}>${ssrInterpolate((_a2 = unref(article)) == null ? void 0 : _a2.title)}</h1>`);
                        _push4(ssrRenderComponent(_component_ArticleMeta, {
                          author: (_b = unref(article)) == null ? void 0 : _b.author,
                          "publish-time": (_c = unref(article)) == null ? void 0 : _c.publishTime,
                          class: "mb-5"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="pb-6"${_scopeId3}>`);
                        if (((_d = unref(article)) == null ? void 0 : _d.type) === "normal") {
                          _push4(ssrRenderComponent(_component_ArticleContentSingle, {
                            content: unref(article).content || "\u7121\u5167\u5BB9"
                          }, null, _parent4, _scopeId3));
                        } else if (((_e = unref(article)) == null ? void 0 : _e.type) === "video") {
                          _push4(ssrRenderComponent(_component_ArticleContentVideo, {
                            content: (_f = unref(article)) == null ? void 0 : _f.content
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("h1", { class: "mb-3 text-2xl font-bold" }, toDisplayString((_g = unref(article)) == null ? void 0 : _g.title), 1),
                          createVNode(_component_ArticleMeta, {
                            author: (_h = unref(article)) == null ? void 0 : _h.author,
                            "publish-time": (_i = unref(article)) == null ? void 0 : _i.publishTime,
                            class: "mb-5"
                          }, null, 8, ["author", "publish-time"]),
                          createVNode("div", { class: "pb-6" }, [
                            ((_j = unref(article)) == null ? void 0 : _j.type) === "normal" ? (openBlock(), createBlock(_component_ArticleContentSingle, {
                              key: 0,
                              content: unref(article).content || "\u7121\u5167\u5BB9"
                            }, null, 8, ["content"])) : ((_k = unref(article)) == null ? void 0 : _k.type) === "video" ? (openBlock(), createBlock(_component_ArticleContentVideo, {
                              key: 1,
                              content: (_l = unref(article)) == null ? void 0 : _l.content
                            }, null, 8, ["content"])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LayoutSection, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a2, _b;
                      if (_push4) {
                        _push4(`<div class="px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-t-1 border-b-1 border-gray-900/10 dark:border-gray-50/[0.2]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UITitle, {
                          class: "mb-2",
                          title: "\u64B0\u5BEB\u4EBA"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ArticleAuthor, {
                          author: (_a2 = unref(article)) == null ? void 0 : _a2.author
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-t-1 border-b-1 border-gray-900/10 dark:border-gray-50/[0.2]" }, [
                            createVNode(_component_UITitle, {
                              class: "mb-2",
                              title: "\u64B0\u5BEB\u4EBA"
                            }),
                            createVNode(_component_ArticleAuthor, {
                              author: (_b = unref(article)) == null ? void 0 : _b.author
                            }, null, 8, ["author"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_LayoutSection, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a2, _b;
                      if (_push4) {
                        _push4(`<div class="px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-gray-900/10 dark:border-gray-50/[0.2]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UITitle, {
                          title: "\u76F8\u95DC\u6587\u7AE0",
                          class: "pb-5 mb-2"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ArticleLoopColumn, {
                          tag: "h3",
                          list: (_a2 = unref(moreNews)) != null ? _a2 : []
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-gray-900/10 dark:border-gray-50/[0.2]" }, [
                            createVNode(_component_UITitle, {
                              title: "\u76F8\u95DC\u6587\u7AE0",
                              class: "pb-5 mb-2"
                            }),
                            createVNode(_component_ArticleLoopColumn, {
                              tag: "h3",
                              list: (_b = unref(moreNews)) != null ? _b : []
                            }, null, 8, ["list"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_LayoutSection, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a2, _b, _c, _d;
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UITitle, {
                          title: "\u7559\u8A00\u5340",
                          class: "pb-5 mb-2"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ArticleComment, {
                          "comment-list": (_b = (_a2 = unref(comments)) == null ? void 0 : _a2.list) != null ? _b : [],
                          "article-id": unref(article).id,
                          onSubmit: createComment
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UITitle, {
                            title: "\u7559\u8A00\u5340",
                            class: "pb-5 mb-2"
                          }),
                          createVNode(_component_ArticleComment, {
                            "comment-list": (_d = (_c = unref(comments)) == null ? void 0 : _c.list) != null ? _d : [],
                            "article-id": unref(article).id,
                            onSubmit: createComment
                          }, null, 8, ["comment-list", "article-id"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_LayoutSection, null, {
                      default: withCtx(() => {
                        var _a2, _b, _c, _d, _e, _f;
                        return [
                          createVNode("h1", { class: "mb-3 text-2xl font-bold" }, toDisplayString((_a2 = unref(article)) == null ? void 0 : _a2.title), 1),
                          createVNode(_component_ArticleMeta, {
                            author: (_b = unref(article)) == null ? void 0 : _b.author,
                            "publish-time": (_c = unref(article)) == null ? void 0 : _c.publishTime,
                            class: "mb-5"
                          }, null, 8, ["author", "publish-time"]),
                          createVNode("div", { class: "pb-6" }, [
                            ((_d = unref(article)) == null ? void 0 : _d.type) === "normal" ? (openBlock(), createBlock(_component_ArticleContentSingle, {
                              key: 0,
                              content: unref(article).content || "\u7121\u5167\u5BB9"
                            }, null, 8, ["content"])) : ((_e = unref(article)) == null ? void 0 : _e.type) === "video" ? (openBlock(), createBlock(_component_ArticleContentVideo, {
                              key: 1,
                              content: (_f = unref(article)) == null ? void 0 : _f.content
                            }, null, 8, ["content"])) : createCommentVNode("", true)
                          ])
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_LayoutSection, null, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createVNode("div", { class: "px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-t-1 border-b-1 border-gray-900/10 dark:border-gray-50/[0.2]" }, [
                            createVNode(_component_UITitle, {
                              class: "mb-2",
                              title: "\u64B0\u5BEB\u4EBA"
                            }),
                            createVNode(_component_ArticleAuthor, {
                              author: (_a2 = unref(article)) == null ? void 0 : _a2.author
                            }, null, 8, ["author"])
                          ])
                        ];
                      }),
                      _: 1
                    }),
                    createVNode(_component_LayoutSection, null, {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          createVNode("div", { class: "px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-gray-900/10 dark:border-gray-50/[0.2]" }, [
                            createVNode(_component_UITitle, {
                              title: "\u76F8\u95DC\u6587\u7AE0",
                              class: "pb-5 mb-2"
                            }),
                            createVNode(_component_ArticleLoopColumn, {
                              tag: "h3",
                              list: (_a2 = unref(moreNews)) != null ? _a2 : []
                            }, null, 8, ["list"])
                          ])
                        ];
                      }),
                      _: 1
                    }),
                    createVNode("div", {
                      ref_key: "comment",
                      ref: comment
                    }, [
                      createVNode(_component_LayoutSection, null, {
                        default: withCtx(() => {
                          var _a2, _b;
                          return [
                            createVNode(_component_UITitle, {
                              title: "\u7559\u8A00\u5340",
                              class: "pb-5 mb-2"
                            }),
                            createVNode(_component_ArticleComment, {
                              "comment-list": (_b = (_a2 = unref(comments)) == null ? void 0 : _a2.list) != null ? _b : [],
                              "article-id": unref(article).id,
                              onSubmit: createComment
                            }, null, 8, ["comment-list", "article-id"])
                          ];
                        }),
                        _: 1
                      })
                    ], 512)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_LayoutHeader, { class: "sticky z-10 bg-white border-b border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700" }, {
                default: withCtx(() => {
                  var _a2;
                  return [
                    createVNode(_component_UITitle, {
                      title: (_a2 = unref(article)) == null ? void 0 : _a2.title,
                      size: "sm",
                      color: "gray-500",
                      "dark-color": "gray-400",
                      previous: true,
                      class: "capitalize"
                    }, {
                      default: withCtx(() => {
                        var _a3, _b, _c, _d, _e, _f, _g;
                        return [
                          createVNode("div", { class: "fb space-x-4 text-gray-500 dark:text-gray-400 lg:space-x-4" }, [
                            createVNode("div", { class: "ml-auto fic space-x-5" }, [
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: collectionArticle
                              }, [
                                withDirectives(createVNode(_component_IconMdi58heartOutline, { class: "w-6" }, null, 512), [
                                  [vShow, !((_a3 = unref(article)) == null ? void 0 : _a3.isCollection)]
                                ]),
                                withDirectives(createVNode(_component_IconMdi58heart, { class: "text-red-600 w-6" }, null, 512), [
                                  [vShow, (_b = unref(article)) == null ? void 0 : _b.isCollection]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_c = unref(article)) == null ? void 0 : _c.collections)), 1)
                              ]),
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: likeArticle
                              }, [
                                withDirectives(createVNode(_component_IconIc58outlineThumbUp, { class: "w-6" }, null, 512), [
                                  [vShow, !((_d = unref(article)) == null ? void 0 : _d.isLike)]
                                ]),
                                withDirectives(createVNode(_component_IconIc58roundThumbUp, { class: "text-blue-600 w-6" }, null, 512), [
                                  [vShow, (_e = unref(article)) == null ? void 0 : _e.isLike]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_f = unref(article)) == null ? void 0 : _f.likes)), 1)
                              ]),
                              createVNode("div", { class: "fic space-x-1" }, [
                                createVNode(_component_IconMdi58eyeOutline, { class: "w-6" }),
                                createVNode("span", null, toDisplayString(+((_g = unref(article)) == null ? void 0 : _g.views)), 1)
                              ])
                            ])
                          ])
                        ];
                      }),
                      _: 1
                    }, 8, ["title"])
                  ];
                }),
                _: 1
              }),
              createVNode(_component_LayoutBody, null, {
                default: withCtx(() => [
                  createVNode(_component_LayoutSection, null, {
                    default: withCtx(() => {
                      var _a2, _b, _c, _d, _e, _f;
                      return [
                        createVNode("h1", { class: "mb-3 text-2xl font-bold" }, toDisplayString((_a2 = unref(article)) == null ? void 0 : _a2.title), 1),
                        createVNode(_component_ArticleMeta, {
                          author: (_b = unref(article)) == null ? void 0 : _b.author,
                          "publish-time": (_c = unref(article)) == null ? void 0 : _c.publishTime,
                          class: "mb-5"
                        }, null, 8, ["author", "publish-time"]),
                        createVNode("div", { class: "pb-6" }, [
                          ((_d = unref(article)) == null ? void 0 : _d.type) === "normal" ? (openBlock(), createBlock(_component_ArticleContentSingle, {
                            key: 0,
                            content: unref(article).content || "\u7121\u5167\u5BB9"
                          }, null, 8, ["content"])) : ((_e = unref(article)) == null ? void 0 : _e.type) === "video" ? (openBlock(), createBlock(_component_ArticleContentVideo, {
                            key: 1,
                            content: (_f = unref(article)) == null ? void 0 : _f.content
                          }, null, 8, ["content"])) : createCommentVNode("", true)
                        ])
                      ];
                    }),
                    _: 1
                  }),
                  createVNode(_component_LayoutSection, null, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createVNode("div", { class: "px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-t-1 border-b-1 border-gray-900/10 dark:border-gray-50/[0.2]" }, [
                          createVNode(_component_UITitle, {
                            class: "mb-2",
                            title: "\u64B0\u5BEB\u4EBA"
                          }),
                          createVNode(_component_ArticleAuthor, {
                            author: (_a2 = unref(article)) == null ? void 0 : _a2.author
                          }, null, 8, ["author"])
                        ])
                      ];
                    }),
                    _: 1
                  }),
                  createVNode(_component_LayoutSection, null, {
                    default: withCtx(() => {
                      var _a2;
                      return [
                        createVNode("div", { class: "px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-gray-900/10 dark:border-gray-50/[0.2]" }, [
                          createVNode(_component_UITitle, {
                            title: "\u76F8\u95DC\u6587\u7AE0",
                            class: "pb-5 mb-2"
                          }),
                          createVNode(_component_ArticleLoopColumn, {
                            tag: "h3",
                            list: (_a2 = unref(moreNews)) != null ? _a2 : []
                          }, null, 8, ["list"])
                        ])
                      ];
                    }),
                    _: 1
                  }),
                  createVNode("div", {
                    ref_key: "comment",
                    ref: comment
                  }, [
                    createVNode(_component_LayoutSection, null, {
                      default: withCtx(() => {
                        var _a2, _b;
                        return [
                          createVNode(_component_UITitle, {
                            title: "\u7559\u8A00\u5340",
                            class: "pb-5 mb-2"
                          }),
                          createVNode(_component_ArticleComment, {
                            "comment-list": (_b = (_a2 = unref(comments)) == null ? void 0 : _a2.list) != null ? _b : [],
                            "article-id": unref(article).id,
                            onSubmit: createComment
                          }, null, 8, ["comment-list", "article-id"])
                        ];
                      }),
                      _: 1
                    })
                  ], 512)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/article/[articleSlug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_articleSlug_.0fd364fb.mjs.map
