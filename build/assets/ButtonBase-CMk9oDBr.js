var e=Object.defineProperty,t=(t,n,r)=>((t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r)(t,"symbol"!=typeof n?n+"":n,r);import{r as n,h as r,c as i,j as o}from"./index-C5loLNT9.js";import{_ as s,g as l,s as u,u as a,a as c,c as p}from"./DefaultPropsProvider-DdaabJBK.js";import{k as d}from"./emotion-react.browser.esm-B7H-_Xiz.js";import{_ as h,b as f,T as m,u as b,c as v}from"./TransitionGroupContext-oF5BF2eg.js";const g={};function x(e,t){const r=n.useRef(g);return r.current===g&&(r.current=e(t)),r}const M=[];class y{constructor(){t(this,"currentId",null),t(this,"clear",(()=>{null!==this.currentId&&(clearTimeout(this.currentId),this.currentId=null)})),t(this,"disposeEffect",(()=>this.clear))}static create(){return new y}start(e,t){this.clear(),this.currentId=setTimeout((()=>{this.currentId=null,t()}),e)}}function E(){const e=x(y.create).current;var t;return t=e.disposeEffect,n.useEffect(t,M),e}function R(e){try{return e.matches(":focus-visible")}catch(t){}return!1}function T(e,t){var r=Object.create(null);return e&&n.Children.map(e,(function(e){return e})).forEach((function(e){r[e.key]=function(e){return t&&n.isValidElement(e)?t(e):e}(e)})),r}function k(e,t,n){return null!=n[t]?n[t]:e.props[t]}function P(e,t,r){var i=T(e.children),o=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var r,i=Object.create(null),o=[];for(var s in e)s in t?o.length&&(i[s]=o,o=[]):o.push(s);var l={};for(var u in t){if(i[u])for(r=0;r<i[u].length;r++){var a=i[u][r];l[i[u][r]]=n(a)}l[u]=n(u)}for(r=0;r<o.length;r++)l[o[r]]=n(o[r]);return l}(t,i);return Object.keys(o).forEach((function(s){var l=o[s];if(n.isValidElement(l)){var u=s in t,a=s in i,c=t[s],p=n.isValidElement(c)&&!c.props.in;!a||u&&!p?a||!u||p?a&&u&&n.isValidElement(c)&&(o[s]=n.cloneElement(l,{onExited:r.bind(null,l),in:c.props.in,exit:k(l,"exit",e),enter:k(l,"enter",e)})):o[s]=n.cloneElement(l,{in:!1}):o[s]=n.cloneElement(l,{onExited:r.bind(null,l),in:!0,exit:k(l,"exit",e),enter:k(l,"enter",e)})}})),o}var j=Object.values||function(e){return Object.keys(e).map((function(t){return e[t]}))},w=function(e){function t(t,n){var r,i=(r=e.call(this,t,n)||this).handleExited.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(r));return r.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},r}h(t,e);var i=t.prototype;return i.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},i.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var r,i,o=t.children,s=t.handleExited;return{children:t.firstRender?(r=e,i=s,T(r.children,(function(e){return n.cloneElement(e,{onExited:i.bind(null,e),in:!0,appear:k(e,"appear",r),enter:k(e,"enter",r),exit:k(e,"exit",r)})}))):P(e,o,s),firstRender:!1}},i.handleExited=function(e,t){var n=T(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState((function(t){var n=s({},t.children);return delete n[e.key],{children:n}})))},i.render=function(){var e=this.props,t=e.component,n=e.childFactory,i=f(e,["component","childFactory"]),o=this.state.contextValue,s=j(this.state.children).map(n);return delete i.appear,delete i.enter,delete i.exit,null===t?r.createElement(m.Provider,{value:o},s):r.createElement(m.Provider,{value:o},r.createElement(t,i,s))},t}(r.Component);w.propTypes={},w.defaultProps={component:"div",childFactory:function(e){return e}};class S{constructor(){t(this,"mountEffect",(()=>{this.shouldMount&&!this.didMount&&null!==this.ref.current&&(this.didMount=!0,this.mounted.resolve())})),this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}static create(){return new S}static use(){const e=x(S.create).current,[t,r]=n.useState(!1);return e.shouldMount=t,e.setShouldMount=r,n.useEffect(e.mountEffect,[t]),e}mount(){return this.mounted||(this.mounted=function(){let e,t;const n=new Promise(((n,r)=>{e=n,t=r}));return n.resolve=e,n.reject=t,n}(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}start(...e){this.mount().then((()=>{var t;return null==(t=this.ref.current)?void 0:t.start(...e)}))}stop(...e){this.mount().then((()=>{var t;return null==(t=this.ref.current)?void 0:t.stop(...e)}))}pulsate(...e){this.mount().then((()=>{var t;return null==(t=this.ref.current)?void 0:t.pulsate(...e)}))}}const V=l("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),C=d`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,I=d`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,$=d`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,D=u("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),B=u((function(e){const{className:t,classes:r,pulsate:s=!1,rippleX:l,rippleY:u,rippleSize:a,in:c,onExited:p,timeout:d}=e,[h,f]=n.useState(!1),m=i(t,r.ripple,r.rippleVisible,s&&r.ripplePulsate),b={width:a,height:a,top:-a/2+u,left:-a/2+l},v=i(r.child,h&&r.childLeaving,s&&r.childPulsate);return c||h||f(!0),n.useEffect((()=>{if(!c&&null!=p){const e=setTimeout(p,d);return()=>{clearTimeout(e)}}}),[p,c,d]),o.jsx("span",{className:m,style:b,children:o.jsx("span",{className:v})})}),{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${V.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${C};
    animation-duration: ${550}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${V.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${V.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${V.childLeaving} {
    opacity: 0;
    animation-name: ${I};
    animation-duration: ${550}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${V.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${$};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,L=n.forwardRef((function(e,t){const r=a({props:e,name:"MuiTouchRipple"}),{center:s=!1,classes:l={},className:u,...c}=r,[p,d]=n.useState([]),h=n.useRef(0),f=n.useRef(null);n.useEffect((()=>{f.current&&(f.current(),f.current=null)}),[p]);const m=n.useRef(!1),b=E(),v=n.useRef(null),g=n.useRef(null),x=n.useCallback((e=>{const{pulsate:t,rippleX:n,rippleY:r,rippleSize:s,cb:u}=e;d((e=>[...e,o.jsx(B,{classes:{ripple:i(l.ripple,V.ripple),rippleVisible:i(l.rippleVisible,V.rippleVisible),ripplePulsate:i(l.ripplePulsate,V.ripplePulsate),child:i(l.child,V.child),childLeaving:i(l.childLeaving,V.childLeaving),childPulsate:i(l.childPulsate,V.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:r,rippleSize:s},h.current)])),h.current+=1,f.current=u}),[l]),M=n.useCallback(((e={},t={},n=()=>{})=>{const{pulsate:r=!1,center:i=s||t.pulsate,fakeElement:o=!1}=t;if("mousedown"===(null==e?void 0:e.type)&&m.current)return void(m.current=!1);"touchstart"===(null==e?void 0:e.type)&&(m.current=!0);const l=o?null:g.current,u=l?l.getBoundingClientRect():{width:0,height:0,left:0,top:0};let a,c,p;if(i||void 0===e||0===e.clientX&&0===e.clientY||!e.clientX&&!e.touches)a=Math.round(u.width/2),c=Math.round(u.height/2);else{const{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;a=Math.round(t-u.left),c=Math.round(n-u.top)}if(i)p=Math.sqrt((2*u.width**2+u.height**2)/3),p%2==0&&(p+=1);else{const e=2*Math.max(Math.abs((l?l.clientWidth:0)-a),a)+2,t=2*Math.max(Math.abs((l?l.clientHeight:0)-c),c)+2;p=Math.sqrt(e**2+t**2)}(null==e?void 0:e.touches)?null===v.current&&(v.current=()=>{x({pulsate:r,rippleX:a,rippleY:c,rippleSize:p,cb:n})},b.start(80,(()=>{v.current&&(v.current(),v.current=null)}))):x({pulsate:r,rippleX:a,rippleY:c,rippleSize:p,cb:n})}),[s,x,b]),y=n.useCallback((()=>{M({},{pulsate:!0})}),[M]),R=n.useCallback(((e,t)=>{if(b.clear(),"touchend"===(null==e?void 0:e.type)&&v.current)return v.current(),v.current=null,void b.start(0,(()=>{R(e,t)}));v.current=null,d((e=>e.length>0?e.slice(1):e)),f.current=t}),[b]);return n.useImperativeHandle(t,(()=>({pulsate:y,start:M,stop:R})),[y,M,R]),o.jsx(D,{className:i(V.root,l.root,u),ref:g,...c,children:o.jsx(w,{component:null,exit:!0,children:p})})}));function N(e){return c("MuiButtonBase",e)}const z=l("MuiButtonBase",["root","disabled","focusVisible"]),O=u("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${z.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),X=n.forwardRef((function(e,t){const r=a({props:e,name:"MuiButtonBase"}),{action:s,centerRipple:l=!1,children:u,className:c,component:d="button",disabled:h=!1,disableRipple:f=!1,disableTouchRipple:m=!1,focusRipple:g=!1,focusVisibleClassName:x,LinkComponent:M="a",onBlur:y,onClick:E,onContextMenu:T,onDragLeave:k,onFocus:P,onFocusVisible:j,onKeyDown:w,onKeyUp:V,onMouseDown:C,onMouseLeave:I,onMouseUp:$,onTouchEnd:D,onTouchMove:B,onTouchStart:z,tabIndex:X=0,TouchRippleProps:F,touchRippleRef:Y,type:A,...H}=r,U=n.useRef(null),K=S.use(),W=b(K.ref,Y),[q,_]=n.useState(!1);h&&q&&_(!1),n.useImperativeHandle(s,(()=>({focusVisible:()=>{_(!0),U.current.focus()}})),[]);const G=K.shouldMount&&!f&&!h;function J(e,t,n=m){return v((r=>(t&&t(r),n||K[e](r),!0)))}n.useEffect((()=>{q&&g&&!f&&K.pulsate()}),[f,g,q,K]);const Q=J("start",C),Z=J("stop",T),ee=J("stop",k),te=J("stop",$),ne=J("stop",(e=>{q&&e.preventDefault(),I&&I(e)})),re=J("start",z),ie=J("stop",D),oe=J("stop",B),se=J("stop",(e=>{R(e.target)||_(!1),y&&y(e)}),!1),le=v((e=>{U.current||(U.current=e.currentTarget),R(e.target)&&(_(!0),j&&j(e)),P&&P(e)})),ue=()=>{const e=U.current;return d&&"button"!==d&&!("A"===e.tagName&&e.href)},ae=v((e=>{g&&!e.repeat&&q&&" "===e.key&&K.stop(e,(()=>{K.start(e)})),e.target===e.currentTarget&&ue()&&" "===e.key&&e.preventDefault(),w&&w(e),e.target===e.currentTarget&&ue()&&"Enter"===e.key&&!h&&(e.preventDefault(),E&&E(e))})),ce=v((e=>{g&&" "===e.key&&q&&!e.defaultPrevented&&K.stop(e,(()=>{K.pulsate(e)})),V&&V(e),E&&e.target===e.currentTarget&&ue()&&" "===e.key&&!e.defaultPrevented&&E(e)}));let pe=d;"button"===pe&&(H.href||H.to)&&(pe=M);const de={};"button"===pe?(de.type=void 0===A?"button":A,de.disabled=h):(H.href||H.to||(de.role="button"),h&&(de["aria-disabled"]=h));const he=b(t,U),fe={...r,centerRipple:l,component:d,disabled:h,disableRipple:f,disableTouchRipple:m,focusRipple:g,tabIndex:X,focusVisible:q},me=(e=>{const{disabled:t,focusVisible:n,focusVisibleClassName:r,classes:i}=e,o=p({root:["root",t&&"disabled",n&&"focusVisible"]},N,i);return n&&r&&(o.root+=` ${r}`),o})(fe);return o.jsxs(O,{as:pe,className:i(me.root,c),ownerState:fe,onBlur:se,onClick:E,onContextMenu:Z,onFocus:le,onKeyDown:ae,onKeyUp:ce,onMouseDown:Q,onMouseLeave:ne,onMouseUp:te,onDragLeave:ee,onTouchEnd:ie,onTouchMove:oe,onTouchStart:re,ref:he,tabIndex:h?-1:X,type:A,...de,...H,children:[u,G?o.jsx(L,{ref:W,center:l,...F}):null]})}));export{X as B,R as i,E as u};
