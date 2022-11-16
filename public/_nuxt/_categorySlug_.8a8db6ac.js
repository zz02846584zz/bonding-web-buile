import{_ as E}from"./Filter.vue_vue_type_script_setup_true_lang.06e2540b.js";import{_ as T,a as V,b as H,c as I}from"./Wrapper.997b67b4.js";import{_ as R}from"./Header.f4c02f0e.js";import{_ as U}from"./Row.e7534135.js";import{a as j,Z as O,r as y,P as m,o as i,l as v,f as a,h as s,Q as b,c as f,u as Q,m as x,k as W,j as $,s as Z,C as q}from"./entry.cae53ab5.js";import"./RowLoading.08422124.js";const G=$("span",{class:"pr-1 align-middle"},"\u770B\u66F4\u591A ",-1),J=$("p",null,"\u8F09\u5165\u66F4\u591A",-1),K=[J],M={key:2,class:"text-center pt-8 text-xs font-bold tracking-widest opacity-50"},rt=j({__name:"[categorySlug]",async setup(X){var w;let t,r;const B=O(),{categorySlug:o}=B.params,h=y(null),{data:F}=([t,r]=m(()=>b(`category-slug-${o}`,"/category/info",{async:!0,body:{slug:o}})),t=await t,r(),t);h.value=F.value.data;const _=y([]),{data:A}=([t,r]=m(()=>b(`category-video-news-${o}`,"/news/list",{async:!0,body:{category:o,type:"video",size:8}})),t=await t,r(),t);_.value=(w=A.value)==null?void 0:w.data;const e=y(),{data:L}=([t,r]=m(()=>b(`category-normal-news-${o}`,"/news/page",{async:!0,body:{category:o,type:"normal",size:8}})),t=await t,r(),t);e.value=L.value.data;const d=y(!1),k=async()=>{var p;d.value=!0;const z=e.value.pagination.page,g=e.value.pagination.size,{data:l}=await $fetch("/api/news/page",{method:"POST",body:{category:o,type:"normal",size:g,page:z+1}}),n=(p=l==null?void 0:l.list)!=null?p:[];setTimeout(()=>{var u;n&&n.length&&(e.value.list.push(...n),e.value.pagination=(u=l.pagination)!=null?u:e.value.pagination),d.value=!1},300)};return(z,g)=>{const l=E,n=V,p=R,u=U,N=Z,P=q,C=H,S=I,D=T;return i(),v("div",null,[a(D,null,{default:s(()=>[a(p,{class:"z-10 sticky border-b bg-white border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700"},{default:s(()=>{var c;return[a(n,{tag:"h1",title:(c=h.value)==null?void 0:c.name,class:"capitalize"},{default:s(()=>[a(l)]),_:1},8,["title"])]}),_:1}),a(S,null,{default:s(()=>[_.value&&_.value.length?(i(),f(C,{key:0},{default:s(()=>[a(n,{tag:"h2",title:"\u5F71\u97F3\u65B0\u805E",class:"mb-2 capitalize"}),a(u,{tag:"h3",list:_.value,gap:3},null,8,["list"]),a(P,{to:`/news/video/${Q(o)}`,class:"dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"},{default:s(()=>[G,a(N,{class:"i-uil-angle-double-right text-lg align-middle"})]),_:1},8,["to"])]),_:1})):x("",!0),e.value?(i(),f(C,{key:1},{default:s(()=>{var c;return[e.value.length?(i(),f(n,{key:0,title:"\u66F4\u591A\u65B0\u805E",class:"mb-2"})):x("",!0),a(u,{tag:"h3",list:(c=e.value.list)!=null?c:[],infinite:!0,loading:d.value,onLoad:k},null,8,["list","loading"]),e.value.pagination.total>e.value.pagination.size*e.value.pagination.page?(i(),v("div",{key:1,class:W(["block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer",{hidden:d.value}]),onClick:g[0]||(g[0]=Y=>k())},K,2)):(i(),v("div",M," \u7121\u66F4\u591A\u8CC7\u6599... "))]}),_:1})):x("",!0)]),_:1})]),_:1})])}}});export{rt as default};