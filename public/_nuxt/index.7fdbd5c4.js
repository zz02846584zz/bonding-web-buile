import{_ as x}from"./Filter.vue_vue_type_script_setup_true_lang.76eb06c8.js";import{_ as h,a as k,b as w,c as z}from"./Wrapper.470460e7.js";import{_ as C}from"./Header.62420bee.js";import{_ as B}from"./Row.23ff5c11.js";import{a as F,P as L,r as A,o as p,c as N,h as a,Q as $,f as o,u as c,l as y,k as P,j as T}from"./entry.d9de7e46.js";import"./RowLoading.b47f3143.js";const E=T("p",null,"\u8F09\u5165\u66F4\u591A",-1),H=[E],S={key:1,class:"text-center pt-8 text-xs font-bold tracking-widest opacity-50"},q=F({__name:"index",async setup(V){let n,u;const{data:t}=([n,u]=L(()=>$("video-news-list","/news/page",{body:{type:"video",size:12}})),n=await n,u(),n),s=A(!1),d=async()=>{var _;s.value=!0;const g=t.value.pagination.page,i=t.value.pagination.size,{data:e}=await $fetch("/api/news/page",{method:"POST",body:{type:"video",size:i,page:g+1}}),r=(_=e==null?void 0:e.list)!=null?_:[];setTimeout(()=>{var l;r.length&&(t.value.list.push(...r),t.value.pagination=(l=e.pagination)!=null?l:t.value.pagination),s.value=!1},300)};return(g,i)=>{const e=x,r=k,_=C,l=B,f=w,b=z,v=h;return p(),N(v,null,{default:a(()=>[o(_,{class:"z-10 sticky border-b bg-white border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700"},{default:a(()=>[o(r,{tag:"h1",title:"\u5F71\u97F3\u65B0\u805E",class:"capitalize"},{default:a(()=>[o(e)]),_:1})]),_:1}),o(b,null,{default:a(()=>[o(f,null,{default:a(()=>{var m;return[o(l,{tag:"h3",list:(m=c(t).list)!=null?m:[],infinite:!0,loading:s.value,onLoad:d},null,8,["list","loading"]),c(t).pagination.total>c(t).pagination.size*c(t).pagination.page?(p(),y("div",{key:0,class:P(["block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer",{hidden:s.value}]),onClick:i[0]||(i[0]=j=>d())},H,2)):(p(),y("div",S," \u7121\u66F4\u591A\u8CC7\u6599... "))]}),_:1})]),_:1})]),_:1})}}});export{q as default};