import { ref, computed, nextTick } from 'vue';
import { u } from './open-closed.5d362c74.mjs';

var o = ((r) => (r.Space = " ", r.Enter = "Enter", r.Escape = "Escape", r.Backspace = "Backspace", r.Delete = "Delete", r.ArrowLeft = "ArrowLeft", r.ArrowUp = "ArrowUp", r.ArrowRight = "ArrowRight", r.ArrowDown = "ArrowDown", r.Home = "Home", r.End = "End", r.PageUp = "PageUp", r.PageDown = "PageDown", r.Tab = "Tab", r))(o || {});
function m$1(r) {
  return null;
}
let m = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e2) => `${e2}:not([tabindex='-1'])`).join(",");
var M = ((n) => (n[n.First = 1] = "First", n[n.Previous = 2] = "Previous", n[n.Next = 4] = "Next", n[n.Last = 8] = "Last", n[n.WrapAround = 16] = "WrapAround", n[n.NoScroll = 32] = "NoScroll", n))(M || {}), N = ((o2) => (o2[o2.Error = 0] = "Error", o2[o2.Overflow = 1] = "Overflow", o2[o2.Success = 2] = "Success", o2[o2.Underflow = 3] = "Underflow", o2))(N || {}), b = ((r) => (r[r.Previous = -1] = "Previous", r[r.Next = 1] = "Next", r))(b || {});
function E(e2 = document.body) {
  return e2 == null ? [] : Array.from(e2.querySelectorAll(m));
}
var F = ((r) => (r[r.Strict = 0] = "Strict", r[r.Loose = 1] = "Loose", r))(F || {});
function h(e2, t = 0) {
  var r;
  return e2 === ((r = m$1()) == null ? void 0 : r.body) ? false : u(t, { [0]() {
    return e2.matches(m);
  }, [1]() {
    let l = e2;
    for (; l !== null; ) {
      if (l.matches(m))
        return true;
      l = l.parentElement;
    }
    return false;
  } });
}
function D(e2) {
  let t = m$1();
  nextTick(() => {
    t && !h(t.activeElement, 0) && w(e2);
  });
}
function w(e2) {
  e2 == null || e2.focus({ preventScroll: true });
}
let H = ["textarea", "input"].join(",");
function S(e2) {
  var t, r;
  return (r = (t = e2 == null ? void 0 : e2.matches) == null ? void 0 : t.call(e2, H)) != null ? r : false;
}
function O(e2, t = (r) => r) {
  return e2.slice().sort((r, l) => {
    let o2 = t(r), s = t(l);
    if (o2 === null || s === null)
      return 0;
    let n = o2.compareDocumentPosition(s);
    return n & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function v$1(e2, t) {
  return P(E(), t, true, e2);
}
function P(e2, t, r = true, l = null) {
  var c;
  let o2 = (c = Array.isArray(e2) ? e2.length > 0 ? e2[0].ownerDocument : document : e2 == null ? void 0 : e2.ownerDocument) != null ? c : document, s = Array.isArray(e2) ? r ? O(e2) : e2 : E(e2);
  l = l != null ? l : o2.activeElement;
  let n = (() => {
    if (t & 5)
      return 1;
    if (t & 10)
      return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), x = (() => {
    if (t & 1)
      return 0;
    if (t & 2)
      return Math.max(0, s.indexOf(l)) - 1;
    if (t & 4)
      return Math.max(0, s.indexOf(l)) + 1;
    if (t & 8)
      return s.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), p = t & 32 ? { preventScroll: true } : {}, a = 0, i = s.length, u2;
  do {
    if (a >= i || a + i <= 0)
      return 0;
    let f = x + a;
    if (t & 16)
      f = (f + i) % i;
    else {
      if (f < 0)
        return 3;
      if (f >= i)
        return 1;
    }
    u2 = s[f], u2 == null || u2.focus(p), a += n;
  } while (u2 !== o2.activeElement);
  return t & 6 && S(u2) && u2.select(), u2.hasAttribute("tabindex") || u2.setAttribute("tabindex", "0"), 2;
}
function y(f, m2, i = computed(() => true)) {
  ref(null);
}

export { D, F, M, N, O, P, h, m$1 as m, o, v$1 as v, w, y };
//# sourceMappingURL=use-outside-click.f06562e3.mjs.map
