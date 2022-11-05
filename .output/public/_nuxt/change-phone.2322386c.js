import{a as _,z as g,b as c,B as C,o as v,l as B,j as o,f as u,u as f,h as A,W as h,X as b,Y as y,Z as $,a0 as V}from"./entry.e3960a20.js";import{F as w,M as k}from"./arrow-right-thin.7d810f15.js";import{p as E}from"./regex.2eecabee.js";const U={class:"flex items-center justify-between sticky"},I={class:"flex items-center space-x-2"},R=o("h1",{class:"text-xl font-bold"},"\u4FEE\u6539\u865F\u78BC",-1),S=o("span",{class:"pr-1 duration-150"}," \u9001\u51FA ",-1),j={class:"py-3"},H=_({__name:"change-phone",setup(M){const t=g({phone:"",verifyCode:""}),d=c("message"),n=c("alert"),p=c("loading"),F=async()=>{if(!t.phone.length)return d.value="\u5C1A\u672A\u8F38\u5165\u624B\u6A5F\u865F\u78BC";if(!E.test(t.phone))return d.value="\u865F\u78BC\u683C\u5F0F\u932F\u8AA4";p.value=!0;const{data:s,error:e,message:a}=await h("/auth/change-captcha",{body:{phone:t.phone}});p.value=!1,e&&a&&(n.value={type:"error",text:a,center:!0}),s&&(n.value={type:"success",title:"\u767C\u9001\u6210\u529F\uFF0C\u8ACB\u7559\u610F\u624B\u6A5F\u7C21\u8A0A"})},x=C(),m=async()=>{const s=c("loading");s.value=!0;const{data:e,error:a,message:l}=await h("/user/change-phone",{body:t});if(s.value=!1,a&&l&&(n.value={type:"error",text:l,center:!0}),e){n.value={type:"success",title:"\u4FEE\u6539\u6210\u529F",action:()=>x.go(-1)};const{user:i}=b();i.updateField({phone:t.phone})}};return(s,e)=>{const a=$,l=V,i=y;return v(),B("div",null,[o("div",U,[o("div",I,[o("div",{class:"flex items-center cursor-pointer",onClick:e[0]||(e[0]=r=>s.$router.go(-1))},[u(f(w),{class:"text-sm lg:text-base"})]),R]),o("div",{class:"group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 h-9 leading-9 flex items-center",onClick:m},[S,u(f(k))])]),o("div",j,[u(i,{onSubmit:m},{default:A(()=>[u(a,{id:"phone",modelValue:t.phone,"onUpdate:modelValue":e[1]||(e[1]=r=>t.phone=r),label:"\u624B\u6A5F",class:"mb-3",placeholder:"09xxxxxxxx"},null,8,["modelValue"]),u(l,{id:"captcha",modelValue:t.verifyCode,"onUpdate:modelValue":e[2]||(e[2]=r=>t.verifyCode=r),class:"mb-10",label:"\u9A57\u8B49\u78BC",placeholder:"\u8ACB\u8F38\u5165\u9A57\u8B49\u78BC",onCaptcha:F},null,8,["modelValue"])]),_:1})])])}}});export{H as default};
