import{a as g,b as l,r as x,w as c,e as k,o as s,c as h,f as n,h as i,u as t,i as w,j as r,k as d,l as u,t as p,m as f,p as C,T,q as B}from"./entry.e3960a20.js";const A={class:"fixed top-0 left-0 w-full h-full z-30"},N=["src"],V={key:1},z=g({__name:"Alert",setup(S){const e=l("alert",()=>({type:"",title:"",text:"",center:!1,action:()=>{}})),o=x(!1),_=l("body.lock");c(()=>o.value,a=>{_.value=a}),c(()=>e.value,a=>{(a.title||a.text)&&(o.value=!0)});const m=()=>{e.value={type:"",title:"",text:"",center:!1,action:()=>{}}},y=async()=>{o.value=!1,e.value.action&&e.value.action(),setTimeout(()=>{m()},150)},v={error:"/delete.png",info:"/alert.png",idea:"/idea.png",success:"/check.png"},b=k(()=>v[e.value.type]||"/alert.png");return(a,$)=>(s(),h(T,{to:"body"},[n(t(C),{show:o.value,appear:""},{default:i(()=>[n(t(w),{as:"template",enter:"duration-150 linear","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-150 linear","leave-from":"opacity-100","leave-to":"opacity-0"},{default:i(()=>[r("div",A,[r("div",{class:"absolute top-0 left-0 w-full h-full cursor-pointer backdrop-filter backdrop-blur-sm bg-dark-900/50",onClick:y}),r("div",{class:d(["p-12 min-w-sm absolute overflow-x-hidden overflow-y-auto transform -translate-x-1/2 -translate-y-7/12 rounded-lg max-w-11/12 backdrop-filter backdrop-blur left-1/2 top-1/2 max-h-4/5 bg-light-100/95 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-100/[0.15] shadow",[{"text-center":t(e).center}]])},[r("img",{class:"mx-auto mb-6 w-26",src:t(b)},null,8,N),t(e).title?(s(),u("div",{key:0,class:d(["text-lg pl-[0.1em] tracking-widest font-bold text-center",{"pb-4":t(e).text}])},p(t(e).title),3)):f("",!0),t(e).text?(s(),u("div",V,p(t(e).text),1)):f("",!0)],2)])]),_:1})]),_:1},8,["show"])]))}});const q=B(z,[["__scopeId","data-v-e4870405"]]);export{q as default};
