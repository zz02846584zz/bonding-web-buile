import{a as F,A as C,b as c,C as g,o as v,l as B,j as s,f as u,h as A,U as h,V as b,y,W as V,X as $,Y as w,Z as U}from"./entry.8ebe18c2.js";const k={class:"flex items-center justify-between sticky"},E={class:"flex items-center space-x-2"},I=s("h1",{class:"text-xl font-bold"}," \u4FEE\u6539\u865F\u78BC ",-1),S=s("span",{class:"pr-1 duration-150"}," \u9001\u51FA ",-1),j={class:"py-3"},H=F({__name:"change-phone",setup(N){const t=C({phone:"",verifyCode:""}),d=c("message"),n=c("alert"),p=c("loading"),f=async()=>{if(!t.phone.length)return d.value="\u5C1A\u672A\u8F38\u5165\u624B\u6A5F\u865F\u78BC";if(!$.test(t.phone))return d.value="\u865F\u78BC\u683C\u5F0F\u932F\u8AA4";p.value=!0;const{data:a,error:e,message:o}=await h("/auth/change-captcha",{body:{phone:t.phone}});p.value=!1,e&&o&&(n.value={type:"error",text:o,center:!0}),a&&(n.value={type:"success",title:"\u767C\u9001\u6210\u529F\uFF0C\u8ACB\u7559\u610F\u624B\u6A5F\u7C21\u8A0A"})},_=g(),m=async()=>{const a=c("loading");a.value=!0;const{data:e,error:o,message:l}=await h("/user/change-phone",{body:t});if(a.value=!1,o&&l&&(n.value={type:"error",text:l,center:!0}),e){n.value={type:"success",title:"\u4FEE\u6539\u6210\u529F",action:()=>_.go(-1)};const{user:i}=b();i.updateField({phone:t.phone})}};return(a,e)=>{const o=y,l=w,i=U,x=V;return v(),B("div",null,[s("div",k,[s("div",E,[s("div",{class:"flex items-center cursor-pointer",onClick:e[0]||(e[0]=r=>a.$router.go(-1))},[u(o,{class:"i-ic-round-arrow-back-ios text-sm lg:text-base"})]),I]),s("div",{class:"group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 h-9 leading-9 flex items-center",onClick:m},[S,u(o,{class:"i-ic-round-arrow-forward-ios"})])]),s("div",j,[u(x,{onSubmit:m},{default:A(()=>[u(l,{id:"phone",modelValue:t.phone,"onUpdate:modelValue":e[1]||(e[1]=r=>t.phone=r),label:"\u624B\u6A5F",class:"mb-3",placeholder:"09xxxxxxxx","is-phone":!0,onCaptcha:f},null,8,["modelValue"]),u(i,{id:"captcha",modelValue:t.verifyCode,"onUpdate:modelValue":e[2]||(e[2]=r=>t.verifyCode=r),class:"mb-10",label:"\u9A57\u8B49\u78BC",placeholder:"\u8ACB\u8F38\u5165\u624B\u6A5F\u9A57\u8B49\u78BC"},null,8,["modelValue"])]),_:1})])])}}});export{H as default};