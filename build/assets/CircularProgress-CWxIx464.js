import{r,j as e,c as t}from"./index-C5loLNT9.js";import{a as s,g as a,s as i,b as o,m as n,u as l,c}from"./DefaultPropsProvider-DdaabJBK.js";import{c as m}from"./createSimplePaletteValueFilter-BwloS0Cl.js";import{k as p,c as d}from"./emotion-react.browser.esm-B7H-_Xiz.js";function f(r){return s("MuiCircularProgress",r)}a("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const v=p`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,h=p`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`,u="string"!=typeof v?d`
        animation: ${v} 1.4s linear infinite;
      `:null,k="string"!=typeof h?d`
        animation: ${h} 1.4s ease-in-out infinite;
      `:null,y=i("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.root,e[t.variant],e[`color${o(t.color)}`]]}})(n((({theme:r})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:r.transitions.create("transform")}},{props:{variant:"indeterminate"},style:u||{animation:`${v} 1.4s linear infinite`}},...Object.entries(r.palette).filter(m()).map((([e])=>({props:{color:e},style:{color:(r.vars||r).palette[e].main}})))]})))),g=i("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),x=i("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.circle,e[`circle${o(t.variant)}`],t.disableShrink&&e.circleDisableShrink]}})(n((({theme:r})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:r.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:r})=>"indeterminate"===r.variant&&!r.disableShrink,style:k||{animation:`${h} 1.4s ease-in-out infinite`}}]})))),S=r.forwardRef((function(r,s){const a=l({props:r,name:"MuiCircularProgress"}),{className:i,color:n="primary",disableShrink:m=!1,size:p=40,style:d,thickness:v=3.6,value:h=0,variant:u="indeterminate",...k}=a,S={...a,color:n,disableShrink:m,size:p,thickness:v,value:h,variant:u},b=(r=>{const{classes:e,variant:t,color:s,disableShrink:a}=r,i={root:["root",t,`color${o(s)}`],svg:["svg"],circle:["circle",`circle${o(t)}`,a&&"circleDisableShrink"]};return c(i,f,e)})(S),w={},P={},j={};if("determinate"===u){const r=2*Math.PI*((44-v)/2);w.strokeDasharray=r.toFixed(3),j["aria-valuenow"]=Math.round(h),w.strokeDashoffset=`${((100-h)/100*r).toFixed(3)}px`,P.transform="rotate(-90deg)"}return e.jsx(y,{className:t(b.root,i),style:{width:p,height:p,...P,...d},ownerState:S,ref:s,role:"progressbar",...j,...k,children:e.jsx(g,{className:b.svg,ownerState:S,viewBox:"22 22 44 44",children:e.jsx(x,{className:b.circle,style:w,ownerState:S,cx:44,cy:44,r:(44-v)/2,fill:"none",strokeWidth:v})})})}));export{S as C};
