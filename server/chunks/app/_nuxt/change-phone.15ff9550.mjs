import { u as useState, h as useRouter, i as useHttpFetchPost, j as useBaseStore, b as __nuxt_component_1 } from '../server.mjs';
import { _ as _sfc_main$2 } from './Form.3e3fa813.mjs';
import { _ as _sfc_main$3 } from './Text.804f8c43.mjs';
import { defineComponent, reactive, withCtx, createVNode, useSSRContext, ref, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { p as phoneRegex } from './regex.b022fd56.mjs';
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

const _sfc_main$1 = {
  __name: "Captcha",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    id: {
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
    length: {
      type: Number,
      default: 6
    },
    getCaptcha: {
      type: Function,
      default: () => {
      }
    }
  },
  emits: ["update:modelValue", "captcha"],
  setup(__props, { emit }) {
    const defaultStyle = `
  block w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800
`;
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-1 form-group form-group__captcha" }, _attrs))}><label${ssrRenderAttr("for", __props.id)} class="block mb-2 font-bold tracking-wide cursor-pointer text-sm">${ssrInterpolate(__props.label)}</label><div class="flex"><input${ssrRenderAttr("placeholder", __props.placeholder)} class="${ssrRenderClass([defaultStyle, "h-10 px-4 text-base rounded"])}" type="text"${ssrRenderAttr("value", __props.modelValue)}></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Captcha.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "change-phone",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      phone: "",
      verifyCode: ""
    });
    const $message = useState("message");
    const $alert = useState("alert");
    const $loading = useState("loading");
    const getCaptcha = async () => {
      if (!form.phone.length)
        return $message.value = "\u5C1A\u672A\u8F38\u5165\u624B\u6A5F\u865F\u78BC";
      if (!phoneRegex.test(form.phone))
        return $message.value = "\u865F\u78BC\u683C\u5F0F\u932F\u8AA4";
      $loading.value = true;
      const { data, error, message } = await useHttpFetchPost(
        "/auth/change-captcha",
        {
          body: { phone: form.phone }
        }
      );
      $loading.value = false;
      if (error && message) {
        $alert.value = {
          type: "error",
          text: message,
          center: true
        };
      }
      if (data)
        $alert.value = { type: "success", title: "\u767C\u9001\u6210\u529F\uFF0C\u8ACB\u7559\u610F\u624B\u6A5F\u7C21\u8A0A" };
    };
    const router = useRouter();
    const submit = async () => {
      const $loading2 = useState("loading");
      $loading2.value = true;
      const { data, error, message } = await useHttpFetchPost(
        "/user/change-phone",
        { body: form }
      );
      $loading2.value = false;
      if (error && message) {
        $alert.value = {
          type: "error",
          text: message,
          center: true
        };
      }
      if (data) {
        $alert.value = {
          type: "success",
          title: "\u4FEE\u6539\u6210\u529F",
          action: () => router.go(-1)
        };
        const { user } = useBaseStore();
        user.updateField({ phone: form.phone });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1;
      const _component_UIForm = _sfc_main$2;
      const _component_UIFormText = _sfc_main$3;
      const _component_UIFormCaptcha = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-center justify-between sticky"><div class="flex items-center space-x-2"><div class="flex items-center cursor-pointer">`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-arrow-back-ios text-sm lg:text-base" }, null, _parent));
      _push(`</div><h1 class="text-xl font-bold"> \u4FEE\u6539\u865F\u78BC </h1></div><div class="group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 h-9 leading-9 flex items-center"><span class="pr-1 duration-150"> \u9001\u51FA </span>`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-arrow-forward-ios" }, null, _parent));
      _push(`</div></div><div class="py-3">`);
      _push(ssrRenderComponent(_component_UIForm, { onSubmit: submit }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIFormText, {
              id: "phone",
              modelValue: form.phone,
              "onUpdate:modelValue": ($event) => form.phone = $event,
              label: "\u624B\u6A5F",
              class: "mb-3",
              placeholder: "09xxxxxxxx",
              "is-phone": true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormCaptcha, {
              id: "captcha",
              modelValue: form.verifyCode,
              "onUpdate:modelValue": ($event) => form.verifyCode = $event,
              class: "mb-10",
              label: "\u9A57\u8B49\u78BC",
              placeholder: "\u8ACB\u8F38\u5165\u624B\u6A5F\u9A57\u8B49\u78BC",
              onCaptcha: getCaptcha
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIFormText, {
                id: "phone",
                modelValue: form.phone,
                "onUpdate:modelValue": ($event) => form.phone = $event,
                label: "\u624B\u6A5F",
                class: "mb-3",
                placeholder: "09xxxxxxxx",
                "is-phone": true
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_UIFormCaptcha, {
                id: "captcha",
                modelValue: form.verifyCode,
                "onUpdate:modelValue": ($event) => form.verifyCode = $event,
                class: "mb-10",
                label: "\u9A57\u8B49\u78BC",
                placeholder: "\u8ACB\u8F38\u5165\u624B\u6A5F\u9A57\u8B49\u78BC",
                onCaptcha: getCaptcha
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my/account/change-phone.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=change-phone.15ff9550.mjs.map
