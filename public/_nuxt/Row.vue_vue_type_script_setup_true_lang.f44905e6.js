import{a as T,b as L,r as f,o as t,l,N as y,O as N,c as _,f as i,h,u as x,p as S,T as B,j as a,t as d,i as V,m as u,A as $,$ as k,a0 as m,S as g,s as H}from"./entry.f0967dd5.js";const j=["onClick"],A={class:"title font-bold mr-auto"},F={class:"text-sm"},I={class:"fixed top-0 left-0 w-full h-full z-20"},M={key:0,class:"px-10 pb-8 max-w-[44em] w-11/12 absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 rounded-lg backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-100/[0.15] shadow"},z={key:0,class:"bg-light-100 dark:bg-gray-800 sticky top-0 pt-7 pb-3 flex flex-wrap justify-between relative text-lg pl-[0.1em] tracking-widest font-bold"},E={class:"flex items-center space-x-3"},O={class:"text-sm opacity-60"},P=["innerHTML"],q=T({__name:"Row",props:{list:{type:Array,default:()=>[]}},setup(w){const v=L("body.lock"),e=f({}),p=f(!1),n=f(!1),C=async c=>{v.value=!0,p.value=!0,n.value=!0;const{data:o}=await g("/tip/info",{body:{id:c}});e.value=o,n.value=!1},b=()=>{p.value=!1,v.value=!1,setTimeout(()=>{e.value={}},150)},D=async c=>{const{data:o,error:s}=await g("/tip/collection",{body:{id:c}});s||(e.value.isCollection=o.status)};return(c,o)=>{const s=H;return t(),l(y,null,[(t(!0),l(y,null,N(w.list,r=>(t(),l("div",{key:r.id,class:"flex items-center flex-wrap py-3 px-5 border bg-transparent border-gray-400/[0.4] dark:border-gray-600/[0.3] dark:border-gray-50/[0.2] mb-2 last-mb-0 rounded-sm dark:shadow cursor-pointer duration-200",onClick:R=>C(r.id)},[a("div",A,d(r.title),1),a("div",F,d(r.publishDate),1)],8,j))),128)),(t(),_(B,{to:"body"},[i(x(S),{show:p.value,appear:""},{default:h(()=>[i(x(V),{as:"template",enter:"duration-150 linear","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-150 linear","leave-from":"opacity-100","leave-to":"opacity-0"},{default:h(()=>[a("div",I,[a("div",{class:"absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50",onClick:b},[n.value?(t(),_(s,{key:0,class:"i-eos-icons-loading absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"})):u("",!0)]),n.value?u("",!0):(t(),l("div",M,[e.value.title?(t(),l("div",z,[$(d(e.value.title)+" ",1),a("div",E,[a("div",{class:"cursor-pointer flex items-center",onClick:o[0]||(o[0]=r=>D(e.value.id))},[k(i(s,{class:"i-ion-heart-outline w-6"},null,512),[[m,!e.value.isCollection]]),k(i(s,{class:"i-ion-heart text-red-600 w-6"},null,512),[[m,e.value.isCollection]])]),i(s,{class:"i-ion-ios-close-circle-outline text-2xl w-6 cursor-pointer",onClick:b})])])):u("",!0),a("div",O,d(e.value.publishDate),1),e.value.content?(t(),l("div",{key:1,class:"py-4",innerHTML:e.value.content},null,8,P)):u("",!0)]))])]),_:1})]),_:1},8,["show"])]))],64)}}});export{q as _};
