import { j as useBaseStore, s as storeToRefs, u as useState, i as useHttpFetchPost, b as __nuxt_component_1 } from '../server.mjs';
import { _ as _sfc_main$1 } from './Form.3e3fa813.mjs';
import { _ as _sfc_main$2 } from './Text.972aa9dd.mjs';
import { defineComponent, reactive, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { e as emailRegex } from './regex.b022fd56.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "email-binding",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      email: ""
    });
    const { user } = useBaseStore();
    const { info } = storeToRefs(user);
    const $loading = useState("loading");
    const $alert = useState("alert");
    const $message = useState("message");
    const submit = async () => {
      const { email } = form;
      if (!email.length)
        return $message.value = "\u6B04\u4F4D\u4E0D\u80FD\u7559\u7A7A";
      if (!emailRegex.test(email))
        return $message.value = "\u4FE1\u7BB1\u683C\u5F0F\u932F\u8AA4";
      $loading.value = true;
      const { error, message } = await useHttpFetchPost("/user/email-binding", {
        body: { email }
      });
      $loading.value = false;
      if (error && message) {
        return $alert.value = {
          type: "error",
          text: message,
          center: true
        };
      }
      user.updateField({
        emailVerify: "pending"
      });
      return $alert.value = {
        type: "success",
        title: "\u5DF2\u767C\u9001\u9A57\u8B49\u4FE1\uFF0C\u8ACB\u81F3\u4FE1\u7BB1\u67E5\u6536"
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_UnoIcon = __nuxt_component_1;
      const _component_UIForm = _sfc_main$1;
      const _component_UIFormText = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-center justify-between sticky"><div class="flex items-center space-x-2"><div class="flex items-center cursor-pointer">`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-arrow-back-ios text-sm lg:text-base" }, null, _parent));
      _push(`</div><h1 class="text-xl font-bold">${ssrInterpolate(((_b = (_a = unref(info)) == null ? void 0 : _a.email) == null ? void 0 : _b.length) ? "\u4FEE\u6539" : "\u7D81\u5B9A")}Email </h1></div><div class="group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 h-9 leading-9 flex items-center"><span class="pr-2 duration-150"> \u9001\u51FA </span>`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-arrow-forward-ios" }, null, _parent));
      _push(`</div></div><div class="py-3">`);
      _push(ssrRenderComponent(_component_UIForm, { onSubmit: submit }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIFormText, {
              id: "email",
              modelValue: form.email,
              "onUpdate:modelValue": ($event) => form.email = $event,
              label: "Email",
              class: "mb-3",
              placeholder: "example@domain.com"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIFormText, {
                id: "email",
                modelValue: form.email,
                "onUpdate:modelValue": ($event) => form.email = $event,
                label: "Email",
                class: "mb-3",
                placeholder: "example@domain.com"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my/account/email-binding.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=email-binding.4728e637.mjs.map
