import { u as useState, q as useRouter, r as useHttpFetchPost, s as useBaseStore, t as _sfc_main$q, v as _sfc_main$p, z as __nuxt_component_2 } from '../server.mjs';
import { defineComponent, reactive, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { F as FluentArrowLeft12Filled, M as MdiArrowRightThin } from './arrow-right-thin.7e2e53d3.mjs';
import { i as idCardRegex } from './regex.2eecabee.mjs';
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
  __name: "identify-verify",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      idCard: "",
      positive: "",
      negative: ""
    });
    const $loading = useState("loading");
    const $alert = useState("alert");
    const router = useRouter();
    const verify = () => {
      if (!idCardRegex.test(form.idCard)) {
        return $alert.value = {
          type: "error",
          text: "\u8EAB\u5206\u8B49\u683C\u5F0F\u932F\u8AA4",
          center: true
        };
      }
      if (!form.positive.length) {
        return $alert.value = {
          type: "error",
          text: "\u8EAB\u5206\u8B49\u6B63\u9762\u5C1A\u672A\u4E0A\u50B3",
          center: true
        };
      }
      if (!form.negative.length) {
        return $alert.value = {
          type: "error",
          text: "\u8EAB\u5206\u8B49\u80CC\u9762\u5C1A\u672A\u4E0A\u50B3",
          center: true
        };
      }
      submit();
    };
    const submit = async () => {
      $loading.value = true;
      const { error, message } = await useHttpFetchPost("/user/identify-verify", {
        body: form,
        multipart: true
      });
      $loading.value = false;
      if (error && message) {
        return $alert.value = {
          type: "error",
          text: message,
          center: true
        };
      }
      const { user } = useBaseStore();
      user.updateField({ identifyVerify: "pending", idCard: form.idCard });
      return $alert.value = {
        type: "success",
        text: "\u4E0A\u50B3\u6210\u529F\uFF0C\u7B49\u5F85\u7BA1\u7406\u54E1\u5BE9\u6838",
        center: true,
        action: () => router.push("/my/account")
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIForm = _sfc_main$q;
      const _component_UIFormText = _sfc_main$p;
      const _component_UIFormImage = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-center justify-between sticky"><div class="flex items-center space-x-2"><div class="flex items-center cursor-pointer">`);
      _push(ssrRenderComponent(unref(FluentArrowLeft12Filled), { class: "text-sm lg:text-base" }, null, _parent));
      _push(`</div><h1 class="text-xl font-bold">\u8EAB\u4EFD\u9A57\u8B49</h1></div><div class="group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 h-9 leading-9 flex items-center"><span class="pr-2 duration-150"> \u9001\u51FA </span>`);
      _push(ssrRenderComponent(unref(MdiArrowRightThin), null, null, _parent));
      _push(`</div></div><div class="py-3">`);
      _push(ssrRenderComponent(_component_UIForm, {
        class: "max-w-[28em]",
        onSubmit: verify
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIFormText, {
              modelValue: form.idCard,
              "onUpdate:modelValue": ($event) => form.idCard = $event,
              label: "\u8EAB\u5206\u8B49\u5B57\u865F",
              class: "mb-5",
              require: true,
              placeholder: "\u4F8B: A123456789"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormImage, {
              id: "positive",
              modelValue: form.positive,
              "onUpdate:modelValue": ($event) => form.positive = $event,
              label: "\u8EAB\u5206\u8B49\u6B63\u9762",
              class: "mb-5",
              require: true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UIFormImage, {
              id: "negative",
              modelValue: form.negative,
              "onUpdate:modelValue": ($event) => form.negative = $event,
              label: "\u8EAB\u5206\u8B49\u80CC\u9762",
              require: true
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIFormText, {
                modelValue: form.idCard,
                "onUpdate:modelValue": ($event) => form.idCard = $event,
                label: "\u8EAB\u5206\u8B49\u5B57\u865F",
                class: "mb-5",
                require: true,
                placeholder: "\u4F8B: A123456789"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_UIFormImage, {
                id: "positive",
                modelValue: form.positive,
                "onUpdate:modelValue": ($event) => form.positive = $event,
                label: "\u8EAB\u5206\u8B49\u6B63\u9762",
                class: "mb-5",
                require: true
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_UIFormImage, {
                id: "negative",
                modelValue: form.negative,
                "onUpdate:modelValue": ($event) => form.negative = $event,
                label: "\u8EAB\u5206\u8B49\u80CC\u9762",
                require: true
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my/account/identify-verify.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=identify-verify.e081d099.mjs.map
