import{l as ae,u as m,A as ie,n as re,R as se,m as V,B as _,_ as S,d as v,T as c,j as ce}from"./q-aabedc31.js";import{u as de}from"./q-405860ff.js";import{S as B,M as L,a as M,b as g,c as me,d as le,T as P,B as ue,F as j,e as pe,f as ge,g as we,h as fe,i as he,W as _e,A as Se,G as xe,j as ye,k as Pe,P as Me,l as ve,D as Re,m as Ae}from"./q-86d13d31.js";import{O as be}from"./q-92dec091.js";const Te=()=>{ae(_(()=>S(()=>Promise.resolve().then(()=>x),void 0),"s_1wiPri940qg"));const o={cameraX:1,cameraY:1,cameraZ:12,cameraRotationX:0,cameraRotationY:0,cameraRotationZ:0,cloudQuantity:20,rainCount:15e3},a=de(),u=m({instance:void 0}),l=m({instance:void 0}),e=m({instance:void 0}),n=m({instance:void 0}),f=m({space:void 0}),y=m({moon:void 0,moonNormal:void 0}),R=m({geometry:void 0,material:void 0,moons:[void 0]}),A=m({toruses:[void 0]}),b=m({clouds:[void 0]});return ie("scroll",_(()=>S(()=>Promise.resolve().then(()=>x),void 0),"s_vJv0VMGKAvE",[l])),re("resize",_(()=>S(()=>Promise.resolve().then(()=>x),void 0),"s_99pKbt0TPZA",[l,n])),se(_(()=>S(()=>Promise.resolve().then(()=>x),void 0),"s_AthZo0Gy7W0",[_(()=>S(()=>Promise.resolve().then(()=>x),void 0),"s_GB4vcCiEMRk",[u]),l,b,e,o,a,R,y,n,u,f,A])),V("div",null,{class:""},[V("canvas",null,{id:"bg"},null,3,null),!1],1,"6B_1")},Ee=()=>{const[o]=v(),a=new B(.25,24,24),u=new L({color:16777215}),l=new M(a,u),[e,n,f]=Array(3).fill(null).map(()=>g.randFloatSpread(100));l.position.set(e,n,f),o.instance&&o.instance.add(l)},Ie=()=>{const[o,a,u,l,e,n,f,y,R,A,b,T]=v(),i=new me;A.instance=c(i);const r=new le(75,window.innerWidth/window.innerHeight,.1,1e3);a.instance=c(r);const z=new P().load("../../images/normal.jpg"),G=new P().load("../../images/moon.jpg"),F=new P().load("../../images/space.jpg"),X=new P().load("../../images/smoke.png");b.space=c(F),y.moon=c(G),y.moonNormal=c(z);const H=[],Z=[],E=new ue;for(let t=0;t<e.rainCount;t++)Z.push(g.randFloatSpread(500),g.randFloatSpread(500),g.randFloatSpread(500)),H.push(0);E.setAttribute("position",new j(Z,3)),E.setAttribute("velocity",new j(H,1));const Y=new pe({color:11184810,size:.1}),h=new ge(E,Y),Q=new we(10,3,16,100),k=new L({color:16737095}),C=new M(Q,k);T.toruses=[c(C)];const q=new B(3,32,32),K=new L({map:G,normalMap:z}),O=new M(q,K);f.moons=[c(O)];const N=new fe(500,500),U=new he({map:X,transparent:!0}),w=new _e({canvas:document.querySelector("#bg")});R.instance=c(w),w.setPixelRatio(window.devicePixelRatio),w.setSize(window.innerWidth,window.innerHeight);const J=new Se(100),$=new xe(200,50);r.position.setZ(e.cameraZ),r.position.setX(e.cameraX),r.position.setY(e.cameraY),r.rotation.x=e.cameraRotationX,r.rotation.y=e.cameraRotationY,r.rotation.z=e.cameraRotationZ,n.guiStore.gui&&(n.guiStore.gui.add(e,"cameraX").min(-100).max(100).step(.05),n.guiStore.gui.add(e,"cameraY").min(-100).max(100).step(.05),n.guiStore.gui.add(e,"cameraZ").min(-100).max(100).step(.05),n.guiStore.gui.add(e,"cameraRotationX").min(Math.PI*-2).max(Math.PI*2).step(Math.PI/36),n.guiStore.gui.add(e,"cameraRotationY").min(Math.PI*-2).max(Math.PI*2).step(Math.PI/36),n.guiStore.gui.add(e,"cameraRotationZ").min(Math.PI*-2).max(Math.PI*2).step(Math.PI/36),n.guiStore.gui.add(e,"cloudQuantity").min(0).max(100).step(1)),i.fog=new ye(1842218,.002),i.add(h),i.add(O),i.add(C);for(let t=0;t<e.cloudQuantity;t++){const s=new M(N,U);s.position.set(Math.random()*100,100,Math.random()*100),s.rotation.x=1.57,s.rotation.z=Math.random()*360,s.rotation.y=-.12,s.material.opacity=.8,u.clouds.push(c(s)),i.add(s)}i.add($,J);const p=new Pe(404873,30,100,1.7);p.position.set(20,90,10);const ee=new Me(p,5),te=new ve(5592405),I=new Re(16772829,1);I.position.set(0,300,0);const oe=new Ae(I,5);i.add(te,I,oe,p,ee),w.render(i,r),Array(200).fill(null).forEach(o);const D=new be(r,w.domElement);l.instance=c(D);const ne=()=>{const t=h.geometry.attributes.position.array,s=h.geometry.attributes.velocity.array;for(let d=0;d<t.length;d=d+3)s[d]-=.1+Math.random()*.1,t[d+1]+=s[d],t[d+1]<-200&&(t[d+1]=200,s[d]=0);h.geometry.attributes.position.needsUpdate=!0},W=()=>{requestAnimationFrame(W),(Math.random()>.93||p.power>100)&&(p.power<100&&p.position.set(g.randInt(0,100),70+g.randInt(0,30),g.randInt(0,100)),p.power=50+Math.random()*500),h.rotation.y+=.002,ne(),T.toruses.forEach(t=>{t&&(t.rotation.x+=.01,t.rotation.y+=.005,t.rotation.z+=.01)}),u.clouds.forEach(t=>{t&&(t.rotation.z-=.001)}),D.update(),w.render(i,r)};W()},Le=()=>{const[o,a]=v();o.instance&&(o.instance.aspect=window.innerWidth/window.innerHeight,o.instance.updateProjectionMatrix()),a.instance&&a.instance.setSize(window.innerWidth,window.innerHeight)},ze=`#bg{position:fixed;top:0;left:0}.main{position:absolute;width:100vw;color:#fff;z-index:99;margin:0 auto;padding:120px 0;display:grid;grid-template-columns:repeat(12,1fr)}
`,Ge=ze,He=()=>{const[o]=v(),a=document.body.getBoundingClientRect().top;o.instance&&(o.instance.position.z=a*-.01,o.instance.position.x=a*-.0025,o.instance.position.y=a*-.002)},x=Object.freeze(Object.defineProperty({__proto__:null,_hW:ce,s_1wiPri940qg:Ge,s_99pKbt0TPZA:Le,s_AthZo0Gy7W0:Ie,s_GB4vcCiEMRk:Ee,s_QOQHZyoO7hQ:Te,s_vJv0VMGKAvE:He},Symbol.toStringTag,{value:"Module"}));export{ce as _hW,Ge as s_1wiPri940qg,Le as s_99pKbt0TPZA,Ie as s_AthZo0Gy7W0,Ee as s_GB4vcCiEMRk,Te as s_QOQHZyoO7hQ,He as s_vJv0VMGKAvE};