import{_ as A}from"./_plugin-vue_export-helper.a1a6add7.js";import{o as N,l as S,I as $,y as _,F as D,E as F,x as k,D as L,C as T,s as M,k as U}from"./entry.63b62ac3.js";const I={};function C(e,t){return N(),S("div")}const ue=A(I,[["render",C]]);function w(e,t,...r){if(e in t){let o=t[e];return typeof o=="function"?o(...r):o}let n=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(o=>`"${o}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,w),n}var H=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(H||{}),R=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(R||{});function ae({visible:e=!0,features:t=0,ourProps:r,theirProps:n,...o}){var l;let u=B(n,r),a=Object.assign(o,{props:u});if(e||t&2&&u.static)return m(a);if(t&1){let s=(l=u.unmount)==null||l?0:1;return w(s,{[0](){return null},[1](){return m({...o,props:{...u,hidden:!0,style:{display:"none"}}})}})}return m(a)}function m({props:e,attrs:t,slots:r,slot:n,name:o}){var l;let{as:u,...a}=W(e,["unmount","static"]),s=(l=r.default)==null?void 0:l.call(r,n),f={};if(n){let i=!1,d=[];for(let[c,p]of Object.entries(n))typeof p=="boolean"&&(i=!0),p===!0&&d.push(c);i&&(f["data-headlessui-state"]=d.join(" "))}if(u==="template"){if(s=b(s!=null?s:[]),Object.keys(a).length>0||Object.keys(t).length>0){let[i,...d]=s!=null?s:[];if(!G(i)||d.length>0)throw new Error(['Passing props on "template"!',"",`The current component <${o} /> is rendering a "template".`,"However we need to passthrough the following props:",Object.keys(a).concat(Object.keys(t)).sort((c,p)=>c.localeCompare(p)).map(c=>`  - ${c}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',"Render a single element as the child so that we can forward the props onto that element."].map(c=>`  - ${c}`).join(`
`)].join(`
`));return $(i,Object.assign({},a,f))}return Array.isArray(s)&&s.length===1?s[0]:s}return _(u,Object.assign({},a,f),{default:()=>s})}function b(e){return e.flatMap(t=>t.type===D?b(t.children):[t])}function B(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},r={};for(let n of e)for(let o in n)o.startsWith("on")&&typeof n[o]=="function"?(r[o]!=null||(r[o]=[]),r[o].push(n[o])):t[o]=n[o];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(r).map(n=>[n,void 0])));for(let n in r)Object.assign(t,{[n](o,...l){let u=r[n];for(let a of u){if(o instanceof Event&&o.defaultPrevented)return;a(o,...l)}}});return t}function ie(e){let t=Object.assign({},e);for(let r in t)t[r]===void 0&&delete t[r];return t}function W(e,t=[]){let r=Object.assign({},e);for(let n of t)n in r&&delete r[n];return r}function G(e){return e==null?!1:typeof e.type=="string"||typeof e.type=="object"||typeof e.type=="function"}let V=0;function q(){return++V}function se(){return q()}var Y=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(Y||{});function y(e){var t;return e==null||e.value==null?null:(t=e.value.$el)!=null?t:e.value}let g=Symbol("Context");var z=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(z||{});function ce(){return J()!==null}function J(){return F(g,null)}function fe(e){k(g,e)}const E=typeof window>"u"||typeof document>"u";function O(e){if(E)return null;if(e instanceof Node)return e.ownerDocument;if(e!=null&&e.hasOwnProperty("value")){let t=y(e);if(t)return t.ownerDocument}return document}let h=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var K=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e))(K||{}),Q=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(Q||{}),X=(e=>(e[e.Previous=-1]="Previous",e[e.Next=1]="Next",e))(X||{});function x(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(h))}var j=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(j||{});function P(e,t=0){var r;return e===((r=O(e))==null?void 0:r.body)?!1:w(t,{[0](){return e.matches(h)},[1](){let n=e;for(;n!==null;){if(n.matches(h))return!0;n=n.parentElement}return!1}})}function de(e){let t=O(e);L(()=>{t&&!P(t.activeElement,0)&&Z(e)})}function Z(e){e==null||e.focus({preventScroll:!0})}let ee=["textarea","input"].join(",");function te(e){var t,r;return(r=(t=e==null?void 0:e.matches)==null?void 0:t.call(e,ee))!=null?r:!1}function ne(e,t=r=>r){return e.slice().sort((r,n)=>{let o=t(r),l=t(n);if(o===null||l===null)return 0;let u=o.compareDocumentPosition(l);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function pe(e,t){return re(x(),t,!0,e)}function re(e,t,r=!0,n=null){var o;let l=(o=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e==null?void 0:e.ownerDocument)!=null?o:document,u=Array.isArray(e)?r?ne(e):e:x(e);n=n!=null?n:l.activeElement;let a=(()=>{if(t&5)return 1;if(t&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),s=(()=>{if(t&1)return 0;if(t&2)return Math.max(0,u.indexOf(n))-1;if(t&4)return Math.max(0,u.indexOf(n))+1;if(t&8)return u.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),f=t&32?{preventScroll:!0}:{},i=0,d=u.length,c;do{if(i>=d||i+d<=0)return 0;let p=s+i;if(t&16)p=(p+d)%d;else{if(p<0)return 3;if(p>=d)return 1}c=u[p],c==null||c.focus(f),i+=a}while(c!==l.activeElement);return t&6&&te(c)&&c.select(),c.hasAttribute("tabindex")||c.setAttribute("tabindex","0"),2}function v(e,t,r){E||T(n=>{document.addEventListener(e,t,r),n(()=>document.removeEventListener(e,t,r))})}function me(e,t,r=U(()=>!0)){function n(l,u){if(!r.value||l.defaultPrevented)return;let a=u(l);if(a===null||!a.getRootNode().contains(a))return;let s=function f(i){return typeof i=="function"?f(i()):Array.isArray(i)||i instanceof Set?i:[i]}(e);for(let f of s){if(f===null)continue;let i=f instanceof HTMLElement?f:y(f);if(i!=null&&i.contains(a))return}return!P(a,j.Loose)&&a.tabIndex!==-1&&l.preventDefault(),t(l,a)}let o=M(null);v("mousedown",l=>{var u,a;r.value&&(o.value=((a=(u=l.composedPath)==null?void 0:u.call(l))==null?void 0:a[0])||l.target)},!0),v("click",l=>{!o.value||(n(l,()=>o.value),o.value=null)},!0),v("blur",l=>n(l,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}export{de as D,j as F,K as M,Q as N,ne as O,ae as P,H as R,ie as V,ue as _,Y as a,Z as b,fe as c,re as d,E as e,ce as f,R as g,P as h,z as l,O as m,y as o,J as p,se as t,w as u,pe as v,W as w,me as y};
