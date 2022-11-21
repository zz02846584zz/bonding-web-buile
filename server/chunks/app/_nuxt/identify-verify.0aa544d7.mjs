import { u as useState, h as useRouter, q as idCardRegex, b as __nuxt_component_1, _ as _export_sfc, j as useHttpFetchPost, k as useBaseStore } from '../server.mjs';
import { _ as _sfc_main$2 } from './Form.3e3fa813.mjs';
import { _ as _sfc_main$3 } from './Text.804f8c43.mjs';
import { useSSRContext, defineComponent, reactive, withCtx, createVNode, ref, computed, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Image",
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
    const imageData = ref("");
    const labelSizeStyles = reactive({
      lg: "text-base",
      md: "text-sm",
      sm: "text-xs",
      xs: "text-xs"
    });
    const labelSize = computed(() => labelSizeStyles.md);
    useState("message");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-cd586c4d><div class="${ssrRenderClass([unref(labelSize), "flex items-center mb-2"])}" data-v-cd586c4d><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass([[{ "cursor-pointer": __props.id }], "block font-bold tracking-wide"])}" data-v-cd586c4d>${ssrInterpolate(__props.label)}</label>`);
      ssrRenderSlot(_ctx.$slots, "label", {}, null, _push, _parent);
      _push(`</div><div class="${ssrRenderClass([{ model: !imageData.value }, "relative border border-gray-300 border-opacity-40 rounded dark:bg-white/[0.05] bg-gray-100"])}" data-v-cd586c4d>`);
      if (imageData.value.length > 0) {
        _push(`<div data-v-cd586c4d><img class="preview w-full h-full"${ssrRenderAttr("src", imageData.value)} data-v-cd586c4d></div>`);
      } else {
        _push(`<div class="p-c text-xs" data-v-cd586c4d>\u9EDE\u64CA\u4E0A\u50B3\u5716\u7247</div>`);
      }
      _push(`<input${ssrRenderAttr("id", __props.id)} type="file" accept="image/*" class="absolute w-full h-full cursor-pointer opacity-0 top-0 left-0"${ssrIncludeBooleanAttr(__props.required) ? " required" : ""} data-v-cd586c4d></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Image.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-cd586c4d"]]);
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UnoIcon = __nuxt_component_1;
      const _component_UIForm = _sfc_main$2;
      const _component_UIFormText = _sfc_main$3;
      const _component_UIFormImage = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-center justify-between sticky"><div class="flex items-center space-x-2"><div class="flex items-center cursor-pointer">`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-arrow-back-ios text-sm lg:text-base" }, null, _parent));
      _push(`</div><h1 class="text-xl font-bold"> \u8EAB\u4EFD\u9A57\u8B49 </h1></div><div class="group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 h-9 leading-9 flex items-center"><span class="pr-2 duration-150"> \u9001\u51FA </span>`);
      _push(ssrRenderComponent(_component_UnoIcon, { class: "i-ic-round-arrow-forward-ios" }, null, _parent));
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
//# sourceMappingURL=identify-verify.0aa544d7.mjs.map
