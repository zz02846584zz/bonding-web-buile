import{a as k,e as r,z as p,r as C,w,a7 as E,R as A,_ as T,O as q,o as B,l as I,j as s,k as d,t as L,y as _,u as i,f,h as N,a8 as O,a9 as Q,q as R}from"./entry.e3960a20.js";const D=["for","textContent"],H={class:"relative model"},M={class:"absolute transform -translate-y-1/2 right-2 top-1/2"},P=k({__name:"Editor",props:{modelValue:{type:String,default:""},label:{type:String,default:""},placeholder:{type:String,default:""},size:{type:String,default:"md"},id:{type:String,default:""}},emits:["update:modelValue"],async setup(t,{emit:b}){let o,u;const n=t,g=r(()=>`
  w-full border
  duration-200 
  bg-transparent border-gray-600/[0.3] focus:bg-gray-200
  dark:border-gray-50/[0.2] dark:focus:bg-gray-800`),c=p({lg:"text-base",md:"text-sm",sm:"text-xs",xs:"text-xs"}),m=p({lg:"text-lg rounded-lg",md:"text-base rounded",sm:"text-sm rounded",xs:"text-xs rounded"}),x=r(()=>c[n.size]||c.md),y=r(()=>m[n.size]||m.md),l=C(null),v={theme:"bubble"},h=()=>{l.value&&b("update:modelValue",l.value.getHTML())};w(()=>n.modelValue,e=>{e.length||l.value.setHTML("")});{const{vueApp:e}=E();if(!e.component("QuillEditor")){const{QuillEditor:a}=([o,u]=A(()=>T(()=>import("./vue-quill.esm-bundler.2ad97ccc.js"),["vue-quill.esm-bundler.2ad97ccc.js","entry.e3960a20.js","entry.25b547d2.css"],import.meta.url)),o=await o,u(),o);e.component("QuillEditor",a)}}return(e,a)=>{const S=q("quill-editor"),V=Q;return B(),I("div",null,[s("div",{class:d(["fic mb-2",i(x)])},[s("label",{for:t.id,class:d(["block font-bold tracking-wide",[{"cursor-pointer":t.id}]]),textContent:L(t.label)},null,10,D),_(e.$slots,"label",{},void 0,!0)],2),s("div",H,[f(V,null,{default:N(()=>[f(S,{ref_key:"editor",ref:l,content:t.modelValue,"onUpdate:content":a[0]||(a[0]=z=>O(modelValue)?modelValue.value=z:null),theme:"bubble",placeholder:t.placeholder,class:d([i(g),i(y)]),options:v,onTextChange:h},null,8,["content","placeholder","class"])]),_:1}),s("div",M,[_(e.$slots,"symbol",{},void 0,!0)])])])}}}),j=R(P,[["__scopeId","data-v-046bd34c"]]);export{j as _};
