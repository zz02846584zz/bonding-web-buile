import{o as r,l as n,j as t,a as g,P as v,Q as y,k as u,f as c,h as b,t as _,an as w,b as k,u as i,A as h,R as $,e as S,y as m,U as Z}from"./entry.e3960a20.js";const A={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},V=t("path",{fill:"currentColor",d:"M10 13H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1Zm-1 7H4v-5h5ZM21 2h-7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-1 7h-5V4h5Zm1 4h-7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1Zm-1 7h-5v-5h5ZM10 2H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM9 9H4V4h5Z"},null,-1),C=[V];function H(a,s){return r(),n("svg",A,C)}const B={name:"uil-apps",render:H},M={class:"flex-1 py-4 pl-0 pr-4 overflow-y-auto rounded lg:pl-0 bg-gary-200"},F=g({__name:"Sidebar",props:{mode:{type:String,default:"normal"},categories:{type:Array,default:()=>[]}},setup(a){return(s,d)=>{const l=B,o=w;return r(),n("div",{class:u({"fixed top-0 pt-13 hidden lg:flex lg:pl-8 lg:w-56 h-screen border-r border-gray-900/10 dark:border-gray-50/[0.2]":a.mode==="normal","relative flex-1 flex flex-col w-full":a.mode==="mobile"})},[t("div",M,[t("ul",null,[(r(!0),n(v,null,y(a.categories,e=>(r(),n("li",{key:e.slug},[c(o,{to:`/news/category/${e.slug}`,class:"flex items-center group hover:no-underline mb-4"},{default:b(()=>[t("div",{class:u(["flex items-center px-2 py-2 mr-4 duration-200 rounded-md shadow-sm ring-1 ring-slate-900/5 group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10",{"text-white dark:text-white group-hover:bg-sky-500 bg-sky-500":s.$route.params.categorySlug===e.slug,"text-slate-500 dark:text-gray-100 group-hover:bg-gray-200 bg-gray-100 dark:group-hover:bg-slate-600 dark:bg-slate-700":s.$route.params.categorySlug!==e.slug}])},[c(l,{class:"text-xs"})],2),t("span",{class:u(["text-sm font-semibold capitalize duration-200",{"font-extrabold text-sky-500 dark:text-sky-400":s.$route.params.slug===e.slug}])},_(e==null?void 0:e.name),3)]),_:2},1032,["to"])]))),128))])])],2)}}});const N={class:"border-t lg:border-gray-900/10 dark:border-gray-50/[0.2]"},U={class:"max-w-[96em] mx-auto px-4 lg:px-8 flex-1 flex w-full space-x-20"},z={class:"w-full py-4 text-center md:text-left"},E={class:"mb-1"},I={class:"text-xs text-gray-600 dark:text-gray-400"},L={class:"md:float-right"},P=["href"],j=g({__name:"Footer",setup(a){const s=k("app");return(d,l)=>{var o;return r(),n("footer",N,[t("section",U,[t("div",z,[t("div",E,_((o=i(s))==null?void 0:o.name),1),t("div",I,[h(" Copyright \xA9 2022. All rights reserved. "),t("span",L,[h(" design by "),t("a",{href:i(s).author.link},_(i(s).author.name),9,P)])])])])])}}}),D={class:"w-full"},Q={class:"cma flex flex-wrap"},R={class:"py-4 sidebar-container lg:w-56"},T={class:"flex flex-col page-container"},q=g({__name:"blog",async setup(a){let s,d;const{data:l}=([s,d]=$(()=>Z("industry-categories","/news/categories")),s=await s,d(),s),o=S(()=>{var e;return(e=l.value)==null?void 0:e.filter(p=>p.news)});return(e,p)=>{const f=F,x=j;return r(),n("div",D,[h(_(i(l))+" ",1),t("div",Q,[t("div",R,[c(f,{categories:i(o)||[]},null,8,["categories"])]),t("div",T,[m(e.$slots,"default"),m(e.$slots,"footer",{},()=>[c(x)])])])])}}});export{q as default};
