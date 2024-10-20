import{r as t,j as e,c as a}from"./index-C5loLNT9.js";import{g as n,a as r,s as i,m as o,u as s,c as l,n as h}from"./DefaultPropsProvider-DdaabJBK.js";import{k as p,c as d}from"./emotion-react.browser.esm-B7H-_Xiz.js";function m(t){return r("MuiSkeleton",t)}n("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const u=p`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,c=p`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,f="string"!=typeof u?d`
        animation: ${u} 2s ease-in-out 0.5s infinite;
      `:null,g="string"!=typeof c?d`
        &::after {
          animation: ${c} 2s linear 0.5s infinite;
        }
      `:null,v=i("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],!1!==a.animation&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(o((({theme:t})=>{const e=(a=t.shape.borderRadius,String(a).match(/[\d.\-+]*\s*(.*)/)[1]||"px");var a;const n=(r=t.shape.borderRadius,parseFloat(r));var r;return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:h(t.palette.text.primary,"light"===t.palette.mode?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${n}${e}/${Math.round(n/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:t})=>t.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:t})=>t.hasChildren&&!t.width,style:{maxWidth:"fit-content"}},{props:({ownerState:t})=>t.hasChildren&&!t.height,style:{height:"auto"}},{props:{animation:"pulse"},style:f||{animation:`${u} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(\n                90deg,\n                transparent,\n                ${(t.vars||t).palette.action.hover},\n                transparent\n              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:g||{"&::after":{animation:`${c} 2s linear 0.5s infinite`}}}]}}))),w=t.forwardRef((function(t,n){const r=s({props:t,name:"MuiSkeleton"}),{animation:i="pulse",className:o,component:h="span",height:p,style:d,variant:u="text",width:c,...f}=r,g={...r,animation:i,component:h,variant:u,hasChildren:Boolean(f.children)},w=(t=>{const{classes:e,variant:a,animation:n,hasChildren:r,width:i,height:o}=t;return l({root:["root",a,n,r&&"withChildren",r&&!i&&"fitContent",r&&!o&&"heightAuto"]},m,e)})(g);return e.jsx(v,{as:h,ref:n,className:a(w.root,o),ownerState:g,...f,style:{width:c,height:p,...d}})}));export{w as S};
