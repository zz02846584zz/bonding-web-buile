import{a as F,z as b,U as v,Y as B,b as u,o as h,l as E,j as e,f as a,t as y,u as A,h as C,S as w,s as V,V as $,W as k}from"./entry.f0967dd5.js";import{e as D}from"./regex.b022fd56.js";const S={class:"flex items-center justify-between sticky"},U={class:"flex items-center space-x-2"},I={class:"text-xl font-bold"},j=e("span",{class:"pr-2 duration-150"}," \u9001\u51FA ",-1),N={class:"py-3"},H=F({__name:"email-binding",setup(R){const n=b({email:""}),{user:l}=v(),{info:f}=B(l),i=u("loading"),r=u("alert"),c=u("message"),m=async()=>{const{email:s}=n;if(!s.length)return c.value="\u6B04\u4F4D\u4E0D\u80FD\u7559\u7A7A";if(!D.test(s))return c.value="\u4FE1\u7BB1\u683C\u5F0F\u932F\u8AA4";i.value=!0;const{error:t,message:o}=await w("/user/email-binding",{body:{email:s}});return i.value=!1,t&&o?r.value={type:"error",text:o,center:!0}:(l.updateField({emailVerify:"pending"}),r.value={type:"success",title:"\u5DF2\u767C\u9001\u9A57\u8B49\u4FE1\uFF0C\u8ACB\u81F3\u4FE1\u7BB1\u67E5\u6536"})};return(s,t)=>{var d,p;const o=V,g=k,x=$;return h(),E("div",null,[e("div",S,[e("div",U,[e("div",{class:"flex items-center cursor-pointer",onClick:t[0]||(t[0]=_=>s.$router.go(-1))},[a(o,{class:"i-ic-round-arrow-back-ios text-sm lg:text-base"})]),e("h1",I,y((p=(d=A(f))==null?void 0:d.email)!=null&&p.length?"\u4FEE\u6539":"\u7D81\u5B9A")+"Email ",1)]),e("div",{class:"group rounded-full cursor-pointer bg-green-500 text-white font-bold px-4 h-9 leading-9 flex items-center",onClick:m},[j,a(o,{class:"i-ic-round-arrow-forward-ios"})])]),e("div",N,[a(x,{onSubmit:m},{default:C(()=>[a(g,{id:"email",modelValue:n.email,"onUpdate:modelValue":t[1]||(t[1]=_=>n.email=_),label:"Email",class:"mb-3",placeholder:"example@domain.com"},null,8,["modelValue"])]),_:1})])])}}});export{H as default};
