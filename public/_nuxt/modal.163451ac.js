import{_ as Fe}from"./UnoIcon.b2c4fb69.js";import{P as k,o as H,u as Q,t as j,p as $e,l as se,R as ie}from"./open-closed.00d41177.js";import{e as fe,m as V,w as N,P as K,M as J,N as Te,y as _e,o as Oe}from"./use-outside-click.95862c09.js";import{f as Z,a as X}from"./hidden.640fd1c7.js";import{s as R,r as d,a as P,e as f,m as b,F as Ce,p as $,w as ae,q as A,x as q,v as B,T as Re,Q as je,u as O,H as Ae,o as Be,k as Le,i as x,f as _,h as I,C as Ie}from"./entry.28800101.js";import{s as Me,f as Ne,o as ue}from"./transition.9d68d8de.js";import"./_plugin-vue_export-helper.a1a6add7.js";function He(e,t,a){fe||R(o=>{window.addEventListener(e,t,a),o(()=>window.removeEventListener(e,t,a))})}var ee=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(ee||{});function Ve(){let e=d(0);return He("keydown",t=>{t.key==="Tab"&&(e.value=t.shiftKey?1:0)}),e}function ve(e,t,a,o){fe||R(n=>{e=e!=null?e:window,e.addEventListener(t,a,o),n(()=>e.removeEventListener(t,a,o))})}function qe(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}var me=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(me||{});let M=Object.assign(P({name:"FocusTrap",props:{as:{type:[Object,String],default:"div"},initialFocus:{type:Object,default:null},features:{type:Number,default:30},containers:{type:Object,default:d(new Set)}},inheritAttrs:!1,setup(e,{attrs:t,slots:a,expose:o}){let n=d(null);o({el:n,$el:n});let l=f(()=>V(n));Ue({ownerDocument:l},f(()=>Boolean(e.features&16)));let r=Ge({ownerDocument:l,container:n,initialFocus:f(()=>e.initialFocus)},f(()=>Boolean(e.features&2)));We({ownerDocument:l,container:n,containers:e.containers,previousActiveElement:r},f(()=>Boolean(e.features&8)));let s=Ve();function u(){let i=H(n);!i||Q(s.value,{[ee.Forwards]:()=>K(i,J.First),[ee.Backwards]:()=>K(i,J.Last)})}return()=>{let i={},v={ref:n},{features:c,initialFocus:D,containers:G,...h}=e;return b(Ce,[Boolean(c&4)&&b(Z,{as:"button",type:"button",onFocus:u,features:X.Focusable}),k({ourProps:v,theirProps:{...t,...h},slot:i,attrs:t,slots:a,name:"FocusTrap"}),Boolean(c&4)&&b(Z,{as:"button",type:"button",onFocus:u,features:X.Focusable})])}}}),{features:me});function Ue({ownerDocument:e},t){let a=d(null);function o(){var l;a.value||(a.value=(l=e.value)==null?void 0:l.activeElement)}function n(){!a.value||(N(a.value),a.value=null)}$(()=>{ae(t,(l,r)=>{l!==r&&(l?o():n())},{immediate:!0})}),A(n)}function Ge({ownerDocument:e,container:t,initialFocus:a},o){let n=d(null),l=d(!1);return $(()=>l.value=!0),A(()=>l.value=!1),$(()=>{ae([t,a,o],(r,s)=>{if(r.every((i,v)=>(s==null?void 0:s[v])===i)||!o.value)return;let u=H(t);!u||qe(()=>{var i,v;if(!l.value)return;let c=H(a),D=(i=e.value)==null?void 0:i.activeElement;if(c){if(c===D){n.value=D;return}}else if(u.contains(D)){n.value=D;return}c?N(c):K(u,J.First|J.NoScroll)===Te.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),n.value=(v=e.value)==null?void 0:v.activeElement})},{immediate:!0,flush:"post"})}),n}function We({ownerDocument:e,container:t,containers:a,previousActiveElement:o},n){var l;ve((l=e.value)==null?void 0:l.defaultView,"focus",r=>{if(!n.value)return;let s=new Set(a==null?void 0:a.value);s.add(t);let u=o.value;if(!u)return;let i=r.target;i&&i instanceof HTMLElement?ze(s,i)?(o.value=i,N(i)):(r.preventDefault(),r.stopPropagation(),N(u)):N(o.value)},!0)}function ze(e,t){var a;for(let o of e)if((a=o.value)!=null&&a.contains(t))return!0;return!1}let de="body > *",C=new Set,F=new Map;function ce(e){e.setAttribute("aria-hidden","true"),e.inert=!0}function pe(e){let t=F.get(e);!t||(t["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",t["aria-hidden"]),e.inert=t.inert)}function Ye(e,t=d(!0)){R(a=>{if(!t.value||!e.value)return;let o=e.value,n=V(o);if(n){C.add(o);for(let l of F.keys())l.contains(o)&&(pe(l),F.delete(l));n.querySelectorAll(de).forEach(l=>{if(l instanceof HTMLElement){for(let r of C)if(l.contains(r))return;C.size===1&&(F.set(l,{"aria-hidden":l.getAttribute("aria-hidden"),inert:l.inert}),ce(l))}}),a(()=>{if(C.delete(o),C.size>0)n.querySelectorAll(de).forEach(l=>{if(l instanceof HTMLElement&&!F.has(l)){for(let r of C)if(l.contains(r))return;F.set(l,{"aria-hidden":l.getAttribute("aria-hidden"),inert:l.inert}),ce(l)}});else for(let l of F.keys())pe(l),F.delete(l)})}})}let ge=Symbol("ForcePortalRootContext");function Qe(){return B(ge,!1)}let te=P({name:"ForcePortalRoot",props:{as:{type:[Object,String],default:"template"},force:{type:Boolean,default:!1}},setup(e,{slots:t,attrs:a}){return q(ge,e.force),()=>{let{force:o,...n}=e;return k({theirProps:n,ourProps:{},slot:{},slots:t,attrs:a,name:"ForcePortalRoot"})}}});function Je(e){let t=V(e);if(!t){if(e===null)return null;throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`)}let a=t.getElementById("headlessui-portal-root");if(a)return a;let o=t.createElement("div");return o.setAttribute("id","headlessui-portal-root"),t.body.appendChild(o)}let he=P({name:"Portal",props:{as:{type:[Object,String],default:"div"}},setup(e,{slots:t,attrs:a}){let o=d(null),n=f(()=>V(o)),l=Qe(),r=B(ye,null),s=d(l===!0||r==null?Je(o.value):r.resolveTarget());return R(()=>{l||r!=null&&(s.value=r.resolveTarget())}),A(()=>{var u,i;let v=(u=n.value)==null?void 0:u.getElementById("headlessui-portal-root");!v||s.value===v&&s.value.children.length<=0&&((i=s.value.parentElement)==null||i.removeChild(s.value))}),()=>{if(s.value===null)return null;let u={ref:o,"data-headlessui-portal":""};return b(Re,{to:s.value},k({ourProps:u,theirProps:e,slot:{},attrs:a,slots:t,name:"Portal"}))}}}),ye=Symbol("PortalGroupContext"),Ke=P({name:"PortalGroup",props:{as:{type:[Object,String],default:"template"},target:{type:Object,default:null}},setup(e,{attrs:t,slots:a}){let o=je({resolveTarget(){return e.target}});return q(ye,o),()=>{let{target:n,...l}=e;return k({theirProps:l,ourProps:{},slot:{},attrs:t,slots:a,name:"PortalGroup"})}}}),be=Symbol("StackContext");var le=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(le||{});function Ze(){return B(be,()=>{})}function Xe({type:e,enabled:t,element:a,onUpdate:o}){let n=Ze();function l(...r){o==null||o(...r),n(...r)}$(()=>{ae(t,(r,s)=>{r?l(0,e,a):s===!0&&l(1,e,a)},{immediate:!0,flush:"sync"})}),A(()=>{t.value&&l(1,e,a)}),q(be,l)}let we=Symbol("DescriptionContext");function et(){let e=B(we,null);if(e===null)throw new Error("Missing parent");return e}function tt({slot:e=d({}),name:t="Description",props:a={}}={}){let o=d([]);function n(l){return o.value.push(l),()=>{let r=o.value.indexOf(l);r!==-1&&o.value.splice(r,1)}}return q(we,{register:n,slot:e,name:t,props:a}),f(()=>o.value.length>0?o.value.join(" "):void 0)}let Pt=P({name:"Description",props:{as:{type:[Object,String],default:"p"}},setup(e,{attrs:t,slots:a}){let o=et(),n=`headlessui-description-${j()}`;return $(()=>A(o.register(n))),()=>{let{name:l="Description",slot:r=d({}),props:s={}}=o,u=e,i={...Object.entries(s).reduce((v,[c,D])=>Object.assign(v,{[c]:O(D)}),{}),id:n};return k({ourProps:i,theirProps:u,slot:r.value,attrs:t,slots:a,name:l})}}});function lt(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}var ot=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(ot||{});let oe=Symbol("DialogContext");function U(e){let t=B(oe,null);if(t===null){let a=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(a,U),a}return t}let Y="DC8F892D-2EBD-447C-A4C8-A03058436FF4",at=P({name:"Dialog",inheritAttrs:!1,props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},open:{type:[Boolean,String],default:Y},initialFocus:{type:Object,default:null}},emits:{close:e=>!0},setup(e,{emit:t,attrs:a,slots:o,expose:n}){var l;let r=d(!1);$(()=>{r.value=!0});let s=d(0),u=$e(),i=f(()=>e.open===Y&&u!==null?Q(u.value,{[se.Open]:!0,[se.Closed]:!1}):e.open),v=d(new Set),c=d(null),D=d(null),G=f(()=>V(c));if(n({el:c,$el:c}),!(e.open!==Y||u!==null))throw new Error("You forgot to provide an `open` prop to the `Dialog`.");if(typeof i.value!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${i.value===Y?void 0:e.open}`);let h=f(()=>r.value&&i.value?0:1),ne=f(()=>h.value===0),W=f(()=>s.value>1),xe=B(oe,null)!==null,Pe=f(()=>W.value?"parent":"leaf");Ye(c,f(()=>W.value?ne.value:!1)),Xe({type:"Dialog",enabled:f(()=>h.value===0),element:c,onUpdate:(p,g,m)=>{if(g==="Dialog")return Q(p,{[le.Add](){v.value.add(m),s.value+=1},[le.Remove](){v.value.delete(m),s.value-=1}})}});let De=tt({name:"DialogDescription",slot:f(()=>({open:i.value}))}),ke=`headlessui-dialog-${j()}`,z=d(null),T={titleId:z,panelRef:d(null),dialogState:h,setTitleId(p){z.value!==p&&(z.value=p)},close(){t("close",!1)}};return q(oe,T),_e(()=>{var p,g,m;return[...Array.from((g=(p=G.value)==null?void 0:p.querySelectorAll("body > *, [data-headlessui-portal]"))!=null?g:[]).filter(w=>!(!(w instanceof HTMLElement)||w.contains(H(D))||T.panelRef.value&&w.contains(T.panelRef.value))),(m=T.panelRef.value)!=null?m:c.value]},(p,g)=>{T.close(),Ae(()=>g==null?void 0:g.focus())},f(()=>h.value===0&&!W.value)),ve((l=G.value)==null?void 0:l.defaultView,"keydown",p=>{p.defaultPrevented||p.key===Oe.Escape&&h.value===0&&(W.value||(p.preventDefault(),p.stopPropagation(),T.close()))}),R(p=>{var g;if(h.value!==0||xe)return;let m=G.value;if(!m)return;let w=Me();function y(E,L,Se){let Ee=E.style.getPropertyValue(L);return Object.assign(E.style,{[L]:Se}),w.add(()=>{Object.assign(E.style,{[L]:Ee})})}let S=m==null?void 0:m.documentElement,re=((g=m.defaultView)!=null?g:window).innerWidth-S.clientWidth;if(y(S,"overflow","hidden"),re>0){let E=S.clientWidth-S.offsetWidth,L=re-E;y(S,"paddingRight",`${L}px`)}if(lt()){let E=window.pageYOffset;y(S,"position","fixed"),y(S,"marginTop",`-${E}px`),y(S,"width","100%"),w.add(()=>window.scrollTo(0,E))}p(w.dispose)}),R(p=>{if(h.value!==0)return;let g=H(c);if(!g)return;let m=new IntersectionObserver(w=>{for(let y of w)y.boundingClientRect.x===0&&y.boundingClientRect.y===0&&y.boundingClientRect.width===0&&y.boundingClientRect.height===0&&T.close()});m.observe(g),p(()=>m.disconnect())}),()=>{let p={...a,ref:c,id:ke,role:"dialog","aria-modal":h.value===0?!0:void 0,"aria-labelledby":z.value,"aria-describedby":De.value},{open:g,initialFocus:m,...w}=e,y={open:h.value===0};return b(te,{force:!0},()=>[b(he,()=>b(Ke,{target:c.value},()=>b(te,{force:!1},()=>b(M,{initialFocus:m,containers:v,features:ne.value?Q(Pe.value,{parent:M.features.RestoreFocus,leaf:M.features.All&~M.features.FocusLock}):M.features.None},()=>k({ourProps:p,theirProps:w,slot:y,attrs:a,slots:o,visible:h.value===0,features:ie.RenderStrategy|ie.Static,name:"Dialog"}))))),b(Z,{features:X.Hidden,ref:D})])}}}),nt=P({name:"DialogOverlay",props:{as:{type:[Object,String],default:"div"}},setup(e,{attrs:t,slots:a}){let o=U("DialogOverlay"),n=`headlessui-dialog-overlay-${j()}`;function l(r){r.target===r.currentTarget&&(r.preventDefault(),r.stopPropagation(),o.close())}return()=>k({ourProps:{id:n,"aria-hidden":!0,onClick:l},theirProps:e,slot:{open:o.dialogState.value===0},attrs:t,slots:a,name:"DialogOverlay"})}});P({name:"DialogBackdrop",props:{as:{type:[Object,String],default:"div"}},inheritAttrs:!1,setup(e,{attrs:t,slots:a,expose:o}){let n=U("DialogBackdrop"),l=`headlessui-dialog-backdrop-${j()}`,r=d(null);return o({el:r,$el:r}),$(()=>{if(n.panelRef.value===null)throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.")}),()=>{let s=e,u={id:l,ref:r,"aria-hidden":!0};return b(te,{force:!0},()=>b(he,()=>k({ourProps:u,theirProps:{...t,...s},slot:{open:n.dialogState.value===0},attrs:t,slots:a,name:"DialogBackdrop"})))}}});P({name:"DialogPanel",props:{as:{type:[Object,String],default:"div"}},setup(e,{attrs:t,slots:a,expose:o}){let n=U("DialogPanel"),l=`headlessui-dialog-panel-${j()}`;o({el:n.panelRef,$el:n.panelRef});function r(s){s.stopPropagation()}return()=>{let s={id:l,ref:n.panelRef,onClick:r};return k({ourProps:s,theirProps:e,slot:{open:n.dialogState.value===0},attrs:t,slots:a,name:"DialogPanel"})}}});let rt=P({name:"DialogTitle",props:{as:{type:[Object,String],default:"h2"}},setup(e,{attrs:t,slots:a}){let o=U("DialogTitle"),n=`headlessui-dialog-title-${j()}`;return $(()=>{o.setTitleId(n),A(()=>o.setTitleId(null))}),()=>k({ourProps:{id:n},theirProps:e,slot:{open:o.dialogState.value===0},attrs:t,slots:a,name:"DialogTitle"})}});const st={class:"flex items-center justify-center"},it={class:"flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"},ut=x("span",{class:"hidden sm:inline-block sm:h-screen sm:align-middle","aria-hidden":"true"},"\u200B",-1),dt={class:"inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"},ct={class:"mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"},pt={class:"mt-3 text-center sm:mt-5"},ft=x("div",{class:"mt-2"},[x("p",{class:"text-sm text-gray-500"}," Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore. ")],-1),vt={class:"mt-5 sm:mt-6"},Dt=P({__name:"modal",setup(e){const t=d(!1);return(a,o)=>{const n=Fe;return Be(),Le("div",st,[x("button",{class:"rounded-lg bg-white p-4",onClick:o[0]||(o[0]=l=>t.value=!t.value)}," Open Modal "),_(O(Ne),{as:"template",show:t.value},{default:I(()=>[_(O(at),{as:"div",class:"fixed inset-0 z-10 overflow-y-auto",onClose:o[2]||(o[2]=l=>t.value=!1)},{default:I(()=>[x("div",it,[_(O(ue),{as:"template",enter:"ease-out duration-300","enter-from":"opacity-0","enter-to":"opacity-100",leave:"ease-in duration-200","leave-from":"opacity-100","leave-to":"opacity-0"},{default:I(()=>[_(O(nt),{class:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"})]),_:1}),ut,_(O(ue),{as:"template",enter:"ease-out duration-300","enter-from":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95","enter-to":"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200","leave-from":"opacity-100 translate-y-0 sm:scale-100","leave-to":"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"},{default:I(()=>[x("div",dt,[x("div",null,[x("div",ct,[_(n,{class:"i-ic-round-check h-6 w-6 text-lg text-green-600"})]),x("div",pt,[_(O(rt),{as:"h3",class:"text-lg font-medium leading-6 text-gray-900"},{default:I(()=>[Ie(" Payment successful ")]),_:1}),ft])]),x("div",vt,[x("button",{type:"button",class:"inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm",onClick:o[1]||(o[1]=l=>t.value=!1)}," Go back to dashboard ")])])]),_:1})])]),_:1})]),_:1},8,["show"])])}}});export{Dt as default};
