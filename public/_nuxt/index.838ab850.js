import{a as R,z as J,U as L,Y as M,r as O,w as W,J as Y,o as r,l as c,j as n,f as e,u as l,h as d,s as G,V as H,v as K,x as P,A as i,k as N,m as U,t as Q,$ as I,a0 as $,N as h,W as X,C as Z,a1 as ee,a2 as te,q as se}from"./entry.cae53ab5.js";import{_ as le}from"./Editor.0982cb14.js";const f=B=>(K("data-v-90702515"),B=B(),P(),B),ae={class:"flex flex-wrap items-center justify-between sticky"},oe={class:"flex"},ne=f(()=>n("h1",{class:"text-lg lg:text-xl font-bold"}," \u5E33\u865F\u7BA1\u7406 ",-1)),ie=f(()=>n("span",{class:"pr-1 duration-150"}," \u4FDD\u5B58 ",-1)),ue={class:"py-3"},de=f(()=>n("div",{class:"flex items-center"},null,-1)),re={class:"flex items-center space-x-4"},ce={key:0,class:"flex items-center font-bold ml-3 space-x-1"},me={key:1,class:"flex items-center font-bold ml-3 space-x-1"},fe={key:2,class:"flex items-center font-bold ml-3 space-x-1"},_e={class:"flex items-center font-bold ml-3 text-green-400 space-x-1"},pe=f(()=>n("span",{class:"text-blue-400 pl-1"},"\u53BB\u9A57\u8B49",-1)),be=f(()=>n("span",{class:"text-blue-400 pl-1"},"\u4FEE\u6539",-1)),xe=f(()=>n("span",{class:"text-blue-400 pl-1"},"\u91CD\u65B0\u9A57\u8B49",-1)),ve=R({__name:"index",setup(B){const o=J({firstName:"",lastName:"",birthday:"",gender:"",intro:""}),{user:F}=L(),{info:s}=M(F),E=()=>{var V;for(const t in o)o[t]=((V=s.value)==null?void 0:V[t])||""},S=O([{value:"male",label:"\u7537\u6027"},{value:"female",label:"\u5973\u6027"}]);return W(s,()=>{E()}),Y(()=>{E()}),(V,t)=>{const u=G,m=X,g=Z,j=ee,T=te,q=le,z=H;return r(),c("div",null,[n("div",ae,[n("div",oe,[n("div",{class:"lg:hidden mr-2 flex items-center cursor-pointer",onClick:t[0]||(t[0]=_=>V.$router.go(-1))},[e(u,{class:"i-ic-round-arrow-back-ios text-sm lg:text-base"})]),ne]),n("div",{class:"group rounded-full cursor-pointer bg-green-500 text-white text-sm font-bold px-4 h-8 leading-8 flex items-center",onClick:t[1]||(t[1]=_=>l(F).update(o))},[ie,e(u,{class:"i-ic-baseline-save-alt"})])]),n("div",ue,[e(z,{onSubmit:t[7]||(t[7]=_=>l(F).update(o))},{default:d(()=>{var _,k,D,A,C;return[de,n("div",re,[e(m,{id:"firstName",modelValue:o.firstName,"onUpdate:modelValue":t[2]||(t[2]=a=>o.firstName=a),label:"\u59D3\u6C0F",class:"mb-3 flex-1",require:!0,placeholder:"\u8F38\u5165\u59D3\u6C0F"},null,8,["modelValue"]),e(m,{id:"lastName",modelValue:o.lastName,"onUpdate:modelValue":t[3]||(t[3]=a=>o.lastName=a),label:"\u540D\u5B57",class:"mb-3 flex-1",placeholder:"\u8F38\u5165\u540D\u5B57"},null,8,["modelValue"])]),e(m,{id:"phone",label:"\u624B\u6A5F\u865F\u78BC",class:"mb-3",value:(k=(_=l(s))==null?void 0:_.phone)!=null?k:"",disabled:!0},{label:d(()=>[e(g,{to:"/my/account/change-phone",class:"font-bold ml-3 text-blue-400"},{default:d(()=>[i(" \u4FEE\u6539 ")]),_:1})]),_:1},8,["value"]),e(m,{id:"password",label:"\u5BC6\u78BC",class:"mb-3",value:"***********",disabled:!0},{label:d(()=>[e(g,{to:"/my/account/reset-password",class:"font-bold ml-3 text-blue-400"},{default:d(()=>[i(" \u4FEE\u6539 ")]),_:1})]),_:1}),e(m,{id:"email",label:"\u4FE1\u7BB1",class:"mb-3",value:(A=(D=l(s))==null?void 0:D.email)!=null?A:"",disabled:!0},{label:d(()=>{var a,p,b,x,v;return[n("div",{class:N(((a=l(s))==null?void 0:a.emailVerify)==="unverified"?"text-red-400":((p=l(s))==null?void 0:p.emailVerify)==="pending"?"text-amber-500":"text-green-400")},[((b=l(s))==null?void 0:b.emailVerify)==="verify"?(r(),c("div",ce,[e(u,{class:"i-ion-checkmark-circled"}),i(" \u5DF2\u7D81\u5B9A ")])):((x=l(s))==null?void 0:x.emailVerify)==="unverified"?(r(),c("div",me,[e(u,{class:"i-ion-information-circle"}),i(" \u672A\u7D81\u5B9A ")])):((v=l(s))==null?void 0:v.emailVerify)==="pending"?(r(),c("div",fe,[e(u,{class:"i-ion-navigate-circle"}),i(" \u9A57\u8B49\u4E2D ")])):U("",!0)],2),e(g,{to:"/my/account/email-binding",class:"font-bold ml-3 text-blue-400"},{default:d(()=>{var y;return[i(Q(((y=l(s))==null?void 0:y.emailVerify)==="unverified"?"\u53BB\u7D81\u5B9A":"\u4FEE\u6539"),1)]}),_:1})]}),_:1},8,["value"]),e(m,{id:"password",label:"\u8EAB\u5206\u8B49\u5B57\u865F",class:"mb-3",value:(C=l(s))==null?void 0:C.idCard,disabled:!0},{label:d(()=>{var a,p,b,x;return[I(n("div",_e,[e(u,{class:"i-ion-checkmark-circled"}),i(" \u5DF2\u9A57\u8B49 ")],512),[[$,((a=l(s))==null?void 0:a.identifyVerify)==="verify"]]),I(e(g,{to:"/my/account/identify-verify",class:N([((p=l(s))==null?void 0:p.identifyVerify)==="unverified"?"text-red-400":((b=l(s))==null?void 0:b.identifyVerify)==="pending"?"text-yellow-400":"text-gray-400","flex items-center font-bold ml-3 space-x-1"])},{default:d(()=>{var v,y,w;return[((v=l(s))==null?void 0:v.identifyVerify)==="unverified"?(r(),c(h,{key:0},[e(u,{class:"i-ion-checkmark-circled"}),i(" \u672A\u9A57\u8B49 "),pe],64)):((y=l(s))==null?void 0:y.identifyVerify)==="pending"?(r(),c(h,{key:1},[e(u,{class:"i-ion-navigate-circle"}),i(" \u5BE9\u6838\u4E2D "),be],64)):((w=l(s))==null?void 0:w.identifyVerify)==="rejected"?(r(),c(h,{key:2},[e(u,{class:"i-ion-close-circle"}),i(" \u672A\u901A\u904E "),xe],64)):U("",!0)]}),_:1},8,["class"]),[[$,((x=l(s))==null?void 0:x.identifyVerify)!=="verify"]])]}),_:1},8,["value"]),e(j,{id:"birthday",modelValue:o.birthday,"onUpdate:modelValue":t[4]||(t[4]=a=>o.birthday=a),label:"\u751F\u65E5",class:"mb-3"},null,8,["modelValue"]),e(T,{modelValue:o.gender,"onUpdate:modelValue":t[5]||(t[5]=a=>o.gender=a),border:!0,class:"mb-3",label:"\u6027\u5225",options:S.value},null,8,["modelValue","options"]),e(q,{modelValue:o.intro,"onUpdate:modelValue":t[6]||(t[6]=a=>o.intro=a),placeholder:"\u4ECB\u7D39\u4E00\u4E0B\u81EA\u5DF1\u5427~",class:"mb-3",label:"\u7C21\u4ECB"},null,8,["modelValue"])]}),_:1})])])}}});const Ve=se(ve,[["__scopeId","data-v-90702515"]]);export{Ve as default};
