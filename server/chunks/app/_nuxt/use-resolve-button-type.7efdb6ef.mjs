import { ref, onMounted, watchEffect } from 'vue';
import { o } from './open-closed.5d362c74.mjs';

function f(r2) {
  throw new Error("Unexpected object: " + r2);
}
var a = ((e) => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(a || {});
function x(r2, n) {
  let t = n.resolveItems();
  if (t.length <= 0)
    return null;
  let l = n.resolveActiveIndex(), s = l != null ? l : -1, d = (() => {
    switch (r2.focus) {
      case 0:
        return t.findIndex((e) => !n.resolveDisabled(e));
      case 1: {
        let e = t.slice().reverse().findIndex((i, c, u) => s !== -1 && u.length - c - 1 >= s ? false : !n.resolveDisabled(i));
        return e === -1 ? e : t.length - 1 - e;
      }
      case 2:
        return t.findIndex((e, i) => i <= s ? false : !n.resolveDisabled(e));
      case 3: {
        let e = t.slice().reverse().findIndex((i) => !n.resolveDisabled(i));
        return e === -1 ? e : t.length - 1 - e;
      }
      case 4:
        return t.findIndex((e) => n.resolveId(e) === r2.id);
      case 5:
        return null;
      default:
        f(r2);
    }
  })();
  return d === -1 ? l : d;
}
function r(t, e) {
  if (t)
    return t;
  let n = e != null ? e : "button";
  if (typeof n == "string" && n.toLowerCase() === "button")
    return "button";
}
function b(t, e) {
  let n = ref(r(t.value.type, t.value.as));
  return onMounted(() => {
    n.value = r(t.value.type, t.value.as);
  }), watchEffect(() => {
    var o$1;
    n.value || !o(e) || o(e) instanceof HTMLButtonElement && !((o$1 = o(e)) != null && o$1.hasAttribute("type")) && (n.value = "button");
  }), n;
}

export { a, b, x };
//# sourceMappingURL=use-resolve-button-type.7efdb6ef.mjs.map
