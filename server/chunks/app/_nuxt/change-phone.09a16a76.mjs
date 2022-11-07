import { u as useState, q as useRouter, r as useHttpFetchPost, s as useBaseStore, t as _sfc_main$q, v as _sfc_main$p, w as _sfc_main$o } from '../server.mjs';
import { defineComponent, reactive, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { F as FluentArrowLeft12Filled, M as MdiArrowRightThin } from './arrow-right-thin.7e2e53d3.mjs';
import { p as phoneRegex } from './regex.2eecabee.mjs';
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
      const _component_UIForm = _sfc_main$q;
      const _component_UIFormText = _sfc_main$p;
      const _component_UIFormCaptcha = _sfc_main$o;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-center justify-between sticky"><div class="flex items-center space-x-2"><div class="flex items-center cursor-pointer">`);
      _push(ssrRenderComponent(unref(FluentArrowLeft12Filled), { class: "text-sm lg:text-base" }, null, _parent));
      _push(`</div><h1 class="text-xl font-bold">\u4FEE\u6539\u865F\u78BC</h1></div><div class="group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 h-9 leading-9 flex items-center"><span class="pr-1 duration-150"> \u9001\u51FA </span>`);
      _push(ssrRenderComponent(unref(MdiArrowRightThin), null, null, _parent));
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
              placeholder: "09xxxxxxxx"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormCaptcha, {
              id: "captcha",
              modelValue: form.verifyCode,
              "onUpdate:modelValue": ($event) => form.verifyCode = $event,
              class: "mb-10",
              label: "\u9A57\u8B49\u78BC",
              placeholder: "\u8ACB\u8F38\u5165\u9A57\u8B49\u78BC",
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
                placeholder: "09xxxxxxxx"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_UIFormCaptcha, {
                id: "captcha",
                modelValue: form.verifyCode,
                "onUpdate:modelValue": ($event) => form.verifyCode = $event,
                class: "mb-10",
                label: "\u9A57\u8B49\u78BC",
                placeholder: "\u8ACB\u8F38\u5165\u9A57\u8B49\u78BC",
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
//# sourceMappingURL=change-phone.09a16a76.mjs.map
