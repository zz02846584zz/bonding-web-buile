import { h as useRouter, u as useState, i as useHttpFetchPost, b as __nuxt_component_1 } from '../server.mjs';
import { _ as _sfc_main$2 } from './Form.3e3fa813.mjs';
import { defineComponent, reactive, withCtx, createVNode, useSSRContext, computed, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { ref } from '@vue/runtime-core';
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

const _sfc_main$1 = {
  __name: "Password",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    value: {
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
    size: {
      type: String,
      default: "md"
    },
    id: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const showPw = ref(true);
    const defaultStyle = computed(
      () => props.disabled ? `
  block w-full border cursor-not-allowed
  duration-200
  border-gray-600/[0.3] bg-gray-100
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
      const _component_UnoIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="${ssrRenderClass([unref(labelSize), "flex items-center mb-2"])}"><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass([[{ "cursor-pointer": __props.id }], "block font-bold tracking-wide"])}">${ssrInterpolate(__props.label)}</label>`);
      ssrRenderSlot(_ctx.$slots, "label", {}, null, _push, _parent);
      _push(`</div><div class="flex items-center"><div class="relative model flex-1"><input${ssrRenderAttr("id", __props.id)} class="${ssrRenderClass([unref(defaultStyle), unref(inputSize)])}"${ssrRenderAttr("type", showPw.value ? "password" : "text")}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrRenderAttr("value", __props.modelValue || __props.value)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} autocomplete="on"><div class="absolute flex transform -translate-y-1/2 icon top-1/2 right-2 cursor-pointer">`);
      _push(ssrRenderComponent(_component_UnoIcon, {
        style: showPw.value ? null : { display: "none" },
        class: ["i-ion-eye-outline", { disabled: __props.disabled }]
      }, null, _parent));
      _push(ssrRenderComponent(_component_UnoIcon, {
        style: !showPw.value ? null : { display: "none" }
      }, null, _parent));
      _push(`</div></div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Password.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "reset-password",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: ""
    });
    const router = useRouter();
    const $loading = useState("loading");
    const $alert = useState("alert");
    const $message = useState("message");
    const submit = async () => {
      const { oldPassword, newPassword, newPasswordConfirm } = form;
      if (!oldPassword.length || !newPassword.length || !newPasswordConfirm.length)
        return $message.value = "\u6B04\u4F4D\u4E0D\u80FD\u7559\u7A7A";
      if (newPassword !== newPasswordConfirm)
        return $message.value = "\u65B0\u5BC6\u78BC\u4E0D\u4E00\u81F4";
      $loading.value = true;
      const { error, message } = await useHttpFetchPost("/user/reset-password", {
        body: form
      });
      $loading.value = false;
      if (error && message) {
        return $alert.value = {
          type: "error",
          text: message,
          center: true
        };
      }
      return $alert.value = {
        type: "success",
        title: "\u4FEE\u6539\u6210\u529F",
        action: () => router.go(-1)
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1;
      const _component_UIForm = _sfc_main$2;
      const _component_UIFormPassword = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-center justify-between sticky"><div class="flex items-center space-x-2"><div class="flex items-center cursor-pointer">`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-arrow-back-ios text-sm lg:text-base" }, null, _parent));
      _push(`</div><h1 class="text-xl font-bold"> \u4FEE\u6539\u5BC6\u78BC </h1></div><div class="group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 h-9 leading-9 flex items-center"><span class="pr-2 duration-150"> \u9001\u51FA </span>`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-arrow-forward-ios" }, null, _parent));
      _push(`</div></div><div class="py-3">`);
      _push(ssrRenderComponent(_component_UIForm, { onSubmit: submit }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIFormPassword, {
              id: "old-password",
              modelValue: form.oldPassword,
              "onUpdate:modelValue": ($event) => form.oldPassword = $event,
              class: "mb-3",
              label: "\u820A\u5BC6\u78BC",
              placeholder: "\u8ACB\u8F38\u5165\u820A\u5BC6\u78BC"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormPassword, {
              id: "new-password",
              modelValue: form.newPassword,
              "onUpdate:modelValue": ($event) => form.newPassword = $event,
              class: "mb-3",
              label: "\u65B0\u5BC6\u78BC",
              placeholder: "\u9577\u5EA6\u81F3\u5C11\u70BA8,\u82F1\u6578\u7D44\u5408"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormPassword, {
              id: "new-password-confirm",
              modelValue: form.newPasswordConfirm,
              "onUpdate:modelValue": ($event) => form.newPasswordConfirm = $event,
              label: "\u78BA\u8A8D\u5BC6\u78BC",
              placeholder: "\u518D\u6B21\u8F38\u5165\u65B0\u5BC6\u78BC"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIFormPassword, {
                id: "old-password",
                modelValue: form.oldPassword,
                "onUpdate:modelValue": ($event) => form.oldPassword = $event,
                class: "mb-3",
                label: "\u820A\u5BC6\u78BC",
                placeholder: "\u8ACB\u8F38\u5165\u820A\u5BC6\u78BC"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_UIFormPassword, {
                id: "new-password",
                modelValue: form.newPassword,
                "onUpdate:modelValue": ($event) => form.newPassword = $event,
                class: "mb-3",
                label: "\u65B0\u5BC6\u78BC",
                placeholder: "\u9577\u5EA6\u81F3\u5C11\u70BA8,\u82F1\u6578\u7D44\u5408"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_UIFormPassword, {
                id: "new-password-confirm",
                modelValue: form.newPasswordConfirm,
                "onUpdate:modelValue": ($event) => form.newPasswordConfirm = $event,
                label: "\u78BA\u8A8D\u5BC6\u78BC",
                placeholder: "\u518D\u6B21\u8F38\u5165\u65B0\u5BC6\u78BC"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my/account/reset-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=reset-password.6c47db2a.mjs.map
