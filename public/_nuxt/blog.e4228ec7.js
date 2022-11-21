import{a as u,o as r,l as a,j as t,O as y,P as b,k as c,f as i,h as v,t as m,y as w,bY as k,bZ as $,B as p,u as _,Q as S,e as A,z as h,R as C}from"./entry.8ebe18c2.js";const B={class:"flex-1 py-4 pl-0 pr-4 overflow-y-auto rounded lg:pl-0 bg-gary-200"},z=u({__name:"Sidebar",props:{mode:{type:String,default:"normal"},categories:{type:Array,default:()=>[]}},setup(o){return(s,n)=>{const l=w,d=k;return r(),a("div",{class:c({"fixed top-0 pt-13 hidden lg:flex lg:pl-8 lg:w-56 h-screen border-r border-gray-900/10 dark:border-gray-50/[0.2]":o.mode==="normal","relative flex-1 flex flex-col w-full":o.mode==="mobile"})},[t("div",B,[t("ul",null,[(r(!0),a(y,null,b(o.categories,e=>(r(),a("li",{key:e.slug},[i(d,{to:`/news/category/${e.slug}`,class:"flex items-center group hover:no-underline mb-4"},{default:v(()=>[t("div",{class:c(["flex items-center px-2 py-2 mr-4 duration-200 rounded-md shadow-sm ring-1 ring-slate-900/5 group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10",{"text-white dark:text-white group-hover:bg-sky-500 bg-sky-500":s.$route.params.categorySlug===e.slug,"text-slate-500 dark:text-gray-100 group-hover:bg-gray-200 bg-gray-100 dark:group-hover:bg-slate-600 dark:bg-slate-700":s.$route.params.categorySlug!==e.slug}])},[i(l,{class:"i-uil-apps text-xs"})],2),t("span",{class:c(["text-sm font-semibold capitalize duration-200",{"font-extrabold text-sky-500 dark:text-sky-400":s.$route.params.slug===e.slug}])},m(e==null?void 0:e.name),3)]),_:2},1032,["to"])]))),128))])])],2)}}});const F={class:"border-t lg:border-gray-900/10 dark:border-gray-50/[0.2]"},N={class:"max-w-[96em] mx-auto px-4 lg:px-8 flex-1 flex w-full space-x-20"},V={class:"text-xs w-full py-4 text-center md:text-left"},E={class:"text-gray-600 dark:text-gray-400"},I={class:"md:float-right"},L=["href"],P=u({__name:"Footer",setup(o){const s=$();return(n,l)=>(r(),a("footer",F,[t("section",N,[t("div",V,[t("div",E,[p(" Copyright \xA9 2022. All rights reserved. "),t("span",I,[p(" design by "),t("a",{href:_(s).link},m(_(s).name),9,L)])])])])]))}}),U={class:"w-full"},j={class:"cma flex flex-wrap"},D={class:"py-4 sidebar-container lg:w-56"},H={class:"flex flex-col page-container"},Q=u({__name:"blog",async setup(o){let s,n;const{data:l}=([s,n]=S(()=>C("industry-categories","/news/categories")),s=await s,n(),s),d=A(()=>{var e;return(e=l.value)==null?void 0:e.filter(g=>g.news)});return(e,g)=>{const f=z,x=P;return r(),a("div",U,[t("div",j,[t("div",D,[i(f,{categories:_(d)||[]},null,8,["categories"])]),t("div",H,[h(e.$slots,"default"),h(e.$slots,"footer",{},()=>[i(x)])])])])}}});export{Q as default};