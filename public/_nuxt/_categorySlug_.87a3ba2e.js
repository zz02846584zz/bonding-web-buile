import{_ as $}from"./Filter.vue_vue_type_script_setup_true_lang.6d51b3ce.js";import{_ as A,a as B,b as F,c as N}from"./Wrapper.e33d1023.js";import{_ as S}from"./Header.73f78474.js";import{_ as R}from"./Row.aa1c0de0.js";import{a as T,a1 as H,r as b,Q as v,o as g,c as P,h as r,R as x,f as o,u as d,l as h,k as V,j}from"./entry.47b02695.js";import"./RowLoading.26efd085.js";const D=j("p",null,"\u8F09\u5165\u66F4\u591A",-1),E=[D],I={key:1,class:"text-center pt-8 text-xs font-bold tracking-widest opacity-50"},M=T({__name:"[categorySlug]",async setup(O){let e,i;const k=H(),{categorySlug:n}=k.params,y=b(null),{data:w}=([e,i]=v(()=>x(`category-slug-${n}`,"/category/info",{async:!0,body:{slug:n}})),e=await e,i(),e);y.value=w.value.data;const{data:t}=([e,i]=v(()=>x(`category-video-news-${n}`,"/news/list",{async:!0,body:{category:n,type:"video",size:8}})),e=await e,i(),e),c=b(!1),m=async()=>{var _;c.value=!0;const f=t.value.pagination.page,l=t.value.pagination.size,{data:a}=await $fetch("/api/news/page",{method:"POST",body:{category:n,type:"normal",size:l,page:f+1}}),u=(_=a==null?void 0:a.list)!=null?_:[];setTimeout(()=>{var p;u.length&&(t.value.list.push(...u),t.value.pagination=(p=a.pagination)!=null?p:t.value.pagination),c.value=!1},300)};return(f,l)=>{const a=$,u=B,_=S,p=R,z=F,C=N,L=A;return g(),P(L,null,{default:r(()=>[o(_,{class:"z-10 sticky border-b bg-white border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700"},{default:r(()=>{var s;return[o(u,{tag:"h1",title:(s=y.value)==null?void 0:s.name,class:"capitalize"},{default:r(()=>[o(a)]),_:1},8,["title"])]}),_:1}),o(C,null,{default:r(()=>[o(z,null,{default:r(()=>{var s;return[o(p,{tag:"h3",list:(s=d(t).list)!=null?s:[],infinite:!0,loading:c.value,onLoad:m},null,8,["list","loading"]),d(t).pagination.total>d(t).pagination.size*d(t).pagination.page?(g(),h("div",{key:0,class:V(["block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer",{hidden:c.value}]),onClick:l[0]||(l[0]=Q=>m())},E,2)):(g(),h("div",I," \u7121\u66F4\u591A\u8CC7\u6599... "))]}),_:1})]),_:1})]),_:1})}}});export{M as default};
