import { defineComponent, ref, useSSRContext } from 'vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Filter",
  __ssrInlineRender: true,
  setup(__props) {
    ref([
      { text: "\u89C0\u770B\u6B21\u6578", value: "" },
      { text: "\u6536\u85CF\u6B21\u6578", value: "" },
      { text: "\u4E0A\u50B3\u65E5\u671F(\u6700\u65B0)", value: "" },
      { text: "\u4E0A\u50B3\u65E5\u671F(\u6700\u820A)", value: "" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      {
        _push(`<!---->`);
      }
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
//# sourceMappingURL=Filter.71d2e24a.mjs.map
