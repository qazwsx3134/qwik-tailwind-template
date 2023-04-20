import{E as Ne,p as f,q as L,r as D,Q as se,s as re,V as u}from"./q-86d13d31.js";const le={type:"change"},U={type:"start"},ce={type:"end"};class Re extends Ne{constructor(Z,ue){super(),this.object=Z,this.domElement=ue,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new f,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:L.ROTATE,MIDDLE:L.DOLLY,RIGHT:L.PAN},this.touches={ONE:D.ROTATE,TWO:D.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return s.phi},this.getAzimuthalAngle=function(){return s.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(t){t.addEventListener("keydown",H),this._domElementKeyEvents=t},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",H),this._domElementKeyEvents=null},this.saveState=function(){e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=function(){e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(le),e.update(),i=a.NONE},this.update=function(){const t=new f,n=new se().setFromUnitVectors(Z.up,new f(0,1,0)),r=n.clone().invert(),l=new f,c=new se,A=2*Math.PI;return function(){const ie=e.object.position;t.copy(ie).sub(e.target),t.applyQuaternion(n),s.setFromVector3(t),e.autoRotate&&i===a.NONE&&S(pe()),e.enableDamping?(s.theta+=p.theta*e.dampingFactor,s.phi+=p.phi*e.dampingFactor):(s.theta+=p.theta,s.phi+=p.phi);let m=e.minAzimuthAngle,h=e.maxAzimuthAngle;return isFinite(m)&&isFinite(h)&&(m<-Math.PI?m+=A:m>Math.PI&&(m-=A),h<-Math.PI?h+=A:h>Math.PI&&(h-=A),m<=h?s.theta=Math.max(m,Math.min(h,s.theta)):s.theta=s.theta>(m+h)/2?Math.max(m,s.theta):Math.min(h,s.theta)),s.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,s.phi)),s.makeSafe(),s.radius*=R,s.radius=Math.max(e.minDistance,Math.min(e.maxDistance,s.radius)),e.enableDamping===!0?e.target.addScaledVector(g,e.dampingFactor):e.target.add(g),t.setFromSpherical(s),t.applyQuaternion(r),ie.copy(e.target).add(t),e.object.lookAt(e.target),e.enableDamping===!0?(p.theta*=1-e.dampingFactor,p.phi*=1-e.dampingFactor,g.multiplyScalar(1-e.dampingFactor)):(p.set(0,0,0),g.set(0,0,0)),R=1,x||l.distanceToSquared(e.object.position)>F||8*(1-c.dot(e.object.quaternion))>F?(e.dispatchEvent(le),l.copy(e.object.position),c.copy(e.object.quaternion),x=!1,!0):!1}}(),this.dispose=function(){e.domElement.removeEventListener("contextmenu",oe),e.domElement.removeEventListener("pointerdown",te),e.domElement.removeEventListener("pointercancel",j),e.domElement.removeEventListener("wheel",ne),e.domElement.removeEventListener("pointermove",K),e.domElement.removeEventListener("pointerup",j),e._domElementKeyEvents!==null&&(e._domElementKeyEvents.removeEventListener("keydown",H),e._domElementKeyEvents=null)};const e=this,a={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let i=a.NONE;const F=1e-6,s=new re,p=new re;let R=1;const g=new f;let x=!1;const d=new u,b=new u,P=new u,E=new u,y=new u,T=new u,O=new u,M=new u,N=new u,o=[],k={};function pe(){return 2*Math.PI/60/60*e.autoRotateSpeed}function I(){return Math.pow(.95,e.zoomSpeed)}function S(t){p.theta-=t}function Y(t){p.phi-=t}const X=function(){const t=new f;return function(r,l){t.setFromMatrixColumn(l,0),t.multiplyScalar(-r),g.add(t)}}(),v=function(){const t=new f;return function(r,l){e.screenSpacePanning===!0?t.setFromMatrixColumn(l,1):(t.setFromMatrixColumn(l,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(r),g.add(t)}}(),w=function(){const t=new f;return function(r,l){const c=e.domElement;if(e.object.isPerspectiveCamera){const A=e.object.position;t.copy(A).sub(e.target);let _=t.length();_*=Math.tan(e.object.fov/2*Math.PI/180),X(2*r*_/c.clientHeight,e.object.matrix),v(2*l*_/c.clientHeight,e.object.matrix)}else e.object.isOrthographicCamera?(X(r*(e.object.right-e.object.left)/e.object.zoom/c.clientWidth,e.object.matrix),v(l*(e.object.top-e.object.bottom)/e.object.zoom/c.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}}();function C(t){e.object.isPerspectiveCamera?R/=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom*t)),e.object.updateProjectionMatrix(),x=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function V(t){e.object.isPerspectiveCamera?R*=t:e.object.isOrthographicCamera?(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/t)),e.object.updateProjectionMatrix(),x=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function q(t){d.set(t.clientX,t.clientY)}function me(t){O.set(t.clientX,t.clientY)}function W(t){E.set(t.clientX,t.clientY)}function he(t){b.set(t.clientX,t.clientY),P.subVectors(b,d).multiplyScalar(e.rotateSpeed);const n=e.domElement;S(2*Math.PI*P.x/n.clientHeight),Y(2*Math.PI*P.y/n.clientHeight),d.copy(b),e.update()}function fe(t){M.set(t.clientX,t.clientY),N.subVectors(M,O),N.y>0?C(I()):N.y<0&&V(I()),O.copy(M),e.update()}function de(t){y.set(t.clientX,t.clientY),T.subVectors(y,E).multiplyScalar(e.panSpeed),w(T.x,T.y),E.copy(y),e.update()}function be(t){t.deltaY<0?V(I()):t.deltaY>0&&C(I()),e.update()}function Ee(t){let n=!1;switch(t.code){case e.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?Y(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):w(0,e.keyPanSpeed),n=!0;break;case e.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?Y(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):w(0,-e.keyPanSpeed),n=!0;break;case e.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?S(2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):w(e.keyPanSpeed,0),n=!0;break;case e.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?S(-2*Math.PI*e.rotateSpeed/e.domElement.clientHeight):w(-e.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),e.update())}function G(){if(o.length===1)d.set(o[0].pageX,o[0].pageY);else{const t=.5*(o[0].pageX+o[1].pageX),n=.5*(o[0].pageY+o[1].pageY);d.set(t,n)}}function B(){if(o.length===1)E.set(o[0].pageX,o[0].pageY);else{const t=.5*(o[0].pageX+o[1].pageX),n=.5*(o[0].pageY+o[1].pageY);E.set(t,n)}}function Q(){const t=o[0].pageX-o[1].pageX,n=o[0].pageY-o[1].pageY,r=Math.sqrt(t*t+n*n);O.set(0,r)}function ye(){e.enableZoom&&Q(),e.enablePan&&B()}function ge(){e.enableZoom&&Q(),e.enableRotate&&G()}function J(t){if(o.length==1)b.set(t.pageX,t.pageY);else{const r=z(t),l=.5*(t.pageX+r.x),c=.5*(t.pageY+r.y);b.set(l,c)}P.subVectors(b,d).multiplyScalar(e.rotateSpeed);const n=e.domElement;S(2*Math.PI*P.x/n.clientHeight),Y(2*Math.PI*P.y/n.clientHeight),d.copy(b)}function $(t){if(o.length===1)y.set(t.pageX,t.pageY);else{const n=z(t),r=.5*(t.pageX+n.x),l=.5*(t.pageY+n.y);y.set(r,l)}T.subVectors(y,E).multiplyScalar(e.panSpeed),w(T.x,T.y),E.copy(y)}function ee(t){const n=z(t),r=t.pageX-n.x,l=t.pageY-n.y,c=Math.sqrt(r*r+l*l);M.set(0,c),N.set(0,Math.pow(M.y/O.y,e.zoomSpeed)),C(N.y),O.copy(M)}function Pe(t){e.enableZoom&&ee(t),e.enablePan&&$(t)}function Te(t){e.enableZoom&&ee(t),e.enableRotate&&J(t)}function te(t){e.enabled!==!1&&(o.length===0&&(e.domElement.setPointerCapture(t.pointerId),e.domElement.addEventListener("pointermove",K),e.domElement.addEventListener("pointerup",j)),Le(t),t.pointerType==="touch"?we(t):Oe(t))}function K(t){e.enabled!==!1&&(t.pointerType==="touch"?Ae(t):Me(t))}function j(t){De(t),o.length===0&&(e.domElement.releasePointerCapture(t.pointerId),e.domElement.removeEventListener("pointermove",K),e.domElement.removeEventListener("pointerup",j)),e.dispatchEvent(ce),i=a.NONE}function Oe(t){let n;switch(t.button){case 0:n=e.mouseButtons.LEFT;break;case 1:n=e.mouseButtons.MIDDLE;break;case 2:n=e.mouseButtons.RIGHT;break;default:n=-1}switch(n){case L.DOLLY:if(e.enableZoom===!1)return;me(t),i=a.DOLLY;break;case L.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;W(t),i=a.PAN}else{if(e.enableRotate===!1)return;q(t),i=a.ROTATE}break;case L.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;q(t),i=a.ROTATE}else{if(e.enablePan===!1)return;W(t),i=a.PAN}break;default:i=a.NONE}i!==a.NONE&&e.dispatchEvent(U)}function Me(t){switch(i){case a.ROTATE:if(e.enableRotate===!1)return;he(t);break;case a.DOLLY:if(e.enableZoom===!1)return;fe(t);break;case a.PAN:if(e.enablePan===!1)return;de(t);break}}function ne(t){e.enabled===!1||e.enableZoom===!1||i!==a.NONE||(t.preventDefault(),e.dispatchEvent(U),be(t),e.dispatchEvent(ce))}function H(t){e.enabled===!1||e.enablePan===!1||Ee(t)}function we(t){switch(ae(t),o.length){case 1:switch(e.touches.ONE){case D.ROTATE:if(e.enableRotate===!1)return;G(),i=a.TOUCH_ROTATE;break;case D.PAN:if(e.enablePan===!1)return;B(),i=a.TOUCH_PAN;break;default:i=a.NONE}break;case 2:switch(e.touches.TWO){case D.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;ye(),i=a.TOUCH_DOLLY_PAN;break;case D.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;ge(),i=a.TOUCH_DOLLY_ROTATE;break;default:i=a.NONE}break;default:i=a.NONE}i!==a.NONE&&e.dispatchEvent(U)}function Ae(t){switch(ae(t),i){case a.TOUCH_ROTATE:if(e.enableRotate===!1)return;J(t),e.update();break;case a.TOUCH_PAN:if(e.enablePan===!1)return;$(t),e.update();break;case a.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Pe(t),e.update();break;case a.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Te(t),e.update();break;default:i=a.NONE}}function oe(t){e.enabled!==!1&&t.preventDefault()}function Le(t){o.push(t)}function De(t){delete k[t.pointerId];for(let n=0;n<o.length;n++)if(o[n].pointerId==t.pointerId){o.splice(n,1);return}}function ae(t){let n=k[t.pointerId];n===void 0&&(n=new u,k[t.pointerId]=n),n.set(t.pageX,t.pageY)}function z(t){const n=t.pointerId===o[0].pointerId?o[1]:o[0];return k[n.pointerId]}e.domElement.addEventListener("contextmenu",oe),e.domElement.addEventListener("pointerdown",te),e.domElement.addEventListener("pointercancel",j),e.domElement.addEventListener("wheel",ne,{passive:!1}),this.update()}}export{Re as O};
