import { _ as _export_sfc, j as useBaseStore, s as storeToRefs, b as __nuxt_component_1, d as __nuxt_component_0$1 } from '../server.mjs';
import { _ as _sfc_main$3 } from './Form.3e3fa813.mjs';
import { _ as _sfc_main$4 } from './Text.804f8c43.mjs';
import { useSSRContext, defineComponent, reactive, ref, watch, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, withDirectives, vShow, computed, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderSlot, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './Editor.bbf85144.mjs';
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

const _sfc_main$2 = {
  __name: "Date",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "md"
    },
    id: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const defaultStyle = computed(
      () => props.disabled ? `
  block w-full border cursor-not-allowed
  duration-200
  border-gray-600/[0.3] bg-gray-100
  text-opacity-50
  dark:border-gray-50/[0.2] dark:bg-gray-800` : `
  block w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`
    );
    const labelSizeStyles = reactive({
      lg: "text-base",
      md: "text-sm",
      sm: "text-xs",
      xs: "text-xs"
    });
    const inputSizeStyles = reactive({
      lg: "h-12 px-4 text-lg rounded-lg",
      md: "h-10 px-4 text-base rounded",
      sm: "h-8 px-4 text-sm rounded",
      xs: "h-7 px-4 text-xs rounded"
    });
    const labelSize = computed(
      () => labelSizeStyles[props.size] || labelSizeStyles.md
    );
    const inputSize = computed(
      () => inputSizeStyles[props.size] || inputSizeStyles.md
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-group form-group_select" }, _attrs))} data-v-85ac86be><div class="${ssrRenderClass([unref(labelSize), "flex items-center mb-2"])}" data-v-85ac86be><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass([[{ "cursor-pointer": __props.id }], "block font-bold tracking-wide"])}" data-v-85ac86be>${ssrInterpolate(__props.label)}</label>`);
      ssrRenderSlot(_ctx.$slots, "label", {}, null, _push, _parent);
      _push(`</div><div class="model relative" data-v-85ac86be><input${ssrRenderAttr("id", __props.id)} type="date" class="${ssrRenderClass([unref(defaultStyle), unref(inputSize)])}"${ssrRenderAttr("placeholder", __props.placeholder)}${ssrRenderAttr("value", props.modelValue || __props.value)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""} data-v-85ac86be></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Date.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-85ac86be"]]);
const _sfc_main$1 = {
  __name: "Radio",
  __ssrInlineRender: true,
  props: {
    id: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const defaultStyle = computed(
      () => props.disabled ? `
  w-full border cursor-not-allowed
  duration-200
  border-gray-600/[0.3] bg-gray-100
  text-opacity-50
  dark:border-gray-50/[0.2] dark:bg-gray-800` : `
  w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`
    );
    const inputSizeStyles = reactive({
      lg: "h-12 px-4 text-lg rounded-lg",
      md: "h-10 px-4 text-base rounded",
      sm: "h-8 px-4 text-sm rounded",
      xs: "h-7 px-4 text-xs rounded"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-group form-group_input__radio" }, _attrs))} data-v-a4fece0e><label${ssrRenderAttr("for", __props.id)} class="block mb-2 font-bold tracking-wide cursor-pointer text-sm" data-v-a4fece0e>${ssrInterpolate(__props.label)}</label><div role="radiogroup" class="${ssrRenderClass([[unref(defaultStyle), inputSizeStyles.md], "flex flex-wrap space-x-3"])}" data-v-a4fece0e><!--[-->`);
      ssrRenderList(__props.options, (option, index2) => {
        _push(`<div class="flex items-center py-3" data-v-a4fece0e><div class="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative" data-v-a4fece0e><input${ssrRenderAttr("id", option.value)}${ssrIncludeBooleanAttr(index2 === 0) ? " checked" : ""}${ssrRenderAttr("value", option.value)} type="radio" name="radio" class="checkbox appearance-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none" data-v-a4fece0e><div class="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1" data-v-a4fece0e></div></div><label${ssrRenderAttr("for", option.value)} class="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100" data-v-a4fece0e>${ssrInterpolate(option.label)}</label></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Radio.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a4fece0e"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      firstName: "",
      lastName: "",
      birthday: "",
      gender: "",
      intro: ""
    });
    const { user } = useBaseStore();
    const { info } = storeToRefs(user);
    const setForm = () => {
      var _a;
      for (const item in form)
        form[item] = ((_a = info.value) == null ? void 0 : _a[item]) || "";
    };
    const genderOptions = ref([
      { value: "male", label: "\u7537\u6027" },
      { value: "female", label: "\u5973\u6027" }
    ]);
    watch(info, () => {
      setForm();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1;
      const _component_UIForm = _sfc_main$3;
      const _component_UIFormText = _sfc_main$4;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UIFormDate = __nuxt_component_4;
      const _component_UIFormRadio = __nuxt_component_5;
      const _component_UIFormEditor = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-90702515><div class="flex flex-wrap items-center justify-between sticky" data-v-90702515><div class="flex" data-v-90702515><div class="lg:hidden mr-2 flex items-center cursor-pointer" data-v-90702515>`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-arrow-back-ios text-sm lg:text-base" }, null, _parent));
      _push(`</div><h1 class="text-lg lg:text-xl font-bold" data-v-90702515> \u5E33\u865F\u7BA1\u7406 </h1></div><div class="group rounded-full cursor-pointer bg-green-500 text-white text-sm font-bold px-4 h-8 leading-8 flex items-center" data-v-90702515><span class="pr-1 duration-150" data-v-90702515> \u4FDD\u5B58 </span>`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-baseline-save-alt" }, null, _parent));
      _push(`</div></div><div class="py-3" data-v-90702515>`);
      _push(ssrRenderComponent(_component_UIForm, {
        onSubmit: ($event) => unref(user).update(form)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-90702515${_scopeId}></div><div class="flex items-center space-x-4" data-v-90702515${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIFormText, {
              id: "firstName",
              modelValue: form.firstName,
              "onUpdate:modelValue": ($event) => form.firstName = $event,
              label: "\u59D3\u6C0F",
              class: "mb-3 flex-1",
              require: true,
              placeholder: "\u8F38\u5165\u59D3\u6C0F"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormText, {
              id: "lastName",
              modelValue: form.lastName,
              "onUpdate:modelValue": ($event) => form.lastName = $event,
              label: "\u540D\u5B57",
              class: "mb-3 flex-1",
              placeholder: "\u8F38\u5165\u540D\u5B57"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UIFormText, {
              id: "phone",
              label: "\u624B\u6A5F\u865F\u78BC",
              class: "mb-3",
              value: (_b = (_a = unref(info)) == null ? void 0 : _a.phone) != null ? _b : "",
              disabled: true
            }, {
              label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/my/account/change-phone",
                    class: "font-bold ml-3 text-blue-400"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u4FEE\u6539 `);
                      } else {
                        return [
                          createTextVNode(" \u4FEE\u6539 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, {
                      to: "/my/account/change-phone",
                      class: "font-bold ml-3 text-blue-400"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u4FEE\u6539 ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormText, {
              id: "password",
              label: "\u5BC6\u78BC",
              class: "mb-3",
              value: "***********",
              disabled: true
            }, {
              label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/my/account/reset-password",
                    class: "font-bold ml-3 text-blue-400"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` \u4FEE\u6539 `);
                      } else {
                        return [
                          createTextVNode(" \u4FEE\u6539 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, {
                      to: "/my/account/reset-password",
                      class: "font-bold ml-3 text-blue-400"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" \u4FEE\u6539 ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormText, {
              id: "email",
              label: "\u4FE1\u7BB1",
              class: "mb-3",
              value: (_d = (_c = unref(info)) == null ? void 0 : _c.email) != null ? _d : "",
              disabled: true
            }, {
              label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2;
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass(
                    ((_a2 = unref(info)) == null ? void 0 : _a2.emailVerify) === "unverified" ? "text-red-400" : ((_b2 = unref(info)) == null ? void 0 : _b2.emailVerify) === "pending" ? "text-amber-500" : "text-green-400"
                  )}" data-v-90702515${_scopeId2}>`);
                  if (((_c2 = unref(info)) == null ? void 0 : _c2.emailVerify) === "verify") {
                    _push3(`<div class="flex items-center font-bold ml-3 space-x-1" data-v-90702515${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-checkmark-circled" }, null, _parent3, _scopeId2));
                    _push3(` \u5DF2\u7D81\u5B9A </div>`);
                  } else if (((_d2 = unref(info)) == null ? void 0 : _d2.emailVerify) === "unverified") {
                    _push3(`<div class="flex items-center font-bold ml-3 space-x-1" data-v-90702515${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-information-circle" }, null, _parent3, _scopeId2));
                    _push3(` \u672A\u7D81\u5B9A </div>`);
                  } else if (((_e2 = unref(info)) == null ? void 0 : _e2.emailVerify) === "pending") {
                    _push3(`<div class="flex items-center font-bold ml-3 space-x-1" data-v-90702515${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-navigate-circle" }, null, _parent3, _scopeId2));
                    _push3(` \u9A57\u8B49\u4E2D </div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/my/account/email-binding",
                    class: "font-bold ml-3 text-blue-400"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a3, _b3;
                      if (_push4) {
                        _push4(`${ssrInterpolate(((_a3 = unref(info)) == null ? void 0 : _a3.emailVerify) === "unverified" ? "\u53BB\u7D81\u5B9A" : "\u4FEE\u6539")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(((_b3 = unref(info)) == null ? void 0 : _b3.emailVerify) === "unverified" ? "\u53BB\u7D81\u5B9A" : "\u4FEE\u6539"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", {
                      class: ((_f2 = unref(info)) == null ? void 0 : _f2.emailVerify) === "unverified" ? "text-red-400" : ((_g2 = unref(info)) == null ? void 0 : _g2.emailVerify) === "pending" ? "text-amber-500" : "text-green-400"
                    }, [
                      ((_h2 = unref(info)) == null ? void 0 : _h2.emailVerify) === "verify" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center font-bold ml-3 space-x-1"
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                        createTextVNode(" \u5DF2\u7D81\u5B9A ")
                      ])) : ((_i2 = unref(info)) == null ? void 0 : _i2.emailVerify) === "unverified" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center font-bold ml-3 space-x-1"
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ion-information-circle" }),
                        createTextVNode(" \u672A\u7D81\u5B9A ")
                      ])) : ((_j2 = unref(info)) == null ? void 0 : _j2.emailVerify) === "pending" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex items-center font-bold ml-3 space-x-1"
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ion-navigate-circle" }),
                        createTextVNode(" \u9A57\u8B49\u4E2D ")
                      ])) : createCommentVNode("", true)
                    ], 2),
                    createVNode(_component_NuxtLink, {
                      to: "/my/account/email-binding",
                      class: "font-bold ml-3 text-blue-400"
                    }, {
                      default: withCtx(() => {
                        var _a3;
                        return [
                          createTextVNode(toDisplayString(((_a3 = unref(info)) == null ? void 0 : _a3.emailVerify) === "unverified" ? "\u53BB\u7D81\u5B9A" : "\u4FEE\u6539"), 1)
                        ];
                      }),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormText, {
              id: "password",
              label: "\u8EAB\u5206\u8B49\u5B57\u865F",
              class: "mb-3",
              value: (_e = unref(info)) == null ? void 0 : _e.idCard,
              disabled: true
            }, {
              label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2;
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle(((_a2 = unref(info)) == null ? void 0 : _a2.identifyVerify) === "verify" ? null : { display: "none" })}" class="flex items-center font-bold ml-3 text-green-400 space-x-1" data-v-90702515${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-checkmark-circled" }, null, _parent3, _scopeId2));
                  _push3(` \u5DF2\u9A57\u8B49 </div>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    style: ((_b2 = unref(info)) == null ? void 0 : _b2.identifyVerify) !== "verify" ? null : { display: "none" },
                    to: "/my/account/identify-verify",
                    class: [
                      ((_c2 = unref(info)) == null ? void 0 : _c2.identifyVerify) === "unverified" ? "text-red-400" : ((_d2 = unref(info)) == null ? void 0 : _d2.identifyVerify) === "pending" ? "text-yellow-400" : "text-gray-400",
                      "flex items-center font-bold ml-3 space-x-1"
                    ]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a3, _b3, _c3, _d3, _e3, _f3;
                      if (_push4) {
                        if (((_a3 = unref(info)) == null ? void 0 : _a3.identifyVerify) === "unverified") {
                          _push4(`<!--[-->`);
                          _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-checkmark-circled" }, null, _parent4, _scopeId3));
                          _push4(` \u672A\u9A57\u8B49 <span class="text-blue-400 pl-1" data-v-90702515${_scopeId3}>\u53BB\u9A57\u8B49</span><!--]-->`);
                        } else if (((_b3 = unref(info)) == null ? void 0 : _b3.identifyVerify) === "pending") {
                          _push4(`<!--[-->`);
                          _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-navigate-circle" }, null, _parent4, _scopeId3));
                          _push4(` \u5BE9\u6838\u4E2D <span class="text-blue-400 pl-1" data-v-90702515${_scopeId3}>\u4FEE\u6539</span><!--]-->`);
                        } else if (((_c3 = unref(info)) == null ? void 0 : _c3.identifyVerify) === "rejected") {
                          _push4(`<!--[-->`);
                          _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-close-circle" }, null, _parent4, _scopeId3));
                          _push4(` \u672A\u901A\u904E <span class="text-blue-400 pl-1" data-v-90702515${_scopeId3}>\u91CD\u65B0\u9A57\u8B49</span><!--]-->`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          ((_d3 = unref(info)) == null ? void 0 : _d3.identifyVerify) === "unverified" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                            createTextVNode(" \u672A\u9A57\u8B49 "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u53BB\u9A57\u8B49")
                          ], 64)) : ((_e3 = unref(info)) == null ? void 0 : _e3.identifyVerify) === "pending" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-navigate-circle" }),
                            createTextVNode(" \u5BE9\u6838\u4E2D "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u4FEE\u6539")
                          ], 64)) : ((_f3 = unref(info)) == null ? void 0 : _f3.identifyVerify) === "rejected" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-close-circle" }),
                            createTextVNode(" \u672A\u901A\u904E "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u91CD\u65B0\u9A57\u8B49")
                          ], 64)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    withDirectives(createVNode("div", { class: "flex items-center font-bold ml-3 text-green-400 space-x-1" }, [
                      createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                      createTextVNode(" \u5DF2\u9A57\u8B49 ")
                    ], 512), [
                      [vShow, ((_e2 = unref(info)) == null ? void 0 : _e2.identifyVerify) === "verify"]
                    ]),
                    withDirectives(createVNode(_component_NuxtLink, {
                      to: "/my/account/identify-verify",
                      class: [
                        ((_f2 = unref(info)) == null ? void 0 : _f2.identifyVerify) === "unverified" ? "text-red-400" : ((_g2 = unref(info)) == null ? void 0 : _g2.identifyVerify) === "pending" ? "text-yellow-400" : "text-gray-400",
                        "flex items-center font-bold ml-3 space-x-1"
                      ]
                    }, {
                      default: withCtx(() => {
                        var _a3, _b3, _c3;
                        return [
                          ((_a3 = unref(info)) == null ? void 0 : _a3.identifyVerify) === "unverified" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                            createTextVNode(" \u672A\u9A57\u8B49 "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u53BB\u9A57\u8B49")
                          ], 64)) : ((_b3 = unref(info)) == null ? void 0 : _b3.identifyVerify) === "pending" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-navigate-circle" }),
                            createTextVNode(" \u5BE9\u6838\u4E2D "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u4FEE\u6539")
                          ], 64)) : ((_c3 = unref(info)) == null ? void 0 : _c3.identifyVerify) === "rejected" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-close-circle" }),
                            createTextVNode(" \u672A\u901A\u904E "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u91CD\u65B0\u9A57\u8B49")
                          ], 64)) : createCommentVNode("", true)
                        ];
                      }),
                      _: 1
                    }, 8, ["class"]), [
                      [vShow, ((_h2 = unref(info)) == null ? void 0 : _h2.identifyVerify) !== "verify"]
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormDate, {
              id: "birthday",
              modelValue: form.birthday,
              "onUpdate:modelValue": ($event) => form.birthday = $event,
              label: "\u751F\u65E5",
              class: "mb-3"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormRadio, {
              modelValue: form.gender,
              "onUpdate:modelValue": ($event) => form.gender = $event,
              border: true,
              class: "mb-3",
              label: "\u6027\u5225",
              options: genderOptions.value
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormEditor, {
              modelValue: form.intro,
              "onUpdate:modelValue": ($event) => form.intro = $event,
              placeholder: "\u4ECB\u7D39\u4E00\u4E0B\u81EA\u5DF1\u5427~",
              class: "mb-3",
              label: "\u7C21\u4ECB"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "flex items-center" }),
              createVNode("div", { class: "flex items-center space-x-4" }, [
                createVNode(_component_UIFormText, {
                  id: "firstName",
                  modelValue: form.firstName,
                  "onUpdate:modelValue": ($event) => form.firstName = $event,
                  label: "\u59D3\u6C0F",
                  class: "mb-3 flex-1",
                  require: true,
                  placeholder: "\u8F38\u5165\u59D3\u6C0F"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_UIFormText, {
                  id: "lastName",
                  modelValue: form.lastName,
                  "onUpdate:modelValue": ($event) => form.lastName = $event,
                  label: "\u540D\u5B57",
                  class: "mb-3 flex-1",
                  placeholder: "\u8F38\u5165\u540D\u5B57"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode(_component_UIFormText, {
                id: "phone",
                label: "\u624B\u6A5F\u865F\u78BC",
                class: "mb-3",
                value: (_g = (_f = unref(info)) == null ? void 0 : _f.phone) != null ? _g : "",
                disabled: true
              }, {
                label: withCtx(() => [
                  createVNode(_component_NuxtLink, {
                    to: "/my/account/change-phone",
                    class: "font-bold ml-3 text-blue-400"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u4FEE\u6539 ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["value"]),
              createVNode(_component_UIFormText, {
                id: "password",
                label: "\u5BC6\u78BC",
                class: "mb-3",
                value: "***********",
                disabled: true
              }, {
                label: withCtx(() => [
                  createVNode(_component_NuxtLink, {
                    to: "/my/account/reset-password",
                    class: "font-bold ml-3 text-blue-400"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" \u4FEE\u6539 ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UIFormText, {
                id: "email",
                label: "\u4FE1\u7BB1",
                class: "mb-3",
                value: (_i = (_h = unref(info)) == null ? void 0 : _h.email) != null ? _i : "",
                disabled: true
              }, {
                label: withCtx(() => {
                  var _a2, _b2, _c2, _d2, _e2;
                  return [
                    createVNode("div", {
                      class: ((_a2 = unref(info)) == null ? void 0 : _a2.emailVerify) === "unverified" ? "text-red-400" : ((_b2 = unref(info)) == null ? void 0 : _b2.emailVerify) === "pending" ? "text-amber-500" : "text-green-400"
                    }, [
                      ((_c2 = unref(info)) == null ? void 0 : _c2.emailVerify) === "verify" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center font-bold ml-3 space-x-1"
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                        createTextVNode(" \u5DF2\u7D81\u5B9A ")
                      ])) : ((_d2 = unref(info)) == null ? void 0 : _d2.emailVerify) === "unverified" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center font-bold ml-3 space-x-1"
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ion-information-circle" }),
                        createTextVNode(" \u672A\u7D81\u5B9A ")
                      ])) : ((_e2 = unref(info)) == null ? void 0 : _e2.emailVerify) === "pending" ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex items-center font-bold ml-3 space-x-1"
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ion-navigate-circle" }),
                        createTextVNode(" \u9A57\u8B49\u4E2D ")
                      ])) : createCommentVNode("", true)
                    ], 2),
                    createVNode(_component_NuxtLink, {
                      to: "/my/account/email-binding",
                      class: "font-bold ml-3 text-blue-400"
                    }, {
                      default: withCtx(() => {
                        var _a3;
                        return [
                          createTextVNode(toDisplayString(((_a3 = unref(info)) == null ? void 0 : _a3.emailVerify) === "unverified" ? "\u53BB\u7D81\u5B9A" : "\u4FEE\u6539"), 1)
                        ];
                      }),
                      _: 1
                    })
                  ];
                }),
                _: 1
              }, 8, ["value"]),
              createVNode(_component_UIFormText, {
                id: "password",
                label: "\u8EAB\u5206\u8B49\u5B57\u865F",
                class: "mb-3",
                value: (_j = unref(info)) == null ? void 0 : _j.idCard,
                disabled: true
              }, {
                label: withCtx(() => {
                  var _a2, _b2, _c2, _d2;
                  return [
                    withDirectives(createVNode("div", { class: "flex items-center font-bold ml-3 text-green-400 space-x-1" }, [
                      createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                      createTextVNode(" \u5DF2\u9A57\u8B49 ")
                    ], 512), [
                      [vShow, ((_a2 = unref(info)) == null ? void 0 : _a2.identifyVerify) === "verify"]
                    ]),
                    withDirectives(createVNode(_component_NuxtLink, {
                      to: "/my/account/identify-verify",
                      class: [
                        ((_b2 = unref(info)) == null ? void 0 : _b2.identifyVerify) === "unverified" ? "text-red-400" : ((_c2 = unref(info)) == null ? void 0 : _c2.identifyVerify) === "pending" ? "text-yellow-400" : "text-gray-400",
                        "flex items-center font-bold ml-3 space-x-1"
                      ]
                    }, {
                      default: withCtx(() => {
                        var _a3, _b3, _c3;
                        return [
                          ((_a3 = unref(info)) == null ? void 0 : _a3.identifyVerify) === "unverified" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                            createTextVNode(" \u672A\u9A57\u8B49 "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u53BB\u9A57\u8B49")
                          ], 64)) : ((_b3 = unref(info)) == null ? void 0 : _b3.identifyVerify) === "pending" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-navigate-circle" }),
                            createTextVNode(" \u5BE9\u6838\u4E2D "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u4FEE\u6539")
                          ], 64)) : ((_c3 = unref(info)) == null ? void 0 : _c3.identifyVerify) === "rejected" ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-close-circle" }),
                            createTextVNode(" \u672A\u901A\u904E "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u91CD\u65B0\u9A57\u8B49")
                          ], 64)) : createCommentVNode("", true)
                        ];
                      }),
                      _: 1
                    }, 8, ["class"]), [
                      [vShow, ((_d2 = unref(info)) == null ? void 0 : _d2.identifyVerify) !== "verify"]
                    ])
                  ];
                }),
                _: 1
              }, 8, ["value"]),
              createVNode(_component_UIFormDate, {
                id: "birthday",
                modelValue: form.birthday,
                "onUpdate:modelValue": ($event) => form.birthday = $event,
                label: "\u751F\u65E5",
                class: "mb-3"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_UIFormRadio, {
                modelValue: form.gender,
                "onUpdate:modelValue": ($event) => form.gender = $event,
                border: true,
                class: "mb-3",
                label: "\u6027\u5225",
                options: genderOptions.value
              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
              createVNode(_component_UIFormEditor, {
                modelValue: form.intro,
                "onUpdate:modelValue": ($event) => form.intro = $event,
                placeholder: "\u4ECB\u7D39\u4E00\u4E0B\u81EA\u5DF1\u5427~",
                class: "mb-3",
                label: "\u7C21\u4ECB"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my/account/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90702515"]]);

export { index as default };
//# sourceMappingURL=index.31f343d8.mjs.map
