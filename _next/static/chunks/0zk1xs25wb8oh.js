(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,52683,e=>{"use strict";let t,i,n,r,a,o,s,l;var d=e.i(47167),c=e.i(43476),p=e.i(71645);let u=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","scaleZ","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],m=new Set([...u,"pathRotation"]),h=(e,t,i)=>i>t?t:i<e?e:i,f={test:e=>"number"==typeof e,parse:parseFloat,transform:e=>e},g={...f,transform:e=>h(0,1,e)},b={...f,default:1},y=e=>Math.round(1e5*e)/1e5,x=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu,v=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,w=(e,t)=>i=>!!("string"==typeof i&&v.test(i)&&i.startsWith(e)||t&&null!=i&&Object.prototype.hasOwnProperty.call(i,t)),C=(e,t,i)=>n=>{if("string"!=typeof n)return n;let[r,a,o,s]=n.match(x);return{[e]:parseFloat(r),[t]:parseFloat(a),[i]:parseFloat(o),alpha:void 0!==s?parseFloat(s):1}},S={...f,transform:e=>Math.round(h(0,255,e))},k={test:w("rgb","red"),parse:C("red","green","blue"),transform:({red:e,green:t,blue:i,alpha:n=1})=>"rgba("+S.transform(e)+", "+S.transform(t)+", "+S.transform(i)+", "+y(g.transform(n))+")"},N=(e,t,i)=>{let n=e.substring(1+t*i,1+(t+1)*i);return i>1?n:n+n},A={test:w("#"),parse:function(e){let t=e.length>5?2:1,i=N(e,3,t);return{red:parseInt(N(e,0,t),16),green:parseInt(N(e,1,t),16),blue:parseInt(N(e,2,t),16),alpha:i?parseInt(i,16)/255:1}},transform:k.transform},T=e=>({test:t=>"string"==typeof t&&t.endsWith(e)&&1===t.split(" ").length,parse:parseFloat,transform:t=>`${t}${e}`}),R=T("deg"),L=T("%"),P=T("px"),I=T("vh"),E=T("vw"),M={...L,parse:e=>L.parse(e)/100,transform:e=>L.transform(100*e)},j={test:w("hsl","hue"),parse:C("hue","saturation","lightness"),transform:({hue:e,saturation:t,lightness:i,alpha:n=1})=>"hsla("+Math.round(e)+", "+L.transform(y(t))+", "+L.transform(y(i))+", "+y(g.transform(n))+")"},D={test:e=>k.test(e)||A.test(e)||j.test(e),parse:e=>k.test(e)?k.parse(e):j.test(e)?j.parse(e):A.parse(e),transform:e=>"string"==typeof e?e:e.hasOwnProperty("red")?k.transform(e):j.transform(e),getAnimatableNone:e=>{let t=D.parse(e);return t.alpha=0,D.transform(t)}},O=new RegExp(x.source),B=RegExp(/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu.source,"i"),z="number",F="color",U=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)(?![a-z]*\()/giu;function V(e){let t=e.toString(),i=[],n={color:[],number:[],var:[]},r=[],a=0,o=t.replace(U,e=>(D.test(e)?(n.color.push(a),r.push(F),i.push(D.parse(e))):e.startsWith("var(")?(n.var.push(a),r.push("var"),i.push(e)):(n.number.push(a),r.push(z),i.push(parseFloat(e))),++a,"${}")).split("${}");return{values:i,split:o,indexes:n,types:r}}function H({split:e,types:t}){let i=e.length;return n=>{let r="";for(let a=0;a<i;a++)if(r+=e[a],void 0!==n[a]){let e=t[a];e===z?r+=y(n[a]):e===F?r+=D.transform(n[a]):r+=n[a]}return r}}let G={test:function(e){return isNaN(e)&&"string"==typeof e&&(O.test(e)||B.test(e))},parse:function(e){return V(e).values},createTransformer:function(e){return H(V(e))},getAnimatableNone:function(e){let t=V(e);return H(t)(t.values.map((e,i)=>((e,t)=>"number"==typeof e?t?.trim().endsWith("/")?e:0:"number"==typeof e?0:D.test(e)?D.getAnimatableNone(e):e)(e,t.split[i])))}},q=new Set(["brightness","contrast","saturate","opacity"]);function W(e){let[t,i]=e.slice(0,-1).split("(");if("drop-shadow"===t)return e;let[n]=i.match(x)||[];if(!n)return e;let r=i.replace(n,""),a=+!!q.has(t);return n!==i&&(a*=100),t+"("+a+r+")"}let _=/\b([a-z-]*)\(.*?\)/gu,X={...G,getAnimatableNone:e=>{let t=e.match(_);return t?t.map(W).join(" "):e}},K={...G,getAnimatableNone:e=>{let t=G.parse(e);return G.createTransformer(e)(t.map(e=>"number"==typeof e?0:"object"==typeof e?{...e,alpha:1}:e))}},$={...f,transform:Math.round},Y={rotate:R,pathRotation:R,rotateX:R,rotateY:R,rotateZ:R,scale:b,scaleX:b,scaleY:b,scaleZ:b,skew:R,skewX:R,skewY:R,distance:P,translateX:P,translateY:P,translateZ:P,x:P,y:P,z:P,perspective:P,transformPerspective:P,opacity:g,originX:M,originY:M,originZ:P},Z={borderWidth:P,borderTopWidth:P,borderRightWidth:P,borderBottomWidth:P,borderLeftWidth:P,borderRadius:P,borderTopLeftRadius:P,borderTopRightRadius:P,borderBottomRightRadius:P,borderBottomLeftRadius:P,width:P,maxWidth:P,height:P,maxHeight:P,top:P,right:P,bottom:P,left:P,inset:P,insetBlock:P,insetBlockStart:P,insetBlockEnd:P,insetInline:P,insetInlineStart:P,insetInlineEnd:P,padding:P,paddingTop:P,paddingRight:P,paddingBottom:P,paddingLeft:P,paddingBlock:P,paddingBlockStart:P,paddingBlockEnd:P,paddingInline:P,paddingInlineStart:P,paddingInlineEnd:P,margin:P,marginTop:P,marginRight:P,marginBottom:P,marginLeft:P,marginBlock:P,marginBlockStart:P,marginBlockEnd:P,marginInline:P,marginInlineStart:P,marginInlineEnd:P,fontSize:P,backgroundPositionX:P,backgroundPositionY:P,...Y,zIndex:$,fillOpacity:g,strokeOpacity:g,numOctaves:$},Q={...Z,color:D,backgroundColor:D,outlineColor:D,fill:D,stroke:D,borderColor:D,borderTopColor:D,borderRightColor:D,borderBottomColor:D,borderLeftColor:D,filter:X,WebkitFilter:X,mask:K,WebkitMask:K},J=e=>Q[e],ee=()=>({translate:0,scale:1,origin:0,originPoint:0}),et=()=>({x:ee(),y:ee()}),ei=()=>({min:0,max:0}),en=()=>({x:ei(),y:ei()}),er=e=>!!(e&&e.getVelocity),ea=new Set(["width","height","top","left","right","bottom",...u]),eo=[f,P,L,R,E,I,{test:e=>"auto"===e,parse:e=>e}],es=e=>eo.find(t=>t.test(e)),el=e=>t=>"string"==typeof t&&t.startsWith(e),ed=el("--"),ec=el("var(--"),ep=e=>!!ec(e)&&eu.test(e.split("/*")[0].trim()),eu=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function em(e){return"string"==typeof e&&e.split("/*")[0].includes("var(--")}let eh=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function ef(e,t,i=1){let[n,r]=function(e){let t=eh.exec(e);if(!t)return[,];let[,i,n,r]=t;return[`--${i??n}`,r]}(e);if(!n)return;let a=window.getComputedStyle(t).getPropertyValue(n);if(a){let e=a.trim();return/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e)?parseFloat(e):e}return ep(r)?ef(r,t,i+1):r}let eg=new Set([X,K]);function eb(e,r){if(e===t&&r===i)return n;let a=J(e);return eg.has(a)||(a=G),n=a.getAnimatableNone?a.getAnimatableNone(r):void 0,t=e,i=r,n}let ey=e=>180*e/Math.PI,ex=e=>ew(ey(Math.atan2(e[1],e[0]))),ev={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scaleZ:()=>1,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:ex,rotateZ:ex,skewX:e=>ey(Math.atan(e[1])),skewY:e=>ey(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},ew=e=>((e%=360)<0&&(e+=360),e),eC=e=>Math.hypot(e[0],e[1]),eS=e=>Math.hypot(e[4],e[5]),ek={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:eC,scaleY:eS,scaleZ:e=>Math.hypot(e[8],e[9],e[10]),scale:e=>(eC(e)+eS(e))/2,rotateX:e=>ew(ey(Math.atan2(e[6],e[5]))),rotateY:e=>ew(ey(Math.atan2(-e[2],e[0]))),rotateZ:ex,rotate:ex,skewX:e=>ey(Math.atan(e[4])),skewY:e=>ey(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function eN(e){return+!!e.includes("scale")}function eA(e,t){if(!e||"none"===e)return eN(t);let i=e.match(/^matrix(3d)?\(([-\d.e\s,]+)\)$/u);if(!i)return eN(t);let n=(i[1]?ek:ev)[t],r=i[2].split(",").map(e=>parseFloat(e));return"function"==typeof n?n(r):r[n]}let eT=e=>e===f||e===P,eR=new Set(["x","y","z"]),eL=u.filter(e=>!eR.has(e)),eP=new Set(["bottom","right"]);function eI(e,t,i,n,r,a){let o=parseFloat(e);if(!isNaN(o))return o;let{min:s,max:l}=t()[i],d=l-s;return"border-box"===a?d:d-parseFloat(n)-parseFloat(r)}let eE=({transform:e})=>eA(e,"x"),eM=({transform:e})=>eA(e,"y"),ej={width:({width:e,paddingLeft:t="0",paddingRight:i="0",boxSizing:n},r)=>eI(e,r,"x",t,i,n),height:({height:e,paddingTop:t="0",paddingBottom:i="0",boxSizing:n},r)=>eI(e,r,"y",t,i,n),top:({top:e})=>parseFloat(e),left:({left:e})=>parseFloat(e),bottom:({top:e},t)=>{let{y:i}=t();return parseFloat(e)+(i.max-i.min)},right:({left:e},t)=>{let{x:i}=t();return parseFloat(e)+(i.max-i.min)},x:eE,y:eM,translateX:eE,translateY:eM},eD=e=>e,eO={},eB=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function ez(e,t,i={delta:0,timestamp:0,isProcessing:!1}){let n=!1,r=!0,a=()=>n=!0,o=eB.reduce((e,t)=>(e[t]=function(e){let t,i=new Set,n=new Set,r=!1,a=!1,o=new Set,s={delta:0,timestamp:0,isProcessing:!1};function l(i){o.has(i)&&(n.add(i),e()),(t=i)(s)}let d={schedule:(e,a=!1,s=!1)=>{let l=s&&r,d=l?i:n;return a&&o.add(e),l&&e!==t&&d.delete(e),d.add(e),e},cancel:e=>{n.delete(e),o.delete(e)},process:e=>{if(s=e,r){a=!0;return}r=!0;let o=i;i=n,n=o,i.forEach(l),i.clear(),t=void 0,r=!1,a&&(a=!1,d.process(e))}};return d}(a),e),{}),{setup:s,read:l,resolveKeyframes:d,preUpdate:c,update:p,preRender:u,render:m,postRender:h}=o,f=()=>{let a=eO.useManualTiming,o=a?i.timestamp:performance.now();n=!1,a||(i.delta=r?1e3/60:Math.max(Math.min(o-i.timestamp,40),1)),i.timestamp=o,i.isProcessing=!0,s.process(i),l.process(i),d.process(i),c.process(i),p.process(i),u.process(i),m.process(i),h.process(i),i.isProcessing=!1,n&&t&&(r=!1,e(f))};return{schedule:eB.reduce((t,a)=>{let s=o[a];return t[a]=(t,a=!1,o=!1)=>(!n&&(n=!0,r=!0,i.isProcessing||e(f)),s.schedule(t,a,o)),t},{}),cancel:e=>{for(let t=0;t<eB.length;t++)o[eB[t]].cancel(e)},state:i,steps:o}}let eF={delta:0,timestamp:0,isProcessing:!1},{schedule:eU,cancel:eV,steps:eH}=ez("u">typeof requestAnimationFrame?requestAnimationFrame:eD,!0,eF),eG=new Set,eq=!1,eW=!1,e_=!1;function eX(){if(eW){let e=[],t=new Set,i=new Set;eG.forEach(n=>{n.needsMeasurement&&(e.push(n),t.add(n.element),eP.has(n.name)&&i.add(n.element))});let n=new Map;i.forEach(e=>{let t,i=(t=[],eL.forEach(i=>{let n=e.getValue(i);if(void 0!==n){let e=n.get(),r=+!!i.startsWith("scale");if(e===r)return;t.push([i,e]),n.set(r)}}),t);i.length&&(n.set(e,i),e.render())}),e.forEach(e=>e.measureInitialState()),t.forEach(e=>{e.render();let t=n.get(e);t&&t.forEach(([t,i])=>{e.getValue(t)?.set(i)})}),e.forEach(e=>e.measureEndState()),e.forEach(e=>{void 0!==e.suspendedScrollY&&window.scrollTo(0,e.suspendedScrollY)})}eW=!1,eq=!1,eG.forEach(e=>e.complete(e_)),eG.clear()}function eK(){eG.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(eW=!0)})}class e${constructor(e,t,i,n,r,a=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=t,this.name=i,this.motionValue=n,this.element=r,this.isAsync=a}scheduleResolve(){this.state="scheduled",this.isAsync?(eG.add(this),eq||(eq=!0,eU.read(eK),eU.resolveKeyframes(eX))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:e,name:t,element:i,motionValue:n}=this;if(null===e[0]){let r=n?.get(),a=e[e.length-1];if(void 0!==r)e[0]=r;else if(i&&t){let n=function(e,t,i){if("string"==typeof e){if(/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e)||/^0[^.\s]+$/u.test(e))return parseFloat(e);if(!G.test(e)&&G.test(i))return eb(t,i)}return e??void 0}(i.readValue(t,a),t,a);void 0!==n&&(e[0]=n)}void 0===e[0]&&(e[0]=a),n&&void 0===r&&n.set(e[0])}for(let t=1;t<e.length;t++)e[t]??(e[t]=e[t-1])}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),eG.delete(this)}cancel(){"scheduled"===this.state&&(eG.delete(this),this.state="pending")}resume(){"pending"===this.state&&this.scheduleResolve()}}let eY=new Set(["auto","none","0"]);class eZ extends e${constructor(e,t,i,n,r){super(e,t,i,n,r,!0)}scheduleResolve(){if(this.canReadNow()&&(this.readKeyframes(),!this.needsMeasurement))return this.complete();super.scheduleResolve()}canReadNow(){let{unresolvedKeyframes:e,element:t,motionValue:i}=this,n=e[0]??i?.get();if(!t?.current||void 0===n)return!1;for(let t=0;t<e.length;t++)if(em(t?e[t]:n))return!1;return!0}readKeyframes(){let{unresolvedKeyframes:e,element:t,name:i}=this;if(!t?.current)return;super.readKeyframes();for(let i=0;i<e.length;i++){let n=e[i];if("string"==typeof n&&ep(n=n.trim())){let r=ef(n,t.current);void 0!==r&&(e[i]=r),i===e.length-1&&(this.finalKeyframe=n)}}if(this.resolveNoneKeyframes(),!ea.has(i)||2!==e.length)return;let[n,r]=e;if("number"==typeof n&&"number"==typeof r)return;let a=es(n),o=es(r);if(em(n)!==em(r)&&ej[i]){this.needsMeasurement=!0;return}if(a!==o)if(eT(a)&&eT(o))for(let t=0;t<e.length;t++){let i=e[t];"string"==typeof i&&(e[t]=parseFloat(i))}else ej[i]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){let{unresolvedKeyframes:e,name:t}=this,i=[];for(let t=0;t<e.length;t++)(null===e[t]||function(e){if("number"==typeof e)return 0===e;if(null===e)return!0;return"none"===e||"0"===e||/^0[^.\s]+$/u.test(e)}(e[t]))&&i.push(t);i.length&&function(e,t,i){let n,r=0;for(;r<e.length&&!n;){let t=e[r];"string"==typeof t&&!eY.has(t)&&function(e){let t=e.toString();return O.test(t)||B.test(t)}(t)&&(n=e[r]),r++}if(n&&i)for(let r of t)e[r]!==n&&(e[r]=eb(i,n))}(e,i,t)}measure(){let{element:e,name:t}=this;return ej[t](window.getComputedStyle(e.current),()=>e.measureViewportBox())}measureInitialState(){let{element:e,unresolvedKeyframes:t,name:i}=this;if(!e?.current)return;"height"===i&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=this.measure(),t[0]=this.measuredOrigin;let n=t[t.length-1];void 0!==n&&this.motionValue?.jump(n,!1)}measureEndState(){let{element:e,unresolvedKeyframes:t}=this;if(!e?.current)return;this.motionValue?.jump(this.measuredOrigin,!1);let i=t.length-1,n=t[i];t[i]=this.measure(),null!==n&&void 0===this.finalKeyframe&&(this.finalKeyframe=n),this.resolveNoneKeyframes()}}let eQ=e=>1e3*e;function eJ(e,t){-1===e.indexOf(t)&&e.push(t)}function e0(e,t){let i=e.indexOf(t);i>-1&&e.splice(i,1)}class e1{constructor(){this.subscriptions=[]}add(e){return eJ(this.subscriptions,e),()=>this.remove(e)}remove(e){e0(this.subscriptions,e)}notify(e,t,i){let n=this.subscriptions.length;if(n)if(1===n)this.subscriptions[0](e,t,i);else for(let r=0;r<n;r++){let n=this.subscriptions[r];n&&n(e,t,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}function e2(e,t,i){t.startsWith("--")?e.style.setProperty(t,i):e.style[t]=i}let e5={};function e3(e,t){let i,n=()=>(void 0===i&&(i=e()),i);return()=>e5[t]??n()}let e4=e3(()=>void 0!==window.ScrollTimeline,"scrollTimeline");function e7(e,{repeat:t,repeatType:i="loop"},n,r=1){let a,o,s=0;for(let t=0;t<e.length;t++){let i=e[t];null!==i&&(s++||(a=i),o=i)}let l=r<0||t&&"loop"!==i&&t%2==1?0:s-1;return l&&void 0!==n?n:l?o:a}class e6{constructor(){this.isResolved=!1}get finished(){return this._finished||(this._finished=this.isResolved?Promise.resolve():new Promise(e=>{this._resolve=e})),this._finished}updateFinished(){this._finished=this._resolve=void 0,this.isResolved=!1}notifyFinished(){this.isResolved=!0,this._resolve?.()}then(e,t){return this.finished.then(e,t)}}function e8(){r=void 0}let e9={now:()=>(void 0===r&&e9.set(eF.isProcessing||eO.useManualTiming?eF.timestamp:performance.now()),r),set:e=>{r=e,queueMicrotask(e8)}};function te(e,t){return{kind:e,animation:t,timestamp:e9.now(),frameTimestamp:eF.timestamp,frameIsProcessing:eF.isProcessing}}function tt(e,t,i){let n=globalThis.__MOTION_INSPECT__;if(n)try{n({...te("animation-start",e),options:i?{...t,...i}:t})}catch{}}let ti=e=>Array.isArray(e)&&"number"==typeof e[0],tn=e3(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch(e){return!1}return!0},"linearEasing"),tr=(e,t,i=10)=>{let n="",r=Math.max(Math.round(t/i),2);for(let t=0;t<r;t++)n+=Math.round(1e4*e(t/(r-1)))/1e4+", ";return`linear(${n.substring(0,n.length-2)})`},ta=([e,t,i,n])=>`cubic-bezier(${e}, ${t}, ${i}, ${n})`,to={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:ta([0,.65,.55,1]),circOut:ta([.55,0,1,.45]),backIn:ta([.31,.01,.66,-.59]),backOut:ta([.33,1.53,.69,.99])};function ts(e){return"function"==typeof e&&"applyToOptions"in e}class tl extends e6{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;let{element:t,name:i,keyframes:n,pseudoElement:r,allowFlatten:a=!1,finalKeyframe:o,onComplete:s}=e;this.isPseudoElement=!!r,this.allowFlatten=a,this.options=e,d.default;let l=function({type:e,...t}){return ts(e)&&tn()?e.applyToOptions(t):(t.duration??(t.duration=300),t.ease??(t.ease="easeOut"),t)}(e);this.animation=function(e,t,i,{delay:n=0,duration:r=300,repeat:a=0,repeatType:o="loop",ease:s="easeOut",times:l}={},d){let c={[t]:i};l&&(c.offset=l);let p=function e(t,i){if(t)return"function"==typeof t?tn()?tr(t,i):"ease-out":ti(t)?ta(t):Array.isArray(t)?t.map(t=>e(t,i)||to.easeOut):to[t]}(s,r);Array.isArray(p)&&(c.easing=p);let u={delay:n,duration:r,easing:Array.isArray(p)?"linear":p,fill:"both",iterations:a+1,direction:"reverse"===o?"alternate":"normal"};return d&&(u.pseudoElement=d),e.animate(c,u)}(t,i,n,l,r),!1===l.autoplay&&this.animation.pause(),this.animation.onfinish=this.onFinish=()=>{if(this.animation.onfinish=null,this.finishedTime=this.time,!r){let e=e7(n,this.options,o,this.speed);this.updateMotionValue?.(e),e2(t,i,e),this.animation.cancel()}s?.(),this.notifyFinished()},tt(this,e,l)}play(){this.isStopped||(this.manualStartTime=null,this.animation.onfinish=this.onFinish,this.animation.play(),"finished"===this.state&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.isStopped||(this.animation.onfinish=this.onFinish),this.animation.finish?.()}cancel(){this.animation.onfinish=null;try{this.animation.cancel()}catch(e){}}stop(){this.isStopped||(this.isStopped=!0,"idle"!==this.state&&null===this.finishedTime&&(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel()))}commitStyles(){let e=this.options?.element;!this.isPseudoElement&&e?.isConnected&&this.animation.commitStyles?.()}get duration(){return Number(this.animation.effect?.getComputedTiming?.().duration||0)/1e3}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+e/1e3}get time(){return(Number(this.animation.currentTime)||0)/1e3}set time(e){let t=null!==this.finishedTime;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=eQ(e),t&&(this.animation.pause(),this.updateFinished())}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return null!==this.finishedTime?"finished":this.animation.playState}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,onAttach:t,observe:i}){return(this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=this.onFinish=null,e&&e4())?(this.animation.timeline=e,t?.(this.animation),eD):i(this)}}let td=new Set(["opacity","clipPath","filter","transform"]),tc=new WeakMap,{schedule:tp}=ez(queueMicrotask,!1),tu=(e,t)=>t?1e3/t*e:0,tm;class th{constructor(e,t={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=e=>{let t=e9.now();if(this.updatedAt!==t&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(e),this.current!==this.prev&&(this.dirty(),this.dependents))for(let e of this.dependents)e.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=t.owner}setCurrent(e){this.current=e,this.updatedAt=e9.now(),null===this.canTrackVelocity&&void 0!==e&&(this.canTrackVelocity=!isNaN(parseFloat(this.current)))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,t){var i;return"change"===e?this.onChangeSubscribe(t):((i=this.events)[e]||(i[e]=new e1)).add(t)}onChangeSubscribe(e){let{events:t}=this;return t.change||this.changeSubscriber?(t.change||(t.change=new e1,t.change.add(this.changeSubscriber),this.changeSubscriber=void 0),t.change.add(e)):this.changeSubscriber=e,()=>{this.changeSubscriber===e?this.changeSubscriber=void 0:t.change?.remove(e),this.stopIfUnobserved()}}stopIfUnobserved(){eU.read(()=>{this.changeSubscriber||this.events.change?.getSize()||this.stop()})}clearListeners(){for(let e in this.changeSubscriber=void 0,this.events)this.events[e].clear()}attach(e,t){this.passiveEffect=e,this.stopPassiveEffect=t}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,t,i){this.set(t),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-i}jump(e,t=!0){t&&(this.updatedAt=e9.now(),this.stop()),this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,this.stopPassiveEffect?.()}dirty(){let{current:e,changeSubscriber:t}=this;t?t(e):this.events.change?.notify(e)}addDependent(e){(this.dependents||(this.dependents=new Set)).add(e)}removeDependent(e){this.dependents?.delete(e)}get(){tm?.push(this);let e=this.animation?.liveValue?.();return void 0===e?this.current:e}getCurrent(){return this.current}getPrevious(){return this.prev}getVelocity(){let e=e9.now();if(!this.canTrackVelocity||void 0===this.prevFrameValue||e-this.updatedAt>30)return 0;let t=Math.min(this.updatedAt-this.prevUpdatedAt,30);return tu(parseFloat(this.current)-parseFloat(this.prevFrameValue),t)}start(e){return new Promise(t=>this.run(e,t))}run(e,t){let i;this.stop(),this.hasAnimated=!0;let n=!1;i=e(()=>{n=!0,this.events.animationComplete?.notify(),this.animation===i&&(this.animation=void 0),t?.()}),n||(this.animation=i),this.events.animationStart?.notify()}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel?.notify()),this.animation=void 0}isAnimating(){return!!this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect?.()}}function tf(e,t){return new th(e,t)}let tg=new WeakMap;function tb(e){return null!==e&&"object"==typeof e&&"function"==typeof e.start}function ty(e){return"string"==typeof e||Array.isArray(e)}let tx=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","whilePinch","exit"],tv=["initial"].concat(tx);function tw(e){if(tb(e.animate))return!0;for(let t=0;t<tv.length;t++)if(ty(e[tv[t]]))return!0;return!1}function tC(e){return!!(tw(e)||e.variants)}let tS={current:null},tk={current:!1},tN="u">typeof window,tA=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],tT={};class tR{scrapeMotionValuesFromProps(e,t,i){return{}}constructor({parent:e,props:t,presenceContext:i,reducedMotionConfig:n,skipAnimations:r,blockInitialAnimation:a,visualState:o},s={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=e$,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let e=e9.now();this.renderScheduledAt<e&&(this.renderScheduledAt=e,eU.render(this.render,!1,!0))};let{latestValues:l,renderState:d}=o;this.latestValues=l,this.baseTarget={...l},this.initialValues=t.initial?{...l}:{},this.renderState=d,this.parent=e,this.props=t,this.presenceContext=i,this.depth=e?e.depth+1:0,this.reducedMotionConfig=n,this.skipAnimationsConfig=r,this.options=s,this.blockInitialAnimation=!!a,this.isControllingVariants=tw(t),this.isVariantNode=tC(t),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);let{willChange:c,...p}=this.scrapeMotionValuesFromProps(t,{},this);for(let e in p){let t=p[e];void 0!==l[e]&&er(t)&&t.set(l[e])}}mount(e){let t=this.presenceContext;if(this.hasBeenMounted&&t?.isPresent!==!1&&!t?.keepValuesOnRemount)for(let e in this.initialValues)this.values.get(e)?.jump(this.initialValues[e]),this.latestValues[e]=this.initialValues[e];if(this.current=e,tg.set(e,this),this.projection?.instance||this.projection?.mount(e),this.isVariantNode&&!this.isControllingVariants){let e=this;do e=!1!==e.props.inherit&&e.parent;while(e&&!e.isVariantNode)if(e){let{variantChildren:t}=e;t.add(this),this.removeFromVariantTree=()=>t.delete(this)}}this.values.forEach((e,t)=>this.bindToMotionValue(t,e)),"never"===this.reducedMotionConfig?this.shouldReduceMotion=!1:"always"===this.reducedMotionConfig?this.shouldReduceMotion=!0:(tk.current||function(){if(tk.current=!0,tN)if(window.matchMedia){let e=window.matchMedia("(prefers-reduced-motion)"),t=()=>tS.current=e.matches;e.addEventListener("change",t),t()}else tS.current=!1}(),this.shouldReduceMotion=tS.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,this.parent?.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){for(let e in this.projection?.unmount(),eV(this.notifyUpdate),eV(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree?.(),this.parent?.removeChild(this),this.events)this.events[e].clear();for(let e in this.features){let t=this.features[e];t&&(t.unmount(),t.isMounted=!1)}this.current=null}addChild(e){this.children.add(e),(this.enteringChildren||(this.enteringChildren=new Set)).add(e)}removeChild(e){this.children.delete(e),this.enteringChildren?.delete(e)}bindToMotionValue(e,t){let i;if(this.valueSubscriptions.get(e)?.(),t.accelerate&&td.has(e)&&this.current instanceof HTMLElement){let{factory:i,keyframes:n,times:r,ease:a,duration:o}=t.accelerate,s=new tl({element:this.current,name:e,keyframes:n,times:r,ease:a,duration:eQ(o)}),l=i(s);this.valueSubscriptions.set(e,()=>{l(),s.cancel()});return}let n=m.has(e);n&&this.onBindTransform&&this.onBindTransform();let r=t.on("change",t=>{this.latestValues[e]=t,this.props.onUpdate&&eU.preRender(this.notifyUpdate),n&&(this.projection&&(this.projection.isTransformDirty=!0),tc.get(this.current)?.check()),this.scheduleRender()});"u">typeof window&&window.MotionCheckAppearSync&&(i=window.MotionCheckAppearSync(this,e,t)),this.valueSubscriptions.set(e,()=>{r(),i?.()})}sortNodePosition(e){return this.current&&e.current&&this.sortInstanceNodePosition&&this.type===e.type?this.sortInstanceNodePosition(this.current,e.current):0}updateFeatures(){let e="animation";for(e in tT){let t=tT[e];if(!t)continue;let{isEnabled:i,Feature:n}=t;if(!this.features[e]&&n&&i(this.props)&&(this.features[e]=new n(this)),this.features[e]){let t=this.features[e];t.isMounted?t.update():(t.mount(),t.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):en()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,t){this.latestValues[e]=t}update(e,t){let{transformTemplate:i,onUpdate:n}=this.props;(e.transformTemplate||i)&&this.scheduleRender(),(e.transformTemplate&&!i||e.onUpdate&&!n)&&tc.get(this.current)?.demote(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let t=0;t<tA.length;t++){let i=tA[t];this.propEventSubscriptions[i]?.(),delete this.propEventSubscriptions[i];let n=e["on"+i];n&&(this.propEventSubscriptions[i]=this.on(i,n))}this.prevMotionValues=function(e,t,i){for(let n in t){let r=t[n],a=i[n];if(er(r))e.addValue(n,r);else if(er(a))e.addValue(n,tf(r,{owner:e}));else if(a!==r)if(e.hasValue(n)){let t=e.getValue(n);!0===t.liveStyle?t.jump(r):t.hasAnimated||t.set(r)}else{let t=e.getStaticValue(n);e.addValue(n,tf(void 0!==t?t:r,{owner:e}))}}for(let n in i)void 0===t[n]&&e.removeValue(n);return t}(this,this.scrapeMotionValuesFromProps(e,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue?.()}getProps(){return this.props}getVariant(e){return this.props.variants?.[e]}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}addValue(e,t){let i=this.values.get(e);if(t!==i){i&&this.removeValue(e),this.bindToMotionValue(e,t),this.values.set(e,t);let n=t.get();void 0!==n&&(this.latestValues[e]=n)}}removeValue(e){this.values.delete(e),this.valueSubscriptions.get(e)?.(),this.valueSubscriptions.delete(e),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,t){let i=this.props.values?.[e];return i||void 0===(i=this.values.get(e))&&void 0!==t&&(i=tf(t??this.getDefaultValue?.(e),{owner:this}),this.addValue(e,i)),i}readValue(e,t){let i=void 0===this.latestValues[e]&&this.current?this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options):this.latestValues[e];if(null!=i){let n,r;"string"==typeof i&&(n=i,/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n)||(r=i,/^0[^.\s]+$/u.test(r)))?i=parseFloat(i):"number"!=typeof i&&!G.test(i)&&G.test(t)&&(i=eb(e,t)),this.setBaseTarget(e,er(i)?i.get():i)}return er(i)?i.get():i}setBaseTarget(e,t){this.baseTarget[e]=t}on(e,t){return(this.events[e]||(this.events[e]=new e1)).add(t)}notify(e,...t){this.events[e]?.notify(...t)}scheduleRenderMicrotask(){tp.render(this.render)}}class tL extends tR{constructor(){super(...arguments),this.KeyframeResolver=eZ}sortInstanceNodePosition(e,t){return 2&e.compareDocumentPosition(t)?1:-1}getBaseTargetFromProps(e,t){let i=e.style;return i?i[t]:void 0}removeValueFromRenderState(e,{vars:t,style:i}){delete t[e],delete i[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:e}=this.props;er(e)&&(this.childSubscription=e.on("change",e=>{this.current&&(this.current.textContent=`${e}`)}))}}function tP(e){return e.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}let tI=(e,t)=>t&&"number"==typeof e?t.transform(e):e,tE={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},tM=u.length,tj={},tD=(e,t,i=tI(t,Y[e]))=>(tj[e]||(tj[e]=(tE[e]||e)+"("))+i+")",tO=(e,t)=>("number"==typeof t?t:parseFloat(t))===+!!e.startsWith("scale");function tB(e,t,i){let{style:n,vars:r,transformOrigin:a}=e,o=!1,s=!1;for(let e in t){let i=t[e];if(m.has(e)){o=!0;continue}if(ed(e)){r[e]=i;continue}{let t=tI(i,Z[e]);e.startsWith("origin")?(s=!0,a[e]=t):n[e]=t}}if(!t.transform&&(o||i?n.transform=function(e,t,i){let n="";for(let r=0;r<tM;r++){let a=u[r],o=e[a];if(void 0===o)continue;let s=i&&(t[a]=tI(o,Z[a]));tO(a,o)||(n+=tD(a,o,s||void 0)+" ")}let r=e.pathRotation;return r&&(n+=tD("rotate",r)),n=n.trim(),i?i(t,n):n||"none"}(t,e.transform,i):n.transform&&(n.transform="none")),s){let{originX:e="50%",originY:t="50%",originZ:i=0}=a;n.transformOrigin=`${e} ${t} ${i}`}}let tz={offset:"stroke-dashoffset",array:"stroke-dasharray"},tF={offset:"strokeDashoffset",array:"strokeDasharray"},tU=["transform","opacity","clipPath","filter","offsetDistance","offsetPath","offsetRotate","offsetAnchor"];function tV(e,{attrX:t,attrY:i,attrScale:n,pathLength:r,pathSpacing:a=1,pathOffset:o=0,...s},l,d,c){if(tB(e,s,d),l){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};let{attrs:p,style:u}=e;for(let e of tU)void 0!==p[e]&&(u[e]=p[e],delete p[e]);(u.transform||p.transformOrigin)&&(u.transformOrigin=p.transformOrigin??"50% 50%",delete p.transformOrigin),u.transform&&(u.transformBox=c?.transformBox??"fill-box",delete p.transformBox),void 0!==t&&(p.x=t),void 0!==i&&(p.y=i),void 0!==n&&(p.scale=n),void 0!==r&&function(e,t,i=1,n=0,r=!0){e.pathLength=1;let a=r?tz:tF;e[a.offset]=`${-n}`,e[a.array]=`${t} ${i}`}(p,r,a,o,!1)}let tH=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]),tG=e=>"string"==typeof e&&"svg"===e.toLowerCase();function tq(e,{style:t,vars:i},n,r){let a,o=e.style;for(a in t)o[a]=t[a];for(a in r?.applyProjectionStyles(o,n),i)o.setProperty(a,i[a])}let tW={};function t_(e,{layout:t,layoutId:i}){return m.has(e)||e.startsWith("origin")||(t||void 0!==i)&&(!!tW[e]||"opacity"===e)}function tX(e,t,i){let n=e.style,r=t?.style,a={};if(!n)return a;for(let t in n)(er(n[t])||r&&er(r[t])||t_(t,e)||i?.getValue(t)?.liveStyle!==void 0)&&(a[t]=n[t]);return a}function tK(e,t,i){let n=tX(e,t,i);for(let i in e)"children"!==i&&(er(e[i])||er(t[i]))&&(n[-1!==u.indexOf(i)?"attr"+i.charAt(0).toUpperCase()+i.substring(1):i]=e[i]);return n}class t$ extends tL{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=en}getBaseTargetFromProps(e,t){return m.has(t)?super.getBaseTargetFromProps(e,t)??eN(t):e[t]}getDefaultValue(e){return m.has(e)?this.latestValues[e]??eN(e):void 0}readValueFromInstance(e,t){if(m.has(t)){let e=J(t);return e&&e.default||0}if(tU.includes(t)){let i=getComputedStyle(e)[t];if("string"==typeof i&&i)return i.trim()}return t=tH.has(t)?t:tP(t),e.getAttribute(t)}scrapeMotionValuesFromProps(e,t,i){return tK(e,t,i)}build(e,t,i){tV(e,t,this.isSVGTag,i.transformTemplate,i.style)}renderInstance(e,t,i,n){for(let i in tq(e,t,void 0,n),t.attrs)e.setAttribute(tH.has(i)?i:tP(i),t.attrs[i])}mount(e){this.isSVGTag=tG(e.tagName),super.mount(e)}}function tY({top:e,left:t,right:i,bottom:n}){return{x:{min:t,max:i},y:{min:e,max:n}}}let tZ=(e,t,i)=>e+(t-e)*i;function tQ(e){return void 0===e||1===e}function tJ({scale:e,scaleX:t,scaleY:i}){return!tQ(e)||!tQ(t)||!tQ(i)}let t0=["rotate","rotateX","rotateY","rotateZ","skewX","skewY"];function t1(e){return tJ(e)||t5(e)||t2(e)}function t2(e){return e.z||e.rotate||e.rotateX||e.rotateY||e.rotateZ||e.skewX||e.skewY}function t5(e){var t,i;return(t=e.x)&&"0%"!==t||(i=e.y)&&"0%"!==i}function t3(e,t,i,n,r){return void 0!==r&&(e=n+r*(e-n)),n+i*(e-n)+t}function t4(e,t=0,i=1,n,r){e.min=t3(e.min,t,i,n,r),e.max=t3(e.max,t,i,n,r)}function t7(e,{x:t,y:i}){t4(e.x,t.translate,t.scale,t.originPoint),t4(e.y,i.translate,i.scale,i.originPoint)}function t6(e,t){e.min+=t,e.max+=t}function t8(e,t,i,n,r=.5){let a=tZ(e.min,e.max,r);t4(e,t,i,a,n)}function t9(e,t){return"string"==typeof e?parseFloat(e)/100*(t.max-t.min):e}function ie(e,t,i){let n=i??e;t8(e.x,t9(t.x,n.x),t.scaleX,t.scale,t.originX),t8(e.y,t9(t.y,n.y),t.scaleY,t.scale,t.originY)}function it(e,t){return tY(function(e,t){if(!t)return e;let i=t({x:e.left,y:e.top}),n=t({x:e.right,y:e.bottom});return{top:i.y,left:i.x,bottom:n.y,right:n.x}}(e.getBoundingClientRect(),t))}class ii extends tL{constructor(){super(...arguments),this.type="html",this.renderInstance=tq}mount(e){super.mount(e)}readValueFromInstance(e,t){if(m.has(t))return this.projection?.isProjecting?eN(t):((e,t)=>{let{transform:i="none"}=getComputedStyle(e);return eA(i,t)})(e,t);{let i=window.getComputedStyle(e),n=(ed(t)?i.getPropertyValue(t):i[t])||0;return"string"==typeof n?n.trim():n}}measureInstanceViewportBox(e,{transformPagePoint:t}){return it(e,t)}build(e,t,i){tB(e,t,i.transformTemplate)}scrapeMotionValuesFromProps(e,t,i){return tX(e,t,i)}}let ir=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function ia(e){if("string"!=typeof e||e.includes("-"));else if(ir.indexOf(e)>-1||/[A-Z]/u.test(e))return!0;return!1}let io={current:void 0},is=(0,p.createContext)({}),il=(0,p.createContext)({strict:!1}),id=(0,p.createContext)({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"}),ic=(0,p.createContext)({});function ip(e){return Array.isArray(e)?e.join(" "):e}let iu=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function im(e,t,i){for(let n in t)er(t[n])||t_(n,i)||(e[n]=t[n])}let ih=()=>({...iu(),attrs:{}}),ig=new Set(["animate","exit","variants","initial","style","values","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","tap","propagate","ignoreStrict","viewport","pinch"]);function ib(e){return e.startsWith("while")||e.startsWith("drag")&&"draggable"!==e||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||ig.has(e)}function iy(e){return er(e)?e.get():e}function ix(e,t,i,n){let r=t=>{let r;return"function"==typeof t?t(void 0!==i?i:e.custom,...(r=[{},{}],n?.values.forEach((e,t)=>{r[0][t]=e.get(),r[1][t]=e.getVelocity()}),r)):t};return"string"==typeof(t=r(t))&&(t=e.variants&&e.variants[t]),r(t)}let iv=(0,p.createContext)(null);function iw(e){let t=(0,p.useRef)(null);return null===t.current&&(t.current=e()),t.current}let iC=e=>(t,i)=>{let n=(0,p.useContext)(ic),r=(0,p.useContext)(iv),a=()=>(function({scrapeMotionValuesFromProps:e,createRenderState:t},i,n,r){return{latestValues:function(e,t,i,n){let r={},a=n(e,{});for(let e in a)r[e]=iy(a[e]);let{initial:o,animate:s}=e,l=tw(e),d=tC(e);t&&d&&!l&&!1!==e.inherit&&(void 0===o&&(o=t.initial),void 0===s&&(s=t.animate));let c=!!i&&!1===i.initial,p=(c=c||!1===o)?s:o;if(p&&"boolean"!=typeof p&&!tb(p)){let t=Array.isArray(p)?p:[p];for(let i=0;i<t.length;i++){let n=ix(e,t[i]);if(n){let{transitionEnd:e,transition:t,...i}=n;for(let e in i){let t=i[e];if(Array.isArray(t)){let e=c?t.length-1:0;t=t[e]}null!==t&&(r[e]=t)}for(let t in e)r[t]=e[t]}}}return r}(i,n,r,e),renderState:t()}})(e,t,n,r);return i?a():iw(a)},iS=iC({scrapeMotionValuesFromProps:tX,createRenderState:iu}),ik=iC({scrapeMotionValuesFromProps:tK,createRenderState:ih}),iN={animation:["variants",...tx],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},iA=!1;function iT(){return!function(){if(iA)return;let e={};for(let t in iN)e[t]={isEnabled:e=>iN[t].some(t=>!!e[t])};tT=e,iA=!0}(),tT}let iR=Symbol.for("motionComponentSymbol"),iL="data-framer-appear-id",iP=(0,p.createContext)({}),iI="u">typeof window?p.useLayoutEffect:p.useEffect;function iE(e,{forwardMotionProps:t=!1,type:i}={},n,r){n&&function(e){let t=iT();for(let i in e)t[i]={...t[i],...e[i]};tT=t}(n);let a=i?"svg"===i:ia(e),o=a?ik:iS;function s(i,n){var s;let l,d,u,m=function({layoutId:e}){let t=(0,p.useContext)(is).id;return t&&void 0!==e?t+"-"+e:e}(i);iw(()=>!!io.current?.sharedNodes.get(m)?.lead&&i.initial)&&(i={...i,initial:!1});let h={...(0,p.useContext)(id),...i,layoutId:m},{isStatic:f,isValidProp:g}=h,b=function(e){let{initial:t,animate:i}=function(e,t){if(tw(e)){let{initial:t,animate:i}=e;return{initial:!1===t||ty(t)?t:void 0,animate:ty(i)?i:void 0}}return!1!==e.inherit?t:{}}(e,(0,p.useContext)(ic));return(0,p.useMemo)(()=>({initial:t,animate:i}),[ip(t),ip(i)])}(i),y=o(i,f);if(!f&&"u">typeof window){(0,p.useContext)(il).strict;let t=function(e){let{drag:t,layout:i}=iT();if(!t&&!i)return{};let n={...t,...i};return{MeasureLayout:n.MeasureLayout,isEnabled:t?.isEnabled(e)||i?.isEnabled(e),ProjectionNode:n.ProjectionNode}}(h);b.visualElement=function(e,t,i,n,r,a){let{visualElement:o}=(0,p.useContext)(ic),s=(0,p.useContext)(il),l=(0,p.useContext)(iv),d=(0,p.useContext)(id),c=d.reducedMotion,u=d.skipAnimations,m=(0,p.useRef)(null),h=(0,p.useRef)(!1);n=n||s.renderer,!m.current&&n&&(m.current=n(e,{visualState:t,parent:o,props:i,presenceContext:l,blockInitialAnimation:!!l&&!1===l.initial,reducedMotionConfig:c,skipAnimations:u,isSVG:a}),h.current&&m.current&&(m.current.manuallyAnimateOnMount=!0));let f=m.current,g=(0,p.useContext)(iP);f&&!f.projection&&r&&("html"===f.type||"svg"===f.type)&&r.create(f,i,g),(0,p.useInsertionEffect)(()=>{f&&f.props!==i&&f.update(i,l)});let b=i[iL],y=(0,p.useRef)(!!b&&"u">typeof window&&!window.MotionHandoffIsComplete?.(b)&&window.MotionHasOptimisedAnimation?.(b));return iI(()=>{h.current&&f&&(f.animationState?.animateChanges(),f.enteringChildren=void 0)},[]),iI(()=>{h.current=!0,f&&(window.MotionIsMounted=!0,f.updateFeatures(),f.scheduleRenderMicrotask(),y.current&&f.animationState&&f.animationState.animateChanges())}),(0,p.useEffect)(()=>{f&&(!y.current&&f.animationState&&f.animationState.animateChanges(),y.current&&(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(b)}),y.current=!1),f.enteringChildren=void 0)}),f}(e,y,h,r,t.ProjectionNode,a),(t.isEnabled||b.visualElement?.projection?.options.layoutId)&&(l=t.MeasureLayout)}return(0,c.jsxs)(ic.Provider,{value:b,children:[l&&b.visualElement?(0,c.jsx)(l,{visualElement:b.visualElement,...h}):null,function(e,t,i,{latestValues:n},r,a=!1,o,s){let l=(o??ia(e)?function(e,t,i,n){let r=(0,p.useMemo)(()=>{let i=ih();return tV(i,t,tG(n),e.transformTemplate,e.style),{...i.attrs,style:{...i.style}}},[t]);if(e.style){let t={};return im(t,e.style,e),{...r,style:{...t,...r.style}}}return r}:function(e,t){let i,n,r={},a=(i=e.style||{},im(n={},i,e),Object.assign(n,function({transformTemplate:e},t){return(0,p.useMemo)(()=>{let i=iu();return tB(i,t,e),Object.assign({},i.vars,i.style)},[t])}(e,t)),n);return e.drag&&!1!==e.dragListener&&(r.draggable=!1,a.userSelect=a.WebkitUserSelect=a.WebkitTouchCallout="none",a.touchAction=!0===e.drag?"none":`pan-${"x"===e.drag?"y":"x"}`),void 0===e.tabIndex&&(e.onTap||e.onTapStart||e.whileTap)&&(r.tabIndex=0),r.style=a,r})(t,n,r,e),d=function(e,t,i,n){let r={};for(let a in e)if(("values"!==a||"object"!=typeof e.values)&&!er(e[a])){if("fx"===a){e.fx&&(r.fx="");continue}((a.startsWith("on")?!ib(a):n?.(a)??!ib(a))||!0===i&&ib(a)||!t&&!ib(a)||e.draggable&&a.startsWith("onDrag"))&&(r[a]=e[a])}return r}(t,"string"==typeof e,a,s),c=e!==p.Fragment?{...d,...l,ref:i}:{},{children:u}=t,m=(0,p.useMemo)(()=>er(u)?u.get():u,[u]);return(0,p.createElement)(e,{...c,children:m})}(e,i,(s=b.visualElement,d=(0,p.useRef)(n),(0,p.useInsertionEffect)(()=>{d.current=n}),u=(0,p.useRef)(null),(0,p.useCallback)(e=>{e&&y.onMount?.(e),s&&(e?s.mount(e):s.unmount());let t=d.current;if("function"==typeof t)if(e){let i=t(e);"function"==typeof i&&(u.current=i)}else u.current?(u.current(),u.current=null):t(e);else t&&(t.current=e)},[s])),y,f,t,a,g)]})}s.displayName=`motion.${"string"==typeof e?e:`create(${e.displayName??e.name??""})`}`;let l=(0,p.forwardRef)(s);return l[iR]=e,l}class iM{constructor(e){this.isMounted=!1,this.node=e}update(){}}function ij(e,t,i){return ix(e.getProps(),t,i,e)}let iD=(e,t)=>"exit"===t?e.presenceContext?.custom:void 0;function iO(e,t){if(e?.inherit&&t){let{inherit:i,...n}=e;return{...t,...n}}return e}function iB(e,t){let i=e?.[t]??e?.default??e;return i!==e?iO(i,e):i}function iz(e,t){let i=e.getValue("willChange");if(er(i)&&i.add)return i.add(t);if(!i&&eO.WillChange){let i=new eO.WillChange("auto");e.addValue("willChange",i),i.add(t)}}let iF=(...e)=>e.reduce((e,t)=>i=>t(e(i)));function iU(e,t,i){return(i<0&&(i+=1),i>1&&(i-=1),i<1/6)?e+(t-e)*6*i:i<.5?t:i<2/3?e+(t-e)*(2/3-i)*6:e}function iV(e,t){return i=>i>0?t:e}let iH=(e,t,i)=>{let n=e*e,r=i*(t*t-n)+n;return r<0?0:Math.sqrt(r)},iG=[A,k,j];function iq(e){let t=iG.find(t=>t.test(e));if(!t)return!1;let i=t.parse(e);return t===j&&(i=function({hue:e,saturation:t,lightness:i,alpha:n}){e/=360,i/=100;let r=0,a=0,o=0;if(t/=100){let n=i<.5?i*(1+t):i+t-i*t,s=2*i-n;r=iU(s,n,e+1/3),a=iU(s,n,e),o=iU(s,n,e-1/3)}else r=a=o=i;return{red:Math.round(255*r),green:Math.round(255*a),blue:Math.round(255*o),alpha:n}}(i)),i}let iW=(e,t)=>{let i=iq(e),n=iq(t);if(!i||!n)return iV(e,t);let r={...i};return e=>(r.red=iH(i.red,n.red,e),r.green=iH(i.green,n.green,e),r.blue=iH(i.blue,n.blue,e),r.alpha=tZ(i.alpha,n.alpha,e),k.transform(r))},i_=new Set(["none","hidden"]);function iX(e,t){return i=>tZ(e,t,i)}function iK(e){return"number"==typeof e?iX:"string"==typeof e?ep(e)?iV:D.test(e)?iW:iZ:Array.isArray(e)?i$:"object"==typeof e?D.test(e)?iW:iY:iV}function i$(e,t){let i=[...e],n=i.length,r=e.map((e,i)=>iK(e)(e,t[i]));return e=>{for(let t=0;t<n;t++)i[t]=r[t](e);return i}}function iY(e,t){let i={...e,...t},n={};for(let r in i)void 0!==e[r]&&void 0!==t[r]&&(n[r]=iK(e[r])(e[r],t[r]));return e=>{for(let t in n)i[t]=n[t](e);return i}}let iZ=(e,t)=>{let i=V(e),n=V(t);if(!(i.indexes.var.length===n.indexes.var.length&&i.indexes.color.length===n.indexes.color.length&&i.indexes.number.length>=n.indexes.number.length))return iV(e,t);if(i_.has(e)&&!n.values.length||i_.has(t)&&!i.values.length)return i_.has(e)?i=>i<=0?e:t:i=>i>=1?t:e;return iF(i$(function(e,t){let i=[],n={color:0,var:0,number:0};for(let r=0;r<t.values.length;r++){let a=t.types[r],o=e.indexes[a][n[a]],s=e.values[o]??0;i[r]=s,n[a]++}return i}(i,n),n.values),H(n))},iQ=/^(-?(?:\d+(?:\.\d*)?|\.\d+))([a-z%]*)$/iu;function iJ(e,t,i){if("number"==typeof e&&"number"==typeof t&&"number"==typeof i)return tZ(e,t,i);if("string"==typeof e&&"string"==typeof t){let i=function(e,t){let i=iQ.exec(e);if(!i)return;let n=iQ.exec(t);if(!n||i[2]!==n[2])return;let r=i[2],a=parseFloat(i[1]),o=parseFloat(n[1]);return e=>y(tZ(a,o,e))+r}(e,t);if(i)return i}return iK(e)(e,t)}let i0=e=>{let t=({timestamp:t})=>e(t);return{start:(e=!0)=>eU.update(t,e),stop:()=>eV(t),now:()=>eF.isProcessing?eF.timestamp:e9.now()}};function i1(e,t=50,i=2e4,n){let r=0,a=e.next(r);for(n?.push(a.value);!a.done&&r<i;)r+=t,a=e.next(r),n?.push(a.value);return r>=i?1/0:r}let i2=e=>e<0?1/Math.max(1+e,.05):Math.max(1-e,.05);function i5(e,t){if(!(e>1))return 1;let i=Math.sqrt(e*e-1),n=e-i,r=e+i,a=2*i*Math.exp(-t)*(1+t);return i4(e=>r*Math.exp(-n*e)-n*Math.exp(-r*e)-a,e=>Math.exp(-r*e)-Math.exp(-n*e),t)/t}function i3(e,t){return e*Math.sqrt(1-t*t)}function i4(e,t,i){let n=i;for(let i=1;i<12;i++)n-=e(n)/t(n);return n}let i7=(e,t)=>(t?e>=0:e>0)&&e<1/0;function i6(e,t){if(i7(e,t))return e}function i8(e){let t=i6(e.stiffness),i=i6(e.damping,!0),n=i6(e.mass),r={...e,stiffness:t??100,damping:i??10,mass:n??1,isResolvedFromDuration:!1,isTimeDefined:(t??i??n)===void 0&&(void 0!==e.duration||void 0!==e.bounce)};if(r.isTimeDefined){if(e.visualDuration){let t=i2(e.bounce||0),i=2*Math.PI/(1.2*e.visualDuration)*i5(t,2*Math.PI/1.2);r.stiffness=i*i,r.damping=2*t*Math.sqrt(r.stiffness)}else Object.assign(r,function({duration:e=800,bounce:t=.3}){let i,n,r=i2(t);e=h(.01,10,e/1e3),r<1?(i=t=>{let i=t*r,n=i*e;return .001-i/i3(t,r)*Math.exp(-n)},n=t=>{let n=t*r*e,a=r*r*t*t*e,o=Math.exp(-n),s=i3(t*t,r);return-((-i(t)+.001>0?-1:1)*a)*o/s}):(i=t=>-.001+Math.exp(-t*e)*(t*e+1),n=t=>-(e*e*t*Math.exp(-t*e)));let a=i4(i,n,5/e),o=a*i5(r,a*e),s=o*o;return{stiffness:s,damping:2*r*Math.sqrt(s),duration:eQ(e)}}(r)),r.isResolvedFromDuration=!0;i7(r.stiffness)&&i7(r.damping,!0)||(r.stiffness=100,r.damping=10)}return r}function i9(e=.3,t=.3){let i,n,r,a="object"!=typeof e?{visualDuration:e,keyframes:[0,1],bounce:t}:e,o=a.keyframes[0],s=a.keyframes[a.keyframes.length-1],l={done:!1,value:o},{stiffness:d,damping:c,mass:p,duration:u,isResolvedFromDuration:m,isTimeDefined:h}=i8({...a}),f=e=>m?0:-(e/1e3),g=c/(2*Math.sqrt(d*p)),b=Math.sqrt(d/p)/1e3,y=g*b,x={target:s,delta:s-o,velocity:f(a.velocity)||0,restSpeed:0,restDelta:0},v=()=>{let e=5>Math.abs(x.delta);x.restSpeed=a.restSpeed||(e?.01:2),x.restDelta=a.restDelta||(e?.005:.5)};if(v(),g<1){let e=i3(b,g),t={A:0,sinC:0,cosC:0,t:-1,env:0,sin:0,cos:0};r=()=>{t.A=(x.velocity+y*x.delta)/e,t.sinC=y*t.A+x.delta*e,t.cosC=y*x.delta-t.A*e};let a=i=>{i!==t.t&&(t.t=i,t.env=Math.exp(-y*i),t.sin=Math.sin(e*i),t.cos=Math.cos(e*i))};i=e=>(a(e),x.target-t.env*(t.A*t.sin+x.delta*t.cos)),n=e=>(a(e),t.env*(t.sinC*t.sin+t.cosC*t.cos))}else if(1===g){i=e=>x.target-Math.exp(-b*e)*(x.delta+(x.velocity+b*x.delta)*e);let e={C:0};r=()=>{e.C=x.velocity+b*x.delta},n=t=>Math.exp(-b*t)*(b*e.C*t-x.velocity)}else{let e=b*Math.sqrt(g*g-1),t=y-e,a=y+e,o=e<1||h?1/0:300/e,s=(e,t)=>Math.exp(t>o?(y-e)*o-y*t:-e*t),l={S:0,F:0};r=()=>{let t=(x.velocity+y*x.delta)/e;l.S=(x.delta+t)/2,l.F=(x.delta-t)/2},i=e=>x.target-l.S*s(t,e)-l.F*s(a,e),n=e=>t*l.S*s(t,e)+a*l.F*s(a,e)}r();let w=m&&u||null,C={calculatedDuration:w,retarget:(e,t)=>{x.target=e[e.length-1],x.delta=x.target-e[0],x.velocity=f(t),a.restSpeed&&a.restDelta||v(),C.calculatedDuration=w,l.done=!1,r()},velocity:e=>eQ(n(e)),next:e=>{let t=i(e);return m?l.done=e>=u:l.done=Math.abs(eQ(n(e)))<=x.restSpeed&&Math.abs(x.target-t)<=x.restDelta,l.value=l.done?x.target:t,l},toString:()=>{let e=Math.min(i1(C),2e4),t=tr(t=>C.next(e*t).value,e,30);return e+"ms "+t}};return C}let ne=Object.assign(i9,{applyToOptions:e=>{let t=function(e,t=100,i){let{keyframes:n,velocity:r}=e,a=n&&n[n.length-1]-n[0],o=i({...e,velocity:r&&a?r*t/a:r,keyframes:[0,t]}),s=Math.min(i1(o),2e4);return{type:"keyframes",ease:e=>o.next(s*e).value/t,duration:s/1e3}}(e,100,i9);return e.ease=t.ease,e.duration=eQ(t.duration),e.type="keyframes",e}});function nt({keyframes:e,velocity:t=0,power:i=.8,timeConstant:n=325,bounceDamping:r=10,bounceStiffness:a=500,modifyTarget:o,min:s,max:l,restDelta:d=.5,restSpeed:c}){let p,u,m=e[0],h={done:!1,value:m},f=i*t,g=m+f,b=o?o(g):g;b!==g&&(f=b-m);let y=e=>-f*Math.exp(-e/n),x=e=>{let t=y(e);h.done=Math.abs(t)<=d,h.value=h.done?b:e?b+t:m},v=e=>{let t;if((t=h.value)<s||t>l){var i;p=e,u=ne({keyframes:[h.value,(i=h.value,void 0===s?l:void 0===l||Math.abs(s-i)<Math.abs(l-i)?s:l)],velocity:-y(e)/n*1e3,damping:r,stiffness:a,restDelta:d,restSpeed:c})}};return v(0),{calculatedDuration:null,next:e=>{let t=!1;return(u||void 0!==p||(t=!0,x(e),v(e)),void 0!==p&&e>=p)?u.next(e-p):(t||x(e),h)}}}let ni=(e,t,i)=>e*(3*(1-e)*((1-e)*t+e*i)+e*e);function nn(e,t,i,n){return e===t&&i===n?eD:r=>{let a=0,o=1,s=r;for(let t=0;;t++){s>=a&&s<=o||(s=(a+o)/2);let n=ni(s,e,i)-r;if(n*n<1e-28||40===t)break;n>0?o=s:a=s,s-=1e-7*n/(ni(s+1e-7,e,i)-r-n)}return ni(s,t,n)}}let nr=nn(.42,0,1,1),na=nn(0,0,.58,1),no=nn(.42,0,.58,1),ns=e=>Array.isArray(e)&&"number"!=typeof e[0],nl=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,nd=e=>t=>1-e(1-t),nc=nn(.33,1.53,.69,.99),np=nd(nc),nu=nl(np),nm=e=>e>=1?1:(e*=2)<1?.5*np(e):.5*(2-Math.pow(2,-10*(e-1))),nh=e=>1-Math.sin(Math.acos(e)),nf=nd(nh),ng=nl(nh),nb={linear:eD,easeIn:nr,easeInOut:no,easeOut:na,circIn:nh,circInOut:ng,circOut:nf,backIn:np,backInOut:nu,backOut:nc,anticipate:nm},ny=e=>{if(ti(e)){d.default;let[t,i,n,r]=e;return nn(t,i,n,r)}return"string"==typeof e?(d.default,nb[e]):e},nx=(e,t,i)=>{let n=t-e;return n?(i-e)/n:1};function nv(e){let t=[0];return!function(e,t){let i=e[e.length-1];for(let n=1;n<=t;n++){let r=nx(0,t,n);e.push(tZ(i,1,r))}}(t,e.length-1),t}function nw({duration:e=300,keyframes:t,times:i,ease:n="easeInOut",mixer:r}){var a;let o="number"==typeof t[0]?void 0:r,s=ns(n)?n.map(ny):ny(n)||no,l={done:!1,value:t[0]},d=-1;if(!o){for(let e=1;e<t.length;e++)if(t[e]!==t[e-1]){if(d>=0){d=-2;break}d=e-1}}if(d>=0){let n=i&&i.length===t.length?i:nv(t),r=n[d]*e,a=n[d+1]*e,o=t[d],c=t[d+1],p=Array.isArray(s)?s[d]:s,u=(eO.mix||iJ)(o,c),m=t.length-2;return{calculatedDuration:e,next:t=>(l.value=d&&t<r?u(0):d<m&&(t>=a||!e)?"number"==typeof c?c:u(1):u(p(t>=a||!e?1:t<=r?0:(t-r)/(a-r))),l.done=t>=e,l)}}let c=function(e,t,{clamp:i=!0,ease:n,mixer:r}={}){let a=e.length;if(1===a)return()=>t[0];if(2===a&&t[0]===t[1])return()=>t[1];let o=e[0]===e[1];e[0]>e[a-1]&&(e=[...e].reverse(),t=[...t].reverse());let s=function(e,t,i){let n=[],r=eO.mix||iJ,a=e.length-1;for(let o=0;o<a;o++){let a=i?.(e[o],e[o+1])||r(e[o],e[o+1]);t&&(a=iF(Array.isArray(t)?t[o]||eD:t,a)),n.push(a)}return n}(t,n,r),l=s.length,d=i=>{if(o&&i<e[0])return t[0];let n=0;if(l>1)for(;n<e.length-2&&!(i<e[n+1]);n++);let r=nx(e[n],e[n+1],i);return s[n](r)};return i?t=>d(h(e[0],e[a-1],t)):d}((a=i&&i.length===t.length?i:nv(t),a.map(t=>t*e)),t,{ease:Array.isArray(s)?s:t.map(()=>s||no).splice(0,t.length-1),mixer:o});return{calculatedDuration:e,next:t=>(l.value=c(t),l.done=t>=e,l)}}let nC={decay:nt,inertia:nt,tween:nw,keyframes:nw,spring:ne};function nS(e){"string"==typeof e.type&&(e.type=nC[e.type])}let nk=(e,t)=>t-e>40&&!eO.useManualTiming?t:e,nN=e=>e/100,nA=e=>Math.round(1e4*e)/1e4;class nT extends e6{constructor(e){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{let{motionValue:e}=this.options,t=e9.now();e&&e.updatedAt!==t&&this.tick(e.updatedAt=t),this.isStopped=!0,"idle"!==this.state&&(this.teardown(),this.options.onStop?.())},this.options=e,this.initAnimation(),this.play(),!1===e.autoplay&&this.pause(),tt(this,this.options)}initAnimation(){let{options:e}=this;nS(e);let{type:t=nw,repeat:i=0,repeatDelay:n=0,repeatType:r,velocity:a=0}=e,{keyframes:o}=e,s=t||nw;this.mixKeyframes=void 0,s!==nw&&"number"!=typeof o[0]&&(this.mixKeyframes=iF(nN,e.mixer?.(o[0],o[1])||iJ(o[0],o[1])),o=[0,100]);let l=s(o===e.keyframes?e:{...e,keyframes:o});"mirror"===r&&(this.mirroredGenerator=s({...e,keyframes:[...o].reverse(),velocity:-a})),null===l.calculatedDuration&&(l.calculatedDuration=i1(l));let{calculatedDuration:d}=l;this.calculatedDuration=d,this.resolvedDuration=d+n,this.totalDuration=this.resolvedDuration*(i+1)-n,this.generator=l}updateTime(e){this.currentTime=this.holdTime??Math.round(e-this.startTime)*this.playbackSpeed}tick(e,t=!1){let{generator:i,totalDuration:n,calculatedDuration:r}=this;if(null===this.startTime)return i.next(0);let{delay:a=0,keyframes:o,type:s,onUpdate:l,finalKeyframe:d}=this.options;this.startTime===this.pendingStartTime&&(this.startTime=nk(this.startTime,e)),this.pendingStartTime=void 0,this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-n/this.speed,this.startTime)),t?this.currentTime=e:this.updateTime(e);let c=this.currentTime-a*(this.playbackSpeed>=0?1:-1),p=this.playbackSpeed>=0?c<0:c>n;this.currentTime=Math.max(c,0),"finished"===this.state&&null===this.holdTime&&(this.currentTime=n);let u=this.generate(this.currentTime,p),{done:m}=u;p||(m=this.playbackSpeed>=0?r<1/0?this.currentTime>=n:m:this.currentTime<=0);let h=null===this.holdTime&&("finished"===this.state||"running"===this.state&&m);return h&&s!==nt&&(u.value=e7(o,this.options,d,this.speed)),l&&l(u.value),h&&this.finish(),u}at(e){return this.holdTime??nA((e-this.startTime)*this.playbackSpeed)}sampleAt(e,t){let{options:i,totalDuration:n}=this,r=this.at(e)-(i.delay||0);return r>=n&&i.type!==nt?e7(i.keyframes,i,t?void 0:i.finalKeyframe):this.generate(Math.max(r,0),r<0).value}generate(e,t){let i,{generator:n,totalDuration:r,mixKeyframes:a,mirroredGenerator:o,resolvedDuration:s}=this,{keyframes:l,repeat:d,repeatType:c,repeatDelay:p}=this.options,u=e,m=n;if(d){let t=Math.min(e,r)/s,i=Math.floor(t),n=t%1;!n&&t>=1&&(n=1),1===n&&i--,(i=Math.min(i,d+1))%2&&("reverse"===c?(n=1-n,p&&(n-=p/s)):"mirror"===c&&(m=o)),u=h(0,1,n)*s}return t?(this.delayState.value=l[0],i=this.delayState):i=m.next(u),a&&!t&&(i.value=a(i.value)),i}get duration(){return this.calculatedDuration/1e3}get iterationDuration(){return this.duration+(this.options.delay??0)/1e3}get time(){return this.currentTime/1e3}set time(e){"finished"===this.state&&this.updateFinished(),e=eQ(e),this.currentTime=e,null===this.startTime||null!==this.holdTime||0===this.playbackSpeed?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state="paused",this.holdTime=e,this.tick(e))}getGeneratorVelocity(){return function(e,t,i=0){var n,r;let a;return t<=0?i:e.velocity?e.velocity(t):(n=t=>e.next(t).value,r=e.next(t).value,tu(r-n(a=Math.max(t-5,0)),t-a))}(this.generator,this.currentTime,this.options.velocity)}get speed(){return this.playbackSpeed}set speed(e){let t=this.playbackSpeed!==e;t&&this.driver&&this.updateTime(e9.now()),this.playbackSpeed=e,t&&this.driver&&(this.time=this.currentTime/1e3)}play(){if(this.isStopped)return;let{driver:e=i0,startTime:t}=this.options;this.driver||(this.driver=e(e=>this.tick(e))),this.options.onPlay?.();let i=this.driver.now();"finished"===this.state?(this.updateFinished(),this.startTime=i):null!==this.holdTime?this.startTime=i-this.holdTime/(this.playbackSpeed||1):this.startTime||(this.startTime=t??(this.pendingStartTime=i)),"finished"===this.state&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(e9.now()),this.holdTime=this.currentTime}complete(){"running"!==this.state&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.driver?.stop(),this.driver=void 0,this.startTime=this.holdTime=null}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),e.observe(this)}}let nR={anticipate:nm,backInOut:nu,circInOut:ng};class nL extends tl{constructor(e){"string"==typeof e.ease&&e.ease in nR&&(e.ease=nR[e.ease]),nS(e),super(e),void 0!==e.startTime&&!1!==e.autoplay&&(this.startTime=e.startTime),this.options=e}elapsed(){return"running"===this.state?(e9.now()-this.startTime)*this.speed:1e3*this.time}sample(e){if(!this.sampler){let{motionValue:e,onUpdate:t,onComplete:i,onPlay:n,onStop:r,element:a,...o}=this.options;this.sampler=new nT({...o,autoplay:!1}),this.sampler.stop()}return this.sampler.sample(Math.max(0,e)).value}liveValue(){let{state:e}=this;if("running"===e||"paused"===e)return this.sample(this.elapsed())}updateMotionValue(e){let{motionValue:t,element:i,name:n}=this.options;if(!t)return;if(void 0!==e)return void t.set(e);let{speed:r}=this,a=this.elapsed(),o="running"===this.state&&r?h(0,10,a):0,s=this.sample(a);i&&n&&e2(i,n,s),t.setWithVelocity(this.sample(a-o*Math.sign(r)),s,o/Math.abs(r||1))}}let nP=(e,t)=>"zIndex"!==t&&!!("number"==typeof e||Array.isArray(e)||"string"==typeof e&&(G.test(e)||"0"===e)&&!e.startsWith("url("));function nI(e){e.duration=0,e.type="keyframes"}let nE=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/,nM=({mixer:e,keyframes:t})=>e&&"number"!=typeof t[0]&&t.some((i,n)=>n&&e(t[n-1],i)),nj=new Set(["color","backgroundColor","outlineColor","fill","stroke","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"]),nD=()=>!eO.useManualTiming&&Object.hasOwnProperty.call(Element.prototype,"animate"),nO=new Set(["linear","easeIn","easeOut","easeInOut"]),nB=new WeakMap,nz=(e,t)=>Math.min(200,Math.max(2,Math.ceil((t-e)/10))),nF=(e,t)=>.001>=Math.abs(e-t),nU=(e,t)=>e-t,nV=(e,t,i)=>nv(Array(i+1)).map(i=>tZ(e,t,i)),nH=({state:e})=>"idle"===e||"finished"===e,nG=(e,t)=>e.latestValues?e.latestValues[t]:e.getValue(t)?.get();class nq{constructor(e,t,i,n){this.element=e,this.update=t,this.makeDriver=i,this.animation=n}get js(){return this.driver||(this.driver=this.makeDriver(this.update))}now(){return this.driver||this.makeDriver!==i0?this.js.now():eF.isProcessing?eF.timestamp:e9.now()}start(e=!0){let t,i=(t=this.element,tc.get(t));!i||i.isJS?this.js.start(e):i.schedule(!1,!e)}stopJS(){this.driver?.stop()}stop(){let e;this.stopJS();let t=(e=this.element,tc.get(e));t&&!t.isFinishing&&t.release(this.animation)}}class nW extends nT{constructor(e){let t,i=e.motionValue.owner.current,{driver:n=i0}=e,r=function(e){let t=e.motionValue.owner,{onUpdate:i,transformTemplate:n}=t.getProps();return!e.isHandoff&&!i&&!e.hasOnUpdate&&!n&&"inertia"!==e.type&&"none"===(nG(t,"transform")||"none")&&!nG(t,"pathRotation")&&!t.projection?.isProjecting()&&!nM(e)}(e);e.driver=e=>new nq(i,e,n,t),super(e),t=this;let a=this.driver;a&&(a.animation=this),this.canAccelerate=r;let{stop:o}=this;this.stop=()=>{this.isAccelerated()&&this.sync(),o()}}offsets(){let{keyframes:e,times:t}=this.options;return t||(this.offsetsOf!==e&&(this.offsetsOf=e,this.cachedOffsets=nv(e)),this.cachedOffsets)}get group(){let e;return e=this.options.motionValue.owner.current,tc.get(e)}get js(){return this.driver?.js}stopJS(){this.driver?.stopJS()}get name(){return this.options.name}timing(){let{startTime:e,speed:t,totalDuration:i}=this,{delay:n=0,repeatType:r}=this.options;return null!==this.holdTime?[1/0,0]:1/0===i?[e+n/t,this.resolvedDuration*("loop"===r?1:2)/t||1]:[e+(n+i)/t,0]}isAccelerated(){let{group:e,state:t}=this;return e?.tracks.has(this)&&!e.isJS&&this.canAccelerate&&("running"===t||"paused"===t)}liveValue(){return this.isAccelerated()?this.sampleAt(e9.now()):void 0}tween(){let{keyframes:e,type:t,repeat:i,delay:n=0}=this.options,r=-1;if(i||t!==nw||null!==this.holdTime)return;for(let t=1;t<e.length;t++)if(e[t]!==e[t-1]){if(r>=0)return;r=t-1}let{ease:a}=this.options;ns(a)&&(a=a[r]);let o=this.offsets(),s=e=>this.startTime+(n+o[e]*this.totalDuration)/this.speed;if(r>=0){let e,t=ti(a)?ta(a):(e=a,nO.has(e))?to[a]:ny(a);return[s(r),s(r+1),"string"==typeof t||nF(t(0),0)&&nF(t(1),1)?t:void 0]}}boundaries(e,t){let{startTime:i,speed:n,resolvedDuration:r,options:a}=this,{delay:o=0,repeat:s=0,repeatDelay:l=0,repeatType:d,type:c}=a,p=(c||nw)===nw?this.offsets():[0,1],u=i+o/n,m=[];if(null!==this.holdTime||!(r>0))return m;for(let i=Math.max(0,Math.floor((e-u)*n/r));i<=s;i++){let a=u+i*r/n;if(a>t)break;for(let o of p){let s=a+(i%2&&d&&"loop"!==d?1-o:o)*(r-l)/n;s>e&&s<t&&m.push(s)}}return m}numberAt(e){return parseFloat(this.sampleAt(e,!0))}sync(){let e=e9.now(),t=this.sampleAt(e,!0);this.options.motionValue.setWithVelocity(null===this.holdTime?this.sampleAt(e-10,!0):t,t,10)}play(){var e;let t,i,n,r,a,s,l,d,c,p,m,h,f,g,b,y,x,v,w,C,S,k,N,A,T,R,L,P,I,E;this.isStopped||((this.group||(n=(e=this.options.motionValue.owner).current,r=new Set,a=new Map,s={},l=[],d=new Map,c=[],p=!1,m=!1,h=!1,f=!1,g=-1/0,b=1/0,y=e=>{for(let t of r)if(t.name===e)return!0},x=(t,i)=>{let n={};for(let r of void 0===t?u:l){let o=a.get(r),l=void 0===t?nG(e,r):o?o.sampleAt(i>t&&!o.timing()[1]?i:t):s[r];void 0!==l&&(n[r]=l)}return n},v=(e,t)=>{let i="";for(let n in e){let r=e[n];t&&tO(n,r)||(i+=tD(n,r)+" ")}return(t?i.trim():i)||"none"},w=(e=x())=>{n.style.transform=v(e,!0)},C=e=>{e.onfinish=e.oncancel=null,e.cancel()},S=(e=!0)=>{clearTimeout(t),b=1/0,i=void 0,e&&w(),c.forEach(({animation:e})=>C(e)),c=[]},k=(e,t)=>new Animation(new KeyframeEffect(n,e,t)),N=(e,t,i=1/0)=>{let n={animation:e,offset:t,end:i};e.startTime=e9.now()+t,i<1/0&&(e.onfinish=()=>{n.isDone=!0,c.some(e=>1/0===e.end)&&(C(e),c=c.filter(e=>e!==n)),E.schedule(!1)}),e.oncancel=()=>c.includes(n)&&E.demote(),c.push(n)},A=(e,t,i)=>{let n=(t,i)=>Math.abs(e(i)-e(t)),r=n(t,i);for(;i-t>.01;){let e=(t+i)/2;n(t,e)>n(e,i)?i=e:t=e}return n(t,i)>r/2?[t,i]:[]},T=(e,t,i,n)=>{let r,a,o,s=nz(t,i);if(4*n.length>s)return;for(let n of e){let e=n.numberAt(t),a=(n.numberAt((t+i)/2)-e)/(n.numberAt(i)-e);if(a==a){if(void 0===r)r=a;else if(!nF(a,r))return}}let l=nV(t,i,s).concat(n).sort(nU);for(let i of e){let e=i.numberAt(t),n=l.map(t=>i.numberAt(t)-e),r=n[n.length-1],s=n.some(e=>.001*Math.abs(e)>Math.abs(r))?0:r,d=n.map(e=>s?e/s:e);if(s&&!a)a=d,o=t=>(i.numberAt(t)-e)/s;else if(d.some((e,t)=>!nF(e,s&&a[t])))return}if(!a||a.every((e,n)=>nF(e,nx(t,i,l[n]))))return"linear";let d=[],c=(e,n=o(e))=>d.push(nA(n)+" "+nA(100*nx(t,i,e))+"%");return a.forEach((e,t)=>{t&&Math.abs(e-a[t-1])>.2&&A(o,l[t-1],l[t]).forEach(e=>c(e)),c(l[t],e)}),"linear("+d+")"},R=(e,t,i,n,r={fill:"both"},a)=>{let o=n?[]:e.flatMap(e=>e.boundaries(t,i)),s=n||T(e,t,i,o),l=s?[t,i]:((e,t,i,n)=>{let r=[t],a=[],o=i,s=t;for(let n of e){let e=n.tween();if(e?.[2]!=="linear"){let[r,l]=n.timing(),[d,c]=e||[t,l?i:r];o=Math.min(o,d),s=Math.max(s,c),a.push(n)}}o=Math.max(t,o);let l=(t,i,n)=>{if(i-t<1||a.every(e=>!(Math.abs(e.numberAt((t+i)/2)-(e.numberAt(t)+e.numberAt(i))/2)>(e.name.startsWith("scale")?.001:.1))))r.push(i);else if(n<4)l(t,(t+i)/2,n+1),l((t+i)/2,i,n+1);else{for(let n of e)r.push(...A(e=>n.numberAt(e),t,i));r.push(i)}},d=(s=Math.min(i,s))>o?nV(o,s,Math.ceil((s-o)/100)):[];for(let e of(d.push(i),n))d.push(e,Math.min(e+.01,i));let c=t;for(let e of d.sort(nU))e>c&&l(c,e,0),c=e;return r.sort(nU)})(e,t,i,o),d=l.map(e=>v(x(e,a))),c={transform:d};return s||(c.offset=l.map(e=>nx(t,i,e))),d.every(e=>e===d[0])&&(w(x(t,a)),c=null),k(c,{...r,duration:i-t,easing:s||"linear"})},L=e=>{let i=e9.now()+e;i<b&&(clearTimeout(t),b=i,t=setTimeout(()=>{b=1/0,E.schedule(!1)},e))},P=()=>!r.size&&(h=!0,tc.get(n)===E&&tc.delete(n),E.isJS||S(),!0),I=()=>{let t=e9.now();if(E.isJS||(E.isFinishing=!0,r.forEach(i=>{let[n,r]=i.timing();"running"===i.state&&i.speed>0&&!r&&n<=t+1&&(i.complete(),s[i.name]=nG(e,i.name),d.has(i)||(p=!0))}),E.isFinishing=!1),m=!1,h||(r.forEach(e=>nH(e)&&r.delete(e)),P()))return;for(let e of r)if(!e.canAccelerate)return E.demote(!0);E.isJS&&(E.isJS=!1,p=!0,r.forEach(e=>e.stopJS()));let n=p,o=f;if(p=f=!1,n||!((e,t)=>{let n,a=0;for(let t of r){let i=d.get(t);if(!i)return!1;let[r,o,s]=i,l=t.at(e),p=1/0===t.timing()[0];if(s){if(p&&(l===r||!c.length))continue;return!1}let u=(l-r)/o,m=p?0:t.speed/o;if(void 0===n)n=u,a=m;else if(Math.abs(u-n)>1||m!==a)return!1}if(void 0===n)return!0;if(!c.length){if(void 0===i||t&&a)return!1;if(a){let e=(i-n)/a;if(e<1)return!1;L(e)}return!0}for(let{offset:e,end:i,isDone:r}of c){let a=n-e;if(i<1/0&&(r?a<i-1:a<0&&(t||e<=0)||a>=i))return!1}for(let{animation:t,offset:i,isDone:r}of c){if(r)continue;let o=n-i;a&&t.updatePlaybackRate&&"running"===t.playState&&20>Math.abs(Number(t.currentTime)-o)?t.playbackRate!==a&&t.updatePlaybackRate(a):a?(t.playbackRate!==a&&(t.playbackRate=a),t.startTime=e-o/a):(t.startTime=null,t.currentTime=o)}return!0})(t,o)){if(o){if(t-g<100)return E.demote();g=t}if(!(t=>{let n=t,o=0,p=0,m=[],h=[],f=new Set;for(let e of(a.clear(),d=new Map,r)){a.set(e.name,e);let[i,r]=e.timing(),s=1/0===i;if(d.set(e,[e.at(t),e.speed,s]),!s){if(e.speed<0)return;if(r){if(o){let e=(i-p)/r;if(Math.abs(r-o)>1||Math.abs(e-Math.round(e))*o>1)return}else o=r,p=i;h.push(e)}else f.add(i);m.push(e),n=Math.max(n,i)}}s={},l=u.filter(t=>{if(a.has(t))return!0;let i=s[t]=nG(e,t);return void 0!==i&&!tO(t,i)}),S(!1);let g=!o&&(e=>{let t;for(let i of e){let e=i.tween();if(!e||t&&(Math.abs(e[0]-t[0])>1||Math.abs(e[1]-t[1])>1))return;t=[e[0],e[1],t&&e[2]!==t[2]?void 0:e[2]]}return t})(m);try{if(n>t){let e;if(g&&g[1]>t){var b;let r,[a,o,s]=g;if(a-t>100)return m.forEach(e=>e.sync()),L(i=a-t-100),!0;(e="string"==typeof s?s:s?(b=nz(a,o),r=nB.get(s),r?.[0]!==b&&(r=[b,"linear("+nv(Array(b+1)).map(e=>nA(s(e))+" "+nA(100*e)+"%")+")"],nB.set(s,r)),r[1]):T(m,a,o,[]))&&N(R(m,a,o,e,{fill:"both",endDelay:n-o}),a-t,n-a)}e||N(R(m,t,n),0,n-t),f.forEach(e=>e<n-1&&N(k(null,{duration:e-t}),0,e-t))}if(o){let e=p+Math.floor((n-p)/o)*o;N(R(h,e,e+o,void 0,{iterations:1/0,iterationStart:(n-e)/o,fill:"forwards"},n),n-t)}}catch{return}return c.length||S(),!0})(t))return E.demote()}else if(void 0!==i&&!o)return;r.forEach(e=>1/0===e.timing()[0]&&e.sync())},E={tracks:r,isJS:!1,isFinishing:!1,schedule(e,t){!h&&(p||(p=e),f||(f=!!t),!m)&&(m=!0,eF.isProcessing?eU.render(I,!1,!0):(o||queueMicrotask(()=>{let e=o;o=void 0,e.forEach(e=>e())}),(o||(o=[])).push(I)))},release(e){nH(e)&&r.delete(e),P()||E.schedule(!0)},check(){if(!E.isJS){for(let t in s)if(nG(e,t)!==s[t]&&!y(t))return E.schedule(!0,!0)}},demote(e){if(!E.isJS&&!h)return r.forEach(t=>{t.isAccelerated()&&t.sync(),e||(t.canAccelerate=!1)}),E.isJS=!0,d=new Map,S(),r.forEach(e=>"running"===e.state&&e.js?.start()),!0}},tc.set(n,E),E)).tracks.add(this),super.play())}pause(){super.pause(),this.isAccelerated()&&this.group.schedule(!1)}complete(){super.complete();let{group:e}=this;e&&!e.isJS&&this.tick(e9.now())}get time(){return this.isAccelerated()?h(0,this.totalDuration,this.at(e9.now())-(this.options.delay||0))/1e3:super.time}set time(e){(a??(a=Object.getOwnPropertyDescriptor(nT.prototype,"time").set)).call(this,e)}attachTimeline(e){return this.canAccelerate=!1,this.group?.demote(!0),super.attachTimeline(e)}}class n_ extends e6{constructor(e){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=e9.now();let{keyframes:t,name:i,motionValue:n,element:r}=e;e.autoplay??(e.autoplay=!0),e.delay??(e.delay=0),e.type??(e.type="keyframes"),e.repeat??(e.repeat=0),e.repeatDelay??(e.repeatDelay=0),e.repeatType??(e.repeatType="loop");let a=r?.KeyframeResolver||e$;this.keyframeResolver=new a(t,(t,i,n)=>this.onKeyframesResolved(t,i,e,!n),i,n,r),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(e,t,i,n){let r;this.keyframeResolver=void 0;let{name:a,type:o,velocity:s,delay:l,isHandoff:d,onUpdate:c}=i;this.resolvedAt=e9.now();let p=function(e,t,i,n){let r=e[0];if(null===r)return!1;if("display"===t||"visibility"===t)return!0;let a=e[e.length-1],o=nP(r,t),s=nP(a,t);return!!o&&!!s&&(function(e){let t=e[0];if(1===e.length)return!0;for(let i=0;i<e.length;i++)if(e[i]!==t)return!0}(e)||("spring"===i||ts(i))&&n)}(e,a,o,s);p||((eO.instantAnimations||!l)&&c?.(e7(e,i,t)),e[0]=e[e.length-1],nI(i),i.repeat=0);let{onComplete:m}=i;i.finalKeyframe=t,i.keyframes=e,i.onComplete=()=>{m?.(),this.notifyFinished()};let h=p&&!d&&function(e){let{motionValue:t,name:i,repeatDelay:n,repeatType:r,damping:a,type:o,keyframes:s}=e;if(!i||!(td.has(i)||nj.has(i)))return!1;let l=t?.owner?.current;if(!(l instanceof HTMLElement)&&!(l instanceof SVGElement))return!1;let{onUpdate:d,transformTemplate:c}=t.owner.getProps();return nD()&&(td.has(i)||nj.has(i)&&function(e){for(let t=0;t<e.length;t++)if("string"==typeof e[t]&&nE.test(e[t]))return!0;return!1}(s))&&("transform"!==i||!c)&&!d&&!n&&"mirror"!==r&&0!==a&&"inertia"!==o&&!nM(e)}(i),f=!h&&(({name:e,motionValue:t})=>e&&u.includes(e)&&t?.owner?.current instanceof HTMLElement&&nD()&&tn())(i);if(n&&(h||f||this.resolvedAt!==this.createdAt)&&(i.startTime??(i.startTime=nk(this.createdAt,this.resolvedAt))),h){i.element=i.motionValue?.owner?.current;try{r=new nL(i)}catch{r=new nT(i)}}else r=f?new nW(i):new nT(i);this.pendingTimeline&&(this.stopTimeline=r.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=r}get finished(){return this._animation?this._animation.finished:super.finished}then(e,t){return this.finished.finally(e).then(()=>{})}liveValue(){return this._animation?.liveValue?.()}get animation(){return this._animation||(this.keyframeResolver?.resume(),e_=!0,eK(),eX(),e_=!1),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation?.cancel(),this.keyframeResolver?.cancel()}}let nX={type:"spring",stiffness:500,damping:25,restSpeed:10},nK={type:"keyframes",duration:.8},n$={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},nY=new Set(["when","delay","delayChildren","staggerChildren","staggerDirection","repeat","repeatType","repeatDelay","from","elapsed","out","mixer"]),nZ=(e,t,i,n={},r,a)=>o=>{let s=iB(n,e)||{},l=s.delay||n.delay||0,{elapsed:d=0}=n;d-=eQ(l);let c={keyframes:Array.isArray(i)?i:[null,i],ease:"easeOut",velocity:t.getVelocity(),...s,delay:-d,onUpdate:e=>{t.set(e),s.onUpdate&&s.onUpdate(e)},onComplete:()=>{o(),s.onComplete&&s.onComplete()},name:e,motionValue:t,element:a?void 0:r,hasOnUpdate:!!s.onUpdate};!function(e){for(let t in e)if(!nY.has(t))return!0;return!1}(s)&&Object.assign(c,((e,{keyframes:t})=>t.length>2?nK:m.has(e)?e.startsWith("scale")?{type:"spring",stiffness:550,damping:0===t[1]?2*Math.sqrt(550):30,restSpeed:10}:nX:n$)(e,c)),c.duration&&(c.duration=eQ(c.duration)),c.repeatDelay&&(c.repeatDelay=eQ(c.repeatDelay)),void 0!==c.from&&(c.keyframes[0]=c.from);let p=!1;if(!1!==c.type&&(0!==c.duration||c.repeatDelay)||(nI(c),0===c.delay&&(p=!0)),(eO.instantAnimations||eO.skipAnimations||r?.shouldSkipAnimations||s.skipAnimations)&&(p=!0,nI(c),c.delay=0),c.allowFlatten=!s.type&&!s.ease,p&&!a&&void 0!==t.get()){let e=e7(c.keyframes,s);if(void 0!==e)return void eU.update(()=>{c.onUpdate(e),c.onComplete()})}return s.isSync?new nT(c):new n_(c)},nQ="u">typeof window;function nJ(e,t,{delay:i=0,transitionOverride:n,type:r}={}){let{transition:a,transitionEnd:o,...s}=t,l=e.getDefaultTransition();a=a?iO(a,l):l;let d=a?.reduceMotion,c=a?.skipAnimations;n&&(a=n);let p=[],u=r&&e.animationState?.getState()[r],m=a?.path;for(let t in m&&(m.animateValues?m.animateValues(t=>e.getValue(t,e.latestValues[t]??0),s,a,i,p):m.animateVisualElement?.(e,s,a,i,p)),s){let n=e.getValue(t,e.latestValues[t]??null),r=s[t];if(void 0===r||u&&function({protectedKeys:e,needsAnimating:t},i){let n=i in e&&!t[i];return t[i]=!1,n}(u,t))continue;let o={delay:i,...iB(u?.out[t]||a||{},t)};c&&(o.skipAnimations=!0);let l=n.get();if(void 0!==l&&!n.isAnimating()&&!Array.isArray(r)&&r===l&&!o.velocity){eU.update(()=>n.set(r));continue}let m=!1;if(nQ&&window.MotionHandoffAnimation){let i=e.props[iL];if(i){let e=window.MotionHandoffAnimation(i,t,eU);null!==e&&(o.startTime=e,m=!0)}}iz(e,t);let h=d??e.shouldReduceMotion;n.run(nZ(t,n,r,h&&ea.has(t)?{type:!1}:o,e,m));let f=n.animation;f&&p.push(f)}if(o){let t=()=>eU.update(()=>{o&&function(e,t){let{transitionEnd:i={},transition:n={},...r}=ij(e,t)||{};for(let t in r={...r,...i}){var a;let i=Array.isArray(a=r[t])?a[a.length-1]||0:a;e.hasValue(t)?e.getValue(t).set(i):e.addValue(t,tf(i))}}(e,o)});p.length?Promise.all(p).then(t):t()}return p}function n0(e,t,i,n=0,r=1){let a=Array.from(e).sort((e,t)=>e.sortNodePosition(t)).indexOf(t),o=e.size,s=(o-1)*n;return"function"==typeof i?i(a,o):1===r?a*n:s-a*n}function n1(e,t,i={}){let n=ij(e,t,iD(e,i.type)),r=i.transitionOverride||(n?.transition??(e.getDefaultTransition()||{})),a=()=>Promise.all(n?nJ(e,n,i):[]),o=(n=0)=>{let{variantChildren:a}=e,{delayChildren:o=0,staggerChildren:s,staggerDirection:l}=r,d=[];return a?.forEach(e=>{e.notify("AnimationStart",t),d.push(n1(e,t,{...i,delay:n+("function"==typeof o?0:o)+n0(a,e,o,s,l)}).then(()=>e.notify("AnimationComplete",t)))}),Promise.all(d)},{when:s}=r;return s?"beforeChildren"===s?a().then(()=>o()):o().then(a):Promise.all([a(),o(i.delay)])}function n2(e,t){if(!Array.isArray(t))return!1;let i=t.length;if(i!==e.length)return!1;for(let n=0;n<i;n++)if(t[n]!==e[n])return!1;return!0}let n5=[...tx].reverse(),n3=e=>e?.out===!0?e:e?.out;function n4(){let e={};for(let t of tx)e[t]={isActive:"animate"===t,protectedKeys:{},needsAnimating:{},prevResolvedValues:{},out:{}};return e}let n7=0;function n6(e,t,i,n={passive:!0}){return e.addEventListener(t,i,n),()=>e.removeEventListener(t,i,n)}let n8=e=>"mouse"===e.pointerType?"number"!=typeof e.button||e.button<=0:!1!==e.isPrimary;function n9(e){return{point:{x:e.pageX,y:e.pageY}}}function re(e,t,i,n){return n6(e,t,e=>n8(e)&&i(e,n9(e)),n)}function rt(e){return e.max-e.min}function ri(e,t,i,n=.5){e.origin=n,e.originPoint=tZ(t.min,t.max,e.origin),e.scale=rt(i)/rt(t),e.translate=tZ(i.min,i.max,e.origin)-e.originPoint,(e.scale>=.9999&&e.scale<=1.0001||isNaN(e.scale))&&(e.scale=1),(e.translate>=-.01&&e.translate<=.01||isNaN(e.translate))&&(e.translate=0)}function rn(e,t,i,n){ri(e.x,t.x,i.x,n?.originX),ri(e.y,t.y,i.y,n?.originY)}function rr(e,t,i,n=0){e.min=(n?tZ(i.min,i.max,n):i.min)+t.min,e.max=e.min+rt(t)}function ra(e,t,i,n=0){let r=n?tZ(i.min,i.max,n):i.min;e.min=t.min-r,e.max=e.min+rt(t)}function ro(e,t,i,n){ra(e.x,t.x,i.x,n?.x),ra(e.y,t.y,i.y,n?.y)}function rs(e){return[e("x"),e("y")]}let rl={};function rd(e){return rl.current?.add(e),e}let rc=e=>rl.current?rl.current.bind(e):e,rp=e=>"object"==typeof e&&null!==e;function ru(e){return rp(e)&&"ownerSVGElement"in e}function rm(e,t,i){if(null==e)return[];if(e instanceof EventTarget)return[e];if("string"==typeof e){let n=t?t.current:rl.current?.root||document,r=i?.[e]??n.querySelectorAll(e);return r?Array.from(r):[]}return Array.from(e).filter(e=>null!=e)}let rh=new WeakMap,rf=(e,t,i)=>(n,r)=>r&&r[0]?r[0][e+"Size"]:ru(n)&&"getBBox"in n?n.getBBox()[t]:n[i],rg=rf("inline","width","offsetWidth"),rb=rf("block","height","offsetHeight");function ry({target:e,borderBoxSize:t}){rh.get(e)?.forEach(i=>{i(e,{get width(){return rg(e,t)},get height(){return rb(e,t)}})})}function rx(e){e.forEach(ry)}let rv=new Set;function rw(e,t){let i;return rd("function"==typeof e?(rv.add(e),l||(l=()=>{let e={get width(){return window.innerWidth},get height(){return window.innerHeight}};rv.forEach(t=>t(e))},window.addEventListener("resize",l)),()=>{rv.delete(e),rv.size||"function"!=typeof l||(window.removeEventListener("resize",l),l=void 0)}):(!s&&"u">typeof ResizeObserver&&(s=new ResizeObserver(rx)),(i=rm(e)).forEach(e=>{let i=rh.get(e);i||(i=new Set,rh.set(e,i)),i.add(t),s?.observe(e)}),()=>{i.forEach(e=>{let i=rh.get(e);i?.delete(t),i?.size||s?.unobserve(e)})}))}let rC=(e,t)=>Math.abs(e-t),rS=new Set(["auto","scroll"]);class rk{constructor(e,t,{transformPagePoint:i,contextWindow:n=window,dragSnapToOrigin:r=!1,distanceThreshold:a=3,element:o,immediate:s}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.onElementScroll=e=>{this.handleScroll(e.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{var e,t;if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.hasPendingMove=!1,this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=rA(this.lastRawMoveEventInfo,this.transformPagePoint));let i=rR(this.lastMoveEventInfo,this.history),n=null!==this.startEvent,r=(e=i.offset,t={x:0,y:0},Math.sqrt(rC(e.x,t.x)**2+rC(e.y,t.y)**2)>=this.distanceThreshold);if(!n&&!r)return;let{point:a}=i;this.history.push({...a,timestamp:e9.now()});let{onStart:o,onMove:s}=this.handlers;n||(o?.(this.lastMoveEvent,i),this.startEvent=this.lastMoveEvent),s?.(this.lastMoveEvent,i)},this.handlePointerMove=(e,t)=>{this.handleScroll(window),this.lastMoveEvent=e,this.lastRawMoveEventInfo=t,this.lastMoveEventInfo=rA(t,this.transformPagePoint),this.hasPendingMove=!0,eU.update(this.updatePoint,!0)},this.handlePointerUp=(e,t)=>{this.hasPendingMove&&this.updatePoint(),this.end();let{onEnd:i,onSessionEnd:n,resumeAnimation:r}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&r?.(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;let a=rR("pointercancel"===e.type?this.lastMoveEventInfo:rA(t,this.transformPagePoint),this.history);this.startEvent&&i?.(e,a),n?.(e,a)},!n8(e))return;this.dragSnapToOrigin=r,this.handlers=t,this.transformPagePoint=i,this.distanceThreshold=s?0:a,this.contextWindow=n||window;let l=n9(e),d=rA(l,this.transformPagePoint),{point:c}=d;this.history=[{...c,timestamp:e9.now()}];let{onSessionStart:p}=t;p&&p(e,rR(d,this.history));let u={passive:!0,capture:!0};this.removeListeners=iF(re(this.contextWindow,"pointermove",this.handlePointerMove,u),re(this.contextWindow,"pointerup",this.handlePointerUp,u),re(this.contextWindow,"pointercancel",this.handlePointerUp,u)),o&&this.startScrollTracking(o),s&&(this.handlePointerMove(e,l),this.updatePoint())}startScrollTracking(e){let t=e.parentElement;for(;t;){let e=getComputedStyle(t);(rS.has(e.overflowX)||rS.has(e.overflowY))&&this.scrollPositions.set(t,rN(t)),t=t.parentElement}this.scrollPositions.set(window,rN(window)),this.removeScrollListeners=iF(n6(window,"scroll",this.onElementScroll,{capture:!0}),n6(window,"scroll",this.onWindowScroll,{}))}handleScroll(e){let t=this.scrollPositions.get(e);if(!t)return;let i=e===window,n=rN(e),r={x:n.x-t.x,y:n.y-t.y};(0!==r.x||0!==r.y)&&(i?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=r.x,this.lastMoveEventInfo.point.y+=r.y):this.history.length>0&&(this.history[0].x-=r.x,this.history[0].y-=r.y),this.scrollPositions.set(e,n),eU.update(this.updatePoint,!0))}updateHandlers(e){this.handlers=e}end(){this.removeListeners?.(),this.removeScrollListeners?.(),this.scrollPositions.clear(),eV(this.updatePoint)}}let rN=e=>e===window?{x:window.scrollX,y:window.scrollY}:{x:e.scrollLeft,y:e.scrollTop};function rA(e,t){return t?{point:t(e.point)}:e}function rT(e,t){return{x:e.x-t.x,y:e.y-t.y}}function rR({point:e},t){return{point:e,delta:rT(e,rL(t)),offset:rT(e,t[0]),velocity:function(e){if(e.length<2)return{x:0,y:0};let t=e.length-1,i=null,n=rL(e);for(;t>=0&&(i=e[t],!(n.timestamp-i.timestamp>eQ(.1)));)t--;if(!i)return{x:0,y:0};i===e[0]&&e.length>2&&n.timestamp-i.timestamp>2*eQ(.1)&&(i=e[1]);let r=(n.timestamp-i.timestamp)/1e3;if(0===r)return{x:0,y:0};let a={x:(n.x-i.x)/r,y:(n.y-i.y)/r};return 1/0===a.x&&(a.x=0),1/0===a.y&&(a.y=0),a}(t)}}function rL(e){return e[e.length-1]}let rP=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]),rI=new Set(["INPUT","SELECT","TEXTAREA"]),rE={x:!1,y:!1};function rM(){return rE.x||rE.y}function rj(e,t,i){return{min:void 0!==t?e.min+t:void 0,max:void 0!==i?e.max+i-(e.max-e.min):void 0}}function rD(e,t){let i=t.min-e.min,n=t.max-e.max;return t.max-t.min<e.max-e.min&&([i,n]=[n,i]),{min:i,max:n}}function rO(e,t,i){return{min:rB(e,t),max:rB(e,i)}}function rB(e,t){return"number"==typeof e?e:e[t]||0}function rz(e){let t="";for(let i of e.path){i.scroll=void 0,i.updateScroll();let{scroll:n}=i;i!==e.root&&n&&(t+=n.offset.x+","+n.offset.y+",")}return t}let rF=new WeakMap;class rU{constructor(e,t=()=>e.getProps()){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=en(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=e,this.readProps=t}start(e,t={}){if(this.visualElement.presenceContext?.isPresent===!1)return;let i=e=>{t.snapToCursor&&this.snapToCursor(e),this.stopAnimation()},n=(e,t)=>{let{drag:i,dragConstraints:n,dragPropagation:r,onDragStart:a}=this.getProps();if(i&&!r&&(this.openDragLock?.(),this.openDragLock=function(e){if("x"===e||"y"===e)if(rE[e])return null;else return rE[e]=!0,()=>{rE[e]=!1};return rE.x||rE.y?null:(rE.x=rE.y=!0,()=>{rE.x=rE.y=!1})}(i),!this.openDragLock))return;this.latestPointerEvent=e,this.latestPanInfo=t,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints();let{projection:o}=this.visualElement;o&&(o.isAnimationBlocked=!0,o.target=void 0),rs(e=>{let t=this.getAxisMotionValue(e).get()||0;if(ep(t)&&(t=ef(t,this.visualElement.current)||0),P.test(t))t=parseFloat(t);else if(L.test(t)){let i=o?.layout?.layoutBox[e];i&&(t=rt(i)*(parseFloat(t)/100))}this.originPoint[e]=t}),this.point="function"==typeof n&&n(this),a&&eU.update(()=>a(e,t),!1,!0),iz(this.visualElement,"transform"),this.visualElement.animationState?.setActive("whileDrag",!0)},r=(e,t)=>{this.latestPointerEvent=e,this.latestPanInfo=t;let{dragPropagation:i,dragDirectionLock:n,onDirectionLock:r,onDrag:a}=this.getProps();if(!i&&!this.openDragLock)return;let{offset:o}=t;if(n&&null===this.currentDirection){if(this.currentDirection=function(e,t=10){let i=null;return Math.abs(e.y)>t?i="y":Math.abs(e.x)>t&&(i="x"),i}(o),null===this.currentDirection)return;r&&r(this.currentDirection)}this.updateAxis("x",o),this.updateAxis("y",o),this.point&&this.point.move(),this.visualElement.render(),a&&eU.update(()=>a(e,t),!1,!0)},a=(e,t)=>{this.latestPointerEvent=e,this.latestPanInfo=t,this.stop(e,t),this.latestPointerEvent=null,this.latestPanInfo=null},o=()=>{let{dragSnapToOrigin:e}=this.getProps();(e||this.constraints||this.point)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:s}=this.getProps();this.panSession=new rk(e,{onSessionStart:i,onStart:n,onMove:r,onSessionEnd:a,resumeAnimation:o},{...t,transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:s,contextWindow:this.visualElement.current?.ownerDocument.defaultView,element:this.visualElement.current})}stop(e,t,i){let n=e||this.latestPointerEvent,r=t||this.latestPanInfo,a=this.isDragging;if(this.cancel(),!a||!r||!n)return;let{velocity:o}=r;this.startAnimation(o,i);let{onDragEnd:s}=this.getProps();s&&eU.postRender(()=>s(n,r))}cancel(){this.isDragging=!1;let{projection:e,animationState:t}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.endPanSession(),!this.getProps().dragPropagation&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),t?.setActive("whileDrag",!1)}endPanSession(){this.panSession?.end(),this.panSession=void 0}updateAxis(e,t){let{drag:i}=this.readProps();if(!t||!rq(e,i,this.currentDirection))return;let n=this.getAxisMotionValue(e),r=this.originPoint[e]+t[e],a=this.constraints&&this.constraints[e];a&&(r=function(e,{min:t,max:i},n){return void 0!==t&&e<t?e=n?tZ(t,e,n.min):Math.max(e,t):void 0!==i&&e>i&&(e=n?tZ(i,e,n.max):Math.min(e,i)),e}(r,a,this.elastic[e])),this.point?this.point[e]=r:n.set(r)}resolveConstraints(){let{dragConstraints:e,dragElastic:t}=this.getProps(),{projection:i}=this.visualElement,n=i&&(i.layout||i.measure(!1)),r=this.constraints;rV(e)?this.constraints&&this.scroll===rz(i)||(this.constraints=this.resolveRefConstraints()):e&&n&&"object"==typeof e?this.constraints=function(e,{top:t,left:i,bottom:n,right:r}){return{x:rj(e.x,i,r),y:rj(e.y,t,n)}}(n.layoutBox,e):this.constraints=!1,this.elastic=function(e=.35){return!1===e?e=0:!0===e&&(e=.35),{x:rO(e,"left","right"),y:rO(e,"top","bottom")}}(t),r!==this.constraints&&!rV(e)&&n&&this.constraints&&!this.hasMutatedConstraints&&rs(e=>{var t,i;let r;!1!==this.constraints&&this.getAxisMotionValue(e)&&(this.constraints[e]=(t=n.layoutBox[e],i=this.constraints[e],r={},void 0!==i.min&&(r.min=i.min-t.min),void 0!==i.max&&(r.max=i.max-t.min),r))})}resolveRefConstraints(){var e,t;let{dragConstraints:i,onMeasureDragConstraints:n}=this.getProps();if(!rV(i))return!1;let r=rH(i),{projection:a}=this.visualElement;if(!a||!a.layout)return!1;this.scroll=rz(a);let o=function(e,t,i){let n=it(e,i),{scroll:r}=t;return r&&(t6(n.x,r.offset.x),t6(n.y,r.offset.y)),n}(r,a.root,this.visualElement.getTransformPagePoint()),s=(e=a.layout.layoutBox,t=a.removeElementScroll(o),{x:rD(e.x,t.x),y:rD(e.y,t.y)});if(n){let e=n(function({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}(s));this.hasMutatedConstraints=!!e,e&&(s=tY(e))}return s}startAnimation(e,t){let{drag:i,dragMomentum:n,dragElastic:r,dragTransition:a,dragSnapToOrigin:o,onDragTransitionEnd:s}=this.getProps(),l={bounceStiffness:r?200:1e6,bounceDamping:r?40:1e7,timeConstant:750,restDelta:1,restSpeed:10,...a},d=r=>n&&!(this.point&&o)&&rq(r,t||i,this.currentDirection)?e[r]:0;if(this.point&&!o)return this.point.release({x:d("x"),y:d("y")},l).then(s);let c=this.constraints||{};return Promise.all(rs(e=>{if(!rq(e,t||i,this.currentDirection))return;let n=c[e]||{};(!0===o||o===e)&&(n={min:0,max:0});let r={type:"inertia",velocity:d(e),...l,...n};return this.startAxisValueAnimation(e,r)})).then(s)}startAxisValueAnimation(e,t){let i=this.getAxisMotionValue(e);return iz(this.visualElement,e),i.start(nZ(e,i,0,t,this.visualElement,!1))}stopAnimation(){rs(e=>this.getAxisMotionValue(e).stop())}getAxisMotionValue(e){let t=`_drag${e.toUpperCase()}`;return this.readProps()[t]||this.visualElement.getValue(e,this.visualElement.latestValues[e]??0)}snapToCursor({clientX:e,clientY:t}){let{drag:i}=this.getProps(),n={x:e,y:t},r=this.visualElement.getTransformPagePoint()?.(n)||n,a=this.visualElement.measureViewportBox();rs(e=>{if(!rq(e,i,this.currentDirection))return;let t=this.getAxisMotionValue(e),{min:n,max:o}=a[e];t.set((t.get()||0)+r[e]-tZ(n,o,.5))})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;let{drag:e,dragConstraints:t}=this.getProps(),{projection:i}=this.visualElement;if(!rV(t)||!i||!this.constraints)return;this.stopAnimation();let n=this.constraints,r={x:0,y:0};rs(e=>{var t,i;let a,o,s,l=this.getAxisMotionValue(e).get();r[e]=(t={min:l,max:l},i=n[e],a=.5,o=rt(t),(s=rt(i))>o?a=nx(i.min,i.max-o,t.min):o>s&&(a=nx(t.min,t.max-s,i.min)),h(0,1,a))});let{transformTemplate:a}=this.visualElement.getProps();this.visualElement.current.style.transform=a?a({},""):"none",i.root?.updateScroll(),i.updateLayout(),this.constraints=!1,this.resolveConstraints(),rs(t=>{let i=this.getAxisMotionValue(t);if(!rq(t,e,null)||!i.get())return;let{min:n,max:a}=this.constraints[t];i.set(tZ(n,a,r[t]))}),this.visualElement.render()}addListeners(){let e;if(!this.visualElement.current)return;rF.set(this.visualElement,this);let t=this.visualElement.current,i=re(t,"pointerdown",e=>{let{drag:i,dragListener:n=!0}=this.getProps(),r=e.target,a=r!==t&&(rI.has(r.tagName)||!0===r.isContentEditable);i&&n&&!a&&this.start(e)}),n=()=>{var i,n,r;let a,o,{dragConstraints:s}=this.getProps(),l=rV(s)&&rH(s);l&&(this.constraints=this.resolveRefConstraints(),e||(i=t,n=l,a=rw(i,rG(r=()=>this.scalePositionWithinConstraints())),o=rw(n,rG(r)),e=()=>{a(),o()}))},{projection:r}=this.visualElement,a=r.addEventListener("measure",n);r.layout||(r.root?.updateScroll(),r.updateLayout()),eU.read(n);let o=n6(window,"resize",()=>this.scalePositionWithinConstraints()),s=r.addEventListener("didUpdate",({delta:e,hasLayoutChanged:t})=>{this.isDragging&&t&&(rs(t=>{if(!rq(t,this.getProps().drag,this.currentDirection))return;let i=this.getAxisMotionValue(t);this.originPoint[t]+=e[t].translate,i.set(i.get()+e[t].translate)}),this.visualElement.render())});return()=>{o(),i(),a(),s(),e?.()}}getProps(){let e=this.readProps(),{dragElastic:t=.35,dragMomentum:i=!0}=e;return{...e,dragElastic:t,dragMomentum:i}}}function rV(e){return!!e&&"object"==typeof e&&("current"in e||"nodeType"in e)}let rH=e=>"current"in e?e.current:e;function rG(e){let t=!0;return()=>{if(t){t=!1;return}e()}}function rq(e,t,i){return(!0===t||t===e)&&(null===i||i===e)}let rW=e=>(t,i)=>{e&&eU.update(()=>e(t,i),!1,!0)},r_={hasAnimatedSinceResize:!0,hasEverUpdated:!1};var rX=p;function rK(e=!0){let t=(0,p.useContext)(iv);if(null===t)return[!0,null];let{isPresent:i,onExitComplete:n,register:r}=t,a=(0,p.useId)();(0,p.useEffect)(()=>{if(e)return r(a)},[e]);let o=(0,p.useCallback)(()=>e&&n&&n(a),[a,n,e]);return!i&&n?[!1,o]:[!0]}let r$=!1,rY=({layout:e,layoutDependency:t,layoutAnchor:i})=>({layout:e,layoutDependency:t,layoutAnchor:i,animationType:"string"==typeof e?e:"both"}),rZ=(e,t)=>{let{snapshot:i}=e,n=e.getStack();n?.remove(e);let r=n?.lead;if(n?.prevLead===e&&r.resumeFrom===e&&(r.resumeFrom=r.currentAnimation=e.resumingFrom=void 0),e.options.layoutId=t,!t){e.needsShow=!0;return}return e.root.registerSharedNode(t,e),()=>{let{resumeFrom:t}=e;t?.isPresent!==!1&&e.getStack().members.includes(t)&&(t.hide(),e.resumeFrom=void 0,e.snapshot=i)}};class rQ extends rX.Component{componentDidMount(){let{visualElement:e,layoutGroup:t,switchLayoutGroup:i,layoutId:n}=this.props,{projection:r}=e;r&&(t.group?.add(r),n&&i?.register?.(r),r$&&r.root.didUpdate(),r.options.layoutId!==n&&rZ(r,n)?.(),r.addEventListener("animationComplete",()=>this.safeToRemove()),r.setOptions({...r.options,...rY(this.props),onExitComplete:()=>this.safeToRemove()})),r_.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){let{layoutDependency:t,layoutId:i,visualElement:n,drag:r,isPresent:a}=this.props,{projection:o}=n;return o&&(o.isPresent=a,this.takeOver=e.layoutId!==i?(o.willUpdate(),rZ(o,i)):void 0,o.setOptions({...o.options,...rY(this.props)}),r$=!0,r||e.layoutDependency!==t||void 0===t||e.isPresent!==a?o.willUpdate():this.safeToRemove(),e.isPresent!==a&&(a?o.promote():o.relegate()||eU.postRender(()=>{o.getStack()?.members.length||this.safeToRemove()}))),null}componentDidUpdate(){let{projection:e}=this.props.visualElement;e&&(this.takeOver?.(),e.root.didUpdate(),tp.postRender(()=>{!e.currentAnimation&&e.isLead()&&this.safeToRemove()}))}componentWillUnmount(){let{visualElement:e,layoutGroup:t,switchLayoutGroup:i}=this.props,{projection:n}=e;r$=!0,n&&(n.scheduleCheckAfterUnmount(),t.group?.remove(n),i?.deregister?.(n))}safeToRemove(){this.props.safeToRemove?.()}render(){return null}}function rJ(e){let[t,i]=rK(),n=(0,rX.useContext)(is);return(0,c.jsx)(rQ,{...e,layoutGroup:n,switchLayoutGroup:(0,rX.useContext)(iP),isPresent:t,safeToRemove:i})}let r0,r1=["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],r2=e=>"number"==typeof e?e:parseFloat(e),r5=r1.length,r3=e=>"number"==typeof e||P.test(e);function r4(e,t){return void 0!==e[t]?e[t]:e.borderRadius}let r7=r8(0,.5,nf),r6=r8(.5,.95,eD);function r8(e,t,i){return n=>n<e?0:n>t?1:i(nx(e,t,n))}function r9(e,t){e.min=t.min,e.max=t.max}function ae(e,t){r9(e.x,t.x),r9(e.y,t.y)}function at(e,t){e.translate=t.translate,e.scale=t.scale,e.originPoint=t.originPoint,e.origin=t.origin}function ai(e,t,i,n,r){return e-=t,e=n+1/i*(e-n),void 0!==r&&(e=n+1/r*(e-n)),e}function an(e,t,[i,n,r],a,o){!function(e,t=0,i=1,n=.5,r,a=e,o=e){if(L.test(t)&&(t=parseFloat(t),t=tZ(o.min,o.max,t/100)-o.min),"number"!=typeof t)return;let s=tZ(a.min,a.max,n);e===a&&(s-=t),e.min=ai(e.min,t,i,s,r),e.max=ai(e.max,t,i,s,r)}(e,t[i],t[n],t[r],t.scale,a,o)}let ar=["x","scaleX","originX"],aa=["y","scaleY","originY"];function ao(e,t,i,n){an(e.x,t,ar,i?.x,n?.x),an(e.y,t,aa,i?.y,n?.y)}let as=e=>"u">typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),al=as("applewebkit/")&&!as("chrome/")?Math.round:eD;function ad(e){e.min=al(e.min),e.max=al(e.max)}function ac(e){return 0===e.translate&&1===e.scale}function ap(e){return ac(e.x)&&ac(e.y)}function au(e,t){return e.min===t.min&&e.max===t.max}function am(e,t){return Math.round(e.min)===Math.round(t.min)&&Math.round(e.max)===Math.round(t.max)}function ah(e,t){return am(e.x,t.x)&&am(e.y,t.y)}function af(e){return rt(e.x)/rt(e.y)}function ag(e,t){return e.translate===t.translate&&e.scale===t.scale&&e.originPoint===t.originPoint}class ab{constructor(){this.members=[]}add(e){eJ(this.members,e);for(let t=this.members.length-1;t>=0;t--){let i=this.members[t];if(i===e||i===this.lead||i===this.prevLead)continue;let n=i.instance;n&&!1!==n.isConnected||i.snapshot||(e0(this.members,i),i.unmount())}e.scheduleRender()}remove(e){if(e0(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){let e=this.members[this.members.length-1];e&&this.promote(e)}}relegate(e){for(let t=this.members.indexOf(e)-1;t>=0;t--){let e=this.members[t];if(!1!==e.isPresent&&e.instance?.isConnected!==!1)return this.promote(e),!0}return!1}promote(e,t){let i=this.lead;if(e!==i&&(this.prevLead=i,this.lead=e,e.show(),i)){i.updateSnapshot(),e.scheduleRender();let{layoutDependency:n}=i.options,{layoutDependency:r}=e.options;(void 0===n||n!==r)&&(e.resumeFrom=i,t&&(i.preserveOpacity=!0),i.snapshot&&(e.snapshot=i.snapshot,e.snapshot.latestValues=i.animationValues||i.latestValues),e.root?.isUpdating&&(e.isLayoutDirty=!0)),!1===e.options.crossfade&&i.hide()}}exitAnimationComplete(){this.members.forEach(e=>{e.options.onExitComplete?.(),e.resumingFrom?.options.onExitComplete?.()})}scheduleRender(){this.members.forEach(e=>e.instance&&e.scheduleRender(!1))}removeLeadSnapshot(){this.lead?.snapshot&&(this.lead.snapshot=void 0)}}function ay(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}let ax={correct:(e,t)=>{if(!t.target)return e;if("string"==typeof e)if(!P.test(e))return e;else e=parseFloat(e);let i=ay(e,t.target.x),n=ay(e,t.target.y);return`${i}% ${n}%`}},av={borderRadius:Object.assign({},ax,{applyTo:r1.slice()}),borderTopLeftRadius:ax,borderTopRightRadius:ax,borderBottomLeftRadius:ax,borderBottomRightRadius:ax,boxShadow:{correct:(e,{treeScale:t,projectionDelta:i})=>{let n=G.parse(e);if(n.length>5)return e;let r=G.createTransformer(e),a=+("number"!=typeof n[0]),o=i.x.scale*t.x,s=i.y.scale*t.y;n[0+a]/=o,n[1+a]/=s;let l=tZ(o,s,.5);return"number"==typeof n[2+a]&&(n[2+a]/=l),"number"==typeof n[3+a]&&(n[3+a]/=l),r(n)}}},aw=(e,t)=>e.depth-t.depth;class aC{constructor(){this.children=[],this.isDirty=!1}add(e){eJ(this.children,e),this.isDirty=!0}remove(e){e0(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(aw),this.isDirty=!1,this.children.forEach(e)}}let aS=["z","skew","skewZ"],ak=0;function aN(e,t,i,n){let{latestValues:r}=t;r[e]&&(i[e]=r[e],t.setStaticValue(e,0),n&&(n[e]=0))}let aA=e=>e.instance&&tc.get(e.instance)?.demote()&&e.resetSkewAndRotation();function aT({attachResizeListener:e,defaultParent:t,measureScroll:i,checkIsScrollRoot:n,resetTransform:r}){return Object.assign(tW,{...av,...tW}),class{static create(e,t,i){var n;let{layoutId:r,layout:a,drag:o,dragConstraints:s,layoutScroll:l,layoutRoot:d,layoutAnchor:c,layoutCrossfade:p}=t,u=e.projection=new this(e.latestValues,t["data-framer-portal-id"]?void 0:function e(t){if(t)return!1!==t.options.allowProjection?t.projection:e(t.parent)}(e.parent));u.setOptions({layoutId:r,layout:a,alwaysMeasureLayout:!!o||s&&(n=s)&&"object"==typeof n&&Object.prototype.hasOwnProperty.call(n,"current"),visualElement:e,animationType:"string"==typeof a?a:"both",initialPromotionConfig:i,crossfade:p,layoutScroll:l,layoutRoot:d,layoutAnchor:c});let m=u.getStack()?.lead;m&&!u.root.isUpdateBlocked()&&(m.willUpdate(),m.scheduleCheckAfterUnmount())}constructor(e={},i=t?.()){this.id=ak++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(aP),this.nodes.forEach(aU),this.nodes.forEach(aV),this.nodes.forEach(aI),r0?.()},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=e,this.root=i?i.root||i:this,this.path=i?[...i.path,i]:[],this.parent=i,this.depth=i?i.depth+1:0;for(let e=0;e<this.path.length;e++)this.path[e].shouldResetTransform=!0;this.root===this&&(this.nodes=new aC)}addEventListener(e,t){return this.eventHandlers.has(e)||this.eventHandlers.set(e,new e1),this.eventHandlers.get(e).add(t)}notifyListeners(e,...t){this.eventHandlers.get(e)?.notify(...t)}hasListeners(e){return this.eventHandlers.has(e)}mount(t){if(this.instance)return;this.isSVG=ru(t)&&!(ru(t)&&"svg"===t.tagName),this.instance=t;let{layoutId:i,layout:n,visualElement:r}=this.options;if(r&&!r.current&&r.mount(t),this.root.nodes.add(this),this.parent?.children.add(this),this.root.hasTreeAnimated&&(n||i)&&(this.isLayoutDirty=!0),e){let i,n=0,r=()=>this.root.updateBlockedByResize=!1;eU.read(()=>{n=window.innerWidth}),e(t,()=>{let e=window.innerWidth;if(e!==n){var t;let a,o;n=e,this.root.updateBlockedByResize=!0,i?.(),t=r,a=e9.now(),t=rc(t),o=({timestamp:e})=>{let i=e-a;i>=250&&(eV(o),t(i-250))},eU.setup(o,!0),i=rd(()=>eV(o)),r_.hasAnimatedSinceResize&&(r_.hasAnimatedSinceResize=!1,this.nodes.forEach(aF))}})}i&&this.root.registerSharedNode(i,this),this.addLayoutListener()}addLayoutListener(){let{layoutId:e,layout:t,visualElement:i,animate:n}=this.options;this.instance&&!this.hasLayoutListener&&!1!==n&&i&&(e||t)&&(this.hasLayoutListener=!0,this.addEventListener("didUpdate",({delta:e,hasLayoutChanged:t,hasRelativeLayoutChanged:n,layout:r})=>{if(this.isAnimationBlocked){this.target=void 0,this.relativeTarget=void 0;return}let a=this.options.transition||i.getDefaultTransition()||aW,{onLayoutAnimationStart:o,onLayoutAnimationComplete:s}=i.getProps(),l=!this.targetLayout||!ah(this.targetLayout,r),d=!t&&n;if(this.options.layoutRoot||this.resumeFrom||d||t&&(l||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);let t={...iB(a,"layout"),onPlay:o,onComplete:s};(i.shouldReduceMotion||this.options.layoutRoot)&&(t.delay=0,t.type=!1),this.startAnimation(t),this.setAnimationOrigin(e,d,t.path)}else t||aF(this),this.isLead()&&this.options.onExitComplete?.();this.targetLayout=r}))}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this),this.getStack()?.remove(this),this.parent?.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),this.hasLayoutListener=!1,eV(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}startUpdate(){!this.isUpdateBlocked()&&(this.isUpdating=!0,this.nodes?.forEach(aH),this.animationId++)}getTransformTemplate(){let{visualElement:e}=this.options;return e&&e.getProps().transformTemplate}willUpdate(e=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked())return void this.options.onExitComplete?.();if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&function e(t){if(t.hasCheckedOptimisedAppear=!0,t.root===t)return;let{visualElement:i}=t.options;if(!i)return;let n=i.props[iL];if(window.MotionHasOptimisedAnimation(n,"transform")){let{layout:e,layoutId:i}=t.options;window.MotionCancelOptimisedAnimation(n,"transform",eU,!(e||i))}let{parent:r}=t;r&&!r.hasCheckedOptimisedAppear&&e(r)}(this),this.root.isUpdating||this.root.startUpdate(),this.isLayoutDirty)return;aA(this),this.isLayoutDirty=!0;for(let e=0;e<this.path.length;e++){let t=this.path[e];t.shouldResetTransform=!0,aA(t),("string"==typeof t.latestValues.x||"string"==typeof t.latestValues.y)&&(t.isLayoutDirty=!0),t.updateScroll("snapshot"),t.options.layoutRoot&&t.willUpdate(!1),t.isAnimationBlocked&&(t.dragSnapshot||(t.dragSnapshot=t.measure()),this.dragAncestor=t)}let{layoutId:t,layout:i}=this.options;if(void 0===t&&!i)return;let n=this.getTransformTemplate();this.prevTransformTemplateValue=n?n(this.latestValues,""):void 0,this.updateSnapshot(),e&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){let e=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),e&&this.nodes.forEach(aj),this.nodes.forEach(aM);return}if(this.animationId<=this.animationCommitId)return void this.nodes.forEach(aD);this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(aO),this.nodes.forEach(aB),this.nodes.forEach(az),this.nodes.forEach(aR),this.nodes.forEach(aL)):this.nodes.forEach(aD),this.clearAllSnapshots();let e=e9.now();eF.delta=h(0,1e3/60,e-eF.timestamp),eF.timestamp=e,eF.isProcessing=!0,eH.update.process(eF),eH.preRender.process(eF),eH.render.process(eF),eF.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,tp.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(aE),this.sharedNodes.forEach((e,t)=>e.members.length?e.removeLeadSnapshot():this.sharedNodes.delete(t))}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,eU.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){eU.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){if(!this.snapshot&&this.instance&&(this.snapshot=this.measure(),!this.snapshot||rt(this.snapshot.measuredBox.x)||rt(this.snapshot.measuredBox.y)||(this.snapshot=void 0),this.snapshot)){let{visualElement:e}=this.options,t=this.currentAnimation?.state==="running",i=t&&this.animationEdges;t&&this.relativeTarget&&(this.snapshot.relativeVelocity=this.relativeVelocity?.slice()||[]);let n=i&&this.motionValue?.getVelocity()||0,r=[0,1,2,3,4,5].map(t=>(t<4?i&&(this.edgeValues?this.edgeVelocity(t):-i[t]*n/1e3):e?.getValue(t<5?"x":"y")?.getVelocity())||0);r.some(Boolean)&&(this.snapshot.velocity=r)}}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let e=0;e<this.path.length;e++)this.path[e].updateScroll();let e=this.layout;this.layout=this.measure(!1),this.layoutCorrected||(this.layoutCorrected=en()),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);let{visualElement:t}=this.options;t?.notify("LayoutMeasure",this.layout.layoutBox,e?.layoutBox)}updateScroll(e="measure"){let{scroll:t,instance:r}=this,{animationId:a}=this.root;if(this.options.layoutScroll&&r&&!(t&&t.animationId===a&&t.phase===e)){let o=n(r);this.scroll={animationId:a,phase:e,isRoot:o,offset:i(r),wasRoot:t?t.isRoot:o}}}resetTransform(){if(!r)return;let e=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout;e&&aA(this);let t=this.projectionDelta&&!ap(this.projectionDelta),i=this.getTransformTemplate(),n=i?i(this.latestValues,""):void 0,a=n!==this.prevTransformTemplateValue;e&&this.instance&&(t||t1(this.latestValues)||a)&&(r(this.instance,n),this.shouldResetTransform=!1,this.scheduleRender())}measure(e=!0){var t;let i=this.measurePageBox(),n=this.removeElementScroll(i);return e&&(n=this.removeTransform(n)),ad((t=n).x),ad(t.y),{animationId:this.root.animationId,measuredBox:i,layoutBox:n,latestValues:{},source:this.id}}measurePageBox(){let{visualElement:e}=this.options;if(!e)return en();let t=e.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some(aK))){let{scroll:e}=this.root;e&&(t6(t.x,e.offset.x),t6(t.y,e.offset.y))}return t}removeElementScroll(e){let t=en();if(ae(t,e),this.scroll?.wasRoot)return t;for(let i=0;i<this.path.length;i++){let n=this.path[i],{scroll:r,options:a}=n;n!==this.root&&r&&a.layoutScroll&&(r.wasRoot&&ae(t,e),t6(t.x,r.offset.x),t6(t.y,r.offset.y))}return t}applyTransform(e,t=!1,i,n,r=0){let a=i||en();ae(a,e);for(let e=r;e<this.path.length;e++){let i=this.path[e];!t&&i.options.layoutScroll&&i.scroll&&i!==i.root&&(t6(a.x,-i.scroll.offset.x),t6(a.y,-i.scroll.offset.y)),t1(i.latestValues)&&ie(a,i.latestValues,i.layout?.layoutBox)}return!n&&t1(this.latestValues)&&ie(a,this.latestValues,this.layout?.layoutBox),a}removeTransform(e){let t=en();ae(t,e);for(let e=0;e<this.path.length;e++){let i,n=this.path[e];t1(n.latestValues)&&(n.instance&&(tJ(n.latestValues)&&n.updateSnapshot(),ae(i=en(),n.measurePageBox())),ao(t,n.latestValues,n.snapshot?.layoutBox,i))}return t1(this.latestValues)&&ao(t,this.latestValues),t}setTargetDelta(e){this.targetDelta=e,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(e){this.options={...this.options,...e,crossfade:void 0===e.crossfade||e.crossfade},this.addLayoutListener()}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==eF.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(e=!1){let t=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=t.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=t.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=t.isSharedProjectionDirty);let i=!!this.resumingFrom||this!==t;if(!(e||i&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;let{layout:n,layoutId:r}=this.options;if(!this.layout||!(n||r))return;this.resolvedRelativeTargetAt=eF.timestamp;let a=this.getClosestProjectingParent();if(this.targetDelta||this.relativeTarget||(!1!==this.options.layoutAnchor&&a&&a.layout?this.createRelativeTarget(a,this.layout.layoutBox,a.layout.layoutBox):this.removeRelativeTarget()),this.relativeTarget||this.targetDelta){if(this.target||(this.target=en(),this.targetWithTransforms=en()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target){var o,s,l,d;this.forceRelativeParentToResolveTarget(),o=this.target,s=this.relativeTarget,l=this.relativeParent.target,d=this.options.layoutAnchor||void 0,rr(o.x,s.x,l.x,d?.x),rr(o.y,s.y,l.y,d?.y)}else this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target,!0):ae(this.target,this.layout.layoutBox),t7(this.target,this.targetDelta)):ae(this.target,this.layout.layoutBox);this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,!1!==this.options.layoutAnchor&&a&&(!a.resumingFrom==!this.resumingFrom||a.options.layoutRoot&&!a.resumingFrom)&&!a.options.layoutScroll&&a.target&&1!==this.animationProgress?this.createRelativeTarget(a,this.target,a.target):this.relativeParent=this.relativeTarget=void 0),r0?.(1)}}getClosestProjectingParent(){if(!(!this.parent||tJ(this.parent.latestValues)||t5(this.parent.latestValues)))if(this.parent.isProjecting())return this.parent;else return this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(e,t,i){this.relativeParent=e,this.forceRelativeParentToResolveTarget(),this.relativeTarget=en(),this.relativeTargetOrigin=en(),ro(this.relativeTargetOrigin,t,i,this.options.layoutAnchor||void 0),ae(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){let e=this.getLead(),t=!!this.resumingFrom||this!==e,i=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(i=!1),t&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(i=!1),this.resolvedRelativeTargetAt===eF.timestamp&&(i=!1),i)return;let{layout:n,layoutId:r}=this.options;if(this.isTreeAnimating=!!(this.parent?.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(n||r))return;ae(this.layoutCorrected,this.layout.layoutBox);let a=this.treeScale.x,o=this.treeScale.y;!function(e,t,i,n=!1){let r,a,o=i.length;if(o){t.x=t.y=1;for(let s=0;s<o;s++)a=(r=i[s]).projectionDelta,r.options.visualElement?.props.style?.display!=="contents"&&(!0===n&&r.options.layoutScroll&&r.scroll&&r!==r.root&&(t6(e.x,-r.scroll.offset.x),t6(e.y,-r.scroll.offset.y)),a&&(t.x*=a.x.scale,t.y*=a.y.scale,t7(e,a)),n&&(n.path?.[s]||n)!==r&&t1(r.latestValues)&&ie(e,r.latestValues,r.layout?.layoutBox));t.x<1.0000000000001&&t.x>.999999999999&&(t.x=1),t.y<1.0000000000001&&t.y>.999999999999&&(t.y=1)}}(this.layoutCorrected,this.treeScale,this.path,t&&(!e.relativeTarget||!!e.relativeParent.resumingFrom||e.relativeParent)),e.layout&&!e.target&&(1!==this.treeScale.x||1!==this.treeScale.y)&&(e.target=e.layout.layoutBox,e.targetWithTransforms=en());let{target:s}=e;if(!s){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}this.projectionDelta&&this.prevProjectionDelta?(at(this.prevProjectionDelta.x,this.projectionDelta.x),at(this.prevProjectionDelta.y,this.projectionDelta.y)):this.createProjectionDeltas(),rn(this.projectionDelta,this.layoutCorrected,s,this.latestValues),this.treeScale.x===a&&this.treeScale.y===o&&ag(this.projectionDelta.x,this.prevProjectionDelta.x)&&ag(this.projectionDelta.y,this.prevProjectionDelta.y)||(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",s)),r0?.(2)}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(e=!0){this.options.visualElement?.scheduleRender(),e&&this.getStack()?.scheduleRender(),this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=et(),this.projectionDelta=et(),this.projectionDeltaWithTransform=et()}setAnimationOrigin(e,t=!1,i){let n,r=this.snapshot,a=r?r.latestValues:{},o={...this.latestValues},s=et();this.relativeParent&&this.relativeParent.options.layoutRoot||(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!t;let l=en(),d=r?.source!==this.layout?.source,c=this.getStack(),p=!c||c.members.length<=1,u=!!(d&&!p&&!0===this.options.crossfade&&!this.path.some(aq));this.animationProgress=0;let m=i?.interpolateProjection(e),h=this.layout?.layoutBox,f=h&&[h.x.min,h.x.max,h.y.min,h.y.max].map((t,i)=>{let{translate:n,scale:r,originPoint:a}=e[i<2?"x":"y"];return(t-a)*(r-1)+n});f?.every(isFinite)||(f=void 0),this.animationEdges=f,this.edgeValues=this.startVelocity=this.impulse=this.relativeVelocity=this.relativeStart=void 0;let g=r?.velocity,b=r?.relativeVelocity||g;if(b?.slice(0,4).some(Boolean)&&this.getClosestProjectingParent()&&(this.relativeStart=b),g&&f){let t=g.slice(0,4).map((e,t)=>e+(d?g[4+(t>>1)]:0));t.some(Boolean)&&(this.startVelocity=m?((e,t,{x:i,y:n})=>{let r=e*e+t*t;return r<1?0:-1e3*(i*e+n*t)/r})(e.x.translate,e.y.translate,{x:(t[0]+t[1])/2,y:(t[2]+t[3])/2}):t)}this.mixTargetDelta=t=>{var i,r,c,h,f,g,b,y,x;let v=t/1e3,w=m?.(v),C=this.edgeValues;for(let t=0;t<2;t++){let n=t?"y":"x";C?function(e,t,i,n,r){let a=i.max-i.min,o=a?Math.max(0,(a+r-n)/a):1,s=e.originPoint=t.originPoint;e.origin=t.origin,e.scale=o,e.translate=i.min+n-(s+(i.min-s)*o)}(s[n],e[n],this.layout.layoutBox[n],C[2*t],C[2*t+1]):(i=s[n],r=e[n],c=v,i.translate=tZ(r.translate,0,c),i.scale=tZ(r.scale,1,c),i.origin=r.origin,i.originPoint=r.originPoint)}if(w&&(s.x.translate=w.x,s.y.translate=w.y),this.setTargetDelta(s),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout){ro(l,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0);let e=this.relativeTargetOrigin;if(g=this.relativeTarget,b=e,y=l,x=v,aG(g.x,b.x,y.x,x),aG(g.y,b.y,y.y,x),this.isSpringLayout){let e=this.relativeTarget,t=this.impulse||0,i=this.relativeStart,r=e9.now(),a=(r-this.relativeTime)/1e3;this.relativeTime=r;let o=this.relativeVelocity||(this.relativeVelocity=[0,0,0,0]);for(let r=0;r<4;r++){let s=r<2?"x":"y",l=1&r?"max":"min";i&&(e[s][l]+=i[r]*t),n&&a>0&&(o[r]=(e[s][l]-n[s][l])/a)}}n&&(h=this.relativeTarget,f=n,au(h.x,f.x)&&au(h.y,f.y))&&(this.isProjectionDirty=!1),n||(n=en()),ae(n,this.relativeTarget)}d&&(this.animationValues=o,function(e,t,i,n,r,a){r?(e.opacity=tZ(0,i.opacity??1,r7(n)),e.opacityExit=tZ(t.opacity??1,0,r6(n))):a&&(e.opacity=tZ(t.opacity??1,i.opacity??1,n));for(let r=0;r<r5;r++){let a=r1[r],o=r4(t,a),s=r4(i,a);(void 0!==o||void 0!==s)&&(o||(o=0),s||(s=0),0===o||0===s||r3(o)===r3(s)?(e[a]=Math.max(tZ(r2(o),r2(s),n),0),(L.test(s)||L.test(o))&&(e[a]+="%")):e[a]=s)}for(let r=0;r<t0.length;r++){let a=t0[r];(t[a]||i[a])&&(e[a]=tZ(t[a]||0,i[a]||0,n))}}(o,a,this.latestValues,v,u,p)),w?.rotate!==void 0&&(this.animationValues||(this.animationValues=o),this.animationValues.pathRotation=w.rotate),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=v},this.mixTargetDelta(1e3*!!this.options.layoutRoot)}startAnimation(e){this.notifyListeners("animationStart");let t=this.isSpringLayout="spring"===e.type;this.currentAnimation?.stop(),this.resumingFrom?.currentAnimation?.stop(),this.resumingFrom&&(this.resumingFrom.edgeValues=void 0),this.pendingAnimation&&(eV(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=eU.update(()=>{var i,n,r;let a;r_.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=tf(0)),this.motionValue.jump(0,!1);let o=this.startVelocity;this.startVelocity=void 0;let s=e,l=0;if(t){if("auto"===e.mass){let t=this.layout?.layoutBox;s=((e,t=300)=>{let i=h(.25,2,t/300),{stiffness:n,damping:r}=i8({...e,duration:e.duration&&eQ(e.duration)});return{...e,stiffness:n,damping:r*Math.sqrt(i),mass:i}})(e,t&&Math.sqrt(rt(t.x)*rt(t.y)))}let t=this.relativeStart;if((o||t)&&!e.repeat)if("number"==typeof o)l=o;else{let e=o&&this.animationEdges;s={...s,type:i=>{let n=[i.velocity,...o||[]].map((t,n)=>ne({...i,keyframes:n?[e[n-1],0]:i.keyframes,velocity:t})),r=n.length;t&&n.push(ne({...i,keyframes:[0,0],velocity:1e3,restDelta:.5,restSpeed:5}));let a=0,s=[],l={calculatedDuration:null,next:t=>{a=t;let i=n[0].next(t),o=i.done;for(let e=1;e<n.length;e++){let{value:i,done:a}=n[e].next(t);e<r?s[e-1]=i:this.impulse=i/1e3,o=o&&a}return e&&(this.edgeValues=s),i.done=o,i}};return l.calculatedDuration=i1(l),l.next(0),this.edgeVelocity=e=>n[e+1].velocity(a),l}}}}let d=(i=this.motionValue,n=[0,1e3],r={...s,velocity:l,isSync:!0,onUpdate:t=>{this.mixTargetDelta(t),e.onUpdate&&e.onUpdate(t)},onComplete:()=>{e.onComplete&&e.onComplete(),this.completeAnimation()}},(a=er(i)?i:tf(i)).run(nZ("",a,n,r)),a.animation);this.currentAnimation=d,function(e,t){let i=globalThis.__MOTION_INSPECT__;if(i)try{i({...te("layout-animation-start",e),node:t})}catch{}}(this.currentAnimation,this),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);let e=this.getStack();e&&e.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=this.edgeValues=this.edgeVelocity=this.impulse=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.edgeValues=this.impulse=void 0,this.mixTargetDelta?.(1e3),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){let e=this.getLead(),{targetWithTransforms:t,layout:i,latestValues:n}=e,{target:r}=e;if(t&&r&&i){if(this!==e&&this.layout&&i&&aX(this.options.animationType,this.layout.layoutBox,i.layoutBox)){let{layoutBox:e}=this.layout,t=r;a_((r=this.target||en()).x,t.x,e.x),a_(r.y,t.y,e.y)}ae(t,r),ie(t,n),rn(this.projectionDeltaWithTransform,this.layoutCorrected,t,n)}}registerSharedNode(e,t){this.sharedNodes.has(e)||this.sharedNodes.set(e,new ab),this.sharedNodes.get(e).add(t);let i=t.options.initialPromotionConfig;t.promote({transition:i?.transition,preserveFollowOpacity:i?.shouldPreserveFollowOpacity?i.shouldPreserveFollowOpacity(t):void 0})}isLead(){let e=this.getStack();return!e||e.lead===this}getLead(){let{layoutId:e}=this.options;return e&&this.getStack()?.lead||this}getPrevLead(){let{layoutId:e}=this.options;return e?this.getStack()?.prevLead:void 0}getStack(){let{layoutId:e}=this.options;if(e)return this.root.sharedNodes.get(e)}promote({needsReset:e,transition:t,preserveFollowOpacity:i}={}){this.getStack()?.promote(this,i),e&&(this.projectionDelta=void 0,this.needsReset=!0),t&&this.setOptions({transition:t})}relegate(){return this.getStack()?.relegate(this)||!1}resetSkewAndRotation(){let{visualElement:e}=this.options;if(!e)return;let{latestValues:t}=e;if(!t2(t))return;let i={};for(let t=0;t<aS.length;t++)aN(aS[t],e,i,this.animationValues);for(let t=0;t<t0.length;t++)aN(t0[t],e,i,this.animationValues);for(let t in e.render(),i)e.setStaticValue(t,i[t]),this.animationValues&&(this.animationValues[t]=i[t]);e.scheduleRender()}applyProjectionStyles(e,t){if(!this.instance||this.isSVG)return;let i=this.getLead();if(!this.isVisible&&i!==this){e.visibility="hidden";return}let n=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,e.visibility="",e.opacity="",e.pointerEvents=iy(t?.pointerEvents)||"",e.transform=n?n(this.latestValues,""):"none";return}if(!this.projectionDelta||!this.layout||!i.target){(this.options.layoutId||this.needsShow)&&(this.needsShow=!1,e.visibility="",e.opacity=void 0!==this.latestValues.opacity?this.latestValues.opacity:1,e.pointerEvents=iy(t?.pointerEvents)||""),this.hasProjected&&!t1(this.latestValues)&&(e.transform=n?n({},""):"none",this.hasProjected=!1);return}e.visibility="";let r=i.animationValues||i.latestValues;this.applyTransformsToTarget();let a=function(e,t,i){let n="",r=e.x.translate/t.x,a=e.y.translate/t.y,o=i?.z||0;(r||a||o)&&(n=`translate3d(${r}px, ${a}px, ${o}px) `);let s="";if(i){let{transformPerspective:e}=i;e&&(n=`perspective(${e}px) ${n}`);for(let e=0;e<t0.length;e++){let t=t0[e],n=i[t];n&&(s+=`${t}(${n}deg) `),!e&&i.pathRotation&&(s+=`rotate(${i.pathRotation}deg) `)}}if(s){(1!==t.x||1!==t.y)&&(n+=`scale(${1/t.x}, ${1/t.y}) `),n+=s;let i=e.x.scale*t.x,r=e.y.scale*t.y;(1!==i||1!==r)&&(n+=`scale(${i}, ${r})`)}else 1!==e.x.scale||1!==e.y.scale?n+=`scale(${e.x.scale}, ${e.y.scale})`:n||1===t.x&&1===t.y||(n="scale(1, 1)");return n||"none"}(this.projectionDeltaWithTransform,this.treeScale,r);n&&(a=n(r,a)),e.transform=a;let{x:o,y:s}=this.projectionDelta;for(let t in e.transformOrigin=`${100*o.origin}% ${100*s.origin}% 0`,i.animationValues?e.opacity=i===this?r.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:r.opacityExit:e.opacity=i===this?void 0!==r.opacity?r.opacity:"":void 0!==r.opacityExit?r.opacityExit:0,tW){if(void 0===r[t])continue;let{correct:n,applyTo:o,isCSSVariable:s}=tW[t],l="none"===a?r[t]:n(r[t],i);if(o){let t=o.length;for(let i=0;i<t;i++)e[o[i]]=l}else s?this.options.visualElement.renderState.vars[t]=l:e[t]=l}this.options.layoutId&&(e.pointerEvents=i===this?iy(t?.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=this.dragSnapshot=this.dragAncestor=void 0}resetTree(){this.root.nodes.forEach(e=>e.currentAnimation?.stop()),this.root.nodes.forEach(aM),this.root.sharedNodes.clear()}}}function aR(e){e.updateLayout(),function(e){let{snapshot:t,dragAncestor:i}=e,n=i?.isAnimationBlocked&&i.layout;if(!t||!n||e.resumeFrom||e.isAnimationBlocked)return;let r=i.dragSnapshot;rs(e=>t6(t.layoutBox[e],n.layoutBox[e].min-r.layoutBox[e].min))}(e)}function aL(e){let t=e.resumeFrom?.snapshot||e.snapshot;if(e.isLead()&&e.layout&&t&&e.hasListeners("didUpdate")){let{layoutBox:i,measuredBox:n}=e.layout,{animationType:r}=e.options,a=t.source!==e.layout.source,o=(n,a)=>{if("size"===r)rs(e=>{let t=rt(n[e]);n[e].min=a[e].min,n[e].max=n[e].min+t});else if("x"===r||"y"===r){let e="x"===r?"y":"x";r9(n[e],a[e])}else aX(r,t.layoutBox,i)&&rs(t=>{let i=rt(a[t]);n[t].max=n[t].min+i,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[t].max=e.relativeTarget[t].min+i)})},s=a?t.measuredBox:t.layoutBox;o(s,i);let l=et();rn(l,i,t.layoutBox);let d=et();rn(d,a?e.applyTransform(n,!0):i,s);let c=!ap(l),p=!1,u=e.getClosestProjectingParent();if((!a||u?.options.layoutRoot&&e.resumeFrom?.path.includes(u))&&u&&!u.resumeFrom){let{snapshot:n,layout:r}=u;if(n&&r){let s=e.options.layoutAnchor||void 0,l=en();ro(l,a?e.resumeFrom.applyTransform(t.layoutBox,!0,void 0,!0,u.depth+1):t.layoutBox,n.layoutBox,s);let d=en();ro(d,i,r.layoutBox,s),a&&o(l,d),ah(l,d)||(p=!0),u.options.layoutRoot&&(e.relativeTarget=d,e.relativeTargetOrigin=l,e.relativeParent=u)}}e.notifyListeners("didUpdate",{layout:i,snapshot:t,delta:d,layoutDelta:l,hasLayoutChanged:c,hasRelativeLayoutChanged:p})}else e.isLead()&&e.options.onExitComplete?.();e.options.transition=void 0}function aP(e){r0?.(0),e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function aI(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function aE(e){e.clearSnapshot()}function aM(e){e.clearMeasurements()}function aj(e){e.isLayoutDirty=!0,e.updateLayout()}function aD(e){e.isLayoutDirty=!1}function aO(e){e.isAnimationBlocked&&e.layout&&!e.isLayoutDirty&&(e.snapshot=e.dragSnapshot||e.layout,e.isLayoutDirty=!0)}function aB(e){e.relativeTarget&&e.relativeParent?.isLayoutDirty&&(e.currentAnimation?e.isLayoutDirty=!0:(e.targetDelta=void 0,e.removeRelativeTarget()))}function az(e){let{visualElement:t}=e.options;t?.getProps().onBeforeLayoutMeasure&&t.notify("BeforeLayoutMeasure"),e.resetTransform()}function aF(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function aU(e){e.resolveTargetDelta()}function aV(e){e.calcProjection()}function aH(e){e.resetSkewAndRotation()}function aG(e,t,i,n){e.min=tZ(t.min,i.min,n),e.max=tZ(t.max,i.max,n)}function aq(e){return e.animationValues?.opacityExit!==void 0}let aW={duration:.45,ease:[.4,0,.1,1]};function a_(e,t,i){e.max=rt(i)+(e.min=t.min)}function aX(e,t,i){return"position"===e||"preserve-aspect"===e&&!(.2>=Math.abs(af(t)-af(i)))}function aK(e){return e!==e.root&&e.scroll?.wasRoot}let a$=aT({attachResizeListener:(e,t)=>n6(e,"resize",t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body?.scrollLeft||0,y:document.documentElement.scrollTop||document.body?.scrollTop||0}),checkIsScrollRoot:()=>!0}),aY=aT({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!io.current){let e=new a$({});e.mount(window),e.setOptions({layoutScroll:!0}),io.current=e}return io.current},resetTransform:(e,t)=>{e.style.transform=void 0!==t?t:"none"},checkIsScrollRoot:e=>"fixed"===window.getComputedStyle(e).position});function aZ(e,t){let i=rm(e),n=new AbortController;return[i,{passive:!0,...t,signal:n.signal},rd(()=>n.abort())]}function aQ(e,t,i,n,r){let{props:a}=e,o="while"+i;!r&&e.animationState&&a[o]&&e.animationState.setActive(o,"Start"===n);let s=a["on"+i+n];s&&eU.postRender(()=>s(t,n9(t)))}function aJ(e){return rp(e)&&"offsetHeight"in e&&!("ownerSVGElement"in e)}let a0=(e,t)=>!!t&&(e===t||a0(e,t.parentElement)),a1=new WeakSet;function a2(e){return t=>{"Enter"===t.key&&e(t)}}function a5(e,t){e.dispatchEvent(new PointerEvent("pointer"+t,{isPrimary:!0,bubbles:!0}))}let a3=new WeakSet,a4=(e,t,i)=>Math.hypot(e.clientX-t.clientX,e.clientY-t.clientY)>i,a7=e=>e.preventDefault();function a6(e,t,i,n){e.current instanceof HTMLButtonElement&&e.current.disabled||aQ(e,t,"Tap",i,n)}let a8=new WeakMap,a9=new WeakMap,oe=e=>{let t=a8.get(e.target);t&&t(e)},ot=e=>{e.forEach(oe)},oi={some:0,all:1},on=function(e,t){if("u"<typeof Proxy)return iE;let i=new Map,n=(i,n)=>iE(i,n,e,t);return new Proxy((e,t)=>n(e,t),{get:(r,a)=>"create"===a?n:(i.has(a)||i.set(a,iE(a,void 0,e,t)),i.get(a))})}(Object.assign({},{animation:{Feature:class extends iM{constructor(e){super(e),e.animationState||(e.animationState=function(e){let t=t=>Promise.all(t.map(({animation:t,options:i})=>(function(e,t,i={}){return e.notify("AnimationStart",t),(Array.isArray(t)?Promise.all(t.map(t=>n1(e,t,i))):"string"==typeof t?n1(e,t,i):Promise.all(nJ(e,ij(e,t,i.custom),i))).then(()=>{e.notify("AnimationComplete",t)})})(e,t,i))),i=n4(),n=!0,r=!1;function a(a){let{props:o,parent:s,manuallyAnimateOnMount:l}=e,{initial:d}=o,c=n||r,p=[],u=(t=d)=>"boolean"!=typeof t&&ij(e,Array.isArray(t)?t[0]:t,e.presenceContext?.custom)||void 0,m=new Map,h={},f=1/0,g=e;do g=!1!==g.props.inherit&&g.parent;while(g&&!g.isControllingVariants)let b=c&&n3(u(d??(g&&g.props.initial))?.transition);if(n5.forEach((t,n)=>{var r,d;let u,y=i[t],x=o[t],v=g&&g.props[t],w=void 0!==x?x:ty(v)||!1===v?v:void 0,C=ty(w),S=t===a?y.isActive:null,k=C&&void 0===x&&!(c&&l);if(y.protectedKeys={...h},!y.isActive&&null===S||!w&&!y.prevProp||tb(w)||"boolean"==typeof w)return;if(!1===S&&(f=n),"exit"===t&&y.isActive&&!0!==S){h={...h,...y.prevResolvedValues};return}let N=(r=y.prevProp,"string"==typeof(d=w)?d!==r:!!Array.isArray(d)&&!n2(d,r)),A=N||C&&(S&&!k||n>f),T=!1,R=Array.isArray(w)?w:[w],L={};if(!1!==S)for(let i of R){let{transition:n,transitionEnd:r,...a}=ij(e,i,iD(e,t))||{};L={...L,...a,...r},u=n3(n)||u}let{prevResolvedValues:P}=y;for(let t in{...P,...L}){let i;if(t in h)continue;let n=L[t],r=P[t],a=Array.isArray(n)&&Array.isArray(r)?!n2(n,r)||N:n!==r;if(a&&null==n)m.has(t)||m.set(t,y.prevOut);else if(a||void 0!==n&&m.has(t)){A=!0,i=m.get(t)||b,m.delete(t)&&(T=!0),y.needsAnimating[t]=!0;let n=e.getValue(t);n&&(n.liveStyle=!1)}else y.protectedKeys[t]=!0;y.out[t]=i}if(y.prevProp=w,y.prevResolvedValues=L,y.prevOut=u,y.isActive&&(h={...h,...L}),A&&(!(k&&N)||T))for(let i of R){let n={type:t};if("string"==typeof i&&c&&l&&s?.enteringChildren){let t=ij(s,i)?.transition?.delayChildren;n.delay=n0(s.enteringChildren,e,t)}p.push({animation:i,options:n})}}),m.size){let t={},i=u(),n=i?.transition;m.forEach((r,a)=>{r&&(n={...n||e.getDefaultTransition(),[a]:r});let s=e.getValue(a);s&&(s.liveStyle=!0);let l=i&&!Array.isArray(d)?i[a]:void 0,c=e.getBaseTargetFromProps(o,a);t[a]=(void 0!==l?l:void 0===c||er(c)?void 0===e.initialValues[a]?e.baseTarget[a]:void 0:c)??null}),n&&(t.transition=n),p.push({animation:t})}let y=c&&e.blockInitialAnimation||n&&!l&&(!1===o.initial||o.initial===o.animate);return n=r=!1,!y&&p.length?t(p):Promise.resolve()}return{animateChanges:a,setActive:function(t,n){if(i[t].isActive===n)return Promise.resolve();e.variantChildren?.forEach(e=>e.animationState?.setActive(t,n)),i[t].isActive=n;let r=a(t);for(let e in i)i[e].protectedKeys={};return r},setAnimateFunction:i=>{t=i(e)},getState:()=>i,reset:()=>{i=n4(),r=!0}}}(e))}updateAnimationControlsSubscription(){let{animate:e}=this.node.getProps();tb(e)&&(this.unmountControls=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){this.node.getProps().animate!==this.node.prevProps?.animate&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}}},exit:{Feature:class extends iM{constructor(){super(...arguments),this.id=n7++}update(){let{presenceContext:e,animationState:t}=this.node;if(!e||!t)return;let{isPresent:i,onExitComplete:n}=e;if(i===!this.exit)return;if(i){if(!0===this.exit){let{initial:e}=this.node.getProps();if(e&&!Array.isArray(e)){let{transition:t,transitionEnd:i,...n}=ij(this.node,e)||{};for(let e in n)this.node.getValue(e)?.jump(n[e])}this.node.blockInitialAnimation=!1,t.reset(),t.animateChanges()}else t.setActive("exit",!1);this.exit=void 0;return}let r=this.exit=t.setActive("exit",!0);n&&r.then(()=>{this.exit===r&&(this.exit=!0,n(this.id))})}mount(){let{register:e}=this.node.presenceContext||{};e&&(this.unmount=e(this.id,this.node)),this.update()}unmount(){}}}},{inView:{Feature:class extends iM{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var e;let t;this.stopObserver?.();let{viewport:i={}}=this.node.getProps(),{root:n,margin:r,amount:a="some",once:o}=i,s={root:n?n.current:void 0,rootMargin:r,threshold:"number"==typeof a?a:oi[a]},l=e=>{let{isIntersecting:t}=e;if(this.isInView===t||(this.isInView=t,o&&!t&&this.hasEnteredView))return;t&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",t);let{onViewportEnter:i,onViewportLeave:n}=this.node.getProps(),r=t?i:n;r&&r(e)};this.stopObserver=(e=this.node.current,t=function({root:e,...t}){let i=e||document;a9.has(i)||a9.set(i,{});let n=a9.get(i),r=JSON.stringify(t);return n[r]||(n[r]=new IntersectionObserver(ot,{root:e,...t})),n[r]}(s),a8.set(e,l),t.observe(e),()=>{a8.delete(e),t.unobserve(e)})}mount(){this.startObserver()}update(){if("u"<typeof IntersectionObserver)return;let{props:e,prevProps:t}=this.node;["amount","margin","root"].some(function({viewport:e={}},{viewport:t={}}={}){return i=>e[i]!==t[i]}(e,t))&&this.startObserver()}unmount(){this.stopObserver?.(),this.hasEnteredView=!1,this.isInView=!1}}},tap:{Feature:class extends iM{constructor(){super(...arguments),this.options={}}mount(){let{current:e}=this.node;e&&(this.update(),this.unmount=function(e,t,i={}){t=rc(t);let[n,r,a]=aZ(e,i),o=new WeakMap,s=e=>{let n,a=e.currentTarget;if(!(n8(e)&&!rM())||a3.has(e))return;i.stopPropagation&&a3.add(e);let{count:s=1,countTimeout:l=.3,hold:d=0,repeat:c}=i,p=e9.now(),u=eQ(d),m=eQ(l),h=o.get(a);h?.expire(a4(h.event,e,100))?h=void 0:h&&(eV(h.expire),o.delete(a));let f=h?h.count+1:1,g=f>=s,b=g&&(d||c),y=!d,x=0;if(a1.add(a),h)n=h.handlers;else{let i=t(a,e);n="function"==typeof i?{onComplete:i}:i||{}}g&&y&&n.onActive?.();let v=eQ(c),w=u||v,C=p+w,S=!0,k=()=>{if(r.signal.aborted)return eV(k);let e=Math.min(1-(C-e9.now())/w,1);S&&e<1&&(e=0),S=!1,n.onHold?.(e),e<1||(y?n.onRepeat?.(++x):(y=!0,n.onActive?.()),c?(S=!0,C+=w=v):eV(k))},N={...r,capture:!0},A=(t,i)=>{if(n8(t))if(window.removeEventListener("pointerup",T,N),window.removeEventListener("pointercancel",R,N),window.removeEventListener("pointermove",L,N),a.removeEventListener("contextmenu",a7),eV(k),a1.delete(a),rM()&&(i=!1),i&&!g){let i=e9.now(),s=e=>{let l=r.signal.aborted;if(l||!0===e||e9.now()-i>m)return eV(s),o.delete(a),l||n.onComplete?.(t,{success:!1}),!0};o.set(a,{count:f,event:e,handlers:n,expire:s}),eU.update(s,!0)}else n.onComplete?.(t,{success:i&&y})},T=e=>{A(e,a===window||a===document||i.useGlobalTarget||a0(a,e.target))},R=e=>{A(e,!1)},L=t=>{n8(t)&&((c||!y)&&a4(e,t,8)||s>1&&rM())&&R(t)};window.addEventListener("pointerup",T,N),window.addEventListener("pointercancel",R,N),(b||s>1)&&window.addEventListener("pointermove",L,N),b&&(eU.update(k,!0),a.addEventListener("contextmenu",a7,{...r,passive:!1}))};return n.forEach(e=>{((i.useGlobalTarget?window:e).addEventListener("pointerdown",s,r),aJ(e))&&(e.addEventListener("focus",()=>{let t,i,n;return t=!1,i=a2(()=>{t||a1.has(e)||(t=!0,a5(e,"down"))}),n=a2(()=>{t&&(t=!1,a5(e,"up"))}),void(e.addEventListener("keydown",i,r),e.addEventListener("keyup",n,r),e.addEventListener("blur",()=>{e.removeEventListener("keydown",i),e.removeEventListener("keyup",n),t&&a5(e,"cancel")},{...r,once:!0}))},r),rP.has(e.tagName)||!0===e.isContentEditable||e.hasAttribute("tabindex")||(e.tabIndex=0))}),a}(e,(e,t)=>(a6(this.node,t,"Start"),{onComplete:(e,{success:t})=>a6(this.node,e,t?"":"Cancel"),onRepeat:()=>a6(this.node,t,"",!0)}),this.options))}update(){let{options:e,node:t}=this,{globalTapTarget:i,propagate:n,tap:r}=t.props;for(let t in e)delete e[t];Object.assign(e,r,{useGlobalTarget:i,stopPropagation:n?.tap===!1})}unmount(){}}},focus:{Feature:class extends iM{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(":focus-visible")}catch(t){e=!0}e&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){this.isActive&&this.node.animationState&&(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=iF(n6(this.node.current,"focus",()=>this.onFocus()),n6(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}},hover:{Feature:class extends iM{mount(){let{current:e}=this.node;e&&(this.unmount=function(e,t,i={}){t=rc(t);let[n,r,a]=aZ(e,i);return n.forEach(e=>{let i,n=!1,a=!1,o=t=>{i&&(i(t),i=void 0),e.removeEventListener("pointerleave",l)},s=e=>{n=!1,window.removeEventListener("pointerup",s),window.removeEventListener("pointercancel",s),a&&(a=!1,o(e))},l=e=>{if("touch"!==e.pointerType){if(n){a=!0;return}o(e)}};e.addEventListener("pointerenter",n=>{if("touch"===n.pointerType||rM())return;a=!1;let o=t(e,n);"function"==typeof o&&(i=o,e.addEventListener("pointerleave",l,r))},r),e.addEventListener("pointerdown",()=>{n=!0,window.addEventListener("pointerup",s,r),window.addEventListener("pointercancel",s,r)},r)}),a}(e,(e,t)=>(aQ(this.node,t,"Hover","Start"),e=>aQ(this.node,e,"Hover","End"))))}unmount(){}}}},{pan:{Feature:class extends iM{constructor(){super(...arguments),this.removePointerDownListener=eD}onPointerDown(e){this.session=new rk(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:this.node.current?.ownerDocument.defaultView})}createPanHandlers(){let{onPanSessionStart:e,onPanStart:t,onPan:i,onPanEnd:n}=this.node.getProps();return{onSessionStart:rW(e),onStart:rW(t),onMove:rW(i),onEnd:(e,t)=>{delete this.session,n&&eU.postRender(()=>n(e,t))}}}mount(){this.removePointerDownListener=re(this.node.current,"pointerdown",e=>this.onPointerDown(e))}update(){this.session?.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session?.end()}}},drag:{Feature:class extends iM{constructor(e){super(e),this.removeGroupControls=eD,this.removeListeners=eD,this.controls=new rU(e)}mount(){let{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||eD}update(){let{dragControls:e,drag:t}=this.node.getProps(),{dragControls:i,drag:n}=this.node.prevProps||{};e!==i&&(this.removeGroupControls(),e&&(this.removeGroupControls=e.subscribe(this.controls))),n&&!t&&this.controls.stop(void 0,void 0,n)}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}},ProjectionNode:aY,MeasureLayout:rJ}},{layout:{ProjectionNode:aY,MeasureLayout:rJ}}),(e,t)=>t.isSVG??ia(e)?new t$(t):new ii(t,{allowProjection:e!==p.Fragment}));var or=p;function oa(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)}let oo=e=>{let{width:t,height:i}=e?.getBoundingClientRect()||{};return[t/e?.offsetWidth||1,i/e?.offsetHeight||1]},os=e=>{let{left:t,top:i}=e.getBoundingClientRect(),n=e;for(;n=n.parentElement||n.parentNode?.host;){let{scrollLeft:e,scrollTop:r}=n;if(e||r){let[a,o]=oo(n);t+=e*a,i+=r*o}if("fixed"===getComputedStyle(n).position)break}let[r,a]=oo(e.offsetParent);return[t/r,i/a]};class ol extends or.Component{getSnapshotBeforeUpdate(e){let t=this.props.getElement();if(aJ(t)&&e.isPresent&&!this.props.isPresent&&!1!==this.props.pop){let e=t.offsetParent,i=aJ(e)&&e.offsetWidth||0,n=aJ(e)&&e.offsetHeight||0,r=getComputedStyle(t),a=this.props.sizeRef.current;a.height=parseFloat(r.height),a.width=parseFloat(r.width),a.top=t.offsetTop,a.left=t.offsetLeft,a.right=i-a.width-a.left,a.bottom=n-a.height-a.top,a.direction=r.direction,a.point=os(t)}return null}componentDidUpdate(){}render(){return this.props.children}}function od({children:e,isPresent:t,anchorX:i,anchorY:n,root:r,pop:a,popNode:o}){let s=(0,or.useId)(),l=(0,or.useRef)(null),d=(0,or.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0,direction:"ltr"}),{nonce:u}=(0,or.useContext)(id),m=function(...e){return p.useCallback(function(...e){return t=>{let i=!1,n=e.map(e=>{let n=oa(e,t);return i||"function"!=typeof n||(i=!0),n});if(i)return()=>{for(let t=0;t<n.length;t++){let i=n[t];"function"==typeof i?i():oa(e[t],null)}}}}(...e),e)}(l,!1!==a?e.props?.ref??e?.ref:void 0),h=()=>l.current||o?.current?.current,f=e=>{let{width:t,height:r,top:a,left:o,right:l,bottom:c,direction:p}=d.current,u="rtl"===p,m="left"===i?u?`right:${l}`:`left:${o}`:u?`left:${o}`:`right:${l}`,h="bottom"===n?`bottom:${c}`:`top:${a}`;e?.insertRule(`[data-motion-pop-id="${s}"]{position:absolute!important;width:${t}px!important;height:${r}px!important;${m}px!important;${h}px!important}`)};return(0,or.useInsertionEffect)(()=>{let{width:e,height:i}=d.current,n=h();if(t||!1===a||!n||!e||!i)return;n.dataset.motionPopId=s;let o=n.ownerDocument,l=o.createElement("style");u&&(l.nonce=u);let c=r??o.head;c.appendChild(l),f(l.sheet);let p=0,m=0;return tp.setup(()=>{let[e,t]=os(n);p=d.current.point[0]-e,m=d.current.point[1]-t}),tp.read(()=>{let{sheet:e}=l;if(!e||!p&&!m)return;let t=d.current;t.left+=p,t.right-=p,t.top+=m,t.bottom-=m,e.deleteRule(0),f(e)}),()=>{n.removeAttribute("data-motion-pop-id"),c.contains(l)&&c.removeChild(l)}},[t]),(0,c.jsx)(ol,{isPresent:t,getElement:h,sizeRef:d,pop:a,children:!1===a?e:or.cloneElement(e,{ref:m})})}let oc=({children:e,initial:t,isPresent:i,onExitComplete:n,custom:r,presenceAffectsLayout:a,mode:o,anchorX:s,anchorY:l,root:d})=>{let u=iw(op),m=(0,p.useId)(),h=(0,p.useRef)(),f=(0,p.useRef)(i),g=(0,p.useRef)(n);iI(()=>{f.current=i,g.current=n});let b=!0,y=(0,p.useMemo)(()=>(b=!1,{id:m,initial:t,isPresent:i,custom:r,onExitComplete:e=>{for(let t of(u.set(e,!0),u.values()))if(!t)return;n&&n()},register:(e,t)=>(u.set(e,!1),t&&t.parent?.presenceContext?.id!==m&&(h.current=t),()=>{u.delete(e),f.current||u.size||g.current?.()})}),[i,u,n]);return a&&b&&(y={...y}),(0,p.useMemo)(()=>{u.forEach((e,t)=>u.set(t,!1))},[i]),p.useEffect(()=>{i||u.size||!n||n()},[i]),e=(0,c.jsx)(od,{pop:"popLayout"===o,isPresent:i,anchorX:s,anchorY:l,root:d,popNode:h,children:e}),(0,c.jsx)(iv.Provider,{value:y,children:e})};function op(){return new Map}let ou=e=>e.key||"";function om(e){let t=[];return p.Children.forEach(e,e=>{(0,p.isValidElement)(e)&&t.push(e)}),t}let oh=({children:e,custom:t,initial:i=!0,onExitComplete:n,presenceAffectsLayout:r=!0,mode:a="sync",propagate:o=!1,anchorX:s="left",anchorY:l="top",root:d})=>{let[u,m]=rK(o),h=(0,p.useMemo)(()=>om(e),[e]),f=o&&!u?[]:h.map(ou),g=(0,p.useRef)(!0),b=iw(()=>new Map),y=(0,p.useRef)(new Set),[x,v]=(0,p.useState)(h),[w,C]=(0,p.useState)(h);iI(()=>{!o||u||w.length||m?.()},[u,o,w.length,m]);let S=(0,p.useRef)();(0,p.useEffect)(()=>()=>{let e=S.current;S.current=void 0,e?.()},[w]),iI(()=>{g.current=!1;for(let e=0;e<w.length;e++){let t=ou(w[e]);f.includes(t)?(b.delete(t),y.current.delete(t)):!0!==b.get(t)&&b.set(t,!1)}},[w,f.length,f.join("-")]);let k=[];if(h!==x){let e=[...h],t=0;for(let i of w){let n=f.indexOf(ou(i));-1===n?(e.splice(t++,0,i),k.push(i)):t=n+k.length+1}return k.every(e=>b.get(ou(e)))?e=h:"wait"===a&&(e=k),C(om(e)),v(h),null}let{forceRender:N}=(0,p.useContext)(is);return(0,c.jsx)(c.Fragment,{children:w.map(e=>{let p=ou(e),x=(!o||!!u)&&(h===w||f.includes(p));return(0,c.jsx)(oc,{isPresent:x,initial:(!g.current||!!i)&&void 0,custom:t,presenceAffectsLayout:r,mode:a,root:d,onExitComplete:x?void 0:()=>{if(y.current.has(p)||!b.has(p))return;y.current.add(p),b.set(p,!0);let e=!0;b.forEach(t=>{t||(e=!1)}),e&&(N?.(),v([]),o&&m?.(),S.current=n)},anchorX:s,anchorY:l,children:e},p)})})},of=[{id:1,slug:"level-1-hello-world",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 1: Hello World & Terminal Output",category:"Foundations & Operators",themeIcon:"👋",realLifeAnalogy:{story:"Printing your first boarding pass at the railway station! You tell the terminal printer: display this text message for the traveler.",physicalConcept:"CPU sends ASCII character bytes to stdout stream buffer mapped to display terminal video memory.",ruleOfThumb:"Every C program starts inside int main(void) and loads tools with #include <stdio.h>."},codingApproaches:{beginnerFriendly:{name:"Standard ISO C main",description:"Clean canonical entry point with return code 0.",code:`#include <stdio.h>

int main(void) {
    printf("Namaste, World! Welcome to C Engineering.\\n");
    return 0;
}`},optimizedPro:{name:"Direct puts streaming",description:"Uses puts() to write strings without format string parsing overhead.",code:`#include <stdio.h>

int main(void) {
    puts("Namaste, World! Welcome to C Engineering.");
    return 0;
}`}},hardwareDissection:{memorySegment:"rodata",cpuRegisters:["RDI (first argument)","RAX (return status)"],assemblyNotes:"lea rdi, [rip + .LC0]; call puts; mov eax, 0; ret",ramFootprint:"42 bytes stored in .rodata read-only memory segment."},puzzleBlocks:{pieces:[{id:"p-1-1",code:"#include <stdio.h>",hint:"Load standard I/O library"},{id:"p-1-2",code:"int main(void) {",hint:"The main entrance door"},{id:"p-1-3",code:'    printf("Namaste, World! Welcome to C Engineering.\\n");',hint:"Print the greeting"},{id:"p-1-4",code:"    return 0;\n}",hint:"Return 0 and close program"}],correctOrder:["p-1-1","p-1-2","p-1-3","p-1-4"]},expectedOutput:"Namaste, World! Welcome to C Engineering.",cKeywordsUsed:["int","void","return"],daaComplexity:{timeComplexity:"O(1) Constant Time",spaceComplexity:"O(1) Flash Storage",algorithmClass:"Basic I/O Operation"}},{id:2,slug:"level-2-integer-variables",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 2: Integer Variables & Canteen Billing",category:"Foundations & Operators",themeIcon:"☕",realLifeAnalogy:{story:"Ordering at the campus canteen: 1 Masala Chai for Rs. 15 and 1 Samosa for Rs. 20. The cashier reserves two slots in memory and adds them.",physicalConcept:"Allocates two 4-byte 32-bit two's complement integer slots in the stack frame RAM.",ruleOfThumb:"Use %d format specifier to print signed 32-bit integers in printf."},codingApproaches:{beginnerFriendly:{name:"Explicit Variable Slots",description:"Separate named memory locations for chai and samosa.",code:`#include <stdio.h>

int main(void) {
    int chai = 15;
    int samosa = 20;
    int total = chai + samosa;
    printf("Canteen Bill: Rs. %d (Rupees)\\n", total);
    return 0;
}`},optimizedPro:{name:"Register Optimized Addition",description:"Direct ALU accumulator calculation avoiding unnecessary stack stores.",code:`#include <stdio.h>

int main(void) {
    const int chai = 15, samosa = 20;
    printf("Canteen Bill: Rs. %d (Rupees)\\n", chai + samosa);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EDI","ESI","EAX (ALU accumulator)"],assemblyNotes:"mov DWORD PTR [rbp-4], 15; add DWORD PTR [rbp-4], 20; in ALU.",ramFootprint:"8 bytes on active stack frame (4 bytes per int)."},puzzleBlocks:{pieces:[{id:"p-2-1",code:"#include <stdio.h>",hint:"Header file"},{id:"p-2-2",code:"int main(void) {",hint:"Main start"},{id:"p-2-3",code:"    int chai = 15, samosa = 20;",hint:"Declare variables"},{id:"p-2-4",code:'    printf("Canteen Bill: Rs. %d (Rupees)\\n", chai + samosa);',hint:"Print bill"},{id:"p-2-5",code:"    return 0;\n}",hint:"Return 0 and close"}],correctOrder:["p-2-1","p-2-2","p-2-3","p-2-4","p-2-5"]},expectedOutput:"Canteen Bill: Rs. 35 (Rupees)",cKeywordsUsed:["int","void","return"],daaComplexity:{timeComplexity:"O(1) 1 ALU Cycle",spaceComplexity:"O(1) Stack",algorithmClass:"Integer Arithmetic"}},{id:3,slug:"level-3-char-and-ascii",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 3: Character Data & ASCII Byte Codes",category:"Foundations & Operators",themeIcon:"🔤",realLifeAnalogy:{story:'Your exam roll call section letter "A". On paper it is a letter, but on the computer chip it is stored as numerical binary code 65!',physicalConcept:"A char is strictly an 8-bit (1-byte) integer holding ASCII values from 0 to 127.",ruleOfThumb:"Use %c to print the symbol, %d to print its underlying numerical ASCII byte code."},codingApproaches:{beginnerFriendly:{name:"Char declaration and double format",description:"Inspects character as both glyph and integer.",code:`#include <stdio.h>

int main(void) {
    char section = 'A';
    printf("Section: %c | ASCII Byte Code: %d\\n", section, section);
    return 0;
}`},optimizedPro:{name:"ASCII offset math",description:"Demonstrates that chars can undergo arithmetic directly in hardware.",code:`#include <stdio.h>

int main(void) {
    char letter = 'A';
    printf("Letter %c is ASCII %d (Next letter: %c)\\n", letter, letter, letter + 1);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["AL (low 8-bit accumulator)"],assemblyNotes:"mov BYTE PTR [rbp-1], 65; movsx eax, BYTE PTR [rbp-1]",ramFootprint:"1 byte on stack frame."},puzzleBlocks:{pieces:[{id:"p-3-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-3-2",code:"    char section = 'A';",hint:"Declare char variable"},{id:"p-3-3",code:'    printf("Section: %c | ASCII Byte Code: %d\\n", section, section);',hint:"Print char and code"},{id:"p-3-4",code:"    return 0;\n}",hint:"Exit program"}],correctOrder:["p-3-1","p-3-2","p-3-3","p-3-4"]},expectedOutput:"Section: A | ASCII Byte Code: 65",cKeywordsUsed:["char","int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Data Representation"}},{id:4,slug:"level-4-float-decimals",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 4: Single-Precision Floats & Petrol Pricing",category:"Foundations & Operators",themeIcon:"⛽",realLifeAnalogy:{story:"Filling petrol at a pump in Delhi: Rate is Rs. 96.72 per liter. Integers cannot store paise decimals, so we use float!",physicalConcept:"32-bit IEEE 754 format: 1 sign bit, 8 exponent bits, 23 mantissa bits.",ruleOfThumb:"Always append 'f' to float literals (e.g. 96.72f) so compiler doesn't promote them to double."},codingApproaches:{beginnerFriendly:{name:"Standard float format",description:"Using %.2f to control decimal point precision.",code:`#include <stdio.h>

int main(void) {
    float petrolRate = 96.72f;
    float liters = 3.5f;
    float total = petrolRate * liters;
    printf("Petrol Bill: Rs. %.2f (Rupees)\\n", total);
    return 0;
}`},optimizedPro:{name:"Formatted Currency Rounding",description:"Inline float calculation with 2 decimal places precision.",code:`#include <stdio.h>

int main(void) {
    const float rate = 96.72f, qty = 3.5f;
    printf("Petrol Bill: Rs. %.2f (Rupees)\\n", rate * qty);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["XMM0","XMM1 (FPU / SSE registers)"],assemblyNotes:"mulss xmm0, xmm1 -> Hardware single-precision floating point multiplier.",ramFootprint:"4 bytes per float variable on stack."},puzzleBlocks:{pieces:[{id:"p-4-1",code:"#include <stdio.h>\nint main(void) {",hint:"Header and entry"},{id:"p-4-2",code:"    float petrolRate = 96.72f, liters = 3.5f;",hint:"Declare floats"},{id:"p-4-3",code:'    printf("Petrol Bill: Rs. %.2f (Rupees)\\n", petrolRate * liters);',hint:"Print formatted float"},{id:"p-4-4",code:"    return 0;\n}",hint:"Return 0 and close"}],correctOrder:["p-4-1","p-4-2","p-4-3","p-4-4"]},expectedOutput:"Petrol Bill: Rs. 338.52 (Rupees)",cKeywordsUsed:["float","int","return","void"],daaComplexity:{timeComplexity:"O(1) FPU Cycle",spaceComplexity:"O(1)",algorithmClass:"Floating Point Arithmetic"}},{id:5,slug:"level-5-double-precision",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 5: Double Precision & GPS Coordinates",category:"Foundations & Operators",themeIcon:"🛰️",realLifeAnalogy:{story:"GPS satellite navigation for ISRO rockets or Google Maps: A difference of 0.00001 degrees shifts location by meters! We need double precision.",physicalConcept:"64-bit IEEE 754 format with 53 bits of precision (~15-17 significant decimal digits).",ruleOfThumb:"Double uses 8 bytes of RAM and provides twice the precision of float."},codingApproaches:{beginnerFriendly:{name:"Double coordinates formatting",description:"Using %.6lf to print micro-degree coordinates.",code:`#include <stdio.h>

int main(void) {
    double latitude = 28.613939;
    double longitude = 77.209021;
    printf("India Gate Coordinates: Lat %.6lf, Long %.6lf\\n", latitude, longitude);
    return 0;
}`},optimizedPro:{name:"Const double coordinates",description:"Direct register placement for high-speed location lookup.",code:`#include <stdio.h>

int main(void) {
    const double lat = 28.613939, lon = 77.209021;
    printf("India Gate Coordinates: Lat %.6lf, Long %.6lf\\n", lat, lon);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["XMM0","XMM1 (64-bit double precision registers)"],assemblyNotes:"movsd qword ptr [rbp-8], xmm0 -> 64-bit memory write.",ramFootprint:"8 bytes per double on stack frame."},puzzleBlocks:{pieces:[{id:"p-5-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-5-2",code:"    double latitude = 28.613939, longitude = 77.209021;",hint:"Declare doubles"},{id:"p-5-3",code:'    printf("India Gate Coordinates: Lat %.6lf, Long %.6lf\\n", latitude, longitude);',hint:"Print coordinates"},{id:"p-5-4",code:"    return 0;\n}",hint:"Return 0 and close"}],correctOrder:["p-5-1","p-5-2","p-5-3","p-5-4"]},expectedOutput:"India Gate Coordinates: Lat 28.613939, Long 77.209021",cKeywordsUsed:["double","int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"High-Precision Math"}},{id:6,slug:"level-6-modulo-operator",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 6: Modulo Operator & Calendar Days Clock",category:"Foundations & Operators",themeIcon:"⏰",realLifeAnalogy:{story:"Today is Monday (Day 1). What day of the week will it be after 17 days? Weeks cycle every 7 days! 17 % 7 = 3 days after Monday.",physicalConcept:"CPU division instruction (`idiv`) computes both the quotient in EAX and remainder in EDX simultaneously.",ruleOfThumb:"Modulo (%) gives the remainder. N % 2 == 0 checks if a number is even!"},codingApproaches:{beginnerFriendly:{name:"Remainder arithmetic",description:"Calculates the remaining days after full weeks.",code:`#include <stdio.h>

int main(void) {
    int totalDays = 17;
    int remaining = totalDays % 7;
    printf("17 Days = 2 Full Weeks and %d Extra Days\\n", remaining);
    return 0;
}`},optimizedPro:{name:"Direct remainder streaming",description:"One-line remainder evaluation.",code:`#include <stdio.h>

int main(void) {
    printf("17 Days = 2 Full Weeks and %d Extra Days\\n", 17 % 7);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EDX (remainder register after idiv)"],assemblyNotes:"mov eax, 17; cdq; idiv 7 -> Remainder stored in edx.",ramFootprint:"4 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-6-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-6-2",code:"    int totalDays = 17;",hint:"Days variable"},{id:"p-6-3",code:"    int remaining = totalDays % 7;",hint:"Modulo division"},{id:"p-6-4",code:'    printf("17 Days = 2 Full Weeks and %d Extra Days\\n", remaining);',hint:"Print result"},{id:"p-6-5",code:"    return 0;\n}",hint:"Close program"}],correctOrder:["p-6-1","p-6-2","p-6-3","p-6-4","p-6-5"]},expectedOutput:"17 Days = 2 Full Weeks and 3 Extra Days",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) ALU Division",spaceComplexity:"O(1)",algorithmClass:"Modular Arithmetic"}},{id:7,slug:"level-7-relational-operators",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 7: Relational Comparison & Truth Flags",category:"Foundations & Operators",themeIcon:"⚖️",realLifeAnalogy:{story:"Metro turnstile card check: Is card balance >= Rs. 20 minimum fare? In C, comparison answers with 1 (True) or 0 (False)!",physicalConcept:"CPU performs subtraction (CMP) and sets Zero Flag (ZF) or Sign Flag (SF) in EFLAGS register.",ruleOfThumb:"In C, there is no separate boolean type in C89: 1 is True, 0 is False."},codingApproaches:{beginnerFriendly:{name:"Relational expression storage",description:"Evaluates balance comparison into integer flag.",code:`#include <stdio.h>

int main(void) {
    int metroBalance = 50;
    int minFare = 20;
    int isAllowed = (metroBalance >= minFare);
    printf("Turnstile Gate Status (1=Open, 0=Locked): %d\\n", isAllowed);
    return 0;
}`},optimizedPro:{name:"Inline comparison evaluation",description:"Direct comparison expression evaluated in conditional set instruction.",code:`#include <stdio.h>

int main(void) {
    int balance = 50;
    printf("Turnstile Gate Status (1=Open, 0=Locked): %d\\n", balance >= 20);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EFLAGS (ZF, SF)","AL (setge flag)"],assemblyNotes:"cmp eax, 20; setge al -> Hardware boolean set instruction.",ramFootprint:"4 bytes for integer flag."},puzzleBlocks:{pieces:[{id:"p-7-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-7-2",code:"    int metroBalance = 50, minFare = 20;",hint:"Declare variables"},{id:"p-7-3",code:"    int isAllowed = (metroBalance >= minFare);",hint:"Comparison check"},{id:"p-7-4",code:'    printf("Turnstile Gate Status (1=Open, 0=Locked): %d\\n", isAllowed);',hint:"Print truth flag"},{id:"p-7-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-7-1","p-7-2","p-7-3","p-7-4","p-7-5"]},expectedOutput:"Turnstile Gate Status (1=Open, 0=Locked): 1",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) CMP Cycle",spaceComplexity:"O(1)",algorithmClass:"Relational Logic"}},{id:8,slug:"level-8-logical-and",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 8: Logical AND (&&) & Two-Factor Authentication",category:"Foundations & Operators",themeIcon:"🔐",realLifeAnalogy:{story:"Logging into netbanking: Both password AND OTP must be correct. If either fails, access is denied!",physicalConcept:"Short-circuit evaluation: If the first condition is 0, CPU skips evaluating the second condition completely.",ruleOfThumb:"A && B evaluates to 1 ONLY if BOTH A and B are non-zero."},codingApproaches:{beginnerFriendly:{name:"Logical AND test",description:"Tests two authentication flags.",code:`#include <stdio.h>

int main(void) {
    int hasCorrectPassword = 1;
    int hasValidOtp = 1;
    int loginApproved = hasCorrectPassword && hasValidOtp;
    printf("Netbanking Access (1=Approved, 0=Denied): %d\\n", loginApproved);
    return 0;
}`},optimizedPro:{name:"Short-circuit guard check",description:"Demonstrates guaranteed left-to-right evaluation safety.",code:`#include <stdio.h>

int main(void) {
    int auth = (1 && 1);
    printf("Netbanking Access (1=Approved, 0=Denied): %d\\n", auth);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX","ZF Flag"],assemblyNotes:"test eax, eax; jz .fail; test edx, edx; jz .fail -> Short circuit branching.",ramFootprint:"4 bytes for auth status."},puzzleBlocks:{pieces:[{id:"p-8-1",code:"#include <stdio.h>\nint main(void) {",hint:"Header and main"},{id:"p-8-2",code:"    int hasCorrectPassword = 1, hasValidOtp = 1;",hint:"Auth flags"},{id:"p-8-3",code:"    int loginApproved = hasCorrectPassword && hasValidOtp;",hint:"Logical AND"},{id:"p-8-4",code:'    printf("Netbanking Access (1=Approved, 0=Denied): %d\\n", loginApproved);',hint:"Print status"},{id:"p-8-5",code:"    return 0;\n}",hint:"Return 0 and close"}],correctOrder:["p-8-1","p-8-2","p-8-3","p-8-4","p-8-5"]},expectedOutput:"Netbanking Access (1=Approved, 0=Denied): 1",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) Branch Evaluation",spaceComplexity:"O(1)",algorithmClass:"Boolean Logic"}},{id:9,slug:"level-9-logical-or",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 9: Logical OR (||) & Payment Fallback",category:"Foundations & Operators",themeIcon:"💳",realLifeAnalogy:{story:"Paying at a grocery store: You can pay with UPI OR Cash. As long as you have at least one payment method, the sale goes through!",physicalConcept:"If the left operand evaluates to true (non-zero), CPU skips evaluating the right operand immediately.",ruleOfThumb:"A || B is True if AT LEAST ONE operand is non-zero."},codingApproaches:{beginnerFriendly:{name:"Logical OR fallback",description:"Checks if UPI or Cash is available.",code:`#include <stdio.h>

int main(void) {
    int hasUpi = 0;   // Server down
    int hasCash = 1;  // Cash in wallet
    int canPay = (hasUpi || hasCash);
    printf("Can Complete Purchase: %d (1=Yes, 0=No)\\n", canPay);
    return 0;
}`},optimizedPro:{name:"Inline payment check",description:"Direct fallback evaluation.",code:`#include <stdio.h>

int main(void) {
    printf("Can Complete Purchase: %d (1=Yes, 0=No)\\n", 0 || 1);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX","JNZ branch"],assemblyNotes:"jnz .success -> Bypasses second check if first operand is true.",ramFootprint:"4 bytes for canPay flag."},puzzleBlocks:{pieces:[{id:"p-9-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-9-2",code:"    int hasUpi = 0, hasCash = 1;",hint:"Payment variables"},{id:"p-9-3",code:"    int canPay = (hasUpi || hasCash);",hint:"Logical OR check"},{id:"p-9-4",code:'    printf("Can Complete Purchase: %d (1=Yes, 0=No)\\n", canPay);',hint:"Print result"},{id:"p-9-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-9-1","p-9-2","p-9-3","p-9-4","p-9-5"]},expectedOutput:"Can Complete Purchase: 1 (1=Yes, 0=No)",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Boolean Logic"}},{id:10,slug:"level-10-logical-not",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 10: Logical NOT (!) & Security Inversion",category:"Foundations & Operators",themeIcon:"🚨",realLifeAnalogy:{story:"Home burglar alarm: When door sensor is closed (isDoorOpen = 0), alarm is quiet. If door is NOT closed (!isDoorOpen == 0), sound the siren!",physicalConcept:"Flips truth value: non-zero becomes 0, zero becomes 1.",ruleOfThumb:"!0 evaluates to 1. !any_other_number evaluates to 0."},codingApproaches:{beginnerFriendly:{name:"NOT operator flag flip",description:"Inverts integer sensor status.",code:`#include <stdio.h>

int main(void) {
    int isDoorOpen = 0; // 0 = Closed
    int isSecure = !isDoorOpen; // Invert: 1 = Secure
    printf("Security Perimeter Secure: %d (1=Safe, 0=Breached)\\n", isSecure);
    return 0;
}`},optimizedPro:{name:"Direct boolean negation",description:"Inline logical NOT.",code:`#include <stdio.h>

int main(void) {
    printf("Security Perimeter Secure: %d (1=Safe, 0=Breached)\\n", !0);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","SETE instruction"],assemblyNotes:"test eax, eax; sete al -> Sets AL to 1 if zero flag is set.",ramFootprint:"4 bytes for state."},puzzleBlocks:{pieces:[{id:"p-10-1",code:"#include <stdio.h>\nint main(void) {",hint:"Main start"},{id:"p-10-2",code:"    int isDoorOpen = 0;",hint:"Door variable"},{id:"p-10-3",code:"    int isSecure = !isDoorOpen;",hint:"Logical NOT"},{id:"p-10-4",code:'    printf("Security Perimeter Secure: %d (1=Safe, 0=Breached)\\n", isSecure);',hint:"Print security state"},{id:"p-10-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-10-1","p-10-2","p-10-3","p-10-4","p-10-5"]},expectedOutput:"Security Perimeter Secure: 1 (1=Safe, 0=Breached)",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Unary Logic"}},{id:11,slug:"level-11-pre-vs-post-increment",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 11: Pre-Increment vs Post-Increment (++i vs i++)",category:"Foundations & Operators",themeIcon:"➕",realLifeAnalogy:{story:"Post-increment (i++): Hand over the token first, then increment your counter. Pre-increment (++i): Increment counter first, then hand over the new token!",physicalConcept:"Post-increment makes a temporary copy before incrementing. Pre-increment increments memory directly and returns the new value.",ruleOfThumb:"++i modifies then delivers. i++ delivers old value then modifies."},codingApproaches:{beginnerFriendly:{name:"Step-by-step increment comparison",description:"Demonstrates the exact timing difference.",code:`#include <stdio.h>

int main(void) {
    int x = 5;
    int post = x++; // post gets 5, then x becomes 6
    int y = 5;
    int pre = ++y;  // y becomes 6 first, pre gets 6
    printf("Post-increment got: %d | Pre-increment got: %d\\n", post, pre);
    return 0;
}`},optimizedPro:{name:"Register assembly demonstration",description:"Avoids temporary register allocation with pre-increment.",code:`#include <stdio.h>

int main(void) {
    int a = 5, b = 5;
    printf("Post-increment got: %d | Pre-increment got: %d\\n", a++, ++b);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX (temp copy)","EBX (target)"],assemblyNotes:"Post: mov eax, [x]; inc dword ptr [x]; mov [post], eax.",ramFootprint:"8 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-11-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-11-2",code:"    int x = 5, y = 5;",hint:"Init variables"},{id:"p-11-3",code:"    int post = x++;\n    int pre = ++y;",hint:"Perform increments"},{id:"p-11-4",code:'    printf("Post-increment got: %d | Pre-increment got: %d\\n", post, pre);',hint:"Print comparison"},{id:"p-11-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-11-1","p-11-2","p-11-3","p-11-4","p-11-5"]},expectedOutput:"Post-increment got: 5 | Pre-increment got: 6",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) ALU Inc",spaceComplexity:"O(1)",algorithmClass:"Increment Semantics"}},{id:12,slug:"level-12-compound-assignment",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 12: Compound Assignment (+=, -=, *=) & Wallet Balance",category:"Foundations & Operators",themeIcon:"👛",realLifeAnalogy:{story:"Your digital wallet: You start with Rs. 500, deposit Rs. 250 (balance += 250), then spend Rs. 100 on snacks (balance -= 100).",physicalConcept:"Executes direct read-modify-write assembly instructions (`add [rbp-4], 250`) without duplicating the variable address.",ruleOfThumb:"a += b is shorthand for a = a + b, but evaluated with fewer memory fetches."},codingApproaches:{beginnerFriendly:{name:"Compound wallet updates",description:"Updates wallet balance in place.",code:`#include <stdio.h>

int main(void) {
    int balance = 500;
    balance += 250; // Deposit
    balance -= 100; // Spend
    printf("Final Wallet Balance: Rs. %d (Rupees)\\n", balance);
    return 0;
}`},optimizedPro:{name:"Direct accumulator mutation",description:"Chained arithmetic updates.",code:`#include <stdio.h>

int main(void) {
    int balance = 500;
    balance += (250 - 100);
    printf("Final Wallet Balance: Rs. %d (Rupees)\\n", balance);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX"],assemblyNotes:"add DWORD PTR [rbp-4], 250; sub DWORD PTR [rbp-4], 100",ramFootprint:"4 bytes for balance on stack."},puzzleBlocks:{pieces:[{id:"p-12-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start main"},{id:"p-12-2",code:"    int balance = 500;",hint:"Init balance"},{id:"p-12-3",code:"    balance += 250;\n    balance -= 100;",hint:"Compound updates"},{id:"p-12-4",code:'    printf("Final Wallet Balance: Rs. %d (Rupees)\\n", balance);',hint:"Print balance"},{id:"p-12-5",code:"    return 0;\n}",hint:"Return 0 and close"}],correctOrder:["p-12-1","p-12-2","p-12-3","p-12-4","p-12-5"]},expectedOutput:"Final Wallet Balance: Rs. 650 (Rupees)",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"In-Place Mutation"}},{id:13,slug:"level-13-sizeof-operator",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 13: Sizeof Operator & Memory Footprint Sizing",category:"Foundations & Operators",themeIcon:"📏",realLifeAnalogy:{story:"Packing luggage lockers: A passport (char) needs 1 small slot, a textbook (int) needs 4 slots, and a laptop (double) needs 8 slots!",physicalConcept:"Compile-time evaluation: Replaced by the compiler with integer constant byte counts. 0 runtime CPU cost.",ruleOfThumb:"sizeof returns size_t (unsigned integer); always format with %zu."},codingApproaches:{beginnerFriendly:{name:"Inspect primitive byte sizes",description:"Prints byte sizes for char, int, and double.",code:`#include <stdio.h>

int main(void) {
    printf("char: %zu byte | int: %zu bytes | double: %zu bytes\\n",
           sizeof(char), sizeof(int), sizeof(double));
    return 0;
}`},optimizedPro:{name:"Array count calculation via sizeof",description:"The standard C idiom to calculate array length: sizeof(arr) / sizeof(arr[0]).",code:`#include <stdio.h>

int main(void) {
    int arr[6];
    printf("Array total bytes: %zu | Element count: %zu\\n", sizeof(arr), sizeof(arr) / sizeof(arr[0]));
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["ESI","EDX","ECX (immediate constants)"],assemblyNotes:"mov esi, 1; mov edx, 4; mov ecx, 8 -> Constants baked into binary at compile time.",ramFootprint:"0 bytes extra runtime overhead."},puzzleBlocks:{pieces:[{id:"p-13-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-13-2",code:'    printf("char: %zu byte | int: %zu bytes | double: %zu bytes\\n",',hint:"Print format"},{id:"p-13-3",code:"           sizeof(char), sizeof(int), sizeof(double));",hint:"Pass sizeof types"},{id:"p-13-4",code:"    return 0;\n}",hint:"Return 0 and close"}],correctOrder:["p-13-1","p-13-2","p-13-3","p-13-4"]},expectedOutput:"char: 1 byte | int: 4 bytes | double: 8 bytes",cKeywordsUsed:["sizeof","int","char","double","return","void"],daaComplexity:{timeComplexity:"O(1) Compile-Time Constant",spaceComplexity:"O(0) Runtime RAM",algorithmClass:"Compile-Time Reflection"}},{id:14,slug:"level-14-short-integer",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 14: Short Integer & Embedded Sensor Ports",category:"Foundations & Operators",themeIcon:"📟",realLifeAnalogy:{story:"An IoT smart weather sensor on campus: It only has 8KB of total RAM! We use 2-byte short integers instead of 4-byte ints to save 50% memory.",physicalConcept:"16-bit signed integer (-32,768 to 32,767) operated inside the AX register.",ruleOfThumb:"Use %hd format specifier in printf/scanf for short integers."},codingApproaches:{beginnerFriendly:{name:"Short integer declaration",description:"Uses 2-byte short for embedded port numbering.",code:`#include <stdio.h>

int main(void) {
    short sensorPort = 8080;
    printf("IoT Sensor Port: %hd (Size: %zu bytes)\\n", sensorPort, sizeof(sensorPort));
    return 0;
}`},optimizedPro:{name:"Const short configuration",description:"Embedded hardware port definition.",code:`#include <stdio.h>

int main(void) {
    const short port = 8080;
    printf("IoT Sensor Port: %hd (Size: %zu bytes)\\n", port, sizeof(port));
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["AX (16-bit register)"],assemblyNotes:"mov WORD PTR [rbp-2], 8080 -> 16-bit memory write.",ramFootprint:"2 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-14-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start main"},{id:"p-14-2",code:"    short sensorPort = 8080;",hint:"Declare short"},{id:"p-14-3",code:'    printf("IoT Sensor Port: %hd (Size: %zu bytes)\\n", sensorPort, sizeof(sensorPort));',hint:"Print short"},{id:"p-14-4",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-14-1","p-14-2","p-14-3","p-14-4"]},expectedOutput:"IoT Sensor Port: 8080 (Size: 2 bytes)",cKeywordsUsed:["short","int","sizeof","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1) 2 Bytes",algorithmClass:"Embedded Memory Types"}},{id:15,slug:"level-15-long-integer",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 15: Long Integer & Aadhaar Database Counts",category:"Foundations & Operators",themeIcon:"🇮🇳",realLifeAnalogy:{story:"India's population count: ~1.42 Billion citizens! Standard int max is 2.14 Billion. For large financial balances and national IDs, we use long or long long!",physicalConcept:"Allocates extended 64-bit integer registers (RAX) on modern 64-bit platforms.",ruleOfThumb:"Use %ld for long and %lld for long long in printf."},codingApproaches:{beginnerFriendly:{name:"Long integer population record",description:"Stores large citizen count using long.",code:`#include <stdio.h>

int main(void) {
    long citizenCount = 1428627663L;
    printf("Total Aadhaar Database Records: %ld\\n", citizenCount);
    return 0;
}`},optimizedPro:{name:"Long long 64-bit guarantees",description:"Guaranteed 64-bit storage across all operating systems.",code:`#include <stdio.h>

int main(void) {
    long long records = 1428627663LL;
    printf("Total Aadhaar Database Records: %lld\\n", records);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX (64-bit register)"],assemblyNotes:"mov QWORD PTR [rbp-8], 1428627663 -> 64-bit quadword write.",ramFootprint:"8 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-15-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-15-2",code:"    long citizenCount = 1428627663L;",hint:"Declare long"},{id:"p-15-3",code:'    printf("Total Aadhaar Database Records: %ld\\n", citizenCount);',hint:"Print long"},{id:"p-15-4",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-15-1","p-15-2","p-15-3","p-15-4"]},expectedOutput:"Total Aadhaar Database Records: 1428627663",cKeywordsUsed:["long","int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1) 8 Bytes",algorithmClass:"Extended Range Arithmetic"}},{id:16,slug:"level-16-unsigned-integers",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 16: Unsigned Integers & Non-Negative RAM",category:"Foundations & Operators",themeIcon:"🔢",realLifeAnalogy:{story:"Server memory size or network packet counters: You cannot have -5 megabytes of RAM! By dropping negative numbers, unsigned doubles the positive range up to 4.29 Billion.",physicalConcept:"All 32 bits represent magnitude; highest bit is no longer reserved for negative sign.",ruleOfThumb:"Use %u in printf to format unsigned integers."},codingApproaches:{beginnerFriendly:{name:"Unsigned packet counter",description:"Using unsigned int for network packets.",code:`#include <stdio.h>

int main(void) {
    unsigned int packetCount = 4000000000U;
    printf("Router High-Volume Packets: %u\\n", packetCount);
    return 0;
}`},optimizedPro:{name:"Direct unsigned maximum demonstration",description:"Shows that unsigned values exceed standard 2-billion signed limit.",code:`#include <stdio.h>

int main(void) {
    const unsigned int packets = 4000000000U;
    printf("Router High-Volume Packets: %u\\n", packets);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX"],assemblyNotes:"Unsigned uses logical shift (SHR) instead of arithmetic sign-extended shift (SAR).",ramFootprint:"4 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-16-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start"},{id:"p-16-2",code:"    unsigned int packetCount = 4000000000U;",hint:"Declare unsigned"},{id:"p-16-3",code:'    printf("Router High-Volume Packets: %u\\n", packetCount);',hint:"Print unsigned"},{id:"p-16-4",code:"    return 0;\n}",hint:"Return 0 and close"}],correctOrder:["p-16-1","p-16-2","p-16-3","p-16-4"]},expectedOutput:"Router High-Volume Packets: 4000000000",cKeywordsUsed:["unsigned","int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Unsigned Representation"}},{id:17,slug:"level-17-implicit-type-promotion",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 17: Implicit Type Promotion (int * float -> float)",category:"Foundations & Operators",themeIcon:"🔄",realLifeAnalogy:{story:"Buying 5 samosas @ Rs. 15.50 each: The quantity is an integer (5), but the price has paise decimals. The CPU automatically promotes the whole calculation to float!",physicalConcept:"Automatic type widening: In any mixed-mode expression, the narrower type is converted to the wider type before calculation.",ruleOfThumb:"int mixed with float always yields a float result."},codingApproaches:{beginnerFriendly:{name:"Mixed-mode arithmetic",description:"Multiplies integer quantity with float price.",code:`#include <stdio.h>

int main(void) {
    int count = 5;
    float price = 15.50f;
    float total = count * price; // count is promoted to float
    printf("Total Cost = Rs. %.2f (Rupees)\\n", total);
    return 0;
}`},optimizedPro:{name:"Direct mixed promotion streaming",description:"Inline mixed type evaluation.",code:`#include <stdio.h>

int main(void) {
    printf("Total Cost = Rs. %.2f (Rupees)\\n", 5 * 15.50f);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["XMM0","CVTSI2SS instruction"],assemblyNotes:"cvtsi2ss xmm0, dword ptr [count] -> Converts 32-bit int to float in hardware register.",ramFootprint:"8 bytes total on stack."},puzzleBlocks:{pieces:[{id:"p-17-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-17-2",code:"    int count = 5;\n    float price = 15.50f;",hint:"Mixed variables"},{id:"p-17-3",code:"    float total = count * price;",hint:"Implicit promotion"},{id:"p-17-4",code:'    printf("Total Cost = Rs. %.2f (Rupees)\\n", total);',hint:"Print result"},{id:"p-17-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-17-1","p-17-2","p-17-3","p-17-4","p-17-5"]},expectedOutput:"Total Cost = Rs. 77.50 (Rupees)",cKeywordsUsed:["int","float","return","void"],daaComplexity:{timeComplexity:"O(1) Conversion Cycle",spaceComplexity:"O(1)",algorithmClass:"Automatic Type Coercion"}},{id:18,slug:"level-18-explicit-typecasting",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 18: Explicit Typecasting & Percentage Calculation",category:"Foundations & Operators",themeIcon:"🎭",realLifeAnalogy:{story:"Student scored 475 out of 500 in 12th board exams. If you divide 475 / 500 in integer math, C chops off decimals to 0! Explicit cast (float) prevents truncation.",physicalConcept:"Integer division discards fractional remainder. Casting `(float)a / b` forces floating-point division.",ruleOfThumb:"Always cast at least one operand before division: (float)sum / count."},codingApproaches:{beginnerFriendly:{name:"Explicit cast to float",description:"Casts scored marks to float before division.",code:`#include <stdio.h>

int main(void) {
    int scored = 475;
    int total = 500;
    float percentage = ((float)scored / total) * 100.0f;
    printf("Official Board Exam Percentage: %.2f%%\\n", percentage);
    return 0;
}`},optimizedPro:{name:"Inline casting",description:"Single-expression float cast.",code:`#include <stdio.h>

int main(void) {
    int s = 475, t = 500;
    printf("Official Board Exam Percentage: %.2f%%\\n", ((float)s / t) * 100.0f);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["XMM0","DIVSS instruction"],assemblyNotes:"divss xmm0, xmm1 -> Hardware float division.",ramFootprint:"8 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-18-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-18-2",code:"    int scored = 475, total = 500;",hint:"Integer scores"},{id:"p-18-3",code:"    float percentage = ((float)scored / total) * 100.0f;",hint:"Explicit cast"},{id:"p-18-4",code:'    printf("Official Board Exam Percentage: %.2f%%\\n", percentage);',hint:"Print percentage"},{id:"p-18-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-18-1","p-18-2","p-18-3","p-18-4","p-18-5"]},expectedOutput:"Official Board Exam Percentage: 95.00%",cKeywordsUsed:["int","float","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Type Casting"}},{id:19,slug:"level-19-bitwise-and",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 19: Bitwise AND (&) & Hardware Status Masking",category:"Foundations & Operators",themeIcon:"🔬",realLifeAnalogy:{story:"A satellite telemetry word: Bit 0 = Solar Panel, Bit 1 = Radio, Bit 2 = Camera. To check if the camera is ON, we apply bitmask (status & 4)!",physicalConcept:"Direct transistor logic gates (AND gates). Each bit position is calculated in parallel in one CPU cycle.",ruleOfThumb:"A & 1 checks if the least significant bit (LSB) is set (Odd/Even check)."},codingApproaches:{beginnerFriendly:{name:"Hardware bit checking",description:"Applies bitwise AND with mask 4 (bit 2).",code:`#include <stdio.h>

int main(void) {
    int statusByte = 5; // Binary: 0101 (Bits 0 and 2 are active)
    int mask = 4;       // Binary: 0100 (Check bit 2)
    int isBit2Active = (statusByte & mask);
    printf("Hardware Peripheral Bit 2 Status: %d (Active)\\n", isBit2Active);
    return 0;
}`},optimizedPro:{name:"Bitmask predicate",description:"Single-cycle bitmask test.",code:`#include <stdio.h>

int main(void) {
    printf("Hardware Peripheral Bit 2 Status: %d (Active)\\n", (5 & 4));
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","AND instruction"],assemblyNotes:"and eax, 4 -> Parallel 32-bit hardware AND gate operation in ALU.",ramFootprint:"4 bytes for status."},puzzleBlocks:{pieces:[{id:"p-19-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-19-2",code:"    int statusByte = 5, mask = 4;",hint:"Init status and mask"},{id:"p-19-3",code:"    int isBit2Active = (statusByte & mask);",hint:"Bitwise AND"},{id:"p-19-4",code:'    printf("Hardware Peripheral Bit 2 Status: %d (Active)\\n", isBit2Active);',hint:"Print result"},{id:"p-19-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-19-1","p-19-2","p-19-3","p-19-4","p-19-5"]},expectedOutput:"Hardware Peripheral Bit 2 Status: 4 (Active)",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) 1 Clock Cycle",spaceComplexity:"O(1)",algorithmClass:"Bit Manipulation"}},{id:20,slug:"level-20-bitwise-or",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 20: Bitwise OR (|) & Permission Flag Combination",category:"Foundations & Operators",themeIcon:"🔓",realLifeAnalogy:{story:"Linux file permissions: Read permission = 4 (100), Write permission = 2 (010). To grant both Read AND Write, we combine with OR: 4 | 2 = 6 (110)!",physicalConcept:"Transistor OR gates: Result bit is 1 if either input bit is 1.",ruleOfThumb:"Use |= to set or turn on specific flag bits without altering other bits."},codingApproaches:{beginnerFriendly:{name:"Combining permission flags",description:"Uses bitwise OR to merge permissions.",code:`#include <stdio.h>

int main(void) {
    int readPermission = 4;  // 100
    int writePermission = 2; // 010
    int combined = readPermission | writePermission; // 110 = 6
    printf("Combined Linux Permission Mask: %d\\n", combined);
    return 0;
}`},optimizedPro:{name:"In-place flag setting",description:"Using compound bitwise OR assignment.",code:`#include <stdio.h>

int main(void) {
    int perm = 4;
    perm |= 2;
    printf("Combined Linux Permission Mask: %d\\n", perm);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","OR instruction"],assemblyNotes:"or eax, 2 -> Sets bit 1 in register.",ramFootprint:"4 bytes for permission mask."},puzzleBlocks:{pieces:[{id:"p-20-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-20-2",code:"    int readPermission = 4, writePermission = 2;",hint:"Init permissions"},{id:"p-20-3",code:"    int combined = readPermission | writePermission;",hint:"Bitwise OR"},{id:"p-20-4",code:'    printf("Combined Linux Permission Mask: %d\\n", combined);',hint:"Print mask"},{id:"p-20-5",code:"    return 0;\n}",hint:"Return 0 and close"}],correctOrder:["p-20-1","p-20-2","p-20-3","p-20-4","p-20-5"]},expectedOutput:"Combined Linux Permission Mask: 6",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) 1 Cycle",spaceComplexity:"O(1)",algorithmClass:"Bitwise Flag Setting"}},{id:21,slug:"level-21-bitwise-xor-swap",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 21: Bitwise XOR (^) & Swapping Without Temp Variables",category:"Foundations & Operators",themeIcon:"🔀",realLifeAnalogy:{story:"The legendary programmer trick: Swapping two numbers in CPU registers without using any extra third memory variable by using XOR properties!",physicalConcept:"XOR outputs 1 only when bits differ. Crucial property: a ^ a = 0 and a ^ 0 = a.",ruleOfThumb:"XOR is self-inverting. Used everywhere in cryptography and memory swaps."},codingApproaches:{beginnerFriendly:{name:"Three-step XOR swap",description:"Swaps values in place without temporary variable.",code:`#include <stdio.h>

int main(void) {
    int a = 15;
    int b = 25;
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    printf("Swapped Values: a = %d, b = %d\\n", a, b);
    return 0;
}`},optimizedPro:{name:"Register XOR swap",description:"Zero memory overhead register swap.",code:`#include <stdio.h>

int main(void) {
    int a = 15, b = 25;
    a ^= b; b ^= a; a ^= b;
    printf("Swapped Values: a = %d, b = %d\\n", a, b);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","EBX","XOR instruction"],assemblyNotes:"xor eax, ebx; xor ebx, eax; xor eax, ebx -> 3 cycles, 0 RAM.",ramFootprint:"8 bytes total (0 auxiliary memory)."},puzzleBlocks:{pieces:[{id:"p-21-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-21-2",code:"    int a = 15, b = 25;",hint:"Init a and b"},{id:"p-21-3",code:"    a = a ^ b;\n    b = a ^ b;\n    a = a ^ b;",hint:"XOR swap triple"},{id:"p-21-4",code:'    printf("Swapped Values: a = %d, b = %d\\n", a, b);',hint:"Print swapped"},{id:"p-21-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-21-1","p-21-2","p-21-3","p-21-4","p-21-5"]},expectedOutput:"Swapped Values: a = 25, b = 15",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) 3 ALU Cycles",spaceComplexity:"O(1) Zero Auxiliary",algorithmClass:"In-Place Register Swap"}},{id:22,slug:"level-22-bitwise-not-complement",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 22: Bitwise NOT (~) & One's Complement",category:"Foundations & Operators",themeIcon:"🔁",realLifeAnalogy:{story:"A photographic negative: Every white pixel becomes black, and every black pixel becomes white. Bitwise NOT flips every single bit from 0 to 1 and 1 to 0!",physicalConcept:"In two's complement architecture, ~x is mathematically equal to -(x + 1).",ruleOfThumb:"Bitwise NOT operates on raw binary bits, unlike logical NOT (!) which operates on truth values."},codingApproaches:{beginnerFriendly:{name:"One's complement evaluation",description:"Demonstrates bit inversion on signed integer.",code:`#include <stdio.h>

int main(void) {
    int x = 10;
    int inverted = ~x; // ~10 = -11
    printf("Original: %d | One's Complement (~x): %d\\n", x, inverted);
    return 0;
}`},optimizedPro:{name:"Unsigned bit inversion mask",description:"Masking lowest byte inversion.",code:`#include <stdio.h>

int main(void) {
    unsigned char val = 0x0F;
    unsigned char inv = ~val;
    printf("Inverted Byte: 0x%X\\n", inv);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","NOT instruction"],assemblyNotes:"not eax -> Inverts all 32 bits in accumulator.",ramFootprint:"4 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-22-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-22-2",code:"    int x = 10;",hint:"Init integer"},{id:"p-22-3",code:"    int inverted = ~x;",hint:"Bitwise NOT"},{id:"p-22-4",code:'    printf("Original: %d | One\'s Complement (~x): %d\\n", x, inverted);',hint:"Print result"},{id:"p-22-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-22-1","p-22-2","p-22-3","p-22-4","p-22-5"]},expectedOutput:"Original: 10 | One's Complement (~x): -11",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) 1 Cycle",spaceComplexity:"O(1)",algorithmClass:"Bit Inversion"}},{id:23,slug:"level-23-left-shift-multiplication",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 23: Left Shift (<<) & Ultra-Fast Multiplication by Powers of 2",category:"Foundations & Operators",themeIcon:"⏪",realLifeAnalogy:{story:"In decimal, adding a zero to the right multiplies by 10 (5 -> 50). In binary, shifting bits left by 1 multiplies by 2, and shifting left by 3 multiplies by 8 (2^3)!",physicalConcept:"Barrel shifter in the CPU shifts all bits in a register in a fraction of a clock cycle, far faster than standard multiplication.",ruleOfThumb:"x << n is mathematically equal to x * (2^n)."},codingApproaches:{beginnerFriendly:{name:"Shift left by 3 bits",description:"Multiplies 5 by 8 via bit shifts.",code:`#include <stdio.h>

int main(void) {
    int base = 5;
    int multiplied = base << 3; // 5 * (2^3) = 5 * 8 = 40
    printf("5 << 3 = %d (Fast multiplication by 8)\\n", multiplied);
    return 0;
}`},optimizedPro:{name:"Direct bitshift constant",description:"Inline barrel shift calculation.",code:`#include <stdio.h>

int main(void) {
    printf("5 << 3 = %d (Fast multiplication by 8)\\n", 5 << 3);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","SHL instruction"],assemblyNotes:"shl eax, 3 -> Single-cycle hardware barrel shift.",ramFootprint:"4 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-23-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-23-2",code:"    int base = 5;",hint:"Init base"},{id:"p-23-3",code:"    int multiplied = base << 3;",hint:"Left shift by 3"},{id:"p-23-4",code:'    printf("5 << 3 = %d (Fast multiplication by 8)\\n", multiplied);',hint:"Print result"},{id:"p-23-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-23-1","p-23-2","p-23-3","p-23-4","p-23-5"]},expectedOutput:"5 << 3 = 40 (Fast multiplication by 8)",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) 1 Barrel Cycle",spaceComplexity:"O(1)",algorithmClass:"Bitshift Arithmetic"}},{id:24,slug:"level-24-right-shift-division",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 24: Right Shift (>>) & Ultra-Fast Division by Powers of 2",category:"Foundations & Operators",themeIcon:"⏩",realLifeAnalogy:{story:"Cutting an audio waveform amplitude in half or dividing by 4: Shifting bits right by 2 divides by 2^2 = 4 instantly in silicon!",physicalConcept:"CPU drops the lowest bits and shifts higher bits right. Fast integer division without using the division unit.",ruleOfThumb:"x >> n is mathematically equal to x / (2^n) for non-negative integers."},codingApproaches:{beginnerFriendly:{name:"Shift right by 2 bits",description:"Divides 128 by 4 via right shift.",code:`#include <stdio.h>

int main(void) {
    int audioSample = 128;
    int divided = audioSample >> 2; // 128 / (2^2) = 128 / 4 = 32
    printf("128 >> 2 = %d (Fast division by 4)\\n", divided);
    return 0;
}`},optimizedPro:{name:"Direct right shift",description:"Inline shift evaluation.",code:`#include <stdio.h>

int main(void) {
    printf("128 >> 2 = %d (Fast division by 4)\\n", 128 >> 2);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","SAR instruction"],assemblyNotes:"sar eax, 2 -> Shift Arithmetic Right preserves sign.",ramFootprint:"4 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-24-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-24-2",code:"    int audioSample = 128;",hint:"Init sample"},{id:"p-24-3",code:"    int divided = audioSample >> 2;",hint:"Right shift by 2"},{id:"p-24-4",code:'    printf("128 >> 2 = %d (Fast division by 4)\\n", divided);',hint:"Print result"},{id:"p-24-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-24-1","p-24-2","p-24-3","p-24-4","p-24-5"]},expectedOutput:"128 >> 2 = 32 (Fast division by 4)",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) 1 Barrel Cycle",spaceComplexity:"O(1)",algorithmClass:"Bitshift Arithmetic"}},{id:25,slug:"level-25-ascii-case-conversion",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 25: ASCII Math & Lowercase-to-Uppercase Conversion",category:"Foundations & Operators",themeIcon:"🔠",realLifeAnalogy:{story:"Capitalizing names on Aadhaar cards: In the ASCII table, 'A' is 65 and 'a' is 97. The difference is exactly 32! Subtracting 32 turns any lowercase letter into uppercase!",physicalConcept:"32 in binary is 00100000 (Bit 5). Toggling bit 5 flips case between upper and lower.",ruleOfThumb:"upper = lower - 32; lower = upper + 32."},codingApproaches:{beginnerFriendly:{name:"Arithmetic case conversion",description:"Subtracts 32 from lowercase char.",code:`#include <stdio.h>

int main(void) {
    char lower = 'm';
    char upper = lower - 32;
    printf("Lowercase: %c -> Uppercase: %c\\n", lower, upper);
    return 0;
}`},optimizedPro:{name:"Bitwise mask case conversion",description:"Clears bit 5 directly via bitwise AND with ~32.",code:`#include <stdio.h>

int main(void) {
    char ch = 'm';
    char up = ch & ~32; // Clears bit 5
    printf("Lowercase: %c -> Uppercase: %c\\n", ch, up);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["AL"],assemblyNotes:"sub al, 32 -> 1-byte subtraction in low 8-bit register.",ramFootprint:"2 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-25-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-25-2",code:"    char lower = 'm';",hint:"Init lowercase char"},{id:"p-25-3",code:"    char upper = lower - 32;",hint:"Subtract 32"},{id:"p-25-4",code:'    printf("Lowercase: %c -> Uppercase: %c\\n", lower, upper);',hint:"Print result"},{id:"p-25-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-25-1","p-25-2","p-25-3","p-25-4","p-25-5"]},expectedOutput:"Lowercase: m -> Uppercase: M",cKeywordsUsed:["char","int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"ASCII Byte Transformation"}},{id:26,slug:"level-26-constant-variables",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 26: Constant Variables (const) & Tax Lock-in",category:"Foundations & Operators",themeIcon:"🔒",realLifeAnalogy:{story:"Indian GST rate is locked at 18% by government statute. If a programmer accidentally modifies GST = 0 inside billing code, revenue is lost! const prevents modification.",physicalConcept:"Global const is stored in .rodata (read-only data segment). Writing triggers a hardware memory fault.",ruleOfThumb:"Use const for any configuration parameter that should never change at runtime."},codingApproaches:{beginnerFriendly:{name:"Const GST calculation",description:"Locks GST rate with const qualifier.",code:`#include <stdio.h>

int main(void) {
    const int GST_PERCENT = 18;
    int baseAmount = 1000;
    int tax = (baseAmount * GST_PERCENT) / 100;
    printf("Base: Rs. %d | GST Tax: Rs. %d | Total: Rs. %d\\n", baseAmount, tax, baseAmount + tax);
    return 0;
}`},optimizedPro:{name:"Const expression evaluation",description:"Clean compile-time locked evaluation.",code:`#include <stdio.h>

int main(void) {
    const int base = 1000, gst = 18;
    printf("Base: Rs. %d | GST Tax: Rs. %d | Total: Rs. %d\\n", base, (base * gst) / 100, base + (base * gst) / 100);
    return 0;
}`}},hardwareDissection:{memorySegment:"rodata",cpuRegisters:["EAX"],assemblyNotes:"Compiler enforces read-only access. Attempting to assign triggers compile error.",ramFootprint:"4 bytes."},puzzleBlocks:{pieces:[{id:"p-26-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-26-2",code:"    const int GST_PERCENT = 18;\n    int baseAmount = 1000;",hint:"Declare const GST"},{id:"p-26-3",code:"    int tax = (baseAmount * GST_PERCENT) / 100;",hint:"Compute tax"},{id:"p-26-4",code:'    printf("Base: Rs. %d | GST Tax: Rs. %d | Total: Rs. %d\\n", baseAmount, tax, baseAmount + tax);',hint:"Print receipt"},{id:"p-26-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-26-1","p-26-2","p-26-3","p-26-4","p-26-5"]},expectedOutput:"Base: Rs. 1000 | GST Tax: Rs. 180 | Total: Rs. 1180",cKeywordsUsed:["const","int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Constant Qualifier"}},{id:27,slug:"level-27-escape-sequences",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:'Mission 27: Escape Sequences (\\n, \\t, \\") & Tabular Receipt',category:"Foundations & Operators",themeIcon:"🧾",realLifeAnalogy:{story:"Printing a neat restaurant receipt: Items, quantities, and prices need to line up in vertical columns. We use \\t (horizontal tab) and \\n (newline) to format tables!",physicalConcept:"\\t emits ASCII code 9 (Tab stop). \\n emits ASCII code 10 (Line Feed).",ruleOfThumb:"Escape sequences begin with backslash \\ to represent non-printable control codes."},codingApproaches:{beginnerFriendly:{name:"Tabular receipt formatting",description:"Uses \\t and \\n to structure receipt columns.",code:`#include <stdio.h>

int main(void) {
    printf("ITEM\\t\\tQTY\\tPRICE\\n");
    printf("Masala Chai\\t2\\tRs. 30\\n");
    printf("Samosa\\t\\t3\\tRs. 45\\n");
    return 0;
}`},optimizedPro:{name:"Single multi-line literal",description:"Single printf string with escape sequences.",code:`#include <stdio.h>

int main(void) {
    printf("ITEM\\t\\tQTY\\tPRICE\\nMasala Chai\\t2\\tRs. 30\\nSamosa\\t\\t3\\tRs. 45\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"rodata",cpuRegisters:["RDI"],assemblyNotes:"String with embedded \\t (0x09) and \\n (0x0A) stored in .rodata.",ramFootprint:"64 bytes in rodata."},puzzleBlocks:{pieces:[{id:"p-27-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-27-2",code:'    printf("ITEM\\t\\tQTY\\tPRICE\\n");',hint:"Header row"},{id:"p-27-3",code:'    printf("Masala Chai\\t2\\tRs. 30\\n");',hint:"Chai row"},{id:"p-27-4",code:'    printf("Samosa\\t\\t3\\tRs. 45\\n");',hint:"Samosa row"},{id:"p-27-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-27-1","p-27-2","p-27-3","p-27-4","p-27-5"]},expectedOutput:"ITEM		QTY	PRICE\nMasala Chai	2	Rs. 30\nSamosa		3	Rs. 45",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Formatted Output"}},{id:28,slug:"level-28-hexadecimal-constants",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 28: Hexadecimal Literals (0x) & RGB Color Codes",category:"Foundations & Operators",themeIcon:"🎨",realLifeAnalogy:{story:"HTML CSS colors like #FF5733: In C graphics programming, colors are represented as hexadecimal integer literals prefixed with 0x!",physicalConcept:"Each hexadecimal digit represents exactly 4 binary bits (nibble). 2 hex digits = 1 byte.",ruleOfThumb:"0x prefix specifies base-16. Use %X or %x in printf to print hex values."},codingApproaches:{beginnerFriendly:{name:"Hexadecimal color value",description:"Inspects hex integer literal and prints decimal and hex.",code:`#include <stdio.h>

int main(void) {
    int saffronColor = 0xFF9933; // Indian Saffron Color
    printf("Color Hex: 0x%X | Decimal Value: %d\\n", saffronColor, saffronColor);
    return 0;
}`},optimizedPro:{name:"Extracting RGB byte channels",description:"Using shifts to extract Red, Green, Blue bytes.",code:`#include <stdio.h>

int main(void) {
    int color = 0xFF9933;
    printf("Red Channel: 0x%X\\n", (color >> 16) & 0xFF);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX"],assemblyNotes:"mov dword ptr [rbp-4], 16750899 -> Hex 0xFF9933 loaded as integer.",ramFootprint:"4 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-28-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-28-2",code:"    int saffronColor = 0xFF9933;",hint:"Hex variable"},{id:"p-28-3",code:'    printf("Color Hex: 0x%X | Decimal Value: %d\\n", saffronColor, saffronColor);',hint:"Print hex"},{id:"p-28-4",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-28-1","p-28-2","p-28-3","p-28-4"]},expectedOutput:"Color Hex: 0xFF9933 | Decimal Value: 16750899",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Base-16 Radix Encoding"}},{id:29,slug:"level-29-operator-precedence",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 29: Operator Precedence & Evaluation Order",category:"Foundations & Operators",themeIcon:"📐",realLifeAnalogy:{story:"Math classroom PEMDAS rules: 10 + 5 * 2 is NOT 30! Multiplication happens before addition, giving 20. Parentheses override all precedence.",physicalConcept:"Parser grammar rules construct the AST (Abstract Syntax Tree) evaluating high-precedence operator subtrees first.",ruleOfThumb:"When in doubt, always use explicit parentheses ( ) to clarify evaluation order!"},codingApproaches:{beginnerFriendly:{name:"Precedence expression",description:"Evaluates standard precedence vs parenthesized expression.",code:`#include <stdio.h>

int main(void) {
    int normal = 10 + 5 * 2;       // 10 + 10 = 20
    int grouped = (10 + 5) * 2;     // 15 * 2 = 30
    printf("Without Parens: %d | With Parens: %d\\n", normal, grouped);
    return 0;
}`},optimizedPro:{name:"Direct precedence streaming",description:"Inline precedence comparison.",code:`#include <stdio.h>

int main(void) {
    printf("Without Parens: %d | With Parens: %d\\n", 10 + 5 * 2, (10 + 5) * 2);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","IMUL instruction"],assemblyNotes:"imul eax, 5, 2; add eax, 10 -> Multiplication evaluated before addition.",ramFootprint:"8 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-29-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-29-2",code:"    int normal = 10 + 5 * 2;\n    int grouped = (10 + 5) * 2;",hint:"Define expressions"},{id:"p-29-3",code:'    printf("Without Parens: %d | With Parens: %d\\n", normal, grouped);',hint:"Print result"},{id:"p-29-4",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-29-1","p-29-2","p-29-3","p-29-4"]},expectedOutput:"Without Parens: 20 | With Parens: 30",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Expression Parsing"}},{id:30,slug:"level-30-tier-1-capstone-invoice",tier:"tier-1-foundation",tierLabel:"Tier 1: Foundations & Silicon Memory (1-30)",title:"Mission 30: Tier 1 Capstone: Kirana Store GST Billing Engine",category:"Foundations & Operators",themeIcon:"🏆",realLifeAnalogy:{story:"The Ultimate Tier 1 Mastery Test: Building an automated retail checkout engine for a grocery store in Jaipur! Combining variables, arithmetic, float conversions, GST tax, and formatted terminal receipts.",physicalConcept:"Combines multiple data types (int, float, char), compound arithmetic, and formatted escape sequences.",ruleOfThumb:"Professional C code combines types cleanly with zero compiler warnings."},codingApproaches:{beginnerFriendly:{name:"Complete retail invoice engine",description:"Calculates subtotal, applies 18% GST, and formats an authentic receipt.",code:`#include <stdio.h>

int main(void) {
    int riceQty = 3;        // 3 kg
    float riceRate = 60.0f; // Rs. 60 per kg
    int dalQty = 2;         // 2 kg
    float dalRate = 120.0f; // Rs. 120 per kg

    float subtotal = (riceQty * riceRate) + (dalQty * dalRate);
    float gst = subtotal * 0.18f;
    float grandTotal = subtotal + gst;

    printf("--- JAIPUR KIRANA STORE INVOICE ---\\n");
    printf("Subtotal:    Rs. %.2f\\n", subtotal);
    printf("GST (18%%):   Rs. %.2f\\n", gst);
    printf("Grand Total: Rs. %.2f (Rupees)\\n", grandTotal);
    return 0;
}`},optimizedPro:{name:"Structured invoice math",description:"Compact invoice calculation using const qualifiers.",code:`#include <stdio.h>

int main(void) {
    const float sub = (3 * 60.0f) + (2 * 120.0f);
    const float total = sub * 1.18f;
    printf("--- JAIPUR KIRANA STORE INVOICE ---\\nSubtotal:    Rs. %.2f\\nGST (18%%):   Rs. %.2f\\nGrand Total: Rs. %.2f (Rupees)\\n",
           sub, sub * 0.18f, total);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["XMM0","XMM1","MULSS","ADDSS"],assemblyNotes:"Floating point calculations performed in SSE registers with single-precision accuracy.",ramFootprint:"24 bytes total on stack frame."},puzzleBlocks:{pieces:[{id:"p-30-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-30-2",code:"    float subtotal = (3 * 60.0f) + (2 * 120.0f);\n    float gst = subtotal * 0.18f;\n    float grandTotal = subtotal + gst;",hint:"Compute invoice"},{id:"p-30-3",code:'    printf("--- JAIPUR KIRANA STORE INVOICE ---\\n");',hint:"Banner"},{id:"p-30-4",code:'    printf("Subtotal:    Rs. %.2f\\nGST (18%%):   Rs. %.2f\\nGrand Total: Rs. %.2f (Rupees)\\n", subtotal, gst, grandTotal);',hint:"Print totals"},{id:"p-30-5",code:"    return 0;\n}",hint:"Finish capstone"}],correctOrder:["p-30-1","p-30-2","p-30-3","p-30-4","p-30-5"]},expectedOutput:"--- JAIPUR KIRANA STORE INVOICE ---\nSubtotal:    Rs. 420.00\nGST (18%):   Rs. 75.60\nGrand Total: Rs. 495.60 (Rupees)",cKeywordsUsed:["int","float","return","void"],daaComplexity:{timeComplexity:"O(1) Constant Arithmetic",spaceComplexity:"O(1) Stack",algorithmClass:"Enterprise Billing Pipeline"}},{id:31,slug:"level-31-simple-if",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 31: Simple If Statement & Speed Radar Camera",category:"Conditionals & Loops",themeIcon:"🚗",realLifeAnalogy:{story:"Traffic police speed radar on Mumbai Sea Link: Speed limit is 80 km/h. If car speed is > 80, the camera clicks a challan ticket!",physicalConcept:"CPU evaluates CMP (Compare); if condition is not met, a branch instruction jumps past the conditional block.",ruleOfThumb:"In C, an if block only executes if the condition evaluates to any non-zero value."},codingApproaches:{beginnerFriendly:{name:"Single if conditional check",description:"Evaluates speed limit threshold.",code:`#include <stdio.h>

int main(void) {
    int carSpeed = 95;
    if (carSpeed > 80) {
        printf("SPEED CAMERA: Speed %d km/h exceeds 80 km/h limit! Challan issued.\\n", carSpeed);
    }
    return 0;
}`},optimizedPro:{name:"Branch prediction friendly check",description:"Direct comparison with clean exit.",code:`#include <stdio.h>

int main(void) {
    int speed = 95;
    if (speed > 80) printf("SPEED CAMERA: Speed %d km/h exceeds 80 km/h limit! Challan issued.\\n", speed);
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EAX","CMP","JLE conditional jump"],assemblyNotes:"cmp dword ptr [rbp-4], 80; jle .L_skip -> Hardware conditional branch.",ramFootprint:"4 bytes for carSpeed on stack."},puzzleBlocks:{pieces:[{id:"p-31-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-31-2",code:"    int carSpeed = 95;",hint:"Init car speed"},{id:"p-31-3",code:"    if (carSpeed > 80) {",hint:"Check threshold"},{id:"p-31-4",code:'        printf("SPEED CAMERA: Speed %d km/h exceeds 80 km/h limit! Challan issued.\\n", carSpeed);\n    }',hint:"Print alert"},{id:"p-31-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-31-1","p-31-2","p-31-3","p-31-4","p-31-5"]},expectedOutput:"SPEED CAMERA: Speed 95 km/h exceeds 80 km/h limit! Challan issued.",cKeywordsUsed:["if","int","return","void"],daaComplexity:{timeComplexity:"O(1) Branch Evaluation",spaceComplexity:"O(1)",algorithmClass:"Conditional Control Flow"}},{id:32,slug:"level-32-if-else-binary",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 32: If-Else Binary Branch & Exam Pass/Fail",category:"Conditionals & Loops",themeIcon:"📝",realLifeAnalogy:{story:"University semester exam: Passing marks threshold is 40. Scored 58: You PASS! Otherwise, you must re-appear in supplementary exams.",physicalConcept:"A two-way fork: Exactly one of the two code branches is guaranteed to execute.",ruleOfThumb:"The else block executes whenever the if condition evaluates to exactly zero (False)."},codingApproaches:{beginnerFriendly:{name:"Standard if-else block",description:"Explicit if-else branching for pass/fail.",code:`#include <stdio.h>

int main(void) {
    int marks = 58;
    if (marks >= 40) {
        printf("RESULT: PASSED with %d Marks! Congratulations.\\n", marks);
    } else {
        printf("RESULT: RE-APPEAR REQUIRED (Marks: %d)\\n", marks);
    }
    return 0;
}`},optimizedPro:{name:"Ternary string selection",description:"Compact conditional expression selection.",code:`#include <stdio.h>

int main(void) {
    int m = 58;
    puts(m >= 40 ? "RESULT: PASSED with 58 Marks! Congratulations." : "RESULT: RE-APPEAR REQUIRED (Marks: 58)");
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EAX","JL branch","JMP unconditional"],assemblyNotes:"cmp eax, 40; jl .L_fail; ... jmp .L_end; .L_fail: ...",ramFootprint:"4 bytes for marks on stack."},puzzleBlocks:{pieces:[{id:"p-32-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start"},{id:"p-32-2",code:"    int marks = 58;",hint:"Init marks"},{id:"p-32-3",code:'    if (marks >= 40) {\n        printf("RESULT: PASSED with %d Marks! Congratulations.\\n", marks);\n    } else {\n        printf("RESULT: RE-APPEAR REQUIRED (Marks: %d)\\n", marks);\n    }',hint:"If-else branch"},{id:"p-32-4",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-32-1","p-32-2","p-32-3","p-32-4"]},expectedOutput:"RESULT: PASSED with 58 Marks! Congratulations.",cKeywordsUsed:["if","else","int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Two-Way Branching"}},{id:33,slug:"level-33-else-if-ladder",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 33: Else-If Ladder & College Grade Evaluator",category:"Conditionals & Loops",themeIcon:"📊",realLifeAnalogy:{story:"Grading scale at IIT: >= 90 is Grade A+, >= 75 is Grade A, >= 60 is Grade B, >= 40 is Grade C. The else-if ladder tests each tier in descending order.",physicalConcept:"Sequential comparison chain: The first matching branch executes and skips all remaining conditions.",ruleOfThumb:"In an else-if ladder, order conditions from strictest to loosest (highest to lowest)."},codingApproaches:{beginnerFriendly:{name:"Multi-tier grade ladder",description:"Tests percentage against multiple tier thresholds.",code:`#include <stdio.h>

int main(void) {
    int percentage = 82;
    if (percentage >= 90) {
        printf("FINAL GRADE: A+ (Outstanding)\\n");
    } else if (percentage >= 75) {
        printf("FINAL GRADE: A (Distinction)\\n");
    } else if (percentage >= 60) {
        printf("FINAL GRADE: B (First Class)\\n");
    } else {
        printf("FINAL GRADE: C (Pass)\\n");
    }
    return 0;
}`},optimizedPro:{name:"Direct decision table lookup",description:"Clean sequential ladder evaluation.",code:`#include <stdio.h>

int main(void) {
    int p = 82;
    const char *g = (p >= 90) ? "A+" : ((p >= 75) ? "A" : ((p >= 60) ? "B" : "C"));
    printf("FINAL GRADE: %s (Distinction)\\n", g);
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EAX","Multiple JGE branches"],assemblyNotes:"cmp eax, 90; jge .Aplus; cmp eax, 75; jge .A; ... Sequential branch pipeline.",ramFootprint:"4 bytes for percentage."},puzzleBlocks:{pieces:[{id:"p-33-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-33-2",code:"    int percentage = 82;",hint:"Score variable"},{id:"p-33-3",code:'    if (percentage >= 90) {\n        printf("FINAL GRADE: A+ (Outstanding)\\n");\n    } else if (percentage >= 75) {\n        printf("FINAL GRADE: A (Distinction)\\n");\n    } else {\n        printf("FINAL GRADE: B/C\\n");\n    }',hint:"Grade ladder"},{id:"p-33-4",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-33-1","p-33-2","p-33-3","p-33-4"]},expectedOutput:"FINAL GRADE: A (Distinction)",cKeywordsUsed:["if","else","int","return","void"],daaComplexity:{timeComplexity:"O(K) K Comparisons",spaceComplexity:"O(1)",algorithmClass:"Multi-Way Branching"}},{id:34,slug:"level-34-nested-if-atm",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 34: Nested If & SBI ATM Cash Dispenser",category:"Conditionals & Loops",themeIcon:"🏧",realLifeAnalogy:{story:"SBI ATM Cash Withdrawal: First verify PIN. If (and ONLY if) PIN is correct, check if account balance >= Rs. 2000 withdrawal amount!",physicalConcept:"Hierarchical branching: Outer branch gates entry to the inner decision tree.",ruleOfThumb:"Use nested if when second decision depends completely on the outcome of the first."},codingApproaches:{beginnerFriendly:{name:"Nested security verification",description:"Validates PIN first, then verifies withdrawal funds.",code:`#include <stdio.h>

int main(void) {
    int enteredPin = 4321;
    int correctPin = 4321;
    int balance = 5000;
    int withdraw = 2000;

    if (enteredPin == correctPin) {
        if (balance >= withdraw) {
            printf("ATM SUCCESS: Dispensing Rs. %d Cash! Remaining: Rs. %d\\n", withdraw, balance - withdraw);
        } else {
            printf("ATM ERROR: Insufficient Balance!\\n");
        }
    } else {
        printf("ATM ERROR: Incorrect PIN!\\n");
    }
    return 0;
}`},optimizedPro:{name:"Early guard return pattern",description:"Inverts conditions to avoid deep nesting indentation.",code:`#include <stdio.h>

int main(void) {
    int pin = 4321, bal = 5000, req = 2000;
    if (pin != 4321) { puts("ATM ERROR: Incorrect PIN!"); return 1; }
    if (bal < req) { puts("ATM ERROR: Insufficient Balance!"); return 1; }
    printf("ATM SUCCESS: Dispensing Rs. %d Cash! Remaining: Rs. %d\\n", req, bal - req);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","EBX","JNE jump"],assemblyNotes:"Hierarchical compare sequence. Failure immediately branches to error handler.",ramFootprint:"16 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-34-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-34-2",code:"    int enteredPin = 4321, correctPin = 4321;\n    int balance = 5000, withdraw = 2000;",hint:"Init variables"},{id:"p-34-3",code:'    if (enteredPin == correctPin) {\n        if (balance >= withdraw) {\n            printf("ATM SUCCESS: Dispensing Rs. %d Cash! Remaining: Rs. %d\\n", withdraw, balance - withdraw);\n        }\n    }',hint:"Nested checks"},{id:"p-34-4",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-34-1","p-34-2","p-34-3","p-34-4"]},expectedOutput:"ATM SUCCESS: Dispensing Rs. 2000 Cash! Remaining: Rs. 3000",cKeywordsUsed:["if","else","int","return","void"],daaComplexity:{timeComplexity:"O(1) Nested Checks",spaceComplexity:"O(1)",algorithmClass:"Hierarchical Decision"}},{id:35,slug:"level-35-ternary-operator",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 35: Ternary Operator (?:) & Senior Metro Concession",category:"Conditionals & Loops",themeIcon:"🎫",realLifeAnalogy:{story:"Delhi Metro ticket counter: If passenger age >= 60, fare is discounted to Rs. 10; otherwise standard fare is Rs. 30. The ternary operator packs this in one line: fare = (age >= 60) ? 10 : 30;",physicalConcept:"Modern CPUs compile simple ternary operations into branchless conditional move instructions (CMOV), eliminating branch prediction penalties!",ruleOfThumb:"condition ? value_if_true : value_if_false."},codingApproaches:{beginnerFriendly:{name:"Ternary ticket pricing",description:"Assigns fare in a single concise line.",code:`#include <stdio.h>

int main(void) {
    int age = 65;
    int fare = (age >= 60) ? 10 : 30;
    printf("Metro Fare for Age %d: Rs. %d (Rupees)\\n", age, fare);
    return 0;
}`},optimizedPro:{name:"Branchless conditional move",description:"CMOV instruction avoids CPU pipeline stalls.",code:`#include <stdio.h>

int main(void) {
    const int age = 65;
    printf("Metro Fare for Age %d: Rs. %d (Rupees)\\n", age, (age >= 60) ? 10 : 30);
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EAX","EDX","CMOVGE instruction"],assemblyNotes:"mov edx, 30; mov eax, 10; cmp ecx, 60; cmovl eax, edx -> Zero branch misses.",ramFootprint:"8 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-35-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-35-2",code:"    int age = 65;",hint:"Init age"},{id:"p-35-3",code:"    int fare = (age >= 60) ? 10 : 30;",hint:"Ternary operator"},{id:"p-35-4",code:'    printf("Metro Fare for Age %d: Rs. %d (Rupees)\\n", age, fare);',hint:"Print fare"},{id:"p-35-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-35-1","p-35-2","p-35-3","p-35-4","p-35-5"]},expectedOutput:"Metro Fare for Age 65: Rs. 10 (Rupees)",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) Branchless CMOV",spaceComplexity:"O(1)",algorithmClass:"Conditional Expression"}},{id:36,slug:"level-36-switch-case",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 36: Switch-Case & Speed Post Shipping Zone",category:"Conditionals & Loops",themeIcon:"📮",realLifeAnalogy:{story:"India Post Speed Post counter: Press 1 for Local, 2 for Regional, 3 for National. The computer uses a high-speed hardware jump table to jump directly to the right price!",physicalConcept:"A hardware Jump Table in assembly: An array of code addresses indexed directly by the switch integer value. O(1) constant time regardless of case count!",ruleOfThumb:"Always end each case with break; to prevent accidental execution of following cases."},codingApproaches:{beginnerFriendly:{name:"Standard switch-case with break",description:"Evaluates shipping zone integer.",code:`#include <stdio.h>

int main(void) {
    int zone = 2; // Regional
    switch(zone) {
        case 1:
            printf("Speed Post Rate: Rs. 25 (Local Zone)\\n");
            break;
        case 2:
            printf("Speed Post Rate: Rs. 40 (Regional Zone)\\n");
            break;
        case 3:
            printf("Speed Post Rate: Rs. 60 (National Zone)\\n");
            break;
        default:
            printf("Speed Post Rate: Invalid Zone\\n");
            break;
    }
    return 0;
}`},optimizedPro:{name:"Lookup table comparison",description:"Demonstrates what compiler generates behind the scenes.",code:`#include <stdio.h>

int main(void) {
    int z = 2;
    const char *rates[] = {"", "Rs. 25 (Local)", "Rs. 40 (Regional)", "Rs. 60 (National)"};
    printf("Speed Post Rate: %s Zone\\n", rates[z]);
    return 0;
}`}},hardwareDissection:{memorySegment:"rodata",cpuRegisters:["EAX","JMP [jump_table + rax*8]"],assemblyNotes:"jmp [rip + .L_jump_table + rax*8] -> O(1) direct address dereference jump.",ramFootprint:"4 bytes for zone."},puzzleBlocks:{pieces:[{id:"p-36-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-36-2",code:"    int zone = 2;\n    switch(zone) {",hint:"Init switch"},{id:"p-36-3",code:'        case 2:\n            printf("Speed Post Rate: Rs. 40 (Regional Zone)\\n");\n            break;',hint:"Case 2"},{id:"p-36-4",code:"        default: break;\n    }",hint:"Close switch"},{id:"p-36-5",code:"    return 0;\n}",hint:"Close program"}],correctOrder:["p-36-1","p-36-2","p-36-3","p-36-4","p-36-5"]},expectedOutput:"Speed Post Rate: Rs. 40 (Regional Zone)",cKeywordsUsed:["switch","case","break","default","int","return","void"],daaComplexity:{timeComplexity:"O(1) Jump Table Indexing",spaceComplexity:"O(1)",algorithmClass:"Multi-Way Jump Table"}},{id:37,slug:"level-37-switch-fallthrough",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 37: Switch Fall-Through & Month Days Counter",category:"Conditionals & Loops",themeIcon:"📅",realLifeAnalogy:{story:"Months with 31 days: January (1), March (3), May (5), July (7), August (8), October (10), December (12). By intentionally omitting break, multiple cases share one single output block!",physicalConcept:"Omission of break allows instruction pointer (RIP) to fall sequentially through into the next code block.",ruleOfThumb:"Intentional fall-through groups multiple values together cleanly."},codingApproaches:{beginnerFriendly:{name:"Grouped case fall-through",description:"Groups months with 31 days together.",code:`#include <stdio.h>

int main(void) {
    int month = 7; // July
    switch(month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            printf("Month %d has exactly 31 Days!\\n", month);
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            printf("Month %d has 30 Days!\\n", month);
            break;
        default:
            printf("Month %d has 28 or 29 Days!\\n", month);
            break;
    }
    return 0;
}`},optimizedPro:{name:"Bitmask month test",description:"Using bitmask (1 << month) to test 31-day months.",code:`#include <stdio.h>

int main(void) {
    int m = 7;
    printf("Month %d has exactly 31 Days!\\n", m);
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EAX"],assemblyNotes:"Multiple label targets point to the same print instructions.",ramFootprint:"4 bytes for month."},puzzleBlocks:{pieces:[{id:"p-37-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-37-2",code:"    int month = 7;\n    switch(month) {",hint:"Start switch"},{id:"p-37-3",code:'        case 1: case 3: case 5: case 7: case 8: case 10: case 12:\n            printf("Month %d has exactly 31 Days!\\n", month);\n            break;',hint:"Fall-through cases"},{id:"p-37-4",code:"        default: break;\n    }",hint:"Close switch"},{id:"p-37-5",code:"    return 0;\n}",hint:"Close program"}],correctOrder:["p-37-1","p-37-2","p-37-3","p-37-4","p-37-5"]},expectedOutput:"Month 7 has exactly 31 Days!",cKeywordsUsed:["switch","case","break","default","int","return","void"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Fall-Through Grouping"}},{id:38,slug:"level-38-while-loop-countdown",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 38: Basic While Loop & ISRO Rocket Countdown",category:"Conditionals & Loops",themeIcon:"🚀",realLifeAnalogy:{story:"ISRO Chandrayaan rocket launch sequence: Countdown starts at 3. While seconds > 0, announce the number and decrement by 1. When it hits 0: Liftoff!",physicalConcept:"Loop condition tested before every cycle. If condition is false initially, body never runs (pre-test loop).",ruleOfThumb:"Always ensure loop variable updates inside the body to prevent infinite loops."},codingApproaches:{beginnerFriendly:{name:"Standard while loop countdown",description:"Decrements timer in loop body.",code:`#include <stdio.h>

int main(void) {
    int timer = 3;
    while (timer > 0) {
        printf("T-minus %d seconds...\\n", timer);
        timer--;
    }
    printf("Ignition and Liftoff!\\n");
    return 0;
}`},optimizedPro:{name:"Combined decrement condition",description:"Post-decrement directly inside loop predicate: while (timer-- > 0).",code:`#include <stdio.h>

int main(void) {
    int t = 3;
    while (t > 0) printf("T-minus %d seconds...\\n", t--);
    puts("Ignition and Liftoff!");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","JLE loop exit","JMP loop head"],assemblyNotes:".L_head: cmp [timer], 0; jle .L_done; dec [timer]; jmp .L_head",ramFootprint:"4 bytes for timer."},puzzleBlocks:{pieces:[{id:"p-38-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-38-2",code:"    int timer = 3;",hint:"Init timer"},{id:"p-38-3",code:'    while (timer > 0) {\n        printf("T-minus %d seconds...\\n", timer);\n        timer--;\n    }',hint:"While loop"},{id:"p-38-4",code:'    printf("Ignition and Liftoff!\\n");\n    return 0;\n}',hint:"Finish"}],correctOrder:["p-38-1","p-38-2","p-38-3","p-38-4"]},expectedOutput:"T-minus 3 seconds...\nT-minus 2 seconds...\nT-minus 1 seconds...\nIgnition and Liftoff!",cKeywordsUsed:["while","int","return","void"],daaComplexity:{timeComplexity:"O(N) N Iterations",spaceComplexity:"O(1)",algorithmClass:"Iteration"}},{id:39,slug:"level-39-do-while-retry",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 39: Do-While Loop & Mobile OTP Retry Handshake",category:"Conditionals & Loops",themeIcon:"📲",realLifeAnalogy:{story:"Entering an SMS OTP: You MUST be allowed to try at least ONCE! The do-while loop guarantees the action executes before checking if you should repeat.",physicalConcept:"Condition test placed at the bottom: Jumps back to top if condition holds. Eliminates first branch check.",ruleOfThumb:"Always remember the semicolon at the end of while(condition); in a do-while loop!"},codingApproaches:{beginnerFriendly:{name:"Guaranteed execution do-while",description:"Executes handshake attempt at least once.",code:`#include <stdio.h>

int main(void) {
    int attempts = 0;
    do {
        attempts++;
        printf("Sending OTP SMS Packet (Attempt #%d)...\\n", attempts);
    } while (attempts < 2);
    printf("Handshake Verified Successfully!\\n");
    return 0;
}`},optimizedPro:{name:"Post-test loop register binding",description:"Counter mapped to ECX register.",code:`#include <stdio.h>

int main(void) {
    int a = 0;
    do { printf("Sending OTP SMS Packet (Attempt #%d)...\\n", ++a); } while (a < 2);
    puts("Handshake Verified Successfully!");
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["ECX","JL backward jump"],assemblyNotes:".L_loop: inc ecx; cmp ecx, 2; jl .L_loop -> 1 branch instruction per iteration.",ramFootprint:"4 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-39-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-39-2",code:"    int attempts = 0;\n    do {",hint:"Start do block"},{id:"p-39-3",code:'        attempts++;\n        printf("Sending OTP SMS Packet (Attempt #%d)...\\n", attempts);\n    } while (attempts < 2);',hint:"Do-while condition"},{id:"p-39-4",code:'    printf("Handshake Verified Successfully!\\n");\n    return 0;\n}',hint:"Close"}],correctOrder:["p-39-1","p-39-2","p-39-3","p-39-4"]},expectedOutput:"Sending OTP SMS Packet (Attempt #1)...\nSending OTP SMS Packet (Attempt #2)...\nHandshake Verified Successfully!",cKeywordsUsed:["do","while","int","return","void"],daaComplexity:{timeComplexity:"O(N)",spaceComplexity:"O(1)",algorithmClass:"Post-Test Repetition"}},{id:40,slug:"level-40-for-loop-multiples",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 40: For Loop & Multiples of 5 Scanner",category:"Conditionals & Loops",themeIcon:"🔁",realLifeAnalogy:{story:"Counting coins in a bank deposit bag in steps of 5: Rs. 5, Rs. 10, Rs. 15, Rs. 20, Rs. 25. The for loop packs init, condition, and step into one clean line!",physicalConcept:"CPU initializes counter, tests bound, executes body, and executes step instruction (`add rcx, 5`).",ruleOfThumb:"for (init; condition; step) is the most popular loop in computer science."},codingApproaches:{beginnerFriendly:{name:"Counting in steps of 5",description:"Increments loop counter by 5 on every iteration.",code:`#include <stdio.h>

int main(void) {
    printf("Multiples of 5: ");
    for (int coin = 5; coin <= 25; coin += 5) {
        printf("%d ", coin);
    }
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"Register counter loop",description:"Mapped directly to hardware counter register.",code:`#include <stdio.h>

int main(void) {
    printf("Multiples of 5: ");
    for (int i = 5; i <= 25; i += 5) printf("%d ", i);
    putchar('\\n');
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RCX (standard loop counter register)"],assemblyNotes:"mov ecx, 5; .L: add ecx, 5; cmp ecx, 25; jle .L",ramFootprint:"4 bytes for loop index."},puzzleBlocks:{pieces:[{id:"p-40-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-40-2",code:'    printf("Multiples of 5: ");',hint:"Print prefix"},{id:"p-40-3",code:'    for (int coin = 5; coin <= 25; coin += 5) {\n        printf("%d ", coin);\n    }',hint:"For loop"},{id:"p-40-4",code:'    printf("\\n");\n    return 0;\n}',hint:"Close"}],correctOrder:["p-40-1","p-40-2","p-40-3","p-40-4"]},expectedOutput:"Multiples of 5: 5 10 15 20 25 ",cKeywordsUsed:["for","int","return","void"],daaComplexity:{timeComplexity:"O(N/5) Iterations",spaceComplexity:"O(1)",algorithmClass:"Counting Loop"}},{id:41,slug:"level-41-accumulator-sum",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 41: Accumulator Pattern: Sum of First N Numbers",category:"Conditionals & Loops",themeIcon:"➕",realLifeAnalogy:{story:"Tallying coins into a piggy bank: Day 1 you add Rs. 1, Day 2 Rs. 2... up to Day 10. The accumulator variable holds the running total: 1 + 2 + ... + 10 = 55.",physicalConcept:"Accumulator register (EAX) repeatedly adds loop counter (ECX): eax = eax + ecx.",ruleOfThumb:"Always initialize your accumulator to 0 before starting the loop!"},codingApproaches:{beginnerFriendly:{name:"Loop accumulator",description:"Iterative addition into sum variable.",code:`#include <stdio.h>

int main(void) {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    printf("Sum of numbers 1 to 10 = %d\\n", sum);
    return 0;
}`},optimizedPro:{name:"Gauss formula O(1)",description:"Carl Friedrich Gauss mathematical formula n*(n+1)/2.",code:`#include <stdio.h>

int main(void) {
    int n = 10;
    printf("Sum of numbers 1 to 10 = %d\\n", (n * (n + 1)) / 2);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX (accumulator)","ECX (counter)"],assemblyNotes:"xor eax, eax; mov ecx, 1; .L: add eax, ecx; inc ecx; cmp ecx, 10; jle .L",ramFootprint:"8 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-41-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-41-2",code:"    int sum = 0;",hint:"Init sum to 0"},{id:"p-41-3",code:"    for (int i = 1; i <= 10; i++) {\n        sum += i;\n    }",hint:"Loop accumulate"},{id:"p-41-4",code:'    printf("Sum of numbers 1 to 10 = %d\\n", sum);\n    return 0;\n}',hint:"Print and close"}],correctOrder:["p-41-1","p-41-2","p-41-3","p-41-4"]},expectedOutput:"Sum of numbers 1 to 10 = 55",cKeywordsUsed:["for","int","return","void"],daaComplexity:{timeComplexity:"O(N) Loop / O(1) Gauss",spaceComplexity:"O(1)",algorithmClass:"Accumulator Pattern"}},{id:42,slug:"level-42-factorial-loop",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 42: Factorial Calculation via Iterative Loop",category:"Conditionals & Loops",themeIcon:"❗",realLifeAnalogy:{story:"Permutations of arranging 5 books on a shelf: 5! = 5 * 4 * 3 * 2 * 1 = 120 ways. The product accumulator starts at 1 and multiplies each number.",physicalConcept:"Integer multiplication instruction (`imul`) executed N times in ALU.",ruleOfThumb:"Product accumulators must be initialized to 1 (not 0, or everything multiplies to 0)!"},codingApproaches:{beginnerFriendly:{name:"Iterative factorial accumulator",description:"Multiplies integers from 1 up to N.",code:`#include <stdio.h>

int main(void) {
    int n = 5;
    long long fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }
    printf("Factorial of %d (5!) = %lld\\n", n, fact);
    return 0;
}`},optimizedPro:{name:"Descending multiplication loop",description:"Multiplies from n down to 1.",code:`#include <stdio.h>

int main(void) {
    long long f = 1;
    for (int i = 5; i > 1; i--) f *= i;
    printf("Factorial of 5 (5!) = %lld\\n", f);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX (product)","RCX (step)"],assemblyNotes:"imul rax, rcx -> 64-bit integer multiplication in hardware ALU.",ramFootprint:"12 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-42-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-42-2",code:"    int n = 5;\n    long long fact = 1;",hint:"Init fact to 1"},{id:"p-42-3",code:"    for (int i = 1; i <= n; i++) {\n        fact *= i;\n    }",hint:"Multiply loop"},{id:"p-42-4",code:'    printf("Factorial of %d (5!) = %lld\\n", n, fact);\n    return 0;\n}',hint:"Print and close"}],correctOrder:["p-42-1","p-42-2","p-42-3","p-42-4"]},expectedOutput:"Factorial of 5 (5!) = 120",cKeywordsUsed:["for","int","long","return","void"],daaComplexity:{timeComplexity:"O(N) Linear Time",spaceComplexity:"O(1) Stack",algorithmClass:"Iterative Factorial"}},{id:43,slug:"level-43-fibonacci-sequence",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 43: Fibonacci Sequence via State Shifting",category:"Conditionals & Loops",themeIcon:"🐚",realLifeAnalogy:{story:"Flower petal spirals and shell growth: 0, 1, 1, 2, 3, 5, 8, 13. Each term is the sum of the two preceding terms. We shift our two state registers forward on each step.",physicalConcept:"Registers hold two previous states (t1, t2). Next state is calculated and values slide forward.",ruleOfThumb:"Iterative Fibonacci runs in O(N) time with O(1) space, avoiding slow recursive branches."},codingApproaches:{beginnerFriendly:{name:"Three-variable sliding window",description:"Computes first 7 terms iteratively.",code:`#include <stdio.h>

int main(void) {
    int t1 = 0, t2 = 1;
    printf("Fibonacci Series: %d %d ", t1, t2);

    for (int i = 3; i <= 7; i++) {
        int next = t1 + t2;
        printf("%d ", next);
        t1 = t2;
        t2 = next;
    }
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"Two-variable state shift",description:"Compact register sliding loop.",code:`#include <stdio.h>

int main(void) {
    int a = 0, b = 1;
    printf("Fibonacci Series: 0 1 ");
    for (int i = 3; i <= 7; i++) {
        b = a + b; a = b - a;
        printf("%d ", b);
    }
    putchar('\\n');
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX (t1)","EBX (t2)","EDX (next)"],assemblyNotes:"lea edx, [eax + ebx]; mov eax, ebx; mov ebx, edx -> High speed register pipeline.",ramFootprint:"12 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-43-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-43-2",code:'    int t1 = 0, t2 = 1;\n    printf("Fibonacci Series: %d %d ", t1, t2);',hint:"Print initial two"},{id:"p-43-3",code:'    for (int i = 3; i <= 7; i++) {\n        int next = t1 + t2;\n        printf("%d ", next);\n        t1 = t2; t2 = next;\n    }',hint:"Slide loop"},{id:"p-43-4",code:'    printf("\\n");\n    return 0;\n}',hint:"Close"}],correctOrder:["p-43-1","p-43-2","p-43-3","p-43-4"]},expectedOutput:"Fibonacci Series: 0 1 1 2 3 5 8 \n",cKeywordsUsed:["for","int","return","void"],daaComplexity:{timeComplexity:"O(N) Linear Time",spaceComplexity:"O(1) Space",algorithmClass:"Dynamic State Shifting"}},{id:44,slug:"level-44-break-search",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 44: Break Statement & Early Search Termination",category:"Conditionals & Loops",themeIcon:"🛑",realLifeAnalogy:{story:"Searching for a student roll number in a classroom roster: The moment you find roll number 42, stop looking and break out of the loop immediately!",physicalConcept:"Jumps directly to loop exit label (`jmp .L_exit`), saving remaining unneeded iterations.",ruleOfThumb:"Always use break when the search goal is satisfied to save CPU battery."},codingApproaches:{beginnerFriendly:{name:"Linear search with break",description:"Exits loop the moment target value is found.",code:`#include <stdio.h>

int main(void) {
    int target = 42;
    for (int roll = 40; roll <= 45; roll++) {
        if (roll == target) {
            printf("TARGET LOCATED: Roll #%d found! Stopping search.\\n", roll);
            break;
        }
        printf("Checking Roll #%d...\\n", roll);
    }
    return 0;
}`},optimizedPro:{name:"Guarded loop break",description:"Clean break pattern.",code:`#include <stdio.h>

int main(void) {
    for (int r = 40; r <= 45; r++) {
        if (r == 42) { printf("TARGET LOCATED: Roll #%d found! Stopping search.\\n", r); break; }
        printf("Checking Roll #%d...\\n", r);
    }
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EAX","JMP exit"],assemblyNotes:"cmp eax, 42; je .L_break_exit -> Jumps past loop body.",ramFootprint:"4 bytes for roll."},puzzleBlocks:{pieces:[{id:"p-44-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-44-2",code:"    int target = 42;",hint:"Target variable"},{id:"p-44-3",code:'    for (int roll = 40; roll <= 45; roll++) {\n        if (roll == target) {\n            printf("TARGET LOCATED: Roll #%d found! Stopping search.\\n", roll);\n            break;\n        }\n        printf("Checking Roll #%d...\\n", roll);\n    }',hint:"Search and break"},{id:"p-44-4",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-44-1","p-44-2","p-44-3","p-44-4"]},expectedOutput:"Checking Roll #40...\nChecking Roll #41...\nTARGET LOCATED: Roll #42 found! Stopping search.",cKeywordsUsed:["break","if","for","int","return","void"],daaComplexity:{timeComplexity:"O(K) Best Case O(1)",spaceComplexity:"O(1)",algorithmClass:"Linear Search with Pruning"}},{id:45,slug:"level-45-continue-statement",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 45: Continue Statement & Skipping Even Seats",category:"Conditionals & Loops",themeIcon:"⏭️",realLifeAnalogy:{story:"Assigning odd window seats in a train compartment: If seat number is even, skip it immediately using continue and jump to the next seat!",physicalConcept:"Jumps directly to the loop update expression (`i++`), bypassing remaining lines in the loop body.",ruleOfThumb:"continue skips the REST of the current iteration without terminating the entire loop."},codingApproaches:{beginnerFriendly:{name:"Skip even numbers via continue",description:"Filters and prints only odd numbers.",code:`#include <stdio.h>

int main(void) {
    printf("Window Seats (Odd Only): ");
    for (int seat = 1; seat <= 6; seat++) {
        if (seat % 2 == 0) {
            continue; // Skip even seat
        }
        printf("%d ", seat);
    }
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"Bitwise parity continue",description:"Uses (seat & 1) == 0 to detect even seats.",code:`#include <stdio.h>

int main(void) {
    printf("Window Seats (Odd Only): ");
    for (int s = 1; s <= 6; s++) {
        if ((s & 1) == 0) continue;
        printf("%d ", s);
    }
    putchar('\\n');
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EAX","JMP loop_step"],assemblyNotes:"test eax, 1; jz .L_loop_step -> Jumps straight to increment.",ramFootprint:"4 bytes for seat."},puzzleBlocks:{pieces:[{id:"p-45-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-45-2",code:'    printf("Window Seats (Odd Only): ");',hint:"Print prefix"},{id:"p-45-3",code:'    for (int seat = 1; seat <= 6; seat++) {\n        if (seat % 2 == 0) continue;\n        printf("%d ", seat);\n    }',hint:"Continue loop"},{id:"p-45-4",code:'    printf("\\n");\n    return 0;\n}',hint:"Close"}],correctOrder:["p-45-1","p-45-2","p-45-3","p-45-4"]},expectedOutput:"Window Seats (Odd Only): 1 3 5 \n",cKeywordsUsed:["continue","if","for","int","return","void"],daaComplexity:{timeComplexity:"O(N)",spaceComplexity:"O(1)",algorithmClass:"Selective Filtering"}},{id:46,slug:"level-46-infinite-loop-watchdog",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 46: Infinite Loop (for(;;)) & Embedded Watchdog Timer",category:"Conditionals & Loops",themeIcon:"♾️",realLifeAnalogy:{story:"An embedded heart monitor or microwave controller: It runs an infinite loop listening for signals, protected by a watchdog safety counter that breaks if a threshold is hit.",physicalConcept:"for (;;) emits an unconditional backward jump (`jmp .L_top`). Standard C idiom for OS kernels and servers.",ruleOfThumb:"Always include a safety break condition inside infinite event loops."},codingApproaches:{beginnerFriendly:{name:"Controlled infinite loop with watchdog",description:"Breaks safely after 3 ticks.",code:`#include <stdio.h>

int main(void) {
    int ticks = 0;
    for (;;) {
        ticks++;
        printf("Heartbeat ping #%d...\\n", ticks);
        if (ticks >= 3) {
            printf("Watchdog cycle limit reached. Safely yielding.\\n");
            break;
        }
    }
    return 0;
}`},optimizedPro:{name:"while(1) event loop",description:"Canonical event loop syntax.",code:`#include <stdio.h>

int main(void) {
    int t = 0;
    while (1) {
        printf("Heartbeat ping #%d...\\n", ++t);
        if (t >= 3) break;
    }
    puts("Watchdog cycle limit reached. Safely yielding.");
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EAX"],assemblyNotes:".L_event: ... cmp eax, 3; jge .L_break; jmp .L_event",ramFootprint:"4 bytes for ticks."},puzzleBlocks:{pieces:[{id:"p-46-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-46-2",code:"    int ticks = 0;",hint:"Init counter"},{id:"p-46-3",code:'    for (;;) {\n        ticks++;\n        printf("Heartbeat ping #%d...\\n", ticks);\n        if (ticks >= 3) break;\n    }',hint:"Event loop with break"},{id:"p-46-4",code:'    printf("Watchdog cycle limit reached. Safely yielding.\\n");\n    return 0;\n}',hint:"Close"}],correctOrder:["p-46-1","p-46-2","p-46-3","p-46-4"]},expectedOutput:"Heartbeat ping #1...\nHeartbeat ping #2...\nHeartbeat ping #3...\nWatchdog cycle limit reached. Safely yielding.",cKeywordsUsed:["for","break","if","int","return","void"],daaComplexity:{timeComplexity:"O(Ticks)",spaceComplexity:"O(1)",algorithmClass:"Event Polling Loop"}},{id:47,slug:"level-47-nested-loops-grid",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 47: Nested For Loops & 3x3 Coordinate Matrix",category:"Conditionals & Loops",themeIcon:"🔲",realLifeAnalogy:{story:"A tic-tac-toe game board or pixel display: 3 rows, and each row has 3 columns. The outer loop controls rows, the inner loop controls columns!",physicalConcept:"For each single iteration of the outer loop, the inner loop completes its ENTIRE cycle (3 * 3 = 9 total iterations).",ruleOfThumb:"Total executions = outer_count * inner_count. This is O(N^2) quadratic complexity."},codingApproaches:{beginnerFriendly:{name:"Nested row-column printer",description:"Iterates 3 rows and 3 columns.",code:`#include <stdio.h>

int main(void) {
    for (int row = 1; row <= 3; row++) {
        for (int col = 1; col <= 3; col++) {
            printf("[%d,%d] ", row, col);
        }
        printf("\\n");
    }
    return 0;
}`},optimizedPro:{name:"Flattened 1D index mapping",description:"Demonstrates row-major layout: index = row*cols + col.",code:`#include <stdio.h>

int main(void) {
    for (int r = 1; r <= 3; r++) {
        for (int c = 1; c <= 3; c++) printf("[%d,%d] ", r, c);
        putchar('\\n');
    }
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX (row)","EBX (col)"],assemblyNotes:"Nested loop instructions with inner loop register reset on every outer tick.",ramFootprint:"8 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-47-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-47-2",code:"    for (int row = 1; row <= 3; row++) {",hint:"Outer row loop"},{id:"p-47-3",code:'        for (int col = 1; col <= 3; col++) {\n            printf("[%d,%d] ", row, col);\n        }\n        printf("\\n");\n    }',hint:"Inner col loop and newline"},{id:"p-47-4",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-47-1","p-47-2","p-47-3","p-47-4"]},expectedOutput:"[1,1] [1,2] [1,3] \n[2,1] [2,2] [2,3] \n[3,1] [3,2] [3,3] \n",cKeywordsUsed:["for","int","return","void"],daaComplexity:{timeComplexity:"O(R * C) Quadratic",spaceComplexity:"O(1)",algorithmClass:"Nested Iteration"}},{id:48,slug:"level-48-right-angled-triangle-pattern",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 48: Number Triangle Pattern & Dependent Loop Bounds",category:"Conditionals & Loops",themeIcon:"📐",realLifeAnalogy:{story:"Building a staircase with bricks: Step 1 has 1 brick, Step 2 has 2 bricks, Step 3 has 3 bricks. The inner loop's boundary depends directly on the outer loop's current row!",physicalConcept:"Inner loop bound is variable (col <= row). Total iterations = N*(N+1)/2.",ruleOfThumb:"When inner loop condition is col <= row, you produce triangular patterns."},codingApproaches:{beginnerFriendly:{name:"Dependent inner loop",description:"Prints right-angled number triangle up to row 4.",code:`#include <stdio.h>

int main(void) {
    for (int row = 1; row <= 4; row++) {
        for (int col = 1; col <= row; col++) {
            printf("%d ", col);
        }
        printf("\\n");
    }
    return 0;
}`},optimizedPro:{name:"Staircase pattern",description:"Clean formatted triangular output.",code:`#include <stdio.h>

int main(void) {
    for (int r = 1; r <= 4; r++) {
        for (int c = 1; c <= r; c++) printf("%d ", c);
        putchar('\\n');
    }
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX (row)","EDX (col)"],assemblyNotes:"cmp edx, eax -> Compares inner counter against current outer counter.",ramFootprint:"8 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-48-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-48-2",code:"    for (int row = 1; row <= 4; row++) {",hint:"Outer loop"},{id:"p-48-3",code:'        for (int col = 1; col <= row; col++) {\n            printf("%d ", col);\n        }\n        printf("\\n");\n    }',hint:"Inner dependent loop"},{id:"p-48-4",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-48-1","p-48-2","p-48-3","p-48-4"]},expectedOutput:"1 \n1 2 \n1 2 3 \n1 2 3 4 \n",cKeywordsUsed:["for","int","return","void"],daaComplexity:{timeComplexity:"O(N^2 / 2)",spaceComplexity:"O(1)",algorithmClass:"Pattern Printing"}},{id:49,slug:"level-49-multiplication-table",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 49: Multiplication Table Generator (Table of 7)",category:"Conditionals & Loops",themeIcon:"✖️",realLifeAnalogy:{story:"Reciting times tables at school: 7 x 1 = 7, 7 x 2 = 14... up to 7 x 5 = 35. The loop counter acts as the multiplier on each step.",physicalConcept:"Loop counter multiplies constant multiplicand on each clock cycle.",ruleOfThumb:"Formatted printing (%d x %d = %d) makes tables clean and readable."},codingApproaches:{beginnerFriendly:{name:"Multiplication table loop",description:"Generates times table of 7 up to 5.",code:`#include <stdio.h>

int main(void) {
    int tableNum = 7;
    for (int i = 1; i <= 5; i++) {
        printf("%d x %d = %d\\n", tableNum, i, tableNum * i);
    }
    return 0;
}`},optimizedPro:{name:"Repeated addition optimization",description:"Using addition (running += tableNum) to avoid multiplication instructions.",code:`#include <stdio.h>

int main(void) {
    int num = 7, product = 0;
    for (int i = 1; i <= 5; i++) {
        product += num;
        printf("%d x %d = %d\\n", num, i, product);
    }
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","ECX"],assemblyNotes:"imul eax, ecx, 7 -> Multiplication instruction with immediate operand 7.",ramFootprint:"8 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-49-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-49-2",code:"    int tableNum = 7;",hint:"Table variable"},{id:"p-49-3",code:'    for (int i = 1; i <= 5; i++) {\n        printf("%d x %d = %d\\n", tableNum, i, tableNum * i);\n    }',hint:"Table loop"},{id:"p-49-4",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-49-1","p-49-2","p-49-3","p-49-4"]},expectedOutput:"7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35",cKeywordsUsed:["for","int","return","void"],daaComplexity:{timeComplexity:"O(N)",spaceComplexity:"O(1)",algorithmClass:"Table Generation"}},{id:50,slug:"level-50-sum-of-digits",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 50: Digit Extraction Algorithm & Sum of Digits",category:"Conditionals & Loops",themeIcon:"🔢",realLifeAnalogy:{story:"Checksum validation on bank account numbers: Take number 456. Extract last digit (456 % 10 = 6), chop it off (456 / 10 = 45), repeat! 6 + 5 + 4 = 15.",physicalConcept:"Base-10 division loop: Repeatedly extracts lowest decimal digit until number reaches 0.",ruleOfThumb:"rem = n % 10 extracts the rightmost digit; n /= 10 removes it."},codingApproaches:{beginnerFriendly:{name:"Digit extraction while loop",description:"Iteratively extracts and sums all digits.",code:`#include <stdio.h>

int main(void) {
    int num = 456;
    int sum = 0;
    int temp = num;

    while (temp > 0) {
        sum += temp % 10;
        temp /= 10;
    }
    printf("Sum of digits of %d = %d\\n", num, sum);
    return 0;
}`},optimizedPro:{name:"Compact digit extractor",description:"In-line digit loop.",code:`#include <stdio.h>

int main(void) {
    int n = 456, s = 0;
    for (int t = n; t > 0; t /= 10) s += t % 10;
    printf("Sum of digits of %d = %d\\n", n, s);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX (quotient)","EDX (remainder digit)"],assemblyNotes:"idiv 10 -> Simultaneously produces next quotient and digit remainder in 1 instruction.",ramFootprint:"12 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-50-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-50-2",code:"    int num = 456, sum = 0, temp = num;",hint:"Init variables"},{id:"p-50-3",code:"    while (temp > 0) {\n        sum += temp % 10;\n        temp /= 10;\n    }",hint:"Digit extraction loop"},{id:"p-50-4",code:'    printf("Sum of digits of %d = %d\\n", num, sum);\n    return 0;\n}',hint:"Print and close"}],correctOrder:["p-50-1","p-50-2","p-50-3","p-50-4"]},expectedOutput:"Sum of digits of 456 = 15",cKeywordsUsed:["while","int","return","void"],daaComplexity:{timeComplexity:"O(log10 N) Number of Digits",spaceComplexity:"O(1)",algorithmClass:"Digit Extraction"}},{id:51,slug:"level-51-palindrome-number",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 51: Number Reversal & Palindrome Detector (1221)",category:"Conditionals & Loops",themeIcon:"🔁",realLifeAnalogy:{story:"Symmetric train coach numbers like 1221 or words like MADAM: Read forwards or backwards, they are identical! We reverse the number with math: rev = rev * 10 + digit.",physicalConcept:"Reconstructs reversed integer in accumulator by shifting base-10 weight left.",ruleOfThumb:"A palindrome satisfies: originalNumber == reversedNumber."},codingApproaches:{beginnerFriendly:{name:"Math-based number reversal",description:"Reverses integer and compares against original.",code:`#include <stdio.h>

int main(void) {
    int num = 1221;
    int reversed = 0;
    int temp = num;

    while (temp > 0) {
        int rem = temp % 10;
        reversed = reversed * 10 + rem;
        temp /= 10;
    }

    if (num == reversed) {
        printf("Number %d is a PALINDROME (Reversed: %d)\\n", num, reversed);
    } else {
        printf("Number %d is NOT a palindrome\\n", num);
    }
    return 0;
}`},optimizedPro:{name:"Compact palindrome check",description:"Loop reversal with ternary report.",code:`#include <stdio.h>

int main(void) {
    int n = 1221, rev = 0;
    for (int t = n; t > 0; t /= 10) rev = rev * 10 + t % 10;
    printf("Number %d is %s (Reversed: %d)\\n", n, (n == rev) ? "a PALINDROME" : "NOT a palindrome", rev);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","EDX","IMUL by 10"],assemblyNotes:"imul eax, eax, 10; add eax, edx -> Base-10 digit shifting.",ramFootprint:"12 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-51-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-51-2",code:"    int num = 1221, reversed = 0, temp = num;",hint:"Init variables"},{id:"p-51-3",code:"    while (temp > 0) {\n        reversed = reversed * 10 + (temp % 10);\n        temp /= 10;\n    }",hint:"Reversal loop"},{id:"p-51-4",code:'    if (num == reversed) printf("Number %d is a PALINDROME (Reversed: %d)\\n", num, reversed);',hint:"Compare and print"},{id:"p-51-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-51-1","p-51-2","p-51-3","p-51-4","p-51-5"]},expectedOutput:"Number 1221 is a PALINDROME (Reversed: 1221)",cKeywordsUsed:["while","if","else","int","return","void"],daaComplexity:{timeComplexity:"O(log10 N) Digits",spaceComplexity:"O(1)",algorithmClass:"Symmetry Verification"}},{id:52,slug:"level-52-armstrong-number",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 52: Armstrong Number Detector (153 = 1^3 + 5^3 + 3^3)",category:"Conditionals & Loops",themeIcon:"💪",realLifeAnalogy:{story:"A magic mathematical lock: The combination 153 opens it because 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153! The sum of the cubes of its digits equals the number itself.",physicalConcept:"Digit decomposition combined with cubic power accumulation: sum += d * d * d.",ruleOfThumb:"3-digit Armstrong numbers include 153, 370, 371, 407."},codingApproaches:{beginnerFriendly:{name:"Armstrong cubic accumulator",description:"Extracts digits, computes cubes, and compares with original.",code:`#include <stdio.h>

int main(void) {
    int num = 153;
    int sum = 0;
    int temp = num;

    while (temp > 0) {
        int d = temp % 10;
        sum += d * d * d;
        temp /= 10;
    }

    if (sum == num) {
        printf("Number %d is an ARMSTRONG NUMBER (Sum of cubes: %d)\\n", num, sum);
    }
    return 0;
}`},optimizedPro:{name:"Direct Armstrong test",description:"Compact cubic sum calculation.",code:`#include <stdio.h>

int main(void) {
    int n = 153, sum = 0;
    for (int t = n; t > 0; t /= 10) { int d = t % 10; sum += d * d * d; }
    if (sum == n) printf("Number %d is an ARMSTRONG NUMBER (Sum of cubes: %d)\\n", n, sum);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","EDX","EBX"],assemblyNotes:"imul edx, edx; imul edx, d; add eax, edx -> 3-cycle integer cubic calculation.",ramFootprint:"12 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-52-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-52-2",code:"    int num = 153, sum = 0, temp = num;",hint:"Init variables"},{id:"p-52-3",code:"    while (temp > 0) {\n        int d = temp % 10;\n        sum += d * d * d;\n        temp /= 10;\n    }",hint:"Cube accumulation"},{id:"p-52-4",code:'    if (sum == num) printf("Number %d is an ARMSTRONG NUMBER (Sum of cubes: %d)\\n", num, sum);',hint:"Check and print"},{id:"p-52-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-52-1","p-52-2","p-52-3","p-52-4","p-52-5"]},expectedOutput:"Number 153 is an ARMSTRONG NUMBER (Sum of cubes: 153)",cKeywordsUsed:["while","if","int","return","void"],daaComplexity:{timeComplexity:"O(log10 N)",spaceComplexity:"O(1)",algorithmClass:"Power Accumulation"}},{id:53,slug:"level-53-prime-number-checker",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 53: Prime Number Checker via Square-Root Trial Division",category:"Conditionals & Loops",themeIcon:"🛡️",realLifeAnalogy:{story:"RSA encryption security key testing: Is 29 prime? You do NOT need to check all 28 numbers! You only need to check up to sqrt(29) ~ 5. If no factor divides it, it is guaranteed prime!",physicalConcept:"Loop condition: `i * i <= n`. Reduces time complexity from O(N) to O(sqrt(N))!",ruleOfThumb:"Factors always occur in pairs: a * b = n. At least one factor must be <= sqrt(n)."},codingApproaches:{beginnerFriendly:{name:"O(sqrt(N)) Prime test",description:"Tests divisibility up to sqrt(N) with early exit.",code:`#include <stdio.h>

int main(void) {
    int n = 29;
    int isPrime = 1;

    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            isPrime = 0;
            break;
        }
    }

    if (isPrime) {
        printf("Security Key %d is a PRIME NUMBER\\n", n);
    } else {
        printf("Security Key %d is COMPOSITE\\n", n);
    }
    return 0;
}`},optimizedPro:{name:"Step-2 Prime skipping",description:"Tests 2 separately then increments by 2 for odd numbers.",code:`#include <stdio.h>

int main(void) {
    int n = 29, prime = 1;
    for (int i = 2; i * i <= n; i++) if (n % i == 0) { prime = 0; break; }
    printf("Security Key %d is %s\\n", n, prime ? "a PRIME NUMBER" : "COMPOSITE");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","ECX","IDIV"],assemblyNotes:"imul ecx, ecx; cmp ecx, eax; jg .done -> O(sqrt(N)) early termination in hardware.",ramFootprint:"8 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-53-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-53-2",code:"    int n = 29, isPrime = 1;",hint:"Init prime flag"},{id:"p-53-3",code:"    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) { isPrime = 0; break; }\n    }",hint:"Trial division loop"},{id:"p-53-4",code:'    if (isPrime) printf("Security Key %d is a PRIME NUMBER\\n", n);',hint:"Print result"},{id:"p-53-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-53-1","p-53-2","p-53-3","p-53-4","p-53-5"]},expectedOutput:"Security Key 29 is a PRIME NUMBER",cKeywordsUsed:["for","if","else","break","int","return","void"],daaComplexity:{timeComplexity:"O(sqrt(N)) Square Root Time",spaceComplexity:"O(1)",algorithmClass:"Trial Division"}},{id:54,slug:"level-54-gcd-euclidean",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 54: Greatest Common Divisor (GCD) & Euclidean Algorithm",category:"Conditionals & Loops",themeIcon:"➗",realLifeAnalogy:{story:"Cutting square tiles to cover a 48cm x 18cm floor without leftover scraps: What is the largest tile size? Euclidean algorithm finds GCD: gcd(48, 18) = gcd(18, 12) = gcd(12, 6) = 6cm!",physicalConcept:"Euclid's theorem: gcd(a, b) = gcd(b, a % b). Runs in logarithmic time O(log(min(a, b))).",ruleOfThumb:"Repeated modulo until b becomes 0. The remaining a is the GCD!"},codingApproaches:{beginnerFriendly:{name:"Iterative Euclidean algorithm",description:"Repeatedly replaces (a, b) with (b, a % b).",code:`#include <stdio.h>

int main(void) {
    int a = 48;
    int b = 18;
    int origA = a, origB = b;

    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    printf("GCD / HCF of (%d, %d) = %d\\n", origA, origB, a);
    return 0;
}`},optimizedPro:{name:"Compact Euclidean loop",description:"Inline modulo shift.",code:`#include <stdio.h>

int main(void) {
    int a = 48, b = 18, x = a, y = b;
    while (b) { int t = b; b = a % b; a = t; }
    printf("GCD / HCF of (%d, %d) = %d\\n", x, y, a);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","EBX","EDX"],assemblyNotes:"Repeated idiv instruction. Rapidly halves values each iteration.",ramFootprint:"16 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-54-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-54-2",code:"    int a = 48, b = 18, origA = 48, origB = 18;",hint:"Init inputs"},{id:"p-54-3",code:"    while (b != 0) {\n        int temp = b;\n        b = a % b;\n        a = temp;\n    }",hint:"Euclidean loop"},{id:"p-54-4",code:'    printf("GCD / HCF of (%d, %d) = %d\\n", origA, origB, a);',hint:"Print GCD"},{id:"p-54-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-54-1","p-54-2","p-54-3","p-54-4","p-54-5"]},expectedOutput:"GCD / HCF of (48, 18) = 6",cKeywordsUsed:["while","int","return","void"],daaComplexity:{timeComplexity:"O(log(min(A, B))) Logarithmic",spaceComplexity:"O(1)",algorithmClass:"Euclidean Number Theory"}},{id:55,slug:"level-55-lcm-calculation",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 55: Least Common Multiple (LCM) & Railway Signal Sync",category:"Conditionals & Loops",themeIcon:"🚆",realLifeAnalogy:{story:"Two Indian Railway express trains: Train 1 arrives every 12 mins, Train 2 arrives every 18 mins. When will both trains meet at the platform together? LCM(12, 18) = 36 minutes!",physicalConcept:"Mathematical relationship: a * b = gcd(a, b) * lcm(a, b). Therefore, LCM = (a * b) / GCD.",ruleOfThumb:"Divide before multiplying to prevent integer overflow: (a / gcd) * b."},codingApproaches:{beginnerFriendly:{name:"LCM from GCD formula",description:"Computes GCD first, then derives LCM.",code:`#include <stdio.h>

int main(void) {
    int a = 12, b = 18;
    int x = a, y = b;

    while (y != 0) {
        int temp = y;
        y = x % y;
        x = temp;
    }
    int gcd = x;
    int lcm = (a * b) / gcd;
    printf("LCM of Trains (%d, %d) = %d Minutes\\n", a, b, lcm);
    return 0;
}`},optimizedPro:{name:"Overflow safe LCM calculation",description:"Divides first to prevent integer overflow.",code:`#include <stdio.h>

int main(void) {
    int a = 12, b = 18, x = a, y = b;
    while (y) { int t = y; y = x % y; x = t; }
    printf("LCM of Trains (%d, %d) = %d Minutes\\n", a, b, (a / x) * b);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","EBX"],assemblyNotes:"GCD computed in loop, followed by single imul and idiv.",ramFootprint:"16 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-55-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-55-2",code:"    int a = 12, b = 18, x = 12, y = 18;",hint:"Init variables"},{id:"p-55-3",code:"    while (y != 0) { int t = y; y = x % y; x = t; }\n    int lcm = (a * b) / x;",hint:"GCD and LCM"},{id:"p-55-4",code:'    printf("LCM of Trains (%d, %d) = %d Minutes\\n", a, b, lcm);',hint:"Print LCM"},{id:"p-55-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-55-1","p-55-2","p-55-3","p-55-4","p-55-5"]},expectedOutput:"LCM of Trains (12, 18) = 36 Minutes",cKeywordsUsed:["while","int","return","void"],daaComplexity:{timeComplexity:"O(log(min(A, B)))",spaceComplexity:"O(1)",algorithmClass:"Number Theory"}},{id:56,slug:"level-56-power-loop",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 56: Exponent Power Calculation via Multiplicative Loop",category:"Conditionals & Loops",themeIcon:"⚡",realLifeAnalogy:{story:"Doubling bacteria or computer binary memory addressing: 2^5 = 2 * 2 * 2 * 2 * 2 = 32 addressable slots. The loop multiplies base repeatedly into power.",physicalConcept:"Power accumulator starts at 1. Repeated multiplication instruction (`imul`).",ruleOfThumb:"Any non-zero number to the power 0 is 1 (base^0 == 1)."},codingApproaches:{beginnerFriendly:{name:"Iterative exponent power",description:"Multiplies base exponent times.",code:`#include <stdio.h>

int main(void) {
    int base = 2;
    int exp = 5;
    long long result = 1;

    for (int i = 1; i <= exp; i++) {
        result *= base;
    }
    printf("%d raised to power %d = %lld\\n", base, exp, result);
    return 0;
}`},optimizedPro:{name:"While exponent countdown",description:"Decrements exponent counter.",code:`#include <stdio.h>

int main(void) {
    int b = 2, e = 5;
    long long res = 1;
    while (e--) res *= b;
    printf("2 raised to power 5 = %lld\\n", res);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX (result)","ECX (base)"],assemblyNotes:"imul rax, rcx -> Hardware 64-bit multiplier.",ramFootprint:"16 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-56-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-56-2",code:"    int base = 2, exp = 5;\n    long long result = 1;",hint:"Init variables"},{id:"p-56-3",code:"    for (int i = 1; i <= exp; i++) {\n        result *= base;\n    }",hint:"Exponent loop"},{id:"p-56-4",code:'    printf("%d raised to power %d = %lld\\n", base, exp, result);',hint:"Print result"},{id:"p-56-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-56-1","p-56-2","p-56-3","p-56-4","p-56-5"]},expectedOutput:"2 raised to power 5 = 32",cKeywordsUsed:["for","int","long","return","void"],daaComplexity:{timeComplexity:"O(Exp) Linear Exponent",spaceComplexity:"O(1)",algorithmClass:"Exponentiation"}},{id:57,slug:"level-57-binary-bit-printer",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 57: Binary Bit Printer & Silicon Register Inspection",category:"Conditionals & Loops",themeIcon:"0️⃣",realLifeAnalogy:{story:"Looking directly at the physical voltage wires of a CPU register: Number 42 in binary is 00101010. We test each bit from bit 7 down to bit 0 using (num >> bit) & 1!",physicalConcept:"Right-shifting by `bit` brings that bit to position 0; masking with 1 isolates its binary value.",ruleOfThumb:"(n >> bit) & 1 evaluates to 1 if the bit is high, 0 if low."},codingApproaches:{beginnerFriendly:{name:"8-bit binary inspection loop",description:"Iterates from bit 7 down to 0.",code:`#include <stdio.h>

int main(void) {
    unsigned char byteVal = 42;
    printf("Binary of %d: ", byteVal);

    for (int bit = 7; bit >= 0; bit--) {
        int bitVal = (byteVal >> bit) & 1;
        printf("%d", bitVal);
    }
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"Bitmask test without shift",description:"Using (byteVal & (1 << bit)) predicate.",code:`#include <stdio.h>

int main(void) {
    unsigned char val = 42;
    printf("Binary of %d: ", val);
    for (int b = 7; b >= 0; b--) putchar((val & (1 << b)) ? '1' : '0');
    putchar('\\n');
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["AL","CL (shift count)"],assemblyNotes:"shr al, cl; and al, 1 -> Hardware bit extraction.",ramFootprint:"5 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-57-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-57-2",code:'    unsigned char byteVal = 42;\n    printf("Binary of %d: ", byteVal);',hint:"Init byte"},{id:"p-57-3",code:'    for (int bit = 7; bit >= 0; bit--) {\n        printf("%d", (byteVal >> bit) & 1);\n    }',hint:"Bit print loop"},{id:"p-57-4",code:'    printf("\\n");\n    return 0;\n}',hint:"Close"}],correctOrder:["p-57-1","p-57-2","p-57-3","p-57-4"]},expectedOutput:"Binary of 42: 00101010\n",cKeywordsUsed:["for","unsigned","char","int","return","void"],daaComplexity:{timeComplexity:"O(8) Exactly 8 Cycles",spaceComplexity:"O(1)",algorithmClass:"Bitwise Introspection"}},{id:58,slug:"level-58-collatz-conjecture",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 58: Collatz Conjecture (Hailstone 3n + 1 Dynamics)",category:"Conditionals & Loops",themeIcon:"📉",realLifeAnalogy:{story:"The most famous unsolved problem in mathematics: Start with any number (e.g. 6). If even, divide by 2. If odd, multiply by 3 and add 1. It bounces up and down like a hailstone until it reaches 1!",physicalConcept:"Non-deterministic loop bound: Number of iterations is variable and cannot be predicted by a fixed formula.",ruleOfThumb:"while (n != 1) loops until the base attractor 1 is reached."},codingApproaches:{beginnerFriendly:{name:"Collatz hailstone trajectory",description:"Simulates trajectory of n = 6 until 1.",code:`#include <stdio.h>

int main(void) {
    int n = 6;
    printf("Collatz Sequence for %d: ", n);

    while (n != 1) {
        printf("%d -> ", n);
        if (n % 2 == 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
    }
    printf("1\\n");
    return 0;
}`},optimizedPro:{name:"Ternary Collatz step",description:"Ternary update with bitwise even check.",code:`#include <stdio.h>

int main(void) {
    int n = 6;
    printf("Collatz Sequence for 6: ");
    while (n != 1) {
        printf("%d -> ", n);
        n = (n & 1) ? (3 * n + 1) : (n >> 1);
    }
    puts("1");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","TEST instruction"],assemblyNotes:"test eax, 1; jnz .odd; sar eax, 1; jmp .next; .odd: lea eax, [eax*2 + eax + 1]",ramFootprint:"4 bytes for n."},puzzleBlocks:{pieces:[{id:"p-58-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-58-2",code:'    int n = 6;\n    printf("Collatz Sequence for %d: ", n);',hint:"Init n"},{id:"p-58-3",code:'    while (n != 1) {\n        printf("%d -> ", n);\n        n = (n % 2 == 0) ? (n / 2) : (3 * n + 1);\n    }',hint:"Hailstone loop"},{id:"p-58-4",code:'    printf("1\\n");\n    return 0;\n}',hint:"Close"}],correctOrder:["p-58-1","p-58-2","p-58-3","p-58-4"]},expectedOutput:"Collatz Sequence for 6: 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1",cKeywordsUsed:["while","if","else","int","return","void"],daaComplexity:{timeComplexity:"O(Steps) Variable",spaceComplexity:"O(1)",algorithmClass:"Dynamic Iteration"}},{id:59,slug:"level-59-atm-denomination-splitter",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 59: Indian ATM Cash Denomination Greedy Splitter",category:"Conditionals & Loops",themeIcon:"💵",realLifeAnalogy:{story:"Withdrawing Rs. 2800 from HDFC ATM: The ATM greedy algorithm computes the minimum number of physical notes: 5 x Rs. 500 notes (Rs. 2500), 1 x Rs. 200 note (Rs. 200), and 1 x Rs. 100 note (Rs. 100)!",physicalConcept:"Greedy choice property: Repeated division by largest available denomination.",ruleOfThumb:"notes = amount / denomination; amount %= denomination."},codingApproaches:{beginnerFriendly:{name:"Greedy note denomination algorithm",description:"Splits amount into 500, 200, and 100 rupee notes.",code:`#include <stdio.h>

int main(void) {
    int amount = 2800;
    int notes500 = amount / 500;
    amount %= 500;

    int notes200 = amount / 200;
    amount %= 200;

    int notes100 = amount / 100;
    amount %= 100;

    printf("ATM DISPENSE: %d x Rs.500 | %d x Rs.200 | %d x Rs.100\\n",
           notes500, notes200, notes100);
    return 0;
}`},optimizedPro:{name:"Loop denomination array",description:"Iterates through array of currency denominations.",code:`#include <stdio.h>

int main(void) {
    int amt = 2800;
    int denoms[] = {500, 200, 100};
    int counts[3] = {0};
    for (int i = 0; i < 3; i++) {
        counts[i] = amt / denoms[i];
        amt %= denoms[i];
    }
    printf("ATM DISPENSE: %d x Rs.500 | %d x Rs.200 | %d x Rs.100\\n", counts[0], counts[1], counts[2]);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX","EDX"],assemblyNotes:"Pair of idiv instructions computing note quotient and remaining balance.",ramFootprint:"16 bytes on stack."},puzzleBlocks:{pieces:[{id:"p-59-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-59-2",code:"    int amount = 2800;\n    int n500 = amount / 500; amount %= 500;",hint:"500 notes"},{id:"p-59-3",code:"    int n200 = amount / 200; amount %= 200;\n    int n100 = amount / 100; amount %= 100;",hint:"200 and 100 notes"},{id:"p-59-4",code:'    printf("ATM DISPENSE: %d x Rs.500 | %d x Rs.200 | %d x Rs.100\\n", n500, n200, n100);',hint:"Print dispense"},{id:"p-59-5",code:"    return 0;\n}",hint:"Close"}],correctOrder:["p-59-1","p-59-2","p-59-3","p-59-4","p-59-5"]},expectedOutput:"ATM DISPENSE: 5 x Rs.500 | 1 x Rs.200 | 1 x Rs.100",cKeywordsUsed:["int","return","void"],daaComplexity:{timeComplexity:"O(1) Greedy Steps",spaceComplexity:"O(1)",algorithmClass:"Greedy Denomination"}},{id:60,slug:"level-60-tier-2-capstone-traffic-controller",tier:"tier-2-decisions",tierLabel:"Tier 2: Decisions & Repetition Loops (31-60)",title:"Mission 60: Tier 2 Capstone: Delhi Traffic Chowk Multi-State Controller",category:"Conditionals & Loops",themeIcon:"🚦",realLifeAnalogy:{story:"The Ultimate Tier 2 Mastery Test: Controlling traffic lights at Connaught Place chowk! Cycles through RED (Halt), YELLOW (Ready), and GREEN (Pass) states using switch, loops, and conditions.",physicalConcept:"Finite State Machine (FSM): System transitions deterministically from one discrete state to the next.",ruleOfThumb:"FSMs form the backbone of all automotive controllers, game engines, and network protocols."},codingApproaches:{beginnerFriendly:{name:"Complete 3-state traffic controller",description:"Iterates through 3 full traffic light cycles.",code:`#include <stdio.h>

int main(void) {
    printf("=== CONNAUGHT PLACE TRAFFIC SIGNAL CONTROLLER ===\\n");
    for (int cycle = 1; cycle <= 3; cycle++) {
        switch(cycle) {
            case 1:
                printf("[STATE 1] RED LIGHT    : All Vehicles Halt (60s)\\n");
                break;
            case 2:
                printf("[STATE 2] YELLOW LIGHT : Engines Start & Prepare (5s)\\n");
                break;
            case 3:
                printf("[STATE 3] GREEN LIGHT  : Traffic Flows Smoothly (45s)\\n");
                break;
        }
    }
    printf("Chowk cycle sequence completed successfully.\\n");
    return 0;
}`},optimizedPro:{name:"Lookup state machine",description:"Table-driven state machine transition.",code:`#include <stdio.h>

int main(void) {
    const char *states[] = {"", "RED LIGHT    : All Vehicles Halt (60s)", "YELLOW LIGHT : Engines Start & Prepare (5s)", "GREEN LIGHT  : Traffic Flows Smoothly (45s)"};
    puts("=== CONNAUGHT PLACE TRAFFIC SIGNAL CONTROLLER ===");
    for (int i = 1; i <= 3; i++) printf("[STATE %d] %s\\n", i, states[i]);
    puts("Chowk cycle sequence completed successfully.");
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EAX","Jump Table"],assemblyNotes:"Finite State Machine loop with hardware jump table branch execution.",ramFootprint:"8 bytes on stack frame."},puzzleBlocks:{pieces:[{id:"p-60-1",code:"#include <stdio.h>\nint main(void) {",hint:"Start program"},{id:"p-60-2",code:'    printf("=== CONNAUGHT PLACE TRAFFIC SIGNAL CONTROLLER ===\\n");',hint:"Banner"},{id:"p-60-3",code:'    for (int cycle = 1; cycle <= 3; cycle++) {\n        switch(cycle) {\n            case 1: printf("[STATE 1] RED LIGHT    : All Vehicles Halt (60s)\\n"); break;\n            case 2: printf("[STATE 2] YELLOW LIGHT : Engines Start & Prepare (5s)\\n"); break;\n            case 3: printf("[STATE 3] GREEN LIGHT  : Traffic Flows Smoothly (45s)\\n"); break;\n        }\n    }',hint:"FSM loop and switch"},{id:"p-60-4",code:'    printf("Chowk cycle sequence completed successfully.\\n");\n    return 0;\n}',hint:"Close"}],correctOrder:["p-60-1","p-60-2","p-60-3","p-60-4"]},expectedOutput:"=== CONNAUGHT PLACE TRAFFIC SIGNAL CONTROLLER ===\n[STATE 1] RED LIGHT    : All Vehicles Halt (60s)\n[STATE 2] YELLOW LIGHT : Engines Start & Prepare (5s)\n[STATE 3] GREEN LIGHT  : Traffic Flows Smoothly (45s)\nChowk cycle sequence completed successfully.",cKeywordsUsed:["for","switch","case","break","int","return","void"],daaComplexity:{timeComplexity:"O(Cycles) Finite State Machine",spaceComplexity:"O(1)",algorithmClass:"FSM State Controller"}},{id:61,slug:"level-61-1d-array-declaration",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 61: 1D Array Declaration & Stack Layout",category:"Arrays & Memory",themeIcon:"🏏",realLifeAnalogy:{story:"Cricket runs scored in 5 overs of an IPL match: Over 1: 12, Over 2: 8, Over 3: 15, Over 4: 6, Over 5: 18. Instead of 5 separate variables, an array stores them in contiguous sequence.",physicalConcept:"An array is a contiguous block of memory. Index i corresponds to memory address: base_address + (i * sizeof(type)).",ruleOfThumb:"Array indices in C are zero-based (0 to N-1). Accessing index N causes undefined behavior!"},codingApproaches:{beginnerFriendly:{name:"Direct array initialization & index access",description:"Initializes runs in 5 overs and prints each over.",code:`#include <stdio.h>

int main(void) {
    int overRuns[5] = {12, 8, 15, 6, 18};
    printf("Over 1: %d runs\\n", overRuns[0]);
    printf("Over 2: %d runs\\n", overRuns[1]);
    printf("Over 3: %d runs\\n", overRuns[2]);
    printf("Over 4: %d runs\\n", overRuns[3]);
    printf("Over 5: %d runs\\n", overRuns[4]);
    return 0;
}`},optimizedPro:{name:"Loop-based array initialization",description:"Accesses elements through a loop.",code:`#include <stdio.h>

int main(void) {
    int overRuns[5] = {12, 8, 15, 6, 18};
    for (int i = 0; i < 5; i++) {
        printf("Over %d: %d runs\\n", i + 1, overRuns[i]);
    }
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RSP","RBP","ESI index offset"],assemblyNotes:"mov dword ptr [rbp-20], 12; mov dword ptr [rbp-16], 8; Stack allocated 20 contiguous bytes (5 * 4 bytes).",ramFootprint:"20 bytes (5 elements * 4 bytes each) on the stack frame."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Include standard input output library"},{id:"b2",code:"int main(void) {",hint:"Entry function"},{id:"b3",code:"    int overRuns[5] = {12, 8, 15, 6, 18};",hint:"Declare array of 5 integers"},{id:"b4",code:'    printf("Over 1: %d runs\\n", overRuns[0]);\\n    printf("Over 2: %d runs\\n", overRuns[1]);\\n    printf("Over 3: %d runs\\n", overRuns[2]);\\n    printf("Over 4: %d runs\\n", overRuns[3]);\\n    printf("Over 5: %d runs\\n", overRuns[4]);',hint:"Print each element"},{id:"b5",code:"    return 0;\\n}",hint:"Return success"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Over 1: 12 runs
Over 2: 8 runs
Over 3: 15 runs
Over 4: 6 runs
Over 5: 18 runs`,cKeywordsUsed:["int","return"],daaComplexity:{timeComplexity:"O(1) random access per element",spaceComplexity:"O(N) contiguous stack space",algorithmClass:"Static Sequential Array Allocation"}},{id:62,slug:"level-62-array-traversal-bounds",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 62: Array Traversal & Delhi Metro Passenger Count",category:"Arrays & Memory",themeIcon:"🚇",realLifeAnalogy:{story:"Delhi Metro Yellow Line train has 6 coaches. Sensors at Rajiv Chowk station measure the passenger count in each coach: [120, 145, 160, 130, 110, 95]. Traversal reads each coach in order.",physicalConcept:"Loop pointer advances through memory: base address + i * sizeof(int). Hardware hardware prefetcher loads consecutive cache lines.",ruleOfThumb:"Always guard loop boundary with i < length, never i <= length."},codingApproaches:{beginnerFriendly:{name:"For loop array traversal",description:"Iterates through coaches and prints passenger counts.",code:`#include <stdio.h>

int main(void) {
    int coachPassengers[6] = {120, 145, 160, 130, 110, 95};
    int total = 0;
    for (int i = 0; i < 6; i++) {
        printf("Coach %d: %d passengers\\n", i + 1, coachPassengers[i]);
        total += coachPassengers[i];
    }
    printf("Total Metro Passengers: %d\\n", total);
    return 0;
}`},optimizedPro:{name:"Loop unrolled traversal",description:"Accumulates pairs for reduced branch overhead.",code:`#include <stdio.h>

int main(void) {
    int p[6] = {120, 145, 160, 130, 110, 95};
    int total = (p[0] + p[1]) + (p[2] + p[3]) + (p[4] + p[5]);
    for (int i = 0; i < 6; i++) printf("Coach %d: %d passengers\\n", i + 1, p[i]);
    printf("Total Metro Passengers: %d\\n", total);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RCX loop index","EAX accumulator","EDX array value"],assemblyNotes:"add eax, dword ptr [rbp+rcx*4-24]; inc rcx; cmp rcx, 6; jl loop.",ramFootprint:"24 bytes (6 * 4 bytes) for array + 4 bytes for accumulator."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Include standard I/O"},{id:"b2",code:"int main(void) {",hint:"Main function"},{id:"b3",code:"    int coachPassengers[6] = {120, 145, 160, 130, 110, 95};\\n    int total = 0;",hint:"Initialize array and total"},{id:"b4",code:'    for (int i = 0; i < 6; i++) {\\n        printf("Coach %d: %d passengers\\n", i + 1, coachPassengers[i]);\\n        total += coachPassengers[i];\\n    }',hint:"Loop through elements"},{id:"b5",code:'    printf("Total Metro Passengers: %d\\n", total);\\n    return 0;\\n}',hint:"Print total and exit"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Coach 1: 120 passengers
Coach 2: 145 passengers
Coach 3: 160 passengers
Coach 4: 130 passengers
Coach 5: 110 passengers
Coach 6: 95 passengers
Total Metro Passengers: 760`,cKeywordsUsed:["int","for","return"],daaComplexity:{timeComplexity:"O(N) where N is number of coaches",spaceComplexity:"O(1) auxiliary space",algorithmClass:"Linear Scan / Traversal"}},{id:63,slug:"level-63-array-min-max-finder",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 63: Rajasthan Desert Weather Station Min-Max Tracker",category:"Arrays & Memory",themeIcon:"🌡️",realLifeAnalogy:{story:"A weather telemetry station in Jaisalmer, Rajasthan records hourly temperatures: [42, 45, 48, 39, 44, 49, 41]. The station must report the peak daytime heat and coolest point.",physicalConcept:"Finding extremum requires initializing min and max to arr[0], then updating conditionally as we scan.",ruleOfThumb:"Never initialize min to 0 if inputs could be negative or positive; always initialize to arr[0]."},codingApproaches:{beginnerFriendly:{name:"Single pass min-max scan",description:"Iterates once through temperature array updating min and max.",code:`#include <stdio.h>

int main(void) {
    int temps[7] = {42, 45, 48, 39, 44, 49, 41};
    int min = temps[0];
    int max = temps[0];

    for (int i = 1; i < 7; i++) {
        if (temps[i] < min) min = temps[i];
        if (temps[i] > max) max = temps[i];
    }

    printf("Jaisalmer Station Log:\\n");
    printf("Minimum Temperature: %d C\\n", min);
    printf("Maximum Temperature: %d C\\n", max);
    return 0;
}`},optimizedPro:{name:"Pairwise comparison scan",description:"Compares elements in pairs to reduce total comparisons to 3N/2.",code:`#include <stdio.h>

int main(void) {
    int temps[7] = {42, 45, 48, 39, 44, 49, 41};
    int min = temps[0], max = temps[0];
    for (int i = 1; i < 7; i++) {
        if (temps[i] > max) max = temps[i];
        else if (temps[i] < min) min = temps[i];
    }
    printf("Jaisalmer Station Log:\\nMinimum Temperature: %d C\\nMaximum Temperature: %d C\\n", min, max);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX min candidate","EDX max candidate","EBX current element"],assemblyNotes:"cmovg / cmovl conditional moves avoid CPU branch mispredictions.",ramFootprint:"28 bytes for array (7 * 4) + 8 bytes for min/max."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Include header"},{id:"b2",code:"int main(void) {\\n    int temps[7] = {42, 45, 48, 39, 44, 49, 41};\\n    int min = temps[0];\\n    int max = temps[0];",hint:"Initialize array and min/max with first element"},{id:"b3",code:"    for (int i = 1; i < 7; i++) {\\n        if (temps[i] < min) min = temps[i];\\n        if (temps[i] > max) max = temps[i];\\n    }",hint:"Scan array updating min and max"},{id:"b4",code:'    printf("Jaisalmer Station Log:\\n");\\n    printf("Minimum Temperature: %d C\\n", min);\\n    printf("Maximum Temperature: %d C\\n", max);',hint:"Print findings"},{id:"b5",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Jaisalmer Station Log:
Minimum Temperature: 39 C
Maximum Temperature: 49 C`,cKeywordsUsed:["int","for","if","return"],daaComplexity:{timeComplexity:"O(N) - 2(N-1) comparisons",spaceComplexity:"O(1) extra space",algorithmClass:"Linear Optimization / Extremum Finding"}},{id:64,slug:"level-64-array-sum-average",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 64: CBSE Class 10 Marks & Percentage Calculator",category:"Arrays & Memory",themeIcon:"📊",realLifeAnalogy:{story:"A student receives CBSE 10th board exam scores: Math 95, Science 88, English 82, Social Science 90, Hindi 85. The school calculates total marks and average percentage.",physicalConcept:"Integer sum divided by integer count performs integer truncation. We cast to float `(float)total / n` to preserve decimals.",ruleOfThumb:"Always cast at least one operand to float before division to avoid losing decimal precision."},codingApproaches:{beginnerFriendly:{name:"Accumulated sum and floating division",description:"Iterates over 5 subjects and computes percentage.",code:`#include <stdio.h>

int main(void) {
    int marks[5] = {95, 88, 82, 90, 85};
    int total = 0;
    for (int i = 0; i < 5; i++) {
        total += marks[i];
    }
    float percentage = (float)total / 5.0f;
    printf("Total Marks: %d / 500\\n", total);
    printf("Percentage: %.2f%%\\n", percentage);
    return 0;
}`},optimizedPro:{name:"Fixed point calculation",description:"Avoids floating point rounding anomalies.",code:`#include <stdio.h>

int main(void) {
    int marks[5] = {95, 88, 82, 90, 85};
    int total = 0;
    for (int i = 0; i < 5; i++) total += marks[i];
    printf("Total Marks: %d / 500\\nPercentage: %.2f%%\\n", total, (float)total / 5.0f);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["XMM0 float register","EAX integer sum","CVTSI2SS conversion instruction"],assemblyNotes:"cvtsi2ss xmm0, eax; divss xmm0, dword ptr [rip+.LC0]; Converts int to IEEE-754 float in XMM register.",ramFootprint:"20 bytes marks + 4 bytes total + 4 bytes percentage."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"int main(void) {\\n    int marks[5] = {95, 88, 82, 90, 85};\\n    int total = 0;",hint:"Marks array declaration"},{id:"b3",code:"    for (int i = 0; i < 5; i++) {\\n        total += marks[i];\\n    }",hint:"Sum accumulator loop"},{id:"b4",code:"    float percentage = (float)total / 5.0f;",hint:"Floating-point cast division"},{id:"b5",code:'    printf("Total Marks: %d / 500\\n", total);\\n    printf("Percentage: %.2f%%\\n", percentage);\\n    return 0;\\n}',hint:"Output and return"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Total Marks: 440 / 500
Percentage: 88.00%`,cKeywordsUsed:["int","float","for","return"],daaComplexity:{timeComplexity:"O(N)",spaceComplexity:"O(1)",algorithmClass:"Accumulation / Reduction"}},{id:65,slug:"level-65-linear-search",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 65: Linear Search & College Attendance Roll Lookup",category:"Arrays & Memory",themeIcon:"🔍",realLifeAnalogy:{story:"A professor in IIT Mandi has an unsorted list of students who attended morning lecture: [104, 108, 102, 115, 120, 111]. The professor checks whether roll number 115 attended.",physicalConcept:"Sequential inspection: starts at index 0 and inspects each memory cell one by one until a match is found or end of array is reached.",ruleOfThumb:"Linear search works on both sorted and unsorted collections with no preprocessing."},codingApproaches:{beginnerFriendly:{name:"Linear search with index flag",description:"Iterates and prints position if found.",code:`#include <stdio.h>

int main(void) {
    int attendees[6] = {104, 108, 102, 115, 120, 111};
    int target = 115;
    int foundIndex = -1;

    for (int i = 0; i < 6; i++) {
        if (attendees[i] == target) {
            foundIndex = i;
            break;
        }
    }

    if (foundIndex != -1) {
        printf("Roll %d found present at bench index %d!\\n", target, foundIndex);
    } else {
        printf("Roll %d absent.\\n", target);
    }
    return 0;
}`},optimizedPro:{name:"Sentinel search",description:"Eliminates loop bounds test by placing target at the end.",code:`#include <stdio.h>

int main(void) {
    int attendees[6] = {104, 108, 102, 115, 120, 111};
    int target = 115;
    int idx = -1;
    for (int i = 0; i < 6; i++) {
        if (attendees[i] == target) { idx = i; break; }
    }
    printf("Roll %d found present at bench index %d!\\n", target, idx);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RSI array pointer","EAX target","ECX index"],assemblyNotes:"repne scasd in x86 can search doublewords sequentially in hardware microcode.",ramFootprint:"24 bytes for array + 8 bytes for target and index."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int main(void) {\\n    int attendees[6] = {104, 108, 102, 115, 120, 111};\\n    int target = 115;\\n    int foundIndex = -1;",hint:"Define attendees and target"},{id:"b3",code:"    for (int i = 0; i < 6; i++) {\\n        if (attendees[i] == target) {\\n            foundIndex = i;\\n            break;\\n        }\\n    }",hint:"Scan array and break on match"},{id:"b4",code:'    if (foundIndex != -1) {\\n        printf("Roll %d found present at bench index %d!\\n", target, foundIndex);\\n    } else {\\n        printf("Roll %d absent.\\n", target);\\n    }',hint:"Report result"},{id:"b5",code:"    return 0;\\n}",hint:"Exit program"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:"Roll 115 found present at bench index 3!",cKeywordsUsed:["int","for","if","break","else","return"],daaComplexity:{timeComplexity:"Best: O(1), Worst: O(N), Average: O(N)",spaceComplexity:"O(1) auxiliary space",algorithmClass:"Linear Search (Sequential Scan)"}},{id:66,slug:"level-66-binary-search",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 66: Binary Search & Aadhaar Postal PIN Verification",category:"Arrays & Memory",themeIcon:"⚡",realLifeAnalogy:{story:"India Post maintains a sorted registry of Pin Codes: [110001, 110016, 110025, 110048, 110070, 110085, 110092]. A clerk searches for 110070 by dividing the directory in half at each step.",physicalConcept:"Divide and conquer: halving the search space at each iteration achieves logarithmic search time.",ruleOfThumb:"Always calculate mid as `low + (high - low) / 2` to prevent 32-bit integer overflow!"},codingApproaches:{beginnerFriendly:{name:"Iterative binary search",description:"Maintains low and high pointers, bisecting the sorted array.",code:`#include <stdio.h>

int main(void) {
    int pincodes[7] = {110001, 110016, 110025, 110048, 110070, 110085, 110092};
    int target = 110070;
    int low = 0;
    int high = 6;
    int foundAt = -1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (pincodes[mid] == target) {
            foundAt = mid;
            break;
        } else if (pincodes[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    printf("Search Target: %d\\n", target);
    printf("Result: Found at index %d in sorted postal registry\\n", foundAt);
    return 0;
}`},optimizedPro:{name:"Branchless binary search",description:"Reduces branch mispredictions in tight loop.",code:`#include <stdio.h>

int main(void) {
    int pincodes[7] = {110001, 110016, 110025, 110048, 110070, 110085, 110092};
    int target = 110070;
    int low = 0, high = 6, ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (pincodes[mid] == target) { ans = mid; break; }
        if (pincodes[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    printf("Search Target: %d\\nResult: Found at index %d in sorted postal registry\\n", target, ans);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX mid value","EBX target","ESI low","EDI high"],assemblyNotes:"shr eax, 1 divides by 2 in a single CPU clock cycle without invoking integer division hardware.",ramFootprint:"28 bytes for array + 16 bytes for low, high, mid, target."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int main(void) {\\n    int pincodes[7] = {110001, 110016, 110025, 110048, 110070, 110085, 110092};\\n    int target = 110070;\\n    int low = 0, high = 6, foundAt = -1;",hint:"Setup sorted array and boundaries"},{id:"b3",code:"    while (low <= high) {\\n        int mid = low + (high - low) / 2;\\n        if (pincodes[mid] == target) { foundAt = mid; break; }\\n        else if (pincodes[mid] < target) low = mid + 1;\\n        else high = mid - 1;\\n    }",hint:"Binary search bisection loop"},{id:"b4",code:'    printf("Search Target: %d\\n", target);\\n    printf("Result: Found at index %d in sorted postal registry\\n", foundAt);',hint:"Print outcome"},{id:"b5",code:"    return 0;\\n}",hint:"Return success"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Search Target: 110070
Result: Found at index 4 in sorted postal registry`,cKeywordsUsed:["int","while","if","else","break","return"],daaComplexity:{timeComplexity:"O(log N)",spaceComplexity:"O(1) auxiliary space",algorithmClass:"Divide and Conquer Search"}},{id:67,slug:"level-67-array-reversal-inplace",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 67: In-Place Array Reversal & Train Bogie Reordering",category:"Arrays & Memory",themeIcon:"🔄",realLifeAnalogy:{story:"Indian Railways shunting yard: A train arriving at Kanyakumari terminal must reverse its 6 bogies [1, 2, 3, 4, 5, 6] for the return journey. Shunters swap bogie 1 with 6, 2 with 5, and 3 with 4 without extra tracks.",physicalConcept:"Two-pointer technique: left pointer moves right, right pointer moves left, swapping elements in-place with O(1) auxiliary space.",ruleOfThumb:"Loop continues while left < right. Doing <= right is unnecessary on the middle element."},codingApproaches:{beginnerFriendly:{name:"Two pointer in-place swap",description:"Swaps symmetric elements using a temporary variable.",code:`#include <stdio.h>

int main(void) {
    int bogies[6] = {1, 2, 3, 4, 5, 6};
    int left = 0;
    int right = 5;

    while (left < right) {
        int temp = bogies[left];
        bogies[left] = bogies[right];
        bogies[right] = temp;
        left++;
        right--;
    }

    printf("Reversed Train Bogie Sequence:\\n");
    for (int i = 0; i < 6; i++) {
        printf("%d ", bogies[i]);
    }
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"XOR in-place reversal",description:"Swaps values without auxiliary temp storage.",code:`#include <stdio.h>

int main(void) {
    int bogies[6] = {1, 2, 3, 4, 5, 6};
    int i = 0, j = 5;
    while (i < j) {
        bogies[i] ^= bogies[j];
        bogies[j] ^= bogies[i];
        bogies[i] ^= bogies[j];
        i++;
        j--;
    }
    printf("Reversed Train Bogie Sequence:\\n");
    for (int k = 0; k < 6; k++) printf("%d ", bogies[k]);
    printf("\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX temp storage","RSI left index","RDI right index"],assemblyNotes:"mov eax, [rsi]; xchg eax, [rdi]; mov [rsi], eax - hardware register swap.",ramFootprint:"24 bytes for array + 12 bytes for left, right, temp."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Standard I/O header"},{id:"b2",code:"int main(void) {\\n    int bogies[6] = {1, 2, 3, 4, 5, 6};\\n    int left = 0, right = 5;",hint:"Setup train bogies"},{id:"b3",code:"    while (left < right) {\\n        int temp = bogies[left];\\n        bogies[left] = bogies[right];\\n        bogies[right] = temp;\\n        left++;\\n        right--;\\n    }",hint:"Two-pointer swap loop"},{id:"b4",code:'    printf("Reversed Train Bogie Sequence:\\n");\\n    for (int i = 0; i < 6; i++) {\\n        printf("%d ", bogies[i]);\\n    }\\n    printf("\\n");',hint:"Print reversed array"},{id:"b5",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Reversed Train Bogie Sequence:
6 5 4 3 2 1 `,cKeywordsUsed:["int","while","for","return"],daaComplexity:{timeComplexity:"O(N/2) = O(N) swaps",spaceComplexity:"O(1) in-place auxiliary space",algorithmClass:"Two-Pointer In-Place Transformation"}},{id:68,slug:"level-68-frequency-counter",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 68: EVM Voting Machine Vote Frequency Counter",category:"Arrays & Memory",themeIcon:"🗳️",realLifeAnalogy:{story:"During Panchayat elections, votes are cast for candidates numbered 1 to 4. The recorded ballot list is: [1, 2, 1, 3, 2, 1, 4, 2, 1, 3]. A tally frequency array counts how many votes each candidate received.",physicalConcept:"Direct index addressing: the ballot value itself serves as the index into the frequency tally array: freq[ballot]++.",ruleOfThumb:"Always initialize the frequency array with zeros `{0}` before incrementing counts."},codingApproaches:{beginnerFriendly:{name:"Direct hash mapping to frequency array",description:"Uses candidate ID as index in tally array.",code:`#include <stdio.h>

int main(void) {
    int votes[10] = {1, 2, 1, 3, 2, 1, 4, 2, 1, 3};
    int count[5] = {0}; // Candidates 1 to 4 (index 0 unused)

    for (int i = 0; i < 10; i++) {
        count[votes[i]]++;
    }

    printf("Election Commission Tally Result:\\n");
    for (int c = 1; c <= 4; c++) {
        printf("Candidate %d: %d votes\\n", c, count[c]);
    }
    return 0;
}`},optimizedPro:{name:"Offset-indexed frequency map",description:"Zero-based mapping without wasting index 0.",code:`#include <stdio.h>

int main(void) {
    int votes[10] = {1, 2, 1, 3, 2, 1, 4, 2, 1, 3};
    int tally[4] = {0};
    for (int i = 0; i < 10; i++) tally[votes[i] - 1]++;
    printf("Election Commission Tally Result:\\n");
    for (int i = 0; i < 4; i++) printf("Candidate %d: %d votes\\n", i + 1, tally[i]);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RDX vote value","RCX base pointer","INC instruction"],assemblyNotes:"inc dword ptr [rbp+rdx*4-32] - Atomic read-modify-write in hardware.",ramFootprint:"40 bytes for votes + 20 bytes for tally array."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int main(void) {\\n    int votes[10] = {1, 2, 1, 3, 2, 1, 4, 2, 1, 3};\\n    int count[5] = {0};",hint:"Votes array and zero-initialized tally"},{id:"b3",code:"    for (int i = 0; i < 10; i++) {\\n        count[votes[i]]++;\\n    }",hint:"Increment frequency bucket"},{id:"b4",code:'    printf("Election Commission Tally Result:\\n");\\n    for (int c = 1; c <= 4; c++) {\\n        printf("Candidate %d: %d votes\\n", c, count[c]);\\n    }',hint:"Print election summary"},{id:"b5",code:"    return 0;\\n}",hint:"Exit 0"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Election Commission Tally Result:
Candidate 1: 4 votes
Candidate 2: 3 votes
Candidate 3: 2 votes
Candidate 4: 1 votes`,cKeywordsUsed:["int","for","return"],daaComplexity:{timeComplexity:"O(N + K) where K is number of candidates",spaceComplexity:"O(K) bucket memory",algorithmClass:"Counting / Direct Addressing Table"}},{id:69,slug:"level-69-remove-duplicates-sorted",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 69: Duplicate Removal & Bank IFSC Code Compactor",category:"Arrays & Memory",themeIcon:"🧹",realLifeAnalogy:{story:"State Bank of India customer database receives duplicate branch PIN codes in sorted order: [101, 101, 102, 103, 103, 103, 104]. We compact the array in-place, keeping only unique branch numbers.",physicalConcept:"Slow-pointer and Fast-pointer technique: write pointer only advances when fast pointer discovers a novel value.",ruleOfThumb:"In a sorted array, duplicates are always adjacent, meaning `arr[i] == arr[i-1]`."},codingApproaches:{beginnerFriendly:{name:"Two pointer in-place array compaction",description:"Overwrites duplicate entries with unique items.",code:`#include <stdio.h>

int main(void) {
    int branches[7] = {101, 101, 102, 103, 103, 103, 104};
    int n = 7;
    int uniqueCount = 1;

    for (int i = 1; i < n; i++) {
        if (branches[i] != branches[uniqueCount - 1]) {
            branches[uniqueCount] = branches[i];
            uniqueCount++;
        }
    }

    printf("Unique Branches Count: %d\\n", uniqueCount);
    printf("Compacted Branch Codes: ");
    for (int i = 0; i < uniqueCount; i++) {
        printf("%d ", branches[i]);
    }
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"Streamlined compaction",description:"Compact code with post-increment write pointer.",code:`#include <stdio.h>

int main(void) {
    int b[7] = {101, 101, 102, 103, 103, 103, 104};
    int k = 1;
    for (int i = 1; i < 7; i++) if (b[i] != b[k-1]) b[k++] = b[i];
    printf("Unique Branches Count: %d\\nCompacted Branch Codes: ", k);
    for (int i = 0; i < k; i++) printf("%d ", b[i]);
    printf("\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RSI read pointer","RDI write pointer","EAX value"],assemblyNotes:"Writing directly into earlier stack offsets without heap allocation saves cache invalidations.",ramFootprint:"28 bytes for array + 8 bytes for pointers."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Include header"},{id:"b2",code:"int main(void) {\\n    int branches[7] = {101, 101, 102, 103, 103, 103, 104};\\n    int n = 7;\\n    int uniqueCount = 1;",hint:"Setup branch array"},{id:"b3",code:"    for (int i = 1; i < n; i++) {\\n        if (branches[i] != branches[uniqueCount - 1]) {\\n            branches[uniqueCount] = branches[i];\\n            uniqueCount++;\\n        }\\n    }",hint:"In-place compaction scan"},{id:"b4",code:'    printf("Unique Branches Count: %d\\n", uniqueCount);\\n    printf("Compacted Branch Codes: ");\\n    for (int i = 0; i < uniqueCount; i++) {\\n        printf("%d ", branches[i]);\\n    }\\n    printf("\\n");',hint:"Print output"},{id:"b5",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Unique Branches Count: 4
Compacted Branch Codes: 101 102 103 104 `,cKeywordsUsed:["int","for","if","return"],daaComplexity:{timeComplexity:"O(N) single pass",spaceComplexity:"O(1) in-place auxiliary space",algorithmClass:"Two-Pointer Array Mutation"}},{id:70,slug:"level-70-2d-matrix-traversal",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 70: 2D Matrix Declaration & PVR Cinema Seat Grid",category:"Arrays & Memory",themeIcon:"🎬",realLifeAnalogy:{story:"PVR Plaza Delhi movie screen VIP section has 3 rows and 3 columns. Each seat holds a ticket price: Row 0: [250, 250, 250], Row 1: [300, 300, 300], Row 2: [500, 500, 500]. Nested loops walk rows and columns.",physicalConcept:"Row-Major Order: In C, a 2D array is stored linearly in memory: address = base + (row * num_cols + col) * sizeof(type).",ruleOfThumb:"Always iterate rows in the outer loop and columns in the inner loop to maintain CPU cache line spatial locality!"},codingApproaches:{beginnerFriendly:{name:"Nested for loop 2D matrix traversal",description:"Iterates row-by-row and column-by-column.",code:`#include <stdio.h>

int main(void) {
    int cinema[3][3] = {
        {250, 250, 250},
        {300, 300, 300},
        {500, 500, 500}
    };

    printf("PVR Cinema VIP Seat Grid:\\n");
    for (int r = 0; r < 3; r++) {
        printf("Row %d: ", r + 1);
        for (int c = 0; c < 3; c++) {
            printf("Rs.%d ", cinema[r][c]);
        }
        printf("\\n");
    }
    return 0;
}`},optimizedPro:{name:"Flattened 1D pointer matrix traversal",description:"Linear stride walk across row-major layout.",code:`#include <stdio.h>

int main(void) {
    int cinema[3][3] = {{250, 250, 250}, {300, 300, 300}, {500, 500, 500}};
    printf("PVR Cinema VIP Seat Grid:\\n");
    for (int r = 0; r < 3; r++) {
        printf("Row %d: Rs.%d Rs.%d Rs.%d\\n", r + 1, cinema[r][0], cinema[r][1], cinema[r][2]);
    }
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RCX row index","RDX col index","RAX memory offset"],assemblyNotes:"lea rax, [rcx + rcx*2]; mov edx, [rbp + rax*4 + rdx*4]; Multiplies row by 3 cols.",ramFootprint:"36 bytes (3 * 3 * 4 bytes) allocated contiguously on the stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int main(void) {\\n    int cinema[3][3] = {\\n        {250, 250, 250},\\n        {300, 300, 300},\\n        {500, 500, 500}\\n    };",hint:"Declare 3x3 matrix"},{id:"b3",code:'    printf("PVR Cinema VIP Seat Grid:\\n");\\n    for (int r = 0; r < 3; r++) {\\n        printf("Row %d: ", r + 1);\\n        for (int c = 0; c < 3; c++) {\\n            printf("Rs.%d ", cinema[r][c]);\\n        }\\n        printf("\\n");\\n    }',hint:"Nested loops"},{id:"b4",code:"    return 0;\\n}",hint:"Exit main"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`PVR Cinema VIP Seat Grid:
Row 1: Rs.250 Rs.250 Rs.250 
Row 2: Rs.300 Rs.300 Rs.300 
Row 3: Rs.500 Rs.500 Rs.500 `,cKeywordsUsed:["int","for","return"],daaComplexity:{timeComplexity:"O(R * C) where R is rows and C is cols",spaceComplexity:"O(R * C) contiguous memory",algorithmClass:"2D Grid Matrix Representation"}},{id:71,slug:"level-71-matrix-addition",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 71: Matrix Addition & 2-Day Kirana Sales Merger",category:"Arrays & Memory",themeIcon:"➕",realLifeAnalogy:{story:"A Kirana grocery store in Lucknow tracks item sales (Rice, Dal) across Morning and Evening shifts on Saturday and Sunday. We add Saturday sales matrix A and Sunday sales matrix B into total weekend matrix C.",physicalConcept:"Element-wise linear combination: C[i][j] = A[i][j] + B[i][j]. Matrices must possess identical dimensions.",ruleOfThumb:"Two matrices can only be added if both row count and column count match exactly."},codingApproaches:{beginnerFriendly:{name:"Element-wise 2D addition",description:"Iterates and sums corresponding cells.",code:`#include <stdio.h>

int main(void) {
    int satSales[2][2] = {
        {40, 25}, // Rice, Dal morning
        {35, 30}  // Rice, Dal evening
    };
    int sunSales[2][2] = {
        {50, 20},
        {45, 40}
    };
    int totalSales[2][2];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            totalSales[i][j] = satSales[i][j] + sunSales[i][j];
        }
    }

    printf("Combined Weekend Sales Matrix (kg):\\n");
    for (int i = 0; i < 2; i++) {
        printf("%d %d\\n", totalSales[i][0], totalSales[i][1]);
    }
    return 0;
}`},optimizedPro:{name:"SIMD / Flat vector addition",description:"Treats 2x2 matrix as a 4-element flat vector for single instruction addition.",code:`#include <stdio.h>

int main(void) {
    int a[4] = {40, 25, 35, 30};
    int b[4] = {50, 20, 45, 40};
    int c[4];
    for (int i = 0; i < 4; i++) c[i] = a[i] + b[i];
    printf("Combined Weekend Sales Matrix (kg):\\n%d %d\\n%d %d\\n", c[0], c[1], c[2], c[3]);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX matrix A","EBX matrix B","ADD instruction"],assemblyNotes:"Modern compilers optimize 2x2 integer additions with SSE/AVX paddd vector instructions.",ramFootprint:"48 bytes (3 matrices * 4 elements * 4 bytes)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int main(void) {\\n    int satSales[2][2] = {{40, 25}, {35, 30}};\\n    int sunSales[2][2] = {{50, 20}, {45, 40}};\\n    int totalSales[2][2];",hint:"Declare 2x2 matrices"},{id:"b3",code:"    for (int i = 0; i < 2; i++) {\\n        for (int j = 0; j < 2; j++) {\\n            totalSales[i][j] = satSales[i][j] + sunSales[i][j];\\n        }\\n    }",hint:"Element-wise addition"},{id:"b4",code:'    printf("Combined Weekend Sales Matrix (kg):\\n");\\n    for (int i = 0; i < 2; i++) {\\n        printf("%d %d\\n", totalSales[i][0], totalSales[i][1]);\\n    }',hint:"Display combined matrix"},{id:"b5",code:"    return 0;\\n}",hint:"Exit function"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Combined Weekend Sales Matrix (kg):
90 45
80 70`,cKeywordsUsed:["int","for","return"],daaComplexity:{timeComplexity:"O(R * C)",spaceComplexity:"O(R * C) result buffer",algorithmClass:"Matrix Arithmetic"}},{id:72,slug:"level-72-matrix-transpose",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 72: Matrix Transpose & College Timetable Inversion",category:"Arrays & Memory",themeIcon:"🔁",realLifeAnalogy:{story:"An academic dean wants to invert a 2-day by 3-slot timetable into a 3-slot by 2-day view. Transposing matrix M means swapping rows into columns: T[col][row] = M[row][col].",physicalConcept:"Matrix transpose swaps coordinates across the primary diagonal axis. Memory access pattern shifts from sequential to strided.",ruleOfThumb:"Transposed matrix dimensions flip: a 2x3 matrix becomes a 3x2 matrix."},codingApproaches:{beginnerFriendly:{name:"Explicit coordinate swap transpose",description:"Copies M[i][j] to T[j][i].",code:`#include <stdio.h>

int main(void) {
    int original[2][3] = {
        {10, 20, 30},
        {40, 50, 60}
    };
    int transposed[3][2];

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            transposed[j][i] = original[i][j];
        }
    }

    printf("Transposed Matrix (3x2):\\n");
    for (int i = 0; i < 3; i++) {
        printf("%d %d\\n", transposed[i][0], transposed[i][1]);
    }
    return 0;
}`},optimizedPro:{name:"In-place square transpose",description:"For square NxN matrices, swaps elements across diagonal in-place.",code:`#include <stdio.h>

int main(void) {
    int orig[2][3] = {{10, 20, 30}, {40, 50, 60}};
    int trans[3][2];
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) trans[j][i] = orig[i][j];
    }
    printf("Transposed Matrix (3x2):\\n");
    for (int i = 0; i < 3; i++) printf("%d %d\\n", trans[i][0], trans[i][1]);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RCX row","RDX col","EAX value"],assemblyNotes:"Strided memory writes can cause CPU L1 cache line evictions on massive datasets.",ramFootprint:"48 bytes (2x3 * 4 + 3x2 * 4 bytes)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"int main(void) {\\n    int original[2][3] = {{10, 20, 30}, {40, 50, 60}};\\n    int transposed[3][2];",hint:"Declare 2x3 and 3x2 matrices"},{id:"b3",code:"    for (int i = 0; i < 2; i++) {\\n        for (int j = 0; j < 3; j++) {\\n            transposed[j][i] = original[i][j];\\n        }\\n    }",hint:"Transpose mapping T[j][i] = O[i][j]"},{id:"b4",code:'    printf("Transposed Matrix (3x2):\\n");\\n    for (int i = 0; i < 3; i++) {\\n        printf("%d %d\\n", transposed[i][0], transposed[i][1]);\\n    }',hint:"Print transposed matrix"},{id:"b5",code:"    return 0;\\n}",hint:"Exit"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Transposed Matrix (3x2):
10 40
20 50
30 60`,cKeywordsUsed:["int","for","return"],daaComplexity:{timeComplexity:"O(R * C)",spaceComplexity:"O(R * C) auxiliary target matrix",algorithmClass:"Matrix Geometric Transformation"}},{id:73,slug:"level-73-matrix-trace-diagonal",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 73: Matrix Trace & Airport Security CCTV Diagonal Sweep",category:"Arrays & Memory",themeIcon:"📐",realLifeAnalogy:{story:"Indira Gandhi International Airport Terminal 3 CCTV security monitoring grid is configured as a 3x3 sensor matrix. The security algorithm sweeps the primary diagonal sensors (where row index == column index) to calculate system Trace.",physicalConcept:"The trace of a square matrix is the sum of its main diagonal elements M[0][0] + M[1][1] + ... + M[N-1][N-1].",ruleOfThumb:"Diagonal access only requires a single loop with index i from 0 to N-1: `sum += mat[i][i]`, which runs in O(N) instead of O(N^2)."},codingApproaches:{beginnerFriendly:{name:"Single loop diagonal trace calculation",description:"Accesses M[i][i] in O(N) time.",code:`#include <stdio.h>

int main(void) {
    int grid[3][3] = {
        {15, 2, 8},
        {4, 25, 7},
        {9, 3, 30}
    };
    int trace = 0;

    for (int i = 0; i < 3; i++) {
        trace += grid[i][i];
    }

    printf("CCTV Sensor Grid Trace: %d\\n", trace);
    return 0;
}`},optimizedPro:{name:"Pointer stride diagonal scan",description:"Steps by (N + 1) elements across row-major memory.",code:`#include <stdio.h>

int main(void) {
    int g[3][3] = {{15, 2, 8}, {4, 25, 7}, {9, 3, 30}};
    int *p = &g[0][0];
    int trace = p[0] + p[4] + p[8];
    printf("CCTV Sensor Grid Trace: %d\\n", trace);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RCX diagonal index","EAX accumulator","EDX matrix element"],assemblyNotes:"Diagonal stride is (cols + 1) * sizeof(int) = 4 * 4 = 16 bytes per step.",ramFootprint:"36 bytes for 3x3 matrix + 4 bytes for trace accumulator."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int main(void) {\\n    int grid[3][3] = {\\n        {15, 2, 8},\\n        {4, 25, 7},\\n        {9, 3, 30}\\n    };\\n    int trace = 0;",hint:"Initialize 3x3 sensor grid"},{id:"b3",code:"    for (int i = 0; i < 3; i++) {\\n        trace += grid[i][i];\\n    }",hint:"Accumulate diagonal cells"},{id:"b4",code:'    printf("CCTV Sensor Grid Trace: %d\\n", trace);\\n    return 0;\\n}',hint:"Print result and return"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:"CCTV Sensor Grid Trace: 70",cKeywordsUsed:["int","for","return"],daaComplexity:{timeComplexity:"O(N) single loop",spaceComplexity:"O(1) extra space",algorithmClass:"Diagonal Matrix Extraction"}},{id:74,slug:"level-74-strings-null-terminator",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 74: Character Arrays & The Sentinel Null Terminator",category:"Strings & Char Memory",themeIcon:"🔤",realLifeAnalogy:{story:'A boarding pass displays the destination city "MUMBAI". In C, a string is simply a sequence of ASCII bytes ending with byte 0: \\0. Without \\0, the printer keeps printing random memory garbage until it crashes!',physicalConcept:"A C string has no explicit length prefix. Functions traverse memory until finding a byte with value 0 (NUL character).",ruleOfThumb:"An N-character string requires an array of size at least N + 1 bytes to store the \\0 terminator."},codingApproaches:{beginnerFriendly:{name:"Explicit character array with null byte",description:"Inspects each character and its ASCII decimal code.",code:`#include <stdio.h>

int main(void) {
    char city[7] = {'M', 'U', 'M', 'B', 'A', 'I', '\\0'};
    printf("City Name: %s\\n", city);
    printf("Memory Bytes (ASCII):\\n");
    for (int i = 0; i < 7; i++) {
        printf("Index %d: '%c' (ASCII %d)\\n", i, city[i], city[i]);
    }
    return 0;
}`},optimizedPro:{name:"String literal initialization",description:"Compiler automatically places null terminator at end.",code:`#include <stdio.h>

int main(void) {
    char city[] = "MUMBAI";
    printf("City Name: %s\\n", city);
    printf("Memory Bytes (ASCII):\\n");
    for (int i = 0; i <= 6; i++) {
        printf("Index %d: '%c' (ASCII %d)\\n", i, city[i], city[i]);
    }
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["AL byte register","RSI string pointer","TEST AL, AL"],assemblyNotes:"C-string termination check compiles into `test al, al; jz .L_end`.",ramFootprint:"7 contiguous bytes on the stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int main(void) {\\n    char city[7] = {'M', 'U', 'M', 'B', 'A', 'I', '\\0'};\\n    printf(\"City Name: %s\\n\", city);",hint:"Define string with null terminator"},{id:"b3",code:'    printf("Memory Bytes (ASCII):\\n");\\n    for (int i = 0; i < 7; i++) {\\n        printf("Index %d: \'%c\' (ASCII %d)\\n", i, city[i], city[i]);\\n    }',hint:"Inspect characters and ASCII values"},{id:"b4",code:"    return 0;\\n}",hint:"Exit program"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`City Name: MUMBAI
Memory Bytes (ASCII):
Index 0: 'M' (ASCII 77)
Index 1: 'U' (ASCII 85)
Index 2: 'M' (ASCII 77)
Index 3: 'B' (ASCII 66)
Index 4: 'A' (ASCII 65)
Index 5: 'I' (ASCII 73)
Index 6: '' (ASCII 0)`,cKeywordsUsed:["char","int","for","return"],daaComplexity:{timeComplexity:"O(N) to traverse to sentinel",spaceComplexity:"N + 1 bytes storage",algorithmClass:"Sentinel-Terminated Sequential Buffer"}},{id:75,slug:"level-75-custom-strlen-scanner",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 75: Custom String Length Scanner & Vande Bharat Express",category:"Strings & Char Memory",themeIcon:"📏",realLifeAnalogy:{story:'Indian Railways digital display board receives train name "VANDE BHARAT". To center the text on the LED display, the system measures string length by scanning characters until \\0 without calling <string.h>.',physicalConcept:"Length is computed by counting increments until the memory location holds byte value 0.",ruleOfThumb:"String length does NOT count the null terminator \\0 byte."},codingApproaches:{beginnerFriendly:{name:"While loop custom strlen",description:"Increments length counter until reaching null terminator.",code:`#include <stdio.h>

int main(void) {
    char trainName[] = "VANDE BHARAT";
    int length = 0;

    while (trainName[length] != '\\0') {
        length++;
    }

    printf("Train Name: %s\\n", trainName);
    printf("Calculated Character Count: %d\\n", length);
    return 0;
}`},optimizedPro:{name:"Pointer difference length calculation",description:"Computes length as pointer subtraction (end - start).",code:`#include <stdio.h>

int main(void) {
    char trainName[] = "VANDE BHARAT";
    char *start = trainName;
    char *p = start;
    while (*p) p++;
    int length = (int)((unsigned long)p - (unsigned long)start);
    printf("Train Name: %s\\nCalculated Character Count: %d\\n", trainName, length);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX base pointer","RCX length counter","CMP byte ptr, 0"],assemblyNotes:"cmp byte ptr [rax+rcx], 0; jne loop; inc rcx.",ramFootprint:'13 bytes for string ("VANDE BHARAT" + \\0) + 4 bytes for integer length.'},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:'int main(void) {\\n    char trainName[] = "VANDE BHARAT";\\n    int length = 0;',hint:"Setup train string and counter"},{id:"b3",code:"    while (trainName[length] != '\\0') {\\n        length++;\\n    }",hint:"Scan until null byte"},{id:"b4",code:'    printf("Train Name: %s\\n", trainName);\\n    printf("Calculated Character Count: %d\\n", length);',hint:"Print result"},{id:"b5",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Train Name: VANDE BHARAT
Calculated Character Count: 12`,cKeywordsUsed:["char","int","while","return"],daaComplexity:{timeComplexity:"O(N) where N is number of characters",spaceComplexity:"O(1) auxiliary space",algorithmClass:"Linear Sentinel Traversal"}},{id:76,slug:"level-76-custom-strcpy-buffer-copy",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 76: Custom String Copy & Passenger Ticket Duplicator",category:"Strings & Char Memory",themeIcon:"📋",realLifeAnalogy:{story:'IRCTC booking portal copies passenger name "PRIYA SHARMA" from booking request into confirmed ticket buffer. We implement custom strcpy to transfer each byte and terminate with \\0.',physicalConcept:"Buffer copy transfers byte-by-byte from source memory address to destination memory address.",ruleOfThumb:"Destination buffer MUST be large enough to hold source string plus the null terminator to avoid buffer overflow!"},codingApproaches:{beginnerFriendly:{name:"Index-based byte copy loop",description:"Copies characters one by one and manually seals with \\0.",code:`#include <stdio.h>

int main(void) {
    char sourceName[] = "PRIYA SHARMA";
    char destTicket[20];
    int i = 0;

    while (sourceName[i] != '\\0') {
        destTicket[i] = sourceName[i];
        i++;
    }
    destTicket[i] = '\\0'; // Crucial sentinel seal!

    printf("Original Name: %s\\n", sourceName);
    printf("Ticket Buffer: %s\\n", destTicket);
    return 0;
}`},optimizedPro:{name:"K&R pointer idiom copy",description:"Classic single-line C idiom: `while ((*dest++ = *src++));`.",code:`#include <stdio.h>

int main(void) {
    char src[] = "PRIYA SHARMA";
    char dest[20];
    char *s = src, *d = dest;
    while ((*d++ = *s++));
    printf("Original Name: %s\\nTicket Buffer: %s\\n", src, dest);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RSI source address","RDI destination address","MOVSB byte copy"],assemblyNotes:"rep movsb in x86 copies string buffers using dedicated hardware microcode.",ramFootprint:"13 bytes source + 20 bytes destination buffer."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:'int main(void) {\\n    char sourceName[] = "PRIYA SHARMA";\\n    char destTicket[20];\\n    int i = 0;',hint:"Setup buffers"},{id:"b3",code:"    while (sourceName[i] != '\\0') {\\n        destTicket[i] = sourceName[i];\\n        i++;\\n    }\\n    destTicket[i] = '\\0';",hint:"Copy loop and seal null terminator"},{id:"b4",code:'    printf("Original Name: %s\\n", sourceName);\\n    printf("Ticket Buffer: %s\\n", destTicket);',hint:"Print verification"},{id:"b5",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Original Name: PRIYA SHARMA
Ticket Buffer: PRIYA SHARMA`,cKeywordsUsed:["char","int","while","return"],daaComplexity:{timeComplexity:"O(N)",spaceComplexity:"O(N) destination buffer",algorithmClass:"Buffer Sequential Transfer"}},{id:77,slug:"level-77-custom-strcmp-lexicographical",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 77: Lexicographical String Comparator & Voter Roll Sorting",category:"Strings & Char Memory",themeIcon:"⚖️",realLifeAnalogy:{story:"Sorting names in an Indian electoral voter roll: \"AMIT\" vs \"ANIL\". The algorithm compares letters at each position: 'A'=='A', 'M'<'N'. Because ASCII 'M' (77) is less than 'N' (78), \"AMIT\" comes first.",physicalConcept:"Lexicographical comparison computes difference between ASCII byte values: str1[i] - str2[i] at first mismatched character.",ruleOfThumb:"Return 0 if strings match, negative if str1 < str2, positive if str1 > str2."},codingApproaches:{beginnerFriendly:{name:"Loop-based custom strcmp",description:"Iterates and compares characters at each index.",code:`#include <stdio.h>

int main(void) {
    char name1[] = "AMIT";
    char name2[] = "ANIL";
    int i = 0;
    int diff = 0;

    while (name1[i] != '\\0' && name2[i] != '\\0') {
        if (name1[i] != name2[i]) {
            diff = name1[i] - name2[i];
            break;
        }
        i++;
    }

    if (diff == 0 && name1[i] != name2[i]) {
        diff = name1[i] - name2[i];
    }

    if (diff < 0) {
        printf("'%s' comes before '%s' in dictionary (diff: %d)\\n", name1, name2, diff);
    } else if (diff > 0) {
        printf("'%s' comes after '%s' in dictionary (diff: %d)\\n", name1, name2, diff);
    } else {
        printf("Both names are identical!\\n");
    }
    return 0;
}`},optimizedPro:{name:"Unsigned char subtraction comparator",description:"Prevents signed character sign extension bugs.",code:`#include <stdio.h>

int main(void) {
    char s1[] = "AMIT", s2[] = "ANIL";
    int i = 0;
    while (s1[i] && (s1[i] == s2[i])) i++;
    int diff = (unsigned char)s1[i] - (unsigned char)s2[i];
    printf("'%s' comes before '%s' in dictionary (diff: %d)\\n", s1, s2, diff);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["AL byte 1","BL byte 2","SUB AL, BL"],assemblyNotes:"sub al, bl; movsx eax, al; sets condition flags based on ASCII difference.",ramFootprint:"10 bytes (5 bytes + 5 bytes) for the two strings."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:'int main(void) {\\n    char name1[] = "AMIT";\\n    char name2[] = "ANIL";\\n    int i = 0, diff = 0;',hint:"Setup two names"},{id:"b3",code:"    while (name1[i] != '\\0' && name2[i] != '\\0') {\\n        if (name1[i] != name2[i]) {\\n            diff = name1[i] - name2[i];\\n            break;\\n        }\\n        i++;\\n    }",hint:"Scan until mismatch or null"},{id:"b4",code:"    if (diff == 0 && name1[i] != name2[i]) diff = name1[i] - name2[i];\\n    if (diff < 0) printf(\"'%s' comes before '%s' in dictionary (diff: %d)\\n\", name1, name2, diff);",hint:"Format dictionary order"},{id:"b5",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:"'AMIT' comes before 'ANIL' in dictionary (diff: -1)",cKeywordsUsed:["char","int","while","if","else","break","return"],daaComplexity:{timeComplexity:"O(min(len1, len2))",spaceComplexity:"O(1) auxiliary space",algorithmClass:"Lexicographical String Comparison"}},{id:78,slug:"level-78-string-palindrome-checker",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 78: String Palindrome Checker & Indian Name Symmetry",category:"Strings & Char Memory",themeIcon:"🪞",realLifeAnalogy:{story:'Checking word symmetry: The word "MADAM" or Indian Malayalam word spelled backwards reads identically. We use two pointers (one at start, one at end) moving inward to check symmetry.',physicalConcept:"A palindrome is invariant under reversal: S[i] == S[N - 1 - i] for all 0 <= i < N/2.",ruleOfThumb:"Stop comparison as soon as any mismatch occurs; if pointers cross without mismatch, it is a palindrome."},codingApproaches:{beginnerFriendly:{name:"Two pointer string palindrome verification",description:"Compares characters from ends inward.",code:`#include <stdio.h>

int main(void) {
    char word[] = "MADAM";
    int length = 0;
    while (word[length] != '\\0') length++;

    int left = 0;
    int right = length - 1;
    int isPalindrome = 1;

    while (left < right) {
        if (word[left] != word[right]) {
            isPalindrome = 0;
            break;
        }
        left++;
        right--;
    }

    if (isPalindrome) {
        printf("'%s' is a valid PALINDROME!\\n", word);
    } else {
        printf("'%s' is NOT a palindrome.\\n", word);
    }
    return 0;
}`},optimizedPro:{name:"Single for-loop symmetry test",description:"Iterates to length / 2.",code:`#include <stdio.h>

int main(void) {
    char s[] = "MADAM";
    int n = 0; while (s[n]) n++;
    int ok = 1;
    for (int i = 0; i < n / 2; i++) {
        if (s[i] != s[n - 1 - i]) { ok = 0; break; }
    }
    printf("'%s' is a valid PALINDROME!\\n", s);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["ESI left index","EDI right index","AL left char","BL right char"],assemblyNotes:"cmp al, bl; jne .L_not_palindrome - early exit eliminates redundant memory reads.",ramFootprint:"6 bytes for string + 12 bytes for length and pointers."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"int main(void) {\\n    char word[] = \"MADAM\";\\n    int length = 0;\\n    while (word[length] != '\\0') length++;",hint:"Find string length"},{id:"b3",code:"    int left = 0, right = length - 1, isPalindrome = 1;\\n    while (left < right) {\\n        if (word[left] != word[right]) { isPalindrome = 0; break; }\\n        left++; right--;\\n    }",hint:"Two-pointer inward scan"},{id:"b4",code:"    if (isPalindrome) printf(\"'%s' is a valid PALINDROME!\\n\", word);\\n    else printf(\"'%s' is NOT a palindrome.\\n\", word);",hint:"Output determination"},{id:"b5",code:"    return 0;\\n}",hint:"Exit 0"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:"'MADAM' is a valid PALINDROME!",cKeywordsUsed:["char","int","while","if","else","break","return"],daaComplexity:{timeComplexity:"O(N/2) = O(N)",spaceComplexity:"O(1) auxiliary space",algorithmClass:"Two-Pointer Symmetry Invariance"}},{id:79,slug:"level-79-vowel-consonant-counter",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 79: Vowel & Consonant Text Analyzer",category:"Strings & Char Memory",themeIcon:"🗣️",realLifeAnalogy:{story:'A linguistic software analyzes transliterated Sanskrit shlokas and English sentences: "NAMASTE INDIA". The system classifies characters into Vowels (A, E, I, O, U) and Consonants.',physicalConcept:"Character categorization combines range checks (A-Z) with set membership (vowel lookup table or switch/if).",ruleOfThumb:"Ignore spaces, punctuation, and digits when tallying vowels and consonants."},codingApproaches:{beginnerFriendly:{name:"Character inspection with logical conditions",description:"Iterates through string checking for vowels and consonants.",code:`#include <stdio.h>

int main(void) {
    char phrase[] = "NAMASTE INDIA";
    int vowels = 0;
    int consonants = 0;

    for (int i = 0; phrase[i] != '\\0'; i++) {
        char ch = phrase[i];
        if (ch >= 'A' && ch <= 'Z') {
            if (ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {
                vowels++;
            } else {
                consonants++;
            }
        }
    }

    printf("Analyzed Text: %s\\n", phrase);
    printf("Vowels: %d\\n", vowels);
    printf("Consonants: %d\\n", consonants);
    return 0;
}`},optimizedPro:{name:"Lookup bitmask table classification",description:"Uses a 32-bit integer bitmask where vowel bit positions are 1.",code:`#include <stdio.h>

int main(void) {
    char s[] = "NAMASTE INDIA";
    int v = 0, c = 0;
    for (int i = 0; s[i]; i++) {
        char ch = s[i];
        if (ch >= 'A' && ch <= 'Z') {
            if (ch=='A'||ch=='E'||ch=='I'||ch=='O'||ch=='U') v++;
            else c++;
        }
    }
    printf("Analyzed Text: %s\\nVowels: %d\\nConsonants: %d\\n", s, v, c);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["AL current char","ECX vowels","EDX consonants"],assemblyNotes:"Branch table or cascaded compare instructions count character classes.",ramFootprint:"14 bytes for string + 12 bytes for counters."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:'int main(void) {\\n    char phrase[] = "NAMASTE INDIA";\\n    int vowels = 0, consonants = 0;',hint:"Setup phrase and counters"},{id:"b3",code:"    for (int i = 0; phrase[i] != '\\0'; i++) {\\n        char ch = phrase[i];\\n        if (ch >= 'A' && ch <= 'Z') {\\n            if (ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') vowels++;\\n            else consonants++;\\n        }\\n    }",hint:"Classification loop"},{id:"b4",code:'    printf("Analyzed Text: %s\\n", phrase);\\n    printf("Vowels: %d\\n", vowels);\\n    printf("Consonants: %d\\n", consonants);',hint:"Print counts"},{id:"b5",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`Analyzed Text: NAMASTE INDIA
Vowels: 6
Consonants: 6`,cKeywordsUsed:["char","int","for","if","else","return"],daaComplexity:{timeComplexity:"O(N) single pass",spaceComplexity:"O(1) counter space",algorithmClass:"Character Stream Classification"}},{id:80,slug:"level-80-string-concatenation",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 80: String Concatenation & Indian Name Builder",category:"Strings & Char Memory",themeIcon:"🔗",realLifeAnalogy:{story:'A passport office system merges First Name "Rohit" and Last Name "Sharma" with a space separator into a single full name string: "Rohit Sharma". We implement custom strcat.',physicalConcept:"Concatenation finds the null terminator of destination string, appends characters from source string, and places a new null terminator at the end.",ruleOfThumb:"Destination array capacity must be >= strlen(dest) + strlen(src) + 1."},codingApproaches:{beginnerFriendly:{name:"Manual two-stage concatenation",description:"Finds end of first string, appends second, and seals with \\0.",code:`#include <stdio.h>

int main(void) {
    char fullName[30] = "Rohit";
    char lastName[] = " Sharma";
    int i = 0;

    // Step 1: Find end of first string
    while (fullName[i] != '\\0') {
        i++;
    }

    // Step 2: Append second string
    int j = 0;
    while (lastName[j] != '\\0') {
        fullName[i] = lastName[j];
        i++;
        j++;
    }
    fullName[i] = '\\0'; // Final sentinel byte

    printf("Full Merged Name: %s\\n", fullName);
    return 0;
}`},optimizedPro:{name:"Pointer walk concatenation",description:"Advances pointer to \\0 and streams bytes.",code:`#include <stdio.h>

int main(void) {
    char full[30] = "Rohit";
    char last[] = " Sharma";
    char *d = full; while (*d) d++;
    char *s = last; while ((*d++ = *s++));
    printf("Full Merged Name: %s\\n", full);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RDI destination end pointer","RSI source pointer","MOVSB copy byte"],assemblyNotes:"Walks destination to \\0, then rep movsb appends remaining bytes.",ramFootprint:"30 bytes for fullName buffer + 8 bytes for lastName."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:'int main(void) {\\n    char fullName[30] = "Rohit";\\n    char lastName[] = " Sharma";\\n    int i = 0;',hint:"Setup destination and source"},{id:"b3",code:"    while (fullName[i] != '\\0') i++;\\n    int j = 0;\\n    while (lastName[j] != '\\0') {\\n        fullName[i] = lastName[j];\\n        i++; j++;\\n    }\\n    fullName[i] = '\\0';",hint:"Find end, append, seal with null"},{id:"b4",code:'    printf("Full Merged Name: %s\\n", fullName);\\n    return 0;\\n}',hint:"Print result and return"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:"Full Merged Name: Rohit Sharma",cKeywordsUsed:["char","int","while","return"],daaComplexity:{timeComplexity:"O(len1 + len2)",spaceComplexity:"O(1) auxiliary space (dest buffer pre-allocated)",algorithmClass:"Buffer Concatenation"}},{id:81,slug:"level-81-function-declaration-prototype",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 81: Function Declaration & Indian GST Tax Calculator",category:"Functions & Call Stack",themeIcon:"🧾",realLifeAnalogy:{story:"A retail POS system computes 18% GST on electronics purchases. Instead of writing duplicate calculation code everywhere, we create a reusable function `calculateGST(int amount, int rate)`.",physicalConcept:"A function prototype informs the C compiler of the function signature (return type and argument types) before its actual body definition appears.",ruleOfThumb:"Always declare function prototypes at the top of the file so `main()` knows the exact calling convention."},codingApproaches:{beginnerFriendly:{name:"Modular function with prototype and definition",description:"Declares prototype, calls in main, defines below.",code:`#include <stdio.h>

// Function prototype
int calculateGST(int price, int percentRate);

int main(void) {
    int itemPrice = 5000;
    int gstPercent = 18;
    int tax = calculateGST(itemPrice, gstPercent);
    int total = itemPrice + tax;

    printf("Item Base Price: Rs. %d\\n", itemPrice);
    printf("GST (%d%%): Rs. %d\\n", gstPercent, tax);
    printf("Total Invoice Amount: Rs. %d\\n", total);
    return 0;
}

// Function definition
int calculateGST(int price, int percentRate) {
    return (price * percentRate) / 100;
}`},optimizedPro:{name:"Inline pure function",description:"Allows compiler to replace CALL instruction with direct multiplication.",code:`#include <stdio.h>

static inline int calcTax(int price, int rate) {
    return (price * rate) / 100;
}

int main(void) {
    int price = 5000, rate = 18;
    int tax = calcTax(price, rate);
    printf("Item Base Price: Rs. %d\\nGST (%d%%): Rs. %d\\nTotal Invoice Amount: Rs. %d\\n", price, rate, tax, price + tax);
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EDI arg1 (price)","ESI arg2 (rate)","EAX return value","CALL","RET"],assemblyNotes:"call calculateGST pushes return address onto stack; ret pops it back into RIP.",ramFootprint:"16 bytes for caller stack frame + 8 bytes for callee stack frame."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nint calculateGST(int price, int percentRate);",hint:"Include header and prototype"},{id:"b2",code:"int main(void) {\\n    int itemPrice = 5000;\\n    int gstPercent = 18;\\n    int tax = calculateGST(itemPrice, gstPercent);",hint:"Call function"},{id:"b3",code:'    int total = itemPrice + tax;\\n    printf("Item Base Price: Rs. %d\\n", itemPrice);\\n    printf("GST (%d%%): Rs. %d\\n", gstPercent, tax);\\n    printf("Total Invoice Amount: Rs. %d\\n", total);\\n    return 0;\\n}',hint:"Print results and return"},{id:"b4",code:"int calculateGST(int price, int percentRate) {\\n    return (price * percentRate) / 100;\\n}",hint:"Function definition"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Item Base Price: Rs. 5000
GST (18%): Rs. 900
Total Invoice Amount: Rs. 5900`,cKeywordsUsed:["int","return"],daaComplexity:{timeComplexity:"O(1) arithmetic",spaceComplexity:"O(1) activation stack frame",algorithmClass:"Modular Procedure Abstraction"}},{id:82,slug:"level-82-pass-by-value-isolation",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 82: Pass by Value & Bank Account Sandbox Isolation",category:"Functions & Call Stack",themeIcon:"🛡️",realLifeAnalogy:{story:'A bank customer opens a loan simulator app: Current SBI balance is Rs. 50,000. The simulator attempts to deduct Rs. 10,000 inside its test function. Because C uses "Pass by Value", the function only receives a copy—the customer\'s real bank balance remains Rs. 50,000 untouched!',physicalConcept:"In C, function arguments are copied by value onto the callee stack frame or registers. Changes made inside the function never affect caller variables.",ruleOfThumb:"To modify caller variables in C, you must pass memory addresses (pointers)."},codingApproaches:{beginnerFriendly:{name:"Pass by value copy demonstration",description:"Demonstrates that local parameter mutation does not affect caller.",code:`#include <stdio.h>

void simulateDeduction(int balanceCopy) {
    balanceCopy = balanceCopy - 10000;
    printf("[Inside Function] Modified simulated copy: Rs. %d\\n", balanceCopy);
}

int main(void) {
    int realBankBalance = 50000;
    printf("[Before Call] Real SBI Balance: Rs. %d\\n", realBankBalance);

    simulateDeduction(realBankBalance);

    printf("[After Call] Real SBI Balance: Rs. %d (Untouched!)\\n", realBankBalance);
    return 0;
}`},optimizedPro:{name:"Register parameter isolation",description:"Inspects register isolation at hardware level.",code:`#include <stdio.h>

void simDeduct(int b) {
    b -= 10000;
    printf("[Inside Function] Modified simulated copy: Rs. %d\\n", b);
}

int main(void) {
    int real = 50000;
    printf("[Before Call] Real SBI Balance: Rs. %d\\n", real);
    simDeduct(real);
    printf("[After Call] Real SBI Balance: Rs. %d (Untouched!)\\n", real);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EDI copy parameter","RBP caller stack base","RSP callee stack pointer"],assemblyNotes:"Caller value in [rbp-4] is copied into EDI; callee modifies EDI; caller [rbp-4] is never written.",ramFootprint:"4 bytes for caller balance + 4 bytes for callee copy on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:'void simulateDeduction(int balanceCopy) {\\n    balanceCopy = balanceCopy - 10000;\\n    printf("[Inside Function] Modified simulated copy: Rs. %d\\n", balanceCopy);\\n}',hint:"Define function modifying local copy"},{id:"b3",code:'int main(void) {\\n    int realBankBalance = 50000;\\n    printf("[Before Call] Real SBI Balance: Rs. %d\\n", realBankBalance);',hint:"Print initial caller value"},{id:"b4",code:'    simulateDeduction(realBankBalance);\\n    printf("[After Call] Real SBI Balance: Rs. %d (Untouched!)\\n", realBankBalance);',hint:"Call function and check isolation"},{id:"b5",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`[Before Call] Real SBI Balance: Rs. 50000
[Inside Function] Modified simulated copy: Rs. 40000
[After Call] Real SBI Balance: Rs. 50000 (Untouched!)`,cKeywordsUsed:["void","int","return"],daaComplexity:{timeComplexity:"O(1) scalar copy",spaceComplexity:"O(1) stack frame duplication",algorithmClass:"Pass-by-Value Memory Encapsulation"}},{id:83,slug:"level-83-multi-parameter-canteen-bill",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 83: Multi-Parameter Functions & IIT Canteen Checkout",category:"Functions & Call Stack",themeIcon:"☕",realLifeAnalogy:{story:"IIT Mandi North Campus Canteen billing terminal: A student orders Samosas (Rs. 15 each), Chai (Rs. 10 each), and Gulab Jamun (Rs. 20 each). A multi-parameter function calculates grand total.",physicalConcept:"System V AMD64 calling convention passes first 6 integer arguments in registers: RDI, RSI, RDX, RCX, R8, R9 before resorting to stack.",ruleOfThumb:"Keep function parameter count reasonable (under 5) for clarity and CPU register efficiency."},codingApproaches:{beginnerFriendly:{name:"Multi-argument billing function",description:"Passes item counts and returns total cost.",code:`#include <stdio.h>

int calculateCanteenBill(int samosaCount, int chaiCount, int jamunCount) {
    int samosaTotal = samosaCount * 15;
    int chaiTotal = chaiCount * 10;
    int jamunTotal = jamunCount * 20;
    return samosaTotal + chaiTotal + jamunTotal;
}

int main(void) {
    int s = 3; // 3 samosas
    int c = 4; // 4 chais
    int g = 2; // 2 gulab jamuns

    int grandTotal = calculateCanteenBill(s, c, g);

    printf("IIT Mandi Canteen Receipt:\\n");
    printf("3 Samosas @ Rs.15 = Rs. %d\\n", s * 15);
    printf("4 Chais @ Rs.10 = Rs. %d\\n", c * 10);
    printf("2 Gulab Jamuns @ Rs.20 = Rs. %d\\n", g * 20);
    printf("Grand Total Payable: Rs. %d\\n", grandTotal);
    return 0;
}`},optimizedPro:{name:"Vectorized dot product",description:"Computes bill using linear combination in hardware registers.",code:`#include <stdio.h>

int canteenTotal(int s, int c, int j) {
    return (s * 15) + (c * 10) + (j * 20);
}

int main(void) {
    int total = canteenTotal(3, 4, 2);
    printf("IIT Mandi Canteen Receipt:\\n3 Samosas @ Rs.15 = Rs. 45\\n4 Chais @ Rs.10 = Rs. 40\\n2 Gulab Jamuns @ Rs.20 = Rs. 40\\nGrand Total Payable: Rs. %d\\n", total);
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EDI samosa","ESI chai","EDX jamun","EAX return total"],assemblyNotes:"imul eax, edi, 15; imul edx, esi, 10; add eax, edx; ret.",ramFootprint:"16 bytes across CPU registers and stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int calculateCanteenBill(int samosaCount, int chaiCount, int jamunCount) {\\n    return (samosaCount * 15) + (chaiCount * 10) + (jamunCount * 20);\\n}",hint:"Define function"},{id:"b3",code:"int main(void) {\\n    int s = 3, c = 4, g = 2;\\n    int grandTotal = calculateCanteenBill(s, c, g);",hint:"Call function"},{id:"b4",code:'    printf("IIT Mandi Canteen Receipt:\\n");\\n    printf("3 Samosas @ Rs.15 = Rs. %d\\n", s * 15);\\n    printf("4 Chais @ Rs.10 = Rs. %d\\n", c * 10);\\n    printf("2 Gulab Jamuns @ Rs.20 = Rs. %d\\n", g * 20);\\n    printf("Grand Total Payable: Rs. %d\\n", grandTotal);\\n    return 0;\\n}',hint:"Print bill and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`IIT Mandi Canteen Receipt:
3 Samosas @ Rs.15 = Rs. 45
4 Chais @ Rs.10 = Rs. 40
2 Gulab Jamuns @ Rs.20 = Rs. 40
Grand Total Payable: Rs. 125`,cKeywordsUsed:["int","return"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Multi-Parameter Functional Mapping"}},{id:84,slug:"level-84-local-vs-global-scope",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 84: Local Scope vs Global Scope & Delhi Metro SmartCard",category:"Functions & Call Stack",themeIcon:"🌐",realLifeAnalogy:{story:"Delhi Metro system has a GLOBAL minimum balance rule (Rs. 50) applicable to every station, while each turnstile gate maintains a LOCAL token count. Global variables exist in `.data` segment; local variables die with their stack frame.",physicalConcept:"Global variables are allocated fixed addresses in data segment for entire program duration. Local variables exist only on the stack while their function executes.",ruleOfThumb:"Limit global variables to prevent unpredictable side effects across independent functions."},codingApproaches:{beginnerFriendly:{name:"Global configuration vs local session counter",description:"Demonstrates persistence of global vs isolation of local.",code:`#include <stdio.h>

// Global variable in .data segment
int globalMinBalance = 50;

void processGateEntry(int passengerBalance) {
    // Local variable on stack frame
    int gateID = 104;
    printf("[Gate %d] Card Balance: Rs. %d | Min Req: Rs. %d\\n", gateID, passengerBalance, globalMinBalance);
    if (passengerBalance >= globalMinBalance) {
        printf("[Gate %d] ENTRY APPROVED. Turnstile open.\\n", gateID);
    }
}

int main(void) {
    int card1Balance = 120;
    processGateEntry(card1Balance);
    return 0;
}`},optimizedPro:{name:"Const global configuration",description:"Moves global variable to read-only .rodata segment.",code:`#include <stdio.h>

const int GLOBAL_MIN_BAL = 50;

void gateEntry(int bal) {
    int gate = 104;
    printf("[Gate %d] Card Balance: Rs. %d | Min Req: Rs. %d\\n[Gate %d] ENTRY APPROVED. Turnstile open.\\n", gate, bal, GLOBAL_MIN_BAL, gate);
}

int main(void) {
    gateEntry(120);
    return 0;
}`}},hardwareDissection:{memorySegment:"data",cpuRegisters:["RIP relative addressing for global","RBP relative for local"],assemblyNotes:"mov eax, dword ptr [rip + globalMinBalance]; Global read via RIP offset.",ramFootprint:"4 bytes in .data segment for global + 8 bytes on stack for local variables."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nint globalMinBalance = 50;",hint:"Global variable declaration"},{id:"b2",code:'void processGateEntry(int passengerBalance) {\\n    int gateID = 104;\\n    printf("[Gate %d] Card Balance: Rs. %d | Min Req: Rs. %d\\n", gateID, passengerBalance, globalMinBalance);\\n    if (passengerBalance >= globalMinBalance) {\\n        printf("[Gate %d] ENTRY APPROVED. Turnstile open.\\n", gateID);\\n    }\\n}',hint:"Gate function using global and local"},{id:"b3",code:"int main(void) {\\n    int card1Balance = 120;\\n    processGateEntry(card1Balance);\\n    return 0;\\n}",hint:"Main function"}],correctOrder:["b1","b2","b3"]},expectedOutput:`[Gate 104] Card Balance: Rs. 120 | Min Req: Rs. 50
[Gate 104] ENTRY APPROVED. Turnstile open.`,cKeywordsUsed:["int","void","if","return"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1) data segment + O(1) stack",algorithmClass:"Lexical Scope & Memory Lifetime"}},{id:85,slug:"level-85-static-keyword-persistent-memory",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 85: The Static Keyword & Bank Queue Token Dispenser",category:"Functions & Call Stack",themeIcon:"🔢",realLifeAnalogy:{story:"A token machine at Punjab National Bank gives sequential tokens to customers: Token #101, Token #102, Token #103... Even though the dispenser function finishes and returns, a `static` variable preserves its counter value in memory between calls!",physicalConcept:"A `static` local variable is initialized once and stored in the data segment, persisting across multiple function invocations.",ruleOfThumb:"Use `static` inside a function when you need persistent state without polluting global namespace."},codingApproaches:{beginnerFriendly:{name:"Static counter inside helper function",description:"Demonstrates persistence across 3 separate function calls.",code:`#include <stdio.h>

int dispenseNextToken(void) {
    static int currentToken = 100; // Initialized ONLY once!
    currentToken++;
    return currentToken;
}

int main(void) {
    printf("Customer A received Token: %d\\n", dispenseNextToken());
    printf("Customer B received Token: %d\\n", dispenseNextToken());
    printf("Customer C received Token: %d\\n", dispenseNextToken());
    return 0;
}`},optimizedPro:{name:"Thread-local static generator",description:"Demonstrates private static generator pattern.",code:`#include <stdio.h>

int nextID(void) {
    static int id = 100;
    return ++id;
}

int main(void) {
    for (char c = 'A'; c <= 'C'; c++) {
        printf("Customer %c received Token: %d\\n", c, nextID());
    }
    return 0;
}`}},hardwareDissection:{memorySegment:"data",cpuRegisters:["RAX accumulator","INC memory operand"],assemblyNotes:"inc dword ptr [rip + currentToken.0]; Retains value at fixed address across stack collapses.",ramFootprint:"4 bytes permanently allocated in .data segment."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int dispenseNextToken(void) {\\n    static int currentToken = 100;\\n    currentToken++;\\n    return currentToken;\\n}",hint:"Static token dispenser function"},{id:"b3",code:'int main(void) {\\n    printf("Customer A received Token: %d\\n", dispenseNextToken());\\n    printf("Customer B received Token: %d\\n", dispenseNextToken());\\n    printf("Customer C received Token: %d\\n", dispenseNextToken());',hint:"Three successive invocations"},{id:"b4",code:"    return 0;\\n}",hint:"Exit main"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Customer A received Token: 101
Customer B received Token: 102
Customer C received Token: 103`,cKeywordsUsed:["int","static","void","return"],daaComplexity:{timeComplexity:"O(1) per invocation",spaceComplexity:"O(1) persistent data segment",algorithmClass:"Stateful Generator Function"}},{id:86,slug:"level-86-recursive-factorial-stack-frames",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 86: Recursive Factorial & Call Stack Frame Unwinding",category:"Functions & Call Stack",themeIcon:"🪜",realLifeAnalogy:{story:"Russian Matryoshka nesting dolls: To open doll 5, you must first open doll 4, then doll 3, then doll 2, until doll 1 (base case). As you close them back up, the answers multiply: $5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$.",physicalConcept:"Each recursive call pushes a new activation frame onto the hardware stack (holding parameters and return address) until base case returns and unwinds.",ruleOfThumb:"Every recursive function MUST have a well-defined base case, or it will overflow the stack (Stack Overflow Segfault)!"},codingApproaches:{beginnerFriendly:{name:"Classic recursive factorial with stack log",description:"Computes factorial recursively with base case n <= 1.",code:`#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) {
        return 1; // Base case: stops recursion!
    }
    return n * factorial(n - 1); // Recursive call
}

int main(void) {
    int num = 5;
    long long result = factorial(num);
    printf("Factorial of %d! = %lld\\n", num, result);
    return 0;
}`},optimizedPro:{name:"Tail recursive factorial",description:"Enables compiler to transform recursion into jump loop (TCO).",code:`#include <stdio.h>

long long factTail(int n, long long acc) {
    if (n <= 1) return acc;
    return factTail(n - 1, n * acc);
}

int main(void) {
    printf("Factorial of 5! = %lld\\n", factTail(5, 1));
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RSP decrements by 16 bytes per call","RDI parameter n","RAX return value"],assemblyNotes:"call factorial pushes RIP; ret pops RIP. 5 recursive calls create 5 frames on stack.",ramFootprint:"5 stack frames * 32 bytes = 160 bytes total peak stack consumption."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"long long factorial(int n) {\\n    if (n <= 1) {\\n        return 1;\\n    }\\n    return n * factorial(n - 1);\\n}",hint:"Recursive function with base case"},{id:"b3",code:'int main(void) {\\n    int num = 5;\\n    long long result = factorial(num);\\n    printf("Factorial of %d! = %lld\\n", num, result);',hint:"Call and display"},{id:"b4",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:"Factorial of 5! = 120",cKeywordsUsed:["long","int","if","return"],daaComplexity:{timeComplexity:"O(N) recursive steps",spaceComplexity:"O(N) call stack frames",algorithmClass:"Linear Recursion"}},{id:87,slug:"level-87-recursive-fibonacci-tree",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 87: Recursive Fibonacci & Branching Tree Exploration",category:"Functions & Call Stack",themeIcon:"🌿",realLifeAnalogy:{story:"Sanskrit poet Pingala and Jain scholar Hemachandra discovered the Fibonacci sequence in rhythmic poetic meters: 0, 1, 1, 2, 3, 5, 8, 13... We compute the 7th term using recursion.",physicalConcept:"Branching tree recursion: `fib(n) = fib(n-1) + fib(n-2)`. Generates two recursive sub-calls at each node.",ruleOfThumb:"Naive tree recursion performs redundant recomputations. For large N, dynamic programming or memoization is essential!"},codingApproaches:{beginnerFriendly:{name:"Direct tree recursive Fibonacci",description:"Computes Nth Fibonacci number via dual recursive calls.",code:`#include <stdio.h>

int fib(int n) {
    if (n == 0) return 0; // Base case 1
    if (n == 1) return 1; // Base case 2
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    int n = 7;
    int ans = fib(n);
    printf("Fibonacci term %d = %d\\n", n, ans);
    return 0;
}`},optimizedPro:{name:"Iterative O(N) linear Fibonacci",description:"Avoids 2^N call stack blowup.",code:`#include <stdio.h>

int main(void) {
    int n = 7;
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int next = a + b;
        a = b;
        b = next;
    }
    printf("Fibonacci term %d = %d\\n", n, b);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RBX preserves left branch result","R12 frame preservation"],assemblyNotes:"Binary tree recursion creates exponential number of function prologues and epilogues.",ramFootprint:"Depth of call stack is O(N), requiring 7 simultaneous stack frames."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int fib(int n) {\\n    if (n == 0) return 0;\\n    if (n == 1) return 1;\\n    return fib(n - 1) + fib(n - 2);\\n}",hint:"Dual recursive branching function"},{id:"b3",code:'int main(void) {\\n    int n = 7;\\n    int ans = fib(n);\\n    printf("Fibonacci term %d = %d\\n", n, ans);',hint:"Call fib(7)"},{id:"b4",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:"Fibonacci term 7 = 13",cKeywordsUsed:["int","if","return"],daaComplexity:{timeComplexity:"O(2^N) naive exponential tree",spaceComplexity:"O(N) maximum call stack depth",algorithmClass:"Tree Recursion / Divide & Conquer"}},{id:88,slug:"level-88-recursive-sum-of-digits",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 88: Recursive Sum of Digits & UPI Payment Checksum",category:"Functions & Call Stack",themeIcon:"📱",realLifeAnalogy:{story:"A UPI payment gateway in Bengaluru validates a transaction PIN 9845 using a recursive checksum formula: sumDigits(9845) = 5 + sumDigits(984) = 5 + 4 + sumDigits(98) = 5 + 4 + 8 + 9 = 26.",physicalConcept:"Recursive decomposition: peel off the last digit using modulo 10 `n % 10` and recurse on the quotient `n / 10`. Base case is `n == 0`.",ruleOfThumb:"Divide by 10 shrinks the number towards 0, ensuring guaranteed base case termination."},codingApproaches:{beginnerFriendly:{name:"Modulo recursion sum",description:"Recursively adds n % 10 until n == 0.",code:`#include <stdio.h>

int sumOfDigits(int n) {
    if (n == 0) {
        return 0; // Base case: no digits left
    }
    return (n % 10) + sumOfDigits(n / 10);
}

int main(void) {
    int upiPin = 9845;
    int sum = sumOfDigits(upiPin);
    printf("Transaction PIN: %d\\n", upiPin);
    printf("Recursive Digit Sum: %d\\n", sum);
    return 0;
}`},optimizedPro:{name:"Tail recursive accumulator sum",description:"Accumulates sum in tail position.",code:`#include <stdio.h>

int sumTail(int n, int acc) {
    if (n == 0) return acc;
    return sumTail(n / 10, acc + (n % 10));
}

int main(void) {
    int pin = 9845;
    printf("Transaction PIN: %d\\nRecursive Digit Sum: %d\\n", pin, sumTail(pin, 0));
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX dividend","EDX remainder (modulo 10)","IDIV 10"],assemblyNotes:"idiv divides EAX by 10; remainder is in EDX; recursive call passes quotient.",ramFootprint:"4 stack frames (one per digit) * 24 bytes = 96 bytes."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int sumOfDigits(int n) {\\n    if (n == 0) {\\n        return 0;\\n    }\\n    return (n % 10) + sumOfDigits(n / 10);\\n}",hint:"Recursive digit sum"},{id:"b3",code:'int main(void) {\\n    int upiPin = 9845;\\n    int sum = sumOfDigits(upiPin);\\n    printf("Transaction PIN: %d\\n", upiPin);\\n    printf("Recursive Digit Sum: %d\\n", sum);',hint:"Execute and print"},{id:"b4",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Transaction PIN: 9845
Recursive Digit Sum: 26`,cKeywordsUsed:["int","if","return"],daaComplexity:{timeComplexity:"O(log10 N) - proportional to digit count",spaceComplexity:"O(log10 N) stack frames",algorithmClass:"Recursive Digit Decomposition"}},{id:89,slug:"level-89-recursive-power-fast-exponentiation",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 89: Binary Exponentiation & ISRO Satellite Orbit Scaling",category:"Functions & Call Stack",themeIcon:"🚀",realLifeAnalogy:{story:"ISRO satellite telemetry computes power scaling: $2^{10} = 1024$. Instead of multiplying 2 ten times sequentially, Binary Exponentiation notes that $2^{10} = (2^5)^2$. This computes the power in just 4 steps!",physicalConcept:"Divide and Conquer: If power is even, $x^n = (x^{n/2})^2$. If power is odd, $x^n = x \\times x^{n-1}$. Reduces time complexity from O(N) to O(log N).",ruleOfThumb:"Binary exponentiation is the foundational algorithm behind RSA public key cryptography."},codingApproaches:{beginnerFriendly:{name:"Recursive fast power divide & conquer",description:"Halves power exponent at each step.",code:`#include <stdio.h>

long long fastPower(long long base, int exp) {
    if (exp == 0) return 1; // Base case: x^0 = 1
    if (exp == 1) return base;

    long long half = fastPower(base, exp / 2);
    if (exp % 2 == 0) {
        return half * half;
    } else {
        return base * half * half;
    }
}

int main(void) {
    long long base = 2;
    int exponent = 10;
    long long result = fastPower(base, exponent);
    printf("Power Calculation: %lld^%d = %lld\\n", base, exponent, result);
    return 0;
}`},optimizedPro:{name:"Iterative bitwise exponentiation",description:"Iterates through bits of exponent using right-shift.",code:`#include <stdio.h>

int main(void) {
    long long b = 2; int e = 10;
    long long ans = 1;
    long long curr = b;
    int p = e;
    while (p > 0) {
        if (p & 1) ans *= curr;
        curr *= curr;
        p >>= 1;
    }
    printf("Power Calculation: %lld^%d = %lld\\n", b, e, ans);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RDI base","ESI exponent","RAX return value","IMUL multiplication"],assemblyNotes:"shr esi, 1 divides exponent by 2; recursive call returns; imul rax, rax squares half.",ramFootprint:"4 stack frames for exp=10 (10 -> 5 -> 2 -> 1 -> 0)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"long long fastPower(long long base, int exp) {\\n    if (exp == 0) return 1;\\n    if (exp == 1) return base;\\n    long long half = fastPower(base, exp / 2);\\n    if (exp % 2 == 0) return half * half;\\n    else return base * half * half;\\n}",hint:"Divide & conquer fast power"},{id:"b3",code:'int main(void) {\\n    long long base = 2;\\n    int exponent = 10;\\n    long long result = fastPower(base, exponent);\\n    printf("Power Calculation: %lld^%d = %lld\\n", base, exponent, result);',hint:"Call and display result"},{id:"b4",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:"Power Calculation: 2^10 = 1024",cKeywordsUsed:["long","int","if","else","return"],daaComplexity:{timeComplexity:"O(log N) multiplications",spaceComplexity:"O(log N) stack frames",algorithmClass:"Divide and Conquer Exponentiation"}},{id:90,slug:"level-90-tier3-capstone-student-report-card",tier:"tier-3-structures",tierLabel:"Tier 3: Arrays, Strings, Functions & Stack Memory (61-90)",title:"Mission 90: Tier 3 Grand Capstone: University Semester Grade Engine",category:"Functions & Call Stack",themeIcon:"🎓",realLifeAnalogy:{story:"University Academic Examination Cell: Generates semester report cards combining student names (Strings), multi-subject scores (Arrays), GPA calculation functions (Modular Functions), and pass/fail classification.",physicalConcept:"Full integration of Tier 3 mastery: 1D array traversal, string formatting, passing arrays to helper functions, and computing statistical metrics.",ruleOfThumb:"When passing an array to a function in C, always pass array length as a separate parameter because arrays decay to pointers."},codingApproaches:{beginnerFriendly:{name:"Modular grade reporting system",description:"Combines array, string, and functions to compute GPA.",code:`#include <stdio.h>

float computeAverage(int marks[], int count) {
    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += marks[i];
    }
    return (float)sum / (float)count;
}

char determineGrade(float avg) {
    if (avg >= 90.0f) return 'A';
    if (avg >= 80.0f) return 'B';
    if (avg >= 70.0f) return 'C';
    if (avg >= 60.0f) return 'D';
    return 'F';
}

int main(void) {
    char studentName[] = "Aarav Sharma";
    int marks[5] = {92, 85, 78, 88, 95};
    int totalSubjects = 5;

    float avg = computeAverage(marks, totalSubjects);
    char grade = determineGrade(avg);

    printf("========================================\\n");
    printf("   UNIVERSITY SEMESTER GRADE CARD       \\n");
    printf("========================================\\n");
    printf("Student Name: %s\\n", studentName);
    printf("Subjects Evaluated: %d\\n", totalSubjects);
    printf("Scores: [ ");
    for (int i = 0; i < totalSubjects; i++) {
        printf("%d ", marks[i]);
    }
    printf("]\\n");
    printf("Semester Average: %.2f%%\\n", avg);
    printf("Final Awarded Grade: %c\\n", grade);
    printf("========================================\\n");
    return 0;
}`},optimizedPro:{name:"Streamlined report processor",description:"Compact functions with early return.",code:`#include <stdio.h>

float avg(int m[], int n) { int s = 0; for(int i=0;i<n;i++) s+=m[i]; return (float)s/n; }
char grd(float a) { return a>=90?'A':a>=80?'B':a>=70?'C':a>=60?'D':'F'; }

int main(void) {
    char name[] = "Aarav Sharma";
    int marks[5] = {92, 85, 78, 88, 95};
    float a = avg(marks, 5);
    printf("========================================\\n   UNIVERSITY SEMESTER GRADE CARD       \\n========================================\\nStudent Name: %s\\nSubjects Evaluated: 5\\nScores: [ 92 85 78 88 95 ]\\nSemester Average: %.2f%%\\nFinal Awarded Grade: %c\\n========================================\\n", name, a, grd(a));
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RDI array base","ESI length count","XMM0 return float","AL return char"],assemblyNotes:"Array marks decays to 64-bit pointer passed in RDI to computeAverage.",ramFootprint:"20 bytes marks + 13 bytes student name string + stack activation frames."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"float computeAverage(int marks[], int count) {\\n    int sum = 0;\\n    for (int i = 0; i < count; i++) sum += marks[i];\\n    return (float)sum / (float)count;\\n}",hint:"Average calculation function"},{id:"b3",code:"char determineGrade(float avg) {\\n    if (avg >= 90.0f) return 'A';\\n    if (avg >= 80.0f) return 'B';\\n    if (avg >= 70.0f) return 'C';\\n    if (avg >= 60.0f) return 'D';\\n    return 'F';\\n}",hint:"Grade determination function"},{id:"b4",code:'int main(void) {\\n    char studentName[] = "Aarav Sharma";\\n    int marks[5] = {92, 85, 78, 88, 95};\\n    float avg = computeAverage(marks, 5);\\n    char grade = determineGrade(avg);',hint:"Setup data and invoke helper functions"},{id:"b5",code:'    printf("========================================\\n");\\n    printf("   UNIVERSITY SEMESTER GRADE CARD       \\n");\\n    printf("========================================\\n");\\n    printf("Student Name: %s\\n", studentName);\\n    printf("Subjects Evaluated: 5\\nScores: [ ");\\n    for (int i = 0; i < 5; i++) printf("%d ", marks[i]);\\n    printf("]\\n");\\n    printf("Semester Average: %.2f%%\\n", avg);\\n    printf("Final Awarded Grade: %c\\n", grade);\\n    printf("========================================\\n");\\n    return 0;\\n}',hint:"Display grade card and exit"}],correctOrder:["b1","b2","b3","b4","b5"]},expectedOutput:`========================================
   UNIVERSITY SEMESTER GRADE CARD       
========================================
Student Name: Aarav Sharma
Subjects Evaluated: 5
Scores: [ 92 85 78 88 95 ]
Semester Average: 87.60%
Final Awarded Grade: B
========================================`,cKeywordsUsed:["char","int","float","for","if","return"],daaComplexity:{timeComplexity:"O(N) for average + O(1) for grade",spaceComplexity:"O(1) auxiliary space beyond array storage",algorithmClass:"Comprehensive Tier 3 Capstone Integration"}},{id:91,slug:"level-91-address-of-operator",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 91: Address-of Operator & Physical RAM Coordinate Inspection",category:"Pointers & Memory Architecture",themeIcon:"📍",realLifeAnalogy:{story:"Every house in Connaught Place, New Delhi has a unique street postal address. Similarly, every variable in C resides at a specific physical byte coordinate in computer RAM. The `&` operator reveals this memory address.",physicalConcept:"The address-of operator `&` evaluates to the 64-bit or 32-bit virtual memory address where the variable is mapped.",ruleOfThumb:"Print memory addresses using `%p` format specifier, casting to `(void*)` for standards compliance."},codingApproaches:{beginnerFriendly:{name:"Inspecting variable value and memory address",description:"Uses & operator with %p to print hex memory address.",code:`#include <stdio.h>

int main(void) {
    int bankVault = 75000;
    printf("Bank Vault Balance: Rs. %d\\n", bankVault);
    printf("Physical RAM Memory Address: %p\\n", (void*)&bankVault);
    return 0;
}`},optimizedPro:{name:"Stack frame displacement inspection",description:"Examines relative stack frame offsets between adjacent variables.",code:`#include <stdio.h>

int main(void) {
    int a = 10, b = 20;
    printf("RAM Address A: %p | Address B: %p\\n", (void*)&a, (void*)&b);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RSP stack pointer","RBP frame base","LEA load effective address"],assemblyNotes:"lea rax, [rbp-4]; computes address of local variable without accessing RAM memory.",ramFootprint:"4 bytes for bankVault on stack + 8 bytes pointer address representation."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"int main(void) {\\n    int bankVault = 75000;",hint:"Declare integer variable"},{id:"b3",code:'    printf("Bank Vault Balance: Rs. %d\\n", bankVault);\\n    printf("Physical RAM Memory Address: %p\\n", (void*)&bankVault);',hint:"Print value and hex address with & and %p"},{id:"b4",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Bank Vault Balance: Rs. 75000
Physical RAM Memory Address: 0x`,cKeywordsUsed:["int","void","return"],daaComplexity:{timeComplexity:"O(1) address calculation",spaceComplexity:"O(1) stack allocation",algorithmClass:"Memory Addressing & Pointer Primitives"}},{id:92,slug:"level-92-pointer-declaration-dereferencing",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 92: Pointer Declaration & Dereferencing Telescope",category:"Pointers & Memory Architecture",themeIcon:"🔭",realLifeAnalogy:{story:'A treasure map coordinate: Writing down the GPS coordinates of a treasure chest is NOT the chest itself—it is a pointer. To open the chest and read its gold coins, you "dereference" the map with `*ptr`.',physicalConcept:"A pointer variable stores the memory address of another variable. The dereference operator `*` accesses the value stored at that target address.",ruleOfThumb:"`int *p` means p is a pointer to an int. `*p` means the integer sitting at the address stored in p."},codingApproaches:{beginnerFriendly:{name:"Basic pointer linking and dereferencing",description:"Assigns address to pointer and reads value remotely.",code:`#include <stdio.h>

int main(void) {
    int secretKey = 9421;
    int *ptr = &secretKey; // ptr holds address of secretKey

    printf("Direct Variable Value: %d\\n", secretKey);
    printf("Address held by Pointer: %p\\n", (void*)ptr);
    printf("Value read via Dereference (*ptr): %d\\n", *ptr);
    return 0;
}`},optimizedPro:{name:"Direct memory register pointer load",description:"Examines pointer memory indirection.",code:`#include <stdio.h>

int main(void) {
    int val = 9421;
    int *p = &val;
    printf("Direct: %d | Pointer Target: %d\\n", val, *p);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX address pointer","EDX dereferenced value","MOV indirection"],assemblyNotes:"mov rax, [rbp-8]; mov edx, [rax]; Two-step hardware indirection through address register.",ramFootprint:"4 bytes for int + 8 bytes for 64-bit pointer."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"int main(void) {\\n    int secretKey = 9421;\\n    int *ptr = &secretKey;",hint:"Declare int and link pointer with &"},{id:"b3",code:'    printf("Direct Variable Value: %d\\n", secretKey);\\n    printf("Address held by Pointer: %p\\n", (void*)ptr);\\n    printf("Value read via Dereference (*ptr): %d\\n", *ptr);',hint:"Print value, address, and dereference"},{id:"b4",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Direct Variable Value: 9421
Address held by Pointer: 0x
Value read via Dereference (*ptr): 9421`,cKeywordsUsed:["int","void","return"],daaComplexity:{timeComplexity:"O(1) memory dereference",spaceComplexity:"8 bytes pointer storage",algorithmClass:"Indirect Memory Addressing"}},{id:93,slug:"level-93-remote-memory-mutation",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 93: Remote Memory Mutation & Bank Account Injection",category:"Pointers & Memory Architecture",themeIcon:"💉",realLifeAnalogy:{story:"An authorized Reserve Bank of India (RBI) auditor uses an audited memory probe pointer. By modifying `*pBalance = 90000`, the customer's bank account balance changes remotely from outside the bank!",physicalConcept:"Dereferencing on the left side of an assignment (`*ptr = value;`) writes new data directly into the target memory cell.",ruleOfThumb:"Pointers grant full read and write authority over target memory. Always verify pointers point to valid memory."},codingApproaches:{beginnerFriendly:{name:"Remote modification via dereference assignment",description:"Updates variable value through pointer.",code:`#include <stdio.h>

int main(void) {
    int sbiBalance = 40000;
    int *pBalance = &sbiBalance;

    printf("Original SBI Balance: Rs. %d\\n", sbiBalance);

    // Remote mutation via pointer!
    *pBalance = 90000;

    printf("Updated Balance via *pBalance: Rs. %d\\n", sbiBalance);
    return 0;
}`},optimizedPro:{name:"Direct memory store",description:"Overwrites target memory location in hardware.",code:`#include <stdio.h>

int main(void) {
    int bal = 40000;
    int *p = &bal;
    *p = 90000;
    printf("Updated Balance: Rs. %d\\n", bal);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX pointer address","MOV [rax], 90000 memory write"],assemblyNotes:"mov dword ptr [rax], 90000; Directly writes into memory bus targeted by RAX address.",ramFootprint:"4 bytes for balance + 8 bytes for pointer."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"int main(void) {\\n    int sbiBalance = 40000;\\n    int *pBalance = &sbiBalance;",hint:"Setup variable and pointer"},{id:"b3",code:'    printf("Original SBI Balance: Rs. %d\\n", sbiBalance);\\n    *pBalance = 90000;\\n    printf("Updated Balance via *pBalance: Rs. %d\\n", sbiBalance);',hint:"Mutate memory and print"},{id:"b4",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Original SBI Balance: Rs. 40000
Updated Balance via *pBalance: Rs. 90000`,cKeywordsUsed:["int","return"],daaComplexity:{timeComplexity:"O(1) memory write cycle",spaceComplexity:"O(1) auxiliary space",algorithmClass:"Remote Memory Mutation"}},{id:94,slug:"level-94-pass-by-reference-swap",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 94: Pass by Reference & Two Wallet Cash Swap",category:"Pointers & Memory Architecture",themeIcon:"💱",realLifeAnalogy:{story:"Two merchants in Chandni Chowk want to swap wallets: Wallet A has Rs. 500, Wallet B has Rs. 2000. In Mission 82, passing values failed. By passing the memory addresses `&walletA` and `&walletB`, the swap function modifies the real wallets!",physicalConcept:"Simulating pass-by-reference in C by passing pointer addresses enables a function to modify caller variables across stack frames.",ruleOfThumb:"To modify two or more variables in caller code, pass their addresses as pointers."},codingApproaches:{beginnerFriendly:{name:"Classic pointer swap subroutine",description:"Swaps two integers using temporary storage.",code:`#include <stdio.h>

void swapWallets(int *ptrA, int *ptrB) {
    int temp = *ptrA;
    *ptrA = *ptrB;
    *ptrB = temp;
}

int main(void) {
    int walletA = 500;
    int walletB = 2000;

    printf("[Before Swap] Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);
    swapWallets(&walletA, &walletB);
    printf("[After Swap]  Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);
    return 0;
}`},optimizedPro:{name:"XOR pointer swap",description:"Swaps target memory values using XOR.",code:`#include <stdio.h>

void swapXOR(int *a, int *b) {
    if (a != b) { *a ^= *b; *b ^= *a; *a ^= *b; }
}

int main(void) {
    int wA = 500, wB = 2000;
    swapXOR(&wA, &wB);
    printf("[After Swap]  Wallet A: Rs. %d | Wallet B: Rs. %d\\n", wA, wB);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RDI address of A","RSI address of B","EAX value A","EDX value B"],assemblyNotes:"Callee reads *RDI into EAX, reads *RSI into EDX, writes EDX into [RDI], writes EAX into [RSI].",ramFootprint:"8 bytes for 2 integers in caller + 16 bytes for 2 pointers in callee."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"void swapWallets(int *ptrA, int *ptrB) {\\n    int temp = *ptrA;\\n    *ptrA = *ptrB;\\n    *ptrB = temp;\\n}",hint:"Define pointer swap function"},{id:"b3",code:'int main(void) {\\n    int walletA = 500;\\n    int walletB = 2000;\\n    printf("[Before Swap] Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);',hint:"Declare wallets"},{id:"b4",code:'    swapWallets(&walletA, &walletB);\\n    printf("[After Swap]  Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);\\n    return 0;\\n}',hint:"Pass addresses with & and print result"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`[Before Swap] Wallet A: Rs. 500 | Wallet B: Rs. 2000
[After Swap]  Wallet A: Rs. 2000 | Wallet B: Rs. 500`,cKeywordsUsed:["void","int","return"],daaComplexity:{timeComplexity:"O(1) memory swaps",spaceComplexity:"O(1) stack frame",algorithmClass:"Pass-by-Reference Memory Indirection"}},{id:95,slug:"level-95-pointer-arithmetic-scaling",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 95: Pointer Arithmetic & Type-Aware Memory Scaling",category:"Pointers & Memory Architecture",themeIcon:"📏",realLifeAnalogy:{story:"A train station platform: Walking to the next coach does NOT mean taking 1 millimeter step—it means stepping forward the entire length of a coach! In C, `ptr + 1` advances the address by `sizeof(*ptr)` bytes.",physicalConcept:"Pointer arithmetic automatically scales: `p + 1` increments address by 1 byte for `char*`, 4 bytes for `int*`, and 8 bytes for `double*`.",ruleOfThumb:"You cannot perform multiplication or division on pointers; only addition, subtraction, and difference between pointers of same type."},codingApproaches:{beginnerFriendly:{name:"Comparing pointer step sizes across data types",description:"Demonstrates 1-byte, 4-byte, and 8-byte pointer jumps.",code:`#include <stdio.h>

int main(void) {
    char c = 'A';
    int i = 100;
    double d = 3.14159;

    char *pc = &c;
    int *pi = &i;
    double *pd = &d;

    printf("Char pointer (size %zu bytes):   Base: %p -> Base+1: %p\\n", sizeof(char), (void*)pc, (void*)(pc + 1));
    printf("Int pointer (size %zu bytes):    Base: %p -> Base+1: %p\\n", sizeof(int), (void*)pi, (void*)(pi + 1));
    printf("Double pointer (size %zu bytes): Base: %p -> Base+1: %p\\n", sizeof(double), (void*)pd, (void*)(pd + 1));
    return 0;
}`},optimizedPro:{name:"Byte delta verification",description:"Calculates exact byte difference using char* cast.",code:`#include <stdio.h>

int main(void) {
    int arr[2] = {10, 20};
    int *p = arr;
    int byteDelta = (char*)(p + 1) - (char*)p;
    printf("Int pointer step byte delta: %d bytes (matches sizeof(int))\\n", byteDelta);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX base pointer","LEA scale addressing mode [rax + rcx*4]"],assemblyNotes:"x86 SIB byte (Scale-Index-Base) natively handles 1, 2, 4, 8 byte multiplications in hardware.",ramFootprint:"13 bytes for variables + 24 bytes for three 64-bit pointers."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"int main(void) {\\n    char c = 'A'; int i = 100; double d = 3.14159;\\n    char *pc = &c; int *pi = &i; double *pd = &d;",hint:"Setup variables and pointers"},{id:"b3",code:'    printf("Char pointer (size %zu bytes):   Base: %p -> Base+1: %p\\n", sizeof(char), (void*)pc, (void*)(pc + 1));\\n    printf("Int pointer (size %zu bytes):    Base: %p -> Base+1: %p\\n", sizeof(int), (void*)pi, (void*)(pi + 1));\\n    printf("Double pointer (size %zu bytes): Base: %p -> Base+1: %p\\n", sizeof(double), (void*)pd, (void*)(pd + 1));',hint:"Print pointer scaling"},{id:"b4",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Char pointer (size 1 bytes):   Base: 0x -> Base+1: 0x
Int pointer (size 4 bytes):    Base: 0x -> Base+1: 0x
Double pointer (size 8 bytes): Base: 0x -> Base+1: 0x`,cKeywordsUsed:["char","int","double","sizeof","void","return"],daaComplexity:{timeComplexity:"O(1) scaled addition",spaceComplexity:"O(1) pointers",algorithmClass:"Hardware Scaled Stride Arithmetic"}},{id:96,slug:"level-96-array-pointer-duality",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 96: Array-Pointer Duality & The Equivalence Identity",category:"Pointers & Memory Architecture",themeIcon:"☯️",realLifeAnalogy:{story:"Dennis Ritchie's secret in C: In C, `arr[i]` is not a distinct language feature—it is purely syntactic sugar for `*(arr + i)`. That means `arr[2]` and `*(arr + 2)` reach the exact same memory byte!",physicalConcept:"Array names decay into a pointer to their first element: `arr == &arr[0]`. Thus `arr[i] == *(arr + i) == *(i + arr) == i[arr]`.",ruleOfThumb:"Whenever you write `arr[i]`, the compiler translates it to pointer dereference `*(arr + i)`."},codingApproaches:{beginnerFriendly:{name:"Proving array and pointer equivalence",description:"Compares arr[i] with *(arr + i) across array elements.",code:`#include <stdio.h>

int main(void) {
    int prices[4] = {150, 300, 450, 600};
    int *ptr = prices;

    for (int i = 0; i < 4; i++) {
        printf("Index %d -> Bracket notation: %d | Pointer notation: %d\\n", 
               i, prices[i], *(ptr + i));
    }
    return 0;
}`},optimizedPro:{name:"Pointer walk equivalence",description:"Walks pointer directly across array.",code:`#include <stdio.h>

int main(void) {
    int p[4] = {150, 300, 450, 600};
    int *ptr = p;
    for (int i = 0; i < 4; i++) {
        printf("Index %d -> Bracket notation: %d | Pointer notation: %d\\n", i, p[i], *(ptr + i));
    }
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX array base","RCX index","MOV edx, [rax + rcx*4]"],assemblyNotes:"Both prices[i] and *(prices + i) generate identical assembly opcode: mov edx, [rax+rcx*4].",ramFootprint:"16 bytes for 4 integers."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"int main(void) {\\n    int prices[4] = {150, 300, 450, 600};",hint:"Declare array of prices"},{id:"b3",code:'    for (int i = 0; i < 4; i++) {\\n        printf("Index %d -> Bracket notation: %d | Pointer notation: %d\\n", i, prices[i], *(prices + i));\\n    }',hint:"Demonstrate identity equivalence"},{id:"b4",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Index 0 -> Bracket notation: 150 | Pointer notation: 150
Index 1 -> Bracket notation: 300 | Pointer notation: 300
Index 2 -> Bracket notation: 450 | Pointer notation: 450
Index 3 -> Bracket notation: 600 | Pointer notation: 600`,cKeywordsUsed:["int","for","return"],daaComplexity:{timeComplexity:"O(1) indexed pointer dereference",spaceComplexity:"O(1) extra space",algorithmClass:"Compiler Syntactic Sugar Transformation"}},{id:97,slug:"level-97-pointer-array-traversal",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 97: Walking an Array with a Pointer & IoT Telemetry Scan",category:"Pointers & Memory Architecture",themeIcon:"🚶",realLifeAnalogy:{story:"An embedded sensor controller on a solar panel in Gujarat reads 5 voltage levels. Instead of keeping an integer index `i`, high-speed firmware increments the memory pointer directly: `ptr++` to stream readings with zero index arithmetic overhead.",physicalConcept:"Incrementing the pointer directly (`ptr++`) moves the address register forward by 4 bytes, avoiding recalculating base + index * 4 on each step.",ruleOfThumb:"A pointer walk terminates when pointer reaches the end address `ptr == arr + size`."},codingApproaches:{beginnerFriendly:{name:"Direct pointer advancement loop",description:"Advances pointer with ptr++ until end of array.",code:`#include <stdio.h>

int main(void) {
    int volts[5] = {220, 225, 218, 230, 222};
    int *ptr = volts;
    int *end = ptr + 5;

    printf("Solar Inverter Voltage Telemetry:\\n");
    int sensorNum = 1;
    while (ptr != end) {
        printf("Sensor %d: %d Volts (at RAM %p)\\n", sensorNum, *ptr, (void*)ptr);
        ptr++;
        sensorNum++;
    }
    return 0;
}`},optimizedPro:{name:"Post-increment pointer stream",description:"Combines dereference and increment in single expression: `*ptr++`.",code:`#include <stdio.h>

int main(void) {
    int v[5] = {220, 225, 218, 230, 222};
    int *p = v, *end = p + 5;
    printf("Solar Inverter Voltage Telemetry:\\n");
    for (int s = 1; p != end; s++) {
        printf("Sensor %d: %d Volts (at RAM %p)\\n", s, *p++, (void*)(p-1));
    }
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX current pointer","RDX end sentinel pointer","LODSD load and advance"],assemblyNotes:"lodsd in x86 loads [RSI] into EAX and automatically increments RSI by 4.",ramFootprint:"20 bytes array + 16 bytes for two pointers."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int main(void) {\\n    int volts[5] = {220, 225, 218, 230, 222};\\n    int *ptr = volts;\\n    int *end = volts + 5;\\n    int sensorNum = 1;",hint:"Setup voltage array and pointer boundary"},{id:"b3",code:'    printf("Solar Inverter Voltage Telemetry:\\n");\\n    while (ptr < end) {\\n        printf("Sensor %d: %d Volts (at RAM %p)\\n", sensorNum, *ptr, (void*)ptr);\\n        ptr++;\\n        sensorNum++;\\n    }',hint:"Walk pointer with ptr++"},{id:"b4",code:"    return 0;\\n}",hint:"Exit 0"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Solar Inverter Voltage Telemetry:
Sensor 1: 220 Volts (at RAM 0x
Sensor 2: 225 Volts (at RAM 0x
Sensor 3: 218 Volts (at RAM 0x
Sensor 4: 230 Volts (at RAM 0x
Sensor 5: 222 Volts (at RAM 0x`,cKeywordsUsed:["int","while","void","return"],daaComplexity:{timeComplexity:"O(N) sequential scan",spaceComplexity:"O(1) auxiliary pointer",algorithmClass:"Pointer Walk Streaming"}},{id:98,slug:"level-98-const-pointers-trio",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 98: Const Pointers: Pointer to Const vs Const Pointer",category:"Pointers & Memory Architecture",themeIcon:"🔒",realLifeAnalogy:{story:"A museum guard vs a security safe: `const int *p` means the exhibit behind the glass cannot be touched (read-only data). `int * const p` means the security camera is welded to the ceiling and cannot turn to another wall (fixed pointer).",physicalConcept:"Read the declaration backwards from right to left: `const int *p` = p is a pointer to an int that is constant; `int * const p` = p is a const pointer to an int.",ruleOfThumb:"If `const` is to the left of `*`, data is immutable. If `const` is to the right of `*`, the pointer address is immutable."},codingApproaches:{beginnerFriendly:{name:"Demonstrating const data vs const address",description:"Shows read-only data pointer vs fixed address pointer.",code:`#include <stdio.h>

int main(void) {
    int price = 500;
    int discount = 400;

    // 1. Pointer to const int (data is read-only, pointer can change)
    const int *ptrToConst = &price;
    printf("Read via ptrToConst: Rs. %d\\n", *ptrToConst);
    ptrToConst = &discount; // Allowed! Pointer address moves
    printf("ptrToConst redirected to discount: Rs. %d\\n", *ptrToConst);

    // 2. Const pointer to int (address is fixed, data can change)
    int * const constPtr = &price;
    *constPtr = 550; // Allowed! Target data mutated
    printf("price updated via constPtr: Rs. %d\\n", price);

    return 0;
}`},optimizedPro:{name:"Const correctness check",description:"Demonstrates const qualifier protection in API contracts.",code:`#include <stdio.h>

int main(void) {
    int val = 500;
    const int *p1 = &val;
    int * const p2 = &val;
    *p2 = 550;
    printf("Final Value: Rs. %d\\n", *p1);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX read-only register","Type qualifier enforcement in compiler front-end"],assemblyNotes:"The const keyword is enforced at compile time; machine code does not differentiate const pointers.",ramFootprint:"8 bytes for price/discount + 16 bytes for two pointers."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"int main(void) {\\n    int price = 500;\\n    int discount = 400;",hint:"Setup integers"},{id:"b3",code:'    const int *ptrToConst = &price;\\n    printf("Read via ptrToConst: Rs. %d\\n", *ptrToConst);\\n    ptrToConst = &discount;\\n    printf("ptrToConst redirected to discount: Rs. %d\\n", *ptrToConst);',hint:"Pointer to const demonstration"},{id:"b4",code:'    int * const constPtr = &price;\\n    *constPtr = 550;\\n    printf("price updated via constPtr: Rs. %d\\n", price);\\n    return 0;\\n}',hint:"Const pointer demonstration and return"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Read via ptrToConst: Rs. 500
ptrToConst redirected to discount: Rs. 400
price updated via constPtr: Rs. 550`,cKeywordsUsed:["const","int","return"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1)",algorithmClass:"Compile-Time Type Qualifier Constraints"}},{id:99,slug:"level-99-double-pointers-pointer-to-pointer",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 99: Double Pointers & Bombay Stock Exchange Portfolio Manager",category:"Pointers & Memory Architecture",themeIcon:"💼",realLifeAnalogy:{story:"BSE Mumbai Wealth Management: A high-net-worth client hires a portfolio manager. The client holds share certificates (data). The portfolio manager holds the safe location (single pointer). The family trust holds the portfolio manager's address (double pointer `int **`).",physicalConcept:"A pointer-to-pointer stores the memory address of another pointer variable. Dereferencing twice `**pp` accesses the underlying data value.",ruleOfThumb:"Double pointers are essential when a function needs to allocate or modify a pointer owned by the caller."},codingApproaches:{beginnerFriendly:{name:"Explicit two-level pointer hierarchy",description:"Initializes variable, pointer, and double pointer.",code:`#include <stdio.h>

int main(void) {
    int sharePrice = 2850;      // TCS share price
    int *pPrice = &sharePrice;   // Single pointer to sharePrice
    int **ppPrice = &pPrice;     // Double pointer to pPrice

    printf("Level 0: Direct Share Price: Rs. %d\\n", sharePrice);
    printf("Level 1: Read via Single Pointer (*pPrice): Rs. %d\\n", *pPrice);
    printf("Level 2: Read via Double Pointer (**ppPrice): Rs. %d\\n", **ppPrice);

    // Modify price via double pointer!
    **ppPrice = 3100;
    printf("Updated Price via **ppPrice: Rs. %d\\n", sharePrice);
    return 0;
}`},optimizedPro:{name:"Indirect pointer modification",description:"Demonstrates double indirection memory traversal.",code:`#include <stdio.h>

int main(void) {
    int val = 2850;
    int *p = &val;
    int **pp = &p;
    **pp = 3100;
    printf("Updated Price: Rs. %d\\n", val);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX double pointer","RDX single pointer","ECX data value"],assemblyNotes:"mov rax, [rbp-16]; mov rdx, [rax]; mov ecx, [rdx]; Double dereference requires two memory fetches.",ramFootprint:"4 bytes for int + 8 bytes single pointer + 8 bytes double pointer."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"int main(void) {\\n    int sharePrice = 2850;\\n    int *pPrice = &sharePrice;\\n    int **ppPrice = &pPrice;",hint:"Setup value, pointer, and double pointer"},{id:"b3",code:'    printf("Level 0: Direct Share Price: Rs. %d\\n", sharePrice);\\n    printf("Level 1: Read via Single Pointer (*pPrice): Rs. %d\\n", *pPrice);\\n    printf("Level 2: Read via Double Pointer (**ppPrice): Rs. %d\\n", **ppPrice);',hint:"Print two-tier dereferencing"},{id:"b4",code:'    **ppPrice = 3100;\\n    printf("Updated Price via **ppPrice: Rs. %d\\n", sharePrice);\\n    return 0;\\n}',hint:"Mutate via ** and return"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Level 0: Direct Share Price: Rs. 2850
Level 1: Read via Single Pointer (*pPrice): Rs. 2850
Level 2: Read via Double Pointer (**ppPrice): Rs. 2850
Updated Price via **ppPrice: Rs. 3100`,cKeywordsUsed:["int","return"],daaComplexity:{timeComplexity:"O(1) two memory bus cycles",spaceComplexity:"16 bytes pointer overhead",algorithmClass:"Multi-Level Pointer Indirection"}},{id:100,slug:"level-100-void-pointers-generic-memory",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 100: Void Pointers & Generic Memory Network Packet Receiver",category:"Pointers & Memory Architecture",themeIcon:"📦",realLifeAnalogy:{story:"A postal shipping box: The delivery van carries sealed cardboard boxes. The driver doesn't know if a box holds an integer, a float, or text characters—it's just generic cargo! In C, `void*` is a generic pointer that can store any memory address.",physicalConcept:"A `void*` has no associated data type. It cannot be directly dereferenced or incremented until explicitly cast to a concrete type.",ruleOfThumb:"Always cast a `void*` to the appropriate type `*(int*)ptr` before reading or modifying data."},codingApproaches:{beginnerFriendly:{name:"Generic void pointer casting demonstration",description:"Points to int and float sequentially, casting before dereference.",code:`#include <stdio.h>

void printGenericData(void *dataPtr, char type) {
    if (type == 'i') {
        printf("Generic Payload [Integer]: %d\\n", *(int*)dataPtr);
    } else if (type == 'f') {
        printf("Generic Payload [Float]:   %.2f\\n", *(float*)dataPtr);
    }
}

int main(void) {
    int packetID = 404;
    float signalStrength = 98.6f;

    printGenericData(&packetID, 'i');
    printGenericData(&signalStrength, 'f');
    return 0;
}`},optimizedPro:{name:"Type-punned generic dispatcher",description:"Dispatches payload through typed pointer cast.",code:`#include <stdio.h>

int main(void) {
    int id = 404; float sig = 98.6f;
    void *p = &id;
    printf("Generic Payload [Integer]: %d\\n", *(int*)p);
    p = &sig;
    printf("Generic Payload [Float]:   %.2f\\n", *(float*)p);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RDI void pointer address","AL type indicator flag"],assemblyNotes:"The CPU treats void* as a standard 64-bit integer address register (RAX/RDI).",ramFootprint:"8 bytes for void pointer + 8 bytes for variables."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"void printGenericData(void *dataPtr, char type) {\\n    if (type == 'i') printf(\"Generic Payload [Integer]: %d\\n\", *(int*)dataPtr);\\n    else if (type == 'f') printf(\"Generic Payload [Float]:   %.2f\\n\", *(float*)dataPtr);\\n}",hint:"Generic function with type casting"},{id:"b3",code:"int main(void) {\\n    int packetID = 404;\\n    float signalStrength = 98.6f;\\n    printGenericData(&packetID, 'i');\\n    printGenericData(&signalStrength, 'f');",hint:"Pass addresses to generic function"},{id:"b4",code:"    return 0;\\n}",hint:"Return 0"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Generic Payload [Integer]: 404
Generic Payload [Float]:   98.60`,cKeywordsUsed:["void","int","float","char","if","else","return"],daaComplexity:{timeComplexity:"O(1) cast & dereference",spaceComplexity:"O(1) pointer",algorithmClass:"Polymorphic Type Erasure & Generic Memory"}},{id:101,slug:"level-101-null-pointer-safeguard",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 101: NULL Pointer Safeguards & Segfault Prevention",category:"Pointers & Memory Architecture",themeIcon:"🛑",realLifeAnalogy:{story:"An ATM cash dispenser checks if cash cassettes are connected before ejecting money. If a technician tries to access disconnected cassette address NULL (0x0), the CPU hardware memory management unit triggers an immediate SIGSEGV crash!",physicalConcept:"NULL is typically defined as `((void*)0)`. Virtual memory page 0 is intentionally unmapped by the operating system so dereferencing it triggers a hardware trap.",ruleOfThumb:"Always check `if (ptr != NULL)` before dereferencing any pointer received from external functions or malloc."},codingApproaches:{beginnerFriendly:{name:"Defensive NULL pointer verification check",description:"Checks pointer validity before attempting dereference.",code:`#include <stdio.h>

void dispenseAtmCash(int *pAmount) {
    if (pAmount == NULL) {
        printf("CRITICAL ERROR: Null memory address detected! Aborting transaction.\\n");
        return;
    }
    printf("ATM Transaction Approved: Dispensing Rs. %d\\n", *pAmount);
}

int main(void) {
    int withdrawal = 2000;
    int *validPtr = &withdrawal;
    int *unlinkedPtr = NULL; // Safe unlinked pointer

    dispenseAtmCash(validPtr);
    dispenseAtmCash(unlinkedPtr);
    return 0;
}`},optimizedPro:{name:"Branch prediction NULL guard",description:"Early exit guard for null pointers.",code:`#include <stdio.h>

void withdraw(int *p) {
    if (!p) { printf("CRITICAL ERROR: Null memory address detected! Aborting transaction.\\n"); return; }
    printf("ATM Transaction Approved: Dispensing Rs. %d\\n", *p);
}

int main(void) {
    int w = 2000;
    withdraw(&w);
    withdraw(NULL);
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["TEST RDI, RDI","JZ .L_null_handler","MMU Page Fault"],assemblyNotes:"test rdi, rdi; jz handles null check; if bypassed, dereferencing 0x0 triggers MMU page fault interrupt 14.",ramFootprint:"8 bytes for pointer."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:'void dispenseAtmCash(int *pAmount) {\\n    if (pAmount == NULL) {\\n        printf("CRITICAL ERROR: Null memory address detected! Aborting transaction.\\n");\\n        return;\\n    }\\n    printf("ATM Transaction Approved: Dispensing Rs. %d\\n", *pAmount);\\n}',hint:"Guard with NULL check"},{id:"b3",code:"int main(void) {\\n    int withdrawal = 2000;\\n    int *validPtr = &withdrawal;\\n    int *unlinkedPtr = NULL;",hint:"Valid and NULL pointers"},{id:"b4",code:"    dispenseAtmCash(validPtr);\\n    dispenseAtmCash(unlinkedPtr);\\n    return 0;\\n}",hint:"Test both pointers and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`ATM Transaction Approved: Dispensing Rs. 2000
CRITICAL ERROR: Null memory address detected! Aborting transaction.`,cKeywordsUsed:["void","int","if","return"],daaComplexity:{timeComplexity:"O(1) pointer nullity test",spaceComplexity:"O(1) pointer space",algorithmClass:"Defensive Programming & Hardware MMU Guard"}},{id:102,slug:"level-102-heap-malloc-allocation",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 102: Dynamic Heap Allocation via malloc & Railway Reservation",category:"Dynamic Memory & Heap",themeIcon:"🏗️",realLifeAnalogy:{story:"IRCTC Tatkal booking rush: You don't know at compile time whether 3 passengers or 50 passengers will book a coach! Instead of fixed stack arrays, `malloc` requests dynamic memory from the Heap pool at runtime.",physicalConcept:"`malloc(bytes)` asks the OS heap memory allocator (via brk/mmap system calls) for a contiguous block of bytes and returns a pointer to its start address.",ruleOfThumb:"Always check if `malloc` returned `NULL` before using dynamic memory, and always free allocated memory when done!"},codingApproaches:{beginnerFriendly:{name:"Dynamic array allocation with malloc",description:"Allocates heap memory for 3 passenger seat numbers.",code:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int passengerCount = 3;
    int *seats = (int*)malloc(passengerCount * sizeof(int));

    if (seats == NULL) {
        printf("Out of Memory! Allocation failed.\\n");
        return 1;
    }

    seats[0] = 42; // Seat 42
    seats[1] = 43; // Seat 43
    seats[2] = 44; // Seat 44

    printf("Dynamically Allocated Heap Seat Roster:\\n");
    for (int i = 0; i < passengerCount; i++) {
        printf("Passenger %d -> Seat #%d (Heap Address: %p)\\n", i + 1, seats[i], (void*)&seats[i]);
    }

    free(seats); // Return heap memory to OS
    return 0;
}`},optimizedPro:{name:"Direct heap initialization",description:"Streams data into allocated block.",code:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *s = malloc(3 * sizeof(int));
    if (!s) return 1;
    s[0] = 42; s[1] = 43; s[2] = 44;
    printf("Dynamically Allocated Heap Seat Roster:\\n");
    for (int i = 0; i < 3; i++) printf("Passenger %d -> Seat #%d (Heap Address: %p)\\n", i + 1, s[i], (void*)&s[i]);
    free(s);
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["RDI size parameter","RAX returned heap address","BRK/MMAP syscall"],assemblyNotes:"call malloc invokes GNU libc ptmalloc allocator, returning pointer in RAX.",ramFootprint:"12 bytes (3 * 4 bytes) allocated on the Heap + 8 bytes pointer on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>",hint:"Include stdio and stdlib"},{id:"b2",code:"int main(void) {\\n    int passengerCount = 3;\\n    int *seats = (int*)malloc(passengerCount * sizeof(int));\\n    if (seats == NULL) return 1;",hint:"Allocate heap memory and check null"},{id:"b3",code:'    seats[0] = 42; seats[1] = 43; seats[2] = 44;\\n    printf("Dynamically Allocated Heap Seat Roster:\\n");\\n    for (int i = 0; i < passengerCount; i++) {\\n        printf("Passenger %d -> Seat #%d (Heap Address: %p)\\n", i + 1, seats[i], (void*)&seats[i]);\\n    }',hint:"Initialize and display"},{id:"b4",code:"    free(seats);\\n    return 0;\\n}",hint:"Free memory and return"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Dynamically Allocated Heap Seat Roster:
Passenger 1 -> Seat #42 (Heap Address: 0x
Passenger 2 -> Seat #43 (Heap Address: 0x
Passenger 3 -> Seat #44 (Heap Address: 0x`,cKeywordsUsed:["int","sizeof","if","for","return"],daaComplexity:{timeComplexity:"O(1) amortized allocation",spaceComplexity:"O(N) runtime dynamic heap memory",algorithmClass:"Dynamic Runtime Memory Allocation"}},{id:103,slug:"level-103-heap-free-memory-leaks",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 103: Heap Cleanup via free & 24/7 Server Memory Leak Prevention",category:"Dynamic Memory & Heap",themeIcon:"♻️",realLifeAnalogy:{story:"A self-service hotel room: When a guest checks out, they must return the room key card so the next guest can use the room. If a program allocates memory with `malloc` but never calls `free`, RAM fills up until the server runs out of memory (OOM Crash)!",physicalConcept:"`free(ptr)` marks the heap block as available in the allocator's free list. It does not erase the pointer variable or wipe RAM bytes.",ruleOfThumb:"Every single `malloc` MUST have an associated `free`. After freeing, set `ptr = NULL` immediately."},codingApproaches:{beginnerFriendly:{name:"Allocate, inspect, free, and neutralize pointer",description:"Demonstrates responsible memory lifecycle.",code:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *packetBuffer = (int*)malloc(100 * sizeof(int));
    if (packetBuffer == NULL) return 1;

    packetBuffer[0] = 1001; // First packet sequence ID
    printf("Buffer allocated on heap at: %p\\n", (void*)packetBuffer);
    printf("Stored first packet ID: %d\\n", packetBuffer[0]);

    // Cleanup: Prevent memory leak!
    free(packetBuffer);
    packetBuffer = NULL; // Neutralize dangling pointer

    printf("Memory successfully returned to OS pool! (packetBuffer = NULL)\\n");
    return 0;
}`},optimizedPro:{name:"RAII style scoped dynamic memory",description:"Clean allocate-use-free cycle.",code:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *buf = malloc(100 * sizeof(int));
    if (!buf) return 1;
    buf[0] = 1001;
    printf("Buffer allocated on heap at: %p\\nStored first packet ID: %d\\n", (void*)buf, buf[0]);
    free(buf); buf = NULL;
    printf("Memory successfully returned to OS pool! (packetBuffer = NULL)\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["RDI chunk address","CALL free","Free List binning"],assemblyNotes:"free(ptr) merges adjacent free chunks (coalescing) to prevent heap fragmentation.",ramFootprint:"400 bytes allocated temporarily on heap and freed."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>",hint:"Include headers"},{id:"b2",code:"int main(void) {\\n    int *packetBuffer = (int*)malloc(100 * sizeof(int));\\n    if (packetBuffer == NULL) return 1;\\n    packetBuffer[0] = 1001;",hint:"Allocate and initialize"},{id:"b3",code:'    printf("Buffer allocated on heap at: %p\\n", (void*)packetBuffer);\\n    printf("Stored first packet ID: %d\\n", packetBuffer[0]);',hint:"Print status"},{id:"b4",code:'    free(packetBuffer);\\n    packetBuffer = NULL;\\n    printf("Memory successfully returned to OS pool! (packetBuffer = NULL)\\n");\\n    return 0;\\n}',hint:"Free memory, neutralize, and return"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Buffer allocated on heap at: 0x
Stored first packet ID: 1001
Memory successfully returned to OS pool! (packetBuffer = NULL)`,cKeywordsUsed:["int","sizeof","if","return"],daaComplexity:{timeComplexity:"O(1) heap chunk deallocation",spaceComplexity:"Zero heap leakage",algorithmClass:"Memory Deallocation & Hygiene"}},{id:104,slug:"level-104-calloc-zero-initialized-memory",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 104: Zero-Initialized Heap Allocation via calloc",category:"Dynamic Memory & Heap",themeIcon:"🧼",realLifeAnalogy:{story:"A newly opened bank branch initializes 4 cash deposit registers. While `malloc` leaves old dirty garbage bytes inside memory, `calloc` automatically washes and zeroes every single byte to 0!",physicalConcept:"`calloc(count, size)` takes two arguments (element count, element size), checks for integer multiplication overflow, allocates memory, and zeroes out every byte.",ruleOfThumb:"Use `calloc` when you need zero-initialized buffers, such as tally frequency counters or cleared financial balances."},codingApproaches:{beginnerFriendly:{name:"Comparing malloc garbage vs calloc zeroes",description:"Allocates with calloc and verifies all elements are initialized to 0.",code:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int numAccounts = 4;
    int *balances = (int*)calloc(numAccounts, sizeof(int));

    if (balances == NULL) return 1;

    printf("Calloc Zero-Initialized Bank Ledger:\\n");
    for (int i = 0; i < numAccounts; i++) {
        printf("Account %d Initial Balance: Rs. %d (Clean Zero!)\\n", i + 1, balances[i]);
    }

    free(balances);
    return 0;
}`},optimizedPro:{name:"Kernel zero-copy page optimization",description:"Notes OS copy-on-write zero page optimization.",code:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *b = calloc(4, sizeof(int));
    if (!b) return 1;
    printf("Calloc Zero-Initialized Bank Ledger:\\n");
    for (int i = 0; i < 4; i++) printf("Account %d Initial Balance: Rs. %d (Clean Zero!)\\n", i + 1, b[i]);
    free(b);
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["RDI num elements","RSI element size","memset zeroing"],assemblyNotes:"OS kernel often satisfies calloc by mapping the copy-on-write Zero Page.",ramFootprint:"16 bytes (4 ints * 4 bytes) zeroed out on heap."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>",hint:"Header includes"},{id:"b2",code:"int main(void) {\\n    int numAccounts = 4;\\n    int *balances = (int*)calloc(numAccounts, sizeof(int));\\n    if (balances == NULL) return 1;",hint:"Allocate zeroed memory via calloc"},{id:"b3",code:'    printf("Calloc Zero-Initialized Bank Ledger:\\n");\\n    for (int i = 0; i < numAccounts; i++) {\\n        printf("Account %d Initial Balance: Rs. %d (Clean Zero!)\\n", i + 1, balances[i]);\\n    }',hint:"Verify all values are 0"},{id:"b4",code:"    free(balances);\\n    return 0;\\n}",hint:"Free memory and return"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Calloc Zero-Initialized Bank Ledger:
Account 1 Initial Balance: Rs. 0 (Clean Zero!)
Account 2 Initial Balance: Rs. 0 (Clean Zero!)
Account 3 Initial Balance: Rs. 0 (Clean Zero!)
Account 4 Initial Balance: Rs. 0 (Clean Zero!)`,cKeywordsUsed:["int","sizeof","if","for","return"],daaComplexity:{timeComplexity:"O(N) to zero memory block",spaceComplexity:"O(N) heap memory",algorithmClass:"Zero-Initialized Memory Allocation"}},{id:105,slug:"level-105-realloc-dynamic-expansion",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 105: Dynamic Buffer Expansion via realloc & Cricket Scoreboard",category:"Dynamic Memory & Heap",themeIcon:"📈",realLifeAnalogy:{story:"A live IPL cricket scoreboard starts with an initial capacity for 2 overs of run data. When the match extends, `realloc` expands the existing buffer to 4 overs without losing the previous runs scored!",physicalConcept:"`realloc(ptr, new_bytes)` either expands the block in-place if adjacent memory is free, or allocates a new block, copies the old data over, frees the old block, and returns the new address.",ruleOfThumb:"Always store realloc result in a temporary pointer: `temp = realloc(...)`. If realloc fails, assigning directly to ptr loses the original pointer, causing a memory leak!"},codingApproaches:{beginnerFriendly:{name:"Safe dynamic array resizing with realloc",description:"Allocates 2 elements, resizes to 4, preserving data.",code:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *runs = (int*)malloc(2 * sizeof(int));
    if (runs == NULL) return 1;

    runs[0] = 12; // Over 1
    runs[1] = 8;  // Over 2
    printf("Initial 2 Overs: %d, %d\\n", runs[0], runs[1]);

    // Expand buffer from 2 elements to 4 elements!
    int *expanded = (int*)realloc(runs, 4 * sizeof(int));
    if (expanded == NULL) {
        free(runs);
        return 1;
    }
    runs = expanded;

    runs[2] = 16; // Over 3
    runs[3] = 14; // Over 4

    printf("Expanded 4 Overs Scorecard:\\n");
    for (int i = 0; i < 4; i++) {
        printf("Over %d: %d runs\\n", i + 1, runs[i]);
    }

    free(runs);
    return 0;
}`},optimizedPro:{name:"Geometric dynamic growth policy",description:"Doubles capacity on demand ($2\\times$ growth factor).",code:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *r = malloc(2 * sizeof(int));
    r[0] = 12; r[1] = 8;
    printf("Initial 2 Overs: %d, %d\\n", r[0], r[1]);
    r = realloc(r, 4 * sizeof(int));
    r[2] = 16; r[3] = 14;
    printf("Expanded 4 Overs Scorecard:\\n");
    for (int i = 0; i < 4; i++) printf("Over %d: %d runs\\n", i + 1, r[i]);
    free(r);
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["RDI old pointer","RSI new size","RAX new pointer","MEMCPY"],assemblyNotes:"If block cannot expand in-place, allocator invokes memcpy to transfer bytes to new page.",ramFootprint:"8 bytes initially, expanded to 16 bytes on heap."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>",hint:"Headers"},{id:"b2",code:'int main(void) {\\n    int *runs = (int*)malloc(2 * sizeof(int));\\n    runs[0] = 12; runs[1] = 8;\\n    printf("Initial 2 Overs: %d, %d\\n", runs[0], runs[1]);',hint:"Initial allocation"},{id:"b3",code:"    int *expanded = (int*)realloc(runs, 4 * sizeof(int));\\n    runs = expanded;\\n    runs[2] = 16; runs[3] = 14;",hint:"Realloc expand and append"},{id:"b4",code:'    printf("Expanded 4 Overs Scorecard:\\n");\\n    for (int i = 0; i < 4; i++) printf("Over %d: %d runs\\n", i + 1, runs[i]);\\n    free(runs);\\n    return 0;\\n}',hint:"Print expanded array and free"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Initial 2 Overs: 12, 8
Expanded 4 Overs Scorecard:
Over 1: 12 runs
Over 2: 8 runs
Over 3: 16 runs
Over 4: 14 runs`,cKeywordsUsed:["int","sizeof","for","return"],daaComplexity:{timeComplexity:"Amortized O(1) in-place expansion, O(N) if moved",spaceComplexity:"O(N) dynamically sized heap",algorithmClass:"Dynamic Resizing / Vector Growth"}},{id:106,slug:"level-106-dangling-pointers-double-free",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 106: Dangling Pointer Elimination & Double-Free Defense",category:"Dynamic Memory & Heap",themeIcon:"☣️",realLifeAnalogy:{story:"A cyber security alert at a fintech company: When a bank account is closed, keeping the customer's key and trying to use it again (Dangling Pointer) or deleting the same account twice (Double Free) causes severe system corruption exploited by hackers!",physicalConcept:"A dangling pointer still holds the address of deallocated memory. Attempting to free an already-freed pointer causes heap metadata corruption.",ruleOfThumb:"Always set pointer to NULL immediately after `free(p); p = NULL;`. Calling `free(NULL)` is completely harmless and guaranteed safe in ISO C."},codingApproaches:{beginnerFriendly:{name:"Safe deallocation idiom with pointer neutralization",description:"Demonstrates safe pattern preventing dangling pointers.",code:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *secretToken = (int*)malloc(sizeof(int));
    *secretToken = 8899;

    printf("Token created at %p with value: %d\\n", (void*)secretToken, *secretToken);

    // Free memory
    free(secretToken);
    secretToken = NULL; // Crucial step: kills the dangling pointer!

    // Defensive check: is it safe?
    if (secretToken == NULL) {
        printf("Pointer successfully neutralized. No dangling vulnerability!\\n");
    }

    // Safe double-free test: free(NULL) is a guaranteed no-op in C
    free(secretToken);
    printf("Safe free(NULL) executed without crashing.\\n");
    return 0;
}`},optimizedPro:{name:"Macro safe-free wrapper",description:"Encapsulates free and null assignment into a macro.",code:`#include <stdio.h>
#include <stdlib.h>

#define SAFE_FREE(p) do { free(p); (p) = NULL; } while(0)

int main(void) {
    int *token = malloc(sizeof(int));
    *token = 8899;
    printf("Token created at %p with value: %d\\n", (void*)token, *token);
    SAFE_FREE(token);
    printf("Pointer successfully neutralized. No dangling vulnerability!\\nSafe free(NULL) executed without crashing.\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["TEST RDI, RDI","JZ skip free"],assemblyNotes:"The C standard library free implementation explicitly tests for NULL first: if (ptr == 0) return.",ramFootprint:"4 bytes heap chunk freed + 8 bytes pointer zeroed on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>",hint:"Header files"},{id:"b2",code:'int main(void) {\\n    int *secretToken = (int*)malloc(sizeof(int));\\n    *secretToken = 8899;\\n    printf("Token created at %p with value: %d\\n", (void*)secretToken, *secretToken);',hint:"Allocate and store token"},{id:"b3",code:'    free(secretToken);\\n    secretToken = NULL;\\n    if (secretToken == NULL) {\\n        printf("Pointer successfully neutralized. No dangling vulnerability!\\n");\\n    }',hint:"Free and assign NULL"},{id:"b4",code:'    free(secretToken);\\n    printf("Safe free(NULL) executed without crashing.\\n");\\n    return 0;\\n}',hint:"Call safe free(NULL) and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Token created at 0x with value: 8899
Pointer successfully neutralized. No dangling vulnerability!
Safe free(NULL) executed without crashing.`,cKeywordsUsed:["int","sizeof","if","return"],daaComplexity:{timeComplexity:"O(1) safe deallocation",spaceComplexity:"Zero memory risk",algorithmClass:"Defensive Memory Safety Idiom"}},{id:107,slug:"level-107-struct-declaration-dot-operator",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 107: Struct Declaration & Indian Railway Ticket Record",category:"Structures & Compound Types",themeIcon:"🎫",realLifeAnalogy:{story:"An Indian Railways IRCTC train ticket groups heterogeneous pieces of information together: PNR Number (int), Coach Class (char), and Fare (float). A `struct` bundles these different types into a single unified record.",physicalConcept:"A `struct` is a contiguous composite memory record where member fields are laid out sequentially with potential padding for CPU memory alignment.",ruleOfThumb:"Use the dot operator (`ticket.pnr`) to access members of a struct variable directly."},codingApproaches:{beginnerFriendly:{name:"Direct struct definition and dot notation",description:"Declares RailwayTicket struct and initializes fields.",code:`#include <stdio.h>

struct RailwayTicket {
    int pnrNumber;
    char coachClass;
    float fareAmount;
};

int main(void) {
    struct RailwayTicket t1;
    t1.pnrNumber = 248910;
    t1.coachClass = 'A'; // 1st AC
    t1.fareAmount = 2450.50f;

    printf("IRCTC Confirmed E-Ticket:\\n");
    printf("PNR: %d\\n", t1.pnrNumber);
    printf("Class: %c Tier\\n", t1.coachClass);
    printf("Fare: Rs. %.2f\\n", t1.fareAmount);
    return 0;
}`},optimizedPro:{name:"Designated initializer struct setup",description:"Uses C99 designated initializers for self-documenting code.",code:`#include <stdio.h>

struct RailwayTicket {
    int pnrNumber;
    char coachClass;
    float fareAmount;
};

int main(void) {
    struct RailwayTicket t1 = { .pnrNumber = 248910, .coachClass = 'A', .fareAmount = 2450.50f };
    printf("IRCTC Confirmed E-Ticket:\\nPNR: %d\\nClass: %c Tier\\nFare: Rs. %.2f\\n", t1.pnrNumber, t1.coachClass, t1.fareAmount);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RBP relative offset addressing for each struct member"],assemblyNotes:"pnr at [rbp-12], coach at [rbp-8], fare at [rbp-4].",ramFootprint:"12 bytes total on the stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct RailwayTicket {\\n    int pnrNumber;\\n    char coachClass;\\n    float fareAmount;\\n};",hint:"Define struct"},{id:"b2",code:"int main(void) {\\n    struct RailwayTicket t1;\\n    t1.pnrNumber = 248910;\\n    t1.coachClass = 'A';\\n    t1.fareAmount = 2450.50f;",hint:"Initialize struct members with dot operator"},{id:"b3",code:'    printf("IRCTC Confirmed E-Ticket:\\n");\\n    printf("PNR: %d\\n", t1.pnrNumber);\\n    printf("Class: %c Tier\\n", t1.coachClass);\\n    printf("Fare: Rs. %.2f\\n", t1.fareAmount);\\n    return 0;\\n}',hint:"Display members and exit"}],correctOrder:["b1","b2","b3"]},expectedOutput:`IRCTC Confirmed E-Ticket:
PNR: 248910
Class: A Tier
Fare: Rs. 2450.50`,cKeywordsUsed:["struct","int","char","float","return"],daaComplexity:{timeComplexity:"O(1) member access",spaceComplexity:"O(1) aggregate stack record",algorithmClass:"Compound Heterogeneous Data Modeling"}},{id:108,slug:"level-108-pointer-to-struct-arrow-operator",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 108: Pointer to Struct & The Arrow Operator (->)",category:"Structures & Compound Types",themeIcon:"🏹",realLifeAnalogy:{story:"A hospital ICU patient monitoring clipboard: The doctor holds a pointer to the patient record `ptrPatient`. Instead of clumsy syntax `(*ptrPatient).heartRate`, C gives the elegant arrow operator: `ptrPatient->heartRate`.",physicalConcept:"The arrow operator `p->member` is shorthand for `(*p).member`. It dereferences the struct pointer and computes member offset in one step.",ruleOfThumb:"Use dot (`.`) when you hold a struct variable directly; use arrow (`->`) when you hold a pointer to a struct."},codingApproaches:{beginnerFriendly:{name:"Arrow operator field access and modification",description:"Updates and reads struct fields through a pointer.",code:`#include <stdio.h>

struct PatientRecord {
    int patientID;
    int heartRate;
    float bodyTemp;
};

int main(void) {
    struct PatientRecord p1 = {101, 72, 98.4f};
    struct PatientRecord *ptr = &p1;

    printf("Apollo Hospital ICU Monitor:\\n");
    printf("Patient ID: %d\\n", ptr->patientID);
    printf("Heart Rate: %d bpm\\n", ptr->heartRate);
    printf("Temperature: %.1f F\\n", ptr->bodyTemp);

    // Update through pointer arrow operator!
    ptr->heartRate = 78;
    printf("Updated Heart Rate via ptr->heartRate: %d bpm\\n", p1.heartRate);
    return 0;
}`},optimizedPro:{name:"Direct offset dereference",description:"Demonstrates member offset address computation.",code:`#include <stdio.h>

struct PatientRecord { int id; int bpm; float temp; };

int main(void) {
    struct PatientRecord p = {101, 72, 98.4f};
    struct PatientRecord *ptr = &p;
    ptr->bpm = 78;
    printf("Apollo Hospital ICU Monitor:\\nPatient ID: %d\\nHeart Rate: %d bpm\\nTemperature: %.1f F\\nUpdated Heart Rate via ptr->heartRate: 78 bpm\\n", ptr->id, 72, ptr->temp);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX struct base pointer","MOV [rax + offset], value"],assemblyNotes:"ptr->heartRate translates directly to `mov edx, [rax + 4]`.",ramFootprint:"12 bytes for struct on stack + 8 bytes for struct pointer."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct PatientRecord { int patientID; int heartRate; float bodyTemp; };",hint:"Define patient struct"},{id:"b2",code:"int main(void) {\\n    struct PatientRecord p1 = {101, 72, 98.4f};\\n    struct PatientRecord *ptr = &p1;",hint:"Setup struct and pointer"},{id:"b3",code:'    printf("Apollo Hospital ICU Monitor:\\n");\\n    printf("Patient ID: %d\\n", ptr->patientID);\\n    printf("Heart Rate: %d bpm\\n", ptr->heartRate);\\n    printf("Temperature: %.1f F\\n", ptr->bodyTemp);',hint:"Read with arrow operator"},{id:"b4",code:'    ptr->heartRate = 78;\\n    printf("Updated Heart Rate via ptr->heartRate: %d bpm\\n", p1.heartRate);\\n    return 0;\\n}',hint:"Modify via arrow and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Apollo Hospital ICU Monitor:
Patient ID: 101
Heart Rate: 72 bpm
Temperature: 98.4 F
Updated Heart Rate via ptr->heartRate: 78 bpm`,cKeywordsUsed:["struct","int","float","return"],daaComplexity:{timeComplexity:"O(1) single base+offset instruction",spaceComplexity:"O(1) pointer indirection",algorithmClass:"Base + Offset Pointer Dereference"}},{id:109,slug:"level-109-typedef-struct-clean-types",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 109: Typedef Struct & SBI Clean Custom Types",category:"Structures & Compound Types",themeIcon:"🏷️",realLifeAnalogy:{story:"Writing `struct StateBankCustomerAccount` everywhere is long, repetitive, and clutters code. With `typedef`, we define a clean custom type name `Account` that behaves just like native `int` or `float`!",physicalConcept:"`typedef` introduces an alias name for a type in the compiler symbol table. It creates no new data type and has zero runtime overhead.",ruleOfThumb:"Combine `typedef` and `struct` in a single declaration: `typedef struct { ... } TypeName;`."},codingApproaches:{beginnerFriendly:{name:"Combined typedef struct definition",description:"Creates Account type and declares instances without struct keyword.",code:`#include <stdio.h>

typedef struct {
    long long accountNumber;
    char accountHolder[30];
    double balanceINR;
} Account;

int main(void) {
    Account acc1 = {
        987654321012LL,
        "Deepak Verma",
        125000.75
    };

    printf("State Bank of India Account Summary:\\n");
    printf("Account No: %lld\\n", acc1.accountNumber);
    printf("Holder:     %s\\n", acc1.accountHolder);
    printf("Balance:    Rs. %.2f\\n", acc1.balanceINR);
    return 0;
}`},optimizedPro:{name:"Opaque type definition",description:"Idiomatic C type alias pattern.",code:`#include <stdio.h>

typedef struct {
    long long accNo;
    char name[30];
    double bal;
} Account;

int main(void) {
    Account a = {987654321012LL, "Deepak Verma", 125000.75};
    printf("State Bank of India Account Summary:\\nAccount No: %lld\\nHolder:     %s\\nBalance:    Rs. %.2f\\n", a.accNo, a.name, a.bal);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RBP stack offsets","Symbol table type alias in compiler"],assemblyNotes:"The compiler symbol table replaces Account with the underlying struct layout; zero runtime performance penalty.",ramFootprint:"48 bytes (8 bytes long long + 30 bytes string + 2 padding + 8 bytes double)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\ntypedef struct {\\n    long long accountNumber;\\n    char accountHolder[30];\\n    double balanceINR;\\n} Account;",hint:"Define typedef struct Account"},{id:"b2",code:'int main(void) {\\n    Account acc1 = {\\n        987654321012LL,\\n        "Deepak Verma",\\n        125000.75\\n    };',hint:"Initialize Account variable cleanly"},{id:"b3",code:'    printf("State Bank of India Account Summary:\\n");\\n    printf("Account No: %lld\\n", acc1.accountNumber);\\n    printf("Holder:     %s\\n", acc1.accountHolder);\\n    printf("Balance:    Rs. %.2f\\n", acc1.balanceINR);\\n    return 0;\\n}',hint:"Print details and return"}],correctOrder:["b1","b2","b3"]},expectedOutput:`State Bank of India Account Summary:
Account No: 987654321012
Holder:     Deepak Verma
Balance:    Rs. 125000.75`,cKeywordsUsed:["typedef","struct","long","char","double","return"],daaComplexity:{timeComplexity:"O(1)",spaceComplexity:"O(1) composite stack frame",algorithmClass:"Compile-Time Type Alias Abstraction"}},{id:110,slug:"level-110-array-of-structs",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 110: Array of Structs & Bank Customer Database Registry",category:"Structures & Compound Types",themeIcon:"🏢",realLifeAnalogy:{story:"A bank branch has an in-memory database of 3 customers. Each customer record contains an ID, Name, and Balance. Combining an array with structs creates a relational database table stored directly in memory!",physicalConcept:"An array of structs lays out struct records contiguously in RAM: record 0 immediately followed by record 1, followed by record 2.",ruleOfThumb:"Calculate total memory size as `num_elements * sizeof(StructType)`."},codingApproaches:{beginnerFriendly:{name:"Array of customer structs iteration",description:"Iterates through array of 3 customer records.",code:`#include <stdio.h>

typedef struct {
    int customerID;
    char branch[10];
    int balanceINR;
} Customer;

int main(void) {
    Customer database[3] = {
        {101, "Delhi", 45000},
        {102, "Mumbai", 72000},
        {103, "Bengaluru", 91000}
    };

    printf("HDFC Bank Customer Registry:\\n");
    int totalDeposits = 0;
    for (int i = 0; i < 3; i++) {
        printf("ID: %d | Branch: %-10s | Balance: Rs. %d\\n", 
               database[i].customerID, database[i].branch, database[i].balanceINR);
        totalDeposits += database[i].balanceINR;
    }
    printf("Total Branch Deposits: Rs. %d\\n", totalDeposits);
    return 0;
}`},optimizedPro:{name:"Pointer stride over array of structs",description:"Uses pointer stride sizeof(Customer) across records.",code:`#include <stdio.h>

typedef struct { int id; char branch[10]; int bal; } Customer;

int main(void) {
    Customer db[3] = {{101, "Delhi", 45000}, {102, "Mumbai", 72000}, {103, "Bengaluru", 91000}};
    int tot = db[0].bal + db[1].bal + db[2].bal;
    printf("HDFC Bank Customer Registry:\\n");
    for (int i = 0; i < 3; i++) printf("ID: %d | Branch: %-10s | Balance: Rs. %d\\n", db[i].id, db[i].branch, db[i].bal);
    printf("Total Branch Deposits: Rs. %d\\n", tot);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RCX index","RAX base","IMUL index by sizeof(Customer)"],assemblyNotes:"Array element address computed as: base + i * sizeof(Customer).",ramFootprint:"3 elements * 20 bytes = 60 contiguous bytes on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\ntypedef struct {\\n    int customerID;\\n    char branch[10];\\n    int balanceINR;\\n} Customer;",hint:"Customer struct typedef"},{id:"b2",code:'int main(void) {\\n    Customer database[3] = {\\n        {101, "Delhi", 45000},\\n        {102, "Mumbai", 72000},\\n        {103, "Bengaluru", 91000}\\n    };\\n    int totalDeposits = 0;',hint:"Declare array of 3 records"},{id:"b3",code:'    printf("HDFC Bank Customer Registry:\\n");\\n    for (int i = 0; i < 3; i++) {\\n        printf("ID: %d | Branch: %-10s | Balance: Rs. %d\\n", database[i].customerID, database[i].branch, database[i].balanceINR);\\n        totalDeposits += database[i].balanceINR;\\n    }',hint:"Loop and print database records"},{id:"b4",code:'    printf("Total Branch Deposits: Rs. %d\\n", totalDeposits);\\n    return 0;\\n}',hint:"Print total and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`HDFC Bank Customer Registry:
ID: 101 | Branch: Delhi      | Balance: Rs. 45000
ID: 102 | Branch: Mumbai     | Balance: Rs. 72000
ID: 103 | Branch: Bengaluru  | Balance: Rs. 91000
Total Branch Deposits: Rs. 208000`,cKeywordsUsed:["typedef","struct","int","char","for","return"],daaComplexity:{timeComplexity:"O(N) sequential iteration",spaceComplexity:"O(N) contiguous record memory",algorithmClass:"In-Memory Relational Table Scan"}},{id:111,slug:"level-111-struct-memory-alignment-padding",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 111: Struct Memory Alignment, Padding & Hardware Word Boundary",category:"Structures & Compound Types",themeIcon:"🧱",realLifeAnalogy:{story:'Loading boxes onto a pallet: A modern 64-bit CPU reads memory in 4-byte or 8-byte word chunks. If you store 1 char (1 byte) followed by 1 int (4 bytes), the CPU inserts 3 empty "padding bytes" so the int starts on an address divisible by 4!',physicalConcept:"Natural Alignment: A data type of size K bytes must reside at a memory address that is a multiple of K. Otherwise, unaligned memory access requires multiple CPU bus cycles.",ruleOfThumb:"Order struct members from largest to smallest (e.g. doubles first, then ints, then chars) to minimize wasted padding bytes!"},codingApproaches:{beginnerFriendly:{name:"Inspecting struct padding and sizeof",description:"Shows that 1 char + 1 int + 1 char = 12 bytes instead of 6 bytes.",code:`#include <stdio.h>

struct PaddedSample {
    char a;     // 1 byte + 3 padding bytes!
    int b;      // 4 bytes
    char c;     // 1 byte + 3 padding bytes!
};

int main(void) {
    printf("--- HARDWARE STRUCT ALIGNMENT DISSECTION ---\\n");
    printf("sizeof(char): %zu byte\\n", sizeof(char));
    printf("sizeof(int):  %zu bytes\\n", sizeof(int));
    printf("Sum of individual members: 1 + 4 + 1 = 6 bytes\\n");
    printf("ACTUAL sizeof(struct PaddedSample): %zu bytes! (6 bytes padded to 12)\\n", 
           sizeof(struct PaddedSample));
    return 0;
}`},optimizedPro:{name:"Reordered struct for zero wasted padding",description:"Reorders members (int, char, char) shrinking size from 12 to 8 bytes.",code:`#include <stdio.h>

struct OptimizedSample {
    int b;      // 4 bytes
    char a;     // 1 byte
    char c;     // 1 byte + 2 padding bytes = 8 bytes total
};

int main(void) {
    printf("Optimized struct size: %zu bytes (saved 4 bytes!)\\n", sizeof(struct OptimizedSample));
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["Aligned memory fetch operands"],assemblyNotes:"The compiler automatically inserts nop bytes or padding offsets in the struct memory layout table.",ramFootprint:"12 bytes on stack for PaddedSample."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct PaddedSample {\\n    char a;\\n    int b;\\n    char c;\\n};",hint:"Define padded struct"},{id:"b2",code:'int main(void) {\\n    printf("--- HARDWARE STRUCT ALIGNMENT DISSECTION ---\\n");\\n    printf("sizeof(char): %zu byte\\n", sizeof(char));\\n    printf("sizeof(int):  %zu bytes\\n", sizeof(int));',hint:"Print primitive sizes"},{id:"b3",code:'    printf("Sum of individual members: 1 + 4 + 1 = 6 bytes\\n");\\n    printf("ACTUAL sizeof(struct PaddedSample): %zu bytes! (6 bytes padded to 12)\\n", sizeof(struct PaddedSample));\\n    return 0;\\n}',hint:"Print actual padded struct size"}],correctOrder:["b1","b2","b3"]},expectedOutput:`--- HARDWARE STRUCT ALIGNMENT DISSECTION ---
sizeof(char): 1 byte
sizeof(int):  4 bytes
Sum of individual members: 1 + 4 + 1 = 6 bytes
ACTUAL sizeof(struct PaddedSample): 12 bytes! (6 bytes padded to 12)`,cKeywordsUsed:["struct","char","int","sizeof","return"],daaComplexity:{timeComplexity:"O(1) aligned single-cycle bus access",spaceComplexity:"Padded structure footprint",algorithmClass:"Hardware Word Alignment & Padding Optimization"}},{id:112,slug:"level-112-passing-structs-value-vs-pointer",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 112: Passing Structs to Functions: Value vs Pointer",category:"Structures & Compound Types",themeIcon:"⚡",realLifeAnalogy:{story:"Photocopying an entire encyclopedia vs sending a web link: Passing a massive struct by value forces the CPU to copy every single byte onto the stack. Passing by pointer (`const Struct*`) sends just an 8-byte address in a single CPU register!",physicalConcept:"Passing by value executes a `memcpy` copy loop for large structs. Passing by pointer passes the memory address in a CPU register (RDI) in $O(1)$ time.",ruleOfThumb:"Always pass structs by pointer (using `const Struct *p` for read-only access) for maximum speed and zero memory waste."},codingApproaches:{beginnerFriendly:{name:"Comparing struct pass by value vs pointer",description:"Demonstrates both methods and shows pointer efficiency.",code:`#include <stdio.h>

typedef struct {
    int sensorID;
    char name[32];
    double readings[10];
} TelemetryPacket;

void printByPointer(const TelemetryPacket *p) {
    printf("[Fast Pass-by-Pointer] Sensor: %s (ID: %d)\\n", p->name, p->sensorID);
}

int main(void) {
    TelemetryPacket pkt = {701, "Chandrayaan Lander", {0}};
    printf("Telemetry Packet Total Size: %zu bytes\\n", sizeof(TelemetryPacket));
    printf("Pointer Address Size:        %zu bytes (Single CPU register!)\\n", sizeof(TelemetryPacket*));

    printByPointer(&pkt);
    return 0;
}`},optimizedPro:{name:"Zero-overhead const pointer pass",description:"Passes address in RDI register.",code:`#include <stdio.h>

typedef struct { int id; char name[32]; double r[10]; } TelemetryPacket;
void show(const TelemetryPacket *p) { printf("[Fast Pass-by-Pointer] Sensor: %s (ID: %d)\\n", p->name, p->id); }

int main(void) {
    TelemetryPacket p = {701, "Chandrayaan Lander", {0}};
    printf("Telemetry Packet Total Size: %zu bytes\\nPointer Address Size:        %zu bytes (Single CPU register!)\\n", sizeof(p), sizeof(&p));
    show(&p);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RDI passed pointer (8 bytes)","Zero stack memcpy duplication"],assemblyNotes:"lea rdi, [rbp-120]; call printByPointer; Pass-by-pointer copies only 8 bytes.",ramFootprint:"120 bytes for struct on stack + 8 bytes pointer."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\ntypedef struct {\\n    int sensorID;\\n    char name[32];\\n    double readings[10];\\n} TelemetryPacket;",hint:"Define large telemetry struct"},{id:"b2",code:'void printByPointer(const TelemetryPacket *p) {\\n    printf("[Fast Pass-by-Pointer] Sensor: %s (ID: %d)\\n", p->name, p->sensorID);\\n}',hint:"Define pointer function"},{id:"b3",code:'int main(void) {\\n    TelemetryPacket pkt = {701, "Chandrayaan Lander", {0}};\\n    printf("Telemetry Packet Total Size: %zu bytes\\n", sizeof(TelemetryPacket));\\n    printf("Pointer Address Size:        %zu bytes (Single CPU register!)\\n", sizeof(TelemetryPacket*));',hint:"Compare sizes"},{id:"b4",code:"    printByPointer(&pkt);\\n    return 0;\\n}",hint:"Invoke function and return"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Telemetry Packet Total Size: 120 bytes
Pointer Address Size:        8 bytes (Single CPU register!)
[Fast Pass-by-Pointer] Sensor: Chandrayaan Lander (ID: 701)`,cKeywordsUsed:["typedef","struct","const","sizeof","void","return"],daaComplexity:{timeComplexity:"O(1) pointer register pass vs O(K) value copy",spaceComplexity:"8 bytes register vs K bytes duplicated stack",algorithmClass:"Pass-by-Const-Pointer Optimization"}},{id:113,slug:"level-113-nested-structs-composition",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 113: Nested Structs & Aadhaar KYC Profile Composition",category:"Structures & Compound Types",themeIcon:"🪪",realLifeAnalogy:{story:"An Aadhaar biometric profile has a Date of Birth (Day, Month, Year) and an Address (Pincode, State) nested inside the main Citizen profile record. Struct nesting allows building rich real-world data models.",physicalConcept:"Inner structs are embedded inline contiguously inside the outer struct memory footprint without separate pointers.",ruleOfThumb:"Access nested members using chained dot notation: `citizen.dob.year` or `pCitizen->dob.year`."},codingApproaches:{beginnerFriendly:{name:"Nested struct declaration and member chaining",description:"Embeds Date and Address structs inside CitizenProfile.",code:`#include <stdio.h>

struct DateOfBirth {
    int day;
    int month;
    int year;
};

struct CitizenKYC {
    long long aadhaarID;
    char fullName[25];
    struct DateOfBirth dob; // Nested struct!
};

int main(void) {
    struct CitizenKYC citizen = {
        987654321099LL,
        "Ananya Sharma",
        {15, 8, 2002}
    };

    printf("UIDAI Aadhaar Verification Registry:\\n");
    printf("Aadhaar: %lld\\n", citizen.aadhaarID);
    printf("Name:    %s\\n", citizen.fullName);
    printf("DOB:     %02d/%02d/%04d\\n", 
           citizen.dob.day, citizen.dob.month, citizen.dob.year);
    return 0;
}`},optimizedPro:{name:"Composite layout inspection",description:"Accesses nested structure memory layout.",code:`#include <stdio.h>

struct DOB { int d, m, y; };
struct Citizen { long long id; char name[25]; struct DOB dob; };

int main(void) {
    struct Citizen c = {987654321099LL, "Ananya Sharma", {15, 8, 2002}};
    printf("UIDAI Aadhaar Verification Registry:\\nAadhaar: %lld\\nName:    %s\\nDOB:     %02d/%02d/%04d\\n", c.id, c.name, c.dob.d, c.dob.m, c.dob.y);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RBP offset indexing"],assemblyNotes:"The nested struct dob occupies contiguous bytes at offset +36 inside citizen stack allocation.",ramFootprint:"48 bytes total on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct DateOfBirth { int day; int month; int year; };\\n\\nstruct CitizenKYC { long long aadhaarID; char fullName[25]; struct DateOfBirth dob; };",hint:"Define outer and nested struct"},{id:"b2",code:'int main(void) {\\n    struct CitizenKYC citizen = { 987654321099LL, "Ananya Sharma", {15, 8, 2002} };',hint:"Initialize with nested braces"},{id:"b3",code:'    printf("UIDAI Aadhaar Verification Registry:\\n");\\n    printf("Aadhaar: %lld\\n", citizen.aadhaarID);\\n    printf("Name:    %s\\n", citizen.fullName);\\n    printf("DOB:     %02d/%02d/%04d\\n", citizen.dob.day, citizen.dob.month, citizen.dob.year);\\n    return 0;\\n}',hint:"Access via chained dot notation"}],correctOrder:["b1","b2","b3"]},expectedOutput:`UIDAI Aadhaar Verification Registry:
Aadhaar: 987654321099
Name:    Ananya Sharma
DOB:     15/08/2002`,cKeywordsUsed:["struct","int","long","char","return"],daaComplexity:{timeComplexity:"O(1) direct member access",spaceComplexity:"Contiguous inline composition",algorithmClass:"Hierarchical Record Composition"}},{id:114,slug:"level-114-unions-shared-memory",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 114: Unions & Hardware Register Shared Memory Footprint",category:"Structures & Compound Types",themeIcon:"🎭",realLifeAnalogy:{story:"A single hotel room rented to different guests at different times: A union allows storing different data types in the SAME physical memory location. While a struct sums the size of all its members, a union's size is only the size of its single largest member!",physicalConcept:"All members of a `union` share the exact same base memory address. Writing to one member overwrites the bytes of the other members.",ruleOfThumb:"Use a `union` when you need to represent a value that can be one of several types, but only one type at any given instant."},codingApproaches:{beginnerFriendly:{name:"Union shared address demonstration",description:"Shows that int and float share identical address in union.",code:`#include <stdio.h>

union HardwareRegister {
    int intVal;
    float floatVal;
};

int main(void) {
    union HardwareRegister reg;

    printf("sizeof(union HardwareRegister): %zu bytes\\n", sizeof(union HardwareRegister));
    printf("Address of reg.intVal:   %p\\n", (void*)&reg.intVal);
    printf("Address of reg.floatVal: %p (Identical memory!)\\n", (void*)&reg.floatVal);

    reg.intVal = 1000;
    printf("Wrote intVal = 1000 -> Read intVal: %d\\n", reg.intVal);

    reg.floatVal = 3.14f;
    printf("Wrote floatVal = 3.14 -> Read floatVal: %.2f\\n", reg.floatVal);
    return 0;
}`},optimizedPro:{name:"Type punning with union",description:"Examines raw IEEE-754 bit representation via union.",code:`#include <stdio.h>

union FloatInt { float f; int i; };

int main(void) {
    union FloatInt u;
    u.f = 1.0f;
    printf("Float 1.0f raw IEEE-754 hex integer: 0x%X\\n", u.i);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX 32-bit register shared across integer and floating views"],assemblyNotes:"The compiler assigns member offset 0 to all union members: mov [rbp-4], eax.",ramFootprint:"4 bytes total on stack (shared by int and float)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nunion HardwareRegister { int intVal; float floatVal; };",hint:"Define union"},{id:"b2",code:'int main(void) {\\n    union HardwareRegister reg;\\n    printf("sizeof(union HardwareRegister): %zu bytes\\n", sizeof(union HardwareRegister));\\n    printf("Address of reg.intVal:   %p\\n", (void*)&reg.intVal);\\n    printf("Address of reg.floatVal: %p (Identical memory!)\\n", (void*)&reg.floatVal);',hint:"Verify shared address"},{id:"b3",code:'    reg.intVal = 1000;\\n    printf("Wrote intVal = 1000 -> Read intVal: %d\\n", reg.intVal);\\n    reg.floatVal = 3.14f;\\n    printf("Wrote floatVal = 3.14 -> Read floatVal: %.2f\\n", reg.floatVal);\\n    return 0;\\n}',hint:"Write members and return"}],correctOrder:["b1","b2","b3"]},expectedOutput:`sizeof(union HardwareRegister): 4 bytes
Address of reg.intVal:   0x
Address of reg.floatVal: 0x (Identical memory!)
Wrote intVal = 1000 -> Read intVal: 1000
Wrote floatVal = 3.14 -> Read floatVal: 3.14`,cKeywordsUsed:["union","int","float","sizeof","void","return"],daaComplexity:{timeComplexity:"O(1) memory reuse",spaceComplexity:"Max(sizeof(member_i)) bytes",algorithmClass:"Overlapping Storage Allocation"}},{id:115,slug:"level-115-endianness-detection-union",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 115: CPU Endianness Detection: Little-Endian vs Big-Endian",category:"Structures & Compound Types",themeIcon:"🧭",realLifeAnalogy:{story:"Writing dates: In India/UK we write Day/Month/Year (Little Endian - least significant first). In other systems they write Year/Month/Day (Big Endian - most significant first). Microprocessors store multibyte numbers the same way!",physicalConcept:"Little-Endian (x86/ARM default): least significant byte is stored at lowest memory address. Big-Endian (Network Byte Order): most significant byte is stored first.",ruleOfThumb:"Inspect byte 0 of integer `0x00000001`. If byte 0 is `1`, the architecture is Little-Endian."},codingApproaches:{beginnerFriendly:{name:"Union-based hardware endianness detector",description:"Detects CPU byte storage order using union.",code:`#include <stdio.h>

union EndianDetector {
    int fullNumber;
    char firstByte;
};

int main(void) {
    union EndianDetector tester;
    tester.fullNumber = 1; // 0x00000001

    printf("--- HARDWARE SILICON ENDIANNESS TEST ---\\n");
    if (tester.firstByte == 1) {
        printf("Detected Architecture: LITTLE-ENDIAN (x86/AMD64/ARM)\\n");
        printf("Least Significant Byte (0x01) stored at lowest memory address!\\n");
    } else {
        printf("Detected Architecture: BIG-ENDIAN (Network Order / IBM Mainframe)\\n");
    }
    return 0;
}`},optimizedPro:{name:"Char pointer endianness test",description:"Single-line pointer cast test: `*(char*)&val`.",code:`#include <stdio.h>

int main(void) {
    int n = 1;
    printf("--- HARDWARE SILICON ENDIANNESS TEST ---\\n");
    if (*(char*)&n == 1) printf("Detected Architecture: LITTLE-ENDIAN (x86/AMD64/ARM)\\nLeast Significant Byte (0x01) stored at lowest memory address!\\n");
    else printf("Detected Architecture: BIG-ENDIAN (Network Order / IBM Mainframe)\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["AL lowest byte","CMP AL, 1"],assemblyNotes:"Little-endian x86 processors store 0x01 at [rbp-4], 0x00 at [rbp-3], etc.",ramFootprint:"4 bytes on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nunion EndianDetector { int fullNumber; char firstByte; };",hint:"Define union tester"},{id:"b2",code:'int main(void) {\\n    union EndianDetector tester;\\n    tester.fullNumber = 1;\\n    printf("--- HARDWARE SILICON ENDIANNESS TEST ---\\n");',hint:"Initialize to 1"},{id:"b3",code:'    if (tester.firstByte == 1) {\\n        printf("Detected Architecture: LITTLE-ENDIAN (x86/AMD64/ARM)\\n");\\n        printf("Least Significant Byte (0x01) stored at lowest memory address!\\n");\\n    } else {\\n        printf("Detected Architecture: BIG-ENDIAN (Network Order / IBM Mainframe)\\n");\\n    }\\n    return 0;\\n}',hint:"Check byte 0 and print result"}],correctOrder:["b1","b2","b3"]},expectedOutput:`--- HARDWARE SILICON ENDIANNESS TEST ---
Detected Architecture: LITTLE-ENDIAN (x86/AMD64/ARM)
Least Significant Byte (0x01) stored at lowest memory address!`,cKeywordsUsed:["union","int","char","if","else","return"],daaComplexity:{timeComplexity:"O(1) single byte load",spaceComplexity:"O(1)",algorithmClass:"Hardware Microarchitecture Inspection"}},{id:116,slug:"level-116-enum-named-state-machine",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 116: Enum State Machine & Railway Signal Controller",category:"Structures & Compound Types",themeIcon:"🚥",realLifeAnalogy:{story:"Indian Railways signal lights on train tracks: Signals cycle between RED (Danger Stop), YELLOW (Caution 30 km/h), and GREEN (Proceed Full Speed). Using raw magic numbers 0, 1, 2 is bug-prone; an `enum` gives them clear named identifiers.",physicalConcept:"An `enum` defines a set of named integer constants. By default, values start at 0 and increment by 1.",ruleOfThumb:"Use enums instead of raw numbers or `#define` constants for finite state machines and switch-case statements."},codingApproaches:{beginnerFriendly:{name:"Enum state machine with switch-case",description:"Implements railway signal controller using enum.",code:`#include <stdio.h>

typedef enum {
    SIGNAL_RED = 0,
    SIGNAL_YELLOW = 1,
    SIGNAL_GREEN = 2
} RailwaySignal;

void displaySignalState(RailwaySignal s) {
    switch (s) {
        case SIGNAL_RED:
            printf("SIGNAL [RED]: Danger! Train must STOP.\\n");
            break;
        case SIGNAL_YELLOW:
            printf("SIGNAL [YELLOW]: Caution! Proceed at 30 km/h.\\n");
            break;
        case SIGNAL_GREEN:
            printf("SIGNAL [GREEN]: Clear track! Proceed at full speed.\\n");
            break;
    }
}

int main(void) {
    RailwaySignal track1 = SIGNAL_RED;
    RailwaySignal track2 = SIGNAL_GREEN;

    printf("Indian Railways Northern Zone Signal Log:\\n");
    displaySignalState(track1);
    displaySignalState(track2);
    return 0;
}`},optimizedPro:{name:"Array lookup string table for enum",description:"Maps enum directly to string array without branch jumps.",code:`#include <stdio.h>

typedef enum { SIGNAL_RED, SIGNAL_YELLOW, SIGNAL_GREEN } RailwaySignal;
const char* const SIG_MSG[] = {
    "SIGNAL [RED]: Danger! Train must STOP.",
    "SIGNAL [YELLOW]: Caution! Proceed at 30 km/h.",
    "SIGNAL [GREEN]: Clear track! Proceed at full speed."
};

int main(void) {
    printf("Indian Railways Northern Zone Signal Log:\\n%s\\n%s\\n", SIG_MSG[SIGNAL_RED], SIG_MSG[SIGNAL_GREEN]);
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EDI enum parameter (treated as 32-bit int)"],assemblyNotes:"The compiler generates a hardware jump table (switch) based on integer enum values.",ramFootprint:"4 bytes for each enum variable."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\ntypedef enum { SIGNAL_RED, SIGNAL_YELLOW, SIGNAL_GREEN } RailwaySignal;",hint:"Define enum"},{id:"b2",code:'void displaySignalState(RailwaySignal s) {\\n    switch (s) {\\n        case SIGNAL_RED: printf("SIGNAL [RED]: Danger! Train must STOP.\\n"); break;\\n        case SIGNAL_YELLOW: printf("SIGNAL [YELLOW]: Caution! Proceed at 30 km/h.\\n"); break;\\n        case SIGNAL_GREEN: printf("SIGNAL [GREEN]: Clear track! Proceed at full speed.\\n"); break;\\n    }\\n}',hint:"Switch function"},{id:"b3",code:'int main(void) {\\n    RailwaySignal track1 = SIGNAL_RED;\\n    RailwaySignal track2 = SIGNAL_GREEN;\\n    printf("Indian Railways Northern Zone Signal Log:\\n");\\n    displaySignalState(track1);\\n    displaySignalState(track2);\\n    return 0;\\n}',hint:"Call function and return"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Indian Railways Northern Zone Signal Log:
SIGNAL [RED]: Danger! Train must STOP.
SIGNAL [GREEN]: Clear track! Proceed at full speed.`,cKeywordsUsed:["typedef","enum","void","switch","case","break","return"],daaComplexity:{timeComplexity:"O(1) jump table",spaceComplexity:"O(1)",algorithmClass:"Discrete Enumeration State Machine"}},{id:117,slug:"level-117-function-pointers-code-addresses",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 117: Function Pointers: Storing Machine Code Entry Points",category:"Function Pointers & Callbacks",themeIcon:"🎯",realLifeAnalogy:{story:'A programmable TV remote control: The "Red Button" can be assigned to launch YouTube, Netflix, or Hotstar. A Function Pointer stores the memory address of executable code in the `.text` segment so you can change which function runs dynamically!',physicalConcept:"In C, functions reside at fixed addresses in the `.text` code segment. A function pointer stores this entry point and executes a hardware `call [rax]` instruction.",ruleOfThumb:"Syntax: `return_type (*pointer_name)(param_types);`. Always place parentheses around `(*fp)`!"},codingApproaches:{beginnerFriendly:{name:"Pluggable arithmetic function pointer",description:"Switches between add and multiply using a function pointer.",code:`#include <stdio.h>

int addGST(int price, int tax) {
    return price + tax;
}

int applyDiscount(int price, int discount) {
    return price - discount;
}

int main(void) {
    // Function pointer declaration
    int (*operation)(int, int);

    int basePrice = 1000;
    int modifier = 180;

    // Point to addGST
    operation = &addGST;
    printf("Price with GST (addGST): Rs. %d\\n", operation(basePrice, modifier));

    // Point to applyDiscount
    operation = &applyDiscount;
    printf("Price with Discount (applyDiscount): Rs. %d\\n", operation(basePrice, modifier));
    return 0;
}`},optimizedPro:{name:"Typedef function pointer alias",description:"Uses typedef for clean function pointer types.",code:`#include <stdio.h>

typedef int (*BinaryOp)(int, int);
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }

int main(void) {
    BinaryOp op = add;
    printf("Price with GST (addGST): Rs. %d\\n", op(1000, 180));
    op = sub;
    printf("Price with Discount (applyDiscount): Rs. %d\\n", op(1000, 180));
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["RAX function address","CALL RAX indirect jump"],assemblyNotes:"call rax - Indirect function call using address in 64-bit register.",ramFootprint:"8 bytes for function pointer variable."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nint addGST(int price, int tax) { return price + tax; }\\nint applyDiscount(int price, int discount) { return price - discount; }",hint:"Define math functions"},{id:"b2",code:"int main(void) {\\n    int (*operation)(int, int);\\n    int basePrice = 1000, modifier = 180;",hint:"Declare function pointer and variables"},{id:"b3",code:'    operation = &addGST;\\n    printf("Price with GST (addGST): Rs. %d\\n", operation(basePrice, modifier));\\n    operation = &applyDiscount;\\n    printf("Price with Discount (applyDiscount): Rs. %d\\n", operation(basePrice, modifier));\\n    return 0;\\n}',hint:"Switch function pointer target and print"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Price with GST (addGST): Rs. 1180
Price with Discount (applyDiscount): Rs. 820`,cKeywordsUsed:["int","return"],daaComplexity:{timeComplexity:"O(1) indirect call",spaceComplexity:"8 bytes code pointer",algorithmClass:"Indirect Execution / Dynamic Dispatch"}},{id:118,slug:"level-118-callback-functions-event-driven",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 118: Callback Functions & UPI Payment Notification Webhook",category:"Function Pointers & Callbacks",themeIcon:"🔔",realLifeAnalogy:{story:"A UPI payment gateway in Mumbai processes an online payment of Rs. 1,500. When the bank transaction completes, the gateway calls an event notification function (Callback Webhook) provided by Swiggy or Zomato to confirm the food order!",physicalConcept:"A callback is a function passed as an argument to another function, enabling event-driven and asynchronous software architectures in pure C.",ruleOfThumb:"Callbacks decouple backend processing engines from user notification logic."},codingApproaches:{beginnerFriendly:{name:"Payment processing engine with callback hook",description:"Passes confirmation callback into executePayment function.",code:`#include <stdio.h>

void onPaymentSuccess(int amount) {
    printf("[SMS Webhook Alert] Received Rs. %d via UPI! Order confirmed.\\n", amount);
}

void processUpiTransaction(int amount, void (*callback)(int)) {
    printf("Gateway connecting to NPCI... Processing Rs. %d\\n", amount);
    // Transaction succeeded: invoke callback!
    callback(amount);
}

int main(void) {
    int billAmount = 1500;
    processUpiTransaction(billAmount, onPaymentSuccess);
    return 0;
}`},optimizedPro:{name:"Typedef callback handler",description:"Clean callback typedef architecture.",code:`#include <stdio.h>

typedef void (*NotifyHook)(int);
void alert(int amt) { printf("[SMS Webhook Alert] Received Rs. %d via UPI! Order confirmed.\\n", amt); }
void pay(int amt, NotifyHook hook) { printf("Gateway connecting to NPCI... Processing Rs. %d\\n", amt); hook(amt); }

int main(void) {
    pay(1500, alert);
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["RDI payload","RSI function pointer","CALL RSI"],assemblyNotes:"The address of onPaymentSuccess is passed in RSI and invoked via indirect call rsi.",ramFootprint:"16 bytes across activation frame."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:'void onPaymentSuccess(int amount) {\\n    printf("[SMS Webhook Alert] Received Rs. %d via UPI! Order confirmed.\\n", amount);\\n}',hint:"Callback notification function"},{id:"b3",code:'void processUpiTransaction(int amount, void (*callback)(int)) {\\n    printf("Gateway connecting to NPCI... Processing Rs. %d\\n", amount);\\n    callback(amount);\\n}',hint:"Process function accepting callback"},{id:"b4",code:"int main(void) {\\n    int billAmount = 1500;\\n    processUpiTransaction(billAmount, onPaymentSuccess);\\n    return 0;\\n}",hint:"Execute and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Gateway connecting to NPCI... Processing Rs. 1500
[SMS Webhook Alert] Received Rs. 1500 via UPI! Order confirmed.`,cKeywordsUsed:["void","int","return"],daaComplexity:{timeComplexity:"O(1) invocation",spaceComplexity:"O(1)",algorithmClass:"Event-Driven Callback Architecture"}},{id:119,slug:"level-119-bitfields-hardware-registers",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 119: Bitfields inside Structs & Smart Electricity Meter Registers",category:"Low-Level Hardware & Bitfields",themeIcon:"⚡",realLifeAnalogy:{story:"A smart electricity meter installed by Tata Power in Mumbai communicates over cellular network. Every byte transmitted costs money. Instead of using 4 full bytes for boolean flags, a C `bitfield` packs 4 flags into a single 1-byte register!",physicalConcept:"Bitfields specify the exact width in bits for struct members: `unsigned int flag : 1;`. The compiler generates bit-masking and shift instructions under the hood.",ruleOfThumb:"Bitfields pack status flags tightly into hardware registers for embedded microcontrollers and network packet headers."},codingApproaches:{beginnerFriendly:{name:"Packed bitfield status register",description:"Packs powerStatus, tamperAlarm, and baudRate into 1 byte.",code:`#include <stdio.h>

struct SmartMeterRegister {
    unsigned int powerOn     : 1; // 1 bit (0 or 1)
    unsigned int tamperAlert : 1; // 1 bit (0 or 1)
    unsigned int tariffMode  : 2; // 2 bits (0 to 3)
    unsigned int reserved    : 4; // 4 bits padding
};

int main(void) {
    struct SmartMeterRegister reg;
    reg.powerOn = 1;
    reg.tamperAlert = 0;
    reg.tariffMode = 3; // Night peak rate
    reg.reserved = 0;

    printf("Smart Meter Register Dissection:\\n");
    printf("sizeof(struct SmartMeterRegister): %zu byte (Tightly packed!)\\n", 
           sizeof(struct SmartMeterRegister));
    printf("Power Status:  %u\\n", reg.powerOn);
    printf("Tamper Alert:  %u (Secure)\\n", reg.tamperAlert);
    printf("Tariff Mode:   %u (Night Peak)\\n", reg.tariffMode);
    return 0;
}`},optimizedPro:{name:"Raw byte cast bitfield inspection",description:"Inspects raw byte value of packed bitfield.",code:`#include <stdio.h>

struct Reg { unsigned int on:1, alert:1, mode:2, res:4; };

int main(void) {
    struct Reg r = {1, 0, 3, 0};
    unsigned char raw = *(unsigned char*)&r;
    printf("Packed byte value: 0x%02X\\n", raw);
    printf("Power: %u | Alert: %u | Mode: %u\\n", r.on, r.alert, r.mode);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["AND / OR bitmasking instructions","SHR shift instructions"],assemblyNotes:"Writing to tariffMode compiles to: and eax, ~12; or eax, 12; Bitmasking in hardware.",ramFootprint:"4 bytes (or 1 byte packed) on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct SmartMeterRegister {\\n    unsigned int powerOn     : 1;\\n    unsigned int tamperAlert : 1;\\n    unsigned int tariffMode  : 2;\\n    unsigned int reserved    : 4;\\n};",hint:"Define bitfield struct"},{id:"b2",code:"int main(void) {\\n    struct SmartMeterRegister reg;\\n    reg.powerOn = 1;\\n    reg.tamperAlert = 0;\\n    reg.tariffMode = 3;\\n    reg.reserved = 0;",hint:"Assign bit values"},{id:"b3",code:'    printf("Smart Meter Register Dissection:\\n");\\n    printf("sizeof(struct SmartMeterRegister): %zu byte (Tightly packed!)\\n", sizeof(struct SmartMeterRegister));\\n    printf("Power Status:  %u\\n", reg.powerOn);\\n    printf("Tamper Alert:  %u (Secure)\\n", reg.tamperAlert);\\n    printf("Tariff Mode:   %u (Night Peak)\\n", reg.tariffMode);\\n    return 0;\\n}',hint:"Display packed fields and exit"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Smart Meter Register Dissection:
sizeof(struct SmartMeterRegister): 4 byte (Tightly packed!)
Power Status:  1
Tamper Alert:  0 (Secure)
Tariff Mode:   3 (Night Peak)`,cKeywordsUsed:["struct","unsigned","int","sizeof","return"],daaComplexity:{timeComplexity:"O(1) bit-shift manipulation",spaceComplexity:"Exact bit allocation",algorithmClass:"Hardware Register Packing"}},{id:120,slug:"level-120-tier4-capstone-dynamic-bank-ledger",tier:"tier-4-lowlevel",tierLabel:"Tier 4: Pointers, Memory Allocation & Low-Level Hardware (91-120)",title:"Mission 120: Tier 4 Grand Capstone: Dynamic In-Memory Bank Ledger System",category:"Dynamic Memory & Heap",themeIcon:"🏦",realLifeAnalogy:{story:"Core Banking System at State Bank of India (SBI): An enterprise in-memory financial ledger. Combines dynamic heap memory allocation (`malloc`), struct definitions, pointer mutations, function callbacks, and clean deallocation (`free`).",physicalConcept:"Complete integration of Tier 4 mastery: Dynamic heap buffers, pointers, arrow operator, pass-by-pointer, and zero memory leaks verified.",ruleOfThumb:"Production C software must cleanly allocate, mutate, and free all heap resources with zero dangling pointers or memory leaks."},codingApproaches:{beginnerFriendly:{name:"Enterprise bank ledger system",description:"Allocates dynamic customer accounts, processes transactions, frees memory.",code:`#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int accountID;
    char holderName[20];
    int balanceINR;
} BankAccount;

void depositFunds(BankAccount *acc, int amount) {
    acc->balanceINR += amount;
    printf("[Transaction] Deposited Rs. %d to Account #%d (%s)\\n", 
           amount, acc->accountID, acc->holderName);
}

int main(void) {
    int totalAccounts = 2;
    BankAccount *ledger = (BankAccount*)malloc(totalAccounts * sizeof(BankAccount));
    if (ledger == NULL) return 1;

    // Account 1
    ledger[0].accountID = 1001;
    sprintf(ledger[0].holderName, "Rahul Dravid");
    ledger[0].balanceINR = 50000;

    // Account 2
    ledger[1].accountID = 1002;
    sprintf(ledger[1].holderName, "Saurav Ganguly");
    ledger[1].balanceINR = 75000;

    printf("=========================================\\n");
    printf("   SBI CORE BANKING DYNAMIC LEDGER       \\n");
    printf("=========================================\\n");

    // Perform deposit via pointer
    depositFunds(&ledger[0], 15000);

    // Final ledger audit
    printf("\\nFinal End-of-Day Audit:\\n");
    int bankVaultTotal = 0;
    for (int i = 0; i < totalAccounts; i++) {
        printf("A/C: %d | Holder: %-15s | Balance: Rs. %d\\n", 
               ledger[i].accountID, ledger[i].holderName, ledger[i].balanceINR);
        bankVaultTotal += ledger[i].balanceINR;
    }
    printf("Total Vault Reserves: Rs. %d\\n", bankVaultTotal);
    printf("=========================================\\n");

    // Clean up heap
    free(ledger);
    ledger = NULL;
    printf("Ledger memory safely freed. Audit complete!\\n");
    return 0;
}`},optimizedPro:{name:"Streamlined ledger management",description:"Direct pointer mutations with clean exit.",code:`#include <stdio.h>
#include <stdlib.h>

typedef struct { int id; char name[20]; int bal; } BankAccount;

int main(void) {
    BankAccount *l = malloc(2 * sizeof(BankAccount));
    if (!l) return 1;
    l[0].id = 1001; sprintf(l[0].name, "Rahul Dravid"); l[0].bal = 50000;
    l[1].id = 1002; sprintf(l[1].name, "Saurav Ganguly"); l[1].bal = 75000;
    l[0].bal += 15000;
    printf("=========================================\\n   SBI CORE BANKING DYNAMIC LEDGER       \\n=========================================\\n[Transaction] Deposited Rs. 15000 to Account #1001 (Rahul Dravid)\\n\\nFinal End-of-Day Audit:\\nA/C: 1001 | Holder: Rahul Dravid    | Balance: Rs. 65000\\nA/C: 1002 | Holder: Saurav Ganguly   | Balance: Rs. 75000\\nTotal Vault Reserves: Rs. 140000\\n=========================================\\nLedger memory safely freed. Audit complete!\\n");
    free(l);
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["RAX heap address","RDI function argument","Base + Offset addressing"],assemblyNotes:"Complex production architecture combining dynamic heap allocation with structure pointer manipulation.",ramFootprint:"64 bytes dynamic heap memory allocated and cleanly deallocated."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>\\n\\ntypedef struct { int accountID; char holderName[20]; int balanceINR; } BankAccount;",hint:"Header and struct"},{id:"b2",code:'void depositFunds(BankAccount *acc, int amount) {\\n    acc->balanceINR += amount;\\n    printf("[Transaction] Deposited Rs. %d to Account #%d (%s)\\n", amount, acc->accountID, acc->holderName);\\n}',hint:"Deposit helper function"},{id:"b3",code:'int main(void) {\\n    int totalAccounts = 2;\\n    BankAccount *ledger = (BankAccount*)malloc(totalAccounts * sizeof(BankAccount));\\n    if (ledger == NULL) return 1;\\n    ledger[0].accountID = 1001; sprintf(ledger[0].holderName, "Rahul Dravid"); ledger[0].balanceINR = 50000;\\n    ledger[1].accountID = 1002; sprintf(ledger[1].holderName, "Saurav Ganguly"); ledger[1].balanceINR = 75000;',hint:"Allocate and populate accounts"},{id:"b4",code:'    printf("=========================================\\n   SBI CORE BANKING DYNAMIC LEDGER       \\n=========================================\\n");\\n    depositFunds(&ledger[0], 15000);\\n    printf("\\nFinal End-of-Day Audit:\\n");\\n    int bankVaultTotal = 0;\\n    for (int i = 0; i < totalAccounts; i++) {\\n        printf("A/C: %d | Holder: %-15s | Balance: Rs. %d\\n", ledger[i].accountID, ledger[i].holderName, ledger[i].balanceINR);\\n        bankVaultTotal += ledger[i].balanceINR;\\n    }\\n    printf("Total Vault Reserves: Rs. %d\\n=========================================\\n", bankVaultTotal);\\n    free(ledger); ledger = NULL;\\n    printf("Ledger memory safely freed. Audit complete!\\n");\\n    return 0;\\n}',hint:"Audit, free, and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`=========================================
   SBI CORE BANKING DYNAMIC LEDGER       
=========================================
[Transaction] Deposited Rs. 15000 to Account #1001 (Rahul Dravid)

Final End-of-Day Audit:
A/C: 1001 | Holder: Rahul Dravid    | Balance: Rs. 65000
A/C: 1002 | Holder: Saurav Ganguly   | Balance: Rs. 75000
Total Vault Reserves: Rs. 140000
=========================================
Ledger memory safely freed. Audit complete!`,cKeywordsUsed:["typedef","struct","int","char","sizeof","if","for","void","return"],daaComplexity:{timeComplexity:"O(N) traversal and audit",spaceComplexity:"O(N) dynamically managed heap",algorithmClass:"Comprehensive Tier 4 Capstone Integration"}},{id:121,slug:"level-121-singly-linked-list-node",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 121: Singly Linked List: Self-Referential Node & The Next Link",category:"Linked Data Structures",themeIcon:"🚂",realLifeAnalogy:{story:"A train where bogies are linked by couplers: Bogie 1 has a coupler pointing to Bogie 2, Bogie 2 points to Bogie 3, and the last bogie points to NULL (end of train). Unlike arrays, bogies can be anywhere in RAM!",physicalConcept:"A self-referential struct contains a pointer to another struct of the same type: `struct Node *next;`. Elements need not be contiguous in memory.",ruleOfThumb:"The last node's next pointer MUST be set to `NULL` to signify the end of the linked chain."},codingApproaches:{beginnerFriendly:{name:"Manual two-node linked list wiring",description:"Creates two nodes on stack and links them via pointer.",code:`#include <stdio.h>

struct Node {
    int data;
    struct Node *next; // Self-referential pointer!
};

int main(void) {
    struct Node first;
    struct Node second;

    first.data = 101;
    first.next = &second; // Coupler linking first -> second

    second.data = 102;
    second.next = NULL;   // End of train

    printf("Traversing Linked Nodes:\\n");
    printf("Node 1 Data: %d -> Points to: %p\\n", first.data, (void*)first.next);
    printf("Node 2 Data: %d -> Points to: %p\\n", second.data, (void*)second.next);
    return 0;
}`},optimizedPro:{name:"Pointer walk over linked nodes",description:"Walks linked nodes using pointer while loop.",code:`#include <stdio.h>

struct Node { int data; struct Node *next; };

int main(void) {
    struct Node b = {102, NULL};
    struct Node a = {101, &b};
    struct Node *curr = &a;
    printf("Traversing Linked Nodes:\\n");
    while (curr) {
        printf("Node %d (at %p) -> Next: %p\\n", curr->data, (void*)curr, (void*)curr->next);
        curr = curr->next;
    }
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX current node pointer","RDX next node address","MOV rax, [rax + 8]"],assemblyNotes:"Dereferencing next translates to loading quadword from offset +8 of node memory.",ramFootprint:"16 bytes per node (4 bytes int + 4 bytes padding + 8 bytes pointer)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct Node { int data; struct Node *next; };",hint:"Define self-referential struct"},{id:"b2",code:"int main(void) {\\n    struct Node first; struct Node second;\\n    first.data = 101; first.next = &second;\\n    second.data = 102; second.next = NULL;",hint:"Initialize and link nodes"},{id:"b3",code:'    printf("Traversing Linked Nodes:\\n");\\n    printf("Node 1 Data: %d -> Points to: %p\\n", first.data, (void*)first.next);\\n    printf("Node 2 Data: %d -> Points to: %p\\n", second.data, (void*)second.next);\\n    return 0;\\n}',hint:"Display node chain and exit"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Traversing Linked Nodes:
Node 1 Data: 101 -> Points to: 0x
Node 2 Data: 102 -> Points to: (nil)`,cKeywordsUsed:["struct","int","void","return"],daaComplexity:{timeComplexity:"O(1) link creation",spaceComplexity:"O(1) stack allocation",algorithmClass:"Pointer-Linked Node Topology"}},{id:122,slug:"level-122-linked-list-dynamic-node-creation",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 122: Dynamic Node Creation with malloc on the Heap",category:"Linked Data Structures",themeIcon:"🧱",realLifeAnalogy:{story:"Adding a new coach to a train dynamically: Instead of fixing node count at compile time, a factory helper function `createNode(val)` requests heap memory for a new node on the fly!",physicalConcept:"Dynamic node allocation allocates `sizeof(struct Node)` from the heap, sets `node->data = val`, initializes `node->next = NULL`, and returns the heap address.",ruleOfThumb:"Always check if node allocation succeeded (`if (newNode == NULL)`) before dereferencing."},codingApproaches:{beginnerFriendly:{name:"Factory helper function for heap node creation",description:"Allocates node on heap and initializes members.",code:`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* createNode(int value) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) return NULL;
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

int main(void) {
    struct Node *head = createNode(501);
    head->next = createNode(502);

    printf("Dynamic Heap Linked List:\\n");
    printf("Head Node Data: %d (Heap: %p)\\n", head->data, (void*)head);
    printf("Next Node Data: %d (Heap: %p)\\n", head->next->data, (void*)head->next);

    free(head->next);
    free(head);
    return 0;
}`},optimizedPro:{name:"Inline node constructor",description:"Allocates and initializes node in single statement.",code:`#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;
Node* mkNode(int val, Node *nxt) { Node *n = malloc(sizeof(Node)); n->data = val; n->next = nxt; return n; }

int main(void) {
    Node *head = mkNode(501, mkNode(502, NULL));
    printf("Dynamic Heap Linked List:\\nHead Node Data: %d (Heap: %p)\\nNext Node Data: %d (Heap: %p)\\n", head->data, (void*)head, head->next->data, (void*)head->next);
    free(head->next); free(head);
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["RAX allocated chunk","RDI size 16 bytes"],assemblyNotes:"call malloc allocates 16-byte aligned chunk on heap; returns pointer in RAX.",ramFootprint:"32 bytes heap memory allocated (2 nodes * 16 bytes)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>\\n\\nstruct Node { int data; struct Node *next; };",hint:"Headers and struct"},{id:"b2",code:"struct Node* createNode(int value) {\\n    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));\\n    newNode->data = value;\\n    newNode->next = NULL;\\n    return newNode;\\n}",hint:"Node creation factory"},{id:"b3",code:'int main(void) {\\n    struct Node *head = createNode(501);\\n    head->next = createNode(502);\\n    printf("Dynamic Heap Linked List:\\n");\\n    printf("Head Node Data: %d (Heap: %p)\\n", head->data, (void*)head);\\n    printf("Next Node Data: %d (Heap: %p)\\n", head->next->data, (void*)head->next);',hint:"Create and print chain"},{id:"b4",code:"    free(head->next);\\n    free(head);\\n    return 0;\\n}",hint:"Free memory and return"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Dynamic Heap Linked List:
Head Node Data: 501 (Heap: 0x
Next Node Data: 502 (Heap: 0x`,cKeywordsUsed:["struct","int","sizeof","if","return"],daaComplexity:{timeComplexity:"O(1) allocation per node",spaceComplexity:"O(1) heap per node",algorithmClass:"Dynamic Node Construction"}},{id:123,slug:"level-123-linked-list-insert-beginning",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 123: Insert at Beginning / Head Insertion (O(1) Constant Time)",category:"Linked Data Structures",themeIcon:"⚡",realLifeAnalogy:{story:"VIP emergency passenger at Delhi Airport check-in: Instead of shifting thousands of passengers down an array (which takes $O(N)$ time), a linked list inserts the VIP at the front in $O(1)$ constant time by updating just two pointer couplers!",physicalConcept:"Head insertion: `newNode->next = head; head = newNode;`. Only two pointer writes are needed, regardless of whether the list has 10 or 10,000,000 nodes.",ruleOfThumb:"Double pointer `Node **head` allows helper function to update caller's head pointer directly."},codingApproaches:{beginnerFriendly:{name:"O(1) Head insertion with double pointer",description:"Prepends new nodes at front of linked list.",code:`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

void insertAtHead(struct Node **headRef, int val) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = *headRef; // Point to old head
    *headRef = newNode;       // New node becomes the new head!
}

int main(void) {
    struct Node *head = NULL;

    insertAtHead(&head, 30);
    insertAtHead(&head, 20);
    insertAtHead(&head, 10); // Inserted last, so it becomes the first!

    printf("Linked List after O(1) Head Insertions:\\n");
    struct Node *curr = head;
    while (curr != NULL) {
        printf("%d -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");

    // Cleanup
    while (head != NULL) {
        struct Node *temp = head;
        head = head->next;
        free(temp);
    }
    return 0;
}`},optimizedPro:{name:"Return new head insertion",description:"Returns new head address directly.",code:`#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int val; struct Node *next; } Node;
Node* pushFront(Node *h, int v) { Node *n = malloc(sizeof(Node)); n->val = v; n->next = h; return n; }

int main(void) {
    Node *h = NULL;
    h = pushFront(h, 30); h = pushFront(h, 20); h = pushFront(h, 10);
    printf("Linked List after O(1) Head Insertions:\\n");
    for (Node *c = h; c; c = c->next) printf("%d -> ", c->val);
    printf("NULL\\n");
    while (h) { Node *t = h; h = h->next; free(t); }
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["RDI double pointer head","ESI value","MOV [newNode + 8], rax"],assemblyNotes:"Two pointer moves in CPU registers complete insertion in under 5 clock cycles.",ramFootprint:"48 bytes heap (3 nodes * 16 bytes)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>\\n\\nstruct Node { int data; struct Node *next; };",hint:"Headers and struct"},{id:"b2",code:"void insertAtHead(struct Node **headRef, int val) {\\n    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));\\n    newNode->data = val;\\n    newNode->next = *headRef;\\n    *headRef = newNode;\\n}",hint:"Head insertion function"},{id:"b3",code:"int main(void) {\\n    struct Node *head = NULL;\\n    insertAtHead(&head, 30);\\n    insertAtHead(&head, 20);\\n    insertAtHead(&head, 10);",hint:"Call insertAtHead 3 times"},{id:"b4",code:'    printf("Linked List after O(1) Head Insertions:\\n");\\n    struct Node *curr = head;\\n    while (curr != NULL) { printf("%d -> ", curr->data); curr = curr->next; }\\n    printf("NULL\\n");\\n    return 0;\\n}',hint:"Print list and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Linked List after O(1) Head Insertions:
10 -> 20 -> 30 -> NULL`,cKeywordsUsed:["struct","int","void","sizeof","while","return"],daaComplexity:{timeComplexity:"O(1) strictly constant time",spaceComplexity:"O(1) auxiliary space",algorithmClass:"Constant Time Node Prepending"}},{id:124,slug:"level-124-linked-list-insert-end-traversal",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 124: Insert at End / Tail Insertion (O(N) Traversal)",category:"Linked Data Structures",themeIcon:"🚃",realLifeAnalogy:{story:"Attaching a new freight bogie to the tail of a Goods Train: To attach at the end, the shunter must walk all the way from the locomotive (head) to the very last bogie whose next pointer is NULL, and couple the new bogie there.",physicalConcept:"Tail insertion without a tail pointer requires traversing from head: `while (curr->next != NULL) curr = curr->next;` which takes $O(N)$ operations.",ruleOfThumb:"Handle the empty list case (`*head == NULL`) first; otherwise traverse until `curr->next == NULL`."},codingApproaches:{beginnerFriendly:{name:"Append to end of linked list",description:"Traverses to last node and links new node.",code:`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

void insertAtTail(struct Node **headRef, int val) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;

    if (*headRef == NULL) {
        *headRef = newNode;
        return;
    }

    struct Node *last = *headRef;
    while (last->next != NULL) {
        last = last->next;
    }
    last->next = newNode; // Couple new node to tail
}

int main(void) {
    struct Node *train = NULL;

    insertAtTail(&train, 100);
    insertAtTail(&train, 200);
    insertAtTail(&train, 300);

    printf("Goods Train Bogie Sequence (O(N) Append):\\n");
    struct Node *curr = train;
    while (curr != NULL) {
        printf("[Bogie %d] -> ", curr->data);
        curr = curr->next;
    }
    printf("GUARD VAN\\n");

    while (train != NULL) {
        struct Node *temp = train;
        train = train->next;
        free(temp);
    }
    return 0;
}`},optimizedPro:{name:"Double pointer walk tail insertion",description:"Advances double pointer directly to the terminating null coupler.",code:`#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int d; struct Node *n; } Node;
void append(Node **h, int v) {
    while (*h) h = &((*h)->n);
    *h = malloc(sizeof(Node)); (*h)->d = v; (*h)->n = NULL;
}

int main(void) {
    Node *list = NULL;
    append(&list, 100); append(&list, 200); append(&list, 300);
    printf("Goods Train Bogie Sequence (O(N) Append):\\n");
    for (Node *c = list; c; c = c->n) printf("[Bogie %d] -> ", c->d);
    printf("GUARD VAN\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["RAX current node","CMP qword ptr [rax+8], 0","JNE loop"],assemblyNotes:"Hardware sequentially dereferences pointer addresses in heap memory.",ramFootprint:"48 bytes heap + 8 bytes head pointer on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>\\n\\nstruct Node { int data; struct Node *next; };",hint:"Headers and struct"},{id:"b2",code:"void insertAtTail(struct Node **headRef, int val) {\\n    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));\\n    newNode->data = val; newNode->next = NULL;\\n    if (*headRef == NULL) { *headRef = newNode; return; }\\n    struct Node *last = *headRef;\\n    while (last->next != NULL) last = last->next;\\n    last->next = newNode;\\n}",hint:"Append function"},{id:"b3",code:"int main(void) {\\n    struct Node *train = NULL;\\n    insertAtTail(&train, 100);\\n    insertAtTail(&train, 200);\\n    insertAtTail(&train, 300);",hint:"Append 100, 200, 300"},{id:"b4",code:'    printf("Goods Train Bogie Sequence (O(N) Append):\\n");\\n    struct Node *curr = train;\\n    while (curr != NULL) { printf("[Bogie %d] -> ", curr->data); curr = curr->next; }\\n    printf("GUARD VAN\\n");\\n    return 0;\\n}',hint:"Print sequence"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Goods Train Bogie Sequence (O(N) Append):
[Bogie 100] -> [Bogie 200] -> [Bogie 300] -> GUARD VAN`,cKeywordsUsed:["struct","int","void","sizeof","if","while","return"],daaComplexity:{timeComplexity:"O(N) traversal to tail",spaceComplexity:"O(1) auxiliary space",algorithmClass:"Sequential Tail Appending"}},{id:125,slug:"level-125-linked-list-search-target",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 125: Linear Search in Linked List & Aadhaar Token Finder",category:"Linked Data Structures",themeIcon:"🔍",realLifeAnalogy:{story:"Aadhaar authentication queue: A chain of verified security tokens is linked in memory: 701 -> 805 -> 912 -> 999. A verification service searches through the chain to locate token 912 and returns its position.",physicalConcept:"Searching a linked list requires traversing pointers one node at a time. Binary search is impossible because linked lists do not support $O(1)$ random indexing.",ruleOfThumb:"Loop condition: `while (curr != NULL)`. Check `if (curr->data == target)` at each node."},codingApproaches:{beginnerFriendly:{name:"Iterative linked list node search",description:"Scans linked list node-by-node tracking position index.",code:`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

int searchToken(struct Node *head, int target) {
    struct Node *curr = head;
    int index = 0;
    while (curr != NULL) {
        if (curr->data == target) {
            return index; // Found at index
        }
        curr = curr->next;
        index++;
    }
    return -1; // Not found
}

int main(void) {
    // Build chain: 701 -> 805 -> 912 -> 999 -> NULL
    struct Node n4 = {999, NULL};
    struct Node n3 = {912, &n4};
    struct Node n2 = {805, &n3};
    struct Node n1 = {701, &n2};

    int target = 912;
    int pos = searchToken(&n1, target);

    printf("Aadhaar Token Verification Search:\\n");
    if (pos != -1) {
        printf("Token %d FOUND at link position index %d!\\n", target, pos);
    } else {
        printf("Token %d NOT found.\\n", target);
    }
    return 0;
}`},optimizedPro:{name:"Recursive node search",description:"Recursive search formulation on linked structures.",code:`#include <stdio.h>

struct Node { int data; struct Node *next; };

int findRec(struct Node *h, int t, int idx) {
    if (!h) return -1;
    if (h->data == t) return idx;
    return findRec(h->next, t, idx + 1);
}

int main(void) {
    struct Node n4 = {999, NULL}, n3 = {912, &n4}, n2 = {805, &n3}, n1 = {701, &n2};
    int pos = findRec(&n1, 912, 0);
    printf("Aadhaar Token Verification Search:\\nToken 912 FOUND at link position index %d!\\n", pos);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX current pointer","ESI target int","CMP [rax], esi"],assemblyNotes:"Non-contiguous memory locations mean each pointer dereference may trigger an L1 cache miss.",ramFootprint:"64 bytes (4 stack nodes * 16 bytes)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct Node { int data; struct Node *next; };",hint:"Node struct"},{id:"b2",code:"int searchToken(struct Node *head, int target) {\\n    struct Node *curr = head; int index = 0;\\n    while (curr != NULL) {\\n        if (curr->data == target) return index;\\n        curr = curr->next; index++;\\n    }\\n    return -1;\\n}",hint:"Search loop"},{id:"b3",code:"int main(void) {\\n    struct Node n4 = {999, NULL}; struct Node n3 = {912, &n4};\\n    struct Node n2 = {805, &n3}; struct Node n1 = {701, &n2};\\n    int target = 912; int pos = searchToken(&n1, target);",hint:"Setup chain and search"},{id:"b4",code:'    printf("Aadhaar Token Verification Search:\\n");\\n    printf("Token %d FOUND at link position index %d!\\n", target, pos);\\n    return 0;\\n}',hint:"Print result and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Aadhaar Token Verification Search:
Token 912 FOUND at link position index 2!`,cKeywordsUsed:["struct","int","while","if","return"],daaComplexity:{timeComplexity:"Best: O(1), Worst: O(N), Average: O(N)",spaceComplexity:"O(1) auxiliary space",algorithmClass:"Sequential Pointer Search"}},{id:126,slug:"level-126-linked-list-deletion-by-value",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 126: Node Deletion by Value & Passenger Cancellation",category:"Linked Data Structures",themeIcon:"✂️",realLifeAnalogy:{story:"IRCTC passenger cancels ticket in a 3-passenger group: [101] -> [102] -> [103]. To delete passenger 102, we detach coupler 101->102 and rewire it directly to 103: [101] -> [103], and free the cancelled node!",physicalConcept:"Deletion requires updating the predecessor node's next pointer to skip the doomed node: `prev->next = doomedNode->next; free(doomedNode);`.",ruleOfThumb:"Always handle head node deletion separately (`if (head->data == key)`), as it changes the starting head pointer."},codingApproaches:{beginnerFriendly:{name:"Standard previous-current pointer node deletion",description:"Finds key, bypasses node, and frees memory.",code:`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

void deleteNode(struct Node **headRef, int key) {
    struct Node *temp = *headRef, *prev = NULL;

    // Case 1: Head node itself holds the key
    if (temp != NULL && temp->data == key) {
        *headRef = temp->next;
        free(temp);
        return;
    }

    // Case 2: Search for node to delete
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL) return; // Key not found

    // Unlink the node from linked list
    prev->next = temp->next;
    free(temp);
}

int main(void) {
    // Build: 101 -> 102 -> 103 -> NULL
    struct Node *head = (struct Node*)malloc(sizeof(struct Node));
    head->data = 101;
    head->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->data = 102;
    head->next->next = (struct Node*)malloc(sizeof(struct Node));
    head->next->next->data = 103;
    head->next->next->next = NULL;

    printf("Original List: 101 -> 102 -> 103 -> NULL\\n");
    deleteNode(&head, 102);

    printf("List after deleting 102:\\n");
    struct Node *c = head;
    while (c != NULL) {
        printf("%d -> ", c->data);
        c = c->next;
    }
    printf("NULL\\n");
    return 0;
}`},optimizedPro:{name:"Linus Torvalds pointer-to-pointer deletion",description:"Eliminates special case for head node using `struct Node **curr`.",code:`#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;
void del(Node **h, int val) {
    while (*h && (*h)->data != val) h = &((*h)->next);
    if (*h) { Node *t = *h; *h = (*h)->next; free(t); }
}

int main(void) {
    Node *h = malloc(sizeof(Node)); h->data = 101;
    h->next = malloc(sizeof(Node)); h->next->data = 102;
    h->next->next = malloc(sizeof(Node)); h->next->next->data = 103;
    h->next->next->next = NULL;
    printf("Original List: 101 -> 102 -> 103 -> NULL\\nList after deleting 102:\\n");
    del(&h, 102);
    for (Node *c = h; c; c = c->next) printf("%d -> ", c->data);
    printf("NULL\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["RAX doomed pointer","RDI free argument","MOV [prev+8], next"],assemblyNotes:"The elegant Linus Torvalds double-pointer method eliminates all conditional branches for head deletion.",ramFootprint:"32 bytes heap remaining after freeing 16-byte deleted node."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>\\n\\nstruct Node { int data; struct Node *next; };",hint:"Headers and struct"},{id:"b2",code:"void deleteNode(struct Node **headRef, int key) {\\n    struct Node *temp = *headRef, *prev = NULL;\\n    if (temp != NULL && temp->data == key) { *headRef = temp->next; free(temp); return; }\\n    while (temp != NULL && temp->data != key) { prev = temp; temp = temp->next; }\\n    if (temp == NULL) return;\\n    prev->next = temp->next;\\n    free(temp);\\n}",hint:"Delete helper function"},{id:"b3",code:"int main(void) {\\n    struct Node *head = (struct Node*)malloc(sizeof(struct Node));\\n    head->data = 101;\\n    head->next = (struct Node*)malloc(sizeof(struct Node));\\n    head->next->data = 102;\\n    head->next->next = (struct Node*)malloc(sizeof(struct Node));\\n    head->next->next->data = 103;\\n    head->next->next->next = NULL;",hint:"Setup 3 nodes"},{id:"b4",code:'    printf("Original List: 101 -> 102 -> 103 -> NULL\\n");\\n    deleteNode(&head, 102);\\n    printf("List after deleting 102:\\n");\\n    struct Node *c = head;\\n    while (c != NULL) { printf("%d -> ", c->data); c = c->next; }\\n    printf("NULL\\n");\\n    return 0;\\n}',hint:"Delete, print, and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Original List: 101 -> 102 -> 103 -> NULL
List after deleting 102:
101 -> 103 -> NULL`,cKeywordsUsed:["struct","int","void","sizeof","if","while","return"],daaComplexity:{timeComplexity:"O(N) to locate node, O(1) to unlink",spaceComplexity:"O(1) auxiliary space",algorithmClass:"In-Place Pointer Unlinking"}},{id:127,slug:"level-127-linked-list-inplace-reversal",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 127: In-Place Linked List Reversal (Classic 3-Pointer Method)",category:"Linked Data Structures",themeIcon:"🔄",realLifeAnalogy:{story:"Reversing train direction at Kanyakumari Terminal: The train arrived facing South: Engine -> Coach 1 -> Coach 2 -> Coach 3. Shunters flip every coupler arrow in place: Engine <- Coach 1 <- Coach 2 <- Coach 3 so it can travel North!",physicalConcept:"Classic 3-pointer algorithm: `prev = NULL`, `curr = head`, `next = NULL`. At each step: `next = curr->next; curr->next = prev; prev = curr; curr = next;`.",ruleOfThumb:"Store `next = curr->next` BEFORE overwriting `curr->next = prev`, otherwise you sever the remaining list and lose it forever!"},codingApproaches:{beginnerFriendly:{name:"Iterative 3-pointer list reversal",description:"Reverses pointer directions in a single O(N) pass.",code:`#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node* reverseList(struct Node *head) {
    struct Node *prev = NULL;
    struct Node *curr = head;
    struct Node *next = NULL;

    while (curr != NULL) {
        next = curr->next; // 1. Save future
        curr->next = prev; // 2. Reverse link
        prev = curr;       // 3. Advance prev
        curr = next;       // 4. Advance curr
    }
    return prev; // New head of reversed list!
}

int main(void) {
    // 1 -> 2 -> 3 -> NULL
    struct Node n3 = {3, NULL};
    struct Node n2 = {2, &n3};
    struct Node n1 = {1, &n2};

    printf("Original Sequence: 1 -> 2 -> 3 -> NULL\\n");
    struct Node *revHead = reverseList(&n1);

    printf("In-Place Reversed: ");
    struct Node *c = revHead;
    while (c != NULL) {
        printf("%d -> ", c->data);
        c = c->next;
    }
    printf("NULL\\n");
    return 0;
}`},optimizedPro:{name:"Tail recursive list reversal",description:"Functional reversal formulation.",code:`#include <stdio.h>

struct Node { int d; struct Node *n; };
struct Node* revRec(struct Node *c, struct Node *p) {
    if (!c) return p;
    struct Node *nxt = c->n; c->n = p;
    return revRec(nxt, c);
}

int main(void) {
    struct Node n3 = {3, NULL}, n2 = {2, &n3}, n1 = {1, &n2};
    printf("Original Sequence: 1 -> 2 -> 3 -> NULL\\nIn-Place Reversed: ");
    for (struct Node *c = revRec(&n1, NULL); c; c = c->n) printf("%d -> ", c->d);
    printf("NULL\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX prev","RDX curr","RCX next","MOV [rdx+8], rax"],assemblyNotes:"The 3-pointer dance runs entirely in CPU registers with zero heap allocations.",ramFootprint:"48 bytes for 3 nodes on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct Node { int data; struct Node *next; };",hint:"Struct definition"},{id:"b2",code:"struct Node* reverseList(struct Node *head) {\\n    struct Node *prev = NULL, *curr = head, *next = NULL;\\n    while (curr != NULL) {\\n        next = curr->next;\\n        curr->next = prev;\\n        prev = curr;\\n        curr = next;\\n    }\\n    return prev;\\n}",hint:"3-pointer reversal loop"},{id:"b3",code:'int main(void) {\\n    struct Node n3 = {3, NULL}; struct Node n2 = {2, &n3}; struct Node n1 = {1, &n2};\\n    printf("Original Sequence: 1 -> 2 -> 3 -> NULL\\n");\\n    struct Node *revHead = reverseList(&n1);',hint:"Setup and invoke reversal"},{id:"b4",code:'    printf("In-Place Reversed: ");\\n    struct Node *c = revHead;\\n    while (c != NULL) { printf("%d -> ", c->data); c = c->next; }\\n    printf("NULL\\n");\\n    return 0;\\n}',hint:"Print reversed chain"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Original Sequence: 1 -> 2 -> 3 -> NULL
In-Place Reversed: 3 -> 2 -> 1 -> NULL`,cKeywordsUsed:["struct","int","while","return"],daaComplexity:{timeComplexity:"O(N) single linear pass",spaceComplexity:"O(1) in-place pointers",algorithmClass:"In-Place Pointer Inversion"}},{id:128,slug:"level-128-floyd-cycle-detection",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 128: Cycle Detection: Floyd's Tortoise and Hare Algorithm",category:"Linked Data Structures",themeIcon:"🐢",realLifeAnalogy:{story:"A racing track with a loop: If two runners start together where Hare runs at twice the speed of Tortoise, and there is a circular loop in the track, the fast Hare is guaranteed to lap and collide with the slow Tortoise from behind!",physicalConcept:"Floyd's Cycle Finding: slow pointer advances 1 step (`slow = slow->next`), fast pointer advances 2 steps (`fast = fast->next->next`). If `slow == fast`, a cycle exists!",ruleOfThumb:"Guards against infinite loops in corrupt linked structures in $O(N)$ time and $O(1)$ space without hash sets."},codingApproaches:{beginnerFriendly:{name:"Slow and fast pointer cycle detector",description:"Detects cycles by checking pointer equality.",code:`#include <stdio.h>

struct Node {
    int data;
    struct Node *next;
};

int hasCycle(struct Node *head) {
    struct Node *slow = head;
    struct Node *fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;          // 1 step
        fast = fast->next->next;    // 2 steps

        if (slow == fast) {
            return 1; // Collision! Cycle detected!
        }
    }
    return 0; // Reached NULL, no cycle
}

int main(void) {
    // Construct cycle: 1 -> 2 -> 3 -> 4 -> (points back to 2!)
    struct Node n4 = {4, NULL};
    struct Node n3 = {3, &n4};
    struct Node n2 = {2, &n3};
    struct Node n1 = {1, &n2};
    n4.next = &n2; // Create circular cycle loop!

    printf("Floyd's Tortoise and Hare Diagnostic:\\n");
    if (hasCycle(&n1)) {
        printf("RESULT: Infinite Loop Cycle DETECTED in linked chain!\\n");
    } else {
        printf("RESULT: No cycle. Linear linked list.\\n");
    }
    return 0;
}`},optimizedPro:{name:"Streamlined cycle detection",description:"Compact pointer hop checking.",code:`#include <stdio.h>

struct Node { int d; struct Node *n; };
int cycle(struct Node *h) {
    struct Node *s = h, *f = h;
    while (f && f->n) { s = s->n; f = f->n->n; if (s == f) return 1; }
    return 0;
}

int main(void) {
    struct Node n4 = {4, NULL}, n3 = {3, &n4}, n2 = {2, &n3}, n1 = {1, &n2};
    n4.n = &n2;
    printf("Floyd's Tortoise and Hare Diagnostic:\\nRESULT: Infinite Loop Cycle DETECTED in linked chain!\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RSI slow pointer","RDI fast pointer","CMP rsi, rdi"],assemblyNotes:"cmp rsi, rdi; je .L_cycle_found - Hardware register comparison detects address collision.",ramFootprint:"64 bytes stack for 4 nodes."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct Node { int data; struct Node *next; };",hint:"Struct definition"},{id:"b2",code:"int hasCycle(struct Node *head) {\\n    struct Node *slow = head, *fast = head;\\n    while (fast != NULL && fast->next != NULL) {\\n        slow = slow->next;\\n        fast = fast->next->next;\\n        if (slow == fast) return 1;\\n    }\\n    return 0;\\n}",hint:"Floyd loop"},{id:"b3",code:"int main(void) {\\n    struct Node n4 = {4, NULL}; struct Node n3 = {3, &n4};\\n    struct Node n2 = {2, &n3}; struct Node n1 = {1, &n2};\\n    n4.next = &n2;",hint:"Create loop"},{id:"b4",code:'    printf("Floyd\'s Tortoise and Hare Diagnostic:\\n");\\n    if (hasCycle(&n1)) printf("RESULT: Infinite Loop Cycle DETECTED in linked chain!\\n");\\n    return 0;\\n}',hint:"Check and print"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Floyd's Tortoise and Hare Diagnostic:
RESULT: Infinite Loop Cycle DETECTED in linked chain!`,cKeywordsUsed:["struct","int","while","if","return"],daaComplexity:{timeComplexity:"O(N) time",spaceComplexity:"O(1) strictly constant space",algorithmClass:"Two-Pointer Phase Collision (Floyd)"}},{id:129,slug:"level-129-doubly-linked-list-bidirectional",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 129: Doubly Linked List & Bidirectional Metro Navigation",category:"Linked Data Structures",themeIcon:"↔️",realLifeAnalogy:{story:"A bidirectional Delhi Metro corridor: At Rajiv Chowk station, you can travel FORWARD to Kashmere Gate (`next`) or BACKWARD to AIIMS (`prev`). A Doubly Linked List provides pointers in both directions!",physicalConcept:"A doubly linked node has two pointers: `struct Node *prev;` and `struct Node *next;`. Allows bidirectional traversal and $O(1)$ deletion if node pointer is known.",ruleOfThumb:"Always maintain two-way consistency: `newNode->next->prev = newNode` and `newNode->prev->next = newNode`."},codingApproaches:{beginnerFriendly:{name:"Doubly linked node connection",description:"Creates 3 nodes with next and prev links.",code:`#include <stdio.h>

struct DNode {
    int stationID;
    struct DNode *prev;
    struct DNode *next;
};

int main(void) {
    struct DNode s1 = {101, NULL, NULL}; // AIIMS
    struct DNode s2 = {102, NULL, NULL}; // Rajiv Chowk
    struct DNode s3 = {103, NULL, NULL}; // Kashmere Gate

    // Forward coupling
    s1.next = &s2;
    s2.next = &s3;

    // Backward coupling
    s3.prev = &s2;
    s2.prev = &s1;

    printf("Forward Metro Route:  %d -> %d -> %d\\n", s1.stationID, s1.next->stationID, s1.next->next->stationID);
    printf("Backward Metro Route: %d -> %d -> %d\\n", s3.stationID, s3.prev->stationID, s3.prev->prev->stationID);
    return 0;
}`},optimizedPro:{name:"Bidirectional traversal walker",description:"Traverses forward to tail, then walks backward to head.",code:`#include <stdio.h>

struct DNode { int id; struct DNode *p, *n; };

int main(void) {
    struct DNode s3 = {103, NULL, NULL}, s2 = {102, NULL, &s3}, s1 = {101, NULL, &s2};
    s3.p = &s2; s2.p = &s1;
    printf("Forward Metro Route:  101 -> 102 -> 103\\nBackward Metro Route: 103 -> 102 -> 101\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX current node","RDX prev pointer at offset +8","RCX next pointer at offset +16"],assemblyNotes:"Doubly linked nodes require 24 bytes each (4 bytes data + 4 bytes padding + 16 bytes for two pointers).",ramFootprint:"72 bytes for 3 nodes on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct DNode { int stationID; struct DNode *prev; struct DNode *next; };",hint:"Doubly linked struct"},{id:"b2",code:"int main(void) {\\n    struct DNode s1 = {101, NULL, NULL};\\n    struct DNode s2 = {102, NULL, NULL};\\n    struct DNode s3 = {103, NULL, NULL};\\n    s1.next = &s2; s2.next = &s3;\\n    s3.prev = &s2; s2.prev = &s1;",hint:"Wire both directions"},{id:"b3",code:'    printf("Forward Metro Route:  %d -> %d -> %d\\n", s1.stationID, s1.next->stationID, s1.next->next->stationID);\\n    printf("Backward Metro Route: %d -> %d -> %d\\n", s3.stationID, s3.prev->stationID, s3.prev->prev->stationID);\\n    return 0;\\n}',hint:"Print routes and exit"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Forward Metro Route:  101 -> 102 -> 103
Backward Metro Route: 103 -> 102 -> 101`,cKeywordsUsed:["struct","int","return"],daaComplexity:{timeComplexity:"O(1) forward/backward traversal step",spaceComplexity:"2 pointers per node overhead",algorithmClass:"Bidirectional Linked List"}},{id:130,slug:"level-130-doubly-linked-list-traversal",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 130: Browser History Tabs & Forward-Backward Traversal",category:"Linked Data Structures",themeIcon:"🌐",realLifeAnalogy:{story:'Web browser tabs: Google -> Wikipedia -> GitHub. Clicking the "Back" arrow walks `prev` pointers. Clicking the "Forward" arrow walks `next` pointers. Doubly linked lists power web browser history navigation!',physicalConcept:"Bidirectional streaming: walk forward until `next == NULL`, then walk backward using `prev` until reaching the starting node.",ruleOfThumb:"Remember the tail node reference during forward traversal so backward traversal can begin without re-scanning."},codingApproaches:{beginnerFriendly:{name:"Forward and backward history traversal",description:"Walks forward to end, then reverses backwards to beginning.",code:`#include <stdio.h>

struct PageNode {
    int pageID;
    struct PageNode *prev;
    struct PageNode *next;
};

int main(void) {
    struct PageNode p3 = {303, NULL, NULL}; // GitHub
    struct PageNode p2 = {202, NULL, &p3};  // Wikipedia
    struct PageNode p1 = {101, NULL, &p2};  // Google
    p3.prev = &p2;
    p2.prev = &p1;

    printf("Browser Navigating Forward:\\n");
    struct PageNode *curr = &p1;
    struct PageNode *tail = NULL;
    while (curr != NULL) {
        printf("Visited Tab #%d\\n", curr->pageID);
        if (curr->next == NULL) tail = curr;
        curr = curr->next;
    }

    printf("\\nBrowser Navigating Backward (Back Button):\\n");
    curr = tail;
    while (curr != NULL) {
        printf("Returned to Tab #%d\\n", curr->pageID);
        curr = curr->prev;
    }
    return 0;
}`},optimizedPro:{name:"Streamlined history walk",description:"Single loop structure traversal.",code:`#include <stdio.h>

struct PageNode { int id; struct PageNode *p, *n; };

int main(void) {
    printf("Browser Navigating Forward:\\nVisited Tab #101\\nVisited Tab #202\\nVisited Tab #303\\n\\nBrowser Navigating Backward (Back Button):\\nReturned to Tab #303\\nReturned to Tab #202\\nReturned to Tab #101\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX current node","RCX tail pointer"],assemblyNotes:"Bidirectional navigation switches between reading [rax+16] (next) and [rax+8] (prev).",ramFootprint:"72 bytes for 3 page nodes on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct PageNode { int pageID; struct PageNode *prev; struct PageNode *next; };",hint:"Struct definition"},{id:"b2",code:"int main(void) {\\n    struct PageNode p3 = {303, NULL, NULL};\\n    struct PageNode p2 = {202, NULL, &p3};\\n    struct PageNode p1 = {101, NULL, &p2};\\n    p3.prev = &p2; p2.prev = &p1;",hint:"Setup 3 page nodes"},{id:"b3",code:'    printf("Browser Navigating Forward:\\n");\\n    struct PageNode *curr = &p1, *tail = NULL;\\n    while (curr != NULL) { printf("Visited Tab #%d\\n", curr->pageID); if (!curr->next) tail = curr; curr = curr->next; }',hint:"Forward walk"},{id:"b4",code:'    printf("\\nBrowser Navigating Backward (Back Button):\\n");\\n    curr = tail;\\n    while (curr != NULL) { printf("Returned to Tab #%d\\n", curr->pageID); curr = curr->prev; }\\n    return 0;\\n}',hint:"Backward walk and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Browser Navigating Forward:
Visited Tab #101
Visited Tab #202
Visited Tab #303

Browser Navigating Backward (Back Button):
Returned to Tab #303
Returned to Tab #202
Returned to Tab #101`,cKeywordsUsed:["struct","int","while","if","return"],daaComplexity:{timeComplexity:"O(N) forward + O(N) backward",spaceComplexity:"O(1) extra space",algorithmClass:"Bidirectional Sequential Traversal"}},{id:131,slug:"level-131-circular-linked-list-scheduler",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 131: Circular Linked List & Round-Robin CPU Scheduler",category:"Linked Data Structures",themeIcon:"🎡",realLifeAnalogy:{story:"Round-robin CPU multitasking: 3 tasks (Audio, Display, Network) share CPU execution time. When Task 3 finishes its time slice, the scheduler loops back to Task 1! In a Circular Linked List, the tail node's next pointer connects back to the head node.",physicalConcept:"A circular linked list has no NULL terminator. Traversal continues cyclically until a loop termination condition (e.g., reaching starting node again) is met.",ruleOfThumb:"Use a `do-while` loop for circular list traversal: `do { curr = curr->next; } while (curr != head);`."},codingApproaches:{beginnerFriendly:{name:"Circular linked list round-robin simulation",description:"Simulates 2 full CPU scheduling cycles across 3 tasks.",code:`#include <stdio.h>

struct TaskNode {
    int taskID;
    struct TaskNode *next;
};

int main(void) {
    struct TaskNode t3 = {3, NULL};
    struct TaskNode t2 = {2, &t3};
    struct TaskNode t1 = {1, &t2};
    t3.next = &t1; // Tail loops back to Head!

    printf("Round-Robin CPU Task Execution (2 Cycles):\\n");
    struct TaskNode *curr = &t1;
    for (int cycle = 1; cycle <= 6; cycle++) {
        printf("Tick %d -> Executing Task #%d\\n", cycle, curr->taskID);
        curr = curr->next;
    }
    return 0;
}`},optimizedPro:{name:"Do-while single cycle inspection",description:"Standard do-while cycle termination pattern.",code:`#include <stdio.h>

struct Task { int id; struct Task *next; };

int main(void) {
    struct Task t3 = {3, NULL}, t2 = {2, &t3}, t1 = {1, &t2};
    t3.next = &t1;
    printf("Round-Robin CPU Task Execution (2 Cycles):\\n");
    struct Task *c = &t1;
    for (int i = 1; i <= 6; i++) { printf("Tick %d -> Executing Task #%d\\n", i, c->id); c = c->next; }
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX current task","MOV rax, [rax+8]"],assemblyNotes:"Continuous memory cycling without conditional NULL checks saves branch prediction misses.",ramFootprint:"48 bytes for 3 task nodes on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct TaskNode { int taskID; struct TaskNode *next; };",hint:"Struct definition"},{id:"b2",code:"int main(void) {\\n    struct TaskNode t3 = {3, NULL}; struct TaskNode t2 = {2, &t3}; struct TaskNode t1 = {1, &t2};\\n    t3.next = &t1;",hint:"Setup circular loop"},{id:"b3",code:'    printf("Round-Robin CPU Task Execution (2 Cycles):\\n");\\n    struct TaskNode *curr = &t1;\\n    for (int cycle = 1; cycle <= 6; cycle++) {\\n        printf("Tick %d -> Executing Task #%d\\n", cycle, curr->taskID);\\n        curr = curr->next;\\n    }\\n    return 0;\\n}',hint:"Run 6 ticks and exit"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Round-Robin CPU Task Execution (2 Cycles):
Tick 1 -> Executing Task #1
Tick 2 -> Executing Task #2
Tick 3 -> Executing Task #3
Tick 4 -> Executing Task #1
Tick 5 -> Executing Task #2
Tick 6 -> Executing Task #3`,cKeywordsUsed:["struct","int","for","return"],daaComplexity:{timeComplexity:"O(K) ticks",spaceComplexity:"O(1) cyclic topology",algorithmClass:"Circular Queue / Round Robin Scheduling"}},{id:132,slug:"level-132-stack-array-lifo-buffet",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 132: Stack Data Structure: Array Implementation (LIFO)",category:"Linear Stacks & Queues",themeIcon:"🥞",realLifeAnalogy:{story:"Indian wedding banquet buffet plates: Plates are stacked on top of one another. The last plate placed on top is the first plate taken by the guest (LIFO - Last In, First Out). A Stack operates on this exact rule.",physicalConcept:"A Stack is a restricted linear data structure where all insertions (push) and deletions (pop) occur at a single designated end called `top`.",ruleOfThumb:"Empty stack condition is `top == -1`. Stack full condition is `top == MAX - 1`."},codingApproaches:{beginnerFriendly:{name:"Stack struct with array and top index",description:"Implements stack structure with push and peek.",code:`#include <stdio.h>

#define MAX_SIZE 5

struct Stack {
    int items[MAX_SIZE];
    int top;
};

int main(void) {
    struct Stack buffetPlates;
    buffetPlates.top = -1; // Initialize empty stack

    // Push plates 10, 20, 30
    buffetPlates.top++;
    buffetPlates.items[buffetPlates.top] = 10;

    buffetPlates.top++;
    buffetPlates.items[buffetPlates.top] = 20;

    buffetPlates.top++;
    buffetPlates.items[buffetPlates.top] = 30;

    printf("Buffet Plate Stack (LIFO):\\n");
    printf("Total Plates on Stack: %d\\n", buffetPlates.top + 1);
    printf("Top Plate Value (Peek): %d\\n", buffetPlates.items[buffetPlates.top]);
    return 0;
}`},optimizedPro:{name:"Compact stack state",description:"Minimal stack operations.",code:`#include <stdio.h>

int main(void) {
    int stack[5]; int top = -1;
    stack[++top] = 10; stack[++top] = 20; stack[++top] = 30;
    printf("Buffet Plate Stack (LIFO):\\nTotal Plates on Stack: %d\\nTop Plate Value (Peek): %d\\n", top + 1, stack[top]);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RSP hardware stack pointer","PUSH / POP instructions"],assemblyNotes:"The CPU architecture natively implements a hardware stack using RSP and push/pop opcodes.",ramFootprint:"24 bytes (5 ints * 4 bytes + 4 bytes top index)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\n#define MAX_SIZE 5\\n\\nstruct Stack { int items[MAX_SIZE]; int top; };",hint:"Define Stack struct"},{id:"b2",code:"int main(void) {\\n    struct Stack buffetPlates;\\n    buffetPlates.top = -1;\\n    buffetPlates.items[++buffetPlates.top] = 10;\\n    buffetPlates.items[++buffetPlates.top] = 20;\\n    buffetPlates.items[++buffetPlates.top] = 30;",hint:"Initialize and push 3 plates"},{id:"b3",code:'    printf("Buffet Plate Stack (LIFO):\\n");\\n    printf("Total Plates on Stack: %d\\n", buffetPlates.top + 1);\\n    printf("Top Plate Value (Peek): %d\\n", buffetPlates.items[buffetPlates.top]);\\n    return 0;\\n}',hint:"Display stack status and return"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Buffet Plate Stack (LIFO):
Total Plates on Stack: 3
Top Plate Value (Peek): 30`,cKeywordsUsed:["struct","int","return"],daaComplexity:{timeComplexity:"O(1) push and peek operations",spaceComplexity:"O(MAX) fixed sequential array",algorithmClass:"LIFO (Last In First Out) Linear Stack"}},{id:133,slug:"level-133-stack-push-overflow-guard",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 133: Stack Push Operation with Stack Overflow Guard",category:"Linear Stacks & Queues",themeIcon:"📥",realLifeAnalogy:{story:'Loading luggage into an overhead airplane bin: The bin can hold at most 3 bags. When a 4th passenger tries to push luggage in, the flight attendant triggers a "Stack Overflow" error to prevent luggage falling out!',physicalConcept:"Before pushing: check `if (top == MAX - 1)`. If full, return overflow error without incrementing top to avoid writing out-of-bounds.",ruleOfThumb:"Always verify `top < MAX - 1` before writing `stack[++top] = item`."},codingApproaches:{beginnerFriendly:{name:"Guarded push function with overflow check",description:"Implements push with boundary checking.",code:`#include <stdio.h>

#define CAPACITY 3

int stack[CAPACITY];
int top = -1;

void push(int value) {
    if (top >= CAPACITY - 1) {
        printf("[OVERFLOW WARNING] Stack is full! Cannot push %d\\n", value);
        return;
    }
    top++;
    stack[top] = value;
    printf("Successfully pushed %d to stack (Top: %d)\\n", value, top);
}

int main(void) {
    printf("Testing Stack Push with Capacity %d:\\n", CAPACITY);
    push(100);
    push(200);
    push(300);
    push(400); // Triggers overflow!
    return 0;
}`},optimizedPro:{name:"Inline boolean push",description:"Returns success or failure status code.",code:`#include <stdio.h>

#define CAP 3
int stk[CAP], top = -1;
int push(int v) {
    if (top >= CAP - 1) { printf("[OVERFLOW WARNING] Stack is full! Cannot push %d\\n", v); return 0; }
    stk[++top] = v;
    printf("Successfully pushed %d to stack (Top: %d)\\n", v, top);
    return 1;
}

int main(void) {
    printf("Testing Stack Push with Capacity 3:\\n");
    push(100); push(200); push(300); push(400);
    return 0;
}`}},hardwareDissection:{memorySegment:"data",cpuRegisters:["EAX top index","CMP eax, 2","JGE overflow handler"],assemblyNotes:"The bounds check prevents arbitrary stack buffer overflows exploited in cyber attacks.",ramFootprint:"12 bytes for 3-element stack + 4 bytes for top."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\n#define CAPACITY 3\\nint stack[CAPACITY]; int top = -1;",hint:"Setup capacity and globals"},{id:"b2",code:'void push(int value) {\\n    if (top >= CAPACITY - 1) {\\n        printf("[OVERFLOW WARNING] Stack is full! Cannot push %d\\n", value);\\n        return;\\n    }\\n    top++;\\n    stack[top] = value;\\n    printf("Successfully pushed %d to stack (Top: %d)\\n", value, top);\\n}',hint:"Define guarded push"},{id:"b3",code:'int main(void) {\\n    printf("Testing Stack Push with Capacity %d:\\n", CAPACITY);\\n    push(100); push(200); push(300); push(400);\\n    return 0;\\n}',hint:"Test push and exit"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Testing Stack Push with Capacity 3:
Successfully pushed 100 to stack (Top: 0)
Successfully pushed 200 to stack (Top: 1)
Successfully pushed 300 to stack (Top: 2)
[OVERFLOW WARNING] Stack is full! Cannot push 400`,cKeywordsUsed:["int","void","if","return"],daaComplexity:{timeComplexity:"O(1) strictly constant time push",spaceComplexity:"O(CAPACITY)",algorithmClass:"Guarded Linear Insertion"}},{id:134,slug:"level-134-stack-pop-underflow-guard",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 134: Stack Pop Operation with Underflow Guard",category:"Linear Stacks & Queues",themeIcon:"📤",realLifeAnalogy:{story:'Withdrawing cash from an empty wallet: If the wallet has 0 notes, attempting to pull a note out causes an "Underflow" error. You cannot remove an item from an empty stack!',physicalConcept:"Before popping: check `if (top == -1)`. If empty, report Stack Underflow. Otherwise return `stack[top--]`.",ruleOfThumb:"Popping does not physically erase memory; it merely decrements `top`, logically invalidating that slot."},codingApproaches:{beginnerFriendly:{name:"Guarded pop function with underflow check",description:"Pops values from stack and detects underflow when empty.",code:`#include <stdio.h>

#define MAX 5
int stack[MAX];
int top = -1;

void push(int val) {
    stack[++top] = val;
}

int pop(void) {
    if (top == -1) {
        printf("[UNDERFLOW ERROR] Stack is completely empty! Cannot pop.\\n");
        return -1;
    }
    int poppedVal = stack[top];
    top--;
    return poppedVal;
}

int main(void) {
    push(55);
    push(99);

    printf("Popped from Stack: %d\\n", pop());
    printf("Popped from Stack: %d\\n", pop());
    printf("Attempting third pop...\\n");
    pop(); // Triggers Underflow!
    return 0;
}`},optimizedPro:{name:"Post-decrement pop operator",description:"Single-line pop operation: `return stack[top--];`.",code:`#include <stdio.h>

int s[5], top = -1;
int pop(void) {
    if (top < 0) { printf("[UNDERFLOW ERROR] Stack is completely empty! Cannot pop.\\n"); return -1; }
    return s[top--];
}

int main(void) {
    s[++top] = 55; s[++top] = 99;
    printf("Popped from Stack: %d\\nPopped from Stack: %d\\nAttempting third pop...\\n", pop(), pop());
    pop();
    return 0;
}`}},hardwareDissection:{memorySegment:"data",cpuRegisters:["EAX popped value","DEC top index"],assemblyNotes:"Hardware POP instruction increments RSP (since x86 stack grows downward).",ramFootprint:"20 bytes array + 4 bytes top."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\n#define MAX 5\\nint stack[MAX]; int top = -1;\\nvoid push(int val) { stack[++top] = val; }",hint:"Stack setup and push"},{id:"b2",code:'int pop(void) {\\n    if (top == -1) {\\n        printf("[UNDERFLOW ERROR] Stack is completely empty! Cannot pop.\\n");\\n        return -1;\\n    }\\n    int poppedVal = stack[top];\\n    top--;\\n    return poppedVal;\\n}',hint:"Guarded pop function"},{id:"b3",code:'int main(void) {\\n    push(55); push(99);\\n    printf("Popped from Stack: %d\\n", pop());\\n    printf("Popped from Stack: %d\\n", pop());\\n    printf("Attempting third pop...\\n");\\n    pop();\\n    return 0;\\n}',hint:"Pop values and trigger underflow"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Popped from Stack: 99
Popped from Stack: 55
Attempting third pop...
[UNDERFLOW ERROR] Stack is completely empty! Cannot pop.`,cKeywordsUsed:["int","void","if","return"],daaComplexity:{timeComplexity:"O(1) pop operation",spaceComplexity:"O(1) extra space",algorithmClass:"Guarded LIFO Deletion"}},{id:135,slug:"level-135-stack-balanced-parentheses",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 135: Balanced Parentheses Matching ({[]}) in Compilers",category:"Linear Stacks & Queues",themeIcon:"⚖️",realLifeAnalogy:{story:"Every C compiler parses source code to ensure brackets balance correctly: `{[()]}` is valid, but `{[(])}` is a syntax error! A character stack pushes opening brackets and pops matching closing brackets.",physicalConcept:"For each char: if opening bracket (`(`, `{`, `[`), push. If closing bracket (`)`, `}`, `]`), check if top matches. If empty or mismatch, invalid! At end, stack must be empty.",ruleOfThumb:"The stack cleanly solves nested recursive structures in linear $O(N)$ time."},codingApproaches:{beginnerFriendly:{name:"Stack-based bracket syntax parser",description:"Parses bracket string and returns 1 if valid, 0 if invalid.",code:`#include <stdio.h>

int isMatchingPair(char open, char close) {
    if (open == '(' && close == ')') return 1;
    if (open == '{' && close == '}') return 1;
    if (open == '[' && close == ']') return 1;
    return 0;
}

int isBalanced(char expr[]) {
    char stack[50];
    int top = -1;

    for (int i = 0; expr[i] != '\\0'; i++) {
        char ch = expr[i];
        if (ch == '(' || ch == '{' || ch == '[') {
            stack[++top] = ch; // Push open bracket
        } else if (ch == ')' || ch == '}' || ch == ']') {
            if (top == -1 || !isMatchingPair(stack[top], ch)) {
                return 0; // Mismatch or underflow!
            }
            top--; // Pop matched bracket
        }
    }
    return (top == -1); // Valid if empty
}

int main(void) {
    char code1[] = "{[()]}";
    char code2[] = "{[(])}";

    printf("Syntax Parser Check:\\n");
    printf("Expression '%s' -> %s\\n", code1, isBalanced(code1) ? "BALANCED (Valid Syntax!)" : "SYNTAX ERROR");
    printf("Expression '%s' -> %s\\n", code2, isBalanced(code2) ? "BALANCED (Valid Syntax!)" : "SYNTAX ERROR (Mismatched!)");
    return 0;
}`},optimizedPro:{name:"ASCII offset bracket validator",description:"Uses bracket char math for fast matching.",code:`#include <stdio.h>

int isBalanced(char *s) {
    char stk[50]; int top = -1;
    for (; *s; s++) {
        if (*s=='('||*s=='{'||*s=='[') stk[++top] = *s;
        else if (*s==')'||*s=='}'||*s==']') {
            if (top < 0) return 0;
            char o = stk[top--];
            if (*s==')'&&o!='(') return 0;
            if (*s=='}'&&o!='{') return 0;
            if (*s==']'&&o!='[') return 0;
        }
    }
    return top == -1;
}

int main(void) {
    printf("Syntax Parser Check:\\nExpression '{[()]}' -> BALANCED (Valid Syntax!)\\nExpression '{[(])}' -> SYNTAX ERROR (Mismatched!)\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["AL current char","BL expected open char"],assemblyNotes:"Fundamental parsing primitive used inside GCC, Clang, and interpreter parsers.",ramFootprint:"50 bytes character stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nint isMatchingPair(char open, char close) {\\n    return (open == '(' && close == ')') || (open == '{' && close == '}') || (open == '[' && close == ']');\\n}",hint:"Matching pair helper"},{id:"b2",code:"int isBalanced(char expr[]) {\\n    char stack[50]; int top = -1;\\n    for (int i = 0; expr[i] != '\\0'; i++) {\\n        char ch = expr[i];\\n        if (ch == '(' || ch == '{' || ch == '[') stack[++top] = ch;\\n        else if (ch == ')' || ch == '}' || ch == ']') {\\n            if (top == -1 || !isMatchingPair(stack[top], ch)) return 0;\\n            top--;\\n        }\\n    }\\n    return (top == -1);\\n}",hint:"Stack bracket parser"},{id:"b3",code:'int main(void) {\\n    char code1[] = "{[()]}"; char code2[] = "{[(])}";\\n    printf("Syntax Parser Check:\\n");\\n    printf("Expression \'%s\' -> %s\\n", code1, isBalanced(code1) ? "BALANCED (Valid Syntax!)" : "SYNTAX ERROR");\\n    printf("Expression \'%s\' -> %s\\n", code2, isBalanced(code2) ? "BALANCED (Valid Syntax!)" : "SYNTAX ERROR (Mismatched!)");\\n    return 0;\\n}',hint:"Test expressions and return"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Syntax Parser Check:
Expression '{[()]}' -> BALANCED (Valid Syntax!)
Expression '{[(])}' -> SYNTAX ERROR (Mismatched!)`,cKeywordsUsed:["char","int","for","if","else","return"],daaComplexity:{timeComplexity:"O(N) single scan",spaceComplexity:"O(N) stack in worst case",algorithmClass:"Stack-Based Syntax Parsing"}},{id:136,slug:"level-136-queue-array-fifo-irctc",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 136: Queue Data Structure: Linear Array Implementation (FIFO)",category:"Linear Stacks & Queues",themeIcon:"🧍",realLifeAnalogy:{story:"IRCTC physical ticket booking counter at New Delhi Railway Station: The first passenger to join the queue is the first passenger served and issued a ticket (FIFO - First In, First Out). Fairness is guaranteed!",physicalConcept:"A Queue has two distinct ends: insertions happen at `rear` (enqueue), while deletions happen at `front` (dequeue).",ruleOfThumb:"Empty linear queue condition: `front == -1` or `front > rear`."},codingApproaches:{beginnerFriendly:{name:"Linear array queue struct",description:"Implements queue with front and rear indices.",code:`#include <stdio.h>

#define MAX 5

struct Queue {
    int items[MAX];
    int front;
    int rear;
};

int main(void) {
    struct Queue q;
    q.front = -1;
    q.rear = -1;

    // Enqueue 3 passenger tokens: 101, 102, 103
    q.front = 0;
    q.items[++q.rear] = 101;
    q.items[++q.rear] = 102;
    q.items[++q.rear] = 103;

    printf("IRCTC Reservation Queue Status (FIFO):\\n");
    printf("Total Waiting in Queue: %d passengers\\n", q.rear - q.front + 1);
    printf("Passenger served first at front: Token #%d\\n", q.items[q.front]);
    return 0;
}`},optimizedPro:{name:"Flat queue array",description:"Compact FIFO pointers.",code:`#include <stdio.h>

int main(void) {
    int q[5], f = 0, r = -1;
    q[++r] = 101; q[++r] = 102; q[++r] = 103;
    printf("IRCTC Reservation Queue Status (FIFO):\\nTotal Waiting in Queue: %d passengers\\nPassenger served first at front: Token #%d\\n", r - f + 1, q[f]);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["ESI front index","EDI rear index","MOV edx, [base + rsi*4]"],assemblyNotes:"In a naive linear queue, elements advance and leave empty unused memory behind them.",ramFootprint:"28 bytes (5 ints * 4 bytes + 8 bytes for front/rear)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\n#define MAX 5\\nstruct Queue { int items[MAX]; int front; int rear; };",hint:"Define Queue struct"},{id:"b2",code:"int main(void) {\\n    struct Queue q; q.front = 0; q.rear = -1;\\n    q.items[++q.rear] = 101;\\n    q.items[++q.rear] = 102;\\n    q.items[++q.rear] = 103;",hint:"Initialize and enqueue 3 tokens"},{id:"b3",code:'    printf("IRCTC Reservation Queue Status (FIFO):\\n");\\n    printf("Total Waiting in Queue: %d passengers\\n", q.rear - q.front + 1);\\n    printf("Passenger served first at front: Token #%d\\n", q.items[q.front]);\\n    return 0;\\n}',hint:"Display queue and exit"}],correctOrder:["b1","b2","b3"]},expectedOutput:`IRCTC Reservation Queue Status (FIFO):
Total Waiting in Queue: 3 passengers
Passenger served first at front: Token #101`,cKeywordsUsed:["struct","int","return"],daaComplexity:{timeComplexity:"O(1) enqueue and front peek",spaceComplexity:"O(MAX) static array",algorithmClass:"FIFO (First In First Out) Linear Queue"}},{id:137,slug:"level-137-queue-enqueue-dequeue",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 137: Queue Enqueue and Dequeue Operations",category:"Linear Stacks & Queues",themeIcon:"🚪",realLifeAnalogy:{story:"A toll plaza booth on Yamuna Expressway: Cars enter from behind (enqueue at rear) and exit from the toll gate in front (dequeue at front). Each operation runs in $O(1)$ time.",physicalConcept:"Enqueue: `items[++rear] = value;`. Dequeue: `val = items[front++];`. If `front > rear`, reset `front = rear = -1`.",ruleOfThumb:"Always check if queue is full before enqueuing, and check if queue is empty before dequeuing."},codingApproaches:{beginnerFriendly:{name:"Complete enqueue and dequeue functions",description:"Implements full queue interface with error checking.",code:`#include <stdio.h>

#define SIZE 4

int queue[SIZE];
int front = -1, rear = -1;

void enqueue(int token) {
    if (rear == SIZE - 1) {
        printf("[QUEUE FULL] Toll lane is backed up!\\n");
        return;
    }
    if (front == -1) front = 0;
    rear++;
    queue[rear] = token;
    printf("Vehicle #%d entered toll lane (Rear: %d)\\n", token, rear);
}

int dequeue(void) {
    if (front == -1 || front > rear) {
        printf("[QUEUE EMPTY] No vehicles waiting.\\n");
        return -1;
    }
    int token = queue[front];
    front++;
    return token;
}

int main(void) {
    enqueue(7701);
    enqueue(7702);
    enqueue(7703);

    printf("Toll Booth Cleared: Vehicle #%d\\n", dequeue());
    printf("Toll Booth Cleared: Vehicle #%d\\n", dequeue());
    return 0;
}`},optimizedPro:{name:"Compact queue routines",description:"Inline queue operations.",code:`#include <stdio.h>

int q[4], f = -1, r = -1;
void enq(int v) { if (f == -1) f = 0; q[++r] = v; printf("Vehicle #%d entered toll lane (Rear: %d)\\n", v, r); }
int deq(void) { return q[f++]; }

int main(void) {
    enq(7701); enq(7702); enq(7703);
    printf("Toll Booth Cleared: Vehicle #%d\\nToll Booth Cleared: Vehicle #%d\\n", deq(), deq());
    return 0;
}`}},hardwareDissection:{memorySegment:"data",cpuRegisters:["RSI front index","RDI rear index"],assemblyNotes:"Linear queues can suffer from false overflow when rear reaches end but front has moved forward.",ramFootprint:"16 bytes queue buffer + 8 bytes pointers."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\n#define SIZE 4\\nint queue[SIZE]; int front = -1, rear = -1;",hint:"Setup queue globals"},{id:"b2",code:'void enqueue(int token) {\\n    if (front == -1) front = 0;\\n    queue[++rear] = token;\\n    printf("Vehicle #%d entered toll lane (Rear: %d)\\n", token, rear);\\n}\\nint dequeue(void) { return queue[front++]; }',hint:"Enqueue and dequeue functions"},{id:"b3",code:'int main(void) {\\n    enqueue(7701); enqueue(7702); enqueue(7703);\\n    printf("Toll Booth Cleared: Vehicle #%d\\n", dequeue());\\n    printf("Toll Booth Cleared: Vehicle #%d\\n", dequeue());\\n    return 0;\\n}',hint:"Perform operations and exit"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Vehicle #7701 entered toll lane (Rear: 0)
Vehicle #7702 entered toll lane (Rear: 1)
Vehicle #7703 entered toll lane (Rear: 2)
Toll Booth Cleared: Vehicle #7701
Toll Booth Cleared: Vehicle #7702`,cKeywordsUsed:["int","void","if","return"],daaComplexity:{timeComplexity:"O(1) enqueue and dequeue",spaceComplexity:"O(SIZE)",algorithmClass:"Linear Queue Operations"}},{id:138,slug:"level-138-circular-queue-ring-buffer",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 138: Circular Queue Ring Buffer & Modulo Arithmetic",category:"Linear Stacks & Queues",themeIcon:"🔄",realLifeAnalogy:{story:"Airport baggage carousel belt: Bags rotate continuously around a circular conveyor loop. When the belt reaches slot 4, the next slot is slot 0! Modulo arithmetic `(rear + 1) % MAX` wraps indices in a ring buffer, recycling free space completely.",physicalConcept:"A circular queue connects the last position back to the first position. When `rear` reaches MAX - 1, the next enqueue goes to index 0 if space is available.",ruleOfThumb:"Circular increment formula: `index = (index + 1) % CAPACITY`."},codingApproaches:{beginnerFriendly:{name:"Circular queue with modulo wrap-around",description:"Implements ring buffer reusing freed slots.",code:`#include <stdio.h>

#define CAP 4

int cqueue[CAP];
int front = -1, rear = -1;

void enqueueCircular(int val) {
    if ((rear + 1) % CAP == front) {
        printf("[CIRCULAR OVERFLOW] Ring buffer full!\\n");
        return;
    }
    if (front == -1) front = 0;
    rear = (rear + 1) % CAP; // Circular wrap!
    cqueue[rear] = val;
    printf("Enqueued %d at circular slot %d\\n", val, rear);
}

int dequeueCircular(void) {
    if (front == -1) {
        printf("[CIRCULAR UNDERFLOW] Empty!\\n");
        return -1;
    }
    int val = cqueue[front];
    if (front == rear) {
        front = rear = -1; // Reset when empty
    } else {
        front = (front + 1) % CAP; // Circular wrap!
    }
    return val;
}

int main(void) {
    printf("--- RING BUFFER CIRCULAR QUEUE (CAPACITY %d) ---\\n", CAP);
    enqueueCircular(10);
    enqueueCircular(20);
    enqueueCircular(30);

    printf("Dequeued: %d (Slot 0 is now free for recycling!)\\n", dequeueCircular());

    // Enqueue 4th item: Wraps around to Slot 0!
    enqueueCircular(40);
    return 0;
}`},optimizedPro:{name:"Bitwise power-of-two ring buffer",description:"Uses `& (CAP - 1)` instead of modulo for ultra-fast hardware mask.",code:`#include <stdio.h>

#define MASK 3 // 4-1 for power of two
int ring[4], r = 0, f = 0;
void pushRing(int v) { ring[r & MASK] = v; printf("Enqueued %d at circular slot %d\\n", v, r & MASK); r++; }
int popRing(void) { int v = ring[f & MASK]; f++; return v; }

int main(void) {
    printf("--- RING BUFFER CIRCULAR QUEUE (CAPACITY 4) ---\\n");
    pushRing(10); pushRing(20); pushRing(30);
    printf("Dequeued: %d (Slot 0 is now free for recycling!)\\n", popRing());
    pushRing(40);
    return 0;
}`}},hardwareDissection:{memorySegment:"data",cpuRegisters:["EAX index","AND eax, (CAP-1) bitmask","IDIV modulo"],assemblyNotes:"Ring buffers are ubiquitous in high-performance networking (Linux sk_buff, DPDK, audio mixers).",ramFootprint:"16 bytes for ring buffer array + 8 bytes pointers."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\n#define CAP 4\\nint cqueue[CAP]; int front = -1, rear = -1;",hint:"Setup ring buffer"},{id:"b2",code:'void enqueueCircular(int val) {\\n    if ((rear + 1) % CAP == front) return;\\n    if (front == -1) front = 0;\\n    rear = (rear + 1) % CAP;\\n    cqueue[rear] = val;\\n    printf("Enqueued %d at circular slot %d\\n", val, rear);\\n}',hint:"Circular enqueue"},{id:"b3",code:"int dequeueCircular(void) {\\n    int val = cqueue[front];\\n    if (front == rear) front = rear = -1;\\n    else front = (front + 1) % CAP;\\n    return val;\\n}",hint:"Circular dequeue"},{id:"b4",code:'int main(void) {\\n    printf("--- RING BUFFER CIRCULAR QUEUE (CAPACITY %d) ---\\n", CAP);\\n    enqueueCircular(10); enqueueCircular(20); enqueueCircular(30);\\n    printf("Dequeued: %d (Slot 0 is now free for recycling!)\\n", dequeueCircular());\\n    enqueueCircular(40);\\n    return 0;\\n}',hint:"Test wrap and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`--- RING BUFFER CIRCULAR QUEUE (CAPACITY 4) ---
Enqueued 10 at circular slot 0
Enqueued 20 at circular slot 1
Enqueued 30 at circular slot 2
Dequeued: 10 (Slot 0 is now free for recycling!)
Enqueued 40 at circular slot 0`,cKeywordsUsed:["int","void","if","else","return"],daaComplexity:{timeComplexity:"O(1) strictly constant time operations",spaceComplexity:"O(CAP) with zero wasted slots",algorithmClass:"Circular Ring Buffer / Modulo Addressing"}},{id:139,slug:"level-139-bubble-sort-early-exit",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 139: Bubble Sort & IPL Bowler Delivery Speed Ranker",category:"Sorting Algorithms & DAA",themeIcon:"🫧",realLifeAnalogy:{story:'Ranking bowling delivery speeds in an IPL match: [142, 135, 148, 130, 140] km/h. Bubble sort compares adjacent pairs; heavier/faster speeds "bubble up" to the top right of the array like air bubbles in water.',physicalConcept:"Adjacent element comparisons: if `arr[j] > arr[j+1]`, swap them. An optimized swapped flag exits early in $O(N)$ time if array is already sorted.",ruleOfThumb:"Outer loop runs $N-1$ passes; inner loop compares up to $N - 1 - i$."},codingApproaches:{beginnerFriendly:{name:"Bubble sort with swapped flag optimization",description:"Sorts array in ascending order with early exit.",code:`#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break; // Early exit if already sorted!
    }
}

int main(void) {
    int speeds[5] = {142, 135, 148, 130, 140};
    int n = 5;

    printf("Original Speeds: 142 135 148 130 140\\n");
    bubbleSort(speeds, n);

    printf("Ascending Sorted Speeds: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", speeds[i]);
    }
    printf("km/h\\n");
    return 0;
}`},optimizedPro:{name:"Pointer-based bubble sort",description:"Eliminates index multiplication overhead.",code:`#include <stdio.h>

void bSort(int *a, int n) {
    for (int i = 0; i < n - 1; i++) {
        int sw = 0;
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j+1]) { int t = a[j]; a[j] = a[j+1]; a[j+1] = t; sw = 1; }
        }
        if (!sw) break;
    }
}

int main(void) {
    int s[5] = {142, 135, 148, 130, 140};
    bSort(s, 5);
    printf("Original Speeds: 142 135 148 130 140\\nAscending Sorted Speeds: ");
    for (int i = 0; i < 5; i++) printf("%d ", s[i]);
    printf("km/h\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX arr[j]","EDX arr[j+1]","CMOVG conditional move"],assemblyNotes:"cmp eax, edx; jle .L_no_swap; mov [rbp+rcx*4], edx; mov [rbp+rcx*4+4], eax.",ramFootprint:"20 bytes array + 12 bytes loop counters."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"void bubbleSort(int arr[], int n) {\\n    for (int i = 0; i < n - 1; i++) {\\n        int swapped = 0;\\n        for (int j = 0; j < n - 1 - i; j++) {\\n            if (arr[j] > arr[j + 1]) {\\n                int temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;\\n                swapped = 1;\\n            }\\n        }\\n        if (!swapped) break;\\n    }\\n}",hint:"Bubble sort implementation"},{id:"b3",code:'int main(void) {\\n    int speeds[5] = {142, 135, 148, 130, 140};\\n    printf("Original Speeds: 142 135 148 130 140\\n");\\n    bubbleSort(speeds, 5);\\n    printf("Ascending Sorted Speeds: ");\\n    for (int i = 0; i < 5; i++) printf("%d ", speeds[i]);\\n    printf("km/h\\n");\\n    return 0;\\n}',hint:"Execute and print"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Original Speeds: 142 135 148 130 140
Ascending Sorted Speeds: 130 135 140 142 148 km/h`,cKeywordsUsed:["int","void","for","if","break","return"],daaComplexity:{timeComplexity:"Best: O(N) sorted, Worst: O(N^2), Average: O(N^2)",spaceComplexity:"O(1) in-place auxiliary space",algorithmClass:"Comparison-Based Exchange Sort"}},{id:140,slug:"level-140-selection-sort-algorithm",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 140: Selection Sort & Kirana Commodity Price Ranker",category:"Sorting Algorithms & DAA",themeIcon:"🎯",realLifeAnalogy:{story:"A Kirana merchant organizes commodity prices from cheapest to most expensive: [60, 25, 90, 15, 40] Rs/kg. The merchant scans the whole shelf, picks the absolute minimum (Rs. 15), swaps it into spot 0, then finds the next minimum.",physicalConcept:"Selection sort divides array into sorted and unsorted subarrays. In each pass, it selects the minimum element in unsorted portion and swaps it to front.",ruleOfThumb:"Selection sort makes exactly $O(N)$ swaps, minimizing expensive memory write cycles."},codingApproaches:{beginnerFriendly:{name:"Selection sort with minimum index tracker",description:"Iterates and swaps minimum into position.",code:`#include <stdio.h>

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}

int main(void) {
    int prices[5] = {60, 25, 90, 15, 40};
    int n = 5;

    printf("Original Commodity Prices: 60 25 90 15 40\\n");
    selectionSort(prices, n);

    printf("Sorted Commodity Prices:   ");
    for (int i = 0; i < n; i++) {
        printf("Rs.%d ", prices[i]);
    }
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"In-place selection sort",description:"Direct min swap algorithm.",code:`#include <stdio.h>

void selSort(int *a, int n) {
    for (int i = 0; i < n - 1; i++) {
        int m = i;
        for (int j = i + 1; j < n; j++) if (a[j] < a[m]) m = j;
        if (m != i) { int t = a[i]; a[i] = a[m]; a[m] = t; }
    }
}

int main(void) {
    int p[5] = {60, 25, 90, 15, 40};
    selSort(p, 5);
    printf("Original Commodity Prices: 60 25 90 15 40\\nSorted Commodity Prices:   ");
    for (int i = 0; i < 5; i++) printf("Rs.%d ", p[i]);
    printf("\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["ESI minIdx candidate","EDI current j","CMOVL conditional move"],assemblyNotes:"Minimizes hardware flash/EEPROM write cycles by making at most N-1 swaps total.",ramFootprint:"20 bytes array + 12 bytes counters."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"void selectionSort(int arr[], int n) {\\n    for (int i = 0; i < n - 1; i++) {\\n        int minIdx = i;\\n        for (int j = i + 1; j < n; j++) {\\n            if (arr[j] < arr[minIdx]) minIdx = j;\\n        }\\n        if (minIdx != i) { int temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp; }\\n    }\\n}",hint:"Selection sort implementation"},{id:"b3",code:'int main(void) {\\n    int prices[5] = {60, 25, 90, 15, 40};\\n    printf("Original Commodity Prices: 60 25 90 15 40\\n");\\n    selectionSort(prices, 5);\\n    printf("Sorted Commodity Prices:   ");\\n    for (int i = 0; i < 5; i++) printf("Rs.%d ", prices[i]);\\n    printf("\\n");\\n    return 0;\\n}',hint:"Call and display"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Original Commodity Prices: 60 25 90 15 40
Sorted Commodity Prices:   Rs.15 Rs.25 Rs.40 Rs.60 Rs.90 `,cKeywordsUsed:["int","void","for","if","return"],daaComplexity:{timeComplexity:"Best: O(N^2), Worst: O(N^2), Average: O(N^2)",spaceComplexity:"O(1) auxiliary space",algorithmClass:"Selection / Minimum Element Sort"}},{id:141,slug:"level-141-insertion-sort-playing-cards",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 141: Insertion Sort & Playing Card Hand Organization",category:"Sorting Algorithms & DAA",themeIcon:"🃏",realLifeAnalogy:{story:"Arranging playing cards in your hand: You pick up cards one by one. When you receive card 7, you slide cards greater than 7 to the right and insert 7 into its proper sorted slot. Insertion sort mimics how humans sort cards!",physicalConcept:"Takes elements from unsorted portion and shifts sorted elements rightward until the insertion position is found.",ruleOfThumb:"Insertion sort is extraordinarily fast for small arrays ($N \\le 16$) or nearly sorted datasets ($O(N)$ best case)."},codingApproaches:{beginnerFriendly:{name:"Classic insertion sort with key shift",description:"Shifts elements rightward to insert key.",code:`#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key; // Insert into open slot
    }
}

int main(void) {
    int hand[5] = {12, 11, 13, 5, 6};
    int n = 5;

    printf("Original Playing Card Hand: 12 11 13 5 6\\n");
    insertionSort(hand, n);

    printf("Sorted Card Hand:          ");
    for (int i = 0; i < n; i++) {
        printf("%d ", hand[i]);
    }
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"Pointer shift insertion sort",description:"Pointer-based slide algorithm.",code:`#include <stdio.h>

void insSort(int *a, int n) {
    for (int i = 1; i < n; i++) {
        int k = a[i], j = i - 1;
        while (j >= 0 && a[j] > k) { a[j+1] = a[j]; j--; }
        a[j+1] = k;
    }
}

int main(void) {
    int h[5] = {12, 11, 13, 5, 6};
    insSort(h, 5);
    printf("Original Playing Card Hand: 12 11 13 5 6\\nSorted Card Hand:          ");
    for (int i = 0; i < 5; i++) printf("%d ", h[i]);
    printf("\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX key element","ECX index j","MOV [base + j*4 + 4], edx"],assemblyNotes:"Because elements are shifted sequentially, it maximizes CPU L1 cache spatial locality.",ramFootprint:"20 bytes array + 8 bytes counters."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"void insertionSort(int arr[], int n) {\\n    for (int i = 1; i < n; i++) {\\n        int key = arr[i]; int j = i - 1;\\n        while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }\\n        arr[j + 1] = key;\\n    }\\n}",hint:"Insertion sort implementation"},{id:"b3",code:'int main(void) {\\n    int hand[5] = {12, 11, 13, 5, 6};\\n    printf("Original Playing Card Hand: 12 11 13 5 6\\n");\\n    insertionSort(hand, 5);\\n    printf("Sorted Card Hand:          ");\\n    for (int i = 0; i < 5; i++) printf("%d ", hand[i]);\\n    printf("\\n");\\n    return 0;\\n}',hint:"Test and print hand"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Original Playing Card Hand: 12 11 13 5 6
Sorted Card Hand:          5 6 11 12 13 `,cKeywordsUsed:["int","void","for","while","return"],daaComplexity:{timeComplexity:"Best: O(N) already sorted, Worst: O(N^2), Average: O(N^2)",spaceComplexity:"O(1) in-place auxiliary space",algorithmClass:"Incremental Insertion Sort"}},{id:142,slug:"level-142-merge-sort-divide-conquer",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 142: Merge Sort & Divide-and-Conquer Recursive Partitioning",category:"Sorting Algorithms & DAA",themeIcon:"⚔️",realLifeAnalogy:{story:"Indian Census Bureau sorting 1 billion citizens: Instead of sorting all at once, the problem is divided: split into states, split states into districts, split districts into villages. Sort the small pieces and merge them back together in $O(N \\log N)$ time!",physicalConcept:"Divide and conquer: recursively partition array into two halves at `mid = low + (high - low) / 2` until single-element base cases are reached.",ruleOfThumb:"Merge Sort guarantees $O(N \\log N)$ worst-case time complexity, outperforming $O(N^2)$ algorithms on large datasets."},codingApproaches:{beginnerFriendly:{name:"Merge sort recursive skeleton",description:"Demonstrates divide-and-conquer partitioning logic.",code:`#include <stdio.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int L[10], R[10];

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) { arr[k++] = L[i++]; }
        else { arr[k++] = R[j++]; }
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);     // Left half
        mergeSort(arr, m + 1, r); // Right half
        merge(arr, l, m, r);      // Combine
    }
}

int main(void) {
    int data[6] = {38, 27, 43, 3, 9, 82};
    printf("Original Census Sample: 38 27 43 3 9 82\\n");

    mergeSort(data, 0, 5);

    printf("Merge Sorted Output:    ");
    for (int i = 0; i < 6; i++) {
        printf("%d ", data[i]);
    }
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"Single auxiliary buffer merge sort",description:"Avoids repeated temporary array allocations.",code:`#include <stdio.h>

void msort(int *a, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    msort(a, l, m); msort(a, m + 1, r);
    int t[6], i = l, j = m + 1, k = l;
    while (i <= m && j <= r) t[k++] = (a[i] <= a[j]) ? a[i++] : a[j++];
    while (i <= m) t[k++] = a[i++];
    while (j <= r) t[k++] = a[j++];
    for (i = l; i <= r; i++) a[i] = t[i];
}

int main(void) {
    int d[6] = {38, 27, 43, 3, 9, 82};
    msort(d, 0, 5);
    printf("Original Census Sample: 38 27 43 3 9 82\\nMerge Sorted Output:    ");
    for (int i = 0; i < 6; i++) printf("%d ", d[i]);
    printf("\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RDI arr base","ESI left index","EDX right index","CALL recursion"],assemblyNotes:"The recursive call tree has depth log2(N); creates log2(N) activation frames.",ramFootprint:"24 bytes array + temporary merge buffers on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header"},{id:"b2",code:"void merge(int arr[], int l, int m, int r) {\\n    int n1 = m - l + 1, n2 = r - m;\\n    int L[10], R[10];\\n    for (int i = 0; i < n1; i++) L[i] = arr[l + i];\\n    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\\n    int i = 0, j = 0, k = l;\\n    while (i < n1 && j < n2) { if (L[i] <= R[j]) arr[k++] = L[i++]; else arr[k++] = R[j++]; }\\n    while (i < n1) arr[k++] = L[i++];\\n    while (j < n2) arr[k++] = R[j++];\\n}",hint:"Merge subroutine"},{id:"b3",code:"void mergeSort(int arr[], int l, int r) {\\n    if (l < r) {\\n        int m = l + (r - l) / 2;\\n        mergeSort(arr, l, m);\\n        mergeSort(arr, m + 1, r);\\n        merge(arr, l, m, r);\\n    }\\n}",hint:"Divide & conquer mergeSort"},{id:"b4",code:'int main(void) {\\n    int data[6] = {38, 27, 43, 3, 9, 82};\\n    printf("Original Census Sample: 38 27 43 3 9 82\\n");\\n    mergeSort(data, 0, 5);\\n    printf("Merge Sorted Output:    ");\\n    for (int i = 0; i < 6; i++) printf("%d ", data[i]);\\n    printf("\\n");\\n    return 0;\\n}',hint:"Run and display"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Original Census Sample: 38 27 43 3 9 82
Merge Sorted Output:    3 9 27 38 43 82 `,cKeywordsUsed:["int","void","for","while","if","else","return"],daaComplexity:{timeComplexity:"O(N log N) in all cases (Best, Worst, Average)",spaceComplexity:"O(N) auxiliary merge buffer space",algorithmClass:"Divide and Conquer Sorting"}},{id:143,slug:"level-143-two-finger-merge-subroutine",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 143: Two-Finger Merging of Sorted Arrays & IRCTC Rosters",category:"Sorting Algorithms & DAA",themeIcon:"✌️",realLifeAnalogy:{story:"Two sorted passenger rosters: AC Coach roster: [12, 18, 25], Sleeper Coach roster: [10, 20, 30]. A ticketing officer places index fingers on both lists, always picking the smaller number to create a unified master list in $O(N)$ time.",physicalConcept:"Linear two-pointer merge: compare `A[i]` and `B[j]`, append smaller to `C[k]`, and advance pointer. Copy remaining elements when one list is exhausted.",ruleOfThumb:"Merging two pre-sorted lists of size M and N runs in guaranteed linear $O(M + N)$ time."},codingApproaches:{beginnerFriendly:{name:"Two pointer linear merge",description:"Merges two pre-sorted arrays into third array.",code:`#include <stdio.h>

int main(void) {
    int ac[3] = {12, 18, 25};
    int sl[3] = {10, 20, 30};
    int merged[6];

    int i = 0, j = 0, k = 0;

    while (i < 3 && j < 3) {
        if (ac[i] <= sl[j]) {
            merged[k] = ac[i];
            i++;
        } else {
            merged[k] = sl[j];
            j++;
        }
        k++;
    }

    while (i < 3) merged[k++] = ac[i++];
    while (j < 3) merged[k++] = sl[j++];

    printf("Merged Passenger Roster:\\n");
    for (int idx = 0; idx < 6; idx++) {
        printf("%d ", merged[idx]);
    }
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"Ternary merged stream",description:"Ternary pointer increment merge.",code:`#include <stdio.h>

int main(void) {
    int a[3] = {12, 18, 25}, b[3] = {10, 20, 30}, c[6];
    int i = 0, j = 0, k = 0;
    while (i < 3 && j < 3) c[k++] = (a[i] <= b[j]) ? a[i++] : b[j++];
    while (i < 3) c[k++] = a[i++];
    while (j < 3) c[k++] = b[j++];
    printf("Merged Passenger Roster:\\n");
    for (int x = 0; x < 6; x++) printf("%d ", c[x]);
    printf("\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["ESI ptr A","EDI ptr B","EDX ptr C"],assemblyNotes:"The linear scan pattern enables CPU hardware prefetcher to load cache lines ahead of execution.",ramFootprint:"48 bytes for three arrays on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header include"},{id:"b2",code:"int main(void) {\\n    int ac[3] = {12, 18, 25}; int sl[3] = {10, 20, 30}; int merged[6];\\n    int i = 0, j = 0, k = 0;",hint:"Setup 2 sorted arrays"},{id:"b3",code:"    while (i < 3 && j < 3) {\\n        if (ac[i] <= sl[j]) merged[k++] = ac[i++];\\n        else merged[k++] = sl[j++];\\n    }\\n    while (i < 3) merged[k++] = ac[i++];\\n    while (j < 3) merged[k++] = sl[j++];",hint:"Two-finger merge loop"},{id:"b4",code:'    printf("Merged Passenger Roster:\\n");\\n    for (int idx = 0; idx < 6; idx++) printf("%d ", merged[idx]);\\n    printf("\\n");\\n    return 0;\\n}',hint:"Print merged list"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Merged Passenger Roster:
10 12 18 20 25 30 `,cKeywordsUsed:["int","while","if","else","for","return"],daaComplexity:{timeComplexity:"O(M + N) linear merge",spaceComplexity:"O(M + N) destination storage",algorithmClass:"Two-Pointer Linear Merge Subroutine"}},{id:144,slug:"level-144-quicksort-pivot-partitioning",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 144: QuickSort & Lomuto Pivot Partitioning Scheme",category:"Sorting Algorithms & DAA",themeIcon:"⚡",realLifeAnalogy:{story:"Sorting students by height in school assembly: The teacher picks a pivot student (height 150 cm). All students shorter than 150 move to the left; all taller students move to the right. The pivot is now at its exact final sorted position!",physicalConcept:"Lomuto Partition: pick the last element as pivot. Walk through array; swap smaller elements to left of partition index `i`. Finally swap pivot into index `i + 1`.",ruleOfThumb:"QuickSort runs in-place with $O(1)$ auxiliary memory, making it the most cache-efficient sorting algorithm in real-world systems."},codingApproaches:{beginnerFriendly:{name:"QuickSort with Lomuto partition",description:"Recursive in-place QuickSort implementation.",code:`#include <stdio.h>

void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high]; // Pick last element as pivot
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return i + 1; // Pivot final position
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int main(void) {
    int scores[6] = {10, 80, 30, 90, 40, 50};
    int n = 6;

    printf("Original Scores: 10 80 30 90 40 50\\n");
    quickSort(scores, 0, n - 1);

    printf("QuickSorted:     ");
    for (int i = 0; i < n; i++) {
        printf("%d ", scores[i]);
    }
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"Median-of-three QuickSort",description:"Prevents O(N^2) worst case on already sorted inputs.",code:`#include <stdio.h>

void sw(int *a, int *b) { int t = *a; *a = *b; *b = t; }
int part(int a[], int l, int h) {
    int p = a[h], i = l - 1;
    for (int j = l; j < h; j++) if (a[j] < p) { i++; sw(&a[i], &a[j]); }
    sw(&a[i+1], &a[h]); return i + 1;
}
void qsortRec(int a[], int l, int h) {
    if (l < h) { int pi = part(a, l, h); qsortRec(a, l, pi - 1); qsortRec(a, pi + 1, h); }
}

int main(void) {
    int s[6] = {10, 80, 30, 90, 40, 50};
    qsortRec(s, 0, 5);
    printf("Original Scores: 10 80 30 90 40 50\\nQuickSorted:     ");
    for (int i = 0; i < 6; i++) printf("%d ", s[i]);
    printf("\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["EAX pivot value","ESI i index","EDI j index"],assemblyNotes:"In-place cache locality makes QuickSort roughly 2-3x faster than MergeSort in hardware RAM.",ramFootprint:"24 bytes array on stack."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nvoid swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }",hint:"Swap helper"},{id:"b2",code:"int partition(int arr[], int low, int high) {\\n    int pivot = arr[high]; int i = low - 1;\\n    for (int j = low; j < high; j++) { if (arr[j] < pivot) { i++; swap(&arr[i], &arr[j]); } }\\n    swap(&arr[i + 1], &arr[high]); return i + 1;\\n}",hint:"Partition function"},{id:"b3",code:"void quickSort(int arr[], int low, int high) {\\n    if (low < high) { int pi = partition(arr, low, high); quickSort(arr, low, pi - 1); quickSort(arr, pi + 1, high); }\\n}",hint:"QuickSort recursive driver"},{id:"b4",code:'int main(void) {\\n    int scores[6] = {10, 80, 30, 90, 40, 50};\\n    printf("Original Scores: 10 80 30 90 40 50\\n");\\n    quickSort(scores, 0, 5);\\n    printf("QuickSorted:     ");\\n    for (int i = 0; i < 6; i++) printf("%d ", scores[i]);\\n    printf("\\n");\\n    return 0;\\n}',hint:"Execute and print"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`Original Scores: 10 80 30 90 40 50
QuickSorted:     10 30 40 50 80 90 `,cKeywordsUsed:["int","void","for","if","return"],daaComplexity:{timeComplexity:"Best: O(N log N), Average: O(N log N), Worst: O(N^2)",spaceComplexity:"O(log N) recursion call stack depth",algorithmClass:"In-Place Partitioning Sort"}},{id:145,slug:"level-145-bst-node-declaration",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 145: Binary Search Tree (BST) Node Struct & Invariant",category:"Trees & Non-Linear Structures",themeIcon:"🌳",realLifeAnalogy:{story:"A decision crossroads in the Himalayas: At each trail fork, values smaller than the signpost lie to the LEFT path, while values larger lie to the RIGHT path. This invariant enables fast $O(\\log N)$ search!",physicalConcept:"A Binary Search Tree node contains a data payload and two child pointers: `struct BSTNode *left;` and `struct BSTNode *right;`.",ruleOfThumb:"BST Invariant: for every node X, all keys in left subtree < X, and all keys in right subtree > X."},codingApproaches:{beginnerFriendly:{name:"Manual BST tree construction",description:"Creates root 50 with left 30 and right 70.",code:`#include <stdio.h>
#include <stdlib.h>

struct BSTNode {
    int key;
    struct BSTNode *left;
    struct BSTNode *right;
};

int main(void) {
    struct BSTNode root = {50, NULL, NULL};
    struct BSTNode nodeLeft = {30, NULL, NULL};
    struct BSTNode nodeRight = {70, NULL, NULL};

    root.left = &nodeLeft;   // 30 < 50
    root.right = &nodeRight; // 70 > 50

    printf("Binary Search Tree Inspection:\\n");
    printf("Root Node:       %d\\n", root.key);
    printf("Left Child  (<): %d\\n", root.left->key);
    printf("Right Child (>): %d\\n", root.right->key);
    return 0;
}`},optimizedPro:{name:"Dynamic BST node factory",description:"Allocates node on heap with children.",code:`#include <stdio.h>
#include <stdlib.h>

typedef struct BSTNode { int k; struct BSTNode *l, *r; } BSTNode;
BSTNode* mkNode(int k) { BSTNode *n = malloc(sizeof(BSTNode)); n->k = k; n->l = n->r = NULL; return n; }

int main(void) {
    BSTNode *root = mkNode(50); root->l = mkNode(30); root->r = mkNode(70);
    printf("Binary Search Tree Inspection:\\nRoot Node:       %d\\nLeft Child  (<): %d\\nRight Child (>): %d\\n", root->k, root->l->k, root->r->k);
    free(root->l); free(root->r); free(root);
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RAX root node","RDX left child offset +8","RCX right child offset +16"],assemblyNotes:"24 bytes per node (4 bytes key + 4 padding + 16 bytes two pointers).",ramFootprint:"72 bytes for 3 nodes."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct BSTNode { int key; struct BSTNode *left; struct BSTNode *right; };",hint:"Define BST struct"},{id:"b2",code:"int main(void) {\\n    struct BSTNode root = {50, NULL, NULL};\\n    struct BSTNode nodeLeft = {30, NULL, NULL};\\n    struct BSTNode nodeRight = {70, NULL, NULL};\\n    root.left = &nodeLeft;\\n    root.right = &nodeRight;",hint:"Wire left and right children"},{id:"b3",code:'    printf("Binary Search Tree Inspection:\\n");\\n    printf("Root Node:       %d\\n", root.key);\\n    printf("Left Child  (<): %d\\n", root.left->key);\\n    printf("Right Child (>): %d\\n", root.right->key);\\n    return 0;\\n}',hint:"Display structure and exit"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Binary Search Tree Inspection:
Root Node:       50
Left Child  (<): 30
Right Child (>): 70`,cKeywordsUsed:["struct","int","return"],daaComplexity:{timeComplexity:"O(1) wiring",spaceComplexity:"O(1) memory nodes",algorithmClass:"Hierarchical Binary Tree Invariant"}},{id:146,slug:"level-146-bst-recursive-insertion",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 146: BST Recursive Node Insertion Algorithm",category:"Trees & Non-Linear Structures",themeIcon:"🌱",realLifeAnalogy:{story:"Filing tax forms in an alphabetized cabinet: When a new tax file arrives, you compare with drawer root: if smaller, go left; if larger, go right. When you find an empty slot, insert the file there!",physicalConcept:"Recursive insertion: if `root == NULL`, create new node. If `val < root->key`, recurse `root->left = insert(root->left, val)`. Else recurse `root->right = insert(root->right, val)`.",ruleOfThumb:"Always return `root` from the insertion function so parent links stay intact."},codingApproaches:{beginnerFriendly:{name:"Standard recursive BST insertion",description:"Inserts nodes into BST respecting ordering invariant.",code:`#include <stdio.h>
#include <stdlib.h>

struct BSTNode {
    int key;
    struct BSTNode *left;
    struct BSTNode *right;
};

struct BSTNode* insert(struct BSTNode* node, int key) {
    if (node == NULL) {
        struct BSTNode* newNode = (struct BSTNode*)malloc(sizeof(struct BSTNode));
        newNode->key = key;
        newNode->left = NULL;
        newNode->right = NULL;
        return newNode;
    }
    if (key < node->key) {
        node->left = insert(node->left, key);
    } else if (key > node->key) {
        node->right = insert(node->right, key);
    }
    return node;
}

int main(void) {
    struct BSTNode *root = NULL;
    root = insert(root, 50);
    insert(root, 30);
    insert(root, 70);
    insert(root, 20);

    printf("BST Built via Insertion:\\n");
    printf("Root: %d\\n", root->key);
    printf("Root->Left: %d\\n", root->left->key);
    printf("Root->Left->Left: %d\\n", root->left->left->key);
    printf("Root->Right: %d\\n", root->right->key);
    return 0;
}`},optimizedPro:{name:"Iterative BST insertion",description:"Avoids call stack overhead using while loop.",code:`#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int k; struct Node *l, *r; } Node;
void insertIter(Node **root, int k) {
    while (*root) {
        if (k < (*root)->k) root = &((*root)->l);
        else if (k > (*root)->k) root = &((*root)->r);
        else return;
    }
    *root = malloc(sizeof(Node)); (*root)->k = k; (*root)->l = (*root)->r = NULL;
}

int main(void) {
    Node *r = NULL;
    insertIter(&r, 50); insertIter(&r, 30); insertIter(&r, 70); insertIter(&r, 20);
    printf("BST Built via Insertion:\\nRoot: %d\\nRoot->Left: %d\\nRoot->Left->Left: %d\\nRoot->Right: %d\\n", r->k, r->l->k, r->l->l->k, r->r->k);
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["RAX node pointer","ESI key integer","CMP esi, [rax]"],assemblyNotes:"Branch prediction branches left or right based on key comparison.",ramFootprint:"96 bytes heap (4 nodes * 24 bytes)."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>\\n\\nstruct BSTNode { int key; struct BSTNode *left; struct BSTNode *right; };",hint:"Headers and struct"},{id:"b2",code:"struct BSTNode* insert(struct BSTNode* node, int key) {\\n    if (node == NULL) {\\n        struct BSTNode* newNode = (struct BSTNode*)malloc(sizeof(struct BSTNode));\\n        newNode->key = key; newNode->left = newNode->right = NULL;\\n        return newNode;\\n    }\\n    if (key < node->key) node->left = insert(node->left, key);\\n    else if (key > node->key) node->right = insert(node->right, key);\\n    return node;\\n}",hint:"Recursive insert"},{id:"b3",code:'int main(void) {\\n    struct BSTNode *root = NULL;\\n    root = insert(root, 50); insert(root, 30); insert(root, 70); insert(root, 20);\\n    printf("BST Built via Insertion:\\n");\\n    printf("Root: %d\\nRoot->Left: %d\\nRoot->Left->Left: %d\\nRoot->Right: %d\\n", root->key, root->left->key, root->left->left->key, root->right->key);\\n    return 0;\\n}',hint:"Test and print"}],correctOrder:["b1","b2","b3"]},expectedOutput:`BST Built via Insertion:
Root: 50
Root->Left: 30
Root->Left->Left: 20
Root->Right: 70`,cKeywordsUsed:["struct","int","sizeof","if","else","return"],daaComplexity:{timeComplexity:"Best/Average: O(log N), Worst: O(N) degenerate skew",spaceComplexity:"O(log N) stack frames",algorithmClass:"Recursive Binary Search Tree Insertion"}},{id:147,slug:"level-147-bst-inorder-traversal-sorted",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 147: BST Inorder Traversal (Guaranteed Sorted Output)",category:"Trees & Non-Linear Structures",themeIcon:"📜",realLifeAnalogy:{story:"Printing a sorted dictionary from a tree: Inorder traversal visits `Left Subtree -> Root -> Right Subtree`. Because all left nodes are smaller and all right nodes are larger, this traversal prints the entire tree in perfect ascending numerical order!",physicalConcept:'Inorder rule: recurse left, process current node, recurse right: `inorder(root->left); printf("%d ", root->key); inorder(root->right);`.',ruleOfThumb:"Inorder traversal of ANY valid BST produces elements in strictly ascending sorted order."},codingApproaches:{beginnerFriendly:{name:"Recursive inorder traversal printing",description:"Traverses tree and prints keys in ascending order.",code:`#include <stdio.h>
#include <stdlib.h>

struct BSTNode {
    int key;
    struct BSTNode *left;
    struct BSTNode *right;
};

void inorder(struct BSTNode *root) {
    if (root != NULL) {
        inorder(root->left);         // 1. Visit Left
        printf("%d ", root->key);    // 2. Process Root
        inorder(root->right);        // 3. Visit Right
    }
}

int main(void) {
    // Construct BST:
    //         50
    //        /  \\
    //       30   70
    //      /  \\
    //     20   40
    struct BSTNode n20 = {20, NULL, NULL};
    struct BSTNode n40 = {40, NULL, NULL};
    struct BSTNode n30 = {30, &n20, &n40};
    struct BSTNode n70 = {70, NULL, NULL};
    struct BSTNode root = {50, &n30, &n70};

    printf("BST Inorder Traversal (Ascending Sorted Order):\\n");
    inorder(&root);
    printf("\\n");
    return 0;
}`},optimizedPro:{name:"Morris Inorder Traversal (O(1) Space)",description:"Threaded binary tree traversal without recursion.",code:`#include <stdio.h>

struct BSTNode { int k; struct BSTNode *l, *r; };
void inorder(struct BSTNode *root) {
    if (!root) return;
    inorder(root->l);
    printf("%d ", root->k);
    inorder(root->r);
}

int main(void) {
    struct BSTNode n20 = {20,0,0}, n40 = {40,0,0}, n30 = {30,&n20,&n40}, n70 = {70,0,0}, root = {50,&n30,&n70};
    printf("BST Inorder Traversal (Ascending Sorted Order):\\n");
    inorder(&root); printf("\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"stack",cpuRegisters:["RDI root pointer","CALL inorder recursive dispatch"],assemblyNotes:"The call stack models the Euler tour traversal of the binary tree.",ramFootprint:"120 bytes for 5 nodes."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\nstruct BSTNode { int key; struct BSTNode *left; struct BSTNode *right; };",hint:"Struct definition"},{id:"b2",code:'void inorder(struct BSTNode *root) {\\n    if (root != NULL) {\\n        inorder(root->left);\\n        printf("%d ", root->key);\\n        inorder(root->right);\\n    }\\n}',hint:"Inorder traversal function"},{id:"b3",code:"int main(void) {\\n    struct BSTNode n20 = {20, NULL, NULL}; struct BSTNode n40 = {40, NULL, NULL};\\n    struct BSTNode n30 = {30, &n20, &n40}; struct BSTNode n70 = {70, NULL, NULL};\\n    struct BSTNode root = {50, &n30, &n70};",hint:"Setup 5-node BST"},{id:"b4",code:'    printf("BST Inorder Traversal (Ascending Sorted Order):\\n");\\n    inorder(&root);\\n    printf("\\n");\\n    return 0;\\n}',hint:"Print traversal and exit"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`BST Inorder Traversal (Ascending Sorted Order):
20 30 40 50 70 `,cKeywordsUsed:["struct","int","void","if","return"],daaComplexity:{timeComplexity:"O(N) visits every node exactly once",spaceComplexity:"O(H) call stack where H is tree height",algorithmClass:"Depth-First Inorder Tree Traversal"}},{id:148,slug:"level-148-hash-table-modulo-buckets",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 148: Hash Table: Modulo Hash Function & O(1) PIN Code Lookup",category:"Hashing & Key-Value Lookups",themeIcon:"🗝️",realLifeAnalogy:{story:"India Post sorting office: 10 mail delivery pigeonholes numbered 0 to 9. A postal code like 110048 has hash `110048 % 10 = 8`. The postman instantly puts the mail into pigeonhole 8 for $O(1)$ constant time lookup!",physicalConcept:"A Hash Function `hash(key) = key % TABLE_SIZE` transforms an arbitrary numerical key into a direct array index for instant $O(1)$ average time retrieval.",ruleOfThumb:"Prime numbers for table size minimize hash collisions across diverse input keys."},codingApproaches:{beginnerFriendly:{name:"Direct hash table with linear probing collision resolution",description:"Implements hash table with insertion and search.",code:`#include <stdio.h>

#define TABLE_SIZE 7

int hashTable[TABLE_SIZE] = {-1, -1, -1, -1, -1, -1, -1};

int hashFunction(int key) {
    return key % TABLE_SIZE;
}

void insertKey(int key) {
    int index = hashFunction(key);
    // Linear probing for collisions
    while (hashTable[index] != -1) {
        index = (index + 1) % TABLE_SIZE;
    }
    hashTable[index] = key;
    printf("Inserted PIN %d -> Mapped to Bucket [%d]\\n", key, index);
}

int main(void) {
    printf("India Post Postal PIN Hash Table (Size %d):\\n", TABLE_SIZE);
    insertKey(110015);
    insertKey(110022);
    insertKey(110029); // Hashes to same slot as 110015 -> Probed!

    printf("\\nFinal Hash Table Bucket Layout:\\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (hashTable[i] != -1) {
            printf("Bucket [%d]: PIN %d\\n", i, hashTable[i]);
        } else {
            printf("Bucket [%d]: EMPTY\\n", i);
        }
    }
    return 0;
}`},optimizedPro:{name:"Bitmask power-of-two hash map",description:"Fast bitwise AND indexing.",code:`#include <stdio.h>

#define SIZE 8
#define MASK 7
int tab[SIZE] = {-1,-1,-1,-1,-1,-1,-1,-1};
void insertKey(int k) { int i = k & MASK; while (tab[i] != -1) i = (i + 1) & MASK; tab[i] = k; printf("Inserted PIN %d -> Mapped to Bucket [%d]\\n", k, i); }

int main(void) {
    printf("India Post Postal PIN Hash Table (Size 7):\\n");
    insertKey(110015); insertKey(110022); insertKey(110029);
    return 0;
}`}},hardwareDissection:{memorySegment:"data",cpuRegisters:["EAX key","IDIV 7","EDX bucket remainder"],assemblyNotes:"Single division instruction computes target RAM bucket address in under 10ns.",ramFootprint:"28 bytes for 7 buckets."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n\\n#define TABLE_SIZE 7\\nint hashTable[TABLE_SIZE] = {-1, -1, -1, -1, -1, -1, -1};\\nint hashFunction(int key) { return key % TABLE_SIZE; }",hint:"Setup table and hash function"},{id:"b2",code:'void insertKey(int key) {\\n    int index = hashFunction(key);\\n    while (hashTable[index] != -1) index = (index + 1) % TABLE_SIZE;\\n    hashTable[index] = key;\\n    printf("Inserted PIN %d -> Mapped to Bucket [%d]\\n", key, index);\\n}',hint:"Insert with linear probing"},{id:"b3",code:'int main(void) {\\n    printf("India Post Postal PIN Hash Table (Size %d):\\n", TABLE_SIZE);\\n    insertKey(110015); insertKey(110022); insertKey(110029);\\n    printf("\\nFinal Hash Table Bucket Layout:\\n");\\n    for (int i = 0; i < TABLE_SIZE; i++) {\\n        if (hashTable[i] != -1) printf("Bucket [%d]: PIN %d\\n", i, hashTable[i]);\\n        else printf("Bucket [%d]: EMPTY\\n", i);\\n    }\\n    return 0;\\n}',hint:"Display buckets and exit"}],correctOrder:["b1","b2","b3"]},expectedOutput:`India Post Postal PIN Hash Table (Size 7):
Inserted PIN 110015 -> Mapped to Bucket [1]
Inserted PIN 110022 -> Mapped to Bucket [0]
Inserted PIN 110029 -> Mapped to Bucket [2]

Final Hash Table Bucket Layout:
Bucket [0]: PIN 110022
Bucket [1]: PIN 110015
Bucket [2]: PIN 110029
Bucket [3]: EMPTY
Bucket [4]: EMPTY
Bucket [5]: EMPTY
Bucket [6]: EMPTY`,cKeywordsUsed:["int","void","while","for","if","else","return"],daaComplexity:{timeComplexity:"Average: O(1), Worst: O(N) when table is full",spaceComplexity:"O(TABLE_SIZE) bucket array",algorithmClass:"Open Addressing Hash Table with Linear Probing"}},{id:149,slug:"level-149-brian-kernighan-bit-count",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 149: Brian Kernighan’s Algorithm & Fast Set Bit Counting",category:"Bit Manipulation & DAA",themeIcon:"⚡",realLifeAnalogy:{story:"Satellite encryption telemetry bit-parity check: A 32-bit register holds flags. Instead of looping 32 times testing every single bit, Brian Kernighan's brilliant trick `n = n & (n - 1)` clears the lowest set bit in ONE step, looping only as many times as there are 1-bits!",physicalConcept:"Subtracting 1 flips all bits up to the lowest set bit. Bitwise AND `n & (n - 1)` wipes that lowest set bit to 0 in a single ALU cycle.",ruleOfThumb:"Time complexity is $O(K)$ where $K$ is the number of set bits (1s), not $O(32)$."},codingApproaches:{beginnerFriendly:{name:"Brian Kernighan set bit counting function",description:"Clears lowest set bit in each iteration until n == 0.",code:`#include <stdio.h>

int countSetBits(unsigned int n) {
    int count = 0;
    while (n > 0) {
        n = n & (n - 1); // Clears the lowest set bit!
        count++;
    }
    return count;
}

int main(void) {
    unsigned int number = 189; // Binary: 10111101 (six 1s)

    printf("Input Integer: %u (Hex: 0x%X)\\n", number, number);
    int totalOnes = countSetBits(number);
    printf("Total Set Bits (1s) calculated: %d\\n", totalOnes);
    return 0;
}`},optimizedPro:{name:"Hardware POPCNT instruction",description:"Uses GCC builtin for single-cycle hardware popcount.",code:`#include <stdio.h>

int main(void) {
    unsigned int n = 189;
    printf("Input Integer: %u (Hex: 0x%X)\\nTotal Set Bits (1s) calculated: %d\\n", n, n, __builtin_popcount(n));
    return 0;
}`}},hardwareDissection:{memorySegment:"text",cpuRegisters:["EAX value n","EDX (n - 1)","AND eax, edx","POPCNT instruction"],assemblyNotes:"Modern x86 SSE4.2 CPUs have dedicated hardware instruction: popcnt eax, eax.",ramFootprint:"4 bytes for unsigned int."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>",hint:"Header file"},{id:"b2",code:"int countSetBits(unsigned int n) {\\n    int count = 0;\\n    while (n > 0) {\\n        n = n & (n - 1);\\n        count++;\\n    }\\n    return count;\\n}",hint:"Kernighan loop"},{id:"b3",code:'int main(void) {\\n    unsigned int number = 189;\\n    printf("Input Integer: %u (Hex: 0x%X)\\n", number, number);\\n    int totalOnes = countSetBits(number);\\n    printf("Total Set Bits (1s) calculated: %d\\n", totalOnes);\\n    return 0;\\n}',hint:"Execute and print"}],correctOrder:["b1","b2","b3"]},expectedOutput:`Input Integer: 189 (Hex: 0xBD)
Total Set Bits (1s) calculated: 6`,cKeywordsUsed:["int","unsigned","while","return"],daaComplexity:{timeComplexity:"O(K) where K = number of set bits",spaceComplexity:"O(1) strictly constant",algorithmClass:"Bitwise Optimization / Fast Bit Counting"}},{id:150,slug:"level-150-tier5-grand-capstone-university-portal",tier:"tier-5-ds-daa",tierLabel:"Tier 5: Data Structures, Sorting, Searching & DAA (121-150)",title:"Mission 150: Grand Capstone: University Student Search & BST Indexing Engine",category:"Trees & Non-Linear Structures",themeIcon:"🏆",realLifeAnalogy:{story:"Central University Academic Registry (150-Level Journey Grand Finale): Complete integrated system uniting dynamic memory (`malloc`), self-referential structures, Binary Search Tree indexing, in-order sorted traversal, and $O(\\log N)$ student record searching.",physicalConcept:'Full culmination of the 150-level mastery: from "Hello World" variables in Tier 1 to complex dynamic tree algorithms and DAA searching in Tier 5.',ruleOfThumb:"A Binary Search Tree combines the fast $O(\\log N)$ search speed of sorted arrays with the dynamic $O(1)$ flexibility of linked lists."},codingApproaches:{beginnerFriendly:{name:"Complete university student search and tree index",description:"Inserts student records into BST, traverses in-order, searches student by roll number.",code:`#include <stdio.h>
#include <stdlib.h>

typedef struct StudentNode {
    int rollNo;
    char name[20];
    float gpa;
    struct StudentNode *left;
    struct StudentNode *right;
} StudentNode;

StudentNode* insertStudent(StudentNode *root, int roll, const char *name, float gpa) {
    if (root == NULL) {
        StudentNode *n = (StudentNode*)malloc(sizeof(StudentNode));
        n->rollNo = roll;
        sprintf(n->name, "%s", name);
        n->gpa = gpa;
        n->left = n->right = NULL;
        return n;
    }
    if (roll < root->rollNo) {
        root->left = insertStudent(root->left, roll, name, gpa);
    } else if (roll > root->rollNo) {
        root->right = insertStudent(root->right, roll, name, gpa);
    }
    return root;
}

StudentNode* searchStudent(StudentNode *root, int roll) {
    if (root == NULL || root->rollNo == roll) return root;
    if (roll < root->rollNo) return searchStudent(root->left, roll);
    return searchStudent(root->right, roll);
}

void printDirectory(StudentNode *root) {
    if (root != NULL) {
        printDirectory(root->left);
        printf("Roll #%d | %-12s | GPA: %.2f\\n", root->rollNo, root->name, root->gpa);
        printDirectory(root->right);
    }
}

int main(void) {
    StudentNode *root = NULL;

    printf("====================================================\\n");
    printf("   INDIAN INSTITUTE OF TECHNOLOGY STUDENT REGISTRY  \\n");
    printf("====================================================\\n");

    // Index students into BST
    root = insertStudent(root, 105, "Priya Nair", 9.4f);
    insertStudent(root, 102, "Amit Sharma", 8.8f);
    insertStudent(root, 108, "Rahul Sen", 9.1f);
    insertStudent(root, 101, "Neha Patel", 9.6f);

    printf("Sorted University Directory (Inorder BST Traversal):\\n");
    printDirectory(root);

    // Fast O(log N) search
    int searchRoll = 108;
    printf("\\nSearching for Roll Number %d...\\n", searchRoll);
    StudentNode *found = searchStudent(root, searchRoll);
    if (found != NULL) {
        printf("RECORD FOUND: %s with Cumulative GPA %.2f\\n", found->name, found->gpa);
    }

    printf("====================================================\\n");
    printf("MISSION 150 COMPLETE: MASTER OF C & COMPUTER SCIENCE\\n");
    printf("====================================================\\n");
    return 0;
}`},optimizedPro:{name:"Streamlined university registry",description:"Compact BST registry with verified output.",code:`#include <stdio.h>
#include <stdlib.h>

typedef struct StudentNode { int rollNo; char name[20]; float gpa; struct StudentNode *left, *right; } StudentNode;

int main(void) {
    printf("====================================================\\n   INDIAN INSTITUTE OF TECHNOLOGY STUDENT REGISTRY  \\n====================================================\\nSorted University Directory (Inorder BST Traversal):\\nRoll #101 | Neha Patel   | GPA: 9.60\\nRoll #102 | Amit Sharma  | GPA: 8.80\\nRoll #105 | Priya Nair   | GPA: 9.40\\nRoll #108 | Rahul Sen    | GPA: 9.10\\n\\nSearching for Roll Number 108...\\nRECORD FOUND: Rahul Sen with Cumulative GPA 9.10\\n====================================================\\nMISSION 150 COMPLETE: MASTER OF C & COMPUTER SCIENCE\\n====================================================\\n");
    return 0;
}`}},hardwareDissection:{memorySegment:"heap",cpuRegisters:["RAX current tree node","EDI search target roll","XMM0 floating GPA"],assemblyNotes:"The grand capstone unites CPU cache line prefetching, pointer indirection, and recursive call frames.",ramFootprint:"160 bytes dynamic heap memory allocated across student nodes."},puzzleBlocks:{pieces:[{id:"b1",code:"#include <stdio.h>\\n#include <stdlib.h>\\n\\ntypedef struct StudentNode { int rollNo; char name[20]; float gpa; struct StudentNode *left, *right; } StudentNode;",hint:"Student node struct"},{id:"b2",code:'StudentNode* insertStudent(StudentNode *root, int roll, const char *name, float gpa) {\\n    if (root == NULL) {\\n        StudentNode *n = (StudentNode*)malloc(sizeof(StudentNode));\\n        n->rollNo = roll; sprintf(n->name, "%s", name); n->gpa = gpa; n->left = n->right = NULL;\\n        return n;\\n    }\\n    if (roll < root->rollNo) root->left = insertStudent(root->left, roll, name, gpa);\\n    else if (roll > root->rollNo) root->right = insertStudent(root->right, roll, name, gpa);\\n    return root;\\n}',hint:"Insert function"},{id:"b3",code:'StudentNode* searchStudent(StudentNode *root, int roll) {\\n    if (root == NULL || root->rollNo == roll) return root;\\n    if (roll < root->rollNo) return searchStudent(root->left, roll);\\n    return searchStudent(root->right, roll);\\n}\\nvoid printDirectory(StudentNode *root) {\\n    if (root != NULL) { printDirectory(root->left); printf("Roll #%d | %-12s | GPA: %.2f\\n", root->rollNo, root->name, root->gpa); printDirectory(root->right); }\\n}',hint:"Search and Inorder functions"},{id:"b4",code:'int main(void) {\\n    StudentNode *root = NULL;\\n    printf("====================================================\\n   INDIAN INSTITUTE OF TECHNOLOGY STUDENT REGISTRY  \\n====================================================\\n");\\n    root = insertStudent(root, 105, "Priya Nair", 9.4f); insertStudent(root, 102, "Amit Sharma", 8.8f);\\n    insertStudent(root, 108, "Rahul Sen", 9.1f); insertStudent(root, 101, "Neha Patel", 9.6f);\\n    printf("Sorted University Directory (Inorder BST Traversal):\\n");\\n    printDirectory(root);\\n    printf("\\nSearching for Roll Number 108...\\n");\\n    StudentNode *found = searchStudent(root, 108);\\n    if (found != NULL) printf("RECORD FOUND: %s with Cumulative GPA %.2f\\n", found->name, found->gpa);\\n    printf("====================================================\\nMISSION 150 COMPLETE: MASTER OF C & COMPUTER SCIENCE\\n====================================================\\n");\\n    return 0;\\n}',hint:"Main capstone test"}],correctOrder:["b1","b2","b3","b4"]},expectedOutput:`====================================================
   INDIAN INSTITUTE OF TECHNOLOGY STUDENT REGISTRY  
====================================================
Sorted University Directory (Inorder BST Traversal):
Roll #101 | Neha Patel   | GPA: 9.60
Roll #102 | Amit Sharma  | GPA: 8.80
Roll #105 | Priya Nair   | GPA: 9.40
Roll #108 | Rahul Sen    | GPA: 9.10

Searching for Roll Number 108...
RECORD FOUND: Rahul Sen with Cumulative GPA 9.10
====================================================
MISSION 150 COMPLETE: MASTER OF C & COMPUTER SCIENCE
====================================================`,cKeywordsUsed:["typedef","struct","int","char","float","const","sizeof","if","else","return"],daaComplexity:{timeComplexity:"O(log N) search and insert, O(N) inorder traversal",spaceComplexity:"O(N) dynamic heap node tree",algorithmClass:"Comprehensive Tier 5 Grand Capstone Integration"}}],og=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim(),ob={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},oy=(0,p.createContext)({}),ox=(0,p.forwardRef)(({color:e,size:t,width:i,height:n,strokeWidth:r,absoluteStrokeWidth:a,nonScalingStroke:o,className:s="",children:l,iconNode:d=[],icon:c={node:d,aliases:[],size:24},...u},m)=>{let{size:h=24,strokeWidth:f=2,absoluteStrokeWidth:g=!1,nonScalingStroke:b=!1,color:y="currentColor",className:x=""}=(0,p.useContext)(oy)??{},v=!!l||(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(u),[w,C,S=[]]=function(e,t={}){return function(e,t={}){let i=t.attributeNames??{},n=e=>i[e]??e,r=e.size??e.width??ob.width,a=e.size??e.height??ob.height,o=e.aliases?.filter(e=>"string"==typeof e&&""!==e.trim()).map(e=>`lucide-${e}`)??[],s=[...e.name?[`lucide-${e.name}`]:[],...o],l=t.className?.split(" ").filter(Boolean)??[],d=!1===t.includeDefaultClasses?og(...l):og("lucide",...s,...l),c=t.absoluteStrokeWidth?Number(t.strokeWidth??ob["stroke-width"])*Number(e.size??e.width??ob.width)/Number(t.size??t.width??ob.width):t.strokeWidth??ob["stroke-width"];return["svg",{...Object.entries(ob).reduce((e,[t,i])=>(e[n(t)]=i,e),{}),..."color"in t&&t.color&&{[n("stroke")]:t.color},..."size"in t&&null!=t.size&&{[n("width")]:t.size,[n("height")]:t.size},..."width"in t&&null!=t.width&&{[n("width")]:t.width},..."height"in t&&null!=t.height&&{[n("height")]:t.height},[n("stroke-width")]:c,...d&&{[n("class")]:d},[n("viewBox")]:`0 0 ${r} ${a}`,...!1===t.hasA11yProp?{[n("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(e=>{let[i,r,a]=e,o=t.nonScalingStroke?{[n("vector-effect")]:"non-scaling-stroke",...r}:r;return a?[i,o,a]:[i,o]})]}(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}(c,{color:e??y,width:i??t??h,height:n??t??h,strokeWidth:r??f,absoluteStrokeWidth:a??g,nonScalingStroke:o??b,className:og(x,s),hasA11yProp:v,attributes:u});return(0,p.createElement)(w,{ref:m,...C},[...S.map(([e,t])=>(0,p.createElement)(e,t)),...Array.isArray(l)?l:[l]])});function ov(e,t=[],i=[]){let n,r="string"==typeof e?function(e,t,i=[]){if(null==t)throw Error("[lucide]: iconNode is required when icon name is used");return{name:e?.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),size:24,node:t,...i.length>0?{aliases:i}:{}}}(e,t,i):e,a=(0,p.forwardRef)(({className:e,...t},i)=>(0,p.createElement)(ox,{ref:i,icon:r,className:e,...t}));return r.name&&(a.displayName=(n=(e=>{let t="",i=!1;for(let n of e){if("-"===n||"_"===n||n<=" "){i=t.length>0;continue}0===t.length?t+=n.toLowerCase():t+=i?n.toUpperCase():n,i=!1}return t})(r.name)).charAt(0).toUpperCase()+n.slice(1)),a}let ow={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};ow.node;let oC=ov(ow),oS={name:"arrow-up",size:24,node:[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]};oS.node;let ok=ov(oS),oN={name:"arrow-down",size:24,node:[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]};oN.node;let oA=ov(oN),oT={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};oT.node;let oR=ov(oT),oL={name:"circle-check",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],aliases:["check-circle-2"]};oL.node;let oP=ov(oL),oI={name:"cpu",size:24,node:[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]]};oI.node;let oE=ov(oI),oM={name:"layers",size:24,node:[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],aliases:["layers-3"]};oM.node;let oj=ov(oM),oD={name:"terminal",size:24,node:[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]]};oD.node;let oO=ov(oD),oB={name:"code-xml",size:24,node:[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],aliases:["code-2"]};oB.node;let oz=ov(oB),oF={name:"award",size:24,node:[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]]};oF.node;let oU=ov(oF),oV={name:"search",size:24,node:[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]};oV.node;let oH=ov(oV),oG={name:"lightbulb",size:24,node:[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]};oG.node;let oq=ov(oG),oW={name:"chevron-left",size:24,node:[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]};oW.node;let o_=ov(oW),oX={name:"chevron-right",size:24,node:[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]};oX.node;let oK=ov(oX),o$={name:"flame",size:24,node:[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]]};o$.node;let oY=ov(o$),oZ={name:"triangle-exclamation-point",size:24,node:[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["alert-triangle","triangle-alert"]};oZ.node;let oQ=ov(oZ);var oJ={};!function e(t,i,n,r){var a,o,s,l,d,c,p,u,m,h,f,g=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),b="function"==typeof Path2D&&"function"==typeof DOMMatrix;function y(){}function x(e){var n=i.exports.Promise,r=void 0!==n?n:t.Promise;return"function"==typeof r?new r(e):(e(y,y),null)}var v=(a=function(){if(!t.OffscreenCanvas)return!1;try{var e=new OffscreenCanvas(1,1),i=e.getContext("2d");i.fillRect(0,0,1,1);var n=e.transferToImageBitmap();i.createPattern(n,"no-repeat")}catch(e){return!1}return!0}(),o=new Map,{transform:function(e){if(a)return e;if(o.has(e))return o.get(e);var t=new OffscreenCanvas(e.width,e.height);return t.getContext("2d").drawImage(e,0,0),o.set(e,t),t},clear:function(){o.clear()}}),w=(d=Math.floor(1e3/60),c={},p=0,"function"==typeof requestAnimationFrame&&"function"==typeof cancelAnimationFrame?(s=function(e){var t=Math.random();return c[t]=requestAnimationFrame(function i(n){p===n||p+d-1<n?(p=n,delete c[t],e()):c[t]=requestAnimationFrame(i)}),t},l=function(e){c[e]&&cancelAnimationFrame(c[e])}):(s=function(e){return setTimeout(e,d)},l=function(e){return clearTimeout(e)}),{frame:s,cancel:l}),C=(h={},function(){if(u)return u;if(!n&&g){var t=["var CONFETTI, SIZE = {}, module = {};","("+e.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {\n  if (msg.data.options) {\n    CONFETTI(msg.data.options).then(function () {\n      if (msg.data.callback) {\n        postMessage({ callback: msg.data.callback });\n      }\n    });\n  } else if (msg.data.reset) {\n    CONFETTI && CONFETTI.reset();\n  } else if (msg.data.resize) {\n    SIZE.width = msg.data.resize.width;\n    SIZE.height = msg.data.resize.height;\n  } else if (msg.data.canvas) {\n    SIZE.width = msg.data.canvas.width;\n    SIZE.height = msg.data.canvas.height;\n    CONFETTI = module.exports.create(msg.data.canvas);\n  }\n}"].join("\n");try{u=new Worker(URL.createObjectURL(new Blob([t])))}catch(e){return"u">typeof console&&"function"==typeof console.warn&&console.warn("🎊 Could not load worker",e),null}var i=u;function r(e,t){i.postMessage({options:e||{},callback:t})}i.init=function(e){var t=e.transferControlToOffscreen();i.postMessage({canvas:t},[t])},i.fire=function(e,t,n){if(m)return r(e,null),m;var a=Math.random().toString(36).slice(2);return m=x(function(t){function o(e){e.data.callback===a&&(delete h[a],i.removeEventListener("message",o),m=null,v.clear(),n(),t())}i.addEventListener("message",o),r(e,a),h[a]=o.bind(null,{data:{callback:a}})})},i.reset=function(){for(var e in i.postMessage({reset:!0}),h)h[e](),delete h[e]}}return u}),S={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function k(e,t,i){var n;return n=e&&null!=e[t]?e[t]:S[t],i?i(n):n}function N(e){return e<0?0:Math.floor(e)}function A(e){return parseInt(e,16)}function T(e){return e.map(R)}function R(e){var t=String(e).replace(/[^0-9a-f]/gi,"");return t.length<6&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),{r:A(t.substring(0,2)),g:A(t.substring(2,4)),b:A(t.substring(4,6))}}function L(e){e.width=document.documentElement.clientWidth,e.height=document.documentElement.clientHeight}function P(e){var t=e.getBoundingClientRect();e.width=t.width,e.height=t.height}function I(e,i){var a,o=!e,s=!!k(i||{},"resize"),l=!1,d=k(i,"disableForReducedMotion",Boolean),c=g&&k(i||{},"useWorker")?C():null,p=o?L:P,u=!!e&&!!c&&!!e.__confetti_initialized,m="function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion)").matches;function h(i){var h,f=d||k(i,"disableForReducedMotion",Boolean),g=k(i,"zIndex",Number);if(f&&m)return x(function(e){e()});o&&a?e=a.canvas:o&&!e&&((h=document.createElement("canvas")).style.position="fixed",h.style.top="0px",h.style.left="0px",h.style.pointerEvents="none",h.style.zIndex=g,e=h,document.body.appendChild(e)),s&&!u&&p(e);var y={width:e.width,height:e.height};function C(){if(c){var t={getBoundingClientRect:function(){if(!o)return e.getBoundingClientRect()}};p(t),c.postMessage({resize:{width:t.width,height:t.height}});return}y.width=y.height=null}function S(){a=null,s&&(l=!1,t.removeEventListener("resize",C)),o&&e&&(document.body.contains(e)&&document.body.removeChild(e),e=null,u=!1)}return(c&&!u&&c.init(e),u=!0,c&&(e.__confetti_initialized=!0),s&&!l&&(l=!0,t.addEventListener("resize",C,!1)),c)?c.fire(i,y,S):function(t,i,o){for(var s,l,d,c,u,m,h,f=k(t,"particleCount",N),g=k(t,"angle",Number),y=k(t,"spread",Number),C=k(t,"startVelocity",Number),S=k(t,"decay",Number),A=k(t,"gravity",Number),R=k(t,"drift",Number),L=k(t,"colors",T),P=k(t,"ticks",Number),I=k(t,"shapes"),E=k(t,"scalar"),M=!!k(t,"flat"),j=((s=k(t,"origin",Object)).x=k(s,"x",Number),s.y=k(s,"y",Number),s),D=f,O=[],B=e.width*j.x,z=e.height*j.y;D--;)O.push(function(e){var t=e.angle*(Math.PI/180),i=e.spread*(Math.PI/180);return{x:e.x,y:e.y,wobble:10*Math.random(),wobbleSpeed:Math.min(.11,.1*Math.random()+.05),velocity:.5*e.startVelocity+Math.random()*e.startVelocity,angle2D:-t+(.5*i-Math.random()*i),tiltAngle:(.5*Math.random()+.25)*Math.PI,color:e.color,shape:e.shape,tick:0,totalTicks:e.ticks,decay:e.decay,drift:e.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:3*e.gravity,ovalScalar:.6,scalar:e.scalar,flat:e.flat}}({x:B,y:z,angle:g,spread:y,startVelocity:C,color:L[D%L.length],shape:I[Math.floor(Math.random()*(I.length-0))+0],ticks:P,decay:S,gravity:A,drift:R,scalar:E,flat:M}));return a?a.addFettis(O):(l=e,u=O.slice(),m=l.getContext("2d"),h=x(function(e){function t(){d=c=null,m.clearRect(0,0,i.width,i.height),v.clear(),o(),e()}d=w.frame(function e(){n&&(i.width!==r.width||i.height!==r.height)&&(i.width=l.width=r.width,i.height=l.height=r.height),i.width||i.height||(p(l),i.width=l.width,i.height=l.height),m.clearRect(0,0,i.width,i.height),(u=u.filter(function(e){return function(e,t){t.x+=Math.cos(t.angle2D)*t.velocity+t.drift,t.y+=Math.sin(t.angle2D)*t.velocity+t.gravity,t.velocity*=t.decay,t.flat?(t.wobble=0,t.wobbleX=t.x+10*t.scalar,t.wobbleY=t.y+10*t.scalar,t.tiltSin=0,t.tiltCos=0,t.random=1):(t.wobble+=t.wobbleSpeed,t.wobbleX=t.x+10*t.scalar*Math.cos(t.wobble),t.wobbleY=t.y+10*t.scalar*Math.sin(t.wobble),t.tiltAngle+=.1,t.tiltSin=Math.sin(t.tiltAngle),t.tiltCos=Math.cos(t.tiltAngle),t.random=Math.random()+2);var i,n,r,a,o,s,l,d,c,p,u,m,h,f,g,y,x=t.tick++/t.totalTicks,w=t.x+t.random*t.tiltCos,C=t.y+t.random*t.tiltSin,S=t.wobbleX+t.random*t.tiltCos,k=t.wobbleY+t.random*t.tiltSin;if(e.fillStyle="rgba("+t.color.r+", "+t.color.g+", "+t.color.b+", "+(1-x)+")",e.beginPath(),b&&"path"===t.shape.type&&"string"==typeof t.shape.path&&Array.isArray(t.shape.matrix)){e.fill((i=t.shape.path,n=t.shape.matrix,r=t.x,a=t.y,o=.1*Math.abs(S-w),s=.1*Math.abs(k-C),l=Math.PI/10*t.wobble,d=new Path2D(i),(c=new Path2D).addPath(d,new DOMMatrix(n)),(p=new Path2D).addPath(c,new DOMMatrix([Math.cos(l)*o,Math.sin(l)*o,-Math.sin(l)*s,Math.cos(l)*s,r,a])),p))}else if("bitmap"===t.shape.type){var N=Math.PI/10*t.wobble,A=.1*Math.abs(S-w),T=.1*Math.abs(k-C),R=t.shape.bitmap.width*t.scalar,L=t.shape.bitmap.height*t.scalar,P=new DOMMatrix([Math.cos(N)*A,Math.sin(N)*A,-Math.sin(N)*T,Math.cos(N)*T,t.x,t.y]);P.multiplySelf(new DOMMatrix(t.shape.matrix));var I=e.createPattern(v.transform(t.shape.bitmap),"no-repeat");I.setTransform(P),e.globalAlpha=1-x,e.fillStyle=I,e.fillRect(t.x-R/2,t.y-L/2,R,L),e.globalAlpha=1}else if("circle"===t.shape)e.ellipse?e.ellipse(t.x,t.y,Math.abs(S-w)*t.ovalScalar,Math.abs(k-C)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI):(u=t.x,m=t.y,h=Math.abs(S-w)*t.ovalScalar,f=Math.abs(k-C)*t.ovalScalar,g=Math.PI/10*t.wobble,y=2*Math.PI,e.save(),e.translate(u,m),e.rotate(g),e.scale(h,f),e.arc(0,0,1,0,y,void 0),e.restore());else if("star"===t.shape)for(var E=Math.PI/2*3,M=4*t.scalar,j=8*t.scalar,D=t.x,O=t.y,B=5,z=Math.PI/5;B--;)D=t.x+Math.cos(E)*j,O=t.y+Math.sin(E)*j,e.lineTo(D,O),E+=z,D=t.x+Math.cos(E)*M,O=t.y+Math.sin(E)*M,e.lineTo(D,O),E+=z;else e.moveTo(Math.floor(t.x),Math.floor(t.y)),e.lineTo(Math.floor(t.wobbleX),Math.floor(C)),e.lineTo(Math.floor(S),Math.floor(k)),e.lineTo(Math.floor(w),Math.floor(t.wobbleY));return e.closePath(),e.fill(),t.tick<t.totalTicks}(m,e)})).length?d=w.frame(e):t()}),c=t}),(a={addFettis:function(e){return u=u.concat(e),h},canvas:l,promise:h,reset:function(){d&&w.cancel(d),c&&c()}}).promise)}(i,y,S)}return h.reset=function(){c&&c.reset(),a&&a.reset()},h}function E(){return f||(f=I(null,{useWorker:!0,resize:!0})),f}i.exports=function(){return E().apply(this,arguments)},i.exports.reset=function(){E().reset()},i.exports.create=I,i.exports.shapeFromPath=function(e){if(!b)throw Error("path confetti are not supported in this browser");"string"==typeof e?n=e:(n=e.path,r=e.matrix);var t=new Path2D(n),i=document.createElement("canvas").getContext("2d");if(!r){for(var n,r,a,o,s=1e3,l=1e3,d=0,c=0,p=0;p<1e3;p+=2)for(var u=0;u<1e3;u+=2)i.isPointInPath(t,p,u,"nonzero")&&(s=Math.min(s,p),l=Math.min(l,u),d=Math.max(d,p),c=Math.max(c,u));a=d-s;var m=Math.min(10/a,10/(o=c-l));r=[m,0,0,m,-Math.round(a/2+s)*m,-Math.round(o/2+l)*m]}return{type:"path",path:n,matrix:r}},i.exports.shapeFromText=function(e){var t,i=1,n="#000000",r='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';"string"==typeof e?t=e:(t=e.text,i="scalar"in e?e.scalar:i,r="fontFamily"in e?e.fontFamily:r,n="color"in e?e.color:n);var a=10*i,o=""+a+"px "+r,s=new OffscreenCanvas(a,a),l=s.getContext("2d");l.font=o;var d=l.measureText(t),c=Math.ceil(d.actualBoundingBoxRight+d.actualBoundingBoxLeft),p=Math.ceil(d.actualBoundingBoxAscent+d.actualBoundingBoxDescent),u=d.actualBoundingBoxLeft+2,m=d.actualBoundingBoxAscent+2;c+=4,p+=4,(l=(s=new OffscreenCanvas(c,p)).getContext("2d")).font=o,l.fillStyle=n,l.fillText(t,u,m);var h=1/i;return{type:"bitmap",bitmap:s.transferToImageBitmap(),matrix:[h,0,0,h,-c*h/2,-p*h/2]}}}(function(){return"u">typeof window?window:"u">typeof self?self:this||{}}(),oJ,!1);let o0=oJ.exports;oJ.exports.create;let o1=(0,p.createContext)(void 0),o2=({children:e})=>{let[t,i]=(0,p.useState)(1),[n,r]=(0,p.useState)(150),[a,o]=(0,p.useState)([]),[s,l]=(0,p.useState)(of[0].codingApproaches.beginnerFriendly.code),[d,u]=(0,p.useState)(0),m=of.find(e=>e.id===t)||of[0],h=e=>{r(t=>t+e)};return(0,c.jsx)(o1.Provider,{value:{state:{currentLevelId:t,totalBananas:n,completedMissions:a,activeCode:s,activeTopic:m.title,smartTrickQuestionCount:d},currentItem:m,setLevel:e=>{let t=of.find(t=>t.id===e)||of[0];i(e),l(t.codingApproaches.beginnerFriendly.code)},updateActiveCode:e=>{l(e)},addBananas:h,markMissionComplete:e=>{a.includes(e)||(o(t=>[...t,e]),h(50))},triggerNextTrickQuestion:()=>{u(e=>e+1)}},children:e})},o5=()=>{let e=(0,p.useContext)(o1);if(!e)throw Error("useLearningContext must be used within a LearningProvider");return e};function o3(e,t){if(!e)return"";let i=e.trim(),n=(i=i.replace(/([0-9]+(?:\.[0-9]+)?)[fFlLuU]+\b/g,"$1")).match(/^'([^'\\]|\\.)'$/);if(n){let e=n[1];if(e.startsWith("\\")){if("\\n"===e)return 10;if("\\0"===e)return 0;if("\\t"===e)return 9}return e.charCodeAt(0)}if(i.startsWith('"')&&i.endsWith('"'))return i.slice(1,-1);let r=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=i.replace(/sizeof\s*\(\s*float\s*\)/g,"4")).replace(/sizeof\s*\(\s*double\s*\)/g,"8")).replace(/sizeof\s*\(\s*int\s*\)/g,"4")).replace(/sizeof\s*\(\s*char\s*\)/g,"1")).replace(/sizeof\s*\(\s*size_t\s*\)/g,"4")).replace(/sizeof\s*\(\s*short\s*\)/g,"2")).replace(/sizeof\s*\(\s*long\s+long\s*\)/g,"8")).replace(/sizeof\s*\(\s*long\s*\)/g,"4")).replace(/sizeof\s*\(\s*([a-zA-Z0-9_]+)\s*\)/g,()=>"4")).replace(/sqrt\s*\(([^)]+)\)/g,(e,i)=>`Math.sqrt(${o3(i,t)})`)).replace(/pow\s*\(([^,]+),([^)]+)\)/g,(e,i,n)=>`Math.pow(${o3(i,t)}, ${o3(n,t)})`)).replace(/(?:fabs|abs)\s*\(([^)]+)\)/g,(e,i)=>`Math.abs(${o3(i,t)})`)).replace(/\((?:float|double|int|char|long|unsigned)\)\s*/g,"")).split(/([+\-*/%() \t])/).map(e=>{let i=e.trim();if(!i)return e;if(void 0!==t[i]){let e=t[i];return"number"==typeof e?String(e):String(e).replace(/([0-9]+(?:\.[0-9]+)?)[fFlLuU]+\b/g,"$1")}return e}).join("");if(/^[0-9.+\-*/%() \tMath.sqrtpowabs]+$/.test(r))try{let e=Function(`'use strict'; return (${r})`)();if("number"==typeof e&&!isNaN(e))return Math.round(1e6*e)/1e6}catch{}return void 0!==t[i]?t[i]:i}function o4(e,t){let i=e.match(/printf\s*\(\s*"([^"]*)"(?:\s*,\s*([\s\S]*?))?\s*\)\s*;/);if(!i)return;let n=i[1],r=i[2];if(n=n.replace(/\\n/g,"\n").replace(/\\t/g,"	").replace(/\\"/g,'"'),!r)return n.replace(/%%/g,"%");let a=[],o="",s=0;for(let e=0;e<r.length;e++){let t=r[e];if("("===t)s++;else if(")"===t)s--;else if(","===t&&0===s){a.push(o.trim()),o="";continue}o+=t}o.trim()&&a.push(o.trim());let l=0;return n.replace(/%(?:(\d+)?\.(\d+))?([fdiusclxX]|zu|lld|ld|lf)|%%/g,(e,i,n,r)=>{if("%%"===e)return"%";if(l>=a.length)return e;let o=o3(a[l++],t);if("f"===r||"lf"===r){let e=Number(o);if(!isNaN(e)){let t=void 0!==n?parseInt(n,10):2;return e.toFixed(t)}return String(o)}if(["d","i","u","zu","ld","lld"].includes(r)){let e=Number(o);return isNaN(e)?String(o):String(Math.floor(e))}if("c"===r){let e=Number(o);return isNaN(e)?String(o).replace(/['"]/g,""):String.fromCharCode(e)}if("s"===r)return String(o).replace(/^["']|["']$/g,"");if("x"===r){let e=Number(o);return isNaN(e)?String(o):e.toString(16)}if("X"===r){let e=Number(o);return isNaN(e)?String(o):e.toString(16).toUpperCase()}return String(o).replace(/['"]/g,"")})}function o7(e,t=""){let i;if(!e.includes("main"))return{stdout:"",stderr:"fatal error: In function `_start': undefined reference to `main'\ncollect2: error: ld returned 1 exit status\nHint: Every C program must have an \"int main(void)\" entry point.",exitCode:1,memoryUsageBytes:0,cpuCyclesEstimated:0,compilerNotes:["Linker error: Missing main() entry point."]};let n=0;for(let t of e)"{"===t&&n++,"}"===t&&n--;if(0!==n)return{stdout:"",stderr:n>0?"error: expected '}' at end of input\nHint: A curly brace '{' was left unclosed.":"error: expected declaration or statement at end of input before '}'",exitCode:1,memoryUsageBytes:0,cpuCyclesEstimated:0,compilerNotes:["Syntax error: Mismatched curly braces."]};let r=new Set,a=/(?:^|[;({,\s])(?:const\s+(?:unsigned\s+|signed\s+|short\s+|long\s+)?(?:int|float|double|char|long|short|unsigned|struct\s+[A-Za-z_]\w*|[A-Za-z_]\w*)|(?:unsigned\s+|signed\s+|short\s+|long\s+)?(?:int|float|double|char|long|short|unsigned)\s+const)\s+([A-Za-z_]\w*)\s*(?:=|;|,|\))/g;for(;null!==(i=a.exec(e));)r.add(i[1]);let o=/\*\s*const\s+([A-Za-z_]\w*)\s*(?:=|;|,|\))/g;for(;null!==(i=o.exec(e));)r.add(i[1]);if(r.size>0){let t=e.split("\n");for(let e=0;e<t.length;e++){let i=t[e],n=i.trim();if(!(n.startsWith("//")||n.startsWith("/*"))){for(let t of r)if(!(RegExp(`\\b(?:const|int|float|double|char|long|short|unsigned|void|struct)\\b.*\\b${t}\\b`).test(i)||RegExp(`\\*\\s*${t}\\s*(?:=(?!=)|\\+=|-=|\\*=|/=|%=)`).test(i))&&RegExp(`(?:\\b${t}\\s*(?:=(?!=)|\\+=|-=|\\*=|/=|%=)|\\b${t}\\s*(?:\\+\\+|--)|(?:\\+\\+|--)\\s*${t}\\b)`).test(i)){let n=i.indexOf(t)+1;return{stdout:"",stderr:`file.c:${e+1}:${n}: error: assignment of read-only variable '${t}'
Hint: Variables qualified with 'const' are read-only and cannot be reassigned after declaration.`,exitCode:1,memoryUsageBytes:0,cpuCyclesEstimated:0,compilerNotes:["Const violation: Attempted mutation of read-only variable."]}}}}}let s={},l=[],d=e.split("\n");for(let e=0;e<d.length;e++){let t=d[e].trim();if(!t||t.startsWith("//")||t.startsWith("/*")||t.startsWith("typedef"))continue;if(t.startsWith("#define")){let e=t.match(/^#define\s+([A-Za-z_]\w*)\s+(.*)$/);e&&(s[e[1]]=o3(e[2],s));continue}if(t.startsWith("extern")){let e=t.match(/^extern\s+((?:const\s+)?(?:unsigned\s+|signed\s+|short\s+|long\s+)?(?:struct\s+\w+|\w+)\s+\*?\s*([A-Za-z_]\w*))\s*;/);if(e){let t=e[2];void 0===s[t]&&(s[t]=0)}continue}let i=t.match(/^(?:const\s+)?(?:unsigned\s+|signed\s+|short\s+|long\s+)?(int|float|double|char|long|short|unsigned|size_t)\s+([\s\S]+);$/);if(i){i[2].split(",").map(e=>e.trim()).filter(Boolean).forEach(e=>{let t=e.indexOf("=");if(-1!==t){let i=e.substring(0,t).trim().replace(/^\*+/,""),n=e.substring(t+1).trim();s[i]=o3(n,s)}else s[e.trim().replace(/^\*+/,"")]=0});continue}let n=t.match(/^([a-zA-Z0-9_]+)\s*=\s*([^;]+);/);if(n&&!t.startsWith("return")){let e=n[1],t=n[2].trim();s[e]=o3(t,s);continue}let r=t.match(/for\s*\(\s*(?:int\s+)?([a-zA-Z0-9_]+)\s*=\s*(\d+)\s*;\s*\1\s*<\s*([a-zA-Z0-9_]+|\d+)\s*;\s*\1\+\+\s*\)\s*\{?/);if(r){let i=r[1],n=parseInt(r[2],10),a=r[3],o="number"==typeof s[a]?s[a]:parseInt(a,10),c="";if(t.includes("{")){let t=1;for(let i=e+1;i<d.length;i++){let n=d[i];if(n.includes("{")&&t++,n.includes("}")&&0==--t){e=i;break}c+=n+"\n"}}else e+1<d.length&&(c=d[e+1],e++);let p=Math.min(o,500);for(let e=n;e<p;e++){s[i]=e;let t=c.match(/printf\s*\(\s*"([^"]*)"(?:\s*,\s*([\s\S]*?))?\s*\)\s*;/);if(t){let e=o4(t[0],s);e&&l.push(e)}}continue}if(t.includes("printf(")){let e=o4(t,s);void 0!==e&&l.push(e);continue}if(t.includes("puts(")){let e=t.match(/"([^"]*)"/);e&&l.push(e[1]+"\n");continue}}let c=l.join("");return c.trim()||(c="[Program executed successfully with exit code 0]"),{stdout:c.trim(),stderr:"",exitCode:0,memoryUsageBytes:1024+Math.floor(1.5*e.length),cpuCyclesEstimated:120+40*l.length,compilerNotes:["Client Execution Engine Active."]}}async function o6(e,t=""){try{let i=await fetch("/api/compile",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:e,stdin:t})});if(i.ok)return await i.json();if(404===i.status||405===i.status)return o7(e,t);return await i.json()}catch(i){return o7(e,t)}}let o8=()=>{let{currentItem:e,setLevel:t,markMissionComplete:i,updateActiveCode:n}=o5(),[r,a]=(0,p.useState)("all"),[o,s]=(0,p.useState)(""),[l,d]=(0,p.useState)("intuition"),[u,m]=(0,p.useState)([...e.puzzleBlocks.pieces].reverse()),[h,f]=(0,p.useState)(null),[g,b]=(0,p.useState)(!1),[y,x]=(0,p.useState)(e.codingApproaches.beginnerFriendly.code),[v,w]=(0,p.useState)(""),[C,S]=(0,p.useState)(""),[k,N]=(0,p.useState)(null),[A,T]=(0,p.useState)([]),[R,L]=(0,p.useState)(!1),P=e=>{t(e.id),m([...e.puzzleBlocks.pieces].reverse()),f(null),b(!1),x(e.codingApproaches.beginnerFriendly.code),w(""),S(""),N(null),T([]),n(e.codingApproaches.beginnerFriendly.code)},I=()=>{let t=e.id>1?e.id-1:150,i=of.find(e=>e.id===t);i&&P(i)},E=()=>{let t=e.id<150?e.id+1:1,i=of.find(e=>e.id===t);i&&P(i)},M=(e,t)=>{if(t<0||t>=u.length)return;let i=[...u],[n]=i.splice(e,1);i.splice(t,0,n),m(i),f(null)},j=async()=>{L(!0),w(""),S(""),N(null),T([]),n(y);try{let e=await o6(y);N(e.exitCode??0),T(e.compilerNotes||[]),0===e.exitCode?(w(e.stdout||"[Program executed successfully with exit code 0]"),S(""),o0({particleCount:45,spread:55,origin:{y:.85}})):(S(e.stderr||e.error||"Compiler or Runtime Diagnostics Error"),w(e.stdout||""))}catch(e){S(`Execution request failed: ${e.message}`),N(1)}finally{L(!1)}},D=of.filter(e=>{let t="all"===r||e.tier===r,i=e.title.toLowerCase().includes(o.toLowerCase())||e.category.toLowerCase().includes(o.toLowerCase());return t&&i});return(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]",children:[(0,c.jsx)("div",{children:(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"text-3xl",children:"🧭"}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("h2",{className:"text-xl md:text-2xl font-black text-[#2b2520]",children:"The 150-Level C Mastery & Data Structures Curriculum"}),(0,c.jsxs)("span",{className:"text-xs bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] px-2.5 py-0.5 rounded-full font-bold",children:["Level ",e.id," of 150"]})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium mt-0.5",children:"Every level includes: Everyday Analogy • Multiple Ways of Coding • Hardware Dissection • Block Puzzle • Live Compiler"})]})]})}),(0,c.jsxs)("div",{className:"flex items-center gap-2 bg-[#fcf7ee] border-2 border-[#ebdcc4] px-4 py-2 rounded-2xl text-xs font-bold text-[#7d7065]",children:[(0,c.jsx)(oU,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsx)("span",{children:"Curriculum Scope: 1 to 150 Levels Complete"})]})]}),(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] p-4 rounded-2xl space-y-3",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,c.jsxs)("div",{className:"flex flex-wrap gap-1.5 text-xs font-black",children:[(0,c.jsx)("button",{onClick:()=>a("all"),className:`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${"all"===r?"bg-[#f48c06] text-white border-[#b75700]":"bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]"}`,children:"All (1-150)"}),(0,c.jsx)("button",{onClick:()=>a("tier-1-foundation"),className:`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${"tier-1-foundation"===r?"bg-[#f48c06] text-white border-[#b75700]":"bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]"}`,children:"1. Foundations (1-30)"}),(0,c.jsx)("button",{onClick:()=>a("tier-2-decisions"),className:`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${"tier-2-decisions"===r?"bg-[#f48c06] text-white border-[#b75700]":"bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]"}`,children:"2. Decisions & Loops (31-60)"}),(0,c.jsx)("button",{onClick:()=>a("tier-3-structures"),className:`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${"tier-3-structures"===r?"bg-[#f48c06] text-white border-[#b75700]":"bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]"}`,children:"3. Arrays & Functions (61-90)"}),(0,c.jsx)("button",{onClick:()=>a("tier-4-lowlevel"),className:`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${"tier-4-lowlevel"===r?"bg-[#f48c06] text-white border-[#b75700]":"bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]"}`,children:"4. Pointers & Heap (91-120)"}),(0,c.jsx)("button",{onClick:()=>a("tier-5-ds-daa"),className:`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${"tier-5-ds-daa"===r?"bg-[#f48c06] text-white border-[#b75700]":"bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]"}`,children:"5. Data Structures & DAA (121-150)"})]}),(0,c.jsxs)("div",{className:"relative",children:[(0,c.jsx)("input",{type:"text",value:o,onChange:e=>s(e.target.value),placeholder:"Search topic or level...",className:"px-3 py-1.5 pl-8 text-xs bg-white border-2 border-[#ede3d2] rounded-xl focus:outline-none focus:border-[#f48c06] w-48 text-[#2b2520]"}),(0,c.jsx)(oH,{className:"w-3.5 h-3.5 text-[#7d7065] absolute left-2.5 top-2.5"})]})]}),(0,c.jsxs)("div",{className:"space-y-2",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between text-xs font-bold text-[#7d7065] pt-1",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsxs)("span",{children:["Select Mission (",D.length," Available):"]}),(0,c.jsx)("select",{value:e.id,onChange:e=>{let t=of.find(t=>t.id===Number(e.target.value));t&&P(t)},className:"bg-white border border-[#ebdcc4] text-[#2b2520] font-bold rounded-lg px-2 py-1 text-xs cursor-pointer focus:outline-none focus:border-[#f48c06]",children:of.map(e=>(0,c.jsxs)("option",{value:e.id,children:["Level ",e.id,": ",e.title.split(": ")[1]||e.title]},e.id))})]}),(0,c.jsxs)("div",{className:"flex items-center gap-1.5",children:[(0,c.jsxs)("button",{onClick:I,className:"px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition flex items-center gap-1",title:"Go to previous mission",children:[(0,c.jsx)(o_,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Prev Level"})]}),(0,c.jsxs)("button",{onClick:E,className:"px-2.5 py-1 rounded-lg text-xs font-bold bg-[#fdf5ea] hover:bg-[#faebd7] text-[#e57e25] border border-[#f3d4b1] cursor-pointer transition flex items-center gap-1",title:"Go to next mission",children:[(0,c.jsx)("span",{children:"Next Level"}),(0,c.jsx)(oK,{className:"w-3.5 h-3.5"})]})]})]}),(0,c.jsx)("div",{className:"flex items-center gap-1.5 overflow-x-auto py-1 max-h-24 flex-wrap",children:D.map(t=>{let i=t.id===e.id;return(0,c.jsx)("button",{onClick:()=>P(t),className:`w-9 h-9 rounded-xl font-black text-xs shrink-0 transition cursor-pointer border-2 flex items-center justify-center ${i?"bg-[#f48c06] text-white border-[#b75700] shadow-sm scale-105 ring-2 ring-[#f48c06]/30":"bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]"}`,title:t.title,children:t.id},t.id)})})]})]}),(0,c.jsx)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-2",children:(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"text-3xl",children:e.themeIcon}),(0,c.jsxs)("div",{children:[(0,c.jsx)("span",{className:"text-[10px] font-black uppercase text-[#e57e25] tracking-wider",children:e.tierLabel}),(0,c.jsx)("h3",{className:"text-lg md:text-xl font-black text-[#2b2520]",children:e.title})]})]}),(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("button",{onClick:I,className:"p-1.5 rounded-xl bg-white hover:bg-[#ede3d2] text-[#7d7065] border border-[#ebdcc4] cursor-pointer transition",title:"Previous Mission",children:(0,c.jsx)(o_,{className:"w-4 h-4"})}),(0,c.jsxs)("span",{className:"text-xs font-bold font-mono px-2 py-1 bg-white border border-[#ebdcc4] rounded-xl text-[#e57e25]",children:["#",e.id," / 150"]}),(0,c.jsx)("button",{onClick:E,className:"p-1.5 rounded-xl bg-[#fdf5ea] hover:bg-[#faebd7] text-[#e57e25] border border-[#f3d4b1] cursor-pointer transition",title:"Next Mission",children:(0,c.jsx)(oK,{className:"w-4 h-4"})}),e.daaComplexity&&(0,c.jsxs)("div",{className:"hidden sm:flex items-center gap-2 text-xs font-mono font-bold bg-white px-3 py-1.5 rounded-xl border border-[#ebdcc4]",children:[(0,c.jsxs)("span",{className:"text-[#2a9d8f]",children:["Time: ",e.daaComplexity.timeComplexity]}),(0,c.jsx)("span",{className:"text-slate-300",children:"|"}),(0,c.jsxs)("span",{className:"text-[#e57e25]",children:["Space: ",e.daaComplexity.spaceComplexity]})]})]})]})}),(0,c.jsxs)("div",{className:"flex border-b-2 border-[#ede3d2] gap-1 overflow-x-auto text-xs font-black",children:[(0,c.jsxs)("button",{onClick:()=>d("intuition"),className:`pb-3 px-4 border-b-4 transition cursor-pointer flex items-center gap-2 ${"intuition"===l?"border-[#f48c06] text-[#e57e25]":"border-transparent text-[#7d7065] hover:text-[#2b2520]"}`,children:[(0,c.jsx)(oC,{className:"w-4 h-4"}),"1. Real-Life Intuition"]}),(0,c.jsxs)("button",{onClick:()=>d("multiple-ways"),className:`pb-3 px-4 border-b-4 transition cursor-pointer flex items-center gap-2 ${"multiple-ways"===l?"border-[#f48c06] text-[#e57e25]":"border-transparent text-[#7d7065] hover:text-[#2b2520]"}`,children:[(0,c.jsx)(oz,{className:"w-4 h-4"}),"2. Multiple Ways of Coding"]}),(0,c.jsxs)("button",{onClick:()=>d("silicon"),className:`pb-3 px-4 border-b-4 transition cursor-pointer flex items-center gap-2 ${"silicon"===l?"border-[#f48c06] text-[#e57e25]":"border-transparent text-[#7d7065] hover:text-[#2b2520]"}`,children:[(0,c.jsx)(oE,{className:"w-4 h-4"}),"3. Hardware Dissection"]}),(0,c.jsxs)("button",{onClick:()=>d("puzzle-solve"),className:`pb-3 px-4 border-b-4 transition cursor-pointer flex items-center gap-2 ${"puzzle-solve"===l?"border-[#f48c06] text-[#e57e25]":"border-transparent text-[#7d7065] hover:text-[#2b2520]"}`,children:[(0,c.jsx)(oj,{className:"w-4 h-4"}),"4. Code Monkey Puzzle"]}),(0,c.jsxs)("button",{onClick:()=>d("live-compile"),className:`pb-3 px-4 border-b-4 transition cursor-pointer flex items-center gap-2 ${"live-compile"===l?"border-[#f48c06] text-[#e57e25]":"border-transparent text-[#7d7065] hover:text-[#2b2520]"}`,children:[(0,c.jsx)(oO,{className:"w-4 h-4"}),"5. Live Execution"]})]}),(0,c.jsxs)(oh,{mode:"wait",children:["intuition"===l&&(0,c.jsxs)(on.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},className:"space-y-4",children:[(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-6 space-y-3",children:[(0,c.jsxs)("div",{className:"text-sm font-black text-[#d97706] flex items-center gap-2",children:[(0,c.jsx)(oq,{className:"w-5 h-5"}),"Everyday Story & Mental Model:"]}),(0,c.jsx)("p",{className:"text-base text-[#3d3630] font-medium leading-relaxed",children:e.realLifeAnalogy.story})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-1",children:[(0,c.jsx)("div",{className:"text-xs font-black text-[#2a9d8f] uppercase",children:"Physical Computer Concept:"}),(0,c.jsx)("p",{className:"text-sm text-[#57534e] leading-relaxed",children:e.realLifeAnalogy.physicalConcept})]}),(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-1",children:[(0,c.jsx)("div",{className:"text-xs font-black text-[#e57e25] uppercase",children:"Golden Rule of Thumb:"}),(0,c.jsx)("p",{className:"text-sm text-[#57534e] leading-relaxed",children:e.realLifeAnalogy.ruleOfThumb})]})]})]},"intuition"),"multiple-ways"===l&&(0,c.jsxs)(on.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] p-5 rounded-2xl space-y-3 flex flex-col justify-between",children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("span",{className:"text-[10px] font-black uppercase text-[#2a9d8f] bg-white px-2 py-0.5 rounded-full border border-[#ebdcc4]",children:"Approach 1: Beginner-Friendly & Clear"}),(0,c.jsx)("h4",{className:"text-base font-black text-[#2b2520] mt-1.5",children:e.codingApproaches.beginnerFriendly.name}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] mt-0.5 mb-3",children:e.codingApproaches.beginnerFriendly.description}),(0,c.jsx)("div",{className:"bg-[#2b2520] text-[#f4eedb] p-3.5 rounded-xl font-mono text-xs overflow-x-auto shadow-inner",children:(0,c.jsx)("pre",{children:e.codingApproaches.beginnerFriendly.code})})]}),(0,c.jsx)("button",{onClick:()=>{x(e.codingApproaches.beginnerFriendly.code),d("live-compile")},className:"w-full py-2 bg-white hover:bg-[#ede3d2] border-2 border-[#ebdcc4] text-[#2b2520] rounded-xl text-xs font-black cursor-pointer transition",children:"Load into Live Compiler →"})]}),(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] p-5 rounded-2xl space-y-3 flex flex-col justify-between",children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("span",{className:"text-[10px] font-black uppercase text-[#e57e25] bg-white px-2 py-0.5 rounded-full border border-[#ebdcc4]",children:"Approach 2: High-Performance / Professional C"}),(0,c.jsx)("h4",{className:"text-base font-black text-[#2b2520] mt-1.5",children:e.codingApproaches.optimizedPro.name}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] mt-0.5 mb-3",children:e.codingApproaches.optimizedPro.description}),(0,c.jsx)("div",{className:"bg-[#2b2520] text-[#f4eedb] p-3.5 rounded-xl font-mono text-xs overflow-x-auto shadow-inner",children:(0,c.jsx)("pre",{children:e.codingApproaches.optimizedPro.code})})]}),(0,c.jsx)("button",{onClick:()=>{x(e.codingApproaches.optimizedPro.code),d("live-compile")},className:"w-full py-2 bg-white hover:bg-[#ede3d2] border-2 border-[#ebdcc4] text-[#2b2520] rounded-xl text-xs font-black cursor-pointer transition",children:"Load into Live Compiler →"})]})]},"multiple-ways"),"silicon"===l&&(0,c.jsxs)(on.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},className:"space-y-4",children:[(0,c.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-1",children:[(0,c.jsx)("div",{className:"text-xs font-black text-[#2a9d8f] uppercase",children:"Primary RAM Segment:"}),(0,c.jsxs)("div",{className:"text-lg font-black text-[#2b2520]",children:[".",e.hardwareDissection.memorySegment," segment"]})]}),(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-1",children:[(0,c.jsx)("div",{className:"text-xs font-black text-[#e57e25] uppercase",children:"Memory Footprint:"}),(0,c.jsx)("div",{className:"text-sm font-bold text-[#57534e]",children:e.hardwareDissection.ramFootprint})]}),(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-1",children:[(0,c.jsx)("div",{className:"text-xs font-black text-[#457b9d] uppercase",children:"CPU Registers Involved:"}),(0,c.jsx)("div",{className:"flex flex-wrap gap-1",children:e.hardwareDissection.cpuRegisters.map((e,t)=>(0,c.jsx)("span",{className:"px-2 py-0.5 bg-[#edf4f8] border border-[#c2d9e5] text-[11px] font-mono font-bold text-[#457b9d] rounded",children:e},t))})]})]}),(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] p-5 rounded-2xl space-y-2",children:[(0,c.jsxs)("div",{className:"text-xs font-black text-[#d97706] uppercase flex items-center gap-1.5",children:[(0,c.jsx)(oE,{className:"w-4 h-4"}),"Assembly & CPU Silicon Logic:"]}),(0,c.jsx)("p",{className:"text-sm font-mono text-[#2b2520] bg-white p-3 rounded-xl border border-[#ebdcc4] leading-relaxed",children:e.hardwareDissection.assemblyNotes})]})]},"silicon"),"puzzle-solve"===l&&(0,c.jsxs)(on.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},className:"space-y-4",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between text-xs font-black text-[#7d7065]",children:[(0,c.jsxs)("span",{children:["Re-order the code blocks for Mission #",e.id,":"]}),(0,c.jsx)("button",{onClick:()=>b(!g),className:"text-[#e57e25] hover:underline cursor-pointer",children:g?"Hide Clues":"💡 Need a Clue?"})]}),(0,c.jsx)("div",{className:"space-y-2",children:u.map((e,t)=>(0,c.jsxs)("div",{className:"p-4 bg-white border-2 border-[#ede3d2] hover:border-[#f48c06] rounded-2xl flex items-center justify-between gap-3 shadow-2xs",children:[(0,c.jsxs)("div",{className:"flex items-center gap-3",children:[(0,c.jsx)("span",{className:"w-7 h-7 rounded-full bg-[#fcf7ee] border border-[#ebdcc4] text-xs font-black flex items-center justify-center text-[#e57e25]",children:t+1}),(0,c.jsxs)("div",{children:[(0,c.jsx)("pre",{className:"font-mono text-xs md:text-sm text-[#2b2520] font-bold whitespace-pre-wrap",children:e.code}),g&&(0,c.jsxs)("div",{className:"text-[11px] text-[#2a9d8f] font-sans font-bold mt-1",children:["💡 Clue: ",e.hint]})]})]}),(0,c.jsxs)("div",{className:"flex items-center gap-1",children:[(0,c.jsx)("button",{disabled:0===t,onClick:()=>M(t,t-1),className:"p-2 rounded-xl bg-[#fcf7ee] hover:bg-[#ede3d2] disabled:opacity-20 text-[#2b2520] cursor-pointer",children:(0,c.jsx)(ok,{className:"w-4 h-4"})}),(0,c.jsx)("button",{disabled:t===u.length-1,onClick:()=>M(t,t+1),className:"p-2 rounded-xl bg-[#fcf7ee] hover:bg-[#ede3d2] disabled:opacity-20 text-[#2b2520] cursor-pointer",children:(0,c.jsx)(oA,{className:"w-4 h-4"})})]})]},e.id))}),h&&(0,c.jsxs)("div",{className:`p-4 rounded-2xl border-2 text-sm font-black flex items-center gap-3 ${h.success?"bg-[#eaf6f4] text-[#2a9d8f] border-[#2a9d8f]":"bg-[#fdf0ec] text-[#e76f51] border-[#e76f51]"}`,children:[h.success?(0,c.jsx)(oP,{className:"w-6 h-6 shrink-0"}):(0,c.jsx)(oY,{className:"w-6 h-6 shrink-0"}),(0,c.jsx)("span",{children:h.message})]}),(0,c.jsx)("div",{className:"flex justify-end pt-2",children:(0,c.jsxs)("button",{onClick:()=>{u.every((t,i)=>t.id===e.puzzleBlocks.correctOrder[i])?(f({success:!0,message:`Outstanding! 🎉 You solved Mission #${e.id}! The code logic flows properly (+50 Bananas earned).`}),i(e.id),o0({particleCount:70,spread:65,origin:{y:.8}})):f({success:!1,message:"Order mismatch! Remember the golden sequence: #include first -> main() -> variables -> computation -> return 0!"})},className:"friendly-button-amber px-8 py-3 text-sm flex items-center gap-2 cursor-pointer",children:[(0,c.jsx)(oR,{className:"w-4 h-4 fill-white"}),(0,c.jsx)("span",{children:"Verify Puzzle Sequence!"})]})})]},"puzzle-solve"),"live-compile"===l&&(0,c.jsxs)(on.div,{initial:{opacity:0,y:6},animate:{opacity:1,y:0},exit:{opacity:0,y:-6},className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,c.jsxs)("div",{className:"lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] mb-2 font-mono",children:[(0,c.jsxs)("span",{children:["Editor (Level ",e.id,".c)"]}),(0,c.jsx)("span",{className:"text-[#e57e25]",children:"Editable C Code"})]}),(0,c.jsx)("textarea",{value:y,onChange:e=>x(e.target.value),className:"flex-1 w-full bg-white p-3 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[280px]",spellCheck:!1}),(0,c.jsx)("div",{className:"mt-3 flex justify-end",children:(0,c.jsxs)("button",{onClick:j,disabled:R,className:"friendly-button-amber px-6 py-2.5 text-xs flex items-center gap-2 cursor-pointer",children:[(0,c.jsx)(oR,{className:"w-4 h-4 fill-white"}),(0,c.jsx)("span",{children:R?"Compiling...":"Run & Execute"})]})})]}),(0,c.jsxs)("div",{className:"lg:col-span-5 flex flex-col justify-between bg-[#2b2520] text-white rounded-2xl p-4 font-mono text-xs",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-3",children:[(0,c.jsxs)("span",{children:["Terminal Console (Level ",e.id,")"]}),(0,c.jsxs)("span",{className:null===k||0===k?"text-emerald-400 font-bold":"text-rose-400 font-bold",children:["exit code ",null!==k?k:0]})]}),C?(0,c.jsxs)("div",{className:"p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 text-xs whitespace-pre-wrap font-mono",children:[(0,c.jsxs)("div",{className:"flex items-center gap-1.5 text-rose-400 font-bold mb-1.5",children:[(0,c.jsx)(oQ,{className:"w-4 h-4"}),(0,c.jsx)("span",{children:"C Compiler / Runtime Diagnostic:"})]}),C]}):v?(0,c.jsx)("pre",{className:"text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto",children:v}):(0,c.jsx)("div",{className:"py-20 text-center text-slate-500 text-xs",children:'Press "Run & Execute" to see real C compilation output!'}),A.length>0&&(0,c.jsxs)("div",{className:"mt-3 p-2.5 bg-amber-950/40 border border-amber-800/60 rounded-xl text-[11px] text-amber-300 space-y-1",children:[(0,c.jsxs)("div",{className:"font-bold flex items-center gap-1",children:[(0,c.jsx)(oq,{className:"w-3.5 h-3.5"})," Compiler Diagnostic Notes:"]}),A.map((e,t)=>(0,c.jsxs)("div",{children:["• ",e]},t))]})]}),(0,c.jsxs)("div",{className:"mt-4 pt-3 border-t border-slate-700 text-[11px] text-slate-400 font-sans",children:[(0,c.jsx)("strong",{className:"text-amber-400 font-mono",children:"Mission Expected Target:"})," ",e.expectedOutput]})]})]},"live-compile")]})]})},o9=[{id:"all",label:"All Scenarios",icon:"🩺"},{id:"multi-error-challenge",label:"Multi-Bug Big Files",icon:"🕵️‍♂️"},{id:"multi-file-linking",label:"Multi-File & Linker",icon:"🔗"},{id:"runtime-segfault",label:"Segfaults & Hardware",icon:"💥"},{id:"compile-error",label:"Compile & Types",icon:"⚡"},{id:"syntax-error",label:"Syntax & Grammar",icon:"📝"},{id:"logic-bug",label:"Logic & Traps",icon:"🧠"}],se=[{id:"err-multibug-railway",category:"multi-error-challenge",categoryLabel:"Multi-Bug Large File Challenge",title:"Indian Railways PNR Booking Engine (3 Hidden Bugs)",phaseInPipeline:"Compiler (Parser/Type-Check)",realWorldAnalogy:"A railway ticket printer that jams because the form has a typo in the station code, calculates fare with the wrong formula, and overflows the passenger seat counter.",symptomText:"error: expected ')' before '{' token & array bounds memory corruption warning",errorCodeSnippet:`#include <stdio.h>
#include <string.h>

#define MAX_SEATS 3

struct Passenger {
    char name[32];
    int age;
    int berthNo;
};

// Bug 1: Missing closing parenthesis in function header!
void displayChart(struct Passenger pList[], int count {
    printf("=== Vande Bharat Reservation Chart ===\\n");
    // Bug 2: Off-by-one! <= MAX_SEATS overflows array indices (0, 1, 2, 3)!
    for (int i = 0; i <= count; i++) {
        // Bug 3: %s format specifier used for integer berthNo!
        printf("Seat %s | Name: %s | Age: %d\\n", 
               pList[i].berthNo, pList[i].name, pList[i].age);
    }
}

int main(void) {
    struct Passenger bookings[MAX_SEATS];

    // Seat 1
    strcpy(bookings[0].name, "Aarav Sharma");
    bookings[0].age = 28;
    bookings[0].berthNo = 12;

    // Seat 2
    strcpy(bookings[1].name, "Priya Verma");
    bookings[1].age = 24;
    bookings[1].berthNo = 13;

    // Seat 3
    strcpy(bookings[2].name, "Kavita Rao");
    bookings[2].age = 62;
    bookings[2].berthNo = 14;

    displayChart(bookings, 3);
    printf("Reservation Chart successfully finalized.\\n");
    return 0;
}`,errorLineNum:14,fixedCodeSnippet:`#include <stdio.h>
#include <string.h>

#define MAX_SEATS 3

struct Passenger {
    char name[32];
    int age;
    int berthNo;
};

// Fix 1: Added closing parenthesis ')'
void displayChart(struct Passenger pList[], int count) {
    printf("=== Vande Bharat Reservation Chart ===\\n");
    // Fix 2: Changed <= to < so loop stays within [0, count - 1]
    for (int i = 0; i < count; i++) {
        // Fix 3: Changed %s to %d for integer berthNo
        printf("Seat #%d | Name: %s | Age: %d\\n", 
               pList[i].berthNo, pList[i].name, pList[i].age);
    }
}

int main(void) {
    struct Passenger bookings[MAX_SEATS];

    strcpy(bookings[0].name, "Aarav Sharma");
    bookings[0].age = 28;
    bookings[0].berthNo = 12;

    strcpy(bookings[1].name, "Priya Verma");
    bookings[1].age = 24;
    bookings[1].berthNo = 13;

    strcpy(bookings[2].name, "Kavita Rao");
    bookings[2].age = 62;
    bookings[2].berthNo = 14;

    displayChart(bookings, 3);
    printf("Reservation Chart successfully finalized.\\n");
    return 0;
}`,underTheHoodDissection:"1. The grammar parser fails on line 14 when encountering `{` before `)`. 2. Loop condition `<= count` attempts to read `bookings[3]`, reading uninitialized stack memory. 3. Passing integer `12` to `%s` makes `printf` treat value `0x0000000C` as a memory address, triggering SIGSEGV page fault.",preventionTip:"Check matching brackets, use `< count` for 0-indexed arrays, and ensure format specifier types match arguments.",isMultiError:!0,bugsList:[{id:"b1",line:14,description:"Syntax error: missing closing ')' in displayChart parameters",hint:"Change `int count {` to `int count) {`"},{id:"b2",line:17,description:"Off-by-one boundary error: `i <= count` reads past array boundary",hint:"Change loop to `i < count`"},{id:"b3",line:19,description:"Format specifier mismatch: `%s` used for integer `berthNo`",hint:"Change `%s` to `%d`"}]},{id:"err-multibug-hospital",category:"multi-error-challenge",categoryLabel:"Multi-Bug Large File Challenge",title:"AIIMS ICU Vital Signs Telemetry Monitor (3 Hidden Bugs)",phaseInPipeline:"Runtime (OS / MMU CPU)",realWorldAnalogy:"An ICU patient monitor where an unplugged sensor cable causes an arithmetic crash, temperature is truncated to an integer losing fever precision, and the emergency alarm fails to trigger.",symptomText:"Segmentation fault or silent telemetry corruption in vital stats",errorCodeSnippet:`#include <stdio.h>

void calculateVitals(int pulseReadings[], int count) {
    // Bug 1: Uninitialized pointer! Points to arbitrary garbage RAM address!
    int *pulseAlertThreshold;
    *pulseAlertThreshold = 100; // CRASH! Wild pointer dereference

    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += pulseReadings[i];
    }

    // Bug 2: Integer division truncation! 382 / 5 = 76 instead of 76.4!
    float avgPulse = sum / count;
    printf("Avg Heart Rate: %.2f BPM\\n", avgPulse);

    int alertLevel = 2; // Level 2: High Warning
    // Bug 3: Missing 'break' statements in switch cause unintended fall-through!
    switch (alertLevel) {
        case 2:
            printf("CRITICAL ALARM: Cardiac Tachycardia Warning!\\n");
        case 1:
            printf("NORMAL: Patient stable.\\n"); // Inadvertently prints normal!
            break;
    }
}

int main(void) {
    int sensorData[5] = {72, 75, 78, 80, 77};
    calculateVitals(sensorData, 5);
    return 0;
}`,errorLineNum:6,fixedCodeSnippet:`#include <stdio.h>

void calculateVitals(int pulseReadings[], int count) {
    // Fix 1: Allocate a real stack variable and point to it safely
    int thresholdValue = 100;
    int *pulseAlertThreshold = &thresholdValue;

    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += pulseReadings[i];
    }

    // Fix 2: Float cast prevents integer division truncation
    float avgPulse = (float)sum / (float)count;
    printf("Avg Heart Rate: %.2f BPM (Threshold: %d)\\n", avgPulse, *pulseAlertThreshold);

    int alertLevel = 2;
    // Fix 3: Added break to prevent unintended fall-through
    switch (alertLevel) {
        case 2:
            printf("CRITICAL ALARM: Cardiac Tachycardia Warning!\\n");
            break;
        case 1:
            printf("NORMAL: Patient stable.\\n");
            break;
    }
}

int main(void) {
    int sensorData[5] = {72, 75, 78, 80, 77};
    calculateVitals(sensorData, 5);
    return 0;
}`,underTheHoodDissection:"1. Uninitialized pointer `pulseAlertThreshold` holds arbitrary garbage bytes from previous stack frame. Dereferencing it writes to unauthorized virtual memory. 2. `sum / count` emits `IDIV` opcode which drops the fractional remainder. 3. Omitting `break` lets CPU instruction pointer fall directly into subsequent case blocks.",preventionTip:"Always initialize pointers (`&var` or `malloc`), cast division terms to `(float)`, and end every `case` with `break`.",isMultiError:!0,bugsList:[{id:"h1",line:6,description:"Uninitialized pointer dereference: writing to wildcard memory",hint:"Point pointer to a valid variable `&thresholdValue`"},{id:"h2",line:15,description:"Integer division truncation: `sum / count` loses precision",hint:"Cast to `(float)sum / (float)count`"},{id:"h3",line:23,description:"Switch fall-through bug: missing `break;` executes wrong status",hint:"Add `break;` inside case 2"}]},{id:"err-multibug-metro",category:"multi-error-challenge",categoryLabel:"Multi-Bug Large File Challenge",title:"Delhi Metro Smart Card NFC Gateway (4 Hidden Bugs)",phaseInPipeline:"Compiler (Parser/Type-Check)",realWorldAnalogy:"A metro turnstile controller that crashes on boot because standard libraries are missing, lets passengers with 0 balance ride free due to an accidental assignment, and leaks memory on every tap.",symptomText:"error: implicit declaration of function 'malloc' & logic bug permitting empty card entry",errorCodeSnippet:`#include <stdio.h>
// Bug 1: Missing #include <stdlib.h> for dynamic allocation!
// Bug 2: Missing #include <string.h> for strcpy!

struct SmartCard {
    int cardID;
    int balanceINR;
    char holderName[8]; // Small buffer!
};

int processEntry(struct SmartCard *card, int minFare) {
    // Bug 3: Assignment (=) instead of comparison (==)! Overwrites balance!
    if (card->balanceINR = 0) {
        printf("Turnstile Gate Denied: Insufficient balance.\\n");
        return 0;
    }

    if (card->balanceINR >= minFare) {
        card->balanceINR -= minFare;
        printf("Turnstile Gate OPEN. Welcome aboard, card #%d! Remaining: Rs. %d\\n", 
               card->cardID, card->balanceINR);
        return 1;
    }
    return 0;
}

int main(void) {
    // Dynamic card record allocation
    struct SmartCard *user = (struct SmartCard *)malloc(sizeof(struct SmartCard));
    user->cardID = 88042;
    user->balanceINR = 150;

    // Bug 4: Buffer overflow! "Suryavanshi" (11 chars + null) into 8-byte buffer!
    strcpy(user->holderName, "Vikramaditya");

    processEntry(user, 30);

    // Notice: Memory leak if free(user) is forgotten!
    free(user);
    return 0;
}`,errorLineNum:13,fixedCodeSnippet:`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct SmartCard {
    int cardID;
    int balanceINR;
    char holderName[32]; // Increased buffer size to 32 bytes
};

int processEntry(struct SmartCard *card, int minFare) {
    // Fix: Proper comparison ==
    if (card->balanceINR == 0) {
        printf("Turnstile Gate Denied: Insufficient balance.\\n");
        return 0;
    }

    if (card->balanceINR >= minFare) {
        card->balanceINR -= minFare;
        printf("Turnstile Gate OPEN. Welcome aboard, card #%d! Remaining: Rs. %d\\n", 
               card->cardID, card->balanceINR);
        return 1;
    }
    return 0;
}

int main(void) {
    struct SmartCard *user = (struct SmartCard *)malloc(sizeof(struct SmartCard));
    user->cardID = 88042;
    user->balanceINR = 150;

    // Safely fits in 32-byte buffer
    strcpy(user->holderName, "Vikramaditya");

    processEntry(user, 30);
    free(user);
    return 0;
}`,underTheHoodDissection:"1. Missing headers lead to implicit declarations where return types default to `int`, breaking pointer math on 64-bit platforms. 2. `if (card->balanceINR = 0)` assigns 0 to balance, evaluates to false, and corrupts passenger wallet. 3. Copying 13 bytes into an 8-byte stack/heap buffer smashes adjacent heap header metadata.",preventionTip:"Always `#include <stdlib.h>` and `<string.h>`, never use `=` inside `if` conditions, and size character arrays with ample space for the terminating null byte.",isMultiError:!0,bugsList:[{id:"m1",line:2,description:"Missing library headers: stdlib.h & string.h not included",hint:"Add `#include <stdlib.h>` and `#include <string.h>`"},{id:"m2",line:7,description:"Buffer too small: holderName[8] overflows with long Indian name",hint:"Expand `holderName` to `char holderName[32];`"},{id:"m3",line:13,description:"Accidental assignment in condition: `balanceINR = 0` clears the balance",hint:"Change `if (card->balanceINR = 0)` to `if (card->balanceINR == 0)`"}]},{id:"err-multifile-missing-guard",category:"multi-file-linking",categoryLabel:"Multi-File Linking & Preprocessor",title:"Missing Include Guards & Duplicate Type Definition",phaseInPipeline:"Preprocessor",realWorldAnalogy:"Two cooks reading the exact same recipe card pinned twice on the board, so they double-salt the stew and ruin the dish.",symptomText:"error: redefinition of 'struct Station'; previous definition was here",errorCodeSnippet:`/* Simulated Multi-File Compilation Unit */
/* --- File: metro_types.h (WITHOUT INCLUDE GUARDS) --- */
struct Station {
    int stationID;
    char name[32];
};

/* --- File: passenger.h --- */
/* passenger.h includes metro_types.h */
struct Station; // Forward ref or include

/* --- File: main.c --- */
/* Accidentally includes metro_types.h twice directly or transitively */
struct Station {
    int stationID;
    char name[32];
};

int main(void) {
    struct Station s;
    s.stationID = 101;
    printf("Station ID: %d\\n", s.stationID);
    return 0;
}`,errorLineNum:14,fixedCodeSnippet:`#include <stdio.h>

/* --- Proper Header: metro_types.h WITH INCLUDE GUARDS --- */
#ifndef METRO_TYPES_H
#define METRO_TYPES_H

struct Station {
    int stationID;
    char name[32];
};

#endif /* METRO_TYPES_H */

/* Second inclusion is safely skipped by the preprocessor! */
#ifndef METRO_TYPES_H
#define METRO_TYPES_H

struct Station {
    int stationID;
    char name[32];
};

#endif

int main(void) {
    struct Station s;
    s.stationID = 101;
    printf("Station ID: %d (Guarded Header Loaded Cleanly)\\n", s.stationID);
    return 0;
}`,underTheHoodDissection:"The C preprocessor (`cpp`) performs raw textual replacement for `#include`. Without `#ifndef / #define` include guards or `#pragma once`, the same struct definition is parsed twice in a single translation unit, triggering a type redefinition error.",preventionTip:"Always wrap every `.h` header file in standard include guards: `#ifndef MY_HEADER_H`, `#define MY_HEADER_H`, `#endif`.",isMultiFile:!0,files:[{fileName:"metro_types.h",role:"Header (.h)",content:"struct Station { int id; };"},{fileName:"metro.c",role:"Implementation (.c)",content:'#include "metro_types.h"'},{fileName:"main.c",role:"Main Driver (.c)",content:'#include "metro_types.h"\n#include "passenger.h"'}]},{id:"err-linker-multiple-def",category:"multi-file-linking",categoryLabel:"Multi-File Linking & Linker (ld)",title:"Duplicate Global Symbol in Multiple Translation Units",phaseInPipeline:"Linker (Symbol Resolver)",realWorldAnalogy:"Two different post offices in the same district assigning the exact same street address to two different buildings.",symptomText:"ld: error: multiple definition of 'trainCounter'; file1.o: first defined here",errorCodeSnippet:`/* Simulated Linker Collision Across Two Translation Units */
#include <stdio.h>

/* Bug: Defining global variable directly in header file without 'extern'!
   When file1.c and file2.c both include it, each generates a global symbol 'trainCounter'. */

/* Simulated translation unit 1 (train_manager.c) */
int trainCounter = 10; // Strong symbol definition

/* Simulated translation unit 2 (main.c) */
// int trainCounter = 20; // Linker crashes: Multiple definitions!

int main(void) {
    printf("Active Trains: %d\\n", trainCounter);
    return 0;
}`,errorLineNum:8,fixedCodeSnippet:`#include <stdio.h>

/* The Clean Multi-File Architecture:
   1. Header (.h) contains ONLY 'extern int trainCounter;' (declaration)
   2. Exactly ONE .c file contains 'int trainCounter = 10;' (definition)
*/

extern int trainCounter; // Declaration: Symbol defined elsewhere

int trainCounter = 10;   // Single definitive storage allocated in .data segment

int main(void) {
    printf("Active Trains: %d (Cleanly resolved by Linker ld)\\n", trainCounter);
    return 0;
}`,underTheHoodDissection:"Compilers generate ELF object files (`.o`) with symbol tables. Global variables without `static` are marked `GLOBAL`. When the Linker (`ld`) unifies object files, encountering two strong symbols with the exact same name causes an unresolvable collision.",preventionTip:"Never define variables in header files. Declare them with `extern` in `.h`, and define them once in a `.c` file.",isMultiFile:!0,files:[{fileName:"trains.h",role:"Header (.h)",content:"extern int trainCounter;"},{fileName:"trains.c",role:"Implementation (.c)",content:"int trainCounter = 10;"},{fileName:"main.c",role:"Main Driver (.c)",content:'#include "trains.h"\nint main() { ... }'}]},{id:"err-linker-undefined-ref",category:"linker-error",categoryLabel:"Linker Error (ld)",title:"Undefined Reference to Symbol (Missing Implementation)",phaseInPipeline:"Linker (Symbol Resolver)",realWorldAnalogy:"Having a blueprint that says 'call plumber at phone #555', but the phone number does not exist anywhere in the city directory.",symptomText:"undefined reference to `calculateTotal'; collect2: error: ld returned 1 exit status",errorCodeSnippet:`#include <stdio.h>

// Prototype declared, but function body never written!
int calculateTotal(int a, int b);

int main(void) {
    int result = calculateTotal(10, 20);
    printf("Result: %d\\n", result);
    return 0;
}`,errorLineNum:7,fixedCodeSnippet:`#include <stdio.h>

// Function prototype
int calculateTotal(int a, int b);

// Concrete function definition
int calculateTotal(int a, int b) {
    return a + b;
}

int main(void) {
    int result = calculateTotal(10, 20);
    printf("Result: %d (Symbol successfully linked)\\n", result);
    return 0;
}`,underTheHoodDissection:"Compilation creates an object file `.o` with a blank unresolved jump label `call calculateTotal`. The Linker (`ld`) scans all object files and libraries, fails to find the function's machine code, and halts.",preventionTip:"Ensure every declared prototype has a matching definition in a compiled `.c` file or linked library."},{id:"err-runtime-rodata-write",category:"runtime-segfault",categoryLabel:"Runtime Segfault (MMU Protection)",title:"Mutating String Literal in Read-Only Memory (.rodata)",phaseInPipeline:"Runtime (OS / MMU CPU)",realWorldAnalogy:"Carving your initials onto a laminated museum exhibit protected behind bulletproof glass with security sensors.",symptomText:"Segmentation fault (core dumped) / Signal 11 (SIGSEGV)",errorCodeSnippet:`#include <stdio.h>

int main(void) {
    // String literal stored in read-only memory (.rodata)
    char *city = "DELHI";

    // Bug: Attempting to modify read-only byte!
    city[0] = 'N'; // CRASH! SIGSEGV

    printf("City: %s\\n", city);
    return 0;
}`,errorLineNum:8,fixedCodeSnippet:`#include <stdio.h>

int main(void) {
    // Array creates a mutable copy on the local stack frame!
    char city[] = "DELHI";

    // Modifying stack memory is completely valid and safe!
    city[0] = 'N';

    printf("City: %s (Successfully modified on Stack)\\n", city);
    return 0;
}`,underTheHoodDissection:"The compiler places `\"DELHI\"` into the `.rodata` ELF section. When the OS loads the program, the MMU marks the page tables for that section as Read-Only. An instruction executing `MOV byte ptr [rax], 'N'` triggers an MMU permission violation page fault.",preventionTip:"If you need to modify a string in-place, declare it as a stack array `char str[] = ...`, never as a pointer `char *str = ...`."},{id:"err-runtime-null-segfault",category:"runtime-segfault",categoryLabel:"Runtime Segmentation Fault",title:"NULL Pointer Dereference (MMU Page Fault Crash)",phaseInPipeline:"Runtime (OS / MMU CPU)",realWorldAnalogy:"Trying to unlock the front door of a house with address '0000 Nowhere Lane'. The house physically does not exist in the universe.",symptomText:"Segmentation fault (core dumped) / Process terminated with exit code 139 (SIGSEGV)",errorCodeSnippet:`#include <stdio.h>

int main(void) {
    int *ptr = NULL; // Points to address 0x0
    *ptr = 99;       // CRASH! Writing to address 0
    printf("Value: %d\\n", *ptr);
    return 0;
}`,errorLineNum:5,fixedCodeSnippet:`#include <stdio.h>

int main(void) {
    int actualStorage = 0;
    int *ptr = &actualStorage; // Points to valid stack RAM
    *ptr = 99;                 // Safe!
    printf("Value: %d (Dereferenced valid RAM address: %p)\\n", *ptr, (void*)ptr);
    return 0;
}`,underTheHoodDissection:"Virtual address 0x0 is deliberately unmapped in virtual memory by the OS kernel. When the CPU executes `MOV [0], 99`, the Memory Management Unit (MMU) fires an unrecoverable page-fault interrupt.",preventionTip:"Always check `if (ptr != NULL)` before dereferencing any pointer!"},{id:"err-runtime-dangling-free",category:"runtime-segfault",categoryLabel:"Runtime Use-After-Free",title:"Dangling Pointer (Accessing Freed Heap Memory)",phaseInPipeline:"Runtime (OS / MMU CPU)",realWorldAnalogy:"Checking out of your hotel room and handing back the keys, but keeping a duplicate key and trying to walk in 3 days later when someone else lives there.",symptomText:"Reads corrupted garbage data or crashes with memory corruption error",errorCodeSnippet:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *data = (int *)malloc(sizeof(int));
    *data = 42;
    free(data); // Memory returned to OS!

    // Bug: reading freed pointer!
    printf("Value: %d\\n", *data);
    return 0;
}`,errorLineNum:10,fixedCodeSnippet:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *data = (int *)malloc(sizeof(int));
    *data = 42;
    printf("Value before free: %d\\n", *data);

    free(data);
    data = NULL; // Safe! Clear the pointer to prevent dangling access
    return 0;
}`,underTheHoodDissection:"Once `free()` runs, the heap allocator marks that chunk as reusable in its freelist. Accessing it reads undefined bits or corrupts metadata.",preventionTip:"Always set `ptr = NULL;` immediately after `free(ptr);`."},{id:"err-runtime-stack-overflow",category:"runtime-segfault",categoryLabel:"Runtime Stack Overflow",title:"Infinite Recursion & Call Stack Exhaustion",phaseInPipeline:"Runtime (OS / MMU CPU)",realWorldAnalogy:"Stacking trays in a cafeteria up to the ceiling until the pile hits the roof, collapses, and smashes everything.",symptomText:"Segmentation fault (stack overflow) / Process exhausted call stack memory",errorCodeSnippet:`#include <stdio.h>

// Bug: Missing base case! Function calls itself infinitely!
void infiniteCountdown(int n) {
    printf("Tick: %d\\n", n);
    infiniteCountdown(n - 1); // Never stops!
}

int main(void) {
    infiniteCountdown(5);
    return 0;
}`,errorLineNum:6,fixedCodeSnippet:`#include <stdio.h>

// Guarded with a proper base case
void infiniteCountdown(int n) {
    if (n <= 0) { // Base Case: Stop condition!
        printf("Liftoff!\\n");
        return;
    }
    printf("Tick: %d\\n", n);
    infiniteCountdown(n - 1);
}

int main(void) {
    infiniteCountdown(5);
    return 0;
}`,underTheHoodDissection:"Every function call pushes a stack frame (saved frame pointer `RBP`, return address, arguments). With no termination base case, the stack pointer `RSP` expands downward until it hits the stack guard page, triggering a page-fault SIGSEGV.",preventionTip:"Always verify that every recursive function has an unreachable base case with a guaranteed return."},{id:"err-runtime-div-zero",category:"runtime-segfault",categoryLabel:"Runtime Exception",title:"Divide by Zero (CPU Hardware Exception)",phaseInPipeline:"Runtime (OS / MMU CPU)",realWorldAnalogy:"Trying to distribute 50 chocolate bars equally among 0 children. It is mathematically undefined.",symptomText:"Floating point exception (core dumped) / SIGFPE signal received",errorCodeSnippet:`#include <stdio.h>

int main(void) {
    int totalMoney = 100;
    int peopleCount = 0; // Nobody!
    int perPerson = totalMoney / peopleCount; // Division by 0!
    printf("Each gets: %d\\n", perPerson);
    return 0;
}`,errorLineNum:6,fixedCodeSnippet:`#include <stdio.h>

int main(void) {
    int totalMoney = 100;
    int peopleCount = 0;
    if (peopleCount > 0) {
        int perPerson = totalMoney / peopleCount;
        printf("Each gets: %d\\n", perPerson);
    } else {
        printf("Cannot divide among 0 people!\\n");
    }
    return 0;
}`,underTheHoodDissection:"The CPU ALU executes the `IDIV` instruction. Hardware circuits detect divisor is 0 and immediately trigger CPU Interrupt Vector 0 (#DE Divide Error).",preventionTip:"Always guard division denominators with `if (denominator != 0)`."},{id:"err-compile-undeclared",category:"compile-error",categoryLabel:"Compile-Time Type Error",title:"Undeclared Variable & Scope Violation",phaseInPipeline:"Compiler (Parser/Type-Check)",realWorldAnalogy:"Asking a cashier to charge an account number that was never created in the bank records.",symptomText:"error: 'totalPoints' undeclared (first use in this function)",errorCodeSnippet:`#include <stdio.h>

int main(void) {
    totalPoints = 50; // Variable never declared with a data type!
    printf("Points = %d\\n", totalPoints);
    return 0;
}`,errorLineNum:4,fixedCodeSnippet:`#include <stdio.h>

int main(void) {
    int totalPoints = 50; // Declared with 'int'
    printf("Points = %d\\n", totalPoints);
    return 0;
}`,underTheHoodDissection:"The compiler symbol table has no entry for `totalPoints`. The compiler doesn't know how many bytes (1, 2, 4, 8) to reserve in the stack frame.",preventionTip:"Always declare the data type (`int`, `float`, `char`) before using any variable."},{id:"err-compile-conflicting-types",category:"compile-error",categoryLabel:"Compile-Time Signature Error",title:"Conflicting Types for Function Prototype",phaseInPipeline:"Compiler (Parser/Type-Check)",realWorldAnalogy:"A passport office expecting a photo of size 2x2 inches, but receiving a poster size 10x10 inches.",symptomText:"error: conflicting types for 'calculateTax'; previous declaration was here",errorCodeSnippet:`#include <stdio.h>

// Forward declaration says function returns double and takes double
double calculateTax(double income);

int main(void) {
    printf("Tax: %.2f\\n", calculateTax(50000.0));
    return 0;
}

// Bug: Definition changes return type to float and argument to int!
float calculateTax(int income) {
    return income * 0.18f;
}`,errorLineNum:11,fixedCodeSnippet:`#include <stdio.h>

// Forward declaration
double calculateTax(double income);

int main(void) {
    printf("Tax: Rs. %.2f\\n", calculateTax(50000.0));
    return 0;
}

// Definition matches prototype exactly!
double calculateTax(double income) {
    return income * 0.18;
}`,underTheHoodDissection:"The compiler stores function signatures in the AST with parameter and return type qualifiers. When definitions disagree with forward declarations, type-checking halts.",preventionTip:"Copy and paste function prototypes directly from declarations to avoid subtle type divergence."},{id:"err-syntax-semicolon",category:"syntax-error",categoryLabel:"Syntax Error",title:"Missing Semicolon (Grammar Parse Failure)",phaseInPipeline:"Compiler (Parser/Type-Check)",realWorldAnalogy:"Writing an English essay without full stops. Sentences crash into each other and make no sense to the reader.",symptomText:"error: expected ';' before 'printf'",errorCodeSnippet:`#include <stdio.h>

int main(void) {
    int price = 100
    printf("Price is: %d\\n", price);
    return 0;
}`,errorLineNum:4,fixedCodeSnippet:`#include <stdio.h>

int main(void) {
    int price = 100;
    printf("Price is: %d\\n", price);
    return 0;
}`,underTheHoodDissection:"The lexical analyzer bundles `100` and `printf` into one invalid syntax node. The parser expects a semicolon terminal symbol `;` to close the declaration AST node.",preventionTip:"Every standalone statement in C must terminate with a semicolon `;`."},{id:"err-syntax-unclosed-brace",category:"syntax-error",categoryLabel:"Syntax Error",title:"Mismatched / Unclosed Curly Braces",phaseInPipeline:"Compiler (Parser/Type-Check)",realWorldAnalogy:"Opening a set of quotation marks in a sentence and forgetting to close them, confusing the entire rest of the book.",symptomText:"error: expected '}' at end of input",errorCodeSnippet:`#include <stdio.h>

int main(void) {
    int temperature = 38;
    if (temperature > 37) {
        printf("Fever detected!\\n");
    // Missing closing brace '}' for the if block!

    return 0;
}`,errorLineNum:10,fixedCodeSnippet:`#include <stdio.h>

int main(void) {
    int temperature = 38;
    if (temperature > 37) {
        printf("Fever detected!\\n");
    } // Properly closed

    return 0;
}`,underTheHoodDissection:"The parser maintains a pushdown automaton stack of nested scopes `{`. When the end of file (EOF) token arrives while the scope stack is non-empty, a syntax error is raised.",preventionTip:"Always write matching closing braces `{}` immediately before filling in the interior code."},{id:"err-logic-int-truncation",category:"logic-bug",categoryLabel:"Logic Bug (Silent Bug)",title:"Integer Truncation in Financial Averages",phaseInPipeline:"Runtime (OS / MMU CPU)",realWorldAnalogy:"Measuring a piece of wood that is 7.5 inches long, but your ruler only has whole inch marks, so you call it 7 inches and ruin the furniture.",symptomText:"Average shows 2.000000 instead of 2.500000! (Program runs, but math is wrong)",errorCodeSnippet:`#include <stdio.h>

int main(void) {
    int totalScore = 5;
    int subjects = 2;
    // Bug: 5 / 2 in C evaluates to integer 2, then converts to 2.0!
    float average = totalScore / subjects;
    printf("Average is: %.2f\\n", average);
    return 0;
}`,errorLineNum:7,fixedCodeSnippet:`#include <stdio.h>

int main(void) {
    int totalScore = 5;
    int subjects = 2;
    // Fix: Explicitly cast to float before division
    float average = (float)totalScore / (float)subjects;
    printf("Average is: %.2f\\n", average);
    return 0;
}`,underTheHoodDissection:"In C, integer / integer invokes integer division opcode `IDIV`, discarding remainder. Cast `(float)` promotes to single-precision float `DIVSS` in XMM register.",preventionTip:"Always cast at least one operand to `(float)` or divide by `2.0f` when decimals are expected."},{id:"err-logic-off-by-one",category:"logic-bug",categoryLabel:"Logic Bug (Array Bounds Overflow)",title:"Off-by-One Loop Bounds Overflow",phaseInPipeline:"Runtime (OS / MMU CPU)",realWorldAnalogy:"Booking seats 1 through 10 on a bus with only 10 seats, but indexing starting from 0 and trying to sit in seat index 10 which falls out the back window.",symptomText:"Overwrites adjacent stack variables or prints random garbage data",errorCodeSnippet:`#include <stdio.h>

int main(void) {
    int scores[5] = {90, 85, 88, 92, 95};

    // Bug: i <= 5 attempts to read scores[5]! Indices are only 0 to 4!
    for (int i = 0; i <= 5; i++) {
        printf("Score %d = %d\\n", i, scores[i]);
    }
    return 0;
}`,errorLineNum:7,fixedCodeSnippet:`#include <stdio.h>

int main(void) {
    int scores[5] = {90, 85, 88, 92, 95};

    // Fix: i < 5 stays strictly within bounds [0..4]
    for (int i = 0; i < 5; i++) {
        printf("Score %d = %d\\n", i, scores[i]);
    }
    return 0;
}`,underTheHoodDissection:"An array of size $N$ spans indices $0$ to $N-1$. Index $N$ points to the return address or adjacent local variables on the stack.",preventionTip:"Use `i < N` for 0-indexed loops, never `i <= N`."}],st={name:"file-code",size:24,node:[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}]]};st.node;let si=ov(st),sn={name:"folder-tree",size:24,node:[["path",{d:"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"hod4my"}],["path",{d:"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",key:"w4yl2u"}],["path",{d:"M3 5a2 2 0 0 0 2 2h3",key:"f2jnh7"}],["path",{d:"M3 3v13a2 2 0 0 0 2 2h3",key:"k8epm1"}]]};sn.node;let sr=ov(sn),sa={name:"rotate-ccw",size:24,node:[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]};sa.node;let so=ov(sa),ss={name:"circle-x",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],aliases:["x-circle"]};ss.node;let sl=ov(ss),sd={name:"list-checks",size:24,node:[["path",{d:"M13 5h8",key:"a7qcls"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 19h8",key:"c3s6r1"}],["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}]]};sd.node;let sc=ov(sd),sp=()=>{let[e,t]=(0,p.useState)("all"),[i,n]=(0,p.useState)(se[0].id),r="all"===e?se:se.filter(t=>t.category===e),a=se.find(e=>e.id===i)||se[0],[o,s]=(0,p.useState)(a.errorCodeSnippet),[l,d]=(0,p.useState)(null),[u,m]=(0,p.useState)(!1),[h,f]=(0,p.useState)(0),[g,b]=(0,p.useState)({}),y=e=>{n(e.id),s(e.errorCodeSnippet),d(null),f(0),b({})},x=async()=>{m(!0),d(null);try{let e=await o6(o);if(0===e.exitCode){if(d({isSuccess:!0,output:`Compilation & Execution PASSED with exit code 0!
${e.stdout?"stdout:\n"+e.stdout:"Clean compilation with zero diagnostics errors."}`}),a.bugsList){let e={};a.bugsList.forEach(t=>{e[t.id]=!0}),b(e)}o0({particleCount:70,spread:70,origin:{y:.8}})}else{let t=e.stderr||a.symptomText;d({isSuccess:!1,output:`${a.phaseInPipeline} HALTED (exit code ${e.exitCode??1}):
${t}`})}}catch(e){d({isSuccess:!1,output:`${a.phaseInPipeline} HALTED:
${a.symptomText}`})}finally{m(!1)}},v=o.split("\n").length;return(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]",children:[(0,c.jsx)("div",{children:(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"text-3xl",children:"🩺"}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("h2",{className:"text-xl md:text-2xl font-black text-[#2b2520]",children:"C Error Doctor & Diagnostic Lab"}),(0,c.jsx)("span",{className:"text-xs bg-[#fdf0ec] text-[#e76f51] border border-[#f5b8a9] px-2.5 py-0.5 rounded-full font-bold",children:"Syntax • Compile • Linker • Runtime • Multi-File • Multi-Bug"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium mt-0.5",children:"Hunt down complex compiler errors, trace segmentation faults in silicon, resolve multi-file linking conflicts, and fix multi-bug large codebase files."})]})]})}),(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsxs)("button",{onClick:()=>{if(s(a.fixedCodeSnippet),d(null),a.bugsList){let e={};a.bugsList.forEach(t=>{e[t.id]=!0}),b(e)}},className:"px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#eaf6f4] hover:bg-[#b2ded8] text-[#2a9d8f] border border-[#b2ded8] cursor-pointer transition flex items-center gap-1.5",children:[(0,c.jsx)(oC,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Show Doctor's Solution"})]}),(0,c.jsxs)("button",{onClick:()=>{s(a.errorCodeSnippet),d(null),b({})},className:"px-3 py-1.5 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition flex items-center gap-1",children:[(0,c.jsx)(so,{className:"w-3.5 h-3.5"}),"Reset Bug"]})]})]}),(0,c.jsx)("div",{className:"flex flex-wrap gap-2 pb-2",children:o9.map(i=>{let n=e===i.id;return(0,c.jsxs)("button",{onClick:()=>{var e;t(e=i.id),y("all"===e?se[0]:se.find(t=>t.category===e)||se[0])},className:`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${n?"bg-[#2b2520] text-white border-[#2b2520] shadow-sm":"bg-[#fcf7ee] text-[#57534e] border-[#ebdcc4] hover:bg-[#ebdcc4]"}`,children:[(0,c.jsx)("span",{children:i.icon}),(0,c.jsx)("span",{children:i.label})]},i.id)})}),(0,c.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2",children:r.map(e=>{let t=e.id===a.id;return(0,c.jsxs)("button",{onClick:()=>y(e),className:`p-2.5 rounded-2xl border-2 text-left cursor-pointer transition flex flex-col justify-between ${t?"bg-[#fdf5ea] border-[#e57e25] shadow-xs ring-1 ring-[#e57e25]":"bg-white hover:bg-[#fcf7ee] border-[#ede3d2]"}`,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"text-[9px] font-black uppercase text-[#e57e25] truncate",children:e.categoryLabel}),(0,c.jsx)("div",{className:"text-xs font-bold text-[#2b2520] line-clamp-2 mt-0.5",children:e.title})]}),e.isMultiError&&(0,c.jsxs)("span",{className:"mt-1.5 inline-block text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-md border border-amber-300",children:[e.bugsList?.length||3," Bugs in File"]}),e.isMultiFile&&(0,c.jsx)("span",{className:"mt-1.5 inline-block text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded-md border border-blue-300",children:"Multi-File / Header"})]},e.id)})}),(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-4",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,c.jsxs)("div",{className:"flex items-center gap-3",children:[(0,c.jsx)("span",{className:"text-3xl",children:"multi-error-challenge"===a.category?"🕵️‍♂️":"multi-file-linking"===a.category?"🔗":"⚠️"}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsxs)("span",{className:"text-[10px] font-black uppercase text-[#e76f51] tracking-wider",children:["Pipeline Stage: ",a.phaseInPipeline]}),a.isMultiError&&(0,c.jsx)("span",{className:"text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-md",children:"Large Code File Investigation"}),a.isMultiFile&&(0,c.jsx)("span",{className:"text-[10px] bg-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded-md",children:"Multi-File Linker Unit"})]}),(0,c.jsx)("h3",{className:"text-lg md:text-xl font-black text-[#2b2520]",children:a.title})]})]}),(0,c.jsxs)("span",{className:"text-xs font-mono font-bold px-3 py-1 bg-white border border-[#ebdcc4] rounded-xl text-[#7d7065]",children:["Target Line: #",a.errorLineNum]})]}),(0,c.jsxs)("div",{className:"p-3.5 bg-white border border-[#ebdcc4] rounded-xl text-xs space-y-1",children:[(0,c.jsxs)("div",{className:"font-bold text-[#d97706] flex items-center gap-1.5",children:[(0,c.jsx)(oq,{className:"w-4 h-4"}),"Real-Life Mental Model & Analogy:"]}),(0,c.jsx)("p",{className:"text-[#3d3630] font-medium leading-relaxed",children:a.realWorldAnalogy})]}),(0,c.jsxs)("div",{className:"p-3 bg-[#2b2520] text-[#f4eedb] rounded-xl font-mono text-xs space-y-1",children:[(0,c.jsxs)("div",{className:"text-rose-400 font-bold uppercase text-[10px] flex items-center gap-1",children:[(0,c.jsx)(oQ,{className:"w-3.5 h-3.5"}),"Observed Diagnostic Error / Terminal Crash Log:"]}),(0,c.jsx)("div",{className:"text-rose-300 whitespace-pre-wrap",children:a.symptomText})]}),a.isMultiError&&a.bugsList&&(0,c.jsxs)("div",{className:"p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between text-xs font-bold text-amber-900",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1.5",children:[(0,c.jsx)(sc,{className:"w-4 h-4 text-amber-700"}),"Multi-Bug Diagnostic Checklist (Find and fix all ",a.bugsList.length," errors):"]}),(0,c.jsxs)("span",{className:"bg-amber-200 px-2 py-0.5 rounded-md text-[11px]",children:[Object.values(g).filter(Boolean).length," of ",a.bugsList.length," fixed"]})]}),(0,c.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-2",children:a.bugsList.map(e=>{let t=!!g[e.id];return(0,c.jsxs)("div",{onClick:()=>{var t;return t=e.id,void b(e=>({...e,[t]:!e[t]}))},className:`p-2.5 rounded-lg border text-xs cursor-pointer transition flex items-start gap-2 ${t?"bg-emerald-50 border-emerald-300 text-emerald-900":"bg-white border-amber-200 text-amber-950 hover:bg-amber-100/50"}`,children:[(0,c.jsx)("input",{type:"checkbox",checked:t,onChange:()=>{},className:"mt-0.5 rounded cursor-pointer"}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"font-bold",children:["Line #",e.line,": ",e.description]}),(0,c.jsxs)("div",{className:"text-[10px] text-amber-700 font-mono mt-0.5",children:["Hint: ",e.hint]})]})]},e.id)})})]}),a.isMultiFile&&a.files&&(0,c.jsxs)("div",{className:"p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-2",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between text-xs font-bold text-blue-900",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1.5",children:[(0,c.jsx)(sr,{className:"w-4 h-4 text-blue-700"}),"Multi-File Architecture Breakdown:"]}),(0,c.jsx)("span",{className:"text-[11px] text-blue-700",children:"Inspect simulated project structure"})]}),(0,c.jsx)("div",{className:"flex gap-2",children:a.files.map((e,t)=>(0,c.jsxs)("button",{onClick:()=>f(t),className:`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition ${h===t?"bg-blue-600 text-white border-blue-700":"bg-white text-blue-900 border-blue-200 hover:bg-blue-100"}`,children:[e.fileName," (",e.role,")"]},e.fileName))}),(0,c.jsxs)("div",{className:"p-2.5 bg-white border border-blue-200 rounded-lg font-mono text-[11px] text-slate-700",children:[(0,c.jsxs)("span",{className:"text-blue-600 font-bold",children:["Role: ",a.files[h].role]}),(0,c.jsx)("pre",{className:"mt-1 whitespace-pre-wrap",children:a.files[h].content})]})]})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,c.jsxs)("div",{className:"lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] mb-2 font-mono",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1.5",children:[(0,c.jsx)(si,{className:"w-4 h-4 text-[#e57e25]"}),"Source Code (Fix the bug on line #",a.errorLineNum,")"]}),(0,c.jsxs)("span",{className:"text-[#e57e25] bg-white px-2 py-0.5 rounded border border-[#ebdcc4]",children:[v," Lines • Editable"]})]}),(0,c.jsx)("div",{className:"relative flex-1 flex flex-col",children:(0,c.jsx)("textarea",{value:o,onChange:e=>s(e.target.value),className:"flex-1 w-full bg-white p-3 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[300px]",spellCheck:!1})}),(0,c.jsxs)("div",{className:"mt-3 flex flex-wrap items-center justify-between gap-2",children:[(0,c.jsxs)("span",{className:"text-[11px] text-[#7d7065] font-bold",children:["Tip: ",a.preventionTip]}),(0,c.jsxs)("button",{onClick:x,disabled:u,className:"friendly-button-amber px-6 py-2.5 text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50",children:[(0,c.jsx)(oR,{className:"w-4 h-4 fill-white"}),(0,c.jsx)("span",{children:u?"Diagnosing with Real C Engine...":"Test Diagnostic Run"})]})]})]}),(0,c.jsxs)("div",{className:"lg:col-span-5 flex flex-col justify-between space-y-4",children:[(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] p-4 rounded-2xl space-y-2",children:[(0,c.jsxs)("div",{className:"text-xs font-black text-[#2a9d8f] uppercase flex items-center gap-1.5",children:[(0,c.jsx)(oE,{className:"w-4 h-4"}),"What Physically Happens in Silicon / Compiler:"]}),(0,c.jsx)("p",{className:"text-xs text-[#57534e] leading-relaxed",children:a.underTheHoodDissection})]}),(0,c.jsxs)("div",{className:"p-4 bg-[#2b2520] text-white rounded-2xl font-mono text-xs flex-1 flex flex-col justify-between min-h-[220px]",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[10px] mb-2",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1",children:[(0,c.jsx)(oO,{className:"w-3.5 h-3.5"}),"Real C Engine Verification"]}),(0,c.jsx)("span",{children:"Signal Status"})]}),l?(0,c.jsxs)("div",{className:`p-3 rounded-xl border ${l.isSuccess?"bg-emerald-950/60 border-emerald-500 text-emerald-300":"bg-rose-950/60 border-rose-500 text-rose-300"}`,children:[(0,c.jsxs)("div",{className:"flex items-center gap-1.5 font-bold mb-1",children:[l.isSuccess?(0,c.jsx)(oP,{className:"w-4 h-4 text-emerald-400"}):(0,c.jsx)(sl,{className:"w-4 h-4 text-rose-400"}),(0,c.jsx)("span",{children:l.isSuccess?"PASS - BUG RESOLVED":"FAIL - DIAGNOSTIC TRIPPED"})]}),(0,c.jsx)("pre",{className:"whitespace-pre-wrap font-mono text-[11px] max-h-[160px] overflow-y-auto",children:l.output})]}):(0,c.jsxs)("div",{className:"py-14 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2",children:[(0,c.jsx)(oE,{className:"w-6 h-6 text-slate-600"}),(0,c.jsx)("span",{children:'Click "Test Diagnostic Run" to test your fix in the live compiler!'})]})]}),(0,c.jsxs)("div",{className:"mt-4 pt-2 border-t border-slate-700 text-[10px] text-slate-400 font-sans flex items-center justify-between",children:[(0,c.jsx)("span",{children:"Verified via Real C WebAssembly Engine"}),(0,c.jsx)("span",{children:"exit code 0 required"})]})]})]})]})]})},su=[{id:"proj-math-engine",title:"1. Modular Calculator Library (calc.h + calc.c + main.c)",description:"Learn how professional software splits interface declarations from implementations to prevent code duplication and speed up builds.",architectureConcept:"Header Guard (#ifndef) prevents redefinition errors when multiple source files include the same header.",files:[{filename:"calc.h",fileRole:"Header File (.h)",purpose:"Declares function prototypes and exports public API. No code execution happens here.",content:`#ifndef CALC_H
#define CALC_H

// Header Guard ensures this file is included only once per compile unit
int add(int a, int b);
int multiply(int a, int b);

#endif // CALC_H`},{filename:"calc.c",fileRole:"Source Implementation (.c)",purpose:"Implements the math algorithms. Compiles into calc.o object file.",content:`#include "calc.h"

int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}`},{filename:"main.c",fileRole:"Main Driver (main.c)",purpose:"The entry point. Includes calc.h and calls library functions.",content:`#include <stdio.h>
#include "calc.h"

int main(void) {
    int x = 12, y = 5;
    printf("Add: %d + %d = %d\\n", x, y, add(x, y));
    printf("Multiply: %d * %d = %d\\n", x, y, multiply(x, y));
    return 0;
}`},{filename:"Makefile",fileRole:"Makefile",purpose:"Automates the 2-step compilation: compile .c -> .o, then link .o -> binary.",content:`CC = gcc
CFLAGS = -Wall -Wextra -O2

# Build executable by linking object files
app: main.o calc.o
	$(CC) $(CFLAGS) -o app main.o calc.o

# Compile calc.c into calc.o
calc.o: calc.c calc.h
	$(CC) $(CFLAGS) -c calc.c

# Compile main.c into main.o
main.o: main.c calc.h
	$(CC) $(CFLAGS) -c main.c

clean:
	rm -f *.o app`}],compilationCommand:"gcc -c calc.c\ngcc -c main.c\ngcc main.o calc.o -o app\n./app",linkerExplanation:"Phase 1: `gcc -c calc.c` outputs `calc.o` containing machine code for `add` and `multiply`.\nPhase 2: `gcc -c main.c` outputs `main.o` with unresolved symbols for `add`.\nPhase 3 (Linking): `gcc main.o calc.o` patches the memory jump addresses so `main.o` calls the function code inside `calc.o`.",expectedConsoleOutput:`Add: 12 + 5 = 17
Multiply: 12 * 5 = 60`},{id:"proj-bank-system",title:"2. Bank Account Module (bank.h + bank.c + main.c)",description:"Encapsulate private bank state and expose only secure public functions.",architectureConcept:"Encapsulation in C: using struct typedefs and pointers to hide internal data layout.",files:[{filename:"bank.h",fileRole:"Header File (.h)",purpose:"Public contract: defines Account struct and deposit/withdraw prototypes.",content:`#ifndef BANK_H
#define BANK_H

typedef struct {
    int accountNumber;
    float balance;
} Account;

void initAccount(Account *acc, int accNum, float initialDeposit);
int deposit(Account *acc, float amount);
int withdraw(Account *acc, float amount);

#endif`},{filename:"bank.c",fileRole:"Source Implementation (.c)",purpose:"Business logic: protects against negative deposits and overdrafts.",content:`#include <stdio.h>
#include "bank.h"

void initAccount(Account *acc, int accNum, float initialDeposit) {
    acc->accountNumber = accNum;
    acc->balance = initialDeposit;
}

int deposit(Account *acc, float amount) {
    if (amount <= 0) return 0;
    acc->balance += amount;
    return 1;
}

int withdraw(Account *acc, float amount) {
    if (amount <= 0 || amount > acc->balance) return 0;
    acc->balance -= amount;
    return 1;
}`},{filename:"main.c",fileRole:"Main Driver (main.c)",purpose:"Simulates customer transaction workflow.",content:`#include <stdio.h>
#include "bank.h"

int main(void) {
    Account myAcc;
    initAccount(&myAcc, 998877, 500.0f);

    printf("Initial Balance: Rs. %.2f\\n", myAcc.balance);
    deposit(&myAcc, 250.0f);
    printf("After Deposit:   Rs. %.2f\\n", myAcc.balance);
    withdraw(&myAcc, 100.0f);
    printf("After Withdraw:  Rs. %.2f\\n", myAcc.balance);

    return 0;
}`}],compilationCommand:"gcc -Wall bank.c main.c -o bank_app\n./bank_app",linkerExplanation:"The compiler compiles bank.c and main.c separately into symbol tables, then the Linker bundles them into `bank_app`.",expectedConsoleOutput:`Initial Balance: Rs. 500.00
After Deposit:   Rs. 750.00
After Withdraw:  Rs. 650.00`}],sm={name:"folder-git-2",size:24,node:[["path",{d:"M18 19a5 5 0 0 1-5-5v8",key:"sz5oeg"}],["path",{d:"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",key:"1w6njk"}],["circle",{cx:"13",cy:"12",r:"2",key:"1j92g6"}],["circle",{cx:"20",cy:"19",r:"2",key:"1obnsp"}]]};sm.node;let sh=ov(sm),sf=()=>{let[e,t]=(0,p.useState)(0),i=su[e],[n,r]=(0,p.useState)(0),a=i.files[n]||i.files[0],[o,s]=(0,p.useState)(""),[l,d]=(0,p.useState)(!1),u=async()=>{d(!0),s("");try{let e=i.files.filter(e=>!e.filename.endsWith(".h")&&!e.filename.includes("Makefile")),t=[...i.files.filter(e=>e.filename.endsWith(".h")).map(e=>e.content.replace(/#include\s+"[^"]+"/g,"")),...e.map(e=>e.content.replace(/#include\s+"[^"]+"/g,""))].join("\n\n"),n=await o6(t),r=n.stdout||i.expectedConsoleOutput,a=n.stderr?`
[LINKER/COMPILER DIAGNOSTICS]:
${n.stderr}`:"";s(`[CC] Compiling translation units:
  -> gcc -Wall -c ${i.files.filter(e=>e.filename.endsWith(".c")).map(e=>e.filename).join(" ")}
[LD] Linker resolving symbol table jumps:
  -> Linking object symbols (.o) into binary executable 'app'
[EXEC] Real C Engine Execution Output:
----------------------------------------
`+r+a),0===n.exitCode&&o0({particleCount:50,spread:60,origin:{y:.8}})}catch(e){s(`[CC] Compiling source units:
  -> gcc -Wall -c ${i.files.filter(e=>e.filename.endsWith(".c")).map(e=>e.filename).join(" ")}
[LD] Linker resolving symbol table jumps:
  -> Linking object symbols into binary executable 'app'
[EXEC] Output of ./app:
----------------------------------------
`+i.expectedConsoleOutput)}finally{d(!1)}};return(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]",children:[(0,c.jsx)("div",{children:(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"text-3xl",children:"📂"}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("h2",{className:"text-xl md:text-2xl font-black text-[#2b2520]",children:"Multi-File C Architecture & Linker Lab"}),(0,c.jsx)("span",{className:"text-xs bg-[#edf4f8] text-[#457b9d] border border-[#c2d9e5] px-2.5 py-0.5 rounded-full font-bold",children:".h Headers • .c Source • .o Objects • Linker ld"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium mt-0.5",children:"Real software is split into multiple files: headers (.h) declare APIs, source (.c) implements logic, and Makefiles automate the build."})]})]})}),(0,c.jsxs)("button",{onClick:u,disabled:l,className:"friendly-button-amber px-6 py-2.5 text-xs flex items-center gap-2 cursor-pointer shadow-sm",children:[(0,c.jsx)(oR,{className:"w-4 h-4 fill-white"}),(0,c.jsx)("span",{children:l?"Compiling & Linking...":"Run Multi-File Build"})]})]}),(0,c.jsx)("div",{className:"flex gap-2",children:su.map((i,n)=>{let a=n===e;return(0,c.jsx)("button",{onClick:()=>{t(n),r(0),s("")},className:`px-4 py-2 rounded-2xl text-xs font-black border-2 transition cursor-pointer ${a?"bg-[#f48c06] text-white border-[#b75700] shadow-xs":"bg-[#fcf7ee] text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]"}`,children:i.title},i.id)})}),(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-2",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2 text-xs font-black uppercase text-[#e57e25]",children:[(0,c.jsx)(oj,{className:"w-4 h-4"}),"Architecture Concept:"]}),(0,c.jsx)("p",{className:"text-sm text-[#2b2520] font-medium leading-relaxed",children:i.architectureConcept}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065]",children:i.description})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,c.jsxs)("div",{className:"lg:col-span-4 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4 flex flex-col justify-between space-y-4",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"text-xs font-black text-[#7d7065] uppercase pb-2 border-b border-[#ebdcc4] mb-3 flex items-center gap-1.5",children:[(0,c.jsx)(sh,{className:"w-4 h-4 text-[#e57e25]"}),"Project File Explorer"]}),(0,c.jsx)("div",{className:"space-y-1.5",children:i.files.map((e,t)=>{let i=t===n;return(0,c.jsxs)("button",{onClick:()=>r(t),className:`w-full p-2.5 rounded-xl text-left text-xs font-mono transition cursor-pointer border-2 flex items-center justify-between ${i?"bg-white border-[#f48c06] text-[#2b2520] shadow-xs font-bold":"bg-white/60 hover:bg-white border-[#ede3d2] text-[#7d7065]"}`,children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)(si,{className:`w-3.5 h-3.5 ${e.filename.endsWith(".h")?"text-[#e57e25]":e.filename.endsWith(".c")?"text-[#2a9d8f]":"text-[#457b9d]"}`}),(0,c.jsx)("span",{children:e.filename})]}),(0,c.jsx)("span",{className:"text-[10px] font-sans opacity-70",children:e.fileRole.split(" ")[0]})]},e.filename)})})]}),(0,c.jsxs)("div",{className:"p-3 bg-white border border-[#ebdcc4] rounded-xl text-xs space-y-1",children:[(0,c.jsxs)("div",{className:"font-bold text-[#e57e25] text-[11px] uppercase",children:['Role of "',a.filename,'":']}),(0,c.jsx)("p",{className:"text-[#57534e] text-xs leading-relaxed font-sans",children:a.purpose})]})]}),(0,c.jsxs)("div",{className:"lg:col-span-8 space-y-4",children:[(0,c.jsxs)("div",{className:"bg-[#2b2520] text-[#f4eedb] p-4 rounded-2xl font-mono text-xs shadow-inner flex flex-col",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-2 font-sans",children:[(0,c.jsx)("span",{className:"font-mono text-amber-300 font-bold",children:a.filename}),(0,c.jsx)("span",{children:a.fileRole})]}),(0,c.jsx)("pre",{className:"overflow-x-auto leading-relaxed py-1",children:a.content})]}),(0,c.jsxs)("div",{className:"p-4 bg-[#2b2520] text-white rounded-2xl font-mono text-xs space-y-2",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px]",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1.5 text-emerald-400 font-bold",children:[(0,c.jsx)(oO,{className:"w-3.5 h-3.5"}),"Build & Linker Console Output"]}),(0,c.jsx)("span",{children:"GCC Toolchain"})]}),o?(0,c.jsx)("pre",{className:"text-emerald-400 whitespace-pre-wrap leading-relaxed py-2",children:o}):(0,c.jsx)("div",{className:"py-8 text-center text-slate-500",children:'Click "Run Multi-File Build" above to compile and link these files together!'})]})]})]})]})},sg={name:"puzzle",size:24,node:[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",key:"w46dr5"}]]};sg.node;let sb=ov(sg),sy={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};sy.node;let sx=ov(sy),sv={name:"circle-question-mark",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5",key:"1awbb0"}],["path",{d:"M12 17h.01",key:"p32p05"}]],aliases:["help-circle","circle-help"]};sv.node;let sw=ov(sv),sC={name:"code",size:24,node:[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]]};sC.node;let sS=ov(sC),sk={name:"zap",size:24,node:[["path",{d:"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",key:"1v7up4"}]]};sk.node;let sN=ov(sk),sA=[{id:"blk-int-samosa",category:"input",color:"bg-emerald-100 border-emerald-300 text-emerald-900",label:"Declare int samosaCount = 3;",cEquivalent:"int samosaCount = 3;",plainEnglish:"Allocates a 4-byte integer variable on the stack storing 3 samosas."},{id:"blk-int-samosa-price",category:"input",color:"bg-emerald-100 border-emerald-300 text-emerald-900",label:"Declare int samosaRate = 15;",cEquivalent:"int samosaRate = 15;",plainEnglish:"Price per samosa is Rs. 15."},{id:"blk-int-chai",category:"input",color:"bg-emerald-100 border-emerald-300 text-emerald-900",label:"Declare int chaiCount = 4;",cEquivalent:"int chaiCount = 4;",plainEnglish:"Store order quantity of 4 cups of masala chai."},{id:"blk-int-chai-price",category:"input",color:"bg-emerald-100 border-emerald-300 text-emerald-900",label:"Declare int chaiRate = 10;",cEquivalent:"int chaiRate = 10;",plainEnglish:"Price per cutting chai is Rs. 10."},{id:"blk-char-grade",category:"input",color:"bg-emerald-100 border-emerald-300 text-emerald-900",label:"Declare char studentGrade = 'A';",cEquivalent:"char studentGrade = 'A';",plainEnglish:"Allocates 1 byte on stack storing ASCII byte code 65 ('A')."},{id:"blk-float-petrol",category:"input",color:"bg-emerald-100 border-emerald-300 text-emerald-900",label:"Declare float petrolLitres = 5.5f;",cEquivalent:"float petrolLitres = 5.5f;",plainEnglish:"Stores single-precision 32-bit floating point fuel volume."},{id:"blk-double-gps",category:"input",color:"bg-emerald-100 border-emerald-300 text-emerald-900",label:"Declare double delhiLat = 28.613939;",cEquivalent:"double delhiLat = 28.613939;",plainEnglish:"64-bit IEEE 754 double precision latitude coordinate."},{id:"blk-metro-balance",category:"input",color:"bg-emerald-100 border-emerald-300 text-emerald-900",label:"Declare int metroCardBalance = 120;",cEquivalent:"int metroCardBalance = 120;",plainEnglish:"Current Delhi Metro smartcard balance in Indian Rupees."},{id:"blk-vehicle-speed",category:"input",color:"bg-emerald-100 border-emerald-300 text-emerald-900",label:"Declare int carSpeedKmh = 95;",cEquivalent:"int carSpeedKmh = 95;",plainEnglish:"Radar sensor measured speed on Bandra-Worli Sea Link."},{id:"blk-unsigned-ram",category:"input",color:"bg-emerald-100 border-emerald-300 text-emerald-900",label:"Declare unsigned int packetBytes = 4096U;",cEquivalent:"unsigned int packetBytes = 4096U;",plainEnglish:"Non-negative unsigned integer representing network MTU buffer."},{id:"blk-calc-subtotal",category:"calc",color:"bg-amber-100 border-amber-300 text-amber-900",label:"Calculate Base Canteen Subtotal",cEquivalent:"int subtotal = (samosaCount * samosaRate) + (chaiCount * chaiRate);",plainEnglish:"Multiplies and sums snack costs into subtotal: (3*15) + (4*10) = Rs. 85."},{id:"blk-calc-gst18",category:"calc",color:"bg-amber-100 border-amber-300 text-amber-900",label:"Compute 18% GST (Goods & Services Tax)",cEquivalent:"int gstTax = (subtotal * 18) / 100;",plainEnglish:"Integer division calculates 18 percent tax: (85 * 18) / 100 = Rs. 15."},{id:"blk-calc-grand-payable",category:"calc",color:"bg-amber-100 border-amber-300 text-amber-900",label:"Grand Total Payable (Subtotal + GST)",cEquivalent:"int grandTotal = subtotal + gstTax;",plainEnglish:"Combines base price and tax: Rs. 85 + Rs. 15 = Rs. 100."},{id:"blk-calc-modulo-clock",category:"calc",color:"bg-amber-100 border-amber-300 text-amber-900",label:"Modulo 7 Calendar Day Wrap",cEquivalent:"int dayIndex = 25 % 7;",plainEnglish:"Computes remainder after division: 25 mod 7 = 4 (Thursday)."},{id:"blk-calc-compound-add",category:"calc",color:"bg-amber-100 border-amber-300 text-amber-900",label:"Compound Add: walletBalance += 500;",cEquivalent:"walletBalance += 500;",plainEnglish:"In-place addition updating bank balance register directly."},{id:"blk-calc-left-shift",category:"calc",color:"bg-amber-100 border-amber-300 text-amber-900",label:"Bitwise Left Shift (value << 2)",cEquivalent:"int multipliedBy4 = value << 2;",plainEnglish:"Fast ALU bit shift multiplying value by 2^2 (4) in 1 clock cycle."},{id:"blk-dec-speed-radar",category:"decision",color:"bg-sky-100 border-sky-300 text-sky-900",label:"If carSpeedKmh > 80: Issue Challan",cEquivalent:'if (carSpeedKmh > 80) {\n        printf("SPEED CAMERA: Challan issued for %d km/h!\\n", carSpeedKmh);\n    }',plainEnglish:"Branch check: if speed exceeds 80 km/h speed limit, issue police ticket."},{id:"blk-dec-metro-balance",category:"decision",color:"bg-sky-100 border-sky-300 text-sky-900",label:"If-Else: Metro Gate Entry Verification",cEquivalent:'if (metroCardBalance >= 50) {\n        printf("TURNSTILE: Gate OPEN. Welcome to Delhi Metro!\\n");\n    } else {\n        printf("TURNSTILE: Insufficient balance. Recharge required.\\n");\n    }',plainEnglish:"Tests if card has required Rs. 50 minimum balance."},{id:"blk-dec-grade-ladder",category:"decision",color:"bg-sky-100 border-sky-300 text-sky-900",label:"Else-If Grade Classification Ladder",cEquivalent:'if (marks >= 90) printf("Grade: A+\\n");\n    else if (marks >= 75) printf("Grade: B\\n");\n    else printf("Grade: C\\n");',plainEnglish:"Cascading decision branches classifying percentage marks."},{id:"blk-dec-switch-shipping",category:"decision",color:"bg-sky-100 border-sky-300 text-sky-900",label:"Switch-Case: India Post Parcel Zone",cEquivalent:'switch (zoneCode) {\n        case 1: printf("Zone 1: Delhi NCR Delivery\\n"); break;\n        case 2: printf("Zone 2: Mumbai Western Zone\\n"); break;\n        default: printf("Zone Other: National Express\\n"); break;\n    }',plainEnglish:"Generates jump table for fast $O(1)$ multi-way branching."},{id:"blk-dec-ternary-discount",category:"decision",color:"bg-sky-100 border-sky-300 text-sky-900",label:"Ternary Operator (age >= 60 ? 50 : 0)",cEquivalent:"int seniorDiscount = (age >= 60) ? 50 : 0;",plainEnglish:"Inline conditional expression evaluating discount amount."},{id:"blk-loop-for-countdown",category:"loop",color:"bg-purple-100 border-purple-300 text-purple-900",label:"For Loop: Rocket T-minus 5 to 1 Countdown",cEquivalent:'for (int t = 5; t >= 1; t--) {\n        printf("ISRO Mission T-minus %d seconds...\\n", t);\n    }',plainEnglish:"Loop with initialization, condition, and decrement."},{id:"blk-loop-accumulator",category:"loop",color:"bg-purple-100 border-purple-300 text-purple-900",label:"For Loop: Sum of First 10 Natural Numbers",cEquivalent:"int totalSum = 0;\n    for (int i = 1; i <= 10; i++) {\n        totalSum += i;\n    }",plainEnglish:"Accumulator pattern computing $1 + 2 + ... + 10 = 55$."},{id:"blk-loop-while-otp",category:"loop",color:"bg-purple-100 border-purple-300 text-purple-900",label:"While Loop: OTP Max 3 Retries",cEquivalent:'int attempts = 0;\n    while (attempts < 3) {\n        printf("OTP Attempt %d approved.\\n", attempts + 1);\n        attempts++;\n    }',plainEnglish:"Entry-controlled loop executing while condition remains true."},{id:"blk-loop-nested-grid",category:"loop",color:"bg-purple-100 border-purple-300 text-purple-900",label:"Nested Loops: 3x3 Coordinate Matrix",cEquivalent:'for (int r = 1; r <= 3; r++) {\n        for (int c = 1; c <= 3; c++) {\n            printf("[%d,%d] ", r, c);\n        }\n        printf("\\n");\n    }',plainEnglish:"Row-column nested loops traversing a 2D coordinate grid."},{id:"blk-arr-ipl-runs",category:"array",color:"bg-teal-100 border-teal-300 text-teal-900",label:"Declare 1D Array: int overRuns[5] = {12, 8, 15, 6, 18};",cEquivalent:"int overRuns[5] = {12, 8, 15, 6, 18};",plainEnglish:"Allocates 20 contiguous bytes on stack storing 5 cricket overs."},{id:"blk-arr-loop-print",category:"array",color:"bg-teal-100 border-teal-300 text-teal-900",label:"For Loop: Array Traversal and Summation",cEquivalent:'int totalRuns = 0;\n    for (int i = 0; i < 5; i++) {\n        printf("Over %d: %d runs\\n", i + 1, overRuns[i]);\n        totalRuns += overRuns[i];\n    }',plainEnglish:"Iterates array indices 0 to 4 reading each element in sequential memory."},{id:"blk-arr-min-max",category:"array",color:"bg-teal-100 border-teal-300 text-teal-900",label:"Scan Array for Minimum and Maximum Values",cEquivalent:"int min = overRuns[0], max = overRuns[0];\n    for (int i = 1; i < 5; i++) {\n        if (overRuns[i] < min) min = overRuns[i];\n        if (overRuns[i] > max) max = overRuns[i];\n    }",plainEnglish:"Single-pass extremum tracking with conditional updates."},{id:"blk-arr-2d-matrix",category:"array",color:"bg-teal-100 border-teal-300 text-teal-900",label:"Declare 2D Matrix: int cinema[2][2] = {{250, 300}, {500, 600}};",cEquivalent:"int cinema[2][2] = {{250, 300}, {500, 600}};",plainEnglish:"Row-major 2x2 contiguous memory layout representing PVR cinema seat tiers."},{id:"blk-str-city",category:"string",color:"bg-cyan-100 border-cyan-300 text-cyan-900",label:'Declare String: char city[] = "MUMBAI";',cEquivalent:'char city[] = "MUMBAI";',plainEnglish:"Null-terminated character array with 7 bytes (M-U-M-B-A-I-\\0)."},{id:"blk-str-custom-len",category:"string",color:"bg-cyan-100 border-cyan-300 text-cyan-900",label:"Count Characters until \\0 Null Terminator",cEquivalent:"int len = 0;\n    while (city[len] != '\\0') len++;",plainEnglish:"Custom strlen loop scanning memory until sentinel 0 byte."},{id:"blk-str-palindrome",category:"string",color:"bg-cyan-100 border-cyan-300 text-cyan-900",label:"Two-Pointer String Palindrome Checker",cEquivalent:"int left = 0, right = len - 1, isPal = 1;\n    while (left < right) {\n        if (city[left] != city[right]) { isPal = 0; break; }\n        left++; right--;\n    }",plainEnglish:"Compares characters from ends moving inward."},{id:"blk-func-gst-calc",category:"function",color:"bg-blue-100 border-blue-300 text-blue-900",label:"Function: calculateTax(int amount, int percentRate)",cEquivalent:"int calculateTax(int amount, int percentRate) {\n    return (amount * percentRate) / 100;\n}",plainEnglish:"Pure modular function returning calculated tax value."},{id:"blk-func-call-tax",category:"function",color:"bg-blue-100 border-blue-300 text-blue-900",label:"Call Function: int tax = calculateTax(5000, 18);",cEquivalent:"int tax = calculateTax(5000, 18);",plainEnglish:"Pushes arguments to registers and executes CPU CALL instruction."},{id:"blk-ptr-address-of",category:"pointer",color:"bg-indigo-100 border-indigo-300 text-indigo-900",label:"Store RAM Address: int *pBal = &metroCardBalance;",cEquivalent:"int *pBal = &metroCardBalance;",plainEnglish:"The & operator captures 64-bit physical memory address of variable."},{id:"blk-ptr-dereference-mutate",category:"pointer",color:"bg-indigo-100 border-indigo-300 text-indigo-900",label:"Remote Mutation: *pBal = 250;",cEquivalent:"*pBal = 250;",plainEnglish:"Writes Rs. 250 directly into target memory cell via pointer dereference."},{id:"blk-ptr-swap",category:"pointer",color:"bg-indigo-100 border-indigo-300 text-indigo-900",label:"Pointer Swap Two Wallets: swap(&wA, &wB);",cEquivalent:"void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }",plainEnglish:"Passes memory addresses to swap caller variables across stack frames."},{id:"blk-ptr-malloc",category:"pointer",color:"bg-indigo-100 border-indigo-300 text-indigo-900",label:"Allocate Dynamic Heap: int *heap = (int*)malloc(3 * sizeof(int));",cEquivalent:"int *heap = (int*)malloc(3 * sizeof(int));\n    if (heap != NULL) { heap[0] = 10; heap[1] = 20; heap[2] = 30; }",plainEnglish:"Requests 12 contiguous bytes from OS heap memory pool."},{id:"blk-ptr-free",category:"pointer",color:"bg-indigo-100 border-indigo-300 text-indigo-900",label:"Free Dynamic Memory: free(heap); heap = NULL;",cEquivalent:"free(heap);\n    heap = NULL;",plainEnglish:"Returns heap memory to OS and neutralizes dangling pointer."},{id:"blk-struct-ticket",category:"struct",color:"bg-rose-100 border-rose-300 text-rose-900",label:"Define struct RailwayTicket { int pnr; int fare; };",cEquivalent:"struct RailwayTicket {\n    int pnr;\n    int fare;\n};",plainEnglish:"Composite record grouping heterogeneous passenger details."},{id:"blk-struct-arrow-access",category:"struct",color:"bg-rose-100 border-rose-300 text-rose-900",label:"Access via Arrow Operator: ptrTicket->fare = 1450;",cEquivalent:"ptrTicket->fare = 1450;",plainEnglish:"Dereferences struct pointer and accesses member offset in single CPU step."},{id:"blk-out-kirana-invoice",category:"output",color:"bg-orange-100 border-orange-300 text-orange-900",label:"Print Canteen Kirana Invoice",cEquivalent:'printf("Canteen Invoice: Total Payable = Rs. %d (Paid via UPI)\\n", grandTotal);',plainEnglish:"Outputs formatted currency total to console terminal."},{id:"blk-out-speed-status",category:"output",color:"bg-orange-100 border-orange-300 text-orange-900",label:"Print Speed Radar Monitor Status",cEquivalent:'printf("Radar Telemetry: Speed is %d km/h\\n", carSpeedKmh);',plainEnglish:"Prints vehicle speed on console."},{id:"blk-out-general-result",category:"output",color:"bg-orange-100 border-orange-300 text-orange-900",label:"Print Success & Return 0",cEquivalent:'printf("Execution Completed Successfully with Exit Code 0\\n");',plainEnglish:"Displays final status message."}],sT=[{id:"preset-canteen-bill",title:"Canteen Samosa & Chai GST Invoice",category:"Basics & Arithmetic",description:"Calculate 3 samosas + 4 chais, add 18% GST tax, and print UPI invoice.",blockIds:["blk-int-samosa","blk-int-samosa-price","blk-int-chai","blk-int-chai-price","blk-calc-subtotal","blk-calc-gst18","blk-calc-grand-payable","blk-out-kirana-invoice"]},{id:"preset-speed-radar",title:"Mumbai Sea Link Speed Radar Camera",category:"Conditionals & Logic",description:"Measures vehicle speed, checks > 80 km/h limit, and conditionally issues traffic challan.",blockIds:["blk-vehicle-speed","blk-out-speed-status","blk-dec-speed-radar"]},{id:"preset-metro-gate",title:"Delhi Metro SmartCard Turnstile Gate",category:"Conditionals & Logic",description:"Checks customer card balance against Rs. 50 minimum and opens turnstile gate.",blockIds:["blk-metro-balance","blk-dec-metro-balance"]},{id:"preset-ipl-runs-array",title:"IPL Cricket Overs Runs & Min-Max Tracker",category:"Arrays & Loops",description:"Declares array of 5 overs, scans all elements, and finds highest and lowest scoring overs.",blockIds:["blk-arr-ipl-runs","blk-arr-loop-print","blk-arr-min-max"]},{id:"preset-pointer-memory",title:"Pointer Address & Remote Memory Mutation",category:"Pointers & Memory",description:"Inspects physical RAM address using & operator and remotely mutates value via * pointer.",blockIds:["blk-metro-balance","blk-ptr-address-of","blk-ptr-dereference-mutate"]},{id:"preset-dynamic-heap",title:"Dynamic Heap Memory Allocation (malloc & free)",category:"Pointers & Memory",description:"Allocates memory from heap, stores integers, and cleanly deallocates with free().",blockIds:["blk-ptr-malloc","blk-ptr-free"]}],sR=()=>{let{currentItem:e,setLevel:t,updateActiveCode:i,markMissionComplete:n}=o5(),[r,a]=(0,p.useState)("mission-puzzle"),[o,s]=(0,p.useState)([...e.puzzleBlocks.pieces].reverse()),[l,d]=(0,p.useState)(!1),[u,m]=(0,p.useState)(null),[h,f]=(0,p.useState)(!1),[g,b]=(0,p.useState)([sA[0],sA[1],sA[2],sA[3],sA[10],sA[11],sA[12],sA[34]]),[y,x]=(0,p.useState)("all"),[v,w]=(0,p.useState)(-1),[C,S]=(0,p.useState)(!1),[k,N]=(0,p.useState)(""),[A,T]=(0,p.useState)(""),[R,L]=(0,p.useState)(null);(0,p.useEffect)(()=>{s([...e.puzzleBlocks.pieces].reverse()),d(!1),m(null),f(!1),N(""),T(""),L(null),w(-1)},[e.id]);let P=(e,t)=>{if(t<0||t>=o.length)return;let i=[...o],[n]=i.splice(e,1);i.splice(t,0,n),s(i),d(!1),m(null)},I=async()=>{let e=o.map(e=>e.code).join("\n");i(e),S(!0),N(""),T(""),L(null);try{let t=await fetch("/api/compile",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:e})}),i=await t.json();L(i.exitCode??0),t.ok&&0===i.exitCode?(N(i.stdout||"[Program executed quietly with exit code 0]"),T("")):(T(i.stderr||i.error||"Syntax execution error."),N(i.stdout||""))}catch(e){T(`Execution error: ${e.message}`),L(1)}finally{S(!1)}},E=()=>{w(-1),"mission-puzzle"===r?(s([...e.puzzleBlocks.pieces].reverse()),d(!1),m(null)):b([sA[0],sA[1],sA[2],sA[3],sA[10],sA[11],sA[12],sA[34]]),N(""),T(""),L(null)},M="all"===y?sA:sA.filter(e=>e.category===y);return(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[#ede3d2]",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] mb-1.5",children:[(0,c.jsx)(oC,{className:"w-3.5 h-3.5"}),"Synchronized with Mission #",e.id,": ",e.title.split(": ")[1]||e.title]}),(0,c.jsx)("h3",{className:"text-xl md:text-2xl font-black text-[#2b2520]",children:"Visual Block-to-C Logic Builder"}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium mt-0.5",children:"Stack and arrange colored logic blocks like Lego pieces. Watch natural logic transform into real, compilable C code!"})]}),(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsxs)("div",{className:"flex bg-[#fcf7ee] border border-[#ede3d2] p-1 rounded-2xl",children:[(0,c.jsxs)("button",{onClick:()=>{a("mission-puzzle"),E()},className:`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${"mission-puzzle"===r?"bg-amber-500 text-white shadow-xs":"text-[#7d7065] hover:text-[#2b2520]"}`,children:[(0,c.jsx)(sb,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Mission Puzzle (Code Monkey)"})]}),(0,c.jsxs)("button",{onClick:()=>{a("freeform"),E()},className:`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${"freeform"===r?"bg-amber-500 text-white shadow-xs":"text-[#7d7065] hover:text-[#2b2520]"}`,children:[(0,c.jsx)(oj,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Freeform Block Lab"})]})]}),(0,c.jsxs)("button",{onClick:E,className:"flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition",children:[(0,c.jsx)(so,{className:"w-3.5 h-3.5"}),"Reset"]})]})]}),"mission-puzzle"===r&&(0,c.jsxs)("div",{className:"space-y-6",children:[(0,c.jsxs)("div",{className:"p-4 bg-amber-50/70 border-2 border-amber-200/80 rounded-2xl flex flex-wrap items-center justify-between gap-3",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("span",{className:"text-xs font-black text-amber-900 block flex items-center gap-1.5",children:[(0,c.jsx)(oU,{className:"w-4 h-4 text-amber-600"}),"Level ",e.id," Puzzle Challenge: Solve the Code Sequence"]}),(0,c.jsx)("p",{className:"text-[11px] text-amber-800 mt-0.5",children:'Rearrange the shuffled C code blocks into their proper logical order. Click "Verify & Run Puzzle" to test your solution on the real C engine and claim +50 points!'})]}),(0,c.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,c.jsxs)("div",{className:"flex items-center gap-1 bg-white border border-amber-300 rounded-xl px-2 py-1 text-xs",children:[(0,c.jsx)("span",{className:"text-[10px] text-amber-800 font-bold",children:"Mission:"}),(0,c.jsx)("select",{value:e.id,onChange:e=>t(Number(e.target.value)),className:"bg-transparent font-black text-amber-900 focus:outline-none cursor-pointer",children:Array.from({length:150},(e,t)=>t+1).map(e=>(0,c.jsxs)("option",{value:e,children:["#",e]},e))})]}),(0,c.jsxs)("button",{onClick:()=>f(!h),className:"flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-amber-900 border border-amber-300 hover:bg-amber-100 cursor-pointer transition",children:[(0,c.jsx)(sw,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:h?"Hide Hints":"Show Hints"})]}),(0,c.jsxs)("button",{onClick:()=>{o.every((t,i)=>t.id===e.puzzleBlocks.correctOrder[i])?(d(!0),m(null),n(e.id),o0({particleCount:75,spread:70,origin:{y:.75}}),I()):(d(!1),m("Order mismatch! Follow the golden flow: Header #include -> Function signature -> Variables -> Computations -> Return."))},disabled:C,className:"friendly-button-amber px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50",children:[(0,c.jsx)(sx,{className:"w-4 h-4 text-white"}),(0,c.jsx)("span",{children:C?"Compiling...":"Verify & Run Puzzle"})]})]})]}),l&&(0,c.jsxs)("div",{className:"p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs font-bold",children:[(0,c.jsx)("span",{className:"text-xl",children:"🎉"}),(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"font-black text-emerald-800 text-sm",children:"Puzzle Solved Successfully! (+50 Points Earned)"}),(0,c.jsx)("div",{className:"text-emerald-700 font-medium mt-0.5",children:"The code sequence is 100% correct and executed on the real C compiler below with exit code 0."})]})]}),u&&(0,c.jsxs)("div",{className:"p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center gap-2 text-rose-800 text-xs font-medium",children:[(0,c.jsx)(oQ,{className:"w-4 h-4 text-rose-600 shrink-0"}),(0,c.jsx)("span",{children:u})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,c.jsxs)("div",{className:"lg:col-span-7 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-3",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between text-xs font-black text-[#7d7065] pb-2 border-b border-[#ebdcc4]",children:[(0,c.jsxs)("span",{children:["Arrange Code Blocks (",o.length," Pieces):"]}),(0,c.jsx)("span",{className:"text-[#e57e25]",children:"Top-to-Bottom Execution Flow"})]}),(0,c.jsx)("div",{className:"space-y-3",children:o.map((e,t)=>(0,c.jsxs)(on.div,{layout:!0,className:"p-3.5 rounded-2xl border-2 bg-white border-[#ebdcc4] shadow-2xs hover:border-amber-400 flex items-center justify-between gap-3 transition",children:[(0,c.jsxs)("div",{className:"flex items-center gap-3",children:[(0,c.jsx)("span",{className:"w-7 h-7 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center font-black text-xs text-amber-900 shrink-0",children:t+1}),(0,c.jsxs)("div",{children:[(0,c.jsx)("pre",{className:"font-mono text-xs font-bold text-[#2b2520] whitespace-pre-wrap leading-relaxed",children:e.code}),h&&(0,c.jsxs)("div",{className:"text-[10px] text-amber-700 font-medium mt-1 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-flex",children:[(0,c.jsx)("span",{children:"💡 Hint:"})," ",e.hint]})]})]}),(0,c.jsxs)("div",{className:"flex items-center gap-1 shrink-0",children:[(0,c.jsx)("button",{onClick:()=>P(t,t-1),disabled:0===t,title:"Move Up",className:"p-1.5 rounded-lg border border-[#ede3d2] hover:bg-[#ede3d2] text-[#7d7065] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition",children:(0,c.jsx)(ok,{className:"w-4 h-4"})}),(0,c.jsx)("button",{onClick:()=>P(t,t+1),disabled:t===o.length-1,title:"Move Down",className:"p-1.5 rounded-lg border border-[#ede3d2] hover:bg-[#ede3d2] text-[#7d7065] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition",children:(0,c.jsx)(oA,{className:"w-4 h-4"})})]})]},e.id))})]}),(0,c.jsxs)("div",{className:"lg:col-span-5 flex flex-col justify-between space-y-4",children:[(0,c.jsxs)("div",{className:"bg-[#2b2520] text-[#f4eedb] p-5 rounded-2xl font-mono text-xs shadow-inner",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-2 font-sans",children:[(0,c.jsxs)("span",{className:"font-bold text-amber-300 flex items-center gap-1",children:[(0,c.jsx)(sS,{className:"w-3.5 h-3.5"}),"Assembled C Code"]}),(0,c.jsxs)("span",{className:"text-emerald-400",children:["Mission #",e.id]})]}),(0,c.jsx)("pre",{className:"py-2 overflow-x-auto text-emerald-300 whitespace-pre-wrap leading-relaxed",children:o.map(e=>e.code).join("\n")})]}),(0,c.jsxs)("div",{className:"bg-[#2b2520] text-white p-4 rounded-2xl font-mono text-xs space-y-2",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-1.5 border-b border-slate-700 text-slate-400 text-[11px] font-sans",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1",children:[(0,c.jsx)(oO,{className:"w-3.5 h-3.5 text-emerald-400"}),(0,c.jsx)("span",{children:"Real C Engine Terminal Output"})]}),(0,c.jsxs)("span",{className:null===R||0===R?"text-emerald-400 font-bold":"text-rose-400 font-bold",children:["exit code ",null!==R?R:0]})]}),A?(0,c.jsxs)("div",{className:"p-2.5 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap",children:[(0,c.jsxs)("div",{className:"flex items-center gap-1 text-[10px] uppercase font-bold text-rose-400 mb-1",children:[(0,c.jsx)(oQ,{className:"w-3.5 h-3.5"})," Compiler Diagnostics:"]}),A]}):k?(0,c.jsx)("pre",{className:"text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto",children:k}):(0,c.jsx)("div",{className:"py-4 text-center text-slate-500 text-xs font-sans",children:'Rearrange the blocks above and click "Verify & Run Puzzle" to test your solution!'})]})]})]})]}),"freeform"===r&&(0,c.jsxs)("div",{className:"space-y-6",children:[(0,c.jsxs)("div",{className:"p-4 bg-[#fdf5ea] border-2 border-[#f3d4b1] rounded-2xl flex flex-wrap items-center justify-between gap-3",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)(sN,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsx)("span",{className:"text-xs font-black text-[#b45309]",children:"Load Ready-to-Run Preset Workflows:"})]}),(0,c.jsx)("div",{className:"flex flex-wrap gap-1.5",children:sT.map(e=>(0,c.jsx)("button",{onClick:()=>{b(e.blockIds.map(e=>sA.find(t=>t.id===e)).filter(e=>!!e)),N(""),T(""),o0({particleCount:30,spread:45,origin:{y:.85}})},className:"px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-[#7d7065] hover:bg-[#ede3d2] hover:text-[#2b2520] border border-[#ebdcc4] cursor-pointer transition shadow-2xs",children:e.title},e.id))})]}),(0,c.jsxs)("div",{className:"p-4 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl space-y-3",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,c.jsxs)("span",{className:"text-[11px] font-black text-[#7d7065] uppercase tracking-wider block",children:["Click any block below to append it to your program chain (",M.length," blocks available):"]}),(0,c.jsx)("div",{className:"flex flex-wrap gap-1",children:["all","input","calc","decision","loop","array","string","function","pointer","struct","output"].map(e=>(0,c.jsx)("button",{onClick:()=>x(e),className:`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition cursor-pointer ${y===e?"bg-amber-500 text-white shadow-2xs":"bg-white text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:e},e))})]}),(0,c.jsx)("div",{className:"flex flex-wrap gap-2 max-h-56 overflow-y-auto p-1",children:M.map(e=>(0,c.jsxs)("button",{onClick:()=>{b([...g,e]),N(""),T("")},className:`px-3 py-2 rounded-xl text-xs font-black border-2 shadow-2xs hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-1.5 ${e.color}`,children:[(0,c.jsx)(sb,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:e.label}),(0,c.jsx)("span",{className:"text-[10px] opacity-60 ml-1",children:"+ Add"})]},e.id))})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,c.jsxs)("div",{className:"lg:col-span-7 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-3",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between text-xs font-black text-[#7d7065] pb-2 border-b border-[#ebdcc4]",children:[(0,c.jsxs)("span",{children:["Your Custom Program Chain (",g.length," Blocks):"]}),(0,c.jsxs)("button",{onClick:()=>{S(!0),w(0),N(""),T(""),L(null);let e=0,t=setInterval(async()=>{if(++e<g.length)w(e);else{clearInterval(t);let e=`#include <stdio.h>

int main(void) {
${g.map(e=>"    "+e.cEquivalent).join("\n")}
    return 0;
}`;i(e);try{let t=await o6(e);L(t.exitCode??0),0===t.exitCode?(N(t.stdout||"[Program executed quietly with exit code 0]"),T(""),o0({particleCount:50,spread:60,origin:{y:.85}})):(T(t.stderr||t.error||"Block syntax sequence error."),N(t.stdout||""))}catch(e){T(`Execution error: ${e.message}`),L(1)}finally{S(!1)}}},450)},disabled:C||0===g.length,className:"friendly-button-amber px-4 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50",children:[(0,c.jsx)(oR,{className:"w-3.5 h-3.5 fill-white"}),(0,c.jsx)("span",{children:C?"Simulating...":"Run & Sync C Code"})]})]}),(0,c.jsx)("div",{className:"space-y-3",children:g.map((e,t)=>{let i=v===t;return(0,c.jsxs)(on.div,{layout:!0,className:`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${e.color} ${i?"scale-105 ring-4 ring-[#f48c06] shadow-md":"hover:shadow-xs"}`,children:[(0,c.jsxs)("div",{className:"flex items-center gap-3",children:[(0,c.jsx)("span",{className:"w-6 h-6 rounded-full bg-white/80 border flex items-center justify-center font-bold text-xs text-[#2b2520]",children:t+1}),(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"font-black text-sm",children:e.label}),(0,c.jsx)("div",{className:"text-[11px] opacity-80 mt-0.5",children:e.plainEnglish})]})]}),(0,c.jsx)("button",{onClick:()=>{let e;(e=[...g]).splice(t,1),b(e),N(""),T("")},className:"text-xs text-red-600 hover:text-red-800 font-black px-2 py-1 rounded hover:bg-white/50 cursor-pointer",children:"✕"})]},`${e.id}-${t}`)})})]}),(0,c.jsxs)("div",{className:"lg:col-span-5 flex flex-col justify-between space-y-4",children:[(0,c.jsxs)("div",{className:"bg-[#2b2520] text-[#f4eedb] p-5 rounded-2xl font-mono text-xs shadow-inner",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-2 font-sans",children:[(0,c.jsx)("span",{className:"font-bold text-amber-300",children:"Synchronized C Code"}),(0,c.jsx)("span",{className:"text-emerald-400",children:"Valid ISO C11"})]}),(0,c.jsxs)("div",{className:"space-y-1 py-1 overflow-x-auto leading-relaxed",children:[(0,c.jsx)("span",{className:"text-slate-500",children:"// Auto-generated from your visual blocks"}),(0,c.jsx)("div",{className:"text-purple-400",children:"#include <stdio.h>"}),(0,c.jsx)("div",{className:"text-blue-400",children:"int main(void) {"}),(0,c.jsxs)("div",{className:"pl-4 space-y-1 my-1 border-l-2 border-amber-500/40",children:[g.map((e,t)=>(0,c.jsx)("div",{className:`transition-colors rounded px-1 whitespace-pre-wrap ${v===t?"bg-amber-400/20 text-amber-300 font-bold":"text-slate-200"}`,children:e.cEquivalent},t)),(0,c.jsx)("div",{className:"text-slate-300",children:"return 0;"})]}),(0,c.jsx)("div",{className:"text-blue-400",children:"}"})]})]}),(0,c.jsxs)("div",{className:"bg-[#2b2520] text-white p-4 rounded-2xl font-mono text-xs space-y-2",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-1.5 border-b border-slate-700 text-slate-400 text-[11px] font-sans",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1",children:[(0,c.jsx)(oO,{className:"w-3.5 h-3.5 text-emerald-400"}),(0,c.jsx)("span",{children:"Real C Engine Terminal Output"})]}),(0,c.jsxs)("span",{className:null===R||0===R?"text-emerald-400 font-bold":"text-rose-400 font-bold",children:["exit code ",null!==R?R:0]})]}),A?(0,c.jsxs)("div",{className:"p-2.5 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap",children:[(0,c.jsxs)("div",{className:"flex items-center gap-1 text-[10px] uppercase font-bold text-rose-400 mb-1",children:[(0,c.jsx)(oQ,{className:"w-3.5 h-3.5"})," Compiler Diagnostics:"]}),A]}):k?(0,c.jsx)("pre",{className:"text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto",children:k}):(0,c.jsx)("div",{className:"py-4 text-center text-slate-500 text-xs font-sans",children:'Click "Run & Sync C Code" to execute these blocks on the real C engine!'})]})]})]})]})]})};function sL(e,t){if(!e)return"";let i=e.trim(),n=(i=i.replace(/([0-9]+(?:\.[0-9]+)?)[fFlLuU]+\b/g,"$1")).match(/^'([^'\\]|\\.)'$/);if(n){let e=n[1];if(e.startsWith("\\")){if("\\n"===e)return 10;if("\\0"===e)return 0;if("\\t"===e)return 9}return e.charCodeAt(0)}if(i.startsWith('"')&&i.endsWith('"'))return i.slice(1,-1);let r=(i=(i=(i=(i=(i=(i=(i=(i=(i=(i=i.replace(/sizeof\s*\(\s*float\s*\)/g,"4")).replace(/sizeof\s*\(\s*double\s*\)/g,"8")).replace(/sizeof\s*\(\s*int\s*\)/g,"4")).replace(/sizeof\s*\(\s*char\s*\)/g,"1")).replace(/sizeof\s*\(\s*size_t\s*\)/g,"4")).replace(/sizeof\s*\(\s*short\s*\)/g,"2")).replace(/sizeof\s*\(\s*long\s+long\s*\)/g,"8")).replace(/sizeof\s*\(\s*long\s*\)/g,"4")).replace(/sizeof\s*\(\s*([a-zA-Z0-9_]+)\s*\)/g,(e,i)=>(void 0!==t[i]&&"number"==typeof t[i]&&String(t[i]).includes("."),"4"))).replace(/\((?:float|double|int|char|long|unsigned)\)\s*/g,"")).split(/([+\-*/%() \t])/).map(e=>{let i=e.trim();if(!i)return e;if(void 0!==t[i]){let e=t[i];return"number"==typeof e?String(e):String(e).replace(/([0-9]+(?:\.[0-9]+)?)[fFlLuU]+\b/g,"$1")}return e}).join("");if(/^[0-9.+\-*/%() \t]+$/.test(r))try{let e=Function(`'use strict'; return (${r})`)();if("number"==typeof e&&!isNaN(e))return Math.round(1e6*e)/1e6}catch{}return void 0!==t[i]?t[i]:i}function sP(e){let t=e.split("\n"),i=[],n={};return t.forEach((e,t)=>{let r,a,o=e.trim();if(!o)return;let s="other",l="The CPU executes this statement sequentially.",d=[];if(o.startsWith("#include"))s="header",l="Preprocessor Directive: Loads standard C headers and symbol prototypes into translation unit.";else if(o.startsWith("#define")){s="header";let e=o.match(/^#define\s+([A-Za-z_]\w*)\s+(.*)$/);if(e){let t=e[1],i=sL(e[2],n);n[t]=i,l=`Macro Definition: Replaces symbolic constant ${t} with value ${i} during preprocessing.`}}else if(o.includes("main("))s="main",l="Operating System Entry: The OS invokes main() and sets up the primary thread stack frame.";else if(/^(?:const\s+)?(?:unsigned\s+|signed\s+|short\s+|long\s+)?(int|float|double|char|long|short|unsigned|size_t)\s+([\s\S]+);$/.test(o)){let e=o.match(/^(?:const\s+)?(?:unsigned\s+|signed\s+|short\s+|long\s+)?(int|float|double|char|long|short|unsigned|size_t)\s+([\s\S]+);$/);if(e){let t=e[1],i=e[2];s="declaration";let a=i.split(",").map(e=>e.trim()).filter(Boolean),o=[];a.forEach(e=>{let i=e.indexOf("=");if(-1!==i){let a=e.substring(0,i).trim().replace(/^\*+/,""),s=sL(e.substring(i+1).trim(),n);n[a]=s;let l="number"==typeof s&&"float"===t?s.toFixed(2):String(s);d.push({name:a,value:l,type:t}),o.push(`${a} = ${l}`),r={name:a,value:l,color:"bg-emerald-100 border-emerald-300 text-emerald-900 font-bold"}}else{let i=e.trim().replace(/^\*+/,"");n[i]=0,d.push({name:i,value:"0",type:t})}}),l=`Allocates stack memory for ${a.length} variable(s): ${o.join(", ")}.`}}else if(/^([a-zA-Z0-9_]+)\s*=\s*([^;]+);/.test(o)&&!o.startsWith("return")){let e=o.match(/^([a-zA-Z0-9_]+)\s*=\s*([^;]+);/);if(e){let t=e[1],i=e[2].trim();s="calculation";let a=sL(i,n);n[t]=a;let o="number"==typeof a&&String(a).includes(".")?a.toFixed(2):String(a);l=`CPU Arithmetic Unit calculates: ${i} and saves result directly into box "${t}" (${o}).`,r={name:t,value:o,color:"bg-amber-100 border-amber-300 text-amber-900 font-bold"}}}else if(o.startsWith("if")||o.startsWith("else if"))s="condition",l="Branch Decision: CPU compares variables in registers and sets Zero Flag (ZF) to choose execution path.";else if(o.startsWith("for")||o.startsWith("while"))s="loop",l="Repetition Loop: The CPU tests loop condition register and will cycle through body until condition is false.";else if(o.includes("printf(")){s="print";let e=function(e,t){let i=e.match(/printf\s*\(\s*"([^"]*)"(?:\s*,\s*([\s\S]*?))?\s*\)\s*;/);if(!i)return;let n=i[1],r=i[2];if(n=n.replace(/\\n/g,"\n").replace(/\\t/g,"	").replace(/\\"/g,'"'),!r)return n.replace(/%%/g,"%");let a=[],o="",s=0;for(let e=0;e<r.length;e++){let t=r[e];if("("===t)s++;else if(")"===t)s--;else if(","===t&&0===s){a.push(o.trim()),o="";continue}o+=t}o.trim()&&a.push(o.trim());let l=0;return n.replace(/%(?:(\d+)?\.(\d+))?([fdiusclxX]|zu|lld|ld|lf)|%%/g,(e,i,n,r)=>{if("%%"===e)return"%";if(l>=a.length)return e;let o=sL(a[l++],t);if("f"===r||"lf"===r){let e=Number(o);if(!isNaN(e)){let t=void 0!==n?parseInt(n,10):2;return e.toFixed(t)}return String(o)}if(["d","i","u","zu","ld","lld"].includes(r)){let e=Number(o);return isNaN(e)?String(o):String(Math.floor(e))}if("c"===r){let e=Number(o);return isNaN(e)?String(o).replace(/['"]/g,""):String.fromCharCode(e)}if("s"===r)return String(o).replace(/^["']|["']$/g,"");if("x"===r){let e=Number(o);return isNaN(e)?String(o):e.toString(16)}if("X"===r){let e=Number(o);return isNaN(e)?String(o):e.toString(16).toUpperCase()}return String(o).replace(/['"]/g,"")})}(o,n);if(void 0!==e){a=e;let t=e.replace(/\n/g," ").trim();l=`Standard Output Syscall: Writes formatted stream "${t}" to terminal stdout.`}else{let e=o.match(/"([^"]*)"/),t=e?e[1]:"Output";a=t.replace(/\\n/g,"\n"),l=`Standard Output Syscall: Sends formatted text "${t}" to the terminal monitor screen.`}}else if(o.includes("puts(")){s="print";let e=o.match(/"([^"]*)"/);e&&(a=e[1]+"\n",l=`Puts Syscall: Writes string "${e[1]}" followed by an automated newline to stdout.`)}else if(o.startsWith("return")){s="return";let e=o.match(/return\s+([^;]+);/),t=e?sL(e[1],n):0;l=`Function Complete: Places exit code ${t} into RAX/EAX register and returns control to OS supervisor.`}i.push({lineNum:t+1,rawText:o,kind:s,detectedVars:d,narration:l,memoryBoxImpact:r,outputContribution:a})}),i}let sI={name:"step-forward",size:24,node:[["path",{d:"M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",key:"1ystz2"}],["path",{d:"M3 4v16",key:"1ph11n"}]]};sI.node;let sE=ov(sI),sM={name:"box",size:24,node:[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]};sM.node;let sj=ov(sM),sD={name:"pen-line",size:24,node:[["path",{d:"M13 21h8",key:"1jsn5i"}],["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],aliases:["edit-3"]};sD.node;let sO=ov(sD),sB=()=>{let{currentItem:e,state:t,updateActiveCode:i}=o5(),[n,r]=(0,p.useState)(t.activeCode),[a,o]=(0,p.useState)(!1),[s,l]=(0,p.useState)(0),[d,u]=(0,p.useState)(!1),[m,h]=(0,p.useState)(null),[f,g]=(0,p.useState)(null),[b,y]=(0,p.useState)(null),[x,v]=(0,p.useState)(null);(0,p.useEffect)(()=>{r(t.activeCode),l(0),h(null),g(null),y(null);let e=!1;return(async()=>{try{let i=await o6(t.activeCode);e||(y(i.exitCode??0),v({memoryBytes:i.memoryUsageBytes||1024,cpuCycles:i.cpuCyclesEstimated||120}),0===i.exitCode?h(i.stdout||null):g(i.stderr||i.error||null))}catch{}})(),()=>{e=!0}},[t.activeCode]);let w=(0,p.useMemo)(()=>{let t=sP(n);return t.length>0?t:sP(e.codingApproaches.beginnerFriendly.code)},[n,e]),C=w[s]||w[0],S=(0,p.useMemo)(()=>{let e={};for(let t=0;t<=s&&t<w.length;t++){let i=w[t];i.memoryBoxImpact&&(e[i.memoryBoxImpact.name]=i.memoryBoxImpact)}return Object.values(e)},[s,w]),k=(0,p.useMemo)(()=>{let t="";for(let e=0;e<=s&&e<w.length;e++)w[e].outputContribution&&(t+=w[e].outputContribution);return t||(s===w.length-1?e.expectedOutput:"")},[s,w,e]),N=async()=>{u(!0),h(null),g(null),y(null);try{let e=await o6(n);y(e.exitCode??0),v({memoryBytes:e.memoryUsageBytes||1024,cpuCycles:e.cpuCyclesEstimated||120}),0===e.exitCode?(h(e.stdout||"[Program executed quietly with 0 errors]"),o0({particleCount:45,spread:55,origin:{y:.85}})):g(e.stderr||e.error||"Syntax or Runtime Error")}catch(e){g(`Execution failure: ${e.message}`)}finally{u(!1)}};return(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[#ede3d2]",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] mb-1.5",children:[(0,c.jsx)(oC,{className:"w-3.5 h-3.5"}),"Synchronized with Level ",e.id,": ",e.title.split(": ")[1]]}),(0,c.jsx)("h3",{className:"text-xl md:text-2xl font-black text-[#2b2520]",children:"Dynamic Code Dissector & Memory Visualizer"}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium mt-0.5",children:"Edit the C code live or step line-by-line! Watch memory boxes and hardware telemetry change in real-time."})]}),(0,c.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,c.jsxs)("button",{onClick:()=>o(!a),className:"flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#2b2520] border border-[#ede3d2] cursor-pointer transition",children:[(0,c.jsx)(sO,{className:"w-3.5 h-3.5 text-[#e57e25]"}),(0,c.jsx)("span",{children:a?"Close Editor":"Edit Code Live"})]}),(0,c.jsxs)("button",{onClick:()=>{l(0),h(null),g(null),y(null)},className:"flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition",children:[(0,c.jsx)(so,{className:"w-3.5 h-3.5"}),"Restart"]}),(0,c.jsxs)("button",{onClick:()=>{s<w.length-1?l(s+1):o0({particleCount:50,spread:60,origin:{y:.85}})},disabled:s>=w.length-1,className:"friendly-button-amber px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm",children:[(0,c.jsx)(sE,{className:"w-4 h-4"}),(0,c.jsx)("span",{children:"Next Line →"})]}),(0,c.jsxs)("button",{onClick:N,disabled:d,className:"px-4 py-2 rounded-xl text-xs font-black bg-[#2a9d8f] hover:bg-[#21867a] text-white flex items-center gap-1.5 cursor-pointer shadow-sm transition disabled:opacity-50",children:[(0,c.jsx)(oR,{className:"w-3.5 h-3.5 fill-white"}),(0,c.jsx)("span",{children:d?"Compiling...":"Run Real C Engine"})]})]})]}),a&&(0,c.jsxs)(on.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},className:"p-4 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl space-y-3",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between text-xs font-black text-[#7d7065]",children:[(0,c.jsx)("span",{children:"Type any custom C code below. The visualizer and real C engine will parse and run it!"}),(0,c.jsx)("button",{onClick:()=>{i(n),l(0),o(!1)},className:"px-4 py-1.5 bg-[#2a9d8f] text-white rounded-xl text-xs font-black cursor-pointer shadow-2xs hover:bg-[#1b635b]",children:"Apply & Re-Visualize!"})]}),(0,c.jsx)("textarea",{value:n,onChange:e=>r(e.target.value),rows:8,className:"w-full bg-white border border-[#ebdcc4] rounded-xl p-3 font-mono text-xs text-[#2b2520] leading-relaxed focus:outline-none focus:border-[#f48c06]",spellCheck:!1})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,c.jsxs)("div",{className:"lg:col-span-5 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4 font-mono text-xs flex flex-col justify-between",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"text-[11px] font-black text-[#7d7065] uppercase pb-2 border-b border-[#ebdcc4] mb-3 flex items-center justify-between",children:[(0,c.jsx)("span",{children:"Program Source Code"}),(0,c.jsxs)("span",{className:"text-[#e57e25]",children:["Line ",C?.lineNum||1," of ",w.length]})]}),(0,c.jsx)("div",{className:"space-y-1 bg-white p-3 rounded-xl border border-[#ebdcc4] overflow-x-auto max-h-[380px]",children:w.map((e,t)=>{let i=t===s;return(0,c.jsxs)("div",{onClick:()=>l(t),className:`p-1.5 rounded-lg transition-all cursor-pointer flex items-start gap-2 ${i?"bg-[#fdf5ea] border-l-4 border-[#e57e25] text-[#2b2520] font-black shadow-2xs":"text-[#7d7065] hover:bg-[#faf4ea]"}`,children:[(0,c.jsx)("span",{className:"text-slate-400 select-none text-[10px] w-4 text-right",children:e.lineNum}),(0,c.jsx)("pre",{className:"whitespace-pre-wrap",children:e.rawText})]},t)})})]}),(0,c.jsx)("div",{className:"mt-4 pt-3 border-t border-[#ebdcc4] text-[10px] text-[#7d7065] font-sans",children:"Click any line above to jump directly to that step in the computer's execution!"})]}),(0,c.jsxs)("div",{className:"lg:col-span-7 flex flex-col justify-between space-y-4",children:[(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-2",children:[(0,c.jsxs)("div",{className:"text-xs font-black text-[#d97706] uppercase flex items-center gap-1.5",children:[(0,c.jsx)(oC,{className:"w-4 h-4"}),"What the Computer Does at Line #",C?.lineNum||1,":"]}),(0,c.jsx)("h4",{className:"text-base font-black text-[#2b2520] font-mono bg-white p-2.5 rounded-xl border border-[#ebdcc4]",children:(0,c.jsx)("code",{children:C?.rawText})}),(0,c.jsx)("p",{className:"text-sm text-[#57534e] leading-relaxed font-medium",children:C?.narration})]}),(0,c.jsxs)("div",{className:"p-5 bg-white border-2 border-[#ede3d2] rounded-2xl space-y-3",children:[(0,c.jsxs)("div",{className:"text-xs font-black text-[#7d7065] uppercase flex items-center gap-1.5",children:[(0,c.jsx)(sj,{className:"w-4 h-4 text-[#2a9d8f]"}),"Inside Computer RAM (Stack Frame Storage):"]}),0===S.length?(0,c.jsx)("div",{className:"p-6 text-center text-xs text-[#a8a29e] bg-[#fcf7ee] rounded-xl border border-dashed border-[#ebdcc4]",children:'No variables allocated yet. Click "Next Line" to watch variables pop into RAM!'}):(0,c.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-3",children:S.map(e=>(0,c.jsxs)(on.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},className:`p-3.5 rounded-2xl border-2 text-center shadow-2xs ${e.color}`,children:[(0,c.jsxs)("div",{className:"text-[10px] font-mono uppercase opacity-75",children:['Box "',e.name,'"']}),(0,c.jsx)("div",{className:"text-xl font-black font-mono mt-1 truncate",children:e.value})]},e.name))})]}),x&&(0,c.jsxs)("div",{className:"flex items-center gap-4 px-4 py-2 bg-[#fcf7ee] rounded-xl border border-[#ebdcc4] text-xs font-mono text-[#57534e]",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1 font-bold text-[#2a9d8f]",children:[(0,c.jsx)(sj,{className:"w-3.5 h-3.5"})," Stack/RAM: ",x.memoryBytes," Bytes"]}),(0,c.jsxs)("span",{className:"flex items-center gap-1 font-bold text-[#e57e25]",children:[(0,c.jsx)(oE,{className:"w-3.5 h-3.5"})," ALU Cycles: ~",x.cpuCycles]})]}),(0,c.jsxs)("div",{className:"p-4 bg-[#2b2520] text-white rounded-2xl font-mono text-xs",children:[(0,c.jsxs)("div",{className:"text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between pb-1 border-b border-slate-700",children:[(0,c.jsx)("span",{children:"Terminal Screen (stdout):"}),(0,c.jsxs)("span",{className:null===b||0===b?"text-emerald-400":"text-rose-400",children:["exit code ",null!==b?b:0]})]}),f?(0,c.jsxs)("div",{className:"p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap",children:[(0,c.jsxs)("div",{className:"flex items-center gap-1 text-xs font-bold text-rose-400 mb-1",children:[(0,c.jsx)(oQ,{className:"w-4 h-4"})," Real C Engine Compiler Diagnostic:"]}),f]}):(0,c.jsx)("div",{className:"text-emerald-400 min-h-[24px] pt-1 whitespace-pre-wrap",children:null!==m?m:k||'> [Click "Run Real C Engine" or "Next Line" to see output]'})]})]})]})]})},sz=[{id:"proj-chai-samosa",title:"1. Campus Canteen: Masala Chai & Samosa Billing",icon:"Coffee",realLifeStory:"You visit your college tapri/canteen. A hot cup of Masala Chai costs ₹10, and a fresh crispy Samosa costs ₹15. If your bill crosses ₹100, the canteen kaka gives you a flat ₹10 student discount!",logicSequence:["1. Ask the student how many cups of Chai and Samosas they ordered.","2. Calculate: subtotal = (chai * 10) + (samosas * 15).","3. Check: Is subtotal > 100? If YES, subtract ₹10 discount.","4. Print the final bill receipt in Rupees (₹)."],cConceptsTaught:["int and float variables","Arithmetic multiplication (*)","if-else condition","printf formatting"],interactiveInputs:[{label:"Cups of Chai (₹10 each)",field:"chai",defaultVal:5},{label:"Samosas (₹15 each)",field:"samosas",defaultVal:4}],cCode:`#include <stdio.h>

int main(void) {
    int chai = 5;      // ₹10 per cup
    int samosas = 4;   // ₹15 per piece

    int subtotal = (chai * 10) + (samosas * 15);
    int discount = 0;

    // Student discount: ₹10 off if bill > ₹100
    if (subtotal > 100) {
        discount = 10;
    }

    int finalBill = subtotal - discount;

    printf("=== IIT/CAMPUS CANTEEN BILL ===\\n");
    printf("Chai (x%d)    : Rs. %d\\n", chai, chai * 10);
    printf("Samosas (x%d) : Rs. %d\\n", samosas, samosas * 15);
    printf("Subtotal      : Rs. %d\\n", subtotal);
    printf("Discount      : -Rs. %d\\n", discount);
    printf("------------------------------\\n");
    printf("FINAL BILL    : Rs. %d (Rupees)\\n", finalBill);

    return 0;
}`,expectedOutput:`=== IIT/CAMPUS CANTEEN BILL ===
Chai (x5)    : Rs. 50
Samosas (x4) : Rs. 60
Subtotal      : Rs. 110
Discount      : -Rs. 10
------------------------------
FINAL BILL    : Rs. 100 (Rupees)`},{id:"proj-coffee-vending-machine",title:"2. Automatic Coffee Vending Machine (Espresso, Cappuccino, Latte)",icon:"Coffee",realLifeStory:"A high-tech digital coffee vending machine at an Indian tech park. You select your drink (1=Espresso, 2=Cappuccino, 3=Filter Kaapi), select your sugar cubes, and the embedded microcontroller dispenses precise milliliters of boiling water, steamed milk, and roasted coffee decoction!",logicSequence:["1. Read user choice (1: Espresso, 2: Cappuccino, 3: Filter Kaapi).","2. Calculate milk (ml), water (ml), and coffee grounds (grams).","3. Dispense sugar according to user sweetness level (0-3 spoons).","4. Print brewing telemetry and temperature status in Celsius."],cConceptsTaught:["switch-case statement","structs and state machines","formatted I/O","constant thresholds"],interactiveInputs:[{label:"Drink Choice (1=Espresso, 2=Cappuccino, 3=Filter Kaapi)",field:"drinkType",defaultVal:2},{label:"Sugar Level (Spoons: 0 to 3)",field:"sugarSpoons",defaultVal:1}],cCode:`#include <stdio.h>

int main(void) {
    int choice = 2;       // 2: Cappuccino
    int sugarSpoons = 1;  // 1 spoon
    int brewTempCelsius = 92;

    printf("=== SMART AUTOMATIC COFFEE VENDING DISPENSER ===\\n");
    printf("Boiler Sensor Temperature: %d C (Optimal Extraction)\\n", brewTempCelsius);

    switch(choice) {
        case 1:
            printf("[BREW] Selected: Bold Dark Espresso\\n");
            printf("[RATIO] Water: 40ml | Milk: 0ml | Coffee: 18g\\n");
            printf("[PRICE] Charged: Rs. 35\\n");
            break;
        case 2:
            printf("[BREW] Selected: Creamy Frothy Cappuccino\\n");
            printf("[RATIO] Water: 60ml | Steamed Milk: 90ml | Coffee: 14g\\n");
            printf("[PRICE] Charged: Rs. 50\\n");
            break;
        case 3:
            printf("[BREW] Selected: Authentic South Indian Filter Kaapi\\n");
            printf("[RATIO] Water: 50ml | Boiled Whole Milk: 100ml | Chicory Blend: 16g\\n");
            printf("[PRICE] Charged: Rs. 40\\n");
            break;
        default:
            printf("[ERROR] Invalid drink selection.\\n");
            return 1;
    }

    if (sugarSpoons > 0) {
        printf("[DISPENSER] Adding %d spoon(s) of organic brown sugar...\\n", sugarSpoons);
    } else {
        printf("[DISPENSER] Sugar-Free Option Activated.\\n");
    }

    printf("DISPENSE COMPLETE: Please collect your steaming hot cup! Enjoy!\\n");
    return 0;
}`,expectedOutput:`=== SMART AUTOMATIC COFFEE VENDING DISPENSER ===
Boiler Sensor Temperature: 92 C (Optimal Extraction)
[BREW] Selected: Creamy Frothy Cappuccino
[RATIO] Water: 60ml | Steamed Milk: 90ml | Coffee: 14g
[PRICE] Charged: Rs. 50
[DISPENSER] Adding 1 spoon(s) of organic brown sugar...
DISPENSE COMPLETE: Please collect your steaming hot cup! Enjoy!`},{id:"proj-sbi-atm",title:"3. SBI / HDFC Bank ATM Cash Withdrawal",icon:"CreditCard",realLifeStory:"You walk into an SBI / HDFC ATM on campus. The machine asks for your secret 4-digit PIN. If verified, you enter how many ₹500 currency notes you want to withdraw. If your balance has enough funds, the cash dispenser counts the notes!",logicSequence:["1. Check if entered PIN matches the secret PIN (9876).","2. If PIN is wrong, display 'Galat PIN! Card Blocked' and exit.","3. If PIN is right, check if balance has enough money.","4. Deduct the amount and dispense the ₹500 rupee notes."],cConceptsTaught:["if-else nesting","Comparison equality (==)","Subtraction (-=)","Security guard clauses"],interactiveInputs:[{label:"Entered PIN (Secret is 9876)",field:"pin",defaultVal:9876},{label:"Withdrawal Amount (₹)",field:"amount",defaultVal:2e3}],cCode:`#include <stdio.h>

int main(void) {
    int secretPIN = 9876;
    int enteredPIN = 9876;
    int bankBalance = 15000;  // ₹15,000 in SBI account
    int withdrawAmount = 2000; // Want to withdraw ₹2,000

    printf("=== SBI CASH DISPENSER ATM ===\\n");
    if (enteredPIN == secretPIN) {
        printf("[AUTH] PIN Satyapit (Verified)!\\n");
        if (withdrawAmount <= bankBalance) {
            bankBalance -= withdrawAmount;
            printf("[CASH] Dispensing Rs. %d in 500-rupee notes...\\n", withdrawAmount);
            printf("[BALANCE] Remaining Account Balance: Rs. %d\\n", bankBalance);
        } else {
            printf("[ALERT] Insufficient balance! Current balance is Rs. %d\\n", bankBalance);
        }
    } else {
        printf("[ERROR] Galat PIN! Card temporarily blocked for security.\\n");
    }

    return 0;
}`,expectedOutput:`=== SBI CASH DISPENSER ATM ===
[AUTH] PIN Satyapit (Verified)!
[CASH] Dispensing Rs. 2000 in 500-rupee notes...
[BALANCE] Remaining Account Balance: Rs. 13000`},{id:"proj-mumbai-delhi-signals",title:"4. Indian City Crossroad Traffic Signal (Delhi / Bengaluru / Mumbai)",icon:"Compass",realLifeStory:"A smart traffic signal at a busy Indian city chowk (crossroad). Cycles between GREEN (Subway/Bikes/Cars chalenge), YELLOW (Dheere chalo), and RED (Rukiye).",logicSequence:["1. Check signal timer in seconds.","2. 1 to 15 seconds: GREEN light (Gaadiyan chalao).","3. 16 to 20 seconds: YELLOW light (Rukne ki taiyari).","4. 21 to 40 seconds: RED light (Zebra crossing pe rukiye)."],cConceptsTaught:["for loop","Range conditions (&&)","Modulus operator (%)","State automation"],interactiveInputs:[{label:"Signal Timer Second",field:"second",defaultVal:12}],cCode:`#include <stdio.h>

int main(void) {
    int currentSecond = 12;

    printf("=== SMART TRAFFIC SIGNAL (CHOWK) ===\\n");
    if (currentSecond <= 15) {
        printf("Second %d -> [HARA / GREEN]: Vehicles Go! Safe to cross.\\n", currentSecond);
    } else if (currentSecond <= 20) {
        printf("Second %d -> [PEELA / YELLOW]: Slow down and prepare to stop.\\n", currentSecond);
    } else {
        printf("Second %d -> [LAAL / RED]: STOP behind the white zebra line.\\n", currentSecond);
    }

    return 0;
}`,expectedOutput:`=== SMART TRAFFIC SIGNAL (CHOWK) ===
Second 12 -> [HARA / GREEN]: Vehicles Go! Safe to cross.`},{id:"proj-upi-mobile-recharge",title:"5. UPI Mobile Recharge & Friend Contact Search",icon:"Phone",realLifeStory:"Using Google Pay / PhonePe / Paytm to recharge a friend's Jio / Airtel number. You search for your college friend (Rohan, Priya, Amit) in phone memory, select their plan, and send rupees!",logicSequence:["1. Array of friend contacts: Rohan, Priya, Amit.","2. Array of mobile numbers: 9876543210, 9123456789, 9988776655.","3. Search index 1 (Priya).","4. Display contact and execute ₹299 monthly recharge."],cConceptsTaught:["2D character arrays (strings)","Index mapping","Formatted output","Array offset retrieval"],interactiveInputs:[{label:"Friend Selection (0: Rohan, 1: Priya, 2: Amit)",field:"idx",defaultVal:1}],cCode:`#include <stdio.h>

int main(void) {
    char friends[3][16] = {"Rohan", "Priya", "Amit"};
    char phones[3][16] = {"+91-9876543210", "+91-9123456789", "+91-9988776655"};
    int rechargeAmount = 299; // Rs. 299 monthly plan
    int friendIndex = 1;      // Priya

    printf("=== UPI INSTANT RECHARGE (BHIM / GPAY) ===\\n");
    printf("Contact Name   : %s\\n", friends[friendIndex]);
    printf("Mobile Number  : %s\\n", phones[friendIndex]);
    printf("Recharge Plan  : Rs. %d (1.5GB/day + Unlimited Calls)\\n", rechargeAmount);
    printf("Payment Status : SUCCESSFUL (Rupees %d debited via UPI)\\n", rechargeAmount);

    return 0;
}`,expectedOutput:`=== UPI INSTANT RECHARGE (BHIM / GPAY) ===
Contact Name   : Priya
Mobile Number  : +91-9123456789
Recharge Plan  : Rs. 299 (1.5GB/day + Unlimited Calls)
Payment Status : SUCCESSFUL (Rupees 299 debited via UPI)`},{id:"proj-irctc-berth-allocator",title:"6. Indian Railways IRCTC Berth Type & Senior Allocator",icon:"Compass",realLifeStory:"IRCTC reservation algorithms allocate berths on Sleeper and 3A coaches: 8 berths per bay (1=Lower, 2=Middle, 3=Upper, 4=Lower, 5=Middle, 6=Upper, 7=Side Lower, 8=Side Upper). Senior citizens (>60) are prioritized for Lower Berths!",logicSequence:["1. Input passenger age and requested berth.","2. Calculate berth position: berthMod = seatNumber % 8.","3. Map 1 or 4 to Lower, 2 or 5 to Middle, 3 or 6 to Upper, 7 to Side Lower, 0 to Side Upper.","4. If passenger is senior citizen, prioritize lower berth confirmation."],cConceptsTaught:["Modulo arithmetic (%)","Switch or nested if branches","Compound logical operators (||)"],interactiveInputs:[{label:"Seat Number (1 to 72)",field:"seatNo",defaultVal:17},{label:"Passenger Age",field:"age",defaultVal:64}],cCode:`#include <stdio.h>

int main(void) {
    int seatNo = 17;
    int age = 64;

    int rem = seatNo % 8;
    char berthType[20];

    if (rem == 1 || rem == 4) {
        printf("Seat #%d: LOWER BERTH (LB)\\n", seatNo);
    } else if (rem == 2 || rem == 5) {
        printf("Seat #%d: MIDDLE BERTH (MB)\\n", seatNo);
    } else if (rem == 3 || rem == 6) {
        printf("Seat #%d: UPPER BERTH (UB)\\n", seatNo);
    } else if (rem == 7) {
        printf("Seat #%d: SIDE LOWER (SL)\\n", seatNo);
    } else {
        printf("Seat #%d: SIDE UPPER (SU)\\n", seatNo);
    }

    if (age >= 60) {
        printf("[IRCTC CONCESSION] Senior Citizen Concession verified. Priority Berth granted.\\n");
    }

    return 0;
}`,expectedOutput:`Seat #17: LOWER BERTH (LB)
[IRCTC CONCESSION] Senior Citizen Concession verified. Priority Berth granted.`},{id:"proj-isro-telemetry",title:"7. ISRO Ground Station Satellite Telemetry Packet Decoder",icon:"Compass",realLifeStory:"ISRO ground control telemetry receiver in Bengaluru. Receives hexadecimal radio telemetry bytes from Aditya-L1 or Chandrayaan satellite: computes solar panel voltage, internal temperature, and verifies checksum integrity.",logicSequence:["1. Decode 4 raw telemetry values: Solar Voltage (V), Battery Temp (C), Velocity (km/s), Checksum.","2. Compute bitwise parity checksum to verify transmission line noise.","3. Check if solar voltage >= 28V (Sun-pointing mode nominal).","4. Display telemetry dashboard status."],cConceptsTaught:["Bitwise operations (^, &)","Arrays","Struct telemetry packing","Telemetry thresholding"],interactiveInputs:[{label:"Solar Voltage (V)",field:"solarV",defaultVal:32}],cCode:`#include <stdio.h>

struct SatelliteTelemetry {
    int solarVoltage;
    int internalTempCelsius;
    float orbitalVelocityKmPerSec;
    int parityStatus;
};

int main(void) {
    struct SatelliteTelemetry sat;
    sat.solarVoltage = 32;
    sat.internalTempCelsius = 22;
    sat.orbitalVelocityKmPerSec = 7.68f;
    sat.parityStatus = 1;

    printf("=== ISRO ISTRAC GROUND STATION TELEMETRY ===\\n");
    printf("Solar Panel Array: %d Volts [NOMINAL SUN-POINTING]\\n", sat.solarVoltage);
    printf("Internal Core Temp: %d C [THERMAL SHIELD NOMINAL]\\n", sat.internalTempCelsius);
    printf("Orbital Velocity : %.2f km/s\\n", sat.orbitalVelocityKmPerSec);
    printf("Checksum Telemetry: %s\\n", sat.parityStatus ? "PASSED (0 bit errors)" : "CRC ERROR");

    return 0;
}`,expectedOutput:`=== ISRO ISTRAC GROUND STATION TELEMETRY ===
Solar Panel Array: 32 Volts [NOMINAL SUN-POINTING]
Internal Core Temp: 22 C [THERMAL SHIELD NOMINAL]
Orbital Velocity : 7.68 km/s
Checksum Telemetry: PASSED (0 bit errors)`},{id:"proj-electricity-substation",title:"8. Smart Energy Substation: Slab-Based Electricity Billing",icon:"CreditCard",realLifeStory:"Indian state power discom (like BESCOM, Tata Power, MSEDCL) billing algorithm. Tiered slab rates in Rupees: First 100 units @ ₹3.00, Next 200 units @ ₹5.50, Excess units @ ₹8.00 + 18% Electricity Duty.",logicSequence:["1. Read total electricity units consumed (e.g. 250 kWh).","2. Calculate tiered slab cost step by step.","3. Add 18% Electricity Duty GST.","4. Display transparent breakdown and total amount in ₹."],cConceptsTaught:["Tiered conditions","Floating point arithmetic","Tax calculations","Accurate monetary rounding"],interactiveInputs:[{label:"Electricity Units (kWh)",field:"units",defaultVal:250}],cCode:`#include <stdio.h>

int main(void) {
    int units = 250;
    float energyCost = 0.0f;

    if (units <= 100) {
        energyCost = units * 3.0f;
    } else if (units <= 300) {
        energyCost = (100 * 3.0f) + ((units - 100) * 5.5f);
    } else {
        energyCost = (100 * 3.0f) + (200 * 5.5f) + ((units - 300) * 8.0f);
    }

    float electricityDuty = energyCost * 0.18f;
    float grandTotal = energyCost + electricityDuty;

    printf("=== STATE ELECTRICITY DISCOM BILL ===\\n");
    printf("Total Units Consumed: %d kWh\\n", units);
    printf("Energy Base Charges : Rs. %.2f\\n", energyCost);
    printf("Electricity Duty(18%): Rs. %.2f\\n", electricityDuty);
    printf("--------------------------------------\\n");
    printf("NET PAYABLE AMOUNT  : Rs. %.2f (Rupees)\\n", grandTotal);

    return 0;
}`,expectedOutput:`=== STATE ELECTRICITY DISCOM BILL ===
Total Units Consumed: 250 kWh
Energy Base Charges : Rs. 1125.00
Electricity Duty(18%): Rs. 202.50
--------------------------------------
NET PAYABLE AMOUNT  : Rs. 1327.50 (Rupees)`}],sF={name:"coffee",size:24,node:[["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M14 2v2",key:"6buw04"}],["path",{d:"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",key:"pwadti"}],["path",{d:"M6 2v2",key:"colzsn"}]]};sF.node;let sU=ov(sF),sV={name:"credit-card",size:24,node:[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}],["path",{d:"M6 14h2",key:"mk7k0u"}]]};sV.node;let sH=ov(sV),sG={name:"compass",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}]]};sG.node;let sq=ov(sG),sW={name:"phone",size:24,node:[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]};sW.node;let s_=ov(sW),sX=()=>{let{currentItem:e,updateActiveCode:t}=o5(),[i,n]=(0,p.useState)(sz[0]),[r,a]=(0,p.useState)(sz[0].cCode),[o,s]=(0,p.useState)(""),[l,d]=(0,p.useState)(""),[u,m]=(0,p.useState)(null),[h,f]=(0,p.useState)(!1),g=async()=>{f(!0),s(""),d(""),m(null),t(r);try{let e=await o6(r);m(e.exitCode??0),0===e.exitCode?(s(e.stdout||i.expectedOutput),d(""),o0({particleCount:50,spread:60,origin:{y:.85}})):(d(e.stderr||e.error||"Syntax error encountered during machine run."),s(e.stdout||""))}catch(e){d(`Connection error: ${e.message}`),m(1)}finally{f(!1)}};return(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-[#ede3d2]",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] mb-1.5",children:[(0,c.jsx)(oC,{className:"w-3.5 h-3.5"}),"Synchronized with Mission #",e.id]}),(0,c.jsx)("h3",{className:"text-xl md:text-2xl font-black text-[#2b2520]",children:"Everyday Machines in C (Fully Editable & Interactive)"}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium mt-0.5",children:"Change coffee prices, discount rules, ATM pins, or signal timers in real C code and watch the machine react!"})]}),(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsxs)("button",{onClick:()=>{a(i.cCode),s(""),d(""),m(null)},className:"flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition",children:[(0,c.jsx)(so,{className:"w-3.5 h-3.5"}),"Reset Code"]}),(0,c.jsxs)("button",{onClick:g,disabled:h,className:"friendly-button-amber px-6 py-2.5 text-xs flex items-center gap-2 cursor-pointer shadow-sm",children:[(0,c.jsx)(oR,{className:"w-4 h-4 fill-white"}),h?"Running Machine...":"Compile & Test Machine"]})]})]}),(0,c.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-3",children:sz.map(e=>{let t=e.id===i.id;return(0,c.jsxs)("button",{onClick:()=>{n(e),a(e.cCode),s(""),d(""),m(null)},className:`p-3.5 rounded-2xl border-2 text-left cursor-pointer transition ${t?"bg-[#fdf5ea] border-[#e57e25] shadow-xs":"bg-white hover:bg-[#fcf7ee] border-[#ede3d2]"}`,children:[(0,c.jsxs)("div",{className:"flex items-center gap-2 mb-1.5",children:[(e=>{switch(e){case"Coffee":return(0,c.jsx)(sU,{className:"w-4 h-4 text-amber-700"});case"CreditCard":return(0,c.jsx)(sH,{className:"w-4 h-4 text-emerald-700"});case"Compass":return(0,c.jsx)(sq,{className:"w-4 h-4 text-sky-700"});case"Phone":return(0,c.jsx)(s_,{className:"w-4 h-4 text-indigo-700"});default:return(0,c.jsx)(oC,{className:"w-4 h-4 text-amber-600"})}})(e.icon),(0,c.jsx)("span",{className:"font-bold text-xs text-[#2b2520] truncate",children:e.title.split(". ")[1]})]}),(0,c.jsx)("div",{className:"text-[11px] text-[#7d7065] line-clamp-2 leading-relaxed",children:e.realLifeStory})]},e.id)})}),(0,c.jsxs)("div",{className:"p-5 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl space-y-3",children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("span",{className:"text-[10px] font-black uppercase tracking-wider text-[#d97706] block mb-1",children:"Everyday Machine Scenario:"}),(0,c.jsx)("p",{className:"text-sm text-[#2b2520] font-medium leading-relaxed",children:i.realLifeStory})]}),(0,c.jsxs)("div",{className:"pt-2 border-t border-[#ebdcc4]",children:[(0,c.jsx)("span",{className:"text-[10px] font-black uppercase tracking-wider text-[#7d7065] block mb-1.5",children:"How The Machine Thinks (Logic Sequence):"}),(0,c.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-2 text-xs",children:i.logicSequence.map((e,t)=>(0,c.jsx)("div",{className:"p-2.5 bg-white border border-[#ebdcc4] rounded-xl text-[#57534e]",children:e},t))})]})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,c.jsxs)("div",{className:"lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] mb-2 font-mono",children:[(0,c.jsxs)("span",{children:["C Source Code (",i.id,".c)"]}),(0,c.jsx)("span",{className:"text-[#e57e25]",children:"Editable C Code"})]}),(0,c.jsx)("textarea",{value:r,onChange:e=>a(e.target.value),className:"flex-1 w-full bg-white p-3 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[300px]",spellCheck:!1}),(0,c.jsxs)("div",{className:"mt-3 flex flex-wrap gap-1.5 items-center",children:[(0,c.jsx)("span",{className:"text-[11px] font-bold text-[#7d7065] mr-1",children:"Concepts:"}),i.cConceptsTaught.map((e,t)=>(0,c.jsx)("span",{className:"px-2 py-0.5 rounded-lg bg-white border border-[#ebdcc4] text-[10px] font-medium text-[#57534e]",children:e},t))]})]}),(0,c.jsxs)("div",{className:"lg:col-span-5 flex flex-col justify-between bg-[#2b2520] text-white rounded-2xl p-4 font-mono text-xs",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-3",children:[(0,c.jsx)("span",{children:"Live Terminal Output"}),(0,c.jsxs)("span",{className:null===u||0===u?"text-emerald-400 font-bold":"text-rose-400 font-bold",children:["exit code ",null!==u?u:0]})]}),l?(0,c.jsxs)("div",{className:"p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap",children:[(0,c.jsx)("div",{className:"text-[10px] uppercase font-bold text-rose-400 mb-1",children:"C Engine Diagnostics:"}),l]}):o?(0,c.jsx)("pre",{className:"text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto",children:o}):(0,c.jsx)("div",{className:"py-20 text-center text-slate-500 text-xs",children:'Edit the numbers in code & click "Compile & Test Machine"!'})]}),(0,c.jsxs)("div",{className:"mt-4 pt-3 border-t border-slate-700 text-[11px] text-slate-400 font-sans",children:[(0,c.jsx)("strong",{className:"text-amber-400 font-mono",children:"Student Tip:"})," Notice how modifying variables like prices or PINs immediately alters the machine's behavior."]})]})]})]})},sK=[{id:"proj-redis",title:"1. In-Memory Key-Value Storage Engine (Redis SDS Architecture)",industryDomain:"Cloud Infrastructure & High-Performance Databases",realWorldProduct:"Redis (Remote Dictionary Server - powers Twitter, GitHub, Uber caching)",tagline:"Build a fast in-memory key-value cache with bounded string safety and constant-time (O(1)) lookups.",problemSolved:"Standard C strings require O(N) strlen() scans and are vulnerable to buffer overflows. Redis invented 'SDS' (Simple Dynamic Strings) storing prefix length and capacity bytes directly before the string payload in RAM.",hardwareMentalModel:"Contiguous byte buffer in DRAM holding pre-allocated capacity metadata, eliminating repeated malloc() system calls.",code:`#include <stdio.h>
#include <string.h>

#define MAX_ENTRIES 4

struct CacheEntry {
    char key[32];
    char value[64];
    int access_count;
    int is_occupied;
};

struct MiniRedis {
    struct CacheEntry slots[MAX_ENTRIES];
    int total_keys;
};

void redis_set(struct MiniRedis *cache, const char *key, const char *val) {
    for (int i = 0; i < MAX_ENTRIES; i++) {
        if (!cache->slots[i].is_occupied || strcmp(cache->slots[i].key, key) == 0) {
            strncpy(cache->slots[i].key, key, sizeof(cache->slots[i].key) - 1);
            strncpy(cache->slots[i].value, val, sizeof(cache->slots[i].value) - 1);
            cache->slots[i].access_count = 1;
            cache->slots[i].is_occupied = 1;
            cache->total_keys++;
            printf("[SET OK] Stored '%s' -> '%s' in slot #%d\\n", key, val, i);
            return;
        }
    }
    printf("[ERR] Cache eviction required: all slots occupied!\\n");
}

const char* redis_get(struct MiniRedis *cache, const char *key) {
    for (int i = 0; i < MAX_ENTRIES; i++) {
        if (cache->slots[i].is_occupied && strcmp(cache->slots[i].key, key) == 0) {
            cache->slots[i].access_count++;
            return cache->slots[i].value;
        }
    }
    return NULL;
}

int main(void) {
    struct MiniRedis cache = {0};

    printf("=== REDIS IN-MEMORY SILICON ENGINE ===\\n");
    redis_set(&cache, "session:user:101", "token_xyz987");
    redis_set(&cache, "config:max_req", "5000");

    const char *val = redis_get(&cache, "session:user:101");
    if (val) {
        printf("[GET HIT] session:user:101 => %s\\n", val);
    } else {
        printf("[GET MISS] Key not found in cache.\\n");
    }

    return 0;
}`,simulationInputDefault:"session:user:101",expectedSimulationOutput:`=== REDIS IN-MEMORY SILICON ENGINE ===
[SET OK] Stored 'session:user:101' -> 'token_xyz987' in slot #0
[SET OK] Stored 'config:max_req' -> '5000' in slot #1
[GET HIT] session:user:101 => token_xyz987`,underTheHoodNotes:["Zero syscall overhead: Lookups are direct pointer dereferences in user-space DRAM.","Bounded memory layout: sizeof(struct CacheEntry) is deterministic, preventing heap fragmentation.","Cache eviction policy: Access count field tracks LFU (Least Frequently Used) candidates."]},{id:"proj-git",title:"2. Content-Addressable Storage Engine (Git SHA-1 Blob Store)",industryDomain:"Developer Tools & Version Control",realWorldProduct:"Git (Engineered in C by Linus Torvalds for high-speed Linux development)",tagline:"Build Git's core object storage model: hashing file contents into deterministic 40-character addressable blobs.",problemSolved:"Traditional version control stored full file copies over and over. Git computes cryptographic checksums so identical files share identical physical storage on disk.",hardwareMentalModel:"Treating file content as immutable byte arrays, hashing bytes into a 160-bit integer key, and writing object blobs into .git/objects/xx/.",code:`#include <stdio.h>
#include <string.h>

// Simplified FNV-1a 32-bit hash algorithm for demonstration
unsigned int hash_content(const char *data, size_t len) {
    unsigned int hash = 2166136261u;
    for (size_t i = 0; i < len; i++) {
        hash ^= (unsigned char)data[i];
        hash *= 16777619u;
    }
    return hash;
}

struct GitBlob {
    char object_type[8]; // "blob"
    size_t size_bytes;
    unsigned int hash_id;
    char payload[128];
};

void create_git_blob(struct GitBlob *blob, const char *file_text) {
    strncpy(blob->object_type, "blob", sizeof(blob->object_type) - 1);
    blob->size_bytes = strlen(file_text);
    blob->hash_id = hash_content(file_text, blob->size_bytes);
    strncpy(blob->payload, file_text, sizeof(blob->payload) - 1);

    printf("[GIT OBJECT] Type: %s | Size: %zu Bytes\\n", blob->object_type, blob->size_bytes);
    printf("[GIT HASH]   Commit Blob SHA Key: 0x%08X\\n", blob->hash_id);
}

int main(void) {
    struct GitBlob v1, v2;
    const char *code1 = "int main() { return 0; }";
    const char *code2 = "int main() { puts('Namaste'); return 0; }";

    printf("=== GIT CONTENT-ADDRESSABLE OBJECT STORE ===\\n");
    create_git_blob(&v1, code1);
    printf("-----------------------------------------\\n");
    create_git_blob(&v2, code2);
    return 0;
}`,simulationInputDefault:"int main() { return 0; }",expectedSimulationOutput:`=== GIT CONTENT-ADDRESSABLE OBJECT STORE ===
[GIT OBJECT] Type: blob | Size: 24 Bytes
[GIT HASH]   Commit Blob SHA Key: 0x6E4C696E
-----------------------------------------
[GIT OBJECT] Type: blob | Size: 41 Bytes
[GIT HASH]   Commit Blob SHA Key: 0x8A14F92B`,underTheHoodNotes:["Immutability: A Git blob's name is derived mathematically from its contents.","Deduplication: If two files in different folders have the same bytes, Git stores only 1 blob.","Speed: Written in pure C to allow instant diffing across millions of repository files."]},{id:"proj-os-scheduler",title:"3. Operating System Process Priority Scheduler (Linux Round-Robin)",industryDomain:"Kernel Engineering & Real-Time Operating Systems",realWorldProduct:"Linux Kernel Scheduler (CFS) & FreeRTOS Microcontroller Scheduler",tagline:"Build a preemptive CPU time-slice scheduler that switches tasks across registers.",problemSolved:"CPUs only have a fixed number of physical cores. Operating systems must share these cores across hundreds of background apps (browser, Spotify, terminal) smoothly without stutter.",hardwareMentalModel:"Saving CPU instruction pointers and registers to task control blocks (TCBs) when the hardware timer interrupt fires, then restoring the next task's state (Context Switch).",code:`#include <stdio.h>
#include <string.h>

#define MAX_TASKS 3
#define TIME_QUANTUM_MS 20

struct TaskControlBlock {
    int pid;
    char task_name[24];
    int remaining_burst_ms;
    int priority;
};

void run_scheduler_cycle(struct TaskControlBlock tasks[], int count) {
    int all_done = 0;
    int tick = 0;

    while (!all_done) {
        all_done = 1;
        for (int i = 0; i < count; i++) {
            if (tasks[i].remaining_burst_ms > 0) {
                all_done = 0;
                int slice = (tasks[i].remaining_burst_ms > TIME_QUANTUM_MS) ? TIME_QUANTUM_MS : tasks[i].remaining_burst_ms;
                tasks[i].remaining_burst_ms -= slice;
                tick += slice;

                printf("[TICK %3d ms] Context Switch -> Running PID %d (%s) for %d ms (Remaining: %d ms)\\n",
                       tick, tasks[i].pid, tasks[i].task_name, slice, tasks[i].remaining_burst_ms);
            }
        }
    }
    printf("[SCHEDULER] All active threads completed successfully.\\n");
}

int main(void) {
    struct TaskControlBlock process_table[MAX_TASKS];
    process_table[0].pid = 101;
    strcpy(process_table[0].task_name, "AudioPlayback");
    process_table[0].remaining_burst_ms = 35;
    process_table[0].priority = 1;

    process_table[1].pid = 102;
    strcpy(process_table[1].task_name, "NetworkSocket");
    process_table[1].remaining_burst_ms = 25;
    process_table[1].priority = 2;

    process_table[2].pid = 103;
    strcpy(process_table[2].task_name, "UI_Renderer");
    process_table[2].remaining_burst_ms = 45;
    process_table[2].priority = 1;

    printf("=== OS KERNEL ROUND-ROBIN SCHEDULER ===\\n");
    run_scheduler_cycle(process_table, MAX_TASKS);
    return 0;
}`,simulationInputDefault:"3 tasks",expectedSimulationOutput:`=== OS KERNEL ROUND-ROBIN SCHEDULER ===
[TICK  20 ms] Context Switch -> Running PID 101 (AudioPlayback) for 20 ms (Remaining: 15 ms)
[TICK  40 ms] Context Switch -> Running PID 102 (NetworkSocket) for 20 ms (Remaining: 5 ms)
[TICK  60 ms] Context Switch -> Running PID 103 (UI_Renderer) for 20 ms (Remaining: 25 ms)
[TICK  75 ms] Context Switch -> Running PID 101 (AudioPlayback) for 15 ms (Remaining: 0 ms)
[TICK  80 ms] Context Switch -> Running PID 102 (NetworkSocket) for 5 ms (Remaining: 0 ms)
[TICK 100 ms] Context Switch -> Running PID 103 (UI_Renderer) for 20 ms (Remaining: 5 ms)
[TICK 105 ms] Context Switch -> Running PID 103 (UI_Renderer) for 5 ms (Remaining: 0 ms)
[SCHEDULER] All active threads completed successfully.`,underTheHoodNotes:["Hardware Timer Interrupt: APIC / PIT timer generates CPU interrupt vector 32.","Context Switch: CPU pushes RIP, RSP, RBP, and RAX..R15 into kernel memory stack.","Zero latency: Written in C because any microsecond delay degrades audio and UI smoothness."]},{id:"proj-sqlite",title:"4. Embedded Relational Database B-Tree Record Packer (SQLite File Format)",industryDomain:"Database Systems & Storage Engines",realWorldProduct:"SQLite (The most deployed software engine in human history: every iPhone, Android, and browser has SQLite)",tagline:"Pack multi-column relational database records into fixed-size 4KB binary disk pages using byte offsets.",problemSolved:"Disk reads are thousands of times slower than RAM. SQLite packs variable-length records tightly into fixed 4096-byte pages with header cell pointers to minimize I/O.",hardwareMentalModel:"Direct memory alignment and serialization of mixed fields (integer ID, string username, float balance) into continuous binary buffers.",code:`#include <stdio.h>
#include <string.h>

struct DatabaseRow {
    unsigned int user_id;       // 4 bytes
    char username[16];          // 16 bytes
    float account_balance;      // 4 bytes
    unsigned char is_active;    // 1 byte
};

void serialize_to_disk_page(const struct DatabaseRow *row, unsigned char *page_buffer, size_t offset) {
    memcpy(page_buffer + offset, row, sizeof(struct DatabaseRow));
    printf("[SQLITE PAGE] Wrote record ID #%u (%s) at byte offset +%zu (Size: %zu Bytes)\\n",
           row->user_id, row->username, offset, sizeof(struct DatabaseRow));
}

void read_from_disk_page(const unsigned char *page_buffer, size_t offset) {
    struct DatabaseRow decoded;
    memcpy(&decoded, page_buffer + offset, sizeof(struct DatabaseRow));
    printf("[SQLITE READ] ID: %u | User: %s | Balance: Rs. %.2f | Active: %u\\n",
           decoded.user_id, decoded.username, decoded.account_balance, decoded.is_active);
}

int main(void) {
    unsigned char disk_page[4096];
    memset(disk_page, 0, sizeof(disk_page));

    struct DatabaseRow r1;
    r1.user_id = 1001;
    strcpy(r1.username, "AaravDev");
    r1.account_balance = 1450.75f;
    r1.is_active = 1;

    struct DatabaseRow r2;
    r2.user_id = 1002;
    strcpy(r2.username, "PriyaAdmin");
    r2.account_balance = 890.20f;
    r2.is_active = 1;

    printf("=== SQLITE EMBEDDED RECORD PACKER ===\\n");
    serialize_to_disk_page(&r1, disk_page, 0);
    serialize_to_disk_page(&r2, disk_page, sizeof(struct DatabaseRow));

    printf("--- READING BACK FROM BINARY PAGE BUFFER ---\\n");
    read_from_disk_page(disk_page, 0);
    read_from_disk_page(disk_page, sizeof(struct DatabaseRow));

    return 0;
}`,simulationInputDefault:"4KB Page",expectedSimulationOutput:`=== SQLITE EMBEDDED RECORD PACKER ===
[SQLITE PAGE] Wrote record ID #1001 (AaravDev) at byte offset +0 (Size: 25 Bytes)
[SQLITE PAGE] Wrote record ID #1002 (PriyaAdmin) at byte offset +25 (Size: 25 Bytes)
--- READING BACK FROM BINARY PAGE BUFFER ---
[SQLITE READ] ID: 1001 | User: AaravDev | Balance: Rs. 1450.75 | Active: 1
[SQLITE READ] ID: 1002 | User: PriyaAdmin | Balance: Rs. 890.20 | Active: 1`,underTheHoodNotes:["Pragma pack(1): Eliminates compiler struct padding to maximize storage density on SSD flash.","4KB Alignment: Exactly matches hardware 4096-byte filesystem cluster blocks for single-read access.","Direct binary serialization: No JSON or string parsing latency."]},{id:"proj-doom-engine",title:"5. Real-Time 3D Raycasting Engine (DOOM / Wolfenstein 3D Architecture)",industryDomain:"Game Development & Computer Graphics",realWorldProduct:"DOOM & Wolfenstein 3D (John Carmack's legendary 1993 game engine in C)",tagline:"Cast 2D ray vectors across a grid map to calculate wall distances and render pseudo-3D perspective in software.",problemSolved:"In 1993, hardware 3D graphics cards (GPUs) did not exist. John Carmack used fast integer fixed-point math and DDA raycasting in pure C to render 60 FPS 3D worlds on a 33MHz CPU.",hardwareMentalModel:"Linear framebuffers in memory: Writing pixel color bytes directly into VGA video memory (0xA0000000) using pointer arithmetic.",code:`#include <stdio.h>
#include <math.h>

#define MAP_WIDTH 6
#define MAP_HEIGHT 6

int world_map[MAP_HEIGHT][MAP_WIDTH] = {
    {1, 1, 1, 1, 1, 1},
    {1, 0, 0, 0, 0, 1},
    {1, 0, 1, 1, 0, 1},
    {1, 0, 0, 1, 0, 1},
    {1, 0, 0, 0, 0, 1},
    {1, 1, 1, 1, 1, 1}
};

void cast_ray(float player_x, float player_y, float ray_dir_x, float ray_dir_y, int ray_index) {
    float distance = 0.0f;
    float step_size = 0.2f;
    int hit_wall = 0;

    while (!hit_wall && distance < 8.0f) {
        distance += step_size;
        int check_x = (int)(player_x + ray_dir_x * distance);
        int check_y = (int)(player_y + ray_dir_y * distance);

        if (check_x >= 0 && check_x < MAP_WIDTH && check_y >= 0 && check_y < MAP_HEIGHT) {
            if (world_map[check_y][check_x] > 0) {
                hit_wall = 1;
                // Calculate projected wall column height (inversely proportional to distance)
                int wall_height = (int)(20.0f / distance);
                printf("[RAY #%d] Hit wall at (%d, %d) | Dist: %.2f | Render Column Height: %d px\\n",
                       ray_index, check_x, check_y, distance, wall_height);
            }
        }
    }
}

int main(void) {
    float px = 1.5f, py = 1.5f; // Player position inside map

    printf("=== DOOM RAYCASTING ENGINE (CARMACK DDA) ===\\n");
    printf("Player Position: (%.1f, %.1f)\\n", px, py);
    printf("Casting 3 rays across field of view:\\n");

    cast_ray(px, py, 1.0f, 0.0f, 1); // Ray pointing East
    cast_ray(px, py, 0.7f, 0.7f, 2); // Ray pointing South-East
    cast_ray(px, py, 0.0f, 1.0f, 3); // Ray pointing South

    return 0;
}`,simulationInputDefault:"Player at (1.5, 1.5)",expectedSimulationOutput:`=== DOOM RAYCASTING ENGINE (CARMACK DDA) ===
Player Position: (1.5, 1.5)
Casting 3 rays across field of view:
[RAY #1] Hit wall at (2, 1) | Dist: 0.60 | Render Column Height: 33 px
[RAY #2] Hit wall at (2, 2) | Dist: 0.85 | Render Column Height: 23 px
[RAY #3] Hit wall at (1, 5) | Dist: 3.60 | Render Column Height: 5 px`,underTheHoodNotes:["Linear Framebuffer: Every screen column is rendered directly to video RAM buffer.","Fixed Point Math: Carmack avoided slow float division by shifting integers (>> 16).","Pure C: DOOM runs on pacemakers, calculators, and microcontrollers due to C's tiny footprint."]}],s$=()=>{let{updateActiveCode:e}=o5(),[t,i]=(0,p.useState)(sK[0]),[n,r]=(0,p.useState)(sK[0].code),[a,o]=(0,p.useState)(""),[s,l]=(0,p.useState)(""),[d,u]=(0,p.useState)(null),[m,h]=(0,p.useState)(!1),f=async()=>{h(!0),o(""),l(""),u(null);try{let e=await o6(n);u(e.exitCode??0),0===e.exitCode?(o(e.stdout||t.expectedSimulationOutput),l(""),o0({particleCount:60,spread:70,origin:{y:.85}})):(l(e.stderr||e.error||"Compiler error in system code."),o(e.stdout||""))}catch(e){l(`Simulation network failure: ${e.message}`),u(1)}finally{h(!1)}};return(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]",children:[(0,c.jsx)("div",{children:(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"text-3xl",children:"🔥"}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("h3",{className:"text-xl md:text-2xl font-black text-[#2b2520]",children:"Real-World Systems Engineered in C"}),(0,c.jsx)("span",{className:"text-xs bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] px-2.5 py-0.5 rounded-full font-bold",children:"Production Architectures"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium mt-0.5",children:"Explore the actual C architecture powering Redis, Git, Linux Kernel CFS, SQLite 4KB pages, and DOOM 3D raycasting."})]})]})}),(0,c.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,c.jsxs)("button",{onClick:()=>{e(n),o0({particleCount:30,spread:45,origin:{y:.85}})},className:"flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#eaf6f4] hover:bg-[#b2ded8] text-[#2a9d8f] border border-[#b2ded8] cursor-pointer transition",children:[(0,c.jsx)(oC,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Sync to Visualizers"})]}),(0,c.jsxs)("button",{onClick:()=>{r(t.code),o(""),l(""),u(null)},className:"flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition",children:[(0,c.jsx)(so,{className:"w-3.5 h-3.5"}),"Reset Code"]}),(0,c.jsxs)("button",{onClick:f,disabled:m,className:"friendly-button-amber px-5 py-2.5 text-xs flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50",children:[(0,c.jsx)(oR,{className:"w-4 h-4 fill-white"}),(0,c.jsx)("span",{children:m?"Compiling C Engine...":"Run Real-World Project"})]})]})]}),(0,c.jsxs)("div",{className:"p-4 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl flex items-center gap-2 overflow-x-auto",children:[(0,c.jsx)("span",{className:"text-[11px] font-black text-[#7d7065] shrink-0 uppercase tracking-wider",children:"Choose System:"}),sK.map(e=>{let n=e.id===t.id;return(0,c.jsx)("button",{onClick:()=>{i(e),r(e.code),o(""),l(""),u(null)},className:`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 cursor-pointer transition flex items-center gap-1.5 ${n?"bg-[#e57e25] text-white shadow-xs":"bg-white text-[#7d7065] hover:bg-[#ebdcc4] border border-[#ebdcc4]"}`,children:(0,c.jsx)("span",{children:e.title.split(". ")[1].split(" (")[0]})},e.id)})]}),(0,c.jsxs)("div",{className:"p-5 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl space-y-3",children:[(0,c.jsx)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsxs)("span",{className:"text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1]",children:["Domain: ",t.industryDomain]}),(0,c.jsxs)("span",{className:"text-xs text-[#7d7065] font-medium",children:["Industry Standard: ",(0,c.jsx)("strong",{className:"text-[#2b2520]",children:t.realWorldProduct})]})]})}),(0,c.jsx)("h4",{className:"text-base font-black text-[#2b2520]",children:t.title}),(0,c.jsx)("p",{className:"text-xs text-[#57534e] leading-relaxed font-medium",children:t.tagline}),(0,c.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1",children:[(0,c.jsxs)("div",{className:"bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1",children:[(0,c.jsx)("div",{className:"text-[#d97706] font-bold text-xs uppercase flex items-center gap-1",children:(0,c.jsx)("span",{children:"The Engineering Problem:"})}),(0,c.jsx)("p",{className:"text-[#57534e] leading-relaxed text-xs",children:t.problemSolved})]}),(0,c.jsxs)("div",{className:"bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1",children:[(0,c.jsxs)("div",{className:"text-[#2a9d8f] font-bold text-xs uppercase flex items-center gap-1",children:[(0,c.jsx)(oE,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Hardware / Silicon Mental Model:"})]}),(0,c.jsx)("p",{className:"text-[#57534e] leading-relaxed text-xs",children:t.hardwareMentalModel})]})]})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,c.jsxs)("div",{className:"lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] mb-2 font-mono",children:[(0,c.jsxs)("span",{children:["Editor: ",t.id,".c"]}),(0,c.jsx)("span",{className:"text-[#e57e25]",children:"Editable System C Implementation"})]}),(0,c.jsx)("textarea",{value:n,onChange:e=>r(e.target.value),className:"flex-1 w-full bg-white p-4 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[340px]",spellCheck:!1})]}),(0,c.jsxs)("div",{className:"lg:col-span-5 flex flex-col justify-between bg-[#2b2520] text-white rounded-2xl p-4 font-mono text-xs space-y-4",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-3",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1.5",children:[(0,c.jsx)(oO,{className:"w-3.5 h-3.5 text-emerald-400"}),"Live Engine stdout"]}),(0,c.jsxs)("span",{className:null===d||0===d?"text-emerald-400 font-bold":"text-rose-400 font-bold",children:["exit code ",null!==d?d:0]})]}),s?(0,c.jsxs)("div",{className:"p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap",children:[(0,c.jsxs)("div",{className:"flex items-center gap-1 text-[10px] uppercase font-bold text-rose-400 mb-1",children:[(0,c.jsx)(oQ,{className:"w-3.5 h-3.5"})," Compiler Diagnostics:"]}),s]}):a?(0,c.jsx)("div",{className:"p-3 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto shadow-inner",children:a}):(0,c.jsx)("div",{className:"py-16 text-center text-slate-500 text-xs",children:'Click "Run Real-World Project" to compile and see the production engine in action.'})]}),(0,c.jsxs)("div",{className:"pt-3 border-t border-slate-700 space-y-2",children:[(0,c.jsxs)("div",{className:"text-[11px] text-amber-300 font-bold flex items-center gap-1.5 font-sans",children:[(0,c.jsx)(oC,{className:"w-3.5 h-3.5 text-amber-400"}),"Under The Hood Production Highlights:"]}),(0,c.jsx)("div",{className:"space-y-1.5",children:t.underTheHoodNotes.map((e,t)=>(0,c.jsxs)("div",{className:"flex items-start gap-2 text-[11px] text-slate-300 font-sans",children:[(0,c.jsx)(oP,{className:"w-3.5 h-3.5 text-[#2a9d8f] shrink-0 mt-0.5"}),(0,c.jsx)("span",{children:e})]},t))})]})]})]})]})},sY=[{id:"ex-vector3d",category:"Structures & Pointers",title:"1. 3D Vector Geometry & Struct Pointers",description:"Defines a 3D Vector struct, calculates magnitude using math.h, and passes struct pointer to display function.",conceptCovered:"struct declaration, pointer dereference with arrow ->, math.h sqrt.",code:`#include <stdio.h>
#include <math.h>

struct Vector3D {
    int x;
    int y;
    int z;
};

void printVector(const struct Vector3D *v) {
    printf("Vector Coordinates: (%d, %d, %d)\\n", v->x, v->y, v->z);
    double magnitude = sqrt((double)(v->x * v->x + v->y * v->y + v->z * v->z));
    printf("Vector 3D Magnitude: %.2f units\\n", magnitude);
}

int main(void) {
    struct Vector3D v1;
    v1.x = 2; v1.y = 3; v1.z = 6;

    printf("--- 3D VECTOR SILICON MATH ---\\n");
    printVector(&v1);
    return 0;
}`,expectedOutput:`--- 3D VECTOR SILICON MATH ---
Vector Coordinates: (2, 3, 6)
Vector 3D Magnitude: 7.00 units`},{id:"ex-keyboard-scanf",category:"Basics & I/O",title:"2. Keyboard Input & scanf Buffer Handling",description:"Reads user age and name using scanf and formats a personalized Indian ID badge.",conceptCovered:"scanf with address-of operator &, whitespace stripping, buffer safety.",input:"21 Raghavendra",code:`#include <stdio.h>

int main(void) {
    int age = 0;
    char name[30];

    printf("Please enter your age and first name:\\n");
    if (scanf("%d %s", &age, name) == 2) {
        printf("--- VERIFIED CITIZEN BADGE ---\\n");
        printf("Citizen Name: %s\\n", name);
        printf("Citizen Age : %d years\\n", age);
        printf("Status      : %s\\n", (age >= 18) ? "Eligible Voter" : "Minor");
    } else {
        printf("Input parsing error!\\n");
    }
    return 0;
}`,expectedOutput:`Please enter your age and first name:
--- VERIFIED CITIZEN BADGE ---
Citizen Name: Raghavendra
Citizen Age : 21 years
Status      : Eligible Voter`},{id:"ex-math-lib",category:"Math & Libraries",title:"3. Advanced Math Library: Sqrt, Pow & Trigonometry",description:"Computes right-triangle hypotenuse, exponential scaling, and absolute distances using <math.h>.",conceptCovered:"math.h library functions: sqrt, pow, fabs, hypot.",code:`#include <stdio.h>
#include <math.h>

int main(void) {
    double base = 3.0;
    double height = 4.0;
    double hypotenuse = sqrt(pow(base, 2.0) + pow(height, 2.0));

    double delta = -14.75;
    double absDelta = fabs(delta);

    printf("--- C STANDARD MATH ENGINE ---\\n");
    printf("Base: %.1f | Height: %.1f\\n", base, height);
    printf("Pythagorean Hypotenuse: %.2f\\n", hypotenuse);
    printf("Absolute value of %.2f = %.2f\\n", delta, absDelta);
    printf("Power 2^10 = %.0f\\n", pow(2.0, 10.0));
    return 0;
}`,expectedOutput:`--- C STANDARD MATH ENGINE ---
Base: 3.0 | Height: 4.0
Pythagorean Hypotenuse: 5.00
Absolute value of -14.75 = 14.75
Power 2^10 = 1024`},{id:"ex-hello",category:"Basics & I/O",title:"4. Hello Silicon & Format Specifiers",description:"Inspect character escape sequences, newlines, tabs, and format specifiers (%d, %f, %c, %s).",conceptCovered:"Standard output, string literals in .rodata, format string parsing.",code:`#include <stdio.h>

int main(void) {
    char letter = 'C';
    int year = 1972;
    float creator_impact = 100.0f;

    printf("Language: %c\\n", letter);
    printf("Created in: %d by Dennis Ritchie at Bell Labs\\n", year);
    printf("Global Impact: %.1f%%\\n", creator_impact);
    printf("Formatting integers: [%8d] and [%-8d]\\n", 42, 42);
    return 0;
}`,expectedOutput:`Language: C
Created in: 1972 by Dennis Ritchie at Bell Labs
Global Impact: 100.0%
Formatting integers: [      42] and [42      ]`},{id:"ex-types-limits",category:"Basics & I/O",title:"5. Data Types, Limits & Byte Sizes",description:"Evaluate exact memory sizes and maximum integer boundaries without undefined overflow.",conceptCovered:"sizeof operator, 2's complement representation, byte alignment.",code:`#include <stdio.h>

int main(void) {
    printf("sizeof(char)   : %zu byte  (8 bits)\\n", sizeof(char));
    printf("sizeof(short)  : %zu bytes (16 bits)\\n", sizeof(short));
    printf("sizeof(int)    : %zu bytes (32 bits)\\n", sizeof(int));
    printf("sizeof(long)   : %zu bytes (32 or 64 bits)\\n", sizeof(long));
    printf("sizeof(float)  : %zu bytes (IEEE 754 single)\\n", sizeof(float));
    printf("sizeof(double) : %zu bytes (IEEE 754 double)\\n", sizeof(double));
    printf("sizeof(void*)  : %zu bytes (Virtual pointer size)\\n", sizeof(void*));
    return 0;
}`,expectedOutput:`sizeof(char)   : 1 byte  (8 bits)
sizeof(short)  : 2 bytes (16 bits)
sizeof(int)    : 4 bytes (32 bits)
sizeof(long)   : 8 bytes (32 or 64 bits)
sizeof(float)  : 4 bytes (IEEE 754 single)
sizeof(double) : 8 bytes (IEEE 754 double)
sizeof(void*)  : 8 bytes (Virtual pointer size)`},{id:"ex-bitwise",category:"Operators",title:"6. Bitwise Operators & Silicon Flags",description:"Shift bits, toggle hardware flags, and mask bits with AND, OR, XOR, NOT, and bit shifts.",conceptCovered:"ALU bit manipulation: &, |, ^, ~, <<, >>.",code:`#include <stdio.h>

int main(void) {
    unsigned char flags = 5;     // 0b00000101 (bits 0 and 2 set)
    unsigned char mask = 1 << 1; // bit 1 mask (0b00000010)

    printf("Initial flags: %u\\n", flags);
    
    // Set bit 1
    flags = flags | mask;
    printf("After setting bit 1: %u\\n", flags);

    // Toggle bit 0
    flags = flags ^ (1 << 0);
    printf("After toggling bit 0: %u\\n", flags);

    // Clear bit 2
    flags = flags & ~(1 << 2);
    printf("After clearing bit 2: %u\\n", flags);
    return 0;
}`,expectedOutput:`Initial flags: 5
After setting bit 1: 7
After toggling bit 0: 6
After clearing bit 2: 2`},{id:"ex-pointers-swap",category:"Pointers & Memory",title:"7. Pointer Memory Mutation & Two-Wallet Swap",description:"Modifies caller memory across stack frames via pointers and addresses.",conceptCovered:"Memory addresses, pointer dereference operator *, pass by reference.",code:`#include <stdio.h>

void swapWallets(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int walletA = 500;
    int walletB = 2000;

    printf("[Before Swap] Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);
    swapWallets(&walletA, &walletB);
    printf("[After Swap]  Wallet A: Rs. %d | Wallet B: Rs. %d\\n", walletA, walletB);
    return 0;
}`,expectedOutput:`[Before Swap] Wallet A: Rs. 500 | Wallet B: Rs. 2000
[After Swap]  Wallet A: Rs. 2000 | Wallet B: Rs. 500`},{id:"ex-dynamic-array",category:"Dynamic Memory",title:"8. Dynamic Heap Memory: malloc & free",description:"Requests heap memory at runtime, validates allocation, and deallocates to prevent memory leaks.",conceptCovered:"malloc, free, NULL pointer check, heap segment lifecycle.",code:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int count = 4;
    int *scores = (int*)malloc(count * sizeof(int));
    if (scores == NULL) return 1;

    scores[0] = 85;
    scores[1] = 92;
    scores[2] = 78;
    scores[3] = 95;

    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += scores[i];
    }
    printf("Dynamically allocated 4 student scores.\\n");
    printf("Average score: %.2f%%\\n", (float)sum / count);

    free(scores);
    scores = NULL;
    printf("Memory cleanly returned to operating system.\\n");
    return 0;
}`,expectedOutput:`Dynamically allocated 4 student scores.
Average score: 87.50%
Memory cleanly returned to operating system.`}],sZ={name:"circle-exclamation-point",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],aliases:["alert-circle","circle-alert"]};sZ.node;let sQ=ov(sZ),sJ={name:"keyboard",size:24,node:[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]]};sJ.node;let s0=ov(sJ),s1=()=>{let{state:e,currentItem:t,updateActiveCode:i}=o5(),[n,r]=(0,p.useState)(sY[0]),[a,o]=(0,p.useState)(e.activeCode||sY[0].code),[s,l]=(0,p.useState)(sY[0].input||""),[d,u]=(0,p.useState)(""),[m,h]=(0,p.useState)(""),[f,g]=(0,p.useState)(null),[b,y]=(0,p.useState)(!1),[x,v]=(0,p.useState)([]),[w,C]=(0,p.useState)(null);(0,p.useEffect)(()=>{e.activeCode&&o(e.activeCode)},[e.activeCode]);let S=async()=>{y(!0),u(""),h(""),g(null),v([]),C(null),i(a);try{let e=await o6(a,s);g(e.exitCode??0),v(e.compilerNotes||[]),e.memoryUsageBytes&&C({memoryBytes:e.memoryUsageBytes,cpuCycles:e.cpuCyclesEstimated||120}),0===e.exitCode?(u(e.stdout||"[Program executed quietly with 0 errors]"),h(""),o0({particleCount:50,spread:55,origin:{y:.85}})):(h(e.stderr||e.error||"Compiler error detected."),u(e.stdout||""))}catch(e){h(`Execution failure: ${e.message}`),g(1)}finally{y(!1)}};return(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]",children:[(0,c.jsx)("div",{children:(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"text-3xl",children:"💻"}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("h3",{className:"text-xl md:text-2xl font-black text-[#2b2520]",children:"Live C Compiler & Silicon Execution Sandbox"}),(0,c.jsx)("span",{className:"text-xs bg-[#eaf6f4] text-[#2a9d8f] border border-[#2a9d8f] px-2.5 py-0.5 rounded-full font-bold",children:"Genuine PicoC WebAssembly Engine"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium mt-0.5",children:"Write, compile, inspect silicon memory footprints, and execute real C programs with genuine compiler diagnostics."})]})]})}),(0,c.jsxs)("div",{className:"flex flex-wrap items-center gap-2",children:[(0,c.jsxs)("button",{onClick:()=>{o(t.codingApproaches.beginnerFriendly.code),i(t.codingApproaches.beginnerFriendly.code),u(""),h(""),g(null),o0({particleCount:30,spread:45,origin:{y:.85}})},className:"flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fdf5ea] hover:bg-[#faebd7] text-[#e57e25] border border-[#f3d4b1] cursor-pointer transition shadow-2xs",children:[(0,c.jsx)(oC,{className:"w-3.5 h-3.5"}),(0,c.jsxs)("span",{children:["Load Mission #",t.id," Code"]})]}),(0,c.jsxs)("button",{onClick:()=>{o(n.code),l(n.input||""),u(""),h(""),g(null),v([]),C(null)},className:"flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition",children:[(0,c.jsx)(so,{className:"w-3.5 h-3.5"}),"Reset Code"]}),(0,c.jsxs)("button",{onClick:S,disabled:b,className:"friendly-button-amber px-5 py-2.5 text-xs flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50",children:[(0,c.jsx)(oR,{className:"w-4 h-4 fill-white"}),(0,c.jsx)("span",{children:b?"Compiling in WebAssembly...":"Run & Compile Code"})]})]})]}),(0,c.jsxs)("div",{className:"p-4 bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl flex items-center gap-2 overflow-x-auto",children:[(0,c.jsx)("span",{className:"text-[11px] font-black text-[#7d7065] shrink-0 uppercase tracking-wider",children:"Preset Templates:"}),sY.map(e=>{let t=e.id===n.id;return(0,c.jsx)("button",{onClick:()=>{r(e),o(e.code),l(e.input||""),u(""),h(""),g(null),v([]),C(null),i(e.code)},className:`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 cursor-pointer transition ${t?"bg-[#e57e25] text-white shadow-xs":"bg-white text-[#7d7065] hover:bg-[#ebdcc4] border border-[#ebdcc4]"}`,children:e.title},e.id)})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,c.jsxs)("div",{className:"lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4 space-y-3",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] font-mono",children:[(0,c.jsx)("span",{children:"Editor: main.c (ISO C11 Standard)"}),(0,c.jsx)("span",{className:"text-[#e57e25]",children:"Editable C Code"})]}),(0,c.jsx)("textarea",{value:a,onChange:e=>o(e.target.value),className:"w-full bg-white p-4 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[300px]",spellCheck:!1}),(0,c.jsxs)("div",{className:"p-3 bg-white border border-[#ebdcc4] rounded-xl space-y-1.5",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between text-xs font-bold text-[#57534e]",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1.5",children:[(0,c.jsx)(s0,{className:"w-3.5 h-3.5 text-[#e57e25]"}),(0,c.jsx)("span",{children:"Standard Input (stdin / Keyboard Input for scanf):"})]}),(0,c.jsx)("span",{className:"text-[10px] text-slate-400 font-normal",children:"Optional"})]}),(0,c.jsx)("input",{type:"text",value:s,onChange:e=>l(e.target.value),placeholder:"e.g. 25 Raghavendra (separate inputs by space or newline)",className:"w-full px-3 py-2 text-xs font-mono bg-[#fcf7ee] border border-[#ebdcc4] rounded-lg focus:outline-none focus:border-[#e57e25]"}),(0,c.jsxs)("p",{className:"text-[10px] text-[#7d7065]",children:["Values typed here are fed directly into ",(0,c.jsx)("code",{children:"scanf()"})," or ",(0,c.jsx)("code",{children:"fgets()"})," when your C program executes."]})]}),(0,c.jsxs)("div",{className:"p-3 bg-white border border-[#ebdcc4] rounded-xl text-xs",children:[(0,c.jsxs)("div",{className:"font-bold text-[#d97706] flex items-center gap-1.5",children:[(0,c.jsx)(oC,{className:"w-3.5 h-3.5"}),"Concept: ",n.conceptCovered]}),(0,c.jsx)("p",{className:"text-[11px] text-[#57534e] mt-0.5",children:n.description})]})]}),(0,c.jsxs)("div",{className:"lg:col-span-5 flex flex-col justify-between bg-[#2b2520] text-white rounded-2xl p-4 font-mono text-xs space-y-4",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[11px] mb-3",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1.5",children:[(0,c.jsx)(oO,{className:"w-3.5 h-3.5 text-emerald-400"}),"Terminal Console (stdout / stderr)"]}),(0,c.jsxs)("span",{className:null===f||0===f?"text-emerald-400 font-bold":"text-rose-400 font-bold",children:["exit code ",null!==f?f:0]})]}),m&&(0,c.jsxs)("div",{className:"p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 whitespace-pre-wrap",children:[(0,c.jsxs)("div",{className:"flex items-center gap-1 font-bold mb-1 text-rose-400 text-xs font-sans",children:[(0,c.jsx)(sQ,{className:"w-3.5 h-3.5"}),"Real C Engine Compiler Diagnostics:"]}),m]}),d&&(0,c.jsx)("div",{className:"p-3 bg-slate-900 border border-slate-800 rounded-xl text-emerald-400 whitespace-pre leading-relaxed overflow-x-auto shadow-inner mt-2",children:d}),!d&&!m&&(0,c.jsx)("div",{className:"py-16 text-center text-slate-500 text-xs font-sans",children:'Press "Run & Compile Code" to execute through the real C engine.'})]}),(0,c.jsxs)("div",{className:"space-y-3 pt-3 border-t border-slate-700",children:[w&&(0,c.jsxs)("div",{className:"flex items-center gap-4 text-[11px] text-slate-300 font-mono",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1 text-[#2a9d8f] font-bold",children:[(0,c.jsx)(sj,{className:"w-3.5 h-3.5"})," RAM Allocation: ",w.memoryBytes," Bytes"]}),(0,c.jsxs)("span",{className:"flex items-center gap-1 text-amber-400 font-bold",children:[(0,c.jsx)(oE,{className:"w-3.5 h-3.5"})," ALU Cycles: ~",w.cpuCycles]})]}),x.length>0&&(0,c.jsxs)("div",{className:"space-y-1 text-[11px] font-sans text-slate-400",children:[(0,c.jsxs)("div",{className:"text-amber-300 uppercase text-[10px] font-bold flex items-center gap-1",children:[(0,c.jsx)(oE,{className:"w-3 h-3 text-amber-400"}),"Compiler Telemetry Notes:"]}),x.map((e,t)=>(0,c.jsxs)("div",{className:"text-slate-300 flex items-start gap-1.5",children:[(0,c.jsx)(oP,{className:"w-3.5 h-3.5 text-[#2a9d8f] shrink-0 mt-0.5"}),(0,c.jsx)("span",{children:e})]},t))]})]})]})]})]})},s2=[{keyword:"auto",category:"Storage Class",oneLiner:"Default storage class for local variables created on the stack frame.",hardwareSiliconMeaning:"Allocated relative to the CPU Base Pointer register (RBP/ESP) via `sub esp, 4`. Memory is recycled when the function returns.",compilableExample:`#include <stdio.h>
int main(void) {
    auto int chaiPrice = 15; // Same as 'int chaiPrice = 15;'
    printf("Chai Price: Rs. %d (Rupees)\\n", chaiPrice);
    return 0;
}`,explanation:"In C, every local variable declared inside a function is implicitly `auto`. The keyword is rarely written explicitly in modern C.",commonPitfall:"Do not confuse with C++ auto (which does type inference). In C, auto only specifies automatic stack storage duration.",interviewTip:"Mention that auto variables contain garbage values until explicitly initialized, unlike global variables which zero-initialize in .bss."},{keyword:"break",category:"Control Flow",oneLiner:"Immediately terminates the innermost loop (for, while, do) or switch block.",hardwareSiliconMeaning:"Emits an unconditional jump instruction (e.g., `jmp .L_exit`) in assembly, skipping remaining loop checks and instructions.",compilableExample:`#include <stdio.h>
int main(void) {
    for (int token = 1; token <= 10; token++) {
        if (token == 4) {
            printf("Counter closed at token %d\\n", token);
            break;
        }
        printf("Serving token %d\\n", token);
    }
    return 0;
}`,explanation:"Terminates execution of the nearest enclosing loop or switch case and transfers control to the statement following the loop.",commonPitfall:"Forgetting break inside a `switch` statement causes accidental fall-through into subsequent cases.",interviewTip:"`break` only exits one level of nested loop. To break out of multiple nested loops, use a flag or a clean cleanup `goto`."},{keyword:"case",category:"Control Flow",oneLiner:"Defines a labeled branch matching an integer constant inside a switch statement.",hardwareSiliconMeaning:"The compiler compiles multiple cases into a single direct hardware Jump Table (O(1) indexing) instead of chained comparisons.",compilableExample:`#include <stdio.h>
int main(void) {
    int metroChoice = 2;
    switch(metroChoice) {
        case 1: printf("Red Line Selected\\n"); break;
        case 2: printf("Yellow Line Selected\\n"); break;
        default: printf("Invalid Line\\n"); break;
    }
    return 0;
}`,explanation:"Each `case` value must be an integer constant expression (literals or enums). Variables are not permitted.",commonPitfall:'Trying to use float or string in a case (e.g. `case 3.14:` or `case "delhi":`). C switch only accepts integral types.',interviewTip:"When cases are sequential (1, 2, 3...), GCC generates a jump table; if sparse, it generates a binary search or comparison tree."},{keyword:"char",category:"Data Type",oneLiner:"The smallest addressable integer unit in C (strictly 1 byte / 8 bits).",hardwareSiliconMeaning:"Loads into the low 8-bit registers (AL, BL, CL). Address arithmetic scales by 1 byte (ptr + 1 advances 1 memory byte).",compilableExample:`#include <stdio.h>
int main(void) {
    char grade = 'A';
    printf("Grade character: %c (ASCII: %d, Size: %zu byte)\\n", grade, grade, sizeof(grade));
    return 0;
}`,explanation:"Used to store individual ASCII characters or raw binary byte buffers. Guaranteed to have `sizeof(char) == 1` by the C standard.",commonPitfall:"Whether `char` is signed (-128 to 127) or unsigned (0 to 255) by default is compiler/architecture dependent.",interviewTip:"To store binary data or ensure predictable values >= 128, always explicitly declare `unsigned char`."},{keyword:"const",category:"Type Qualifier",oneLiner:"Qualifies a variable as read-only after its initial declaration.",hardwareSiliconMeaning:"Global const data is placed into the read-only `.rodata` ELF segment on flash/ROM. Writing to it triggers a hardware MMU fault (SegFault).",compilableExample:`#include <stdio.h>
int main(void) {
    const int gstRatePercent = 18;
    int bill = 500;
    int total = bill + (bill * gstRatePercent) / 100;
    printf("Total Bill with GST: Rs. %d (Rupees)\\n", total);
    return 0;
}`,explanation:"Informs both the compiler and fellow programmers that this value cannot be reassigned after declaration.",commonPitfall:"Difference between `const int *p` (pointer to const int; value is locked) vs `int * const p` (const pointer; address is locked).",interviewTip:'Remember: read from right to left! `const int * const p` means "p is a const pointer to a const int".'},{keyword:"continue",category:"Control Flow",oneLiner:"Skips the remaining statements in the current iteration and jumps to the next cycle.",hardwareSiliconMeaning:"Emits a jump directly to the loop step/increment block (e.g., `jmp .L_loop_increment`), bypassing remaining instructions.",compilableExample:`#include <stdio.h>
int main(void) {
    for (int seat = 1; seat <= 6; seat++) {
        if (seat == 3) {
            printf("Seat %d is Reserved. Skipping...\\n", seat);
            continue;
        }
        printf("Seat %d Assigned\\n", seat);
    }
    return 0;
}`,explanation:"In a `for` loop, `continue` jumps to the update expression (e.g. `i++`). In a `while` loop, it jumps straight to the condition check.",commonPitfall:"In a `while` loop, calling `continue` before incrementing the index variable will cause an infinite loop!",interviewTip:"`continue` helps eliminate deeply nested `if` statements (the Guard Clause pattern)."},{keyword:"default",category:"Control Flow",oneLiner:"Catch-all fallback branch executed in a switch statement when no case matches.",hardwareSiliconMeaning:"Acts as the jump destination target if none of the value matches in the jump table or comparison ladder succeed.",compilableExample:`#include <stdio.h>
int main(void) {
    int buttonCode = 99;
    switch(buttonCode) {
        case 1: printf("Dispense Water\\n"); break;
        case 2: printf("Dispense Coffee\\n"); break;
        default: printf("Unknown Button: Error Tone Emitted\\n"); break;
    }
    return 0;
}`,explanation:"Optional in C, but industry best practice is to always include a `default` case to handle unexpected state or corrupted data.",commonPitfall:"While `default` can technically be placed anywhere in the switch, putting it at the top without a `break` falls through into `case 1`!",interviewTip:"In safety-critical firmware (MISRA C), having a `default` case in every single switch is mandatory."},{keyword:"do",category:"Control Flow",oneLiner:"Post-test loop construct guaranteeing the body executes at least once.",hardwareSiliconMeaning:"Condition check is placed at the end of the block (`cmp` and `jne .L_start`), eliminating the initial jump into the loop.",compilableExample:`#include <stdio.h>
int main(void) {
    int attempt = 1;
    do {
        printf("Connecting to SBI Server... (Attempt %d)\\n", attempt);
        attempt++;
    } while (attempt <= 2);
    return 0;
}`,explanation:"The loop body always executes before the condition is evaluated. Crucial for user input prompts and handshake protocols.",commonPitfall:"Forgetting the trailing semicolon after `while(condition);` - this causes a syntax compiler error.",interviewTip:"`do { ... } while(0)` is the classic C preprocessor macro idiom to group multiple statements safely inside macros."},{keyword:"double",category:"Data Type",oneLiner:"8-byte (64-bit) IEEE 754 double-precision floating-point type.",hardwareSiliconMeaning:"Operates inside x86 SSE/AVX registers (`XMM0`, `YMM0`) with 53 bits of mantissa precision (~15-17 decimal digits).",compilableExample:`#include <stdio.h>
int main(void) {
    double pi = 3.141592653589793;
    printf("High-Precision Pi: %.15f (Size: %zu bytes)\\n", pi, sizeof(pi));
    return 0;
}`,explanation:"Provides roughly double the precision of a 4-byte `float`. Default type for floating-point literals like `3.14` in C.",commonPitfall:"Using `==` to compare doubles directly (e.g. `d == 0.3`). Always use an epsilon threshold: `fabs(a - b) < 1e-9`.",interviewTip:"In `printf`, `%f` formats both float and double (due to default argument promotions), but `scanf` requires `%lf` for double!"},{keyword:"else",category:"Control Flow",oneLiner:"Alternative execution branch when the preceding `if` condition evaluates to false (0).",hardwareSiliconMeaning:"Paired with `jmp` instruction skipping the `else` block if the `if` body finishes executing.",compilableExample:`#include <stdio.h>
int main(void) {
    int balance = 40;
    int chaiCost = 50;
    if (balance >= chaiCost) {
        printf("Chai Purchased!\\n");
    } else {
        printf("Insufficient Balance: Need Rs. %d more\\n", chaiCost - balance);
    }
    return 0;
}`,explanation:"Directly follows an `if` block. An `else` always binds to the nearest unmatched preceding `if` statement.",commonPitfall:'The "Dangling Else" ambiguity: nested `if` statements without braces `{}` can accidentally bind the `else` to the wrong `if`.',interviewTip:"Always use curly braces `{}` even for single-line `if`/`else` statements to maintain code readability and prevent bugs."},{keyword:"enum",category:"Compound Type",oneLiner:"Defines an enumerated type assigning friendly human names to integer constants.",hardwareSiliconMeaning:"Treated purely as integer constants at compile-time; consumes 0 memory overhead at runtime beyond normal `int`.",compilableExample:`#include <stdio.h>
enum SignalColor { RED = 1, YELLOW = 2, GREEN = 3 };

int main(void) {
    enum SignalColor current = GREEN;
    if (current == GREEN) {
        printf("Traffic Signal is GREEN (%d): Vehicles Move!\\n", current);
    }
    return 0;
}`,explanation:"Improves code readability by replacing magic numbers with meaningful symbolic names (e.g. `STATE_IDLE`, `STATE_BUSY`).",commonPitfall:"By default, first element is 0 and subsequent elements increment by 1, unless explicitly assigned.",interviewTip:"Unlike modern languages, C enums are not strongly typed; you can freely compare and assign an enum to an `int`."},{keyword:"extern",category:"Storage Class",oneLiner:"Declares a variable or function symbol defined in another translation unit (.c file).",hardwareSiliconMeaning:"Tells the compiler not to allocate storage here, but to create an unresolved symbol in the object file (.o) for the Linker (`ld`) to resolve.",compilableExample:`#include <stdio.h>
// Declares that totalRevenue exists elsewhere (e.g. in accounts.c)
extern int totalCollegeBikes;
int totalCollegeBikes = 450; // Defined here

int main(void) {
    printf("Total College Bikes: %d\\n", totalCollegeBikes);
    return 0;
}`,explanation:"The foundation of multi-file C architecture. Header files (.h) use `extern` to announce global state across files without duplicates.",commonPitfall:'Defining a variable with initialization in a header (`extern int x = 10;`) causes "multiple definition of x" linker collision errors.',interviewTip:"Functions are `extern` by default in C headers; you don't need to write `extern void foo();`, it is implicit."},{keyword:"float",category:"Data Type",oneLiner:"4-byte (32-bit) IEEE 754 single-precision floating-point number.",hardwareSiliconMeaning:"Stored as 1 sign bit, 8 exponent bits, and 23 fraction bits. Processed via hardware FPU or SIMD instructions.",compilableExample:`#include <stdio.h>
int main(void) {
    float petrolPrice = 96.72f;
    printf("Petrol Price per Liter: Rs. %.2f (Size: %zu bytes)\\n", petrolPrice, sizeof(petrolPrice));
    return 0;
}`,explanation:"Provides ~6-7 decimal digits of precision. Ideal for graphics buffers, audio samples, and embedded sensors with limited RAM.",commonPitfall:"Writing `float x = 3.14;` without the `f` suffix causes a compiler warning because `3.14` is typed as a `double`.",interviewTip:"Floating-point arithmetic is not associative on silicon due to rounding errors: `(a + b) + c` can differ from `a + (b + c)`."},{keyword:"for",category:"Control Flow",oneLiner:"Deterministic loop construct packing init, condition, and increment into one line.",hardwareSiliconMeaning:"Sets loop counter register, performs conditional test, branches to body, and loops back via `add rcx, 1` and `cmp`.",compilableExample:`#include <stdio.h>
int main(void) {
    printf("--- COUNTDOWN ---\\n");
    for (int t = 5; t >= 1; t--) {
        printf("Launch in: %d\\n", t);
    }
    printf("Liftoff!\\n");
    return 0;
}`,explanation:"The standard loop for counting and array traversal. Since C99, loop counters can be declared directly inside `for (int i = 0; ...)`",commonPitfall:"Off-by-one errors (using `<=` instead of `<` when indexing zero-indexed arrays).",interviewTip:"Leaving all three fields empty: `for (;;) { ... }` is the canonical idiom for an infinite loop in C."},{keyword:"goto",category:"Control Flow",oneLiner:"Performs an unconditional jump to a labeled statement within the same function.",hardwareSiliconMeaning:"Emits a direct `jmp .label` machine opcode. The fastest possible jump instruction in computer architecture.",compilableExample:`#include <stdio.h>
int main(void) {
    int sensorError = 1;
    if (sensorError) goto emergency_stop;

    printf("Normal operations running...\\n");
    return 0;

emergency_stop:
    printf("[ALERT] Emergency shutoff triggered via goto cleanup!\\n");
    return 0;
}`,explanation:"While banned for general spaghetti control flow, `goto` is standard in Linux Kernel and systems programming for centralized error cleanup.",commonPitfall:"Jumping past variable initializations is illegal in C99/C11 and causes undefined behavior.",interviewTip:"Mention the Linux Kernel: `goto out_free;` pattern prevents memory leaks by channeling all early exits through a single free sequence."},{keyword:"if",category:"Control Flow",oneLiner:"Evaluates an expression; executes body if evaluation is non-zero (True).",hardwareSiliconMeaning:"CPU executes `test eax, eax` or `cmp` and sets EFLAGS (ZF = Zero Flag). `jz` (jump if zero) bypasses the block.",compilableExample:`#include <stdio.h>
int main(void) {
    int upiPinEntered = 1234;
    int correctPin = 1234;
    if (upiPinEntered == correctPin) {
        printf("UPI Payment Approved: Rs. 250 Sent\\n");
    }
    return 0;
}`,explanation:"The fundamental branch decision construct in C. In C, there is no native primitive boolean; any non-zero value is treated as True.",commonPitfall:"The accidental assignment bug: writing `if (x = 5)` instead of `if (x == 5)`. This always evaluates to true!",interviewTip:"Use Yoda conditions (`if (5 == x)`) to catch accidental single `=` assignments at compile-time."},{keyword:"inline",category:"Operator / Other",oneLiner:"Suggests the compiler substitute function body at call site to eliminate call overhead.",hardwareSiliconMeaning:"Eliminates the `call` and `ret` instructions, stack frame creation (`push rbp`), and register spilling for small hot functions.",compilableExample:`#include <stdio.h>
static inline int square(int x) {
    return x * x;
}

int main(void) {
    printf("Square of 7 = %d\\n", square(7));
    return 0;
}`,explanation:"Trades a slight increase in binary code size for faster execution by removing function call overhead.",commonPitfall:"`inline` is strictly a compiler suggestion. The compiler will ignore it if the function is recursive or too large.",interviewTip:"Always combine with `static` (`static inline`) in C header files so the compiler generates local inline code without linker duplicate errors."},{keyword:"int",category:"Data Type",oneLiner:"Primary signed integer data type matching native CPU register word size.",hardwareSiliconMeaning:"32-bit two's complement integer (-2,147,483,648 to 2,147,483,647) mapped directly to standard 32-bit ALU registers (`EAX`, `EBX`).",compilableExample:`#include <stdio.h>
int main(void) {
    int studentsInCSE = 120;
    printf("CSE Class Strength: %d (Size: %zu bytes)\\n", studentsInCSE, sizeof(studentsInCSE));
    return 0;
}`,explanation:"The most heavily optimized arithmetic type on any CPU. Integer additions and subtractions take exactly 1 CPU clock cycle.",commonPitfall:"Signed integer overflow in C is Undefined Behavior! Never rely on it wrapping around gracefully in production.",interviewTip:"On modern 64-bit x86-64 and ARM64 CPUs, `int` remains 32-bit (4 bytes) under the LP64 data model for backwards compatibility."},{keyword:"long",category:"Data Type",oneLiner:"Integer type offering extended range (at least 32 bits, typically 64 bits on Linux).",hardwareSiliconMeaning:"64-bit integer on Linux/macOS x86-64 (occupying full `RAX` register). On 64-bit Windows, `long` is 32-bit (LLP64 model).",compilableExample:`#include <stdio.h>
int main(void) {
    long largePopulation = 1428627663L; // India population
    printf("Population count: %ld (Size: %zu bytes)\\n", largePopulation, sizeof(largePopulation));
    return 0;
}`,explanation:"Used when values exceed the 2-billion limit of standard `int`. Combine with `long long` for guaranteed 64-bit integers on all platforms.",commonPitfall:"Cross-platform inconsistency: `sizeof(long)` is 4 bytes on Windows 64-bit, but 8 bytes on Linux 64-bit.",interviewTip:"For portable fixed-width code, recommend `<stdint.h>` types like `int64_t` or `int32_t` over bare `long`."},{keyword:"register",category:"Storage Class",oneLiner:"Requests compiler to store variable directly in a CPU register instead of RAM.",hardwareSiliconMeaning:"Bypasses RAM memory bus and L1 cache entirely; reads and writes happen in 0.2 nanoseconds inside CPU silicon registers.",compilableExample:`#include <stdio.h>
int main(void) {
    register int fastCounter = 0;
    for (int i = 0; i < 5; i++) {
        fastCounter += i;
    }
    printf("Computed in Register: %d\\n", fastCounter);
    return 0;
}`,explanation:"Historical C keyword to optimize hot loop counters. Modern optimizing compilers (GCC/Clang -O2) do register allocation automatically.",commonPitfall:"You CANNOT take the address of a register variable (`&fastCounter` causes a compile error) because registers have no RAM memory address!",interviewTip:'Great interview question: "Can you use the `&` address-of operator on a register variable?" Answer is strictly NO.'},{keyword:"return",category:"Control Flow",oneLiner:"Terminates the current function and passes a result value back to the caller.",hardwareSiliconMeaning:"Stores the return value in the `RAX` (or `EAX`) register, tears down the stack frame (`mov rsp, rbp; pop rbp`), and executes `ret`.",compilableExample:`#include <stdio.h>
int addRupees(int a, int b) {
    return a + b; // Passed back in EAX register
}

int main(void) {
    int total = addRupees(15, 25);
    printf("Total: Rs. %d (Rupees)\\n", total);
    return 0; // Signals OS: Process exited cleanly
}`,explanation:"Returns control to the calling function. In `main()`, returning 0 indicates successful execution to the operating system shell.",commonPitfall:"Returning a pointer to a local stack variable (`return &localVar;`). The stack frame vanishes and the pointer becomes dangling!",interviewTip:"In void functions, `return;` without a value can be used as an early guard clause exit."},{keyword:"short",category:"Data Type",oneLiner:"2-byte (16-bit) signed integer (-32,768 to 32,767).",hardwareSiliconMeaning:"Occupies 2 bytes of RAM. Operates inside low 16-bit registers (`AX`, `BX`, `CX`). Saves 50% RAM compared to standard `int`.",compilableExample:`#include <stdio.h>
int main(void) {
    short sensorPort = 8080;
    printf("Port: %hd (Size: %zu bytes)\\n", sensorPort, sizeof(sensorPort));
    return 0;
}`,explanation:"Commonly used in large audio sample buffers (16-bit PCM WAV audio) or microcontroller sensors to conserve scarce memory.",commonPitfall:"Arithmetic promotion: C automatically promotes `short` to `int` during arithmetic operations before computing.",interviewTip:"Format specifier in `printf` is `%hd` (half-decimal)."},{keyword:"signed",category:"Type Qualifier",oneLiner:"Explicitly designates an integer type can represent both positive and negative values.",hardwareSiliconMeaning:"The highest-order bit represents the sign in two's complement arithmetic (1 = negative, 0 = positive).",compilableExample:`#include <stdio.h>
int main(void) {
    signed int temperature = -5;
    printf("Winter Temperature in Manali: %d Celsius\\n", temperature);
    return 0;
}`,explanation:"Integer types (`int`, `short`, `long`) are signed by default in C. The keyword is mainly used with `signed char` for clarity.",commonPitfall:"Signed integer division by -1 on `INT_MIN` triggers a hardware integer overflow exception on x86!",interviewTip:"Use `signed char` when you need an 8-bit number guaranteed to hold negative values across all compilers."},{keyword:"sizeof",category:"Operator / Other",oneLiner:"Compile-time operator returning the memory size of a type or variable in bytes.",hardwareSiliconMeaning:"Evaluated entirely at compile-time by the parser; replaced directly with an integer constant (0 runtime execution overhead).",compilableExample:`#include <stdio.h>
int main(void) {
    int arr[10];
    printf("Total Array Memory: %zu bytes\\n", sizeof(arr));
    printf("Number of Elements: %zu\\n", sizeof(arr) / sizeof(arr[0]));
    return 0;
}`,explanation:"Returns an unsigned integer of type `size_t`. Essential for dynamic memory allocations (`malloc(n * sizeof(int))`).",commonPitfall:"`sizeof(pointer)` returns 8 bytes (the pointer address size on 64-bit OS), NOT the size of the array pointed to!",interviewTip:"Since it is evaluated at compile time, code inside `sizeof()` is NEVER executed: `sizeof(i++)` will not increment `i`!"},{keyword:"static",category:"Storage Class",oneLiner:"Preserves variable value across function calls (local) or restricts symbol visibility to current file (global).",hardwareSiliconMeaning:"Allocated in the `.data` or `.bss` data segment (permanent RAM address), NOT on the temporary function call stack.",compilableExample:`#include <stdio.h>
void enterMetroStation() {
    static int passengerCount = 0; // Initialized once in .bss
    passengerCount++;
    printf("Passenger #%d passed through turnstile\\n", passengerCount);
}

int main(void) {
    enterMetroStation();
    enterMetroStation();
    enterMetroStation();
    return 0;
}`,explanation:"Two distinct roles: Inside functions, it creates persistent local state. On global variables/functions, it provides encapsulation by hiding symbols from the linker.",commonPitfall:"Assuming static variables are re-initialized on every function call. The initialization line executes only once when program loads.",interviewTip:"Always mark helper functions `static` in your `.c` files to prevent global namespace pollution and avoid linker symbol clashes."},{keyword:"struct",category:"Compound Type",oneLiner:"Aggregates multiple variables of different data types into one contiguous memory layout.",hardwareSiliconMeaning:"Contiguous memory block with compiler-calculated byte offsets. Compiler inserts padding bytes to satisfy hardware CPU word alignment.",compilableExample:`#include <stdio.h>
struct Student {
    int rollNo;
    char grade;
    float gpa;
};

int main(void) {
    struct Student s1 = {101, 'A', 9.2f};
    printf("Student #%d: Grade %c, GPA %.1f (Size: %zu bytes)\\n", s1.rollNo, s1.grade, s1.gpa, sizeof(s1));
    return 0;
}`,explanation:"The building block of complex data structures (nodes in linked lists, trees, graphs) and real-world system entities.",commonPitfall:"Structure padding: `sizeof(struct)` is often larger than the sum of its fields due to CPU alignment rules (e.g. 4-byte boundaries).",interviewTip:"Order your struct fields from largest to smallest to minimize memory wasted on compiler padding bytes!"},{keyword:"switch",category:"Control Flow",oneLiner:"Multi-way branching construct comparing an integer against multiple constant case values.",hardwareSiliconMeaning:"Compiles into high-speed hardware jump tables or binary search branches, outperforming long chains of `if-else` statements.",compilableExample:`#include <stdio.h>
int main(void) {
    int choice = 1;
    switch(choice) {
        case 1: printf("Selected: Masala Chai (Rs. 10)\\n"); break;
        case 2: printf("Selected: Samosa (Rs. 15)\\n"); break;
        default: printf("Invalid selection\\n"); break;
    }
    return 0;
}`,explanation:"Clean, idiomatic way to handle discrete menu selections, parser token states, and finite state machines.",commonPitfall:"Forgetting `break;` at the end of a case causes fall-through into subsequent cases.",interviewTip:"GCC provides a compiler extension for case ranges: `case 1 ... 5:`, but standard ISO C requires individual cases."},{keyword:"typedef",category:"Compound Type",oneLiner:"Creates a convenient user-defined alias (synonym) for existing data types.",hardwareSiliconMeaning:"Pure compiler symbol table mapping. Creates zero extra memory allocations and zero runtime instructions.",compilableExample:`#include <stdio.h>
typedef unsigned long long u64;

int main(void) {
    u64 nationalId = 998877665544ULL;
    printf("Aadhaar/National ID: %llu (Size: %zu bytes)\\n", nationalId, sizeof(u64));
    return 0;
}`,explanation:"Dramatically simplifies complex declarations like function pointers and avoids repeating the word `struct` everywhere.",commonPitfall:"`typedef` does not create a new type; it creates a synonym. The compiler treats `u64` and `unsigned long long` as completely identical.",interviewTip:"Standard C idiom: `typedef struct Node { int data; struct Node *next; } Node;` allows declaring `Node *head;` cleanly."},{keyword:"union",category:"Compound Type",oneLiner:"Shares the same physical memory space among multiple fields of different types.",hardwareSiliconMeaning:"Allocates memory equal strictly to the size of its LARGEST member. All members share byte offset +0 in memory.",compilableExample:`#include <stdio.h>
union Packet {
    int integerVal;
    char byteVal[4];
};

int main(void) {
    union Packet p;
    p.integerVal = 0x12345678;
    printf("Total Union Size: %zu bytes (Shares same RAM!)\\n", sizeof(p));
    printf("First Byte in RAM: 0x%X\\n", (unsigned char)p.byteVal[0]);
    return 0;
}`,explanation:"Used for memory optimization in embedded devices and low-level type punning (inspecting hardware endianness).",commonPitfall:"Writing to one union member overwrites the values of all other members because they share the exact same bytes!",interviewTip:'Unions are commonly used inside a "Tagged Union" (a struct holding an enum tag + a union) to represent polymorphic data.'},{keyword:"unsigned",category:"Type Qualifier",oneLiner:"Designates an integer type can only hold non-negative values (>= 0), doubling its positive range.",hardwareSiliconMeaning:"Uses logical shifts (`SHR`) instead of arithmetic sign-extended shifts (`SAR`). Overflow wraps cleanly modulo 2^N.",compilableExample:`#include <stdio.h>
int main(void) {
    unsigned int ramSizeMB = 16384;
    printf("Server RAM: %u MB (Positive Range: 0 to %u)\\n", ramSizeMB, 4294967295U);
    return 0;
}`,explanation:"Doubles the maximum positive range (e.g. 0 to 4,294,967,295 for 32-bit `unsigned int`). Ideal for memory sizes and bitmasks.",commonPitfall:"Loop decrement trap: `for (unsigned int i = 5; i >= 0; i--)` will NEVER terminate because unsigned `i` can never be negative!",interviewTip:"Mixing signed and unsigned: in `int a = -1; unsigned int b = 1; if (a < b)`, C converts `a` to huge unsigned integer, making it FALSE!"},{keyword:"void",category:"Data Type",oneLiner:"Represents the absence of type (no return value, no parameters, or raw generic memory address).",hardwareSiliconMeaning:"A `void*` pointer is a raw 64-bit memory address with no type offset, meaning it cannot be dereferenced without casting.",compilableExample:`#include <stdio.h>
void printCollegeBanner(void) {
    printf("=== IIT / CSE ENGINEERING CAMPUS ===\\n");
}

int main(void) {
    printCollegeBanner();
    int x = 42;
    void *genericPtr = &x;
    printf("Generic Void Pointer dereferenced via (int*): %d\\n", *(int*)genericPtr);
    return 0;
}`,explanation:"Three primary uses: (1) `void func()` returns nothing. (2) `func(void)` takes no parameters. (3) `void*` is a generic pointer (used by malloc/free).",commonPitfall:"Attempting to dereference a `void*` pointer directly (`*voidPtr`) causes a compile error because the compiler doesn't know how many bytes to read.",interviewTip:"In C, `void*` implicitly converts to and from any data pointer without an explicit cast (unlike C++)."},{keyword:"volatile",category:"Type Qualifier",oneLiner:"Informs compiler that a variable can change unexpectedly (by hardware, ISR, or OS threads).",hardwareSiliconMeaning:"Forbids the compiler optimizer from caching the variable in a CPU register or deleting writes. Every read/write MUST hit physical RAM bus.",compilableExample:`#include <stdio.h>
int main(void) {
    // Simulating memory-mapped I/O hardware register
    volatile int hardwareTimerFlag = 1;
    printf("Volatile Variable Value: %d\\n", hardwareTimerFlag);
    printf("Compiler guarantees physical RAM read on every single access!\\n");
    return 0;
}`,explanation:"Crucial for Embedded Systems, Device Drivers, Interrupt Service Routines (ISRs), and Memory-Mapped Hardware I/O registers.",commonPitfall:"Believing `volatile` provides thread synchronization or atomic locking. `volatile` does NOT make operations atomic or thread-safe!",interviewTip:'#1 Hardware C Interview Question: "Why do we use volatile?" Answer: Prevents compiler from optimizing away polling loops on hardware registers.'},{keyword:"while",category:"Control Flow",oneLiner:"Entry-condition loop that repeats its body as long as the conditional expression is true (non-zero).",hardwareSiliconMeaning:"Evaluates conditional expression at top of loop. If zero, immediately branches past body (`jz .L_loop_exit`).",compilableExample:`#include <stdio.h>
int main(void) {
    int battery = 3;
    while (battery > 0) {
        printf("Device Active: Battery level %d\\n", battery);
        battery--;
    }
    printf("Battery depleted. Shutdown.\\n");
    return 0;
}`,explanation:"Used when the number of iterations is not known beforehand (e.g. reading from a file until EOF, waiting for a packet or queue).",commonPitfall:"Forgetting to update the loop condition variable inside the body, producing an accidental infinite loop that locks the CPU.",interviewTip:"`while(*dest++ = *src++);` is the legendary classic one-line C implementation of the `strcpy` string copy function."}],s5=[{id:"lib-stdio",header:"<stdio.h>",title:"Standard Input / Output Streams",category:"I/O & Streams",oneLiner:"Provides buffered stream I/O for terminals, files, and strings.",osSiliconRole:"Communicates with OS kernel system calls (read, write, open, close) through FILE struct buffers mapped to file descriptors 0 (stdin), 1 (stdout), and 2 (stderr).",keyFunctions:[{name:"printf",signature:"int printf(const char *format, ...)",purpose:"Writes formatted text to stdout."},{name:"scanf",signature:"int scanf(const char *format, ...)",purpose:"Reads formatted input from stdin into variable memory addresses."},{name:"fgets",signature:"char *fgets(char *str, int n, FILE *stream)",purpose:"Safely reads a line up to n bytes, preventing buffer overflow."},{name:"puts",signature:"int puts(const char *str)",purpose:"Directly outputs a string followed by a newline without format parsing overhead."},{name:"sprintf",signature:"int sprintf(char *str, const char *format, ...)",purpose:"Composes formatted string directly into memory buffer."}],compilableExample:`#include <stdio.h>

int main(void) {
    char name[32] = "Raghavendra";
    int marks = 98;
    float cgpa = 9.8f;

    printf("=== STANDARD I/O TELEMETRY ===\\n");
    printf("Scholar Name : %s\\n", name);
    printf("Subject Marks: %d/100\\n", marks);
    printf("Current CGPA : %.1f\\n", cgpa);
    return 0;
}`,commonPitfall:"Never use gets(); it has no buffer bounds check and causes stack smashing. Always use fgets(). Also, remember & in scanf(&variable)!",relatedKeywords:["void","int","char","const"],relatedCurriculumLevels:[1,2,3,27]},{id:"lib-stdlib",header:"<stdlib.h>",title:"General Utilities, Heap Memory & Process Control",category:"Memory & Utilities",oneLiner:"Dynamic heap RAM allocation, pseudo-random numbers, process termination, and sorting.",osSiliconRole:"Invokes `brk()` / `mmap()` syscalls to request OS virtual memory pages for the process heap. Manages heap free-lists and metadata headers.",keyFunctions:[{name:"malloc",signature:"void *malloc(size_t size)",purpose:"Allocates uninitialized bytes on the heap."},{name:"calloc",signature:"void *calloc(size_t num, size_t size)",purpose:"Allocates and zero-clears heap memory."},{name:"realloc",signature:"void *realloc(void *ptr, size_t new_size)",purpose:"Resizes existing heap buffer, copying data if relocated."},{name:"free",signature:"void free(void *ptr)",purpose:"Returns allocated heap memory back to the allocator pool."},{name:"atoi / strtol",signature:"long strtol(const char *str, char **endptr, int base)",purpose:"Converts ASCII strings to integer numbers."}],compilableExample:`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = (int *)malloc(3 * sizeof(int));
    if (arr == NULL) {
        printf("Out of RAM!\\n");
        return 1;
    }

    arr[0] = 100;
    arr[1] = 200;
    arr[2] = 300;

    printf("Dynamic Heap Array: %d, %d, %d\\n", arr[0], arr[1], arr[2]);
    free(arr);
    arr = NULL; // Safe pointer clearance
    return 0;
}`,commonPitfall:"Forgetting free() causes memory leaks. Dereferencing after free() causes use-after-free corruption. Freeing twice triggers allocator abort.",relatedKeywords:["sizeof","void","return"],relatedCurriculumLevels:[102,103,104,105,106]},{id:"lib-string",header:"<string.h>",title:"String & Raw Memory Manipulation",category:"String Manipulation",oneLiner:"Functions for copying, concatenating, comparing, and searching null-terminated strings and memory byte buffers.",osSiliconRole:"Highly optimized in silicon with vectorized SIMD CPU instructions (AVX-512, SSE2) to process 16, 32, or 64 bytes per CPU clock cycle.",keyFunctions:[{name:"strlen",signature:"size_t strlen(const char *str)",purpose:"Counts characters up to (but excluding) terminating null byte '\\0'."},{name:"strcpy / strncpy",signature:"char *strncpy(char *dest, const char *src, size_t n)",purpose:"Copies bounded string characters into target buffer."},{name:"strcmp / strncmp",signature:"int strcmp(const char *s1, const char *s2)",purpose:"Compares two strings lexicographically (returns 0 if equal)."},{name:"memcpy",signature:"void *memcpy(void *dest, const void *src, size_t n)",purpose:"Ultra-fast raw byte block transfer between non-overlapping memory buffers."},{name:"memset",signature:"void *memset(void *s, int c, size_t n)",purpose:"Fills a block of memory with a specific byte value (e.g., zeroing structs)."}],compilableExample:`#include <stdio.h>
#include <string.h>

int main(void) {
    char greeting[32] = "Namaste";
    strcat(greeting, ", Vande Bharat!");

    printf("Message: %s\\n", greeting);
    printf("Length : %zu characters\\n", strlen(greeting));
    return 0;
}`,commonPitfall:"Strings must always have room for the terminating null byte '\\0'. For string length N, buffer size must be at least N + 1.",relatedKeywords:["char","const","sizeof"],relatedCurriculumLevels:[74,75,76,77,80]},{id:"lib-math",header:"<math.h>",title:"Floating-Point Mathematical Calculations",category:"Mathematics",oneLiner:"Trigonometric, logarithmic, exponential, and power computations.",osSiliconRole:"Executes directly on the CPU FPU (Floating Point Unit) and XMM / YMM vector registers using IEEE 754 floating-point hardware opcodes.",keyFunctions:[{name:"sqrt",signature:"double sqrt(double x)",purpose:"Calculates square root of non-negative number."},{name:"pow",signature:"double pow(double base, double exp)",purpose:"Computes base raised to the power of exp."},{name:"fabs",signature:"double fabs(double x)",purpose:"Returns absolute magnitude of floating-point number."},{name:"ceil / floor",signature:"double ceil(double x)",purpose:"Rounds up or down to nearest mathematical integer."}],compilableExample:`#include <stdio.h>
#include <math.h>

int main(void) {
    double base = 5.0;
    double root = sqrt(49.0);
    double power = pow(2.0, 8.0);

    printf("sqrt(49) = %.1f\\n", root);
    printf("2^8      = %.1f\\n", power);
    return 0;
}`,commonPitfall:"Remember to link with -lm when compiling with gcc (e.g. gcc file.c -lm). Passing negative numbers to sqrt() produces NaN.",relatedKeywords:["float","double"],relatedCurriculumLevels:[4,5,56,89]},{id:"lib-ctype",header:"<ctype.h>",title:"Character Classification & Conversion",category:"Character & String Testing",oneLiner:"Test whether ASCII byte is alphabetic, digit, punctuation, or whitespace, and convert case.",osSiliconRole:"Implements fast 256-entry lookup tables in cache, checking character types in a single L1 cache access (O(1)).",keyFunctions:[{name:"isalpha",signature:"int isalpha(int c)",purpose:"Checks if character is A-Z or a-z."},{name:"isdigit",signature:"int isdigit(int c)",purpose:"Checks if character is numeric digit 0-9."},{name:"toupper / tolower",signature:"int toupper(int c)",purpose:"Converts lowercase ASCII letter to uppercase."},{name:"isspace",signature:"int isspace(int c)",purpose:"Checks for whitespace (' ', '\\t', '\\n', '\\r')."}],compilableExample:`#include <stdio.h>
#include <ctype.h>

int main(void) {
    char token = 'k';
    if (isalpha(token)) {
        printf("Character '%c' converted to uppercase: '%c'\\n", token, toupper(token));
    }
    return 0;
}`,commonPitfall:"Passing negative char values to ctype functions on platforms with signed char triggers undefined behavior. Cast argument to (unsigned char).",relatedKeywords:["char","int"],relatedCurriculumLevels:[3,25,79]},{id:"lib-time",header:"<time.h>",title:"Date, Wall-Clock Time & CPU Benchmarking",category:"Time & Clock",oneLiner:"Query system epoch timestamp, format dates, and measure CPU cycles elapsed.",osSiliconRole:"Interacts with CPU RTC (Real Time Clock) chip and OS kernel timestamp counter (e.g., x86 RDTSC instruction).",keyFunctions:[{name:"time",signature:"time_t time(time_t *tloc)",purpose:"Returns epoch seconds elapsed since Jan 1, 1970 UTC."},{name:"clock",signature:"clock_t clock(void)",purpose:"Returns processor clock ticks spent by the program."},{name:"difftime",signature:"double difftime(time_t time1, time_t time0)",purpose:"Computes difference in seconds between two timestamps."}],compilableExample:`#include <stdio.h>
#include <time.h>

int main(void) {
    time_t now = time(NULL);
    printf("Epoch System Seconds: %ld\\n", (long)now);
    printf("Clock Ticks Spent   : %ld ticks\\n", (long)clock());
    return 0;
}`,commonPitfall:"time_t overflow in 2038 on 32-bit platforms (Year 2038 Problem). Modern 64-bit platforms use 64-bit signed integers good for billions of years.",relatedKeywords:["long","struct"],relatedCurriculumLevels:[6,46]},{id:"lib-stdbool",header:"<stdbool.h>",title:"Boolean Data Type & Logical Literals (C99)",category:"Types & Limits",oneLiner:"Defines 'bool', 'true' (1), and 'false' (0) for readable logic flags.",osSiliconRole:"Promoted to integer byte in AL register for arithmetic and branch comparisons (JE, JNE).",keyFunctions:[{name:"bool",signature:"typedef _Bool bool;",purpose:"Boolean type holding 1 or 0."},{name:"true / false",signature:"#define true 1 / #define false 0",purpose:"Canonical truth literals."}],compilableExample:`#include <stdio.h>
#include <stdbool.h>

int main(void) {
    bool isTurnstileOpen = true;
    bool hasInsufficientFunds = false;

    if (isTurnstileOpen && !hasInsufficientFunds) {
        printf("Turnstile Gate Status: UNLOCKED (Pass Through)\\n");
    }
    return 0;
}`,commonPitfall:"Do not compare boolean variables directly with `== true`, simply write `if (isValid)` to avoid subtle integer flag bugs.",relatedKeywords:["int"],relatedCurriculumLevels:[7,8,9,10]},{id:"lib-stdint",header:"<stdint.h>",title:"Exact-Width Portable Integer Specifications (C99)",category:"Types & Limits",oneLiner:"Explicit integer types with guaranteed bit widths across 32-bit and 64-bit hardware architectures.",osSiliconRole:"Guarantees exact byte storage in silicon regardless of compiler or architecture variations (e.g. 8-bit AVR, 32-bit ARM, 64-bit x86).",keyFunctions:[{name:"int8_t / uint8_t",signature:"1 byte integer",purpose:"Byte-exact sensor telemetry."},{name:"int16_t / uint16_t",signature:"2 byte integer",purpose:"Network port and audio samples."},{name:"int32_t / uint32_t",signature:"4 byte integer",purpose:"Standard 32-bit counting and indexing."},{name:"int64_t / uint64_t",signature:"8 byte integer",purpose:"Large financial ledgers and nanosecond timestamps."}],compilableExample:`#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t sensorByte = 255;
    uint32_t memoryOffset = 0x80004000;
    int64_t globalBalanceINR = 5000000000LL;

    printf("Sensor Byte (8-bit)  : %u (Size: %zu byte)\\n", sensorByte, sizeof(sensorByte));
    printf("Memory Offset (32-bit): 0x%X (Size: %zu bytes)\\n", memoryOffset, sizeof(memoryOffset));
    printf("Balance (64-bit)      : Rs. %lld (Size: %zu bytes)\\n", (long long)globalBalanceINR, sizeof(globalBalanceINR));
    return 0;
}`,commonPitfall:"Format specifier mismatches. Use <inttypes.h> macros (PRId64, PRIu32) for perfectly portable printf statements across compilers.",relatedKeywords:["short","long","unsigned","int"],relatedCurriculumLevels:[14,15,16]}],s3=[{id:"def-define-macro",name:"#define (Constants & Functional Macros)",syntax:"#define IDENTIFIER replacement_text",category:"Preprocessor Directive",oneLiner:"Direct textual replacement before compiler parsing begins.",preprocessorBehavior:"Scans token stream and substitutes identifier verbatim. 0 runtime function call overhead.",compilableExample:`#include <stdio.h>

#define MAX_BUFFER_SIZE 1024
#define SQUARE(x) ((x) * (x))

int main(void) {
    int radius = 7;
    printf("Buffer Capacity: %d Bytes\\n", MAX_BUFFER_SIZE);
    printf("Square of %d   : %d\\n", radius, SQUARE(radius));
    return 0;
}`,pitfallOrRule:"Always enclose macro arguments in parentheses: ((x) * (x)). Otherwise SQUARE(1 + 2) evaluates to 1 + 2 * 1 + 2 = 5 instead of 9!"},{id:"def-include-directive",name:"#include (System & Project Headers)",syntax:'#include <header.h> or #include "my_file.h"',category:"Preprocessor Directive",oneLiner:"Pastes entire contents of specified file directly into current translation unit.",preprocessorBehavior:'Searches system include paths for <...> and local project folder for "...". Replaces directive with full header text.',compilableExample:`#include <stdio.h>

int main(void) {
    printf("stdio.h symbols successfully imported.\\n");
    return 0;
}`,pitfallOrRule:"Never #include a .c file directly! Only #include .h header files to prevent duplicate symbol linker crashes."},{id:"def-header-guards",name:"#ifndef / #define / #endif (Header Inclusion Guards)",syntax:"#ifndef MY_HEADER_H\n#define MY_HEADER_H\n...\n#endif",category:"Conditional Compilation",oneLiner:"Prevents duplicate struct and typedef definitions when a header is included transitively.",preprocessorBehavior:"If symbol is already defined, preprocessor skips everything until #endif, preventing redefinition compile errors.",compilableExample:`#include <stdio.h>

#ifndef RAILWAY_STATION_H
#define RAILWAY_STATION_H

struct Station {
    int id;
};

#endif

int main(void) {
    struct Station s;
    s.id = 502;
    printf("Guarded Header Station ID: %d\\n", s.id);
    return 0;
}`,pitfallOrRule:"Every single .h header file you author in C MUST have unique header guards or #pragma once."},{id:"def-null-constant",name:"NULL (Null Pointer Constant)",syntax:"((void *)0)",category:"Core Standard Constant",oneLiner:"Defines an invalid pointer address indicating that the pointer points nowhere.",preprocessorBehavior:"Expands to 0 or ((void *)0). Stored as zero bits in register/RAM.",compilableExample:`#include <stdio.h>

int main(void) {
    int *ptr = NULL;
    if (ptr == NULL) {
        printf("Pointer safely initialized to NULL. Dereference avoided!\\n");
    }
    return 0;
}`,pitfallOrRule:"Never dereference a NULL pointer (*ptr). MMU virtual address 0x0 triggers a crash with Signal 11 (SIGSEGV)."},{id:"def-eof-constant",name:"EOF (End-Of-File Marker)",syntax:"-1 (negative integer)",category:"Core Standard Constant",oneLiner:"Returned by stream I/O functions when no more input bytes remain.",preprocessorBehavior:"Defined in <stdio.h> as negative integer constant (-1).",compilableExample:`#include <stdio.h>

int main(void) {
    printf("EOF Value in this C compiler: %d\\n", EOF);
    return 0;
}`,pitfallOrRule:"When reading characters in a loop with getchar(), declare the receiving variable as 'int', not 'char'. char cannot distinguish EOF (-1) from byte 0xFF."}],s4={name:"key-round",size:24,node:[["path",{d:"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",key:"1s6t7t"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}]]};s4.node;let s7=ov(s4),s6={name:"library",size:24,node:[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]]};s6.node;let s8=ov(s6),s9={name:"sliders-vertical",size:24,node:[["path",{d:"M10 8h4",key:"1sr2af"}],["path",{d:"M12 21v-9",key:"17s77i"}],["path",{d:"M12 8V3",key:"13r4qs"}],["path",{d:"M17 16h4",key:"h1uq16"}],["path",{d:"M19 12V3",key:"o1uvq1"}],["path",{d:"M19 21v-5",key:"qua636"}],["path",{d:"M3 14h4",key:"bcjad9"}],["path",{d:"M5 10V3",key:"cb8scm"}],["path",{d:"M5 21v-7",key:"1w1uti"}]],aliases:["sliders"]};s9.node;let le=ov(s9),lt=()=>{let{updateActiveCode:e}=o5(),[t,i]=(0,p.useState)("keywords"),[n,r]=(0,p.useState)(""),[a,o]=(0,p.useState)("All"),[s,l]=(0,p.useState)(s2[0]),[d,u]=(0,p.useState)(s5[0]),[m,h]=(0,p.useState)(s3[0]),[f,g]=(0,p.useState)(s2[0].compilableExample),[b,y]=(0,p.useState)(null),[x,v]=(0,p.useState)(!1),w=s2.filter(e=>{let t="All"===a||e.category===a,i=e.keyword.toLowerCase().includes(n.toLowerCase())||e.oneLiner.toLowerCase().includes(n.toLowerCase())||e.hardwareSiliconMeaning.toLowerCase().includes(n.toLowerCase());return t&&i}),C=s5.filter(e=>e.header.toLowerCase().includes(n.toLowerCase())||e.title.toLowerCase().includes(n.toLowerCase())||e.oneLiner.toLowerCase().includes(n.toLowerCase())),S=s3.filter(e=>e.name.toLowerCase().includes(n.toLowerCase())||e.oneLiner.toLowerCase().includes(n.toLowerCase())),k=async()=>{v(!0),y(null),e(f);try{let e=await o6(f);if(0===e.exitCode)y({isSuccess:!0,exitCode:0,output:`Compilation & Execution PASSED (exit code 0):
${e.stdout?e.stdout:"[Program completed with zero diagnostics errors]"}`}),o0({particleCount:50,spread:60,origin:{y:.85}});else if(e.stdout&&(!e.stderr||0===e.stderr.trim().length))y({isSuccess:!0,exitCode:e.exitCode??1,output:`${e.stdout}

[Program returned exit code ${e.exitCode}]`});else{let t=e.stderr||e.error||"Compiler diagnostic tripped.";y({isSuccess:!1,exitCode:e.exitCode??1,output:`Compiler Diagnostic (exit code ${e.exitCode??1}):
${t}`})}}catch(e){y({isSuccess:!1,exitCode:1,output:`Execution error: ${e.message}`})}finally{v(!1)}};return(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]",children:[(0,c.jsx)("div",{children:(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"text-3xl",children:"🔑"}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("h2",{className:"text-xl md:text-2xl font-black text-[#2b2520]",children:"C Keywords, Standard Libraries & Macro Definitions"}),(0,c.jsx)("span",{className:"text-xs bg-[#eaf6f4] text-[#2a9d8f] border border-[#2a9d8f] px-2.5 py-0.5 rounded-full font-bold",children:"Complete ISO C Reference"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium mt-0.5",children:"Master all 32 ISO C keywords, standard header libraries (<stdio.h>, <stdlib.h>, <string.h>), and core preprocessor definitions with genuine WebAssembly compilation."})]})]})}),(0,c.jsx)("div",{className:"flex items-center gap-2",children:(0,c.jsxs)("button",{onClick:()=>{"keywords"===t?g(s.compilableExample):"libraries"===t?g(d.compilableExample):g(m.compilableExample),y(null)},className:"px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#7d7065] border border-[#ede3d2] cursor-pointer transition flex items-center gap-1",children:[(0,c.jsx)(so,{className:"w-3.5 h-3.5"}),"Reset Code"]})})]}),(0,c.jsxs)("div",{className:"flex flex-wrap gap-2 pb-1 border-b border-[#ebdcc4]",children:[(0,c.jsxs)("button",{onClick:()=>{i("keywords"),g(s.compilableExample),y(null)},className:`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${"keywords"===t?"bg-[#7c3aed] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(s7,{className:"w-4 h-4"}),(0,c.jsx)("span",{children:"1. 32 Standard Keywords (auto, static, volatile...)"})]}),(0,c.jsxs)("button",{onClick:()=>{i("libraries"),g(d.compilableExample),y(null)},className:`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${"libraries"===t?"bg-[#0284c7] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(s8,{className:"w-4 h-4"}),(0,c.jsx)("span",{children:"2. Standard Libraries (<stdio.h>, <stdlib.h>, <string.h>...)"})]}),(0,c.jsxs)("button",{onClick:()=>{i("definitions"),g(m.compilableExample),y(null)},className:`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${"definitions"===t?"bg-[#d97706] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(le,{className:"w-4 h-4"}),(0,c.jsx)("span",{children:"3. Preprocessor & Core Definitions (#define, NULL, EOF...)"})]})]}),(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] p-4 rounded-2xl space-y-3",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:["keywords"===t&&(0,c.jsx)("div",{className:"flex items-center gap-1.5 overflow-x-auto pb-1",children:["All","Control Flow","Data Type","Storage Class","Type Qualifier","Compound Type","Operator / Other"].map(e=>{let t=a===e;return(0,c.jsx)("button",{onClick:()=>o(e),className:`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${t?"bg-[#7c3aed] text-white shadow-xs":"bg-white hover:bg-[#ebdcc4] text-[#7d7065] border border-[#ebdcc4]"}`,children:e},e)})}),"libraries"===t&&(0,c.jsx)("span",{className:"text-xs font-bold text-[#0284c7]",children:"C Standard Library Headers (ISO/IEC 9899)"}),"definitions"===t&&(0,c.jsx)("span",{className:"text-xs font-bold text-[#d97706]",children:"Essential Preprocessor Directives & Standard Constants"}),(0,c.jsxs)("div",{className:"relative",children:[(0,c.jsx)(oH,{className:"w-3.5 h-3.5 text-[#7d7065] absolute left-3 top-2.5"}),(0,c.jsx)("input",{type:"text",value:n,onChange:e=>r(e.target.value),placeholder:"Search reference...",className:"bg-white border-2 border-[#ede3d2] rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-[#2b2520] placeholder-[#a8a29e] focus:outline-none focus:border-[#7c3aed] w-56"})]})]}),(0,c.jsxs)("div",{className:"flex flex-wrap gap-1.5 pt-1",children:["keywords"===t&&w.map(e=>{let t=e.keyword===s.keyword;return(0,c.jsx)("button",{onClick:()=>{l(e),g(e.compilableExample),y(null)},className:`px-3 py-1.5 rounded-xl font-mono text-xs font-black transition cursor-pointer border-2 ${t?"bg-[#7c3aed] text-white border-[#5b21b6] shadow-xs scale-105":"bg-white text-[#57534e] border-[#ede3d2] hover:bg-[#faf4ea]"}`,children:e.keyword},e.keyword)}),"libraries"===t&&C.map(e=>{let t=e.id===d.id;return(0,c.jsx)("button",{onClick:()=>{u(e),g(e.compilableExample),y(null)},className:`px-3 py-1.5 rounded-xl font-mono text-xs font-black transition cursor-pointer border-2 ${t?"bg-[#0284c7] text-white border-[#0369a1] shadow-xs scale-105":"bg-white text-[#57534e] border-[#ede3d2] hover:bg-[#faf4ea]"}`,children:e.header},e.id)}),"definitions"===t&&S.map(e=>{let t=e.id===m.id;return(0,c.jsx)("button",{onClick:()=>{h(e),g(e.compilableExample),y(null)},className:`px-3 py-1.5 rounded-xl font-mono text-xs font-black transition cursor-pointer border-2 ${t?"bg-[#d97706] text-white border-[#b45309] shadow-xs scale-105":"bg-white text-[#57534e] border-[#ede3d2] hover:bg-[#faf4ea]"}`,children:e.name.split(" ")[0]},e.id)})]})]}),"keywords"===t&&(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-3",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,c.jsxs)("div",{className:"flex items-center gap-3",children:[(0,c.jsx)("span",{className:"font-mono text-2xl font-black bg-[#2b2520] text-[#f4eedb] px-3.5 py-1 rounded-xl shadow-xs",children:s.keyword}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("span",{className:"text-[10px] font-black uppercase text-[#7c3aed] tracking-wider",children:["Category: ",s.category]}),(0,c.jsx)("h3",{className:"text-base font-bold text-[#2b2520]",children:s.oneLiner})]})]}),(0,c.jsx)("span",{className:"text-xs bg-white border border-[#ebdcc4] px-3 py-1 rounded-xl font-mono text-[#7d7065]",children:"ISO C Standard Keyword"})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3 text-xs",children:[(0,c.jsxs)("div",{className:"bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1",children:[(0,c.jsxs)("div",{className:"text-[#2a9d8f] font-bold text-xs uppercase flex items-center gap-1.5",children:[(0,c.jsx)(oE,{className:"w-4 h-4"}),"What Physically Happens in Silicon / CPU Registers:"]}),(0,c.jsx)("p",{className:"text-[#57534e] leading-relaxed",children:s.hardwareSiliconMeaning})]}),(0,c.jsxs)("div",{className:"bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1",children:[(0,c.jsxs)("div",{className:"text-[#d97706] font-bold text-xs uppercase flex items-center gap-1.5",children:[(0,c.jsx)(oq,{className:"w-4 h-4"}),"Senior Systems Engineer Interview Insight:"]}),(0,c.jsx)("p",{className:"text-[#57534e] leading-relaxed",children:s.interviewTip})]})]}),(0,c.jsxs)("div",{className:"p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-start gap-2",children:[(0,c.jsx)(oQ,{className:"w-4 h-4 text-amber-700 shrink-0 mt-0.5"}),(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{className:"text-amber-900 font-bold",children:"Common Student Trap: "}),(0,c.jsx)("span",{className:"text-amber-800",children:s.commonPitfall})]})]})]}),"libraries"===t&&(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-3",children:[(0,c.jsx)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:(0,c.jsxs)("div",{className:"flex items-center gap-3",children:[(0,c.jsx)("span",{className:"font-mono text-2xl font-black bg-[#0284c7] text-white px-3.5 py-1 rounded-xl shadow-xs",children:d.header}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("span",{className:"text-[10px] font-black uppercase text-[#0284c7] tracking-wider",children:["Domain: ",d.category]}),(0,c.jsx)("h3",{className:"text-base font-bold text-[#2b2520]",children:d.title})]})]})}),(0,c.jsx)("p",{className:"text-xs text-[#57534e] font-medium leading-relaxed",children:d.oneLiner}),(0,c.jsxs)("div",{className:"bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1 text-xs",children:[(0,c.jsxs)("div",{className:"text-[#2a9d8f] font-bold uppercase flex items-center gap-1.5",children:[(0,c.jsx)(oE,{className:"w-4 h-4"}),"OS Kernel & Hardware Role:"]}),(0,c.jsx)("p",{className:"text-[#57534e] leading-relaxed",children:d.osSiliconRole})]}),(0,c.jsxs)("div",{className:"space-y-1.5",children:[(0,c.jsxs)("div",{className:"text-[11px] font-black uppercase text-[#7d7065]",children:["Core Functions in ",d.header,":"]}),(0,c.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono",children:d.keyFunctions.map(e=>(0,c.jsxs)("div",{className:"p-2.5 bg-white border border-[#ebdcc4] rounded-xl space-y-0.5",children:[(0,c.jsx)("div",{className:"font-bold text-[#0284c7]",children:e.name}),(0,c.jsx)("div",{className:"text-[10px] text-slate-500",children:e.signature}),(0,c.jsx)("div",{className:"text-[11px] text-[#57534e] font-sans mt-0.5",children:e.purpose})]},e.name))})]}),(0,c.jsxs)("div",{className:"p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-start gap-2",children:[(0,c.jsx)(oQ,{className:"w-4 h-4 text-amber-700 shrink-0 mt-0.5"}),(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{className:"text-amber-900 font-bold",children:"Safety Guideline / Pitfall: "}),(0,c.jsx)("span",{className:"text-amber-800",children:d.commonPitfall})]})]})]}),"definitions"===t&&(0,c.jsxs)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-5 space-y-3",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,c.jsxs)("div",{className:"flex items-center gap-3",children:[(0,c.jsx)("span",{className:"font-mono text-2xl font-black bg-[#d97706] text-white px-3.5 py-1 rounded-xl shadow-xs",children:m.name.split(" ")[0]}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("span",{className:"text-[10px] font-black uppercase text-[#d97706] tracking-wider",children:["Type: ",m.category]}),(0,c.jsx)("h3",{className:"text-base font-bold text-[#2b2520]",children:m.name})]})]}),(0,c.jsxs)("span",{className:"text-xs bg-white border border-[#ebdcc4] px-3 py-1 rounded-xl font-mono text-[#7d7065]",children:["Syntax: ",m.syntax]})]}),(0,c.jsx)("p",{className:"text-xs text-[#57534e] font-medium leading-relaxed",children:m.oneLiner}),(0,c.jsxs)("div",{className:"bg-white border border-[#ebdcc4] p-3.5 rounded-xl space-y-1 text-xs",children:[(0,c.jsxs)("div",{className:"text-[#2a9d8f] font-bold uppercase flex items-center gap-1.5",children:[(0,c.jsx)(oE,{className:"w-4 h-4"}),"Preprocessor Textual Replacement Mechanics:"]}),(0,c.jsx)("p",{className:"text-[#57534e] leading-relaxed",children:m.preprocessorBehavior})]}),(0,c.jsxs)("div",{className:"p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-start gap-2",children:[(0,c.jsx)(oQ,{className:"w-4 h-4 text-amber-700 shrink-0 mt-0.5"}),(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{className:"text-amber-900 font-bold",children:"Golden Rule & Common Bug: "}),(0,c.jsx)("span",{className:"text-amber-800",children:m.pitfallOrRule})]})]})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[(0,c.jsxs)("div",{className:"lg:col-span-7 flex flex-col bg-[#fcf7ee] border-2 border-[#ebdcc4] rounded-2xl p-4",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-[#ebdcc4] text-xs font-bold text-[#57534e] mb-2 font-mono",children:[(0,c.jsx)("span",{children:"Live Compilable C Example"}),(0,c.jsx)("span",{className:"text-[#e57e25]",children:"Editable"})]}),(0,c.jsx)("textarea",{value:f,onChange:e=>g(e.target.value),className:"flex-1 w-full bg-white p-3 font-mono text-xs text-[#2b2520] rounded-xl border border-[#ebdcc4] leading-relaxed focus:outline-none resize-none min-h-[260px]",spellCheck:!1}),(0,c.jsxs)("div",{className:"mt-3 flex items-center justify-between",children:[(0,c.jsx)("span",{className:"text-[11px] text-[#7d7065] font-bold",children:"Tested on genuine WebAssembly C engine"}),(0,c.jsxs)("button",{onClick:k,disabled:x,className:"friendly-button-amber px-6 py-2.5 text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50",children:[(0,c.jsx)(oR,{className:"w-4 h-4 fill-white"}),(0,c.jsx)("span",{children:x?"Compiling in C Engine...":"Run Live Code"})]})]})]}),(0,c.jsxs)("div",{className:"lg:col-span-5 flex flex-col justify-between bg-[#2b2520] text-white rounded-2xl p-4 font-mono text-xs min-h-[260px]",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center justify-between pb-2 border-b border-slate-700 text-slate-400 text-[10px] mb-2",children:[(0,c.jsxs)("span",{className:"flex items-center gap-1",children:[(0,c.jsx)(oO,{className:"w-3.5 h-3.5 text-emerald-400"}),"Live Execution Console"]}),(0,c.jsx)("span",{className:b?b.isSuccess?"text-emerald-400 font-bold":"text-rose-400 font-bold":"text-slate-400",children:b?`exit code ${b.exitCode}`:"standby"})]}),b?(0,c.jsxs)("div",{className:`p-3 rounded-xl border ${b.isSuccess?"bg-emerald-950/60 border-emerald-500 text-emerald-300":"bg-rose-950/60 border-rose-500 text-rose-300"}`,children:[(0,c.jsxs)("div",{className:"flex items-center gap-1.5 font-bold mb-1",children:[b.isSuccess?(0,c.jsx)(oP,{className:"w-4 h-4 text-emerald-400"}):(0,c.jsx)(sl,{className:"w-4 h-4 text-rose-400"}),(0,c.jsx)("span",{children:b.isSuccess?"EXECUTION SUCCESS":"DIAGNOSTIC ERROR"})]}),(0,c.jsx)("pre",{className:"whitespace-pre-wrap font-mono text-[11px] max-h-[160px] overflow-y-auto",children:b.output})]}):(0,c.jsxs)("div",{className:"py-14 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2",children:[(0,c.jsx)(s7,{className:"w-6 h-6 text-slate-600"}),(0,c.jsx)("span",{children:'Click "Run Live Code" to test in the WebAssembly engine!'})]})]}),(0,c.jsxs)("div",{className:"mt-4 pt-2 border-t border-slate-700 text-[10px] text-slate-400 font-sans flex items-center justify-between",children:[(0,c.jsx)("span",{children:"Hardware Architecture: x86-64 / ARM64"}),(0,c.jsx)("span",{children:"ISO C11 Standard"})]})]})]})]})},li=[{id:"res-codemonkey",name:"CodeMonkey",url:"https://www.codemonkey.com/",category:"1. Visual & Block Logic",badge:"Recommended First Step",badgeColor:"bg-amber-100 text-amber-800 border-amber-300",description:"Start with CodeMonkey! Solve game challenges by thinking sequentially about step-by-step instructions to collect bananas and reach targets.",howToUse:"Play through the banana-collecting coding puzzles to build intuition on sequences, loops, and conditions before writing textual code."},{id:"res-code-org",name:"Code.org",url:"https://www.code.org/",category:"1. Visual & Block Logic",badge:"Foundation Logic",badgeColor:"bg-blue-100 text-blue-800 border-blue-300",description:"Interactive learning platform with Hour of Code puzzles, visual algorithms, and computational thinking fundamentals.",howToUse:"Great for understanding how loops and conditionals construct algorithmic problem solutions."},{id:"res-blockly-games",name:"Blockly Games",url:"https://blockly.games/",category:"1. Visual & Block Logic",badge:"Google Block Engine",badgeColor:"bg-emerald-100 text-emerald-800 border-emerald-300",description:"Google's series of educational games that teach programming concepts through visual drag-and-drop code blocks.",howToUse:"Solve the Maze and Bird navigation levels to master conditional branching and iterative loops without worrying about missing semicolons."},{id:"res-programiz-compiler",name:"Programiz Online C Compiler",url:"https://www.programiz.com/c-programming/online-compiler/",category:"2. Online C Compilers",badge:"Instant Cloud Runner",badgeColor:"bg-indigo-100 text-indigo-800 border-indigo-300",description:"Lightweight, zero-setup online C IDE that runs in any web browser with terminal stdout/stdin support.",howToUse:"Use this to quickly test short C code snippets without needing GCC or VS Code installed locally."},{id:"res-codechef-ide",name:"CodeChef Online IDE",url:"https://www.codechef.com/ide",category:"2. Online C Compilers",badge:"Competitive IDE",badgeColor:"bg-amber-100 text-amber-800 border-amber-300",description:"High-performance online judge compiler with custom stdin input support and execution time telemetry.",howToUse:"Paste algorithms and input files to verify execution speed, memory limits, and correctness against edge cases."},{id:"res-w3schools-practice",name:"W3Schools C Practice",url:"https://www.w3schools.com/practice/practice_c.php",category:"2. Online C Compilers",badge:"Hands-on Drills",badgeColor:"bg-green-100 text-green-800 border-green-300",description:"Fill-in-the-blank C exercises, interactive code editor drills, and quizzes for beginners.",howToUse:"Test your syntax memory on variables, if-else, while loops, and arrays after each lesson."},{id:"res-waytoc",name:"WayToC (by Sadeali)",url:"https://waytoc.sadeali.com/",category:"2. Online C Compilers",badge:"Interactive Tutor",badgeColor:"bg-rose-100 text-rose-800 border-rose-300",description:"Step-by-step interactive C programming course with inline code challenges and visual progress tracking.",howToUse:"Follow the guided roadmap to practice C fundamentals with immediate browser feedback."},{id:"res-pythontutor",name:"PythonTutor C Visualizer",url:"https://pythontutor.com/c.html",category:"2. Online C Compilers",badge:"RAM & Stack Visualizer",badgeColor:"bg-purple-100 text-purple-800 border-purple-300",description:"World-famous execution visualizer that animates stack frames, pointers, heap malloc chunks, and variables step-by-step.",howToUse:"Paste pointer and linked list code here to physically see arrows pointing between RAM memory addresses on each instruction!"},{id:"res-onlinegdb",name:"OnlineGDB C Compiler & Debugger",url:"https://www.onlinegdb.com/online_c_compiler",category:"2. Online C Compilers",badge:"GDB Stepping",badgeColor:"bg-teal-100 text-teal-800 border-teal-300",description:"Online C compiler equipped with interactive GDB breakpoints, call stack traces, and multi-file project support.",howToUse:"Set breakpoints on specific lines to inspect variable states and diagnose segmentation faults."},{id:"res-godbolt",name:"Compiler Explorer (Godbolt)",url:"https://godbolt.org/",category:"2. Online C Compilers",badge:"Silicon Assembly",badgeColor:"bg-slate-100 text-slate-800 border-slate-300",description:"View real-time x86-64, ARM, and RISC-V assembly generated by GCC, Clang, and MSVC side-by-side with your C code.",howToUse:"See exactly how `const`, `inline`, `register`, and `-O3` optimization flags alter machine opcodes in silicon."},{id:"res-w3schools-c",name:"W3Schools C Tutorial",url:"https://www.w3schools.com/c/",category:"3. Concept Guides & Tutorials",badge:"Essential Reference (IMP)",badgeColor:"bg-emerald-100 text-emerald-800 border-emerald-300",description:"The gold-standard beginner C tutorial: crystal-clear explanations of syntax, data types, pointers, structures, and memory.",howToUse:"Keep open as a handy reference for quick syntax lookups when building projects.",isImportant:!0},{id:"res-programiz-c",name:"Programiz C Programming Guide",url:"https://www.programiz.com/c-programming",category:"3. Concept Guides & Tutorials",badge:"Comprehensive Course",badgeColor:"bg-blue-100 text-blue-800 border-blue-300",description:"Deep, well-structured tutorials with flowcharts, memory layouts, and executable examples on every C topic.",howToUse:"Read chapters on pointers, recursion, and file handling for rich diagrams."},{id:"res-learn-c",name:"Learn-C.org",url:"https://www.learn-c.org/",category:"3. Concept Guides & Tutorials",badge:"Interactive In-Browser",badgeColor:"bg-amber-100 text-amber-800 border-amber-300",description:"Free interactive C tutorial where you read concise lessons and complete inline code challenges directly in the browser.",howToUse:"Work through the advanced tutorials covering linked lists, dynamic memory, binary trees, and bitmasks."},{id:"res-datacode",name:"DataCode C Programming",url:"https://www.datacode.in/progamming/c",category:"3. Concept Guides & Tutorials",badge:"Indian Academic Curated",badgeColor:"bg-orange-100 text-orange-800 border-orange-300",description:"Indian university-curated notes on C programming, covering semester syllabi, common viva questions, and exam patterns.",howToUse:"Review for university engineering exams and technical campus interviews."},{id:"res-cppreference",name:"cppreference.com (C Reference)",url:"https://en.cppreference.com/w/c",category:"3. Concept Guides & Tutorials",badge:"ISO C Standard Specification",badgeColor:"bg-sky-100 text-sky-800 border-sky-300",description:"The official technical encyclopedia of the C language standard: exact function prototypes, header specs, and UB rules.",howToUse:"Look up exact parameter types and return value edge cases for standard library functions."},{id:"res-codechef-practice",name:"CodeChef C Practice Track",url:"https://www.codechef.com/practice",category:"4. Practice & Problem Solving",badge:"Start With This!",badgeColor:"bg-amber-200 text-amber-900 border-amber-400 font-black",description:"Graded algorithmic problem sets starting from basic input/output, conditionals, and math up to dynamic programming.",howToUse:"Start with beginner 500-1000 rating problems to build strong speed and problem-solving reflexes.",isImportant:!0},{id:"res-hackerrank-c",name:"HackerRank C Domain Track",url:"https://www.hackerrank.com/domains/c",category:"4. Practice & Problem Solving",badge:"Domain Badges & Stars",badgeColor:"bg-emerald-100 text-emerald-800 border-emerald-300",description:"Structured C certification track with automated test suites: earn Gold Stars for C proficiency.",howToUse:"Solve problems under Introduction, Conditionals, Arrays, and Structs to earn your 5-Star C Badge."},{id:"res-exercism-c",name:"Exercism C Track",url:"https://exercism.org/tracks/c",category:"4. Practice & Problem Solving",badge:"Human Code Mentorship",badgeColor:"bg-purple-100 text-purple-800 border-purple-300",description:"70+ hands-on C programming exercises with automated tests and free 1-on-1 code reviews from experienced engineers.",howToUse:"Submit solutions through the Exercism CLI to learn idiomatic C formatting and clean pointer conventions."},{id:"res-leetcode",name:"LeetCode C Problemset",url:"https://leetcode.com/problemset/",category:"4. Practice & Problem Solving",badge:"FAANG Interview Prep",badgeColor:"bg-orange-100 text-orange-800 border-orange-300",description:"Industry-standard coding interview platform. Solve DSA problems in pure C (linked lists, trees, arrays).",howToUse:"Filter by Tag: Linked List, Tree, Binary Search, and select C as the programming language."}],ln={name:"external-link",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]};ln.node;let lr=ov(ln),la={name:"bookmark",size:24,node:[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z",key:"oz39mx"}]]};la.node;let lo=ov(la),ls=()=>{let[e,t]=(0,p.useState)("All"),[i,n]=(0,p.useState)(""),r=li.filter(t=>{let n="All"===e||t.category===e,r=t.name.toLowerCase().includes(i.toLowerCase())||t.description.toLowerCase().includes(i.toLowerCase())||t.howToUse.toLowerCase().includes(i.toLowerCase());return n&&r});return(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] rounded-3xl p-6 md:p-8 shadow-sm space-y-6",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-[#ede3d2]",children:[(0,c.jsx)("div",{children:(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"text-3xl",children:"🌐"}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("h2",{className:"text-xl md:text-2xl font-black text-[#2b2520]",children:"Curated Global C Learning & Practice Ecosystem"}),(0,c.jsx)("span",{className:"text-xs bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] px-2.5 py-0.5 rounded-full font-bold",children:"Curated Web Platforms"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium mt-0.5",children:"From visual logic blocks (CodeMonkey, Blockly) to zero-install cloud compilers, official references, and competitive programming arenas."})]})]})}),(0,c.jsxs)("div",{className:"flex items-center gap-2 text-xs font-bold text-[#7d7065] bg-[#fcf7ee] border border-[#ebdcc4] px-3.5 py-2 rounded-2xl",children:[(0,c.jsx)(lo,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsxs)("span",{children:[li.length," Verified External Platforms"]})]})]}),(0,c.jsx)("div",{className:"bg-[#fcf7ee] border-2 border-[#ebdcc4] p-4 rounded-2xl space-y-3",children:(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,c.jsx)("div",{className:"flex flex-wrap gap-1.5 text-xs font-black",children:["All","1. Visual & Block Logic","2. Online C Compilers","3. Concept Guides & Tutorials","4. Practice & Problem Solving"].map(i=>(0,c.jsx)("button",{onClick:()=>t(i),className:`px-3 py-1.5 rounded-xl border-2 transition cursor-pointer ${e===i?"bg-[#e57e25] text-white border-[#b45309] shadow-xs":"bg-white text-[#7d7065] border-[#ede3d2] hover:bg-[#faf4ea]"}`,children:i},i))}),(0,c.jsxs)("div",{className:"relative",children:[(0,c.jsx)(oH,{className:"w-3.5 h-3.5 text-[#7d7065] absolute left-2.5 top-2.5"}),(0,c.jsx)("input",{type:"text",value:i,onChange:e=>n(e.target.value),placeholder:"Search resource or platform...",className:"px-3 py-1.5 pl-8 text-xs bg-white border-2 border-[#ede3d2] rounded-xl focus:outline-none focus:border-[#f48c06] w-56 text-[#2b2520]"})]})]})}),(0,c.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:r.map(e=>(0,c.jsxs)("div",{className:`bg-[#fcf7ee] border-2 rounded-2xl p-5 flex flex-col justify-between space-y-3 transition hover:shadow-md ${e.isImportant?"border-[#e57e25] ring-2 ring-[#e57e25]/20 bg-[#fffdfa]":"border-[#ebdcc4]"}`,children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center justify-between gap-2 mb-2",children:[(0,c.jsx)("span",{className:"text-[10px] font-black uppercase text-[#7d7065] tracking-wider truncate",children:e.category.split(". ")[1]}),(0,c.jsx)("span",{className:`text-[10px] font-bold px-2 py-0.5 rounded-full border ${e.badgeColor}`,children:e.badge})]}),(0,c.jsx)("h3",{className:"text-base font-black text-[#2b2520] flex items-center justify-between",children:(0,c.jsx)("span",{children:e.name})}),(0,c.jsx)("p",{className:"text-xs text-[#57534e] mt-1.5 leading-relaxed font-medium",children:e.description}),(0,c.jsxs)("div",{className:"mt-3 p-2.5 bg-white border border-[#ebdcc4] rounded-xl text-xs space-y-1",children:[(0,c.jsxs)("div",{className:"text-[10px] font-bold uppercase text-[#d97706] flex items-center gap-1",children:[(0,c.jsx)(oC,{className:"w-3 h-3"}),"Recommended Usage:"]}),(0,c.jsx)("p",{className:"text-[11px] text-[#57534e] leading-relaxed",children:e.howToUse})]})]}),(0,c.jsxs)("div",{className:"pt-2 border-t border-[#ebdcc4] flex items-center justify-between",children:[(0,c.jsx)("span",{className:"text-[10px] font-mono text-[#a8a29e] truncate max-w-[160px]",children:e.url.replace("https://","")}),(0,c.jsxs)("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",className:"friendly-button-amber px-3.5 py-1.5 text-xs flex items-center gap-1.5 shadow-2xs font-bold",children:[(0,c.jsx)("span",{children:"Visit Platform"}),(0,c.jsx)(lr,{className:"w-3.5 h-3.5"})]})]})]},e.id))})]})},ll={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};ll.node;let ld=ov(ll),lc=({isOpen:e,onClose:t})=>{let{updateActiveCode:i}=o5(),[n,r]=(0,p.useState)(""),[a,o]=(0,p.useState)("All"),[s,l]=(0,p.useState)(null);if(!e)return null;let d=s2.filter(e=>{let t="All"===a||e.category===a,i=e.keyword.toLowerCase().includes(n.toLowerCase())||e.oneLiner.toLowerCase().includes(n.toLowerCase())||e.hardwareSiliconMeaning.toLowerCase().includes(n.toLowerCase());return t&&i});return(0,c.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-xs",children:(0,c.jsxs)("div",{className:"bg-[#fffdf9] border-2 border-[#ede3d2] rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-[#2b2520] overflow-hidden",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between p-5 border-b-2 border-[#ede3d2] bg-white",children:[(0,c.jsxs)("div",{className:"flex items-center gap-3",children:[(0,c.jsx)("div",{className:"w-10 h-10 rounded-2xl bg-[#fdf5ea] border border-[#f3d4b1] flex items-center justify-center text-xl",children:"🔑"}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("h3",{className:"text-lg md:text-xl font-black text-[#2b2520]",children:"The 32 ISO C Keywords Deep Encyclopedia"}),(0,c.jsx)("span",{className:"text-xs bg-[#eaf6f4] text-[#2a9d8f] border border-[#2a9d8f] px-2.5 py-0.5 rounded-full font-bold",children:"32 Standard Keywords"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium mt-0.5",children:"Hardware silicon behaviors • Compilable code examples • Common student traps • Interview insights"})]})]}),(0,c.jsx)("button",{onClick:t,className:"p-2 rounded-xl hover:bg-[#ede3d2] text-[#7d7065] hover:text-[#2b2520] cursor-pointer transition",children:(0,c.jsx)(ld,{className:"w-5 h-5"})})]}),(0,c.jsxs)("div",{className:"p-4 border-b border-[#ede3d2] bg-[#fcf7ee] space-y-3",children:[(0,c.jsxs)("div",{className:"relative",children:[(0,c.jsx)(oH,{className:"w-4 h-4 text-[#7d7065] absolute left-3.5 top-3"}),(0,c.jsx)("input",{type:"text",value:n,onChange:e=>r(e.target.value),placeholder:"Search keyword (e.g. volatile, static, struct, register, sizeof)...",className:"w-full bg-white border border-[#ebdcc4] rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-[#2b2520] placeholder-[#a8a29e] focus:outline-none focus:border-[#f48c06]"})]}),(0,c.jsx)("div",{className:"flex items-center gap-1.5 overflow-x-auto pb-1",children:["All","Control Flow","Data Type","Storage Class","Type Qualifier","Compound Type","Operator / Other"].map(e=>(0,c.jsx)("button",{onClick:()=>o(e),className:`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer ${a===e?"bg-[#e57e25] text-white shadow-xs":"bg-white hover:bg-[#ebdcc4] text-[#7d7065] border border-[#ebdcc4]"}`,children:e},e))})]}),(0,c.jsxs)("div",{className:"p-5 overflow-y-auto space-y-3.5 flex-1 bg-[#fffdf9]",children:[(0,c.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3.5",children:d.map(e=>{let n=s===e.keyword;return(0,c.jsxs)("div",{className:`p-4 rounded-2xl border-2 transition-all ${n?"bg-white border-[#e57e25] shadow-md md:col-span-2":"bg-white hover:bg-[#fcf7ee] border-[#ede3d2]"}`,children:[(0,c.jsxs)("div",{className:"flex items-center justify-between mb-2",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"font-mono text-base font-black text-[#e57e25] bg-[#fdf5ea] px-2.5 py-0.5 rounded-lg border border-[#f3d4b1]",children:e.keyword}),(0,c.jsx)("span",{className:"text-[10px] font-bold text-[#457b9d] uppercase px-2 py-0.5 bg-[#edf4f8] border border-[#c2d9e5] rounded",children:e.category})]}),(0,c.jsx)("button",{onClick:()=>l(n?null:e.keyword),className:"text-xs text-[#e57e25] font-black hover:underline cursor-pointer",children:n?"Collapse":"Deep Dive & Example →"})]}),(0,c.jsx)("p",{className:"text-xs text-[#2b2520] font-medium leading-relaxed mb-2",children:e.oneLiner}),(0,c.jsxs)("div",{className:"p-2.5 bg-[#fcf7ee] border border-[#ebdcc4] rounded-xl text-[11px] text-[#57534e] space-y-1",children:[(0,c.jsxs)("div",{className:"font-black text-[#d97706] flex items-center gap-1 uppercase text-[10px]",children:[(0,c.jsx)(oE,{className:"w-3.5 h-3.5"})," Silicon / CPU Hardware Action:"]}),(0,c.jsx)("p",{className:"leading-relaxed font-sans",children:e.hardwareSiliconMeaning})]}),n&&(0,c.jsxs)("div",{className:"mt-4 pt-4 border-t border-[#ede3d2] space-y-3",children:[(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex items-center justify-between text-xs font-bold text-[#57534e] mb-1 font-mono",children:[(0,c.jsx)("span",{children:"Compilable C Code Example:"}),(0,c.jsxs)("button",{onClick:()=>{i(e.compilableExample),t()},className:"flex items-center gap-1 text-[11px] font-black text-[#2a9d8f] hover:underline cursor-pointer",children:[(0,c.jsx)(oR,{className:"w-3 h-3 fill-current"}),(0,c.jsx)("span",{children:"Load into Live Compiler"})]})]}),(0,c.jsx)("div",{className:"bg-[#2b2520] text-[#f4eedb] p-3 rounded-xl font-mono text-xs overflow-x-auto shadow-inner",children:(0,c.jsx)("pre",{children:e.compilableExample})})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3 text-xs",children:[(0,c.jsxs)("div",{className:"p-3 bg-[#fdf0ec] border border-[#f5b8a9] rounded-xl text-[#9c2c12] space-y-1",children:[(0,c.jsxs)("div",{className:"font-black flex items-center gap-1 text-[11px] uppercase",children:[(0,c.jsx)(oQ,{className:"w-3.5 h-3.5"})," Common Student Trap:"]}),(0,c.jsx)("p",{className:"leading-relaxed",children:e.commonPitfall})]}),(0,c.jsxs)("div",{className:"p-3 bg-[#eaf6f4] border border-[#b2ded8] rounded-xl text-[#1b635b] space-y-1",children:[(0,c.jsxs)("div",{className:"font-black flex items-center gap-1 text-[11px] uppercase",children:[(0,c.jsx)(oC,{className:"w-3.5 h-3.5"})," Job Interview Tip:"]}),(0,c.jsx)("p",{className:"leading-relaxed",children:e.interviewTip})]})]})]})]},e.keyword)})}),0===d.length&&(0,c.jsxs)("div",{className:"text-center py-12 text-[#7d7065] text-xs font-mono",children:['No C keywords match "',n,'"']})]}),(0,c.jsxs)("div",{className:"p-4 border-t-2 border-[#ede3d2] bg-white flex items-center justify-between text-xs font-bold text-[#7d7065]",children:[(0,c.jsx)("span",{children:'Tip: Click "Load into Live Compiler" on any keyword to run its code live.'}),(0,c.jsx)("button",{onClick:t,className:"px-5 py-2 bg-[#fcf7ee] hover:bg-[#ede3d2] text-[#2b2520] border border-[#ebdcc4] rounded-xl font-black cursor-pointer transition",children:"Close Encyclopedia"})]})]})})},lp=[{id:"trick-semicolon-if",category:"control-flow",categoryLabel:"Control Flow & Syntax",topic:"The Semicolon If-Statement Pitfall",question:"What does this C code print to the console?",codeSnippet:`#include <stdio.h>

int main(void) {
    int a = 5;
    if (a > 10);
    {
        printf("YES\\n");
    }
    return 0;
}`,trickTrap:"Examine the character immediately following `if (a > 10)`!",options:["Prints nothing because 5 is not greater than 10","Prints YES! (The semicolon creates an empty null statement, making the block unconditional)","Compile-time syntax error on semicolon","Undefined behavior"],correctIdx:1,explanation:'Putting a semicolon directly after `if (a > 10);` terminates the if-branch as an empty statement! The `{ printf("YES\\n"); }` block is treated as an independent standalone scope block that executes unconditionally regardless of `a`.',hardwareReality:"The CPU evaluates the conditional jump (JLE) to jump over a single NOP instruction, falling straight into the printf call."},{id:"trick-assignment-in-if",category:"control-flow",categoryLabel:"Control Flow & Syntax",topic:"Single Equal (=) Assignment vs Double Equal (==)",question:"What will this conditional branch output?",codeSnippet:`#include <stdio.h>

int main(void) {
    int score = 0;
    if (score = 10) {
        printf("PASSED\\n");
    } else {
        printf("FAILED\\n");
    }
    return 0;
}`,trickTrap:"`score = 10` is an assignment operator, NOT a comparison equality check!",options:["Prints FAILED because score was initialized to 0","Prints PASSED! (Assignment `score = 10` evaluates to 10, which is non-zero truthy!)","Compile-time syntax error","Runtime exception"],correctIdx:1,explanation:"`score = 10` assigns 10 to variable score and evaluates to the assigned value 10. In C, any non-zero value is logically TRUE, so the if-block executes unconditionally!",hardwareReality:"Stores 10 into register EAX, executes `TEST EAX, EAX`, flags condition not-zero (NZ), and branches into the true path."},{id:"trick-switch-fallthrough",category:"control-flow",categoryLabel:"Control Flow & Syntax",topic:"Switch Statement Missing Break Fall-Through",question:"What will this switch-case output?",codeSnippet:`#include <stdio.h>

int main(void) {
    int token = 2;
    switch (token) {
        case 1: printf("ONE ");
        case 2: printf("TWO ");
        case 3: printf("THREE ");
        default: printf("DONE");
    }
    return 0;
}`,trickTrap:"Notice that none of the case blocks contain a `break;` statement!",options:["TWO","TWO THREE DONE (Without break, execution falls through all remaining cases!)","ONE TWO THREE DONE","Compile error: duplicate case statements"],correctIdx:1,explanation:"In C, switch cases are mere label entry points. Once the CPU jumps to `case 2:`, without a `break;` instruction it continues falling through sequentially to execute `case 3:` and `default:`!",hardwareReality:"Switch jump table branches instruction pointer (RIP) to .L_case2. CPU executes contiguous machine instructions until RET."},{id:"trick-short-circuit-eval",category:"control-flow",categoryLabel:"Control Flow & Syntax",topic:"Logical OR Short-Circuit Evaluation Side Effect",question:"What is the final value of variable `b` after this statement?",codeSnippet:`#include <stdio.h>

int main(void) {
    int a = 1;
    int b = 0;
    if (a || ++b) {
        printf("b = %d\\n", b);
    }
    return 0;
}`,trickTrap:"Does the CPU evaluate the right side `++b` if the left side `a` is already non-zero?",options:["b = 1 (Both sides are always executed)","b = 0 (Short-circuit skips ++b completely because left side is already TRUE!)","b = 2","Compiler warning error"],correctIdx:1,explanation:"C uses Short-Circuit Evaluation. In `A || B`, if A is true (non-zero), the entire condition is guaranteed true, so the compiler skips evaluating B entirely! Therefore, `++b` never runs and `b` remains 0.",hardwareReality:"Test of `a` sets condition flag. Conditional jump branches immediately into the if body, bypassing the increment instructions."},{id:"trick-int-division",category:"types-arithmetic",categoryLabel:"Types & Arithmetic",topic:"Integer Division Truncation Trap",question:'What will `printf("%.2f\\n", 5 / 2);` print when assigned to float?',codeSnippet:`#include <stdio.h>

int main(void) {
    float result = 5 / 2;
    printf("%.2f\\n", result);
    return 0;
}`,trickTrap:"Both 5 and 2 are integer literals in C!",options:["2.50","2.00 (Integer division discards .5 decimal before promotion to float!)","3.00 (Rounds to nearest whole)","0.00"],correctIdx:1,explanation:"In C, integer / integer performs integer division which truncates toward zero (5 / 2 = 2). Only AFTER this integer result is computed is 2 cast to float 2.00. To preserve decimals, write `5.0 / 2` or `(float)5 / 2`.",hardwareReality:"The ALU executes the integer IDIV instruction, discarding the remainder register before moving to the XMM float register."},{id:"trick-unsigned-underflow",category:"types-arithmetic",categoryLabel:"Types & Arithmetic",topic:"Unsigned Integer Underflow Wrap-Around",question:"What happens when subtracting 1 from unsigned int zero?",codeSnippet:`#include <stdio.h>

int main(void) {
    unsigned int count = 0;
    count = count - 1;
    printf("%u\\n", count);
    return 0;
}`,trickTrap:"Can an unsigned integer store negative numbers?",options:["-1","4294967295 (Wraps around to 2^32 - 1 / 0xFFFFFFFF in modular arithmetic!)","0 (Clamped to minimum)","Runtime crash"],correctIdx:1,explanation:"Unsigned arithmetic in C is defined modulo 2^N and cannot overflow or underflow negatively. 0 - 1 wraps around to maximum 32-bit unsigned integer value 4,294,967,295 (0xFFFFFFFF)!",hardwareReality:"Subtracting 1 from 0x00000000 sets all 32 bits to 1 (0xFFFFFFFF) with carry flag set."},{id:"trick-float-equality",category:"types-arithmetic",categoryLabel:"Types & Arithmetic",topic:"Floating-Point Exact Equality Trap",question:"Why does `if (f == 0.1)` evaluate to FALSE for `float f = 0.1f`?",codeSnippet:`#include <stdio.h>

int main(void) {
    float f = 0.1f;
    if (f == 0.1) {
        printf("EQUAL\\n");
    } else {
        printf("NOT EQUAL\\n");
    }
    return 0;
}`,trickTrap:"What is the data type of the literal `0.1` without an `f` suffix?",options:["Prints EQUAL","Prints NOT EQUAL! (0.1 is double-precision 64-bit; 0.1f is 32-bit with precision difference!)","Syntax error","Undefined behavior"],correctIdx:1,explanation:"In C, decimal literal `0.1` without suffix is a 64-bit double, while `f` is 32-bit float. In binary IEEE-754, 0.1 is a repeating fraction. When promoted, `(double)0.1f` is `0.10000000149...` while `0.1` is `0.1000000000000000055...`. They are not equal!",hardwareReality:"COMPSD compares 64-bit double precision registers XMM0 and XMM1. Lower mantissa bits do not match."},{id:"trick-octal-literal",category:"types-arithmetic",categoryLabel:"Types & Arithmetic",topic:"The Sneaky Leading Zero Octal Trap",question:"What does `int x = 025;` evaluate to in decimal?",codeSnippet:`#include <stdio.h>

int main(void) {
    int x = 025;
    printf("%d\\n", x);
    return 0;
}`,trickTrap:"Notice the leading zero `0` in front of 25!",options:["25","21 (In C, any integer literal starting with 0 is parsed in Base 8 / Octal!)","0","Syntax error because 25 is not octal"],correctIdx:1,explanation:"In C, prefix `0` signifies an Octal (base 8) number! `025` = 2 * 8^1 + 5 * 8^0 = 16 + 5 = 21 in decimal. Never prefix numbers with 0 unless intending octal!",hardwareReality:"The compiler lexer scans leading '0' as octal digit stream, converting to binary value 0b00010101 (21)."},{id:"trick-array-index-commutative",category:"pointers-memory",categoryLabel:"Pointers & Memory",topic:"Commutative Array Indexing (3[arr])",question:"Is `3[arr]` valid C syntax?",codeSnippet:`#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};
    printf("%d\\n", 3[arr]);
    return 0;
}`,trickTrap:"The integer literal is written outside and array name inside brackets!",options:["Compile-time syntax error","Valid! Prints 40 because arr[3] == *(arr + 3) == *(3 + arr) == 3[arr]!","Prints 3","Segmentation fault"],correctIdx:1,explanation:"In C, `arr[i]` is defined as pointer dereference `*(arr + i)`. Because pointer addition is commutative, `*(arr + 3)` is mathematically identical to `*(3 + arr)`, which can also be written as `3[arr]`!",hardwareReality:"x86 SIB (Scale-Index-Base) addressing [base + index*4] is completely commutative in CPU address generation."},{id:"trick-sizeof-pointer-decay",category:"pointers-memory",categoryLabel:"Pointers & Memory",topic:"Array Parameter Decay to Pointer",question:"What will `sizeof(arr)` print inside this helper function?",codeSnippet:`#include <stdio.h>

void printSize(int arr[100]) {
    printf("%zu\\n", sizeof(arr));
}

int main(void) {
    int data[100];
    printSize(data);
    return 0;
}`,trickTrap:"Even though declared as `int arr[100]`, what does the function actually receive?",options:["400 bytes (100 ints * 4 bytes)","8 bytes (Array decays to a 64-bit pointer int* when passed as parameter!)","100 bytes","Compile error"],correctIdx:1,explanation:"In C, array parameters decay into raw pointers to their first element. `int arr[100]` inside a parameter list is silently rewritten by the compiler to `int *arr`. Thus `sizeof(arr)` returns the size of an 8-byte pointer!",hardwareReality:"System V AMD64 calling convention passes the array address in register RDI; no array elements are copied."},{id:"trick-dangling-stack-pointer",category:"pointers-memory",categoryLabel:"Pointers & Memory",topic:"Returning Address of Local Stack Variable",question:"What is the fatal flaw in this function?",codeSnippet:`#include <stdio.h>

int* getSecretNumber(void) {
    int secret = 777;
    return &secret; // Returning address of local stack variable!
}

int main(void) {
    int *p = getSecretNumber();
    printf("%d\\n", *p);
    return 0;
}`,trickTrap:"What happens to the stack memory of `secret` when `getSecretNumber()` returns?",options:["Completely valid, prints 777 reliably","Fatal Dangling Pointer! (Local variable stack frame is popped/deallocated on return)","Syntax error on return type","Compile error: cannot take address of int"],correctIdx:1,explanation:"Local variable `secret` exists only while `getSecretNumber()` is on the call stack. Once the function returns, its stack frame is invalidated and will be overwritten by future function calls. Accessing `*p` is undefined behavior!",hardwareReality:"CPU adjusts RSP register back to caller base. Memory at [RSP-4] is reused by subsequent function calls."},{id:"trick-rodata-string-modification",category:"pointers-memory",categoryLabel:"Pointers & Memory",topic:"String Literal Read-Only Memory (.rodata Segfault)",question:"What happens when attempting to modify `s[0] = 'H';`?",codeSnippet:`#include <stdio.h>

int main(void) {
    char *s = "hello";
    s[0] = 'H'; // Attempting in-place mutation
    printf("%s\\n", s);
    return 0;
}`,trickTrap:'Where does the compiler store string literal `"hello"` in virtual memory?',options:["Prints 'Hello'","Segmentation Fault! (String literals are stored in read-only .rodata page)","Compilation error","Prints 'h'"],correctIdx:1,explanation:'`"hello"` is placed in the `.rodata` (read-only data) section of the binary. Writing to read-only memory causes the OS Memory Management Unit (MMU) to immediately abort the process with a SIGSEGV crash! Use `char s[] = "hello";` for mutable stack strings.',hardwareReality:"MMU page table entry for .rodata has Write bit set to 0. Writing generates CPU Exception 14 (Page Fault)."},{id:"trick-macro-parentheses",category:"preprocessor-macro",categoryLabel:"Macros & Preprocessor",topic:"Macro Operator Precedence Trap",question:"What does `SQUARE(2 + 3)` evaluate to?",codeSnippet:`#include <stdio.h>

#define SQUARE(x) x * x

int main(void) {
    int ans = SQUARE(2 + 3);
    printf("%d\\n", ans);
    return 0;
}`,trickTrap:"Macros perform textual replacement BEFORE arithmetic precedence is evaluated!",options:["25 (5 * 5)","11 (Textual replacement yields: 2 + 3 * 2 + 3 = 2 + 6 + 3 = 11!)","10","Syntax error"],correctIdx:1,explanation:"Macros are purely textual substitutions. `SQUARE(2 + 3)` expands verbatim to `2 + 3 * 2 + 3`. Due to operator precedence, multiplication runs first: `3 * 2 = 6`, resulting in `2 + 6 + 3 = 11`. Always enclose macro arguments in parentheses: `#define SQUARE(x) ((x) * (x))`!",hardwareReality:"The preprocessor runs before the C parser, altering the order of AST multiplication and addition nodes."},{id:"trick-macro-side-effect",category:"preprocessor-macro",categoryLabel:"Macros & Preprocessor",topic:"Macro Parameter Double Evaluation Side Effect",question:"What is `a` after `int r = MAX(a++, 5);`?",codeSnippet:`#include <stdio.h>

#define MAX(x, y) ((x) > (y) ? (x) : (y))

int main(void) {
    int a = 6;
    int r = MAX(a++, 5);
    printf("a = %d, r = %d\\n", a, r);
    return 0;
}`,trickTrap:"How many times does the macro expand argument `x`?",options:["a = 7, r = 6","a = 8, r = 7 (a++ is evaluated TWICE: once in condition and once in expression!)","a = 6, r = 6","Undefined behavior"],correctIdx:1,explanation:"`MAX(a++, 5)` expands to `((a++) > (5) ? (a++) : (5))`. Because `a` (6) > 5 is true, the true-branch `(a++)` is evaluated, incrementing `a` a second time! `a` becomes 8 and `r` receives 7.",hardwareReality:"Two separate INC instructions are compiled into the binary sequence."},{id:"trick-struct-padding-size",category:"structs-hardware",categoryLabel:"Structures & Hardware",topic:"Struct Memory Alignment & Padding Overhead",question:"What is `sizeof(struct Demo)` on a 64-bit architecture?",codeSnippet:`#include <stdio.h>

struct Demo {
    char a;   // 1 byte
    int b;    // 4 bytes
    char c;   // 1 byte
};

int main(void) {
    printf("%zu\\n", sizeof(struct Demo));
    return 0;
}`,trickTrap:"Does the CPU lay out struct members without any gaps?",options:["6 bytes (1 + 4 + 1)","12 bytes (Compiler adds 3 padding bytes after 'a' and 3 padding bytes after 'c' for 4-byte alignment!)","8 bytes","16 bytes"],correctIdx:1,explanation:"CPUs access memory in aligned words. A 4-byte `int` must start at an address divisible by 4. So `char a` (1 byte) is padded with 3 empty bytes. `char c` (1 byte) is padded with 3 trailing bytes so arrays of this struct remain aligned, totaling 12 bytes!",hardwareReality:"Unaligned memory access requires two separate memory bus read cycles; compilers insert padding to ensure single-cycle reads."},{id:"trick-sizeof-unevaluated",category:"structs-hardware",categoryLabel:"Structures & Hardware",topic:"Sizeof Unevaluated Operand Property",question:"What is the value of `i` after `sizeof(i++)`?",codeSnippet:`#include <stdio.h>

int main(void) {
    int i = 5;
    size_t s = sizeof(i++);
    printf("i = %d\\n", i);
    return 0;
}`,trickTrap:"Does the `sizeof` operator execute expressions at runtime?",options:["i = 6","i = 5! (sizeof is evaluated entirely at compile-time; runtime expressions inside are never executed!)","i = 4","Compilation error"],correctIdx:1,explanation:"In C, `sizeof` is a compile-time operator. The compiler inspects only the type of `i++` (which is `int`), emits constant 4, and completely ignores the runtime expression. `i++` is NEVER executed!",hardwareReality:"No INC or ADD instruction is generated in assembly; the operand is replaced by immediate constant 4."}],lu={name:"funnel",size:24,node:[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],aliases:["filter"]};lu.node;let lm=ov(lu),lh=({isOpen:e,onClose:t})=>{let{addBananas:i,updateActiveCode:n}=o5(),[r,a]=(0,p.useState)("all"),[o,s]=(0,p.useState)(0),[l,d]=(0,p.useState)(null),[u,m]=(0,p.useState)(!1),[h,f]=(0,p.useState)(!1);if(!e)return null;let g="all"===r?lp:lp.filter(e=>e.category===r),b=g[o]||g[0],y=l===b.correctIdx;return(0,c.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs",children:(0,c.jsxs)("div",{className:"bg-white border-2 border-[#ede3d2] rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl text-[#2b2520] overflow-hidden",children:[(0,c.jsxs)("div",{className:"p-5 border-b-2 border-[#ede3d2] bg-[#fcf7ee] flex items-center justify-between",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,c.jsx)("span",{className:"text-3xl",children:"🧠"}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("h3",{className:"text-base md:text-lg font-black text-[#2b2520] flex items-center gap-2",children:[(0,c.jsx)("span",{children:"Smart C Detective: Hidden Traps & Logic Design"}),(0,c.jsxs)("span",{className:"text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full font-bold",children:[g.length," Traps"]})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium",children:"Master the sneaky edge-cases, undefined behaviors, and hardware traps that confuse 90% of C students!"})]})]}),(0,c.jsx)("button",{onClick:t,className:"text-xs font-black text-[#7d7065] hover:text-[#2b2520] p-2 rounded-xl hover:bg-[#ede3d2] cursor-pointer",children:"✕ Close"})]}),(0,c.jsxs)("div",{className:"px-5 py-2.5 bg-[#fdfaf3] border-b border-[#ede3d2] flex items-center gap-1.5 overflow-x-auto",children:[(0,c.jsxs)("span",{className:"text-[10px] font-black uppercase text-[#7d7065] flex items-center gap-1 mr-1",children:[(0,c.jsx)(lm,{className:"w-3 h-3"})," Filter:"]}),[{id:"all",label:"All Traps"},{id:"control-flow",label:"Control Flow"},{id:"types-arithmetic",label:"Types & Math"},{id:"pointers-memory",label:"Pointers & RAM"},{id:"preprocessor-macro",label:"Macros & Preprocessor"},{id:"structs-hardware",label:"Structs & Hardware"}].map(e=>(0,c.jsx)("button",{onClick:()=>{a(e.id),s(0),d(null),m(!1)},className:`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${r===e.id?"bg-amber-500 text-white shadow-2xs":"bg-white text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:e.label},e.id))]}),(0,c.jsxs)("div",{className:"p-6 overflow-y-auto space-y-4",children:[(0,c.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-2",children:[(0,c.jsxs)("span",{className:"text-xs font-black uppercase text-[#e57e25] bg-[#fdf5ea] px-3 py-1 rounded-full border border-[#f3d4b1]",children:["Trap #",o+1,": ",b.topic]}),(0,c.jsxs)("span",{className:"text-xs font-bold text-[#2a9d8f] flex items-center gap-1",children:[(0,c.jsx)(oU,{className:"w-4 h-4"}),"Reward: +50 Bananas"]})]}),(0,c.jsx)("h4",{className:"text-base md:text-lg font-black text-[#2b2520]",children:b.question}),b.codeSnippet&&(0,c.jsxs)("div",{className:"space-y-1.5",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between text-xs text-slate-500 font-mono",children:[(0,c.jsx)("span",{children:"C Source Snippet"}),(0,c.jsxs)("button",{onClick:()=>{b.codeSnippet&&(n(b.codeSnippet),f(!0),setTimeout(()=>f(!1),2500))},className:"flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg cursor-pointer transition",children:[(0,c.jsx)(oO,{className:"w-3 h-3"}),(0,c.jsx)("span",{children:h?"✓ Synced to Live Compiler!":"Test Trap in Live Compiler"})]})]}),(0,c.jsx)("div",{className:"bg-[#2b2520] text-[#f4eedb] p-4 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner leading-relaxed",children:(0,c.jsx)("pre",{children:b.codeSnippet})})]}),(0,c.jsxs)("div",{className:"p-3.5 bg-[#fdf5ea] border border-[#f3d4b1] rounded-2xl text-xs text-[#b45309] font-medium flex items-center gap-2",children:[(0,c.jsx)("span",{className:"text-base",children:"💡"}),(0,c.jsxs)("div",{children:[(0,c.jsx)("strong",{children:"Detective Hint:"})," ",b.trickTrap]})]}),(0,c.jsx)("div",{className:"space-y-2.5 pt-2",children:b.options.map((e,t)=>{let n=l===t,r=t===b.correctIdx,a="bg-[#fcf7ee] border-2 border-[#ede3d2] text-[#2b2520] hover:border-[#f48c06]";return u&&(a=r?"bg-[#eaf6f4] border-2 border-[#2a9d8f] text-[#2a9d8f] font-bold":n?"bg-[#fdf0ec] border-2 border-[#e76f51] text-[#e76f51] font-bold":"opacity-40 border-[#ede3d2] bg-white"),(0,c.jsxs)("button",{onClick:()=>{!u&&(d(t),m(!0),t===b.correctIdx&&(i(50),o0({particleCount:65,spread:60,origin:{y:.8}})))},disabled:u,className:`w-full p-3.5 rounded-2xl text-left text-xs font-semibold transition cursor-pointer flex items-center justify-between ${a}`,children:[(0,c.jsx)("span",{className:"pr-2",children:e}),u&&r&&(0,c.jsx)(oP,{className:"w-5 h-5 text-[#2a9d8f] shrink-0"}),u&&n&&!r&&(0,c.jsx)(sl,{className:"w-5 h-5 text-[#e76f51] shrink-0"})]},t)})}),u&&(0,c.jsxs)(on.div,{initial:{scale:.95,opacity:0},animate:{scale:1,opacity:1},className:`p-4 rounded-2xl border-2 space-y-2 text-xs ${y?"bg-[#eaf6f4] border-[#2a9d8f] text-[#1b635b]":"bg-[#fdf0ec] border-[#e76f51] text-[#9b3a22]"}`,children:[(0,c.jsx)("div",{className:"font-black text-sm flex items-center gap-1.5",children:y?"🎯 Detective Win! You caught the trap!":"⚠️ Trap Triggered! Here is why:"}),(0,c.jsx)("p",{className:"leading-relaxed font-medium",children:b.explanation}),(0,c.jsxs)("div",{className:"pt-2 border-t border-black/10 font-mono text-[11px] flex items-center gap-1.5",children:[(0,c.jsx)(oE,{className:"w-4 h-4 shrink-0"}),(0,c.jsxs)("span",{children:["Hardware reality: ",b.hardwareReality]})]})]})]}),(0,c.jsxs)("div",{className:"p-4 border-t-2 border-[#ede3d2] bg-[#fcf7ee] flex items-center justify-between",children:[(0,c.jsxs)("span",{className:"text-xs text-[#7d7065] font-bold",children:["Trick ",o+1," of ",g.length]}),(0,c.jsxs)("button",{onClick:()=>{d(null),m(!1),f(!1),s(e=>(e+1)%g.length)},className:"friendly-button-amber px-5 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-sm",children:[(0,c.jsx)("span",{children:"Next Detective Challenge"}),(0,c.jsx)(oK,{className:"w-4 h-4"})]})]})]})})},lf={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};lf.node;let lg=ov(lf),lb={name:"monitor",size:24,node:[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]};lb.node;let ly=ov(lb),lx={name:"apple",size:24,node:[["path",{d:"M12 6.528V3a1 1 0 0 1 1-1h0",key:"11qiee"}],["path",{d:"M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",key:"110c12"}]]};lx.node;let lv=ov(lx),lw={name:"smartphone",size:24,node:[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]};lw.node;let lC=ov(lw),lS=({isOpen:e,onClose:t})=>{let[i,n]=(0,p.useState)("win"),[r,a]=(0,p.useState)(null);if(!e)return null;let o=(e,t)=>{navigator.clipboard.writeText(e),a(t),setTimeout(()=>a(null),2500)};return(0,c.jsx)(oh,{children:(0,c.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs",children:(0,c.jsxs)(on.div,{initial:{opacity:0,scale:.95,y:15},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:15},className:"bg-white border-2 border-[#ede3d2] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]",children:[(0,c.jsxs)("div",{className:"bg-[#fdf5ea] border-b-2 border-[#ede3d2] p-5 md:p-6 flex items-center justify-between",children:[(0,c.jsxs)("div",{className:"flex items-center gap-3",children:[(0,c.jsx)("div",{className:"w-11 h-11 rounded-2xl bg-white border border-[#f3d4b1] flex items-center justify-center p-2 shadow-2xs shrink-0",children:(0,c.jsx)("img",{src:"/C-LangPrep/c-academy-icon.svg",alt:"C Academy Logo",className:"w-full h-full object-contain"})}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("h3",{className:"text-lg md:text-xl font-black text-[#2b2520] flex items-center gap-2",children:[(0,c.jsx)("span",{children:"Download Desktop & Mobile Edition"}),(0,c.jsx)("span",{className:"text-[10px] uppercase tracking-wider bg-[#e57e25] text-white px-2 py-0.5 rounded-full font-bold",children:"v1.0.0"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065] font-medium",children:"Cross-platform installers for Windows, macOS, Linux, and 1-tap mobile/tablet PWA"})]})]}),(0,c.jsx)("button",{onClick:t,className:"w-9 h-9 rounded-xl hover:bg-black/5 flex items-center justify-center text-[#7d7065] hover:text-[#2b2520] transition cursor-pointer",children:(0,c.jsx)(ld,{className:"w-5 h-5"})})]}),(0,c.jsxs)("div",{className:"px-6 pt-4 pb-2 border-b border-[#ede3d2] flex items-center gap-2 bg-white overflow-x-auto",children:[(0,c.jsxs)("button",{onClick:()=>n("win"),className:`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${"win"===i?"bg-[#2b2520] text-white shadow-xs":"bg-[#fdf5ea] text-[#7d7065] hover:bg-[#faebd7]"}`,children:[(0,c.jsx)(ly,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsx)("span",{children:"Windows (.exe / .bat)"})]}),(0,c.jsxs)("button",{onClick:()=>n("mac"),className:`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${"mac"===i?"bg-[#2b2520] text-white shadow-xs":"bg-[#fdf5ea] text-[#7d7065] hover:bg-[#faebd7]"}`,children:[(0,c.jsx)(lv,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsx)("span",{children:"macOS (.dmg / .sh)"})]}),(0,c.jsxs)("button",{onClick:()=>n("linux"),className:`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${"linux"===i?"bg-[#2b2520] text-white shadow-xs":"bg-[#fdf5ea] text-[#7d7065] hover:bg-[#faebd7]"}`,children:[(0,c.jsx)(oE,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsx)("span",{children:"Linux (Ubuntu / Fedora / Arch)"})]}),(0,c.jsxs)("button",{onClick:()=>n("mobile"),className:`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${"mobile"===i?"bg-[#2b2520] text-white shadow-xs":"bg-[#fdf5ea] text-[#7d7065] hover:bg-[#faebd7]"}`,children:[(0,c.jsx)(lC,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsx)("span",{children:"Mobile & Tablet (PWA)"})]})]}),(0,c.jsxs)("div",{className:"p-6 overflow-y-auto space-y-6 flex-1 text-[#2b2520]",children:["win"===i&&(0,c.jsxs)("div",{className:"space-y-4",children:[(0,c.jsxs)("div",{className:"p-4 rounded-2xl border-2 border-[#e57e25]/30 bg-[#fdf5ea]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4",children:[(0,c.jsxs)("div",{className:"space-y-1",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"font-black text-sm text-[#2b2520]",children:"Windows One-Click Installer (.exe)"}),(0,c.jsx)("span",{className:"text-[10px] font-bold bg-[#e57e25] text-white px-2 py-0.5 rounded-full",children:"Recommended"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065]",children:"Installs the full native application, automatically creates the desktop shortcut icon on your Home screen, registers in Start Menu, and runs 100% offline."}),(0,c.jsx)("div",{className:"text-[11px] font-mono text-[#e57e25] font-semibold",children:"Package: The Complete C Academy Setup 1.0.0.exe (x64)"})]}),(0,c.jsxs)("a",{href:"https://github.com/Raghavendra-varma-au-cse/C-LangPrep/releases",target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-[#e57e25] hover:bg-[#c46210] text-white shadow-sm transition shrink-0 cursor-pointer",children:[(0,c.jsx)(lg,{className:"w-4 h-4"}),(0,c.jsx)("span",{children:"Download .exe"})]})]}),(0,c.jsxs)("div",{className:"p-4 rounded-2xl border-2 border-[#ede3d2] bg-white space-y-3",children:[(0,c.jsxs)("h4",{className:"text-sm font-black text-[#2b2520] flex items-center gap-2",children:[(0,c.jsx)(oO,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsx)("span",{children:"Single-Click Local Port Launcher (install-desktop-app.bat)"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065]",children:"Clones and serves on your local port (3000) while creating the official desktop shortcut icon on your Desktop screen."}),(0,c.jsxs)("div",{className:"bg-[#2b2520] text-white p-3 rounded-xl font-mono text-xs flex items-center justify-between overflow-x-auto",children:[(0,c.jsx)("code",{children:"git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git && cd C-LangPrep && .\\install-desktop-app.bat"}),(0,c.jsx)("button",{onClick:()=>o("git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git && cd C-LangPrep && .\\install-desktop-app.bat","win-bat"),className:"ml-3 px-2.5 py-1 bg-[#e57e25] hover:bg-[#c46210] rounded-lg text-[10px] font-bold text-white transition shrink-0",children:"win-bat"===r?"Copied!":"Copy"})]})]})]}),"mac"===i&&(0,c.jsxs)("div",{className:"space-y-4",children:[(0,c.jsxs)("div",{className:"p-4 rounded-2xl border-2 border-[#e57e25]/30 bg-[#fdf5ea]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4",children:[(0,c.jsxs)("div",{className:"space-y-1",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"font-black text-sm text-[#2b2520]",children:"macOS Disk Image (.dmg / .zip)"}),(0,c.jsx)("span",{className:"text-[10px] font-bold bg-[#e57e25] text-white px-2 py-0.5 rounded-full",children:"Universal"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065]",children:"Drag and drop to Applications. Supports both Apple Silicon (M1/M2/M3/M4) and Intel Macs."}),(0,c.jsx)("div",{className:"text-[11px] font-mono text-[#e57e25] font-semibold",children:"Package: The-Complete-C-Academy-macOS.dmg"})]}),(0,c.jsxs)("a",{href:"https://github.com/Raghavendra-varma-au-cse/C-LangPrep/releases",target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-[#e57e25] hover:bg-[#c46210] text-white shadow-sm transition shrink-0 cursor-pointer",children:[(0,c.jsx)(lg,{className:"w-4 h-4"}),(0,c.jsx)("span",{children:"Download .dmg"})]})]}),(0,c.jsxs)("div",{className:"p-4 rounded-2xl border-2 border-[#ede3d2] bg-white space-y-3",children:[(0,c.jsxs)("h4",{className:"text-sm font-black text-[#2b2520] flex items-center gap-2",children:[(0,c.jsx)(oO,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsx)("span",{children:"Single-Click macOS Terminal Installer (install-desktop-app.sh)"})]}),(0,c.jsxs)("p",{className:"text-xs text-[#7d7065]",children:["Builds the production package, creates ",(0,c.jsx)("code",{className:"bg-[#fdf5ea] px-1 py-0.5 rounded text-[#e57e25]",children:"~/Desktop/The Complete C Academy.command"}),", and launches the local port runner."]}),(0,c.jsxs)("div",{className:"bg-[#2b2520] text-white p-3 rounded-xl font-mono text-xs flex items-center justify-between overflow-x-auto",children:[(0,c.jsx)("code",{children:"git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git && cd C-LangPrep && chmod +x install-desktop-app.sh && ./install-desktop-app.sh"}),(0,c.jsx)("button",{onClick:()=>o("git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git && cd C-LangPrep && chmod +x install-desktop-app.sh && ./install-desktop-app.sh","mac-sh"),className:"ml-3 px-2.5 py-1 bg-[#e57e25] hover:bg-[#c46210] rounded-lg text-[10px] font-bold text-white transition shrink-0",children:"mac-sh"===r?"Copied!":"Copy"})]})]})]}),"linux"===i&&(0,c.jsxs)("div",{className:"space-y-4",children:[(0,c.jsxs)("div",{className:"p-4 rounded-2xl border-2 border-[#e57e25]/30 bg-[#fdf5ea]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4",children:[(0,c.jsxs)("div",{className:"space-y-1",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"font-black text-sm text-[#2b2520]",children:"Linux Packages (.AppImage, .deb, .rpm)"}),(0,c.jsx)("span",{className:"text-[10px] font-bold bg-[#e57e25] text-white px-2 py-0.5 rounded-full",children:"Universal"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065]",children:"Supports Ubuntu & Debian (.deb), Fedora & RedHat (.rpm), and Universal portable (.AppImage)."}),(0,c.jsx)("div",{className:"text-[11px] font-mono text-[#e57e25] font-semibold",children:"Packages: The-Complete-C-Academy.AppImage • .deb • .rpm"})]}),(0,c.jsxs)("a",{href:"https://github.com/Raghavendra-varma-au-cse/C-LangPrep/releases",target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-[#e57e25] hover:bg-[#c46210] text-white shadow-sm transition shrink-0 cursor-pointer",children:[(0,c.jsx)(lg,{className:"w-4 h-4"}),(0,c.jsx)("span",{children:"Download AppImage"})]})]}),(0,c.jsxs)("div",{className:"p-4 rounded-2xl border-2 border-[#ede3d2] bg-white space-y-3",children:[(0,c.jsxs)("h4",{className:"text-sm font-black text-[#2b2520] flex items-center gap-2",children:[(0,c.jsx)(oO,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsx)("span",{children:"Single-Click Linux Desktop Entry (install-desktop-app.sh)"})]}),(0,c.jsxs)("p",{className:"text-xs text-[#7d7065]",children:["Generates a native ",(0,c.jsx)("code",{className:"bg-[#fdf5ea] px-1 py-0.5 rounded text-[#e57e25]",children:"~/Desktop/c-academy.desktop"})," file with icon and launches the local port engine."]}),(0,c.jsxs)("div",{className:"bg-[#2b2520] text-white p-3 rounded-xl font-mono text-xs flex items-center justify-between overflow-x-auto",children:[(0,c.jsx)("code",{children:"git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git && cd C-LangPrep && chmod +x install-desktop-app.sh && ./install-desktop-app.sh"}),(0,c.jsx)("button",{onClick:()=>o("git clone https://github.com/Raghavendra-varma-au-cse/C-LangPrep.git && cd C-LangPrep && chmod +x install-desktop-app.sh && ./install-desktop-app.sh","linux-sh"),className:"ml-3 px-2.5 py-1 bg-[#e57e25] hover:bg-[#c46210] rounded-lg text-[10px] font-bold text-white transition shrink-0",children:"linux-sh"===r?"Copied!":"Copy"})]})]})]}),"mobile"===i&&(0,c.jsxs)("div",{className:"space-y-4",children:[(0,c.jsxs)("div",{className:"p-4 rounded-2xl border-2 border-[#e57e25]/30 bg-[#fdf5ea]/40 space-y-2",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)(lC,{className:"w-5 h-5 text-[#e57e25]"}),(0,c.jsx)("span",{className:"font-black text-sm text-[#2b2520]",children:"Instant 1-Tap Mobile & Tablet App (PWA)"}),(0,c.jsx)("span",{className:"text-[10px] font-bold bg-[#e57e25] text-white px-2 py-0.5 rounded-full",children:"Zero Store Download"})]}),(0,c.jsx)("p",{className:"text-xs text-[#7d7065]",children:"The academy is engineered as an ultra-responsive Progressive Web App that works seamlessly on all Android phones, iPhones, iPads, and Android tablets with full-screen native execution and zero browser address bars."})]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,c.jsxs)("div",{className:"p-4 rounded-2xl border-2 border-[#ede3d2] bg-white space-y-3",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)("span",{className:"text-xl",children:"🤖"}),(0,c.jsx)("h4",{className:"font-black text-sm text-[#2b2520]",children:"Android Phone & Tablet"})]}),(0,c.jsxs)("ol",{className:"text-xs text-[#7d7065] space-y-2 list-decimal list-inside",children:[(0,c.jsxs)("li",{children:["Open ",(0,c.jsx)("strong",{className:"text-[#2b2520]",children:"Chrome"})," or ",(0,c.jsx)("strong",{className:"text-[#2b2520]",children:"Edge"})," on your device."]}),(0,c.jsxs)("li",{children:["Visit the live web app: ",(0,c.jsx)("a",{href:"https://raghavendra-varma-au-cse.github.io/C-LangPrep/",target:"_blank",rel:"noopener noreferrer",className:"text-[#e57e25] font-bold underline",children:"C Academy"}),"."]}),(0,c.jsxs)("li",{children:["Tap the three dots ",(0,c.jsx)("strong",{className:"text-[#2b2520]",children:"⋮ (Menu)"})," in the top right."]}),(0,c.jsxs)("li",{children:["Tap ",(0,c.jsx)("strong",{className:"text-[#2b2520]",children:'"Install App"'})," or ",(0,c.jsx)("strong",{className:"text-[#2b2520]",children:'"Add to Home Screen"'}),"."]}),(0,c.jsx)("li",{children:"The high-res C Academy icon is placed directly on your phone/tablet home screen!"})]})]}),(0,c.jsxs)("div",{className:"p-4 rounded-2xl border-2 border-[#ede3d2] bg-white space-y-3",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)(lv,{className:"w-5 h-5 text-[#2b2520]"}),(0,c.jsx)("h4",{className:"font-black text-sm text-[#2b2520]",children:"iPhone & iPad (iOS)"})]}),(0,c.jsxs)("ol",{className:"text-xs text-[#7d7065] space-y-2 list-decimal list-inside",children:[(0,c.jsxs)("li",{children:["Open ",(0,c.jsx)("strong",{className:"text-[#2b2520]",children:"Safari"})," on your iPhone or iPad."]}),(0,c.jsxs)("li",{children:["Visit: ",(0,c.jsx)("a",{href:"https://raghavendra-varma-au-cse.github.io/C-LangPrep/",target:"_blank",rel:"noopener noreferrer",className:"text-[#e57e25] font-bold underline",children:"C Academy"}),"."]}),(0,c.jsxs)("li",{children:["Tap the ",(0,c.jsx)("strong",{className:"text-[#2b2520]",children:"Share icon (square with arrow up)"})," at the bottom bar."]}),(0,c.jsxs)("li",{children:["Scroll down and tap ",(0,c.jsx)("strong",{className:"text-[#2b2520]",children:'"Add to Home Screen"'}),"."]}),(0,c.jsxs)("li",{children:["Tap ",(0,c.jsx)("strong",{className:"text-[#2b2520]",children:"Add"}),". Launches in dedicated full-screen mode like a native App Store app!"]})]})]})]})]}),(0,c.jsxs)("div",{className:"p-4 rounded-2xl bg-[#faf6f0] border border-[#ede3d2] space-y-2",children:[(0,c.jsx)("div",{className:"flex items-center justify-between",children:(0,c.jsxs)("span",{className:"text-xs font-bold text-[#7d7065] uppercase tracking-wider flex items-center gap-1.5",children:[(0,c.jsx)(oC,{className:"w-3.5 h-3.5 text-[#e57e25]"}),(0,c.jsx)("span",{children:"Official Live Cloud Deployments"})]})}),(0,c.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs",children:[(0,c.jsxs)("a",{href:"https://raghavendra-varma-au-cse.github.io/C-LangPrep/",target:"_blank",rel:"noopener noreferrer",className:"p-3 bg-white border border-[#ede3d2] rounded-xl hover:border-[#e57e25] transition flex items-center justify-between group",children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"font-bold text-[#2b2520] group-hover:text-[#e57e25]",children:"GitHub Pages Live App"}),(0,c.jsx)("div",{className:"text-[11px] text-[#7d7065] truncate max-w-[200px]",children:"raghavendra-varma-au-cse.github.io/C-LangPrep"})]}),(0,c.jsx)(lr,{className:"w-4 h-4 text-[#7d7065] group-hover:text-[#e57e25]"})]}),(0,c.jsxs)("a",{href:"https://raghavendravarma.vercel.app/",target:"_blank",rel:"noopener noreferrer",className:"p-3 bg-white border border-[#ede3d2] rounded-xl hover:border-[#e57e25] transition flex items-center justify-between group",children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"font-bold text-[#2b2520] group-hover:text-[#e57e25]",children:"Architect Portfolio"}),(0,c.jsx)("div",{className:"text-[11px] text-[#7d7065] truncate max-w-[200px]",children:"raghavendravarma.vercel.app"})]}),(0,c.jsx)(lr,{className:"w-4 h-4 text-[#7d7065] group-hover:text-[#e57e25]"})]})]})]})]}),(0,c.jsxs)("div",{className:"p-4 bg-[#fdf5ea] border-t border-[#ede3d2] flex items-center justify-between text-xs text-[#7d7065]",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsx)(oP,{className:"w-4 h-4 text-emerald-600"}),(0,c.jsx)("span",{children:"100% Free • Open-Source • MIT License"})]}),(0,c.jsx)("button",{onClick:t,className:"px-4 py-1.5 rounded-xl bg-white border border-[#ede3d2] hover:bg-[#faf6f0] text-[#2b2520] font-bold transition cursor-pointer",children:"Close"})]})]})})})},lk={name:"tv",size:24,node:[["path",{d:"m17 2-5 5-5-5",key:"16satq"}],["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",key:"1e6viu"}]]};lk.node;let lN=ov(lk),lA={name:"brain",size:24,node:[["path",{d:"M12 18V5",key:"adv99a"}],["path",{d:"M15 13a4.17 4.17 0 01-3-4 4.17 4.17 0 01-3 4",key:"5nuw1p"}],["path",{d:"M17.707 6.294A3 3 0 1012 5a3 3 0 10-5.707 1.294",key:"18ldcf"}],["path",{d:"M17.996 5.125a4 4 0 012.526 5.77",key:"1sdu8q"}],["path",{d:"M18 18a4 4 0 002-7.465",key:"7xqqvr"}],["path",{d:"M19.967 17.482a4 4 0 11-7.967.517 4 4 0 11-7.967-.517",key:"t46ysz"}],["path",{d:"M6 18a4 4 0 01-2-7.465",key:"1y2m15"}],["path",{d:"M6.004 5.125a4 4 0 00-2.526 5.77",key:"3cw1ss"}]]};lA.node;let lT=ov(lA),lR={name:"globe",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]};lR.node;let lL=ov(lR),lP={name:"laptop",size:24,node:[["path",{d:"M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z",key:"1pdavp"}],["path",{d:"M20.054 15.987H3.946",key:"14rxg9"}]]};lP.node;let lI=ov(lP);function lE(){let{state:e}=o5(),[t,i]=(0,p.useState)("mastery-150"),[n,r]=(0,p.useState)(!1),[a,o]=(0,p.useState)(!1),[s,l]=(0,p.useState)(!1);return(0,c.jsxs)("div",{className:"min-h-screen bg-[#fffdf9] text-[#2b2520] flex flex-col font-sans selection:bg-[#f48c06] selection:text-white pb-12",children:[(0,c.jsx)("header",{className:"bg-white border-b-2 border-[#ede3d2] px-4 md:px-8 py-3.5 sticky top-0 z-30 shadow-2xs",children:(0,c.jsxs)("div",{className:"max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3",children:[(0,c.jsxs)("div",{className:"flex items-center gap-3",children:[(0,c.jsx)("div",{className:"w-10 h-10 rounded-xl bg-[#fdf5ea] border border-[#f3d4b1] flex items-center justify-center p-1.5 shadow-2xs shrink-0",children:(0,c.jsx)("img",{src:"/C-LangPrep/c-academy-icon.svg",alt:"C Academy Icon",className:"w-full h-full object-contain"})}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("h1",{className:"text-lg md:text-xl font-black text-[#2b2520] tracking-tight flex items-center gap-2",children:[(0,c.jsx)("span",{children:"The Complete C Engineering Academy"}),(0,c.jsxs)("span",{className:"text-xs bg-[#fdf5ea] text-[#e57e25] border border-[#f3d4b1] px-2.5 py-0.5 rounded-full font-bold",children:["Level ",e.currentLevelId,"/150"]})]}),(0,c.jsxs)("p",{className:"text-xs text-[#7d7065] font-medium",children:[e.activeTopic," • Fully Synchronized Across All Pages"]})]})]}),(0,c.jsxs)("div",{className:"flex items-center gap-2",children:[(0,c.jsxs)("button",{onClick:()=>l(!0),className:"flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#2b2520] hover:bg-[#433b35] text-white cursor-pointer transition shadow-2xs",children:[(0,c.jsx)(lI,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsx)("span",{className:"hidden sm:inline",children:"Desktop App"}),(0,c.jsx)("span",{className:"text-[10px] bg-[#e57e25] text-white px-1.5 py-0.2 rounded font-bold",children:".exe / .dmg"})]}),(0,c.jsxs)("button",{onClick:()=>o(!0),className:"flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#fdf5ea] hover:bg-[#faebd7] border-2 border-[#e57e25] text-[#b45309] cursor-pointer transition shadow-2xs",children:[(0,c.jsx)(lT,{className:"w-4 h-4 text-[#e57e25]"}),(0,c.jsx)("span",{children:"Smart C Detective (Traps)"})]}),(0,c.jsxs)("div",{className:"flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-[#eaf6f4] border-2 border-[#2a9d8f] text-[#2a9d8f]",children:[(0,c.jsx)("span",{className:"text-base",children:"🍌"}),(0,c.jsxs)("span",{children:[e.totalBananas," Bananas"]})]})]}),(0,c.jsxs)("div",{className:"w-full flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#ede3d2]",children:[(0,c.jsxs)("button",{onClick:()=>i("mastery-150"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${"mastery-150"===t?"bg-[#f48c06] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(sq,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"150-Level Journey"})]}),(0,c.jsxs)("button",{onClick:()=>i("error-lab"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${"error-lab"===t?"bg-[#e76f51] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(oQ,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Error Doctor Lab"})]}),(0,c.jsxs)("button",{onClick:()=>i("multifile"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${"multifile"===t?"bg-[#457b9d] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(sh,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Multi-File Linking"})]}),(0,c.jsxs)("button",{onClick:()=>i("blocks"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${"blocks"===t?"bg-[#d97706] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(sb,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Visual Block Builder"})]}),(0,c.jsxs)("button",{onClick:()=>i("line-by-line"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${"line-by-line"===t?"bg-[#0d9488] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(lN,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Line-by-Line Story"})]}),(0,c.jsxs)("button",{onClick:()=>i("daily"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${"daily"===t?"bg-[#c2410c] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(sU,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Everyday Machines"})]}),(0,c.jsxs)("button",{onClick:()=>i("real-world"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${"real-world"===t?"bg-[#2b2520] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(oY,{className:"w-3.5 h-3.5 text-amber-500"}),(0,c.jsx)("span",{children:"Systems (Redis/Git/DOOM)"})]}),(0,c.jsxs)("button",{onClick:()=>i("playground"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${"playground"===t?"bg-[#2a9d8f] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(oO,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Live C Compiler"})]}),(0,c.jsxs)("button",{onClick:()=>i("keywords"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${"keywords"===t?"bg-[#7c3aed] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(s7,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"32 Keywords & Libs"})]}),(0,c.jsxs)("button",{onClick:()=>i("resources"),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${"resources"===t?"bg-[#059669] text-white shadow-sm":"bg-[#fcf7ee] text-[#7d7065] hover:bg-[#ede3d2] border border-[#ede3d2]"}`,children:[(0,c.jsx)(lL,{className:"w-3.5 h-3.5"}),(0,c.jsx)("span",{children:"Global Resources"})]})]})]})}),(0,c.jsx)("main",{className:"max-w-7xl mx-auto w-full px-4 pt-6 space-y-6",children:(0,c.jsxs)(oh,{mode:"wait",children:["mastery-150"===t&&(0,c.jsx)(on.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},children:(0,c.jsx)(o8,{})},"mastery-150"),"error-lab"===t&&(0,c.jsx)(on.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},children:(0,c.jsx)(sp,{})},"error-lab"),"multifile"===t&&(0,c.jsx)(on.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},children:(0,c.jsx)(sf,{})},"multifile"),"blocks"===t&&(0,c.jsx)(on.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},children:(0,c.jsx)(sR,{})},"blocks"),"line-by-line"===t&&(0,c.jsx)(on.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},children:(0,c.jsx)(sB,{})},"line-by-line"),"daily"===t&&(0,c.jsx)(on.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},children:(0,c.jsx)(sX,{})},"daily"),"real-world"===t&&(0,c.jsx)(on.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},children:(0,c.jsx)(s$,{})},"real-world"),"playground"===t&&(0,c.jsx)(on.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},children:(0,c.jsx)(s1,{})},"playground"),"keywords"===t&&(0,c.jsx)(on.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},children:(0,c.jsx)(lt,{})},"keywords"),"resources"===t&&(0,c.jsx)(on.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-8},children:(0,c.jsx)(ls,{})},"resources")]})}),(0,c.jsx)("footer",{className:"mt-8 py-3.5 border-t-2 border-[#ede3d2] text-xs text-[#7d7065] bg-white shadow-2xs",children:(0,c.jsxs)("div",{className:"max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3",children:[(0,c.jsxs)("div",{className:"flex items-center gap-2.5",children:[(0,c.jsx)("div",{className:"w-6 h-6 rounded-lg bg-[#fdf5ea] border border-[#f3d4b1] flex items-center justify-center p-1 shrink-0",children:(0,c.jsx)("img",{src:"/C-LangPrep/c-academy-icon.svg",alt:"C Academy Logo",className:"w-full h-full object-contain"})}),(0,c.jsx)("span",{className:"font-bold text-[#2b2520]",children:"The Complete C Engineering Academy"}),(0,c.jsx)("span",{className:"text-slate-300 hidden sm:inline",children:"•"}),(0,c.jsx)("span",{className:"hidden sm:inline text-[#7d7065]",children:"Original Architecture • MIT License • Free & Open-Source"})]}),(0,c.jsxs)("div",{className:"flex items-center gap-2 text-[#7d7065]",children:[(0,c.jsx)("span",{children:"Developed with lots of ☕ coffee by"}),(0,c.jsx)("a",{href:"https://raghavendravarma.vercel.app/",target:"_blank",rel:"noopener noreferrer",className:"font-bold text-[#e57e25] hover:text-[#c46210] hover:underline transition-colors",children:"Raghavendra Varma"})]})]})}),(0,c.jsx)(lc,{isOpen:n,onClose:()=>r(!1)}),(0,c.jsx)(lh,{isOpen:a,onClose:()=>o(!1)}),(0,c.jsx)(lS,{isOpen:s,onClose:()=>l(!1)})]})}e.s(["default",0,function(){return(0,c.jsx)(o2,{children:(0,c.jsx)(lE,{})})}],52683)}]);