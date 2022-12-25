import{a as F,A as C,b as c,C as v,o as B,l as b,j as s,f as u,h as A,U as f,V as y,y as V,W as $,u as i,X as w,Y as U,Z as k}from"./entry.880fa512.js";const E={class:"flex items-center justify-between sticky"},I={class:"flex items-center space-x-2"},S=s("h1",{class:"text-xl font-bold"}," \u4FEE\u6539\u865F\u78BC ",-1),j=s("span",{class:"pr-1 duration-150"}," \u9001\u51FA ",-1),N={class:"py-3"},P=F({__name:"change-phone",setup(R){const t=C({phone:"",verifyCode:""}),p=c("message"),n=c("alert"),m=c("loading"),_=async()=>{if(!t.phone.length)return p.value="\u5C1A\u672A\u8F38\u5165\u624B\u6A5F\u865F\u78BC";if(!w.test(t.phone))return p.value="\u865F\u78BC\u683C\u5F0F\u932F\u8AA4";m.value=!0;const{data:a,error:e,message:o}=await f("/auth/change-captcha",{body:{phone:t.phone}});m.value=!1,e&&o&&(n.value={type:"error",text:o,center:!0}),a&&(n.value={type:"success",title:"\u767C\u9001\u6210\u529F\uFF0C\u8ACB\u7559\u610F\u624B\u6A5F\u7C21\u8A0A"})},x=v(),h=async()=>{const a=c("loading");a.value=!0;const{data:e,error:o,message:l}=await f("/user/change-phone",{body:t});if(a.value=!1,o&&l&&(n.value={type:"error",text:l,center:!0}),e){n.value={type:"success",title:"\u4FEE\u6539\u6210\u529F",action:()=>x.go(-1)};const{user:d}=y();d.updateField({phone:t.phone})}};return(a,e)=>{const o=V,l=U,d=k,g=$;return B(),b("div",null,[s("div",E,[s("div",I,[s("div",{class:"flex items-center cursor-pointer",onClick:e[0]||(e[0]=r=>a.$router.go(-1))},[u(o,{class:"i-ic-round-arrow-back-ios text-sm lg:text-base"})]),S]),s("div",{class:"group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 lg:h-9 lg:leading-9 h-7 leading-7 flex items-center lg:text-base text-sm",onClick:h},[j,u(o,{class:"i-ic-round-arrow-forward-ios"})])]),s("div",N,[u(g,{onSubmit:h},{default:A(()=>[u(l,{id:"phone",modelValue:i(t).phone,"onUpdate:modelValue":e[1]||(e[1]=r=>i(t).phone=r),label:"\u624B\u6A5F",class:"mb-3",placeholder:"09xxxxxxxx","is-phone":!0,onCaptcha:_},null,8,["modelValue"]),u(d,{id:"captcha",modelValue:i(t).verifyCode,"onUpdate:modelValue":e[2]||(e[2]=r=>i(t).verifyCode=r),class:"mb-10",label:"\u9A57\u8B49\u78BC",placeholder:"\u8ACB\u8F38\u5165\u624B\u6A5F\u9A57\u8B49\u78BC"},null,8,["modelValue"])]),_:1})])])}}});export{P as default};
