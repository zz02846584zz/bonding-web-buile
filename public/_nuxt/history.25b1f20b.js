import{a as N,r as c,e as E,P as S,S as _,w as V,o as r,l as i,j as s,f as y,N as x,O as L,m as f,$ as k,a0 as w,u as C,s as P,k as R,t as j}from"./entry.cae53ab5.js";import{_ as H}from"./Row.e7534135.js";import{_ as I}from"./Row.vue_vue_type_script_setup_true_lang.ea883dd8.js";import"./RowLoading.08422124.js";const M={class:"flex items-center sticky mb-3"},O=s("h1",{class:"text-lg lg:text-xl font-bold"}," \u700F\u89BD\u7D00\u9304 ",-1),T={class:"flex flex-wrap items-center space-x-4 text-sm mb-3"},U=["onClick"],q={class:"py-3"},G={key:0},J={key:1},K=s("p",null,"\u8F09\u5165\u66F4\u591A",-1),Q=[K],W={class:"text-center pt-8 text-xs font-bold tracking-widest opacity-50"},oe=N({__name:"history",async setup(X){let d,m;const l=c([]),e=c({}),g=10,F=c([{label:"\u65B0\u805E",value:"article"},{label:"\u5C0F\u77E5\u8B58",value:"tip"}]),n=c("article"),a=c(!0),p=E(()=>e.value.total<=e.value.size*e.value.page);try{const{data:o}=([d,m]=S(()=>_("/my/history",{body:{size:g,type:n.value}})),d=await d,m(),d);l.value=o.list,e.value=o.pagination,a.value=!1}catch{}const z=()=>{l.value=[],e.value={}};V(n,async o=>{a.value=!0,z();const{data:t}=await _("/my/history",{body:{size:g,type:o}});l.value=t.list,e.value=t.pagination,a.value=!1});const B=async()=>{if(p.value||a.value)return;a.value=!0;const o=e.value.page,t=e.value.size,{data:v}=await _("/my/history",{body:{size:t,page:o}});l.value.push(...v.list),e.value=v.pagination,a.value=!1};return(o,t)=>{var b,h;const v=P,$=H,A=I;return r(),i("div",null,[s("div",M,[s("div",{class:"lg:hidden mr-2 flex items-center cursor-pointer",onClick:t[0]||(t[0]=u=>o.$router.go(-1))},[y(v,{class:"i-ic-round-arrow-back-ios text-sm lg:text-base"})]),O]),s("div",T,[(r(!0),i(x,null,L(F.value,(u,D)=>(r(),i("div",{key:D,class:R(["cursor-pointer h-8 leading-8 px-5 border border-gray-200 dark-border-opacity-20 rounded-full duration-200",{"bg-gray-200 dark:bg-opacity-10":n.value===u.value}]),onClick:Y=>n.value=u.value},j(u.label),11,U))),128))]),s("div",q,[n.value==="article"?(r(),i("div",G,[y($,{tag:"h3",list:(b=l.value)!=null?b:[],infinite:!0,loading:a.value},null,8,["list","loading"])])):n.value==="tip"?(r(),i("div",J,[y(A,{list:(h=l.value)!=null?h:[]},null,8,["list"])])):f("",!0),a.value?f("",!0):(r(),i(x,{key:2},[k(s("div",{class:"dark:text-gray-400 block border-t py-4 mt-3 font-bold text-center text-xs text-gray-500 border-gray-200 dark:border-gray-800 duration-300 border-b hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer",onClick:t[1]||(t[1]=u=>B())},Q,512),[[w,!C(p)]]),k(s("div",W," \u7121\u66F4\u591A\u8CC7\u6599... ",512),[[w,C(p)]])],64))])])}}});export{oe as default};