import{a as D,b as L,r as f,o as t,l,P as _,Q as T,j as o,t as d,c as y,f as n,h as g,u as r,i as B,E as N,m as u,A as S,a3 as m,a4 as x,ab as V,ac as $,x as E,p as H,T as j,W as k}from"./entry.e3960a20.js";const A=["onClick"],F={class:"title font-bold mr-auto"},I={class:"text-sm"},M={class:"fixed top-0 left-0 w-full h-full z-20"},P={key:0,class:"px-10 pb-8 max-w-[44em] w-11/12 absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-100/[0.15] shadow"},z={key:0,class:"bg-light-100 dark:bg-gray-800 sticky top-0 pt-7 pb-3 flex flex-wrap justify-between relative text-lg pl-[0.1em] tracking-widest font-bold"},Q={class:"flex items-center space-x-3"},R={class:"text-sm opacity-60"},W=["innerHTML"],J=D({__name:"Row",props:{list:{type:Array,default:()=>[]}},setup(h){const v=L("body.lock"),e=f({}),p=f(!1),i=f(!1),w=async c=>{v.value=!0,p.value=!0,i.value=!0;const{data:s}=await k("/tip/info",{body:{id:c}});e.value=s,i.value=!1},b=()=>{p.value=!1,v.value=!1,setTimeout(()=>{e.value={}},150)},C=async c=>{const{data:s,error:a}=await k("/tip/collection",{body:{id:c}});a||(e.value.isCollection=s.status)};return(c,s)=>(t(),l(_,null,[(t(!0),l(_,null,T(h.list,a=>(t(),l("div",{key:a.id,class:"flex items-center flex-wrap py-3 px-5 border bg-transparent border-gray-400/[0.4] dark:border-gray-600/[0.3] dark:border-gray-50/[0.2] mb-2 last-mb-0 rounded-sm dark:shadow cursor-pointer duration-200",onClick:q=>w(a.id)},[o("div",F,d(a.title),1),o("div",I,d(a.publishDate),1)],8,A))),128)),(t(),y(j,{to:"body"},[n(r(H),{show:p.value,appear:""},{default:g(()=>[n(r(B),{as:"template",enter:"duration-150 linear","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-150 linear","leave-from":"opacity-100","leave-to":"opacity-0"},{default:g(()=>[o("div",M,[o("div",{class:"absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50",onClick:b},[i.value?(t(),y(r(N),{key:0,class:"absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"})):u("",!0)]),i.value?u("",!0):(t(),l("div",P,[e.value.title?(t(),l("div",z,[S(d(e.value.title)+" ",1),o("div",Q,[o("div",{class:"cursor-pointer flex items-center",onClick:s[0]||(s[0]=a=>C(e.value.id))},[m(n(r(V),{class:"w-6"},null,512),[[x,!e.value.isCollection]]),m(n(r($),{class:"text-red-600 w-6"},null,512),[[x,e.value.isCollection]])]),n(r(E),{class:"text-2xl w-6 cursor-pointer",onClick:b})])])):u("",!0),o("div",R,d(e.value.publishDate),1),e.value.content?(t(),l("div",{key:1,class:"py-4",innerHTML:e.value.content},null,8,W)):u("",!0)]))])]),_:1})]),_:1},8,["show"])]))],64))}});export{J as _};
