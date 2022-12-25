import { _ as _export_sfc, k as useBaseStore, s as storeToRefs, b as __nuxt_component_1, d as __nuxt_component_0$1 } from '../server.mjs';
import { _ as _sfc_main$3 } from './Form.3e3fa813.mjs';
import { _ as _sfc_main$4 } from './Text.804f8c43.mjs';
import { useSSRContext, defineComponent, reactive, ref, watch, computed, unref, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, withDirectives, vShow, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderSlot, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './Editor.c7df55dc.mjs';
import 'ohmyfetch';
import 'hookable';
import 'unctx';
import 'destr';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import '@unhead/ssr';
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
      type: Number,
      default: NaN
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-group form-group_input__radio" }, _attrs))} data-v-e8c98730><label${ssrRenderAttr("for", __props.id)} class="block mb-2 font-bold tracking-wide cursor-pointer text-sm" data-v-e8c98730>${ssrInterpolate(__props.label)}</label><div role="radiogroup" class="${ssrRenderClass([[unref(defaultStyle), unref(inputSizeStyles).md], "flex flex-wrap space-x-3"])}" data-v-e8c98730><!--[-->`);
      ssrRenderList(__props.options, (option, index2) => {
        _push(`<div class="flex items-center py-3" data-v-e8c98730><div class="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative" data-v-e8c98730><input${ssrRenderAttr("id", option.value)}${ssrIncludeBooleanAttr(__props.modelValue === option.value || index2 === 0) ? " checked" : ""}${ssrRenderAttr("value", option.value)} type="radio" name="radio" class="checkbox appearance-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none" data-v-e8c98730><div class="check-icon hidden border-4 border-indigo-700 rounded-full w-full h-full z-1" data-v-e8c98730></div></div><label${ssrRenderAttr("for", option.value)} class="ml-2 text-sm leading-4 font-normal text-gray-800 dark:text-gray-100" data-v-e8c98730>${ssrInterpolate(option.label)}</label></div>`);
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
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e8c98730"]]);
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
    const userInfo = reactive({
      phone: "",
      email: "",
      idCard: "",
      emailStatus: 17,
      identityStatus: 24
    });
    const { user } = useBaseStore();
    const { info } = storeToRefs(user);
    const setForm = () => {
      var _a, _b;
      for (const item in form)
        form[item] = ((_a = info.value) == null ? void 0 : _a[item]) || "";
      for (const item in userInfo)
        userInfo[item] = ((_b = info.value) == null ? void 0 : _b[item]) || "";
    };
    const genderOptions = ref([
      { value: "male", label: "\u7537\u6027" },
      { value: "female", label: "\u5973\u6027" }
    ]);
    watch(info, () => {
      setForm();
    });
    const emailStatusColor = reactive({
      17: "text-red-400",
      18: "text-amber-500",
      19: "text-red-400",
      20: "text-green-400"
    });
    const emailColor = computed(() => {
      return emailStatusColor[userInfo.emailStatus];
    });
    const identityStatusColor = {
      24: "text-red-400",
      21: "text-amber-500",
      22: "text-red-400",
      23: "text-green-400"
    };
    const identityColor = computed(() => {
      return identityStatusColor[userInfo.identityStatus];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1;
      const _component_UIForm = _sfc_main$3;
      const _component_UIFormText = _sfc_main$4;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UIFormDate = __nuxt_component_4;
      const _component_UIFormRadio = __nuxt_component_5;
      const _component_UIFormEditor = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-6cb4f630><div class="flex flex-wrap items-center justify-between sticky" data-v-6cb4f630><div class="flex" data-v-6cb4f630><div class="lg:hidden mr-2 flex items-center cursor-pointer" data-v-6cb4f630>`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-arrow-back-ios text-sm lg:text-base" }, null, _parent));
      _push(`</div><h1 class="text-lg lg:text-xl font-bold" data-v-6cb4f630> \u5E33\u865F\u7BA1\u7406 </h1></div><div class="group rounded-full cursor-pointer bg-green-500 text-white text-sm font-bold px-4 h-8 leading-8 flex items-center" data-v-6cb4f630><span class="pr-1 duration-150" data-v-6cb4f630> \u4FDD\u5B58 </span>`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-baseline-save-alt" }, null, _parent));
      _push(`</div></div><div class="py-3" data-v-6cb4f630>`);
      _push(ssrRenderComponent(_component_UIForm, {
        onSubmit: ($event) => unref(user).update(unref(form))
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center" data-v-6cb4f630${_scopeId}></div><div class="flex items-center space-x-4" data-v-6cb4f630${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIFormText, {
              id: "firstName",
              modelValue: unref(form).firstName,
              "onUpdate:modelValue": ($event) => unref(form).firstName = $event,
              label: "\u59D3\u6C0F",
              class: "mb-3 flex-1",
              require: true,
              placeholder: "\u8F38\u5165\u59D3\u6C0F"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormText, {
              id: "lastName",
              modelValue: unref(form).lastName,
              "onUpdate:modelValue": ($event) => unref(form).lastName = $event,
              label: "\u540D\u5B57",
              class: "mb-3 flex-1",
              placeholder: "\u8F38\u5165\u540D\u5B57"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UIFormText, {
              id: "phone",
              label: "\u624B\u6A5F\u865F\u78BC",
              class: "mb-3",
              value: unref(userInfo).phone,
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
              value: unref(userInfo).email,
              disabled: true
            }, {
              label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d, _e, _f;
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass(unref(emailColor))}" data-v-6cb4f630${_scopeId2}>`);
                  if (((_a = unref(info)) == null ? void 0 : _a.emailStatus) === 20) {
                    _push3(`<div class="flex items-center font-bold ml-3 space-x-1" data-v-6cb4f630${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-checkmark-circled" }, null, _parent3, _scopeId2));
                    _push3(` \u5DF2\u7D81\u5B9A </div>`);
                  } else if (((_b = unref(info)) == null ? void 0 : _b.emailStatus) === 17) {
                    _push3(`<div class="flex items-center font-bold ml-3 space-x-1" data-v-6cb4f630${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-information-circle" }, null, _parent3, _scopeId2));
                    _push3(` \u672A\u7D81\u5B9A </div>`);
                  } else if (((_c = unref(info)) == null ? void 0 : _c.emailStatus) === 18) {
                    _push3(`<div class="flex items-center font-bold ml-3 space-x-1" data-v-6cb4f630${_scopeId2}>`);
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
                      var _a2, _b2;
                      if (_push4) {
                        _push4(`${ssrInterpolate(((_a2 = unref(info)) == null ? void 0 : _a2.emailStatus) === 17 ? "\u53BB\u7D81\u5B9A" : "\u4FEE\u6539")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(((_b2 = unref(info)) == null ? void 0 : _b2.emailStatus) === 17 ? "\u53BB\u7D81\u5B9A" : "\u4FEE\u6539"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: unref(emailColor) }, [
                      ((_d = unref(info)) == null ? void 0 : _d.emailStatus) === 20 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center font-bold ml-3 space-x-1"
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                        createTextVNode(" \u5DF2\u7D81\u5B9A ")
                      ])) : ((_e = unref(info)) == null ? void 0 : _e.emailStatus) === 17 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center font-bold ml-3 space-x-1"
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ion-information-circle" }),
                        createTextVNode(" \u672A\u7D81\u5B9A ")
                      ])) : ((_f = unref(info)) == null ? void 0 : _f.emailStatus) === 18 ? (openBlock(), createBlock("div", {
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
                        var _a2;
                        return [
                          createTextVNode(toDisplayString(((_a2 = unref(info)) == null ? void 0 : _a2.emailStatus) === 17 ? "\u53BB\u7D81\u5B9A" : "\u4FEE\u6539"), 1)
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
              value: unref(userInfo).idCard,
              disabled: true
            }, {
              label: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(`<div style="${ssrRenderStyle(((_a = unref(info)) == null ? void 0 : _a.identityStatus) === 23 ? null : { display: "none" })}" class="flex items-center font-bold ml-3 text-green-400 space-x-1" data-v-6cb4f630${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-checkmark-circled" }, null, _parent3, _scopeId2));
                  _push3(` \u5DF2\u9A57\u8B49 </div>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    style: ((_b = unref(info)) == null ? void 0 : _b.identityStatus) !== 23 ? null : { display: "none" },
                    to: "/my/account/identity-verify",
                    class: [unref(identityColor), "flex items-center font-bold ml-3 space-x-1"]
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2, _c2, _d2, _e, _f;
                      if (_push4) {
                        if (((_a2 = unref(info)) == null ? void 0 : _a2.identityStatus) === 24) {
                          _push4(`<!--[-->`);
                          _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-checkmark-circled" }, null, _parent4, _scopeId3));
                          _push4(` \u672A\u9A57\u8B49 <span class="text-blue-400 pl-1" data-v-6cb4f630${_scopeId3}>\u53BB\u9A57\u8B49</span><!--]-->`);
                        } else if (((_b2 = unref(info)) == null ? void 0 : _b2.identityStatus) === 21) {
                          _push4(`<!--[-->`);
                          _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-navigate-circle" }, null, _parent4, _scopeId3));
                          _push4(` \u5BE9\u6838\u4E2D <span class="text-blue-400 pl-1" data-v-6cb4f630${_scopeId3}>\u4FEE\u6539</span><!--]-->`);
                        } else if (((_c2 = unref(info)) == null ? void 0 : _c2.identityStatus) === 22) {
                          _push4(`<!--[-->`);
                          _push4(ssrRenderComponent(_component_UnoIcon, { class: "i-ion-close-circle" }, null, _parent4, _scopeId3));
                          _push4(` \u672A\u901A\u904E <span class="text-blue-400 pl-1" data-v-6cb4f630${_scopeId3}>\u91CD\u65B0\u9A57\u8B49</span><!--]-->`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          ((_d2 = unref(info)) == null ? void 0 : _d2.identityStatus) === 24 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                            createTextVNode(" \u672A\u9A57\u8B49 "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u53BB\u9A57\u8B49")
                          ], 64)) : ((_e = unref(info)) == null ? void 0 : _e.identityStatus) === 21 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-navigate-circle" }),
                            createTextVNode(" \u5BE9\u6838\u4E2D "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u4FEE\u6539")
                          ], 64)) : ((_f = unref(info)) == null ? void 0 : _f.identityStatus) === 22 ? (openBlock(), createBlock(Fragment, { key: 2 }, [
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
                      [vShow, ((_c = unref(info)) == null ? void 0 : _c.identityStatus) === 23]
                    ]),
                    withDirectives(createVNode(_component_NuxtLink, {
                      to: "/my/account/identity-verify",
                      class: [unref(identityColor), "flex items-center font-bold ml-3 space-x-1"]
                    }, {
                      default: withCtx(() => {
                        var _a2, _b2, _c2;
                        return [
                          ((_a2 = unref(info)) == null ? void 0 : _a2.identityStatus) === 24 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                            createTextVNode(" \u672A\u9A57\u8B49 "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u53BB\u9A57\u8B49")
                          ], 64)) : ((_b2 = unref(info)) == null ? void 0 : _b2.identityStatus) === 21 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-navigate-circle" }),
                            createTextVNode(" \u5BE9\u6838\u4E2D "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u4FEE\u6539")
                          ], 64)) : ((_c2 = unref(info)) == null ? void 0 : _c2.identityStatus) === 22 ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-close-circle" }),
                            createTextVNode(" \u672A\u901A\u904E "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u91CD\u65B0\u9A57\u8B49")
                          ], 64)) : createCommentVNode("", true)
                        ];
                      }),
                      _: 1
                    }, 8, ["class"]), [
                      [vShow, ((_d = unref(info)) == null ? void 0 : _d.identityStatus) !== 23]
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormDate, {
              id: "birthday",
              modelValue: unref(form).birthday,
              "onUpdate:modelValue": ($event) => unref(form).birthday = $event,
              label: "\u751F\u65E5",
              class: "mb-3"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormRadio, {
              modelValue: unref(form).gender,
              "onUpdate:modelValue": ($event) => unref(form).gender = $event,
              border: true,
              class: "mb-3",
              label: "\u6027\u5225",
              options: unref(genderOptions)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormEditor, {
              modelValue: unref(form).intro,
              "onUpdate:modelValue": ($event) => unref(form).intro = $event,
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
                  modelValue: unref(form).firstName,
                  "onUpdate:modelValue": ($event) => unref(form).firstName = $event,
                  label: "\u59D3\u6C0F",
                  class: "mb-3 flex-1",
                  require: true,
                  placeholder: "\u8F38\u5165\u59D3\u6C0F"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_UIFormText, {
                  id: "lastName",
                  modelValue: unref(form).lastName,
                  "onUpdate:modelValue": ($event) => unref(form).lastName = $event,
                  label: "\u540D\u5B57",
                  class: "mb-3 flex-1",
                  placeholder: "\u8F38\u5165\u540D\u5B57"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode(_component_UIFormText, {
                id: "phone",
                label: "\u624B\u6A5F\u865F\u78BC",
                class: "mb-3",
                value: unref(userInfo).phone,
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
                value: unref(userInfo).email,
                disabled: true
              }, {
                label: withCtx(() => {
                  var _a, _b, _c;
                  return [
                    createVNode("div", { class: unref(emailColor) }, [
                      ((_a = unref(info)) == null ? void 0 : _a.emailStatus) === 20 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex items-center font-bold ml-3 space-x-1"
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                        createTextVNode(" \u5DF2\u7D81\u5B9A ")
                      ])) : ((_b = unref(info)) == null ? void 0 : _b.emailStatus) === 17 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center font-bold ml-3 space-x-1"
                      }, [
                        createVNode(_component_UnoIcon, { class: "i-ion-information-circle" }),
                        createTextVNode(" \u672A\u7D81\u5B9A ")
                      ])) : ((_c = unref(info)) == null ? void 0 : _c.emailStatus) === 18 ? (openBlock(), createBlock("div", {
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
                        var _a2;
                        return [
                          createTextVNode(toDisplayString(((_a2 = unref(info)) == null ? void 0 : _a2.emailStatus) === 17 ? "\u53BB\u7D81\u5B9A" : "\u4FEE\u6539"), 1)
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
                value: unref(userInfo).idCard,
                disabled: true
              }, {
                label: withCtx(() => {
                  var _a, _b;
                  return [
                    withDirectives(createVNode("div", { class: "flex items-center font-bold ml-3 text-green-400 space-x-1" }, [
                      createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                      createTextVNode(" \u5DF2\u9A57\u8B49 ")
                    ], 512), [
                      [vShow, ((_a = unref(info)) == null ? void 0 : _a.identityStatus) === 23]
                    ]),
                    withDirectives(createVNode(_component_NuxtLink, {
                      to: "/my/account/identity-verify",
                      class: [unref(identityColor), "flex items-center font-bold ml-3 space-x-1"]
                    }, {
                      default: withCtx(() => {
                        var _a2, _b2, _c;
                        return [
                          ((_a2 = unref(info)) == null ? void 0 : _a2.identityStatus) === 24 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-checkmark-circled" }),
                            createTextVNode(" \u672A\u9A57\u8B49 "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u53BB\u9A57\u8B49")
                          ], 64)) : ((_b2 = unref(info)) == null ? void 0 : _b2.identityStatus) === 21 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-navigate-circle" }),
                            createTextVNode(" \u5BE9\u6838\u4E2D "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u4FEE\u6539")
                          ], 64)) : ((_c = unref(info)) == null ? void 0 : _c.identityStatus) === 22 ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                            createVNode(_component_UnoIcon, { class: "i-ion-close-circle" }),
                            createTextVNode(" \u672A\u901A\u904E "),
                            createVNode("span", { class: "text-blue-400 pl-1" }, "\u91CD\u65B0\u9A57\u8B49")
                          ], 64)) : createCommentVNode("", true)
                        ];
                      }),
                      _: 1
                    }, 8, ["class"]), [
                      [vShow, ((_b = unref(info)) == null ? void 0 : _b.identityStatus) !== 23]
                    ])
                  ];
                }),
                _: 1
              }, 8, ["value"]),
              createVNode(_component_UIFormDate, {
                id: "birthday",
                modelValue: unref(form).birthday,
                "onUpdate:modelValue": ($event) => unref(form).birthday = $event,
                label: "\u751F\u65E5",
                class: "mb-3"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_UIFormRadio, {
                modelValue: unref(form).gender,
                "onUpdate:modelValue": ($event) => unref(form).gender = $event,
                border: true,
                class: "mb-3",
                label: "\u6027\u5225",
                options: unref(genderOptions)
              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
              createVNode(_component_UIFormEditor, {
                modelValue: unref(form).intro,
                "onUpdate:modelValue": ($event) => unref(form).intro = $event,
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6cb4f630"]]);

export { index as default };
//# sourceMappingURL=index.90706268.mjs.map
