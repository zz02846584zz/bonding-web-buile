import{P as n}from"./use-outside-click.e3f54d8f.js";import{a}from"./entry.63b62ac3.js";var s=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(s||{});let f=a({name:"Hidden",props:{as:{type:[Object,String],default:"div"},features:{type:Number,default:1}},setup(e,{slots:o,attrs:r}){return()=>{let{features:t,...i}=e,d={"aria-hidden":(t&2)===2?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(t&4)===4&&(t&2)!==2&&{display:"none"}}};return n({ourProps:d,theirProps:i,slot:{},attrs:r,slots:o,name:"Hidden"})}}});export{s as a,f};
