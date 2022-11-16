import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main$1 = {
  __name: "SortDropdown",
  __ssrInlineRender: true,
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ["select"],
  setup(__props, { emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SortDropdown.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Filter",
  __ssrInlineRender: true,
  setup(__props) {
    const filterOptions = ref([
      { text: "\u89C0\u770B\u6B21\u6578", value: "" },
      { text: "\u6536\u85CF\u6B21\u6578", value: "" },
      { text: "\u4E0A\u50B3\u65E5\u671F(\u6700\u65B0)", value: "" },
      { text: "\u4E0A\u50B3\u65E5\u671F(\u6700\u820A)", value: "" }
    ]);
    const filterSelect = (select) => {
      return select;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SortDropdown = _sfc_main$1;
      _push(ssrRenderComponent(_component_SortDropdown, mergeProps({
        options: filterOptions.value,
        onSelect: filterSelect
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Article/Filter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=Filter.4f5e2cf5.mjs.map
