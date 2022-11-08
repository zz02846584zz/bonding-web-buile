import { defineComponent } from 'vue';
import { P } from './open-closed.5d362c74.mjs';

var a = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(a || {});
let f = defineComponent({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(r, { slots: t, attrs: d }) {
  return () => {
    let { features: e, ...o } = r, n = { "aria-hidden": (e & 2) === 2 ? true : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(e & 4) === 4 && (e & 2) !== 2 && { display: "none" } } };
    return P({ ourProps: n, theirProps: o, slot: {}, attrs: d, slots: t, name: "Hidden" });
  };
} });

export { a, f };
//# sourceMappingURL=hidden.2d41d324.mjs.map
