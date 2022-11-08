import { computed, reactive, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrIncludeBooleanAttr } from 'vue/server-renderer';

const _sfc_main = {
  __name: "Text",
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
    center: {
      type: Boolean,
      default: false
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
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="${ssrRenderClass([unref(labelSize), "flex items-center mb-2"])}"><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass([[{ "cursor-pointer": __props.id }], "block font-bold tracking-wide"])}">${ssrInterpolate(__props.label)}</label>`);
      ssrRenderSlot(_ctx.$slots, "label", {}, null, _push, _parent);
      _push(`</div><div class="relative model"><input${ssrRenderAttr("id", __props.id)} type="text" class="${ssrRenderClass([{ "text-center": __props.center }, unref(defaultStyle), unref(inputSize)])}"${ssrRenderAttr("placeholder", __props.placeholder)}${ssrRenderAttr("value", props.modelValue || __props.value)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr(__props.required) ? " required" : ""}><div class="absolute transform -translate-y-1/2 right-2 top-1/2">`);
      ssrRenderSlot(_ctx.$slots, "symbol", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Text.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Text.972aa9dd.mjs.map
