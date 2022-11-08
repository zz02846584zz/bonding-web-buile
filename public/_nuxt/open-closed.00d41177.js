import{y as b,m as j,F as O,v,x as w}from"./entry.28800101.js";function y(e,t,...l){if(e in t){let n=t[e];return typeof n=="function"?n(...l):n}let r=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(n=>`"${n}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,y),r}var k=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(k||{}),$=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))($||{});function H({visible:e=!0,features:t=0,ourProps:l,theirProps:r,...n}){var u;let a=S(r,l),i=Object.assign(n,{props:a});if(e||t&2&&a.static)return h(i);if(t&1){let o=(u=a.unmount)==null||u?0:1;return y(o,{[0](){return null},[1](){return h({...n,props:{...a,hidden:!0,style:{display:"none"}}})}})}return h(i)}function h({props:e,attrs:t,slots:l,slot:r,name:n}){var u;let{as:a,...i}=E(e,["unmount","static"]),o=(u=l.default)==null?void 0:u.call(l,r),d={};if(r){let f=!1,c=[];for(let[s,p]of Object.entries(r))typeof p=="boolean"&&(f=!0),p===!0&&c.push(s);f&&(d["data-headlessui-state"]=c.join(" "))}if(a==="template"){if(o=m(o!=null?o:[]),Object.keys(i).length>0||Object.keys(t).length>0){let[f,...c]=o!=null?o:[];if(!P(f)||c.length>0)throw new Error(['Passing props on "template"!',"",`The current component <${n} /> is rendering a "template".`,"However we need to passthrough the following props:",Object.keys(i).concat(Object.keys(t)).sort((s,p)=>s.localeCompare(p)).map(s=>`  - ${s}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',"Render a single element as the child so that we can forward the props onto that element."].map(s=>`  - ${s}`).join(`
`)].join(`
`));return b(f,Object.assign({},i,d))}return Array.isArray(o)&&o.length===1?o[0]:o}return j(a,Object.assign({},i,d),{default:()=>o})}function m(e){return e.flatMap(t=>t.type===O?m(t.children):[t])}function S(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},l={};for(let r of e)for(let n in r)n.startsWith("on")&&typeof r[n]=="function"?(l[n]!=null||(l[n]=[]),l[n].push(r[n])):t[n]=r[n];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(l).map(r=>[r,void 0])));for(let r in l)Object.assign(t,{[r](n,...u){let a=l[r];for(let i of a){if(n instanceof Event&&n.defaultPrevented)return;i(n,...u)}}});return t}function N(e){let t=Object.assign({},e);for(let l in t)t[l]===void 0&&delete t[l];return t}function E(e,t=[]){let l=Object.assign({},e);for(let r of t)r in l&&delete l[r];return l}function P(e){return e==null?!1:typeof e.type=="string"||typeof e.type=="object"||typeof e.type=="function"}let x=0;function C(){return++x}function F(){return C()}function U(e){var t;return e==null||e.value==null?null:(t=e.value.$el)!=null?t:e.value}let g=Symbol("Context");var R=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(R||{});function V(){return T()!==null}function T(){return v(g,null)}function M(e){w(g,e)}export{$ as O,H as P,k as R,N as V,M as c,V as f,R as l,U as o,T as p,F as t,y as u,E as w};
