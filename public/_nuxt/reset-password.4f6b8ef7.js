import{a as f,A as B,C,b as p,o as _,l as x,j as o,f as u,h as g,a9 as F,U as b,y as v,W as P,u as r,aa as A}from"./entry.880fa512.js";const E={class:"flex items-center justify-between sticky"},h={class:"flex items-center space-x-2"},y=o("h1",{class:"text-xl font-bold"}," \u4FEE\u6539\u5BC6\u78BC ",-1),V=o("span",{class:"lg:pr-2 duration-150 pr-1"}," \u9001\u51FA ",-1),D={class:"py-3"},$=f({__name:"reset-password",setup(U){const s=B({oldPassword:"",newPassword:"",newPasswordConfirm:""}),w=C(),c=p("loading"),a=p("alert"),m=async()=>{const{oldPassword:i,newPassword:e,newPasswordConfirm:n}=s;if(!F.test(e))return a.value={type:"error",text:"\u5BC6\u78BC\u9808\u70BA\u82F1\u6578\u6DF7\u54088\u4F4D\u6578\u4EE5\u4E0A",center:!0};if(!i.length||!e.length||!n.length)return a.value={type:"error",text:"\u6B04\u4F4D\u4E0D\u80FD\u7559\u7A7A",center:!0};if(e!==n)return a.value={type:"error",text:"\u5BC6\u78BC\u4E0D\u4E00\u81F4",center:!0};c.value=!0;const{error:l,message:d}=await b("/user/reset-password",{body:s});return c.value=!1,l&&d?a.value={type:"error",text:d,center:!0}:a.value={type:"success",title:"\u4FEE\u6539\u6210\u529F",action:()=>w.go(-1)}};return(i,e)=>{const n=v,l=A,d=P;return _(),x("div",null,[o("div",E,[o("div",h,[o("div",{class:"flex items-center cursor-pointer",onClick:e[0]||(e[0]=t=>i.$router.go(-1))},[u(n,{class:"i-ic-round-arrow-back-ios text-sm lg:text-base"})]),y]),o("div",{class:"group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 lg:h-9 lg:leading-9 h-7 leading-7 flex items-center lg:text-base text-sm",onClick:m},[V,u(n,{class:"i-ic-round-arrow-forward-ios"})])]),o("div",D,[u(d,{onSubmit:m},{default:g(()=>[u(l,{id:"old-password",modelValue:r(s).oldPassword,"onUpdate:modelValue":e[1]||(e[1]=t=>r(s).oldPassword=t),class:"mb-3",label:"\u820A\u5BC6\u78BC",placeholder:"\u8ACB\u8F38\u5165\u820A\u5BC6\u78BC"},null,8,["modelValue"]),u(l,{id:"new-password",modelValue:r(s).newPassword,"onUpdate:modelValue":e[2]||(e[2]=t=>r(s).newPassword=t),class:"mb-3",label:"\u65B0\u5BC6\u78BC",placeholder:"\u9577\u5EA6\u81F3\u5C11\u70BA8,\u82F1\u6578\u7D44\u5408"},null,8,["modelValue"]),u(l,{id:"new-password-confirm",modelValue:r(s).newPasswordConfirm,"onUpdate:modelValue":e[3]||(e[3]=t=>r(s).newPasswordConfirm=t),label:"\u78BA\u8A8D\u5BC6\u78BC",placeholder:"\u518D\u6B21\u8F38\u5165\u65B0\u5BC6\u78BC"},null,8,["modelValue"])]),_:1})])])}}});export{$ as default};
