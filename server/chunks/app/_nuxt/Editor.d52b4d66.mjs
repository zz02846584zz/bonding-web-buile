import { _ as _export_sfc, m as __nuxt_component_0$1 } from '../server.mjs';
import { useSSRContext, defineComponent, computed, reactive, ref, watch, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Editor",
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
    size: {
      type: String,
      default: "md"
    },
    id: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  async setup(__props, { emit }) {
    const props = __props;
    computed(
      () => `
  w-full border
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
      lg: "text-lg rounded-lg",
      md: "text-base rounded",
      sm: "text-sm rounded",
      xs: "text-xs rounded"
    });
    const labelSize = computed(
      () => labelSizeStyles[props.size] || labelSizeStyles.md
    );
    computed(
      () => inputSizeStyles[props.size] || inputSizeStyles.md
    );
    const editor = ref(null);
    watch(
      () => props.modelValue,
      (val) => {
        if (!val.length)
          editor.value.setHTML("");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-118f78e4>`);
      if (__props.label) {
        _push(`<div class="${ssrRenderClass([unref(labelSize), "fic mb-2"])}" data-v-118f78e4><label${ssrRenderAttr("for", __props.id)} class="${ssrRenderClass([[{ "cursor-pointer": __props.id }], "block font-bold tracking-wide"])}" data-v-118f78e4>${ssrInterpolate(__props.label)}</label>`);
        ssrRenderSlot(_ctx.$slots, "label", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative model" data-v-118f78e4>`);
      _push(ssrRenderComponent(_component_client_only, null, null, _parent));
      _push(`<div class="absolute transform -translate-y-1/2 right-2 top-1/2" data-v-118f78e4>`);
      ssrRenderSlot(_ctx.$slots, "symbol", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Form/Editor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-118f78e4"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=Editor.d52b4d66.mjs.map
