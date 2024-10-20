import{r as e,j as a,c as t}from"./index-C5loLNT9.js";import{C as s}from"./Container-B6ePsMKV.js";import{j as i,i as r}from"./index-CbBQEXOZ.js";import{T as n}from"./react-DzpohTab.js";import{P as o,m as l,e as d,a as p,c,b as u,g as m,H as g,S as x,d as h,f,T as v}from"./free-mode-Bz71LfPM.js";import{u as y,P as b}from"./Product-CTLeT94v.js";import{u as w}from"./useQuery-cduBLe5R.js";import{g as j,a as C}from"./productsApi-BTledkMr.js";import{S as L}from"./Skeleton-CvGoc7fe.js";import{s as N}from"./supabase-ClnIyvqL.js";import{g as E}from"./articlesApi-BvuGhY9p.js";import{A as S}from"./ArticleItem-CYFi0Nzc.js";import{g as M,a as $,s as A,m as P,u as k,c as T,d as R}from"./DefaultPropsProvider-DdaabJBK.js";import{u as I,T as q,g as z,a as F}from"./useSlot-yd80tk_q.js";import{u as B,B as D}from"./ButtonBase-CMk9oDBr.js";import{u as G}from"./TransitionGroupContext-oF5BF2eg.js";import"./emotion-react.browser.esm-B7H-_Xiz.js";import"./createSimplePaletteValueFilter-BwloS0Cl.js";import"./index-vpg3BdSk.js";import"./index-CQsUyfF_.js";import"./useBaseQuery-Dhpcymqo.js";function O(e){return $("MuiCollapse",e)}M("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const V=A("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:t}=e;return[a.root,a[t.orientation],"entered"===t.state&&a.entered,"exited"===t.state&&!t.in&&"0px"===t.collapsedSize&&a.hidden]}})(P((({theme:e})=>({height:0,overflow:"hidden",transition:e.transitions.create("height"),variants:[{props:{orientation:"horizontal"},style:{height:"auto",width:0,transition:e.transitions.create("width")}},{props:{state:"entered"},style:{height:"auto",overflow:"visible"}},{props:{state:"entered",orientation:"horizontal"},style:{width:"auto"}},{props:({ownerState:e})=>"exited"===e.state&&!e.in&&"0px"===e.collapsedSize,style:{visibility:"hidden"}}]})))),H=A("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(e,a)=>a.wrapper})({display:"flex",width:"100%",variants:[{props:{orientation:"horizontal"},style:{width:"auto",height:"100%"}}]}),W=A("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(e,a)=>a.wrapperInner})({width:"100%",variants:[{props:{orientation:"horizontal"},style:{width:"auto",height:"100%"}}]}),_=e.forwardRef((function(s,i){const r=k({props:s,name:"MuiCollapse"}),{addEndListener:n,children:o,className:l,collapsedSize:d="0px",component:p,easing:c,in:u,onEnter:m,onEntered:g,onEntering:x,onExit:h,onExited:f,onExiting:v,orientation:y="vertical",style:b,timeout:w=R.standard,TransitionComponent:j=q,...C}=r,L={...r,orientation:y,collapsedSize:d},N=(e=>{const{orientation:a,classes:t}=e;return T({root:["root",`${a}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${a}`],wrapperInner:["wrapperInner",`${a}`]},O,t)})(L),E=I(),S=B(),M=e.useRef(null),$=e.useRef(),A="number"==typeof d?`${d}px`:d,P="horizontal"===y,F=P?"width":"height",D=e.useRef(null),_=G(i,D),K=e=>a=>{if(e){const t=D.current;void 0===a?e(t):e(t,a)}},Q=()=>M.current?M.current[P?"clientWidth":"clientHeight"]:0,U=K(((e,a)=>{M.current&&P&&(M.current.style.position="absolute"),e.style[F]=A,m&&m(e,a)})),X=K(((e,a)=>{const t=Q();M.current&&P&&(M.current.style.position="");const{duration:s,easing:i}=z({style:b,timeout:w,easing:c},{mode:"enter"});if("auto"===w){const a=E.transitions.getAutoHeightDuration(t);e.style.transitionDuration=`${a}ms`,$.current=a}else e.style.transitionDuration="string"==typeof s?s:`${s}ms`;e.style[F]=`${t}px`,e.style.transitionTimingFunction=i,x&&x(e,a)})),Y=K(((e,a)=>{e.style[F]="auto",g&&g(e,a)})),J=K((e=>{e.style[F]=`${Q()}px`,h&&h(e)})),Z=K(f),ee=K((e=>{const a=Q(),{duration:t,easing:s}=z({style:b,timeout:w,easing:c},{mode:"exit"});if("auto"===w){const t=E.transitions.getAutoHeightDuration(a);e.style.transitionDuration=`${t}ms`,$.current=t}else e.style.transitionDuration="string"==typeof t?t:`${t}ms`;e.style[F]=A,e.style.transitionTimingFunction=s,v&&v(e)}));return a.jsx(j,{in:u,onEnter:U,onEntered:Y,onEntering:X,onExit:J,onExited:Z,onExiting:ee,addEndListener:e=>{"auto"===w&&S.start($.current||0,e),n&&n(D.current,e)},nodeRef:D,timeout:"auto"===w?null:w,...C,children:(e,s)=>a.jsx(V,{as:p,className:t(N.root,l,{entered:N.entered,exited:!u&&"0px"===A&&N.hidden}[e]),style:{[P?"minWidth":"minHeight"]:A,...b},ref:_,...s,ownerState:{...L,state:e},children:a.jsx(H,{ownerState:{...L,state:e},className:N.wrapper,ref:M,children:a.jsx(W,{ownerState:{...L,state:e},className:N.wrapperInner,children:o})})})})}));_&&(_.muiSupportAuto=!0);const K=e.createContext({});function Q(e){return $("MuiAccordion",e)}const U=M("MuiAccordion",["root","heading","rounded","expanded","disabled","gutters","region"]),X=A(o,{name:"MuiAccordion",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:t}=e;return[{[`& .${U.region}`]:a.region},a.root,!t.square&&a.rounded,!t.disableGutters&&a.gutters]}})(P((({theme:e})=>{const a={duration:e.transitions.duration.shortest};return{position:"relative",transition:e.transitions.create(["margin"],a),overflowAnchor:"none","&::before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(e.vars||e).palette.divider,transition:e.transitions.create(["opacity","background-color"],a)},"&:first-of-type":{"&::before":{display:"none"}},[`&.${U.expanded}`]:{"&::before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&::before":{display:"none"}}},[`&.${U.disabled}`]:{backgroundColor:(e.vars||e).palette.action.disabledBackground}}})),P((({theme:e})=>({variants:[{props:e=>!e.square,style:{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(e.vars||e).shape.borderRadius,borderTopRightRadius:(e.vars||e).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(e.vars||e).shape.borderRadius,borderBottomRightRadius:(e.vars||e).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}}},{props:e=>!e.disableGutters,style:{[`&.${U.expanded}`]:{margin:"16px 0"}}}]})))),Y=A("h3",{name:"MuiAccordion",slot:"Heading",overridesResolver:(e,a)=>a.heading})({all:"unset"}),J=e.forwardRef((function(s,i){const r=k({props:s,name:"MuiAccordion"}),{children:n,className:o,defaultExpanded:l=!1,disabled:d=!1,disableGutters:p=!1,expanded:c,onChange:u,square:m=!1,slots:g={},slotProps:x={},TransitionComponent:h,TransitionProps:f,...v}=r,[b,w]=y({controlled:c,default:l,name:"Accordion",state:"expanded"}),j=e.useCallback((e=>{w(!b),u&&u(e,!b)}),[b,u,w]),[C,...L]=e.Children.toArray(n),N=e.useMemo((()=>({expanded:b,disabled:d,disableGutters:p,toggle:j})),[b,d,p,j]),E={...r,square:m,disabled:d,disableGutters:p,expanded:b},S=(e=>{const{classes:a,square:t,expanded:s,disabled:i,disableGutters:r}=e;return T({root:["root",!t&&"rounded",s&&"expanded",i&&"disabled",!r&&"gutters"],heading:["heading"],region:["region"]},Q,a)})(E),M={slots:{transition:h,...g},slotProps:{transition:f,...x}},[$,A]=F("heading",{elementType:Y,externalForwardedProps:M,className:S.heading,ownerState:E}),[P,R]=F("transition",{elementType:_,externalForwardedProps:M,ownerState:E});return a.jsxs(X,{className:t(S.root,o),ref:i,ownerState:E,square:m,...v,children:[a.jsx($,{...A,children:a.jsx(K.Provider,{value:N,children:C})}),a.jsx(P,{in:b,timeout:"auto",...R,children:a.jsx("div",{"aria-labelledby":C.props.id,id:C.props["aria-controls"],role:"region",className:S.region,children:L})})]})}));function Z(e){return $("MuiAccordionDetails",e)}M("MuiAccordionDetails",["root"]);const ee=A("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(e,a)=>a.root})(P((({theme:e})=>({padding:e.spacing(1,2,2)})))),ae=e.forwardRef((function(e,s){const i=k({props:e,name:"MuiAccordionDetails"}),{className:r,...n}=i,o=i,l=(e=>{const{classes:a}=e;return T({root:["root"]},Z,a)})(o);return a.jsx(ee,{className:t(l.root,r),ref:s,ownerState:o,...n})}));function te(e){return $("MuiAccordionSummary",e)}const se=M("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),ie=A(D,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(e,a)=>a.root})(P((({theme:e})=>{const a={duration:e.transitions.duration.shortest};return{display:"flex",minHeight:48,padding:e.spacing(0,2),transition:e.transitions.create(["min-height","background-color"],a),[`&.${se.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${se.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`&:hover:not(.${se.disabled})`]:{cursor:"pointer"},variants:[{props:e=>!e.disableGutters,style:{[`&.${se.expanded}`]:{minHeight:64}}}]}}))),re=A("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(e,a)=>a.content})(P((({theme:e})=>({display:"flex",flexGrow:1,margin:"12px 0",variants:[{props:e=>!e.disableGutters,style:{transition:e.transitions.create(["margin"],{duration:e.transitions.duration.shortest}),[`&.${se.expanded}`]:{margin:"20px 0"}}}]})))),ne=A("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(e,a)=>a.expandIconWrapper})(P((({theme:e})=>({display:"flex",color:(e.vars||e).palette.action.active,transform:"rotate(0deg)",transition:e.transitions.create("transform",{duration:e.transitions.duration.shortest}),[`&.${se.expanded}`]:{transform:"rotate(180deg)"}})))),oe=e.forwardRef((function(s,i){const r=k({props:s,name:"MuiAccordionSummary"}),{children:n,className:o,expandIcon:l,focusVisibleClassName:d,onClick:p,...c}=r,{disabled:u=!1,disableGutters:m,expanded:g,toggle:x}=e.useContext(K),h={...r,expanded:g,disabled:u,disableGutters:m},f=(e=>{const{classes:a,expanded:t,disabled:s,disableGutters:i}=e;return T({root:["root",t&&"expanded",s&&"disabled",!i&&"gutters"],focusVisible:["focusVisible"],content:["content",t&&"expanded",!i&&"contentGutters"],expandIconWrapper:["expandIconWrapper",t&&"expanded"]},te,a)})(h);return a.jsxs(ie,{focusRipple:!1,disableRipple:!0,disabled:u,component:"div","aria-expanded":g,className:t(f.root,o),focusVisibleClassName:t(f.focusVisible,d),onClick:e=>{x&&x(e),p&&p(e)},ref:i,ownerState:h,...c,children:[a.jsx(re,{className:f.content,ownerState:h,children:n}),l&&a.jsx(ne,{className:f.expandIconWrapper,ownerState:h,children:l})]})}));function le(){return a.jsx("div",{className:"_hero-section_v6lo2_1 relative mx-auto h-auto md:min-h-dvh",children:a.jsxs("div",{className:"lg:pt-18 flex flex-col gap-5 px-5 pt-10 sm:gap-7 md:pt-14 lg:pt-20",children:[a.jsx("h1",{className:"bg-clip-text text-center text-3xl font-bold uppercase tracking-widest xs:text-4xl sm:text-5xl lg:text-6xl",children:a.jsx(n,{options:{strings:"hello world",autoStart:!0,cursor:""}})}),a.jsx("img",{src:"hero-mobile.webp",alt:"poster",className:"mx-auto w-full max-w-sm md:hidden"}),a.jsx("p",{className:"mx-auto max-w-xl text-pretty text-center text-sm font-medium leading-6 xs:text-lg xs:!leading-8 sm:text-xl",children:"Welcome to AMIN STORE! Discover a wide range of top-quality products at unbeatable prices. Enjoy fast delivery and excellent customer service."}),a.jsx("div",{className:"flex justify-center",children:a.jsxs("a",{href:"#last-products",className:"flex items-center gap-3 rounded-full bg-gradient-to-r from-[#663dff] to-[#aa00ff] px-3 py-1 text-base font-medium uppercase text-white xs:text-xl sm:text-2xl xl:animate-pulse",children:[a.jsx(i,{}),"get started",a.jsx(i,{})]})})]})})}function de(e){return void 0===e&&(e=""),`.${e.trim().replace(/([\.:!+\/])/g,"\\$1").replace(/ /g,".")}`}function pe(e){let{swiper:a,extendParams:t,on:s,emit:i}=e;const r="swiper-pagination";let n;t({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`,paginationDisabledClass:`${r}-disabled`}}),a.pagination={el:null,bullets:[]};let o=0;function m(){return!a.params.pagination.el||!a.pagination.el||Array.isArray(a.pagination.el)&&0===a.pagination.el.length}function g(e,t){const{bulletActiveClass:s}=a.params.pagination;e&&(e=e[("prev"===t?"previous":"next")+"ElementSibling"])&&(e.classList.add(`${s}-${t}`),(e=e[("prev"===t?"previous":"next")+"ElementSibling"])&&e.classList.add(`${s}-${t}-${t}`))}function x(e){const t=e.target.closest(de(a.params.pagination.bulletClass));if(!t)return;e.preventDefault();const s=p(t)*a.params.slidesPerGroup;if(a.params.loop){if(a.realIndex===s)return;const e=(i=a.realIndex,r=s,(r%=n=a.slides.length)==1+(i%=n)?"next":r===i-1?"previous":void 0);"next"===e?a.slideNext():"previous"===e?a.slidePrev():a.slideToLoop(s)}else a.slideTo(s);var i,r,n}function h(){const e=a.rtl,t=a.params.pagination;if(m())return;let s,r,c=a.pagination.el;c=l(c);const u=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.slides.length,x=a.params.loop?Math.ceil(u/a.params.slidesPerGroup):a.snapGrid.length;if(a.params.loop?(r=a.previousRealIndex||0,s=a.params.slidesPerGroup>1?Math.floor(a.realIndex/a.params.slidesPerGroup):a.realIndex):void 0!==a.snapIndex?(s=a.snapIndex,r=a.previousSnapIndex):(r=a.previousIndex||0,s=a.activeIndex||0),"bullets"===t.type&&a.pagination.bullets&&a.pagination.bullets.length>0){const i=a.pagination.bullets;let l,u,m;if(t.dynamicBullets&&(n=d(i[0],a.isHorizontal()?"width":"height"),c.forEach((e=>{e.style[a.isHorizontal()?"width":"height"]=n*(t.dynamicMainBullets+4)+"px"})),t.dynamicMainBullets>1&&void 0!==r&&(o+=s-(r||0),o>t.dynamicMainBullets-1?o=t.dynamicMainBullets-1:o<0&&(o=0)),l=Math.max(s-o,0),u=l+(Math.min(i.length,t.dynamicMainBullets)-1),m=(u+l)/2),i.forEach((e=>{const a=[...["","-next","-next-next","-prev","-prev-prev","-main"].map((e=>`${t.bulletActiveClass}${e}`))].map((e=>"string"==typeof e&&e.includes(" ")?e.split(" "):e)).flat();e.classList.remove(...a)})),c.length>1)i.forEach((e=>{const i=p(e);i===s?e.classList.add(...t.bulletActiveClass.split(" ")):a.isElement&&e.setAttribute("part","bullet"),t.dynamicBullets&&(i>=l&&i<=u&&e.classList.add(...`${t.bulletActiveClass}-main`.split(" ")),i===l&&g(e,"prev"),i===u&&g(e,"next"))}));else{const e=i[s];if(e&&e.classList.add(...t.bulletActiveClass.split(" ")),a.isElement&&i.forEach(((e,a)=>{e.setAttribute("part",a===s?"bullet-active":"bullet")})),t.dynamicBullets){const e=i[l],a=i[u];for(let s=l;s<=u;s+=1)i[s]&&i[s].classList.add(...`${t.bulletActiveClass}-main`.split(" "));g(e,"prev"),g(a,"next")}}if(t.dynamicBullets){const s=Math.min(i.length,t.dynamicMainBullets+4),r=(n*s-n)/2-m*n,o=e?"right":"left";i.forEach((e=>{e.style[a.isHorizontal()?o:"top"]=`${r}px`}))}}c.forEach(((e,r)=>{if("fraction"===t.type&&(e.querySelectorAll(de(t.currentClass)).forEach((e=>{e.textContent=t.formatFractionCurrent(s+1)})),e.querySelectorAll(de(t.totalClass)).forEach((e=>{e.textContent=t.formatFractionTotal(x)}))),"progressbar"===t.type){let i;i=t.progressbarOpposite?a.isHorizontal()?"vertical":"horizontal":a.isHorizontal()?"horizontal":"vertical";const r=(s+1)/x;let n=1,o=1;"horizontal"===i?n=r:o=r,e.querySelectorAll(de(t.progressbarFillClass)).forEach((e=>{e.style.transform=`translate3d(0,0,0) scaleX(${n}) scaleY(${o})`,e.style.transitionDuration=`${a.params.speed}ms`}))}"custom"===t.type&&t.renderCustom?(e.innerHTML=t.renderCustom(a,s+1,x),0===r&&i("paginationRender",e)):(0===r&&i("paginationRender",e),i("paginationUpdate",e)),a.params.watchOverflow&&a.enabled&&e.classList[a.isLocked?"add":"remove"](t.lockClass)}))}function f(){const e=a.params.pagination;if(m())return;const t=a.virtual&&a.params.virtual.enabled?a.virtual.slides.length:a.grid&&a.params.grid.rows>1?a.slides.length/Math.ceil(a.params.grid.rows):a.slides.length;let s=a.pagination.el;s=l(s);let r="";if("bullets"===e.type){let s=a.params.loop?Math.ceil(t/a.params.slidesPerGroup):a.snapGrid.length;a.params.freeMode&&a.params.freeMode.enabled&&s>t&&(s=t);for(let t=0;t<s;t+=1)e.renderBullet?r+=e.renderBullet.call(a,t,e.bulletClass):r+=`<${e.bulletElement} ${a.isElement?'part="bullet"':""} class="${e.bulletClass}"></${e.bulletElement}>`}"fraction"===e.type&&(r=e.renderFraction?e.renderFraction.call(a,e.currentClass,e.totalClass):`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),"progressbar"===e.type&&(r=e.renderProgressbar?e.renderProgressbar.call(a,e.progressbarFillClass):`<span class="${e.progressbarFillClass}"></span>`),a.pagination.bullets=[],s.forEach((t=>{"custom"!==e.type&&(t.innerHTML=r||""),"bullets"===e.type&&a.pagination.bullets.push(...t.querySelectorAll(de(e.bulletClass)))})),"custom"!==e.type&&i("paginationRender",s[0])}function v(){a.params.pagination=c(a,a.originalParams.pagination,a.params.pagination,{el:"swiper-pagination"});const e=a.params.pagination;if(!e.el)return;let t;"string"==typeof e.el&&a.isElement&&(t=a.el.querySelector(e.el)),t||"string"!=typeof e.el||(t=[...document.querySelectorAll(e.el)]),t||(t=e.el),t&&0!==t.length&&(a.params.uniqueNavElements&&"string"==typeof e.el&&Array.isArray(t)&&t.length>1&&(t=[...a.el.querySelectorAll(e.el)],t.length>1&&(t=t.filter((e=>u(e,".swiper")[0]===a.el))[0])),Array.isArray(t)&&1===t.length&&(t=t[0]),Object.assign(a.pagination,{el:t}),t=l(t),t.forEach((t=>{"bullets"===e.type&&e.clickable&&t.classList.add(...(e.clickableClass||"").split(" ")),t.classList.add(e.modifierClass+e.type),t.classList.add(a.isHorizontal()?e.horizontalClass:e.verticalClass),"bullets"===e.type&&e.dynamicBullets&&(t.classList.add(`${e.modifierClass}${e.type}-dynamic`),o=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),"progressbar"===e.type&&e.progressbarOpposite&&t.classList.add(e.progressbarOppositeClass),e.clickable&&t.addEventListener("click",x),a.enabled||t.classList.add(e.lockClass)})))}function y(){const e=a.params.pagination;if(m())return;let t=a.pagination.el;t&&(t=l(t),t.forEach((t=>{t.classList.remove(e.hiddenClass),t.classList.remove(e.modifierClass+e.type),t.classList.remove(a.isHorizontal()?e.horizontalClass:e.verticalClass),e.clickable&&(t.classList.remove(...(e.clickableClass||"").split(" ")),t.removeEventListener("click",x))}))),a.pagination.bullets&&a.pagination.bullets.forEach((a=>a.classList.remove(...e.bulletActiveClass.split(" "))))}s("changeDirection",(()=>{if(!a.pagination||!a.pagination.el)return;const e=a.params.pagination;let{el:t}=a.pagination;t=l(t),t.forEach((t=>{t.classList.remove(e.horizontalClass,e.verticalClass),t.classList.add(a.isHorizontal()?e.horizontalClass:e.verticalClass)}))})),s("init",(()=>{!1===a.params.pagination.enabled?b():(v(),f(),h())})),s("activeIndexChange",(()=>{void 0===a.snapIndex&&h()})),s("snapIndexChange",(()=>{h()})),s("snapGridLengthChange",(()=>{f(),h()})),s("destroy",(()=>{y()})),s("enable disable",(()=>{let{el:e}=a.pagination;e&&(e=l(e),e.forEach((e=>e.classList[a.enabled?"remove":"add"](a.params.pagination.lockClass))))})),s("lock unlock",(()=>{h()})),s("click",((e,t)=>{const s=t.target,r=l(a.pagination.el);if(a.params.pagination.el&&a.params.pagination.hideOnClick&&r&&r.length>0&&!s.classList.contains(a.params.pagination.bulletClass)){if(a.navigation&&(a.navigation.nextEl&&s===a.navigation.nextEl||a.navigation.prevEl&&s===a.navigation.prevEl))return;const e=r[0].classList.contains(a.params.pagination.hiddenClass);i(!0===e?"paginationShow":"paginationHide"),r.forEach((e=>e.classList.toggle(a.params.pagination.hiddenClass)))}}));const b=()=>{a.el.classList.add(a.params.pagination.paginationDisabledClass);let{el:e}=a.pagination;e&&(e=l(e),e.forEach((e=>e.classList.add(a.params.pagination.paginationDisabledClass)))),y()};Object.assign(a.pagination,{enable:()=>{a.el.classList.remove(a.params.pagination.paginationDisabledClass);let{el:e}=a.pagination;e&&(e=l(e),e.forEach((e=>e.classList.remove(a.params.pagination.paginationDisabledClass)))),v(),f(),h()},disable:b,render:f,update:h,init:v,destroy:y})}function ce(e){let a,t,{swiper:s,extendParams:i,on:r,emit:n,params:o}=e;s.autoplay={running:!1,paused:!1,timeLeft:0},i({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!1,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let l,d,p,c,u,g,x,h,f=o&&o.autoplay?o.autoplay.delay:3e3,v=o&&o.autoplay?o.autoplay.delay:3e3,y=(new Date).getTime();function b(e){s&&!s.destroyed&&s.wrapperEl&&e.target===s.wrapperEl&&(s.wrapperEl.removeEventListener("transitionend",b),h||e.detail&&e.detail.bySwiperTouchMove||E())}const w=()=>{if(s.destroyed||!s.autoplay.running)return;s.autoplay.paused?d=!0:d&&(v=l,d=!1);const e=s.autoplay.paused?l:y+v-(new Date).getTime();s.autoplay.timeLeft=e,n("autoplayTimeLeft",e,e/f),t=requestAnimationFrame((()=>{w()}))},j=e=>{if(s.destroyed||!s.autoplay.running)return;cancelAnimationFrame(t),w();let i=void 0===e?s.params.autoplay.delay:e;f=s.params.autoplay.delay,v=s.params.autoplay.delay;const r=(()=>{let e;if(e=s.virtual&&s.params.virtual.enabled?s.slides.filter((e=>e.classList.contains("swiper-slide-active")))[0]:s.slides[s.activeIndex],e)return parseInt(e.getAttribute("data-swiper-autoplay"),10)})();!Number.isNaN(r)&&r>0&&void 0===e&&(i=r,f=r,v=r),l=i;const o=s.params.speed,d=()=>{s&&!s.destroyed&&(s.params.autoplay.reverseDirection?!s.isBeginning||s.params.loop||s.params.rewind?(s.slidePrev(o,!0,!0),n("autoplay")):s.params.autoplay.stopOnLastSlide||(s.slideTo(s.slides.length-1,o,!0,!0),n("autoplay")):!s.isEnd||s.params.loop||s.params.rewind?(s.slideNext(o,!0,!0),n("autoplay")):s.params.autoplay.stopOnLastSlide||(s.slideTo(0,o,!0,!0),n("autoplay")),s.params.cssMode&&(y=(new Date).getTime(),requestAnimationFrame((()=>{j()}))))};return i>0?(clearTimeout(a),a=setTimeout((()=>{d()}),i)):requestAnimationFrame((()=>{d()})),i},C=()=>{y=(new Date).getTime(),s.autoplay.running=!0,j(),n("autoplayStart")},L=()=>{s.autoplay.running=!1,clearTimeout(a),cancelAnimationFrame(t),n("autoplayStop")},N=(e,t)=>{if(s.destroyed||!s.autoplay.running)return;clearTimeout(a),e||(x=!0);const i=()=>{n("autoplayPause"),s.params.autoplay.waitForTransition?s.wrapperEl.addEventListener("transitionend",b):E()};if(s.autoplay.paused=!0,t)return g&&(l=s.params.autoplay.delay),g=!1,void i();const r=l||s.params.autoplay.delay;l=r-((new Date).getTime()-y),s.isEnd&&l<0&&!s.params.loop||(l<0&&(l=0),i())},E=()=>{s.isEnd&&l<0&&!s.params.loop||s.destroyed||!s.autoplay.running||(y=(new Date).getTime(),x?(x=!1,j(l)):j(),s.autoplay.paused=!1,n("autoplayResume"))},S=()=>{if(s.destroyed||!s.autoplay.running)return;const e=m();"hidden"===e.visibilityState&&(x=!0,N(!0)),"visible"===e.visibilityState&&E()},M=e=>{"mouse"===e.pointerType&&(x=!0,h=!0,s.animating||s.autoplay.paused||N(!0))},$=e=>{"mouse"===e.pointerType&&(h=!1,s.autoplay.paused&&E())};r("init",(()=>{s.params.autoplay.enabled&&(s.params.autoplay.pauseOnMouseEnter&&(s.el.addEventListener("pointerenter",M),s.el.addEventListener("pointerleave",$)),m().addEventListener("visibilitychange",S),C())})),r("destroy",(()=>{s.el&&"string"!=typeof s.el&&(s.el.removeEventListener("pointerenter",M),s.el.removeEventListener("pointerleave",$)),m().removeEventListener("visibilitychange",S),s.autoplay.running&&L()})),r("_freeModeStaticRelease",(()=>{(c||x)&&E()})),r("_freeModeNoMomentumRelease",(()=>{s.params.autoplay.disableOnInteraction?L():N(!0,!0)})),r("beforeTransitionStart",((e,a,t)=>{!s.destroyed&&s.autoplay.running&&(t||!s.params.autoplay.disableOnInteraction?N(!0,!0):L())})),r("sliderFirstMove",(()=>{!s.destroyed&&s.autoplay.running&&(s.params.autoplay.disableOnInteraction?L():(p=!0,c=!1,x=!1,u=setTimeout((()=>{x=!0,c=!0,N(!0)}),200)))})),r("touchEnd",(()=>{if(!s.destroyed&&s.autoplay.running&&p){if(clearTimeout(u),clearTimeout(a),s.params.autoplay.disableOnInteraction)return c=!1,void(p=!1);c&&s.params.cssMode&&E(),c=!1,p=!1}})),r("slideChange",(()=>{!s.destroyed&&s.autoplay.running&&(g=!0)})),Object.assign(s.autoplay,{start:C,stop:L,pause:N,resume:E})}function ue(e){let a,t,s,i,{swiper:r,extendParams:n,on:o}=e;n({grid:{rows:1,fill:"column"}});const l=()=>{let e=r.params.spaceBetween;return"string"==typeof e&&e.indexOf("%")>=0?e=parseFloat(e.replace("%",""))/100*r.size:"string"==typeof e&&(e=parseFloat(e)),e};o("init",(()=>{i=r.params.grid&&r.params.grid.rows>1})),o("update",(()=>{const{params:e,el:a}=r,t=e.grid&&e.grid.rows>1;i&&!t?(a.classList.remove(`${e.containerModifierClass}grid`,`${e.containerModifierClass}grid-column`),s=1,r.emitContainerClasses()):!i&&t&&(a.classList.add(`${e.containerModifierClass}grid`),"column"===e.grid.fill&&a.classList.add(`${e.containerModifierClass}grid-column`),r.emitContainerClasses()),i=t})),r.grid={initSlides:e=>{const{slidesPerView:i}=r.params,{rows:n,fill:o}=r.params.grid,l=r.virtual&&r.params.virtual.enabled?r.virtual.slides.length:e.length;s=Math.floor(l/n),a=Math.floor(l/n)===l/n?l:Math.ceil(l/n)*n,"auto"!==i&&"row"===o&&(a=Math.max(a,i*n)),t=a/n},unsetSlides:()=>{r.slides&&r.slides.forEach((e=>{e.swiperSlideGridSet&&(e.style.height="",e.style[r.getDirectionLabel("margin-top")]="")}))},updateSlide:(e,i,n)=>{const{slidesPerGroup:o}=r.params,d=l(),{rows:p,fill:c}=r.params.grid,u=r.virtual&&r.params.virtual.enabled?r.virtual.slides.length:n.length;let m,g,x;if("row"===c&&o>1){const t=Math.floor(e/(o*p)),s=e-p*o*t,r=0===t?o:Math.min(Math.ceil((u-t*p*o)/p),o);x=Math.floor(s/r),g=s-x*r+t*o,m=g+x*a/p,i.style.order=m}else"column"===c?(g=Math.floor(e/p),x=e-g*p,(g>s||g===s&&x===p-1)&&(x+=1,x>=p&&(x=0,g+=1))):(x=Math.floor(e/t),g=e-x*t);i.row=x,i.column=g,i.style.height=`calc((100% - ${(p-1)*d}px) / ${p})`,i.style[r.getDirectionLabel("margin-top")]=0!==x?d&&`${d}px`:"",i.swiperSlideGridSet=!0},updateWrapperSize:(e,t)=>{const{centeredSlides:s,roundLengths:i}=r.params,n=l(),{rows:o}=r.params.grid;if(r.virtualSize=(e+n)*a,r.virtualSize=Math.ceil(r.virtualSize/o)-n,r.params.cssMode||(r.wrapperEl.style[r.getDirectionLabel("width")]=`${r.virtualSize+n}px`),s){const e=[];for(let a=0;a<t.length;a+=1){let s=t[a];i&&(s=Math.floor(s)),t[a]<r.virtualSize+t[0]&&e.push(s)}t.splice(0,t.length),t.push(...e)}}}}function me(){const{products:e,isLoading:t}=function({limit:e}){const{data:a,isLoading:t}=w({queryKey:["limit-products"],queryFn:()=>j({limit:e})});return{products:a,isLoading:t}}({limit:8});return a.jsxs("div",{id:"last-products",children:[a.jsx(g,{title:"Latest Products",buttonTextContent:"All Products",path:"/products"}),t&&a.jsxs("div",{className:"grid grid-cols-1 gap-5 vxs:grid-cols-2 sm:grid-cols-3 850:grid-cols-4",children:[a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-[300px] sm:!h-[320px] 850:!h-[400px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!hidden !h-[300px] vxs:!block sm:!h-[320px] 850:!h-[400px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!hidden !h-[300px] sm:!block sm:!h-[320px] 850:!h-[400px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!hidden !h-[300px] sm:!h-[320px] 850:!block 850:!h-[400px]"})]}),(null==e?void 0:e.length)>0&&!t&&a.jsx(x,{className:"mySwiper relative mt-5 !px-1 !pb-7",modules:[ce,pe],grid:{fill:"column",rows:1},spaceBetween:20,autoplay:{delay:5e3},pagination:{clickable:!0},breakpoints:{0:{slidesPerView:1},380:{slidesPerView:2},640:{slidesPerView:3},850:{slidesPerView:4}},children:e.length>0&&e.map((e=>a.jsx(h,{className:"main-swiper h-full hover:z-20",children:a.jsx(b,{product:e})},e.id)))})]})}function ge({feature:e}){const{title:t,description:s,shadowColor:i,image:r}=e;return a.jsxs("div",{className:"flex min-h-[114px] w-full items-center gap-x-6 rounded-md bg-white p-3 sm:flex-col sm:gap-4 sm:px-4 sm:py-6 md:gap-6",style:{boxShadow:`0 2px 6px -1.2px ${i}`},children:[a.jsx("div",{className:"w-[70px] sm:w-[118px]",children:a.jsx("img",{src:r,className:"w-full",alt:"FAST SHIPPING"})}),a.jsxs("div",{className:"flex w-3/4 flex-col gap-4 sm:w-full",children:[a.jsx("h3",{className:"text-start text-sm font-bold sm:text-center sm:text-lg md:text-xl",children:t}),a.jsx("p",{className:"line-clamp-3 text-[11px] !leading-relaxed text-neutral-600 sm:line-clamp-none sm:text-sm",children:s})]})]})}async function xe(){const{data:e,error:a}=await N.from("features").select("*").order("id");if(a)throw new Error(a);return e}function he(){const{features:e,isLoading:t}=function(){const{data:e,isLoading:a}=w({queryKey:["features"],queryFn:xe});return{features:e,isLoading:a}}();return a.jsxs("div",{children:[a.jsx(g,{title:"why buy from us?"}),t&&a.jsxs("div",{className:"grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",children:[a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-[114px] sm:!h-[305px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-[114px] sm:!h-[305px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-[114px] sm:!h-[305px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-[114px] sm:!h-[305px]"})]}),!t&&a.jsx("div",{className:"grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",children:e.length>0&&e.map((e=>a.jsx(ge,{feature:e},e.id)))})]})}function fe(){const{discountProducts:e,isLoading:t}=function(){const{data:e,isLoading:a}=w({queryKey:["discount-products"],queryFn:C});return{discountProducts:e,isLoading:a}}();return a.jsxs("div",{children:[a.jsx(g,{title:"Discount Products",path:"/products?discount-products=true",buttonTextContent:"discounts"}),t&&a.jsxs("div",{className:"grid grid-cols-1 gap-5 vxs:grid-cols-2 sm:grid-cols-3 850:grid-cols-4",children:[a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-[300px] sm:!h-[320px] 850:!h-[400px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!hidden !h-[300px] vxs:!block sm:!h-[320px] 850:!h-[400px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!hidden !h-[300px] sm:!block sm:!h-[320px] 850:!h-[400px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!hidden !h-[300px] sm:!h-[320px] 850:!block 850:!h-[400px]"})]}),!t&&a.jsx(x,{className:"mySwiper relative mt-5 !px-1 !pb-7",modules:[ce,pe,ue],grid:{fill:"column",rows:1},spaceBetween:20,autoplay:{delay:5e3},pagination:{clickable:!0},breakpoints:{0:{slidesPerView:1},380:{slidesPerView:2},640:{slidesPerView:3},850:{slidesPerView:4}},children:e.length>0&&e.map((e=>a.jsx(h,{className:"main-swiper hover:z-20",children:a.jsx(b,{product:e})},e.id)))})]})}function ve(){const{latestArticles:e,isLoading:t}=function(){const{data:e,isLoading:a}=w({queryKey:["latestArticles"],queryFn:E});return{latestArticles:e,isLoading:a}}();return a.jsxs("div",{className:"pt-5",children:[a.jsx(g,{title:"Latest Articles",buttonTextContent:"more articles",path:"/articles"}),t&&a.jsx("div",{className:"my-5 grid grid-cols-1 gap-6 xs:grid-cols-2 850:grid-cols-3",children:Array(6).fill(0).map(((e,t)=>a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-[240px] vxs:!h-[300px] xs:!h-[240px] 850:!h-[300px]"},`latest_article_skeleton_${t}`)))}),!t&&a.jsx("div",{className:"my-5 grid grid-cols-1 gap-6 xs:grid-cols-2 850:grid-cols-3",children:e.length&&e.map((e=>a.jsx(S,{article:e},e.id)))})]})}async function ye(){const{data:e,error:a}=await N.from("popular-brands").select("*");if(a)throw new Error(a);return e}function be(){const{brands:e,isLoading:t}=function(){const{data:e,isLoading:a}=w({queryKey:["popular-brands"],queryFn:ye});return{brands:e,isLoading:a}}();return a.jsxs("div",{children:[a.jsx(g,{title:"Most Popular Brands"}),t&&a.jsx("div",{className:"my-5 w-full",children:a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-[150px]"})}),!t&&a.jsx(x,{spaceBetween:24,modules:[ce,f],autoplay:{delay:2e3,disableOnInteraction:!1},loop:!0,className:"my-5 cursor-grab rounded-md border border-slate-400/25 bg-white !px-6 !py-4 !shadow transition-all duration-300 active:cursor-grabbing active:ring-2 active:ring-violet-500",breakpoints:{0:{slidesPerView:1},360:{slidesPerView:2},500:{slidesPerView:3},700:{slidesPerView:4},950:{slidesPerView:5},1050:{slidesPerView:6},1150:{slidesPerView:7}},children:e.length>0&&e.map((e=>a.jsx(h,{className:"main-swiper !flex w-full items-center justify-center border-x",children:a.jsx("div",{className:"flex h-[120px] w-[120px] items-center justify-center",children:a.jsx("img",{src:e.image,alt:`brand-${e.id}`,className:"w-full"})})},e.id)))})]})}async function we(){const{data:e,error:a}=await N.from("questions").select("*").order("created_at",{ascending:!0});if(a)throw new Error(a);return e}function je({question:e}){const{title:t,description:s}=e;return a.jsxs(J,{className:"!my-0 !divide-y !border-b-0 !shadow !shadow-violet-400",children:[a.jsx(oe,{className:"!bg-violet-50/50",expandIcon:a.jsx(r,{}),"aria-controls":"panel1-content",id:"panel1-header",children:a.jsx(v,{className:"!font-montserrat !text-[13px] !font-semibold 360:!text-sm vxs:!text-base 450:!text-lg sm:!px-3 sm:!py-2",children:t})}),a.jsx(ae,{className:"!h-auto",children:a.jsx(v,{className:"!font-montserrat !text-[10px] !font-medium 360:!text-xs vxs:!text-sm 450:!text-base sm:!p-2",children:s})})]})}function Ce(){const{questions:e,isLoading:t}=function(){const{data:e,isLoading:a}=w({queryKey:["Frequently-Asked-Questions"],queryFn:we});return{questions:e,isLoading:a}}();return a.jsxs("div",{className:"flex flex-col gap-6",children:[a.jsx(g,{title:"frequently asked questions"}),t&&a.jsxs("div",{className:"flex flex-col gap-6",children:[a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-12 xs:!h-[52px] sm:!h-[68px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-12 xs:!h-[52px] sm:!h-[68px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-12 xs:!h-[52px] sm:!h-[68px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-12 xs:!h-[52px] sm:!h-[68px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-12 xs:!h-[52px] sm:!h-[68px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-12 xs:!h-[52px] sm:!h-[68px]"}),a.jsx(L,{variant:"rounded",animation:"wave",className:"!h-12 xs:!h-[52px] sm:!h-[68px]"})]}),!t&&a.jsx("div",{className:"flex flex-col gap-6 !font-montserrat",children:e.length>0&&e.map((e=>a.jsx(je,{question:e},e.id)))})]})}function Le(){return a.jsxs(a.Fragment,{children:[a.jsx(le,{}),a.jsxs(s,{children:[a.jsx(me,{}),a.jsx(he,{}),a.jsx(fe,{}),a.jsx(ve,{}),a.jsx(be,{}),a.jsx(Ce,{})]})]})}export{Le as default};
