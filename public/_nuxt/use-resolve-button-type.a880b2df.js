import{o}from"./use-outside-click.0582e426.js";import{s as d,z as v,C as b}from"./entry.51df2e06.js";function x(e){throw new Error("Unexpected object: "+e)}var h=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(h||{});function g(e,r){let t=r.resolveItems();if(t.length<=0)return null;let l=r.resolveActiveIndex(),u=l!=null?l:-1,i=(()=>{switch(e.focus){case 0:return t.findIndex(n=>!r.resolveDisabled(n));case 1:{let n=t.slice().reverse().findIndex((s,c,f)=>u!==-1&&f.length-c-1>=u?!1:!r.resolveDisabled(s));return n===-1?n:t.length-1-n}case 2:return t.findIndex((n,s)=>s<=u?!1:!r.resolveDisabled(n));case 3:{let n=t.slice().reverse().findIndex(s=>!r.resolveDisabled(s));return n===-1?n:t.length-1-n}case 4:return t.findIndex(n=>r.resolveId(n)===e.id);case 5:return null;default:x(e)}})();return i===-1?l:i}function a(e,r){if(e)return e;let t=r!=null?r:"button";if(typeof t=="string"&&t.toLowerCase()==="button")return"button"}function m(e,r){let t=d(a(e.value.type,e.value.as));return v(()=>{t.value=a(e.value.type,e.value.as)}),b(()=>{var l;t.value||!o(r)||o(r)instanceof HTMLButtonElement&&!((l=o(r))!=null&&l.hasAttribute("type"))&&(t.value="button")}),t}export{h as a,m as b,g as x};