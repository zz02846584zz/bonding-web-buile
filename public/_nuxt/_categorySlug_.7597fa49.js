import{_ as D}from"./Filter.vue_vue_type_script_setup_true_lang.4630c468.js";import{_ as E,a as R,b as T,c as V}from"./Wrapper.1079b3c3.js";import{_ as H}from"./Header.d7c2b674.js";import{_ as U}from"./Row.40fcbaff.js";import{a as j,a2 as I,r as p,R as m,o as i,c as v,h as n,U as b,f as a,m as z,l as C,k as O,j as B,C as W}from"./entry.13cd8dda.js";import"./RowLoading.ed54ba8f.js";const q=B("p",null,"\u770B\u66F4\u591A >>",-1),G=B("p",null,"\u8F09\u5165\u66F4\u591A",-1),J=[G],K={key:2,class:"text-center pt-8 text-xs font-bold tracking-widest opacity-50"},ot=j({__name:"[categorySlug]",async setup(M){var h;let t,s;const F=I(),{categorySlug:o}=F.params,f=p(null),{data:A}=([t,s]=m(()=>b(`category-slug-${o}`,"/category/info",{async:!0,body:{slug:o}})),t=await t,s(),t);f.value=A.value.data;const y=p([]),{data:$}=([t,s]=m(()=>b(`category-video-news-${o}`,"/news/list",{async:!0,body:{category:o,type:"video",size:8}})),t=await t,s(),t);y.value=(h=$.value)==null?void 0:h.data;const e=p(),{data:L}=([t,s]=m(()=>b(`category-normal-news-${o}`,"/news/page",{async:!0,body:{category:o,type:"normal",size:8}})),t=await t,s(),t);e.value=L.value.data;const _=p(!1),x=async()=>{var g;_.value=!0;const k=e.value.pagination.page,d=e.value.pagination.size,{data:r}=await $fetch("/api/news/page",{method:"POST",body:{category:o,type:"normal",size:d,page:k+1}}),l=(g=r==null?void 0:r.list)!=null?g:[];setTimeout(()=>{var c;l.length&&(e.value.list.push(...l),e.value.pagination=(c=r.pagination)!=null?c:e.value.pagination),_.value=!1},800)};return(k,d)=>{const r=D,l=R,g=H,c=U,N=W,w=T,P=V,S=E;return i(),v(S,null,{default:n(()=>[a(g,{class:"z-10 sticky border-b bg-white border-gray-900/10 top-12 dark:bg-gray-900 dark:border-gray-700"},{default:n(()=>{var u;return[a(l,{tag:"h1",title:(u=f.value)==null?void 0:u.name,class:"capitalize"},{default:n(()=>[a(r)]),_:1},8,["title"])]}),_:1}),a(P,null,{default:n(()=>[y.value.length?(i(),v(w,{key:0},{default:n(()=>[a(l,{tag:"h2",title:"\u5F71\u97F3\u65B0\u805E",class:"mb-2 capitalize"}),a(c,{tag:"h3",list:y.value,gap:3},null,8,["list"]),a(N,{to:"/news/type/video",class:"dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800"},{default:n(()=>[q]),_:1})]),_:1})):z("",!0),a(w,null,{default:n(()=>{var u;return[e.value.length?(i(),v(l,{key:0,title:"\u66F4\u591A\u65B0\u805E",class:"mb-2"})):z("",!0),a(c,{tag:"h3",list:(u=e.value.list)!=null?u:[],infinite:!0,loading:_.value,onLoad:x},null,8,["list","loading"]),e.value.pagination.total>e.value.pagination.size*e.value.pagination.page?(i(),C("div",{key:1,class:O(["block py-4 mt-3 text-xs font-bold text-center text-gray-500 duration-300 border-t border-b border-gray-300 dark:text-gray-400 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer",{hidden:_.value}]),onClick:d[0]||(d[0]=Q=>x())},J,2)):(i(),C("div",K," \u7121\u66F4\u591A\u8CC7\u6599... "))]}),_:1})]),_:1})]),_:1})}}});export{ot as default};
