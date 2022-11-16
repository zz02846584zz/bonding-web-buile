import { _ as __nuxt_component_0, c as _sfc_main$b, a as __nuxt_component_4, b as __nuxt_component_5 } from './Title.d8136423.mjs';
import { _ as __nuxt_component_1 } from './Header.846a4518.mjs';
import { j as useBaseStore, s as storeToRefs, k as useRoute, g as useHttpPost, u as useState, q as _imports_0$1, i as useHttpFetchPost, b as __nuxt_component_1$1, m as __nuxt_component_0$2, _ as _export_sfc, d as __nuxt_component_0$1$1 } from '../server.mjs';
import { useSSRContext, defineComponent, withAsyncContext, watch, ref, computed, withCtx, unref, createVNode, withDirectives, vShow, toDisplayString, openBlock, createBlock, createCommentVNode, mergeProps } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import YouTube from 'vue3-youtube';
import { _ as __nuxt_component_2 } from './RowLoading.b0e748d1.mjs';
import { _ as __nuxt_component_0$1 } from './Editor.3062b8c7.mjs';
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

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "Meta",
  __ssrInlineRender: true,
  props: {
    author: {
      type: String,
      default: ""
    },
    publishTime: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-2 text-xs md:text-sm font-bold text-gray-600 dark:text-gray-400" }, _attrs))}><div class="space-y-2 lg:space-y-0 lg:flex lg:flex-wrap lg:space-x-4"><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-carbon-user-avatar" }, null, _parent));
      _push(`<span>${ssrInterpolate(__props.author)}</span></div><div class="flex items-center space-x-2">`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-carbon-time" }, null, _parent));
      _push(`<span>${ssrInterpolate(props.publishTime)}</span></div></div></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Meta.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Single",
  __ssrInlineRender: true,
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const { user } = useBaseStore();
    storeToRefs(user);
    useState("showAuth");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_client_only, _attrs, null, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Content/Single.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-83336a83"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "Video",
  __ssrInlineRender: true,
  setup(__props) {
    const youtube = ref(null);
    const onReady = () => {
      if (youtube.value)
        youtube.value.playVideo();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(YouTube), mergeProps({
        ref_key: "youtube",
        ref: youtube,
        src: "https://youtu.be/jNQXAC9IVRw",
        onReady
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Video.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "Video",
  __ssrInlineRender: true,
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const { user } = useBaseStore();
    const { isLogin } = storeToRefs(user);
    const $auth = useState("showAuth");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$2;
      const _component_ArticleVideo = _sfc_main$8;
      const _component_UnoIcon = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_client_only, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isLogin)) {
              _push2(ssrRenderComponent(_component_ArticleVideo, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="article-content" data-v-b2388da4${_scopeId}>${props.content}</div>`);
            if (!unref(isLogin)) {
              _push2(`<div class="group read-more relative pt-20 pb-4 -mt-14 -mx-8" data-v-b2388da4${_scopeId}><div class="flex items-center justify-center opacity-50 group-hover:opacity-80 duration-150 cursor-pointer text-sm" data-v-b2388da4${_scopeId}><span class="mr-2" data-v-b2388da4${_scopeId}>\u767B\u5165\u5F8C\u89C0\u770B\u5F71\u97F3\u65B0\u805E</span>`);
              _push2(ssrRenderComponent(_component_UnoIcon, { class: "i-ant-design-login-outlined" }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(isLogin) ? (openBlock(), createBlock(_component_ArticleVideo, { key: 0 })) : createCommentVNode("", true),
              createVNode("div", {
                class: "article-content",
                innerHTML: props.content
              }, null, 8, ["innerHTML"]),
              !unref(isLogin) ? (openBlock(), createBlock("div", {
                key: 1,
                class: "group read-more relative pt-20 pb-4 -mt-14 -mx-8"
              }, [
                createVNode("div", {
                  class: "flex items-center justify-center opacity-50 group-hover:opacity-80 duration-150 cursor-pointer text-sm",
                  onClick: ($event) => $auth.value = true
                }, [
                  createVNode("span", { class: "mr-2" }, "\u767B\u5165\u5F8C\u89C0\u770B\u5F71\u97F3\u65B0\u805E"),
                  createVNode(_component_UnoIcon, { class: "i-ant-design-login-outlined" })
                ], 8, ["onClick"])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Content/Video.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-b2388da4"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Author",
  __ssrInlineRender: true,
  props: ["authorName", "authorIntro", "authorAvatar"],
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap" }, _attrs))}><div class="flex flex-wrap items-center w-full pb-4 border-gray-900/10 dark:border-gray-50/[0.2] lg:w-auto lg:pb-0 lg:pr-16 lg:mr-16 lg:border-b-0 lg:border-r-1"><div class="mr-6 overflow-hidden rounded-full shadow-sm shadow w-16 h-16 shadow-blue-200"><img${ssrRenderAttr("src", _imports_0$1)} class="object-cover w-full h-full"></div><div class="font-bold"><p class="pb-1 text-lg">${ssrInterpolate(props.authorName)}</p><p class="text-sm tracking-widest dark:text-gray-400"> \u5C08\u6B04\u7DE8\u8F2F </p></div></div><div class="flex-1 py-3 space-y-3 text-sm text-gray-800 lg:pr-4 dark:text-gray-300">${props.authorIntro || "\u5C1A\u672A\u8F38\u5165\u81EA\u6211\u4ECB\u7D39"}</div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Author.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "Column",
  __ssrInlineRender: true,
  props: {
    list: {
      type: Array,
      default: () => []
    },
    infinite: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1$1;
      const _component_UnoIcon = __nuxt_component_1$1;
      const _component_ArticleLoopRowLoading = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "block" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.list, (article) => {
        _push(ssrRenderComponent(_component_nuxt_link, {
          key: article.id,
          to: `/news/article/${article.slug}`,
          class: "flex pb-3 mb-3 border-gray-200 dark:border-gray-700 border-b-1 last-border-b-0 last-mb-0 last-pb-0"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d;
            if (_push2) {
              _push2(`<div class="flex flex-wrap w-full"${_scopeId}><div class="relative w-20 h-20 mr-4"${_scopeId}><img${ssrRenderAttr("src", article.thumbnail)} class="absolute object-cover w-full h-full"${_scopeId}></div><div class="flex flex-col content-between flex-1"${_scopeId}><h3 class="text-base font-bold ellipsis"${_scopeId}>${ssrInterpolate(article.title)}</h3><div class="flex flex-wrap justify-between w-full pt-1 pb-2 mt-auto text-xs text-gray-600 dark:text-gray-400"${_scopeId}><div class="flex w-full mb-1 space-x-4 text-gray-700 dark:text-gray-300" itemprop="author"${_scopeId}><p${_scopeId}>${ssrInterpolate(article.author)}</p><p${_scopeId}>${ssrInterpolate(article.categories)}</p></div><div class="flex"${_scopeId}><span class="tracking-wider" itemprop="create-date"${_scopeId}>${ssrInterpolate((_b = (_a = article.publishTime) == null ? void 0 : _a.split(" ")) == null ? void 0 : _b.shift())}</span></div><div class="flex"${_scopeId}><div class="flex items-center mr-3 space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-baseline-thumb-up text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(article.likes)}</span></div><div class="flex items-center mr-3 space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-eye-sharp text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(article.views)}</span></div></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-wrap w-full" }, [
                  createVNode("div", { class: "relative w-20 h-20 mr-4" }, [
                    createVNode("img", {
                      src: article.thumbnail,
                      class: "absolute object-cover w-full h-full"
                    }, null, 8, ["src"])
                  ]),
                  createVNode("div", { class: "flex flex-col content-between flex-1" }, [
                    createVNode("h3", { class: "text-base font-bold ellipsis" }, toDisplayString(article.title), 1),
                    createVNode("div", { class: "flex flex-wrap justify-between w-full pt-1 pb-2 mt-auto text-xs text-gray-600 dark:text-gray-400" }, [
                      createVNode("div", {
                        class: "flex w-full mb-1 space-x-4 text-gray-700 dark:text-gray-300",
                        itemprop: "author"
                      }, [
                        createVNode("p", null, toDisplayString(article.author), 1),
                        createVNode("p", null, toDisplayString(article.categories), 1)
                      ]),
                      createVNode("div", { class: "flex" }, [
                        createVNode("span", {
                          class: "tracking-wider",
                          itemprop: "create-date"
                        }, toDisplayString((_d = (_c = article.publishTime) == null ? void 0 : _c.split(" ")) == null ? void 0 : _d.shift()), 1)
                      ]),
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "flex items-center mr-3 space-x-2" }, [
                          createVNode(_component_UnoIcon, { class: "i-ic-baseline-thumb-up text-green-400" }),
                          createVNode("span", null, toDisplayString(article.likes), 1)
                        ]),
                        createVNode("div", { class: "flex items-center mr-3 space-x-2" }, [
                          createVNode(_component_UnoIcon, { class: "i-ion-eye-sharp text-green-400" }),
                          createVNode("span", null, toDisplayString(article.views), 1)
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
      _push(`<!--]-->`);
      if (__props.infinite && __props.loading) {
        _push(ssrRenderComponent(_component_ArticleLoopRowLoading, { class: "mt-2" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Loop/Column.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Form",
  __ssrInlineRender: true,
  emits: ["submit"],
  setup(__props, { emit }) {
    const { user } = useBaseStore();
    const { isLogin, info } = storeToRefs(user);
    useState("showAuth");
    const message = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_UIFormEditor = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pb-5" }, _attrs))}>`);
      if (unref(isLogin)) {
        _push(`<div><div class="flex"><div class="mr-4"><div class="rounded-full overflow-hidden w-12 h-12"><img${ssrRenderAttr("src", _imports_0$1)} class="object-cover w-full h-full"></div><div class="text-center text-xs mt-2">${ssrInterpolate(((_a = unref(info)) == null ? void 0 : _a.firstName) + ((_b = unref(info)) == null ? void 0 : _b.lastName))}</div></div><div class="flex-1">`);
        _push(ssrRenderComponent(_component_UIFormEditor, {
          modelValue: message.value,
          "onUpdate:modelValue": ($event) => message.value = $event,
          placeholder: "\u767C\u8868\u7559\u8A00...",
          class: "mb-3"
        }, null, _parent));
        _push(`<div class="cursor-pointer inline-block text-sm text-center bg-green-400 dark:bg-green-400 w-fit px-3 rounded h-8 leading-8 text-white"> \u9001\u51FA </div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(isLogin)) {
        _push(`<div><div class="flex"><div class="mr-4"><div class="rounded-full overflow-hidden w-12 h-12"><img${ssrRenderAttr("src", _imports_0$1)} class="object-cover w-full h-full"></div></div><div class="flex-1"><div class="w-full h-14 rounded py-2 px-4 text-sm mb-4 cursor-pointer bg-transparent dark:focus:bg-gray-300/[0.1] duration-200 border border-gray-300 dark:border-gray-300/[0.2]"><span class="opacity-70"> \u8ACB\u5148\u767B\u5165\u6703\u54E1...</span></div><div class="text-sm cursor-pointer inline-block text-center bg-green-500 px-3 rounded h-8 leading-8 text-white"> \u767B\u5165 </div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Comment/Form.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Child",
  __ssrInlineRender: true,
  props: ["comment", "articleId"],
  setup(__props) {
    useState("message");
    useState("auth");
    const { user } = useBaseStore();
    storeToRefs(user);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex py-3 mb-1 border-b last:border-b-0 last:pb-0 last:mb-0 last-border-0 border-gray-200 dark:border-gray-700" }, _attrs))}><div class="rounded-full mr-4 overflow-hidden w-10 h-10"><img${ssrRenderAttr("src", _imports_0$1)} class="object-cover w-full h-full"></div><div class="flex-1"><p class="text-sm">${ssrInterpolate(__props.comment.author)}</p><p class="text-xs opacity-80 pb-2">${ssrInterpolate(__props.comment.createTime)}</p><div class="pb-2">${__props.comment.content}</div><div class="flex items-center space-x-4"><div class="cursor-pointer flex items-center space-x-1">`);
      if (!__props.comment.isLike) {
        _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-outline-thumb-up w-4" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.comment.isLike) {
        _push(ssrRenderComponent(_component_UnoIcon, { class: "text-blue-600 w-4 i-ic-round-thumb-up" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="min-w-3 text-left">${ssrInterpolate(__props.comment.likes)}</span></div></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Comment/Child.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Item",
  __ssrInlineRender: true,
  props: {
    comment: {
      type: Object,
      default: () => {
      }
    },
    articleId: {
      type: Number,
      default: null
    }
  },
  emits: ["like"],
  setup(__props) {
    const props = __props;
    const children = ref([]);
    ref({});
    const commentListOpen = ref(false);
    const $message = useState("message");
    useState("showAuth");
    const { user } = useBaseStore();
    storeToRefs(user);
    const createComment = async (content) => {
      const { error, message, data } = await useHttpFetchPost("/comment/create", {
        body: {
          content,
          articleId: props.articleId,
          parentId: props.comment.id
        }
      });
      if (error)
        return $message.value = message;
      children.value.unshift(data);
    };
    const submit = (e) => {
      createComment(e);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1$1;
      const _component_ArticleCommentChild = _sfc_main$3;
      const _component_ArticleCommentForm = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-3 mb-1 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0 last:mb-0" }, _attrs))}><div class="flex w-full"><div class="rounded-full mr-4 overflow-hidden w-12 h-12"><img${ssrRenderAttr("src", _imports_0$1)} class="object-cover w-full h-full"></div><div class="flex-1"><p class="text-sm">${ssrInterpolate(__props.comment.author)}</p><p class="text-xs opacity-80 pb-2">${ssrInterpolate(__props.comment.createTime)}</p><div class="pb-2">${__props.comment.content}</div><div class="flex items-center space-x-4"><div class="cursor-pointer flex items-center">`);
      if (!__props.comment.isLike) {
        _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-outline-thumb-up w-4" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.comment.isLike) {
        _push(ssrRenderComponent(_component_UnoIcon, { class: "text-blue-600 w-4 i-ic-baseline-thumb-up" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="min-w-3 text-left ml-1">${ssrInterpolate(__props.comment.likes)}</span></div><div class="flex items-center space-x-1 cursor-pointer">`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-uil-comment-alt-dots w-4" }, null, _parent));
      _push(`<span>${ssrInterpolate(__props.comment.comments)}</span></div></div>`);
      if (__props.comment.hasChild) {
        _push(`<!--[--><div class="w-fit text-sm cursor-pointer pt-4 pb-2 text-gary-800 dark:text-gray-200">`);
        if (!commentListOpen.value) {
          _push(`<div class="flex items-center text-sm space-x-2">`);
          _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-md-arrow-dropdown w-4 mr-1 flex items-center" }, null, _parent));
          _push(` \u5C55\u958B </div>`);
        } else {
          _push(`<!---->`);
        }
        if (commentListOpen.value) {
          _push(`<div class="flex items-center space-x-2">`);
          _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-md-arrow-dropup w-4 mr-1 flex items-center" }, null, _parent));
          _push(` \u6536\u8D77 </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (commentListOpen.value) {
          _push(`<div class="w-full"><div class="py-3 mb-1 border-b last:border-b-0 last-border-0 border-gray-200 dark:border-gray-700"><!--[-->`);
          ssrRenderList(children.value, (child) => {
            _push(ssrRenderComponent(_component_ArticleCommentChild, {
              key: child.id,
              comment: child,
              "article-id": __props.articleId
            }, null, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      if (commentListOpen.value) {
        _push(ssrRenderComponent(_component_ArticleCommentForm, {
          class: "pt-4 -ml-8 md:ml-0",
          onSubmit: submit
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Comment/Item.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Comment",
  __ssrInlineRender: true,
  props: {
    commentList: {
      type: Array,
      default: () => []
    },
    articleId: {
      type: Number,
      default: null
    }
  },
  emits: ["submit"],
  setup(__props, { emit }) {
    const submit = (e) => {
      emit("submit", e);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ArticleCommentForm = _sfc_main$4;
      const _component_ArticleCommentItem = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comment-container" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ArticleCommentForm, { onSubmit: submit }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(__props.commentList, (comment, index) => {
        _push(ssrRenderComponent(_component_ArticleCommentItem, {
          key: index,
          "article-id": __props.articleId,
          comment,
          onSubmit: submit
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Comment.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function useOffsetWatcher() {
  const offset = ref(0);
  return { offset };
}
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
    if (((_a = article.value) == null ? void 0 : _a.isPreview) && token)
      [__temp, __restore] = withAsyncContext(() => articleRefresh()), await __temp, __restore();
    const { data: moreNews } = ([__temp, __restore] = withAsyncContext(() => {
      var _a2;
      return useHttpPost(
        `article-more-${articleSlug}`,
        "/news/list",
        { body: { articleId: (_a2 = article.value) == null ? void 0 : _a2.id, size: 3 } }
      );
    }), __temp = await __temp, __restore(), __temp);
    const $message = useState("message");
    const $auth = useState("showAuth");
    const likeArticle = async () => {
      var _a2;
      if (isLogin.value) {
        const {
          data: { status = false },
          error,
          message
        } = await useHttpFetchPost("/news/like", {
          body: { id: (_a2 = article.value) == null ? void 0 : _a2.id }
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
      var _a2;
      if (isLogin.value) {
        const {
          data: { status = false },
          error,
          message
        } = await useHttpFetchPost("/news/collection", {
          body: { id: (_a2 = article.value) == null ? void 0 : _a2.id }
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
        { body: { articleId: (_a2 = article.value) == null ? void 0 : _a2.id, page: 1, size: 10 } }
      );
    }), __temp = await __temp, __restore(), __temp);
    const createComment = async (content) => {
      var _a2;
      const { error, message, data } = await useHttpFetchPost("/comment/create", {
        body: { content, articleId: (_a2 = article.value) == null ? void 0 : _a2.id }
      });
      if (error)
        return $message.value = message;
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
      var _a2, _b, _c, _d, _e;
      if (commentIsEnd.value || !((_b = (_a2 = comments.value) == null ? void 0 : _a2.list) == null ? void 0 : _b.length))
        return;
      const page = ((_c = comments.value) == null ? void 0 : _c.pagination.page) + 1;
      const size = (_d = comments.value) == null ? void 0 : _d.pagination.size;
      commentLoading.value = true;
      const { data } = await useHttpFetchPost("/comment/page", {
        body: { articleId: (_e = article.value) == null ? void 0 : _e.id, page, size }
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
      if (offsetTop + offsetHeight - val - windowHeight < -50)
        moreComments();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LayoutWrapper = __nuxt_component_0;
      const _component_LayoutHeader = __nuxt_component_1;
      const _component_UITitle = _sfc_main$b;
      const _component_UnoIcon = __nuxt_component_1$1;
      const _component_LayoutBody = __nuxt_component_4;
      const _component_LayoutSection = __nuxt_component_5;
      const _component_ArticleMeta = _sfc_main$a;
      const _component_ArticleContentSingle = __nuxt_component_7;
      const _component_ArticleContentVideo = __nuxt_component_8;
      const _component_ArticleAuthor = _sfc_main$6;
      const _component_ArticleLoopColumn = _sfc_main$5;
      const _component_ArticleComment = _sfc_main$1;
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
                        _push4(`<div class="fb space-x-4 text-gray-500 dark:text-gray-400 lg:space-x-4"${_scopeId3}><div class="ml-auto fic space-x-2 md:space-x-5"${_scopeId3}><div class="cursor-pointer fic"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UnoIcon, {
                          style: !((_a3 = unref(article)) == null ? void 0 : _a3.isCollection) ? null : { display: "none" },
                          class: "i-ion-heart-outline w-6 lt-md:text-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UnoIcon, {
                          style: ((_b2 = unref(article)) == null ? void 0 : _b2.isCollection) ? null : { display: "none" },
                          class: "i-ion-heart-sharp text-red-600 w-6 lt-md:text-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="ml-1"${_scopeId3}>${ssrInterpolate(+((_c = unref(article)) == null ? void 0 : _c.collections))}</span></div><div class="cursor-pointer fic"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UnoIcon, {
                          style: !((_d = unref(article)) == null ? void 0 : _d.isLike) ? null : { display: "none" },
                          class: "i-ic-outline-thumb-up w-6 lt-md:text-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UnoIcon, {
                          style: ((_e = unref(article)) == null ? void 0 : _e.isLike) ? null : { display: "none" },
                          class: "i-ic-baseline-thumb-up w-6 text-blue-600 lt-md:text-sm"
                        }, null, _parent4, _scopeId3));
                        _push4(`<span class="ml-1"${_scopeId3}>${ssrInterpolate(+((_f = unref(article)) == null ? void 0 : _f.likes))}</span></div><div class="fic space-x-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-eye-sharp w-6 lt-md:text-sm" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>${ssrInterpolate(+((_g = unref(article)) == null ? void 0 : _g.views))}</span></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fb space-x-4 text-gray-500 dark:text-gray-400 lg:space-x-4" }, [
                            createVNode("div", { class: "ml-auto fic space-x-2 md:space-x-5" }, [
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: collectionArticle
                              }, [
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ion-heart-outline w-6 lt-md:text-sm" }, null, 512), [
                                  [vShow, !((_h = unref(article)) == null ? void 0 : _h.isCollection)]
                                ]),
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ion-heart-sharp text-red-600 w-6 lt-md:text-sm" }, null, 512), [
                                  [vShow, (_i = unref(article)) == null ? void 0 : _i.isCollection]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_j = unref(article)) == null ? void 0 : _j.collections)), 1)
                              ]),
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: likeArticle
                              }, [
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ic-outline-thumb-up w-6 lt-md:text-sm" }, null, 512), [
                                  [vShow, !((_k = unref(article)) == null ? void 0 : _k.isLike)]
                                ]),
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ic-baseline-thumb-up w-6 text-blue-600 lt-md:text-sm" }, null, 512), [
                                  [vShow, (_l = unref(article)) == null ? void 0 : _l.isLike]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_m = unref(article)) == null ? void 0 : _m.likes)), 1)
                              ]),
                              createVNode("div", { class: "fic space-x-1" }, [
                                createVNode(_component_UnoIcon, { class: "i-ion-eye-sharp w-6 lt-md:text-sm" }),
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
                            createVNode("div", { class: "ml-auto fic space-x-2 md:space-x-5" }, [
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: collectionArticle
                              }, [
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ion-heart-outline w-6 lt-md:text-sm" }, null, 512), [
                                  [vShow, !((_a3 = unref(article)) == null ? void 0 : _a3.isCollection)]
                                ]),
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ion-heart-sharp text-red-600 w-6 lt-md:text-sm" }, null, 512), [
                                  [vShow, (_b2 = unref(article)) == null ? void 0 : _b2.isCollection]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_c = unref(article)) == null ? void 0 : _c.collections)), 1)
                              ]),
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: likeArticle
                              }, [
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ic-outline-thumb-up w-6 lt-md:text-sm" }, null, 512), [
                                  [vShow, !((_d = unref(article)) == null ? void 0 : _d.isLike)]
                                ]),
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ic-baseline-thumb-up w-6 text-blue-600 lt-md:text-sm" }, null, 512), [
                                  [vShow, (_e = unref(article)) == null ? void 0 : _e.isLike]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_f = unref(article)) == null ? void 0 : _f.likes)), 1)
                              ]),
                              createVNode("div", { class: "fic space-x-1" }, [
                                createVNode(_component_UnoIcon, { class: "i-ion-eye-sharp w-6 lt-md:text-sm" }),
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
                        _push4(`<h1 class="mb-1 md:mb-3 text-lg md:text-2xl font-bold"${_scopeId3}>${ssrInterpolate((_a2 = unref(article)) == null ? void 0 : _a2.title)}</h1>`);
                        _push4(ssrRenderComponent(_component_ArticleMeta, {
                          author: (_b = unref(article)) == null ? void 0 : _b.authorName,
                          "publish-time": (_c = unref(article)) == null ? void 0 : _c.publishTime,
                          class: "mb-3 md:mb-5"
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
                          createVNode("h1", { class: "mb-1 md:mb-3 text-lg md:text-2xl font-bold" }, toDisplayString((_g = unref(article)) == null ? void 0 : _g.title), 1),
                          createVNode(_component_ArticleMeta, {
                            author: (_h = unref(article)) == null ? void 0 : _h.authorName,
                            "publish-time": (_i = unref(article)) == null ? void 0 : _i.publishTime,
                            class: "mb-3 md:mb-5"
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
                      var _a2, _b, _c, _d, _e, _f;
                      if (_push4) {
                        _push4(`<div class="px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-t-1 border-b-1 border-gray-900/10 dark:border-gray-50/[0.2]"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UITitle, {
                          class: "mb-2",
                          title: "\u64B0\u5BEB\u4EBA"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ArticleAuthor, {
                          "author-name": (_a2 = unref(article)) == null ? void 0 : _a2.authorName,
                          "author-intro": (_b = unref(article)) == null ? void 0 : _b.authorIntro,
                          "author-avatar": (_c = unref(article)) == null ? void 0 : _c.authorAvatar
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
                              "author-name": (_d = unref(article)) == null ? void 0 : _d.authorName,
                              "author-intro": (_e = unref(article)) == null ? void 0 : _e.authorIntro,
                              "author-avatar": (_f = unref(article)) == null ? void 0 : _f.authorAvatar
                            }, null, 8, ["author-name", "author-intro", "author-avatar"])
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
                      var _a2, _b, _c, _d, _e, _f, _g, _h;
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UITitle, {
                          title: "\u7559\u8A00\u5340",
                          class: "pb-5 mb-2"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_ArticleComment, {
                          "comment-list": (_b = (_a2 = unref(comments)) == null ? void 0 : _a2.list) != null ? _b : [],
                          "article-id": (_d = (_c = unref(article)) == null ? void 0 : _c.id) != null ? _d : 0,
                          onSubmit: createComment
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UITitle, {
                            title: "\u7559\u8A00\u5340",
                            class: "pb-5 mb-2"
                          }),
                          createVNode(_component_ArticleComment, {
                            "comment-list": (_f = (_e = unref(comments)) == null ? void 0 : _e.list) != null ? _f : [],
                            "article-id": (_h = (_g = unref(article)) == null ? void 0 : _g.id) != null ? _h : 0,
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
                          createVNode("h1", { class: "mb-1 md:mb-3 text-lg md:text-2xl font-bold" }, toDisplayString((_a2 = unref(article)) == null ? void 0 : _a2.title), 1),
                          createVNode(_component_ArticleMeta, {
                            author: (_b = unref(article)) == null ? void 0 : _b.authorName,
                            "publish-time": (_c = unref(article)) == null ? void 0 : _c.publishTime,
                            class: "mb-3 md:mb-5"
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
                        var _a2, _b, _c;
                        return [
                          createVNode("div", { class: "px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-t-1 border-b-1 border-gray-900/10 dark:border-gray-50/[0.2]" }, [
                            createVNode(_component_UITitle, {
                              class: "mb-2",
                              title: "\u64B0\u5BEB\u4EBA"
                            }),
                            createVNode(_component_ArticleAuthor, {
                              "author-name": (_a2 = unref(article)) == null ? void 0 : _a2.authorName,
                              "author-intro": (_b = unref(article)) == null ? void 0 : _b.authorIntro,
                              "author-avatar": (_c = unref(article)) == null ? void 0 : _c.authorAvatar
                            }, null, 8, ["author-name", "author-intro", "author-avatar"])
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
                          var _a2, _b, _c, _d;
                          return [
                            createVNode(_component_UITitle, {
                              title: "\u7559\u8A00\u5340",
                              class: "pb-5 mb-2"
                            }),
                            createVNode(_component_ArticleComment, {
                              "comment-list": (_b = (_a2 = unref(comments)) == null ? void 0 : _a2.list) != null ? _b : [],
                              "article-id": (_d = (_c = unref(article)) == null ? void 0 : _c.id) != null ? _d : 0,
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
                            createVNode("div", { class: "ml-auto fic space-x-2 md:space-x-5" }, [
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: collectionArticle
                              }, [
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ion-heart-outline w-6 lt-md:text-sm" }, null, 512), [
                                  [vShow, !((_a3 = unref(article)) == null ? void 0 : _a3.isCollection)]
                                ]),
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ion-heart-sharp text-red-600 w-6 lt-md:text-sm" }, null, 512), [
                                  [vShow, (_b = unref(article)) == null ? void 0 : _b.isCollection]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_c = unref(article)) == null ? void 0 : _c.collections)), 1)
                              ]),
                              createVNode("div", {
                                class: "cursor-pointer fic",
                                onClick: likeArticle
                              }, [
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ic-outline-thumb-up w-6 lt-md:text-sm" }, null, 512), [
                                  [vShow, !((_d = unref(article)) == null ? void 0 : _d.isLike)]
                                ]),
                                withDirectives(createVNode(_component_UnoIcon, { class: "i-ic-baseline-thumb-up w-6 text-blue-600 lt-md:text-sm" }, null, 512), [
                                  [vShow, (_e = unref(article)) == null ? void 0 : _e.isLike]
                                ]),
                                createVNode("span", { class: "ml-1" }, toDisplayString(+((_f = unref(article)) == null ? void 0 : _f.likes)), 1)
                              ]),
                              createVNode("div", { class: "fic space-x-1" }, [
                                createVNode(_component_UnoIcon, { class: "i-ion-eye-sharp w-6 lt-md:text-sm" }),
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
                        createVNode("h1", { class: "mb-1 md:mb-3 text-lg md:text-2xl font-bold" }, toDisplayString((_a2 = unref(article)) == null ? void 0 : _a2.title), 1),
                        createVNode(_component_ArticleMeta, {
                          author: (_b = unref(article)) == null ? void 0 : _b.authorName,
                          "publish-time": (_c = unref(article)) == null ? void 0 : _c.publishTime,
                          class: "mb-3 md:mb-5"
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
                      var _a2, _b, _c;
                      return [
                        createVNode("div", { class: "px-4 lg:px-8 pt-3 pb-6 -mx-4 lg:-mx-8 border-t-1 border-b-1 border-gray-900/10 dark:border-gray-50/[0.2]" }, [
                          createVNode(_component_UITitle, {
                            class: "mb-2",
                            title: "\u64B0\u5BEB\u4EBA"
                          }),
                          createVNode(_component_ArticleAuthor, {
                            "author-name": (_a2 = unref(article)) == null ? void 0 : _a2.authorName,
                            "author-intro": (_b = unref(article)) == null ? void 0 : _b.authorIntro,
                            "author-avatar": (_c = unref(article)) == null ? void 0 : _c.authorAvatar
                          }, null, 8, ["author-name", "author-intro", "author-avatar"])
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
                        var _a2, _b, _c, _d;
                        return [
                          createVNode(_component_UITitle, {
                            title: "\u7559\u8A00\u5340",
                            class: "pb-5 mb-2"
                          }),
                          createVNode(_component_ArticleComment, {
                            "comment-list": (_b = (_a2 = unref(comments)) == null ? void 0 : _a2.list) != null ? _b : [],
                            "article-id": (_d = (_c = unref(article)) == null ? void 0 : _c.id) != null ? _d : 0,
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
//# sourceMappingURL=_articleSlug_.fb9e9e7a.mjs.map
