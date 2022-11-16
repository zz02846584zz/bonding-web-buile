import { _ as _export_sfc, d as __nuxt_component_0$1, b as __nuxt_component_1 } from '../server.mjs';
import { _ as __nuxt_component_2 } from './RowLoading.1826d6cd.mjs';
import { withCtx, createVNode, resolveDynamicComponent, createTextVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Row",
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
    },
    tag: {
      type: String,
      default: "h3"
    },
    row: {
      type: Number,
      default: 4
    },
    gap: {
      type: Number,
      default: 2
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      const _component_UnoIcon = __nuxt_component_1;
      const _component_ArticleLoopRowLoading = __nuxt_component_2;
      _push(`<!--[--><div class="grid md:grid-cols-2 gap-5 2xl:grid-cols-4 xl:grid-cols-3" data-v-2e3d0318><!--[-->`);
      ssrRenderList(__props.list, (article) => {
        _push(ssrRenderComponent(_component_nuxt_link, {
          key: article.id,
          to: `/news/article/${article.slug}`,
          class: "relative"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b, _c, _d;
            if (_push2) {
              _push2(`<div class="relative h-0 mb-2 overflow-hidden rounded thumbnail" data-v-2e3d0318${_scopeId}><img${ssrRenderAttr("src", article.thumbnail)} class="absolute top-0 left-0 object-cover w-full h-full" data-v-2e3d0318${_scopeId}></div><div class="px-2" data-v-2e3d0318${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(__props.tag), { class: "text-base font-bold ellipsis" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(article.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(article.title), 1)
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
              _push2(`<div class="flex flex-wrap justify-between w-full py-2 mt-auto text-xs text-gray-600 dark:text-gray-400" data-v-2e3d0318${_scopeId}><div class="flex justify-between w-full mb-1" itemprop="author" data-v-2e3d0318${_scopeId}><p data-v-2e3d0318${_scopeId}>${ssrInterpolate(article.author)}</p><p data-v-2e3d0318${_scopeId}>${ssrInterpolate(article.categories)}</p></div><div class="flex w-full" data-v-2e3d0318${_scopeId}><div class="mr-2 tracking-wider" itemprop="create-date" data-v-2e3d0318${_scopeId}>${ssrInterpolate((_b = (_a = article.publishTime) == null ? void 0 : _a.split(" ")) == null ? void 0 : _b.shift())}</div><div class="flex ml-auto items-center space-x-4" data-v-2e3d0318${_scopeId}><div class="flex items-center justify-end ml-auto space-x-1" data-v-2e3d0318${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-baseline-thumb-up text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span data-v-2e3d0318${_scopeId}>${ssrInterpolate(article.likes)}</span></div><div class="flex items-center ml-auto space-x-1" data-v-2e3d0318${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-eye-sharp text-green-400" }, null, _parent2, _scopeId));
              _push2(`<span data-v-2e3d0318${_scopeId}>${ssrInterpolate(article.views)}</span></div></div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "relative h-0 mb-2 overflow-hidden rounded thumbnail" }, [
                  createVNode("img", {
                    src: article.thumbnail,
                    class: "absolute top-0 left-0 object-cover w-full h-full"
                  }, null, 8, ["src"])
                ]),
                createVNode("div", { class: "px-2" }, [
                  (openBlock(), createBlock(resolveDynamicComponent(__props.tag), { class: "text-base font-bold ellipsis" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(article.title), 1)
                    ]),
                    _: 2
                  }, 1024)),
                  createVNode("div", { class: "flex flex-wrap justify-between w-full py-2 mt-auto text-xs text-gray-600 dark:text-gray-400" }, [
                    createVNode("div", {
                      class: "flex justify-between w-full mb-1",
                      itemprop: "author"
                    }, [
                      createVNode("p", null, toDisplayString(article.author), 1),
                      createVNode("p", null, toDisplayString(article.categories), 1)
                    ]),
                    createVNode("div", { class: "flex w-full" }, [
                      createVNode("div", {
                        class: "mr-2 tracking-wider",
                        itemprop: "create-date"
                      }, toDisplayString((_d = (_c = article.publishTime) == null ? void 0 : _c.split(" ")) == null ? void 0 : _d.shift()), 1),
                      createVNode("div", { class: "flex ml-auto items-center space-x-4" }, [
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
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (__props.infinite && __props.loading) {
        _push(ssrRenderComponent(_component_ArticleLoopRowLoading, { class: "mt-2" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Loop/Row.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2e3d0318"]]);

export { __nuxt_component_6 as _ };
//# sourceMappingURL=Row.653cd163.mjs.map
